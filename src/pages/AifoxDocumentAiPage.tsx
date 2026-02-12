import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import AifoxLayout from '@/aifox/components/AifoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addTimelineEvent, listDocuments } from '@/aifox/api/aifoxApi'
import type { AifoxDocument } from '@/aifox/types'

export default function AifoxDocumentAiPage() {
  const { t, lang } = useI18n()
  const ctx = useTenantContext()
  const [docs, setDocs] = useState<AifoxDocument[]>([])
  const [selected, setSelected] = useState<AifoxDocument | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      const data = await listDocuments(ctx)
      if (!mounted) return
      setDocs(data)
      setSelected(data[0] ?? null)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  async function approve() {
    if (!selected) return
    await addTimelineEvent(ctx, {
      entityType: 'document',
      entityId: selected.id,
      type: 'statusUpdate',
      title: lang === 'de' ? 'Dokumentenextraktion freigegeben' : 'Document extraction approved',
      message: lang === 'de' ? `Felder für ${selected.fileName} freigegeben.` : `Fields approved for ${selected.fileName}.`,
      actor: ctx.userId
    })
  }

  function localizeDocType(value: string) {
    if (lang === 'de') {
      if (value === 'medical') return 'Medizinisch'
      if (value === 'police') return 'Polizei'
      if (value === 'policy') return 'Police'
    }
    if (value === 'medical') return 'Medical'
    if (value === 'police') return 'Police report'
    if (value === 'policy') return 'Policy'
    return value
  }

  function localizeFieldLabel(value: string) {
    if (lang === 'de') {
      if (value === 'name') return 'Name'
      if (value === 'claimNumber') return 'Schadennummer'
      if (value === 'amount') return 'Betrag'
      if (value === 'incidentDate') return 'Schadendatum'
    }
    if (value === 'name') return 'Name'
    if (value === 'claimNumber') return 'Claim number'
    if (value === 'amount') return 'Amount'
    if (value === 'incidentDate') return 'Incident date'
    return value
  }

  return (
    <AifoxLayout title={t('aifox.documentAi.title')} subtitle={t('aifox.documentAi.subtitle')}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
        <Card title={t('aifox.documentAi.uploadTitle')} subtitle={t('aifox.documentAi.uploadSubtitle')}>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <div style={{ border: '1px dashed #cbd5f5', borderRadius: 14, padding: '1rem', textAlign: 'center', color: '#64748b' }}>
              {t('aifox.documentAi.uploadHint')}
            </div>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {docs.map((doc) => (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => setSelected(doc)}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: 12,
                    padding: '0.7rem 1rem',
                    textAlign: 'left',
                    background: selected?.id === doc.id ? '#f8fafc' : '#fff',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{doc.fileName}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{localizeDocType(doc.type)}</div>
                </button>
              ))}
            </div>
          </div>
        </Card>
        <Card title={t('aifox.documentAi.extractionTitle')} subtitle={t('aifox.documentAi.extractionSubtitle')}>
          {selected ? (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{t('aifox.documentAi.confidence')}: {(selected.confidence * 100).toFixed(0)}%</div>
              <div style={{ display: 'grid', gap: '0.4rem' }}>
                {Object.entries(selected.extractedFields).map(([key, value]) => (
                  <label key={key} style={{ display: 'grid', gap: '0.25rem', fontSize: '0.85rem' }}>
                    {localizeFieldLabel(key)}
                    <input defaultValue={value} style={{ padding: '0.5rem', borderRadius: 10, border: '1px solid #e2e8f0' }} />
                  </label>
                ))}
              </div>
              <div style={{ background: '#fff7ed', borderRadius: 10, padding: '0.7rem', color: '#b45309', fontSize: '0.85rem' }}>
                {t('aifox.documentAi.gdprWarning')}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button size="sm" onClick={approve}>{t('aifox.documentAi.approve')}</Button>
                <Button size="sm" variant="secondary">{t('aifox.documentAi.reject')}</Button>
              </div>
            </div>
          ) : null}
        </Card>
      </div>
    </AifoxLayout>
  )
}
