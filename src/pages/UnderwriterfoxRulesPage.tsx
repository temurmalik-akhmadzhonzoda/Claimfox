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
  const { t } = useI18n()
  const tenant = useTenantContext()
  const ctx = { tenantId: tenant.tenantId, userId: tenant.userId }
  const [lossRatioThreshold, setLossRatioThreshold] = useState(0.65)
  const [geoShareThreshold, setGeoShareThreshold] = useState(0.45)
  const [sanctionsEnabled, setSanctionsEnabled] = useState(true)
  const [coverageGapEnabled, setCoverageGapEnabled] = useState(true)
  const [rulesetVersion, setRulesetVersion] = useState('v3.4')

  const hits = useMemo<RuleHit[]>(() => ([
    {
      ruleId: 'R-101',
      name: t('underwriterfox.rulesPage.ruleNames.lossRatioThreshold'),
      outcome: lossRatioThreshold <= 0.65 ? 'warn' : 'pass',
      severity: 'high'
    },
    {
      ruleId: 'R-204',
      name: t('underwriterfox.rulesPage.ruleNames.geoAggregationCheck'),
      outcome: geoShareThreshold <= 0.45 ? 'warn' : 'pass',
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
    }
  ]), [coverageGapEnabled, geoShareThreshold, lossRatioThreshold, sanctionsEnabled, t])

  const editorText = useMemo(() => `// Ruleset ${rulesetVersion}
rule LossRatioThreshold {
  if (lossRatio > ${lossRatioThreshold.toFixed(2)}) then WARN
}

rule GeoAggregationCheck {
  if (topRegionShare > ${geoShareThreshold.toFixed(2)}) then WARN
}

rule SanctionsScreening {
  if (sanctionsHit == true && ${sanctionsEnabled}) then FAIL
}

rule CoverageGapReview {
  if (coverageGapDetected == true && ${coverageGapEnabled}) then WARN
}`, [coverageGapEnabled, geoShareThreshold, lossRatioThreshold, rulesetVersion, sanctionsEnabled])

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
              {t('underwriterfox.rulesPage.lossRatioLabel')}: {lossRatioThreshold.toFixed(2)}
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
              {t('underwriterfox.rulesPage.geoShareLabel')}: {geoShareThreshold.toFixed(2)}
              <input
                type="range"
                min={0.25}
                max={0.75}
                step={0.01}
                value={geoShareThreshold}
                onChange={(event) => setGeoShareThreshold(Number(event.target.value))}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              <Button size="sm" onClick={handleSave}>{t('underwriterfox.rulesPage.saveAdmin')}</Button>
              <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                {t('underwriterfox.rulesPage.savedVersion')}: {rulesetVersion}
              </span>
            </div>
          </div>
        </Card>
        <Card variant="glass" title={t('underwriterfox.rulesPage.editorTitle')} subtitle={t('underwriterfox.rulesPage.editorSubtitle')}>
          <pre style={{ margin: 0, background: '#0f172a', color: '#e2e8f0', padding: '1rem', borderRadius: 12, fontSize: '0.85rem', overflowX: 'auto' }}>
            {editorText}
          </pre>
        </Card>
      </UnderwriterfoxLayout>
    </section>
  )
}
