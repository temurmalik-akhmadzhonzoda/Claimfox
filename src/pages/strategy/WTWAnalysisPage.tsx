import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

type BiText = { de: string; en: string }

type ComparisonRow = {
  category: BiText
  wtw: BiText
  insurfox: BiText
}

const comparisonRows: ComparisonRow[] = [
  { category: { de: 'Kernangebot', en: 'Core Offering' }, wtw: { de: 'Globales Advisory-, Broking- und Solutions-Modell', en: 'Global advisory, broking, and solutions model' }, insurfox: { de: 'Intelligente Versicherungsinfrastruktur als IaaS-Plattform', en: 'Intelligent insurance infrastructure as an IaaS platform' } },
  { category: { de: 'Zielkunden', en: 'Target Customers' }, wtw: { de: 'Großunternehmen, Versicherer, internationale Programme', en: 'Large enterprises, insurers, and international programs' }, insurfox: { de: 'Versicherer, Makler, Flotten, Partnernetzwerke', en: 'Insurers, brokers, fleets, and partner networks' } },
  { category: { de: 'Technology Usage', en: 'Technology Usage' }, wtw: { de: 'Analytics-Plattformen und Beratungstechnologie', en: 'Analytics platforms and advisory technology' }, insurfox: { de: 'AI-native Workflows, FNOL, Vision-Scan, Orchestrierung', en: 'AI-native workflows, FNOL, vision scan, and orchestration' } },
  { category: { de: 'Data & Analytics', en: 'Data & Analytics' }, wtw: { de: 'Starke aktuarielle und kapitalseitige Modellierung', en: 'Strong actuarial and capital-side modeling' }, insurfox: { de: 'Echtzeit-Prozessdaten über modulare Lifecycle-Pipelines', en: 'Real-time process data across modular lifecycle pipelines' } },
  { category: { de: 'Underwriting Authority Support', en: 'Underwriting Authority Support' }, wtw: { de: 'Delegated Authority Beratung und Strukturierung', en: 'Delegated authority advisory and structuring' }, insurfox: { de: 'Regel- und Entscheidungsunterstützung in der Plattform', en: 'Rule and decision support within platform workflows' } },
  { category: { de: 'Distribution Partner Role', en: 'Distribution Partner Role' }, wtw: { de: 'Globaler Broker- und Capacity-Intermediär', en: 'Global broker and capacity intermediary' }, insurfox: { de: 'Digitaler Betriebs-Layer für Broker- und Carrier-Prozesse', en: 'Digital operating layer for broker and carrier processes' } },
  { category: { de: 'MGA Enablement Capability', en: 'MGA Enablement Capability' }, wtw: { de: 'Hoch: Capacity Access, Strukturierung, Governance', en: 'High: capacity access, structuring, and governance' }, insurfox: { de: 'Mittel-Hoch: technisches Enablement und Workflow Execution', en: 'Medium-high: technical enablement and workflow execution' } },
  { category: { de: 'Competitive Strengths', en: 'Competitive Strengths' }, wtw: { de: 'Skalierung, Marktzugang, Kapitalbeziehungen', en: 'Scale, market access, and capital relationships' }, insurfox: { de: 'Agilität, UX-Tiefe, schnelle Produktiteration', en: 'Agility, UX depth, and rapid product iteration' } },
  { category: { de: 'Weaknesses & Risks', en: 'Weaknesses & Risks' }, wtw: { de: 'Legacy-Komplexität und langsameres Innovationstempo', en: 'Legacy complexity and slower innovation pace' }, insurfox: { de: 'Frühe Phase, begrenzte Capacity-Historie', en: 'Early-stage maturity and limited capacity track record' } }
]

const revenueSplit = [
  { segment: 'Risk & Broking', value: 62 },
  { segment: 'Health, Wealth & Career', value: 38 }
]

const geoSplit = [
  { region: 'North America', value: 52 },
  { region: 'Europe', value: 30 },
  { region: 'Asia Pacific', value: 10 },
  { region: 'Rest of World', value: 8 }
]

