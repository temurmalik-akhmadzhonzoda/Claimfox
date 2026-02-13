import { useMemo, useState } from 'react'
import UnderwriterfoxLayout from '@/underwriterfox/components/UnderwriterfoxLayout'
import RulesPanel from '@/underwriterfox/components/RulesPanel'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { saveRuleEvaluation } from '@/underwriterfox/api/underwriterfoxApi'
import type { RuleHit } from '@/underwriterfox/types'

export default function UnderwriterfoxRulesPage() {
  const { t, lang } = useI18n()
  const tenant = useTenantContext()
  const ctx = { tenantId: tenant.tenantId, userId: tenant.userId }
  const locale = lang === 'de' ? 'de-DE' : 'en-US'
  const decimalFormatter = new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const integerFormatter = new Intl.NumberFormat(locale)
  const [lossRatioThreshold, setLossRatioThreshold] = useState(0.65)
  const [geoShareThreshold, setGeoShareThreshold] = useState(0.45)
  const [referralThreshold, setReferralThreshold] = useState(72)
  const [minConfidence, setMinConfidence] = useState(0.75)
  const [authorityCap, setAuthorityCap] = useState(250000)
  const [sanctionsEnabled, setSanctionsEnabled] = useState(true)
  const [coverageGapEnabled, setCoverageGapEnabled] = useState(true)
  const [dualApprovalEnabled, setDualApprovalEnabled] = useState(true)
  const [rulesetVersion, setRulesetVersion] = useState('v3.4')

  const hits = useMemo<RuleHit[]>(() => ([
    {
      ruleId: 'R-101',
      name: t('underwriterfox.rulesPage.ruleNames.lossRatioThreshold'),
      outcome: lossRatioThreshold <= 0.65 ? 'warn' : lossRatioThreshold > 0.75 ? 'fail' : 'pass',
      severity: 'high'
    },
    {
      ruleId: 'R-204',
      name: t('underwriterfox.rulesPage.ruleNames.geoAggregationCheck'),
      outcome: geoShareThreshold <= 0.45 ? 'warn' : geoShareThreshold > 0.58 ? 'fail' : 'pass',
      severity: 'medium'
    },
    {
      ruleId: 'R-315',
      name: t('underwriterfox.rulesPage.ruleNames.sanctionsScreening'),
      outcome: sanctionsEnabled ? 'pass' : 'warn',
      severity: 'high'
    },
    {
      ruleId: 'R-408',
      name: t('underwriterfox.rulesPage.ruleNames.coverageGapReview'),
      outcome: coverageGapEnabled ? 'warn' : 'pass',
      severity: 'low'
    },
    {
      ruleId: 'R-512',
      name: t('underwriterfox.rulesPage.referralLabel'),
      outcome: referralThreshold < 70 ? 'warn' : referralThreshold > 82 ? 'fail' : 'pass',
      severity: 'medium'
    },
    {
      ruleId: 'R-690',
      name: t('underwriterfox.rulesPage.confidenceLabel'),
      outcome: minConfidence > 0.82 ? 'warn' : 'pass',
      severity: 'low'
    },
    {
      ruleId: 'R-740',
      name: t('underwriterfox.rulesPage.authorityCapLabel'),
      outcome: authorityCap < 175000 ? 'warn' : 'pass',
      severity: 'medium'
    },
    {
      ruleId: 'R-802',
      name: t('underwriterfox.rulesPage.dualApprovalLabel'),
      outcome: dualApprovalEnabled ? 'pass' : 'warn',
      severity: 'high'
    }
  ]), [
    authorityCap,
    coverageGapEnabled,
    dualApprovalEnabled,
    geoShareThreshold,
    lossRatioThreshold,
    minConfidence,
    referralThreshold,
    sanctionsEnabled,
    t
  ])

  async function handleSave() {
    await saveRuleEvaluation(ctx, 'ruleset', hits)
    setRulesetVersion((prev) => {
      const [major, minor] = prev.replace('v', '').split('.').map((part) => Number(part))
      return `v${major}.${Number.isFinite(minor) ? minor + 1 : 5}`
    })
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <UnderwriterfoxLayout title={t('underwriterfox.rulesPage.title')} subtitle={t('underwriterfox.rulesPage.subtitle')}>
        <RulesPanel hits={hits} onSaveVersion={handleSave} />
        <Card variant="glass" title={t('underwriterfox.rulesPage.adminTitle')} subtitle={t('underwriterfox.rulesPage.adminSubtitle')}>
          <div style={{ display: 'grid', gap: '0.9rem' }}>
            <label style={{ display: 'grid', gap: '0.4rem', color: '#475569', fontSize: '0.9rem' }}>
              {t('underwriterfox.rulesPage.lossRatioLabel')}: {decimalFormatter.format(lossRatioThreshold)}
              <input
                type="range"
                min={0.45}
                max={0.85}
                step={0.01}
                value={lossRatioThreshold}
                onChange={(event) => setLossRatioThreshold(Number(event.target.value))}
              />
            </label>
            <label style={{ display: 'grid', gap: '0.4rem', color: '#475569', fontSize: '0.9rem' }}>
              {t('underwriterfox.rulesPage.geoShareLabel')}: {decimalFormatter.format(geoShareThreshold)}
              <input
                type="range"
                min={0.25}
                max={0.75}
                step={0.01}
                value={geoShareThreshold}
                onChange={(event) => setGeoShareThreshold(Number(event.target.value))}
              />
            </label>
            <label style={{ display: 'grid', gap: '0.4rem', color: '#475569', fontSize: '0.9rem' }}>
              {t('underwriterfox.rulesPage.referralLabel')}: {integerFormatter.format(referralThreshold)}
              <input
                type="range"
                min={55}
                max={90}
                step={1}
                value={referralThreshold}
                onChange={(event) => setReferralThreshold(Number(event.target.value))}
              />
            </label>
            <label style={{ display: 'grid', gap: '0.4rem', color: '#475569', fontSize: '0.9rem' }}>
              {t('underwriterfox.rulesPage.confidenceLabel')}: {decimalFormatter.format(minConfidence)}
              <input
                type="range"
                min={0.55}
                max={0.95}
                step={0.01}
                value={minConfidence}
                onChange={(event) => setMinConfidence(Number(event.target.value))}
              />
            </label>
            <label style={{ display: 'grid', gap: '0.4rem', color: '#475569', fontSize: '0.9rem' }}>
              {t('underwriterfox.rulesPage.authorityCapLabel')}: {integerFormatter.format(authorityCap)}
              <input
                type="range"
                min={100000}
                max={500000}
                step={10000}
                value={authorityCap}
                onChange={(event) => setAuthorityCap(Number(event.target.value))}
              />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.9rem' }}>
              <input type="checkbox" checked={sanctionsEnabled} onChange={(event) => setSanctionsEnabled(event.target.checked)} />
              {t('underwriterfox.rulesPage.sanctionsLabel')}
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.9rem' }}>
              <input type="checkbox" checked={coverageGapEnabled} onChange={(event) => setCoverageGapEnabled(event.target.checked)} />
              {t('underwriterfox.rulesPage.coverageGapLabel')}
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.9rem' }}>
              <input type="checkbox" checked={dualApprovalEnabled} onChange={(event) => setDualApprovalEnabled(event.target.checked)} />
              {t('underwriterfox.rulesPage.dualApprovalLabel')}
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              <Button size="sm" onClick={handleSave}>{t('underwriterfox.rulesPage.saveAdmin')}</Button>
              <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                {t('underwriterfox.rulesPage.savedVersion')}: {rulesetVersion}
              </span>
            </div>
          </div>
        </Card>
      </UnderwriterfoxLayout>
    </section>
  )
}
