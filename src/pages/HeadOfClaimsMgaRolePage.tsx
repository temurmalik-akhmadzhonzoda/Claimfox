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
  { id: 'executive-definition', label: { de: '1. Executive-Rollendefinition', en: '1. Executive Role Definition' } },
  { id: 'organizational-position', label: { de: '2. Organisatorische Position', en: '2. Organizational Position' } },
  { id: 'financial-responsibility', label: { de: '3. Finanzielle Verantwortung', en: '3. Financial Responsibility' } },
  { id: 'claims-lifecycle', label: { de: '4. Claims-Lifecycle', en: '4. Claims Lifecycle Visualization' } },
  { id: 'kpi-dashboard', label: { de: '5. KPI-Dashboard', en: '5. KPI Dashboard' } },
  { id: 'authority-thresholds', label: { de: '6. Kompetenzschwellen', en: '6. Claims Authority Thresholds' } },
  { id: 'decision-scenarios', label: { de: '7. Realistische Entscheidungsszenarien', en: '7. Realistic Decision Scenarios' } },
  { id: 'partner-governance', label: { de: '8. Partnernetzwerk-Governance', en: '8. Partner Network Governance' } },
  { id: 'ai-interaction', label: { de: '9. AI-Interaktion', en: '9. AI Interaction' } },
  { id: 'escalation-matrix', label: { de: '10. Eskalationsmatrix', en: '10. Escalation Matrix' } },
  { id: 'risk-profile', label: { de: '11. Risikoprofil', en: '11. Risk Profile' } },
  { id: 'training', label: { de: '12. Trainingsanforderungen', en: '12. Training Requirements' } },
  { id: 'structural-criticality', label: { de: '13. Strukturelle Kritikalität', en: '13. Why This Role Is Structurally Critical' } }
]

const lossRatioData = [
  { period: { de: 'Jan', en: 'Jan' }, value: 62 },
  { period: { de: 'Feb', en: 'Feb' }, value: 64 },
  { period: { de: 'Mär', en: 'Mar' }, value: 66 },
  { period: { de: 'Apr', en: 'Apr' }, value: 63 },
  { period: { de: 'Mai', en: 'May' }, value: 61 }
]

const avgClaimCostData = [
  { period: { de: 'Jan', en: 'Jan' }, value: 7200 },
  { period: { de: 'Feb', en: 'Feb' }, value: 7600 },
  { period: { de: 'Mär', en: 'Mar' }, value: 8100 },
  { period: { de: 'Apr', en: 'Apr' }, value: 7900 },
  { period: { de: 'Mai', en: 'May' }, value: 7500 }
]

const severityFrequencyData = [
  { bucket: { de: 'Flotte', en: 'Fleet' }, severity: 8.4, frequency: 3.2 },
  { bucket: { de: 'Cargo', en: 'Cargo' }, severity: 9.1, frequency: 2.4 },
  { bucket: { de: 'Komposit', en: 'Composite' }, severity: 6.3, frequency: 4.1 }
]

const reserveDevelopmentData = [
  { quarter: 'Q1', initialReserve: 4.8, updatedReserve: 5.1 },
  { quarter: 'Q2', initialReserve: 5.0, updatedReserve: 5.4 },
  { quarter: 'Q3', initialReserve: 5.4, updatedReserve: 5.3 },
  { quarter: 'Q4', initialReserve: 5.2, updatedReserve: 5.0 }
]

const fraudDetectionRateData = [
  { quarter: 'Q1', value: 6.1 },
  { quarter: 'Q2', value: 6.8 },
  { quarter: 'Q3', value: 7.3 },
  { quarter: 'Q4', value: 7.0 }
]

const aiOverrideData = [
  { caseLabel: 'Case A', aiConfidence: 91, override: 0 },
  { caseLabel: 'Case B', aiConfidence: 67, override: 1 },
  { caseLabel: 'Case C', aiConfidence: 74, override: 1 },
  { caseLabel: 'Case D', aiConfidence: 88, override: 0 }
]

