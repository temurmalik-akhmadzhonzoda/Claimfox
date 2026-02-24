const ROLE_ORDER = {
  mitarbeiter: 1,
  management: 2,
  'c-level': 3
}

const rates = new Map()

function json(statusCode, payload) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
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

function getUser(context) {
  return context?.clientContext?.user || null
}

function getRoles(user) {
  const raw = user?.app_metadata?.roles
  if (!Array.isArray(raw)) return []
  return raw.filter((role) => ROLE_ORDER[role])
}

function hasAtLeastRole(roles, requiredRole) {
  const requiredWeight = ROLE_ORDER[requiredRole] || Number.MAX_SAFE_INTEGER
  return roles.some((role) => (ROLE_ORDER[role] || 0) >= requiredWeight)
}

function requireAuth(context) {
  const user = getUser(context)
  if (!user) {
    return { ok: false, response: error(401, 'unauthorized', 'Authentication required') }
  }
  return { ok: true, user }
}

function requireRole(context, minRole) {
  const auth = requireAuth(context)
  if (!auth.ok) return auth
  const roles = getRoles(auth.user)
  if (!hasAtLeastRole(roles, minRole)) {
    return { ok: false, response: error(403, 'forbidden', `Role '${minRole}' required`) }
  }
  return { ok: true, user: auth.user, roles }
}

function requireAnyRole(context, allowed) {
  const auth = requireAuth(context)
  if (!auth.ok) return auth
  const roles = getRoles(auth.user)
  const ok = allowed.some((role) => hasAtLeastRole(roles, role))
  if (!ok) {
    return { ok: false, response: error(403, 'forbidden', `Any role of [${allowed.join(', ')}] required`) }
  }
  return { ok: true, user: auth.user, roles }
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

function sanitizeRoles(roles) {
  if (!Array.isArray(roles)) return []
  const safe = []
  for (const role of roles) {
    if (ROLE_ORDER[role] && !safe.includes(role)) safe.push(role)
  }
  return safe
}

async function callNetlifyAdmin({ token, siteId, method = 'GET', path, body }) {
  const endpoints = [
    `https://api.netlify.com/api/v1/sites/${siteId}${path}`,
    `https://api.netlify.com/api/v1/${siteId}${path}`
  ]

  let lastError = null

  for (const url of endpoints) {
    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    })

    if (res.ok) {
      const payload = await res.json().catch(() => ({}))
      return { ok: true, payload }
    }

    const errBody = await res.text().catch(() => '')
    lastError = new Error(`Admin API failed (${res.status}) ${errBody}`)
  }

  throw lastError || new Error('Admin API call failed')
}

module.exports = {
  ROLE_ORDER,
  json,
  error,
  getUser,
  getRoles,
  hasAtLeastRole,
  requireAuth,
  requireRole,
  requireAnyRole,
  rateLimit,
  sanitizeRoles,
  callNetlifyAdmin
}
