import React from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import { logisticsRecords } from '@/pages/LogisticsDashboardPage'

type RecordDetail = {
  id: string
  cargoType: string
  weight: string
  value: string
  incoterms: string
  lastUpdate: string
  riskSignal: string
  documents: { label: string; status: string }[]
  milestones: { label: string; status: string }[]
  contacts: { label: string; value: string }[]
}

const recordDetails: Record<string, RecordDetail> = {
  'lf-10421': {
    id: 'lf-10421',
    cargoType: 'Electronics',
    weight: '18t',
    value: 'EUR 120k',
    incoterms: 'DAP',
    lastUpdate: '2026-02-01 16:40',
    riskSignal: 'Low',
    documents: [
      { label: 'Bill of lading', status: 'Uploaded' },
      { label: 'Invoice', status: 'Uploaded' },
      { label: 'Customs', status: 'Pending' }
    ],
    milestones: [
      { label: 'Pickup', status: 'Completed' },
      { label: 'Border', status: 'Scheduled' },
      { label: 'Delivery', status: 'Planned' }
    ],
    contacts: [
      { label: 'Carrier ops', value: 'ops@atlas-logistics.eu' },
      { label: 'Cargo owner', value: 'supply@nordstadt.eu' },
      { label: 'Broker lead', value: 'anna.klein@claimfox.app' }
    ]
  }
}

function getDetail(recordId: string): RecordDetail {
  return recordDetails[recordId] || {
    id: recordId,
    cargoType: 'General cargo',
    weight: '12t',
    value: 'EUR 80k',
    incoterms: 'FCA',
    lastUpdate: '2026-02-01 12:10',
    riskSignal: 'Medium',
    documents: [
      { label: 'Bill of lading', status: 'Uploaded' },
      { label: 'Invoice', status: 'Uploaded' },
      { label: 'Customs', status: 'Uploaded' }
    ],
    milestones: [
      { label: 'Pickup', status: 'Completed' },
      { label: 'Transit', status: 'Active' },
      { label: 'Delivery', status: 'Planned' }
    ],
    contacts: [
      { label: 'Carrier ops', value: 'ops@claimfox.app' },
      { label: 'Cargo owner', value: 'logistics@claimfox.app' },
      { label: 'Broker lead', value: 'broker@claimfox.app' }
    ]
  }
}

export default function LogisticsRecordPage() {
  const { lang } = useI18n()
  const navigate = useNavigate()
  const { recordId } = useParams<{ recordId: string }>()

  const record = logisticsRecords.find((item) => item.id === recordId)
  if (!record) return <Navigate to="/logistics-dashboard" replace />

  const detail = getDetail(record.id)

  const GLASS_TEXT = '#0e0d1c'
  const GLASS_SUBTLE = '#64748b'

  const copy = lang === 'en'
    ? {
        title: 'Shipment record',
        subtitle: 'Logistics view for cargo execution and SLA tracking.',
        back: 'Back to dashboard',
        overviewTitle: 'Shipment overview',
        cargoTitle: 'Cargo details',
        milestonesTitle: 'Milestones',
        documentsTitle: 'Documents',
        contactsTitle: 'Contacts',
        overviewItems: [
          { label: 'Reference', value: record.reference },
          { label: 'Lane', value: record.lane },
          { label: 'Status', value: record.status },
          { label: 'ETA', value: record.eta },
          { label: 'SLA', value: record.sla },
          { label: 'Carrier', value: record.carrier }
        ],
        cargoItems: [
          { label: 'Cargo type', value: detail.cargoType },
          { label: 'Weight', value: detail.weight },
          { label: 'Value', value: detail.value },
          { label: 'Incoterms', value: detail.incoterms },
          { label: 'Risk signal', value: detail.riskSignal },
          { label: 'Last update', value: detail.lastUpdate }
        ]
      }
    : {
        title: 'Sendungsdatensatz',
        subtitle: 'Logistikansicht fuer Cargo-Ausfuehrung und SLA-Tracking.',
        back: 'Zurueck zum Dashboard',
        overviewTitle: 'Sendungsuebersicht',
        cargoTitle: 'Cargo-Details',
        milestonesTitle: 'Meilensteine',
        documentsTitle: 'Dokumente',
        contactsTitle: 'Kontakte',
        overviewItems: [
          { label: 'Referenz', value: record.reference },
          { label: 'Route', value: record.lane },
          { label: 'Status', value: record.status },
          { label: 'ETA', value: record.eta },
          { label: 'SLA', value: record.sla },
          { label: 'Carrier', value: record.carrier }
        ],
        cargoItems: [
          { label: 'Cargo-Typ', value: detail.cargoType },
          { label: 'Gewicht', value: detail.weight },
          { label: 'Wert', value: detail.value },
          { label: 'Incoterms', value: detail.incoterms },
          { label: 'Risiko-Signal', value: detail.riskSignal },
          { label: 'Letztes Update', value: detail.lastUpdate }
        ]
      }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        <Header title={copy.title} subtitle={copy.subtitle} subtitleColor={GLASS_SUBTLE} titleColor="#D4380D" />

        <div>
          <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/logistics-dashboard')}>
            {copy.back}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <Card title={copy.overviewTitle} variant="glass">
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              {copy.overviewItems.map((item) => (
                <div key={item.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 220px) minmax(0, 1fr)', gap: '1.25rem', alignItems: 'center' }}>
                  <span style={{ color: GLASS_SUBTLE }}>{item.label}</span>
                  <strong style={{ color: GLASS_TEXT }}>{item.value}</strong>
                </div>
              ))}
            </div>
          </Card>
          <Card title={copy.cargoTitle} variant="glass">
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              {copy.cargoItems.map((item) => (
                <div key={item.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 220px) minmax(0, 1fr)', gap: '1.25rem', alignItems: 'center' }}>
                  <span style={{ color: GLASS_SUBTLE }}>{item.label}</span>
                  <strong style={{ color: GLASS_TEXT }}>{item.value}</strong>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <Card title={copy.milestonesTitle} variant="glass">
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              {detail.milestones.map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <span style={{ color: GLASS_SUBTLE }}>{item.label}</span>
                  <strong style={{ color: GLASS_TEXT }}>{item.status}</strong>
                </div>
              ))}
            </div>
          </Card>
          <Card title={copy.documentsTitle} variant="glass">
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              {detail.documents.map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <span style={{ color: GLASS_SUBTLE }}>{item.label}</span>
                  <strong style={{ color: GLASS_TEXT }}>{item.status}</strong>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card title={copy.contactsTitle} variant="glass">
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {detail.contacts.map((item) => (
              <div key={item.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 220px) minmax(0, 1fr)', gap: '1.25rem', alignItems: 'center' }}>
                <span style={{ color: GLASS_SUBTLE }}>{item.label}</span>
                <strong style={{ color: GLASS_TEXT }}>{item.value}</strong>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
