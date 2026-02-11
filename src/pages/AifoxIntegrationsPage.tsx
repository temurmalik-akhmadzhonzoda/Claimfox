import { useState } from 'react'
import Card from '@/components/ui/Card'
import AifoxLayout from '@/aifox/components/AifoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { logIntegrationToggle } from '@/aifox/api/aifoxApi'

const integrations = [
  'Azure AI',
  'Salesforce Einstein',
  'Guidewire',
  'Palantir',
  'Munich Re aiSure™'
]

export default function AifoxIntegrationsPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [enabled, setEnabled] = useState<Record<string, boolean>>({})

  async function toggle(name: string) {
    const next = { ...enabled, [name]: !enabled[name] }
    setEnabled(next)
    await logIntegrationToggle(ctx, name, next[name])
  }

  return (
    <AifoxLayout title={t('aifox.integrations.title')} subtitle={t('aifox.integrations.subtitle')}>
      <Card>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {integrations.map((name) => (
            <label key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: 12, padding: '0.75rem 1rem' }}>
              <span style={{ fontWeight: 600 }}>{name}</span>
              <input type="checkbox" checked={Boolean(enabled[name])} onChange={() => toggle(name)} />
            </label>
          ))}
        </div>
      </Card>
    </AifoxLayout>
  )
}
