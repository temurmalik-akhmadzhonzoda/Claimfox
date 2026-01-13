import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

export default function ProfileInsurancesPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const policies = [
    {
      id: '000.061.9019085.0-Z1150.6145',
      product: 'Frachtführerhaftungsversicherung',
      status: 'aktiv',
      validFrom: '05.11.2024',
      insurer: 'Helvetia',
      vehicles: 3,
      deductible: '300 €',
      coverage: 'Deutschland & Europa',
      annualNet: '98,76 €',
      annualTax: '14,44 €',
      annualGross: '113,20 €'
    },
    {
      id: '000.061.9019086.0-Z1150.6145',
      product: 'Flottenversicherung',
      status: 'aktiv',
      validFrom: '08.11.2024',
      insurer: 'Helvetia',
      vehicles: 2,
      deductible: '500 €',
      coverage: 'Europa',
      annualNet: '214,30 €',
      annualTax: '40,72 €',
      annualGross: '255,02 €'
    },
    {
      id: '000.061.9019087.0-Z1150.6145',
      product: 'Transport- & Warenversicherung',
      status: 'inaktiv',
      validFrom: '05.03.2026',
      insurer: 'Helvetia',
      vehicles: 4,
      deductible: '750 €',
      coverage: 'Europa',
      annualNet: '162,40 €',
      annualTax: '30,86 €',
      annualGross: '193,26 €'
    }
  ]

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 980, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Header title={t('profile.overview.sections.insurances')} subtitle={t('profile.placeholders.insurances')} subtitleColor="#65748b" />
        <div style={{ display: 'grid', gap: '1rem' }}>
          {policies.map((policy) => (
            <Card key={policy.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div>
                  <strong style={{ color: '#0f172a', fontSize: '1.05rem' }}>{policy.product}</strong>
                  <p style={{ margin: '0.35rem 0 0', color: '#64748b' }}>{policy.id}</p>
                </div>
                <span
                  style={{
                    padding: '0.3rem 0.9rem',
                    borderRadius: '999px',
                    border: '1px solid #e2e8f0',
                    background: policy.status === 'aktiv' ? '#e8f5e9' : '#f1f5f9',
                    color: policy.status === 'aktiv' ? '#2f7d32' : '#64748b',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}
                >
                  {policy.status}
                </span>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '0.75rem',
                  marginTop: '1rem'
                }}
              >
                <div style={{ display: 'grid', gap: '0.2rem' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>Versicherer</span>
                  <strong>{policy.insurer}</strong>
                </div>
                <div style={{ display: 'grid', gap: '0.2rem' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>Gültig ab</span>
                  <strong>{policy.validFrom}</strong>
                </div>
                <div style={{ display: 'grid', gap: '0.2rem' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>Fahrzeuge</span>
                  <strong>{policy.vehicles}</strong>
                </div>
                <div style={{ display: 'grid', gap: '0.2rem' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>Selbstbehalt</span>
                  <strong>{policy.deductible}</strong>
                </div>
                <div style={{ display: 'grid', gap: '0.2rem' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>Geltungsbereich</span>
                  <strong>{policy.coverage}</strong>
                </div>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '0.75rem',
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid #e2e8f0'
                }}
              >
                <div style={{ display: 'grid', gap: '0.2rem' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>Jahresnettoprämie</span>
                  <strong>{policy.annualNet}</strong>
                </div>
                <div style={{ display: 'grid', gap: '0.2rem' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>Versicherungssteuer</span>
                  <strong>{policy.annualTax}</strong>
                </div>
                <div style={{ display: 'grid', gap: '0.2rem' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>Jahresbruttoprämie</span>
                  <strong>{policy.annualGross}</strong>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <Button onClick={() => navigate('/profile')}>{t('profile.overview.back')}</Button>
        </div>
      </div>
    </section>
  )
}
