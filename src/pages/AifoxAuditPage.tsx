import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import AifoxLayout from '@/aifox/components/AifoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listTimeline } from '@/aifox/api/aifoxApi'
import type { AifoxTimelineEvent } from '@/aifox/types'

export default function AifoxAuditPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [events, setEvents] = useState<AifoxTimelineEvent[]>([])

  useEffect(() => {
    let mounted = true
    async function load() {
      const data = await listTimeline(ctx)
      if (!mounted) return
      setEvents(data)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  return (
    <AifoxLayout title={t('aifox.audit.title')} subtitle={t('aifox.audit.subtitle')}>
      <Card>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {events.map((event) => (
            <div key={event.id} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem' }}>
              <div style={{ fontWeight: 600 }}>{event.title}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{event.type} · {event.actor} · {new Date(event.createdAt).toLocaleString()}</div>
              <div style={{ color: '#475569' }}>{event.message}</div>
            </div>
          ))}
        </div>
      </Card>
    </AifoxLayout>
  )
}
