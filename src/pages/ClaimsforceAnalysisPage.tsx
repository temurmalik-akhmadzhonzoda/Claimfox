import { type CSSProperties } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

type BiText = { de: string; en: string }

type ComparisonRow = {
  category: BiText
  claimsforce: BiText
  insurfox: BiText
}

type BuildRow = {
  feature: BiText
  assessment: BiText
  effort: BiText
  priority: BiText
}

const companyFacts = {
  claimsforce: [
    { label: { de: 'Gegründet', en: 'Founded' }, value: { de: '2018 (Hamburg)', en: '2018 (Hamburg)' } },
    { label: { de: 'Fokus', en: 'Focus' }, value: { de: 'Claims-Lifecycle-Automatisierung', en: 'Claims lifecycle automation' } },
    { label: { de: 'Stärke', en: 'Strength' }, value: { de: 'Workflow-Steuerung, Mobile App, Remote Inspection, KPI-Dashboards', en: 'Workflow steering, mobile app, remote inspection, KPI dashboards' } },
    { label: { de: 'Zielkunden', en: 'Target clients' }, value: { de: 'Versicherer, TPAs, Adjuster, Backoffices', en: 'Insurers, TPAs, adjusters, back offices' } },
    { label: { de: 'Wertbeitrag', en: 'Value proposition' }, value: { de: 'Effizienz und KI-basierte Schadensteuerung', en: 'Efficiency and AI-based claims steering' } }
  ],
  insurfox: [
    { label: { de: 'Rolle', en: 'Role' }, value: { de: 'Hybrid MGA + Broker', en: 'Hybrid MGA + broker' } },
    { label: { de: 'Modell', en: 'Model' }, value: { de: 'Plattformbasierte Versicherungsinfrastruktur', en: 'Platform-based insurance infrastructure' } },
    { label: { de: 'Claims-Modul', en: 'Claims module' }, value: { de: 'Claimsfox als integriertes Claims-Execution-Modul', en: 'Claimsfox as integrated claims execution module' } },
    { label: { de: 'KI-Einsatz', en: 'AI usage' }, value: { de: 'KI in Underwriting, FNOL und Fleet-Workflows', en: 'AI in underwriting, FNOL, and fleet workflows' } },
    { label: { de: 'Strategische Ambition', en: 'Strategic ambition' }, value: { de: 'Full-stack Insurance Orchestration', en: 'Full-stack insurance orchestration' } }
  ]
}

const capabilityRows: ComparisonRow[] = [
  { category: { de: 'FNOL Intake & Automation', en: 'FNOL Intake & Automation' }, claimsforce: { de: 'Stark in standardisierter Intake-Führung', en: 'Strong in standardized intake control' }, insurfox: { de: 'Stark im integrierten FNOL-Kontext', en: 'Strong in integrated FNOL context' } },
  { category: { de: 'Claims Workflow Management', en: 'Claims Workflow Management' }, claimsforce: { de: 'Sehr stark mit Claims-Spezialisierung', en: 'Very strong with claims specialization' }, insurfox: { de: 'Stark als Teil des Gesamtplattformmodells', en: 'Strong as part of full platform model' } },
  { category: { de: 'Mobile Adjuster App', en: 'Mobile Adjuster App' }, claimsforce: { de: 'Sehr stark mobile-first', en: 'Very strong mobile-first' }, insurfox: { de: 'Teilweise vorhanden, ausbaubar', en: 'Partially available, expandable' } },
  { category: { de: 'Video Inspection / Remote Survey', en: 'Video Inspection / Remote Survey' }, claimsforce: { de: 'Starke operative Eignung', en: 'Strong operational capability' }, insurfox: { de: 'Integrierbar über Partner/API', en: 'Integrable via partner/API' } },
  { category: { de: 'AI-based Case Allocation', en: 'AI-based Case Allocation' }, claimsforce: { de: 'Stark im Schadenrouting', en: 'Strong in claim routing' }, insurfox: { de: 'Stark in cross-lifecycle Orchestrierung', en: 'Strong in cross-lifecycle orchestration' } },
  { category: { de: 'Underwriting Authority', en: 'Underwriting Authority' }, claimsforce: { de: 'Keine MGA-Underwriting-Authority', en: 'No MGA underwriting authority' }, insurfox: { de: 'MGA-Ambition inkl. Delegationspfad', en: 'MGA ambition with delegation path' } },
  { category: { de: 'Risk Pricing Engine', en: 'Risk Pricing Engine' }, claimsforce: { de: 'Kein Kernfokus', en: 'Not a core focus' }, insurfox: { de: 'Strategisch relevant über UW-Stack', en: 'Strategically relevant via UW stack' } },
  { category: { de: 'Broker Distribution', en: 'Broker Distribution' }, claimsforce: { de: 'Keine Distribution-Stack-Rolle', en: 'No distribution stack role' }, insurfox: { de: 'Direkte Broker-Rolle im Hybridmodell', en: 'Direct broker role in hybrid model' } },
  { category: { de: 'Capacity Structuring', en: 'Capacity Structuring' }, claimsforce: { de: 'Keine Capacity-Structuring-Rolle', en: 'No capacity structuring role' }, insurfox: { de: 'Aufbaubar über MGA/Carrier-Partner', en: 'Buildable via MGA/carrier partners' } },
  { category: { de: 'Platform-native Orchestration', en: 'Platform-native Orchestration' }, claimsforce: { de: 'Claims-zentriert', en: 'Claims-centered' }, insurfox: { de: 'End-to-end Orchestrierung über Module', en: 'End-to-end orchestration across modules' } }
]

