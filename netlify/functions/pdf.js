const { requireAnyRole } = require('./_auth0')
const { error, rateLimit } = require('./_utils')

const ALLOWED_PREFIXES = [
  '/inside-insurfox',
  '/analysis',
  '/strategy',
  '/managementreports',
  '/dashboard'
]

function isSafeRoute(route) {
  if (!route || typeof route !== 'string') return false
  if (!route.startsWith('/')) return false
  if (route.startsWith('//')) return false
  return ALLOWED_PREFIXES.some((prefix) => route === prefix || route.startsWith(`${prefix}/`))
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') return error(405, 'method_not_allowed', 'Only GET allowed')

  const auth = await requireAnyRole(event, ['management'])
  if (!auth.ok) return auth.response

  const ip = event.headers['x-nf-client-connection-ip'] || 'unknown'
  if (!rateLimit(`pdf:${ip}`, 20, 60_000)) return error(429, 'rate_limited', 'Too many requests')

  const apiKey = process.env.DOCRAPTOR_API_KEY
  const siteOrigin = process.env.SITE_ORIGIN || 'https://claimsfox.com'
  const testMode = process.env.DOCRAPTOR_TEST_MODE === 'true'

  if (!apiKey) return error(500, 'server_config_error', 'DOCRAPTOR_API_KEY missing')

  const params = new URLSearchParams(event.queryStringParameters || {})
  const route = params.get('route') || ''
  const lang = params.get('lang') === 'en' ? 'en' : 'de'

  if (!isSafeRoute(route)) {
    return error(400, 'invalid_route', 'Route is not allowed')
  }

  const targetUrl = `${siteOrigin}${route}${route.includes('?') ? '&' : '?'}print=1&lang=${lang}`

  try {
    const dr = await fetch('https://docraptor.com/docs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_credentials: apiKey,
        test: testMode,
        doc: {
          document_url: targetUrl,
          type: 'pdf',
          name: `claimsfox-report-${Date.now()}.pdf`
        }
      })
    })

    if (!dr.ok) {
      const msg = await dr.text().catch(() => '')
      return error(502, 'docraptor_failed', 'DocRaptor request failed', { message: msg.slice(0, 300) })
    }

    const buffer = Buffer.from(await dr.arrayBuffer())

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="claimsfox-report.pdf"',
        'Cache-Control': 'no-store'
      },
      isBase64Encoded: true,
      body: buffer.toString('base64')
    }
  } catch (e) {
    return error(500, 'pdf_failed', 'Could not generate PDF', { message: e.message })
  }
}
