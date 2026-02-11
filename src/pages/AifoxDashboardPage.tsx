import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import AifoxLayout from '@/aifox/components/AifoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listClaims, listDecisions, listFraudAlerts } from '@/aifox/api/aifoxApi'
import type { AifoxClaim, AifoxDecision, AifoxFraudAlert } from '@/aifox/types'

const moduleCards = [
  { key: 'claimsVision', route: '/aifox/claims-vision' },
  { key: 'fraud', route: '/aifox/fraud' },
  { key: 'risk', route: '/aifox/risk' },
  { key: 'documentAi', route: '/aifox/document-ai' },
  { key: 'chatbot', route: '/aifox/chatbot' },
  { key: 'governance', route: '/aifox/governance' },
  { key: 'monitoring', route: '/aifox/monitoring' },
  { key: 'integrations', route: '/aifox/integrations' },
  { key: 'audit', route: '/aifox/audit' }
]

export default function AifoxDashboardPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const navigate = useNavigate()
  const [claims, setClaims] = useState<AifoxClaim[]>([])
  const [fraud, setFraud] = useState<AifoxFraudAlert[]>([])
  const [decisions, setDecisions] = useState<AifoxDecision[]>([])

  useEffect(() => {
    let mounted = true
    async function load() {
      const [claimsData, fraudData, decisionsData] = await Promise.all([
        listClaims(ctx),
        listFraudAlerts(ctx),
        listDecisions(ctx)
      ])
      if (!mounted) return
      setClaims(claimsData)
      setFraud(fraudData)
      setDecisions(decisionsData)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const avgConfidence = useMemo(() => {
    if (decisions.length === 0) return 0
    return Math.round((decisions.reduce((sum, item) => sum + item.confidence, 0) / decisions.length) * 100)
  }, [decisions])

  const kpis = [
    { label: t('aifox.dashboard.kpi.autoProcessed'), value: decisions.filter((d) => d.decision === 'Auto-approve').length },
    { label: t('aifox.dashboard.kpi.fraudAlerts'), value: fraud.length },
    { label: t('aifox.dashboard.kpi.avgConfidence'), value: `${avgConfidence}%` },
    { label: t('aifox.dashboard.kpi.modelDrift'), value: t('aifox.dashboard.kpi.modelDriftValue') },
    { label: t('aifox.dashboard.kpi.aiActRisk'), value: t('aifox.dashboard.kpi.aiActValue') }
  ]

  return (
    <AifoxLayout title={t('aifox.dashboard.title')} subtitle={t('aifox.dashboard.subtitle')}>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {kpis.map((kpi) => (
            <Card key={kpi.label} style={{ padding: '1rem', display: 'grid', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{kpi.label}</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 700 }}>{kpi.value}</span>
            </Card>
          ))}
        </div>
        <Card title={t('aifox.dashboard.modulesTitle')} subtitle={t('aifox.dashboard.modulesSubtitle')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {moduleCards.map((card) => (
              <button
                key={card.key}
                type="button"
                onClick={() => navigate(card.route)}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: 12,
                  padding: '0.85rem 1rem',
                  background: '#fff',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 600 }}>{t(`aifox.nav.${card.key}`)}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{t(`aifox.dashboard.modules.${card.key}`)}</div>
              </button>
            ))}
          </div>
        </Card>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          <Card title={t('aifox.dashboard.performanceTitle')} subtitle={t('aifox.dashboard.performanceSubtitle')}>
            <div style={{ height: 160, background: 'linear-gradient(135deg, #f1f5f9, #fff)', borderRadius: 12, display: 'grid', placeItems: 'center', color: '#64748b' }}>
              {t('aifox.dashboard.performanceChart')}
            </div>
          </Card>
          <Card title={t('aifox.dashboard.heatmapTitle')} subtitle={t('aifox.dashboard.heatmapSubtitle')}>
            <div style={{ height: 160, background: 'linear-gradient(135deg, #fff7ed, #fff)', borderRadius: 12, display: 'grid', placeItems: 'center', color: '#64748b' }}>
              {t('aifox.dashboard.heatmapChart')}
            </div>
          </Card>
          <Card title={t('aifox.dashboard.riskTitle')} subtitle={t('aifox.dashboard.riskSubtitle')}>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {claims.slice(0, 3).map((claim) => (
                <div key={claim.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 600 }}>{claim.lineOfBusiness}</span>
                  <span style={{ color: '#64748b' }}>{claim.severity}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AifoxLayout>
  )
}
