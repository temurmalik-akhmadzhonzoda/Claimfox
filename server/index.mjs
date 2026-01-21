import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import puppeteer from 'puppeteer'

const port = Number(process.env.PDF_PORT || process.env.PORT || 3001)
const devPort = Number(process.env.VITE_DEV_SERVER_PORT || 5173)
const isProd = process.env.NODE_ENV === 'production'
const distDir = path.resolve('dist')
const indexHtml = path.join(distDir, 'index.html')

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
}

async function isReachable(url) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 2000)
    const response = await fetch(url, { method: 'GET', signal: controller.signal })
    clearTimeout(timeout)
    return response.ok
  } catch {
    return false
  }
}

async function resolveBaseUrl() {
  if (process.env.PDF_BASE_URL) {
    return process.env.PDF_BASE_URL
  }
  const devBaseUrl = process.env.VITE_DEV_SERVER_URL || `http://127.0.0.1:${devPort}`
  const hasDist = fs.existsSync(indexHtml)

  if (await isReachable(devBaseUrl)) {
    return devBaseUrl
  }

  if (hasDist) {
    return `http://127.0.0.1:${port}`
  }

  throw new Error(
    `Dev server not reachable at ${devBaseUrl} and no dist build found. Start Vite or build the app.`
  )
}

async function renderBusinessModelPdf(lang) {
  const baseUrl = await resolveBaseUrl()
  const targetUrl = `${baseUrl}/business-model-antares?print=1&lang=${encodeURIComponent(lang)}`

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--disable-crashpad', '--disable-crash-reporter', '--noerrdialogs']
  })

  try {
    const page = await browser.newPage()
    await page.emulateMediaType('print')
    await page.goto(targetUrl, { waitUntil: ['load', 'networkidle0'] })
    await page.evaluate(() => document.fonts?.ready)

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0cm', right: '0cm', bottom: '0cm', left: '0cm' }
    })
    const buffer = Buffer.from(pdfBuffer)
    console.log(`[pdf] buffer length: ${buffer.length}`)
    if (buffer.length === 0) {
      throw new Error('PDF buffer is empty')
    }
    return buffer
  } finally {
    await browser.close()
  }
}

function serveFile(res, filePath) {
  const ext = path.extname(filePath)
  const contentType = mimeTypes[ext] || 'application/octet-stream'
  res.writeHead(200, { 'Content-Type': contentType })
  fs.createReadStream(filePath).pipe(res)
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', 'http://localhost')

  if (url.pathname === '/api/pdf/business-model-antares') {
    const rawLang = url.searchParams.get('lang') || 'de'
    const lang = rawLang === 'en' ? 'en' : 'de'

    try {
      const pdfBuffer = await renderBusinessModelPdf(lang)
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="insurfox-antares-business-model-${lang}.pdf"`,
        'Access-Control-Allow-Origin': '*',
        'Content-Length': pdfBuffer.length
      })
      res.end(pdfBuffer)
    } catch (error) {
      console.error('PDF render failed', error)
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
      res.end(JSON.stringify({ error: 'PDF render failed' }))
    }
    return
  }

  if (fs.existsSync(distDir)) {
    if (url.pathname === '/' || url.pathname === '') {
      serveFile(res, indexHtml)
      return
    }

    const filePath = path.join(distDir, url.pathname)
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      serveFile(res, filePath)
      return
    }

    serveFile(res, indexHtml)
    return
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
  res.end('Not Found')
})

server.listen(port, () => {
  console.log(`PDF server listening on http://127.0.0.1:${port}`)
})
