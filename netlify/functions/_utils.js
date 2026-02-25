const crypto = require('node:crypto')

const ROLE_ORDER = {
  mitarbeiter: 1,
  management: 2,
  'c-level': 3
}

const ROLE_VALUES = Object.keys(ROLE_ORDER)
const rates = new Map()
let jwksCache = { issuer: '', ts: 0, keys: [] }
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

function firstEnv(...keys) {
  for (const key of keys) {
    const value = process.env[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return ''
}

function getAuth0Config() {
  const domain = firstEnv('AUTH0_DOMAIN', 'VITE_AUTH0_DOMAIN', 'REACT_APP_AUTH0_DOMAIN', 'NEXT_PUBLIC_AUTH0_DOMAIN')
  const issuerRaw = firstEnv('AUTH0_ISSUER', 'VITE_AUTH0_ISSUER', 'REACT_APP_AUTH0_ISSUER', 'NEXT_PUBLIC_AUTH0_ISSUER') || (domain ? `https://${domain}/` : '')
  const audience = firstEnv('AUTH0_AUDIENCE', 'VITE_AUTH0_AUDIENCE', 'REACT_APP_AUTH0_AUDIENCE', 'NEXT_PUBLIC_AUTH0_AUDIENCE')
  const rolesClaim = firstEnv('AUTH0_ROLES_CLAIM') || 'https://claimsfox.com/roles'
  const issuer = issuerRaw.endsWith('/') ? issuerRaw : `${issuerRaw}/`

  if (!domain || !issuer || !audience) {
    throw new Error('AUTH0_DOMAIN, AUTH0_ISSUER, AUTH0_AUDIENCE missing')
  }

  return { domain, issuer, audience, rolesClaim }
}

function sanitizeRoles(roles) {
  if (!Array.isArray(roles)) return []
  const safe = []
  for (const role of roles) {
    if (ROLE_ORDER[role] && !safe.includes(role)) safe.push(role)
  }
  return safe
}

function hasAtLeastRole(roles, requiredRole) {
  const requiredWeight = ROLE_ORDER[requiredRole] || Number.MAX_SAFE_INTEGER
  return roles.some((role) => (ROLE_ORDER[role] || 0) >= requiredWeight)
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

function getBearerToken(event) {
  const auth = event?.headers?.authorization || event?.headers?.Authorization || ''
  if (!auth.startsWith('Bearer ')) return ''
  return auth.slice('Bearer '.length).trim()
}

function b64urlDecode(input) {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=')
  return Buffer.from(padded, 'base64')
}

function parseJwt(token) {
  const parts = String(token || '').split('.')
  if (parts.length !== 3) throw new Error('Malformed JWT')
  const [h, p, s] = parts
  const header = JSON.parse(b64urlDecode(h).toString('utf8'))
  const payload = JSON.parse(b64urlDecode(p).toString('utf8'))
  const signature = b64urlDecode(s)
  return { header, payload, signature, signingInput: `${h}.${p}` }
}

async function getJwks(issuer) {
  const now = Date.now()
  if (jwksCache.issuer === issuer && now - jwksCache.ts < 10 * 60_000 && jwksCache.keys.length > 0) {
    return jwksCache.keys
  }

  const res = await fetch(`${issuer}.well-known/jwks.json`)
  if (!res.ok) throw new Error(`JWKS fetch failed (${res.status})`)
  const payload = await res.json().catch(() => ({}))
  const keys = Array.isArray(payload?.keys) ? payload.keys : []
  if (keys.length === 0) throw new Error('JWKS has no keys')

  jwksCache = { issuer, ts: now, keys }
  return keys
}

function verifyJwtSignature(parsed, jwk) {
  const alg = parsed.header?.alg
  if (alg !== 'RS256') throw new Error(`Unsupported alg ${alg}`)
  const publicKey = crypto.createPublicKey({ key: jwk, format: 'jwk' })
  return crypto.verify('RSA-SHA256', Buffer.from(parsed.signingInput), publicKey, parsed.signature)
}

function validateStandardClaims(payload, issuer, audience) {
  const now = Math.floor(Date.now() / 1000)
  if (payload?.iss !== issuer) throw new Error('Invalid issuer')
  const aud = payload?.aud
  const audOk = Array.isArray(aud) ? aud.includes(audience) : aud === audience
  if (!audOk) throw new Error('Invalid audience')
  if (typeof payload?.exp === 'number' && payload.exp < now - 30) throw new Error('Token expired')
  if (typeof payload?.nbf === 'number' && payload.nbf > now + 30) throw new Error('Token not active')
}

function extractRoles(payload, rolesClaim) {
  return sanitizeRoles(payload?.[rolesClaim] || payload?.roles || payload?.app_metadata?.roles || [])
}

async function verifyAccessToken(token) {
  const cfg = getAuth0Config()
  const parsed = parseJwt(token)
  const keys = await getJwks(cfg.issuer)
  const key = keys.find((k) => k.kid === parsed.header?.kid)
  if (!key) throw new Error('Signing key not found')
  if (!verifyJwtSignature(parsed, key)) throw new Error('Invalid signature')
  validateStandardClaims(parsed.payload, cfg.issuer, cfg.audience)
  const roles = extractRoles(parsed.payload, cfg.rolesClaim)

  return {
    user: {
      id: parsed.payload.sub || '',
      email: parsed.payload.email || '',
      name: parsed.payload.name || parsed.payload.email || '',
      roles,
      claims: parsed.payload
    },
    roles,
    claims: parsed.payload
  }
}

async function requireAuth(event) {
  const token = getBearerToken(event)
  if (!token) return { ok: false, response: error(401, 'unauthorized', 'Authentication required') }

  try {
    const auth = await verifyAccessToken(token)
    return { ok: true, ...auth, token }
  } catch (e) {
    return { ok: false, response: error(401, 'invalid_token', 'Invalid access token', { message: e.message }) }
  }
}

async function requireRole(event, minRole) {
  const auth = await requireAuth(event)
  if (!auth.ok) return auth
  if (!hasAtLeastRole(auth.roles, minRole)) {
    return { ok: false, response: error(403, 'forbidden', `Role '${minRole}' required`) }
  }
  return auth
}

async function requireAnyRole(event, allowed) {
  const auth = await requireAuth(event)
  if (!auth.ok) return auth
  const ok = allowed.some((role) => hasAtLeastRole(auth.roles, role))
  if (!ok) {
    return { ok: false, response: error(403, 'forbidden', `Any role of [${allowed.join(', ')}] required`) }
  }
  return auth
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
