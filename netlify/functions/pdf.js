const DOCRAPTOR_URL = 'https://api.docraptor.com/docs'

function getRequiredEnv(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing env var: ${name}`)
  }
  return value
}

function mapRoute(route) {
  if (route === '/enterprise-leads-intelligence/print/de') {
    return '/enterprise-leads-print.de.html'
  }
  if (route === '/enterprise-leads-intelligence/print/en') {
    return '/enterprise-leads-print.en.html'
  }
  return route
}

function buildDocUrl(origin, route) {
  const normalizedRoute = route.startsWith('/') ? route : `/${route}`
  const url = new URL(normalizedRoute, origin)
  return url.toString()
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'GET') {
      return {
        statusCode: 405,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ error: 'Method Not Allowed' })
      }
    }

    const siteOrigin = process.env.SITE_ORIGIN || 'https://claimfox.app'
    const routeParam = event.queryStringParameters?.route || '/business-model-antares-test'
    const route = mapRoute(routeParam)
    const filename = event.queryStringParameters?.filename
    const testMode = process.env.DOCRAPTOR_TEST_MODE === 'true'

    const documentUrl = buildDocUrl(siteOrigin, route)

    if (event.queryStringParameters?.debug === '1') {
      const response = await fetch(documentUrl, { redirect: 'follow' })
      const contentType = response.headers.get('content-type')
      const text = await response.text()
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          ok: response.ok && contentType && contentType.includes('text/html'),
          document_url: documentUrl,
          status: response.status,
          content_type: contentType,
          first_300_chars: text.slice(0, 300),
          redirected: response.url !== documentUrl,
          final_fetch_url: response.url
        })
      }
    }

    const apiKey = getRequiredEnv('DOCRAPTOR_API_KEY')
    const authToken = Buffer.from(`${apiKey}:`).toString('base64')

    console.log('DocRaptor document_url =', documentUrl)

    const response = await fetch(DOCRAPTOR_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        document_type: 'pdf',
        document_url: documentUrl,
        test: testMode
      })
    })

    if (!response.ok) {
      const message = await response.text()
      return {
        statusCode: response.status,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          error: 'DocRaptor request failed',
          status: response.status,
          message
        })
      }
    }

    const arrayBuffer = await response.arrayBuffer()
    const pdfBuffer = Buffer.from(arrayBuffer)

    if (pdfBuffer.length === 0) {
      throw new Error('DocRaptor returned an empty PDF')
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename || 'insurfox-antares-business-model.pdf'}"`
      },
      body: pdfBuffer.toString('base64'),
      isBase64Encoded: true
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        error: 'PDF render failed',
        message: error.message
      })
    }
  }
}
