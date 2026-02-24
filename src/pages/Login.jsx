import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/auth/AuthProvider'

export default function Login() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login, authReady, isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const returnTo = useMemo(() => searchParams.get('returnTo') || '/dashboard', [searchParams])

  useEffect(() => {
    if (authReady && isAuthenticated) navigate(returnTo, { replace: true })
  }, [authReady, isAuthenticated, navigate, returnTo])

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email.trim(), password)
      navigate(returnTo, { replace: true })
    } catch (err) {
      setError(err?.message || 'Login fehlgeschlagen')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f8fafc', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: 420, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.2rem', display: 'grid', gap: '0.8rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>Claimsfox Login</h1>
        <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem' }}>Bitte anmelden, um die Anwendung zu öffnen.</p>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.6rem' }}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="E-Mail" required style={inputStyle} />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Passwort" required style={inputStyle} />
          {error ? <div style={{ color: '#b91c1c', fontSize: '0.82rem' }}>{error}</div> : null}
          <button disabled={loading} type="submit" style={buttonStyle}>{loading ? 'Prüfe...' : 'Anmelden'}</button>
        </form>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.6rem', fontSize: '0.84rem' }}>
          <Link to="/forgot-password">Passwort vergessen?</Link>
          <Link to="/signup" style={{ fontWeight: 600 }}>Registrieren</Link>
        </div>
      </div>
    </section>
  )
}

const inputStyle = {
  height: 40,
  border: '1px solid #cbd5e1',
  borderRadius: 10,
  padding: '0 0.65rem',
  fontSize: '0.92rem'
}

const buttonStyle = {
  height: 40,
  border: '1px solid #0f172a',
  borderRadius: 10,
  background: '#0f172a',
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer'
}
