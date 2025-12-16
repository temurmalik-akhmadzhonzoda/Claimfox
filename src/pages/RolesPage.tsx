import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useAuth } from '@/features/auth/AuthContext'

const ROLES = [
  { name: 'Schadenmanager', description: 'Verwalte offene Schadenfälle und priorisiere neue Aufgaben.' },
  { name: 'Partner Manager', description: 'Pflege Kontakte zu Gutachtern und Werkstätten.' },
  { name: 'Reporting', description: 'Erstelle Kennzahlen und Auswertungen für das Controlling.' }
]

export default function RolesPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/home', { replace: true })
  }

  return (
    <section className="page" style={{ gap: '2rem' }}>
      <Header
        title="Rollenübersicht"
        subtitle="Wähle eine Rolle aus, um weiterzuarbeiten. Diese Demo zeigt lediglich ein statisches Grid."
        actions={
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        }
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem'
        }}
      >
        {ROLES.map((role) => (
          <Card key={role.name} title={role.name}>
            <p style={{ marginTop: 0, color: '#494870', minHeight: '3rem' }}>{role.description}</p>
            <Button style={{ width: '100%' }}>Ansehen</Button>
          </Card>
        ))}
        <Card
          title="DE: Registrierung"
          subtitle="EN: Registration"
          interactive
          onClick={() => navigate('/registration')}
        >
          <p style={{ marginTop: 0, color: '#494870', minHeight: '3rem' }}>
            Starte die neue, KI-gestützte Journey und melde Partner oder Kund:innen komfortabel an.
          </p>
          <Button
            style={{ width: '100%' }}
            onClick={(event) => {
              event.stopPropagation()
              navigate('/registration')
            }}
          >
            Journey starten
          </Button>
        </Card>
      </div>
    </section>
  )
}
