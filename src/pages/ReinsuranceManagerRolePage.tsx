import { type CSSProperties, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Bar,
  BarChart,
  CartesianGrid,
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
  { id: 'executive-definition', label: { de: '1. Executive-Rollendefinition', en: '1. Executive Role Definition' } },
  { id: 'organization', label: { de: '2. Organisatorische Position', en: '2. Organizational Position' } },
  { id: 'treaty-structure', label: { de: '3. Treaty-Struktur', en: '3. Treaty Structure Visualization' } },
  { id: 'capital-volatility', label: { de: '4. Kapital- & Volatilitätsverantwortung', en: '4. Capital & Volatility Responsibility' } },
  { id: 'kpi-dashboard', label: { de: '5. KPI-Dashboard', en: '5. KPI Dashboard' } },
  { id: 'aggregation-monitor', label: { de: '6. Aggregation Monitor', en: '6. Aggregation Monitor Diagram' } },
  { id: 'decision-scenarios', label: { de: '7. Entscheidungsszenarien', en: '7. Realistic Decision Scenarios' } },
  { id: 'ai-interaction', label: { de: '8. Interaktion mit AI', en: '8. Interaction with AI' } },
  { id: 'escalation-matrix', label: { de: '9. Eskalationsmatrix', en: '9. Escalation Matrix' } },
  { id: 'risk-profile', label: { de: '10. Risikoprofil', en: '10. Risk Profile' } },
  { id: 'criticality', label: { de: '11. Strukturelle Kritikalität', en: '11. Why This Role Is Structurally Critical' } },
  { id: 'design-principles', label: { de: '12. Governance-Prinzipien', en: '12. Design Principles' } }
]

const grossNetLossRatioData = [
  { quarter: 'Q1', gross: 67, net: 61 },
  { quarter: 'Q2', gross: 71, net: 63 },
  { quarter: 'Q3', gross: 69, net: 62 },
  { quarter: 'Q4', gross: 73, net: 64 }
]

const cessionRatioTrendData = [
  { quarter: 'Q1', value: 38 },
  { quarter: 'Q2', value: 41 },
  { quarter: 'Q3', value: 40 },
  { quarter: 'Q4', value: 43 }
]

const aggregationByRegionData = [
  { region: { de: 'DACH', en: 'DACH' }, value: 42 },
  { region: { de: 'Benelux', en: 'Benelux' }, value: 21 },
  { region: { de: 'Nordics', en: 'Nordics' }, value: 17 },
  { region: { de: 'CEE', en: 'CEE' }, value: 20 }
]

const largeLossDistributionData = [
  { band: { de: '0.5-1 Mio.', en: '0.5-1m' }, value: 8 },
  { band: { de: '1-2 Mio.', en: '1-2m' }, value: 5 },
  { band: { de: '2-5 Mio.', en: '2-5m' }, value: 3 },
  { band: { de: '>5 Mio.', en: '>5m' }, value: 1 }
]

const catExposureConcentrationData = [
  { cat: { de: 'Sturm', en: 'Storm' }, value: 36 },
  { cat: { de: 'Flut', en: 'Flood' }, value: 29 },
  { cat: { de: 'Hagel', en: 'Hail' }, value: 18 },
  { cat: { de: 'Sonstige', en: 'Other' }, value: 17 }
]

const treatyStages: BiText[] = [
  { de: 'Gross Written Premium', en: 'Gross Written Premium' },
  { de: 'Retention Layer', en: 'Retention Layer' },
  { de: 'Quota Share', en: 'Quota Share' },
  { de: 'Excess of Loss', en: 'Excess of Loss' },
  { de: 'Cat XoL Layer', en: 'Cat XoL Layer' },
  { de: 'Net Retention', en: 'Net Retention' }
]

const aggregationChain: BiText[] = [
  { de: 'Region', en: 'Region' },
  { de: 'Fleet Density', en: 'Fleet Density' },
  { de: 'Cargo Exposure', en: 'Cargo Exposure' },
  { de: 'Cat Exposure', en: 'Cat Exposure' }
]

