import React from 'react'
import { Link } from 'react-router-dom'
import logoLight from '@/assets/logos/insurfox-logo-light.png'
import { useI18n } from '@/i18n/I18nContext'
import type { Lang } from '@/i18n/translations'
import './AppHeader.css'

const LANGUAGES: Array<{ label: string; value: Lang }> = [
  { label: 'DE', value: 'de' },
  { label: 'EN', value: 'en' }
]

export default function AppHeader() {
  const { lang, setLang } = useI18n()

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link to="/roles" className="app-header__logo" aria-label="Insurfox">
          <img src={logoLight} alt="Insurfox" />
        </Link>

        <div className="app-header__lang-switch" role="group" aria-label="Language switch">
          {LANGUAGES.map((language) => {
            const isActive = language.value === lang
            return (
              <button
                key={language.value}
                type="button"
                className={`app-header__lang-btn${isActive ? ' is-active' : ''}`}
                aria-pressed={isActive}
                onClick={() => setLang(language.value)}
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
