const { json, error } = require('./_utils')

function firstEnv(...keys) {
  for (const key of keys) {
    const value = process.env[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return ''
}

function hasEnv(...keys) {
  for (const key of keys) {
    const value = process.env[key]
    if (typeof value === 'string' && value.trim()) return true
  }
  return false
}

function detectOrigin(event) {
  const proto = event?.headers?.['x-forwarded-proto'] || 'https'
  const host = event?.headers?.host

  // Always prefer the actual request host (works for both claimsfox.com and claimsfox.netlify.app).
  if (host) return `${proto}://${host}`

  const envOrigin = firstEnv('SITE_ORIGIN', 'URL', 'DEPLOY_PRIME_URL')
  if (envOrigin) return envOrigin.replace(/\/+$/, '')
  return 'https://claimsfox.com'
}

function sanitizeAudience(rawAudience) {
  const value = (rawAudience || '').trim()
  if (!value) return null
  // Auth0 Management API audience is for server-to-server use only and
  // should not be requested by the browser login flow.
  if (/\/api\/v2\/?$/i.test(value)) return null
  return value
}

exports.handler = async (event) => {
  const domain = firstEnv('AUTH0_DOMAIN', 'VITE_AUTH0_DOMAIN', 'REACT_APP_AUTH0_DOMAIN', 'NEXT_PUBLIC_AUTH0_DOMAIN')
  const issuerRaw = firstEnv('AUTH0_ISSUER', 'VITE_AUTH0_ISSUER', 'REACT_APP_AUTH0_ISSUER', 'NEXT_PUBLIC_AUTH0_ISSUER') || (domain ? `https://${domain}/` : '')
  const audienceRaw = firstEnv('AUTH0_AUDIENCE', 'VITE_AUTH0_AUDIENCE', 'REACT_APP_AUTH0_AUDIENCE', 'NEXT_PUBLIC_AUTH0_AUDIENCE')
  const audience = sanitizeAudience(audienceRaw)
  const clientId = firstEnv('AUTH0_CLIENT_ID', 'VITE_AUTH0_CLIENT_ID', 'REACT_APP_AUTH0_CLIENT_ID', 'NEXT_PUBLIC_AUTH0_CLIENT_ID')

  if (!domain || !clientId) {
    return error(500, 'auth_config_error', 'AUTH0_DOMAIN and AUTH0_CLIENT_ID must be configured', {
      envDetected: {
        auth0_domain: hasEnv('AUTH0_DOMAIN', 'VITE_AUTH0_DOMAIN', 'REACT_APP_AUTH0_DOMAIN', 'NEXT_PUBLIC_AUTH0_DOMAIN'),
        auth0_client_id: hasEnv('AUTH0_CLIENT_ID', 'VITE_AUTH0_CLIENT_ID', 'REACT_APP_AUTH0_CLIENT_ID', 'NEXT_PUBLIC_AUTH0_CLIENT_ID'),
        auth0_issuer: hasEnv('AUTH0_ISSUER', 'VITE_AUTH0_ISSUER', 'REACT_APP_AUTH0_ISSUER', 'NEXT_PUBLIC_AUTH0_ISSUER'),
        auth0_audience: hasEnv('AUTH0_AUDIENCE', 'VITE_AUTH0_AUDIENCE', 'REACT_APP_AUTH0_AUDIENCE', 'NEXT_PUBLIC_AUTH0_AUDIENCE')
      }
    })
  }

  // Fast-fail common misconfiguration where AUTH0_CLIENT_ID is set to a domain.
  if (/\./.test(clientId) || /auth0\.com/i.test(clientId)) {
    return error(500, 'auth_config_error', 'AUTH0_CLIENT_ID is invalid. Use the Auth0 Application Client ID (not a domain).', {
      hint: 'Open Auth0 Dashboard -> Applications -> your SPA app -> Settings -> Client ID'
    })
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
