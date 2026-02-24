import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/auth/AuthProvider'

export default function ForgotPassword() {
  const { forgotPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await forgotPassword(email.trim())
    } catch (err) {
      setError(err?.message || 'Anfrage fehlgeschlagen')
      setLoading(false)
    }
  }

  return (
    <section style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f8fafc', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: 420, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.2rem', display: 'grid', gap: '0.8rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>Passwort vergessen</h1>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.6rem' }}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="E-Mail" required style={inputStyle} />
          {error ? <div style={{ color: '#b91c1c', fontSize: '0.82rem' }}>{error}</div> : null}
          <button disabled={loading} type="submit" style={buttonStyle}>{loading ? 'Weiterleitung...' : 'Reset starten'}</button>
        </form>
        <Link to="/login" style={{ fontSize: '0.84rem' }}>Zurück zum Login</Link>
      </div>
    </section>
  )
}

const inputStyle = { height: 40, border: '1px solid #cbd5e1', borderRadius: 10, padding: '0 0.65rem', fontSize: '0.92rem' }
const buttonStyle = { height: 40, border: '1px solid #0f172a', borderRadius: 10, background: '#0f172a', color: '#fff', fontWeight: 600 }
