import type {
  CalendarEvent,
  Claim,
  ClaimsfoxTenantContext,
  Document,
  MailMessage,
  Partner,
  Task,
  TimelineEvent
} from '@/claimsfox/types'
import { ensureSeeded, seedAllTenants } from '@/claimsfox/demo/seedDemoData'

const KEY_PREFIX = 'claimsfox'

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

function addTimelineEventInternal(ctx: ClaimsfoxTenantContext, event: Omit<TimelineEvent, 'id' | 'tenantId' | 'createdAt'>) {
  const list = readList<TimelineEvent>(ctx.tenantId, 'timeline')
  const entry: TimelineEvent = {
    id: makeId('tl'),
    tenantId: ctx.tenantId,
    createdAt: nowIso(),
    ...event
  }
  list.unshift(entry)
  writeList(ctx.tenantId, 'timeline', list)
  return entry
}

export function seedClaimsfoxTenants() {
  seedAllTenants()
}

export async function listClaims(ctx: ClaimsfoxTenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<Claim>(ctx.tenantId, 'claims')
}

export async function getClaim(ctx: ClaimsfoxTenantContext, claimId: string) {
  ensureSeeded(ctx.tenantId)
  const list = readList<Claim>(ctx.tenantId, 'claims')
  return list.find((item) => item.id === claimId) ?? null
}

export async function createClaim(ctx: ClaimsfoxTenantContext, input: Omit<Claim, 'id' | 'tenantId' | 'createdAt'>) {
  ensureSeeded(ctx.tenantId)
  const list = readList<Claim>(ctx.tenantId, 'claims')
  const createdAt = nowIso()
  const claim: Claim = {
    id: makeId('claim'),
    tenantId: ctx.tenantId,
    createdAt,
    ...input
  }
  list.unshift(claim)
  writeList(ctx.tenantId, 'claims', list)
  addTimelineEventInternal(ctx, {
    entityType: 'claim',
    entityId: claim.id,
    type: 'system',
    title: 'FNOL captured',
    message: `Claim ${claim.claimNumber} created via intake.`,
    actor: ctx.userId
  })
  return claim
}

export async function updateClaimStatus(ctx: ClaimsfoxTenantContext, claimId: string, status: Claim['status']) {
  ensureSeeded(ctx.tenantId)
  const list = readList<Claim>(ctx.tenantId, 'claims')
  const idx = list.findIndex((item) => item.id === claimId)
  if (idx === -1) return null
  list[idx] = { ...list[idx], status }
  writeList(ctx.tenantId, 'claims', list)
  addTimelineEventInternal(ctx, {
    entityType: 'claim',
    entityId: claimId,
    type: 'statusUpdate',
    title: 'Status updated',
    message: `Status moved to ${status}.`,
    actor: ctx.userId
  })
  return list[idx]
}

export async function assignClaim(ctx: ClaimsfoxTenantContext, claimId: string, assignee: string) {
  ensureSeeded(ctx.tenantId)
  const list = readList<Claim>(ctx.tenantId, 'claims')
  const idx = list.findIndex((item) => item.id === claimId)
  if (idx === -1) return null
  list[idx] = { ...list[idx], assignedTo: assignee }
  writeList(ctx.tenantId, 'claims', list)
  addTimelineEventInternal(ctx, {
    entityType: 'claim',
    entityId: claimId,
    type: 'internalNote',
    title: 'Assignee updated',
    message: `Assigned to ${assignee}.`,
    actor: ctx.userId
  })
  return list[idx]
}

export async function addReserveNote(ctx: ClaimsfoxTenantContext, claimId: string, note: string) {
  ensureSeeded(ctx.tenantId)
  addTimelineEventInternal(ctx, {
    entityType: 'claim',
    entityId: claimId,
    type: 'internalNote',
    title: 'Reserve note added',
    message: note,
    actor: ctx.userId
  })
}

export async function markFraudFlag(ctx: ClaimsfoxTenantContext, claimId: string, flag: string) {
  ensureSeeded(ctx.tenantId)
  addTimelineEventInternal(ctx, {
    entityType: 'claim',
    entityId: claimId,
    type: 'system',
    title: 'Fraud indicator flagged',
    message: flag,
    actor: ctx.userId
  })
}

export async function listDocuments(ctx: ClaimsfoxTenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<Document>(ctx.tenantId, 'documents')
}

export async function listDocumentsByClaim(ctx: ClaimsfoxTenantContext, claimId: string) {
  const docs = await listDocuments(ctx)
  return docs.filter((doc) => doc.linkedEntityId === claimId)
}

export async function uploadDocument(ctx: ClaimsfoxTenantContext, doc: Omit<Document, 'id' | 'tenantId' | 'createdAt'>) {
  ensureSeeded(ctx.tenantId)
  const docs = readList<Document>(ctx.tenantId, 'documents')
  const entry: Document = {
    id: makeId('doc'),
    tenantId: ctx.tenantId,
    createdAt: nowIso(),
    ...doc
  }
  docs.unshift(entry)
  writeList(ctx.tenantId, 'documents', docs)
  addTimelineEventInternal(ctx, {
    entityType: 'document',
    entityId: entry.id,
    type: 'system',
    title: 'Document uploaded',
    message: `${entry.fileName} uploaded and queued for extraction.`,
    actor: ctx.userId
  })
  return entry
}

