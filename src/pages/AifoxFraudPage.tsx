import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import AifoxLayout from '@/aifox/components/AifoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listClaims, listFraudAlerts, logFraudAction } from '@/aifox/api/aifoxApi'
import type { AifoxClaim, AifoxFraudAlert } from '@/aifox/types'

export default function AifoxFraudPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [claims, setClaims] = useState<AifoxClaim[]>([])
  const [alerts, setAlerts] = useState<AifoxFraudAlert[]>([])
  const [selected, setSelected] = useState<AifoxFraudAlert | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      const [claimsData, alertsData] = await Promise.all([
        listClaims(ctx),
        listFraudAlerts(ctx)
      ])
      if (!mounted) return
      setClaims(claimsData)
      setAlerts(alertsData)
      setSelected(alertsData[0] ?? null)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  async function act(action: string) {
    if (!selected) return
    await logFraudAction(ctx, selected.id, action)
  }

  return (
    <AifoxLayout title={t('aifox.fraud.title')} subtitle={t('aifox.fraud.subtitle')}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '1.5rem' }}>
        <Card title={t('aifox.fraud.listTitle')} subtitle={t('aifox.fraud.listSubtitle')}>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {alerts.map((alert) => {
              const claim = claims.find((c) => c.id === alert.claimId)
              return (
                <button
                  key={alert.id}
                  type="button"
                  onClick={() => setSelected(alert)}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: 12,
                    padding: '0.75rem 1rem',
                    textAlign: 'left',
                    background: selected?.id === alert.id ? '#f8fafc' : '#fff',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{claim?.claimNumber}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{t('aifox.fraud.score')}: {alert.fraudScore}</div>
                </button>
              )
            })}
          </div>
        </Card>
        <Card title={t('aifox.fraud.detailTitle')} subtitle={selected ? t('aifox.fraud.detailSubtitle') : t('aifox.common.selectItem')}>
          {selected ? (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{t('aifox.fraud.riskLevel')}: {selected.riskLevel.toUpperCase()}</div>
              <div style={{ display: 'grid', gap: '0.35rem' }}>
                {selected.signals.map((signal) => (
                  <div key={signal} style={{ fontSize: '0.9rem', color: '#475569' }}>• {signal}</div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Button size="sm" onClick={() => act('Escalated for manual review')}>{t('aifox.fraud.escalate')}</Button>
                <Button size="sm" variant="secondary" onClick={() => act('Suspicion cleared')}>{t('aifox.fraud.clear')}</Button>
              </div>
            </div>
          ) : (
            <div style={{ color: '#64748b' }}>{t('aifox.common.noSelection')}</div>
          )}
        </Card>
      </div>
    </AifoxLayout>
  )
}
