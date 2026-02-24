export type RoleCategoryKey =
  | 'platform'
  | 'broker'
  | 'mga'
  | 'corporate'
  | 'claims'
  | 'carrier'
  | 'reinsurance'
  | 'ai-data'

export type RoleHandbookRole = {
  slug: string
  name: string
  category: RoleCategoryKey
  tenantLevel: string
  modules: string[]
  decisionAuthority: string
  aiInteraction: 'none' | 'consume' | 'approve' | 'override' | 'audit'
}

export function slugifyRoleName(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\//g, ' ')
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const roles: RoleHandbookRole[] = [
  { name: 'Platform Super Admin', category: 'platform', tenantLevel: 'Platform', modules: ['Brokerfox', 'Claimsfox', 'Fleetfox', 'Partnerfox', 'AI Fox'], decisionAuthority: 'System-wide platform administration and emergency controls.', aiInteraction: 'approve', slug: 'platform-super-admin' },
  { name: 'CTO – Chief Technology Officer', category: 'platform', tenantLevel: 'Platform', modules: ['Brokerfox', 'Claimsfox', 'Fleetfox', 'Partnerfox', 'AI Fox'], decisionAuthority: 'Technical authority for architecture, cloud strategy, platform resilience, and security standards.', aiInteraction: 'approve', slug: 'cto-chief-technology-officer' },
  { name: 'CPO – Chief Platform Owner', category: 'platform', tenantLevel: 'Platform', modules: ['Brokerfox', 'Claimsfox', 'Fleetfox', 'Partnerfox', 'AI Fox'], decisionAuthority: 'Business authority for platform vision, module portfolio strategy, and international expansion.', aiInteraction: 'consume', slug: 'cpo-chief-platform-owner' },
  { name: 'Chief Underwriting Officer (MGA)', category: 'platform', tenantLevel: 'Platform/MGA', modules: ['Brokerfox', 'AI Fox'], decisionAuthority: 'Final underwriting framework and referral authority.', aiInteraction: 'override', slug: 'chief-underwriting-officer-mga' },
  { name: 'Head of Claims (MGA)', category: 'platform', tenantLevel: 'Platform/MGA', modules: ['Claimsfox', 'Partnerfox'], decisionAuthority: 'Claims governance, reserve thresholds, escalations.', aiInteraction: 'override', slug: 'head-of-claims-mga' },
  { name: 'Broker Portal Director', category: 'platform', tenantLevel: 'Platform', modules: ['Brokerfox'], decisionAuthority: 'Distribution workflow and broker operating standards.', aiInteraction: 'consume', slug: 'broker-portal-director' },
  { name: 'AI Governance Officer', category: 'platform', tenantLevel: 'Platform', modules: ['AI Fox'], decisionAuthority: 'AI release, freeze and control-policy approvals.', aiInteraction: 'approve', slug: 'ai-governance-officer' },
  { name: 'Compliance & Risk Officer', category: 'platform', tenantLevel: 'Platform', modules: ['AI Fox', 'Claimsfox'], decisionAuthority: 'Regulatory escalation and control decisions.', aiInteraction: 'audit', slug: 'compliance-and-risk-officer' },
  { name: 'Reinsurance Manager', category: 'platform', tenantLevel: 'Platform/MGA', modules: ['Brokerfox', 'AI Fox'], decisionAuthority: 'Treaty structure and cession control recommendations.', aiInteraction: 'consume', slug: 'reinsurance-manager' },
  { name: 'Product Owner – Core Platform', category: 'platform', tenantLevel: 'Platform', modules: ['Brokerfox', 'Claimsfox', 'Fleetfox', 'Partnerfox', 'AI Fox'], decisionAuthority: 'Cross-module release scope, dependencies, and shared platform capabilities.', aiInteraction: 'consume', slug: 'product-owner-core-platform' },
  { name: 'Product Owner – Brokerportal', category: 'platform', tenantLevel: 'Platform', modules: ['Brokerfox'], decisionAuthority: 'Broker distribution workflow scope and broker-facing platform features.', aiInteraction: 'consume', slug: 'product-owner-brokerportal' },
  { name: 'Product Owner – Claims', category: 'platform', tenantLevel: 'Platform', modules: ['Claimsfox', 'Partnerfox'], decisionAuthority: 'Claims workflow architecture and operational release scope.', aiInteraction: 'consume', slug: 'product-owner-claims' },
  { name: 'Product Owner – AI', category: 'platform', tenantLevel: 'Platform', modules: ['AI Fox'], decisionAuthority: 'AI feature integration roadmap and explainable AI feature rollout scope.', aiInteraction: 'consume', slug: 'product-owner-ai' },
  { name: 'Head of Engineering', category: 'platform', tenantLevel: 'Platform', modules: ['Brokerfox', 'Claimsfox', 'Fleetfox', 'Partnerfox', 'AI Fox'], decisionAuthority: 'Engineering delivery model, service ownership, and technical quality gates.', aiInteraction: 'consume', slug: 'head-of-engineering' },
  { name: 'Enterprise Architect', category: 'platform', tenantLevel: 'Platform', modules: ['Brokerfox', 'Claimsfox', 'Fleetfox', 'Partnerfox', 'AI Fox'], decisionAuthority: 'Enterprise architecture standards, integration patterns, and target-state architecture decisions.', aiInteraction: 'consume', slug: 'enterprise-architect' },
  { name: 'CISO / Security Officer', category: 'platform', tenantLevel: 'Platform', modules: ['Brokerfox', 'Claimsfox', 'Fleetfox', 'Partnerfox', 'AI Fox'], decisionAuthority: 'Security control standards, incident posture, and platform security policy enforcement.', aiInteraction: 'audit', slug: 'ciso-security-officer' },
  { name: 'Data Governance Lead', category: 'platform', tenantLevel: 'Platform', modules: ['Brokerfox', 'Claimsfox', 'Fleetfox', 'Partnerfox', 'AI Fox'], decisionAuthority: 'Data standards, lineage governance, and cross-tenant data quality controls.', aiInteraction: 'audit', slug: 'data-governance-lead' },
  { name: 'UX / Experience Lead', category: 'platform', tenantLevel: 'Platform', modules: ['Brokerfox', 'Claimsfox', 'Fleetfox', 'Partnerfox', 'AI Fox'], decisionAuthority: 'Experience standards, usability governance, and cross-module journey consistency.', aiInteraction: 'consume', slug: 'ux-experience-lead' },
  { name: 'DevOps Lead', category: 'platform', tenantLevel: 'Platform', modules: ['AI Fox'], decisionAuthority: 'Deployment gates, rollback and reliability authority.', aiInteraction: 'consume', slug: 'devops-lead' },
  { name: 'Data Protection Officer (DPO)', category: 'platform', tenantLevel: 'Platform', modules: ['AI Fox', 'Claimsfox'], decisionAuthority: 'Privacy controls, retention and legal processing boundaries.', aiInteraction: 'audit', slug: 'data-protection-officer-dpo' },

  { name: 'Broker Admin', category: 'broker', tenantLevel: 'Broker', modules: ['Brokerfox'], decisionAuthority: 'Broker tenant administration and onboarding approvals.', aiInteraction: 'consume', slug: 'broker-admin' },
  { name: 'Broker Underwriter', category: 'broker', tenantLevel: 'Broker', modules: ['Brokerfox', 'AI Fox'], decisionAuthority: 'Submission quality and market-routing recommendations.', aiInteraction: 'consume', slug: 'broker-underwriter' },
  { name: 'Broker Claims Manager', category: 'broker', tenantLevel: 'Broker', modules: ['Claimsfox'], decisionAuthority: 'Client claims escalation and communication control.', aiInteraction: 'consume', slug: 'broker-claims-manager' },
  { name: 'Broker Account Executive', category: 'broker', tenantLevel: 'Broker', modules: ['Brokerfox'], decisionAuthority: 'Placement strategy and renewal negotiation direction.', aiInteraction: 'consume', slug: 'broker-account-executive' },
  { name: 'Broker Finance Officer', category: 'broker', tenantLevel: 'Broker', modules: ['Brokerfox'], decisionAuthority: 'Commission validation and billing exceptions.', aiInteraction: 'none', slug: 'broker-finance-officer' },

  { name: 'MGA Underwriter', category: 'mga', tenantLevel: 'MGA', modules: ['Brokerfox', 'AI Fox'], decisionAuthority: 'Underwriting decisions in delegated authority corridor.', aiInteraction: 'consume', slug: 'mga-underwriter' },
  { name: 'Senior Underwriter', category: 'mga', tenantLevel: 'MGA', modules: ['Brokerfox', 'AI Fox'], decisionAuthority: 'Escalated risk decisions and authority exceptions.', aiInteraction: 'override', slug: 'senior-underwriter' },
  { name: 'Portfolio Manager', category: 'mga', tenantLevel: 'MGA', modules: ['Brokerfox', 'Claimsfox', 'AI Fox'], decisionAuthority: 'Portfolio steering and segment risk directives.', aiInteraction: 'approve', slug: 'portfolio-manager' },
  { name: 'Pricing Actuary', category: 'mga', tenantLevel: 'MGA', modules: ['AI Fox'], decisionAuthority: 'Pricing parameter and model calibration recommendations.', aiInteraction: 'approve', slug: 'pricing-actuary' },
  { name: 'Capacity Manager', category: 'mga', tenantLevel: 'MGA/Carrier', modules: ['Brokerfox', 'AI Fox'], decisionAuthority: 'Capacity allocation and referral-to-carrier thresholds.', aiInteraction: 'consume', slug: 'capacity-manager' },

  { name: 'Global Client Administrator', category: 'corporate', tenantLevel: 'Corporate Client', modules: ['Brokerfox', 'Claimsfox', 'Fleetfox'], decisionAuthority: 'Internal role delegation and tenant module activation.', aiInteraction: 'consume', slug: 'global-client-administrator' },
  { name: 'Regional Fleet Manager', category: 'corporate', tenantLevel: 'Corporate Client', modules: ['Fleetfox', 'Claimsfox'], decisionAuthority: 'Regional fleet operations and intervention decisions.', aiInteraction: 'consume', slug: 'regional-fleet-manager' },
  { name: 'Claims Manager', category: 'corporate', tenantLevel: 'Corporate Client', modules: ['Claimsfox'], decisionAuthority: 'Corporate claims escalation and evidence completion decisions.', aiInteraction: 'consume', slug: 'claims-manager' },
  { name: 'Risk Manager', category: 'corporate', tenantLevel: 'Corporate Client', modules: ['Fleetfox', 'AI Fox'], decisionAuthority: 'Risk-control prioritization and mitigation directives.', aiInteraction: 'consume', slug: 'risk-manager' },
  { name: 'Finance Officer', category: 'corporate', tenantLevel: 'Corporate Client', modules: ['Brokerfox', 'Claimsfox'], decisionAuthority: 'Invoice and settlement validation decisions.', aiInteraction: 'none', slug: 'finance-officer' },
  { name: 'Warehouse Manager', category: 'corporate', tenantLevel: 'Corporate Client', modules: ['Claimsfox'], decisionAuthority: 'Warehouse incident response and handling controls.', aiInteraction: 'none', slug: 'warehouse-manager' },
  { name: 'Driver', category: 'corporate', tenantLevel: 'Corporate Client', modules: ['Fleetfox', 'Claimsfox'], decisionAuthority: 'Operational incident reporting only.', aiInteraction: 'consume', slug: 'driver' },
  { name: 'Transport Planner', category: 'corporate', tenantLevel: 'Corporate Client', modules: ['Fleetfox'], decisionAuthority: 'Route and load planning decisions.', aiInteraction: 'consume', slug: 'transport-planner' },
  { name: 'HR / Compliance Officer', category: 'corporate', tenantLevel: 'Corporate Client', modules: ['Brokerfox', 'Claimsfox'], decisionAuthority: 'Internal compliance escalation and training controls.', aiInteraction: 'audit', slug: 'hr-compliance-officer' },

  { name: 'Claims Handler', category: 'claims', tenantLevel: 'Platform/Broker', modules: ['Claimsfox'], decisionAuthority: 'Operational claims progression and reserve proposals.', aiInteraction: 'consume', slug: 'claims-handler' },
  { name: 'Surveyor / Loss Adjuster', category: 'claims', tenantLevel: 'Partner', modules: ['Claimsfox'], decisionAuthority: 'Damage assessment recommendations.', aiInteraction: 'consume', slug: 'surveyor-loss-adjuster' },
  { name: 'Repair Network Partner', category: 'claims', tenantLevel: 'Partner', modules: ['Partnerfox'], decisionAuthority: 'Repair scope confirmation and invoice submission.', aiInteraction: 'none', slug: 'repair-network-partner' },
  { name: 'Rental Provider', category: 'claims', tenantLevel: 'Partner', modules: ['Partnerfox'], decisionAuthority: 'Rental assignment acceptance and cost confirmation.', aiInteraction: 'none', slug: 'rental-provider' },
  { name: 'Towing & Recovery Operator', category: 'claims', tenantLevel: 'Partner', modules: ['Partnerfox'], decisionAuthority: 'Recovery completion confirmation.', aiInteraction: 'none', slug: 'towing-recovery-operator' },
  { name: 'Salvage Partner', category: 'claims', tenantLevel: 'Partner', modules: ['Partnerfox', 'Claimsfox'], decisionAuthority: 'Residual value and salvage recommendations.', aiInteraction: 'none', slug: 'salvage-partner' },
  { name: 'Subrogation Specialist', category: 'claims', tenantLevel: 'Partner/Platform', modules: ['Claimsfox'], decisionAuthority: 'Recovery-path recommendations and legal escalation.', aiInteraction: 'consume', slug: 'subrogation-specialist' },
  { name: 'Legal Counsel', category: 'claims', tenantLevel: 'Partner/Platform', modules: ['Claimsfox'], decisionAuthority: 'Legal strategy and litigation recommendations.', aiInteraction: 'none', slug: 'legal-counsel' },
  { name: 'External Forensic Investigator', category: 'claims', tenantLevel: 'Partner', modules: ['Claimsfox'], decisionAuthority: 'Forensic findings and evidence integrity statements.', aiInteraction: 'consume', slug: 'external-forensic-investigator' },
  { name: 'Fraud Analyst', category: 'claims', tenantLevel: 'Platform/MGA', modules: ['Claimsfox', 'AI Fox'], decisionAuthority: 'Fraud escalation and investigative hold recommendations.', aiInteraction: 'approve', slug: 'fraud-analyst' },

  { name: 'Carrier Underwriter', category: 'carrier', tenantLevel: 'Carrier', modules: ['Brokerfox', 'AI Fox'], decisionAuthority: 'Carrier referral approvals and underwriting oversight.', aiInteraction: 'consume', slug: 'carrier-underwriter' },
  { name: 'Carrier Claims Supervisor', category: 'carrier', tenantLevel: 'Carrier', modules: ['Claimsfox'], decisionAuthority: 'High-severity claim oversight and escalation approvals.', aiInteraction: 'consume', slug: 'carrier-claims-supervisor' },
  { name: 'Reinsurance Analyst', category: 'carrier', tenantLevel: 'Carrier', modules: ['AI Fox'], decisionAuthority: 'Reinsurance exposure analytics and recommendations.', aiInteraction: 'consume', slug: 'reinsurance-analyst' },
  { name: 'Capacity Approval Officer', category: 'carrier', tenantLevel: 'Carrier', modules: ['Brokerfox'], decisionAuthority: 'Capacity approval thresholds and exceptions.', aiInteraction: 'approve', slug: 'capacity-approval-officer' },

  { name: 'Treaty Manager', category: 'reinsurance', tenantLevel: 'Platform/MGA', modules: ['AI Fox'], decisionAuthority: 'Treaty design and cession strategy recommendations.', aiInteraction: 'consume', slug: 'treaty-manager' },
  { name: 'Actuarial Analyst', category: 'reinsurance', tenantLevel: 'Platform/MGA', modules: ['AI Fox'], decisionAuthority: 'Actuarial assumptions and pricing support recommendations.', aiInteraction: 'approve', slug: 'actuarial-analyst' },
  { name: 'Capital Risk Analyst', category: 'reinsurance', tenantLevel: 'Platform/Carrier', modules: ['AI Fox'], decisionAuthority: 'Capital concentration alerts and limit recommendations.', aiInteraction: 'consume', slug: 'capital-risk-analyst' },
  { name: 'Financial Controller', category: 'reinsurance', tenantLevel: 'Platform/Broker/MGA', modules: ['Brokerfox', 'Claimsfox'], decisionAuthority: 'Financial control sign-off and exception escalation.', aiInteraction: 'none', slug: 'financial-controller' },

  { name: 'AI Model Owner', category: 'ai-data', tenantLevel: 'Platform', modules: ['AI Fox'], decisionAuthority: 'Model release and override governance approvals.', aiInteraction: 'approve', slug: 'ai-model-owner' },
  { name: 'Data Scientist', category: 'ai-data', tenantLevel: 'Platform', modules: ['AI Fox'], decisionAuthority: 'Model design and validation recommendations.', aiInteraction: 'consume', slug: 'data-scientist' },
  { name: 'ML Engineer', category: 'ai-data', tenantLevel: 'Platform', modules: ['AI Fox'], decisionAuthority: 'Model deployment and rollback technical authority.', aiInteraction: 'consume', slug: 'ml-engineer' },
  { name: 'Risk Analytics Lead', category: 'ai-data', tenantLevel: 'Platform/MGA', modules: ['AI Fox', 'Brokerfox', 'Claimsfox'], decisionAuthority: 'Risk analytics steering recommendations.', aiInteraction: 'approve', slug: 'risk-analytics-lead' },
  { name: 'AI Auditor', category: 'ai-data', tenantLevel: 'Platform/Compliance', modules: ['AI Fox'], decisionAuthority: 'Audit findings and model governance escalations.', aiInteraction: 'audit', slug: 'ai-auditor' }
]

export const roleHandbookRoles = roles

const aliasMap: Record<string, string> = {
  [slugifyRoleName('Claims Handler (Insurfox / Broker)')]: 'claims-handler'
}

export function resolveRoleSlug(slug: string) {
  return aliasMap[slug] ?? slug
}

export function findRoleBySlug(slug: string) {
  const normalized = resolveRoleSlug(slug)
  return roleHandbookRoles.find((role) => role.slug === normalized) ?? null
}
