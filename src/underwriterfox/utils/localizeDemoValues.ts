import type { Lang } from '@/i18n/translations'

const PRODUCT_LINE_MAP: Record<string, { de: string; en: string }> = {
  Property: { de: 'Sach', en: 'Property' },
  Liability: { de: 'Haftpflicht', en: 'Liability' },
  Cyber: { de: 'Cyber', en: 'Cyber' },
  Marine: { de: 'Marine', en: 'Marine' },
  Energy: { de: 'Energie', en: 'Energy' },
  'Fleet Liability': { de: 'Flottenhaftpflicht', en: 'Fleet Liability' }
}

const SEGMENT_MAP: Record<string, { de: string; en: string }> = {
  Enterprise: { de: 'Enterprise', en: 'Enterprise' },
  'Mid-Market': { de: 'Mittelstand', en: 'Mid-Market' },
  SME: { de: 'KMU', en: 'SME' },
  Public: { de: 'Oeffentlich', en: 'Public' },
  'Public Sector': { de: 'Oeffentlicher Sektor', en: 'Public Sector' }
}

function pickLocalized(value: string | undefined, lang: Lang, map: Record<string, { de: string; en: string }>) {
  if (!value) return value
  const entry = map[value]
  return entry ? entry[lang] : value
}

export function localizeUnderwriterProductLine(value: string | undefined, lang: Lang) {
  return pickLocalized(value, lang, PRODUCT_LINE_MAP)
}

export function localizeUnderwriterSegment(value: string | undefined, lang: Lang) {
  return pickLocalized(value, lang, SEGMENT_MAP)
}
