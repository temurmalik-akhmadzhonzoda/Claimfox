export function formatMoneyCompact(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 3,
    minimumFractionDigits: 0
  }).format(value)
}

export function formatMoneyFull(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(value)
}

export function formatPercent(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: 1,
    minimumFractionDigits: 0
  }).format(value)
}

export function formatYear(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0
  }).format(value)
}
