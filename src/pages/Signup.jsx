import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/auth/AuthProvider'

export default function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(event) {
    event.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    try {
      await signup({ email: email.trim(), password, fullName: fullName.trim() })
      setMessage('Registrierung erfolgreich. Bitte E-Mail bestätigen und dann anmelden.')
      window.setTimeout(() => navigate('/login', { replace: true }), 1200)
    } catch (err) {
      setError(err?.message || 'Signup fehlgeschlagen')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f8fafc', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: 420, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.2rem', display: 'grid', gap: '0.8rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>Signup</h1>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.6rem' }}>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Name" style={inputStyle} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="E-Mail" required style={inputStyle} />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Passwort" required minLength={8} style={inputStyle} />
          {error ? <div style={{ color: '#b91c1c', fontSize: '0.82rem' }}>{error}</div> : null}
          {message ? <div style={{ color: '#166534', fontSize: '0.82rem' }}>{message}</div> : null}
          <button disabled={loading} type="submit" style={buttonStyle}>{loading ? 'Registriere...' : 'Registrieren'}</button>
        </form>
        <Link to="/login" style={{ fontSize: '0.84rem' }}>Zurück zum Login</Link>
      </div>
    </section>
  )
}

const inputStyle = { height: 40, border: '1px solid #cbd5e1', borderRadius: 10, padding: '0 0.65rem', fontSize: '0.92rem' }
const buttonStyle = { height: 40, border: '1px solid #0f172a', borderRadius: 10, background: '#0f172a', color: '#fff', fontWeight: 600 }
