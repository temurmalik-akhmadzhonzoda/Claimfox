import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/auth/AuthProvider'

export default function ResetPassword() {
  const { resetPassword } = useAuth()
  const [searchParams] = useSearchParams()
  const [password, setPassword] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const token = searchParams.get('token') || searchParams.get('recovery_token') || ''

  async function onSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await resetPassword({ token, password })
      setDone(true)
    } catch (err) {
      setError(err?.message || 'Reset fehlgeschlagen')
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return <section style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>Fehlender Reset-Token.</section>
  }

  return (
    <section style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f8fafc', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: 420, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.2rem', display: 'grid', gap: '0.8rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>Passwort zurücksetzen</h1>
        {!done ? (
          <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.6rem' }}>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Neues Passwort" required minLength={8} style={inputStyle} />
            {error ? <div style={{ color: '#b91c1c', fontSize: '0.82rem' }}>{error}</div> : null}
            <button disabled={loading} type="submit" style={buttonStyle}>{loading ? 'Speichere...' : 'Passwort speichern'}</button>
          </form>
        ) : (
          <div style={{ color: '#166534', fontSize: '0.88rem' }}>Passwort erfolgreich geändert.</div>
        )}
        <Link to="/login" style={{ fontSize: '0.84rem' }}>Zum Login</Link>
      </div>
    </section>
  )
}

const inputStyle = { height: 40, border: '1px solid #cbd5e1', borderRadius: 10, padding: '0 0.65rem', fontSize: '0.92rem' }
const buttonStyle = { height: 40, border: '1px solid #0f172a', borderRadius: 10, background: '#0f172a', color: '#fff', fontWeight: 600 }
