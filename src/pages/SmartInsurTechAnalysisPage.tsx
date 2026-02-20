import { type CSSProperties } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

type BiText = { de: string; en: string }

type CapabilityRow = {
  capability: BiText
  smart: BiText
  insurfox: BiText
}

type ScenarioRow = {
  title: BiText
  upside: BiText
  risks: BiText
  prerequisites: BiText
  actions30d: BiText
}

type RiskRow = {
  label: BiText
  likelihood: number
  impact: number
}

const knownFacts: BiText[] = [
  {
    de: 'SMART INSUR meldete per 30.06.2024 ein verwaltetes Plattformvolumen von > 4,5 Mrd. EUR Jahresnettoprämie (Vorjahr 4,0 Mrd. EUR).',
    en: 'SMART INSUR reported managed platform volume of > EUR 4.5bn annual net premium as of 30 Jun 2024 (vs EUR 4.0bn in 2023).'
  },
  {
    de: 'Aussage wurde öffentlich u. a. Sebastian Langrehr (CSO, Smart InsurTech AG) zugeschrieben.',
    en: 'Public statement was attributed, among others, to Sebastian Langrehr (CSO, Smart InsurTech AG).'
  },
  {
    de: 'BiPRO-Kontext zeigt aktive Community-Beteiligung (u. a. Lea Bosch, Smart InsurTech AG) rund um Digitalisierung im Maklerumfeld.',
    en: 'BiPRO context indicates active community participation (incl. Lea Bosch, Smart InsurTech AG) around broker digitalization.'
  },
  {
    de: 'Öffentliche Produktpositionierung: Versicherungsplattform / Makler-Workflow-Tooling mit Fokus auf Prozesse, Verwaltung und Vergütungslogik.',
    en: 'Public product positioning: insurance platform / broker workflow tooling focused on process, administration, and remuneration logic.'
  }
]

const assumptions: BiText[] = [
  {
    de: 'Interpretation: Primär Plattform- und Tooling-Positionierung, nicht MGA- oder Carrier-Modell.',
    en: 'Interpretation: primarily platform and tooling positioning, not an MGA or carrier model.'
  },
  {
    de: 'Interpretation: Claims und Underwriting sind im Vergleich zur Plattform-/Distributionsfunktion nicht der dominante Schwerpunkt.',
    en: 'Interpretation: claims and underwriting are not the dominant focus versus platform/distribution functions.'
  },
  {
    de: 'Interpretation: Hohe Relevanz als potenzieller Konnektivitäts- und Datenqualitäts-Partner im Broker-Ökosystem.',
    en: 'Interpretation: high relevance as potential connectivity and data-quality partner in the broker ecosystem.'
  }
]

