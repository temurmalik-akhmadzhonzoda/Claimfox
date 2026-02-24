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
  { id: 'three-lines', label: { de: '3. Three Lines of Defense', en: '3. Three Lines of Defense Diagram' } },
  { id: 'regulatory-context', label: { de: '4. Regulatorischer Rahmen', en: '4. Regulatory Framework Context' } },
  { id: 'risk-heatmap', label: { de: '5. Risk-Heatmap', en: '5. Risk Heatmap' } },
  { id: 'compliance-kpis', label: { de: '6. Compliance-KPI-Dashboard', en: '6. Compliance KPI Dashboard' } },
  { id: 'escalation-scenarios', label: { de: '7. Eskalationsszenarien', en: '7. Realistic Escalation Scenarios' } },
  { id: 'delegated-authority', label: { de: '8. Delegated-Authority-Monitoring', en: '8. Delegated Authority Monitoring' } },
  { id: 'ai-interaction', label: { de: '9. Interaktion mit AI', en: '9. Interaction with AI' } },
  { id: 'escalation-matrix', label: { de: '10. Eskalationsmatrix', en: '10. Escalation Matrix' } },
  { id: 'risk-profile', label: { de: '11. Risikoprofil', en: '11. Risk Profile' } },
  { id: 'criticality', label: { de: '12. Strukturelle Kritikalität', en: '12. Why This Role Is Structurally Critical' } },
  { id: 'design-principles', label: { de: '13. Governance-Prinzipien', en: '13. Design Principles' } }
]

const riskHeatmapData = [
  { category: { de: 'Regulatorischer Verstoß', en: 'Regulatory Breach' }, likelihood: 3.8, impact: 4.9 },
  { category: { de: 'Delegated-Authority-Verstoß', en: 'Delegated Authority Breach' }, likelihood: 3.3, impact: 4.7 },
  { category: { de: 'AI-Missbrauch', en: 'AI Misuse' }, likelihood: 3.0, impact: 4.5 },
  { category: { de: 'Datenschutzvorfall', en: 'Data Protection Incident' }, likelihood: 2.9, impact: 4.8 },
  { category: { de: 'Conduct Risk', en: 'Conduct Risk' }, likelihood: 2.7, impact: 4.1 },
  { category: { de: 'Kapitalakkumulationsrisiko', en: 'Capital Accumulation Risk' }, likelihood: 2.4, impact: 4.3 }
]

const residualRiskScoreData = [
  { category: { de: 'Regulatorischer Verstoß', en: 'Regulatory Breach' }, value: 18.6 },
  { category: { de: 'Delegated-Authority-Verstoß', en: 'Delegated Authority Breach' }, value: 15.5 },
  { category: { de: 'AI-Missbrauch', en: 'AI Misuse' }, value: 13.5 },
  { category: { de: 'Datenschutzvorfall', en: 'Data Protection Incident' }, value: 13.9 },
  { category: { de: 'Conduct Risk', en: 'Conduct Risk' }, value: 11.1 },
  { category: { de: 'Kapitalakkumulationsrisiko', en: 'Capital Accumulation Risk' }, value: 10.3 }
]

const controlGapRatioData = [
  { quarter: 'Q1', value: 8.2 },
  { quarter: 'Q2', value: 7.4 },
  { quarter: 'Q3', value: 6.9 },
  { quarter: 'Q4', value: 5.8 }
]

const remediationSlaData = [
  { quarter: 'Q1', value: 82 },
  { quarter: 'Q2', value: 85 },
  { quarter: 'Q3', value: 87 },
  { quarter: 'Q4', value: 90 }
]

const complianceIncidentData = [
  { period: 'Q1', value: 14 },
  { period: 'Q2', value: 12 },
  { period: 'Q3', value: 16 },
  { period: 'Q4', value: 11 }
]

const authorityBreachData = [
  { segment: { de: 'Underwriting', en: 'Underwriting' }, value: 6 },
  { segment: { de: 'Claims', en: 'Claims' }, value: 4 },
  { segment: { de: 'Distribution', en: 'Distribution' }, value: 5 },
  { segment: { de: 'API-Kanal', en: 'API Channel' }, value: 3 }
]

