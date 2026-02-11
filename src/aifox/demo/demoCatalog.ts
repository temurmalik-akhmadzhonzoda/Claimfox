export const aifoxTenants = [
  { id: 'tenant_demo_a', name: 'Nordlicht Insurance' },
  { id: 'tenant_demo_b', name: 'Atlas Mutual' },
  { id: 'tenant_demo_c', name: 'Harborview Underwriters' }
]

export const claimLines = [
  'Motor Fleet',
  'Cargo & Logistics',
  'Property All Risk',
  'General Liability',
  'Cyber'
]

export const insuredNames = [
  'Fleetwise Mobility SE',
  'Nordlicht Logistics GmbH',
  'Atlas Holding AG',
  'Südpol Advisory GmbH',
  'RheinCargo Partners',
  'Aurum Energy Services'
]

export const fraudSignals = [
  'Repeated phone number usage',
  'Claim shortly after policy start',
  'Similar IP address cluster',
  'Multiple claims across regions',
  'Unusual repair estimate pattern'
]

export const calendarTemplates = [
  'Model retraining',
  'Compliance audit',
  'Fraud review',
  'Performance review',
  'Risk committee'
]

export const documentTypes = ['medical', 'police', 'policy'] as const

export const chatbotConversations = [
  {
    customer: 'Nina Kruger',
    topic: 'Claim status',
    messages: [
      { role: 'user', text: 'Can you tell me the status of my claim?' },
      { role: 'assistant', text: 'Your claim is currently in investigation. We expect an update within 3 business days.', confidence: 0.92 }
    ]
  },
  {
    customer: 'Lukas Weber',
    topic: 'Coverage question',
    messages: [
      { role: 'user', text: 'Is towing covered under my policy?' },
      { role: 'assistant', text: 'Yes, towing is covered up to €1,000 per incident under your policy.', confidence: 0.89 }
    ]
  },
  {
    customer: 'Isabel Roth',
    topic: 'Policy change',
    messages: [
      { role: 'user', text: 'I need to add a new driver to my policy.' },
      { role: 'assistant', text: 'I can help with that. Please share the driver details and effective date.', confidence: 0.87 }
    ]
  }
]
