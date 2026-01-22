import React, { useMemo, useState, useEffect } from 'react'
import { marketData, KpiDatum, SourceRef, MarketData } from '@/data/marketData'
import { useI18n } from '@/i18n/I18nContext'
import { formatMoneyCompact, formatMoneyFull, formatPercent } from '@/utils/format'

type Locale = 'de-DE' | 'en-GB'

function getLocale(lang: 'de' | 'en'): Locale {
  return lang === 'de' ? 'de-DE' : 'en-GB'
}

function valueToLabel(value: KpiDatum['value'], locale: Locale) {
  if ('currency' in value) {
    return formatMoneyCompact(value.value, locale)
  }
  return formatPercent(value.value, locale)
}

function valueToTooltip(value: KpiDatum['value'], locale: Locale) {
  if ('currency' in value) {
    return formatMoneyFull(value.value, locale)
  }
  return formatPercent(value.value, locale)
}

function createCsv(rows: Record<string, string>[]) {
  if (rows.length === 0) return ''
  const headers = Object.keys(rows[0])
  const csvLines = [headers.join(',')]
  rows.forEach((row) => {
    csvLines.push(headers.map((header) => `"${row[header] ?? ''}"`).join(','))
  })
  return csvLines.join('\n')
}

function downloadFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

function exportSources(sources: SourceRef[], lang: 'de' | 'en') {
  const rows = sources.map((source) => ({
    id: source.id,
    title: source.title,
    publisher: source.publisher,
    year: `${source.year}`,
    documentType: source.documentType,
    lastVerified: source.lastVerified,
    url: source.url || 'TBD',
    lang
  }))
  downloadFile(createCsv(rows), `sources-${lang}.csv`, 'text/csv')
}

function exportKpis(kpis: KpiDatum[], lang: 'de' | 'en') {
  const payload = kpis.map((kpi) => ({
    id: kpi.id,
    label: kpi.label[lang],
    value: kpi.value,
    sourceId: kpi.sourceId
  }))
  downloadFile(JSON.stringify(payload, null, 2), `kpis-${lang}.json`, 'application/json')
}

function KpiCard({
  kpi,
  locale,
  lang,
  onSource
}: {
  kpi: KpiDatum
  locale: Locale
  lang: 'de' | 'en'
  onSource: (id: string) => void
}) {
  return (
    <article className="market-kpi-card" aria-label={kpi.label[lang]}>
      <div className="market-kpi-card-row">
        <p className="market-kpi-label">{kpi.label[lang]}</p>
        <button
          type="button"
          className="market-source-btn"
          aria-label={lang === 'de' ? 'Quelle anzeigen' : 'Show source'}
          onClick={() => onSource(kpi.sourceId)}
        >
          i
        </button>
      </div>
      <div className="market-kpi-value" title={valueToTooltip(kpi.value, locale)}>
        {valueToLabel(kpi.value, locale)}
      </div>
      {kpi.unitLabel && <span className="market-kpi-unit">{kpi.unitLabel[lang]}</span>}
    </article>
  )
}

