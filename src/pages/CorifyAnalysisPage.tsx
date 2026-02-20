import { type CSSProperties } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

type BiText = { de: string; en: string }

type ComparisonRow = {
  category: BiText
  corify: BiText
  insurfox: BiText
}

type BuildFeatureRow = {
  feature: BiText
  evaluation: BiText
  effort: BiText
  strategicRisk: BiText
  recommendation: BiText
}

type ContactRow = {
  name: string
  role: BiText
  focus: BiText
  contactPath: BiText
  source: string
}

const companyFacts = {
  corify: [
    { label: { de: 'Gegründet', en: 'Founded' }, value: { de: '2021 (im Hypoport-InsurTech-Kontext)', en: '2021 (within Hypoport InsurTech context)' } },
    { label: { de: 'Positionierung', en: 'Positioning' }, value: { de: 'Digitale Industrieversicherungs-Marktplattform', en: 'Digital industrial insurance marketplace platform' } },
    { label: { de: 'Kerninnovation', en: 'Core innovation' }, value: { de: 'Standardisiertes Risk-Object-Model (CROM)', en: 'Standardized risk object model (CROM)' } },
    { label: { de: 'Zielgruppen', en: 'Target users' }, value: { de: 'Makler, Industrieunternehmen, Versicherer', en: 'Brokers, industrial clients, insurers' } },
    { label: { de: 'Wertbeitrag', en: 'Value proposition' }, value: { de: 'Datenstandardisierung und effizienter RFP-Prozess', en: 'Data standardization and RFP efficiency' } }
  ],
  insurfox: [
    { label: { de: 'Rolle', en: 'Role' }, value: { de: 'Hybrid: MGA + Broker + Plattform', en: 'Hybrid: MGA + broker + platform' } },
    { label: { de: 'Steuerungsmodell', en: 'Control model' }, value: { de: 'End-to-end Workflow-Kontrolle im operativen Betrieb', en: 'End-to-end workflow control in operations' } },
    { label: { de: 'Claims', en: 'Claims' }, value: { de: 'Claims-Execution inklusive automationsfähiger Prozesse', en: 'Claims execution with automation-capable processes' } },
    { label: { de: 'KI', en: 'AI' }, value: { de: 'KI in Underwriting, FNOL und operativen Workflows', en: 'AI in underwriting, FNOL, and operational workflows' } },
    { label: { de: 'Fokussegmente', en: 'Focus segments' }, value: { de: 'Fleet, Logistics, Mobility', en: 'Fleet, logistics, mobility' } }
  ]
}

const capabilityRows: ComparisonRow[] = [
  { category: { de: 'Risk Data Standardization', en: 'Risk Data Standardization' }, corify: { de: 'Sehr stark: CROM-zentrierte Datenstandardisierung', en: 'Very strong: CROM-centered data standardization' }, insurfox: { de: 'Mittel: modellierbar im Plattformkontext', en: 'Medium: modellable within platform context' } },
  { category: { de: 'Marketplace RFP Engine', en: 'Marketplace RFP Engine' }, corify: { de: 'Stark: strukturierter Industrie-RFP-Prozess', en: 'Strong: structured industrial RFP process' }, insurfox: { de: 'Niedrig-Mittel: nicht als Kernmarktplatz positioniert', en: 'Low-medium: not positioned as a core marketplace' } },
  { category: { de: 'Multi-carrier Matching', en: 'Multi-carrier Matching' }, corify: { de: 'Stark im Matching-Ansatz', en: 'Strong in matching approach' }, insurfox: { de: 'Selektiv über Broker-/Partnernetzwerk', en: 'Selective via broker/partner network' } },
  { category: { de: 'Underwriting Authority', en: 'Underwriting Authority' }, corify: { de: 'Keine MGA-typische Underwriting Authority', en: 'No MGA-like underwriting authority' }, insurfox: { de: 'Ambitioniert im MGA-Modell', en: 'Ambitioned within MGA model' } },
  { category: { de: 'Claims Execution Engine', en: 'Claims Execution Engine' }, corify: { de: 'Nicht als Claims-Engine positioniert', en: 'Not positioned as a claims engine' }, insurfox: { de: 'Stark: operative Claims-Execution', en: 'Strong: operational claims execution' } },
  { category: { de: 'Pricing Engine', en: 'Pricing Engine' }, corify: { de: 'Primär RFP-/Marktplatzlogik', en: 'Primarily RFP and marketplace logic' }, insurfox: { de: 'Entwickelbar über MGA/Broker-Logik', en: 'Developable via MGA/broker logic' } },
  { category: { de: 'Broker Distribution', en: 'Broker Distribution' }, corify: { de: 'Broker-zentrierte Platzierungsinfrastruktur', en: 'Broker-centered placement infrastructure' }, insurfox: { de: 'Direkte Brokerrolle im Hybridmodell', en: 'Direct broker role in hybrid model' } },
  { category: { de: 'Platform-native Workflow Control', en: 'Platform-native Workflow Control' }, corify: { de: 'Fokus auf Placement-Workflow', en: 'Focus on placement workflow' }, insurfox: { de: 'Sehr stark über End-to-end Plattformsteuerung', en: 'Very strong via end-to-end platform control' } },
  { category: { de: 'AI in Operational Execution', en: 'AI in Operational Execution' }, corify: { de: 'Begrenzt auf Marktplatz-/Datenprozess', en: 'Limited to marketplace/data process' }, insurfox: { de: 'Stark in operativer Ausführung', en: 'Strong in operational execution' } },
  { category: { de: 'Capacity Structuring', en: 'Capacity Structuring' }, corify: { de: 'Indirekt über Marktplatzbeziehungen', en: 'Indirect via marketplace relationships' }, insurfox: { de: 'MGA-/Partnerbasiert aufbaubar', en: 'Buildable via MGA/partner model' } }
]

