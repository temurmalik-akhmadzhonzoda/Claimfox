const { requireRole, callNetlifyAdmin, json, error, rateLimit, sanitizeRoles } = require('./_utils')

function mapUser(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.full_name || user.email,
    roles: sanitizeRoles(user.app_metadata?.roles || []),
    created_at: user.created_at,
    user_id: user.id
  }
}

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') return error(405, 'method_not_allowed', 'Only GET allowed')

  const auth = requireRole(context, 'c-level')
  if (!auth.ok) return auth.response

  const ip = event.headers['x-nf-client-connection-ip'] || 'unknown'
  if (!rateLimit(`admin-users:${ip}`, 30, 60_000)) {
    return error(429, 'rate_limited', 'Too many requests')
  }

  const token = process.env.NETLIFY_AUTH_TOKEN
  const siteId = process.env.NETLIFY_SITE_ID
  if (!token || !siteId) return error(500, 'server_config_error', 'NETLIFY_AUTH_TOKEN/NETLIFY_SITE_ID missing')

  try {
    const result = await callNetlifyAdmin({ token, siteId, path: '/identity/users' })
    const users = Array.isArray(result.payload) ? result.payload : result.payload?.users || []
    return json(200, { ok: true, users: users.map(mapUser) })
  } catch (e) {
    return error(500, 'admin_users_failed', 'Could not load users', { message: e.message })
  }
}
