const { json, error } = require('./_utils')

function firstEnv(...keys) {
  for (const key of keys) {
    const value = process.env[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return ''
}

function detectOrigin(event) {
  const envOrigin = firstEnv('SITE_ORIGIN', 'URL', 'DEPLOY_PRIME_URL')
  if (envOrigin) return envOrigin.replace(/\/+$/, '')

  const proto = event?.headers?.['x-forwarded-proto'] || 'https'
  const host = event?.headers?.host
  if (host) return `${proto}://${host}`
  return 'https://claimsfox.com'
}

exports.handler = async (event) => {
  const domain = firstEnv('AUTH0_DOMAIN', 'VITE_AUTH0_DOMAIN', 'REACT_APP_AUTH0_DOMAIN', 'NEXT_PUBLIC_AUTH0_DOMAIN')
  const issuerRaw = firstEnv('AUTH0_ISSUER', 'VITE_AUTH0_ISSUER', 'REACT_APP_AUTH0_ISSUER', 'NEXT_PUBLIC_AUTH0_ISSUER') || (domain ? `https://${domain}/` : '')
  const audience = firstEnv('AUTH0_AUDIENCE', 'VITE_AUTH0_AUDIENCE', 'REACT_APP_AUTH0_AUDIENCE', 'NEXT_PUBLIC_AUTH0_AUDIENCE')
  const clientId = firstEnv('AUTH0_CLIENT_ID', 'VITE_AUTH0_CLIENT_ID', 'REACT_APP_AUTH0_CLIENT_ID', 'NEXT_PUBLIC_AUTH0_CLIENT_ID')

  if (!domain || !clientId) {
    return error(500, 'auth_config_error', 'AUTH0_DOMAIN and AUTH0_CLIENT_ID must be configured')
  }

  const issuer = issuerRaw.endsWith('/') ? issuerRaw : `${issuerRaw}/`
  const origin = detectOrigin(event)

  return json(200, {
    ok: true,
    config: {
      domain,
      audience: audience || null,
      issuer,
      clientId,
      redirectUri: `${origin}/auth/callback`
    }
  })
}
