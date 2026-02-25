import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'

type ProtectedRouteProps = {
  children: React.ReactElement
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { authReady, isAuthenticated, getRoles } = useAuth()
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

  const roles = getRoles()
  const isAccessRequestPage = location.pathname === '/access-request'
  if (roles.length === 0 && !isAccessRequestPage) {
    return <Navigate to="/access-request" replace />
  }

  return children
}