const coverageData = [
  { capability: { de: 'Claims Lifecycle', en: 'Claims lifecycle' }, claimsforce: 92, insurfox: 80 },
  { capability: { de: 'Workflow Steering', en: 'Workflow steering' }, claimsforce: 90, insurfox: 82 },
  { capability: { de: 'Adjuster Mobility', en: 'Adjuster mobility' }, claimsforce: 88, insurfox: 63 },
  { capability: { de: 'Claims Analytics', en: 'Claims analytics' }, claimsforce: 86, insurfox: 74 },
  { capability: { de: 'Platform Integration', en: 'Platform integration' }, claimsforce: 68, insurfox: 91 },
  { capability: { de: 'AI Lifecycle Coverage', en: 'AI lifecycle coverage' }, claimsforce: 75, insurfox: 89 },
  { capability: { de: 'Underwriting Execution', en: 'Underwriting execution' }, claimsforce: 32, insurfox: 84 },
  { capability: { de: 'Capacity/Broker Model', en: 'Capacity/broker model' }, claimsforce: 28, insurfox: 86 }
]

const strategicPoints = [
  { name: { de: 'Claims Execution Engine', en: 'Claims execution engine' }, overlap: 64, value: 84 },
  { name: { de: 'Mobile Inspection Capability', en: 'Mobile inspection capability' }, overlap: 58, value: 86 },
  { name: { de: 'AI Case Routing', en: 'AI case routing' }, overlap: 62, value: 83 },
  { name: { de: 'Competitive Claims Platform', en: 'Competitive claims platform' }, overlap: 82, value: 44 },
  { name: { de: 'Potential Integration Layer', en: 'Potential integration layer' }, overlap: 49, value: 88 }
]

const riskHeatmap = [
  { label: { de: 'Direkter SaaS-Claims-Wettbewerb', en: 'Direct SaaS claims competition' }, likelihood: 4, impact: 5 },
  { label: { de: 'Data Ownership Konflikte', en: 'Data ownership conflicts' }, likelihood: 3, impact: 5 },
  { label: { de: 'Plattformfragmentierung', en: 'Platform fragmentation' }, likelihood: 4, impact: 4 },
  { label: { de: 'Client Perception Shift', en: 'Client perception shift' }, likelihood: 3, impact: 4 },
  { label: { de: 'Abhängigkeit von externem Claims-Vendor', en: 'Dependency on external claims vendor' }, likelihood: 3, impact: 4 }
]

