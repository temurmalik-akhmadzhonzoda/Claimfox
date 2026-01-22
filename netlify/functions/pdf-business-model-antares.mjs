import chromium from '@sparticuz/chromium'
import fs from 'node:fs'
import path from 'node:path'
import puppeteer from 'puppeteer-core'

function resolveBaseUrl() {
  return (
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL ||
    process.env.NETLIFY_URL ||
    ''
  ).replace(/\/$/, '')
}

export async function handler(event) {
  try {
    const rawLang = event.queryStringParameters?.lang || 'de'
    const lang = rawLang === 'en' ? 'en' : 'de'
    const baseUrl = resolveBaseUrl()
    if (!baseUrl) {
      throw new Error('Base URL not available for PDF rendering.')
    }
    const targetUrl = `${baseUrl}/business-model-antares?print=1&lang=${encodeURIComponent(
      lang
    )}`

    const candidateBins = [
      path.join(process.cwd(), 'node_modules', '@sparticuz', 'chromium', 'bin'),
      path.join(process.cwd(), 'netlify', 'bin'),
      path.join(process.cwd(), 'bin')
    ]
    const binPath = candidateBins.find((candidate) => fs.existsSync(candidate))
    if (!binPath) {
      throw new Error(`Chromium bin directory not found. Tried: ${candidateBins.join(', ')}`)
    }

    const executablePath = await chromium.executablePath(binPath)
    if (!executablePath) {
      throw new Error('Chromium executable not found in Netlify runtime.')
    }

    if (typeof chromium.setHeadlessMode === 'function') {
      chromium.setHeadlessMode(true)
    }
    if (typeof chromium.setGraphicsMode === 'function') {
      chromium.setGraphicsMode(false)
    }

    const launchArgs = [
      ...chromium.args,
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--no-sandbox'
    ]

    const browser = await puppeteer.launch({
      args: launchArgs,
      executablePath,
      headless: chromium.headless,
      defaultViewport: chromium.defaultViewport,
      ignoreHTTPSErrors: true
    })

    let pdfBuffer
    try {
      const page = await browser.newPage()
      page.setDefaultNavigationTimeout(120000)
      await page.emulateMediaType('print')
      await page.goto(targetUrl, { waitUntil: ['load', 'networkidle2'], timeout: 120000 })
      await page.waitForTimeout(1000)
      await page.evaluate(() => document.fonts?.ready)
      pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: '0cm', right: '0cm', bottom: '0cm', left: '0cm' }
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      if (message.includes('Target closed')) {
        const retryPage = await browser.newPage()
        retryPage.setDefaultNavigationTimeout(120000)
        await retryPage.emulateMediaType('print')
        await retryPage.goto(targetUrl, { waitUntil: ['load', 'networkidle2'], timeout: 120000 })
        await retryPage.waitForTimeout(1000)
        await retryPage.evaluate(() => document.fonts?.ready)
        pdfBuffer = await retryPage.pdf({
          format: 'A4',
          printBackground: true,
          preferCSSPageSize: true,
          margin: { top: '0cm', right: '0cm', bottom: '0cm', left: '0cm' }
        })
      } else {
        throw error
      }
    } finally {
      await browser.close()
    }

    const buffer = Buffer.from(pdfBuffer)
    if (buffer.length === 0) {
      throw new Error('PDF buffer is empty')
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="insurfox-antares-business-model-${lang}.pdf"`,
        'Content-Length': buffer.length.toString()
      },
      isBase64Encoded: true,
      body: buffer.toString('base64')
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    const stack = error instanceof Error && error.stack ? error.stack : undefined
    console.error('PDF render failed', error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        error: 'PDF render failed',
        message,
        stack
      })
    }
  }
}