const capabilities: CapabilityRow[] = [
  {
    capability: { de: 'Broker workflow / CRM-nahe Funktionen', en: 'Broker workflow / CRM-like features' },
    smart: { de: 'Stark im Makler-Workflow-Kontext', en: 'Strong in broker workflow context' },
    insurfox: { de: 'Stark mit zusätzlicher operativer Execution-Tiefe', en: 'Strong with additional operational execution depth' }
  },
  {
    capability: { de: 'Portfolio transfer / migration', en: 'Portfolio transfer / migration' },
    smart: { de: 'Relevant als Plattformprozess', en: 'Relevant as platform process' },
    insurfox: { de: 'Selektiv, abhängig vom Zielprozessdesign', en: 'Selective, depending on target process design' }
  },
  {
    capability: { de: 'Data validation / enrichment', en: 'Data validation / enrichment' },
    smart: { de: 'Stark als Plattform-Standardisierung', en: 'Strong as platform standardization' },
    insurfox: { de: 'Stark über orchestrierte Lifecycle-Datenflüsse', en: 'Strong via orchestrated lifecycle data flows' }
  },
  {
    capability: { de: 'Carrier connectivity (BiPRO-nah)', en: 'Carrier connectivity (BiPRO-like)' },
    smart: { de: 'Hoch in bestehendem Marktkontext', en: 'High in existing market context' },
    insurfox: { de: 'Ausbaubar über API-/Partnermodell', en: 'Expandable via API/partner model' }
  },
  {
    capability: { de: 'Commission accounting', en: 'Commission accounting' },
    smart: { de: 'Öffentlich als relevantes Modulfeld positioniert', en: 'Publicly positioned as relevant module area' },
    insurfox: { de: 'Integrationsfähig, nicht primärer Differenziator', en: 'Integratable, not primary differentiator' }
  },
  {
    capability: { de: 'Claims workflow', en: 'Claims workflow' },
    smart: { de: 'Nicht als primärer Fokus öffentlich herausgestellt', en: 'Not publicly highlighted as primary focus' },
    insurfox: { de: 'Kernstärke über Claimsfox und FNOL-Execution', en: 'Core strength via Claimsfox and FNOL execution' }
  },
  {
    capability: { de: 'Underwriting workflow', en: 'Underwriting workflow' },
    smart: { de: 'Eher indirekt über Plattform-/Datenlogik', en: 'More indirect via platform/data logic' },
    insurfox: { de: 'Direkter operativer UW-Fokus mit MGA-Ambition', en: 'Direct operational UW focus with MGA ambition' }
  },
  {
    capability: { de: 'Embedded insurance / API orchestration', en: 'Embedded insurance / API orchestration' },
    smart: { de: 'Plattformseitig anschlussfähig', en: 'Platform-side connectivity capable' },
    insurfox: { de: 'Stark als modulare IaaS-Orchestrierung', en: 'Strong as modular IaaS orchestration' }
  },
  {
    capability: { de: 'Multi-tenant platform operations', en: 'Multi-tenant platform operations' },
    smart: { de: 'Stark im Plattformbetrieb', en: 'Strong in platform operations' },
    insurfox: { de: 'Stark im domänenübergreifenden Execution-Stack', en: 'Strong in cross-domain execution stack' }
  },
  {
    capability: { de: 'AI automation', en: 'AI automation' },
    smart: { de: 'Begrenzt/unklar öffentlich präzisiert', en: 'Limited/unclear in public detail' },
    insurfox: { de: 'Kernbestandteil über den Lifecycle', en: 'Core component across lifecycle' }
  }
]

const volumeData = [
  { period: '2023', volume: 4.0 },
  { period: '2024 H1', volume: 4.5 }
]

const fitMatrix: Array<{ name: BiText; overlap: number; value: number }> = [
  { name: { de: 'Distribution-Plattform-Fit', en: 'Distribution Platform Fit' }, overlap: 66, value: 84 },
  { name: { de: 'Datenaustausch-Layer', en: 'Data Exchange Layer' }, overlap: 58, value: 88 },
  { name: { de: 'Kompetitives Kanalrisiko', en: 'Competitive Channel Risk' }, overlap: 82, value: 42 },
  { name: { de: 'Makler-Ökosystem-Leverage', en: 'Broker Ecosystem Leverage' }, overlap: 73, value: 76 }
]

