import React, { createContext, useCallback, useContext, useMemo } from 'react'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import { useLocation, useNavigate } from 'react-router-dom'

const AuthContext = createContext(undefined)

const ROLE_ORDER = {
  mitarbeiter: 1,
  management: 2,
  'c-level': 3
}

function getAuthConfig() {
  const domain =
    import.meta.env.VITE_AUTH0_DOMAIN ||
    import.meta.env.AUTH0_DOMAIN ||
    ''

  const clientId =
    import.meta.env.VITE_AUTH0_CLIENT_ID ||
    import.meta.env.AUTH0_CLIENT_ID ||
    ''

  const audience =
    import.meta.env.VITE_AUTH0_AUDIENCE ||
    import.meta.env.AUTH0_AUDIENCE ||
    ''

  const rolesClaim =
    import.meta.env.VITE_AUTH0_ROLES_CLAIM ||
    import.meta.env.AUTH0_ROLES_CLAIM ||
    'https://claimsfox.com/roles'

  return {
    domain,
    clientId,
    audience: audience || undefined,
    rolesClaim,
    isConfigured: Boolean(domain && clientId)
  }
}

function AuthConfigError() {
  return (
    <section style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#fff', padding: '1rem' }}>
      <div style={{ maxWidth: 700, width: '100%', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1rem', background: '#fff' }}>
        <h1 style={{ margin: 0, marginBottom: '0.5rem', color: '#0f172a', fontSize: '1.1rem' }}>Authentication Configuration Error</h1>
        <p style={{ margin: 0, color: '#334155', fontSize: '0.92rem' }}>
          Auth0 configuration missing. Please check Netlify environment variables.
        </p>
      </div>
    </section>
  )
}

function normalizeRoles(rawRoles) {
  if (!Array.isArray(rawRoles)) return []
  return rawRoles.filter((role) => role in ROLE_ORDER)
}

function hasAtLeastRole(userRoles, requiredRole) {
  const requiredWeight = ROLE_ORDER[requiredRole] ?? Number.MAX_SAFE_INTEGER
  return userRoles.some((role) => (ROLE_ORDER[role] ?? 0) >= requiredWeight)
}

function mapRoles(user, claimName) {
  const rolesFromClaim = user?.[claimName]
  const rolesFromPlain = user?.roles
  const rolesFromAppMeta = user?.app_metadata?.roles
  return normalizeRoles(rolesFromClaim || rolesFromPlain || rolesFromAppMeta || [])
}

function AuthBridge({ children }) {
  const location = useLocation()
  const {
    isLoading,
    isAuthenticated,
    user: auth0User,
    loginWithRedirect,
    logout: auth0Logout,
    getAccessTokenSilently
  } = useAuth0()

  const { domain, clientId, audience, rolesClaim } = getAuthConfig()
  const roles = mapRoles(auth0User, rolesClaim)

  const login = useCallback(async ({ returnTo } = {}) => {
    const target = returnTo || `${location.pathname}${location.search}${location.hash}` || '/dashboard'
    await loginWithRedirect({ appState: { returnTo: target } })
  }, [location.hash, location.pathname, location.search, loginWithRedirect])

  const signup = useCallback(async ({ returnTo } = {}) => {
    const target = returnTo || '/dashboard'
    await loginWithRedirect({
      appState: { returnTo: target },
      authorizationParams: {
        screen_hint: 'signup'
      }
    })
  }, [loginWithRedirect])

  const logout = useCallback(async () => {
    auth0Logout({ logoutParams: { returnTo: `${window.location.origin}/login` } })
  }, [auth0Logout])

  const forgotPassword = useCallback(async (email) => {
    const params = new URLSearchParams({
      client_id: clientId
    })
    if (email?.trim()) params.set('email', email.trim())
    window.location.assign(`https://${domain}/u/reset-password?${params.toString()}`)
    return { ok: true }
  }, [clientId, domain])

  const resetPassword = useCallback(async () => {
    const params = new URLSearchParams({ client_id: clientId })
    window.location.assign(`https://${domain}/u/reset-password?${params.toString()}`)
    return { ok: true }
  }, [clientId, domain])

  const getToken = useCallback(async () => {
    if (!isAuthenticated) return null
    return getAccessTokenSilently({
      authorizationParams: audience ? { audience } : undefined
    })
  }, [audience, getAccessTokenSilently, isAuthenticated])

  const getRoles = useCallback(() => roles, [roles])

  const hasRole = useCallback((role) => hasAtLeastRole(roles, role), [roles])

  const mappedUser = useMemo(() => {
    if (!auth0User) return null
    return {
      id: auth0User.sub || '',
      email: auth0User.email || '',
      username: auth0User.nickname || auth0User.name || auth0User.email || '',
      fullName: auth0User.name || '',
      roles,
      app_metadata: { roles },
      user_metadata: { full_name: auth0User.name || '' }
    }
  }, [auth0User, roles])

  const value = useMemo(() => ({
    authReady: !isLoading,
    isAuthenticated,
    user: mappedUser,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    getToken,
    getRoles,
    hasRole
  }), [isLoading, isAuthenticated, mappedUser, login, signup, logout, forgotPassword, resetPassword, getToken, getRoles, hasRole])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function Auth0ProviderWithNavigate({ children }) {
  const navigate = useNavigate()
  const { domain, clientId, audience } = getAuthConfig()

  const onRedirectCallback = useCallback((appState) => {
    const target = appState?.returnTo || '/dashboard'
    navigate(target, { replace: true })
  }, [navigate])

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      cacheLocation="memory"
      useRefreshTokens={false}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/callback`,
        audience,
        scope: 'openid profile email'
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}

export function AuthProvider({ children }) {
  const config = getAuthConfig()
  if (!config.isConfigured) return <AuthConfigError />

  return (
    <Auth0ProviderWithNavigate>
      <AuthBridge>{children}</AuthBridge>
    </Auth0ProviderWithNavigate>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
