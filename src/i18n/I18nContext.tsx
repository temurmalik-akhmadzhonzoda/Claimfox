import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { Lang } from './translations'
import { translations } from './translations'

const STORAGE_KEY = 'cf_lang'

type TranslationParams = Record<string, string | number | undefined>

type I18nContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (path: string, vars?: TranslationParams) => string
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

function isBrowser() {
  return typeof window !== 'undefined'
}

function getInitialLang(): Lang {
  if (isBrowser()) {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null
    if (stored === 'de' || stored === 'en') {
      return stored
    }
  }
  return 'de'
}

function resolveTranslation(lang: Lang, path: string): string | undefined {
  const segments = path.split('.').filter(Boolean)
  let current: unknown = translations[lang]

  for (const segment of segments) {
    if (current && typeof current === 'object' && segment in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[segment]
    } else {
      return undefined
    }
  }

  return typeof current === 'string' ? current : undefined
}

function interpolate(template: string, vars: TranslationParams = {}) {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key: string) => {
    const value = vars[key]
    return value === undefined || value === null ? '' : String(value)
  })
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  const setLang = useCallback((nextLang: Lang) => {
    setLangState(nextLang)
    if (isBrowser()) {
      window.localStorage.setItem(STORAGE_KEY, nextLang)
    }
  }, [])

  const t = useCallback(
    (path: string, vars?: TranslationParams) => {
      const raw = resolveTranslation(lang, path) ?? resolveTranslation('en', path) ?? path
      return vars ? interpolate(raw, vars) : raw
    },
    [lang]
  )

  const value = useMemo<I18nContextValue>(() => ({ lang, setLang, t }), [lang, setLang, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
