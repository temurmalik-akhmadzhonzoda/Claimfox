const { json, error, getAuth0Config } = require('./_utils')

function detectOrigin(event) {
  const envOrigin = process.env.SITE_ORIGIN
  if (envOrigin) return envOrigin.replace(/\/+$/, '')

  const proto = event?.headers?.['x-forwarded-proto'] || 'https'
  const host = event?.headers?.host
  if (host) return `${proto}://${host}`
  return 'https://claimsfox.com'
}

exports.handler = async (event) => {
  try {
    const cfg = getAuth0Config()
    const clientId = process.env.AUTH0_CLIENT_ID || ''
    if (!clientId) {
      return error(500, 'auth_config_error', 'AUTH0_CLIENT_ID missing')
    }
    const origin = detectOrigin(event)
    return json(200, {
      ok: true,
      config: {
        domain: cfg.domain,
        audience: cfg.audience,
        issuer: cfg.issuer,
        rolesClaim: cfg.rolesClaim,
        clientId,
        redirectUri: `${origin}/auth/callback`
      }
    })
  } catch (e) {
    return error(500, 'auth_config_error', 'Auth configuration is incomplete', { message: e.message })
  }
}
