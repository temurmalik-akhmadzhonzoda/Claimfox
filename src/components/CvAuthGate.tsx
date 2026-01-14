import React, { useMemo, useState } from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const AUTH_KEY = 'cf_cv_auth'

type CvAuthGateProps = {
  children: React.ReactNode
}

export default function CvAuthGate({ children }: CvAuthGateProps) {
  const [isAuthed, setIsAuthed] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(AUTH_KEY) === 'true'
  })
  const [username, setUsername] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  const isValid = useMemo(() => username.trim().toLowerCase() === 'ralf' && pin.trim() === '210683', [username, pin])

  function handleLogin(event: React.FormEvent) {
    event.preventDefault()
    if (!isValid) {
      setError('Zugangsdaten prüfen.')
      return
    }
    setError('')
    setIsAuthed(true)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(AUTH_KEY, 'true')
    }
  }

  if (!isAuthed) {
    return (
      <section className="page" style={{ gap: '2rem' }}>
        <div style={{ width: '100%', maxWidth: 520, margin: '0 auto' }}>
          <Header title="CV Zugriff" subtitle="Bitte Zugangsdaten eingeben, um fortzufahren." subtitleColor="#65748b" />
          <Card>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label className="form-field">
                Benutzername
                <input className="text-input" value={username} onChange={(event) => setUsername(event.target.value)} />
              </label>
              <label className="form-field">
                PIN
                <input
                  className="text-input"
                  type="password"
                  inputMode="numeric"
                  value={pin}
                  onChange={(event) => setPin(event.target.value)}
                />
              </label>
              {error && <span className="error-text">{error}</span>}
              <Button type="submit">Freigeben</Button>
            </form>
          </Card>
        </div>
      </section>
    )
  }

  return <>{children}</>
}
