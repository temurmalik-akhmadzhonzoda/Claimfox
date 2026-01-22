export type LeadCategory = 'Operator' | 'Platform' | 'Broker'

export type ExposureType = 'Direct' | 'Indirect' | 'Brokered'

export type LeadItem = {
  id: string
  name: string
  category: LeadCategory
  exposureType: ExposureType
  shareDE?: number
  shareEU?: number
  notes: {
    de: string
    en: string
  }
}

export const leads: LeadItem[] = [
  {
    id: 'db-schenker',
    name: 'DB Schenker',
    category: 'Operator',
    exposureType: 'Direct',
    notes: {
      de: 'Großflottenbetreiber; Marktanteil TBD.',
      en: 'Large fleet operator; market share TBD.'
    }
  },
  {
    id: 'dsv',
    name: 'DSV',
    category: 'Operator',
    exposureType: 'Direct',
    notes: {
      de: 'Spedition und Logistik; Marktanteil TBD.',
      en: 'Freight forwarding & logistics; share TBD.'
    }
  },
  {
    id: 'dachser',
    name: 'DACHSER',
    category: 'Operator',
    exposureType: 'Direct',
    notes: {
      de: 'Logistiknetzwerk; Marktanteil TBD.',
      en: 'Logistics network; share TBD.'
    }
  },
  {
    id: 'hellmann',
    name: 'Hellmann',
    category: 'Operator',
    exposureType: 'Direct',
    notes: {
      de: 'Globaler Logistikdienstleister; Marktanteil TBD.',
      en: 'Global logistics provider; share TBD.'
    }
  },
  {
    id: 'mosolf',
    name: 'MOSOLF',
    category: 'Operator',
    exposureType: 'Direct',
    notes: {
      de: 'Automotive Logistik; Marktanteil TBD.',
      en: 'Automotive logistics; share TBD.'
    }
  },
  {
    id: 'schockemoehle',
    name: 'Schockemöhle',
    category: 'Operator',
    exposureType: 'Direct',
    notes: {
      de: 'Logistik/Transport; Marktanteil TBD.',
      en: 'Logistics/transport; share TBD.'
    }
  },
  {
    id: 'zufall',
    name: 'Zufall',
    category: 'Operator',
    exposureType: 'Direct',
    notes: {
      de: 'Regionaler Logistikverbund; Marktanteil TBD.',
      en: 'Regional logistics network; share TBD.'
    }
  },
  {
    id: 'walther',
    name: 'Walther',
    category: 'Operator',
    exposureType: 'Direct',
    notes: {
      de: 'Transport/Logistik; Marktanteil TBD.',
      en: 'Transport/logistics; share TBD.'
    }
  },
  {
    id: 'wanning',
    name: 'Wanning',
    category: 'Operator',
    exposureType: 'Direct',
    notes: {
      de: 'Transport/Spedition; Marktanteil TBD.',
      en: 'Transport/freight; share TBD.'
    }
  },
  {
    id: 'transporeon',
    name: 'Transporeon',
    category: 'Platform',
    exposureType: 'Indirect',
    notes: {
      de: 'Plattformbasiert; Marktanteil TBD.',
      en: 'Platform-based; share TBD.'
    }
  },
  {
    id: 'timocom',
    name: 'TIMOCOM',
    category: 'Platform',
    exposureType: 'Indirect',
    notes: {
      de: 'Transportplattform; Marktanteil TBD.',
      en: 'Transport platform; share TBD.'
    }
  },
  {
    id: 'nacora',
    name: 'NACORA',
    category: 'Broker',
    exposureType: 'Brokered',
    notes: {
      de: 'Brokered exposure; Marktanteil TBD.',
      en: 'Brokered exposure; share TBD.'
    }
  },
  {
    id: 'ggw',
    name: 'GGW',
    category: 'Broker',
    exposureType: 'Brokered',
    notes: {
      de: 'Spezialmakler; Marktanteil TBD.',
      en: 'Specialty broker; share TBD.'
    }
  },
  {
    id: 'wecoya',
    name: 'Wecoya',
    category: 'Broker',
    exposureType: 'Brokered',
    notes: {
      de: 'Brokered/structured exposure; Marktanteil TBD.',
      en: 'Brokered/structured exposure; share TBD.'
    }
  }
]
