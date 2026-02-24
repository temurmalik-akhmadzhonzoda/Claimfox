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
  { id: 'org-position', label: { de: '2. Organisatorische Position', en: '2. Organizational Position' } },
  { id: 'strategic-responsibility', label: { de: '3. Strategische Verantwortung', en: '3. Strategic Responsibility' } },
  { id: 'model-lifecycle', label: { de: '4. AI-Model-Lifecycle', en: '4. AI Model Lifecycle Diagram' } },
  { id: 'kpi-dashboard', label: { de: '5. KPI-Dashboard', en: '5. KPI Dashboard' } },
  { id: 'human-loop', label: { de: '6. Human-in-the-Loop', en: '6. Human-in-the-Loop Visualization' } },
  { id: 'decision-scenarios', label: { de: '7. Entscheidungsszenarien', en: '7. Realistic Decision Scenarios' } },
  { id: 'regulatory-context', label: { de: '8. Regulatorischer Rahmen', en: '8. Regulatory Framework Context' } },
  { id: 'escalation-matrix', label: { de: '9. Eskalationsmatrix', en: '9. Escalation Matrix' } },
  { id: 'risk-profile', label: { de: '10. Risikoprofil', en: '10. Risk Profile' } },
  { id: 'criticality', label: { de: '11. Warum diese Rolle kritisch ist', en: '11. Why This Role Is Structurally Critical' } },
  { id: 'design-principles', label: { de: '12. Governance-Prinzipien', en: '12. Design Principles' } }
]

const modelDriftData = [
  { period: 'W1', value: 0.12 },
  { period: 'W2', value: 0.15 },
  { period: 'W3', value: 0.19 },
  { period: 'W4', value: 0.17 },
  { period: 'W5', value: 0.23 }
]

const overrideRateData = [
  { period: 'W1', value: 5.8 },
  { period: 'W2', value: 6.2 },
  { period: 'W3', value: 7.1 },
  { period: 'W4', value: 6.6 },
  { period: 'W5', value: 6.9 }
]

const confidenceDistributionData = [
  { bucket: '0.0-0.2', value: 3 },
  { bucket: '0.2-0.4', value: 9 },
  { bucket: '0.4-0.6', value: 18 },
  { bucket: '0.6-0.8', value: 34 },
  { bucket: '0.8-1.0', value: 36 }
]

const biasMonitoringData = [
  { segment: 'Fleet', value: 0.08 },
  { segment: 'Cargo', value: 0.11 },
  { segment: 'Composite', value: 0.07 },
  { segment: 'SME', value: 0.09 }
]

const falsePositiveFraudData = [
  { month: { de: 'Jan', en: 'Jan' }, value: 11.2 },
  { month: { de: 'Feb', en: 'Feb' }, value: 10.7 },
  { month: { de: 'Mär', en: 'Mar' }, value: 12.9 },
  { month: { de: 'Apr', en: 'Apr' }, value: 9.8 },
  { month: { de: 'Mai', en: 'May' }, value: 8.9 }
]

const lifecycleSteps: BiText[] = [
  { de: 'Datenerhebung', en: 'Data Collection' },
  { de: 'Feature Engineering', en: 'Feature Engineering' },
  { de: 'Model Training', en: 'Model Training' },
  { de: 'Validierung', en: 'Validation' },
  { de: 'Governance Review', en: 'Governance Review' },
  { de: 'Release Approval', en: 'Release Approval' },
  { de: 'Production Monitoring', en: 'Production Monitoring' },
  { de: 'Drift Detection', en: 'Drift Detection' },
  { de: 'Override Analysis', en: 'Override Analysis' },
  { de: 'Freeze/ Retrain Decision', en: 'Freeze / Retrain Decision' }
]

const humanLoopSteps: BiText[] = [
  { de: 'AI-Vorschlag', en: 'AI Suggestion' },
  { de: 'Confidence Score', en: 'Confidence Score' },
  { de: 'Menschliche Entscheidung', en: 'Human Decision' },
  { de: 'Override-Logging', en: 'Override Logging' },
  { de: 'Feedback Loop', en: 'Feedback Loop' },
  { de: 'Model Monitoring', en: 'Model Monitoring' }
]

