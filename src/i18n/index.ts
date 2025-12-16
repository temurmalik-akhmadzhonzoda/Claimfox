import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import de from './de.json'

const STORAGE_KEY = 'insurfox_language'
const fallbackLng = 'en'

function getInitialLanguage(): string {
  try {
    if (typeof window === 'undefined') return fallbackLng
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) return stored
  } catch (error) {
    // ignore
  }
  if (typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('de')) {
    return 'de'
  }
  return fallbackLng
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de }
    },
    lng: getInitialLanguage(),
    fallbackLng,
    interpolation: {
      escapeValue: false
    }
  })

i18n.on('languageChanged', (lng) => {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, lng)
    }
  } catch (error) {
    // ignore storage errors
  }
})

export default i18n
