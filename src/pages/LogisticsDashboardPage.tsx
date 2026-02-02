import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'

type LogisticsRecord = {
  id: string
  reference: string
  lane: string
  status: 'On time' | 'At risk' | 'Delayed'
  eta: string
  value: string
  sla: string
  carrier: string
}

export const logisticsRecords: LogisticsRecord[] = [
  { id: 'lf-10421', reference: 'LF-10421', lane: 'Munich → Rotterdam', status: 'On time', eta: '2026-02-03', value: 'EUR 120k', sla: '24h', carrier: 'Atlas Logistics' },
  { id: 'lf-10455', reference: 'LF-10455', lane: 'Hamburg → Lyon', status: 'At risk', eta: '2026-02-04', value: 'EUR 85k', sla: '36h', carrier: 'Hanse Trans' },
  { id: 'lf-10488', reference: 'LF-10488', lane: 'Cologne → Milan', status: 'Delayed', eta: '2026-02-05', value: 'EUR 92k', sla: '48h', carrier: 'WestCargo' },
  { id: 'lf-10502', reference: 'LF-10502', lane: 'Frankfurt → Prague', status: 'On time', eta: '2026-02-02', value: 'EUR 64k', sla: '18h', carrier: 'Rhein Cargo' },
  { id: 'lf-10520', reference: 'LF-10520', lane: 'Berlin → Vienna', status: 'On time', eta: '2026-02-06', value: 'EUR 70k', sla: '30h', carrier: 'Nordstadt Fleet' },
  { id: 'lf-10537', reference: 'LF-10537', lane: 'Stuttgart → Zurich', status: 'At risk', eta: '2026-02-06', value: 'EUR 58k', sla: '24h', carrier: 'EuroFleet' },
  { id: 'lf-10551', reference: 'LF-10551', lane: 'Dortmund → Antwerp', status: 'On time', eta: '2026-02-07', value: 'EUR 95k', sla: '36h', carrier: 'Rheinland Transport' },
  { id: 'lf-10569', reference: 'LF-10569', lane: 'Nuremberg → Paris', status: 'Delayed', eta: '2026-02-08', value: 'EUR 132k', sla: '42h', carrier: 'Bavaria Logistics' },
  { id: 'lf-10588', reference: 'LF-10588', lane: 'Leipzig → Brussels', status: 'On time', eta: '2026-02-03', value: 'EUR 44k', sla: '20h', carrier: 'Ibex Freight' },
  { id: 'lf-10601', reference: 'LF-10601', lane: 'Kiel → Copenhagen', status: 'On time', eta: '2026-02-04', value: 'EUR 39k', sla: '24h', carrier: 'NorthSea Logistics' },
  { id: 'lf-10618', reference: 'LF-10618', lane: 'Berlin → Warsaw', status: 'At risk', eta: '2026-02-05', value: 'EUR 52k', sla: '30h', carrier: 'Central Rail Cargo' },
  { id: 'lf-10630', reference: 'LF-10630', lane: 'Dresden → Salzburg', status: 'On time', eta: '2026-02-02', value: 'EUR 48k', sla: '18h', carrier: 'Danube Logistik' },
  { id: 'lf-10644', reference: 'LF-10644', lane: 'Hamburg → Oslo', status: 'Delayed', eta: '2026-02-06', value: 'EUR 110k', sla: '48h', carrier: 'Metro Freight' },
  { id: 'lf-10659', reference: 'LF-10659', lane: 'Munich → Madrid', status: 'On time', eta: '2026-02-07', value: 'EUR 140k', sla: '60h', carrier: 'Skyline Transport' },
  { id: 'lf-10673', reference: 'LF-10673', lane: 'Cologne → Amsterdam', status: 'At risk', eta: '2026-02-03', value: 'EUR 76k', sla: '24h', carrier: 'Urban Express' }
]

