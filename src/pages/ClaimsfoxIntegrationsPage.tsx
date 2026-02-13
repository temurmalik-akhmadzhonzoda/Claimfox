import { useState } from 'react'
import Card from '@/components/ui/Card'
import ClaimsfoxLayout from '@/claimsfox/components/ClaimsfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addTimelineEvent } from '@/claimsfox/api/claimsfoxApi'

const connectors = [
  { id: 'guidewire', labelKey: 'claimsfox.integrations.guidewire' },
  { id: 'duckcreek', labelKey: 'claimsfox.integrations.duckcreek' },
  { id: 'email', labelKey: 'claimsfox.integrations.email' },
  { id: 'storage', labelKey: 'claimsfox.integrations.storage' },
  { id: 'payments', labelKey: 'claimsfox.integrations.payments' }
]

export default function ClaimsfoxIntegrationsPage() {
  const { t, lang } = useI18n()
  const ctx = useTenantContext()
  const [enabled, setEnabled] = useState<Record<string, boolean>>({})

  async function toggle(id: string) {
    const next = { ...enabled, [id]: !enabled[id] }
    setEnabled(next)
    await addTimelineEvent(ctx, {
      entityType: 'task',
      entityId: id,
      type: 'system',
      title: lang === 'de' ? 'Integration aktualisiert' : 'Integration updated',
      message: lang === 'de'
        ? `Integration ${id} ${next[id] ? 'aktiviert' : 'deaktiviert'}.`
        : `${id} integration ${next[id] ? 'enabled' : 'disabled'}.`,
      actor: ctx.userId
    })
  }

  return (
    <ClaimsfoxLayout title={t('claimsfox.integrations.title')} subtitle={t('claimsfox.integrations.subtitle')}>
      <Card>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {connectors.map((connector) => (
            <label key={connector.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: 12, padding: '0.75rem 1rem' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{t(connector.labelKey)}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{t('claimsfox.integrations.helper')}</div>
              </div>
              <input type="checkbox" checked={Boolean(enabled[connector.id])} onChange={() => toggle(connector.id)} />
            </label>
          ))}
        </div>
      </Card>
    </ClaimsfoxLayout>
  )
}
