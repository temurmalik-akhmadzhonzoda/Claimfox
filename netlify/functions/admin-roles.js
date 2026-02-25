const { requireRole, sanitizeRoles, ROLE_VALUES } = require('./_auth0')
const { auth0ManagementRequest, json, error, rateLimit } = require('./_utils')

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST' && event.httpMethod !== 'PATCH') {
    return error(405, 'method_not_allowed', 'Only POST/PATCH allowed')
  }

  const auth = await requireRole(event, 'c-level')
  if (!auth.ok) return auth.response

  const ip = event.headers['x-nf-client-connection-ip'] || 'unknown'
  if (!rateLimit(`admin-roles:${ip}`, 30, 60_000)) return error(429, 'rate_limited', 'Too many requests')

  let payload = {}
  try {
    payload = JSON.parse(event.body || '{}')
  } catch {
    return error(400, 'bad_request', 'Invalid JSON payload')
  }

  const userId = String(payload.userId || '').trim()
  const roles = sanitizeRoles(payload.roles)

  if (!userId) return error(400, 'bad_request', 'userId is required')
  if (roles.some((role) => !ROLE_VALUES.includes(role))) {
    return error(400, 'bad_request', 'Invalid role value')
  }

  try {
    await auth0ManagementRequest({
      method: 'PATCH',
      path: `/users/${encodeURIComponent(userId)}`,
      body: {
        app_metadata: {
          roles,
          access_request: {
            status: 'approved',
            approved_at: new Date().toISOString(),
            approved_by: auth.user?.email || auth.user?.id || 'unknown'
          }
        }
      }
    })

    return json(200, { ok: true, userId, roles })
  } catch (e) {
    return error(500, 'admin_roles_failed', 'Could not update roles', { message: e.message })
  }
}
