import { useState } from 'react'
import Card from '@/components/ui/Card'
import UnderwriterfoxLayout from '@/underwriterfox/components/UnderwriterfoxLayout'
import AiRecommendationPanel from '@/underwriterfox/components/AiRecommendationPanel'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { saveAiRecommendation } from '@/underwriterfox/api/underwriterfoxApi'
import type { AiRecommendation } from '@/underwriterfox/types'

export default function UnderwriterfoxAiPage() {
  const { t, lang } = useI18n()
  const tenant = useTenantContext()
  const ctx = { tenantId: tenant.tenantId, userId: tenant.userId }
  const numberFormatter = new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-US')
  const [recommendation, setRecommendation] = useState<AiRecommendation | null>(null)

  async function handleGenerate() {
    const next: AiRecommendation = {
      summary: t('underwriterfox.aiPage.generatedSummary'),
      recommendedDecision: 'refer',
      bullets: [
        t('underwriterfox.aiPage.generatedBullets.lossRatio'),
        t('underwriterfox.aiPage.generatedBullets.controls'),
        t('underwriterfox.aiPage.generatedBullets.exposure')
      ],
      confidence: 0.74
    }
    await saveAiRecommendation(ctx, 'ai', next)
    setRecommendation(next)
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <UnderwriterfoxLayout title={t('underwriterfox.aiPage.title')} subtitle={t('underwriterfox.aiPage.subtitle')}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
          <Card variant="glass" style={{ padding: '0.8rem 0.95rem' }}>
            <div style={{ color: '#64748b', fontSize: '0.82rem' }}>{t('underwriterfox.aiPage.kpis.confidence')}</div>
            <div style={{ marginTop: '0.3rem', fontWeight: 700, fontSize: '1.3rem', color: '#0f172a' }}>
              {numberFormatter.format(Math.round((recommendation?.confidence ?? 0.74) * 100))}%
            </div>
          </Card>
          <Card variant="glass" style={{ padding: '0.8rem 0.95rem' }}>
            <div style={{ color: '#64748b', fontSize: '0.82rem' }}>{t('underwriterfox.aiPage.kpis.riskScore')}</div>
            <div style={{ marginTop: '0.3rem', fontWeight: 700, fontSize: '1.3rem', color: '#0f172a' }}>
              {numberFormatter.format(recommendation ? 68 : 72)}
            </div>
          </Card>
          <Card variant="glass" style={{ padding: '0.8rem 0.95rem' }}>
            <div style={{ color: '#64748b', fontSize: '0.82rem' }}>{t('underwriterfox.aiPage.kpis.openFindings')}</div>
            <div style={{ marginTop: '0.3rem', fontWeight: 700, fontSize: '1.3rem', color: '#0f172a' }}>
              {numberFormatter.format(recommendation ? 3 : 5)}
            </div>
          </Card>
          <Card variant="glass" style={{ padding: '0.8rem 0.95rem' }}>
            <div style={{ color: '#64748b', fontSize: '0.82rem' }}>{t('underwriterfox.aiPage.kpis.decisionReadiness')}</div>
            <div style={{ marginTop: '0.3rem', fontWeight: 700, fontSize: '1rem', color: recommendation ? '#0f766e' : '#b45309' }}>
              {recommendation ? t('underwriterfox.aiPage.kpis.readinessPending') : t('underwriterfox.aiPage.kpis.readinessReady')}
            </div>
          </Card>
        </div>
        <AiRecommendationPanel recommendation={recommendation} onGenerate={handleGenerate} />
      </UnderwriterfoxLayout>
    </section>
  )
}
