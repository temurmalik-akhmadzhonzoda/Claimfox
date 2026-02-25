const { requireAnyRole, hasAtLeastRole } = require('./_auth0')
const { json, error, rateLimit } = require('./_utils')

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') return error(405, 'method_not_allowed', 'Only GET allowed')

  const ip = event.headers['x-nf-client-connection-ip'] || 'unknown'
  if (!rateLimit(`secure-data:${ip}`, 80, 60_000)) return error(429, 'rate_limited', 'Too many requests')

  const auth = await requireAnyRole(event, ['management'])
  if (!auth.ok) return auth.response

  const roles = auth.roles || []
  const level = hasAtLeastRole(roles, 'c-level') ? 'c-level' : 'management'

  return json(200, {
    ok: true,
    data: {
      classification: 'management-confidential',
      roleContext: level,
      kpis: [
        { key: 'loss_ratio', value: 0.62 },
        { key: 'combined_ratio', value: 0.91 },
        { key: 'mttr', value: 74 }
      ]
    }
  })
}