const capabilityCoverage = [
  { capability: { de: 'Risk Data Model', en: 'Risk data model' }, corify: 92, insurfox: 67 },
  { capability: { de: 'Marketplace Infra', en: 'Marketplace infrastructure' }, corify: 89, insurfox: 58 },
  { capability: { de: 'Industrial RFP', en: 'Industrial RFP structure' }, corify: 90, insurfox: 62 },
  { capability: { de: 'Claims Automation', en: 'Claims automation' }, corify: 34, insurfox: 91 },
  { capability: { de: 'AI Workflow', en: 'AI workflow' }, corify: 48, insurfox: 88 },
  { capability: { de: 'Operational UW', en: 'Operational underwriting' }, corify: 38, insurfox: 84 },
  { capability: { de: 'Platform Integration', en: 'Platform integration' }, corify: 72, insurfox: 90 }
]

const strategicPoints = [
  { name: { de: 'Industrial Data Backbone', en: 'Industrial data backbone' }, overlap: 42, value: 90 },
  { name: { de: 'Fleet RFP Integration', en: 'Fleet RFP integration' }, overlap: 55, value: 83 },
  { name: { de: 'Marketplace Threat', en: 'Marketplace threat' }, overlap: 76, value: 45 },
  { name: { de: 'Ecosystem Connector', en: 'Ecosystem connector' }, overlap: 50, value: 79 },
  { name: { de: 'Competitive Expansion Risk', en: 'Competitive expansion risk' }, overlap: 82, value: 40 }
]

const riskHeatmap = [
  { label: { de: 'Marketplace Disintermediation', en: 'Marketplace disintermediation' }, likelihood: 4, impact: 5 },
  { label: { de: 'Broker Dependency Shift', en: 'Broker dependency shift' }, likelihood: 4, impact: 4 },
  { label: { de: 'Data Ownership Issues', en: 'Data ownership issues' }, likelihood: 3, impact: 5 },
  { label: { de: 'Hypoport Ecosystem Leverage', en: 'Hypoport ecosystem leverage' }, likelihood: 3, impact: 4 },
  { label: { de: 'Platform Power Concentration', en: 'Platform power concentration' }, likelihood: 3, impact: 4 }
]

