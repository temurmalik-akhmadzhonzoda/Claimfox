import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/auth/AuthProvider'

export default function ResetPassword() {
  const { resetPassword } = useAuth()

  return (
    <section style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f8fafc', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: 420, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.2rem', display: 'grid', gap: '0.8rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>Passwort zurücksetzen</h1>
        <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem' }}>Der Passwort-Reset wird über Auth0 durchgeführt.</p>
        <button onClick={() => resetPassword()} type="button" style={buttonStyle}>Reset-Seite öffnen</button>
        <Link to="/login" style={{ fontSize: '0.84rem' }}>Zum Login</Link>
      </div>
    </section>
  )
}

const buttonStyle = { height: 40, border: '1px solid #0f172a', borderRadius: 10, background: '#0f172a', color: '#fff', fontWeight: 600 }
