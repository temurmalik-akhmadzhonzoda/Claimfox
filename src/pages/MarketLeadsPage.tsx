import React, { useMemo, useState } from 'react'
import { leads, LeadItem } from '@/data/leads'
import { marketAnchors } from '@/data/market'
import { useI18n } from '@/i18n/I18nContext'
import { formatMoneyCompact, formatPercent } from '@/lib/format'
import KpiCard from '@/components/KpiCard'
import FiltersBar from '@/components/FiltersBar'
import ChartTopLeads from '@/components/ChartTopLeads'
import ChartGermanyVsEurope from '@/components/ChartGermanyVsEurope'
import ChartRiskMix from '@/components/ChartRiskMix'
import LeadsTable from '@/components/LeadsTable'
import LeadDrawer from '@/components/LeadDrawer'
import SourcesDrawer from '@/components/SourcesDrawer'

type ExposureFilter = 'all' | 'direct' | 'indirect' | 'brokered'

const sources = [
  {
    id: 'market-anchor',
    title: 'Market Anchor Dataset',
    publisher: 'Insurfox',
    year: 2024,
    documentType: 'Internal dataset',
    lastVerified: '2026-01-22',
    url: 'TBD'
  }
]

export default function MarketLeadsPage() {
  const { lang } = useI18n()
  const locale = lang === 'de' ? 'de-DE' : 'en-GB'
  const [region, setRegion] = useState<'de' | 'eu'>('de')
  const [exposureFilter, setExposureFilter] = useState<ExposureFilter>('all')
  const [search, setSearch] = useState('')
  const [activeLead, setActiveLead] = useState<LeadItem | undefined>()
  const [sourcesOpen, setSourcesOpen] = useState(false)

  const market = region === 'de' ? marketAnchors[0] : marketAnchors[1]

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (search && !lead.name.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      if (exposureFilter === 'direct' && lead.exposureType !== 'Direct') return false
      if (exposureFilter === 'indirect' && lead.exposureType !== 'Indirect') return false
      if (exposureFilter === 'brokered' && lead.exposureType !== 'Brokered') return false
      return true
    })
  }, [search, exposureFilter])

  const totalExposure = filteredLeads.reduce((sum, lead) => {
    const share = region === 'de' ? lead.shareDE : lead.shareEU
    if (!share) return sum
    return sum + market.value * share
  }, 0)

  const exposureRows = filteredLeads
    .map((lead) => {
      const share = region === 'de' ? lead.shareDE : lead.shareEU
      if (!share) return undefined
      return {
        name: lead.name,
        value: market.value * share
      }
    })
    .filter(Boolean) as { name: string; value: number }[]

  const riskMix = [
    {
      label: 'Exposure Mix',
      direct: filteredLeads.filter((lead) => lead.exposureType === 'Direct').length,
      indirect: filteredLeads.filter((lead) => lead.exposureType === 'Indirect').length,
      brokered: filteredLeads.filter((lead) => lead.exposureType === 'Brokered').length
    }
  ]

  const compareChart = [
    { label: 'DE', value: marketAnchors[0].value },
    { label: 'EU', value: marketAnchors[1].value }
  ]

  function handleExport(type: 'kpi' | 'table' | 'sources') {
    const filename = type === 'kpi' ? 'kpis.json' : type === 'table' ? 'leads.csv' : 'sources.csv'

    if (type === 'kpi') {
      const payload = {
        region,
        market: market.value,
        totalExposure,
        leads: filteredLeads
      }
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)
      return
    }

    if (type === 'table') {
      const headers = [
        'Lead',
        'Category',
        `Exposure ${region.toUpperCase()}`,
        `Share ${region.toUpperCase()}`,
        'Exposure Type',
        'Notes'
      ]
      const rows = filteredLeads.map((lead) => {
        const share = region === 'de' ? lead.shareDE : lead.shareEU
        const exposure = share ? market.value * share : undefined
        return [
          lead.name,
          lead.category,
          exposure ? formatMoneyCompact(exposure, locale) : 'TBD',
          share ? formatPercent(share, locale) : 'TBD',
          lead.exposureType,
          lead.notes[lang === 'de' ? 'de' : 'en']
        ].join(',')
      })
      const csv = [headers.join(','), ...rows].join('\n')
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)
      return
    }

    const sourceHeaders = ['Title', 'Publisher', 'Year', 'Document Type', 'Last Verified', 'URL']
    const sourceRows = sources.map((source) =>
      [source.title, source.publisher, `${source.year}`, source.documentType, source.lastVerified, source.url || 'TBD']
        .join(',')
    )
    const sourceCsv = [sourceHeaders.join(','), ...sourceRows].join('\n')
    const sourceBlob = new Blob([sourceCsv], { type: 'text/csv' })
    const sourceUrl = URL.createObjectURL(sourceBlob)
    const sourceLink = document.createElement('a')
    sourceLink.href = sourceUrl
    sourceLink.download = filename
    sourceLink.click()
    URL.revokeObjectURL(sourceUrl)
  }

  return (
    <section className="page ix-leads-page">
      <nav className="ix-top-nav" aria-label="Primary">
        <a href="#overview">Overview</a>
        <a href="#leads">Leads</a>
        <a href="#germany">Germany</a>
        <a href="#europe">Europe</a>
        <a href="#methodology">Methodology</a>
        <a href="#sources">Sources</a>
      </nav>
      <header className="ix-leads-hero">
        <div>
          <p className="ix-eyebrow">Enterprise Lead Intelligence</p>
          <h1>Marktanalyse Flotte Spedition und Logistik</h1>
          <p>
            Investor- & Carrier-grade exposure mapping for fleet, freight, and composite insurance.
          </p>
        </div>
        <button type="button" className="ix-primary-btn" onClick={() => setSourcesOpen(true)}>
          Sources & Verification
        </button>
      </header>

      <FiltersBar
        locale={locale}
        region={region}
        exposure={exposureFilter}
        onRegionChange={setRegion}
        onExposureChange={setExposureFilter}
        onSearchChange={setSearch}
        onExport={handleExport}
      />

      <section className="ix-kpi-grid" id="overview">
        <KpiCard
          label={region === 'de' ? 'DE Market' : 'EU Market'}
          value={market.value}
          locale={locale}
          onInfo={() => setSourcesOpen(true)}
        />
        <KpiCard
          label="Leads"
          value={filteredLeads.length}
          locale={locale}
          isCount
          note={region === 'de' ? 'Selected set' : 'Selected set'}
        />
        <KpiCard
          label="Total Exposure"
          value={totalExposure || undefined}
          locale={locale}
          note={region === 'de' ? 'Market * Share' : 'Market * Share'}
        />
        <KpiCard
          label="Last verified"
          value={undefined}
          locale={locale}
          note={sources[0].lastVerified}
        />
      </section>

      <section className="ix-charts-grid" id="germany">
        <ChartTopLeads data={exposureRows} locale={locale} />
        <ChartRiskMix data={riskMix} />
        <ChartGermanyVsEurope data={compareChart} locale={locale} />
      </section>

      <section className="ix-section" id="leads">
        <h2>Enterprise Leads</h2>
        <LeadsTable
          leads={filteredLeads}
          locale={locale}
          region={region}
          marketValue={market.value}
          onSelect={setActiveLead}
        />
      </section>

      <section className="ix-section" id="methodology">
        <h2>Methodology & Compliance</h2>
        <div className="ix-method-grid">
          <div className="ix-card">
            <h3>Definitions</h3>
            <ul>
              <li>Fleet Motor vs logistics-relevant composite.</li>
              <li>Exposure = Market * Share.</li>
            </ul>
          </div>
          <div className="ix-card">
            <h3>Approach</h3>
            <ul>
              <li>Top-down anchors from DE/EU market.</li>
              <li>Bottom-up lead segmentation.</li>
            </ul>
          </div>
          <div className="ix-card">
            <h3>Limitations</h3>
            <ul>
              <li>Public data only.</li>
              <li>Shares to be confirmed.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="ix-section" id="sources">
        <h2>Sources</h2>
        <button type="button" className="ix-primary-btn" onClick={() => setSourcesOpen(true)}>
          Sources & Verification
        </button>
      </section>

      <SourcesDrawer open={sourcesOpen} sources={sources} onClose={() => setSourcesOpen(false)} />
      <LeadDrawer
        lead={activeLead}
        locale={locale}
        region={region}
        marketValue={market.value}
        onClose={() => setActiveLead(undefined)}
      />
    </section>
  )
}
