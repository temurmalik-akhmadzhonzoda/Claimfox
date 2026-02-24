const { requireAuth, getRoles, sanitizeRoles, callNetlifyAdmin, json, error, rateLimit } = require('./_utils')

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return error(405, 'method_not_allowed', 'Only POST allowed')
  }

  const ip = event.headers['x-nf-client-connection-ip'] || 'unknown'
  if (!rateLimit(`auth-init:${ip}`, 20, 60_000)) {
    return error(429, 'rate_limited', 'Too many requests')
  }

  const auth = requireAuth(context)
  if (!auth.ok) return auth.response

  const user = auth.user
  const currentRoles = getRoles(user)
  if (currentRoles.length > 0) {
    return json(200, { ok: true, roles: currentRoles, initialized: false })
  }

  const token = process.env.NETLIFY_AUTH_TOKEN
  const siteId = process.env.NETLIFY_SITE_ID

  if (!token || !siteId) {
    return error(500, 'server_config_error', 'NETLIFY_AUTH_TOKEN/NETLIFY_SITE_ID missing')
  }

  const userId = user.sub || user.id
  if (!userId) return error(400, 'invalid_user', 'User id missing')

  try {
    const roles = sanitizeRoles(['mitarbeiter'])
    await callNetlifyAdmin({
      token,
      siteId,
      method: 'PUT',
      path: `/identity/users/${encodeURIComponent(userId)}`,
      body: { app_metadata: { roles } }
    })

    return json(200, { ok: true, roles, initialized: true })
  } catch (e) {
    return error(500, 'role_init_failed', 'Could not initialize default role', { message: e.message })
  }
}
