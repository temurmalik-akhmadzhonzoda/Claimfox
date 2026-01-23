import React, { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { enterpriseStrings } from '@/i18n/strings'
import { useI18n } from '@/i18n/I18nContext'
import PosterAntares from '@/assets/images/Poster-Antares.png'
import KarteDeEu from '@/assets/images/karte_de_eu.png'
import KarteDeEuEn from '@/assets/images/karte_eu_de_englisch.png'

function buildDocRaptorUrl(route: string, filename: string) {
  return `/.netlify/functions/pdf?${new URLSearchParams({ route, filename }).toString()}`
}

export default function EnterpriseLeadsPage() {
  const [searchParams] = useSearchParams()
  const { lang } = useI18n()
  const isPrint = searchParams.get('print') === '1'
  const copy = enterpriseStrings[lang]
  const mapImage = lang === 'en' ? KarteDeEuEn : KarteDeEu
  const slidesRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const totalSlides = 2

  function exportPdf() {
    const route = lang === 'de'
      ? '/enterprise-leads-intelligence/print/de'
      : '/enterprise-leads-intelligence/print/en'
    const filename = lang === 'de'
      ? 'insurfox-business-plan-part1-de.pdf'
      : 'insurfox-business-plan-part1-en.pdf'
    window.location.href = buildDocRaptorUrl(route, filename)
  }

  function goToSlide(nextIndex: number) {
    const safeIndex = Math.max(0, Math.min(totalSlides - 1, nextIndex))
    setActiveIndex(safeIndex)
    if (!slidesRef.current) {
      return
    }
    const slideWidth = slidesRef.current.clientWidth
    slidesRef.current.scrollTo({
      left: slideWidth * safeIndex,
      behavior: 'smooth'
    })
  }

  return (
    <section className={`page enterprise-plan ${isPrint ? 'is-print' : ''}`}>
      <header className="enterprise-header no-print">
        <div className="enterprise-header-title">Insurfox / Antares</div>
        <div className="enterprise-header-actions">
          <button type="button" className="enterprise-download" onClick={exportPdf}>
            {copy.header.export}
          </button>
        </div>
      </header>

      <div className="enterprise-slides" ref={slidesRef}>
        <section className="slide slide-cover enterprise-section">
          <div className="enterprise-hero">
            <div className="enterprise-hero-copy">
              <h1>{copy.cover.title}</h1>
              <p className="hero-summary">{copy.cover.summary}</p>
              <div className="enterprise-map">
                <img src={mapImage} alt={copy.marketImageAlt} />
              </div>
            </div>
            <div className="enterprise-hero-media">
              <img src={PosterAntares} alt="Insurfox Poster" />
            </div>
          </div>
        </section>

        <section className="slide enterprise-section enterprise-market">
          <img src={mapImage} alt={copy.marketImageAlt} className="enterprise-market-image" />
        </section>
      </div>

      <div className="enterprise-nav no-print" aria-hidden="true">
        <button
          type="button"
          className="enterprise-nav-arrow left"
          onClick={() => goToSlide(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous"
        >
          ←
        </button>
        <button
          type="button"
          className="enterprise-nav-arrow right"
          onClick={() => goToSlide(activeIndex + 1)}
          disabled={activeIndex === totalSlides - 1}
          aria-label="Next"
        >
          →
        </button>
      </div>

    </section>
  )
}
