import React, { useState } from 'react'
import { useAuth } from '@/auth/AuthProvider'
import { useNetlifyApi } from '@/api/netlify'

export default function AccessRequestPage() {
  const { user, getRoles, logout } = useAuth()
  const api = useNetlifyApi()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function sendRequest() {
    setLoading(true)
    setError('')
    setMessage('')
    try {
      const response = await api.post('/.netlify/functions/access-request', {})
      setMessage(response?.message || 'Anfrage gesendet.')
    } catch (err) {
      setError(err?.message || 'Anfrage fehlgeschlagen')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f8fafc', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: 660, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.2rem', display: 'grid', gap: '0.8rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.2rem', color: '#0f172a' }}>Zugriff wartet auf Freigabe</h1>
        <p style={{ margin: 0, color: '#334155' }}>
          Dein Account wurde erfolgreich erstellt, aber es wurde noch keine Rolle zugewiesen. Bis zur Freigabe durch C-Level/Administration sind keine Daten sichtbar.
        </p>
        <div style={{ fontSize: '0.9rem', color: '#475569' }}>
          <div><strong>User:</strong> {user?.email || '-'}</div>
          <div><strong>Rollen:</strong> {getRoles().join(', ') || '-'}</div>
        </div>
        {message ? <div style={{ color: '#166534', fontSize: '0.9rem' }}>{message}</div> : null}
        {error ? <div style={{ color: '#b91c1c', fontSize: '0.9rem' }}>{error}</div> : null}
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button onClick={sendRequest} disabled={loading} style={buttonStyle}>
            {loading ? 'Sende Anfrage...' : 'Freigabe anfordern'}
          </button>
          <button onClick={logout} style={secondaryButtonStyle}>Logout</button>
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
  padding: '0 0.8rem',
  cursor: 'pointer'
}

const secondaryButtonStyle = {
  height: 40,
  border: '1px solid #cbd5e1',
  borderRadius: 10,
  background: '#fff',
  color: '#0f172a',
  fontWeight: 600,
  padding: '0 0.8rem',
  cursor: 'pointer'
}