const buildRows: BuildRow[] = [
  {
    feature: { de: 'Advanced Case Routing AI', en: 'Advanced case routing AI' },
    assessment: { de: 'Feasible als Claimsfox-Enhancement', en: 'Feasible as Claimsfox enhancement' },
    effort: { de: 'Medium Effort', en: 'Medium effort' },
    priority: { de: 'Strategic Priority: Hoch', en: 'Strategic priority: high' }
  },
  {
    feature: { de: 'Mobile Offline Adjuster App', en: 'Mobile offline adjuster app' },
    assessment: { de: 'Technisch machbar, native Entwicklung nötig', en: 'Technically feasible, requires native development' },
    effort: { de: 'High Effort', en: 'High effort' },
    priority: { de: 'Strategic Priority: Mittel-Hoch', en: 'Strategic priority: medium-high' }
  },
  {
    feature: { de: 'Video Inspection Integration', en: 'Video inspection integration' },
    assessment: { de: 'API-Integration möglich', en: 'API integration possible' },
    effort: { de: 'Medium Effort', en: 'Medium effort' },
    priority: { de: 'Strategic Priority: Mittel', en: 'Strategic priority: medium' }
  },
  {
    feature: { de: 'Enterprise KPI Dashboards', en: 'Enterprise KPI dashboards' },
    assessment: { de: 'Ausbau im Reporting-Modul möglich', en: 'Expandable in reporting module' },
    effort: { de: 'Medium Effort', en: 'Medium effort' },
    priority: { de: 'Strategic Priority: Hoch', en: 'Strategic priority: high' }
  }
]

const boardOptions = [
  { option: 'A', label: { de: 'Build internally (Claimsfox erweitern)', en: 'Build internally (expand Claimsfox)' }, risk: 4, control: 5, capital: 4, time: 2, upside: 5 },
  { option: 'B', label: { de: 'Integrate via API', en: 'Integrate via API' }, risk: 3, control: 3, capital: 3, time: 4, upside: 4 },
  { option: 'C', label: { de: 'Strategic partnership', en: 'Strategic partnership' }, risk: 3, control: 2, capital: 2, time: 4, upside: 4 },
  { option: 'D', label: { de: 'Ignore & differentiate', en: 'Ignore & differentiate' }, risk: 4, control: 5, capital: 2, time: 5, upside: 3 }
]

const lineScenario = [
  { month: 1, baseline: 100, integrated: 98 },
  { month: 2, baseline: 96, integrated: 90 },
  { month: 3, baseline: 92, integrated: 83 },
  { month: 4, baseline: 89, integrated: 77 },
  { month: 5, baseline: 86, integrated: 72 },
  { month: 6, baseline: 84, integrated: 68 },
  { month: 7, baseline: 82, integrated: 65 },
  { month: 8, baseline: 80, integrated: 63 },
  { month: 9, baseline: 79, integrated: 61 },
  { month: 10, baseline: 78, integrated: 60 },
  { month: 11, baseline: 77, integrated: 59 },
  { month: 12, baseline: 76, integrated: 58 }
]

const sourceList = [
  'https://claimsforce.com',
  'Public startup and insurance press references',
  'Insurfox internal positioning assumptions'
]

function bi(value: BiText, lang: 'de' | 'en') {
  return lang === 'de' ? value.de : value.en
}

function toHeatColor(score: number) {
  if (score >= 20) return '#b91c1c'
  if (score >= 15) return '#dc2626'
  if (score >= 10) return '#f97316'
  if (score >= 6) return '#f59e0b'
  return '#16a34a'
}

