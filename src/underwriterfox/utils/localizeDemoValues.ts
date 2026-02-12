import type { Lang } from '@/i18n/translations'

const PRODUCT_LINE_MAP: Record<string, { de: string; en: string }> = {
  Property: { de: 'Sach', en: 'Property' },
  Liability: { de: 'Haftpflicht', en: 'Liability' },
  Cyber: { de: 'Cyber', en: 'Cyber' },
  Marine: { de: 'Marine', en: 'Marine' },
  Energy: { de: 'Energie', en: 'Energy' },
  'Fleet Liability': { de: 'Flottenhaftpflicht', en: 'Fleet Liability' },
  'Property All Risk': { de: 'Sachversicherung All Risk', en: 'Property All Risk' },
  'Cyber Shield': { de: 'Cyber Schutz', en: 'Cyber Shield' },
  'Cargo Protect': { de: 'Transportschutz', en: 'Cargo Protect' },
  'Marine Hull': { de: 'Kasko Marine', en: 'Marine Hull' }
}

const SEGMENT_MAP: Record<string, { de: string; en: string }> = {
  Enterprise: { de: 'Enterprise', en: 'Enterprise' },
  'Mid-Market': { de: 'Mittelstand', en: 'Mid-Market' },
  'Mid Market': { de: 'Mittelstand', en: 'Mid Market' },
  SME: { de: 'KMU', en: 'SME' },
  Specialty: { de: 'Spezialrisiko', en: 'Specialty' },
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

export function localizeUnderwriterExtractedText(value: string | undefined, lang: Lang) {
  if (!value) return value
  if (lang === 'en') return value
  return value
    .replace('Submission summary for', 'Einreichungszusammenfassung fuer')
    .replace('Exposure overview:', 'Exponierungsuebersicht:')
    .replace('portfolio with', 'Portfolio mit')
    .replace('units.', 'Einheiten.')
    .replace('Loss history shows', 'Die Schadenhistorie zeigt')
    .replace('notable incidents.', 'auffaellige Ereignisse.')
    .replace('Controls:', 'Kontrollen:')
    .replace('Driver training, geo-fencing, and quarterly audits are in place.', 'Fahrerschulungen, Geo-Fencing und quartalsweise Audits sind implementiert.')
    .replace('Additional details in appendix.', 'Weitere Details im Anhang.')
}