const buildFeatures: BuildFeatureRow[] = [
  {
    feature: { de: 'Structured Risk Object Model', en: 'Structured risk object model' },
    evaluation: { de: 'Als Industrial Mode im Brokerfox-Wizard integrierbar.', en: 'Can be integrated as Industrial Mode in Brokerfox wizard.' },
    effort: { de: 'Hoch', en: 'High' },
    strategicRisk: { de: 'Mittel', en: 'Medium' },
    recommendation: { de: 'Empfohlen (phasenweise)', en: 'Recommended (phased)' }
  },
  {
    feature: { de: 'Marketplace Simulation Layer', en: 'Marketplace simulation layer' },
    evaluation: { de: 'Mehrfachangebot-Vergleich als Brokerfox-Modul umsetzbar.', en: 'Multi-offer comparison can be built as Brokerfox module.' },
    effort: { de: 'Hoch', en: 'High' },
    strategicRisk: { de: 'Mittel-Hoch', en: 'Medium-high' },
    recommendation: { de: 'Bedingt empfohlen', en: 'Conditionally recommended' }
  },
  {
    feature: { de: 'Standardized RFP Engine', en: 'Standardized RFP engine' },
    evaluation: { de: 'Exportierbarer strukturierter Risk-File-Generator ist technisch machbar.', en: 'Exportable structured risk file generator is technically feasible.' },
    effort: { de: 'Mittel-Hoch', en: 'Medium-high' },
    strategicRisk: { de: 'Mittel', en: 'Medium' },
    recommendation: { de: 'Empfohlen', en: 'Recommended' }
  }
]

const boardOptions = [
  { option: 'A', label: { de: 'Ignore - MGA Build fokussieren', en: 'Ignore - focus MGA build' }, risk: 3, control: 5, capital: 2, speed: 4, upside: 2 },
  { option: 'B', label: { de: 'Integration als Datenpartner', en: 'Integrate as data partner' }, risk: 2, control: 3, capital: 3, speed: 3, upside: 4 },
  { option: 'C', label: { de: 'Eigenes Industrial Marketplace-Modul bauen', en: 'Build competing industrial marketplace module' }, risk: 4, control: 5, capital: 5, speed: 1, upside: 4 },
  { option: 'D', label: { de: 'Strategische Kollaboration / API Integration', en: 'Strategic collaboration / API integration' }, risk: 3, control: 3, capital: 3, speed: 3, upside: 5 }
]

const sourceList = [
  'https://corify.de',
  'https://www.corify.de/',
  'Public insurance press coverage (marketplace/industrial placement context)',
  'Hypoport ecosystem background (public corporate context)',
  'Internal Insurfox model assumptions'
]

