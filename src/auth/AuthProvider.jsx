import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(undefined)

const TOKEN_STORAGE_KEY = 'cf_auth_token'
const REFRESH_STORAGE_KEY = 'cf_refresh_token'
const EXP_STORAGE_KEY = 'cf_token_exp'
const USER_STORAGE_KEY = 'cf_user'

const OAUTH_VERIFIER_KEY = 'cf_oauth_verifier'
const OAUTH_STATE_KEY = 'cf_oauth_state'
const OAUTH_RETURN_TO_KEY = 'cf_oauth_return_to'

const ROLE_ORDER = {
  mitarbeiter: 1,
  management: 2,
  'c-level': 3
}

let auth0ConfigCache = null
const AUTH_FETCH_TIMEOUT_MS = 12000

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
  if (!token || !exp || !user) return null
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
  if (session.refreshToken) window.localStorage.setItem(REFRESH_STORAGE_KEY, session.refreshToken)
  else window.localStorage.removeItem(REFRESH_STORAGE_KEY)
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

function base64UrlEncode(inputBuffer) {
  const bytes = inputBuffer instanceof Uint8Array ? inputBuffer : new Uint8Array(inputBuffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i += 1) binary += String.fromCharCode(bytes[i])
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function randomString(size = 48) {
  const bytes = new Uint8Array(size)
  window.crypto.getRandomValues(bytes)
  return base64UrlEncode(bytes)
}

async function sha256(text) {
  const data = new TextEncoder().encode(text)
  return window.crypto.subtle.digest('SHA-256', data)
}

function decodeJwt(token) {
  const [, payload = ''] = String(token || '').split('.')
  if (!payload) return {}
  const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=')
  const json = atob(padded)
  return safeJsonParse(json) || {}
}

function mapRolesFromClaims(claims) {
  const namespaceRoles = claims?.['https://claimsfox.com/roles']
  const topRoles = claims?.roles
  const appMetaRoles = claims?.app_metadata?.roles
  return normalizeRoles(namespaceRoles || topRoles || appMetaRoles || [])
}

function mapUserFromClaims(claims) {
  const roles = mapRolesFromClaims(claims)
  return {
    id: claims?.sub || '',
    email: claims?.email || '',
    username: claims?.name || claims?.email || '',
    fullName: claims?.name || '',
    roles,
    app_metadata: { roles },
    user_metadata: { full_name: claims?.name || '' }
  }
}

async function loadAuth0Config() {
  if (auth0ConfigCache) return auth0ConfigCache
  const res = await fetchWithTimeout('/api/auth-config', { method: 'GET' }, AUTH_FETCH_TIMEOUT_MS)
  const payload = await res.json().catch(() => ({}))
  if (!res.ok || !payload?.ok) {
    const msg = payload?.error?.message || 'Auth-Konfiguration konnte nicht geladen werden.'
    throw new Error(msg)
  }
  auth0ConfigCache = payload.config
  return auth0ConfigCache
}

async function fetchWithTimeout(input, init = {}, timeoutMs = AUTH_FETCH_TIMEOUT_MS) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(input, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timeout)
  }
}

