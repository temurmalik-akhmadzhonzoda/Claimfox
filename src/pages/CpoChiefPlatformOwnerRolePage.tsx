import { type CSSProperties, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
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

type Lang = 'de' | 'en'
type BiText = { de: string; en: string }

function bi(value: BiText, lang: Lang) {
  return lang === 'de' ? value.de : value.en
}

const anchors: { id: string; label: BiText }[] = [
  { id: 'executive-role', label: { de: '1. Executive-Rollendefinition', en: '1. Executive Role Definition' } },
  { id: 'organization', label: { de: '2. Organisatorische Position', en: '2. Organizational Position' } },
  { id: 'value-architecture', label: { de: '3. Plattform-Value-Architektur', en: '3. Platform Value Architecture' } },
  { id: 'decision-matrix', label: { de: '4. Strategische Entscheidungsmatrix', en: '4. Strategic Decision Matrix' } },
  { id: 'kpi-dashboard', label: { de: '5. KPI-Dashboard', en: '5. KPI Dashboard' } },
  { id: 'scenarios', label: { de: '6. Strategische Entscheidungsszenarien', en: '6. Strategic Decision Scenarios' } },
  { id: 'governance-boundary', label: { de: '7. Governance-Grenzen', en: '7. Governance Boundary Chart' } },
  { id: 'risk-profile', label: { de: '8. Risikoprofil', en: '8. Risk Profile' } },
  { id: 'ai-interaction', label: { de: '9. AI-Interaktion', en: '9. Interaction With AI' } },
  { id: 'criticality', label: { de: '10. Warum die Rolle kritisch ist', en: '10. Why This Role Is Structurally Critical' } }
]

const valueChain: BiText[] = [
  { de: 'Markt', en: 'Market' },
  { de: 'Makler', en: 'Broker' },
  { de: 'Underwriting', en: 'Underwriting' },
  { de: 'Schaden', en: 'Claims' },
  { de: 'Partnernetzwerk', en: 'Partner Network' },
  { de: 'Rückversicherung', en: 'Reinsurance' },
  { de: 'Renewal', en: 'Renewal' },
  { de: 'Daten-Feedback', en: 'Data Feedback' },
  { de: 'AI-Evolution', en: 'AI Evolution' }
]

const decisionScatter = [
  { id: 'cargo-eu', name: { de: 'Cargo-Ausbau EU', en: 'Cargo Expansion EU' }, x: 62, y: 84, fill: '#0f172a' },
  { id: 'gcc-fleet', name: { de: 'GCC Fleet Entry', en: 'GCC Fleet Entry' }, x: 78, y: 88, fill: '#334155' },
  { id: 'ai-bind', name: { de: 'AI Auto-Bind Feature', en: 'AI Auto-Bind Feature' }, x: 85, y: 76, fill: '#64748b' },
  { id: 'broker-api', name: { de: 'Neue Broker-API-Layer', en: 'New Broker API Layer' }, x: 54, y: 72, fill: '#94a3b8' }
]

const revenueByModule = [
  { module: 'Brokerfox', value: 7.1 },
  { module: 'Claimsfox', value: 5.8 },
  { module: 'Fleetfox', value: 6.6 },
  { module: 'Partnerfox', value: 3.4 },
  { module: 'AI Fox', value: 4.2 }
]

const expansionProgress = [
  { period: 'Q1', progress: 24 },
  { period: 'Q2', progress: 35 },
  { period: 'Q3', progress: 47 },
  { period: 'Q4', progress: 59 },
  { period: 'Q5', progress: 71 }
]

const adoptionByModule = [
  { module: 'Brokerfox', adoption: 86 },
  { module: 'Claimsfox', adoption: 78 },
  { module: 'Fleetfox', adoption: 74 },
  { module: 'Partnerfox', adoption: 66 },
  { module: 'AI Fox', adoption: 62 }
]

const integrationScore = [
  { month: 'Jan', score: 68 },
  { month: 'Feb', score: 71 },
  { month: 'Mär', score: 73 },
  { month: 'Apr', score: 76 },
  { month: 'Mai', score: 79 }
]

const initiativeCompletion = [
  { month: 'Jan', rate: 61 },
  { month: 'Feb', rate: 64 },
  { month: 'Mär', rate: 67 },
  { month: 'Apr', rate: 69 },
  { month: 'Mai', rate: 72 }
]

const boundaryRows: Array<{ area: BiText; owner: BiText; scope: BiText }> = [
  {
    area: { de: 'Plattformstrategie', en: 'Platform Strategy' },
    owner: { de: 'CPO', en: 'CPO' },
    scope: {
      de: 'Zielbild, Modulportfolio, internationale Priorisierung und Monetarisierungslogik.',
      en: 'Target model, module portfolio, international prioritization, and monetization logic.'
    }
  },
  {
    area: { de: 'Technische Architektur', en: 'Technical Architecture' },
    owner: { de: 'CTO', en: 'CTO' },
    scope: {
      de: 'Architekturprinzipien, Skalierung, Sicherheit und technische Delivery-Leitplanken.',
      en: 'Architecture principles, scaling, security, and technical delivery guardrails.'
    }
  },
  {
    area: { de: 'Risikoselektion', en: 'Risk Acceptance' },
    owner: { de: 'CUO', en: 'CUO' },
    scope: {
      de: 'Underwriting-Richtlinien, Authority-Korridore, Referral-Eskalation.',
      en: 'Underwriting policy, authority corridors, and referral escalation.'
    }
  },
  {
    area: { de: 'Claims-Governance', en: 'Claims Governance' },
    owner: { de: 'Head of Claims', en: 'Head of Claims' },
    scope: {
      de: 'Reservelogik, Schadensteuerung, Partner-SLA und Leakage-Kontrolle.',
      en: 'Reserve logic, claims steering, partner SLA, and leakage control.'
    }
  },
  {
    area: { de: 'Regulatorische Aufsicht', en: 'Regulatory Oversight' },
    owner: { de: 'Compliance & Risk Officer', en: 'Compliance & Risk Officer' },
    scope: {
      de: 'Regelwerkskonformität, Kontrollsystem und Eskalationsgovernance.',
      en: 'Regulatory conformity, control system, and escalation governance.'
    }
  },
  {
    area: { de: 'AI-Kontrolle', en: 'AI Control' },
    owner: { de: 'AI Governance Officer', en: 'AI Governance Officer' },
    scope: {
      de: 'Model-Release, Drift-Überwachung und Human-in-the-Loop-Regeln.',
      en: 'Model release, drift supervision, and human-in-the-loop rules.'
    }
  }
]

const riskProfile = [
  {
    level: { de: 'Sehr hoch', en: 'Very High' },
    items: {
      de: 'Strategische Fehlallokation, Marktpositionierungsrisiko',
      en: 'Strategic misalignment, market positioning risk'
    }
  },
  {
    level: { de: 'Hoch', en: 'High' },
    items: {
      de: 'Überexpansion, Kapitalüberdehnung',
      en: 'Over-expansion risk, capital overextension risk'
    }
  },
  {
    level: { de: 'Mittel', en: 'Medium' },
    items: {
      de: 'Produktfragmentierung bei mangelnder Modulharmonisierung',
      en: 'Product fragmentation from insufficient module harmonization'
    }
  }
]

export default function CpoChiefPlatformOwnerRolePage() {
  const navigate = useNavigate()
  const { lang } = useI18n()
  const l: Lang = lang === 'de' ? 'de' : 'en'

  function handlePrint() {
    const oldTitle = document.title
    document.title = bi(
      {
        de: 'CPO_Chief_Platform_Owner_Rollenprofil',
        en: 'CPO_Chief_Platform_Owner_Role_Profile'
      },
      l
    )
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
              title={bi(
                {
                  de: 'CPO (Chief Platform Owner) – Strategisches Rollenprofil',
                  en: 'CPO (Chief Platform Owner) – Strategic Role Profile'
                },
                l
              )}
              subtitle={bi(
                {
                  de: 'Inside Insurfox / Rollen / CPO – Chief Platform Owner',
                  en: 'Inside Insurfox / Roles / CPO – Chief Platform Owner'
                },
                l
              )}
              titleColor="#0f172a"
              subtitleColor="#475569"
            />
            <div className="print-hide" style={{ display: 'grid', gap: '0.45rem' }}>
              <Button size="sm" onClick={handlePrint}>
                {bi({ de: 'Als PDF drucken', en: 'Print as PDF' }, l)}
              </Button>
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
            <span>CPO – Chief Platform Owner</span>
          </div>

          <div className="print-hide" style={{ marginTop: '0.8rem', display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {anchors.map((a) => (
              <a key={a.id} href={`#${a.id}`} style={anchorStyle}>
                {bi(a.label, l)}
              </a>
            ))}
          </div>
        </Card>

        <Card title={bi({ de: '1. Executive-Rollendefinition', en: '1. Executive Role Definition' }, l)}>
          <div id="executive-role" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Der CPO ist die oberste fachlich-strategische Autorität der Insurfox-Plattform. Die Rolle verantwortet Plattformvision, Modulportfoliostrategie, internationale Expansionsroadmap und die Integration von MGA-, Broker- und IaaS-Logik in ein konsistentes Operating Model.',
                  en: 'The CPO is the top-level business and strategic authority of the Insurfox platform. The role owns platform vision, module portfolio strategy, international expansion roadmap, and the integration of MGA, broker, and IaaS logic into one coherent operating model.'
                },
                l
              )}
            </p>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Der CPO definiert Monetarisierungsarchitektur, Priorisierung strategischer Produktlinien, domänenübergreifende Kohärenz und Marktpositionierung. Die Rolle ist ausdrücklich nicht CTO, kein Domain Product Owner, kein operativer Underwriter und kein Compliance-Controller.',
                  en: 'The CPO defines monetization architecture, strategic product-line prioritization, cross-domain coherence, and market positioning. This role is explicitly not the CTO, not a domain product owner, not an operational underwriter, and not a compliance controller.'
                },
                l
              )}
            </p>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Kernaussage: Der CPO bestimmt, was Insurfox strukturell wird und wie die Plattform als international skalierbares Versicherungsbetriebssystem am Markt auftritt.',
                  en: 'Core statement: the CPO defines what Insurfox becomes structurally and how the platform competes as an internationally scalable insurance operating system.'
                },
                l
              )}
            </p>
          </div>
        </Card>

        <Card title={bi({ de: '2. Organisatorische Position', en: '2. Organizational Position' }, l)}>
          <div id="organization" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Berichtslinie an CEO bzw. Board. Der CPO führt die Product-Owner-Linie und verantwortet die Governance des gesamten Modulportfolios auf Plattformebene.',
                  en: 'Reports to the CEO or board. The CPO leads all product owners and owns governance for the full module portfolio at platform level.'
                },
                l
              )}
            </p>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Enge Zusammenarbeit mit CTO (technische Realisierbarkeit), CUO (Underwriting-Ausrichtung), Head of Claims, Compliance & Risk Officer, AI Governance Officer und Reinsurance Manager. Der CPO verbindet diese Funktionen zu einer gemeinsamen strategischen Richtung.',
                  en: 'Works closely with the CTO (technical feasibility), CUO (underwriting alignment), Head of Claims, Compliance & Risk Officer, AI Governance Officer, and Reinsurance Manager. The CPO integrates these functions into one strategic direction.'
                },
                l
              )}
            </p>
          </div>
        </Card>

        <Card title={bi({ de: '3. Plattform-Value-Architektur', en: '3. Platform Value Architecture Diagram' }, l)}>
          <div id="value-architecture" style={{ display: 'grid', gap: '0.65rem' }}>
            <div style={flowWrapStyle}>
              {valueChain.map((step, idx) => (
                <div key={step.en} style={flowItemStyle}>
                  <div style={flowNumberStyle}>{idx + 1}</div>
                  <div style={flowLabelStyle}>{bi(step, l)}</div>
                  {idx < valueChain.length - 1 ? <div style={flowConnectorStyle} /> : null}
                </div>
              ))}
            </div>
            <p style={noteStyle}>
              {bi(
                {
                  de: 'Der CPO stellt die strategische Kohärenz entlang der gesamten Wertkette sicher: von Markt- und Distributionslogik über Underwriting und Claims bis zu Reinsurance, Renewal und AI-Weiterentwicklung.',
                  en: 'The CPO ensures strategic coherence across the full value chain: from market and distribution logic through underwriting and claims to reinsurance, renewal, and AI evolution.'
                },
                l
              )}
            </p>
          </div>
        </Card>

        <Card title={bi({ de: '4. Strategische Entscheidungsmatrix (2x2)', en: '4. Strategic Decision Matrix (2x2)' }, l)}>
          <div id="decision-matrix" style={{ display: 'grid', gap: '0.65rem' }}>
            <div style={{ height: 320, border: '1px solid #e2e8f0', borderRadius: 12, padding: '0.4rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 12, left: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="x" domain={[0, 100]} name={bi({ de: 'Regulatorische Komplexität', en: 'Regulatory Complexity' }, l)} />
                  <YAxis type="number" dataKey="y" domain={[0, 100]} name={bi({ de: 'Erlöspotenzial', en: 'Revenue Potential' }, l)} />
                  <Tooltip
                    formatter={(value: number) => `${value}`}
                    labelFormatter={(_, payload) => {
                      if (!payload?.length) return ''
                      const row = payload[0]?.payload as (typeof decisionScatter)[number]
                      return bi(row.name, l)
                    }}
                  />
                  <ReferenceLine x={50} stroke="#94a3b8" strokeDasharray="4 4" />
                  <ReferenceLine y={50} stroke="#94a3b8" strokeDasharray="4 4" />
                  <Scatter data={decisionScatter}>
                    {decisionScatter.map((entry) => (
                      <Cell key={entry.id} fill={entry.fill} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <p style={noteStyle}>
              {bi(
                {
                  de: 'Priorisierung durch den CPO folgt einem Portfolioansatz: Initiativen mit hoher Umsatzwirkung und vertretbarer regulatorischer Komplexität werden beschleunigt; High-Complexity-Initiativen erfordern eine gestufte Governance mit Compliance-, Capital- und Technology-Gates.',
                  en: 'CPO prioritization follows a portfolio approach: initiatives with high revenue impact and manageable regulatory complexity are accelerated; high-complexity initiatives require staged governance with compliance, capital, and technology gates.'
                },
                l
              )}
            </p>
          </div>
        </Card>

        <Card title={bi({ de: '5. KPI-Dashboard', en: '5. KPI Dashboard' }, l)}>
          <div id="kpi-dashboard" style={chartGridStyle}>
            <ChartCard title={bi({ de: 'Plattformerlöse nach Modul (EUR Mio.)', en: 'Platform Revenue by Module (EUR m)' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByModule}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="module" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0f172a" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Fortschritt internationale Expansion (%)', en: 'International Expansion Progress (%)' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={expansionProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="progress" stroke="#334155" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Modul-Adoptionsrate (%)', en: 'Module Adoption Rate (%)' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adoptionByModule}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="module" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="adoption" fill="#475569" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Cross-Module-Integrationsscore', en: 'Cross-Module Integration Score' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={integrationScore}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#64748b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Strategische Initiativen abgeschlossen (%)', en: 'Strategic Initiative Completion Rate (%)' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={initiativeCompletion}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" stroke="#0f172a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </Card>

        <Card title={bi({ de: '6. Realistische strategische Entscheidungsszenarien', en: '6. Realistic Strategic Decision Scenarios' }, l)}>
          <div id="scenarios" style={{ display: 'grid', gap: '0.7rem' }}>
            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 1: Eintritt in neue Jurisdiktion (GCC)', en: 'Scenario 1: Entering a new jurisdiction (GCC)' }, l)}
              context={bi({ de: 'Starker Nachfrageimpuls im Flottensegment, aber hohe regulatorische Anforderungen.', en: 'Strong fleet demand signal, but high regulatory requirements.' }, l)}
              stakeholders={bi({ de: 'CPO, CTO, Compliance, Reinsurance, lokale Brokerpartner.', en: 'CPO, CTO, compliance, reinsurance, local broker partners.' }, l)}
              capital={bi({ de: 'Kapitalbindung steigt durch Anlaufvolatilität und konservative Retention-Parameter.', en: 'Capital load increases due to launch volatility and conservative retention settings.' }, l)}
              governance={bi({ de: 'Stufenplan mit Regulierungs- und Capacity-Gates vor Marktfreigabe.', en: 'Phased plan with regulatory and capacity gates before market launch.' }, l)}
              decision={bi({ de: 'Gestaffelter Markteintritt mit begrenztem Produktumfang in Phase 1.', en: 'Phased market entry with limited product scope in phase 1.' }, l)}
            />

            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 2: Logistics Composite Launch', en: 'Scenario 2: Launching Logistics Composite product' }, l)}
              context={bi({ de: 'Kunden fordern gebündelte Deckung über Transport-, Sach- und Cyber-Risiken.', en: 'Clients request bundled coverage across transport, property, and cyber risk.' }, l)}
              stakeholders={bi({ de: 'CPO, CUO, Head of Claims, Pricing Actuary, Reinsurance Manager.', en: 'CPO, CUO, Head of Claims, Pricing Actuary, Reinsurance Manager.' }, l)}
              capital={bi({ de: 'Höhere Komplexität in Aggregation und Reservelogik, damit erhöhte Kapitalanforderung.', en: 'Higher aggregation and reserve complexity, leading to elevated capital demand.' }, l)}
              governance={bi({ de: 'Produktarchitektur nur mit klaren Authority-Corridors und Treaty-Abdeckung.', en: 'Product architecture only with clear authority corridors and treaty backing.' }, l)}
              decision={bi({ de: 'Launch mit klaren Segmentgrenzen und monatlicher Steering-Review.', en: 'Launch with strict segment boundaries and monthly steering review.' }, l)}
            />

            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 3: Proposal für AI Auto-Bind', en: 'Scenario 3: Auto-bind AI feature proposal' }, l)}
              context={bi({ de: 'Produktteam fordert höhere Conversion durch automatisiertes Binding.', en: 'Product team requests higher conversion via automated binding.' }, l)}
              stakeholders={bi({ de: 'CPO, AI Governance, CUO, Compliance, CTO.', en: 'CPO, AI Governance, CUO, Compliance, CTO.' }, l)}
              capital={bi({ de: 'Fehlsteuerung kann Loss Ratio und Kapitaleffizienz direkt beeinträchtigen.', en: 'Misclassification can directly affect loss ratio and capital efficiency.' }, l)}
              governance={bi({ de: 'Nur mit Human-in-the-Loop, Confidence-Schwellen und Override-Protokoll.', en: 'Allowed only with human-in-the-loop, confidence thresholds, and override protocol.' }, l)}
              decision={bi({ de: 'Pilot ohne Vollautomatisierung, anschließend Governance-basierte Skalierung.', en: 'Pilot without full autonomy, then governance-based scale-up.' }, l)}
            />

            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 4: Carrier fordert individuellen Workflow', en: 'Scenario 4: Carrier requests custom workflow' }, l)}
              context={bi({ de: 'Großer Carrier will proprietäre Prozesslogik außerhalb des Standardmodells.', en: 'Major carrier requests proprietary process logic outside the standard model.' }, l)}
              stakeholders={bi({ de: 'CPO, CTO, Carrier-Management, Product Owner, Compliance.', en: 'CPO, CTO, carrier management, product owner, compliance.' }, l)}
              capital={bi({ de: 'Kurzfristig Umsatzimpuls möglich, langfristig höhere Plattformkomplexität und Kosten.', en: 'Short-term revenue upside, long-term platform complexity and cost increase.' }, l)}
              governance={bi({ de: 'Plattformstandardisierung hat Vorrang vor kundenspezifischer Fragmentierung.', en: 'Platform standardization takes precedence over client-specific fragmentation.' }, l)}
              decision={bi({ de: 'Anforderung abgelehnt, stattdessen standardisierte API-Erweiterung angeboten.', en: 'Request declined; standardized API extension offered instead.' }, l)}
            />
          </div>
        </Card>

        <Card title={bi({ de: '7. Governance-Grenzen und Decision Ownership', en: '7. Governance Boundary Chart & Decision Ownership' }, l)}>
          <div id="governance-boundary" style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={thStyle}>{bi({ de: 'Entscheidungsfeld', en: 'Decision Domain' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Owner', en: 'Owner' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Abgrenzung', en: 'Boundary Definition' }, l)}</th>
                </tr>
              </thead>
              <tbody>
                {boundaryRows.map((row) => (
                  <tr key={row.area.en}>
                    <td style={tdStrongStyle}>{bi(row.area, l)}</td>
                    <td style={tdStyle}>{bi(row.owner, l)}</td>
                    <td style={tdStyle}>{bi(row.scope, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title={bi({ de: '8. Risikoprofil', en: '8. Risk Profile' }, l)}>
          <div id="risk-profile" style={{ display: 'grid', gap: '0.6rem' }}>
            {riskProfile.map((row) => (
              <div key={row.level.en} style={riskRowStyle}>
                <div style={riskLevelStyle}>{bi(row.level, l)}</div>
                <div style={{ color: '#334155' }}>{bi(row.items, l)}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title={bi({ de: '9. Interaktion mit AI', en: '9. Interaction With AI' }, l)}>
          <div id="ai-interaction" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Der CPO nutzt AI-Portfolio-Insights zur strategischen Steuerung von Wachstum, Produkt-Mix und Internationalisierung. Die Rolle trifft jedoch keine Model-Release-Entscheidungen und überschreibt keine Underwriting-Entscheidungen.',
                  en: 'The CPO consumes AI portfolio insights for strategic steering of growth, product mix, and internationalization. The role does not approve model releases and does not override underwriting decisions.'
                },
                l
              )}
            </p>
            <p style={noteStyle}>
              {bi(
                {
                  de: 'AI Interaction Level: strategisch konsumierend.',
                  en: 'AI Interaction Level: strategic consumer.'
                },
                l
              )}
            </p>
          </div>
        </Card>

        <Card title={bi({ de: '10. Warum diese Rolle strukturell kritisch ist', en: '10. Why This Role Is Structurally Critical' }, l)}>
          <div id="criticality" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Ohne CPO zerfällt die Plattformstrategie in unverbundene Modulinitiativen. Internationale Skalierung verlangsamt sich, Governance wird reaktiv und die strategische Verbindung zwischen Wachstum, Kapitalrealität und Betriebsmodell geht verloren.',
                  en: 'Without a CPO, platform strategy fragments into disconnected module initiatives. International scaling slows down, governance becomes reactive, and strategic alignment between growth, capital reality, and operating model degrades.'
                },
                l
              )}
            </p>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Der CPO ist das strukturelle Steuerzentrum für Kohärenz, Priorisierung und belastbare Investor- sowie Carrier-Story. Damit ist die Rolle der strategische Architekturkern von Insurfox.',
                  en: 'The CPO is the structural control center for coherence, prioritization, and a credible investor and carrier narrative. This makes the role the strategic architectural brain of Insurfox.'
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

function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={chartCardStyle}>
      <h3 style={chartTitleStyle}>{title}</h3>
      <div style={chartWrapStyle}>{children}</div>
    </div>
  )
}

function Scenario({
  lang,
  title,
  context,
  stakeholders,
  capital,
  governance,
  decision
}: {
  lang: Lang
  title: string
  context: string
  stakeholders: string
  capital: string
  governance: string
  decision: string
}) {
  return (
    <article style={scenarioStyle}>
      <h3 style={{ margin: 0, color: '#0f172a', fontSize: '0.95rem' }}>{title}</h3>
      <p style={scenarioTextStyle}><strong>{bi({ de: 'Strategischer Kontext:', en: 'Strategic Context:' }, lang)}</strong> {context}</p>
      <p style={scenarioTextStyle}><strong>{bi({ de: 'Stakeholder:', en: 'Stakeholders:' }, lang)}</strong> {stakeholders}</p>
      <p style={scenarioTextStyle}><strong>{bi({ de: 'Kapitalimplikation:', en: 'Capital Implication:' }, lang)}</strong> {capital}</p>
      <p style={scenarioTextStyle}><strong>{bi({ de: 'Governance-Aspekt:', en: 'Governance Consideration:' }, lang)}</strong> {governance}</p>
      <p style={scenarioTextStyle}><strong>{bi({ de: 'Entscheidungslogik:', en: 'Decision Rationale:' }, lang)}</strong> {decision}</p>
    </article>
  )
}

const pStyle: CSSProperties = {
  margin: 0,
  color: '#334155',
  lineHeight: 1.62,
  fontSize: '0.95rem'
}

const noteStyle: CSSProperties = {
  margin: 0,
  color: '#475569',
  fontSize: '0.87rem',
  lineHeight: 1.55
}

const anchorStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: 999,
  border: '1px solid #cbd5e1',
  color: '#1e293b',
  textDecoration: 'none',
  fontSize: '0.78rem',
  padding: '0.3rem 0.65rem',
  background: '#f8fafc'
}

const flowWrapStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
  gap: '0.55rem'
}

const flowItemStyle: CSSProperties = {
  position: 'relative',
  border: '1px solid #dbe3ef',
  borderRadius: 10,
  padding: '0.5rem 0.55rem',
  background: '#f8fafc',
  display: 'grid',
  gap: '0.3rem'
}

const flowNumberStyle: CSSProperties = {
  width: 20,
  height: 20,
  borderRadius: 999,
  background: '#0f172a',
  color: '#fff',
  fontSize: '0.72rem',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700
}

const flowLabelStyle: CSSProperties = {
  color: '#0f172a',
  fontSize: '0.83rem',
  fontWeight: 600,
  lineHeight: 1.35
}

const flowConnectorStyle: CSSProperties = {
  position: 'absolute',
  right: -8,
  top: '50%',
  width: 14,
  height: 2,
  background: '#94a3b8'
}

const chartGridStyle: CSSProperties = {
  display: 'grid',
  gap: '0.7rem',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
}

const chartCardStyle: CSSProperties = {
  border: '1px solid #e2e8f0',
  borderRadius: 10,
  padding: '0.5rem 0.55rem',
  background: '#fff'
}

const chartTitleStyle: CSSProperties = {
  margin: 0,
  color: '#0f172a',
  fontSize: '0.82rem',
  lineHeight: 1.3,
  minHeight: 34
}

const chartWrapStyle: CSSProperties = {
  width: '100%',
  height: 190,
  marginTop: '0.3rem'
}

const scenarioStyle: CSSProperties = {
  border: '1px solid #e2e8f0',
  borderRadius: 10,
  padding: '0.7rem 0.8rem',
  background: '#fff',
  display: 'grid',
  gap: '0.4rem'
}

const scenarioTextStyle: CSSProperties = {
  margin: 0,
  color: '#334155',
  fontSize: '0.89rem',
  lineHeight: 1.5
}

const tableStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.84rem'
}

const thStyle: CSSProperties = {
  textAlign: 'left',
  padding: '0.58rem 0.62rem',
  borderBottom: '1px solid #dbe3ef',
  color: '#0f172a',
  fontWeight: 700,
  whiteSpace: 'nowrap'
}

const tdStyle: CSSProperties = {
  padding: '0.55rem 0.62rem',
  borderBottom: '1px solid #e2e8f0',
  color: '#334155',
  verticalAlign: 'top',
  lineHeight: 1.45
}

const tdStrongStyle: CSSProperties = {
  ...tdStyle,
  color: '#0f172a',
  fontWeight: 600
}

const riskRowStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '0.8rem',
  alignItems: 'start',
  border: '1px solid #e2e8f0',
  borderRadius: 10,
  padding: '0.6rem 0.7rem'
}

const riskLevelStyle: CSSProperties = {
  color: '#0f172a',
  fontWeight: 700,
  fontSize: '0.86rem'
}
