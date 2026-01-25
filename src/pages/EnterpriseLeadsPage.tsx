import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nContext'
import SlideStage from '@/components/SlideStage'
import Slide1Market from '@/features/enterprise-leads/slides/Slide1Market'
import Slide2PremiumCorridor from '@/features/enterprise-leads/slides/Slide2PremiumCorridor'
import Slide3ProgramEconomics from '@/features/enterprise-leads/slides/Slide3ProgramEconomics'
import Slide4RiskGovernance from '@/features/enterprise-leads/slides/Slide4RiskGovernance'
import '@/styles/slide-stage.css'
import '@/styles/enterprise-leads-slides.css'

const SLIDE_WIDTH = 1122

export default function EnterpriseLeadsPage() {
  const [searchParams] = useSearchParams()
  const { lang } = useI18n()
  const isPrint = searchParams.get('print') === '1'
  const [activeIndex, setActiveIndex] = useState(0)
  const slides = [
    { key: 'markets', node: <Slide1Market lang={lang} /> },
    { key: 'premium', node: <Slide2PremiumCorridor lang={lang} /> },
    { key: 'program', node: <Slide3ProgramEconomics /> },
    { key: 'governance', node: <Slide4RiskGovernance /> }
  ]
  const totalSlides = slides.length

  function exportPdf() {
    const filename = lang === 'de'
      ? 'insurfox-business-plan-part1-de.pdf'
      : 'insurfox-business-plan-part1-en.pdf'
    const route = `/enterprise-leads-print.${lang}.html`
    const url = `/.netlify/functions/pdf?${new URLSearchParams({ route, filename, lang }).toString()}`
    const popup = window.open(url, '_blank', 'noopener,noreferrer')
    if (!popup) {
      window.location.href = url
    }
  }

  function goToSlide(nextIndex: number) {
    const safeIndex = Math.max(0, Math.min(totalSlides - 1, nextIndex))
    setActiveIndex(safeIndex)
  }

  useEffect(() => {
    if (isPrint) {
      return
    }
    document.body.classList.add('enterprise-fullscreen', 'is-slide-route')
    return () => {
      document.body.classList.remove('enterprise-fullscreen', 'is-slide-route')
    }
  }, [isPrint])

  return (
    <section className={`page enterprise-plan ${isPrint ? 'is-print' : ''}`}>
      <SlideStage isPrint={isPrint} className="enterprise-slide-canvas">
        {!isPrint && (
          <div className="enterprise-download-float no-print">
            <button type="button" onClick={exportPdf}>
              {lang === 'de' ? 'PDF herunterladen' : 'Download PDF'}
            </button>
          </div>
        )}
        <div
          className="enterprise-slides"
          style={{ transform: `translateX(-${activeIndex * SLIDE_WIDTH}px)` }}
        >
          {slides.map((slide, index) => (
            <section
              key={slide.key}
              className="enterprise-page enterprise-section"
              aria-hidden={index !== activeIndex}
            >
              {slide.node}
            </section>
          ))}
        </div>
      </SlideStage>
      {!isPrint && (
        <div className="enterprise-nav no-print" aria-hidden="true">
          <button
            type="button"
            onClick={() => goToSlide(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous slide"
          >
            &lt;
          </button>
          <button
            type="button"
            onClick={() => goToSlide(activeIndex + 1)}
            disabled={activeIndex === totalSlides - 1}
            aria-label="Next slide"
          >
            &gt;
          </button>
        </div>
      )}
    </section>
  )
}
