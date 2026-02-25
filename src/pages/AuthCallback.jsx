import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/auth/AuthProvider'

export default function AuthCallback() {
  const navigate = useNavigate()
  const { authReady, isAuthenticated } = useAuth()
  const [error, setError] = useState('')

  useEffect(() => {
    if (!authReady) return
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
      return
    }
    setError('Auth0 Callback konnte nicht abgeschlossen werden.')
  }, [authReady, isAuthenticated, navigate])

  return (
    <section style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f8fafc', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: 520, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.2rem' }}>
        <h1 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#0f172a', fontSize: '1.1rem' }}>Anmeldung wird abgeschlossen...</h1>
        {error ? <p style={{ margin: 0, color: '#b91c1c', fontSize: '0.9rem' }}>{error}</p> : <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem' }}>Bitte kurz warten.</p>}
      </div>
    </section>
  )
}
