import type {
  Client,
  ComparisonResult,
  CoverageRequest,
  DocumentMeta,
  EntityType,
  IntegrationItem,
  IntegrationStatus,
  Offer,
  OfferLine,
  RenewalItem,
  TaskItem,
  TaskStatus,
  TenantContext,
  Tender,
  TenderStatus,
  TimelineEvent
} from '@/brokerfox/types'

const STORAGE_KEY = 'brokerfox_data_v1'

type BrokerfoxStore = {
  clients: Client[]
  tenders: Tender[]
  offers: Offer[]
  renewals: RenewalItem[]
  documents: DocumentMeta[]
  tasks: TaskItem[]
  integrations: IntegrationItem[]
  timeline: TimelineEvent[]
}

type AllTenantStore = Record<string, BrokerfoxStore>

function isBrowser() {
  return typeof window !== 'undefined'
}

function nowIso() {
  return new Date().toISOString()
}

function makeId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}

function loadAll(): AllTenantStore {
  if (!isBrowser()) {
    return {}
  }
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return {}
  }
  try {
    return JSON.parse(raw) as AllTenantStore
  } catch {
    return {}
  }
}

function saveAll(data: AllTenantStore) {
  if (!isBrowser()) {
    return
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function seedStore(tenantId: string): BrokerfoxStore {
  const createdAt = nowIso()
  const clients: Client[] = [
    {
      id: makeId('client'),
      tenantId,
      name: 'Nordlicht Logistics GmbH',
      segment: 'Fleet',
      industry: 'Transport',
      ownerId: 'broker-1',
      createdAt,
      updatedAt: createdAt,
      contacts: [
        {
          id: makeId('contact'),
          tenantId,
          clientId: 'seed',
          name: 'Lea Hansen',
          email: 'lea.hansen@nordlicht.de',
          phone: '+49 40 123 555',
          role: 'Risk Manager'
        }
      ]
    },
    {
      id: makeId('client'),
      tenantId,
      name: 'Atlas Maschinenbau AG',
      segment: 'Industry',
      industry: 'Manufacturing',
      ownerId: 'broker-1',
      createdAt,
      updatedAt: createdAt,
      contacts: [
        {
          id: makeId('contact'),
          tenantId,
          clientId: 'seed',
          name: 'Stefan Koch',
          email: 'stefan.koch@atlas.ag',
          phone: '+49 89 987 00',
          role: 'CFO'
        }
      ]
    }
  ]

  clients[0].contacts[0].clientId = clients[0].id
  clients[1].contacts[0].clientId = clients[1].id

  const coverageRequests: CoverageRequest[] = [
    { id: makeId('cov'), label: 'General Liability', limit: '10 Mio', deductible: '25k', notes: 'EU coverage' },
    { id: makeId('cov'), label: 'Cargo', limit: '5 Mio', deductible: '50k', notes: 'Temperature sensitive' },
    { id: makeId('cov'), label: 'Cyber', limit: '3 Mio', deductible: '10k', notes: 'Incident response included' }
  ]

  const tenders: Tender[] = [
    {
      id: makeId('tender'),
      tenantId,
      clientId: clients[0].id,
      title: 'Fleet & Cargo Program 2026',
      description: 'Multi-line placement for fleet and cargo exposures.',
      status: 'offersReceived',
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
      coverageRequests,
      attachments: [],
      invitedCarriers: [
        { id: makeId('party'), name: 'Helvetia', role: 'carrier', email: 'uww@helvetia.example' },
        { id: makeId('party'), name: 'HDI', role: 'carrier', email: 'submissions@hdi.example' }
      ],
      createdAt,
      updatedAt: createdAt
    }
  ]

  const offers: Offer[] = [
    {
      id: makeId('offer'),
      tenantId,
      tenderId: tenders[0].id,
      carrier: { id: makeId('party'), name: 'Helvetia', role: 'carrier', email: 'uww@helvetia.example' },
      status: 'received',
      lines: [
        { id: makeId('line'), coverage: 'General Liability', limit: '10 Mio', exclusion: 'US exposure', premium: '€ 320k' },
        { id: makeId('line'), coverage: 'Cargo', limit: '5 Mio', exclusion: 'War risk', premium: '€ 180k' },
        { id: makeId('line'), coverage: 'Cyber', limit: '3 Mio', exclusion: 'Ransomware cap', premium: '€ 90k' }
      ],
      createdAt,
      updatedAt: createdAt
    },
    {
      id: makeId('offer'),
      tenantId,
      tenderId: tenders[0].id,
      carrier: { id: makeId('party'), name: 'HDI', role: 'carrier', email: 'submissions@hdi.example' },
      status: 'received',
      lines: [
        { id: makeId('line'), coverage: 'General Liability', limit: '8 Mio', exclusion: 'US exposure', premium: '€ 295k' },
        { id: makeId('line'), coverage: 'Cargo', limit: '5 Mio', exclusion: 'War risk', premium: '€ 210k' },
        { id: makeId('line'), coverage: 'Cyber', limit: '2 Mio', exclusion: 'Ransomware cap', premium: '€ 70k' }
      ],
      createdAt,
      updatedAt: createdAt
    }
  ]

  const renewals: RenewalItem[] = [
    {
      id: makeId('renewal'),
      tenantId,
      clientId: clients[0].id,
      policyName: 'Fleet Liability',
      carrier: 'AXA',
      renewalDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
      premium: '€ 210k',
      status: 'upcoming'
    },
    {
      id: makeId('renewal'),
      tenantId,
      clientId: clients[1].id,
      policyName: 'Property All Risk',
      carrier: 'Allianz',
      renewalDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 70).toISOString(),
      premium: '€ 140k',
      status: 'inReview'
    }
  ]

  const documents: DocumentMeta[] = [
    {
      id: makeId('doc'),
      tenantId,
      name: 'Loss Run 2024.pdf',
      type: 'application/pdf',
      size: 245000,
      uploadedAt: createdAt,
      uploadedBy: 'broker-1',
      entityType: 'client',
      entityId: clients[0].id
    }
  ]

  const tasks: TaskItem[] = [
    {
      id: makeId('task'),
      tenantId,
      title: 'Schedule tender kickoff call',
      description: 'Align on coverage requirements and timeline.',
      status: 'todo',
      linkedEntityType: 'tender',
      linkedEntityId: tenders[0].id,
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
      assigneeId: 'broker-1',
      createdAt,
      updatedAt: createdAt
    },
    {
      id: makeId('task'),
      tenantId,
      title: 'Upload renewal loss summary',
      status: 'inProgress',
      linkedEntityType: 'client',
      linkedEntityId: clients[1].id,
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12).toISOString(),
      assigneeId: 'broker-1',
      createdAt,
      updatedAt: createdAt
    }
  ]

  const integrations: IntegrationItem[] = [
    {
      id: makeId('integration'),
      tenantId,
      name: 'BiPRO',
      status: 'notConnected',
      description: 'Industry standard communication format for German carriers.',
      updatedAt: createdAt
    },
    {
      id: makeId('integration'),
      tenantId,
      name: 'API/Webhook',
      status: 'connected',
      description: 'Custom API and webhook integrations for data exchange.',
      updatedAt: createdAt
    },
    {
      id: makeId('integration'),
      tenantId,
      name: 'Pool/CRM connector',
      status: 'notConnected',
      description: 'Connector to broker pools and CRM vendors.',
      updatedAt: createdAt
    }
  ]

  const timeline: TimelineEvent[] = [
    {
      id: makeId('event'),
      tenantId,
      actorId: 'broker-1',
      timestamp: createdAt,
      entityType: 'tender',
      entityId: tenders[0].id,
      type: 'statusUpdate',
      title: 'Status updated',
      message: 'Tender moved to offers received.'
    }
  ]

  return { clients, tenders, offers, renewals, documents, tasks, integrations, timeline }
}