const lifecycleSteps: BiText[] = [
  { de: 'FNOL', en: 'FNOL' },
  { de: 'Deckungsprüfung', en: 'Coverage Check' },
  { de: 'Triage', en: 'Triage' },
  { de: 'Reserve setzen', en: 'Reserve Set' },
  { de: 'Partnerzuweisung', en: 'Partner Assignment' },
  { de: 'Untersuchung', en: 'Investigation' },
  { de: 'Regulierung/Litigation', en: 'Settlement/Litigation' },
  { de: 'Recovery/Subrogation', en: 'Recovery/Subrogation' },
  { de: 'Abschluss', en: 'Closure' }
]

const authorityBands = [
  { role: { de: 'Claims Handler', en: 'Claims Handler' }, limit: { de: 'bis 25.000 €', en: 'up to €25k' }, width: '28%', color: '#94a3b8' },
  { role: { de: 'Senior Handler', en: 'Senior Handler' }, limit: { de: 'bis 100.000 €', en: 'up to €100k' }, width: '58%', color: '#64748b' },
  { role: { de: 'Head of Claims (MGA)', en: 'Head of Claims (MGA)' }, limit: { de: 'über 100.000 € oder Litigation', en: 'above €100k or litigation' }, width: '100%', color: '#0f172a' }
]

