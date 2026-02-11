export const claimsfoxTenants = [
  { id: 'tenant_demo_a', name: 'Nordlicht Insurance' },
  { id: 'tenant_demo_b', name: 'Atlas Mutual' },
  { id: 'tenant_demo_c', name: 'Harborview Underwriters' }
]

export const claimLines = [
  'Motor Fleet',
  'Cargo & Logistics',
  'General Liability',
  'Property All Risk',
  'Marine Cargo',
  'Cyber Incident',
  'Construction Liability'
]

export const claimStatuses = ['intake', 'triage', 'investigation', 'settlement', 'closed', 'denied'] as const

export const claimSeverities = ['low', 'medium', 'high', 'critical'] as const

export const insuredNames = [
  'Fleetwise Mobility SE',
  'Nordlicht Logistics GmbH',
  'Atlas Holding AG',
  'Südpol Advisory GmbH',
  'RheinCargo Partners',
  'Aurum Energy Services',
  'Helios Infrastructure KG',
  'Vanguard Manufacturing SA'
]

export const adjusters = [
  'mira.klein@claimsfox',
  'jonas.berg@claimsfox',
  'lea.schmidt@claimsfox',
  'alex.roth@claimsfox'
]

export const locations = [
  'Hamburg, DE',
  'Rotterdam, NL',
  'Bremen, DE',
  'Zurich, CH',
  'Vienna, AT',
  'Antwerp, BE'
]

export const tagsPool = [
  'temperature',
  'theft',
  'major loss',
  'litigation risk',
  'hazmat',
  'bodily injury',
  'suspicious',
  'multi-party'
]

export const partners = [
  { id: 'partner_alpha', name: 'Nord Repair Group', role: 'Repair Shop' },
  { id: 'partner_beta', name: 'Harbor Surveyors', role: 'Surveyor' },
  { id: 'partner_gamma', name: 'Transit Assist', role: 'Towing' },
  { id: 'partner_delta', name: 'Forensic Analytics AG', role: 'Fraud Lab' }
]

export const calendarTemplates = [
  { title: 'On-site inspection', location: 'Warehouse Dock 4' },
  { title: 'Broker status call', location: 'Video Conference' },
  { title: 'Medical invoice review', location: 'Claims Office' },
  { title: 'Fraud review board', location: 'Compliance Room' },
  { title: 'Settlement committee', location: 'HQ Munich' }
]

export const mailboxSubjects = [
  'Urgent: FNOL submission for Fleetwise Mobility',
  'Updated loss documentation attached',
  'Survey report - cargo damage incident',
  'Payment request and invoice summary',
  'Litigation notice received',
  'Repair estimate and parts list',
  'Triage follow-up questions',
  'Third-party liability statement'
]

export const documentNames = [
  'Loss_Notice.pdf',
  'Repair_Estimate.pdf',
  'Survey_Report.pdf',
  'Medical_Invoices.pdf',
  'Police_Report.pdf',
  'Cargo_Manifest.pdf',
  'Damage_Photos.zip',
  'Claimant_Statement.pdf',
  'Liability_Assessment.pdf',
  'Settlement_Proposal.pdf',
  'Payment_Authorization.pdf',
  'Fraud_Checklist.pdf',
  'Workshop_Log.txt',
  'Reserve_Worksheet.xlsx'
]

export const timelineNotes = [
  'Initial triage completed, awaiting documentation.',
  'Adjuster assigned, site inspection scheduled.',
  'Fraud indicators reviewed, no escalation required.',
  'Reserve updated after surveyor feedback.',
  'Settlement proposal drafted for committee review.'
]
