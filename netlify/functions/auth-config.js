const { json, error } = require('./_utils')

function detectOrigin(event) {
  const envOrigin = process.env.SITE_ORIGIN
  if (envOrigin) return envOrigin.replace(/\/+$/, '')

  const proto = event?.headers?.['x-forwarded-proto'] || 'https'
  const host = event?.headers?.host
  if (host) return `${proto}://${host}`
  return 'https://claimsfox.com'
}

exports.handler = async (event) => {
  const domain = process.env.AUTH0_DOMAIN || ''
  const issuerRaw = process.env.AUTH0_ISSUER || (domain ? `https://${domain}/` : '')
  const audience = process.env.AUTH0_AUDIENCE || ''
  const clientId = process.env.AUTH0_CLIENT_ID || ''

  if (!domain || !issuerRaw || !audience || !clientId) {
    return error(500, 'auth_config_error', 'AUTH0_DOMAIN, AUTH0_ISSUER, AUTH0_AUDIENCE, AUTH0_CLIENT_ID must be configured')
  }

  const issuer = issuerRaw.endsWith('/') ? issuerRaw : `${issuerRaw}/`
  const origin = detectOrigin(event)

  return json(200, {
    ok: true,
    config: {
      domain,
      audience,
      issuer,
      clientId,
      redirectUri: `${origin}/auth/callback`
    }
  })
}
