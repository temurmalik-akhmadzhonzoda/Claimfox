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
import { ensureSeeded, seedAllTenants } from '@/aifox/demo/seedDemoData'
import type { TenantContext } from '@/brokerfox/types'

const KEY_PREFIX = 'aifox'

function key(tenantId: string, entity: string) {
  return `${KEY_PREFIX}:${tenantId}:${entity}`
}

function isBrowser() {
  return typeof window !== 'undefined'
}

function nowIso() {
  return new Date().toISOString()
}

function makeId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}

function readList<T>(tenantId: string, entity: string): T[] {
  if (!isBrowser()) return []
  const raw = window.localStorage.getItem(key(tenantId, entity))
  if (!raw) return []
  try {
    return JSON.parse(raw) as T[]
  } catch {
    return []
  }
}

function writeList<T>(tenantId: string, entity: string, value: T[]) {
  if (!isBrowser()) return
  window.localStorage.setItem(key(tenantId, entity), JSON.stringify(value))
}

function addTimelineEventInternal(ctx: TenantContext, event: Omit<AifoxTimelineEvent, 'id' | 'tenantId' | 'createdAt'>) {
  const list = readList<AifoxTimelineEvent>(ctx.tenantId, 'timeline')
  const entry: AifoxTimelineEvent = {
    id: makeId('tl'),
    tenantId: ctx.tenantId,
    createdAt: nowIso(),
    ...event
  }
  list.unshift(entry)
  writeList(ctx.tenantId, 'timeline', list)
  return entry
}

export function seedAifoxTenants() {
  seedAllTenants()
}

export async function listClaims(ctx: TenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<AifoxClaim>(ctx.tenantId, 'claims')
}

export async function listFraudAlerts(ctx: TenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<AifoxFraudAlert>(ctx.tenantId, 'fraud')
}

export async function listDecisions(ctx: TenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<AifoxDecision>(ctx.tenantId, 'decisions')
}

export async function listDocuments(ctx: TenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<AifoxDocument>(ctx.tenantId, 'documents')
}

export async function listConversations(ctx: TenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<AifoxConversation>(ctx.tenantId, 'conversations')
}

export async function listUnderwriting(ctx: TenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<AifoxUnderwritingSim>(ctx.tenantId, 'underwriting')
}

export async function listCalendarEvents(ctx: TenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<CalendarEvent>(ctx.tenantId, 'calendar')
}

export async function listTimeline(ctx: TenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<AifoxTimelineEvent>(ctx.tenantId, 'timeline')
}

export async function addTimelineEvent(ctx: TenantContext, event: Omit<AifoxTimelineEvent, 'id' | 'tenantId' | 'createdAt'>) {
  ensureSeeded(ctx.tenantId)
  return addTimelineEventInternal(ctx, event)
}

export async function logDecision(ctx: TenantContext, claimId: string, decision: string, confidence: number) {
  return addTimelineEventInternal(ctx, {
    entityType: 'claim',
    entityId: claimId,
    type: 'system',
    title: 'AI decision updated',
    message: `${decision} with confidence ${(confidence * 100).toFixed(0)}%.`,
    actor: ctx.userId
  })
}

export async function logFraudAction(ctx: TenantContext, alertId: string, action: string) {
  return addTimelineEventInternal(ctx, {
    entityType: 'fraud',
    entityId: alertId,
    type: 'statusUpdate',
    title: 'Fraud action logged',
    message: action,
    actor: ctx.userId
  })
}

export async function logIntegrationToggle(ctx: TenantContext, name: string, enabled: boolean) {
  return addTimelineEventInternal(ctx, {
    entityType: 'system',
    entityId: name,
    type: 'system',
    title: 'Integration toggled',
    message: `${name} ${enabled ? 'enabled' : 'disabled'}.`,
    actor: ctx.userId
  })
}