export default function HeadOfClaimsMgaRolePage() {
  const { lang } = useI18n()
  const l: Lang = lang === 'de' ? 'de' : 'en'
  const navigate = useNavigate()

  function handlePrint() {
    const oldTitle = document.title
    document.title = bi({ de: 'Head_of_Claims_MGA_Rollenprofil', en: 'Head_of_Claims_MGA_Role_Profile' }, l)
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
              title={bi({ de: 'Head of Claims (MGA) – Executive-Rollenprofil', en: 'Head of Claims (MGA) – Executive Role Profile' }, l)}
              subtitle={bi({ de: 'Inside Insurfox / Rollen / Head of Claims (MGA)', en: 'Inside Insurfox / Roles / Head of Claims (MGA)' }, l)}
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
            <span>Head of Claims (MGA)</span>
          </div>

          <div className="print-hide" style={{ marginTop: '0.8rem', display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {anchors.map((a) => (
              <a key={a.id} href={`#${a.id}`} style={anchorStyle}>{bi(a.label, l)}</a>
            ))}
          </div>
        </Card>

        <Card title={bi({ de: '1. Executive-Rollendefinition', en: '1. Executive Role Definition' }, l)}>
          <div id="executive-definition" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Der Head of Claims (MGA) verantwortet die Governance des gesamten Schadenlebenszyklus: Reservierungsphilosophie, Leakage-Control, Litigation-Strategie, Betrugsaufsicht, Partnernetzwerk-Steuerung, SLA-Performance und Stabilisierung der Schadenquote.', en: 'The Head of Claims (MGA) owns governance of the full claims lifecycle: reserve philosophy, leakage control, litigation strategy, fraud oversight, partner network steering, SLA performance, and loss-ratio stabilization.' }, l)}</p>
            <p style={pStyle}>{bi({ de: 'Abgrenzung: Der Claims Handler arbeitet operativ fallbezogen, der Head of Claims steuert strategisch Schwellen, Policies und Ergebnisqualität. Carrier Claims Supervisor und Broker Claims Manager sind Gegenparteien in den jeweiligen Organisationsgrenzen, jedoch nicht System-Owner der MGA-Schadensteuerung.', en: 'Delineation: Claims Handlers execute cases operationally; the Head of Claims sets strategic thresholds, policies, and result quality. Carrier Claims Supervisors and Broker Claims Managers are counterpart roles within their own organizations, not owners of MGA claims governance.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '2. Organisatorische Position', en: '2. Organizational Position' }, l)}>
          <div id="organizational-position" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Im MGA-Setup berichtet die Rolle typischerweise an CEO oder COO. Die Rolle arbeitet eng mit CUO, Reinsurance Manager, Fraud Analyst, Legal Counsel, Compliance Officer und AI Governance Officer zusammen.', en: 'In an MGA structure, the role typically reports to the CEO or COO. It works closely with the CUO, Reinsurance Manager, Fraud Analyst, Legal Counsel, Compliance Officer, and AI Governance Officer.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '3. Finanzielle Verantwortung', en: '3. Financial Responsibility' }, l)}>
          <div id="financial-responsibility" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Schadenprozesse treiben die Schadenquote direkt und beeinflussen Combined Ratio, Reserve-Genauigkeit, Leakage-Rate, Reinsurance-Recovery und Expense Ratio. Reserve-Disziplin ist kapitalwirksam: zu niedrige Reserven erhöhen Nachreservierungsrisiko, zu hohe Reserven binden unnötig Kapital.', en: 'Claims operations directly drive loss ratio and influence combined ratio, reserve accuracy, leakage rate, reinsurance recovery, and expense ratio. Reserve discipline is capital-critical: under-reserving creates adverse development risk, while over-reserving ties up capital.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '4. Claims-Lifecycle', en: '4. Claims Lifecycle Visualization' }, l)}>
          <div id="claims-lifecycle" style={{ display: 'grid', gap: '0.7rem' }}>
            <div style={timelineRowStyle}>
              {lifecycleSteps.map((step, idx) => (
                <div key={step.en} style={timelineItemStyle}>
                  <div style={timelineNodeStyle}>{idx + 1}</div>
                  <div style={timelineLabelStyle}>{bi(step, l)}</div>
                  {idx < lifecycleSteps.length - 1 ? <div style={timelineConnectorStyle} /> : null}
                </div>
              ))}
            </div>
            <div style={controlCalloutGridStyle}>
              <div style={controlCalloutStyle}>
                <strong>{bi({ de: 'Governance-Regeln', en: 'Governance Rules' }, l)}</strong>
                <span>{bi({ de: 'Deckung, Reserve, SLA, Litigation', en: 'Coverage, reserve, SLA, litigation' }, l)}</span>
              </div>
              <div style={controlCalloutStyle}>
                <strong>{bi({ de: 'Schwellenfreigaben', en: 'Threshold Approvals' }, l)}</strong>
                <span>{bi({ de: 'Ab 100.000 € und Sonderfälle', en: 'Above €100k and exception cases' }, l)}</span>
              </div>
              <div style={controlCalloutStyle}>
                <strong>{bi({ de: 'Partner-Policy', en: 'Partner Selection Policy' }, l)}</strong>
                <span>{bi({ de: 'Qualität, Kosten, Recovery-Quote', en: 'Quality, cost, recovery rate' }, l)}</span>
              </div>
              <div style={controlCalloutStyle}>
                <strong>{bi({ de: 'Eskalationsdesign', en: 'Escalation Design' }, l)}</strong>
                <span>{bi({ de: 'Legal, Compliance, CUO, Reinsurance', en: 'Legal, compliance, CUO, reinsurance' }, l)}</span>
              </div>
            </div>
            <p style={pStyle}>{bi({ de: 'Der Head of Claims steuert Governance-Regeln, Schwellenfreigaben, Partnerauswahlpolicy und Eskalationsdesign über den gesamten Ablauf.', en: 'The Head of Claims controls governance rules, threshold approvals, partner selection policy, and escalation design across the lifecycle.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '5. KPI-Dashboard', en: '5. KPI Dashboard' }, l)}>
          <div id="kpi-dashboard" style={chartGridStyle}>
            <ChartCard title={bi({ de: 'Schadenquote-Verlauf', en: 'Loss Ratio Trend' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lossRatioData.map((d) => ({ ...d, label: bi(d.period, l) }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#0f172a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Ø-Schadenkosten', en: 'Average Claim Cost' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={avgClaimCostData.map((d) => ({ ...d, label: bi(d.period, l) }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#334155" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Schadenhöhe vs. Frequenz', en: 'Severity vs Frequency' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={severityFrequencyData.map((d) => ({ ...d, label: bi(d.bucket, l) }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="severity" fill="#0f172a" name={bi({ de: 'Schadenhöhe', en: 'Severity' }, l)} />
                  <Bar dataKey="frequency" fill="#64748b" name={bi({ de: 'Frequenz', en: 'Frequency' }, l)} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Reserve-Entwicklung', en: 'Reserve Development' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={reserveDevelopmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="initialReserve" stroke="#0f172a" strokeWidth={2} name={bi({ de: 'Initialreserve', en: 'Initial Reserve' }, l)} />
                  <Line type="monotone" dataKey="updatedReserve" stroke="#b91c1c" strokeWidth={2} name={bi({ de: 'Aktualisierte Reserve', en: 'Updated Reserve' }, l)} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Betrugserkennungsrate', en: 'Fraud Detection Rate' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fraudDetectionRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#334155" name={bi({ de: 'Rate (%)', en: 'Rate (%)' }, l)} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </Card>

        <Card title={bi({ de: '6. Claims-Kompetenzschwellen', en: '6. Claims Authority Threshold Visualization' }, l)}>
          <div id="authority-thresholds" style={{ display: 'grid', gap: '0.65rem' }}>
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
            <div style={tierDiagramStyle}>
              <div style={{ ...tierBoxStyle, width: '34%', background: '#e2e8f0' }}>L1</div>
              <div style={{ ...tierBoxStyle, width: '56%', background: '#cbd5e1' }}>L2</div>
              <div style={{ ...tierBoxStyle, width: '100%', background: '#94a3b8' }}>L3</div>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '7. Realistische Entscheidungsszenarien', en: '7. Realistic Decision Scenarios' }, l)}>
          <div id="decision-scenarios" style={{ display: 'grid', gap: '0.75rem' }}>
            <ScenarioCard
              lang={l}
              title={bi({ de: 'Szenario 1: Großer Flotten-Totalschaden mit Telematik-Streit', en: 'Scenario 1: Large fleet total loss with telematics dispute' }, l)}
              facts={bi({ de: 'Mehrfachkollision, Telematikdaten widersprüchlich zur Fahrerangabe.', en: 'Multi-vehicle total loss; telematics data conflicts with driver statement.' }, l)}
              ai={bi({ de: 'AI markiert mittlere Betrugswahrscheinlichkeit, niedrige Confidence.', en: 'AI flags moderate fraud probability with low confidence.' }, l)}
              risk={bi({ de: 'Hoher Severity-Impact, mögliche Regressoption unsicher.', en: 'High severity impact, uncertain recovery path.' }, l)}
              decision={bi({ de: 'Forensische Zusatzprüfung + Reserve-Anhebung + Eskalation an Legal.', en: 'Initiate forensic review, raise reserve, escalate to legal counsel.' }, l)}
              financial={bi({ de: 'Kurzfristig höhere Reservebelastung, geringeres Nachreservierungsrisiko.', en: 'Higher short-term reserve load, reduced adverse development risk.' }, l)}
              reinsurance={bi({ de: 'Prüfung möglicher Recovery-Trigger und Dokumentationsqualität.', en: 'Validate potential recovery triggers and evidence quality.' }, l)}
            />

            <ScenarioCard
              lang={l}
              title={bi({ de: 'Szenario 2: Cargo-Diebstahl mit grenzüberschreitender Jurisdiktion', en: 'Scenario 2: Cargo theft with cross-border jurisdiction' }, l)}
              facts={bi({ de: 'Diebstahlfall über zwei Rechtsräume mit unterschiedlichen Nachweisanforderungen.', en: 'Cargo theft across two jurisdictions with divergent legal requirements.' }, l)}
              ai={bi({ de: 'AI priorisiert schnellen Abschluss aufgrund historischer Muster.', en: 'AI suggests fast settlement based on historical patterns.' }, l)}
              risk={bi({ de: 'Regulatorisches und juristisches Risiko bei verfrühter Regulierung.', en: 'Regulatory and legal risk if settled prematurely.' }, l)}
              decision={bi({ de: 'Juristische Vorprüfung, Reserve konservativ setzen, Subrogation früh aktivieren.', en: 'Run legal pre-check, set conservative reserve, activate subrogation early.' }, l)}
              financial={bi({ de: 'Stabilisiert Leakage und verhindert teure Nachforderungen.', en: 'Stabilizes leakage and prevents costly reopeners.' }, l)}
              reinsurance={bi({ de: 'Sichert treaty-konforme Falldokumentation für Recovery.', en: 'Secures treaty-compliant documentation for recovery.' }, l)}
            />

            <ScenarioCard
              lang={l}
              title={bi({ de: 'Szenario 3: Personenschaden eskaliert in Litigation', en: 'Scenario 3: Injury claim escalating to litigation' }, l)}
              facts={bi({ de: 'Verletzungsfall mit strittiger Haftungsquote und anwaltlicher Vertretung.', en: 'Injury claim with disputed liability share and legal representation.' }, l)}
              ai={bi({ de: 'AI empfiehlt Vergleich, signalisiert aber hohe Unsicherheit.', en: 'AI suggests settlement but reports high uncertainty.' }, l)}
              risk={bi({ de: 'Reputations- und Präzedenzrisiko bei falscher Vergleichsstrategie.', en: 'Reputational and precedent risk from wrong settlement strategy.' }, l)}
              decision={bi({ de: 'Litigation-Track aktivieren, Vergleichsband definieren, CUO informieren.', en: 'Activate litigation track, define settlement corridor, inform CUO.' }, l)}
              financial={bi({ de: 'Höhere kurzfristige Kosten, bessere Langfristkontrolle über Severity.', en: 'Higher short-term cost, stronger long-term severity control.' }, l)}
              reinsurance={bi({ de: 'Abgleich mit Large-Loss- und Aggregation-Schwellen.', en: 'Align with large-loss and aggregation reinsurance thresholds.' }, l)}
            />

            <ScenarioCard
              lang={l}
              title={bi({ de: 'Szenario 4: Betrugsverdacht bei niedriger AI-Confidence', en: 'Scenario 4: Fraud suspicion with low AI confidence' }, l)}
              facts={bi({ de: 'Unplausible Schadenabfolge, aber keine eindeutigen Beweise im Erstbild.', en: 'Implausible claim chronology, but no definitive first-pass evidence.' }, l)}
              ai={bi({ de: 'AI zeigt inkonsistente Signale unter dem Auto-Block-Schwellenwert.', en: 'AI outputs inconsistent signals below auto-block threshold.' }, l)}
              risk={bi({ de: 'Leakage-Risiko bei zu schneller Zahlung vs. Kundenerlebnis-Risiko bei Verzögerung.', en: 'Leakage risk from fast payment vs. customer experience risk from delay.' }, l)}
              decision={bi({ de: 'Human-in-the-Loop-Prüfung, gezielte Nachforderung, kontrollierte Fristsetzung.', en: 'Apply human-in-the-loop review, request targeted evidence, enforce controlled timeline.' }, l)}
              financial={bi({ de: 'Reduziert Fehlzahlungen bei begrenzter Bearbeitungszeitverlängerung.', en: 'Reduces wrongful payments with limited cycle-time extension.' }, l)}
              reinsurance={bi({ de: 'Nur qualifizierte Verdachtsfälle in Reporting aufnehmen.', en: 'Include only qualified fraud suspicions in reinsurer reporting.' }, l)}
            />
          </div>
        </Card>

        <Card title={bi({ de: '8. Partnernetzwerk-Governance', en: '8. Partner Network Governance' }, l)}>
          <div id="partner-governance" style={{ display: 'grid', gap: '0.7rem' }}>
            <p style={pStyle}>{bi({ de: 'Die Rolle steuert Reparatursteuerung, Mietwagenkostenkontrolle, Abschleppnetz, Gutachterauswahl und Salvage-Recovery-Optimierung. Ziel ist ein balanciertes Verhältnis aus Kosten, Qualität, Geschwindigkeit und Compliance.', en: 'The role governs repair steering, rental-cost control, towing network orchestration, surveyor selection, and salvage recovery optimization. Objective: balanced cost, quality, speed, and compliance.' }, l)}</p>
            <div style={flowStyle}>
              <div style={flowNodeStyle}>{bi({ de: 'Schadenfall', en: 'Claim' }, l)}</div>
              <span style={arrowStyle}>→</span>
              <div style={flowNodeStyle}>Partnerfox</div>
              <span style={arrowStyle}>→</span>
              <div style={flowNodeStyle}>{bi({ de: 'Dienstleister', en: 'Vendor' }, l)}</div>
              <span style={arrowStyle}>→</span>
              <div style={flowNodeStyle}>{bi({ de: 'Kosten-Feedback-Loop', en: 'Cost Feedback Loop' }, l)}</div>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '9. AI-Interaktion', en: '9. AI Interaction' }, l)}>
          <div id="ai-interaction" style={{ display: 'grid', gap: '0.7rem' }}>
            <p style={pStyle}>{bi({ de: 'Der Head of Claims entwickelt keine AI-Modelle. Die Rolle genehmigt Betrugsschwellen, Severity-Override-Regeln, Human-in-the-Loop-Policies, bewertet Drift-Alerts und kann Modelle bei systemischer Verzerrung einfrieren.', en: 'The Head of Claims does not build AI models. The role approves fraud thresholds, severity override rules, human-in-the-loop policies, reviews drift alerts, and can freeze models when systemic bias is detected.' }, l)}</p>
            <div style={chartCardStyle}>
              <h3 style={chartTitleStyle}>{bi({ de: 'AI-Confidence vs. Override', en: 'AI Confidence vs Override' }, l)}</h3>
              <div style={chartWrapStyle}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={aiOverrideData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="caseLabel" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="aiConfidence" fill="#334155" name={bi({ de: 'Confidence', en: 'Confidence' }, l)} />
                    <Bar dataKey="override" fill="#b91c1c" name={bi({ de: 'Override', en: 'Override' }, l)} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '10. Eskalationsmatrix', en: '10. Escalation Matrix' }, l)}>
          <div id="escalation-matrix" style={{ display: 'grid', gap: '0.65rem' }}>
            <div style={escalationHeatmapStyle}>
              {[
                { label: bi({ de: 'CUO', en: 'CUO' }, l), level: bi({ de: 'Hoch', en: 'High' }, l), color: '#b45309' },
                { label: bi({ de: 'Legal Counsel', en: 'Legal Counsel' }, l), level: bi({ de: 'Sehr hoch', en: 'Very High' }, l), color: '#991b1b' },
                { label: bi({ de: 'Compliance', en: 'Compliance' }, l), level: bi({ de: 'Mittel', en: 'Medium' }, l), color: '#334155' },
                { label: bi({ de: 'Carrier', en: 'Carrier' }, l), level: bi({ de: 'Hoch', en: 'High' }, l), color: '#b45309' },
                { label: bi({ de: 'Rückversicherung', en: 'Reinsurance' }, l), level: bi({ de: 'Sehr hoch', en: 'Very High' }, l), color: '#991b1b' }
              ].map((item) => (
                <div key={item.label} style={{ ...escalationHeatCellStyle, borderLeft: `6px solid ${item.color}` }}>
                  <strong>{item.label}</strong>
                  <span>{item.level}</span>
                </div>
              ))}
            </div>
            <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>{bi({ de: 'Trigger', en: 'Trigger' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Eskalation an', en: 'Escalate to' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Zweck', en: 'Purpose' }, l)}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle}>{bi({ de: 'Deckungsinterpretationskonflikt', en: 'Coverage interpretation conflict' }, l)}</td>
                  <td style={tdStyle}>CUO</td>
                  <td style={tdStyle}>{bi({ de: 'Konsistenz zwischen Underwriting und Schadensteuerung', en: 'Align underwriting intent with claims execution' }, l)}</td>
                </tr>
                <tr>
                  <td style={tdStyle}>{bi({ de: 'Litigation-Fall', en: 'Litigation case' }, l)}</td>
                  <td style={tdStyle}>Legal Counsel</td>
                  <td style={tdStyle}>{bi({ de: 'Prozessstrategie und Rechtsrisiko-Management', en: 'Define litigation strategy and legal risk posture' }, l)}</td>
                </tr>
                <tr>
                  <td style={tdStyle}>{bi({ de: 'Regulatorischer Verstoß', en: 'Regulatory breach' }, l)}</td>
                  <td style={tdStyle}>{bi({ de: 'Compliance', en: 'Compliance' }, l)}</td>
                  <td style={tdStyle}>{bi({ de: 'Meldepflichten und Kontrollmaßnahmen', en: 'Execute mandatory reporting and control actions' }, l)}</td>
                </tr>
                <tr>
                  <td style={tdStyle}>{bi({ de: 'Schwellenwertüberschreitung', en: 'Threshold breach' }, l)}</td>
                  <td style={tdStyle}>{bi({ de: 'Carrier', en: 'Carrier' }, l)}</td>
                  <td style={tdStyle}>{bi({ de: 'Kapazitäts- und Autoritätsabgleich', en: 'Align with delegated authority and capacity rules' }, l)}</td>
                </tr>
                <tr>
                  <td style={tdStyle}>{bi({ de: 'Aggregationsereignis', en: 'Aggregation event' }, l)}</td>
                  <td style={tdStyle}>{bi({ de: 'Rückversicherung', en: 'Reinsurance' }, l)}</td>
                  <td style={tdStyle}>{bi({ de: 'Recovery- und Treaty-Trigger sichern', en: 'Secure treaty triggers and recovery readiness' }, l)}</td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '11. Risikoprofil', en: '11. Risk Profile' }, l)}>
          <div id="risk-profile" style={riskGridStyle}>
            <RiskBox label={bi({ de: 'Finanzielles Risiko', en: 'Financial Risk' }, l)} level={bi({ de: 'Hoch', en: 'High' }, l)} color="#7f1d1d" />
            <RiskBox label={bi({ de: 'Litigation-Exponierung', en: 'Litigation Exposure' }, l)} level={bi({ de: 'Hoch', en: 'High' }, l)} color="#7f1d1d" />
            <RiskBox label={bi({ de: 'Reputationsrisiko', en: 'Reputational Exposure' }, l)} level={bi({ de: 'Hoch', en: 'High' }, l)} color="#7f1d1d" />
            <RiskBox label={bi({ de: 'Regulatorisches Risiko', en: 'Regulatory Risk' }, l)} level={bi({ de: 'Mittel', en: 'Medium' }, l)} color="#9a3412" />
            <RiskBox label={bi({ de: 'Technologierisiko', en: 'Technology Risk' }, l)} level={bi({ de: 'Niedrig', en: 'Low' }, l)} color="#166534" />
          </div>
        </Card>

        <Card title={bi({ de: '12. Trainingsanforderungen', en: '12. Training Requirements' }, l)}>
          <div id="training" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Erforderlich sind Führungserfahrung im Schadenmanagement, Litigation-Management, Betrugserkennung, Rückversicherungsverständnis, Data Literacy und AI Literacy. Zusätzlich sind regelmäßige Governance-Trainings für Reservierung, Eskalation und Modell-Override notwendig.', en: 'Required capabilities include claims leadership, litigation management, fraud detection expertise, reinsurance understanding, data literacy, and AI literacy. Regular governance training is also required for reserving discipline, escalation quality, and model override handling.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '13. Warum diese Rolle strukturell kritisch ist', en: '13. Why This Role Is Structurally Critical' }, l)}>
          <div id="structural-criticality" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Ohne disziplinierte Schadensteuerung kollabiert Underwriting-Profitabilität, Kapitalvolatilität steigt, Rückversicherungsvertrauen sinkt, Broker-Vertrauen leidet und Kundenzufriedenheit erodiert. Der Head of Claims ist der Ergebnisstabilisator des MGA.', en: 'Without disciplined claims control, underwriting profitability collapses, capital volatility rises, reinsurance trust weakens, broker confidence drops, and customer trust erodes. The Head of Claims is the MGA profitability stabilizer.' }, l)}</p>
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