const auditFindingsData = [
  { period: 'Q1', value: 9 },
  { period: 'Q2', value: 7 },
  { period: 'Q3', value: 8 },
  { period: 'Q4', value: 5 }
]

const controlEffectivenessData = [
  { control: { de: 'Authority Controls', en: 'Authority Controls' }, value: 82 },
  { control: { de: 'AI Controls', en: 'AI Controls' }, value: 77 },
  { control: { de: 'KYC/AML Controls', en: 'KYC/AML Controls' }, value: 74 },
  { control: { de: 'Datenschutzkontrollen', en: 'Data Protection Controls' }, value: 86 }
]

const openEscalationsData = [
  { severity: { de: 'Kritisch', en: 'Critical' }, value: 2 },
  { severity: { de: 'Hoch', en: 'High' }, value: 5 },
  { severity: { de: 'Mittel', en: 'Medium' }, value: 8 },
  { severity: { de: 'Niedrig', en: 'Low' }, value: 4 }
]

const authorityCorridor = [
  { area: { de: 'Prämienlimit', en: 'Premium Limit' }, level: '85%' },
  { area: { de: 'Claims-Schwellen', en: 'Claims Thresholds' }, level: '72%' },
  { area: { de: 'Referral-Breaches', en: 'Referral Breaches' }, level: '68%' },
  { area: { de: 'Override-Frequenz', en: 'Override Frequency' }, level: '61%' }
]

