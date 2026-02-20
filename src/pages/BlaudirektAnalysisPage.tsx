import { type CSSProperties } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

type BiText = { de: string; en: string }

type LeadershipRow = {
  name: string
  role: BiText
  since: string
  focus: BiText
}

type ComparisonRow = {
  category: BiText
  blau: BiText
  insurfox: BiText
}

type ScenarioRow = {
  scenario: BiText
  upside: BiText
  risk: BiText
  prerequisite: BiText
}

type RiskRow = {
  label: BiText
  likelihood: number
  impact: number
}

const leadershipRows: LeadershipRow[] = [
  {
    name: 'Ait Voncke',
    role: { de: 'CEO', en: 'CEO' },
    since: '29.09.2025',
    focus: {
      de: 'Verantwortet Skalierung, Plattformwachstum und professionelle Management-Transition.',
      en: 'Leads growth acceleration, platform scaling, and professional management transition.'
    }
  },
  {
    name: 'Hannes Heilenkötter',
    role: { de: 'COO', en: 'COO' },
    since: 'active',
    focus: {
      de: 'Steuert operative Exzellenz, Prozessqualität und Plattformbetrieb im Maklerpool-Modell.',
      en: 'Drives operational excellence, process quality, and platform operations in the broker-pool model.'
    }
  },
  {
    name: 'Heiko Kobold',
    role: { de: 'CFO', en: 'CFO' },
    since: 'active',
    focus: {
      de: 'Verantwortet finanzielle Steuerung, Ertragslogik und Investitionsdisziplin.',
      en: 'Owns financial steering, earnings logic, and investment discipline.'
    }
  },
  {
    name: 'Stephan Schinnenburg',
    role: { de: 'Managing Director, Strategy & Partnerships', en: 'Managing Director, Strategy & Partnerships' },
    since: '01.10.2025',
    focus: {
      de: 'Fokussiert strategische Partnerintegration und kommerzielle Ökosystem-Entwicklung.',
      en: 'Focused on strategic partner integration and commercial ecosystem development.'
    }
  },
  {
    name: 'Oliver Lang',
    role: { de: 'CBDO', en: 'CBDO' },
    since: 'active',
    focus: {
      de: 'Verantwortet Channel-Entwicklung, Vertrieb und Marktbearbeitung mit Partnern.',
      en: 'Leads channel development, commercial growth, and partner-led market expansion.'
    }
  }
]

const comparisonRows: ComparisonRow[] = [
  {
    category: { de: 'Regulatorische Rolle', en: 'Regulatory role' },
    blau: { de: 'Maklerpool- und Intermediär-Infrastruktur, kein eigener Risikoträger.', en: 'Broker-pool and intermediary infrastructure, not an own risk carrier.' },
    insurfox: { de: 'Hybrid aus MGA/Broker/Plattform mit operativer Versicherungsausführung.', en: 'Hybrid MGA/broker/platform model with operational insurance execution.' }
  },
  {
    category: { de: 'Underwriting Authority', en: 'Underwriting authority' },
    blau: { de: 'Keine originäre Underwriting-Authority.', en: 'No native underwriting authority.' },
    insurfox: { de: 'Delegated-Authority-Zielbild im MGA-Kontext.', en: 'Delegated authority target state in MGA context.' }
  },
  {
    category: { de: 'Claims-Automatisierungstiefe', en: 'Claims automation depth' },
    blau: { de: 'Nicht als primäre Kernkompetenz im Marktauftritt.', en: 'Not positioned as core differentiator in market communication.' },
    insurfox: { de: 'Hohe Execution-Tiefe über Claimsfox, FNOL und Workflow-Orchestrierung.', en: 'High execution depth via Claimsfox, FNOL, and workflow orchestration.' }
  },
  {
    category: { de: 'Distributionsbreite vs. Stack-Tiefe', en: 'Distribution breadth vs stack depth' },
    blau: { de: 'Sehr hohe Partner- und Maklerreichweite mit breiter Produktanbindung.', en: 'Very high partner and broker reach with broad product connectivity.' },
    insurfox: { de: 'Geringere Reichweite, dafür tiefere digitale Versicherungs-Execution.', en: 'Lower reach but deeper digital insurance execution stack.' }
  },
  {
    category: { de: 'Plattformintegration & APIs', en: 'Platform integration & APIs' },
    blau: { de: 'Stark über Pool- und Vermittlerprozesse, inkl. Endkunden-App-Logik (simplr).', en: 'Strong in pool/intermediary workflows, incl. end-customer app logic (simplr).' },
    insurfox: { de: 'Stark über modulare IaaS-Architektur (Brokerfox/Claimsfox/Fleetfox/Partnerfox/AI Fox).', en: 'Strong via modular IaaS architecture (Brokerfox/Claimsfox/Fleetfox/Partnerfox/AI Fox).' }
  },
  {
    category: { de: 'AI-Einbindung in Operationen', en: 'AI inclusion in operations' },
    blau: { de: 'Selektiv sichtbar; Schwerpunkt bleibt Distributions- und Serviceplattform.', en: 'Selectively visible; focus remains distribution and service platform.' },
    insurfox: { de: 'Kernfokus auf operative KI in Underwriting, Claims, Partner- und Flottensteuerung.', en: 'Core focus on operational AI in underwriting, claims, partner, and fleet workflows.' }
  }
]

