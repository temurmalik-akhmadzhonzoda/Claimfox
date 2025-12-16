import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useAuth } from '@/features/auth/AuthContext'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/roles', { replace: true })
    }
  }, [isAuthenticated, navigate])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (!username.trim() || !password.trim()) {
      setError('Benutzername und Passwort sind erforderlich.')
      return
    }

    setIsSubmitting(true)
    const success = login(username, password)
    if (success) {
      navigate('/roles', { replace: true })
    } else {
      setError('Ungültige Zugangsdaten. Bitte nutze Benutzername "Ralf" und Passwort "2106".')
    }
    setIsSubmitting(false)
  }

  return (
    <section
      className="page"
      style={{
        minHeight: 'calc(100vh - 150px)',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div style={{ width: '100%', maxWidth: 480 }}>
        <Header
          title="Melde dich im ClaimFox Portal an"
          subtitle="Nutze die Test-Zugangsdaten Ralf / 2106, um auf die Rollenverwaltung zuzugreifen."
        />
        <Card>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="form-field">
              Benutzername
              <input
                className="text-input"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
            <label className="form-field">
              Passwort
              <input
                className="text-input"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            {error && <p className="error-text">{error}</p>}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Anmeldung läuft...' : 'Login'}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  )
}
