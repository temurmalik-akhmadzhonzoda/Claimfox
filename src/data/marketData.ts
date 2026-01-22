export type Year = number

export type MoneyEUR = {
  value: number
  currency: 'EUR'
}

export type Percent = {
  value: number
}

export type SourceRef = {
  id: string
  title: string
  publisher: string
  year: Year
  documentType: string
  lastVerified: string
  url: string
}

export type KpiDatum = {
  id: string
  label: {
    de: string
    en: string
  }
  value: MoneyEUR | Percent
  unitLabel?: {
    de: string
    en: string
  }
  sourceId: string
}

export type MarketData = {
  hero: {
    title: {
      de: string
      en: string
    }
    subtitle: {
      de: string
      en: string
    }
  }
  chips: KpiDatum[]
  kpis: {
    germany: KpiDatum[]
    europe: KpiDatum[]
    company: KpiDatum[]
  }
  charts: {
    germanyComposition: KpiDatum[]
    deVsEea: {
      id: string
      label: {
        de: string
        en: string
      }
      value: MoneyEUR
      sourceId: string
      isEstimate?: boolean
    }[]
    logisticsStack: {
      id: string
      label: {
        de: string
        en: string
      }
      value: MoneyEUR
      sourceId: string
    }[]
  }
  methodology: {
    definitions: {
      title: { de: string; en: string }
      bullets: { de: string[]; en: string[] }
    }
    motorVsFleet: {
      title: { de: string; en: string }
      bullets: { de: string[]; en: string[] }
    }
    approaches: {
      title: { de: string; en: string }
      topDown: { de: string[]; en: string[] }
      bottomUp: { de: string[]; en: string[] }
    }
    note: { de: string; en: string }
  }
  sources: SourceRef[]
  disclaimer: { de: string; en: string }
}