async function tokenRequest(domain, body) {
  let response
  try {
    response = await fetchWithTimeout(`https://${domain}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }, AUTH_FETCH_TIMEOUT_MS)
  } catch (err) {
    const message = err?.name === 'AbortError' ? 'Auth0 request timeout' : `Auth0 request failed: ${err?.message || 'unknown error'}`
    throw new Error(message)
  }
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    const message = payload?.error_description || payload?.error || `Token request failed (${response.status})`
    const err = new Error(message)
    err.status = response.status
    throw err
  }
  return payload
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
    if (!current?.refreshToken) throw new Error('Kein Refresh-Token vorhanden')
    const cfg = await loadAuth0Config()
    const refreshed = await tokenRequest(cfg.domain, {
      grant_type: 'refresh_token',
      client_id: cfg.clientId,
      refresh_token: current.refreshToken
    })

    const idClaims = decodeJwt(refreshed.id_token || '')
    const next = {
      token: refreshed.access_token,
      refreshToken: refreshed.refresh_token || current.refreshToken,
      exp: nowSeconds() + Number(refreshed.expires_in || 3600),
      user: mapUserFromClaims(idClaims)
    }
    applySession(next)
    return next
  }, [applySession])

  const ensureValidToken = useCallback(async () => {
    const current = session || readSession()
    if (!current?.token) return null
    if (current.exp - nowSeconds() > 90) return current.token
    const refreshed = await refresh()
    return refreshed.token
  }, [refresh, session])

  const getToken = useCallback(async () => ensureValidToken(), [ensureValidToken])

  const getRoles = useCallback(() => normalizeRoles(user?.roles), [user])

  const hasRole = useCallback((role) => hasAtLeastRole(getRoles(), role), [getRoles])

  const initializeAccessRequest = useCallback(async (tokenOverride) => {
    const token = tokenOverride || (await ensureValidToken())
    if (!token) return
    try {
      await fetch('/api/auth-init', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch {
      // no-op
    }
  }, [ensureValidToken])

  const startAuth = useCallback(async ({ mode = 'login', returnTo = '/dashboard' } = {}) => {
    const cfg = await loadAuth0Config()
    const state = randomString(24)
    const verifier = randomString(64)
    const challenge = base64UrlEncode(await sha256(verifier))

    sessionStorage.setItem(OAUTH_STATE_KEY, state)
    sessionStorage.setItem(OAUTH_VERIFIER_KEY, verifier)
    sessionStorage.setItem(OAUTH_RETURN_TO_KEY, returnTo)

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: cfg.clientId,
      redirect_uri: cfg.redirectUri,
      scope: 'openid profile email offline_access',
      state,
      code_challenge: challenge,
      code_challenge_method: 'S256'
    })
    if (cfg.audience) params.set('audience', cfg.audience)

    if (mode === 'signup') params.set('screen_hint', 'signup')

    window.location.assign(`https://${cfg.domain}/authorize?${params.toString()}`)
  }, [])

  const login = useCallback(async (emailOrOptions) => {
    const opts = typeof emailOrOptions === 'object' && emailOrOptions ? emailOrOptions : {}
    await startAuth({ mode: 'login', returnTo: opts.returnTo || '/dashboard' })
  }, [startAuth])

  const signup = useCallback(async ({ returnTo } = {}) => {
    await startAuth({ mode: 'signup', returnTo: returnTo || '/dashboard' })
  }, [startAuth])

  const handleAuthCallback = useCallback(async (search) => {
    const params = new URLSearchParams(search || window.location.search)
    const code = params.get('code')
    const state = params.get('state')
    const error = params.get('error')
    const errorDescription = params.get('error_description')

    if (error) throw new Error(errorDescription || error)
    if (!code || !state) throw new Error('Ungültiger OAuth Callback')

    const expectedState = sessionStorage.getItem(OAUTH_STATE_KEY)
    const verifier = sessionStorage.getItem(OAUTH_VERIFIER_KEY)
    const returnTo = sessionStorage.getItem(OAUTH_RETURN_TO_KEY) || '/dashboard'

    if (!expectedState || state !== expectedState || !verifier) {
      throw new Error('OAuth-Statusprüfung fehlgeschlagen')
    }

    const cfg = await loadAuth0Config()
    const payload = await tokenRequest(cfg.domain, {
      grant_type: 'authorization_code',
      client_id: cfg.clientId,
      code_verifier: verifier,
      code,
      redirect_uri: cfg.redirectUri
    })

    const claims = decodeJwt(payload.id_token || '')
    const next = {
      token: payload.access_token,
      refreshToken: payload.refresh_token,
      exp: nowSeconds() + Number(payload.expires_in || 3600),
      user: mapUserFromClaims(claims)
    }

    applySession(next)
    sessionStorage.removeItem(OAUTH_STATE_KEY)
    sessionStorage.removeItem(OAUTH_VERIFIER_KEY)
    sessionStorage.removeItem(OAUTH_RETURN_TO_KEY)

    if ((next.user?.roles || []).length === 0) {
      await initializeAccessRequest(next.token)
    }

    return { returnTo }
  }, [applySession, initializeAccessRequest])

  const logout = useCallback(async () => {
    const cfg = await loadAuth0Config().catch(() => null)
    clearSession()
    if (cfg?.domain) {
      const params = new URLSearchParams({
        client_id: cfg.clientId,
        returnTo: `${window.location.origin}/login`
      })
      window.location.assign(`https://${cfg.domain}/v2/logout?${params.toString()}`)
    }
  }, [clearSession])

  const forgotPassword = useCallback(async (email) => {
    const cfg = await loadAuth0Config()
    const params = new URLSearchParams({
      client_id: cfg.clientId,
      email: String(email || '').trim()
    })
    window.location.assign(`https://${cfg.domain}/lo/reset?${params.toString()}`)
    return { ok: true }
  }, [])

  const resetPassword = useCallback(async () => {
    const cfg = await loadAuth0Config()
    window.location.assign(`https://${cfg.domain}/lo/reset?client_id=${encodeURIComponent(cfg.clientId)}`)
    return { ok: true }
  }, [])

  useEffect(() => {
    let mounted = true

    async function bootstrap() {
      const existing = readSession()
      if (!existing) {
        if (mounted) {
          clearSession()
          setAuthReady(true)
        }
        return
      }

      try {
        const token = existing.exp - nowSeconds() > 90 ? existing.token : (await refresh()).token
        const current = readSession()
        if (mounted && current) applySession({ ...current, token })
        const currentRoles = normalizeRoles(current?.user?.roles)
        if (mounted && currentRoles.length === 0) {
          await initializeAccessRequest(token)
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
  }, [applySession, clearSession, initializeAccessRequest, refresh])

  const value = useMemo(() => ({
    authReady,
    isAuthenticated,
    user,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    handleAuthCallback,
    getToken,
    getRoles,
    hasRole
  }), [authReady, isAuthenticated, user, login, signup, logout, forgotPassword, resetPassword, handleAuthCallback, getToken, getRoles, hasRole])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