function getStore(tenantId: string): BrokerfoxStore {
  const all = loadAll()
  if (!all[tenantId]) {
    all[tenantId] = seedStore(tenantId)
    saveAll(all)
  }
  return all[tenantId]
}

function persistStore(tenantId: string, store: BrokerfoxStore) {
  const all = loadAll()
  all[tenantId] = store
  saveAll(all)
}

function addTimelineEventInternal(store: BrokerfoxStore, ctx: TenantContext, event: Omit<TimelineEvent, 'id' | 'tenantId' | 'actorId' | 'timestamp'>) {
  const entry: TimelineEvent = {
    id: makeId('event'),
    tenantId: ctx.tenantId,
    actorId: ctx.userId,
    timestamp: nowIso(),
    ...event
  }
  store.timeline.unshift(entry)
  return entry
}

export async function listClients(ctx: TenantContext) {
  const store = getStore(ctx.tenantId)
  return [...store.clients]
}

export async function getClient(ctx: TenantContext, clientId: string) {
  const store = getStore(ctx.tenantId)
  return store.clients.find((client) => client.id === clientId) || null
}

export async function createClient(ctx: TenantContext, input: { name: string; segment?: string; industry?: string }) {
  const store = getStore(ctx.tenantId)
  const createdAt = nowIso()
  const client: Client = {
    id: makeId('client'),
    tenantId: ctx.tenantId,
    name: input.name,
    segment: input.segment,
    industry: input.industry,
    ownerId: ctx.userId,
    createdAt,
    updatedAt: createdAt,
    contacts: []
  }
  store.clients.unshift(client)
  addTimelineEventInternal(store, ctx, {
    entityType: 'client',
    entityId: client.id,
    type: 'system',
    title: 'Client created',
    message: `Client ${client.name} created.`
  })
  persistStore(ctx.tenantId, store)
  return client
}

