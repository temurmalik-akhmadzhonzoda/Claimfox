import React, { useState } from 'react'
import { Location, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../auth/AuthContext'

type LocationState = {
  from?: Location
}

export default function LoginPage() {
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState | null
  const redirectTarget = state?.from?.pathname || '/exec-select'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)
    if (!username.trim() || !password.trim()) {
      setError(t('auth.errorRequired', 'Username and password are required'))
      return
    }

    setLoading(true)
    try {
      await login(username, password)
      navigate(redirectTarget, { replace: true })
    } catch (err) {
      setError(t('auth.errorInvalid', 'Invalid credentials'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page login-page">
      <h1>{t('auth.title', 'Sign in')}</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          {t('auth.username', 'Username')}
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
          />
        </label>
        <label>
          {t('auth.password', 'Password')}
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </label>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? t('auth.signing', 'Signing in…') : t('auth.signin', 'Sign in')}
        </button>
      </form>
    </div>
  )
}
