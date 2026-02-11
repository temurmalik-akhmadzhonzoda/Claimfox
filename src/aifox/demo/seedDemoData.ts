import type { CalendarEvent } from '@/brokerfox/types'
import type {
  AifoxClaim,
  AifoxConversation,
  AifoxDecision,
  AifoxDocument,
  AifoxFraudAlert,
  AifoxTimelineEvent,
  AifoxUnderwritingSim
} from '@/aifox/types'
import { aifoxTenants, calendarTemplates, chatbotConversations, claimLines, documentTypes, fraudSignals, insuredNames } from './demoCatalog'

const KEY_PREFIX = 'aifox'

function key(tenantId: string, entity: string) {
  return `${KEY_PREFIX}:${tenantId}:${entity}`
}

function isBrowser() {
  return typeof window !== 'undefined'
}

function writeList<T>(tenantId: string, entity: string, value: T[]) {
  if (!isBrowser()) return
  window.localStorage.setItem(key(tenantId, entity), JSON.stringify(value))
}

function stableId(prefix: string, tenantId: string, index: number) {
  return `${prefix}_${tenantId}_${index.toString().padStart(3, '0')}`
}

function stableNow(offset: number) {
  const base = new Date(2026, 1, 1)
  return new Date(base.getTime() + offset * 86400000).toISOString()
}

function pick<T>(list: readonly T[], seed: number) {
  return list[Math.abs(seed) % list.length]
}

function buildClaims(tenantId: string, count: number): AifoxClaim[] {
  return Array.from({ length: count }).map((_, idx) => {
    const line = pick(claimLines, idx)
    const insured = pick(insuredNames, idx + 2)
    return {
      id: stableId('claim', tenantId, idx + 1),
      tenantId,
      claimNumber: `AI-${2026 + (idx % 2)}-${(idx + 1).toString().padStart(4, '0')}`,
      insured,
      lossDate: stableNow(idx - 14),
      lineOfBusiness: line,
      status: idx % 3 === 0 ? 'Investigation' : 'Review',
      fraudScore: 25 + (idx * 7) % 60,
      severity: pick(['low', 'medium', 'high'] as const, idx),
      confidence: Math.round((0.68 + (idx % 5) * 0.06) * 100) / 100
    }
  })
}

function buildFraudAlerts(tenantId: string, claims: AifoxClaim[]): AifoxFraudAlert[] {
  return claims.slice(0, 5).map((claim, idx) => ({
    id: stableId('fraud', tenantId, idx + 1),
    tenantId,
    claimId: claim.id,
    fraudScore: claim.fraudScore,
    riskLevel: claim.fraudScore > 60 ? 'high' : claim.fraudScore > 40 ? 'medium' : 'low',
    signals: fraudSignals.slice(0, 3 + (idx % 2)),
    createdAt: stableNow(idx)
  }))
}

function buildDecisions(tenantId: string, claims: AifoxClaim[]): AifoxDecision[] {
  return claims.slice(0, 12).map((claim, idx) => ({
    id: stableId('decision', tenantId, idx + 1),
    tenantId,
    claimId: claim.id,
    modelVersion: `v${1 + (idx % 3)}.${2 + (idx % 5)}`,
    decision: idx % 2 === 0 ? 'Auto-approve' : 'Manual review',
    confidence: Math.round((0.7 + (idx % 5) * 0.05) * 100) / 100,
    createdAt: stableNow(idx + 1)
  }))
}

function buildDocuments(tenantId: string): AifoxDocument[] {
  return Array.from({ length: 8 }).map((_, idx) => {
    const type = pick(documentTypes, idx)
    return {
      id: stableId('doc', tenantId, idx + 1),
      tenantId,
      type,
      fileName: `${type}_document_${idx + 1}.pdf`,
      extractedFields: {
        name: pick(insuredNames, idx),
        claimNumber: `AI-2026-${(idx + 1).toString().padStart(4, '0')}`,
        amount: `€ ${(1200 + idx * 420).toLocaleString('de-DE')}`,
        incidentDate: new Date(2026, 0, 12 + idx).toLocaleDateString('de-DE')
      },
      confidence: Math.round((0.74 + (idx % 4) * 0.05) * 100) / 100,
      createdAt: stableNow(idx)
    }
  })
}