export async function updateClient(ctx: TenantContext, clientId: string, update: Partial<Client>) {
  const store = getStore(ctx.tenantId)
  const idx = store.clients.findIndex((client) => client.id === clientId)
  if (idx === -1) {
    return null
  }
  const next: Client = {
    ...store.clients[idx],
    ...update,
    updatedAt: nowIso()
  }
  store.clients[idx] = next
  addTimelineEventInternal(store, ctx, {
    entityType: 'client',
    entityId: clientId,
    type: 'statusUpdate',
    title: 'Client updated',
    message: 'Client information updated.'
  })
  persistStore(ctx.tenantId, store)
  return next
}

export async function listTenders(ctx: TenantContext) {
  const store = getStore(ctx.tenantId)
  return [...store.tenders]
}

export async function getTender(ctx: TenantContext, tenderId: string) {
  const store = getStore(ctx.tenantId)
  return store.tenders.find((tender) => tender.id === tenderId) || null
}

export async function createTender(ctx: TenantContext, input: {
  clientId: string
  title: string
  description?: string
  status?: TenderStatus
}) {
  const store = getStore(ctx.tenantId)
  const createdAt = nowIso()
  const tender: Tender = {
    id: makeId('tender'),
    tenantId: ctx.tenantId,
    clientId: input.clientId,
    title: input.title,
    description: input.description,
    status: input.status ?? 'draft',
    coverageRequests: [],
    attachments: [],
    invitedCarriers: [],
    createdAt,
    updatedAt: createdAt
  }
  store.tenders.unshift(tender)
  addTimelineEventInternal(store, ctx, {
    entityType: 'tender',
    entityId: tender.id,
    type: 'system',
    title: 'Tender created',
    message: `Tender ${tender.title} created.`
  })
  persistStore(ctx.tenantId, store)
  return tender
}

export async function updateTender(ctx: TenantContext, tenderId: string, update: Partial<Tender>) {
  const store = getStore(ctx.tenantId)
  const idx = store.tenders.findIndex((tender) => tender.id === tenderId)
  if (idx === -1) {
    return null
  }
  const next = { ...store.tenders[idx], ...update, updatedAt: nowIso() }
  store.tenders[idx] = next
  addTimelineEventInternal(store, ctx, {
    entityType: 'tender',
    entityId: tenderId,
    type: 'statusUpdate',
    title: 'Tender updated',
    message: `Tender updated to status ${next.status}.`
  })
  persistStore(ctx.tenantId, store)
  return next
}

export async function listOffers(ctx: TenantContext) {
  const store = getStore(ctx.tenantId)
  return [...store.offers]
}

export async function addOffer(ctx: TenantContext, tenderId: string, carrierName: string, lines: OfferLine[]) {
  const store = getStore(ctx.tenantId)
  const createdAt = nowIso()
  const offer: Offer = {
    id: makeId('offer'),
    tenantId: ctx.tenantId,
    tenderId,
    carrier: { id: makeId('party'), name: carrierName, role: 'carrier' },
    status: 'received',
    lines,
    createdAt,
    updatedAt: createdAt
  }
  store.offers.unshift(offer)
  addTimelineEventInternal(store, ctx, {
    entityType: 'offer',
    entityId: offer.id,
    type: 'system',
    title: 'Offer received',
    message: `Offer from ${carrierName} received.`
  })
  persistStore(ctx.tenantId, store)
  return offer
}

export async function listRenewals(ctx: TenantContext) {
  const store = getStore(ctx.tenantId)
  return [...store.renewals]
}

export async function listDocuments(ctx: TenantContext) {
  const store = getStore(ctx.tenantId)
  return [...store.documents]
}

export async function uploadDocument(ctx: TenantContext, input: Omit<DocumentMeta, 'id' | 'tenantId' | 'uploadedAt' | 'uploadedBy'>) {
  const store = getStore(ctx.tenantId)
  const doc: DocumentMeta = {
    id: makeId('doc'),
    tenantId: ctx.tenantId,
    uploadedAt: nowIso(),
    uploadedBy: ctx.userId,
    ...input
  }
  store.documents.unshift(doc)
  addTimelineEventInternal(store, ctx, {
    entityType: input.entityType ?? 'document',
    entityId: input.entityId ?? doc.id,
    type: 'attachment',
    title: 'Document uploaded',
    message: `Document ${doc.name} uploaded.`,
    attachments: [doc]
  })
  persistStore(ctx.tenantId, store)
  return doc
}