function SourceDrawer({
  sources,
  lang,
  activeSource,
  onClose,
  onSelect
}: {
  sources: SourceRef[]
  lang: 'de' | 'en'
  activeSource?: SourceRef
  onClose: () => void
  onSelect: (source: SourceRef) => void
}) {
  return (
    <aside className={`market-source-drawer ${activeSource ? 'is-open' : ''}`} aria-live="polite">
      <div className="market-source-drawer-header">
        <div>
          <h3>{lang === 'de' ? 'Sources & Verification' : 'Sources & Verification'}</h3>
          <p>{lang === 'de' ? 'Prüfbare Quellen und Metadaten' : 'Audit-ready sources and metadata'}</p>
        </div>
        <button type="button" onClick={onClose} aria-label={lang === 'de' ? 'Schließen' : 'Close'}>
          ✕
        </button>
      </div>
      <div className="market-source-drawer-body">
        {activeSource ? (
          <div className="market-source-detail">
            <h4>{activeSource.title}</h4>
            <ul>
              <li>{activeSource.publisher}</li>
              <li>{activeSource.documentType}</li>
              <li>{activeSource.year}</li>
              <li>{lang === 'de' ? 'Last verified' : 'Last verified'}: {activeSource.lastVerified}</li>
              <li>URL: {activeSource.url || 'TBD'}</li>
            </ul>
          </div>
        ) : (
          <p>{lang === 'de' ? 'Quelle auswählen, um Details zu sehen.' : 'Select a source to see details.'}</p>
        )}
        <div className="market-source-list">
          {sources.map((source) => (
            <button key={source.id} type="button" onClick={() => onSelect(source)}>
              {source.title}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

function BarChart({
  title,
  data,
  lang,
  locale,
  onSource
}: {
  title: string
  data: KpiDatum[]
  lang: 'de' | 'en'
  locale: Locale
  onSource: (id: string) => void
}) {
  const max = Math.max(...data.map((item) => item.value.value))
  return (
    <section className="market-chart-card" aria-label={title}>
      <div className="market-chart-header">
        <h3>{title}</h3>
        <button type="button" className="market-source-btn" onClick={() => onSource(data[0].sourceId)}>
          i
        </button>
      </div>
      <div className="market-chart-bars" role="list">
        {data.map((item) => (
          <div key={item.id} className="market-chart-row" role="listitem">
            <span>{item.label[lang]}</span>
            <div className="market-chart-bar">
              <div style={{ width: `${(item.value.value / max) * 100}%` }} />
            </div>
            <strong title={valueToTooltip(item.value, locale)}>{valueToLabel(item.value, locale)}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}

function ComparisonChart({
  title,
  data,
  lang,
  locale,
  onSource
}: {
  title: string
  data: MarketData['charts']['deVsEea']
  lang: 'de' | 'en'
  locale: Locale
  onSource: (id: string) => void
}) {
  const max = Math.max(...data.map((item) => item.value.value))
  return (
    <section className="market-chart-card" aria-label={title}>
      <div className="market-chart-header">
        <h3>{title}</h3>
        <button type="button" className="market-source-btn" onClick={() => onSource(data[0].sourceId)}>
          i
        </button>
      </div>
      <div className="market-chart-bars" role="list">
        {data.map((item) => (
          <div key={item.id} className="market-chart-row" role="listitem">
            <span>
              {item.label[lang]} {item.isEstimate ? (lang === 'de' ? '(Schätzung)' : '(estimate)') : ''}
            </span>
            <div className="market-chart-bar">
              <div style={{ width: `${(item.value.value / max) * 100}%` }} />
            </div>
            <strong title={valueToTooltip(item.value, locale)}>{valueToLabel(item.value, locale)}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}

function StackChart({
  title,
  data,
  lang,
  locale,
  onSource
}: {
  title: string
  data: MarketData['charts']['logisticsStack']
  lang: 'de' | 'en'
  locale: Locale
  onSource: (id: string) => void
}) {
  const total = data.reduce((sum, item) => sum + item.value.value, 0)
  return (
    <section className="market-chart-card" aria-label={title}>
      <div className="market-chart-header">
        <h3>{title}</h3>
        <button type="button" className="market-source-btn" onClick={() => onSource(data[0].sourceId)}>
          i
        </button>
      </div>
      <div className="market-stack-bar" role="list">
        {data.map((item) => (
          <div
            key={item.id}
            className="market-stack-segment"
            style={{ width: `${(item.value.value / total) * 100}%` }}
            role="listitem"
            aria-label={`${item.label[lang]} ${valueToLabel(item.value, locale)}`}
          />
        ))}
      </div>
      <div className="market-stack-legend">
        {data.map((item) => (
          <div key={item.id}>
            <span>{item.label[lang]}</span>
            <strong title={valueToTooltip(item.value, locale)}>{valueToLabel(item.value, locale)}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function MarketOverviewPage() {
  const { lang } = useI18n()
  const locale = useMemo(() => getLocale(lang), [lang])
  const [activeSource, setActiveSource] = useState<SourceRef | undefined>(undefined)
  const [darkMode, setDarkMode] = useState(false)
  const [includeIndicative, setIncludeIndicative] = useState(false)

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveSource(undefined)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const allKpis = [
    ...marketData.kpis.germany,
    ...marketData.kpis.europe,
    ...marketData.kpis.company
  ]

  const activeSourceData = marketData.sources.find((source) => source.id === activeSource?.id)

  return (
    <section className={`page market-overview-page ${darkMode ? 'is-dark' : ''}`}>
      <header className="market-hero" id="overview">
        <div>
          <p className="market-eyebrow">{lang === 'de' ? 'Market Intelligence' : 'Market Intelligence'}</p>
          <h1>{marketData.hero.title[lang]}</h1>
          <p className="market-hero-subtitle">{marketData.hero.subtitle[lang]}</p>
        </div>
        <div className="market-hero-actions">
          <button type="button" onClick={() => setDarkMode((prev) => !prev)}>
            {darkMode ? (lang === 'de' ? 'Light Mode' : 'Light Mode') : lang === 'de' ? 'Dark Mode' : 'Dark Mode'}
          </button>
          <button type="button" onClick={() => setActiveSource(marketData.sources[0])}>
            {lang === 'de' ? 'Sources & Verification' : 'Sources & Verification'}
          </button>
        </div>
      </header>

      <nav className="market-nav" aria-label={lang === 'de' ? 'Abschnitte' : 'Sections'}>
        <a href="#overview">{lang === 'de' ? 'Overview' : 'Overview'}</a>
        <a href="#germany">{lang === 'de' ? 'Germany' : 'Germany'}</a>
        <a href="#europe">{lang === 'de' ? 'Europe' : 'Europe'}</a>
        <a href="#anchors">{lang === 'de' ? 'Company Anchors' : 'Company Anchors'}</a>
        <a href="#methodology">{lang === 'de' ? 'Methodology' : 'Methodology'}</a>
        <a href="#sources">{lang === 'de' ? 'Sources' : 'Sources'}</a>
      </nav>

      <section className="market-chip-row">
        {marketData.chips.map((chip) => (
          <div key={chip.id} className="market-chip">
            <span>{chip.label[lang]}</span>
            <strong>{valueToLabel(chip.value, locale)}</strong>
          </div>
        ))}
      </section>

      <section id="germany" className="market-section">
        <div className="market-section-head">
          <h2>{lang === 'de' ? 'Germany — Market Anchors' : 'Germany — Market Anchors'}</h2>
          <p>{lang === 'de' ? 'GDV 2024 KPI-Set' : 'GDV 2024 KPI set'}</p>
        </div>
        <div className="market-grid">
          {marketData.kpis.germany.map((kpi) => (
            <KpiCard
              key={kpi.id}
              kpi={kpi}
              locale={locale}
              lang={lang}
              onSource={(id) => setActiveSource(marketData.sources.find((source) => source.id === id))}
            />
          ))}
        </div>
      </section>

      <section className="market-section">
        <div className="market-section-head">
          <h2>{lang === 'de' ? 'Germany — Non-Life Market Composition' : 'Germany — Non-Life Market Composition'}</h2>
          <p>{lang === 'de' ? 'Selected lines relevant for logistics and fleet' : 'Selected lines relevant for logistics and fleet'}</p>
        </div>
        <BarChart
          title={lang === 'de' ? 'Germany — Non-Life Market Composition (selected lines)' : 'Germany — Non-Life Market Composition (selected lines)'}
          data={marketData.charts.germanyComposition}
          lang={lang}
          locale={locale}
          onSource={(id) => setActiveSource(marketData.sources.find((source) => source.id === id))}
        />
      </section>

      <section id="europe" className="market-section">
        <div className="market-section-head">
          <h2>{lang === 'de' ? 'Europe — Scale Anchors' : 'Europe — Scale Anchors'}</h2>
          <p>{lang === 'de' ? 'EIOPA Non-Life benchmarks' : 'EIOPA Non-Life benchmarks'}</p>
        </div>
        <div className="market-grid">
          {marketData.kpis.europe.map((kpi) => (
            <KpiCard
              key={kpi.id}
              kpi={kpi}
              locale={locale}
              lang={lang}
              onSource={(id) => setActiveSource(marketData.sources.find((source) => source.id === id))}
            />
          ))}
        </div>
        <ComparisonChart
          title={lang === 'de' ? 'DE → EEA scale comparison' : 'DE → EEA scale comparison'}
          data={marketData.charts.deVsEea}
          lang={lang}
          locale={locale}
          onSource={(id) => setActiveSource(marketData.sources.find((source) => source.id === id))}
        />
      </section>

      <section id="anchors" className="market-section">
        <div className="market-section-head">
          <h2>{lang === 'de' ? 'Company Anchors' : 'Company Anchors'}</h2>
          <p>{lang === 'de' ? 'Regulatorische Anker (Captive/SFCR)' : 'Regulatory anchors (captives/SFCR)'}</p>
        </div>
        <div className="market-grid">
          {marketData.kpis.company.map((kpi) => (
            <KpiCard
              key={kpi.id}
              kpi={kpi}
              locale={locale}
              lang={lang}
              onSource={(id) => setActiveSource(marketData.sources.find((source) => source.id === id))}
            />
          ))}
        </div>
        <p className="market-note">
          {lang === 'de'
            ? 'Hinweis: Captive-Reinsurance (Cargo/Liability), nicht Fleet Motor.'
            : 'Note: Captive reinsurance (cargo/liability), not fleet motor.'}
        </p>
      </section>

      <section className="market-section">
        <div className="market-section-head">
          <h2>{lang === 'de' ? 'Logistics-relevant insurance stack' : 'Logistics-relevant insurance stack'}</h2>
          <div className="market-toggle">
            <label>
              <input
                type="checkbox"
                checked={includeIndicative}
                onChange={(event) => setIncludeIndicative(event.target.checked)}
              />
              {lang === 'de' ? 'Include indicative range' : 'Include indicative range'}
            </label>
          </div>
        </div>
        {includeIndicative ? (
          <StackChart
            title={lang === 'de' ? 'Logistics stack (indicative range)' : 'Logistics stack (indicative range)'}
            data={marketData.charts.logisticsStack}
            lang={lang}
            locale={locale}
            onSource={(id) => setActiveSource(marketData.sources.find((source) => source.id === id))}
          />
        ) : (
          <StackChart
            title={lang === 'de' ? 'Logistics stack (anchors only)' : 'Logistics stack (anchors only)'}
            data={marketData.charts.logisticsStack}
            lang={lang}
            locale={locale}
            onSource={(id) => setActiveSource(marketData.sources.find((source) => source.id === id))}
          />
        )}
      </section>

      <section id="methodology" className="market-section">
        <div className="market-section-head">
          <h2>{lang === 'de' ? 'Methodology & Definitions' : 'Methodology & Definitions'}</h2>
          <p>{lang === 'de' ? 'Investor- & Carrier-grade Abgrenzung' : 'Investor- & carrier-grade definitions'}</p>
        </div>
        <div className="market-methodology-grid">
          <div className="market-methodology-card">
            <h3>{marketData.methodology.definitions.title[lang]}</h3>
            <ul>
              {marketData.methodology.definitions.bullets[lang].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="market-methodology-card">
            <h3>{marketData.methodology.motorVsFleet.title[lang]}</h3>
            <ul>
              {marketData.methodology.motorVsFleet.bullets[lang].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="market-methodology-grid">
          <div className="market-methodology-card">
            <h3>{marketData.methodology.approaches.title[lang]} — Top-down</h3>
            <ul>
              {marketData.methodology.approaches.topDown[lang].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="market-methodology-card">
            <h3>{marketData.methodology.approaches.title[lang]} — Bottom-up</h3>
            <ul>
              {marketData.methodology.approaches.bottomUp[lang].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="market-disclaimer">{marketData.methodology.note[lang]}</p>
      </section>

      <section id="sources" className="market-section market-sources">
        <div className="market-section-head">
          <h2>{lang === 'de' ? 'Sources & Verification' : 'Sources & Verification'}</h2>
          <p>{lang === 'de' ? 'Auditfähige Datenquellen' : 'Audit-ready data sources'}</p>
        </div>
        <div className="market-source-actions">
          <button type="button" onClick={() => exportSources(marketData.sources, lang)}>
            {lang === 'de' ? 'Export Sources (CSV)' : 'Export Sources (CSV)'}
          </button>
          <button type="button" onClick={() => exportKpis(allKpis, lang)}>
            {lang === 'de' ? 'Export KPIs (JSON)' : 'Export KPIs (JSON)'}
          </button>
        </div>
        <div className="market-source-table">
          {marketData.sources.map((source) => (
            <div key={source.id} className="market-source-row">
              <strong>{source.title}</strong>
              <span>{source.publisher}</span>
              <span>{source.documentType}</span>
              <span>{source.year}</span>
              <span>{lang === 'de' ? 'Last verified' : 'Last verified'}: {source.lastVerified}</span>
              <span>URL: {source.url || 'TBD'}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="market-footer">
        <p>{marketData.disclaimer[lang]}</p>
      </footer>

      <SourceDrawer
        sources={marketData.sources}
        lang={lang}
        activeSource={activeSourceData}
        onClose={() => setActiveSource(undefined)}
        onSelect={(source) => setActiveSource(source)}
      />
    </section>
  )
}
