import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(undefined)

const TOKEN_STORAGE_KEY = 'cf_auth_token'
const REFRESH_STORAGE_KEY = 'cf_refresh_token'
const EXP_STORAGE_KEY = 'cf_token_exp'
const USER_STORAGE_KEY = 'cf_user'

const ROLE_ORDER = {
  mitarbeiter: 1,
  management: 2,
  'c-level': 3
}

function safeJsonParse(raw) {
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function nowSeconds() {
  return Math.floor(Date.now() / 1000)
}

function readSession() {
  if (typeof window === 'undefined') return null
  const token = window.localStorage.getItem(TOKEN_STORAGE_KEY)
  const refreshToken = window.localStorage.getItem(REFRESH_STORAGE_KEY)
  const exp = Number(window.localStorage.getItem(EXP_STORAGE_KEY) || 0)
  const user = safeJsonParse(window.localStorage.getItem(USER_STORAGE_KEY) || '')
  if (!token || !refreshToken || !exp || !user) return null
  return { token, refreshToken, exp, user }
}

function persistSession(session) {
  if (typeof window === 'undefined') return
  if (!session) {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY)
    window.localStorage.removeItem(REFRESH_STORAGE_KEY)
    window.localStorage.removeItem(EXP_STORAGE_KEY)
    window.localStorage.removeItem(USER_STORAGE_KEY)
    return
  }
  window.localStorage.setItem(TOKEN_STORAGE_KEY, session.token)
  window.localStorage.setItem(REFRESH_STORAGE_KEY, session.refreshToken)
  window.localStorage.setItem(EXP_STORAGE_KEY, String(session.exp))
  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(session.user))
}

function normalizeRoles(rawRoles) {
  if (!Array.isArray(rawRoles)) return []
  return rawRoles.filter((role) => role in ROLE_ORDER)
}

function hasAtLeastRole(userRoles, requiredRole) {
  const requiredWeight = ROLE_ORDER[requiredRole] ?? Number.MAX_SAFE_INTEGER
  return userRoles.some((role) => (ROLE_ORDER[role] ?? 0) >= requiredWeight)
}