function ScenarioCard({
  lang,
  title,
  facts,
  ai,
  risk,
  decision,
  financial,
  reinsurance
}: {
  lang: Lang
  title: string
  facts: string
  ai: string
  risk: string
  decision: string
  financial: string
  reinsurance: string
}) {
  return (
    <div style={scenarioCardStyle}>
      <h3 style={subHeadingStyle}>{title}</h3>
      <p style={noteStyle}><strong>{bi({ de: 'Fakten:', en: 'Facts:' }, lang)}</strong> {facts}</p>
      <p style={noteStyle}><strong>{bi({ de: 'AI-Output:', en: 'AI output:' }, lang)}</strong> {ai}</p>
      <p style={noteStyle}><strong>{bi({ de: 'Risikosignale:', en: 'Risk signals:' }, lang)}</strong> {risk}</p>
      <p style={noteStyle}><strong>{bi({ de: 'Entscheidung:', en: 'Decision:' }, lang)}</strong> {decision}</p>
      <p style={noteStyle}><strong>{bi({ de: 'Finanzielle Wirkung:', en: 'Financial impact:' }, lang)}</strong> {financial}</p>
      <p style={noteStyle}><strong>{bi({ de: 'Rückversicherungswirkung:', en: 'Reinsurance impact:' }, lang)}</strong> {reinsurance}</p>
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

const lifecycleWrapStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.45rem',
  alignItems: 'center'
}

const timelineRowStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '0.55rem',
  alignItems: 'stretch'
}

const timelineItemStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 10,
  background: '#f8fafc',
  padding: '0.55rem',
  display: 'grid',
  gap: '0.35rem'
}

const timelineNodeStyle: CSSProperties = {
  width: 24,
  height: 24,
  borderRadius: 999,
  background: '#0f172a',
  color: '#fff',
  display: 'grid',
  placeItems: 'center',
  fontSize: '0.75rem',
  fontWeight: 700
}

const timelineLabelStyle: CSSProperties = {
  fontSize: '0.82rem',
  color: '#0f172a',
  fontWeight: 600,
  lineHeight: 1.4
}

const timelineConnectorStyle: CSSProperties = {
  height: 4,
  borderRadius: 999,
  background: '#cbd5e1'
}

const controlCalloutGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '0.55rem'
}

const controlCalloutStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 10,
  background: '#f8fafc',
  padding: '0.5rem 0.6rem',
  display: 'grid',
  gap: '0.2rem',
  color: '#334155',
  fontSize: '0.8rem'
}

const lifecycleStepStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 999,
  background: '#f8fafc',
  color: '#0f172a',
  fontSize: '0.79rem',
  padding: '0.3rem 0.65rem',
  whiteSpace: 'nowrap'
}

const arrowStyle: CSSProperties = {
  color: '#64748b',
  fontWeight: 700
}

const chartGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
  gap: '0.45rem'
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
  height: 150
}

const scenarioCardStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 10,
  padding: '0.65rem',
  background: '#f8fafc',
  display: 'grid',
  gap: '0.35rem'
}

const tierDiagramStyle: CSSProperties = {
  marginTop: '0.2rem',
  display: 'grid',
  gap: '0.35rem'
}

const tierBoxStyle: CSSProperties = {
  borderRadius: 8,
  padding: '0.35rem 0.55rem',
  color: '#0f172a',
  fontSize: '0.78rem',
  fontWeight: 700,
  textAlign: 'right'
}

const flowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.4rem',
  alignItems: 'center'
}

const flowNodeStyle: CSSProperties = {
  border: '1px solid #cbd5e1',
  borderRadius: 10,
  background: '#f8fafc',
  color: '#0f172a',
  padding: '0.45rem 0.7rem',
  fontSize: '0.82rem'
}

const tableStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  minWidth: 780,
  fontSize: '0.84rem'
}

const escalationHeatmapStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
  gap: '0.45rem'
}

const escalationHeatCellStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 8,
  background: '#f8fafc',
  padding: '0.45rem 0.55rem',
  display: 'grid',
  gap: '0.15rem',
  color: '#0f172a',
  fontSize: '0.78rem'
}

const thStyle: CSSProperties = {
  textAlign: 'left',
  padding: '0.5rem 0.6rem',
  borderBottom: '1px solid #cbd5e1',
  color: '#334155',
  background: '#f8fafc'
}

const tdStyle: CSSProperties = {
  padding: '0.5rem 0.6rem',
  borderBottom: '1px solid #e2e8f0',
  color: '#0f172a'
}

const riskGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '0.6rem'
}

const riskBoxStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 10,
  background: '#f8fafc',
  padding: '0.55rem 0.6rem',
  display: 'grid',
  gap: '0.2rem',
  color: '#0f172a',
  fontSize: '0.84rem'
}