export default function ClaimsforceAnalysisPage() {
  const { lang } = useI18n()
  const l = lang === 'de' ? 'de' : 'en'

  const barData = coverageData.map((row) => ({ capability: bi(row.capability, l), claimsforce: row.claimsforce, insurfox: row.insurfox }))
  const scatterData = strategicPoints.map((row) => ({ name: bi(row.name, l), overlap: row.overlap, value: row.value }))

  function handleExportPdf() {
    const oldTitle = document.title
    document.title = 'Claimsforce_Strategic_Analysis_Insurfox'
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
          .claimsforce-print-hide { display: none !important; }
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', display: 'grid', gap: '1rem' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <Header
              title={bi({ de: 'Claimsforce Strategische Analyse & Vergleich mit Insurfox', en: 'Claimsforce Strategic Analysis & Comparison with Insurfox' }, l)}
              subtitle={bi({ de: 'KI-getriebene Claims-Operations-Plattform vs. hybrides MGA- und Infrastrukturmodell', en: 'AI-driven Claims Operations Platform vs Hybrid MGA & Insurance Infrastructure' }, l)}
              titleColor="#0f172a"
              subtitleColor="#475569"
            />
            <div className="claimsforce-print-hide" style={{ position: 'sticky', top: 84 }}>
              <Button size="sm" onClick={handleExportPdf}>{bi({ de: 'Executive Report herunterladen (PDF)', en: 'Download Executive Report (PDF)' }, l)}</Button>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: 'Management-Zusammenfassung', en: 'Executive Summary' }, l)}>
          <div style={{ display: 'grid', gap: '0.55rem', color: '#334155', lineHeight: 1.65 }}>
            <p style={{ margin: 0 }}>{bi({ de: 'Claimsforce ist ein deutsches InsurTech-SaaS mit Fokus auf KI-unterstütztes End-to-end-Schadenmanagement.', en: 'Claimsforce is a German InsurTech SaaS focused on AI-supported end-to-end claims management.' }, l)}</p>
            <p style={{ margin: 0 }}>{bi({ de: 'Zielkunden sind Versicherer, TPAs, Adjuster und Backoffices; der Schwerpunkt liegt auf Claims-Automatisierung, mobilen Inspektionsworkflows und datengetriebener Fallsteuerung.', en: 'Target clients are insurers, TPAs, adjusters, and back offices; focus is claims automation, mobile inspection workflows, and data-driven case steering.' }, l)}</p>
            <p style={{ margin: 0 }}>{bi({ de: 'Claimsforce hat keine MGA-Rolle, keine Underwriting-Authority und kein Marktplatzmodell.', en: 'Claimsforce has no MGA role, no underwriting authority, and no marketplace model.' }, l)}</p>
            <p style={{ margin: 0 }}>{bi({ de: 'Insurfox als Hybrid MGA + Broker + IaaS integriert Underwriting, Claims, Fleet und Partnerworkflows; strategische Frage: direkter Claims-Automation-Wettbewerber oder komplementärer Execution-Partner?', en: 'Insurfox as hybrid MGA + broker + IaaS integrates underwriting, claims, fleet, and partner workflows; key question: direct claims automation competitor or complementary execution partner?' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: 'Unternehmensprofile', en: 'Company Profiles' }, l)}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1rem' }}>
            <Card title="Claimsforce">
              <ul style={listStyle}>
                {companyFacts.claimsforce.map((fact) => (
                  <li key={fact.label.en}><strong>{bi(fact.label, l)}:</strong> {bi(fact.value, l)}</li>
                ))}
              </ul>
            </Card>
            <Card title="Insurfox">
              <ul style={listStyle}>
                {companyFacts.insurfox.map((fact) => (
                  <li key={fact.label.en}><strong>{bi(fact.label, l)}:</strong> {bi(fact.value, l)}</li>
                ))}
              </ul>
            </Card>
          </div>
        </Card>

        <Card title={bi({ de: 'Capability-Vergleich', en: 'Capability Comparison' }, l)}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{bi({ de: 'Fähigkeit', en: 'Capability' }, l)}</th>
                  <th style={thStyle}>Claimsforce</th>
                  <th style={thStyle}>Insurfox</th>
                </tr>
              </thead>
              <tbody>
                {capabilityRows.map((row) => (
                  <tr key={row.category.en}>
                    <td style={tdStrongStyle}>{bi(row.category, l)}</td>
                    <td style={tdStyle}>{bi(row.claimsforce, l)}</td>
                    <td style={tdStyle}>{bi(row.insurfox, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)', gap: '1rem' }}>
          <Card title={bi({ de: 'Capability Coverage', en: 'Capability Coverage' }, l)}>
            <div style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 12, left: 0, bottom: 38 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="capability" stroke="#475569" angle={-12} textAnchor="end" height={64} />
                  <YAxis stroke="#475569" domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="claimsforce" name="Claimsforce" fill="#0f766e" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="insurfox" name="Insurfox" fill="#d4380d" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title={bi({ de: 'Strategic Positioning Matrix', en: 'Strategic Positioning Matrix' }, l)}>
            <div style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 12, left: 10, bottom: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" dataKey="overlap" name={bi({ de: 'Operational Overlap', en: 'Operational Overlap' }, l)} domain={[35, 90]} stroke="#475569" />
                  <YAxis type="number" dataKey="value" name={bi({ de: 'Strategischer Wert für Insurfox', en: 'Strategic Value to Insurfox' }, l)} domain={[35, 95]} stroke="#475569" />
                  <Tooltip labelFormatter={(_, payload) => (payload?.[0]?.payload?.name ?? '') as string} />
                  <Scatter data={scatterData} fill="#0f172a" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <p style={noteStyle}>{bi({ de: 'Interpretation: Claimsforce ergänzt Insurfox bei mobiler Schadenexecution und KI-Routing. Das Substitutionsrisiko für Claimsfox steigt, falls Insurfox die eigene Claims-Produktdifferenzierung nicht ausbaut.', en: 'Interpretation: Claimsforce complements Insurfox in mobile claims execution and AI routing. Substitution risk for Claimsfox rises if Insurfox does not strengthen its own claims differentiation.' }, l)}</p>
          </Card>
        </div>

        <Card title={bi({ de: 'Claims Efficiency Scenario (Line)', en: 'Claims Efficiency Scenario (Line)' }, l)}>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineScenario} margin={{ top: 10, right: 12, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#475569" />
                <YAxis stroke="#475569" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="baseline" name={bi({ de: 'Baseline Claim Cycle Index', en: 'Baseline claim cycle index' }, l)} stroke="#475569" strokeWidth={2.2} dot={false} />
                <Line type="monotone" dataKey="integrated" name={bi({ de: 'Integrated/Enhanced Index', en: 'Integrated/enhanced index' }, l)} stroke="#0f766e" strokeWidth={2.2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1rem' }}>
          <Card title={bi({ de: 'Synergien', en: 'Synergies' }, l)}>
            <ul style={listStyle}>
              <li>{bi({ de: 'Integration mobiler Inspection-Fähigkeiten in Claimsfox', en: 'Integrate mobile inspection capabilities into Claimsfox' }, l)}</li>
              <li>{bi({ de: 'Schnellere Reife in Claims Operations', en: 'Accelerate claims operational maturity' }, l)}</li>
              <li>{bi({ de: 'Nutzung für externe Adjuster-Orchestrierung', en: 'Use for external adjuster orchestration' }, l)}</li>
              <li>{bi({ de: 'Benchmarking von KI-Steuerungsmodellen', en: 'Benchmark AI steering models' }, l)}</li>
            </ul>
          </Card>
          <Card title={bi({ de: 'Risks', en: 'Risks' }, l)}>
            <ul style={listStyle}>
              <li>{bi({ de: 'Direkter Wettbewerb im SaaS-Claims-Markt', en: 'Direct competition in SaaS claims market' }, l)}</li>
              <li>{bi({ de: 'Data Ownership Konflikte', en: 'Data ownership conflicts' }, l)}</li>
              <li>{bi({ de: 'Plattformfragmentierung', en: 'Platform fragmentation' }, l)}</li>
              <li>{bi({ de: 'Verschobene Kundenwahrnehmung (Claims-Vendor vs Full-stack)', en: 'Client perception shift (claims vendor vs full-stack)' }, l)}</li>
            </ul>
          </Card>
        </div>

        <Card title={bi({ de: 'Risikohitzekarte (Wahrscheinlichkeit x Auswirkung)', en: 'Risk Heatmap (Likelihood x Impact)' }, l)}>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {riskHeatmap.map((row) => {
              const score = row.likelihood * row.impact
              return (
                <div key={row.label.en} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 82px 82px 116px', gap: '0.55rem', alignItems: 'center' }}>
                  <div style={{ color: '#334155', fontSize: '0.87rem' }}>{bi(row.label, l)}</div>
                  <div style={heatCellStyle}>{bi({ de: 'Wkt.', en: 'Lik.' }, l)}: {row.likelihood}</div>
                  <div style={heatCellStyle}>{bi({ de: 'Imp.', en: 'Imp.' }, l)}: {row.impact}</div>
                  <div style={{ ...heatCellStyle, color: '#fff', borderColor: 'transparent', background: toHeatColor(score) }}>
                    {bi({ de: 'Wert', en: 'Score' }, l)}: {score}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card title={bi({ de: 'What Claimsforce Does Better vs What Insurfox Does Better', en: 'What Claimsforce Does Better vs What Insurfox Does Better' }, l)}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1rem' }}>
            <Card title="Claimsforce">
              <ul style={listStyle}>
                <li>{bi({ de: 'Tiefe Spezialisierung im Claims-Lifecycle', en: 'Deep specialization in claims lifecycle' }, l)}</li>
                <li>{bi({ de: 'Mobile-first Inspection Workflows', en: 'Mobile-first inspection workflows' }, l)}</li>
                <li>{bi({ de: 'Enterprise-grade Dashboarding', en: 'Enterprise-grade dashboarding' }, l)}</li>
                <li>{bi({ de: 'Reifere TPA-Integration', en: 'Mature TPA integration' }, l)}</li>
              </ul>
            </Card>
            <Card title="Insurfox">
              <ul style={listStyle}>
                <li>{bi({ de: 'Full-stack Plattformmodell', en: 'Full-stack platform model' }, l)}</li>
                <li>{bi({ de: 'MGA- und Underwriting-Authority-Pfad', en: 'MGA and underwriting authority path' }, l)}</li>
                <li>{bi({ de: 'Integrierte Fleet- und Partnermodule', en: 'Integrated fleet and partner modules' }, l)}</li>
                <li>{bi({ de: 'KI über Claims hinaus', en: 'AI beyond claims' }, l)}</li>
              </ul>
            </Card>
          </div>
        </Card>

        <Card title={bi({ de: 'Kann Insurfox dies selbst bauen? (Analytisch)', en: 'Can We Build This into Insurfox? (Analytical)' }, l)}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{bi({ de: 'Feature', en: 'Feature' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Bewertung', en: 'Assessment' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Aufwand', en: 'Effort' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Strategische Priorität', en: 'Strategic Priority' }, l)}</th>
                </tr>
              </thead>
              <tbody>
                {buildRows.map((row) => (
                  <tr key={row.feature.en}>
                    <td style={tdStrongStyle}>{bi(row.feature, l)}</td>
                    <td style={tdStyle}>{bi(row.assessment, l)}</td>
                    <td style={tdStyle}>{bi(row.effort, l)}</td>
                    <td style={tdStyle}>{bi(row.priority, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title={bi({ de: 'Board-Entscheidungsrahmen', en: 'Board Decision Framework' }, l)}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{bi({ de: 'Option', en: 'Option' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Beschreibung', en: 'Description' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Risiko', en: 'Risk' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Kontrolle', en: 'Control' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Kapital', en: 'Capital intensity' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Zeit', en: 'Time to value' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Potenzial', en: 'Strategic upside' }, l)}</th>
                </tr>
              </thead>
              <tbody>
                {boardOptions.map((row) => (
                  <tr key={row.option}>
                    <td style={tdStrongStyle}>{row.option}</td>
                    <td style={tdStyle}>{bi(row.label, l)}</td>
                    <td style={tdStyle}>{row.risk}</td>
                    <td style={tdStyle}>{row.control}</td>
                    <td style={tdStyle}>{row.capital}</td>
                    <td style={tdStyle}>{row.time}</td>
                    <td style={tdStyle}>{row.upside}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '0.85rem', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={boardOptions} margin={{ top: 10, right: 12, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="option" stroke="#475569" />
                <YAxis domain={[0, 5]} stroke="#475569" />
                <Tooltip />
                <Legend />
                <Bar dataKey="risk" fill="#ef4444" />
                <Bar dataKey="control" fill="#0ea5e9" />
                <Bar dataKey="capital" fill="#7c3aed" />
                <Bar dataKey="time" name={bi({ de: 'Time to Value', en: 'Time to value' }, l)} fill="#f59e0b" />
                <Bar dataKey="upside" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={bi({ de: 'Quellen & Annahmen', en: 'Sources & Assumptions' }, l)}>
          <ul style={listStyle}>
            {sourceList.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
          <p style={{ ...noteStyle, marginTop: '0.6rem' }}>{bi({ de: 'Analyse basiert auf öffentlich verfügbaren Informationen.', en: 'Analysis based on publicly available information.' }, l)}</p>
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
  color: '#64748b',
  fontSize: '0.82rem',
  lineHeight: 1.5
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
