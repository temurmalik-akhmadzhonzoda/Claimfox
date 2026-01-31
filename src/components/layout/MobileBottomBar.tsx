import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nContext'
import { useAuth } from '@/features/auth/AuthContext'

export default function MobileBottomBar() {
  const navigate = useNavigate()
  const { lang, setLang, t } = useI18n()
  const { isAuthenticated, logout } = useAuth()

  const authLabel = isAuthenticated ? t('header.logout') : t('header.login')

  return (
    <nav className="home-mobile-bottom-bar" aria-label="Mobile shortcuts">
      <button
        type="button"
        onClick={() => {
          if (isAuthenticated) {
            logout()
            navigate('/login')
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
            return
          }
          navigate('/login')
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        }}
      >
        {authLabel}
      </button>
      <div className="home-marketing-lang-switch" role="group" aria-label="Language switch mobile">
        <button type="button" className={lang === 'de' ? 'is-active' : ''} onClick={() => setLang('de')}>
          DE
        </button>
        <button type="button" className={lang === 'en' ? 'is-active' : ''} onClick={() => setLang('en')}>
          EN
        </button>
      </div>
    </nav>
  )
}
