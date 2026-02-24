import React, { useEffect, useState } from 'react'
import { useNetlifyApi } from '@/api/netlify'

const ALL_ROLES = ['mitarbeiter', 'management', 'c-level']

export default function Admin() {
  const api = useNetlifyApi()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState('')

  async function loadUsers() {
    setError('')
    setLoading(true)
    try {
      const response = await api.get('/api/admin-users')
      setUsers(response.users || [])
    } catch (err) {
      setError(err?.message || 'Nutzer konnten nicht geladen werden')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  async function toggleRole(user, role) {
    const current = new Set(user.roles || [])
    if (current.has(role)) current.delete(role)
    else current.add(role)

    setBusyId(user.id)
    try {
      await api.post('/api/admin-roles', {
        userId: user.id,
        roles: Array.from(current)
      })
      await loadUsers()
    } catch (err) {
      setError(err?.message || 'Rolle konnte nicht gespeichert werden')
    } finally {
      setBusyId('')
    }
  }

  return (
    <section style={{ minHeight: '100vh', padding: '1rem' }}>
      <h1>Admin – User & Rollen</h1>
      {loading ? <p>Lade Nutzer...</p> : null}
      {error ? <p style={{ color: '#b91c1c' }}>{error}</p> : null}
      <div style={{ display: 'grid', gap: '0.7rem' }}>
        {users.map((user) => (
          <article key={user.id} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: '0.7rem' }}>
            <div><strong>{user.email}</strong></div>
            <div style={{ fontSize: '0.85rem', color: '#475569' }}>id: {user.id}</div>
            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
              {ALL_ROLES.map((role) => {
                const active = (user.roles || []).includes(role)
                return (
                  <button
                    key={`${user.id}-${role}`}
                    disabled={busyId === user.id}
                    onClick={() => toggleRole(user, role)}
                    style={{
                      border: `1px solid ${active ? '#0f172a' : '#cbd5e1'}`,
                      background: active ? '#0f172a' : '#fff',
                      color: active ? '#fff' : '#0f172a',
                      borderRadius: 999,
                      padding: '0.22rem 0.55rem',
                      fontSize: '0.78rem',
                      cursor: 'pointer'
                    }}
                  >
                    {role}
                  </button>
                )
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