const scenarioRows: ScenarioRow[] = [
  {
    title: { de: 'Szenario A: Distribution-/Plattform-Kooperation', en: 'Scenario A: Distribution/platform cooperation' },
    upside: { de: 'Schneller Zugang zu standardisierten Brokerprozessen.', en: 'Fast access to standardized broker processes.' },
    risks: { de: 'Channel-Konflikte bei Kundenzugang und Ownership.', en: 'Channel conflicts on client access and ownership.' },
    prerequisites: { de: 'Klares Go-to-market-Rollenmodell und Governance.', en: 'Clear go-to-market role model and governance.' },
    actions30d: { de: 'Joint fit workshop + Scope-Grenzen definieren.', en: 'Run joint fit workshop and define scope boundaries.' }
  },
  {
    title: { de: 'Szenario B: Datenaustausch-/Konnektivitäts-Kooperation', en: 'Scenario B: Data exchange/connectivity cooperation' },
    upside: { de: 'Höhere Datenqualität und weniger Reibung in Bestandsprozessen.', en: 'Higher data quality and less friction in servicing flows.' },
    risks: { de: 'Datenhoheit und Integrationsabhängigkeit.', en: 'Data ownership and integration dependency.' },
    prerequisites: { de: 'Vertragliche Data-Rights und Audit-Trails.', en: 'Contractual data rights and audit trails.' },
    actions30d: { de: 'API-Mapping und Governance Blueprint starten.', en: 'Start API mapping and governance blueprint.' }
  },
  {
    title: { de: 'Szenario C: Wettbewerbspositionierung (Überschneidung vermeiden)', en: 'Scenario C: Competitive posture (avoid overlap)' },
    upside: { de: 'Wahrung strategischer Unabhängigkeit und Differenzierung.', en: 'Preserve strategic independence and differentiation.' },
    risks: { de: 'Verpasste Synergien und längerer Time-to-value.', en: 'Missed synergies and longer time-to-value.' },
    prerequisites: { de: 'Klarer USP-Ausbau im Full-stack-Execution-Modell.', en: 'Clear USP expansion in full-stack execution model.' },
    actions30d: { de: 'Differenzierungsplan mit Board-Guardrails aufsetzen.', en: 'Set up differentiation plan with board guardrails.' }
  }
]

const riskRows: RiskRow[] = [
  { label: { de: 'Datenhoheit und Kundenzugang', en: 'Data ownership and client access' }, likelihood: 4, impact: 5 },
  { label: { de: 'Kanal-Konflikt (Maklerbeziehungen)', en: 'Channel conflict (broker relationships)' }, likelihood: 4, impact: 4 },
  { label: { de: 'Vendor-Lock-in', en: 'Vendor lock-in' }, likelihood: 3, impact: 4 },
  { label: { de: 'Compliance (DSGVO, Audit-Trails)', en: 'Compliance (GDPR, audit trails)' }, likelihood: 3, impact: 4 },
  { label: { de: 'Plattform-Fragmentierung', en: 'Platform fragmentation' }, likelihood: 3, impact: 3 }
]

const options = [
  { option: 'A', labelDe: 'Intern aufbauen (Claimsfox/Brokerfox ausbauen)', labelEn: 'Build internally (expand Claimsfox/Brokerfox)', risk: 4, control: 5, capital: 4, upside: 5 },
  { option: 'B', labelDe: 'Über API integrieren', labelEn: 'Integrate via API', risk: 3, control: 3, capital: 3, upside: 4 },
  { option: 'C', labelDe: 'Strategische Partnerschaft', labelEn: 'Strategic partnership', risk: 3, control: 2, capital: 2, upside: 4 },
  { option: 'D', labelDe: 'Ignorieren & differenzieren', labelEn: 'Ignore & differentiate', risk: 4, control: 5, capital: 2, upside: 3 }
]

const capabilityCoverage: Array<{ capability: BiText; smart: number; insurfox: number }> = [
  { capability: { de: 'Schaden-Lifecycle', en: 'Claims lifecycle' }, smart: 55, insurfox: 88 },
  { capability: { de: 'Workflow-Steuerung', en: 'Workflow steering' }, smart: 84, insurfox: 83 },
  { capability: { de: 'Adjuster-Mobilität', en: 'Adjuster mobility' }, smart: 58, insurfox: 72 },
  { capability: { de: 'Schaden-Analytik', en: 'Claims analytics' }, smart: 70, insurfox: 79 },
  { capability: { de: 'Plattform-Integration', en: 'Platform integration' }, smart: 88, insurfox: 90 },
  { capability: { de: 'KI-Lifecycle-Abdeckung', en: 'AI lifecycle coverage' }, smart: 62, insurfox: 91 },
  { capability: { de: 'UW-Execution', en: 'UW execution' }, smart: 40, insurfox: 86 },
  { capability: { de: 'Kapazitäts-/Maklermodell', en: 'Capacity/broker model' }, smart: 63, insurfox: 88 }
]

