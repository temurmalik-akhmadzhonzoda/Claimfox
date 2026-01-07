import React, { useState } from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

const inputStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: '10px',
  border: '1px solid #d9d9d9',
  padding: '0.65rem 0.85rem',
  background: '#ffffff',
  color: '#0e0d1c'
}

const labelStyle: React.CSSProperties = {
  color: '#65748b',
  fontSize: '0.85rem'
}

const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
  border: '1px solid #ececec'
}

export default function GetQuotePage() {
  const { t } = useI18n()
  const [courierLiability, setCourierLiability] = useState<'yes' | 'no'>('yes')
  const [coldGoodsLiability, setColdGoodsLiability] = useState<'yes' | 'no'>('no')
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  return (
    <section
      className="page"
      style={{
        gap: '1.75rem',
        background: '#f7f7f8',
        minHeight: 'calc(100vh - var(--header-height))',
        padding: '2.5rem 24px 3rem'
      }}
    >
      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <Header
          title={t('getQuote.title')}
          subtitle={t('getQuote.subtitle')}
          titleColor="#0e0d1c"
          subtitleColor="#65748b"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 0.7fr)',
            gap: '1.25rem'
          }}
        >
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <Card style={cardStyle} title={t('getQuote.progress.title')} subtitle={t('getQuote.progress.subtitle')}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '999px',
                  background: '#fef1ec',
                  color: '#d4380d',
                  fontWeight: 600
                }}
              >
                {t('getQuote.progress.step')}
              </div>
            </Card>

            <Card style={cardStyle} title={t('getQuote.company.title')} subtitle={t('getQuote.company.subtitle')}>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <label style={labelStyle}>{t('getQuote.company.locationLabel')}</label>
                <select style={inputStyle} defaultValue="">
                  <option value="" disabled>
                    {t('getQuote.company.locationPlaceholder')}
                  </option>
                  <option value="de">{t('getQuote.company.location.de')}</option>
                  <option value="eu">{t('getQuote.company.location.eu')}</option>
                </select>
              </div>
            </Card>

            <Card style={cardStyle} title={t('getQuote.vehicles.title')} subtitle={t('getQuote.vehicles.subtitle')}>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <strong style={{ color: '#0e0d1c' }}>{t('getQuote.vehicles.primary')}</strong>
                  <label style={labelStyle}>{t('getQuote.vehicles.count')}</label>
                  <input style={inputStyle} type="number" placeholder="4" />
                  <label style={labelStyle}>{t('getQuote.vehicles.weight')}</label>
                  <input style={inputStyle} placeholder="7,5t" />
                  <label style={labelStyle}>{t('getQuote.vehicles.regionLabel')}</label>
                  <select style={inputStyle} defaultValue="de">
                    <option value="de">{t('getQuote.vehicles.region.de')}</option>
                    <option value="eu">{t('getQuote.vehicles.region.eu')}</option>
                  </select>
                </div>

                <div style={{ height: 1, background: '#ececec' }} />

                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <strong style={{ color: '#0e0d1c' }}>{t('getQuote.vehicles.additional')}</strong>
                  <label style={labelStyle}>{t('getQuote.vehicles.count')}</label>
                  <input style={inputStyle} type="number" placeholder="6" />
                  <label style={labelStyle}>{t('getQuote.vehicles.weight')}</label>
                  <input style={inputStyle} placeholder="30t" />
                  <label style={labelStyle}>{t('getQuote.vehicles.regionLabel')}</label>
                  <select style={inputStyle} defaultValue="eu">
                    <option value="de">{t('getQuote.vehicles.region.de')}</option>
                    <option value="eu">{t('getQuote.vehicles.region.eu')}</option>
                  </select>
                </div>

                <Button variant="secondary" style={{ justifySelf: 'start' }}>
                  {t('getQuote.vehicles.add')}
                </Button>
              </div>
            </Card>

            <Card style={cardStyle} title={t('getQuote.deductible.title')} subtitle={t('getQuote.deductible.subtitle')}>
              <div style={{ display: 'grid', gap: '0.85rem' }}>
                <label style={labelStyle}>{t('getQuote.deductible.amountLabel')}</label>
                <input style={inputStyle} placeholder="750 EUR" />

                <div style={{ display: 'grid', gap: '0.6rem' }}>
                  <span style={labelStyle}>{t('getQuote.deductible.courier')}</span>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0e0d1c' }}>
                      <input
                        type="radio"
                        name="courier"
                        checked={courierLiability === 'yes'}
                        onChange={() => setCourierLiability('yes')}
                      />
                      {t('getQuote.yes')}
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0e0d1c' }}>
                      <input
                        type="radio"
                        name="courier"
                        checked={courierLiability === 'no'}
                        onChange={() => setCourierLiability('no')}
                      />
                      {t('getQuote.no')}
                    </label>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '0.6rem' }}>
                  <span style={labelStyle}>{t('getQuote.deductible.cold')}</span>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0e0d1c' }}>
                      <input
                        type="radio"
                        name="cold"
                        checked={coldGoodsLiability === 'yes'}
                        onChange={() => setColdGoodsLiability('yes')}
                      />
                      {t('getQuote.yes')}
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0e0d1c' }}>
                      <input
                        type="radio"
                        name="cold"
                        checked={coldGoodsLiability === 'no'}
                        onChange={() => setColdGoodsLiability('no')}
                      />
                      {t('getQuote.no')}
                    </label>
                  </div>
                </div>
              </div>
            </Card>

            <Card style={cardStyle} title={t('getQuote.preInsurer.title')} subtitle={t('getQuote.preInsurer.subtitle')}>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <label style={labelStyle}>{t('getQuote.preInsurer.exists')}</label>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0e0d1c' }}>
                    <input type="radio" name="prior" defaultChecked />
                    {t('getQuote.yes')}
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0e0d1c' }}>
                    <input type="radio" name="prior" />
                    {t('getQuote.no')}
                  </label>
                </div>
                <label style={labelStyle}>{t('getQuote.preInsurer.name')}</label>
                <input style={inputStyle} placeholder="Helvetia" />
                <label style={labelStyle}>{t('getQuote.preInsurer.number')}</label>
                <input style={inputStyle} placeholder="000.061.9019085" />
              </div>
            </Card>
          </div>

          <div style={{ display: 'grid', gap: '1.25rem', alignSelf: 'start' }}>
            <Card style={cardStyle} title={t('getQuote.summary.title')} subtitle={t('getQuote.summary.subtitle')}>
              <div style={{ display: 'grid', gap: '0.6rem', color: '#0e0d1c' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t('getQuote.summary.netAnnual')}</span>
                  <strong>xxx,xx €</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t('getQuote.summary.tax')}</span>
                  <strong>xx,xx €</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t('getQuote.summary.grossAnnual')}</span>
                  <strong>xxx,xx €</strong>
                </div>
                <div style={{ height: 1, background: '#ececec' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t('getQuote.summary.contract')}</span>
                  <strong>xx.xx.20xx - xx.xx.20xx</strong>
                </div>
              </div>
            </Card>

            <Card style={cardStyle} title={t('getQuote.confirm.title')} subtitle={t('getQuote.confirm.subtitle')}>
              <label style={{ display: 'flex', gap: '0.6rem', color: '#0e0d1c', fontSize: '0.95rem' }}>
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(event) => setPrivacyAccepted(event.target.checked)}
                />
                {t('getQuote.confirm.privacy')}
              </label>
              <Button
                style={{
                  width: '100%',
                  marginTop: '1rem',
                  background: '#d4380d',
                  borderColor: '#d4380d',
                  color: '#ffffff'
                }}
              >
                {t('getQuote.confirm.submit')}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
