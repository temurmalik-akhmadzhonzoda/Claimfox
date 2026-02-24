import { type CSSProperties } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

type Lang = 'de' | 'en'
type BiText = { de: string; en: string }

function bi(text: BiText, lang: Lang) {
  return lang === 'de' ? text.de : text.en
}

const lossRatioTrend = [
  { month: 'Jan', lossRatio: 61 },
  { month: 'Feb', lossRatio: 63 },
  { month: 'Mär', lossRatio: 66 },
  { month: 'Apr', lossRatio: 64 },
  { month: 'Mai', lossRatio: 62 }
]

const portfolioMixData = [
  { line: { de: 'Flotte', en: 'Fleet' }, value: 45 },
  { line: { de: 'Cargo', en: 'Cargo' }, value: 35 },
  { line: { de: 'Komposit', en: 'Composite' }, value: 20 }
]

const aiConfidenceOverride = [
  { caseLabel: 'Case A', confidence: 92, override: 0 },
  { caseLabel: 'Case B', confidence: 68, override: 1 },
  { caseLabel: 'Case C', confidence: 74, override: 0 }
]

const authorityBands = [
  {
    role: { de: 'Underwriter', en: 'Underwriter' },
    limit: { de: 'bis zu 250.000 € Exposure', en: 'up to €250k exposure' },
    width: '35%',
    color: '#94a3b8'
  },
  {
    role: { de: 'Senior Underwriter', en: 'Senior Underwriter' },
    limit: { de: 'bis zu 1 Mio. € Exposure', en: 'up to €1M exposure' },
    width: '62%',
    color: '#64748b'
  },
  {
    role: { de: 'Chief Underwriting Officer (MGA)', en: 'Chief Underwriting Officer (MGA)' },
    limit: { de: 'unbegrenzt / strategische Ausnahmen', en: 'unlimited / strategic exceptions' },
    width: '100%',
    color: '#0f172a'
  }
]

const sectionAnchors: { id: string; label: BiText }[] = [
  { id: 'executive-role-definition', label: { de: '1. Executive-Rollendefinition', en: '1. Executive Role Definition' } },
  { id: 'insurfox-role-context', label: { de: '2. Insurfox-spezifischer Kontext', en: '2. Insurfox-Specific Role Context' } },
  { id: 'capital-and-risk-responsibility', label: { de: '3. Kapital- und Risikoverantwortung', en: '3. Capital & Risk Responsibility' } },
  { id: 'authority-corridor', label: { de: '4. Authority Corridor', en: '4. Authority Corridor Visualization' } },
  { id: 'kpi-dashboard', label: { de: '5. KPI-Dashboard', en: '5. KPI Dashboard' } },
  { id: 'decision-scenarios', label: { de: '6. Realistische Entscheidungsszenarien', en: '6. Realistic Decision Scenarios' } },
  { id: 'ai-governance', label: { de: '7. AI Governance', en: '7. AI Governance' } },
  { id: 'risk-profile', label: { de: '8. Risikoprofil', en: '8. Risk Profile Visualization' } },
  { id: 'structural-criticality', label: { de: '9. Strukturelle Bedeutung', en: '9. Why This Role Is Structurally Critical for Insurfox' } }
]