export default function AiGovernanceOfficerRolePage() {
  const { lang } = useI18n()
  const l: Lang = lang === 'de' ? 'de' : 'en'
  const navigate = useNavigate()

  function handlePrint() {
    const oldTitle = document.title
    document.title = bi({ de: 'AI_Governance_Officer_Rollenprofil', en: 'AI_Governance_Officer_Role_Profile' }, l)
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
              title={bi({ de: 'AI Governance Officer – Executive-Rollenprofil', en: 'AI Governance Officer – Executive Role Profile' }, l)}
              subtitle={bi({ de: 'Inside Insurfox / Rollen / AI Governance Officer', en: 'Inside Insurfox / Roles / AI Governance Officer' }, l)}
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
            <span>AI Governance Officer</span>
          </div>

          <div className="print-hide" style={{ marginTop: '0.8rem', display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {anchors.map((a) => (
              <a key={a.id} href={`#${a.id}`} style={anchorStyle}>{bi(a.label, l)}</a>
            ))}
          </div>
        </Card>

        <Card title={bi({ de: '1. Executive-Rollendefinition', en: '1. Executive Role Definition' }, l)}>
          <div id="executive-definition" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Der AI Governance Officer ist die institutionelle Kontrollinstanz für den AI-Einsatz bei Insurfox. Verantwortlich sind Release-Freigabe, Freeze-Befugnis, Human-in-the-Loop-Design, EU-AI-Act-Compliance, Explainability-Standards, Bias-/Fairness-Monitoring, Drift-Oversight, Dokumentationsqualität und AI-Incident-Governance.', en: 'The AI Governance Officer is the institutional control authority for AI usage at Insurfox. Scope includes model release approval, freeze authority, human-in-the-loop design, EU AI Act oversight, explainability standards, bias/fairness monitoring, drift oversight, documentation quality, and AI incident governance.' }, l)}</p>
            <p style={pStyle}>{bi({ de: 'Die Rolle baut keine Modelle, tuned keine Hyperparameter und führt weder Underwriting noch Schadenbearbeitung aus. Sie steuert AI-Risiko, nicht AI-Code.', en: 'The role does not build models, tune hyperparameters, or execute underwriting/claims. It governs AI risk, not AI code.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '2. Organisatorische Position', en: '2. Organizational Position' }, l)}>
          <div id="org-position" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Berichtslinie an CEO oder Chief Risk Officer. Enge Zusammenarbeit mit CUO, Head of Claims, Compliance & Risk Officer, DPO, ML Engineers, Data Scientists und Reinsurance Manager.', en: 'Reports to CEO or Chief Risk Officer. Works closely with CUO, Head of Claims, Compliance & Risk Officer, DPO, ML Engineers, Data Scientists, and Reinsurance Manager.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '3. Strategische Verantwortung', en: '3. Strategic Responsibility' }, l)}>
          <div id="strategic-responsibility" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'AI beeinflusst Pricing, Claim-Severity, Betrugserkennung, Portfolio-Steuerung und Kapitalvolatilität direkt. Fehlsteuerung führt zu steigender Schadenquote, Vertrauensverlust bei Kapazitätsgebern, regulatorischer Exponierung und möglichem Entzug delegierter Zeichnungsvollmachten.', en: 'AI directly affects pricing, claim severity, fraud detection, portfolio steering, and capital volatility. Failure leads to loss-ratio deterioration, carrier trust collapse, regulatory exposure, and potential revocation of delegated authority.' }, l)}</p>
            <p style={pStyle}>{bi({ de: 'Der AI Governance Officer verhindert, dass AI zum systemischen Risiko wird.', en: 'The AI Governance Officer prevents AI from becoming systemic risk.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '4. AI-Model-Lifecycle', en: '4. AI Model Lifecycle Diagram' }, l)}>
          <div id="model-lifecycle" style={{ display: 'grid', gap: '0.7rem' }}>
            <div style={flowWrapStyle}>
              {lifecycleSteps.map((step, idx) => (
                <div key={step.en} style={flowItemStyle}>
                  <div style={flowNumberStyle}>{idx + 1}</div>
                  <div style={flowLabelStyle}>{bi(step, l)}</div>
                  {idx < lifecycleSteps.length - 1 ? <div style={flowConnectorStyle} /> : null}
                </div>
              ))}
            </div>
            <div style={highlightGridStyle}>
              <Highlight title={bi({ de: 'Governance Review', en: 'Governance Review' }, l)} text={bi({ de: 'Pflichtkontrolle vor Produktivsetzung', en: 'Mandatory review before production' }, l)} />
              <Highlight title={bi({ de: 'Release Approval', en: 'Release Approval' }, l)} text={bi({ de: 'Freigabe nur bei erfüllten Kontrollkriterien', en: 'Approval only with passed controls' }, l)} />
              <Highlight title={bi({ de: 'Drift-Eskalation', en: 'Drift Escalation' }, l)} text={bi({ de: 'Frühwarnung bei Modellinstabilität', en: 'Early warning on model instability' }, l)} />
              <Highlight title={bi({ de: 'Freeze Decision', en: 'Freeze Decision' }, l)} text={bi({ de: 'Sofortige Betriebsunterbrechung bei systemischem Risiko', en: 'Immediate freeze under systemic risk' }, l)} />
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '5. KPI-Dashboard', en: '5. KPI Dashboard' }, l)}>
          <div id="kpi-dashboard" style={chartGridStyle}>
            <ChartCard title={bi({ de: 'Model Drift Index', en: 'Model Drift Index' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={modelDriftData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#0f172a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Override-Rate', en: 'Override Rate' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={overrideRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#334155" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'AI-Confidence-Verteilung', en: 'AI Confidence Distribution' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={confidenceDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bucket" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#475569" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Bias Monitoring Index', en: 'Bias Monitoring Index' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={biasMonitoringData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="segment" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#64748b" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'False-Positive-Fraud-Rate', en: 'False Positive Fraud Rate' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={falsePositiveFraudData.map((d) => ({ ...d, label: bi(d.month, l) }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#b91c1c" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </Card>

        <Card title={bi({ de: '6. Human-in-the-Loop', en: '6. Human-in-the-Loop Visualization' }, l)}>
          <div id="human-loop" style={{ display: 'grid', gap: '0.7rem' }}>
            <div style={loopWrapStyle}>
              {humanLoopSteps.map((step, idx) => (
                <div key={step.en} style={loopNodeStyle}>
                  <span>{bi(step, l)}</span>
                  {idx < humanLoopSteps.length - 1 ? <span style={loopArrowStyle}>→</span> : null}
                </div>
              ))}
            </div>
            <p style={pStyle}>{bi({ de: 'In High-Risk-Kategorien sind vollautonome Entscheidungen ausgeschlossen. Menschliche Freigabe und dokumentierter Override-Pfad sind verpflichtend.', en: 'In high-risk categories, fully autonomous decisions are not allowed. Human approval and documented override paths are mandatory.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '7. Realistische Entscheidungsszenarien', en: '7. Realistic Decision Scenarios' }, l)}>
          <div id="decision-scenarios" style={{ display: 'grid', gap: '0.7rem' }}>
            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 1: Betrugsmodell mit steigenden False Positives', en: 'Scenario 1: Fraud model with rising false positives' }, l)}
              risk={bi({ de: 'Leakage sinkt, aber legitime Claims werden blockiert.', en: 'Leakage drops, but legitimate claims are blocked.' }, l)}
              financial={bi({ de: 'Steigende Bearbeitungskosten und Kundenabwanderungsrisiko.', en: 'Higher handling cost and customer churn risk.' }, l)}
              governance={bi({ de: 'Threshold-Freeze und Re-Kalibrierung auslösen.', en: 'Trigger threshold freeze and recalibration.' }, l)}
              documentation={bi({ de: 'Bias-/Fehlklassifikationsbericht und Freigabeprotokoll.', en: 'Bias/misclassification report and approval protocol.' }, l)}
            />
            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 2: Underwriting-Modell driftet durch Makroshift', en: 'Scenario 2: Underwriting drift due to macro shift' }, l)}
              risk={bi({ de: 'Pricing wird systematisch unpräzise.', en: 'Pricing becomes systematically inaccurate.' }, l)}
              financial={bi({ de: 'Kombinierte Quote verschlechtert sich über Portfolio.', en: 'Combined ratio worsens across the portfolio.' }, l)}
              governance={bi({ de: 'Model Review Board einberufen und Release stoppen.', en: 'Convene model review board and stop release.' }, l)}
              documentation={bi({ de: 'Drift-Nachweis, Re-Validation-Plan, Entscheidungsprotokoll.', en: 'Drift evidence, re-validation plan, decision log.' }, l)}
            />
            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 3: Severity-Modell unterschätzt schwere Cargo-Schäden', en: 'Scenario 3: Severity model underestimates heavy cargo claims' }, l)}
              risk={bi({ de: 'Reservierungsunterdeckung und Volatilitätsanstieg.', en: 'Reserve underestimation and volatility increase.' }, l)}
              financial={bi({ de: 'Nachreservierung belastet Ergebnis und Kapital.', en: 'Adverse reserve development impacts earnings and capital.' }, l)}
              governance={bi({ de: 'Override-Korridor verengen und Reserve-Guideline anheben.', en: 'Narrow override corridor and raise reserve guidance.' }, l)}
              documentation={bi({ de: 'Severity-Backtesting und Eskalationsfreigabe dokumentieren.', en: 'Document severity backtesting and escalation approval.' }, l)}
            />
            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 4: EU-AI-Act-Audit-Anfrage', en: 'Scenario 4: EU AI Act audit request' }, l)}
              risk={bi({ de: 'Regulatorische Beanstandung bei unvollständiger Transparenz.', en: 'Regulatory finding if transparency is incomplete.' }, l)}
              financial={bi({ de: 'Sanktions- und Reputationsrisiko mit Marktfolgen.', en: 'Sanction and reputation risk with market consequences.' }, l)}
              governance={bi({ de: 'Explainability- und Dokumentationspaket bereitstellen.', en: 'Provide explainability and documentation package.' }, l)}
              documentation={bi({ de: 'Model Cards, Entscheidungspfade, Override-Logs, Audit-Trail.', en: 'Model cards, decision traces, override logs, audit trail.' }, l)}
            />
          </div>
        </Card>

        <Card title={bi({ de: '8. Regulatorischer Rahmen', en: '8. Regulatory Framework Context' }, l)}>
          <div id="regulatory-context" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Die Governance ist auf EU AI Act (High-Risk-Klassifikation), GDPR, Solvency-II-Modellgovernance und Delegated-Authority-Agreements auszurichten. AI-Entscheidungen mit Wirkung auf Underwriting oder Schaden gelten als hochrisikorelevant und benötigen strenge Kontrollpfade.', en: 'Governance aligns with EU AI Act (high-risk classification), GDPR, Solvency II model governance, and delegated authority agreements. AI decisions affecting underwriting or claims are high-risk relevant and require strict control paths.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '9. Eskalationsmatrix', en: '9. Escalation Matrix' }, l)}>
          <div id="escalation-matrix" style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>{bi({ de: 'Trigger', en: 'Trigger' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Eskalation an', en: 'Escalate to' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Zweck', en: 'Purpose' }, l)}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={tdStyle}>{bi({ de: 'Systemisches AI-Risiko', en: 'Systemic AI risk' }, l)}</td><td style={tdStyle}>CEO</td><td style={tdStyle}>{bi({ de: 'Strategische Risikobegrenzung', en: 'Strategic risk containment' }, l)}</td></tr>
                <tr><td style={tdStyle}>{bi({ de: 'Regulatorischer Vorfall', en: 'Regulatory issue' }, l)}</td><td style={tdStyle}>{bi({ de: 'Compliance', en: 'Compliance' }, l)}</td><td style={tdStyle}>{bi({ de: 'Meldepflicht und Auflagensteuerung', en: 'Regulatory reporting and controls' }, l)}</td></tr>
                <tr><td style={tdStyle}>{bi({ de: 'Pricing-Drift', en: 'Pricing drift' }, l)}</td><td style={tdStyle}>CUO</td><td style={tdStyle}>{bi({ de: 'Technische Preisdisziplin sichern', en: 'Protect technical pricing discipline' }, l)}</td></tr>
                <tr><td style={tdStyle}>{bi({ de: 'Fraud-Threshold-Fehlsteuerung', en: 'Fraud threshold issue' }, l)}</td><td style={tdStyle}>{bi({ de: 'Head of Claims', en: 'Head of Claims' }, l)}</td><td style={tdStyle}>{bi({ de: 'Operative Schadensteuerung absichern', en: 'Protect claims operations quality' }, l)}</td></tr>
                <tr><td style={tdStyle}>{bi({ de: 'Produktionsinstabilität', en: 'Production instability' }, l)}</td><td style={tdStyle}>DevOps</td><td style={tdStyle}>{bi({ de: 'Stabilisierung und Rollback', en: 'Stabilization and rollback' }, l)}</td></tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card title={bi({ de: '10. Risikoprofil', en: '10. Risk Profile' }, l)}>
          <div id="risk-profile" style={riskGridStyle}>
            <RiskBox label={bi({ de: 'Regulatorisches Risiko', en: 'Regulatory Risk' }, l)} level={bi({ de: 'Sehr hoch', en: 'Very High' }, l)} color="#7f1d1d" />
            <RiskBox label={bi({ de: 'Reputationsrisiko', en: 'Reputational Risk' }, l)} level={bi({ de: 'Sehr hoch', en: 'Very High' }, l)} color="#7f1d1d" />
            <RiskBox label={bi({ de: 'Kapitalrisiko', en: 'Capital Risk' }, l)} level={bi({ de: 'Sehr hoch', en: 'Very High' }, l)} color="#7f1d1d" />
            <RiskBox label={bi({ de: 'Model-Drift-Risiko', en: 'Model Drift Risk' }, l)} level={bi({ de: 'Hoch', en: 'High' }, l)} color="#9a3412" />
            <RiskBox label={bi({ de: 'Technologierisiko', en: 'Technology Risk' }, l)} level={bi({ de: 'Mittel', en: 'Medium' }, l)} color="#334155" />
          </div>
        </Card>

        <Card title={bi({ de: '11. Warum diese Rolle strukturell kritisch ist', en: '11. Why This Role Is Structurally Critical' }, l)}>
          <div id="criticality" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Ohne AI Governance Officer wird AI zur unkontrollierten Black Box: Carrier-Vertrauen sinkt, delegierte Vollmachten geraten unter Druck, regulatorische Interventionen werden wahrscheinlicher und Kapitalvolatilität steigt. Die Rolle stabilisiert das Verhältnis zwischen Automatisierung und Rechenschaft.', en: 'Without an AI Governance Officer, AI becomes an unmanaged black box: carrier trust falls, delegated authority is at risk, regulatory intervention probability rises, and capital volatility increases. This role stabilizes automation with accountability.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '12. Governance-Prinzipien', en: '12. Design Principles' }, l)}>
          <div id="design-principles" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Die Rolle folgt den Prinzipien: dokumentierte Entscheidungsketten, trennscharfe Zuständigkeit, risikobasierte Eskalation, auditfeste Nachweise und kontrollierte Produktionseinführung. Dadurch bleibt AI betriebsfähig, erklärbar und regulatorisch belastbar.', en: 'The role follows these principles: documented decision chains, clear accountability boundaries, risk-based escalation, audit-grade evidence, and controlled production release. This keeps AI operable, explainable, and regulatorily defensible.' }, l)}</p>
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
  risk,
  financial,
  governance,
  documentation
}: {
  lang: Lang
  title: string
  risk: string
  financial: string
  governance: string
  documentation: string
}) {
  return (
    <div style={scenarioCardStyle}>
      <h3 style={subHeadingStyle}>{title}</h3>
      <p style={noteStyle}><strong>{bi({ de: 'Risiko:', en: 'Risk:' }, lang)}</strong> {risk}</p>
      <p style={noteStyle}><strong>{bi({ de: 'Finanzielle Wirkung:', en: 'Financial impact:' }, lang)}</strong> {financial}</p>
      <p style={noteStyle}><strong>{bi({ de: 'Governance-Aktion:', en: 'Governance action:' }, lang)}</strong> {governance}</p>
      <p style={noteStyle}><strong>{bi({ de: 'Dokumentation:', en: 'Documentation requirement:' }, lang)}</strong> {documentation}</p>
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

const chartGridStyle: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.7rem' }
const chartCardStyle: CSSProperties = { border: '1px solid #dbe2ea', borderRadius: 10, padding: '0.65rem', background: '#f8fafc' }
const chartTitleStyle: CSSProperties = { margin: '0 0 0.45rem', color: '#0f172a', fontSize: '0.9rem' }
const chartWrapStyle: CSSProperties = { width: '100%', height: 240 }

const loopWrapStyle: CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }
const loopNodeStyle: CSSProperties = { border: '1px solid #dbe2ea', borderRadius: 999, background: '#f8fafc', color: '#0f172a', padding: '0.35rem 0.6rem', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }
const loopArrowStyle: CSSProperties = { color: '#64748b', fontWeight: 700 }

const scenarioCardStyle: CSSProperties = { border: '1px solid #dbe2ea', borderRadius: 10, padding: '0.65rem', background: '#f8fafc', display: 'grid', gap: '0.35rem' }

const tableStyle: CSSProperties = { width: '100%', borderCollapse: 'collapse', minWidth: 760, fontSize: '0.84rem' }
const thStyle: CSSProperties = { textAlign: 'left', padding: '0.5rem 0.6rem', borderBottom: '1px solid #cbd5e1', color: '#334155', background: '#f8fafc' }
const tdStyle: CSSProperties = { padding: '0.5rem 0.6rem', borderBottom: '1px solid #e2e8f0', color: '#0f172a' }

const riskGridStyle: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.6rem' }
const riskBoxStyle: CSSProperties = { border: '1px solid #dbe2ea', borderRadius: 10, background: '#f8fafc', padding: '0.55rem 0.6rem', display: 'grid', gap: '0.2rem', color: '#0f172a', fontSize: '0.84rem' }
