import { type CSSProperties, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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

function bi(value: BiText, lang: Lang) {
  return lang === 'de' ? value.de : value.en
}

const anchors: { id: string; label: BiText }[] = [
  { id: 'executive-role', label: { de: '1. Executive-Rollendefinition', en: '1. Executive Role Definition' } },
  { id: 'organization', label: { de: '2. Organisatorische Position', en: '2. Organizational Position' } },
  { id: 'strategy', label: { de: '3. Strategische Verantwortung', en: '3. Strategic Responsibility' } },
  { id: 'distribution-flow', label: { de: '4. Distribution-Flow', en: '4. Distribution Flow Visualization' } },
  { id: 'kpi', label: { de: '5. KPI-Dashboard', en: '5. KPI Dashboard' } },
  { id: 'scenarios', label: { de: '6. Entscheidungsszenarien', en: '6. Realistic Decision Scenarios' } },
  { id: 'access', label: { de: '7. Systemzugriff & Befugnis', en: '7. System Access & Authority' } },
  { id: 'ai', label: { de: '8. AI-Interaktion', en: '8. AI Interaction' } },
  { id: 'escalation', label: { de: '9. Eskalationsmatrix', en: '9. Escalation Matrix' } },
  { id: 'risk', label: { de: '10. Risikoprofil', en: '10. Risk Profile' } },
  { id: 'criticality', label: { de: '11. Warum diese Rolle kritisch ist', en: '11. Why This Role Is Critical' } }
]

const conversionData = [
  { month: { de: 'Jan', en: 'Jan' }, value: 31 },
  { month: { de: 'Feb', en: 'Feb' }, value: 34 },
  { month: { de: 'Mär', en: 'Mar' }, value: 36 },
  { month: { de: 'Apr', en: 'Apr' }, value: 35 },
  { month: { de: 'Mai', en: 'May' }, value: 38 }
]

const onboardingData = [
  { segment: { de: 'Lokale Makler', en: 'Local Brokers' }, days: 6 },
  { segment: { de: 'Nationale Makler', en: 'National Brokers' }, days: 9 },
  { segment: { de: 'Internationale Makler', en: 'International Brokers' }, days: 15 }
]

const apiVolumeData = [
  { week: 'W1', calls: 12000 },
  { week: 'W2', calls: 13750 },
  { week: 'W3', calls: 15100 },
  { week: 'W4', calls: 14680 },
  { week: 'W5', calls: 16320 }
]

const premiumVolumeData = [
  { channel: { de: 'Broker-API', en: 'Broker API' }, eurM: 8.2 },
  { channel: { de: 'Portal-UI', en: 'Portal UI' }, eurM: 5.7 },
  { channel: { de: 'Strategische Partner', en: 'Strategic Partners' }, eurM: 4.9 }
]

const retentionData = [
  { quarter: 'Q1', rate: 82 },
  { quarter: 'Q2', rate: 84 },
  { quarter: 'Q3', rate: 83 },
  { quarter: 'Q4', rate: 86 }
]

const brokerQualityData = [
  { period: 'P1', quality: 73 },
  { period: 'P2', quality: 78 },
  { period: 'P3', quality: 76 },
  { period: 'P4', quality: 81 }
]

const distributionFlow: BiText[] = [
  { de: 'Broker-Onboarding', en: 'Broker Onboarding' },
  { de: 'Broker-Verifizierung', en: 'Broker Verification' },
  { de: 'API-Integration', en: 'API Integration' },
  { de: 'Risk Submission', en: 'Risk Submission' },
  { de: 'AI Pre-Triage', en: 'AI Pre-Triage' },
  { de: 'Underwriting', en: 'Underwriting' },
  { de: 'Bind', en: 'Bind' },
  { de: 'Claims Lifecycle', en: 'Claims Lifecycle' },
  { de: 'Renewal', en: 'Renewal' }
]

export default function BrokerPortalDirectorRolePage() {
  const navigate = useNavigate()
  const { lang } = useI18n()
  const l: Lang = lang === 'de' ? 'de' : 'en'

  function handlePrint() {
    const old = document.title
    document.title = bi({ de: 'Broker_Portal_Director_Rollenprofil', en: 'Broker_Portal_Director_Role_Profile' }, l)
    window.print()
    window.setTimeout(() => {
      document.title = old
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
              title={bi({ de: 'Broker Portal Director – Strategisches Rollenprofil', en: 'Broker Portal Director – Strategic Role Profile' }, l)}
              subtitle={bi({ de: 'Inside Insurfox / Rollen / Broker Portal Director', en: 'Inside Insurfox / Roles / Broker Portal Director' }, l)}
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
            <span>Broker Portal Director</span>
          </div>

          <div className="print-hide" style={{ marginTop: '0.8rem', display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {anchors.map((a) => (
              <a key={a.id} href={`#${a.id}`} style={anchorStyle}>{bi(a.label, l)}</a>
            ))}
          </div>
        </Card>

        <Card title={bi({ de: '1. Executive-Rollendefinition', en: '1. Executive Role Definition' }, l)}>
          <div id="executive-role" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Der Broker Portal Director verantwortet die strategische Ownership der Insurfox Broker Distribution Infrastructure: Onboarding-Architektur, Distribution Governance, Broker-Operating-Standards, API-Konnektivität, Funnel-Optimierung, Channel-Compliance und Market-Access-Governance.', en: 'The Broker Portal Director owns the strategic operation of the Insurfox broker distribution infrastructure: onboarding architecture, distribution governance, broker operating standards, API connectivity, funnel optimization, channel compliance, and market access governance.' }, l)}</p>
            <p style={pStyle}>{bi({ de: 'Die Rolle ist kein Broker in der Fallbearbeitung. Sie platziert keine Einzelrisiken, genehmigt keine Underwriting-Entscheidungen und reguliert keine Schäden. Sie steuert den Brokerkanal als Plattform-Ökosystem.', en: 'This role is not a broker execution role. It does not place individual risks, approve underwriting decisions, or settle claims. It governs the broker channel as a platform ecosystem.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '2. Organisatorische Position', en: '2. Organizational Position' }, l)}>
          <div id="organization" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Berichtslinie typischerweise an CCO oder – bei distribution-led Modell – direkt an den CEO. Enge Zusammenarbeit mit CUO, Head of Claims, Compliance Officer, AI Governance, Product Owner und DevOps für API-Integrationen.', en: 'Typically reports to the CCO or, in a distribution-led model, directly to the CEO. Works closely with CUO, Head of Claims, Compliance Officer, AI Governance, Product Owner, and DevOps for API integrations.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '3. Strategische Verantwortung', en: '3. Strategic Responsibility' }, l)}>
          <div id="strategy" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Die Rolle steuert, wie Makler auf Insurfox zugreifen, welche Datenschemata akzeptiert werden, wie Submissions standardisiert und in Märkte geroutet werden sowie wie SLA- und Performance-Transparenz kanalweit durchgesetzt wird. Zusätzlich verantwortet sie die Sichtbarkeit der Provisionsarchitektur.', en: 'The role controls how brokers access Insurfox, which data structures are accepted, how submissions are standardized and routed, and how SLA and performance transparency are enforced across the channel. It also governs commission architecture visibility.' }, l)}</p>
            <p style={pStyle}>{bi({ de: 'Business-Impact: Prämienwachstum, Conversion-Rate, Channel-Profitabilität und Distribution-Risk-Control.', en: 'Business impact: premium growth, conversion rate, channel profitability, and distribution risk control.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '4. Distribution-Flow', en: '4. Distribution Flow Visualization' }, l)}>
          <div id="distribution-flow" style={{ display: 'grid', gap: '0.7rem' }}>
            <div style={flowWrapStyle}>
              {distributionFlow.map((step, idx) => (
                <div key={step.en} style={flowItemStyle}>
                  <div style={flowNumberStyle}>{idx + 1}</div>
                  <div style={flowLabelStyle}>{bi(step, l)}</div>
                  {idx < distributionFlow.length - 1 ? <div style={flowConnectorStyle} /> : null}
                </div>
              ))}
            </div>
            <div style={highlightGridStyle}>
              <Highlight title={bi({ de: 'Onboarding-Standards', en: 'Onboarding Standards' }, l)} text={bi({ de: 'Verifizierung, Qualifikation, Rollenmodell', en: 'Verification, qualification, role model' }, l)} />
              <Highlight title={bi({ de: 'Submission-Qualität', en: 'Submission Quality Rules' }, l)} text={bi({ de: 'Pflichtfelder, Schema-Validierung, API-Kontrollen', en: 'Mandatory fields, schema validation, API controls' }, l)} />
              <Highlight title={bi({ de: 'Channel Controls', en: 'Channel Controls' }, l)} text={bi({ de: 'Routing-Logik, Pricing-Disziplin, Zugriffsstufen', en: 'Routing logic, pricing discipline, access tiers' }, l)} />
              <Highlight title={bi({ de: 'SLA-Governance', en: 'SLA Governance' }, l)} text={bi({ de: 'Reaktionszeit, Datenqualität, Eskalationsfristen', en: 'Response time, data quality, escalation timing' }, l)} />
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '5. KPI-Dashboard', en: '5. KPI Dashboard' }, l)}>
          <div id="kpi" style={chartGridStyle}>
            <ChartCard title={bi({ de: 'Submission-zu-Bind-Conversion', en: 'Submission to Bind Conversion Rate' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conversionData.map((d) => ({ ...d, label: bi(d.month, l) }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#0f172a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Broker-Onboarding-Zeit (Tage)', en: 'Broker Onboarding Time (days)' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={onboardingData.map((d) => ({ ...d, label: bi(d.segment, l) }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="days" fill="#334155" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'API-Nutzungsvolumen', en: 'API Usage Volume' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={apiVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="calls" stroke="#64748b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Channel-Premiumvolumen (EUR Mio.)', en: 'Channel Premium Volume (EUR m)' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={premiumVolumeData.map((d) => ({ ...d, label: bi(d.channel, l) }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="eurM" fill="#475569" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Renewal-Retention-Rate', en: 'Renewal Retention Rate' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={retentionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" stroke="#0f172a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </Card>

        <Card title={bi({ de: '6. Realistische Entscheidungsszenarien', en: '6. Realistic Decision Scenarios' }, l)}>
          <div id="scenarios" style={{ display: 'grid', gap: '0.7rem' }}>
            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 1: Onboarding scheitert am Compliance-Check', en: 'Scenario 1: Broker onboarding fails compliance check' }, l)}
              trigger={bi({ de: 'KYC-/Lizenznachweise unvollständig.', en: 'KYC/license evidence incomplete.' }, l)}
              decision={bi({ de: 'Zugang abgelehnt bis vollständige Nachweise vorliegen.', en: 'Access denied until full documentation is provided.' }, l)}
              commercial={bi({ de: 'Kurzfristig geringerer Zufluss, langfristig geringeres Channel-Risiko.', en: 'Short-term lower inflow, long-term lower channel risk.' }, l)}
              governance={bi({ de: 'Regulatorische Konsistenz und Auditierbarkeit bleiben intakt.', en: 'Regulatory consistency and auditability preserved.' }, l)}
            />
            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 2: Hoher Volumenbroker mit schwacher Datenqualität', en: 'Scenario 2: High-volume broker with low data quality' }, l)}
              trigger={bi({ de: 'Viele Submissions mit Validierungsfehlern und fehlenden Pflichtfeldern.', en: 'High submission volume with validation errors and missing required fields.' }, l)}
              decision={bi({ de: 'Verpflichtende Submission-Validierungsregeln und Staging-Queue.', en: 'Introduce mandatory submission validation and staging queue.' }, l)}
              commercial={bi({ de: 'Leicht geringere Geschwindigkeit, deutlich höhere Conversion-Qualität.', en: 'Slightly slower intake, significantly higher conversion quality.' }, l)}
              governance={bi({ de: 'Kanalstandardisierung und Datenintegrität werden stabilisiert.', en: 'Channel standardization and data integrity are stabilized.' }, l)}
            />
            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 3: Broker drückt unter Pricing-Schwelle', en: 'Scenario 3: Broker pushing below pricing threshold' }, l)}
              trigger={bi({ de: 'Wiederholte Out-of-Corridor-Anfragen im Brokerkanal.', en: 'Repeated out-of-corridor pricing requests in channel flow.' }, l)}
              decision={bi({ de: 'Governance-Enforcement, temporäre Restriktionen und Eskalation an CUO.', en: 'Enforce governance, apply temporary restrictions, escalate to CUO.' }, l)}
              commercial={bi({ de: 'Schützt Marge und reduziert adverse Selektion.', en: 'Protects margin and reduces adverse selection.' }, l)}
              governance={bi({ de: 'Klare Channel-Disziplin und konsistente Marktstandards.', en: 'Maintains channel discipline and market consistency.' }, l)}
            />
            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 4: Internationaler Broker fordert API-Zugang', en: 'Scenario 4: New international broker requesting API access' }, l)}
              trigger={bi({ de: 'Neue Jurisdiktion mit erweiterten Integrationsanforderungen.', en: 'New jurisdiction with extended integration requirements.' }, l)}
              decision={bi({ de: 'Integration Review + Security Audit vor Freischaltung.', en: 'Require integration review and security audit before enablement.' }, l)}
              commercial={bi({ de: 'Verzögerter Start, aber skalierbar sichere Expansion.', en: 'Delayed launch but secure and scalable expansion.' }, l)}
              governance={bi({ de: 'Cross-Border-Compliance und API-Sicherheitsniveau bleiben kontrolliert.', en: 'Cross-border compliance and API security posture remain controlled.' }, l)}
            />
          </div>
        </Card>

        <Card title={bi({ de: '7. Systemzugriff & Befugnis', en: '7. System Access & Authority' }, l)}>
          <div id="access" style={accessGridStyle}>
            <AccessPill label="Brokerfox" value={bi({ de: 'Administrative Oversight', en: 'Administrative Oversight' }, l)} color="#0f172a" />
            <AccessPill label={bi({ de: 'Reporting', en: 'Reporting' }, l)} value={bi({ de: 'Distribution Dashboards', en: 'Distribution Dashboards' }, l)} color="#334155" />
            <AccessPill label={bi({ de: 'Integrationskontrollen', en: 'Integration Controls' }, l)} value={bi({ de: 'API-Governance', en: 'API Governance' }, l)} color="#475569" />
            <AccessPill label={bi({ de: 'Provisionssicht', en: 'Commission Reporting View' }, l)} value={bi({ de: 'Transparenz & Monitoring', en: 'Transparency & Monitoring' }, l)} color="#64748b" />
            <AccessPill label={bi({ de: 'Keine Underwriting-Freigabe', en: 'No Underwriting Approval' }, l)} value={bi({ de: 'Nicht in der Rolle', en: 'Out of Role Scope' }, l)} color="#991b1b" />
            <AccessPill label={bi({ de: 'Keine Schadenregulierung', en: 'No Claims Settlement' }, l)} value={bi({ de: 'Nicht in der Rolle', en: 'Out of Role Scope' }, l)} color="#991b1b" />
          </div>
        </Card>

        <Card title={bi({ de: '8. AI-Interaktion', en: '8. AI Interaction' }, l)}>
          <div id="ai" style={{ display: 'grid', gap: '0.7rem' }}>
            <p style={pStyle}>{bi({ de: 'Der Broker Portal Director nutzt AI-Analytik für Conversion-Insights, Broker-Scoring und auffällige Submission-Muster. Die Rolle übersteuert keine fachlichen Underwriting-AI-Entscheidungen.', en: 'The Broker Portal Director consumes AI analytics for conversion insights, broker scoring, and abnormal submission behavior detection. The role does not override underwriting AI decisions.' }, l)}</p>
            <div style={chartCardStyle}>
              <h3 style={chartTitleStyle}>{bi({ de: 'Broker Risk Quality Index', en: 'Broker Risk Quality Index' }, l)}</h3>
              <div style={chartWrapStyle}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={brokerQualityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="quality" stroke="#0f172a" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '9. Eskalationsmatrix', en: '9. Escalation Matrix' }, l)}>
          <div id="escalation" style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>{bi({ de: 'Trigger', en: 'Trigger' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Eskalation an', en: 'Escalate to' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Zweck', en: 'Purpose' }, l)}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={tdStyle}>{bi({ de: 'Regulatorisches Channel-Risiko', en: 'Regulatory channel risk' }, l)}</td><td style={tdStyle}>{bi({ de: 'Compliance', en: 'Compliance' }, l)}</td><td style={tdStyle}>{bi({ de: 'Regelkonformität sicherstellen', en: 'Ensure rule conformance' }, l)}</td></tr>
                <tr><td style={tdStyle}>{bi({ de: 'Pricing-Disziplinbruch', en: 'Pricing discipline breach' }, l)}</td><td style={tdStyle}>CUO</td><td style={tdStyle}>{bi({ de: 'Korridor- und Marktlogik abstimmen', en: 'Align corridor and market logic' }, l)}</td></tr>
                <tr><td style={tdStyle}>{bi({ de: 'Schadenqualitätsrisiken', en: 'Claims quality concerns' }, l)}</td><td style={tdStyle}>{bi({ de: 'Head of Claims', en: 'Head of Claims' }, l)}</td><td style={tdStyle}>{bi({ de: 'Lifecycle-Qualität absichern', en: 'Protect lifecycle quality' }, l)}</td></tr>
                <tr><td style={tdStyle}>{bi({ de: 'API-Incident', en: 'API incident' }, l)}</td><td style={tdStyle}>DevOps</td><td style={tdStyle}>{bi({ de: 'Technische Stabilisierung', en: 'Technical stabilization' }, l)}</td></tr>
                <tr><td style={tdStyle}>{bi({ de: 'Channel-Konflikt', en: 'Channel conflict' }, l)}</td><td style={tdStyle}>CEO</td><td style={tdStyle}>{bi({ de: 'Strategische Entscheidung', en: 'Strategic decisioning' }, l)}</td></tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card title={bi({ de: '10. Risikoprofil', en: '10. Risk Profile' }, l)}>
          <div id="risk" style={riskGridStyle}>
            <RiskBox label={bi({ de: 'Reputationsrisiko', en: 'Reputational Risk' }, l)} level={bi({ de: 'Hoch', en: 'High' }, l)} color="#7f1d1d" />
            <RiskBox label={bi({ de: 'Distribution-Fraud-Risiko', en: 'Distribution Fraud Risk' }, l)} level={bi({ de: 'Hoch', en: 'High' }, l)} color="#7f1d1d" />
            <RiskBox label={bi({ de: 'Regulatorisches Channel-Risiko', en: 'Regulatory Channel Risk' }, l)} level={bi({ de: 'Hoch', en: 'High' }, l)} color="#7f1d1d" />
            <RiskBox label={bi({ de: 'Margen-Leakage', en: 'Financial Margin Leakage' }, l)} level={bi({ de: 'Mittel', en: 'Medium' }, l)} color="#9a3412" />
            <RiskBox label={bi({ de: 'Kapitalexponierung', en: 'Capital Exposure' }, l)} level={bi({ de: 'Niedrig', en: 'Low' }, l)} color="#166534" />
          </div>
        </Card>

        <Card title={bi({ de: '11. Warum diese Rolle kritisch ist', en: '11. Why This Role Is Critical' }, l)}>
          <div id="criticality" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Ohne Broker Portal Director gibt es keinen standardisierten Broker-Einstieg, keine Channel-Disziplin, keine systematische Conversion-Optimierung, keine belastbare Distribution Governance und keine skalierbare internationale Expansion. Die Rolle schützt Wachstum davor, chaotisch zu werden.', en: 'Without a Broker Portal Director there is no standardized broker entry, no channel discipline, no systematic conversion optimization, no robust distribution governance, and no scalable international expansion. The role protects growth from turning into chaos.' }, l)}</p>
          </div>
        </Card>
      </div>
    </section>
  )
}

function Highlight({ title, text }: { title: string; text: string }) {
  return (
    <div style={highlightStyle}>
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
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
  trigger,
  decision,
  commercial,
  governance
}: {
  lang: Lang
  title: string
  trigger: string
  decision: string
  commercial: string
  governance: string
}) {
  return (
    <div style={scenarioCardStyle}>
      <h3 style={subHeadingStyle}>{title}</h3>
      <p style={noteStyle}><strong>{bi({ de: 'Trigger:', en: 'Trigger:' }, lang)}</strong> {trigger}</p>
      <p style={noteStyle}><strong>{bi({ de: 'Entscheidung:', en: 'Decision:' }, lang)}</strong> {decision}</p>
      <p style={noteStyle}><strong>{bi({ de: 'Kommerzielle Wirkung:', en: 'Commercial impact:' }, lang)}</strong> {commercial}</p>
      <p style={noteStyle}><strong>{bi({ de: 'Governance-Wirkung:', en: 'Governance impact:' }, lang)}</strong> {governance}</p>
    </div>
  )
}

function AccessPill({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ ...accessPillStyle, borderLeft: `6px solid ${color}` }}>
      <strong>{label}</strong>
      <span>{value}</span>
    </div>
  )
}

function RiskBox({ label, level, color }: { label: string; level: string; color: string }) {
  return (
    <div style={{ ...riskBoxStyle, borderLeft: `6px solid ${color}` }}>
      <strong>{label}</strong>
      <span>{level}</span>
    </div>
  )
}

const pStyle: CSSProperties = { margin: 0, color: '#334155', fontSize: '0.9rem', lineHeight: 1.62 }
const noteStyle: CSSProperties = { margin: 0, color: '#334155', fontSize: '0.84rem', lineHeight: 1.55 }
const subHeadingStyle: CSSProperties = { margin: '0 0 0.35rem', color: '#0f172a', fontSize: '0.92rem' }
const anchorStyle: CSSProperties = { border: '1px solid #dbe2ea', borderRadius: 999, padding: '0.25rem 0.55rem', color: '#0f172a', fontSize: '0.76rem', textDecoration: 'none', background: '#f8fafc' }

const flowWrapStyle: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.55rem' }
const flowItemStyle: CSSProperties = { border: '1px solid #dbe2ea', borderRadius: 10, background: '#f8fafc', padding: '0.5rem', display: 'grid', gap: '0.3rem' }
const flowNumberStyle: CSSProperties = { width: 22, height: 22, borderRadius: 999, background: '#0f172a', color: '#fff', display: 'grid', placeItems: 'center', fontSize: '0.74rem', fontWeight: 700 }
const flowLabelStyle: CSSProperties = { color: '#0f172a', fontSize: '0.8rem', fontWeight: 600 }
const flowConnectorStyle: CSSProperties = { height: 4, borderRadius: 999, background: '#cbd5e1' }

const highlightGridStyle: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.55rem' }
const highlightStyle: CSSProperties = { border: '1px solid #dbe2ea', borderRadius: 10, background: '#f8fafc', padding: '0.5rem 0.6rem', display: 'grid', gap: '0.2rem', color: '#334155', fontSize: '0.8rem' }

const chartGridStyle: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '0.45rem' }
const chartCardStyle: CSSProperties = { border: '1px solid #dbe2ea', borderRadius: 10, padding: '0.65rem', background: '#f8fafc' }
const chartTitleStyle: CSSProperties = { margin: '0 0 0.45rem', color: '#0f172a', fontSize: '0.9rem' }
const chartWrapStyle: CSSProperties = { width: '100%', height: 150 }

const scenarioCardStyle: CSSProperties = { border: '1px solid #dbe2ea', borderRadius: 10, padding: '0.65rem', background: '#f8fafc', display: 'grid', gap: '0.35rem' }

const accessGridStyle: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.6rem' }
const accessPillStyle: CSSProperties = { border: '1px solid #dbe2ea', borderRadius: 10, background: '#f8fafc', padding: '0.55rem 0.6rem', display: 'grid', gap: '0.2rem', color: '#0f172a', fontSize: '0.84rem' }

const tableStyle: CSSProperties = { width: '100%', borderCollapse: 'collapse', minWidth: 760, fontSize: '0.84rem' }
const thStyle: CSSProperties = { textAlign: 'left', padding: '0.5rem 0.6rem', borderBottom: '1px solid #cbd5e1', color: '#334155', background: '#f8fafc' }
const tdStyle: CSSProperties = { padding: '0.5rem 0.6rem', borderBottom: '1px solid #e2e8f0', color: '#0f172a' }

const riskGridStyle: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.6rem' }
const riskBoxStyle: CSSProperties = { border: '1px solid #dbe2ea', borderRadius: 10, background: '#f8fafc', padding: '0.55rem 0.6rem', display: 'grid', gap: '0.2rem', color: '#0f172a', fontSize: '0.84rem' }