export default function CuoMgaRolePage() {
  const navigate = useNavigate()
  const { lang } = useI18n()
  const l: Lang = lang === 'de' ? 'de' : 'en'

  const referralOverrideData = [
    { metric: bi({ de: 'Referral-Quote', en: 'Referral Rate' }, l), value: 18 },
    { metric: bi({ de: 'AI-Override-Quote', en: 'AI Override Rate' }, l), value: 7 },
    { metric: bi({ de: 'Ausnahmefälle', en: 'Exception Cases' }, l), value: 4 }
  ]

  const riskRadarData = [
    { metric: bi({ de: 'Kapitalrisiko', en: 'Capital Risk' }, l), score: 4 },
    { metric: bi({ de: 'Regulatorisches Risiko', en: 'Regulatory Risk' }, l), score: 3 },
    { metric: bi({ de: 'Portfolio-Volatilität', en: 'Portfolio Volatility' }, l), score: 4 },
    { metric: bi({ de: 'Reputationsrisiko', en: 'Reputation Risk' }, l), score: 3 },
    { metric: bi({ de: 'Modellrisiko', en: 'Model Risk' }, l), score: 3 }
  ]

  function handlePrint() {
    const oldTitle = document.title
    document.title = bi({ de: 'CUO_MGA_Rollenprofil', en: 'CUO_MGA_Role_Governance' }, l)
    window.print()
    window.setTimeout(() => {
      document.title = oldTitle
    }, 700)
  }

  return (
    <section className="page" style={{ gap: '1.25rem', background: '#fff', paddingTop: '1rem' }}>
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 10mm; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .print-hide { display: none !important; }
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', display: 'grid', gap: '1rem' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <Header
              title={bi({ de: 'Chief Underwriting Officer (MGA) – Executive-Rollendefinition', en: 'Chief Underwriting Officer (MGA) – Executive Role Definition' }, l)}
              subtitle={bi({ de: 'Inside Insurfox / Rollen / Chief Underwriting Officer (MGA)', en: 'Inside Insurfox / Roles / Chief Underwriting Officer (MGA)' }, l)}
              titleColor="#0f172a"
              subtitleColor="#475569"
            />
            <div className="print-hide" style={{ display: 'grid', gap: '0.45rem' }}>
              <Button size="sm" onClick={handlePrint}>{bi({ de: 'Als PDF drucken', en: 'Print as PDF' }, l)}</Button>
              <Button size="sm" variant="secondary" onClick={() => navigate('/inside-insurfox/roles')}>
                {bi({ de: 'Zur Rollenübersicht', en: 'Back to Roles Overview' }, l)}
              </Button>
            </div>
          </div>

          <div className="print-hide" style={{ marginTop: '0.7rem', fontSize: '0.84rem', color: '#334155', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <Link to="/inside-insurfox">Inside Insurfox</Link>
            <span>/</span>
            <Link to="/inside-insurfox/roles">{bi({ de: 'Rollen', en: 'Roles' }, l)}</Link>
            <span>/</span>
            <span>Chief Underwriting Officer (MGA)</span>
          </div>

          <div className="print-hide" style={{ marginTop: '0.8rem', display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {sectionAnchors.map((s) => (
              <a key={s.id} href={`#${s.id}`} style={anchorStyle}>{bi(s.label, l)}</a>
            ))}
          </div>
        </Card>

        <Card title={bi({ de: '1. Executive-Rollendefinition', en: '1. Executive Role Definition' }, l)}>
          <div id="executive-role-definition">
            <p style={pStyle}>
              {bi(
                {
                  de: 'Der Chief Underwriting Officer (CUO) trägt in der Versicherungswirtschaft die Gesamtverantwortung für Underwriting-Qualität, Profitabilität des Portfolios und die Disziplin der Risikoannahme. In der klassischen Rolle definiert der CUO Risikoappetit, Zeichnungsrichtlinien, Preisleitplanken und Eskalationspfade.',
                  en: 'In insurance, the Chief Underwriting Officer (CUO) carries executive accountability for underwriting quality, portfolio profitability, and disciplined risk acceptance. Classically, the CUO defines risk appetite, underwriting standards, pricing corridors, and escalation pathways.'
                },
                l
              )}
            </p>
            <p style={{ ...pStyle, marginTop: '0.55rem' }}>
              {bi(
                {
                  de: 'Im Carrier-Modell steuert der CUO das Underwriting auf der eigenen Bilanz. Im MGA-Modell arbeitet der CUO innerhalb delegierter Zeichnungsvollmachten von Kapazitätsgebern und muss vertragliche Grenzen, Referral-Trigger und Treaty-Vorgaben konsequent einhalten. Kapitalverantwortung, Governance und Authority Design sind deshalb zentrale Kernaufgaben.',
                  en: 'In a carrier model, the CUO manages underwriting on the insurer balance sheet. In an MGA model, the CUO operates under delegated underwriting authority from capacity providers and must enforce contractual limits, referral triggers, and treaty constraints. Capital responsibility, governance discipline, and authority design are therefore core duties.'
                },
                l
              )}
            </p>
          </div>
        </Card>

        <Card title={bi({ de: '2. Insurfox-spezifischer Kontext', en: '2. Insurfox-Specific Role Context' }, l)}>
          <div id="insurfox-role-context">
            <p style={pStyle}>
              {bi(
                {
                  de: 'Bei Insurfox agiert der CUO in einem Hybridmodell aus MGA, Broker und IaaS-Plattform. Die Rolle verbindet brokerseitige Marktbearbeitung, MGA-Zeichnungssteuerung und plattformbasierte Daten- und Prozesskontrolle über alle Mandantenebenen.',
                  en: 'At Insurfox, the CUO operates in a hybrid model across MGA, broker, and IaaS platform roles. The function connects broker-side market execution, MGA underwriting control, and platform-grade data and process governance across tenant layers.'
                },
                l
              )}
            </p>
            <p style={{ ...pStyle, marginTop: '0.55rem' }}>
              {bi(
                {
                  de: 'Die tägliche Zusammenarbeit erfolgt mit Pricing Actuary, Portfolio Manager, AI Governance Officer, Reinsurance Manager und Head of Claims. Entscheidungen sind datengetrieben und zeitnah, bleiben jedoch immer menschlich verantwortet und governance-konform dokumentiert.',
                  en: 'Day-to-day coordination includes Pricing Actuary, Portfolio Manager, AI Governance Officer, Reinsurance Manager, and Head of Claims. Decisions are real-time and data-driven, but accountability remains human and governance-documented.'
                },
                l
              )}
            </p>
          </div>
        </Card>

        <Card title={bi({ de: '3. Kapital- und Risikoverantwortung', en: '3. Capital & Risk Responsibility' }, l)}>
          <div id="capital-and-risk-responsibility">
            <p style={pStyle}>
              {bi(
                {
                  de: 'Der CUO steuert die Auswirkungen auf Schadenquote und Combined Ratio und ist damit zentral für die Stabilität der technischen Marge. Durch konsequente Auswahlqualität, Pricing-Disziplin und Exception-Control wird Kapital effizient eingesetzt und Volatilität reduziert.',
                  en: 'The CUO steers loss ratio and combined ratio outcomes and is therefore critical to technical margin stability. Through disciplined selection quality, pricing control, and exception governance, capital is deployed more efficiently and volatility is reduced.'
                },
                l
              )}
            </p>
            <p style={{ ...pStyle, marginTop: '0.55rem' }}>
              {bi(
                {
                  de: 'Aggregation Management und Treaty-Abhängigkeiten sind entscheidend: Ein einzelnes Risiko kann technisch akzeptabel sein, muss aber dennoch abgelehnt oder referiert werden, wenn Konzentrationsgrenzen, Rückversicherungsbedingungen oder Kapazitätsgrenzen überschritten sind.',
                  en: 'Aggregation management and treaty dependency are decisive: an individual risk may appear technically acceptable, yet still requires decline or referral when concentration limits, reinsurance conditions, or capacity boundaries are breached.'
                },
                l
              )}
            </p>
          </div>
        </Card>

        <Card title={bi({ de: '4. Authority Corridor', en: '4. Authority Corridor Visualization' }, l)}>
          <div id="authority-corridor" style={{ display: 'grid', gap: '0.65rem' }}>
            {authorityBands.map((band) => (
              <div key={band.role.en} style={{ display: 'grid', gap: '0.35rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.8rem', flexWrap: 'wrap' }}>
                  <strong style={{ color: '#0f172a' }}>{bi(band.role, l)}</strong>
                  <span style={{ color: '#475569', fontSize: '0.85rem' }}>{bi(band.limit, l)}</span>
                </div>
                <div style={{ background: '#e2e8f0', borderRadius: 999, height: 14 }}>
                  <div style={{ width: band.width, height: '100%', borderRadius: 999, background: band.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title={bi({ de: '5. KPI-Dashboard', en: '5. KPI Dashboard' }, l)}>
          <div id="kpi-dashboard" style={chartGridStyle}>
            <div style={chartCardStyle}>
              <h3 style={chartTitleStyle}>{bi({ de: 'Verlauf Schadenquote', en: 'Loss Ratio Trend' }, l)}</h3>
              <div style={chartWrapStyle}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lossRatioTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="lossRatio" stroke="#0f172a" strokeWidth={2} name={bi({ de: 'Schadenquote', en: 'Loss Ratio' }, l)} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={chartCardStyle}>
              <h3 style={chartTitleStyle}>{bi({ de: 'Referral- und Override-Quote', en: 'Referral Rate vs Override Rate' }, l)}</h3>
              <div style={chartWrapStyle}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={referralOverrideData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#334155" name={bi({ de: 'Wert', en: 'Value' }, l)} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={chartCardStyle}>
              <h3 style={chartTitleStyle}>{bi({ de: 'Portfolio-Mix', en: 'Portfolio Mix' }, l)}</h3>
              <div style={chartWrapStyle}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={portfolioMixData.map((entry) => ({ ...entry, lineLabel: bi(entry.line, l) }))} dataKey="value" nameKey="lineLabel" outerRadius={80}>
                      {portfolioMixData.map((entry, idx) => (
                        <Cell key={entry.line.en} fill={['#0f172a', '#334155', '#64748b'][idx]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '6. Realistische Entscheidungsszenarien', en: '6. Realistic Decision Scenarios' }, l)}>
          <div id="decision-scenarios" style={{ display: 'grid', gap: '0.75rem' }}>
            <div style={scenarioCardStyle}>
              <h3 style={subHeadingStyle}>{bi({ de: 'Szenario 1: Hochwertiges Flottenrisiko mit niedriger AI-Confidence', en: 'Scenario 1: High-value fleet risk with low AI confidence' }, l)}</h3>
              <p style={noteStyle}><strong>{bi({ de: 'Input:', en: 'Inputs:' }, l)}</strong> {bi({ de: 'Flotteneinreichung mit hohem Versicherungswert; AI empfiehlt Annahme unterhalb des Confidence-Mindestwerts.', en: 'Fleet submission with high insured value; AI suggests accept below minimum confidence threshold.' }, l)}</p>
              <p style={noteStyle}><strong>{bi({ de: 'Risikosignale:', en: 'Risk signals:' }, l)}</strong> {bi({ de: 'Segmentkonzentration bereits erhöht; Aggregationsgrenzen nähern sich dem Limit.', en: 'Segment concentration already elevated; aggregation limits nearing threshold.' }, l)}</p>
              <p style={noteStyle}><strong>{bi({ de: 'Entscheidung:', en: 'Final decision:' }, l)}</strong> {bi({ de: 'CUO übersteuert „accept“ und setzt einen konditionalen Referral mit verschärften Bedingungen.', en: 'CUO overrides accept and sets a conditional referral with tightened terms.' }, l)}</p>
              <p style={noteStyle}><strong>{bi({ de: 'Kapitalwirkung:', en: 'Capital implication:' }, l)}</strong> {bi({ de: 'Reduziert Konzentrationsvolatilität und schützt Treaty-Disziplin.', en: 'Reduces concentration volatility and preserves treaty discipline.' }, l)}</p>
            </div>

            <div style={scenarioCardStyle}>
              <h3 style={subHeadingStyle}>{bi({ de: 'Szenario 2: Cargo-Risiko mit geopolitischer Exponierung', en: 'Scenario 2: Cargo risk with geopolitical exposure' }, l)}</h3>
              <p style={noteStyle}><strong>{bi({ de: 'Input:', en: 'Inputs:' }, l)}</strong> {bi({ de: 'Transportstrecke durch instabilen Korridor; AI klassifiziert das Risiko als moderat.', en: 'Cargo route intersects an unstable corridor; AI classifies risk as moderate.' }, l)}</p>
              <p style={noteStyle}><strong>{bi({ de: 'Risikosignale:', en: 'Risk signals:' }, l)}</strong> {bi({ de: 'Exogene Ereignisrisiken sind im Modell nur teilweise abgebildet.', en: 'Exogenous event risks are only partly represented in the model baseline.' }, l)}</p>
              <p style={noteStyle}><strong>{bi({ de: 'Entscheidung:', en: 'Final decision:' }, l)}</strong> {bi({ de: 'CUO referiert den Fall zur erweiterten Prüfung und Kapazitätsabstimmung.', en: 'CUO refers the case for enhanced review and capacity alignment.' }, l)}</p>
              <p style={noteStyle}><strong>{bi({ de: 'Kapitalwirkung:', en: 'Capital implication:' }, l)}</strong> {bi({ de: 'Begrenzt Tail-Risk und erhöht die Treaty-Kompatibilität in Stressszenarien.', en: 'Limits tail-risk and increases treaty compatibility under stress scenarios.' }, l)}</p>
            </div>

            <div style={scenarioCardStyle}>
              <h3 style={subHeadingStyle}>{bi({ de: 'Szenario 3: Pricing außerhalb des Korridors', en: 'Scenario 3: Pricing outside corridor' }, l)}</h3>
              <p style={noteStyle}><strong>{bi({ de: 'Input:', en: 'Inputs:' }, l)}</strong> {bi({ de: 'AI schlägt 480.000 € Prämie vor; Broker fordert zusätzlichen Nachlass.', en: 'AI suggests €480k premium; broker requests additional discount.' }, l)}</p>
              <p style={noteStyle}><strong>{bi({ de: 'Risikosignale:', en: 'Risk signals:' }, l)}</strong> {bi({ de: 'Nachlass würde die technische Marge unter den Zielkorridor drücken.', en: 'Discount would push technical margin below target corridor.' }, l)}</p>
              <p style={noteStyle}><strong>{bi({ de: 'Entscheidung:', en: 'Final decision:' }, l)}</strong> {bi({ de: 'CUO lehnt den Out-of-Corridor-Discount ab und hält Pricing-Disziplin.', en: 'CUO rejects out-of-corridor discount and maintains pricing discipline.' }, l)}</p>
              <p style={noteStyle}><strong>{bi({ de: 'Kapitalwirkung:', en: 'Capital implication:' }, l)}</strong> {bi({ de: 'Stabilisiert die Underwriting-Marge und verhindert adverse Selektion.', en: 'Stabilizes underwriting margin and prevents adverse selection drift.' }, l)}</p>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '7. AI Governance', en: '7. AI Governance' }, l)}>
          <div id="ai-governance">
            <p style={pStyle}>
              {bi(
                {
                  de: 'Der CUO entwickelt keine AI-Modelle. Die Rolle definiert Override-Schwellen, minimale Confidence-Werte, Human-in-the-Loop-Policy und Eskalations-Trigger. Damit bleibt AI ein Beschleuniger der Entscheidungsqualität, aber kein unkontrollierter Entscheidungsträger.',
                  en: 'The CUO does not build AI models. The role defines override thresholds, minimum confidence levels, human-in-the-loop policy, and escalation triggers. This keeps AI as an accelerator of decision quality, not an uncontrolled authority source.'
                },
                l
              )}
            </p>
            <div style={{ ...chartCardStyle, marginTop: '0.65rem' }}>
              <h3 style={chartTitleStyle}>{bi({ de: 'AI-Confidence vs. Override-Beispiel', en: 'AI Confidence vs Override Example' }, l)}</h3>
              <div style={chartWrapStyle}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={aiConfidenceOverride}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="caseLabel" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="confidence" fill="#334155" name={bi({ de: 'Confidence', en: 'Confidence' }, l)} />
                    <Bar dataKey="override" fill="#b91c1c" name={bi({ de: 'Override', en: 'Override' }, l)} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '8. Risikoprofil', en: '8. Risk Profile Visualization' }, l)}>
          <div id="risk-profile" style={chartCardStyle}>
            <h3 style={chartTitleStyle}>{bi({ de: 'CUO-Risikoprofil (Skala 1–5)', en: 'CUO Risk Profile (Scale 1–5)' }, l)}</h3>
            <div style={chartWrapStyle}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={riskRadarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <Radar dataKey="score" stroke="#0f172a" fill="#334155" fillOpacity={0.5} name={bi({ de: 'Score', en: 'Score' }, l)} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '9. Warum diese Rolle strukturell kritisch für Insurfox ist', en: '9. Why This Role Is Structurally Critical for Insurfox' }, l)}>
          <div id="structural-criticality">
            <p style={pStyle}>
              {bi(
                {
                  de: 'Der CUO ist der zentrale Steuerpunkt für Profitabilitätskontrolle im Hybridmodell aus MGA, Broker und IaaS. Die Rolle übersetzt Strategie in belastbare Underwriting-Grenzen und schützt damit die technische Ergebnisqualität.',
                  en: 'The CUO is the structural control point for profitability discipline in a hybrid MGA, broker, and IaaS model. The role translates strategy into enforceable underwriting boundaries that protect technical results.'
                },
                l
              )}
            </p>
            <p style={{ ...pStyle, marginTop: '0.55rem' }}>
              {bi(
                {
                  de: 'Sie sichert AI-Accountability durch klare Override-Regeln, stärkt die Kapazitätsglaubwürdigkeit gegenüber Versicherern und Rückversicherern, hält Broker-Disziplin im Pricing-Korridor und stabilisiert Kapitalergebnisse über Konzentrations- und Treaty-Steuerung.',
                  en: 'It secures AI accountability through explicit override rules, strengthens capacity credibility with insurers and reinsurers, enforces broker discipline within pricing corridors, and stabilizes capital outcomes through concentration and treaty governance.'
                },
                l
              )}
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}

const pStyle: CSSProperties = {
  margin: 0,
  color: '#334155',
  fontSize: '0.9rem',
  lineHeight: 1.62
}

const noteStyle: CSSProperties = {
  margin: 0,
  color: '#334155',
  fontSize: '0.84rem',
  lineHeight: 1.55
}

const subHeadingStyle: CSSProperties = {
  margin: '0 0 0.35rem',
  color: '#0f172a',
  fontSize: '0.92rem'
}

const anchorStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 999,
  padding: '0.25rem 0.55rem',
  color: '#0f172a',
  fontSize: '0.76rem',
  textDecoration: 'none',
  background: '#f8fafc'
}

const chartGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '0.7rem'
}

const chartCardStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 10,
  padding: '0.65rem',
  background: '#f8fafc'
}

const chartTitleStyle: CSSProperties = {
  margin: '0 0 0.45rem',
  color: '#0f172a',
  fontSize: '0.9rem'
}

const chartWrapStyle: CSSProperties = {
  width: '100%',
  height: 240
}

const scenarioCardStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 10,
  padding: '0.65rem',
  background: '#f8fafc',
  display: 'grid',
  gap: '0.35rem'
}