export async function assignDocument(ctx: TenantContext, docId: string, entityType: EntityType, entityId: string) {
  const store = getStore(ctx.tenantId)
  const idx = store.documents.findIndex((doc) => doc.id === docId)
  if (idx === -1) {
    return null
  }
  store.documents[idx] = {
    ...store.documents[idx],
    entityType,
    entityId
  }
  addTimelineEventInternal(store, ctx, {
    entityType,
    entityId,
    type: 'statusUpdate',
    title: 'Document linked',
    message: `Document linked to ${entityType}.`
  })
  persistStore(ctx.tenantId, store)
  return store.documents[idx]
}

export async function listTasks(ctx: TenantContext) {
  const store = getStore(ctx.tenantId)
  return [...store.tasks]
}

export async function createTask(ctx: TenantContext, input: Omit<TaskItem, 'id' | 'tenantId' | 'createdAt' | 'updatedAt'>) {
  const store = getStore(ctx.tenantId)
  const createdAt = nowIso()
  const task: TaskItem = {
    id: makeId('task'),
    tenantId: ctx.tenantId,
    createdAt,
    updatedAt: createdAt,
    ...input
  }
  store.tasks.unshift(task)
  addTimelineEventInternal(store, ctx, {
    entityType: 'task',
    entityId: task.id,
    type: 'system',
    title: 'Task created',
    message: `Task ${task.title} created.`
  })
  persistStore(ctx.tenantId, store)
  return task
}

export async function updateTaskStatus(ctx: TenantContext, taskId: string, status: TaskStatus) {
  const store = getStore(ctx.tenantId)
  const idx = store.tasks.findIndex((task) => task.id === taskId)
  if (idx === -1) {
    return null
  }
  const next = { ...store.tasks[idx], status, updatedAt: nowIso() }
  store.tasks[idx] = next
  addTimelineEventInternal(store, ctx, {
    entityType: 'task',
    entityId: taskId,
    type: 'statusUpdate',
    title: 'Task moved',
    message: `Task moved to ${status}.`
  })
  persistStore(ctx.tenantId, store)
  return next
}

export async function listIntegrations(ctx: TenantContext) {
  const store = getStore(ctx.tenantId)
  return [...store.integrations]
}

export async function updateIntegrationStatus(ctx: TenantContext, integrationId: string, status: IntegrationStatus) {
  const store = getStore(ctx.tenantId)
  const idx = store.integrations.findIndex((item) => item.id === integrationId)
  if (idx === -1) {
    return null
  }
  store.integrations[idx] = { ...store.integrations[idx], status, updatedAt: nowIso() }
  addTimelineEventInternal(store, ctx, {
    entityType: 'integration',
    entityId: integrationId,
    type: 'statusUpdate',
    title: 'Integration updated',
    message: `Integration status set to ${status}.`
  })
  persistStore(ctx.tenantId, store)
  return store.integrations[idx]
}

export async function listTimelineEvents(ctx: TenantContext, entityType: EntityType, entityId: string) {
  const store = getStore(ctx.tenantId)
  return store.timeline.filter((event) => event.entityType === entityType && event.entityId === entityId)
}

export async function listAllTimelineEvents(ctx: TenantContext) {
  const store = getStore(ctx.tenantId)
  return [...store.timeline]
}

export async function addTimelineEvent(ctx: TenantContext, event: Omit<TimelineEvent, 'id' | 'tenantId' | 'actorId' | 'timestamp'>) {
  const store = getStore(ctx.tenantId)
  const entry = addTimelineEventInternal(store, ctx, event)
  persistStore(ctx.tenantId, store)
  return entry
}

export async function aiStructureTender(input: { title: string; description?: string }) {
  return {
    suggestion: true,
    result: {
      objectives: ['Clarify coverage scope', 'Confirm claims history', 'Align carrier appetite'],
      requiredDocs: ['Loss runs', 'Fleet list', 'Risk questionnaire'],
      completeness: {
        title: Boolean(input.title),
        description: Boolean(input.description)
      }
    }
  }
}

export async function aiCompareOffers(offers: Offer[]): Promise<{ suggestion: true; result: ComparisonResult }> {
  const carriers = offers.map((offer) => offer.carrier.name).join(', ')
  return {
    suggestion: true,
    result: {
      summary: `Suggested comparison based on carriers: ${carriers}.`,
      highlights: ['Coverage limits differ between carriers.', 'Premium spread indicates negotiation room.'],
      risks: ['Exclusions may impact client needs.', 'Cyber limit lower in one offer.']
    }
  }
}

export async function aiGenerateClientSummary(context: { clientName: string; tenderTitle: string; comparison: ComparisonResult }) {
  return {
    suggestion: true,
    result: `Suggested summary for ${context.clientName}: We received multiple offers for ${context.tenderTitle}. The key differences are limits and exclusions; review the highlighted risks before selecting. This is an AI-generated suggestion and requires human approval.`
  }
}
