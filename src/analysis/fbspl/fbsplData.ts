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

export type ContactRoleTemplate = {
  role: BiText
  region: string
  businessUnit: string
  linkedin: string
  note: BiText
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
      label: { de: 'Operating Model', en: 'Operating model' },
      value: {
        de: 'Human Intelligence + AI zur Reduktion von TAT und zur Produktivitätssteigerung.',
        en: 'Human intelligence + AI to reduce turnaround times and increase productivity.'
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
      value: { de: 'Hybrid MGA + Broker + Plattform (IaaS) + AI Operator', en: 'Hybrid MGA + broker + platform (IaaS) + AI operator' }
    },
    {
      label: { de: 'Kernwert', en: 'Core value' },
      value: {
        de: 'End-to-end Versicherungsinfrastruktur mit Workflow, Governance und operativer AI-Execution.',
        en: 'End-to-end insurance infrastructure with workflow, governance, and operational AI execution.'
      }
    },
    {
      label: { de: 'Kontrollfokus', en: 'Control focus' },
      value: {
        de: 'Underwriting-/Claims-Entscheidungslogik, Plattformsteuerung, Datenhoheit.',
        en: 'Underwriting/claims decision logic, platform control, data ownership.'
      }
    }
  ]
}

export const capabilityRows: CapabilityRow[] = [
  {
    category: { de: 'Policy Lifecycle (Quote -> Issuance -> Endorsements)', en: 'Policy lifecycle (quote -> issuance -> endorsements)' },
    fbspl: { de: 'Operative Bearbeitung und Back-office-Support', en: 'Operational processing and back-office support' },
    insurfox: { de: 'Plattform-native Orchestrierung und Produktsteuerung', en: 'Platform-native orchestration and product steering' }
  },
  {
    category: { de: 'Claims Management Support', en: 'Claims management support' },
    fbspl: { de: 'Triage, Dokumentation, Follow-up, TAT-Fokus', en: 'Triage, documentation, follow-up, TAT focus' },
    insurfox: { de: 'Claims-Workflow, FNOL, Governance und Entscheidungsführung', en: 'Claims workflow, FNOL, governance, and decision leadership' }
  },
  {
    category: { de: 'Renewals & COI Issuance', en: 'Renewals & COI issuance' },
    fbspl: { de: 'Hohe operative Eignung bei standardisierten Volumina', en: 'High operational fit for standardized volumes' },
    insurfox: { de: 'Regelwerke, Priorisierung und Eskalationssteuerung', en: 'Rules, prioritization, and escalation control' }
  },
  {
    category: { de: 'Compliance & QA', en: 'Compliance & QA' },
    fbspl: { de: 'SLA- und QA-basierte Ausführung, kontrollpflichtig', en: 'SLA and QA based execution, requires oversight' },
    insurfox: { de: 'Regulatorische Endverantwortung und Auditability', en: 'Regulatory end-accountability and auditability' }
  },
  {
    category: { de: 'AI-Driven Automation', en: 'AI-driven automation' },
    fbspl: { de: 'Enablement-orientiert in Operations', en: 'Enablement-oriented in operations' },
    insurfox: { de: 'Direkt in Kern-Workflows integriert', en: 'Directly integrated into core workflows' }
  },
  {
    category: { de: 'Platform Native Execution', en: 'Platform native execution' },
    fbspl: { de: 'Servicebereitstellung auf Kundenplattformen', en: 'Service delivery on client platforms' },
    insurfox: { de: 'Eigene modulare Plattform mit End-to-end-Steuerung', en: 'Own modular platform with end-to-end control' }
  },
  {
    category: { de: 'Underwriting Authority', en: 'Underwriting authority' },
    fbspl: { de: 'Keine originäre Underwriting Authority im Mandantenmodell', en: 'No native underwriting authority in client service model' },
    insurfox: { de: 'MGA-/Broker-orientierte Underwriting-Kontrolle', en: 'MGA/broker-oriented underwriting control' }
  },
  {
    category: { de: 'Distribution Access', en: 'Distribution access' },
    fbspl: { de: 'Indirekt über Kundenbeziehungen', en: 'Indirect via client relationships' },
    insurfox: { de: 'Direkt über MGA-/Broker- und Plattformkanäle', en: 'Direct through MGA/broker and platform channels' }
  }
]

