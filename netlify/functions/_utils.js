const {
  ROLE_ORDER,
  ROLE_VALUES,
  sanitizeRoles,
  hasAtLeastRole,
  getAuth0Config,
  getBearerToken,
  requireAuth,
  requireRole,
  requireAnyRole,
  firstEnv
} = require('./_auth0')

const rates = new Map()
let mgmtTokenCache = { token: '', exp: 0 }

function json(statusCode, payload) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    },
    body: JSON.stringify(payload)
  }
}

function error(statusCode, code, message, details) {
  return json(statusCode, {
    ok: false,
    error: {
      code,
      message,
      details: details || null
    }
  })
}

function rateLimit(key, limit = 30, windowMs = 60_000) {
  const now = Date.now()
  const item = rates.get(key)
  if (!item || now - item.ts > windowMs) {
    rates.set(key, { count: 1, ts: now })
    return true
  }
  if (item.count >= limit) return false
  item.count += 1
  return true
}

async function getAuth0ManagementToken() {
  const now = Math.floor(Date.now() / 1000)
  if (mgmtTokenCache.token && mgmtTokenCache.exp - now > 60) return mgmtTokenCache.token

  const domain = firstEnv('AUTH0_MGMT_DOMAIN') || firstEnv('AUTH0_DOMAIN', 'VITE_AUTH0_DOMAIN', 'REACT_APP_AUTH0_DOMAIN', 'NEXT_PUBLIC_AUTH0_DOMAIN')
  const clientId = firstEnv('AUTH0_MGMT_CLIENT_ID')
  const clientSecret = firstEnv('AUTH0_MGMT_CLIENT_SECRET')
  const audience = firstEnv('AUTH0_MGMT_AUDIENCE') || (domain ? `https://${domain}/api/v2/` : '')

  if (!domain || !clientId || !clientSecret || !audience) {
    throw new Error('AUTH0_MGMT_DOMAIN/CLIENT_ID/CLIENT_SECRET/AUDIENCE missing')
  }

  const res = await fetch(`https://${domain}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      audience
    })
  })

  const payload = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(payload?.error_description || payload?.error || `Mgmt token failed (${res.status})`)

  mgmtTokenCache = {
    token: payload.access_token,
    exp: now + Number(payload.expires_in || 3600)
  }

  return mgmtTokenCache.token
}

async function auth0ManagementRequest({ method = 'GET', path, body }) {
  const domain = firstEnv('AUTH0_MGMT_DOMAIN') || firstEnv('AUTH0_DOMAIN', 'VITE_AUTH0_DOMAIN', 'REACT_APP_AUTH0_DOMAIN', 'NEXT_PUBLIC_AUTH0_DOMAIN')
  if (!domain) throw new Error('AUTH0 domain missing')

  const token = await getAuth0ManagementToken()
  const res = await fetch(`https://${domain}/api/v2${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  })

  if (!res.ok) {
    const msg = await res.text().catch(() => '')
    throw new Error(`Auth0 Management API failed (${res.status}) ${msg.slice(0, 300)}`)
  }

  return res.json().catch(() => ({}))
}

module.exports = {
  ROLE_ORDER,
  ROLE_VALUES,
  json,
  error,
  sanitizeRoles,
  hasAtLeastRole,
  rateLimit,
  getAuth0Config,
  getBearerToken,
  requireAuth,
  requireRole,
  requireAnyRole,
  auth0ManagementRequest
}
