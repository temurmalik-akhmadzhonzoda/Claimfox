import React, { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logo from '@/assets/logos/insurfox-logo-light.png'
import './TopHeader.css'

const LANGUAGE_STORAGE_KEY = 'insurfox_language'

const LANGUAGES: Array<{ label: string; value: 'de' | 'en' }> = [
  { label: 'DE', value: 'de' },
  { label: 'EN', value: 'en' }
]

function normalizeLanguage(lng?: string): 'de' | 'en' {
  if (!lng) return 'en'
  return lng.toLowerCase().startsWith('de') ? 'de' : 'en'
}

export default function TopHeader() {
  const location = useLocation()
  const { i18n } = useTranslation()
  const isLoginRoute = location.pathname === '/login'
  const activeLanguage = normalizeLanguage(i18n.language)

  const handleLanguageSwitch = useCallback(
    (nextLang: 'de' | 'en') => {
      if (nextLang === activeLanguage) return
      i18n.changeLanguage(nextLang)
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLang)
        }
      } catch (error) {
        // ignore localStorage issues
      }
    },
    [activeLanguage, i18n]
  )

  const logoNode = <img src={logo} alt="Insurfox" className="top-header__logo-image" />

  return (
    <header className="top-header">
      <div className="top-header__inner">
        {isLoginRoute ? (
          <div className="top-header__logo" aria-label="Insurfox">
            {logoNode}
          </div>
        ) : (
          <Link to="/my-profile" className="top-header__logo" aria-label="Go to profile">
            {logoNode}
          </Link>
        )}

        <div className="top-header__lang-switch" role="group" aria-label="Language switch">
          {LANGUAGES.map((language) => {
            const isActive = language.value === activeLanguage
            return (
              <button
                key={language.value}
                type="button"
                className={`top-header__lang-btn${isActive ? ' is-active' : ''}`}
                onClick={() => handleLanguageSwitch(language.value)}
                aria-pressed={isActive}
              >
                {language.label}
              </button>
            )
          })}
        </div>
      </div>
    </header>
  )
}
