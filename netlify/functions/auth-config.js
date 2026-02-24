const { json, error, getAuth0Config } = require('./_utils')

exports.handler = async () => {
  try {
    const cfg = getAuth0Config()
    const clientId = process.env.AUTH0_CLIENT_ID || ''
    if (!clientId) {
      return error(500, 'auth_config_error', 'AUTH0_CLIENT_ID missing')
    }
    return json(200, {
      ok: true,
      config: {
        domain: cfg.domain,
        audience: cfg.audience,
        issuer: cfg.issuer,
        rolesClaim: cfg.rolesClaim,
        clientId,
        redirectUri: `${process.env.SITE_ORIGIN || 'https://claimsfox.com'}/auth/callback`
      }
    })
  } catch (e) {
    return error(500, 'auth_config_error', 'Auth configuration is incomplete', { message: e.message })
  }
}
