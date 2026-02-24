const { requireRole, callNetlifyAdmin, json, error, rateLimit, sanitizeRoles } = require('./_utils')

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST' && event.httpMethod !== 'PATCH') {
    return error(405, 'method_not_allowed', 'Only POST/PATCH allowed')
  }

  const auth = requireRole(context, 'c-level')
  if (!auth.ok) return auth.response

  const ip = event.headers['x-nf-client-connection-ip'] || 'unknown'
  if (!rateLimit(`admin-roles:${ip}`, 30, 60_000)) return error(429, 'rate_limited', 'Too many requests')

  const token = process.env.NETLIFY_AUTH_TOKEN
  const siteId = process.env.NETLIFY_SITE_ID
  if (!token || !siteId) return error(500, 'server_config_error', 'NETLIFY_AUTH_TOKEN/NETLIFY_SITE_ID missing')

  let payload = {}
  try {
    payload = JSON.parse(event.body || '{}')
  } catch {
    return error(400, 'bad_request', 'Invalid JSON payload')
  }

  const userId = String(payload.userId || '').trim()
  const roles = sanitizeRoles(payload.roles)

  if (!userId) return error(400, 'bad_request', 'userId is required')

  try {
    await callNetlifyAdmin({
      token,
      siteId,
      method: 'PUT',
      path: `/identity/users/${encodeURIComponent(userId)}`,
      body: { app_metadata: { roles } }
    })

    return json(200, { ok: true, userId, roles })
  } catch (e) {
    return error(500, 'admin_roles_failed', 'Could not update roles', { message: e.message })
  }
}
