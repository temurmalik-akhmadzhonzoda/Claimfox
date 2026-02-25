const { requireAuth } = require('./_auth0')
const { auth0ManagementRequest, json, error, rateLimit } = require('./_utils')

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return error(405, 'method_not_allowed', 'Only POST allowed')

  const auth = await requireAuth(event)
  if (!auth.ok) return auth.response

  const ip = event.headers['x-nf-client-connection-ip'] || 'unknown'
  if (!rateLimit(`access-request:${auth.user.id}:${ip}`, 8, 60_000)) {
    return error(429, 'rate_limited', 'Too many requests')
  }

  const userId = auth.user?.id
  if (!userId) return error(400, 'bad_request', 'User id missing')

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

    return json(200, {
      ok: true,
      status: 'pending',
      message: 'Anfrage wurde an die Administration gesendet.'
    })
  } catch (e) {
    return error(500, 'access_request_failed', 'Anfrage konnte nicht gespeichert werden', { message: e.message })
  }
}