const footprintData = [
  { name: 'Product Partner Access', blau: 95, insurfox: 62 },
  { name: 'Broker Channel Breadth', blau: 91, insurfox: 58 },
  { name: 'Digital Execution Depth', blau: 64, insurfox: 90 },
  { name: 'Claims Automation Depth', blau: 52, insurfox: 89 },
  { name: 'API Workflow Integration', blau: 80, insurfox: 88 }
]

const strategicFitData = [
  { name: { de: 'Distribution-Kooperation', en: 'Distribution cooperation' }, overlap: 74, value: 88 },
  { name: { de: 'API-/Workflow-Integration', en: 'API/workflow integration' }, overlap: 63, value: 90 },
  { name: { de: 'Direkte Kanal-Konkurrenz', en: 'Direct channel competition' }, overlap: 86, value: 39 },
  { name: { de: 'Datenstandard-Kooperation', en: 'Data-standard cooperation' }, overlap: 58, value: 84 }
]

const scenarioRows: ScenarioRow[] = [
  {
    scenario: { de: 'API-Integration & Workflow-Kooperation', en: 'API integration & workflow cooperation' },
    upside: { de: 'Beschleunigt Datenfluss und reduziert Prozessbrüche zwischen Pool und Insurfox-Execution.', en: 'Accelerates data flow and reduces process breaks between pool and Insurfox execution.' },
    risk: { de: 'Integrationsabhängigkeit und Governance-Aufwand.', en: 'Integration dependency and governance overhead.' },
    prerequisite: { de: 'Klare API-Verträge, Data-Rights und SLA-Rahmen.', en: 'Clear API contracts, data rights, and SLA framework.' }
  },
  {
    scenario: { de: 'Distributionszusammenarbeit', en: 'Distribution collaboration' },
    upside: { de: 'Schneller Zugang zu breiteren Makler- und Produktpartnerkanälen.', en: 'Faster access to broader broker and product-partner channels.' },
    risk: { de: 'Kanal- und Ownership-Konflikte beim Kundenzugang.', en: 'Channel and ownership conflicts around client access.' },
    prerequisite: { de: 'Segmentierte Go-to-market-Grenzen und Escalation-Governance.', en: 'Segmented go-to-market boundaries and escalation governance.' }
  },
  {
    scenario: { de: 'Datenstandards & gemeinsames Value-Angebot', en: 'Data standards & joint value proposition' },
    upside: { de: 'Höhere Datenqualität, konsistente Prozesse, bessere Vermittler-Experience.', en: 'Higher data quality, more consistent processes, better intermediary experience.' },
    risk: { de: 'Steigende Abhängigkeit von gemeinsamen Standards.', en: 'Rising dependency on jointly defined standards.' },
    prerequisite: { de: 'Gemeinsames Datenmodell und revisionssichere Nachvollziehbarkeit.', en: 'Shared data model and auditable traceability.' }
  },
  {
    scenario: { de: 'Unabhängige Wettbewerbsposition', en: 'Independent competition posture' },
    upside: { de: 'Maximale strategische Unabhängigkeit und klare Differenzierung.', en: 'Maximum strategic independence and clear differentiation.' },
    risk: { de: 'Höherer Time-to-value und potenziell höhere Akquisitionskosten.', en: 'Higher time-to-value and potentially higher acquisition costs.' },
    prerequisite: { de: 'Konsequente Investition in Distribution, Capacity und Plattformreichweite.', en: 'Consistent investment in distribution, capacity, and platform reach.' }
  }
]