export default function LogisticsDashboardPage() {
  const { lang } = useI18n()
  const navigate = useNavigate()
  const [search, setSearch] = React.useState('')
  const [sortKey, setSortKey] = React.useState('eta')
  const [statusFilter, setStatusFilter] = React.useState('all')
  const [quickFilter, setQuickFilter] = React.useState('all')
  const [filtersOpen, setFiltersOpen] = React.useState(false)

  const GLASS_TEXT = '#0e0d1c'
  const GLASS_SUBTLE = '#64748b'

  const kpis = [
    { label: lang === 'en' ? 'Active shipments' : 'Aktive Sendungen', value: String(logisticsRecords.length) },
    { label: lang === 'en' ? 'At risk' : 'Erhoeht', value: String(logisticsRecords.filter((r) => r.status === 'At risk').length) },
    { label: lang === 'en' ? 'Delayed' : 'Verspaetet', value: String(logisticsRecords.filter((r) => r.status === 'Delayed').length) },
    { label: lang === 'en' ? 'On time' : 'On time', value: String(logisticsRecords.filter((r) => r.status === 'On time').length) },
    { label: lang === 'en' ? 'Open incidents' : 'Offene Incidents', value: '6' },
    { label: lang === 'en' ? 'SLA breaches' : 'SLA Verstoesse', value: '3' }
  ]

  const copy = lang === 'en'
    ? {
        title: 'Logistics dashboard',
        subtitle: 'Operational view for cargo execution and SLA oversight.',
        columns: ['Reference', 'Lane', 'Status', 'ETA', 'Value', 'SLA', 'Carrier'],
        action: 'Open record',
        filtersTitle: 'Filters',
        filtersToggle: 'Show filters',
        filtersToggleClose: 'Hide filters',
        searchPlaceholder: 'Search reference or lane',
        sortLabel: 'Sort by',
        sortOptions: [
          { label: 'ETA', value: 'eta' },
          { label: 'Status', value: 'status' },
          { label: 'Value', value: 'value' }
        ],
        statusLabel: 'Status',
        statusOptions: [
          { label: 'All', value: 'all' },
          { label: 'On time', value: 'onTime' },
          { label: 'At risk', value: 'risk' },
          { label: 'Delayed', value: 'delayed' }
        ],
        quickLabel: 'Quick filters',
        quickOptions: [
          { label: 'At risk', value: 'risk' },
          { label: 'Delayed', value: 'delayed' },
          { label: 'On time', value: 'onTime' }
        ],
        chipLabel: 'Filter chips'
      }
    : {
        title: 'Logistik-Dashboard',
        subtitle: 'Operative Sicht fuer Cargo-Ausfuehrung und SLA-Status.',
        columns: ['Referenz', 'Route', 'Status', 'ETA', 'Wert', 'SLA', 'Carrier'],
        action: 'Datensatz oeffnen',
        filtersTitle: 'Filter',
        filtersToggle: 'Filter anzeigen',
        filtersToggleClose: 'Filter ausblenden',
        searchPlaceholder: 'Referenz oder Route suchen',
        sortLabel: 'Sortieren nach',
        sortOptions: [
          { label: 'ETA', value: 'eta' },
          { label: 'Status', value: 'status' },
          { label: 'Wert', value: 'value' }
        ],
        statusLabel: 'Status',
        statusOptions: [
          { label: 'Alle', value: 'all' },
          { label: 'On time', value: 'onTime' },
          { label: 'Erhoeht', value: 'risk' },
          { label: 'Verspaetet', value: 'delayed' }
        ],
        quickLabel: 'Schnellfilter',
        quickOptions: [
          { label: 'Erhoeht', value: 'risk' },
          { label: 'Verspaetet', value: 'delayed' },
          { label: 'On time', value: 'onTime' }
        ],
        chipLabel: 'Filter-Chips'
      }

  function parseValue(value: string) {
    const normalized = value.replace(/[^0-9.kKmM]/g, '')
    const number = parseFloat(normalized.replace(/[kKmM]$/, '')) || 0
    if (normalized.toLowerCase().endsWith('m')) return number * 1_000_000
    if (normalized.toLowerCase().endsWith('k')) return number * 1_000
    return number
  }

  const filteredRecords = logisticsRecords
    .filter((record) => {
      const query = search.trim().toLowerCase()
      if (!query) return true
      return record.reference.toLowerCase().includes(query) || record.lane.toLowerCase().includes(query)
    })
    .filter((record) => {
      if (statusFilter === 'onTime') return record.status === 'On time'
      if (statusFilter === 'risk') return record.status === 'At risk'
      if (statusFilter === 'delayed') return record.status === 'Delayed'
      return true
    })
    .filter((record) => {
      if (quickFilter === 'risk') return record.status === 'At risk'
      if (quickFilter === 'delayed') return record.status === 'Delayed'
      if (quickFilter === 'onTime') return record.status === 'On time'
      return true
    })
    .sort((a, b) => {
      if (sortKey === 'value') return parseValue(b.value) - parseValue(a.value)
      if (sortKey === 'status') return a.status.localeCompare(b.status)
      if (sortKey === 'eta') return new Date(a.eta).getTime() - new Date(b.eta).getTime()
      return 0
    })

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
        <div style={{ marginTop: '1.5rem' }}>
          <Header title={copy.title} subtitle={copy.subtitle} subtitleColor={GLASS_SUBTLE} titleColor="#D4380D" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {kpis.map((item) => (
            <Card key={item.label} variant="glass">
              <p style={{ margin: 0, color: GLASS_TEXT, fontSize: '0.95rem' }}>{item.label}</p>
              <div style={{ marginTop: '0.5rem', fontSize: '2rem', fontWeight: 700, color: GLASS_TEXT }}>{item.value}</div>
            </Card>
          ))}
        </div>

        <Card title={copy.filtersTitle} variant="glass">
          <div style={{ display: 'grid', gap: '0.9rem' }}>
            <style>
              {`
                .logistics-filters-toggle { display: none; }
                @media (max-width: 900px) {
                  .logistics-filters-toggle { display: inline-flex; }
                  .logistics-filters { display: none; }
                  .logistics-filters.is-open { display: grid; }
                }
                .logistics-chip { border-radius: 999px; font-size: 0.7rem; padding: 0.2rem 0.55rem; }
                .logistics-quick-row { display: flex; flex-wrap: wrap; gap: 0.9rem; margin-top: 0.6rem; }
                .logistics-chip-row { display: flex; flex-wrap: wrap; gap: 0.9rem; margin-top: 0.8rem; }
                @media (max-width: 900px) {
                  .logistics-chip-row { gap: 0.6rem; }
                }
              `}
            </style>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm logistics-filters-toggle"
              onClick={() => setFiltersOpen((prev) => !prev)}
            >
              {filtersOpen ? copy.filtersToggleClose : copy.filtersToggle}
            </button>
            <div
              className={`logistics-filters ${filtersOpen ? 'is-open' : ''}`}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}
            >
              <div style={{ display: 'grid', gap: '0.35rem' }}>
                <label className="text-muted" htmlFor="logistics-search">{copy.searchPlaceholder}</label>
                <input
                  id="logistics-search"
                  type="text"
                  placeholder={copy.searchPlaceholder}
                  className="form-control"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <div style={{ display: 'grid', gap: '0.35rem' }}>
                <label className="text-muted" htmlFor="logistics-sort">{copy.sortLabel}</label>
                <select
                  id="logistics-sort"
                  className="form-select"
                  value={sortKey}
                  onChange={(event) => setSortKey(event.target.value)}
                >
                  {copy.sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'grid', gap: '0.35rem' }}>
                <label className="text-muted" htmlFor="logistics-status">{copy.statusLabel}</label>
                <select
                  id="logistics-status"
                  className="form-select"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                >
                  {copy.statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className={`logistics-filters logistics-quick-row ${filtersOpen ? 'is-open' : ''}`}>
              <span style={{ marginRight: '0.5rem', color: GLASS_SUBTLE, fontSize: '0.85rem' }}>{copy.quickLabel}</span>
              {copy.quickOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`btn btn-sm logistics-chip ${quickFilter === option.value ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setQuickFilter(quickFilter === option.value ? 'all' : option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="logistics-chip-row">
              <span style={{ marginRight: '0.5rem', color: GLASS_SUBTLE, fontSize: '0.85rem' }}>{copy.chipLabel}</span>
              {copy.statusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`btn btn-sm logistics-chip ${statusFilter === option.value ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setStatusFilter(option.value)}
                >
                  {option.label}
                </button>
              ))}
              {copy.sortOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`btn btn-sm logistics-chip ${sortKey === option.value ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setSortKey(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <Card title={lang === 'en' ? 'Shipment records' : 'Sendungsdaten'} variant="glass">
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <style>
              {`
                .logistics-table { display: grid; gap: 0.75rem; }
                .logistics-cards { display: none; gap: 1.1rem; }
                @media (max-width: 900px) {
                  .logistics-table { display: none; }
                  .logistics-cards { display: grid; }
                }
              `}
            </style>
            <div className="logistics-table">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr 0.9fr 0.8fr 0.9fr 0.6fr 1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                {copy.columns.map((col) => (
                  <strong key={col} style={{ color: GLASS_SUBTLE }}>{col}</strong>
                ))}
                <span />
              </div>
              {filteredRecords.map((record) => (
                <div key={record.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr 0.9fr 0.8fr 0.9fr 0.6fr 1fr 1fr', gap: '0.75rem', alignItems: 'center' }}>
                  <strong>{record.reference}</strong>
                  <span style={{ color: GLASS_SUBTLE }}>{record.lane}</span>
                  <span style={{ color: GLASS_SUBTLE }}>{record.status}</span>
                  <span style={{ color: GLASS_SUBTLE }}>{record.eta}</span>
                  <span style={{ color: GLASS_SUBTLE }}>{record.value}</span>
                  <span style={{ color: GLASS_SUBTLE }}>{record.sla}</span>
                  <span style={{ color: GLASS_SUBTLE }}>{record.carrier}</span>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => navigate(`/logistics-dashboard/record/${record.id}`)}
                  >
                    {copy.action}
                  </button>
                </div>
              ))}
            </div>

            <div className="logistics-cards">
              {filteredRecords.map((record) => (
                <Card key={record.id} title={record.reference} variant="glass">
                  <div style={{ display: 'grid', gap: '0.5rem' }}>
                    <div style={{ color: GLASS_SUBTLE }}>{record.lane}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span className="badge bg-blue-lt">{record.status}</span>
                      <span className="badge bg-azure-lt">{record.eta}</span>
                      <span className="badge bg-orange-lt">{record.value}</span>
                      <span className="badge bg-teal-lt">{record.sla}</span>
                    </div>
                    <div style={{ color: GLASS_SUBTLE }}>{record.carrier}</div>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate(`/logistics-dashboard/record/${record.id}`)}
                    >
                      {copy.action}
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
