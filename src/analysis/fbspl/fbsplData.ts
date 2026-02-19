export type BiText = { de: string; en: string }

export type CompanyFact = {
  label: BiText
  value: BiText
}

export type ServiceItem = {
  title: BiText
  detail: BiText
}

export type RiskItem = {
  risk: BiText
  likelihood: number
  impact: number
  mitigation: BiText
}

export const companyProfile: { fbspl: CompanyFact[]; insurfox: CompanyFact[] } = {
  fbspl: [
    {
      label: { de: 'Unternehmen', en: 'Company' },
      value: { de: 'FBSPL (Fusion Business Solutions)', en: 'FBSPL (Fusion Business Solutions)' }
    },
    {
      label: { de: 'Gründung', en: 'Founded' },
      value: { de: '2011 (öffentlich kommuniziert)', en: '2011 (publicly stated)' }
    },
    {
      label: { de: 'Standorte', en: 'Locations' },
      value: { de: 'Öffentlich nicht vollständig offengelegt', en: 'Not fully disclosed publicly' }
    },
    {
      label: { de: 'Positionierung', en: 'Positioning' },
      value: {
        de: 'BPO/VA + Consulting + Prozessautomatisierung für Versicherungsbetriebsmodelle',
        en: 'BPO/VA + consulting + process automation for insurance operating models'
      }
    }
  ],
  insurfox: [
    {
      label: { de: 'Rolle', en: 'Role' },
      value: { de: 'MGA / Broker + Plattformbetreiber (IaaS) + AI Workflow Execution', en: 'MGA / broker + platform operator (IaaS) + AI workflow execution' }
    },
    {
      label: { de: 'Kernmodule', en: 'Core modules' },
      value: { de: 'Brokerfox, Claimsfox, Underwriting, Fleet/Partner-Ökosystem', en: 'Brokerfox, Claimsfox, underwriting, fleet/partner ecosystem' }
    },
    {
      label: { de: 'Wertbeitrag', en: 'Value contribution' },
      value: { de: 'Digitale Prozessführung, Governance und datengetriebene Entscheidungen', en: 'Digital process execution, governance, and data-driven decisions' }
    }
  ]
}

export const services: ServiceItem[] = [
  {
    title: { de: 'Insurance Outsourcing & Consulting', en: 'Insurance Outsourcing & Consulting' },
    detail: {
      de: 'Policy Processing, Claims, Renewals, COI Issuance, Agency Optimization, AMS/CRM Integration.',
      en: 'Policy processing, claims, renewals, COI issuance, agency optimization, AMS/CRM integration.'
    }
  },
  {
    title: { de: 'P&C Consulting / Outsourcing', en: 'P&C Consulting / Outsourcing' },
    detail: {
      de: 'Claims Acceleration, Compliance Support und Talent-on-Demand in operativen Teams.',
      en: 'Claims acceleration, compliance support, and talent-on-demand for operational teams.'
    }
  },
  {
    title: { de: 'AI / BI / Analytics', en: 'AI / BI / Analytics' },
    detail: {
      de: 'AI Services, Analytics und Reporting zur Prozessverbesserung und Steuerung.',
      en: 'AI services, analytics, and reporting for process improvement and steering.'
    }
  },
  {
    title: { de: 'Customer Support Outsourcing', en: 'Customer Support Outsourcing' },
    detail: {
      de: 'Service-Desk-orientierte Unterstützung für versicherungsnahe Kundenprozesse.',
      en: 'Service-desk oriented support for insurance-related customer processes.'
    }
  }
]

export const differentiation: BiText = {
  de: 'FBSPL kombiniert operative Kapazität (BPO/VA), consulting-nahe Prozessgestaltung und ausgewählte Automatisierungsbausteine.',
  en: 'FBSPL combines operational capacity (BPO/VA), consulting-style process design, and selected automation enablers.'
}

export const risks: RiskItem[] = [
  {
    risk: { de: 'Datensicherheit und Zugriffskontrolle', en: 'Data security and access control' },
    likelihood: 3,
    impact: 5,
    mitigation: { de: 'Zugriffsmodell, Least-Privilege, Audit-Logging, DPA/SCC.', en: 'Access model, least privilege, audit logging, DPA/SCC.' }
  },
  {
    risk: { de: 'Qualität und Rework', en: 'Quality and rework' },
    likelihood: 4,
    impact: 4,
    mitigation: { de: 'SLA, QA Sampling, duale Freigaben und KPI-Gates.', en: 'SLA, QA sampling, dual approvals, and KPI gates.' }
  },
  {
    risk: { de: 'Regulatorische Trennung', en: 'Regulatory separation' },
    likelihood: 3,
    impact: 5,
    mitigation: { de: 'Keine Delegation regulierter Entscheidungen ohne Governance.', en: 'No delegation of regulated decisions without governance.' }
  },
  {
    risk: { de: 'Vendor Lock-in', en: 'Vendor lock-in' },
    likelihood: 3,
    impact: 4,
    mitigation: { de: 'Exit-Klauseln, Runbooks und Cross-Training.', en: 'Exit clauses, runbooks, and cross-training.' }
  },
  {
    risk: { de: 'Wissensverlust intern', en: 'Internal knowledge erosion' },
    likelihood: 3,
    impact: 4,
    mitigation: { de: 'Retained Team, SOP Ownership und Trainingsplan.', en: 'Retained team, SOP ownership, and training plan.' }
  },
  {
    risk: { de: 'Zeitzonenabhängigkeit', en: 'Time-zone dependency' },
    likelihood: 2,
    impact: 3,
    mitigation: { de: 'Shift-Overlaps und klare Escalation Windows.', en: 'Shift overlaps and clear escalation windows.' }
  }
]

export const referenceUrls = [
  'https://www.fbspl.com/frequently-asked-questions',
  'https://www.fbspl.com/services/property-and-casualty-insurance-consulting-and-outsourcing-services'
]
