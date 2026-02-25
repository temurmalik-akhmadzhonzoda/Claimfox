import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '@/auth/AuthProvider'

export default function RequireAuth({ children }) {
  const { authReady, isAuthenticated, login } = useAuth()
  const location = useLocation()
  const returnTo = `${location.pathname}${location.search}${location.hash}`
  const shouldRedirectToLogin = authReady && !isAuthenticated

  useEffect(() => {
    if (!shouldRedirectToLogin) return
    login({ returnTo }).catch(() => {})
  }, [login, returnTo, shouldRedirectToLogin])

  if (!authReady) {
    return (
      <section style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#fff' }}>
        <div style={{ color: '#334155', fontSize: '0.9rem' }}>Authentifizierung wird geprüft...</div>
      </section>
    )
  }

  if (!isAuthenticated) {
    return (
      <section style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#fff' }}>
        <div style={{ color: '#334155', fontSize: '0.9rem' }}>Weiterleitung zum Login...</div>
      </section>
    )
  }

  return children
}
