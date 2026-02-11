export type AifoxClaim = {
  id: string
  tenantId: string
  claimNumber: string
  insured: string
  lossDate: string
  lineOfBusiness: string
  status: string
  fraudScore: number
  severity: 'low' | 'medium' | 'high'
  confidence: number
}

export type AifoxFraudAlert = {
  id: string
  tenantId: string
  claimId: string
  fraudScore: number
  riskLevel: 'low' | 'medium' | 'high'
  signals: string[]
  createdAt: string
}

export type AifoxDecision = {
  id: string
  tenantId: string
  claimId: string
  modelVersion: string
  decision: string
  confidence: number
  createdAt: string
}

export type AifoxDocument = {
  id: string
  tenantId: string
  type: 'medical' | 'police' | 'policy'
  fileName: string
  extractedFields: Record<string, string>
  confidence: number
  createdAt: string
}

export type AifoxConversation = {
  id: string
  tenantId: string
  customer: string
  topic: string
  messages: Array<{ role: 'user' | 'assistant'; text: string; confidence?: number }>
}

export type AifoxUnderwritingSim = {
  id: string
  tenantId: string
  input: {
    age: number
    vehicle: string
    region: string
    lossHistory: number
  }
  output: {
    riskScore: number
    premium: number
    factors: Array<{ label: string; value: number }>
    biasCheck: 'pass' | 'review'
    aiActCategory: string
  }
}

export type AifoxTimelineEvent = {
  id: string
  tenantId: string
  entityType: 'claim' | 'fraud' | 'risk' | 'document' | 'chat' | 'system'
  entityId: string
  type: 'statusUpdate' | 'internalNote' | 'externalMessage' | 'system'
  title: string
  message: string
  createdAt: string
  actor: string
}
