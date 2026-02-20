export type BiText = { de: string; en: string }

export type CompanyFact = {
  label: BiText
  value: BiText
}

export type CapabilityRow = {
  category: BiText
  fbspl: BiText
  insurfox: BiText
}

export type SolutionLensRow = {
  lens: BiText
  fbspl: BiText
  insurfox: BiText
  implication: BiText
}

export type CoverageRow = {
  area: BiText
  fbspl: number
  insurfox: number
}

export type StrategicPoint = {
  name: BiText
  overlap: number
  value: number
}

export type HeatmapRisk = {
  label: BiText
  likelihood: number
  impact: number
}

export type DecisionOption = {
  option: string
  label: BiText
  risk: number
  control: number
  timeToValue: number
  compliance: number
  upside: number
}

export type ContactPerson = {
  name: string
  role: BiText
  region: BiText
  businessUnit: BiText
  linkedinUrl?: string
  source: string
}

export const companyProfile: { fbspl: CompanyFact[]; insurfox: CompanyFact[] } = {
  fbspl: [
    {
      label: { de: 'Unternehmen', en: 'Company' },
      value: { de: 'Fusion Business Solutions P. Ltd. (FBSPL)', en: 'Fusion Business Solutions P. Ltd. (FBSPL)' }
    },
    {
      label: { de: 'Seit', en: 'Since' },
      value: { de: '2006 (BPM- und Insurance-Outsourcing-Positionierung)', en: '2006 (BPM and insurance outsourcing positioning)' }
    },
    {
      label: { de: 'Kernangebot', en: 'Core offering' },
      value: {
        de: 'P&C Insurance Outsourcing und Consulting: Policy Processing, Claims Support, Renewals, COI, Customer Support.',
        en: 'P&C insurance outsourcing and consulting: policy processing, claims support, renewals, COI, customer support.'
      }
    },
    {
      label: { de: 'Betriebsmodell', en: 'Operating model' },
      value: {
        de: 'Kombination aus Human Intelligence + AI zur Senkung von Turnaround-Zeiten und Steigerung der Produktivität.',
        en: 'Combination of human intelligence + AI to reduce turnaround times and increase productivity.'
      }
    },
    {
      label: { de: 'Primäre Zielkunden', en: 'Primary client targets' },
      value: { de: 'Carriers, MGAs, Brokers und Agencies.', en: 'Carriers, MGAs, brokers, and agencies.' }
    }
  ],
  insurfox: [
    {
      label: { de: 'Positionierung', en: 'Positioning' },
      value: { de: 'Hybrid aus MGA + Broker + Plattformbetreiber (IaaS) + AI Operator', en: 'Hybrid of MGA + broker + platform operator (IaaS) + AI operator' }
    },
    {
      label: { de: 'Kernwert', en: 'Core value' },
      value: {
        de: 'End-to-end Versicherungsinfrastruktur mit Workflow-Orchestrierung, Governance und operativer AI-Ausführung.',
        en: 'End-to-end insurance infrastructure with workflow orchestration, governance, and operational AI execution.'
      }
    },
    {
      label: { de: 'Kontrollfokus', en: 'Control focus' },
      value: {
        de: 'Underwriting-/Claims-Entscheidungslogik, Plattformsteuerung, Datenhoheit und Distribution Control.',
        en: 'Underwriting/claims decision logic, platform control, data ownership, and distribution control.'
      }
    }
  ]
}

export const solutionLensRows: SolutionLensRow[] = [
  {
    lens: { de: 'MGA-Linse', en: 'MGA lens' },
    fbspl: { de: 'Liefert Prozesskapazität und operative Stabilisierung für MGA-Backoffice.', en: 'Provides process capacity and operational stabilization for MGA back office.' },
    insurfox: { de: 'Steuert Underwriting-Mandat, Delegationsrahmen und Produktentscheidung.', en: 'Controls underwriting mandate, delegation framework, and product decisions.' },
    implication: { de: 'Partnerschaft ist sinnvoll, solange Entscheidungsmandate bei Insurfox verbleiben.', en: 'Partnership is effective as long as decision mandates stay with Insurfox.' }
  },
  {
    lens: { de: 'Broker-Linse', en: 'Broker lens' },
    fbspl: { de: 'Unterstützt Servicing, Renewals, Dokumentation und COI-Prozesse im Volumenbetrieb.', en: 'Supports servicing, renewals, documentation, and COI processes at volume.' },
    insurfox: { de: 'Steuert Distribution, Kundenzugang und Broker-Orchestrierung.', en: 'Controls distribution, client access, and broker orchestration.' },
    implication: { de: 'Hohe Synergie bei Servicequalität; Wettbewerb gering, solange FBSPL nicht in Distribution expandiert.', en: 'High service synergy; competitive pressure remains low unless FBSPL expands into distribution.' }
  },
  {
    lens: { de: 'Plattformbetreiber-Linse', en: 'Platform operator lens' },
    fbspl: { de: 'Arbeitet auf vorhandenen Kundenplattformen und ergänzt Execution-Layer.', en: 'Operates on client platforms and augments the execution layer.' },
    insurfox: { de: 'Betreibt die eigene Plattform inkl. Workflow, Data Layer und Auditability.', en: 'Operates own platform including workflow, data layer, and auditability.' },
    implication: { de: 'Klare Schnittstellen-/Governance-Regeln verhindern Kontrollverlust.', en: 'Clear interface and governance rules prevent control erosion.' }
  }
]

