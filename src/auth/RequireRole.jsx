import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/auth/AuthProvider'

const ROLE_ORDER = {
  mitarbeiter: 1,
  management: 2,
  'c-level': 3
}

function roleAllowed(userRoles, allowedRoles) {
  const allowedWeight = Math.min(...allowedRoles.map((r) => ROLE_ORDER[r] || Number.MAX_SAFE_INTEGER))
  return userRoles.some((role) => (ROLE_ORDER[role] || 0) >= allowedWeight)
}

export default function RequireRole({ roles, children }) {
  const { authReady, isAuthenticated, getRoles } = useAuth()

  if (!authReady) {
    return (
      <section style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#fff' }}>
        <div style={{ color: '#334155', fontSize: '0.9rem' }}>Berechtigungen werden geprüft...</div>
      </section>
    )
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />

  const userRoles = getRoles()
  if (!roleAllowed(userRoles, roles)) return <Navigate to="/dashboard" replace />

  return children
}
