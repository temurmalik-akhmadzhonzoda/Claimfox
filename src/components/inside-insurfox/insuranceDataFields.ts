export type InsuranceDataPhase =
  | 'Registration'
  | 'Fleet'
  | 'Driver'
  | 'Underwriting'
  | 'Claims'
  | 'Monitoring'
  | 'Renewal'

export type InsuranceDataField = {
  id: string
  phase: InsuranceDataPhase
  mask: string
  role: string[]
  fieldName: string
  fieldType: string
  purpose: string
  aiUsage: string | null
}

export const insuranceDataFields: InsuranceDataField[] = [
  { id: 'company-name', phase: 'Registration', mask: 'Company Onboarding', role: ['Broker', 'Corporate Client'], fieldName: 'Company Name', fieldType: 'string', purpose: 'Identify legal policyholder entity.', aiUsage: null },
  { id: 'legal-form', phase: 'Registration', mask: 'Company Onboarding', role: ['Broker', 'Corporate Client'], fieldName: 'Legal Form', fieldType: 'enum', purpose: 'Determine legal risk and policy wording requirements.', aiUsage: null },
  { id: 'vat-id', phase: 'Registration', mask: 'Company Onboarding', role: ['Broker', 'Corporate Client'], fieldName: 'VAT ID', fieldType: 'string', purpose: 'Support compliance and billing validation.', aiUsage: null },
  { id: 'address', phase: 'Registration', mask: 'Company Onboarding', role: ['Broker', 'Corporate Client'], fieldName: 'Address', fieldType: 'string', purpose: 'Bind policy location and geo-risk context.', aiUsage: null },
  { id: 'industry', phase: 'Registration', mask: 'Company Onboarding', role: ['Broker', 'Carrier', 'MGA'], fieldName: 'Industry', fieldType: 'enum', purpose: 'Segment portfolio and apply underwriting templates.', aiUsage: 'Used as model feature for baseline risk segmentation.' },
  { id: 'annual-revenue', phase: 'Registration', mask: 'Company Onboarding', role: ['Broker', 'Carrier', 'MGA'], fieldName: 'Annual Revenue', fieldType: 'number', purpose: 'Assess exposure and policy sizing corridor.', aiUsage: 'Input feature for expected loss and pricing suggestion.' },
  { id: 'claims-history-5y', phase: 'Registration', mask: 'Company Onboarding', role: ['Broker', 'Carrier', 'MGA'], fieldName: 'Claims History 5Y', fieldType: 'array', purpose: 'Assess historical loss behavior.', aiUsage: 'Feeds frequency/severity baseline models.' },

  { id: 'vin', phase: 'Fleet', mask: 'Fleet Profile', role: ['Corporate Client', 'Broker', 'MGA'], fieldName: 'VIN', fieldType: 'string', purpose: 'Uniquely identify insured vehicle object.', aiUsage: null },
  { id: 'license-plate', phase: 'Fleet', mask: 'Fleet Profile', role: ['Corporate Client', 'Broker'], fieldName: 'License Plate', fieldType: 'string', purpose: 'Operational matching in claims and monitoring.', aiUsage: null },
  { id: 'manufacturer', phase: 'Fleet', mask: 'Fleet Profile', role: ['Corporate Client', 'Broker'], fieldName: 'Manufacturer', fieldType: 'string', purpose: 'Vehicle risk classing and repair profile.', aiUsage: 'Feature in severity priors by vehicle class.' },
  { id: 'model', phase: 'Fleet', mask: 'Fleet Profile', role: ['Corporate Client', 'Broker'], fieldName: 'Model', fieldType: 'string', purpose: 'Detailed risk and claims-cost expectation.', aiUsage: 'Feature in expected severity model.' },
  { id: 'first-registration-date', phase: 'Fleet', mask: 'Fleet Profile', role: ['Corporate Client', 'Broker'], fieldName: 'First Registration Date', fieldType: 'date', purpose: 'Age profile for risk and maintenance context.', aiUsage: 'Feature in risk score drift adjustment.' },
  { id: 'vehicle-weight', phase: 'Fleet', mask: 'Fleet Profile', role: ['Corporate Client', 'MGA'], fieldName: 'Vehicle Weight', fieldType: 'number', purpose: 'Classify regulatory and liability exposure.', aiUsage: 'Feature in underwriting risk score.' },
  { id: 'usage-type', phase: 'Fleet', mask: 'Fleet Profile', role: ['Corporate Client', 'Broker', 'MGA'], fieldName: 'Usage Type', fieldType: 'enum', purpose: 'Differentiate exposure (urban, long-haul, mixed).', aiUsage: 'Primary feature for usage-based pricing tiers.' },
  { id: 'annual-mileage', phase: 'Fleet', mask: 'Fleet Profile', role: ['Corporate Client', 'Broker', 'MGA'], fieldName: 'Annual Mileage', fieldType: 'number', purpose: 'Estimate frequency exposure.', aiUsage: 'Frequency model feature.' },
  { id: 'telematics-installed', phase: 'Fleet', mask: 'Fleet Profile', role: ['Corporate Client', 'Broker', 'MGA'], fieldName: 'Telematics Installed', fieldType: 'boolean', purpose: 'Determine monitoring capability and safety program eligibility.', aiUsage: 'Eligibility flag for telematics-driven scoring.' },

  { id: 'driver-name', phase: 'Driver', mask: 'Driver Profile', role: ['Corporate Client', 'Broker'], fieldName: 'Name', fieldType: 'string', purpose: 'Associate driver with vehicle and events.', aiUsage: null },
  { id: 'driver-dob', phase: 'Driver', mask: 'Driver Profile', role: ['Corporate Client', 'Broker', 'MGA'], fieldName: 'Date of Birth', fieldType: 'date', purpose: 'Risk stratification and legal validation.', aiUsage: 'Feature for risk segmentation and fairness-controlled scoring.' },
  { id: 'license-class', phase: 'Driver', mask: 'Driver Profile', role: ['Corporate Client', 'Broker', 'MGA'], fieldName: 'License Class', fieldType: 'enum', purpose: 'Match legal eligibility to vehicle type.', aiUsage: 'Constraint in underwriting referral logic.' },
  { id: 'years-licensed', phase: 'Driver', mask: 'Driver Profile', role: ['Corporate Client', 'Broker', 'MGA'], fieldName: 'Years Licensed', fieldType: 'number', purpose: 'Experience proxy for risk modeling.', aiUsage: 'Input for driver risk scoring.' },
  { id: 'accidents-last-3y', phase: 'Driver', mask: 'Driver Profile', role: ['Corporate Client', 'Broker', 'MGA'], fieldName: 'Accidents Last 3Y', fieldType: 'number', purpose: 'Historical behavior indicator.', aiUsage: 'Feature in expected loss prediction.' },
  { id: 'traffic-violations', phase: 'Driver', mask: 'Driver Profile', role: ['Corporate Client', 'Broker', 'MGA'], fieldName: 'Traffic Violations', fieldType: 'number', purpose: 'Compliance and behavior risk signal.', aiUsage: 'Feature for risk tier assignment.' },

  { id: 'coverage-limit', phase: 'Underwriting', mask: 'Underwriting Form', role: ['Broker', 'MGA', 'Carrier'], fieldName: 'Coverage Limit', fieldType: 'number', purpose: 'Define maximum indemnity exposure.', aiUsage: null },
  { id: 'deductible', phase: 'Underwriting', mask: 'Underwriting Form', role: ['Broker', 'MGA', 'Carrier'], fieldName: 'Deductible', fieldType: 'number', purpose: 'Set retained risk by insured and pricing corridor.', aiUsage: null },
  { id: 'risk-score-ai', phase: 'Underwriting', mask: 'Underwriting Form', role: ['MGA', 'Carrier', 'AI Governance'], fieldName: 'Risk Score (AI)', fieldType: 'number', purpose: 'Rank submissions by expected risk.', aiUsage: 'Core underwriting scoring output used for triage.' },
  { id: 'expected-loss-ai', phase: 'Underwriting', mask: 'Underwriting Form', role: ['MGA', 'Carrier'], fieldName: 'Expected Loss (AI)', fieldType: 'number', purpose: 'Estimate technical loss expectation.', aiUsage: 'Model output used in pricing and portfolio steering.' },
  { id: 'suggested-premium-ai', phase: 'Underwriting', mask: 'Underwriting Form', role: ['MGA', 'Carrier'], fieldName: 'Suggested Premium (AI)', fieldType: 'number', purpose: 'Recommend risk-adjusted premium benchmark.', aiUsage: 'Price recommendation output requiring human approval.' },
  { id: 'referral-flag-ai', phase: 'Underwriting', mask: 'Underwriting Form', role: ['MGA', 'Carrier', 'AI Governance'], fieldName: 'Referral Flag (AI)', fieldType: 'boolean', purpose: 'Trigger manual review beyond authority corridor.', aiUsage: 'Decision-support flag with audit trace.' },

  { id: 'loss-date', phase: 'Claims', mask: 'FNOL Form', role: ['Corporate Client', 'Broker', 'Claims Adjuster'], fieldName: 'Loss Date', fieldType: 'date', purpose: 'Anchor claims timeline and reserve logic.', aiUsage: null },
  { id: 'loss-location', phase: 'Claims', mask: 'FNOL Form', role: ['Corporate Client', 'Broker', 'Claims Adjuster'], fieldName: 'Loss Location', fieldType: 'string', purpose: 'Assess jurisdiction and context risk.', aiUsage: 'Geo-context feature in fraud and severity models.' },
  { id: 'loss-description', phase: 'Claims', mask: 'FNOL Form', role: ['Corporate Client', 'Broker', 'Claims Adjuster'], fieldName: 'Description', fieldType: 'text', purpose: 'Capture incident narrative.', aiUsage: 'NLP extraction for claim type and urgency.' },
  { id: 'photos', phase: 'Claims', mask: 'FNOL Form', role: ['Corporate Client', 'Claims Adjuster'], fieldName: 'Photos', fieldType: 'file[]', purpose: 'Provide visual evidence.', aiUsage: 'Computer vision signals for damage pattern and fraud cues.' },
  { id: 'telematics-snapshot', phase: 'Claims', mask: 'FNOL Form', role: ['Claims Adjuster', 'MGA', 'Carrier'], fieldName: 'Telematics Snapshot', fieldType: 'object', purpose: 'Capture event context around incident.', aiUsage: 'High-value feature for causality and severity estimation.' },
  { id: 'weather-context', phase: 'Claims', mask: 'FNOL Form', role: ['Claims Adjuster', 'MGA'], fieldName: 'Weather Context', fieldType: 'string', purpose: 'External context enrichment for event validation.', aiUsage: 'Feature for fraud and scenario plausibility checks.' },
  { id: 'fraud-score-ai', phase: 'Claims', mask: 'FNOL Form', role: ['Claims Adjuster', 'MGA', 'AI Governance'], fieldName: 'Fraud Score (AI)', fieldType: 'number', purpose: 'Prioritize suspicious claims for investigation.', aiUsage: 'Fraud detection model output.' },
  { id: 'severity-estimate-ai', phase: 'Claims', mask: 'FNOL Form', role: ['Claims Adjuster', 'MGA', 'Carrier'], fieldName: 'Severity Estimate (AI)', fieldType: 'number', purpose: 'Early reserve and steering support.', aiUsage: 'Severity prediction output.' },

  { id: 'gps', phase: 'Monitoring', mask: 'Fleet Monitoring', role: ['Corporate Client', 'Fleet Operator', 'MGA'], fieldName: 'GPS', fieldType: 'timeseries', purpose: 'Track route and behavior context.', aiUsage: 'Input for route-risk and anomaly detection.' },
  { id: 'speed', phase: 'Monitoring', mask: 'Fleet Monitoring', role: ['Corporate Client', 'Fleet Operator', 'MGA'], fieldName: 'Speed', fieldType: 'timeseries', purpose: 'Identify high-risk behavior patterns.', aiUsage: 'Feature for driver and fleet risk score.' },
  { id: 'harsh-braking', phase: 'Monitoring', mask: 'Fleet Monitoring', role: ['Corporate Client', 'Fleet Operator', 'MGA'], fieldName: 'Harsh Braking', fieldType: 'number', purpose: 'Detect unsafe driving events.', aiUsage: 'Safety intervention trigger input.' },
  { id: 'night-driving', phase: 'Monitoring', mask: 'Fleet Monitoring', role: ['Corporate Client', 'Fleet Operator', 'MGA'], fieldName: 'Night Driving %', fieldType: 'number', purpose: 'Quantify time-of-day exposure.', aiUsage: 'Feature in expected frequency model.' },
  { id: 'driver-risk-score-ai', phase: 'Monitoring', mask: 'Fleet Monitoring', role: ['Fleet Operator', 'MGA', 'AI Governance'], fieldName: 'Driver Risk Score (AI)', fieldType: 'number', purpose: 'Prioritize coaching and prevention actions.', aiUsage: 'Driver-level risk model output.' },
  { id: 'fleet-risk-index-ai', phase: 'Monitoring', mask: 'Fleet Monitoring', role: ['MGA', 'Carrier', 'AI Governance'], fieldName: 'Fleet Risk Index (AI)', fieldType: 'number', purpose: 'Portfolio-level steering and intervention planning.', aiUsage: 'Aggregated fleet risk output.' },

  { id: 'claim-frequency', phase: 'Renewal', mask: 'Renewal Assessment', role: ['MGA', 'Carrier', 'Broker'], fieldName: 'Claim Frequency', fieldType: 'number', purpose: 'Assess renewal risk and price direction.', aiUsage: 'Core feature in renewal model.' },
  { id: 'severity-trend', phase: 'Renewal', mask: 'Renewal Assessment', role: ['MGA', 'Carrier'], fieldName: 'Severity Trend', fieldType: 'number', purpose: 'Track cost inflation and trend risk.', aiUsage: 'Feature in renewal margin forecast.' },
  { id: 'behaviour-improvement', phase: 'Renewal', mask: 'Renewal Assessment', role: ['MGA', 'Broker', 'Corporate Client'], fieldName: 'Behaviour Improvement %', fieldType: 'number', purpose: 'Measure safety program impact.', aiUsage: 'Feature for discount eligibility scoring.' },
  { id: 'renewal-risk-score-ai', phase: 'Renewal', mask: 'Renewal Assessment', role: ['MGA', 'Carrier', 'AI Governance'], fieldName: 'Renewal Risk Score (AI)', fieldType: 'number', purpose: 'Classify renewal risk tier.', aiUsage: 'Renewal scoring output.' },
  { id: 'suggested-premium-adjustment-ai', phase: 'Renewal', mask: 'Renewal Assessment', role: ['MGA', 'Carrier', 'Broker'], fieldName: 'Suggested Premium Adjustment (AI)', fieldType: 'number', purpose: 'Recommend discount/surcharge band.', aiUsage: 'Pricing adjustment recommendation output.' }
]
