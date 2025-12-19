import React, { useMemo, useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { useI18n } from '@/i18n/I18nContext'
import BackgroundLogin from '@/assets/images/background_login.png'

type CostStatus = 'pending' | 'approved' | 'rejected'

type CostItem = {
  id: string
  labelKey: string
  amount: number
  status: CostStatus
  note: string
}

type PartnerOption = {
  id: string
  nameKey: string
  addressKey: string
  distance: string
  rating: string
}

type SurveyorOption = {
  id: string
  nameKey: string
  regionKey: string
  eta: string
}

const initialCosts: CostItem[] = [
  { id: 'c1', labelKey: 'bodywork', amount: 1800, status: 'pending', note: '' },
  { id: 'c2', labelKey: 'paint', amount: 520, status: 'approved', note: '' },
  { id: 'c3', labelKey: 'rental', amount: 240, status: 'pending', note: '' }
]

const partnerOptions: PartnerOption[] = [
  { id: 'p1', nameKey: 'partner1', addressKey: 'partner1Address', distance: '18 km', rating: '4.8' },
  { id: 'p2', nameKey: 'partner2', addressKey: 'partner2Address', distance: '32 km', rating: '4.5' },
  { id: 'p3', nameKey: 'partner3', addressKey: 'partner3Address', distance: '9 km', rating: '4.2' }
]

const surveyorOptions: SurveyorOption[] = [
  { id: 's1', nameKey: 'surveyor1', regionKey: 'surveyor1Region', eta: '2h' },
  { id: 's2', nameKey: 'surveyor2', regionKey: 'surveyor2Region', eta: '4h' },
  { id: 's3', nameKey: 'surveyor3', regionKey: 'surveyor3Region', eta: '6h' }
]

const mediaPlaceholders = ['media1', 'media2', 'media3', 'media4'] as const
const documentKeys = ['estimate', 'police', 'survey', 'invoice'] as const
const aiHintKeys = ['hint1', 'hint2', 'hint3', 'hint4', 'hint5'] as const
const timelineSteps = ['intake', 'review', 'approval', 'repair', 'closure'] as const
const KPI_KEYS = [
  'totalIncurred',
  'reserve',
  'approved',
  'openItems',
  'deductible',
  'coverage',
  'fraudRisk',
  'handlingTime'
] as const

const CARD_STYLE: React.CSSProperties = {
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: '22px',
  padding: '1.25rem',
  color: '#0e0d1c',
  backdropFilter: 'blur(12px)'
}

function Modal({
  open,
  onClose,
  children
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  if (!open) return null
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(8,0,32,0.65)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '20px',
          padding: '1.5rem',
          width: 'min(640px, 100%)',
          maxHeight: '80vh',
          overflowY: 'auto',
          color: '#0e0d1c'
        }}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default function ClaimManagerPage() {
  const { t } = useI18n()
  const [claimStatus, setClaimStatus] = useState<(typeof timelineSteps)[number]>('review')
  const [costItems, setCostItems] = useState<CostItem[]>(initialCosts)
  const [selectedPartner, setSelectedPartner] = useState<string>(partnerOptions[0].id)
  const [partnerModalOpen, setPartnerModalOpen] = useState(false)
  const [surveyorModalOpen, setSurveyorModalOpen] = useState(false)
  const [costModalOpen, setCostModalOpen] = useState(false)
  const [policyChecked, setPolicyChecked] = useState(false)
  const [selectedSurveyor, setSelectedSurveyor] = useState<string>(surveyorOptions[0].id)
  const [docPreview, setDocPreview] = useState<string | null>(null)
  const [mediaPreview, setMediaPreview] = useState<string | null>(null)

  const partner = partnerOptions.find((item) => item.id === selectedPartner) ?? partnerOptions[0]
  const surveyor = surveyorOptions.find((item) => item.id === selectedSurveyor) ?? surveyorOptions[0]

  const kpiData = useMemo(
    () =>
      KPI_KEYS.map((key) => ({
        key,
        value: t(`claimManager.app.kpiValues.${key}`)
      })),
    [t]
  )

  const detailValues = useMemo(
    () => ({
      type: t('claimManager.app.details.values.type'),
      location: t('claimManager.app.details.values.location'),
      vehicle: t('claimManager.app.details.values.vehicle'),
      summary: t('claimManager.app.details.values.summary')
    }),
    [t]
  )

  function handleCostChange(id: string, field: keyof CostItem, value: string) {
    setCostItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        if (field === 'amount') {
          return { ...item, amount: Number(value) || 0 }
        }
        if (field === 'status') {
          return { ...item, status: value as CostStatus }
        }
        return { ...item, note: value }
      })
    )
  }

  function handleConfirmCosts() {
    setCostItems((prev) =>
      prev.map((item) => (item.status === 'pending' ? { ...item, status: 'approved' } : item))
    )
    setPolicyChecked(false)
    setCostModalOpen(false)
  }

  function handlePartnerSelect(id: string) {
    setSelectedPartner(id)
  }

  function handleSurveyorSelect(id: string) {
    setSelectedSurveyor(id)
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -2,
          backgroundImage: `url(${BackgroundLogin})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          backgroundImage: 'linear-gradient(180deg, rgba(8,16,64,0.72), rgba(8,16,64,0.45))'
        }}
      />

      <section
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          width: '100%',
          padding: 'calc(var(--header-height) + 32px) 1rem 4rem',
          display: 'flex',
          justifyContent: 'center',
          color: '#ffffff'
        }}
      >
        <div style={{ width: '100%', maxWidth: 1200, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card
            style={{
              ...CARD_STYLE,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.25)'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <p style={{ margin: 0, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>
                  {t('claimManager.app.header.overline')}
                </p>
                <h1 style={{ margin: 0 }}>{t('claimManager.app.header.title')}</h1>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', color: 'rgba(255,255,255,0.85)' }}>
                  <span>
                    {t('claimManager.app.header.claimId')}: <strong>{t('claimManager.app.header.claimIdValue')}</strong>
                  </span>
                  <span>
                    {t('claimManager.app.header.date')}: <strong>{t('claimManager.app.header.dateValue')}</strong>
                  </span>
                  <span>
                    {t('claimManager.app.header.status')}: <strong>{t(`claimManager.app.statusOptions.${claimStatus}`)}</strong>
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Button onClick={() => setCostModalOpen(true)}>{t('claimManager.app.actions.approveCosts')}</Button>
                <Button variant="secondary" onClick={() => setSurveyorModalOpen(true)}>
                  {t('claimManager.app.actions.assignSurveyor')}
                </Button>
                <Button variant="secondary" onClick={() => setPartnerModalOpen(true)}>
                  {t('claimManager.app.actions.changePartner')}
                </Button>
              </div>
            </div>
          </Card>

          <Card style={{ ...CARD_STYLE, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '0.75rem' }}>
            {kpiData.map((kpi) => (
              <div
                key={kpi.key}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '16px',
                  padding: '0.85rem'
                }}
              >
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem' }}>{t(`claimManager.app.kpis.${kpi.key}`)}</p>
                <strong style={{ fontSize: '1.4rem' }}>{kpi.value}</strong>
              </div>
            ))}
          </Card>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 7fr) minmax(0, 5fr)',
              gap: '1.25rem'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Card style={CARD_STYLE}>
                <h2 style={{ marginTop: 0 }}>{t('claimManager.app.details.title')}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '0.75rem' }}>
                  <div>
                    <p style={{ margin: '0 0 0.25rem', color: 'rgba(255,255,255,0.75)' }}>{t('claimManager.app.details.type')}</p>
                    <p style={{ margin: 0 }}>{detailValues.type}</p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 0.25rem', color: 'rgba(255,255,255,0.75)' }}>{t('claimManager.app.details.location')}</p>
                    <p style={{ margin: 0 }}>{detailValues.location}</p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 0.25rem', color: 'rgba(255,255,255,0.75)' }}>{t('claimManager.app.details.vehicle')}</p>
                    <p style={{ margin: 0 }}>{detailValues.vehicle}</p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 0.25rem', color: 'rgba(255,255,255,0.75)' }}>{t('claimManager.app.details.summary')}</p>
                    <p style={{ margin: 0 }}>{detailValues.summary}</p>
                  </div>
                </div>
              </Card>

              <Card style={CARD_STYLE}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h2 style={{ margin: 0 }}>{t('claimManager.app.timeline.title')}</h2>
                  <select
                    value={claimStatus}
                    onChange={(event) => setClaimStatus(event.target.value as (typeof timelineSteps)[number])}
                    style={{ padding: '0.45rem 0.75rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.3)' }}
                  >
                    {timelineSteps.map((step) => (
                      <option key={step} value={step}>
                        {t(`claimManager.app.statusOptions.${step}`)}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  {timelineSteps.map((step, index) => {
                    const isActive = timelineSteps.indexOf(claimStatus) >= index
                    return (
                      <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: isActive ? '#D3F261' : 'rgba(255,255,255,0.5)' }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            border: '2px solid',
                            borderColor: isActive ? '#D3F261' : 'rgba(255,255,255,0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700
                          }}
                        >
                          {index + 1}
                        </div>
                        <span>{t(`claimManager.app.timeline.steps.${step}`)}</span>
                        {index < timelineSteps.length - 1 && <span style={{ opacity: 0.4 }}>—</span>}
                      </div>
                    )
                  })}
                </div>
              </Card>

              <Card style={CARD_STYLE}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h2 style={{ margin: 0 }}>{t('claimManager.app.costs.title')}</h2>
                  <Button variant="secondary" onClick={() => setCostModalOpen(true)}>
                    {t('claimManager.app.costs.confirm')}
                  </Button>
                </div>
                <div style={{ marginTop: '0.75rem', overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '520px', color: '#ffffff' }}>
                    <thead>
                      <tr style={{ textAlign: 'left', color: 'rgba(255,255,255,0.75)' }}>
                        <th>{t('claimManager.app.costs.table.position')}</th>
                        <th>{t('claimManager.app.costs.table.amount')}</th>
                        <th>{t('claimManager.app.costs.table.status')}</th>
                        <th>{t('claimManager.app.costs.table.note')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {costItems.map((item) => (
                        <tr key={item.id}>
                          <td style={{ padding: '0.4rem 0.2rem' }}>{t(`claimManager.app.costs.items.${item.labelKey}`)}</td>
                          <td style={{ padding: '0.4rem 0.2rem' }}>
                            <input
                              type="number"
                              value={item.amount}
                              onChange={(event) => handleCostChange(item.id, 'amount', event.target.value)}
                              style={{ width: '100%', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', padding: '0.3rem 0.4rem' }}
                            />
                          </td>
                          <td style={{ padding: '0.4rem 0.2rem' }}>
                            <select
                              value={item.status}
                              onChange={(event) => handleCostChange(item.id, 'status', event.target.value)}
                              style={{ width: '100%', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', padding: '0.3rem 0.4rem' }}
                            >
                              <option value="pending">{t('claimManager.app.costs.status.pending')}</option>
                              <option value="approved">{t('claimManager.app.costs.status.approved')}</option>
                              <option value="rejected">{t('claimManager.app.costs.status.rejected')}</option>
                            </select>
                          </td>
                          <td style={{ padding: '0.4rem 0.2rem' }}>
                            <input
                              type="text"
                              value={item.note}
                              placeholder={t('claimManager.app.costs.notePlaceholder')}
                              onChange={(event) => handleCostChange(item.id, 'note', event.target.value)}
                              style={{ width: '100%', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', padding: '0.3rem 0.4rem' }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Card style={CARD_STYLE}>
                <h2 style={{ marginTop: 0 }}>{t('claimManager.app.coverage.title')}</h2>
                <p style={{ margin: '0 0 0.4rem' }}>
                  {t('claimManager.app.coverage.policyNumber')}: <strong>{t('claimManager.app.coverage.policyValue')}</strong>
                </p>
                <p style={{ margin: '0 0 0.4rem' }}>
                  {t('claimManager.app.coverage.term')}: {t('claimManager.app.coverage.termValue')}
                </p>
                <p style={{ margin: '0 0 0.4rem' }}>{t('claimManager.app.coverage.limit')}: {t('claimManager.app.coverage.limitValue')}</p>
                <p style={{ margin: '0 0 0.4rem' }}>
                  {t('claimManager.app.coverage.exclusion')}: {t('claimManager.app.coverage.exclusionValue')}
                </p>
                <div
                  style={{
                    padding: '0.45rem 0.75rem',
                    borderRadius: '999px',
                    background: '#16A34A',
                    display: 'inline-flex',
                    fontWeight: 700,
                    marginTop: '0.75rem'
                  }}
                >
                  {t('claimManager.app.coverage.covered')}
                </div>
                <p style={{ marginTop: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>
                  {t('claimManager.app.coverage.note')}
                </p>
              </Card>

              <Card style={CARD_STYLE}>
                <h2 style={{ marginTop: 0 }}>{t('claimManager.app.partner.title')}</h2>
                <p style={{ margin: '0 0 0.4rem' }}>
                  <strong>{t(`claimManager.app.partner.options.${partner.nameKey}.name`)}</strong>
                </p>
                <p style={{ margin: '0 0 0.4rem', color: 'rgba(255,255,255,0.75)' }}>
                  {t(`claimManager.app.partner.options.${partner.addressKey}`)}
                </p>
                <div style={{ display: 'flex', gap: '1rem', color: 'rgba(255,255,255,0.8)' }}>
                  <span>{partner.distance}</span>
                  <span>★ {partner.rating}</span>
                </div>
                <Button variant="secondary" style={{ marginTop: '0.75rem' }} onClick={() => setPartnerModalOpen(true)}>
                  {t('claimManager.app.partner.changeButton')}
                </Button>
              </Card>

              <Card style={CARD_STYLE}>
                <h2 style={{ marginTop: 0 }}>{t('claimManager.app.ai.title')}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {aiHintKeys.map((key) => (
                    <div
                      key={key}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '14px',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.18)'
                      }}
                    >
                      {t(`claimManager.app.ai.items.${key}`)}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          <Card style={{ ...CARD_STYLE, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1rem' }}>
            <div>
              <h2 style={{ marginTop: 0 }}>{t('claimManager.app.documents.title')}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {documentKeys.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setDocPreview(key)}
                    style={{
                      textAlign: 'left',
                      padding: '0.6rem 0.85rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.25)',
                      background: 'rgba(255,255,255,0.08)',
                      color: '#ffffff'
                    }}
                  >
                    {t(`claimManager.app.documents.list.${key}`)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h2 style={{ marginTop: 0 }}>{t('claimManager.app.documents.media')}</h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
                  gap: '0.6rem'
                }}
              >
                {mediaPlaceholders.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setMediaPreview(key)}
                    style={{
                      borderRadius: '16px',
                      border: 'none',
                      padding: 0,
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}
                  >
                    <div
                      style={{
                        height: '120px',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.45), rgba(255,255,255,0.08))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0e0d1c',
                        fontWeight: 700
                      }}
                    >
                      {t(`claimManager.app.documents.mediaLabel`)} {key.slice(-1)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Modal open={costModalOpen} onClose={() => setCostModalOpen(false)}>
        <h3 style={{ marginTop: 0 }}>{t('claimManager.app.costs.modal.title')}</h3>
        <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={policyChecked}
            onChange={(event) => setPolicyChecked(event.target.checked)}
          />
          {t('claimManager.app.costs.modal.checkbox')}
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <Button onClick={handleConfirmCosts} disabled={!policyChecked}>
            {t('claimManager.app.costs.modal.confirm')}
          </Button>
          <Button variant="secondary" onClick={() => setCostModalOpen(false)}>
            {t('claimManager.app.costs.modal.cancel')}
          </Button>
        </div>
      </Modal>

      <Modal open={partnerModalOpen} onClose={() => setPartnerModalOpen(false)}>
        <h3 style={{ marginTop: 0 }}>{t('claimManager.app.partner.modalTitle')}</h3>
        <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
          {partnerOptions.map((option) => (
            <label
              key={option.id}
              style={{
                border: '1px solid rgba(8,0,40,0.15)',
                borderRadius: '14px',
                padding: '0.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '0.5rem'
              }}
            >
              <div>
                <strong>{t(`claimManager.app.partner.options.${option.nameKey}.name`)}</strong>
                <p style={{ margin: '0.15rem 0 0', color: '#444' }}>{t(`claimManager.app.partner.options.${option.addressKey}`)}</p>
                <p style={{ margin: 0, color: '#666' }}>
                  {option.distance} • ★ {option.rating}
                </p>
              </div>
              <input
                type="radio"
                name="claim-partner"
                checked={selectedPartner === option.id}
                onChange={() => handlePartnerSelect(option.id)}
              />
            </label>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <Button onClick={() => setPartnerModalOpen(false)}>{t('claimManager.app.partner.confirm')}</Button>
          <Button variant="secondary" onClick={() => setPartnerModalOpen(false)}>
            {t('claimManager.app.costs.modal.cancel')}
          </Button>
        </div>
      </Modal>

      <Modal open={surveyorModalOpen} onClose={() => setSurveyorModalOpen(false)}>
        <h3 style={{ marginTop: 0 }}>{t('claimManager.app.surveyor.title')}</h3>
        <p style={{ margin: '0 0 0.75rem', color: '#555' }}>{t('claimManager.app.surveyor.mapTitle')}</p>
        <div
          style={{
            height: '140px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(8,0,64,0.1), rgba(212,56,13,0.15))',
            marginBottom: '1rem'
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {surveyorOptions.map((option) => (
            <label
              key={option.id}
              style={{
                border: '1px solid rgba(8,0,40,0.15)',
                borderRadius: '14px',
                padding: '0.6rem',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '0.5rem'
              }}
            >
              <div>
                <strong>{t(`claimManager.app.surveyor.options.${option.nameKey}`)}</strong>
                <p style={{ margin: '0.2rem 0 0', color: '#555' }}>{t(`claimManager.app.surveyor.options.${option.regionKey}`)}</p>
                <p style={{ margin: 0, color: '#777' }}>{option.eta}</p>
              </div>
              <input
                type="radio"
                name="surveyor"
                checked={selectedSurveyor === option.id}
                onChange={() => handleSurveyorSelect(option.id)}
              />
            </label>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <Button onClick={() => setSurveyorModalOpen(false)}>{t('claimManager.app.surveyor.confirm')}</Button>
          <Button variant="secondary" onClick={() => setSurveyorModalOpen(false)}>
            {t('claimManager.app.costs.modal.cancel')}
          </Button>
        </div>
      </Modal>

      <Modal open={Boolean(docPreview)} onClose={() => setDocPreview(null)}>
        <h3 style={{ marginTop: 0 }}>{t('claimManager.app.documents.previewTitle')}</h3>
        <p>{docPreview ? t(`claimManager.app.documents.list.${docPreview}`) : ''}</p>
        <Button variant="secondary" onClick={() => setDocPreview(null)}>
          {t('claimManager.app.documents.close')}
        </Button>
      </Modal>

      <Modal open={Boolean(mediaPreview)} onClose={() => setMediaPreview(null)}>
        <h3 style={{ marginTop: 0 }}>{t('claimManager.app.documents.previewTitle')}</h3>
        <div
          style={{
            width: '100%',
            height: '260px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(8,0,64,0.1), rgba(212,56,13,0.2))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1rem'
          }}
        >
          {mediaPreview ? `${t('claimManager.app.documents.mediaLabel')} ${mediaPreview.slice(-1)}` : ''}
        </div>
        <Button variant="secondary" style={{ marginTop: '1rem' }} onClick={() => setMediaPreview(null)}>
          {t('claimManager.app.documents.close')}
        </Button>
      </Modal>
    </div>
  )
}
