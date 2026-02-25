const { requireAuth, sanitizeRoles } = require('./_auth0')
const { auth0ManagementRequest, json, error, rateLimit } = require('./_utils')

function getBootstrapAdminEmails() {
  const raw = process.env.AUTH_BOOTSTRAP_ADMIN_EMAILS || process.env.AUTH_BOOTSTRAP_ADMIN_EMAIL || ''
  return String(raw)
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return error(405, 'method_not_allowed', 'Only POST allowed')
  }

  const ip = event.headers['x-nf-client-connection-ip'] || 'unknown'
  if (!rateLimit(`auth-init:${ip}`, 20, 60_000)) {
    return error(429, 'rate_limited', 'Too many requests')
  }

  const auth = await requireAuth(event)
  if (!auth.ok) return auth.response

  const currentRoles = sanitizeRoles(auth.roles)
  if (currentRoles.length > 0) {
    return json(200, { ok: true, roles: currentRoles, initialized: false })
  }

  const userId = auth.user?.id
  if (!userId) return error(400, 'invalid_user', 'User id missing')
  const userEmail = String(auth.user?.email || '').trim().toLowerCase()
  const bootstrapEmails = getBootstrapAdminEmails()

  if (userEmail && bootstrapEmails.includes(userEmail)) {
    try {
      const roles = ['c-level']
      await auth0ManagementRequest({
        method: 'PATCH',
        path: `/users/${encodeURIComponent(userId)}`,
        body: {
          app_metadata: {
            roles,
            access_request: {
              status: 'approved',
              approved_at: new Date().toISOString(),
              approved_by: 'system-bootstrap'
            }
          }
        }
      })

      return json(200, {
        ok: true,
        roles,
        initialized: true,
        bootstrapAssigned: true,
        requestStatus: 'approved'
      })
    } catch (e) {
      return error(500, 'bootstrap_admin_failed', 'Could not assign bootstrap admin role', { message: e.message })
    }
  }

  try {
    await auth0ManagementRequest({
      method: 'PATCH',
      path: `/users/${encodeURIComponent(userId)}`,
      body: {
        app_metadata: {
          access_request: {
            status: 'pending',
            requested_at: new Date().toISOString()
          }
        }
      }
    })

    return json(200, { ok: true, roles: [], initialized: true, requestStatus: 'pending' })
  } catch (e) {
    return error(500, 'access_request_init_failed', 'Could not initialize access request status', { message: e.message })
  }
}
