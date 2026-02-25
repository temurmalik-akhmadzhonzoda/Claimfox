import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/auth/AuthProvider'
import { useRoles } from '@/auth/useRoles'

export default function RequireRole({ roles, children }) {
  const { authReady, isAuthenticated } = useAuth()
  const { hasAny } = useRoles()

  if (!authReady) {
    return (
      <section style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#fff' }}>
        <div style={{ color: '#334155', fontSize: '0.9rem' }}>Berechtigungen werden geprüft...</div>
      </section>
    )
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />

  if (!hasAny(roles)) return <Navigate to="/dashboard" replace />

  return children
}
