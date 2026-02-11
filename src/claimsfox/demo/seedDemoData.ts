import type { CalendarEvent, Claim, Document, MailMessage, Partner, Task, TimelineEvent } from '@/claimsfox/types'
import {
  adjusters,
  calendarTemplates,
  claimLines,
  claimSeverities,
  claimStatuses,
  claimsfoxTenants,
  documentNames,
  insuredNames,
  locations,
  mailboxSubjects,
  partners,
  tagsPool,
  timelineNotes
} from './demoCatalog'

const KEY_PREFIX = 'claimsfox'

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

function hash(input: string) {
  let h = 0
  for (let i = 0; i < input.length; i += 1) {
    h = (h << 5) - h + input.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

function buildClaims(tenantId: string, count: number): Claim[] {
  return Array.from({ length: count }).map((_, idx) => {
    const lineOfBusiness = pick(claimLines, idx)
    const insured = pick(insuredNames, idx + 3)
    const status = pick(claimStatuses, idx + 2)
    const severity = pick(claimSeverities, idx + 4)
    const assignedTo = pick(adjusters, idx + 1)
    const reserve = 20000 + idx * 3500
    const paid = Math.max(0, reserve - 4000 - (idx % 4) * 1500)
    const lossDate = stableNow(idx - 20)
    const createdAt = stableNow(idx - 15)
    const slaDueAt = stableNow(idx + 10)
    const tagCount = 2 + (idx % 3)
    const tags = Array.from({ length: tagCount }).map((__, tagIdx) => pick(tagsPool, idx + tagIdx))
    const claimNumber = `CL-${2026 + (idx % 2)}-${(idx + 1).toString().padStart(4, '0')}`
    return {
      id: stableId('claim', tenantId, idx + 1),
      tenantId,
      claimNumber,
      policyRef: `POL-${tenantId.slice(-3).toUpperCase()}-${1200 + idx}`,
      insured,
      lossDate,
      status,
      severity,
      reserve,
      paid,
      currency: 'EUR',
      lineOfBusiness,
      location: pick(locations, idx + 5),
      tags,
      assignedTo,
      slaDueAt,
      fraudScore: Math.round((0.08 + (idx % 7) * 0.04) * 100) / 100,
      triageScore: Math.round((0.45 + (idx % 6) * 0.06) * 100) / 100,
      timelineSummary: pick(timelineNotes, idx + 2),
      createdAt
    } satisfies Claim
  })
}

function buildDocuments(tenantId: string, claims: Claim[]): Document[] {
  const docs: Document[] = []
  claims.forEach((claim, idx) => {
    const count = 2 + (idx % 3)
    for (let i = 0; i < count; i += 1) {
      const name = documentNames[(idx + i) % documentNames.length]
      docs.push({
        id: stableId('doc', tenantId, idx * 10 + i + 1),
        tenantId,
        fileName: name,
        mime: name.endsWith('.pdf') ? 'application/pdf' : 'text/plain',
        size: 220000 + i * 8000,
        urlOrBlobKey: `/demo-docs/claimsfox/${name}`,
        linkedEntityType: 'claim',
        linkedEntityId: claim.id,
        extractedFields: {
          lossDate: new Date(claim.lossDate).toLocaleDateString('de-DE'),
          reserve: `€ ${(claim.reserve / 1000).toFixed(1)}k`,
          severity: claim.severity
        },
        approvalStatus: pick(['pending', 'needsReview', 'approved'], idx + i) as Document['approvalStatus'],
        createdAt: stableNow(idx - i)
      })
    }
  })
  return docs
}

function buildMailbox(tenantId: string, claims: Claim[]): MailMessage[] {
  return Array.from({ length: 12 }).map((_, idx) => {
    const claim = claims[idx % claims.length]
    const seed = hash(`${tenantId}-${idx}`)
    return {
      id: stableId('mail', tenantId, idx + 1),
      threadId: `thread_${claim.id}`,
      tenantId,
      from: `claims-${idx}@carrier.example`,
      to: ['adjuster@claimsfox.app'],
      subject: mailboxSubjects[idx % mailboxSubjects.length],
      body: `Hello Claims Team,\n\nWe are following up on ${claim.claimNumber} (${claim.insured}). Please find the attached documents and provide an updated status on the reserve and next steps.\n\nBest regards,\nCarrier Service Desk`,
      receivedAt: stableNow(-idx),
      attachments: [
        { id: stableId('att', tenantId, idx + 1), name: documentNames[idx % documentNames.length], size: 480000 }
      ],
      linkedEntity: { type: 'claim', id: claim.id }
    } satisfies MailMessage
  })
}

function buildTasks(tenantId: string, claims: Claim[]): Task[] {
  const statuses: Task['status'][] = ['open', 'inProgress', 'blocked', 'done']
  return Array.from({ length: 20 }).map((_, idx) => {
    const claim = claims[idx % claims.length]
    return {
      id: stableId('task', tenantId, idx + 1),
      tenantId,
      title: `Follow-up ${claim.claimNumber} - ${claim.insured}`,
      owner: pick(adjusters, idx),
      dueAt: stableNow(idx + 2),
      status: pick(statuses, idx),
      linkedEntityType: 'claim',
      linkedEntityId: claim.id
    } satisfies Task
  })
}

function buildPartners(tenantId: string): Partner[] {
  return partners.map((partner, idx) => ({
    id: partner.id,
    tenantId,
    name: partner.name,
    role: partner.role,
    status: pick(['active', 'standby', 'onHold'], idx) as Partner['status'],
    rating: 3.8 + (idx % 3) * 0.3,
    contactEmail: `ops@${partner.name.toLowerCase().replace(/\s+/g, '')}.example`
  }))
}

function buildCalendar(tenantId: string, claims: Claim[]): CalendarEvent[] {
  return calendarTemplates.map((template, idx) => {
    const claim = claims[idx % claims.length]
    return {
      id: stableId('cal', tenantId, idx + 1),
      tenantId,
      title: `${template.title}: ${claim.claimNumber}`,
      date: stableNow(idx + 3),
      entityType: 'claim',
      entityId: claim.id,
      description: `Discuss ${claim.insured} claim status and next actions for ${claim.lineOfBusiness}.`,
      location: template.location,
      participants: [claim.assignedTo, 'broker@partner.example']
    } satisfies CalendarEvent
  })
}

function buildTimeline(tenantId: string, claims: Claim[], docs: Document[], tasks: Task[]): TimelineEvent[] {
  const events: TimelineEvent[] = []
  claims.forEach((claim, idx) => {
    events.push({
      id: stableId('tl', tenantId, idx * 10 + 1),
      tenantId,
      entityType: 'claim',
      entityId: claim.id,
      type: 'system',
      title: 'Claim created',
      message: `FNOL captured for ${claim.claimNumber} - ${claim.insured}.`,
      createdAt: claim.createdAt,
      actor: 'system'
    })
    const docForClaim = docs.filter((doc) => doc.linkedEntityId === claim.id).slice(0, 2)
    docForClaim.forEach((doc, docIdx) => {
      events.push({
        id: stableId('tl', tenantId, idx * 10 + 2 + docIdx),
        tenantId,
        entityType: 'document',
        entityId: doc.id,
        type: 'system',
        title: 'Document uploaded',
        message: `${doc.fileName} extracted with key fields.`,
        createdAt: stableNow(idx - docIdx),
        actor: 'system'
      })
    })
    const task = tasks[idx % tasks.length]
    events.push({
      id: stableId('tl', tenantId, idx * 10 + 5),
      tenantId,
      entityType: 'task',
      entityId: task.id,
      type: 'internalNote',
      title: 'Task assigned',
      message: `Task "${task.title}" assigned to ${task.owner}.`,
      createdAt: stableNow(idx + 1),
      actor: 'system'
    })
    events.push({
      id: stableId('tl', tenantId, idx * 10 + 6),
      tenantId,
      entityType: 'claim',
      entityId: claim.id,
      type: 'statusUpdate',
      title: 'Status updated',
      message: `Status moved to ${claim.status}.`,
      createdAt: stableNow(idx + 2),
      actor: claim.assignedTo
    })
  })
  return events
}

export function seedTenant(tenantId: string) {
  const claims = buildClaims(tenantId, 18)
  const documents = buildDocuments(tenantId, claims)
  const mailbox = buildMailbox(tenantId, claims)
  const tasks = buildTasks(tenantId, claims)
  const partnersList = buildPartners(tenantId)
  const calendar = buildCalendar(tenantId, claims)
  const timeline = buildTimeline(tenantId, claims, documents, tasks)

  writeList(tenantId, 'claims', claims)
  writeList(tenantId, 'documents', documents)
  writeList(tenantId, 'mailbox', mailbox)
  writeList(tenantId, 'tasks', tasks)
  writeList(tenantId, 'partners', partnersList)
  writeList(tenantId, 'calendar', calendar)
  writeList(tenantId, 'timeline', timeline)
}

export function seedAllTenants() {
  claimsfoxTenants.forEach((tenant) => seedTenant(tenant.id))
}

export function ensureSeeded(tenantId: string) {
  if (!isBrowser()) return
  const markerKey = key(tenantId, 'seeded')
  const seeded = window.localStorage.getItem(markerKey)
  if (seeded) return
  seedTenant(tenantId)
  window.localStorage.setItem(markerKey, 'true')
}

export function seedAllTenantsIfEmpty() {
  if (!isBrowser()) return
  seedAllTenants()
  claimsfoxTenants.forEach((tenant) => ensureSeeded(tenant.id))
}