export default function ReinsuranceManagerRolePage() {
  const navigate = useNavigate()
  const { lang } = useI18n()
  const l: Lang = lang === 'de' ? 'de' : 'en'

  function handlePrint() {
    const old = document.title
    document.title = bi({ de: 'Reinsurance_Manager_Rollenprofil', en: 'Reinsurance_Manager_Role_Profile' }, l)
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
              title={bi({ de: 'Reinsurance Manager – Kapital- & Treaty-Rollenprofil', en: 'Reinsurance Manager – Capital & Treaty Role Profile' }, l)}
              subtitle={bi({ de: 'Inside Insurfox / Rollen / Reinsurance Manager', en: 'Inside Insurfox / Roles / Reinsurance Manager' }, l)}
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
            <span>Reinsurance Manager</span>
          </div>

          <div className="print-hide" style={{ marginTop: '0.8rem', display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {anchors.map((a) => (
              <a key={a.id} href={`#${a.id}`} style={anchorStyle}>{bi(a.label, l)}</a>
            ))}
          </div>
        </Card>

        <Card title={bi({ de: '1. Executive-Rollendefinition', en: '1. Executive Role Definition' }, l)}>
          <div id="executive-definition" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Der Reinsurance Manager verantwortet Treaty-Strukturdesign, Kapazitätsallokation, Aggregationsmonitoring, Cession-Strategie, Kapitalvolatilitätssteuerung, Loss-Ratio-Smoothing, Reinsurer-Relationship-Management, fakultative Platzierungsstrategie und Cat-Exposure-Control.', en: 'The Reinsurance Manager is responsible for treaty structure design, capacity allocation control, aggregation monitoring, cession strategy, capital volatility management, loss ratio smoothing, reinsurer relationship management, facultative placement strategy, and catastrophe exposure control.' }, l)}</p>
            <p style={pStyle}>{bi({ de: 'Die Rolle genehmigt keine Einzel-Underwriting-Fälle, setzt keine Schadenreserven und baut keine Pricing-Modelle. Sie definiert, wie viel Risiko Insurfox selbst trägt und wie viel Risiko transferiert wird.', en: 'This role does not approve single underwriting cases, set claims reserves, or build pricing models. It defines how much risk Insurfox retains and how much is transferred.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '2. Organisatorische Position', en: '2. Organizational Position' }, l)}>
          <div id="organization" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Berichtslinie an CEO oder CFO. Enge Zusammenarbeit mit CUO, Head of Claims, Pricing Actuary, Compliance & Risk Officer, Carrier Underwriters und AI Governance Officer.', en: 'Reports to CEO or CFO. Works closely with CUO, Head of Claims, Pricing Actuary, Compliance & Risk Officer, carrier underwriters, and AI Governance Officer.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '3. Treaty-Struktur', en: '3. Treaty Structure Visualization' }, l)}>
          <div id="treaty-structure" style={{ display: 'grid', gap: '0.7rem' }}>
            <div style={flowWrapStyle}>
              {treatyStages.map((step, idx) => (
                <div key={step.en} style={flowItemStyle}>
                  <div style={flowNumberStyle}>{idx + 1}</div>
                  <div style={flowLabelStyle}>{bi(step, l)}</div>
                  {idx < treatyStages.length - 1 ? <div style={flowConnectorStyle} /> : null}
                </div>
              ))}
            </div>
            <div style={highlightGridStyle}>
              <Highlight title="Quota Share" text={bi({ de: 'Proportionale Risikoabgabe zur Volatilitätsglättung', en: 'Proportional risk transfer for volatility smoothing' }, l)} />
              <Highlight title="Excess of Loss" text={bi({ de: 'Schutz oberhalb definierter Schadenpunkte', en: 'Protection above defined loss attachment points' }, l)} />
              <Highlight title="Facultative" text={bi({ de: 'Fallbezogener Transfer außergewöhnlicher Risiken', en: 'Case-by-case transfer of exceptional risks' }, l)} />
              <Highlight title="Stop Loss / Cat Cover" text={bi({ de: 'Portfoliobegrenzung bei Extremszenarien', en: 'Portfolio protection for extreme scenarios' }, l)} />
            </div>
            <p style={pStyle}>{bi({ de: 'Der Reinsurance Manager definiert den Retention Appetite und damit die Kapitalresilienz des MGA-Modells.', en: 'The Reinsurance Manager defines retention appetite and therefore the capital resilience of the MGA model.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '4. Kapital- & Volatilitätsverantwortung', en: '4. Capital & Volatility Responsibility' }, l)}>
          <div id="capital-volatility" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Direkter Einfluss auf Net Loss Ratio, Combined-Ratio-Stabilität, Kapitalanforderung, Glaubwürdigkeit delegierter Vollmachten und Carrier-Vertrauen. Ohne belastbare Treaty-Architektur kann ein MGA bei Large-Loss-Ereignissen strukturell scheitern, Kapazität verlieren und Wachstum stoppen.', en: 'Direct impact on net loss ratio, combined ratio stability, capital requirements, delegated authority credibility, and carrier trust. Without robust treaty architecture, an MGA can fail under large losses, lose capacity, and halt growth.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '5. KPI-Dashboard', en: '5. KPI Dashboard' }, l)}>
          <div id="kpi-dashboard" style={chartGridStyle}>
            <ChartCard title={bi({ de: 'Gross vs. Net Loss Ratio', en: 'Gross vs Net Loss Ratio' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={grossNetLossRatioData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="gross" stroke="#64748b" strokeWidth={2} />
                  <Line type="monotone" dataKey="net" stroke="#0f172a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Cession-Rate-Trend', en: 'Cession Ratio Trend' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cessionRatioTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#334155" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Aggregation Exposure nach Region', en: 'Aggregation Exposure by Region' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={aggregationByRegionData.map((d) => ({ ...d, label: bi(d.region, l) }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#475569" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Large-Loss-Verteilung', en: 'Large Loss Distribution' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={largeLossDistributionData.map((d) => ({ ...d, label: bi(d.band, l) }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#64748b" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Cat-Exposure-Konzentration', en: 'Cat Exposure Concentration' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={catExposureConcentrationData.map((d) => ({ ...d, label: bi(d.cat, l) }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#991b1b" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </Card>

        <Card title={bi({ de: '6. Aggregation Monitor', en: '6. Aggregation Monitor Diagram' }, l)}>
          <div id="aggregation-monitor" style={{ display: 'grid', gap: '0.7rem' }}>
            <div style={chainWrapStyle}>
              {aggregationChain.map((step, idx) => (
                <div key={step.en} style={chainNodeStyle}>
                  <span>{bi(step, l)}</span>
                  {idx < aggregationChain.length - 1 ? <span style={chainArrowStyle}>→</span> : null}
                </div>
              ))}
            </div>
            <p style={pStyle}>{bi({ de: 'Echtzeit-Monitoring erfolgt über AI-Datenfeeds zur frühzeitigen Erkennung kritischer Akkumulationsmuster.', en: 'Real-time monitoring uses AI data feeds to detect critical accumulation patterns early.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '7. Realistische Entscheidungsszenarien', en: '7. Realistic Decision Scenarios' }, l)}>
          <div id="decision-scenarios" style={{ display: 'grid', gap: '0.7rem' }}>
            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 1: Rasches Flottenwachstum erhöht Akkumulationsrisiko', en: 'Scenario 1: Rapid fleet growth increases accumulation risk' }, l)}
              trigger={bi({ de: 'Regionales Exposure steigt über Zielkorridor.', en: 'Regional exposure exceeds target corridor.' }, l)}
              financial={bi({ de: 'Höhere potenzielle Large-Loss-Belastung.', en: 'Higher potential large-loss burden.' }, l)}
              capital={bi({ de: 'Kapitalvolatilität nimmt zu.', en: 'Capital volatility increases.' }, l)}
              treaty={bi({ de: 'Quota-Share-Quote anheben.', en: 'Increase quota share percentage.' }, l)}
              reporting={bi({ de: 'Carrier- und Reinsurer-Update mit Exponierungsbericht.', en: 'Carrier and reinsurer update with exposure report.' }, l)}
            />
            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 2: Großer Cargo-Schaden über Retention', en: 'Scenario 2: Large cargo loss exceeds retention' }, l)}
              trigger={bi({ de: 'Einzelschaden überschreitet Retention-Layer.', en: 'Single loss pierces retention layer.' }, l)}
              financial={bi({ de: 'Bruttobelastung hoch, Recovery relevant.', en: 'High gross impact, recovery critical.' }, l)}
              capital={bi({ de: 'Nettoeffekt abhängig von XoL-Recovery.', en: 'Net effect depends on XoL recovery.' }, l)}
              treaty={bi({ de: 'XoL-Recovery triggern + Carrier-Reporting.', en: 'Trigger XoL recovery + carrier reporting.' }, l)}
              reporting={bi({ de: 'Loss Bordereau und Treaty-Notification fristgerecht.', en: 'Submit loss bordereau and treaty notification on time.' }, l)}
            />
            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 3: Konzentrationsrisiko in geographischem Korridor', en: 'Scenario 3: Concentration risk in one geographic corridor' }, l)}
              trigger={bi({ de: 'Akkumulation über definierter Cat-Schwelle.', en: 'Accumulation above defined catastrophe threshold.' }, l)}
              financial={bi({ de: 'Tail-Risk-Wahrscheinlichkeit steigt.', en: 'Tail-risk probability increases.' }, l)}
              capital={bi({ de: 'Stress-Szenario belastet Solvenzband.', en: 'Stress scenario pressures solvency band.' }, l)}
              treaty={bi({ de: 'Underwriting Appetite regional adjustieren.', en: 'Adjust regional underwriting appetite.' }, l)}
              reporting={bi({ de: 'Risk Committee Bericht + aktualisierte Szenarioanalyse.', en: 'Risk Committee report + updated scenario analytics.' }, l)}
            />
            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 4: Reinsurer fordert Performance-Review', en: 'Scenario 4: Reinsurer requests performance review after adverse trend' }, l)}
              trigger={bi({ de: 'Adverse Trend in Netto-Loss-Ratio.', en: 'Adverse trend in net loss ratio.' }, l)}
              financial={bi({ de: 'Preis- und Kapazitätsdruck bei Renewal.', en: 'Pricing and capacity pressure at renewal.' }, l)}
              capital={bi({ de: 'Erhöhte Unsicherheit der Kapitalkosten.', en: 'Higher uncertainty in cost of capital.' }, l)}
              treaty={bi({ de: 'Portfolioanalytics + Remediation Plan liefern.', en: 'Provide portfolio analytics + remediation plan.' }, l)}
              reporting={bi({ de: 'Transparente KPI-/Bordereau-Daten an Reinsurer.', en: 'Transparent KPI/bordereau reporting to reinsurer.' }, l)}
            />
          </div>
        </Card>

        <Card title={bi({ de: '8. Interaktion mit AI', en: '8. Interaction with AI' }, l)}>
          <div id="ai-interaction" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Der Reinsurance Manager trainiert keine Modelle. Die Rolle nutzt AI für Aggregationsprognosen, Cat-Exposure-Modellierung, Volatilitätsforecast und Szenariosimulationen. Interaktionslevel: konsumierend.', en: 'The Reinsurance Manager does not train models. The role consumes AI for aggregation prediction, catastrophe exposure modeling, volatility forecasting, and scenario simulation. Interaction level: consumes.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '9. Eskalationsmatrix', en: '9. Escalation Matrix' }, l)}>
          <div id="escalation-matrix" style={{ display: 'grid', gap: '0.65rem' }}>
            <div style={matrixGridStyle}>
              <div style={matrixBoxStyle}>
                <strong>{bi({ de: 'Eskalation an', en: 'Escalates to' }, l)}</strong>
                <span>{bi({ de: 'CEO (Kapitalrisiko), Carrier (Treaty-Breach-Risiko), Reinsurer (Recovery-Event), Compliance (Authority-Breach)', en: 'CEO (capital risk), carrier (treaty breach risk), reinsurer (recovery event), compliance (authority breach)' }, l)}</span>
              </div>
              <div style={matrixBoxStyle}>
                <strong>{bi({ de: 'Eskalation von', en: 'Receives escalation from' }, l)}</strong>
                <span>{bi({ de: 'CUO (Portfolio Shift), Head of Claims (Large-Loss-Spike), Portfolio Manager (Loss-Ratio-Drift)', en: 'CUO (portfolio shift), Head of Claims (large loss spike), Portfolio Manager (loss ratio drift)' }, l)}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '10. Risikoprofil', en: '10. Risk Profile' }, l)}>
          <div id="risk-profile" style={riskGridStyle}>
            <RiskBox label={bi({ de: 'Kapitalvolatilitätsrisiko', en: 'Capital Volatility Risk' }, l)} level={bi({ de: 'Sehr hoch', en: 'Very High' }, l)} color="#7f1d1d" />
            <RiskBox label={bi({ de: 'Akkumulationsrisiko', en: 'Aggregation Risk' }, l)} level={bi({ de: 'Sehr hoch', en: 'Very High' }, l)} color="#7f1d1d" />
            <RiskBox label={bi({ de: 'Treaty-Breach-Risiko', en: 'Treaty Breach Risk' }, l)} level={bi({ de: 'Sehr hoch', en: 'Very High' }, l)} color="#7f1d1d" />
            <RiskBox label={bi({ de: 'Reinsurer-Confidence-Risiko', en: 'Reinsurer Confidence Risk' }, l)} level={bi({ de: 'Hoch', en: 'High' }, l)} color="#9a3412" />
            <RiskBox label={bi({ de: 'Pricing-Misalignment-Risiko', en: 'Pricing Misalignment Risk' }, l)} level={bi({ de: 'Mittel', en: 'Medium' }, l)} color="#334155" />
          </div>
        </Card>

        <Card title={bi({ de: '11. Warum diese Rolle strukturell kritisch ist', en: '11. Why This Role Is Structurally Critical' }, l)}>
          <div id="criticality" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Ohne Reinsurance Manager kann Insurfox Prämienvolumen nicht nachhaltig skalieren, Volatilität zerstört Kapital, Carrier-Agreements brechen, delegierte Vollmachten geraten unter Druck und Investor-Vertrauen erodiert. Diese Rolle übersetzt Underwriting-Ambition in nachhaltige Kapitalarchitektur.', en: 'Without a Reinsurance Manager, Insurfox cannot scale premium sustainably, volatility destroys capital, carrier agreements fail, delegated authority is at risk, and investor trust erodes. This role converts underwriting ambition into sustainable capital architecture.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '12. Governance-Prinzipien', en: '12. Design Principles' }, l)}>
          <div id="design-principles" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Die Rolle arbeitet mit klarer Retention-Governance, belastbaren Treaty-Dokumenten, zeitnaher Recovery-Kommunikation und auditfähiger Transparenz über Kapital- und Exposure-Entwicklungen.', en: 'The role operates with clear retention governance, robust treaty documentation, timely recovery communication, and audit-grade transparency over capital and exposure developments.' }, l)}</p>
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
  financial,
  capital,
  treaty,
  reporting
}: {
  lang: Lang
  title: string
  trigger: string
  financial: string
  capital: string
  treaty: string
  reporting: string
}) {
  return (
    <div style={scenarioCardStyle}>
      <h3 style={subHeadingStyle}>{title}</h3>
      <p style={noteStyle}><strong>{bi({ de: 'Trigger:', en: 'Trigger:' }, lang)}</strong> {trigger}</p>
      <p style={noteStyle}><strong>{bi({ de: 'Finanzielle Wirkung:', en: 'Financial impact:' }, lang)}</strong> {financial}</p>
      <p style={noteStyle}><strong>{bi({ de: 'Kapitalwirkung:', en: 'Capital implication:' }, lang)}</strong> {capital}</p>
      <p style={noteStyle}><strong>{bi({ de: 'Treaty-Reaktion:', en: 'Treaty reaction:' }, lang)}</strong> {treaty}</p>
      <p style={noteStyle}><strong>{bi({ de: 'Reporting-Pflicht:', en: 'Reporting duty:' }, lang)}</strong> {reporting}</p>
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

const chainWrapStyle: CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }
const chainNodeStyle: CSSProperties = { border: '1px solid #dbe2ea', borderRadius: 999, background: '#f8fafc', color: '#0f172a', padding: '0.35rem 0.6rem', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }
const chainArrowStyle: CSSProperties = { color: '#64748b', fontWeight: 700 }

const scenarioCardStyle: CSSProperties = { border: '1px solid #dbe2ea', borderRadius: 10, padding: '0.65rem', background: '#f8fafc', display: 'grid', gap: '0.35rem' }

const matrixGridStyle: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.6rem' }
const matrixBoxStyle: CSSProperties = { border: '1px solid #dbe2ea', borderRadius: 10, background: '#f8fafc', padding: '0.6rem', display: 'grid', gap: '0.25rem', color: '#0f172a', fontSize: '0.83rem' }

const riskGridStyle: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.6rem' }
const riskBoxStyle: CSSProperties = { border: '1px solid #dbe2ea', borderRadius: 10, background: '#f8fafc', padding: '0.55rem 0.6rem', display: 'grid', gap: '0.2rem', color: '#0f172a', fontSize: '0.84rem' }
