export type MarketAnchor = {
  id: string
  label: {
    de: string
    en: string
  }
  value: number
  currency: 'EUR'
  year: number
  sourceId: string
}

export const marketAnchors: MarketAnchor[] = [
  {
    id: 'de-market',
    label: { de: 'DE Market (Flotte + Logistik)', en: 'DE Market (Fleet + Logistics)' },
    value: 24.0e9,
    currency: 'EUR',
    year: 2024,
    sourceId: 'market-anchor'
  },
  {
    id: 'eu-market',
    label: { de: 'EU/EEA Market', en: 'EU/EEA Market' },
    value: 250.0e9,
    currency: 'EUR',
    year: 2024,
    sourceId: 'market-anchor'
  }
]