export default function ComplianceRiskOfficerRolePage() {
  const { lang } = useI18n()
  const l: Lang = lang === 'de' ? 'de' : 'en'
  const navigate = useNavigate()

  function handlePrint() {
    const oldTitle = document.title
    document.title = bi({ de: 'Compliance_Risk_Officer_Rollenprofil', en: 'Compliance_Risk_Officer_Role_Profile' }, l)
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
              title={bi({ de: 'Compliance & Risk Officer – Executive-Rollenprofil', en: 'Compliance & Risk Officer – Executive Role Profile' }, l)}
              subtitle={bi({ de: 'Inside Insurfox / Rollen / Compliance & Risk Officer', en: 'Inside Insurfox / Roles / Compliance & Risk Officer' }, l)}
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
            <span>Compliance & Risk Officer</span>
          </div>

          <div className="print-hide" style={{ marginTop: '0.8rem', display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {anchors.map((a) => (
              <a key={a.id} href={`#${a.id}`} style={anchorStyle}>{bi(a.label, l)}</a>
            ))}
          </div>
        </Card>

        <Card title={bi({ de: '1. Executive-Rollendefinition', en: '1. Executive Role Definition' }, l)}>
          <div id="executive-definition" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Der Compliance & Risk Officer ist die institutionelle Kontrollfunktion (Second Line of Defense). Verantwortet werden regulatorische Aufsicht, IKS, Monitoring delegierter Vollmachten, Durchsetzung des Risikoappetits, Policy-Compliance, Incident-Eskalation, Audit-Koordination, ORSA-Alignment, Conduct-Risk-Monitoring sowie die Aufsicht über das Anti-Financial-Crime-Framework.', en: 'The Compliance & Risk Officer is the institutional control function (Second Line of Defense). Accountabilities include regulatory oversight, internal control system (ICS), delegated authority monitoring, risk appetite enforcement, policy compliance supervision, incident escalation governance, audit coordination, ORSA alignment, conduct risk monitoring, and anti-financial-crime framework oversight.' }, l)}</p>
            <p style={pStyle}>{bi({ de: 'Die Rolle genehmigt keine Underwriting- oder Schadenentscheidungen und entwickelt keine AI-Modelle. Sie stellt sicher, dass Entscheidungen anderer Rollen innerhalb regulatorischer und vertraglicher Grenzen bleiben.', en: 'This role does not approve underwriting decisions, approve claims, or build AI models. It ensures decisions made by others remain within regulatory and contractual boundaries.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '2. Organisatorische Position', en: '2. Organizational Position' }, l)}>
          <div id="organization" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Berichtslinie an CEO oder Board Risk Committee. Enge Zusammenarbeit mit AI Governance Officer, CUO, Head of Claims, DPO, Reinsurance Manager, DevOps (Security Incidents) und Carrier-Vertretern.', en: 'Reports to CEO or Board Risk Committee. Works closely with AI Governance Officer, CUO, Head of Claims, DPO, Reinsurance Manager, DevOps (security incidents), and carrier representatives.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '3. Three Lines of Defense', en: '3. Three Lines of Defense Diagram' }, l)}>
          <div id="three-lines" style={defenseGridStyle}>
            <DefenseBox title={bi({ de: '1st Line', en: '1st Line' }, l)} body={bi({ de: 'Operations: Underwriting, Claims, Brokerkanal', en: 'Operations: Underwriting, Claims, Broker Channel' }, l)} color="#0f172a" />
            <DefenseBox title={bi({ de: '2nd Line', en: '2nd Line' }, l)} body={bi({ de: 'Compliance & Risk Officer (Monitoring, nicht Execution)', en: 'Compliance & Risk Officer (monitoring, not execution)' }, l)} color="#334155" />
            <DefenseBox title={bi({ de: '3rd Line', en: '3rd Line' }, l)} body={bi({ de: 'Externer Audit / Aufsicht', en: 'External Audit / Supervisory Authority' }, l)} color="#64748b" />
          </div>
        </Card>

        <Card title={bi({ de: '4. Regulatorischer Rahmen', en: '4. Regulatory Framework Context' }, l)}>
          <div id="regulatory-context" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Relevante Rahmenwerke: Solvency-II-Governance-Prinzipien, EU AI Act, GDPR, IDD, Anti-Money-Laundering-Regeln, Delegated-Authority-Agreements sowie Outsourcing-Regulierung im Cloud-Kontext. Das Plattformmodell erhöht die regulatorische Angriffsfläche und erfordert durchgängige Kontrollpfade.', en: 'Relevant frameworks include Solvency II governance principles, EU AI Act, GDPR, IDD, anti-money-laundering rules, delegated authority agreements, and outsourcing regulation in cloud environments. The platform model increases the regulatory surface and requires end-to-end control pathways.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '5. Risk-Heatmap', en: '5. Risk Heatmap' }, l)}>
          <div id="risk-heatmap" style={chartGridStyle}>
            <ChartCard title={bi({ de: 'Likelihood', en: 'Likelihood' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskHeatmapData.map((d) => ({ ...d, label: bi(d.category, l) }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="likelihood" fill="#475569" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title={bi({ de: 'Impact', en: 'Impact' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskHeatmapData.map((d) => ({ ...d, label: bi(d.category, l) }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="impact" fill="#991b1b" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title={bi({ de: 'Residual Risk Score', en: 'Residual Risk Score' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={residualRiskScoreData.map((d) => ({ ...d, label: bi(d.category, l) }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0f172a" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title={bi({ de: 'Control Gap Ratio (%)', en: 'Control Gap Ratio (%)' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={controlGapRatioData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#334155" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title={bi({ de: 'Remediation SLA (%)', en: 'Remediation SLA (%)' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={remediationSlaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#64748b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </Card>

        <Card title={bi({ de: '6. Compliance-KPI-Dashboard', en: '6. Compliance KPI Dashboard' }, l)}>
          <div id="compliance-kpis" style={chartGridStyle}>
            <ChartCard title={bi({ de: 'Compliance Incident Count', en: 'Compliance Incident Count' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={complianceIncidentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#0f172a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Authority Breach Events', en: 'Authority Breach Events' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={authorityBreachData.map((d) => ({ ...d, label: bi(d.segment, l) }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#334155" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Audit Findings Trend', en: 'Audit Findings Trend' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={auditFindingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#64748b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Control Effectiveness Score', en: 'Control Effectiveness Score' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={controlEffectivenessData.map((d) => ({ ...d, label: bi(d.control, l) }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#475569" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Open Escalations by Severity', en: 'Open Escalations by Severity' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={openEscalationsData.map((d) => ({ ...d, label: bi(d.severity, l) }))}>
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

        <Card title={bi({ de: '7. Realistische Eskalationsszenarien', en: '7. Realistic Escalation Scenarios' }, l)}>
          <div id="escalation-scenarios" style={{ display: 'grid', gap: '0.7rem' }}>
            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 1: Underwriter bindet außerhalb der Vollmacht', en: 'Scenario 1: Underwriter binds outside delegated authority' }, l)}
              trigger={bi({ de: 'Bind außerhalb Authority Corridor.', en: 'Binding outside delegated authority corridor.' }, l)}
              regRisk={bi({ de: 'Vertragsverstoß und Carrier-Risiko.', en: 'Contractual breach and carrier risk.' }, l)}
              financial={bi({ de: 'Nicht gedeckte Exponierung und Margin-Risiko.', en: 'Uncovered exposure and margin risk.' }, l)}
              escalation={bi({ de: 'Eskalation an CEO + Carrier-Notification.', en: 'Escalate to CEO + notify carrier.' }, l)}
              documentation={bi({ de: 'Incident-Report, Freigabepfad, Korrekturmaßnahme.', en: 'Incident report, approval trail, corrective action.' }, l)}
            />
            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 2: AI-Pricing-Drift mit diskriminatorischem Muster', en: 'Scenario 2: AI pricing drift with discriminatory pattern' }, l)}
              trigger={bi({ de: 'Bias-Indikatoren oberhalb Grenzwert.', en: 'Bias indicators above threshold.' }, l)}
              regRisk={bi({ de: 'EU-AI-Act-/GDPR-Risiko.', en: 'EU AI Act / GDPR risk.' }, l)}
              financial={bi({ de: 'Falsches Pricing verschlechtert Portfolioqualität.', en: 'Mispricing degrades portfolio quality.' }, l)}
              escalation={bi({ de: 'Model-Freeze + regulatorische Meldepflicht prüfen.', en: 'Model freeze + evaluate regulatory reporting duty.' }, l)}
              documentation={bi({ de: 'Bias-Analyse, Override-Logs, Entscheidungsprotokoll.', en: 'Bias analysis, override logs, decision protocol.' }, l)}
            />
            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 3: Reservemanipulationsrisiko im Claims-Prozess', en: 'Scenario 3: Claims reserve manipulation risk identified' }, l)}
              trigger={bi({ de: 'Unplausible Reserveschwankungen in Einzelfällen.', en: 'Implausible reserve movements in case clusters.' }, l)}
              regRisk={bi({ de: 'Bilanzierungs-/Governance-Risiko.', en: 'Accounting and governance risk.' }, l)}
              financial={bi({ de: 'Nachreservierungs- und Ergebnisrisiko.', en: 'Adverse development and earnings risk.' }, l)}
              escalation={bi({ de: 'Interne Untersuchung + Audit-Vorbereitung.', en: 'Internal investigation + external audit preparation.' }, l)}
              documentation={bi({ de: 'Datenextrakt, Control-Failure-Analyse, Maßnahmenplan.', en: 'Data extract, control-failure analysis, remediation plan.' }, l)}
            />
            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 4: Grenzüberschreitendes Broker-Onboarding ohne KYC', en: 'Scenario 4: Cross-border broker onboarding without proper KYC' }, l)}
              trigger={bi({ de: 'Fehlende KYC-/AML-Nachweise bei Aktivierung.', en: 'Missing KYC/AML evidence on activation.' }, l)}
              regRisk={bi({ de: 'AML-/IDD-Verstoß.', en: 'AML / IDD breach.' }, l)}
              financial={bi({ de: 'Sanktions- und Reputationsschadenrisiko.', en: 'Sanctions and reputational damage risk.' }, l)}
              escalation={bi({ de: 'Sofortige Suspendierung + AML-Review.', en: 'Immediate suspension + AML review.' }, l)}
              documentation={bi({ de: 'KYC-Akte, Eskalationsprotokoll, Wiedereintrittskriterien.', en: 'KYC file, escalation protocol, re-entry criteria.' }, l)}
            />
          </div>
        </Card>

        <Card title={bi({ de: '8. Delegated-Authority-Monitoring', en: '8. Delegated Authority Monitoring' }, l)}>
          <div id="delegated-authority" style={{ display: 'grid', gap: '0.7rem' }}>
            <p style={pStyle}>{bi({ de: 'Compliance überwacht Authority Corridors, Prämienlimits, Claims-Schwellen, Referral-Breaches und Override-Frequenzen als zentrale Kontrollparameter.', en: 'Compliance monitors authority corridors, premium limits, claims thresholds, referral breaches, and override frequency as core control parameters.' }, l)}</p>
            <div style={authorityGridStyle}>
              {authorityCorridor.map((item) => (
                <div key={item.area.en} style={authorityItemStyle}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.4rem' }}>
                    <strong>{bi(item.area, l)}</strong>
                    <span>{item.level}</span>
                  </div>
                  <div style={authorityTrackStyle}>
                    <div style={{ ...authorityFillStyle, width: item.level }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '9. Interaktion mit AI', en: '9. Interaction with AI' }, l)}>
          <div id="ai-interaction" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'AI Governance Officer = Modellaufsicht. Compliance & Risk Officer = regulatorische Aufsicht. Compliance prüft Explainability-Dokumentation, dokumentierte Human-Overrides, Kennzeichnung hochriskanter AI und die Ablage vollständiger AI-Impact-Assessments. Interaktionslevel: Audit only.', en: 'AI Governance Officer = model oversight. Compliance & Risk Officer = regulatory oversight. Compliance ensures explainability documentation exists, human overrides are documented, high-risk AI is flagged, and AI impact assessments are retained. Interaction level: audits only.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '10. Eskalationsmatrix', en: '10. Escalation Matrix' }, l)}>
          <div id="escalation-matrix" style={{ display: 'grid', gap: '0.65rem' }}>
            <div style={matrixGridStyle}>
              <div style={matrixBoxStyle}>
                <strong>{bi({ de: 'Eskalation an', en: 'Escalates to' }, l)}</strong>
                <span>{bi({ de: 'CEO, Board Risk Committee, Carrier, Reinsurer, Aufsicht (bei Bedarf)', en: 'CEO, Board Risk Committee, carrier, reinsurer, supervisory authority (if required)' }, l)}</span>
              </div>
              <div style={matrixBoxStyle}>
                <strong>{bi({ de: 'Eskalation von', en: 'Receives escalation from' }, l)}</strong>
                <span>{bi({ de: 'AI Governance Officer, CUO, Head of Claims, DevOps (Security Incidents)', en: 'AI Governance Officer, CUO, Head of Claims, DevOps (security incidents)' }, l)}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '11. Risikoprofil', en: '11. Risk Profile' }, l)}>
          <div id="risk-profile" style={riskGridStyle}>
            <RiskBox label={bi({ de: 'Regulatorisches Risiko', en: 'Regulatory Risk' }, l)} level={bi({ de: 'Sehr hoch', en: 'Very High' }, l)} color="#7f1d1d" />
            <RiskBox label={bi({ de: 'Lizenzrisiko', en: 'License Risk' }, l)} level={bi({ de: 'Sehr hoch', en: 'Very High' }, l)} color="#7f1d1d" />
            <RiskBox label={bi({ de: 'Termination-Risiko delegierter Vollmachten', en: 'Delegated Authority Termination Risk' }, l)} level={bi({ de: 'Sehr hoch', en: 'Very High' }, l)} color="#7f1d1d" />
            <RiskBox label={bi({ de: 'Reputationsschaden', en: 'Reputational Damage' }, l)} level={bi({ de: 'Hoch', en: 'High' }, l)} color="#9a3412" />
            <RiskBox label={bi({ de: 'Financial Leakage', en: 'Financial Leakage Risk' }, l)} level={bi({ de: 'Mittel', en: 'Medium' }, l)} color="#334155" />
          </div>
        </Card>

        <Card title={bi({ de: '12. Warum diese Rolle strukturell kritisch ist', en: '12. Why This Role Is Structurally Critical' }, l)}>
          <div id="criticality" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Ohne Compliance & Risk Officer kollabieren Delegated-Authority-Agreements, Aufsichtseingriffe werden wahrscheinlicher, Carrier-Vertrauen sinkt, AI wird rechtlich angreifbar und internationale Skalierung blockiert. Compliance ist die stabilisierende Wirbelsäule der Insurfox-Expansion.', en: 'Without a Compliance & Risk Officer, delegated authority agreements collapse, supervisory intervention risk rises, carrier confidence erodes, AI becomes legally vulnerable, and platform scaling is blocked. Compliance is the stabilizing spine of Insurfox international expansion.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '13. Governance-Prinzipien', en: '13. Design Principles' }, l)}>
          <div id="design-principles" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Die Rolle arbeitet prinzipienbasiert: klare Zuständigkeiten, lückenlose Dokumentation, risikobasierte Eskalation, auditierbare Evidenz und regulatorisch belastbare Entscheidungswege. Damit bleibt Wachstum kontrolliert und vertragskonform.', en: 'The role operates on governance principles: clear accountability, complete documentation, risk-based escalation, audit-grade evidence, and regulatorily defensible decision pathways. This keeps growth controlled and contract-compliant.' }, l)}</p>
          </div>
        </Card>
      </div>
    </section>
  )
}

function DefenseBox({ title, body, color }: { title: string; body: string; color: string }) {
  return (
    <div style={{ ...defenseBoxStyle, borderLeft: `6px solid ${color}` }}>
      <strong>{title}</strong>
      <span>{body}</span>
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
  regRisk,
  financial,
  escalation,
  documentation
}: {
  lang: Lang
  title: string
  trigger: string
  regRisk: string
  financial: string
  escalation: string
  documentation: string
}) {
  return (
    <div style={scenarioCardStyle}>
      <h3 style={subHeadingStyle}>{title}</h3>
      <p style={noteStyle}><strong>{bi({ de: 'Trigger:', en: 'Trigger:' }, lang)}</strong> {trigger}</p>
      <p style={noteStyle}><strong>{bi({ de: 'Regulatorisches Risiko:', en: 'Regulatory risk:' }, lang)}</strong> {regRisk}</p>
      <p style={noteStyle}><strong>{bi({ de: 'Finanzielle Exponierung:', en: 'Financial exposure:' }, lang)}</strong> {financial}</p>
      <p style={noteStyle}><strong>{bi({ de: 'Eskalationspfad:', en: 'Escalation pathway:' }, lang)}</strong> {escalation}</p>
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

const defenseGridStyle: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.6rem' }
const defenseBoxStyle: CSSProperties = { border: '1px solid #dbe2ea', borderRadius: 10, background: '#f8fafc', padding: '0.6rem', display: 'grid', gap: '0.25rem', color: '#0f172a', fontSize: '0.83rem' }

const chartGridStyle: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '0.45rem' }
const chartCardStyle: CSSProperties = { border: '1px solid #dbe2ea', borderRadius: 10, padding: '0.65rem', background: '#f8fafc' }
const chartTitleStyle: CSSProperties = { margin: '0 0 0.45rem', color: '#0f172a', fontSize: '0.9rem' }
const chartWrapStyle: CSSProperties = { width: '100%', height: 150 }

const scenarioCardStyle: CSSProperties = { border: '1px solid #dbe2ea', borderRadius: 10, padding: '0.65rem', background: '#f8fafc', display: 'grid', gap: '0.35rem' }

const authorityGridStyle: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.6rem' }
const authorityItemStyle: CSSProperties = { border: '1px solid #dbe2ea', borderRadius: 10, background: '#f8fafc', padding: '0.55rem 0.6rem', display: 'grid', gap: '0.35rem', color: '#0f172a', fontSize: '0.82rem' }
const authorityTrackStyle: CSSProperties = { height: 10, borderRadius: 999, background: '#e2e8f0' }
const authorityFillStyle: CSSProperties = { height: '100%', borderRadius: 999, background: '#334155' }

const matrixGridStyle: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.6rem' }
const matrixBoxStyle: CSSProperties = { border: '1px solid #dbe2ea', borderRadius: 10, background: '#f8fafc', padding: '0.6rem', display: 'grid', gap: '0.25rem', color: '#0f172a', fontSize: '0.83rem' }

const riskGridStyle: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.6rem' }
const riskBoxStyle: CSSProperties = { border: '1px solid #dbe2ea', borderRadius: 10, background: '#f8fafc', padding: '0.55rem 0.6rem', display: 'grid', gap: '0.2rem', color: '#0f172a', fontSize: '0.84rem' }
