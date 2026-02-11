import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import AifoxLayout from '@/aifox/components/AifoxLayout'
import { useI18n } from '@/i18n/I18nContext'

export default function AifoxMonitoringPage() {
  const { t } = useI18n()

  return (
    <AifoxLayout title={t('aifox.monitoring.title')} subtitle={t('aifox.monitoring.subtitle')}>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          <Card title={t('aifox.monitoring.accuracyTitle')} subtitle={t('aifox.monitoring.accuracySubtitle')}>
            <div style={{ height: 160, borderRadius: 12, background: 'linear-gradient(135deg, #e2e8f0, #fff)', display: 'grid', placeItems: 'center', color: '#64748b' }}>
              {t('aifox.monitoring.accuracyChart')}
            </div>
          </Card>
          <Card title={t('aifox.monitoring.driftTitle')} subtitle={t('aifox.monitoring.driftSubtitle')}>
            <div style={{ height: 160, borderRadius: 12, background: 'linear-gradient(135deg, #ffe4e6, #fff)', display: 'grid', placeItems: 'center', color: '#b91c1c' }}>
              {t('aifox.monitoring.driftAlert')}
            </div>
          </Card>
          <Card title={t('aifox.monitoring.biasTitle')} subtitle={t('aifox.monitoring.biasSubtitle')}>
            <div style={{ height: 160, borderRadius: 12, background: 'linear-gradient(135deg, #eff6ff, #fff)', display: 'grid', placeItems: 'center', color: '#64748b' }}>
              {t('aifox.monitoring.biasChart')}
            </div>
          </Card>
        </div>
        <Card title={t('aifox.monitoring.alertTitle')} subtitle={t('aifox.monitoring.alertSubtitle')}>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <div style={{ color: '#b91c1c', fontWeight: 600 }}>{t('aifox.monitoring.alertMessage')}</div>
            <div style={{ color: '#64748b' }}>{t('aifox.monitoring.retrainHint')}</div>
            <Button size="sm">{t('aifox.monitoring.retrain')}</Button>
          </div>
        </Card>
      </div>
    </AifoxLayout>
  )
}