export const capabilityRows: CapabilityRow[] = [
  {
    category: { de: 'Policy Lifecycle (Quote -> Issuance -> Endorsements)', en: 'Policy lifecycle (quote -> issuance -> endorsements)' },
    fbspl: { de: 'Operative Bearbeitung und Backoffice-Support', en: 'Operational processing and back-office support' },
    insurfox: { de: 'Plattform-native Orchestrierung, Regelwerk und Produktsteuerung', en: 'Platform-native orchestration, rules, and product steering' }
  },
  {
    category: { de: 'Claims Management Support', en: 'Claims management support' },
    fbspl: { de: 'Triage, Dokumentation, Follow-up mit TAT-Fokus', en: 'Triage, documentation, and follow-up with TAT focus' },
    insurfox: { de: 'FNOL, Decisioning, Governance und End-to-end Fallsteuerung', en: 'FNOL, decisioning, governance, and end-to-end case control' }
  },
  {
    category: { de: 'Renewals & COI Issuance', en: 'Renewals & COI issuance' },
    fbspl: { de: 'Hohe Eignung in standardisierten Volumenprozessen', en: 'High fit in standardized high-volume processes' },
    insurfox: { de: 'Priorisierung, Qualitätssicherung und Ausnahme-Handling', en: 'Prioritization, quality assurance, and exception handling' }
  },
  {
    category: { de: 'Compliance & QA', en: 'Compliance & QA' },
    fbspl: { de: 'SLA/QA-basierte Ausführung unter Kundenkontrolle', en: 'SLA/QA-based execution under client controls' },
    insurfox: { de: 'Regulatorische Endverantwortung und Audit-Trail Ownership', en: 'Regulatory end-accountability and audit-trail ownership' }
  },
  {
    category: { de: 'AI-Driven Automation', en: 'AI-driven automation' },
    fbspl: { de: 'AI-gestützte Prozessbeschleunigung im Operations-Layer', en: 'AI-enabled process acceleration in operations layer' },
    insurfox: { de: 'AI direkt in Kern-Workflows mit Entscheidungsbezug', en: 'AI embedded in core workflows with decision relevance' }
  },
  {
    category: { de: 'Platform Native Execution', en: 'Platform native execution' },
    fbspl: { de: 'Servicebereitstellung auf Kundenplattformen', en: 'Service delivery on client platforms' },
    insurfox: { de: 'Eigene modulare Plattform mit End-to-end Prozesskontrolle', en: 'Own modular platform with end-to-end process control' }
  },
  {
    category: { de: 'Underwriting Authority', en: 'Underwriting authority' },
    fbspl: { de: 'Keine originäre Underwriting Authority im Service-Modell', en: 'No native underwriting authority in service model' },
    insurfox: { de: 'MGA-/Broker-orientierte Underwriting-Kontrolle', en: 'MGA/broker-oriented underwriting control' }
  },
  {
    category: { de: 'Distribution Access', en: 'Distribution access' },
    fbspl: { de: 'Indirekt über Kundenmandate', en: 'Indirect through client mandates' },
    insurfox: { de: 'Direkt über MGA-/Broker- und Plattformkanäle', en: 'Direct through MGA/broker and platform channels' }
  }
]

export const capabilityCoverage: CoverageRow[] = [
  { area: { de: 'Backoffice-Support', en: 'Back office support' }, fbspl: 90, insurfox: 72 },
  { area: { de: 'Claims-Ops-Support', en: 'Claims ops support' }, fbspl: 84, insurfox: 78 },
  { area: { de: 'Underwriting-Support', en: 'Underwriting support' }, fbspl: 72, insurfox: 82 },
  { area: { de: 'Regulatorischer Advisory-Support', en: 'Regulatory advisory support' }, fbspl: 60, insurfox: 74 },
  { area: { de: 'KI-Integration', en: 'AI integration' }, fbspl: 68, insurfox: 86 },
  { area: { de: 'BI-Dashboards', en: 'Business intelligence dashboards' }, fbspl: 73, insurfox: 80 }
]

export const strategicFitPoints: StrategicPoint[] = [
  { name: { de: 'Capacity-Sourcing-Partner', en: 'Capacity sourcing partner' }, overlap: 30, value: 82 },
  { name: { de: 'Claims-Enabler', en: 'Claims enablement partner' }, overlap: 44, value: 89 },
  { name: { de: 'Threat Zone (bei Scope-Erweiterung)', en: 'Threat zone (if scope expands)' }, overlap: 78, value: 45 },
  { name: { de: 'Neutrale Zone', en: 'Neutral zone' }, overlap: 52, value: 70 }
]

