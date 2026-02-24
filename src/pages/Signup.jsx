import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/auth/AuthProvider'

export default function Signup() {
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function startSignup() {
    setError('')
    setLoading(true)
    try {
      await signup({ returnTo: '/dashboard' })
    } catch (err) {
      setError(err?.message || 'Registrierung fehlgeschlagen')
      setLoading(false)
    }
  }

  return (
    <section style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f8fafc', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: 420, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.2rem', display: 'grid', gap: '0.8rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>Registrieren</h1>
        <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem' }}>Die Registrierung wird über Auth0 geöffnet.</p>
        {error ? <div style={{ color: '#b91c1c', fontSize: '0.82rem' }}>{error}</div> : null}
        <button disabled={loading} onClick={startSignup} type="button" style={buttonStyle}>{loading ? 'Weiterleitung...' : 'Zur Registrierung'}</button>
        <Link to="/login" style={{ fontSize: '0.84rem' }}>Zurück zum Login</Link>
      </div>
    </section>
  )
}

const buttonStyle = { height: 40, border: '1px solid #0f172a', borderRadius: 10, background: '#0f172a', color: '#fff', fontWeight: 600 }