async function identityRequest(path, options = {}) {
  let response
  try {
    response = await fetch(`/.netlify/identity${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    })
  } catch (networkErr) {
    const err = new Error('Identity-Service nicht erreichbar. Bitte später erneut versuchen.')
    err.cause = networkErr
    throw err
  }

  if (!response.ok) {
    const payload = await response.json().catch(() => ({ error: 'request_failed' }))
    const isIdentityAvailabilityError = response.status === 404 || response.status === 405
    const message = isIdentityAvailabilityError
      ? 'Registrierung aktuell nicht verfügbar. Bitte Netlify Identity aktivieren und Redirect-Regeln für /.netlify/identity/* prüfen.'
      : (payload?.error_description || payload?.msg || payload?.error || `Request failed (${response.status})`)
    const err = new Error(message)
    err.status = response.status
    err.payload = payload
    throw err
  }

  return response.json().catch(() => ({}))
}

function mapIdentityUser(raw) {
  const roles = normalizeRoles(raw?.app_metadata?.roles)
  return {
    id: raw?.id || raw?.sub || '',
    email: raw?.email || '',
    username: raw?.user_metadata?.full_name || raw?.email || '',
    fullName: raw?.user_metadata?.full_name || '',
    roles,
    app_metadata: raw?.app_metadata || {},
    user_metadata: raw?.user_metadata || {}
  }
}

export function AuthProvider({ children }) {
  const [authReady, setAuthReady] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)

  const applySession = useCallback((nextSession) => {
    setSession(nextSession)
    setIsAuthenticated(Boolean(nextSession?.token))
    setUser(nextSession?.user || null)
    persistSession(nextSession)
  }, [])

  const clearSession = useCallback(() => {
    applySession(null)
  }, [applySession])

  const refresh = useCallback(async () => {
    const current = readSession()
    if (!current?.refreshToken) throw new Error('No refresh token')
    const refreshed = await identityRequest('/token', {
      method: 'POST',
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token: current.refreshToken
      })
    })

    const token = refreshed.access_token
    const refreshToken = refreshed.refresh_token || current.refreshToken
    const exp = Number(refreshed.expires_at || nowSeconds() + Number(refreshed.expires_in || 3600))
    const userData = await identityRequest('/user', {
      headers: { Authorization: `Bearer ${token}` }
    })

    const mappedUser = mapIdentityUser(userData)
    const next = { token, refreshToken, exp, user: mappedUser }
    applySession(next)
    return next
  }, [applySession])

  const ensureValidToken = useCallback(async () => {
    const current = session || readSession()
    if (!current?.token) return null
    const expiresIn = current.exp - nowSeconds()
    if (expiresIn > 90) return current.token
    const refreshed = await refresh()
    return refreshed.token
  }, [refresh, session])

  const getToken = useCallback(async () => {
    return ensureValidToken()
  }, [ensureValidToken])

  const getRoles = useCallback(() => normalizeRoles(user?.roles), [user])

  const hasRole = useCallback((role) => hasAtLeastRole(getRoles(), role), [getRoles])

  const initializeRoles = useCallback(async () => {
    const token = await ensureValidToken()
    if (!token) return
    try {
      const result = await fetch('/.netlify/functions/auth-init', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (result.ok) {
        const payload = await result.json().catch(() => ({}))
        if (Array.isArray(payload.roles)) {
          const nextUser = { ...(session?.user || user || {}), roles: normalizeRoles(payload.roles) }
          const current = session || readSession()
          if (current) applySession({ ...current, user: nextUser })
        }
      }
    } catch {
      // no-op: role bootstrap errors are handled server-side during secured calls
    }
  }, [applySession, ensureValidToken, session, user])

  const signup = useCallback(async ({ email, password, fullName }) => {
    await identityRequest('/signup', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        data: fullName ? { full_name: fullName } : {}
      })
    })
    return { ok: true }
  }, [])

  const login = useCallback(async (email, password) => {
    const payload = await identityRequest('/token', {
      method: 'POST',
      body: JSON.stringify({
        grant_type: 'password',
        username: email,
        password
      })
    })

    const token = payload.access_token
    const refreshToken = payload.refresh_token
    const exp = Number(payload.expires_at || nowSeconds() + Number(payload.expires_in || 3600))
    const userData = await identityRequest('/user', {
      headers: { Authorization: `Bearer ${token}` }
    })

    const mappedUser = mapIdentityUser(userData)
    const next = { token, refreshToken, exp, user: mappedUser }
    applySession(next)

    await initializeRoles()

    return next
  }, [applySession, initializeRoles])

  const logout = useCallback(async () => {
    const token = session?.token || readSession()?.token
    try {
      if (token) {
        await fetch('/.netlify/identity/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        })
      }
    } finally {
      clearSession()
    }
  }, [clearSession, session])

  const forgotPassword = useCallback(async (email) => {
    await identityRequest('/recover', {
      method: 'POST',
      body: JSON.stringify({ email })
    })
    return { ok: true }
  }, [])

  const resetPassword = useCallback(async ({ token, password }) => {
    await identityRequest('/recover', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ password })
    })
    return { ok: true }
  }, [])

  useEffect(() => {
    let mounted = true

    async function bootstrap() {
      const existing = readSession()
      if (!existing) {
        if (mounted) {
          setAuthReady(true)
          clearSession()
        }
        return
      }

      try {
        const token = existing.exp - nowSeconds() > 90 ? existing.token : (await refresh()).token
        const userData = await identityRequest('/user', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const next = {
          token,
          refreshToken: existing.refreshToken,
          exp: existing.exp,
          user: mapIdentityUser(userData)
        }
        if (mounted) {
          applySession(next)
          await initializeRoles()
        }
      } catch {
        if (mounted) clearSession()
      } finally {
        if (mounted) setAuthReady(true)
      }
    }

    bootstrap()

    return () => {
      mounted = false
    }
  }, [applySession, clearSession, initializeRoles, refresh])

  const value = useMemo(() => ({
    authReady,
    isAuthenticated,
    user,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    getToken,
    getRoles,
    hasRole
  }), [authReady, isAuthenticated, user, login, signup, logout, forgotPassword, resetPassword, getToken, getRoles, hasRole])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