export const capabilityCoverage = [
  { area: 'Back Office Support', fbspl: 90, insurfox: 72 },
  { area: 'Claims Ops Support', fbspl: 84, insurfox: 78 },
  { area: 'Underwriting Support', fbspl: 72, insurfox: 82 },
  { area: 'Regulatory Advisory Support', fbspl: 60, insurfox: 74 },
  { area: 'AI Integration', fbspl: 68, insurfox: 86 },
  { area: 'BI Dashboards', fbspl: 73, insurfox: 80 }
]

export const strategicFitPoints = [
  { name: 'Capacity sourcing partner', overlap: 30, value: 82 },
  { name: 'Claims enablement partner', overlap: 44, value: 89 },
  { name: 'Process-heavy overlap zone', overlap: 68, value: 56 },
  { name: 'Neutral delivery zone', overlap: 52, value: 70 },
  { name: 'Threat zone (expanded scope)', overlap: 78, value: 45 }
]

export const synergies: BiText[] = [
  {
    de: 'Operative Kapazität für Backoffice, Policy-Ops und COI-Pipelines.',
    en: 'Operational capacity for back office, policy operations, and COI pipelines.'
  },
  {
    de: 'Entlastung hochvolumiger Standardprozesse zugunsten von Kernentscheidungen.',
    en: 'Offloading high-volume standard tasks to protect core decision capacity.'
  },
  {
    de: 'SLA/KPI-Standardisierung als Hebel für TAT und Qualität.',
    en: 'SLA/KPI standardization as a lever for TAT and quality.'
  }
]

export const riskHeatmap: HeatmapRisk[] = [
  { label: { de: 'Data Security & Governance', en: 'Data security & governance' }, likelihood: 3, impact: 5 },
  { label: { de: 'Quality Variability', en: 'Quality variability' }, likelihood: 4, impact: 4 },
  { label: { de: 'Regulatory Accountability Gap', en: 'Regulatory accountability gap' }, likelihood: 3, impact: 5 },
  { label: { de: 'Vendor Lock-in', en: 'Vendor lock-in' }, likelihood: 3, impact: 4 },
  { label: { de: 'Pricing Pressure', en: 'Pricing pressure' }, likelihood: 3, impact: 3 }
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
    label: { de: 'Operational Pilot', en: 'Operational pilot' },
    risk: 2,
    control: 4,
    timeToValue: 4,
    compliance: 2,
    upside: 3
  },
  {
    option: 'B',
    label: { de: 'Strategic Ops Partnership', en: 'Strategic ops partnership' },
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
    label: { de: 'Internal Build (No Partnership)', en: 'Internal build (no partnership)' },
    risk: 4,
    control: 5,
    timeToValue: 2,
    compliance: 4,
    upside: 3
  }
]

export const contactRoleTemplates: ContactRoleTemplate[] = [
  {
    role: { de: 'VP / Head Insurance Outsourcing', en: 'VP / Head Insurance Outsourcing' },
    region: '',
    businessUnit: 'Insurance Outsourcing',
    linkedin: '',
    note: { de: 'verify', en: 'verify' }
  },
  {
    role: { de: 'Head of P&C Services', en: 'Head of P&C Services' },
    region: '',
    businessUnit: 'P&C Services',
    linkedin: '',
    note: { de: 'verify', en: 'verify' }
  },
  {
    role: { de: 'Head of Automation & AI Practice', en: 'Head of Automation & AI Practice' },
    region: '',
    businessUnit: 'Automation & AI',
    linkedin: '',
    note: { de: 'verify', en: 'verify' }
  },
  {
    role: { de: 'Head of Strategic Accounts (Insurance)', en: 'Head of Strategic Accounts (Insurance)' },
    region: '',
    businessUnit: 'Strategic Accounts',
    linkedin: '',
    note: { de: 'verify', en: 'verify' }
  }
]

export const sourceUrls = [
  'https://www.fbspl.com/',
  'https://www.fbspl.com/frequently-asked-questions',
  'https://www.fbspl.com/services/property-and-casualty-insurance-consulting-and-outsourcing-services'
]