const corifyContacts: ContactRow[] = [
  {
    name: 'Artur Reimer',
    role: { de: 'Chief Executive Officer', en: 'Chief Executive Officer' },
    focus: { de: 'Gesamtstrategie, Partnerschaften, Marktpositionierung', en: 'Overall strategy, partnerships, market positioning' },
    contactPath: { de: 'Kontaktformular auf corify.de', en: 'Contact form on corify.de' },
    source: 'https://www.corify.de/'
  },
  {
    name: 'Gerhard Kremer',
    role: { de: 'Head of Sales', en: 'Head of Sales' },
    focus: { de: 'Go-to-Market, Vertrieb, Makler-/Versichererzugang', en: 'Go-to-market, sales, broker/insurer access' },
    contactPath: { de: 'Kontaktformular auf corify.de', en: 'Contact form on corify.de' },
    source: 'https://www.corify.de/'
  },
  {
    name: 'Sebastian Titze',
    role: { de: 'Chief Technology Officer', en: 'Chief Technology Officer' },
    focus: { de: 'Technologie, Plattformarchitektur, Produktumsetzung', en: 'Technology, platform architecture, product execution' },
    contactPath: { de: 'Kontaktformular auf corify.de', en: 'Contact form on corify.de' },
    source: 'https://www.corify.de/'
  },
  {
    name: 'Sonja Bürgle',
    role: { de: 'Head of Business Operations', en: 'Head of Business Operations' },
    focus: { de: 'Operatives Modell, Prozesssteuerung, Ausführung', en: 'Operating model, process governance, delivery' },
    contactPath: { de: 'Kontaktformular auf corify.de', en: 'Contact form on corify.de' },
    source: 'https://www.corify.de/'
  }
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

export default function CorifyAnalysisPage() {
  const { lang } = useI18n()
  const l = lang === 'de' ? 'de' : 'en'

  const coverageData = capabilityCoverage.map((row) => ({
    capability: bi(row.capability, l),
    corify: row.corify,
    insurfox: row.insurfox
  }))

  const scatterData = strategicPoints.map((row) => ({
    name: bi(row.name, l),
    overlap: row.overlap,
    value: row.value
  }))

  function handleExportPdf() {
    const previousTitle = document.title
    document.title = 'Corify_Strategic_Market_Analysis_Insurfox'
    window.print()
    window.setTimeout(() => {
      document.title = previousTitle
    }, 700)
  }

  return (
    <section className="page" style={{ gap: '1.25rem', background: '#ffffff', paddingTop: '1rem' }}>
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 10mm; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .corify-print-hide { display: none !important; }
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', display: 'grid', gap: '1rem' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <Header
              title={bi({ de: 'Corify Strategische Marktanalyse & Vergleich mit Insurfox', en: 'Corify Strategic Market Analysis & Comparison with Insurfox' }, l)}
              subtitle={bi({ de: 'Industrieller Versicherungsmarktplatz vs. digitaler MGA-, Broker- und Infrastrukturansatz', en: 'Industrial Insurance Marketplace vs Digital MGA, Broker & Insurance Infrastructure' }, l)}
              titleColor="#0f172a"
              subtitleColor="#475569"
            />
            <div className="corify-print-hide" style={{ position: 'sticky', top: 84 }}>
              <Button size="sm" onClick={handleExportPdf}>{bi({ de: 'Executive Report herunterladen (PDF)', en: 'Download Executive Report (PDF)' }, l)}</Button>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: 'Management-Zusammenfassung', en: 'Executive Summary' }, l)}>
          <div style={{ display: 'grid', gap: '0.55rem', color: '#334155', lineHeight: 1.65 }}>
            <p style={{ margin: 0 }}>{bi({ de: 'Corify ist als digitale Industrieversicherungs-Marktplattform positioniert und fokussiert standardisierte Risikodaten (CROM), strukturierte RFP-Prozesse und transparentes Matching zwischen Maklern und Versicherern.', en: 'Corify is positioned as a digital industrial insurance marketplace focused on standardized risk data (CROM), structured RFP processes, and transparent matching between brokers and insurers.' }, l)}</p>
            <p style={{ margin: 0 }}>{bi({ de: 'Im Hypoport-InsurTech-Umfeld liegt der Schwerpunkt auf Datenrückgrat, Platzierungseffizienz und Vergleichbarkeit von Angeboten.', en: 'Within the Hypoport InsurTech context, the core focus is data backbone, placement efficiency, and offer transparency.' }, l)}</p>
            <p style={{ margin: 0 }}>{bi({ de: 'Insurfox verfolgt ein Hybridmodell als MGA + Broker + IaaS-Plattform mit operativer Underwriting- und Claims-Ausführung inklusive KI-gestützter Workflows.', en: 'Insurfox pursues a hybrid MGA + broker + IaaS platform model with operational underwriting and claims execution, including AI-driven workflows.' }, l)}</p>
            <p style={{ margin: 0 }}>{bi({ de: 'Strategische Kernfrage: Ist Corify für Insurfox Wettbewerber, Infrastruktur-Layer oder komplementärer Ökosystem-Partner?', en: 'Core strategic question: Is Corify for Insurfox a competitor, infrastructure layer, or ecosystem complement?' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: 'Unternehmensprofile', en: 'Company Profiles' }, l)}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1rem' }}>
            <Card title="Corify">
              <ul style={listStyle}>
                {companyFacts.corify.map((fact) => (
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
                  <th style={thStyle}>Corify</th>
                  <th style={thStyle}>Insurfox</th>
                </tr>
              </thead>
              <tbody>
                {capabilityRows.map((row) => (
                  <tr key={row.category.en}>
                    <td style={tdStrongStyle}>{bi(row.category, l)}</td>
                    <td style={tdStyle}>{bi(row.corify, l)}</td>
                    <td style={tdStyle}>{bi(row.insurfox, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)', gap: '1rem' }}>
          <Card title={bi({ de: 'Capability Coverage', en: 'Capability Coverage' }, l)}>
            <div style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={coverageData} margin={{ top: 10, right: 12, left: 0, bottom: 38 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="capability" stroke="#475569" angle={-12} textAnchor="end" height={64} />
                  <YAxis stroke="#475569" domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="corify" name="Corify" fill="#1d4ed8" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="insurfox" name="Insurfox" fill="#d4380d" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title={bi({ de: 'Strategische Positionierungsmatrix', en: 'Strategic Positioning Matrix' }, l)}>
            <div style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 12, left: 10, bottom: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" dataKey="overlap" name={bi({ de: 'Market Overlap', en: 'Market overlap' }, l)} domain={[20, 90]} stroke="#475569" />
                  <YAxis type="number" dataKey="value" name={bi({ de: 'Strategischer Wert für Insurfox', en: 'Strategic value to Insurfox' }, l)} domain={[30, 95]} stroke="#475569" />
                  <Tooltip labelFormatter={(_, payload) => (payload?.[0]?.payload?.name ?? '') as string} />
                  <Scatter data={scatterData} fill="#0f172a" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <p style={noteStyle}>{bi({ de: 'Interpretation: Corify stärkt Insurfox vor allem als Daten- und RFP-Backbone. Das Disintermediationsrisiko steigt, wenn Corify tiefer in Distribution oder Execution expandiert.', en: 'Interpretation: Corify mainly strengthens Insurfox as a data and RFP backbone. Disintermediation risk rises if Corify expands deeper into distribution or execution.' }, l)}</p>
          </Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1rem' }}>
          <Card title={bi({ de: 'Synergien', en: 'Synergies' }, l)}>
            <ul style={listStyle}>
              <li>{bi({ de: 'Strukturierter Risikodaten-Feed für Brokerfox.', en: 'Structured risk data feed into Brokerfox.' }, l)}</li>
              <li>{bi({ de: 'RFP-UI-Muster für industrielle Platzierungslogik.', en: 'RFP UI patterns for industrial placement workflows.' }, l)}</li>
              <li>{bi({ de: 'Integration für industrielle Fleet-Ausschreibungen.', en: 'Integration path for industrial fleet tenders.' }, l)}</li>
              <li>{bi({ de: 'Datenstandardisierung als Underwriting-Enabler.', en: 'Data standardization as underwriting enabler.' }, l)}</li>
            </ul>
          </Card>
          <Card title={bi({ de: 'Risiken', en: 'Risks' }, l)}>
            <ul style={listStyle}>
              <li>{bi({ de: 'Marketplace-Disintermediation', en: 'Marketplace disintermediation' }, l)}</li>
              <li>{bi({ de: 'Verschiebung von Broker-Abhängigkeiten', en: 'Broker dependency shift' }, l)}</li>
              <li>{bi({ de: 'Datenhoheit und Ownership-Konflikte', en: 'Data ownership conflicts' }, l)}</li>
              <li>{bi({ de: 'Hypoport-Ecosystem-Hebel', en: 'Hypoport ecosystem leverage' }, l)}</li>
              <li>{bi({ de: 'Konzentration von Plattformmacht', en: 'Platform power concentration' }, l)}</li>
            </ul>
          </Card>
        </div>

        <Card title={bi({ de: 'Risikohitzekarte (Wahrscheinlichkeit x Auswirkung)', en: 'Risk Heatmap (Likelihood x Impact)' }, l)}>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {riskHeatmap.map((risk) => {
              const score = risk.likelihood * risk.impact
              return (
                <div key={risk.label.en} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 82px 82px 116px', gap: '0.55rem', alignItems: 'center' }}>
                  <div style={{ color: '#334155', fontSize: '0.87rem' }}>{bi(risk.label, l)}</div>
                  <div style={heatCellStyle}>{bi({ de: 'Wkt.', en: 'Lik.' }, l)}: {risk.likelihood}</div>
                  <div style={heatCellStyle}>{bi({ de: 'Imp.', en: 'Imp.' }, l)}: {risk.impact}</div>
                  <div style={{ ...heatCellStyle, color: '#fff', borderColor: 'transparent', background: toHeatColor(score) }}>
                    {bi({ de: 'Wert', en: 'Score' }, l)}: {score}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card title={bi({ de: 'Was Corify besser macht vs. was Insurfox besser macht', en: 'What Corify Does Better vs What Insurfox Does Better' }, l)}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1rem' }}>
            <Card title="Corify">
              <ul style={listStyle}>
                <li>{bi({ de: 'Strukturierter Industrie-RFP-Marktplatz', en: 'Structured industrial RFP marketplace' }, l)}</li>
                <li>{bi({ de: 'Standardisiertes Risikomodell über mehrere Versicherer', en: 'Standardized risk model across multiple insurers' }, l)}</li>
                <li>{bi({ de: 'Ecosystem-Rückenwind durch Hypoport-Kontext', en: 'Ecosystem backing in Hypoport context' }, l)}</li>
                <li>{bi({ de: 'Transparenter Mehrangebot-Vergleich', en: 'Transparent multi-offer comparison' }, l)}</li>
              </ul>
            </Card>
            <Card title="Insurfox">
              <ul style={listStyle}>
                <li>{bi({ de: 'Operative Prozesskontrolle', en: 'Operational control' }, l)}</li>
                <li>{bi({ de: 'Claims-Automatisierung und Execution', en: 'Claims automation and execution' }, l)}</li>
                <li>{bi({ de: 'KI-native Workflow-Ausführung', en: 'AI-native workflow execution' }, l)}</li>
                <li>{bi({ de: 'Hybrides MGA-Modell', en: 'Hybrid MGA model' }, l)}</li>
                <li>{bi({ de: 'Vertikaler Fokus auf Fleet, Logistics, Mobility', en: 'Vertical focus on fleet, logistics, mobility' }, l)}</li>
              </ul>
            </Card>
          </div>
        </Card>

        <Card title={bi({ de: 'Kann Insurfox dies selbst bauen? (Analytische Bewertung)', en: 'Can We Build This into Demos? (Analytical Assessment)' }, l)}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{bi({ de: 'Feature', en: 'Feature' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Feasible', en: 'Feasible' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Aufwand', en: 'Effort' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Strategisches Risiko', en: 'Strategic Risk' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Empfehlung', en: 'Recommendation' }, l)}</th>
                </tr>
              </thead>
              <tbody>
                {buildFeatures.map((row) => (
                  <tr key={row.feature.en}>
                    <td style={tdStrongStyle}>{bi(row.feature, l)}</td>
                    <td style={tdStyle}>{bi(row.evaluation, l)}</td>
                    <td style={tdStyle}>{bi(row.effort, l)}</td>
                    <td style={tdStyle}>{bi(row.strategicRisk, l)}</td>
                    <td style={tdStyle}>{bi(row.recommendation, l)}</td>
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
                  <th style={thStyle}>{bi({ de: 'Zeit', en: 'Time to market' }, l)}</th>
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
                    <td style={tdStyle}>{row.speed}</td>
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
                <Bar dataKey="speed" name={bi({ de: 'Time to Market', en: 'Time to market' }, l)} fill="#f59e0b" />
                <Bar dataKey="upside" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={bi({ de: 'Ansprechpartner (öffentlich, corify.de)', en: 'Contacts (public, corify.de)' }, l)}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.65rem' }}>
            {corifyContacts.map((contact) => (
              <div key={contact.name} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.65rem', background: '#f8fafc', display: 'grid', gap: '0.25rem' }}>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{contact.name}</div>
                <div style={{ color: '#334155', fontSize: '0.85rem' }}>{bi(contact.role, l)}</div>
                <div style={{ color: '#475569', fontSize: '0.82rem' }}>{bi(contact.focus, l)}</div>
                <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{bi(contact.contactPath, l)}</div>
                <a href={contact.source} target="_blank" rel="noreferrer" style={{ color: '#0ea5e9', fontSize: '0.8rem', textDecoration: 'none' }}>
                  {bi({ de: 'Quelle', en: 'Source' }, l)}
                </a>
              </div>
            ))}
          </div>
          <p style={{ ...noteStyle, marginTop: '0.6rem' }}>
            {bi(
              {
                de: 'Aus der öffentlichen Team-Sektion auf corify.de (Abruf: 20.02.2026). Kontaktdaten laufen über das Website-Formular.',
                en: 'From the public team section on corify.de (captured: 2026-02-20). Contact path is the website form.'
              },
              l
            )}
          </p>
        </Card>

        <Card title={bi({ de: 'Quellen & Annahmen', en: 'Sources & Assumptions' }, l)}>
          <ul style={listStyle}>
            {sourceList.map((item) => (
              <li key={item}>{item}</li>
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