export const synergies: BiText[] = [
  {
    de: 'Operative Kapazität für Backoffice, Policy-Ops und COI-Pipelines.',
    en: 'Operational capacity for back office, policy operations, and COI pipelines.'
  },
  {
    de: 'Entlastung hochvolumiger Standardprozesse zugunsten von Kernentscheidungen.',
    en: 'Offloading high-volume standard tasks to protect core decision bandwidth.'
  },
  {
    de: 'SLA-/KPI-Standardisierung als Hebel für TAT und Prozessqualität.',
    en: 'SLA/KPI standardization as a lever for TAT and process quality.'
  }
]

export const riskHeatmap: HeatmapRisk[] = [
  { label: { de: 'Datensicherheit & Governance', en: 'Data security & governance' }, likelihood: 3, impact: 5 },
  { label: { de: 'Qualitätsvarianz', en: 'Quality variability' }, likelihood: 4, impact: 4 },
  { label: { de: 'Regulatorische Verantwortungsgrenze', en: 'Regulatory accountability boundary' }, likelihood: 3, impact: 5 },
  { label: { de: 'Vendor Lock-in', en: 'Vendor lock-in' }, likelihood: 3, impact: 4 },
  { label: { de: 'Preisdruck', en: 'Pricing pressure' }, likelihood: 3, impact: 3 }
]

export const riskBullets: BiText[] = [
  {
    de: 'Datensicherheit und Governance bei ausgelagerten Prozessschritten.',
    en: 'Data security and governance in outsourced process steps.'
  },
  {
    de: 'Qualitätsvarianz bei externen Teams ohne enges QA-Steering.',
    en: 'Quality variability in external teams without tight QA steering.'
  },
  {
    de: 'Regulatorische/compliance-seitige Endverantwortung bleibt bei Insurfox MGA.',
    en: 'Regulatory/compliance end-accountability remains with Insurfox MGA.'
  },
  {
    de: 'Lock-in- und Preisrisiken bei starker Lieferantenabhängigkeit.',
    en: 'Lock-in and pricing risk under strong vendor dependency.'
  }
]

export const decisionOptions: DecisionOption[] = [
  {
    option: 'A',
    label: { de: 'Operativer Pilot', en: 'Operational pilot' },
    risk: 2,
    control: 4,
    timeToValue: 4,
    compliance: 2,
    upside: 3
  },
  {
    option: 'B',
    label: { de: 'Strategische Ops-Partnerschaft', en: 'Strategic ops partnership' },
    risk: 3,
    control: 3,
    timeToValue: 4,
    compliance: 3,
    upside: 4
  },
  {
    option: 'C',
    label: { de: 'Co-branded Service Delivery', en: 'Co-branded service delivery' },
    risk: 4,
    control: 3,
    timeToValue: 3,
    compliance: 4,
    upside: 5
  },
  {
    option: 'D',
    label: { de: 'Interner Aufbau (ohne Partnerschaft)', en: 'Internal build (no partnership)' },
    risk: 4,
    control: 5,
    timeToValue: 2,
    compliance: 4,
    upside: 3
  }
]

export const contactPeople: ContactPerson[] = [
  {
    name: 'Madhukar S Dubey',
    role: { de: 'Founder & Managing Director', en: 'Founder & Managing Director' },
    region: { de: 'Global', en: 'Global' },
    businessUnit: { de: 'Executive Leadership', en: 'Executive leadership' },
    source: 'https://www.fbspl.com/our-leadership'
  },
  {
    name: 'Vinod Verma',
    role: { de: 'Co-CEO', en: 'Co-CEO' },
    region: { de: 'Global', en: 'Global' },
    businessUnit: { de: 'Executive Leadership', en: 'Executive leadership' },
    source: 'https://www.fbspl.com/our-leadership'
  },
  {
    name: 'Ankur Chatterjee',
    role: { de: 'Deputy General Manager, Sales & Marketing', en: 'Deputy General Manager, Sales & Marketing' },
    region: { de: 'Versicherungsmarkt Kanada/Global', en: 'Insurance market Canada/global' },
    businessUnit: { de: 'Sales & Marketing', en: 'Sales & marketing' },
    source: 'https://www.fbspl.com/news/fbspl-at-ibaocon'
  },
  {
    name: 'Bharat Lokchandani',
    role: { de: 'Senior Manager & Domain Head, Operations', en: 'Senior Manager & Domain Head, Operations' },
    region: { de: 'Versicherungsbetrieb', en: 'Insurance operations' },
    businessUnit: { de: 'Insurance Operations', en: 'Insurance operations' },
    source: 'https://www.fbspl.com/our-leadership'
  }
]

export const sourceUrls = [
  'https://www.fbspl.com/',
  'https://www.fbspl.com/frequently-asked-questions',
  'https://www.fbspl.com/services/property-and-casualty-insurance-consulting-and-outsourcing-services',
  'https://www.fbspl.com/our-leadership',
  'https://www.fbspl.com/news/fbspl-at-ibaocon'
]
