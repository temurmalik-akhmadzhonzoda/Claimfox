export type ClaimStatus = 'intake' | 'triage' | 'investigation' | 'settlement' | 'closed' | 'denied'

export type ClaimSeverity = 'low' | 'medium' | 'high' | 'critical'

export type Claim = {
  id: string
  tenantId: string
  claimNumber: string
  policyRef: string
  insured: string
  lossDate: string
  status: ClaimStatus
  severity: ClaimSeverity
  reserve: number
  paid: number
  currency: string
  lineOfBusiness: string
  location: string
  tags: string[]
  assignedTo: string
  slaDueAt: string
  fraudScore: number
  triageScore: number
  timelineSummary: string
  createdAt: string
}

export type FnolSubmission = {
  id: string
  tenantId: string
  claimantName: string
  policyRef: string
  lossDate: string
  lossLocation: string
  description: string
  attachments: string[]
  createdAt: string
}

export type PartnerCaseLink = {
  partnerId: string
  claimId: string
  role: string
  status: string
  costEstimate: number
  notes: string
}

export type Partner = {
  id: string
  tenantId: string
  name: string
  role: string
  status: 'active' | 'standby' | 'onHold'
  rating: number
  contactEmail: string
}

export type MailMessage = {
  id: string
  threadId: string
  tenantId: string
  from: string
  to: string[]
  cc?: string[]
  subject: string
  body: string
  receivedAt: string
  attachments: Array<{ id: string; name: string; size: number }>
  linkedEntity?: { type: 'claim' | 'partner' | 'task'; id: string }
}

export type Document = {
  id: string
  tenantId: string
  fileName: string
  mime: string
  size: number
  urlOrBlobKey: string
  linkedEntityType: 'claim' | 'mail' | 'partner' | 'task'
  linkedEntityId: string
  extractedFields?: Record<string, string>
  approvalStatus: 'pending' | 'needsReview' | 'approved'
  createdAt: string
}

export type Task = {
  id: string
  tenantId: string
  title: string
  owner: string
  dueAt: string
  status: 'open' | 'inProgress' | 'blocked' | 'done'
  linkedEntityType: 'claim' | 'mail' | 'partner' | 'document'
  linkedEntityId: string
}

export type CalendarEvent = {
  id: string
  tenantId: string
  title: string
  date: string
  entityType?: 'claim' | 'partner' | 'task'
  entityId?: string
  description?: string
  location?: string
  participants?: string[]
}

export type TimelineEvent = {
  id: string
  tenantId: string
  entityType: 'claim' | 'document' | 'partner' | 'task' | 'mail'
  entityId: string
  type: 'statusUpdate' | 'internalNote' | 'externalMessage' | 'system'
  title: string
  message: string
  createdAt: string
  actor: string
}

export type ClaimsfoxTenantContext = {
  tenantId: string
  userId: string
  roles?: string[]
  mode?: string
}
