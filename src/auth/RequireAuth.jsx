import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/auth/AuthProvider'

export default function RequireAuth({ children }) {
  const { authReady, isAuthenticated } = useAuth()
  const location = useLocation()

  if (!authReady) {
    return (
      <section style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#fff' }}>
        <div style={{ color: '#334155', fontSize: '0.9rem' }}>Authentifizierung wird geprüft...</div>
      </section>
    )
  }

  if (!isAuthenticated) {
    const returnTo = `${location.pathname}${location.search}${location.hash}`
    return <Navigate to={`/login?returnTo=${encodeURIComponent(returnTo)}`} replace />
  }

  return children
}