const sources = [
  'https://www.experten.de/id/4929924/verwaltetes-plattformvolumen-von-smart-insur-waechst-zweistellig/',
  'https://bipro.net/auf-ins-digi-tal-digitalisierung-gelingt-nur-miteinander/',
  'https://www.smartinsurtech.de/'
]

function bi(value: BiText, lang: 'de' | 'en') {
  return lang === 'de' ? value.de : value.en
}

function heatColor(score: number) {
  if (score >= 20) return '#b91c1c'
  if (score >= 15) return '#dc2626'
  if (score >= 10) return '#f97316'
  if (score >= 6) return '#f59e0b'
  return '#16a34a'
}

export default function SmartInsurTechAnalysisPage() {
  const { lang, t } = useI18n()
  const l = lang === 'de' ? 'de' : 'en'

  const barData = capabilityCoverage.map((row) => ({ ...row, capability: bi(row.capability, l) }))
  const fitData = fitMatrix.map((row) => ({ ...row, name: bi(row.name, l) }))
  const captureDate = l === 'de' ? '20.02.2026' : '2026-02-20'

  function handlePdf() {
    const oldTitle = document.title
    document.title = 'SmartInsurTech_Strategic_Analysis_Insurfox'
    window.print()
    window.setTimeout(() => {
      document.title = oldTitle
    }, 700)
  }

  return (
    <section className="page" style={{ gap: '1.25rem', background: '#ffffff', paddingTop: '1rem' }}>
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 10mm; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .smartinsur-print-hide { display: none !important; }
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', display: 'grid', gap: '1rem' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <Header title={t('analysis.smartInsurTech.title')} subtitle={t('analysis.smartInsurTech.subtitle')} titleColor="#0f172a" subtitleColor="#475569" />
            <div className="smartinsur-print-hide" style={{ position: 'sticky', top: 84 }}>
              <Button size="sm" onClick={handlePdf}>{t('analysis.smartInsurTech.exportPdf')}</Button>
            </div>
          </div>
        </Card>

        <Card title={t('analysis.smartInsurTech.sections.executiveSummary')}>
          <div style={{ display: 'grid', gap: '0.55rem', color: '#334155', lineHeight: 1.65 }}>
            <p style={{ margin: 0 }}>{t('analysis.smartInsurTech.text.summaryP1')}</p>
            <p style={{ margin: 0 }}>{t('analysis.smartInsurTech.text.summaryP2')}</p>
            <p style={{ margin: 0 }}>{t('analysis.smartInsurTech.text.summaryP3')}</p>
          </div>
        </Card>

        <Card title={t('analysis.smartInsurTech.sections.snapshot')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1rem' }}>
            <Card title={t('analysis.smartInsurTech.labels.knownFactsTitle')}>
              <ul style={listStyle}>{knownFacts.map((item) => <li key={item.en}>{bi(item, l)}</li>)}</ul>
            </Card>
            <Card title={t('analysis.smartInsurTech.labels.assumptionsTitle')}>
              <ul style={listStyle}>{assumptions.map((item) => <li key={item.en}>{bi(item, l)}</li>)}</ul>
            </Card>
          </div>
        </Card>

        <Card title={t('analysis.smartInsurTech.sections.capabilityMap')}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{t('analysis.smartInsurTech.labels.capability')}</th>
                  <th style={thStyle}>Smart InsurTech</th>
                  <th style={thStyle}>Insurfox</th>
                </tr>
              </thead>
              <tbody>
                {capabilities.map((row) => (
                  <tr key={row.capability.en}>
                    <td style={tdStrongStyle}>{bi(row.capability, l)}</td>
                    <td style={tdStyle}>{bi(row.smart, l)}</td>
                    <td style={tdStyle}>{bi(row.insurfox, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1rem' }}>
          <Card title={t('analysis.smartInsurTech.sections.strengths')}>
            <p style={noteStyle}>{t('analysis.smartInsurTech.text.strengthsNarrative')}</p>
          </Card>
          <Card title={t('analysis.smartInsurTech.sections.gaps')}>
            <p style={noteStyle}>{t('analysis.smartInsurTech.text.gapsNarrative')}</p>
          </Card>
        </div>

        <Card title={t('analysis.smartInsurTech.sections.comparison')}>
          <p style={noteStyle}>{t('analysis.smartInsurTech.text.comparisonNarrative')}</p>
          <div style={{ marginTop: '0.8rem', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 12, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="capability" stroke="#475569" angle={-12} textAnchor="end" height={64} />
                <YAxis domain={[0, 100]} stroke="#475569" />
                <Tooltip />
                <Legend />
                <Bar dataKey="smart" name="Smart InsurTech" fill="#1d4ed8" radius={[6, 6, 0, 0]} />
                <Bar dataKey="insurfox" name="Insurfox" fill="#d4380d" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={t('analysis.smartInsurTech.sections.charts')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1rem' }}>
            <Card title={t('analysis.smartInsurTech.labels.volumeGrowth')}>
              <div style={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={volumeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="period" stroke="#475569" />
                    <YAxis stroke="#475569" />
                    <Tooltip />
                    <Line type="monotone" dataKey="volume" stroke="#0f172a" strokeWidth={2.3} dot={{ r: 4 }} name={t('analysis.smartInsurTech.labels.jnpSeries')} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p style={noteStyle}>{t('analysis.smartInsurTech.labels.reportedVolumeNote')}</p>
            </Card>

            <Card title={t('analysis.smartInsurTech.labels.partnershipFitMatrix')}>
              <div style={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" dataKey="overlap" name={t('analysis.smartInsurTech.labels.channelOverlap')} domain={[0, 100]} stroke="#475569" />
                    <YAxis type="number" dataKey="value" name={t('analysis.smartInsurTech.labels.strategicValue')} domain={[0, 100]} stroke="#475569" />
                    <Tooltip labelFormatter={(_, payload) => (payload?.[0]?.payload?.name ?? '') as string} />
                    <Scatter data={fitData} fill="#f97316" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <p style={noteStyle}>{t('analysis.smartInsurTech.labels.internalScoreNote')}</p>
            </Card>
          </div>
        </Card>

        <Card title={t('analysis.smartInsurTech.sections.scenarios')}>
          <div style={{ display: 'grid', gap: '0.7rem' }}>
            {scenarioRows.map((row) => (
              <div key={row.title.en} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.65rem', background: '#f8fafc' }}>
                <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.3rem' }}>{bi(row.title, l)}</div>
                <p style={scenarioP}><strong>{t('analysis.smartInsurTech.labels.upside')}:</strong> {bi(row.upside, l)}</p>
                <p style={scenarioP}><strong>{t('analysis.smartInsurTech.labels.risks')}:</strong> {bi(row.risks, l)}</p>
                <p style={scenarioP}><strong>{t('analysis.smartInsurTech.labels.prerequisites')}:</strong> {bi(row.prerequisites, l)}</p>
                <p style={scenarioP}><strong>{t('analysis.smartInsurTech.labels.actions30d')}:</strong> {bi(row.actions30d, l)}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title={t('analysis.smartInsurTech.sections.risks')}>
          <div style={{ display: 'grid', gap: '0.45rem' }}>
            {riskRows.map((row) => {
              const score = row.likelihood * row.impact
              return (
                <div key={row.label.en} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 80px 80px 110px', gap: '0.5rem', alignItems: 'center' }}>
                  <div style={{ color: '#334155', fontSize: '0.86rem' }}>{bi(row.label, l)}</div>
                  <div style={heatCellStyle}>{t('analysis.smartInsurTech.labels.likelihood')}: {row.likelihood}</div>
                  <div style={heatCellStyle}>{t('analysis.smartInsurTech.labels.impact')}: {row.impact}</div>
                  <div style={{ ...heatCellStyle, color: '#fff', borderColor: 'transparent', background: heatColor(score) }}>{t('analysis.smartInsurTech.labels.score')}: {score}</div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card title={t('analysis.smartInsurTech.sections.recommendation')}>
          <p style={noteStyle}>{t('analysis.smartInsurTech.text.recommendationNarrative')}</p>
          <div style={{ marginTop: '0.8rem', overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{t('analysis.smartInsurTech.labels.option')}</th>
                  <th style={thStyle}>{t('analysis.smartInsurTech.labels.risk')}</th>
                  <th style={thStyle}>{t('analysis.smartInsurTech.labels.control')}</th>
                  <th style={thStyle}>{t('analysis.smartInsurTech.labels.capital')}</th>
                  <th style={thStyle}>{t('analysis.smartInsurTech.labels.upside')}</th>
                </tr>
              </thead>
              <tbody>
                {options.map((row) => (
                  <tr key={row.option}>
                    <td style={tdStrongStyle}>{row.option} - {l === 'de' ? row.labelDe : row.labelEn}</td>
                    <td style={tdStyle}>{row.risk}</td>
                    <td style={tdStyle}>{row.control}</td>
                    <td style={tdStyle}>{row.capital}</td>
                    <td style={tdStyle}>{row.upside}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '0.8rem', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={options} margin={{ top: 10, right: 12, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="option" stroke="#475569" />
                <YAxis domain={[0, 5]} stroke="#475569" />
                <Tooltip />
                <Legend />
                <Bar dataKey="risk" name={t('analysis.smartInsurTech.labels.risk')} fill="#ef4444" />
                <Bar dataKey="control" name={t('analysis.smartInsurTech.labels.control')} fill="#0ea5e9" />
                <Bar dataKey="capital" name={t('analysis.smartInsurTech.labels.capital')} fill="#7c3aed" />
                <Bar dataKey="upside" name={t('analysis.smartInsurTech.labels.upside')} fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={t('analysis.smartInsurTech.sections.sources')}>
          <ul style={listStyle}>
            {sources.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
          <p style={{ ...noteStyle, marginTop: '0.5rem' }}>{t('analysis.smartInsurTech.text.captureDate', { date: captureDate })}</p>
          <p style={noteStyle}>{t('analysis.smartInsurTech.text.disclaimer')}</p>
        </Card>
      </div>
    </section>
  )
}

const listStyle: CSSProperties = {
  margin: 0,
  paddingLeft: '1rem',
  display: 'grid',
  gap: '0.35rem',
  color: '#334155'
}

const noteStyle: CSSProperties = {
  margin: 0,
  color: '#334155',
  fontSize: '0.86rem',
  lineHeight: 1.6
}

const tableStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  fontSize: '0.86rem'
}

const headRowStyle: CSSProperties = {
  background: '#f1f5f9'
}

const thStyle: CSSProperties = {
  textAlign: 'left',
  color: '#334155',
  padding: '0.55rem',
  borderBottom: '1px solid #dbe2ea',
  fontWeight: 700,
  whiteSpace: 'nowrap'
}

const tdStyle: CSSProperties = {
  color: '#334155',
  padding: '0.55rem',
  borderBottom: '1px solid #e2e8f0',
  verticalAlign: 'top'
}

const tdStrongStyle: CSSProperties = {
  ...tdStyle,
  color: '#0f172a',
  fontWeight: 700
}

const heatCellStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 8,
  padding: '0.3rem 0.45rem',
  fontSize: '0.78rem',
  color: '#334155',
  background: '#ffffff',
  textAlign: 'center'
}

const scenarioP: CSSProperties = {
  margin: '0.2rem 0',
  color: '#334155',
  fontSize: '0.84rem'
}
