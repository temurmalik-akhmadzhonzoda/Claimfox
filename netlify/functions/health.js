const { json } = require('./_utils')

function has(key) {
  const value = process.env[key]
  return typeof value === 'string' && value.trim().length > 0
}

exports.handler = async (event) => {
  const host = event?.headers?.host || null
  const proto = event?.headers?.['x-forwarded-proto'] || null

  return json(200, {
    ok: true,
    service: 'claimsfox-web',
    timestamp: new Date().toISOString(),
    request: {
      host,
      proto
    },
    env: {
      auth0Domain: has('AUTH0_DOMAIN'),
      auth0ClientId: has('AUTH0_CLIENT_ID'),
      auth0Issuer: has('AUTH0_ISSUER'),
      auth0Audience: has('AUTH0_AUDIENCE'),
      siteOrigin: has('SITE_ORIGIN')
    }
  })
}