const fitQuadrant = [
  { name: 'Capacity & Reinsurance Access', strength: 91, strategicValue: 90 },
  { name: 'MGA Structure Advisory', strength: 86, strategicValue: 88 },
  { name: 'Regulatory & Capital Advisory', strength: 92, strategicValue: 79 },
  { name: 'Technology Integration', strength: 67, strategicValue: 84 },
  { name: 'Pricing Analytics Support', strength: 81, strategicValue: 86 }
]

function getBi(value: BiText, lang: 'de' | 'en') {
  return lang === 'de' ? value.de : value.en
}

export default function WTWAnalysisPage() {
  const { lang } = useI18n()
  const l = lang === 'de' ? 'de' : 'en'

  const text = {
    title: getBi({ de: 'WTW (Willis Towers Watson) Strategic Analysis & Comparison with Insurfox', en: 'WTW (Willis Towers Watson) Strategic Analysis & Comparison with Insurfox' }, l),
    subtitle: getBi({ de: 'Advisory, Broking & Technology Solutions vs Intelligent Insurance Infrastructure', en: 'Advisory, Broking & Technology Solutions vs Intelligent Insurance Infrastructure' }, l),
    export: getBi({ de: 'Executive Report herunterladen (PDF)', en: 'Download Executive Report (PDF)' }, l),
    executiveSummary: getBi({ de: 'Executive Summary', en: 'Executive Summary' },
      l),
    companyProfile: getBi({ de: 'Unternehmensprofil', en: 'Company Profile' }, l),
    comparison: getBi({ de: 'WTW vs Insurfox Vergleich', en: 'WTW vs Insurfox Comparison' }, l),
    deepDive: getBi({ de: 'WTW Deep Dive – Value Propositions', en: 'WTW Deep Dive – Value Propositions' }, l),
    fit: getBi({ de: 'Strategic Fit für Insurfox', en: 'Strategic Fit for Insurfox' }, l),
    swot: getBi({ de: 'SWOT Analyse', en: 'SWOT Analysis' }, l),
    recommendations: getBi({ de: 'Empfehlungen & Decision Path', en: 'Recommendations & Decision Path' }, l),
    segmentRevenue: getBi({ de: 'Umsatzmix nach Segment (%)', en: 'Revenue split by segment (%)' }, l),
    geoRevenue: getBi({ de: 'Geografische Umsatzverteilung (%)', en: 'Geographic revenue distribution (%)' }, l),
    quadrant: getBi({ de: 'WTW Strength vs Strategic Value to Insurfox', en: 'WTW Strength vs Strategic Value to Insurfox' }, l),
    category: getBi({ de: 'Kategorie', en: 'Category' }, l)
  }

  function handleExportPdf() {
    const previousTitle = document.title
    document.title = 'WTW_Strategic_Analysis_Insurfox'
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
          .wtw-print-hide { display: none !important; }
        }
      `}</style>
      <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', display: 'grid', gap: '1.1rem' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <Header title={text.title} subtitle={text.subtitle} titleColor="#0f172a" subtitleColor="#475569" />
            <div className="wtw-print-hide" style={{ position: 'sticky', top: 84 }}>
              <Button size="sm" onClick={handleExportPdf}>{text.export}</Button>
            </div>
          </div>
        </Card>

        <Card title={text.executiveSummary}>
          <div style={{ display: 'grid', gap: '0.7rem', color: '#334155', lineHeight: 1.65 }}>
            <p style={{ margin: 0 }}>{getBi({ de: 'WTW ist ein globales Advisory-, Broking- und Solutions-Unternehmen mit tief verankerter Versicherungsexpertise und starker Analytics-Orientierung.', en: 'WTW is a global advisory, broking, and solutions firm with deep insurance expertise and strong analytics capabilities.' }, l)}</p>
            <p style={{ margin: 0 }}>{getBi({ de: 'Das Leistungsportfolio umfasst Risikobroking, Versicherungsberatung, Technologie- und Datenlösungen sowie kapitalnahe Strukturierung.', en: 'Its offering spans risk broking, insurance consulting, technology and data solutions, and capital-oriented structuring.' }, l)}</p>
            <p style={{ margin: 0 }}>{getBi({ de: 'Für Insurfox ist WTW strategisch relevant als potenzieller MGA-Enabler, Capacity-Partner und Co-Pilot für regulatorisch belastbare Skalierung.', en: 'For Insurfox, WTW is strategically relevant as a potential MGA enabler, capacity partner, and co-pilot for regulatory-grade scaling.' }, l)}</p>
            <p style={{ margin: 0 }}>{getBi({ de: 'Empfehlung: ein gestuftes Partnerschaftsmodell mit Capacity-Dialog, Delegated-Authority-Blueprint und selektiver Co-Creation starten.', en: 'Recommendation: launch a phased partnership model with capacity dialogue, delegated-authority blueprinting, and selective co-creation.' }, l)}</p>
          </div>
        </Card>

        <Card title={text.companyProfile}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1rem' }}>
            <Card title="WTW Overview">
              <ul style={listStyle}>
                <li>{getBi({ de: 'Historische Wurzeln seit 1828, globales Operating Model.', en: 'Historic roots dating back to 1828 with a global operating model.' }, l)}</li>
                <li>{getBi({ de: 'Hauptsitz London (UK), börsennotiert an der NASDAQ.', en: 'Headquartered in London (UK), listed on NASDAQ.' }, l)}</li>
                <li>{getBi({ de: 'Mitarbeitende: rund 48.900 weltweit.', en: 'Employees: approximately 48,900 globally.' }, l)}</li>
                <li>{getBi({ de: 'Umsatz 2024: ca. USD 9,93 Mrd.', en: '2024 revenue: approximately USD 9.93B.' }, l)}</li>
                <li>{getBi({ de: 'Segmente: Risk & Broking sowie Health, Wealth & Career.', en: 'Segments: Risk & Broking and Health, Wealth & Career.' }, l)}</li>
                <li>{getBi({ de: 'Kernservices: Brokerage, Risk Management, Analytics, Consulting, Insurance Technology.', en: 'Core services: brokerage, risk management, analytics, consulting, and insurance technology.' }, l)}</li>
              </ul>
            </Card>
            <Card title="Insurfox Overview">
              <ul style={listStyle}>
                <li>{getBi({ de: 'Insurfox entwickelt eine digitale IaaS-Plattform für den gesamten Versicherungslifecycle.', en: 'Insurfox is building a digital IaaS platform across the insurance lifecycle.' }, l)}</li>
                <li>{getBi({ de: 'Module: Claimsfox, Brokerfox, Fleetfox, Partnerfox und AI Fox.', en: 'Modules: Claimsfox, Brokerfox, Fleetfox, Partnerfox, and AI Fox.' }, l)}</li>
                <li>{getBi({ de: 'Demo-fähige UX mit AI-gestützten Workflows (FNOL, Fotoscan, Risikoanalysen).', en: 'Demo-ready UX with AI-assisted workflows (FNOL, photo scan, risk analytics).' }, l)}</li>
                <li>{getBi({ de: 'Positionierung: intelligenter Infrastruktur-Layer zwischen Vertrieb, Underwriting, Claims und Partnernetzwerk.', en: 'Positioning: intelligent infrastructure layer across distribution, underwriting, claims, and partner execution.' }, l)}</li>
              </ul>
            </Card>
          </div>
        </Card>

        <Card title={text.comparison}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{text.category}</th>
                  <th style={thStyle}>WTW</th>
                  <th style={thStyle}>Insurfox</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.category.en}>
                    <td style={tdStrongStyle}>{getBi(row.category, l)}</td>
                    <td style={tdStyle}>{getBi(row.wtw, l)}</td>
                    <td style={tdStyle}>{getBi(row.insurfox, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title={text.deepDive}>
          <div style={{ display: 'grid', gap: '0.9rem' }}>
            <div style={{ display: 'grid', gap: '0.35rem' }}>
              <h3 style={subHeadingStyle}>A) {getBi({ de: 'Global Insurance Broking & Risk', en: 'Global Insurance Broking & Risk' }, l)}</h3>
              <p style={{ margin: 0, color: '#334155' }}>{getBi({ de: 'WTW bietet konsultatives Broking, Specialty-Line-Kompetenz und internationale Risiko-Programmsteuerung mit hoher Marktdurchdringung.', en: 'WTW provides consultative broking, specialty-line depth, and global program execution with broad market penetration.' }, l)}</p>
            </div>
            <div style={{ display: 'grid', gap: '0.35rem' }}>
              <h3 style={subHeadingStyle}>B) {getBi({ de: 'Insurance Consulting & Technology', en: 'Insurance Consulting & Technology' }, l)}</h3>
              <p style={{ margin: 0, color: '#334155' }}>{getBi({ de: 'Die Beratung verbindet versicherungsspezifisches Operating-Model-Design mit Analytics- und Technologieplattformen für Carrier und Corporates.', en: 'Its consulting model combines insurance operating-model design with analytics and technology platforms for carriers and corporates.' }, l)}</p>
            </div>
            <div style={{ display: 'grid', gap: '0.35rem' }}>
              <h3 style={subHeadingStyle}>C) {getBi({ de: 'Analytics & Capital Solutions', en: 'Analytics & Capital Solutions' }, l)}</h3>
              <p style={{ margin: 0, color: '#334155' }}>{getBi({ de: 'WTW unterstützt Finanzmodellierung, Kapitaloptimierung und regulatorische Reporting-Anforderungen für anspruchsvolle Programme.', en: 'WTW supports financial modeling, capital optimization, and regulatory reporting requirements for complex programs.' }, l)}</p>
            </div>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1rem' }}>
          <Card title={text.segmentRevenue}>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueSplit}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="segment" stroke="#475569" />
                  <YAxis stroke="#475569" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="%" fill="#d4380d" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title={text.geoRevenue}>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={geoSplit}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="region" stroke="#475569" />
                  <YAxis stroke="#475569" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="%" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card title={text.fit}>
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 12, left: 10, bottom: 12 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" dataKey="strength" name={getBi({ de: 'WTW Strength', en: 'WTW Strength' }, l)} domain={[40, 100]} stroke="#475569" />
                <YAxis type="number" dataKey="strategicValue" name={getBi({ de: 'Strategischer Wert für Insurfox', en: 'Strategic Value to Insurfox' }, l)} domain={[40, 100]} stroke="#475569" />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  formatter={(value: number, key: string) => [String(value), key === 'strength' ? getBi({ de: 'WTW Strength', en: 'WTW Strength' }, l) : getBi({ de: 'Strategischer Wert', en: 'Strategic Value' }, l)]}
                  labelFormatter={(_, payload) => (payload?.[0]?.payload?.name ?? '') as string}
                />
                <Scatter data={fitQuadrant} fill="#f97316" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div style={{ marginTop: '0.65rem', color: '#334155', fontSize: '0.88rem' }}>{text.quadrant}</div>
        </Card>

        <Card title={text.swot}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1rem' }}>
            <Card title="WTW">
              <ul style={listStyle}>
                <li><strong>{getBi({ de: 'Stärken:', en: 'Strengths:' }, l)}</strong> {getBi({ de: 'Globales Netzwerk, Analytics-Kompetenz, Zugang zu Kapital und Capacity.', en: 'Global network, analytics depth, access to capital and capacity.' }, l)}</li>
                <li><strong>{getBi({ de: 'Schwächen:', en: 'Weaknesses:' }, l)}</strong> {getBi({ de: 'Große Legacy-Strukturen, teilweise geringere Innovationsgeschwindigkeit.', en: 'Large legacy structure and potentially slower innovation cycles.' }, l)}</li>
                <li><strong>{getBi({ de: 'Chancen:', en: 'Opportunities:' }, l)}</strong> {getBi({ de: 'Embedded-Broking-Modelle und digitale Plattformkooperationen.', en: 'Embedded broking models and digital platform partnerships.' }, l)}</li>
                <li><strong>{getBi({ de: 'Risiken:', en: 'Threats:' }, l)}</strong> {getBi({ de: 'Wettbewerb (Aon, Marsh McLennan) und regulatorische Komplexität.', en: 'Competitive pressure (Aon, Marsh McLennan) and regulatory complexity.' }, l)}</li>
              </ul>
            </Card>
            <Card title="Insurfox">
              <ul style={listStyle}>
                <li><strong>{getBi({ de: 'Stärken:', en: 'Strengths:' }, l)}</strong> {getBi({ de: 'Plattformagilität, UX-Exzellenz, AI-Fokus.', en: 'Platform agility, UX excellence, and AI focus.' }, l)}</li>
                <li><strong>{getBi({ de: 'Schwächen:', en: 'Weaknesses:' }, l)}</strong> {getBi({ de: 'Frühe Wachstumsphase, derzeit keine eigene Capacity.', en: 'Early-stage scaling and no proprietary capacity today.' }, l)}</li>
                <li><strong>{getBi({ de: 'Chancen:', en: 'Opportunities:' }, l)}</strong> {getBi({ de: 'MGA + digitales Underwriting + Claims-Automation als integriertes Modell.', en: 'MGA + digital underwriting + claims automation as an integrated model.' }, l)}</li>
                <li><strong>{getBi({ de: 'Risiken:', en: 'Threats:' }, l)}</strong> {getBi({ de: 'Incumbent-Druck und Kapital-/Execution-Constraints.', en: 'Incumbent pressure and capital/execution constraints.' }, l)}</li>
              </ul>
            </Card>
          </div>
        </Card>

        <Card title={text.recommendations}>
          <div style={{ display: 'grid', gap: '0.65rem', color: '#334155', lineHeight: 1.6 }}>
            <p style={{ margin: 0 }}>{getBi({ de: '1) Primärmodell: Capacity-Partnerschaft mit klar definiertem Delegated-Authority-Pilot und governance-fester Datenkette.', en: '1) Primary model: capacity partnership with a clearly defined delegated-authority pilot and governance-ready data chain.' }, l)}</p>
            <p style={{ margin: 0 }}>{getBi({ de: '2) WTW-Commitment-Metriken: FNOL-throughput, AI-Decision-Quality, Leakage-Reduktion, SLA-Stabilität, Audit-Readiness.', en: '2) WTW commitment metrics: FNOL throughput, AI decision quality, leakage reduction, SLA stability, and audit readiness.' }, l)}</p>
            <p style={{ margin: 0 }}>{getBi({ de: '3) Timeline (90-180 Tage): Discovery, Blueprint, Sandbox-Integration, Pilot-Go-Live, Capacity Committee.', en: '3) Timeline (90-180 days): discovery, blueprint, sandbox integration, pilot go-live, and capacity committee review.' }, l)}</p>
            <p style={{ margin: 0 }}>{getBi({ de: '4) Risk Checkpoints: Regulatorik, Daten- und Modellgovernance, Delegation Scope, Kumulkontrolle.', en: '4) Risk checkpoints: regulatory alignment, data/model governance, delegation scope, and accumulation controls.' }, l)}</p>
          </div>
        </Card>
      </div>
    </section>
  )
}

const listStyle = {
  margin: 0,
  paddingLeft: '1.1rem',
  display: 'grid',
  gap: '0.4rem',
  color: '#334155',
  lineHeight: 1.5
}

const subHeadingStyle = {
  margin: 0,
  fontSize: '1rem',
  color: '#0f172a'
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse' as const,
  fontSize: '0.9rem'
}

const headRowStyle = {
  background: '#f8fafc',
  color: '#0f172a'
}

const thStyle = {
  textAlign: 'left' as const,
  padding: '0.65rem 0.7rem',
  borderBottom: '1px solid #e2e8f0',
  fontWeight: 700,
  fontSize: '0.82rem'
}

const tdStyle = {
  padding: '0.6rem 0.7rem',
  borderBottom: '1px solid #eef2f7',
  verticalAlign: 'top' as const,
  color: '#334155'
}

const tdStrongStyle = {
  ...tdStyle,
  fontWeight: 700,
  color: '#0f172a'
}
