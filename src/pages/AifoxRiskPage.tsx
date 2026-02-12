import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import AifoxLayout from '@/aifox/components/AifoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addTimelineEvent, listUnderwriting } from '@/aifox/api/aifoxApi'
import type { AifoxUnderwritingSim } from '@/aifox/types'

export default function AifoxRiskPage() {
  const { t, lang } = useI18n()
  const ctx = useTenantContext()
  const [sims, setSims] = useState<AifoxUnderwritingSim[]>([])
  const [selected, setSelected] = useState<AifoxUnderwritingSim | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      const data = await listUnderwriting(ctx)
      if (!mounted) return
      setSims(data)
      setSelected(data[0] ?? null)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  async function logAction() {
    if (!selected) return
    await addTimelineEvent(ctx, {
      entityType: 'risk',
      entityId: selected.id,
      type: 'system',
      title: lang === 'de' ? 'Risikoberechnung protokolliert' : 'Risk calculation logged',
      message: lang === 'de' ? 'Risiko-Score und Prämie neu berechnet.' : 'Risk score and premium recalculated.',
      actor: ctx.userId
    })
  }

  return (
    <AifoxLayout title={t('aifox.risk.title')} subtitle={t('aifox.risk.subtitle')}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
        <Card title={t('aifox.risk.inputTitle')} subtitle={t('aifox.risk.inputSubtitle')}>
          {selected ? (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <label style={{ display: 'grid', gap: '0.35rem' }}>
                {t('aifox.risk.age')}
                <input value={selected.input.age} readOnly style={{ padding: '0.6rem', borderRadius: 10, border: '1px solid #e2e8f0' }} />
              </label>
              <label style={{ display: 'grid', gap: '0.35rem' }}>
                {t('aifox.risk.vehicle')}
                <input value={selected.input.vehicle} readOnly style={{ padding: '0.6rem', borderRadius: 10, border: '1px solid #e2e8f0' }} />
              </label>
              <label style={{ display: 'grid', gap: '0.35rem' }}>
                {t('aifox.risk.region')}
                <input value={selected.input.region} readOnly style={{ padding: '0.6rem', borderRadius: 10, border: '1px solid #e2e8f0' }} />
              </label>
              <label style={{ display: 'grid', gap: '0.35rem' }}>
                {t('aifox.risk.lossHistory')}
                <input value={selected.input.lossHistory} readOnly style={{ padding: '0.6rem', borderRadius: 10, border: '1px solid #e2e8f0' }} />
              </label>
              <Button size="sm" onClick={logAction}>{t('aifox.risk.recalculate')}</Button>
            </div>
          ) : null}
        </Card>
        <Card title={t('aifox.risk.outputTitle')} subtitle={t('aifox.risk.outputSubtitle')}>
          {selected ? (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ fontWeight: 600 }}>{t('aifox.risk.riskScore')}: {selected.output.riskScore}</div>
              <div style={{ fontWeight: 600 }}>{t('aifox.risk.premium')}: € {selected.output.premium}</div>
              <div style={{ display: 'grid', gap: '0.35rem' }}>
                {selected.output.factors.map((factor) => (
                  <div key={factor.label} style={{ fontSize: '0.85rem', color: '#475569' }}>{factor.label}: {factor.value}%</div>
                ))}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{t('aifox.risk.biasCheck')}: {selected.output.biasCheck}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{t('aifox.risk.aiActCategory')}: {selected.output.aiActCategory}</div>
            </div>
          ) : null}
        </Card>
      </div>
    </AifoxLayout>
  )
}