function buildConversations(tenantId: string): AifoxConversation[] {
  return chatbotConversations.map((conv, idx) => ({
    id: stableId('chat', tenantId, idx + 1),
    tenantId,
    customer: conv.customer,
    topic: conv.topic,
    messages: conv.messages
  }))
}

function buildUnderwriting(tenantId: string): AifoxUnderwritingSim[] {
  return Array.from({ length: 3 }).map((_, idx) => ({
    id: stableId('uw', tenantId, idx + 1),
    tenantId,
    input: {
      age: 24 + idx * 6,
      vehicle: idx % 2 === 0 ? 'Sedan' : 'Truck',
      region: idx % 2 === 0 ? 'High theft region' : 'Low risk region',
      lossHistory: idx
    },
    output: {
      riskScore: 45 + idx * 12,
      premium: 950 + idx * 220,
      factors: [
        { label: 'Theft region', value: 25 + idx * 3 },
        { label: 'Loss history', value: 18 + idx * 2 },
        { label: 'Vehicle type', value: 12 + idx }
      ],
      biasCheck: idx % 2 === 0 ? 'pass' : 'review',
      aiActCategory: idx % 2 === 0 ? 'Limited Risk' : 'High Risk'
    }
  }))
}

function buildCalendar(tenantId: string): CalendarEvent[] {
  return calendarTemplates.map((title, idx) => ({
    id: stableId('cal', tenantId, idx + 1),
    tenantId,
    title,
    date: stableNow(idx + 3),
    entityType: 'task',
    entityId: stableId('event', tenantId, idx + 1),
    description: `AI.FOX scheduled ${title.toLowerCase()} session.`
  }))
}

function buildTimeline(tenantId: string, claims: AifoxClaim[]): AifoxTimelineEvent[] {
  const events: AifoxTimelineEvent[] = []
  claims.slice(0, 12).forEach((claim, idx) => {
    events.push({
      id: stableId('tl', tenantId, idx + 1),
      tenantId,
      entityType: 'claim',
      entityId: claim.id,
      type: 'system',
      title: 'AI decision logged',
      message: `Decision logged for ${claim.claimNumber} with confidence ${claim.confidence}.`,
      createdAt: stableNow(idx),
      actor: 'ai.fox'
    })
  })
  return events
}

export function seedTenant(tenantId: string) {
  const claims = buildClaims(tenantId, 20)
  const fraudAlerts = buildFraudAlerts(tenantId, claims)
  const decisions = buildDecisions(tenantId, claims)
  const documents = buildDocuments(tenantId)
  const conversations = buildConversations(tenantId)
  const underwriting = buildUnderwriting(tenantId)
  const calendar = buildCalendar(tenantId)
  const timeline = buildTimeline(tenantId, claims)

  writeList(tenantId, 'claims', claims)
  writeList(tenantId, 'fraud', fraudAlerts)
  writeList(tenantId, 'decisions', decisions)
  writeList(tenantId, 'documents', documents)
  writeList(tenantId, 'conversations', conversations)
  writeList(tenantId, 'underwriting', underwriting)
  writeList(tenantId, 'calendar', calendar)
  writeList(tenantId, 'timeline', timeline)
}

export function seedAllTenants() {
  aifoxTenants.forEach((tenant) => seedTenant(tenant.id))
}

export function ensureSeeded(tenantId: string) {
  if (!isBrowser()) return
  const markerKey = key(tenantId, 'seeded')
  const seeded = window.localStorage.getItem(markerKey)
  if (seeded) return
  seedTenant(tenantId)
  window.localStorage.setItem(markerKey, 'true')
}
