import React, { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import BrokerfoxNav from '@/brokerfox/components/BrokerfoxNav'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { assignDocument, listClients, listDocuments, listTenders, uploadDocument } from '@/brokerfox/api/brokerfoxApi'
import type { Client, DocumentMeta } from '@/brokerfox/types'

export default function BrokerfoxDocumentsPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [documents, setDocuments] = useState<DocumentMeta[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [tenders, setTenders] = useState<any[]>([])
  const [inboxOnly, setInboxOnly] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [entityType, setEntityType] = useState<'client' | 'tender'>('client')
  const [entityId, setEntityId] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const [docs, clientData, tenderData] = await Promise.all([listDocuments(ctx), listClients(ctx), listTenders(ctx)])
        if (!mounted) return
        setDocuments(docs)
        setClients(clientData)
        setTenders(tenderData)
        setEntityId(clientData[0]?.id ?? tenderData[0]?.id ?? '')
        setLoading(false)
      } catch {
        if (!mounted) return
        setError(t('brokerfox.state.error'))
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [ctx, t])

  const filtered = useMemo(() => {
    if (!inboxOnly) return documents
    return documents.filter((doc) => !doc.entityId)
  }, [documents, inboxOnly])

  async function handleUpload() {
    if (!file) return
    const doc = await uploadDocument(ctx, {
      name: file.name,
      type: file.type || 'application/octet-stream',
      size: file.size,
      entityType: entityId ? entityType : undefined,
      entityId: entityId || undefined
    })
    setDocuments((prev) => [doc, ...prev])
    setFile(null)
  }

  async function handleAssign(doc: DocumentMeta) {
    if (!entityId) return
    const updated = await assignDocument(ctx, doc.id, entityType, entityId)
    if (!updated) return
    setDocuments((prev) => prev.map((item) => (item.id === doc.id ? updated : item)))
  }

  const entityOptions = entityType === 'client' ? clients : tenders

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Header title={t('brokerfox.documents.title')} subtitle={t('brokerfox.documents.subtitle')} titleColor="#0f172a" />
        <BrokerfoxNav />
        <Card variant="glass" title={t('brokerfox.documents.uploadTitle')} subtitle={t('brokerfox.documents.uploadSubtitle')}>
          <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <input type="file" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
            <select value={entityType} onChange={(event) => setEntityType(event.target.value as 'client' | 'tender')} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
              <option value="client">{t('brokerfox.documents.entityClient')}</option>
              <option value="tender">{t('brokerfox.documents.entityTender')}</option>
            </select>
            <select value={entityId} onChange={(event) => setEntityId(event.target.value)} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
              {entityOptions.map((item: any) => (
                <option key={item.id} value={item.id}>{item.name ?? item.title}</option>
              ))}
            </select>
            <Button onClick={handleUpload}>{t('brokerfox.actions.uploadDocument')}</Button>
          </div>
        </Card>

        <Card variant="glass" title={t('brokerfox.documents.listTitle')} subtitle={t('brokerfox.documents.listSubtitle')}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <input type="checkbox" checked={inboxOnly} onChange={(event) => setInboxOnly(event.target.checked)} />
            {t('brokerfox.documents.inboxOnly')}
          </label>
          {loading ? <p>{t('brokerfox.state.loading')}</p> : null}
          {error ? <p>{error}</p> : null}
          {filtered.length === 0 ? <p>{t('brokerfox.empty.noDocuments')}</p> : null}
          {filtered.map((doc) => (
            <div key={doc.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0.75rem', alignItems: 'center', padding: '0.4rem 0', borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <strong>{doc.name}</strong>
                <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{doc.entityType ?? t('brokerfox.documents.unassigned')}</div>
              </div>
              <span style={{ color: '#94a3b8' }}>{Math.round(doc.size / 1000)} KB</span>
              {!doc.entityId ? <Button onClick={() => handleAssign(doc)}>{t('brokerfox.documents.assignAction')}</Button> : null}
            </div>
          ))}
        </Card>
      </div>
    </section>
  )
}
