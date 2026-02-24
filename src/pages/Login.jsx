import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/auth/AuthProvider'

export default function Login() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login, authReady, isAuthenticated } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [diag, setDiag] = useState({ loading: true, ok: false, message: '' })

  const returnTo = useMemo(() => searchParams.get('returnTo') || '/dashboard', [searchParams])

  useEffect(() => {
    if (authReady && isAuthenticated) navigate(returnTo, { replace: true })
  }, [authReady, isAuthenticated, navigate, returnTo])

  useEffect(() => {
    let active = true

    async function runDiag() {
      try {
        const res = await fetch('/api/auth-config', { method: 'GET' })
        const payload = await res.json().catch(() => ({}))
        if (!active) return

        if (!res.ok || !payload?.ok) {
          const details = payload?.error?.message || payload?.error?.code || `HTTP ${res.status}`
          setDiag({ loading: false, ok: false, message: `Auth-Konfiguration fehlerhaft: ${details}` })
          return
        }

        setDiag({ loading: false, ok: true, message: `Auth0 verbunden (${payload?.config?.domain || 'domain n/a'})` })
      } catch (err) {
        if (!active) return
        setDiag({ loading: false, ok: false, message: `Auth-Check fehlgeschlagen: ${err?.message || 'Unbekannter Fehler'}` })
      }
    }

    runDiag()

    return () => {
      active = false
    }
  }, [])

  async function startLogin() {
    setError('')
    setLoading(true)
    try {
      await login({ returnTo })
    } catch (err) {
      setError(err?.message || 'Login fehlgeschlagen')
      setLoading(false)
    }
  }

  return (
    <section style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f8fafc', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: 420, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.2rem', display: 'grid', gap: '0.8rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>Claimsfox Login</h1>
        <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem' }}>Bitte anmelden, um die Anwendung zu öffnen.</p>
        {diag.loading ? <div style={{ color: '#475569', fontSize: '0.82rem' }}>Prüfe Auth-Konfiguration...</div> : null}
        {!diag.loading ? (
          <div style={{ color: diag.ok ? '#166534' : '#b91c1c', fontSize: '0.82rem' }}>
            {diag.message}
          </div>
        ) : null}
        {error ? <div style={{ color: '#b91c1c', fontSize: '0.82rem' }}>{error}</div> : null}
        <button disabled={loading} onClick={startLogin} type="button" style={buttonStyle}>{loading ? 'Weiterleitung...' : 'Mit Auth0 anmelden'}</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.6rem', fontSize: '0.84rem' }}>
          <Link to="/forgot-password">Passwort vergessen?</Link>
          <Link to="/signup" style={{ fontWeight: 600 }}>Registrieren</Link>
        </div>
      </div>
    </section>
  )
}

const buttonStyle = {
  height: 40,
  border: '1px solid #0f172a',
  borderRadius: 10,
  background: '#0f172a',
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer'
}
