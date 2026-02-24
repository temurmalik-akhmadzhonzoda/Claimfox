const { requireRole, auth0ManagementRequest, sanitizeRoles, json, error, rateLimit } = require('./_utils')

function mapUser(user) {
  return {
    id: user.user_id,
    email: user.email,
    name: user.name || user.nickname || user.email,
    roles: sanitizeRoles(user?.app_metadata?.roles || []),
    created_at: user.created_at,
    user_id: user.user_id
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') return error(405, 'method_not_allowed', 'Only GET allowed')

  const auth = await requireRole(event, 'c-level')
  if (!auth.ok) return auth.response

  const ip = event.headers['x-nf-client-connection-ip'] || 'unknown'
  if (!rateLimit(`admin-users:${ip}`, 30, 60_000)) return error(429, 'rate_limited', 'Too many requests')

  try {
    const users = await auth0ManagementRequest({
      path: '/users?include_totals=false&per_page=100&page=0&fields=user_id,email,name,nickname,app_metadata,created_at&include_fields=true'
    })
    return json(200, { ok: true, users: Array.isArray(users) ? users.map(mapUser) : [] })
  } catch (e) {
    return error(500, 'admin_users_failed', 'Could not load users', { message: e.message })
  }
}
