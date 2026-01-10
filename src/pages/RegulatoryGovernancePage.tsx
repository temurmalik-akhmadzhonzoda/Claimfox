import React, { useEffect, useMemo, useState } from 'react'
import InternAuthGate from '@/components/InternAuthGate'
import Header from '@/components/ui/Header'
import GovernanceImage from '@/assets/images/hero_ai_iaas.png'
import { useI18n } from '@/i18n/I18nContext'
import { translations } from '@/i18n/translations'

export default function RegulatoryGovernancePage() {
  const { lang } = useI18n()
  const [activeSlide, setActiveSlide] = useState(0)
  const deck = useMemo(() => translations[lang]?.regulatoryDeck ?? translations.en.regulatoryDeck, [lang])
  const slides = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => {
        const slide = deck.slides[String(index + 1)]
        return {
          title: slide.title,
          bullets: slide.bullets,
          footer: slide.footer
        }
      }),
    [deck]
  )

  const totalSlides = slides.length

  function goToSlide(nextIndex: number) {
    setActiveSlide(Math.max(0, Math.min(nextIndex, totalSlides - 1)))
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') {
        goToSlide(activeSlide + 1)
      }
      if (event.key === 'ArrowLeft') {
        goToSlide(activeSlide - 1)
      }
      if (event.key === 'Home') {
        goToSlide(0)
      }
      if (event.key === 'End') {
        goToSlide(totalSlides - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSlide, totalSlides])

  return (
    <InternAuthGate>
      <section className="page regulatory-overview">
        <div className="regulatory-slider">
          <div className="regulatory-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
            {slides.map((slide, index) => (
              <div key={`${slide.title}-${index}`} className="regulatory-slide">
                <div className="regulatory-layout">
                  <div className="regulatory-left-card">
                    <div className="regulatory-left-header">
                      <Header title={deck.title} subtitle={deck.subtitle} subtitleColor="#65748b" />
                      <span className="regulatory-slide-index">
                        {String(index + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="regulatory-slide-content">
                      <h1>{slide.title}</h1>
                      <ul>
                        {slide.bullets.map((item, bulletIndex) => (
                          <li key={`${item}-${bulletIndex}`}>{item}</li>
                        ))}
                      </ul>
                      {slide.footer && <div className="regulatory-footer">{slide.footer}</div>}
                    </div>
                  </div>
                  <div className="regulatory-right">
                    <div className="regulatory-image-card">
                      <img src={GovernanceImage} alt={deck.title} />
                    </div>
                    <div className="regulatory-highlight-card">
                      <span className="regulatory-kicker">{deck.highlightTitle}</span>
                      <ul>
                        {deck.highlights.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="regulatory-nav">
            <button
              type="button"
              className="deck-arrow"
              onClick={() => goToSlide(activeSlide - 1)}
              disabled={activeSlide === 0}
              aria-label="Previous slide"
            >
              ←
            </button>
            <div className="deck-dots">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={index === activeSlide ? 'deck-dot active' : 'deck-dot'}
                  onClick={() => goToSlide(index)}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              className="deck-arrow"
              onClick={() => goToSlide(activeSlide + 1)}
              disabled={activeSlide === totalSlides - 1}
              aria-label="Next slide"
            >
              →
            </button>
          </div>
        </div>
      </section>
    </InternAuthGate>
  )
}