export async function approveExtraction(ctx: ClaimsfoxTenantContext, documentId: string) {
  ensureSeeded(ctx.tenantId)
  const docs = readList<Document>(ctx.tenantId, 'documents')
  const idx = docs.findIndex((doc) => doc.id === documentId)
  if (idx === -1) return null
  docs[idx] = { ...docs[idx], approvalStatus: 'approved' }
  writeList(ctx.tenantId, 'documents', docs)
  addTimelineEventInternal(ctx, {
    entityType: 'document',
    entityId: documentId,
    type: 'statusUpdate',
    title: 'Extraction approved',
    message: `Extraction approved for ${docs[idx].fileName}.`,
    actor: ctx.userId
  })
  return docs[idx]
}

export async function listMailbox(ctx: ClaimsfoxTenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<MailMessage>(ctx.tenantId, 'mailbox')
}

export async function linkMailToClaim(ctx: ClaimsfoxTenantContext, mailId: string, claimId: string) {
  ensureSeeded(ctx.tenantId)
  const list = readList<MailMessage>(ctx.tenantId, 'mailbox')
  const idx = list.findIndex((mail) => mail.id === mailId)
  if (idx === -1) return null
  list[idx] = { ...list[idx], linkedEntity: { type: 'claim', id: claimId } }
  writeList(ctx.tenantId, 'mailbox', list)
  addTimelineEventInternal(ctx, {
    entityType: 'mail',
    entityId: mailId,
    type: 'internalNote',
    title: 'Mail linked',
    message: `Linked mailbox item to claim ${claimId}.`,
    actor: ctx.userId
  })
  return list[idx]
}

export async function listPartners(ctx: ClaimsfoxTenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<Partner>(ctx.tenantId, 'partners')
}

export async function updatePartnerStatus(ctx: ClaimsfoxTenantContext, partnerId: string, status: Partner['status']) {
  ensureSeeded(ctx.tenantId)
  const list = readList<Partner>(ctx.tenantId, 'partners')
  const idx = list.findIndex((partner) => partner.id === partnerId)
  if (idx === -1) return null
  list[idx] = { ...list[idx], status }
  writeList(ctx.tenantId, 'partners', list)
  addTimelineEventInternal(ctx, {
    entityType: 'partner',
    entityId: partnerId,
    type: 'statusUpdate',
    title: 'Partner status updated',
    message: `Partner status set to ${status}.`,
    actor: ctx.userId
  })
  return list[idx]
}

export async function requestPartner(ctx: ClaimsfoxTenantContext, claimId: string, partnerId: string, note: string) {
  ensureSeeded(ctx.tenantId)
  addTimelineEventInternal(ctx, {
    entityType: 'partner',
    entityId: partnerId,
    type: 'system',
    title: 'Partner requested',
    message: `Partner ${partnerId} requested for claim ${claimId}. ${note}`,
    actor: ctx.userId
  })
}

export async function listTasks(ctx: ClaimsfoxTenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<Task>(ctx.tenantId, 'tasks')
}

export async function updateTaskStatus(ctx: ClaimsfoxTenantContext, taskId: string, status: Task['status']) {
  ensureSeeded(ctx.tenantId)
  const list = readList<Task>(ctx.tenantId, 'tasks')
  const idx = list.findIndex((task) => task.id === taskId)
  if (idx === -1) return null
  list[idx] = { ...list[idx], status }
  writeList(ctx.tenantId, 'tasks', list)
  addTimelineEventInternal(ctx, {
    entityType: 'task',
    entityId: taskId,
    type: 'statusUpdate',
    title: 'Task updated',
    message: `Task marked as ${status}.`,
    actor: ctx.userId
  })
  return list[idx]
}

export async function listCalendarEvents(ctx: ClaimsfoxTenantContext) {
  ensureSeeded(ctx.tenantId)
  return readList<CalendarEvent>(ctx.tenantId, 'calendar')
}

export async function addCalendarEvent(ctx: ClaimsfoxTenantContext, event: Omit<CalendarEvent, 'id' | 'tenantId'>) {
  ensureSeeded(ctx.tenantId)
  const list = readList<CalendarEvent>(ctx.tenantId, 'calendar')
  const entry: CalendarEvent = {
    id: makeId('cal'),
    tenantId: ctx.tenantId,
    ...event
  }
  list.unshift(entry)
  writeList(ctx.tenantId, 'calendar', list)
  addTimelineEventInternal(ctx, {
    entityType: event.entityType ?? 'task',
    entityId: event.entityId ?? entry.id,
    type: 'system',
    title: 'Calendar event added',
    message: `${event.title} scheduled.`,
    actor: ctx.userId
  })
  return entry
}

export async function listTimelineEvents(ctx: ClaimsfoxTenantContext, entityType?: TimelineEvent['entityType'], entityId?: string) {
  ensureSeeded(ctx.tenantId)
  const list = readList<TimelineEvent>(ctx.tenantId, 'timeline')
  if (!entityType || !entityId) return list
  return list.filter((event) => event.entityType === entityType && event.entityId === entityId)
}

export async function addTimelineEvent(ctx: ClaimsfoxTenantContext, event: Omit<TimelineEvent, 'id' | 'tenantId' | 'createdAt'>) {
  ensureSeeded(ctx.tenantId)
  return addTimelineEventInternal(ctx, event)
}