const scenarioTrend = [
  { phase: 'Q1', integration: 66, distribution: 62, independent: 48 },
  { phase: 'Q2', integration: 72, distribution: 68, independent: 51 },
  { phase: 'Q3', integration: 79, distribution: 71, independent: 56 },
  { phase: 'Q4', integration: 84, distribution: 73, independent: 61 }
]

const riskRows: RiskRow[] = [
  { label: { de: 'Distributionsüberschneidung', en: 'Distribution overlap conflict' }, likelihood: 4, impact: 5 },
  { label: { de: 'Datenhoheit & Ownership-Spannung', en: 'Data ownership tension' }, likelihood: 4, impact: 4 },
  { label: { de: 'Integrationsabhängigkeit', en: 'Platform integration dependency' }, likelihood: 3, impact: 4 },
  { label: { de: 'Kanalstrategie-Fehlausrichtung', en: 'Channel strategy misalignment' }, likelihood: 3, impact: 5 }
]

const sources = [
  'https://www.blaudirekt.de/',
  'https://www.blaudirekt.de/unternehmen/',
  'https://www.blaudirekt.de/presse/',
  'https://www.simplr.de/',
  'Public management announcements and product partner communication'
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

export default function BlaudirektAnalysisPage() {
  const { lang, t } = useI18n()
  const l = lang === 'de' ? 'de' : 'en'

  function handleExportPdf() {
    const previous = document.title
    document.title = 'Blaudirekt_Strategic_Analysis_Insurfox'
    window.print()
    window.setTimeout(() => {
      document.title = previous
    }, 700)
  }

  return (
    <section className="page" style={{ gap: '1.2rem', background: '#ffffff', paddingTop: '1rem' }}>
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 10mm; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .blaudirekt-print-hide { display: none !important; }
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', display: 'grid', gap: '1rem' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <Header title={t('analysis.blaudirekt.title')} subtitle={t('analysis.blaudirekt.subtitle')} titleColor="#0f172a" subtitleColor="#475569" />
            <div className="blaudirekt-print-hide" style={{ position: 'sticky', top: 84 }}>
              <Button size="sm" onClick={handleExportPdf}>{t('analysis.blaudirekt.exportPdf')}</Button>
            </div>
          </div>
        </Card>

        <Card title={t('analysis.blaudirekt.sections.executiveSummary')}>
          <div style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{t('analysis.blaudirekt.text.summaryP1')}</p>
            <p style={pStyle}>{t('analysis.blaudirekt.text.summaryP2')}</p>
            <p style={pStyle}>{t('analysis.blaudirekt.text.summaryP3')}</p>
            <p style={pStyle}>{t('analysis.blaudirekt.text.summaryP4')}</p>
          </div>
        </Card>

        <Card title={t('analysis.blaudirekt.sections.snapshot')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1rem' }}>
            <Card title={t('analysis.blaudirekt.labels.blaudirektProfile')}>
              <p style={pStyle}>{t('analysis.blaudirekt.text.snapshotP1')}</p>
              <p style={{ ...pStyle, marginTop: '0.45rem' }}>{t('analysis.blaudirekt.text.snapshotP2')}</p>
            </Card>
            <Card title={t('analysis.blaudirekt.labels.leadership')}>
              <p style={pStyle}>{t('analysis.blaudirekt.text.leadershipIntro')}</p>
              <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.6rem' }}>
                {leadershipRows.map((row) => (
                  <div key={row.name} style={{ border: '1px solid #e2e8f0', borderRadius: 10, background: '#f8fafc', padding: '0.55rem' }}>
                    <div style={{ color: '#0f172a', fontWeight: 700 }}>{row.name} - {bi(row.role, l)}</div>
                    <div style={smallTextStyle}><strong>{t('analysis.blaudirekt.labels.since')}:</strong> {row.since}</div>
                    <div style={smallTextStyle}><strong>{t('analysis.blaudirekt.labels.focus')}:</strong> {bi(row.focus, l)}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Card>

        <Card title={t('analysis.blaudirekt.sections.comparison')}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{t('analysis.blaudirekt.labels.category')}</th>
                  <th style={thStyle}>{t('analysis.blaudirekt.labels.blaudirekt')}</th>
                  <th style={thStyle}>{t('analysis.blaudirekt.labels.insurfox')}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.category.en}>
                    <td style={tdStrongStyle}>{bi(row.category, l)}</td>
                    <td style={tdStyle}>{bi(row.blau, l)}</td>
                    <td style={tdStyle}>{bi(row.insurfox, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title={t('analysis.blaudirekt.sections.distribution')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1rem' }}>
            <Card title={t('analysis.blaudirekt.labels.distributionAccessFootprint')}>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={footprintData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#475569" />
                    <YAxis stroke="#475569" domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="blau" name="blau direkt" fill="#0f766e" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="insurfox" name="Insurfox" fill="#d4380d" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p style={smallTextStyle}>{t('analysis.blaudirekt.labels.indicativeNote')}</p>
            </Card>
            <Card title={t('analysis.blaudirekt.labels.strategicFitMatrix')}>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 10, right: 12, left: 10, bottom: 12 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" dataKey="overlap" name={t('analysis.blaudirekt.labels.overlap')} domain={[0, 100]} stroke="#475569" />
                    <YAxis type="number" dataKey="value" name={t('analysis.blaudirekt.labels.value')} domain={[0, 100]} stroke="#475569" />
                    <Tooltip labelFormatter={(_, payload) => (payload?.[0]?.payload?.name ?? '') as string} />
                    <Scatter data={strategicFitData.map((row) => ({ name: bi(row.name, l), overlap: row.overlap, value: row.value }))} fill="#1d4ed8" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </Card>

        <Card title={t('analysis.blaudirekt.sections.strategicNarrative')}>
          <div style={{ display: 'grid', gap: '0.7rem' }}>
            <NarrativeBlock title={t('analysis.blaudirekt.text.strengthsTitle')} body={t('analysis.blaudirekt.text.strengthsBody')} />
            <NarrativeBlock title={t('analysis.blaudirekt.text.limitsTitle')} body={t('analysis.blaudirekt.text.limitsBody')} />
            <NarrativeBlock title={t('analysis.blaudirekt.text.partnershipTitle')} body={t('analysis.blaudirekt.text.partnershipBody')} />
          </div>
        </Card>

        <Card title={t('analysis.blaudirekt.sections.scenarios')}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{t('analysis.blaudirekt.labels.scenario')}</th>
                  <th style={thStyle}>{t('analysis.blaudirekt.labels.upside')}</th>
                  <th style={thStyle}>{t('analysis.blaudirekt.labels.risk')}</th>
                  <th style={thStyle}>{t('analysis.blaudirekt.labels.prerequisite')}</th>
                </tr>
              </thead>
              <tbody>
                {scenarioRows.map((row) => (
                  <tr key={row.scenario.en}>
                    <td style={tdStrongStyle}>{bi(row.scenario, l)}</td>
                    <td style={tdStyle}>{bi(row.upside, l)}</td>
                    <td style={tdStyle}>{bi(row.risk, l)}</td>
                    <td style={tdStyle}>{bi(row.prerequisite, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ height: 280, marginTop: '0.8rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scenarioTrend} margin={{ top: 10, right: 12, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="phase" stroke="#475569" />
                <YAxis stroke="#475569" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="integration" name={t('analysis.blaudirekt.labels.integrationPath')} stroke="#0f766e" strokeWidth={2.2} dot={false} />
                <Line type="monotone" dataKey="distribution" name={t('analysis.blaudirekt.labels.distributionPath')} stroke="#1d4ed8" strokeWidth={2.2} dot={false} />
                <Line type="monotone" dataKey="independent" name={t('analysis.blaudirekt.labels.independentPath')} stroke="#d4380d" strokeWidth={2.2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p style={smallTextStyle}>{t('analysis.blaudirekt.labels.lineNote')}</p>
        </Card>

        <Card title={t('analysis.blaudirekt.sections.risk')}>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {riskRows.map((row) => {
              const score = row.likelihood * row.impact
              return (
                <div key={row.label.en} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 78px 78px 108px', gap: '0.5rem', alignItems: 'center' }}>
                  <div style={smallTextStyle}>{bi(row.label, l)}</div>
                  <div style={heatCellStyle}>{t('analysis.blaudirekt.labels.likelihood')}: {row.likelihood}</div>
                  <div style={heatCellStyle}>{t('analysis.blaudirekt.labels.impact')}: {row.impact}</div>
                  <div style={{ ...heatCellStyle, background: heatColor(score), color: '#fff', borderColor: 'transparent' }}>{t('analysis.blaudirekt.labels.score')}: {score}</div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card title={t('analysis.blaudirekt.sections.swot')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1rem' }}>
            <Card title="blau direkt">
              <SwotParagraph title={t('analysis.blaudirekt.labels.strength')} body={t('analysis.blaudirekt.text.swotBdStrength')} />
              <SwotParagraph title={t('analysis.blaudirekt.labels.weakness')} body={t('analysis.blaudirekt.text.swotBdWeakness')} />
              <SwotParagraph title={t('analysis.blaudirekt.labels.opportunity')} body={t('analysis.blaudirekt.text.swotBdOpportunity')} />
              <SwotParagraph title={t('analysis.blaudirekt.labels.threat')} body={t('analysis.blaudirekt.text.swotBdThreat')} />
            </Card>
            <Card title="Insurfox">
              <SwotParagraph title={t('analysis.blaudirekt.labels.strength')} body={t('analysis.blaudirekt.text.swotIfStrength')} />
              <SwotParagraph title={t('analysis.blaudirekt.labels.weakness')} body={t('analysis.blaudirekt.text.swotIfWeakness')} />
              <SwotParagraph title={t('analysis.blaudirekt.labels.opportunity')} body={t('analysis.blaudirekt.text.swotIfOpportunity')} />
              <SwotParagraph title={t('analysis.blaudirekt.labels.threat')} body={t('analysis.blaudirekt.text.swotIfThreat')} />
            </Card>
          </div>
        </Card>

        <Card title={t('analysis.blaudirekt.sections.sources')}>
          <ul style={listStyle}>
            {sources.map((src) => (
              <li key={src}>{src}</li>
            ))}
          </ul>
          <p style={{ ...smallTextStyle, marginTop: '0.5rem' }}>
            {t('analysis.blaudirekt.text.captureDate', { date: l === 'de' ? '20. Februar 2026' : 'February 20, 2026' })}
          </p>
          <p style={smallTextStyle}>{t('analysis.blaudirekt.text.disclaimer')}</p>
        </Card>
      </div>

      {/*
        PR Summary:
        - Added BlaudirektAnalysisPage with executive structure, bilingual copy, table-based comparison, charts, risk heatmap, scenarios, and SWOT.
        - Added route /analysis/blaudirekt in protected analysis routes.
        - Added header menu entry for management users: "blau direkt".
        - Added DE/EN translations under analysis.blaudirekt.*.

        Demo Script:
        1) Open /analysis/blaudirekt
        2) Toggle DE/EN in header
        3) Review comparison table, bar/scatter/line charts, and risk heatmap
        4) Click "Download Executive Report (PDF)"

        Terminal Commands:
        - npm install
        - npm run dev
        - npm run build
      */}
    </section>
  )
}

function NarrativeBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 style={subHeadingStyle}>{title}</h3>
      <p style={pStyle}>{body}</p>
    </div>
  )
}

function SwotParagraph({ title, body }: { title: string; body: string }) {
  return (
    <p style={{ ...smallTextStyle, marginBottom: '0.55rem' }}>
      <strong>{title}:</strong> {body}
    </p>
  )
}

const pStyle: CSSProperties = {
  margin: 0,
  color: '#334155',
  fontSize: '0.88rem',
  lineHeight: 1.62
}

const smallTextStyle: CSSProperties = {
  margin: 0,
  color: '#334155',
  fontSize: '0.84rem',
  lineHeight: 1.55
}

const subHeadingStyle: CSSProperties = {
  margin: '0 0 0.35rem',
  color: '#0f172a',
  fontSize: '0.96rem'
}

const listStyle: CSSProperties = {
  margin: 0,
  paddingLeft: '1rem',
  display: 'grid',
  gap: '0.3rem',
  color: '#334155'
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
