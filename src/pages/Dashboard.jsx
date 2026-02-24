import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/auth/AuthProvider'

export default function Dashboard() {
  const { user, getRoles, logout } = useAuth()
  return (
    <section style={{ minHeight: '100vh', padding: '1rem', background: '#fff' }}>
      <h1>Dashboard</h1>
      <p>User: {user?.email || '-'}</p>
      <p>Rollen: {getRoles().join(', ') || '-'}</p>
      <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
        <Link to="/mitarbeiter">Mitarbeiter</Link>
        <Link to="/management">Management</Link>
        <Link to="/c-level">C-Level</Link>
        <Link to="/admin">Admin</Link>
      </div>
      <button style={{ marginTop: 12 }} onClick={logout}>Logout</button>
    </section>
  )
}