export const marketData: MarketData = {
  // Extend by adding new KPIs, charts, or sources in this file.
  hero: {
    title: {
      de: 'Fleet & Commercial Insurance Market — Logistics & Freight',
      en: 'Fleet & Commercial Insurance Market — Logistics & Freight'
    },
    subtitle: {
      de: 'Germany first, Europe next | Investor- & Carrier-grade market anchors',
      en: 'Germany first, Europe next | Investor- & Carrier-grade market anchors'
    }
  },
  chips: [
    {
      id: 'chip-de-composite',
      label: { de: 'DE Komposit 2024', en: 'DE Composite 2024' },
      value: { value: 92.516e9, currency: 'EUR' },
      sourceId: 'gdv-2024'
    },
    {
      id: 'chip-de-motor',
      label: { de: 'DE Kraftfahrt 2024', en: 'DE Motor 2024' },
      value: { value: 34.015e9, currency: 'EUR' },
      sourceId: 'gdv-2024'
    },
    {
      id: 'chip-de-transport',
      label: { de: 'DE Transport 2024', en: 'DE Transport 2024' },
      value: { value: 2.467e9, currency: 'EUR' },
      sourceId: 'gdv-2024'
    },
    {
      id: 'chip-eea-nonlife',
      label: { de: 'EEA Non-Life 2023', en: 'EEA Non-Life 2023' },
      value: { value: 709e9, currency: 'EUR' },
      sourceId: 'eiopa-2023'
    },
    {
      id: 'chip-eea-growth',
      label: { de: 'EEA YoY Growth 2024', en: 'EEA YoY Growth 2024' },
      value: { value: 0.082 },
      unitLabel: { de: 'Wachstum', en: 'Growth' },
      sourceId: 'eiopa-2024-growth'
    }
  ],
  kpis: {
    germany: [
      {
        id: 'de-composite',
        label: { de: 'Komposit gesamt (Schaden/Unfall)', en: 'Non-Life composite total' },
        value: { value: 92.516e9, currency: 'EUR' },
        sourceId: 'gdv-2024'
      },
      {
        id: 'de-motor',
        label: { de: 'Kraftfahrt gesamt', en: 'Motor total' },
        value: { value: 34.015e9, currency: 'EUR' },
        sourceId: 'gdv-2024'
      },
      {
        id: 'de-transport',
        label: { de: 'Transport- und Luftfahrt', en: 'Transport & aviation' },
        value: { value: 2.467e9, currency: 'EUR' },
        sourceId: 'gdv-2024'
      },
      {
        id: 'de-liability',
        label: { de: 'Allgemeine Haftpflicht', en: 'General liability' },
        value: { value: 8.932e9, currency: 'EUR' },
        sourceId: 'gdv-2024'
      },
      {
        id: 'de-property',
        label: {
          de: 'Sach Industrie/Gewerbe/Landwirtschaft',
          en: 'Property industrial/commercial/agri'
        },
        value: { value: 11.306e9, currency: 'EUR' },
        sourceId: 'gdv-2024'
      },
      {
        id: 'de-technical',
        label: { de: 'Technische Versicherungen', en: 'Technical lines' },
        value: { value: 3.044e9, currency: 'EUR' },
        sourceId: 'gdv-2024'
      },
      {
        id: 'de-cyber',
        label: { de: 'Cyber', en: 'Cyber' },
        value: { value: 0.33e9, currency: 'EUR' },
        sourceId: 'gdv-2024'
      }
    ],
    europe: [
      {
        id: 'eea-nonlife',
        label: { de: 'EEA Non-Life GWP 2023', en: 'EEA Non-Life GWP 2023' },
        value: { value: 709e9, currency: 'EUR' },
        sourceId: 'eiopa-2023'
      },
      {
        id: 'eea-growth',
        label: { de: 'Non-Life Premium Growth 2024', en: 'Non-Life premium growth 2024' },
        value: { value: 0.082 },
        unitLabel: { de: 'YoY', en: 'YoY' },
        sourceId: 'eiopa-2024-growth'
      }
    ],
    company: [
      {
        id: 'schenker-premiums',
        label: {
          de: 'Schenker (Re)Insurance DAC – Prämien 2024',
          en: 'Schenker (Re)Insurance DAC – Premiums 2024'
        },
        value: { value: 28.956e6, currency: 'EUR' },
        sourceId: 'schenker-2024'
      }
    ]
  },
  charts: {
    germanyComposition: [
      {
        id: 'chart-motor',
        label: { de: 'Kraftfahrt', en: 'Motor' },
        value: { value: 34.015e9, currency: 'EUR' },
        sourceId: 'gdv-2024'
      },
      {
        id: 'chart-transport',
        label: { de: 'Transport', en: 'Transport' },
        value: { value: 2.467e9, currency: 'EUR' },
        sourceId: 'gdv-2024'
      },
      {
        id: 'chart-liability',
        label: { de: 'Haftpflicht', en: 'Liability' },
        value: { value: 8.932e9, currency: 'EUR' },
        sourceId: 'gdv-2024'
      },
      {
        id: 'chart-property',
        label: { de: 'Sach', en: 'Property' },
        value: { value: 11.306e9, currency: 'EUR' },
        sourceId: 'gdv-2024'
      },
      {
        id: 'chart-technical',
        label: { de: 'Technisch', en: 'Technical' },
        value: { value: 3.044e9, currency: 'EUR' },
        sourceId: 'gdv-2024'
      },
      {
        id: 'chart-cyber',
        label: { de: 'Cyber', en: 'Cyber' },
        value: { value: 0.33e9, currency: 'EUR' },
        sourceId: 'gdv-2024'
      }
    ],
    deVsEea: [
      {
        id: 'de-total',
        label: { de: 'DE Komposit 2024', en: 'DE Non-Life 2024' },
        value: { value: 92.516e9, currency: 'EUR' },
        sourceId: 'gdv-2024'
      },
      {
        id: 'eea-total',
        label: { de: 'EEA Non-Life 2023', en: 'EEA Non-Life 2023' },
        value: { value: 709e9, currency: 'EUR' },
        sourceId: 'eiopa-2023'
      },
      {
        id: 'eea-2024e',
        label: { de: 'EEA Non-Life 2024e', en: 'EEA Non-Life 2024e' },
        value: { value: 709e9 * 1.082, currency: 'EUR' },
        sourceId: 'eiopa-2024-growth',
        isEstimate: true
      }
    ],
    logisticsStack: [
      {
        id: 'stack-motor',
        label: { de: 'Fleet Motor', en: 'Fleet Motor' },
        value: { value: 34.015e9, currency: 'EUR' },
        sourceId: 'gdv-2024'
      },
      {
        id: 'stack-cargo',
        label: { de: 'Cargo', en: 'Cargo' },
        value: { value: 2.467e9, currency: 'EUR' },
        sourceId: 'gdv-2024'
      },
      {
        id: 'stack-liability',
        label: { de: 'Liability', en: 'Liability' },
        value: { value: 8.932e9, currency: 'EUR' },
        sourceId: 'gdv-2024'
      },
      {
        id: 'stack-property',
        label: { de: 'Property', en: 'Property' },
        value: { value: 11.306e9, currency: 'EUR' },
        sourceId: 'gdv-2024'
      },
      {
        id: 'stack-technical',
        label: { de: 'Technical', en: 'Technical' },
        value: { value: 3.044e9, currency: 'EUR' },
        sourceId: 'gdv-2024'
      },
      {
        id: 'stack-cyber',
        label: { de: 'Cyber', en: 'Cyber' },
        value: { value: 0.33e9, currency: 'EUR' },
        sourceId: 'gdv-2024'
      }
    ]
  },
  methodology: {
    definitions: {
      title: { de: 'Definitions', en: 'Definitions' },
      bullets: {
        de: [
          'Fleet Motor = Kraftfahrtprämien mit gewerblichem Flottenfokus.',
          'Logistik‑relevante Komposit = Motor + Cargo + Liability + Property + Technical + Cyber.',
          'Komposit gesamt umfasst nicht-logistiknahe Segmente (Privat, KMU, Speziallinien).'
        ],
        en: [
          'Fleet Motor = motor premiums with a commercial fleet focus.',
          'Logistics-relevant composite = Motor + Cargo + Liability + Property + Technical + Cyber.',
          'Composite total includes non-logistics segments (personal, SME, specialty lines).'
        ]
      }
    },
    motorVsFleet: {
      title: { de: 'Why Motor total ≠ Fleet', en: 'Why motor total ≠ fleet' },
      bullets: {
        de: [
          'Privatanteile und nicht-gewerbliche Flotten verzerren das Gesamtbild.',
          'Segmentierung nach Fuhrparkgröße, Nutzung und Branche erforderlich.',
          'Fleet-Exposure korreliert mit Logistikketten und Vertragslaufzeiten.'
        ],
        en: [
          'Private and non-commercial exposure distorts total motor premium.',
          'Segmentation by fleet size, usage and industry is required.',
          'Fleet exposure correlates with logistics chains and contract duration.'
        ]
      }
    },
    approaches: {
      title: { de: 'Approaches', en: 'Approaches' },
      topDown: {
        de: [
          'Marktanker (GDV/EIOPA) als Obergrenze.',
          'Segmentierung in logistikrelevante Sparten.',
          'Korrekturfaktoren für Privatanteile.'
        ],
        en: [
          'Use market anchors (GDV/EIOPA) as upper bounds.',
          'Segment into logistics-relevant lines.',
          'Apply correction factors for personal lines.'
        ]
      },
      bottomUp: {
        de: [
          'Broker- und Flottenlisten aggregieren.',
          'Exposure-Modelle je Branche (Spedition, Logistik, 3PL).',
          'Validierung mit Captive-/SFCR-Daten.'
        ],
        en: [
          'Aggregate broker and fleet lists.',
          'Exposure models per vertical (freight, logistics, 3PL).',
          'Validate with captive/SFCR filings.'
        ]
      }
    },
    note: {
      de: 'Public sources do not disclose company-level fleet premiums for DSV/DACHSER/DB Schenker; instead use regulatory filings (captives) and market anchors.',
      en: 'Public sources do not disclose company-level fleet premiums for DSV/DACHSER/DB Schenker; instead use regulatory filings (captives) and market anchors.'
    }
  },
  sources: [
    {
      id: 'gdv-2024',
      title: 'GDV Statistics',
      publisher: 'GDV',
      year: 2024,
      documentType: 'GDV stats',
      lastVerified: '2026-01-22',
      url: 'TBD'
    },
    {
      id: 'eiopa-2023',
      title: 'EIOPA Insurance Statistics',
      publisher: 'EIOPA',
      year: 2023,
      documentType: 'EIOPA report',
      lastVerified: '2026-01-22',
      url: 'TBD'
    },
    {
      id: 'eiopa-2024-growth',
      title: 'EIOPA Premium Growth',
      publisher: 'EIOPA',
      year: 2024,
      documentType: 'EIOPA report',
      lastVerified: '2026-01-22',
      url: 'TBD'
    },
    {
      id: 'schenker-2024',
      title: 'Schenker (Re)Insurance DAC',
      publisher: 'Schenker',
      year: 2024,
      documentType: 'SFCR',
      lastVerified: '2026-01-22',
      url: 'TBD'
    }
  ],
  disclaimer: {
    de: 'Öffentlich verfügbare Daten; gewerbliche Flottenprämie nicht 1:1 aus GDV ableitbar; ggf. Schätzmodell erforderlich.',
    en: 'Public data only; commercial fleet premium not 1:1 derivable from GDV; estimation model may be required.'
  }
}
