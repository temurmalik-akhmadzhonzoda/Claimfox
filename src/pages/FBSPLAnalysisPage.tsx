import { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
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
import {
  companyProfile,
  differentiation,
  referenceUrls,
  risks,
  services,
  type BiText
} from '@/analysis/fbspl/fbsplData'

type OperatingRow = {
  category: BiText
  fbspl: BiText
  insurfox: BiText
}

type FitOption = {
  key: keyof FitChecks
  label: BiText
  weight: number
}

type FitChecks = {
  decisionAuthority: boolean
  underwritingFocus: boolean
  claimsOpsExposure: boolean
  partnershipsExposure: boolean
  techOpenness: boolean
}

type ContactForm = {
  name: string
  currentRole: string
  location: string
  focusLines: string
  markets: string
  seniority: string
  notes: string
  lastActivityHighlights: string
}

const operatingModelRows: OperatingRow[] = [
  {
    category: { de: 'Primäre Rolle', en: 'Primary role' },
    fbspl: { de: 'Outsourcing- und Consulting-Partner mit operativer Kapazität', en: 'Outsourcing and consulting partner with operational capacity' },
    insurfox: { de: 'MGA/Broker + Plattformoperator mit AI-Workflow-Ausführung', en: 'MGA/broker + platform operator with AI workflow execution' }
  },
  {
    category: { de: 'Entscheidungsmandat', en: 'Decision mandate' },
    fbspl: { de: 'Unterstützend; regulierte Entscheidungen verbleiben beim Mandanten', en: 'Supportive; regulated decisions stay with principal' },
    insurfox: { de: 'Steuert Entscheidungslogik, Governance und Delegationsrahmen', en: 'Steers decision logic, governance, and delegation framework' }
  },
  {
    category: { de: 'Werttreiber', en: 'Value driver' },
    fbspl: { de: 'Kostenhebel, Durchsatz, Servicequalität', en: 'Cost leverage, throughput, service quality' },
    insurfox: { de: 'Digitale Orchestrierung, Data Ownership, AI-Kontrolle', en: 'Digital orchestration, data ownership, AI control' }
  },
  {
    category: { de: 'Automatisierungsansatz', en: 'Automation approach' },
    fbspl: { de: 'Prozessautomatisierung als Enablement auf operativer Ebene', en: 'Process automation as operational enablement' },
    insurfox: { de: 'Workflow-native Automatisierung über Plattformmodule', en: 'Workflow-native automation across platform modules' }
  },
  {
    category: { de: 'Skalierungsmodus', en: 'Scaling mode' },
    fbspl: { de: 'People/process-first mit SLA-Steuerung', en: 'People/process-first with SLA governance' },
    insurfox: { de: 'Technology-first mit hybrider Ops-Integration', en: 'Technology-first with hybrid ops integration' }
  },
  {
    category: { de: 'Konfliktpotenzial', en: 'Conflict potential' },
    fbspl: { de: 'Mittel: Governance, QA, Datenzugriff', en: 'Medium: governance, QA, data access' },
    insurfox: { de: 'Mittel: Abgrenzung intern/extern und Compliance-Verantwortung', en: 'Medium: internal/external boundary and compliance accountability' }
  }
]

const processSteps = [
  {
    name: { de: 'Intake', en: 'Intake' },
    detail: { de: 'Submission/Case-Übernahme inkl. Dokumentklassifizierung.', en: 'Submission/case intake with document classification.' }
  },
  {
    name: { de: 'Validierung', en: 'Validation' },
    detail: { de: 'Datenvollständigkeit, Rule-Checks, SLA-Routing.', en: 'Data completeness, rule checks, SLA routing.' }
  },
  {
    name: { de: 'Bearbeitung', en: 'Execution' },
    detail: { de: 'Policy/Claims/Ops-Tasks in standardisierten Workflows.', en: 'Policy/claims/ops tasks in standardized workflows.' }
  },
  {
    name: { de: 'QA & Compliance', en: 'QA & Compliance' },
    detail: { de: 'Stichproben, Eskalation, regulatorische Trennung.', en: 'Sampling, escalation, regulatory separation.' }
  },
  {
    name: { de: 'Reporting', en: 'Reporting' },
    detail: { de: 'KPI-Board, Rework-Tracking, Verbesserungsmaßnahmen.', en: 'KPI board, rework tracking, improvement actions.' }
  }
]

const strategicValueOverlap = [
  { name: 'Back-office MGA ops', overlap: 38, value: 90 },
  { name: 'Claims support desk', overlap: 44, value: 86 },
  { name: 'UW support services', overlap: 52, value: 82 },
  { name: 'Data operations', overlap: 59, value: 74 },
  { name: 'Customer support', overlap: 65, value: 69 }
]

const capabilityCoverage = [
  { capability: 'Policy Admin', score: 86 },
  { capability: 'Claims Support', score: 81 },
  { capability: 'UW Support', score: 76 },
  { capability: 'Data Ops', score: 71 },
  { capability: 'Customer Service', score: 80 },
  { capability: 'BI', score: 66 }
]

const boardOptions = [
  { option: 'A', labelDe: 'Pilot (nur nicht-regulierte Prozesse)', labelEn: 'Pilot (non-regulated processes only)', risk: 2, control: 4, timeToScale: 3, complianceComplexity: 2, upside: 3 },
  { option: 'B', labelDe: 'Skalierung als Ops-Partner', labelEn: 'Scale as ops partner', risk: 3, control: 3, timeToScale: 4, complianceComplexity: 3, upside: 4 },
  { option: 'C', labelDe: 'Joint Delivery (Ops + Automatisierung)', labelEn: 'Joint delivery (ops + automation)', risk: 3, control: 4, timeToScale: 4, complianceComplexity: 4, upside: 5 },
  { option: 'D', labelDe: 'Keine Partnerschaft / intern aufbauen', labelEn: 'No partnership / build internal', risk: 4, control: 5, timeToScale: 2, complianceComplexity: 4, upside: 2 }
]

const demoActivityFeed = [
  { date: '2026-01-28', themeDe: 'Underwriting Ops', themeEn: 'Underwriting ops', textDe: 'Beitrag zu schnelleren Submission-TATs über strukturierte Intake-Prozesse.', textEn: 'Post about faster submission TAT using structured intake workflows.' },
  { date: '2026-01-12', themeDe: 'Claims Efficiency', themeEn: 'Claims efficiency', textDe: 'Diskussion zu Dokumentationsqualität und geringerer Rework-Quote im Claims Desk.', textEn: 'Discussion on documentation quality and lower rework rates in claims desks.' },
  { date: '2025-12-18', themeDe: 'Outsourcing', themeEn: 'Outsourcing', textDe: 'Einblick in BPO-Modelle für Renewal-Backlogs in P&C-Portfolios.', textEn: 'Insight into BPO models to absorb renewal backlogs in P&C portfolios.' },
  { date: '2025-11-30', themeDe: 'Automation', themeEn: 'Automation', textDe: 'Kommentar zu Prozessautomatisierung in Policy-Endorsements und COI-Issuance.', textEn: 'Commentary on automation in policy endorsements and COI issuance.' },
  { date: '2025-11-10', themeDe: 'Compliance', themeEn: 'Compliance', textDe: 'Hinweis auf klare Kontrollpunkte bei ausgelagerten Versicherungsprozessen.', textEn: 'Reminder on clear control checkpoints in outsourced insurance workflows.' },
  { date: '2025-10-24', themeDe: 'Partnerships', themeEn: 'Partnerships', textDe: 'Praxisbeispiel zur Zusammenarbeit zwischen Carrier, MGA und BPO-Team.', textEn: 'Example of collaboration between carrier, MGA, and BPO delivery teams.' }
]

const fitOptions: FitOption[] = [
  { key: 'decisionAuthority', label: { de: 'Decision authority', en: 'Decision authority' }, weight: 30 },
  { key: 'underwritingFocus', label: { de: 'Underwriting focus', en: 'Underwriting focus' }, weight: 18 },
  { key: 'claimsOpsExposure', label: { de: 'Claims ops exposure', en: 'Claims ops exposure' }, weight: 18 },
  { key: 'partnershipsExposure', label: { de: 'Partnerships/MGA exposure', en: 'Partnerships/MGA exposure' }, weight: 16 },
  { key: 'techOpenness', label: { de: 'Tech openness', en: 'Tech openness' }, weight: 18 }
]

const orgMapContacts = [
  { role: { de: 'Executive Sponsor', en: 'Executive sponsor' }, owner: 'Insurfox CEO / COO', note: { de: 'Board-Entscheidungsrahmen, Risikotoleranz, Budgetfreigabe.', en: 'Board decision frame, risk tolerance, budget release.' } },
  { role: { de: 'Ops Lead', en: 'Ops lead' }, owner: 'FBSPL Delivery Manager', note: { de: 'SLA-Steuerung, Staffing, Qualität.', en: 'SLA governance, staffing, quality.' } },
  { role: { de: 'Compliance Lead', en: 'Compliance lead' }, owner: 'Insurfox Compliance', note: { de: 'Abgrenzung regulierter Entscheidungen.', en: 'Boundary for regulated decisions.' } },
  { role: { de: 'Tech Integration', en: 'Tech integration' }, owner: 'Brokerfox / Claimsfox Product', note: { de: 'Workflow- und Datenschnittstellen, Audit Logs.', en: 'Workflow/data integrations, audit logs.' } }
]

const defaultContactForm: ContactForm = {
  name: '',
  currentRole: '',
  location: '',
  focusLines: '',
  markets: '',
  seniority: '',
  notes: '',
  lastActivityHighlights: ''
}

function bi(value: BiText, lang: 'de' | 'en') {
  return lang === 'de' ? value.de : value.en
}

function riskColor(score: number) {
  if (score >= 16) return '#b91c1c'
  if (score >= 12) return '#dc2626'
  if (score >= 8) return '#f97316'
  if (score >= 5) return '#f59e0b'
  return '#16a34a'
}

export default function FBSPLAnalysisPage() {
  const { lang } = useI18n()
  const l = lang === 'de' ? 'de' : 'en'

  const [annualVolume, setAnnualVolume] = useState(80_000)
  const [inhouseCost, setInhouseCost] = useState(38)
  const [outsourcingCost, setOutsourcingCost] = useState(26)
  const [qaReworkRate, setQaReworkRate] = useState(7)
  const [fitChecks, setFitChecks] = useState<FitChecks>({
    decisionAuthority: false,
    underwritingFocus: false,
    claimsOpsExposure: false,
    partnershipsExposure: false,
    techOpenness: false
  })
  const [contactForm, setContactForm] = useState<ContactForm>(defaultContactForm)

  const fitScore = useMemo(() => {
    return fitOptions.reduce((sum, option) => sum + (fitChecks[option.key] ? option.weight : 0), 0)
  }, [fitChecks])

  const fitLabel = useMemo(() => {
    if (fitScore >= 70) return bi({ de: 'Hoch', en: 'High' }, l)
    if (fitScore >= 40) return bi({ de: 'Mittel', en: 'Medium' }, l)
    return bi({ de: 'Niedrig', en: 'Low' }, l)
  }, [fitScore, l])

  const finance = useMemo(() => {
    const grossSavings = annualVolume * (inhouseCost - outsourcingCost)
    const qaPenalty = annualVolume * outsourcingCost * (qaReworkRate / 100) * 0.35
    const riskAdjustedSavings = grossSavings - qaPenalty
    const transitionCost = 120_000 + annualVolume * 0.45
    const monthlyAdjusted = riskAdjustedSavings / 12
    const breakEvenMonths = monthlyAdjusted > 0 ? transitionCost / monthlyAdjusted : Number.POSITIVE_INFINITY

    return {
      grossSavings,
      qaPenalty,
      riskAdjustedSavings,
      breakEvenMonths,
      transitionCost
    }
  }, [annualVolume, inhouseCost, outsourcingCost, qaReworkRate])

  const costScenarioData = useMemo(() => {
    const baseMonthly = (annualVolume * inhouseCost) / 12
    const outsourcedMonthly = (annualVolume * outsourcingCost) / 12
    return Array.from({ length: 12 }, (_, idx) => {
      const month = idx + 1
      const onboardingPenalty = month <= 3 ? finance.transitionCost / 6 : 0
      return {
        month,
        baseline: Math.round(baseMonthly),
        withOutsourcing: Math.round(outsourcedMonthly + onboardingPenalty)
      }
    })
  }, [annualVolume, inhouseCost, outsourcingCost, finance.transitionCost])

  function handleContactChange(key: keyof ContactForm, value: string) {
    setContactForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleExportPdf() {
    const oldTitle = document.title
    document.title = 'FBSPL_Executive_Partner_Analysis'
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
          .fbspl-print-hide { display: none !important; }
        }
      `}</style>
      <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', display: 'grid', gap: '1rem' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <Header
              title={bi({ de: 'FBSPL Executive Partner Analysis', en: 'FBSPL Executive Partner Analysis' }, l)}
              subtitle={bi({ de: 'Decision Support Report: FBSPL als operativer Partner im Insurfox Hybridmodell', en: 'Decision support report: FBSPL as an operational partner in the Insurfox hybrid model' }, l)}
              titleColor="#0f172a"
              subtitleColor="#475569"
            />
            <div className="fbspl-print-hide" style={{ position: 'sticky', top: 84 }}>
              <Button size="sm" onClick={handleExportPdf}>{bi({ de: 'Executive Report herunterladen (PDF)', en: 'Download Executive Report (PDF)' }, l)}</Button>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: 'Executive Summary', en: 'Executive Summary' }, l)}>
          <div style={{ display: 'grid', gap: '0.6rem', color: '#334155', lineHeight: 1.65 }}>
            <p style={{ margin: 0 }}>{bi({ de: 'FBSPL ist als operativer Outsourcing- und Consulting-Partner besonders relevant, wenn Insurfox kurzfristig Durchsatz in policy-, claims- und underwriting-nahen Prozessen erhöhen will.', en: 'FBSPL is most relevant as an operational outsourcing and consulting partner when Insurfox needs to increase short-term throughput in policy, claims, and underwriting-adjacent processes.' }, l)}</p>
            <p style={{ margin: 0 }}>{bi({ de: 'Strategischer Nutzen entsteht vor allem im nicht-regulierten Backoffice: Policy-Admin, COI-Issuance, Renewals, Claims-Triage und Dokumentenaufbereitung.', en: 'Strategic value is strongest in non-regulated back-office scopes: policy admin, COI issuance, renewals, claims triage, and documentation preparation.' }, l)}</p>
            <p style={{ margin: 0 }}>{bi({ de: 'Insurfox bleibt Entscheidungsträger für Underwriting-/Claims-Mandate und nutzt FBSPL als Kapazitätslayer in klaren SLA- und Governance-Grenzen.', en: 'Insurfox remains decision owner for underwriting/claims mandates and uses FBSPL as a capacity layer under clear SLA and governance boundaries.' }, l)}</p>
            <p style={{ margin: 0 }}>{bi({ de: 'Empfehlung: Option A/B als kontrollierte Einstiegsstrategie, Option C nur mit belastbarer Compliance- und QA-Architektur.', en: 'Recommendation: Option A/B as controlled entry strategy, Option C only with robust compliance and QA architecture.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: 'Company Profile: FBSPL vs Insurfox', en: 'Company Profile: FBSPL vs Insurfox' }, l)}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1rem' }}>
            <Card title="FBSPL">
              <ul style={listStyle}>
                {companyProfile.fbspl.map((row) => (
                  <li key={row.label.en}><strong>{bi(row.label, l)}:</strong> {bi(row.value, l)}</li>
                ))}
              </ul>
              <p style={pMuted}>{bi(differentiation, l)}</p>
            </Card>
            <Card title="Insurfox">
              <ul style={listStyle}>
                {companyProfile.insurfox.map((row) => (
                  <li key={row.label.en}><strong>{bi(row.label, l)}:</strong> {bi(row.value, l)}</li>
                ))}
              </ul>
              <div style={{ marginTop: '0.6rem', color: '#334155' }}>
                <strong>{bi({ de: 'Wo FBSPL hineinpasst', en: 'Where FBSPL fits' }, l)}:</strong>
                <ul style={listStyle}>
                  <li>{bi({ de: 'Option 1: Back-office Scaling Partner für MGA-Ops (Policy Admin, Endorsements, COI, Renewals).', en: 'Option 1: Back-office scaling partner for MGA ops (policy admin, endorsements, COI, renewals).' }, l)}</li>
                  <li>{bi({ de: 'Option 2: Claims Support Desk (Triage, Dokumentation, Follow-ups) integriert in Claimsfox.', en: 'Option 2: Claims support desk (triage, documentation, follow-ups) integrated in Claimsfox.' }, l)}</li>
                  <li>{bi({ de: 'Option 3: UW Support (Submission Intake, Data Enrichment) in Brokerfox/Underwriting Workbench.', en: 'Option 3: UW support (submission intake, data enrichment) in Brokerfox/underwriting workbench.' }, l)}</li>
                </ul>
              </div>
              <p style={{ ...pMuted, marginTop: '0.6rem' }}>{bi({ de: 'Boundary: Keine Delegation regulierter Entscheidungen ohne definierte Governance und Freigabeprozesse.', en: 'Boundary: no delegation of regulated decisions without defined governance and approval workflows.' }, l)}</p>
            </Card>
          </div>
        </Card>

        <Card title={bi({ de: 'Operating Model Comparison', en: 'Operating Model Comparison' }, l)}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{bi({ de: 'Kategorie', en: 'Category' }, l)}</th>
                  <th style={thStyle}>FBSPL</th>
                  <th style={thStyle}>Insurfox</th>
                </tr>
              </thead>
              <tbody>
                {operatingModelRows.map((row) => (
                  <tr key={row.category.en}>
                    <td style={tdStrongStyle}>{bi(row.category, l)}</td>
                    <td style={tdStyle}>{bi(row.fbspl, l)}</td>
                    <td style={tdStyle}>{bi(row.insurfox, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title={bi({ de: 'Delivery Capabilities: Process Map + Metrics', en: 'Delivery Capabilities: Process Map + Metrics' }, l)}>
          <div style={{ display: 'grid', gap: '0.8rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem' }}>
              {processSteps.map((step, idx) => (
                <div key={step.name.en} style={{ border: '1px solid #e2e8f0', borderRadius: 10, background: '#f8fafc', padding: '0.7rem' }}>
                  <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginBottom: '0.25rem' }}>0{idx + 1}</div>
                  <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>{bi(step.name, l)}</div>
                  <div style={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.45 }}>{bi(step.detail, l)}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.6rem' }}>
              <MetricCard label={bi({ de: 'SLA-Erfüllung (Demo)', en: 'SLA adherence (demo)' }, l)} value="94%" />
              <MetricCard label={bi({ de: 'Avg. Turnaround', en: 'Avg. turnaround' }, l)} value="<24h" />
              <MetricCard label={bi({ de: 'QA First Pass', en: 'QA first pass' }, l)} value="91%" />
              <MetricCard label={bi({ de: 'Rework Quote', en: 'Rework rate' }, l)} value={`${qaReworkRate}%`} />
            </div>
            <div>
              <h3 style={subHeadingStyle}>{bi({ de: 'Capability Coverage', en: 'Capability Coverage' }, l)}</h3>
              <div style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={capabilityCoverage} margin={{ top: 12, right: 12, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="capability" stroke="#475569" angle={-10} textAnchor="end" height={56} />
                    <YAxis domain={[0, 100]} stroke="#475569" />
                    <Tooltip />
                    <Bar dataKey="score" fill="#d4380d" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(340px, 1fr)', gap: '1rem' }}>
          <Card title={bi({ de: 'Strategic Value vs Operational Overlap', en: 'Strategic Value vs Operational Overlap' }, l)}>
            <div style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 12, left: 10, bottom: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" dataKey="overlap" domain={[20, 80]} stroke="#475569" name={bi({ de: 'Operational Overlap', en: 'Operational overlap' }, l)} />
                  <YAxis type="number" dataKey="value" domain={[50, 100]} stroke="#475569" name={bi({ de: 'Strategic Value', en: 'Strategic value' }, l)} />
                  <Tooltip labelFormatter={(_, payload) => (payload?.[0]?.payload?.name ?? '') as string} />
                  <Scatter data={strategicValueOverlap} fill="#0ea5e9" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title={bi({ de: 'Risk Heatmap (Likelihood x Impact)', en: 'Risk heatmap (likelihood x impact)' }, l)}>
            <div style={{ display: 'grid', gap: '0.45rem' }}>
              {risks.map((risk) => {
                const score = risk.likelihood * risk.impact
                return (
                  <div key={risk.risk.en} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.5rem', background: '#f8fafc' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.87rem' }}>{bi(risk.risk, l)}</div>
                    <div style={{ marginTop: '0.3rem', display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                      <span style={heatTag}>{bi({ de: 'Wkt.', en: 'Lik.' }, l)}: {risk.likelihood}</span>
                      <span style={heatTag}>{bi({ de: 'Imp.', en: 'Imp.' }, l)}: {risk.impact}</span>
                      <span style={{ ...heatTag, color: '#fff', borderColor: 'transparent', background: riskColor(score) }}>{bi({ de: 'Score', en: 'Score' }, l)}: {score}</span>
                    </div>
                    <div style={{ marginTop: '0.35rem', color: '#334155', fontSize: '0.8rem' }}>{bi(risk.mitigation, l)}</div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        <Card title={bi({ de: 'Financial Leverage Model (Indicative estimate)', en: 'Financial leverage model (indicative estimate)' }, l)}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(360px, 1fr)', gap: '1rem' }}>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <SliderRow
                label={bi({ de: 'Annual case volume', en: 'Annual case volume' }, l)}
                value={annualVolume}
                min={10_000}
                max={250_000}
                step={5_000}
                suffix=""
                onChange={setAnnualVolume}
              />
              <SliderRow
                label={bi({ de: 'Cost per case in-house', en: 'Cost per case in-house' }, l)}
                value={inhouseCost}
                min={10}
                max={120}
                step={1}
                suffix="€"
                onChange={setInhouseCost}
              />
              <SliderRow
                label={bi({ de: 'Outsourcing cost per case', en: 'Outsourcing cost per case' }, l)}
                value={outsourcingCost}
                min={8}
                max={90}
                step={1}
                suffix="€"
                onChange={setOutsourcingCost}
              />
              <SliderRow
                label={bi({ de: 'QA rework rate', en: 'QA rework rate' }, l)}
                value={qaReworkRate}
                min={0}
                max={25}
                step={1}
                suffix="%"
                onChange={setQaReworkRate}
              />
            </div>
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              <MetricCard label={bi({ de: 'Estimated annual savings', en: 'Estimated annual savings' }, l)} value={`€${formatNumber(finance.grossSavings)}`} />
              <MetricCard label={bi({ de: 'Risk-adjusted savings', en: 'Risk-adjusted savings' }, l)} value={`€${formatNumber(finance.riskAdjustedSavings)}`} />
              <MetricCard label={bi({ de: 'QA penalty haircut', en: 'QA penalty haircut' }, l)} value={`€${formatNumber(finance.qaPenalty)}`} />
              <MetricCard
                label={bi({ de: 'Break-even month', en: 'Break-even month' }, l)}
                value={Number.isFinite(finance.breakEvenMonths) ? finance.breakEvenMonths.toFixed(1) : bi({ de: 'Kein Break-even', en: 'No break-even' }, l)}
              />
              <p style={pMuted}>{bi({ de: 'Indicative estimate (demo): Werte sind modellbasiert und nicht als verbindliche Kalkulation zu verstehen.', en: 'Indicative estimate (demo): values are model-based and not a binding commercial quote.' }, l)}</p>
            </div>
          </div>
          <div style={{ marginTop: '0.9rem' }}>
            <h3 style={subHeadingStyle}>{bi({ de: 'Cost-to-serve improvement scenario', en: 'Cost-to-serve improvement scenario' }, l)}</h3>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={costScenarioData} margin={{ top: 10, right: 12, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#475569" />
                  <YAxis stroke="#475569" />
                  <Tooltip formatter={(value: number) => `€${formatNumber(value)}`} />
                  <Line type="monotone" dataKey="baseline" stroke="#0f172a" strokeWidth={2.2} dot={false} name={bi({ de: 'Baseline In-house', en: 'Baseline in-house' }, l)} />
                  <Line type="monotone" dataKey="withOutsourcing" stroke="#d4380d" strokeWidth={2.2} dot={false} name={bi({ de: 'With outsourcing', en: 'With outsourcing' }, l)} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: 'Board Options A–D', en: 'Board Options A–D' }, l)}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{bi({ de: 'Option', en: 'Option' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Beschreibung', en: 'Description' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Risk', en: 'Risk' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Control', en: 'Control' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Time-to-scale', en: 'Time-to-scale' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Compliance', en: 'Compliance' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Upside', en: 'Upside' }, l)}</th>
                </tr>
              </thead>
              <tbody>
                {boardOptions.map((option) => (
                  <tr key={option.option}>
                    <td style={tdStrongStyle}>{option.option}</td>
                    <td style={tdStyle}>{l === 'de' ? option.labelDe : option.labelEn}</td>
                    <td style={tdStyle}>{option.risk}</td>
                    <td style={tdStyle}>{option.control}</td>
                    <td style={tdStyle}>{option.timeToScale}</td>
                    <td style={tdStyle}>{option.complianceComplexity}</td>
                    <td style={tdStyle}>{option.upside}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '0.8rem', height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={boardOptions} margin={{ top: 10, right: 12, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="option" stroke="#475569" />
                <YAxis stroke="#475569" domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="upside" fill="#16a34a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={bi({ de: 'Contact Intelligence (Manual Enrichment, no scraping)', en: 'Contact intelligence (manual enrichment, no scraping)' }, l)}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(340px, 1fr)', gap: '1rem' }}>
            <div style={{ display: 'grid', gap: '0.7rem' }}>
              <h3 style={subHeadingStyle}>{bi({ de: 'Manual Enrichment Form', en: 'Manual enrichment form' }, l)}</h3>
              <FormInput label={bi({ de: 'Name', en: 'Name' }, l)} value={contactForm.name} onChange={(value) => handleContactChange('name', value)} />
              <FormInput label={bi({ de: 'Current role', en: 'Current role' }, l)} value={contactForm.currentRole} onChange={(value) => handleContactChange('currentRole', value)} />
              <FormInput label={bi({ de: 'Location', en: 'Location' }, l)} value={contactForm.location} onChange={(value) => handleContactChange('location', value)} />
              <FormInput label={bi({ de: 'Focus lines', en: 'Focus lines' }, l)} value={contactForm.focusLines} onChange={(value) => handleContactChange('focusLines', value)} />
              <FormInput label={bi({ de: 'Markets', en: 'Markets' }, l)} value={contactForm.markets} onChange={(value) => handleContactChange('markets', value)} />
              <FormInput label={bi({ de: 'Seniority', en: 'Seniority' }, l)} value={contactForm.seniority} onChange={(value) => handleContactChange('seniority', value)} />
              <FormArea label={bi({ de: 'Notes', en: 'Notes' }, l)} value={contactForm.notes} onChange={(value) => handleContactChange('notes', value)} />
              <FormArea label={bi({ de: 'Last activity highlights', en: 'Last activity highlights' }, l)} value={contactForm.lastActivityHighlights} onChange={(value) => handleContactChange('lastActivityHighlights', value)} />
            </div>
            <div style={{ display: 'grid', gap: '0.7rem' }}>
              <h3 style={subHeadingStyle}>{bi({ de: 'Relationship Fit Score', en: 'Relationship fit score' }, l)}</h3>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.7rem', background: '#f8fafc' }}>
                {fitOptions.map((option) => (
                  <label key={option.key} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.45rem', color: '#334155' }}>
                    <input
                      type="checkbox"
                      checked={fitChecks[option.key]}
                      onChange={(event) => setFitChecks((prev) => ({ ...prev, [option.key]: event.target.checked }))}
                    />
                    <span>{bi(option.label, l)}</span>
                  </label>
                ))}
                <div style={{ marginTop: '0.6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#0f172a' }}>{bi({ de: 'Score', en: 'Score' }, l)}: {fitScore}/100</strong>
                  <span style={{ ...pillStyle, background: '#fff', border: '1px solid #cbd5e1' }}>{fitLabel}</span>
                </div>
              </div>

              <h3 style={subHeadingStyle}>{bi({ de: 'Demo Activity Feed', en: 'Demo activity feed' }, l)}</h3>
              <div style={{ display: 'grid', gap: '0.45rem' }}>
                {demoActivityFeed.map((item) => (
                  <div key={`${item.date}-${item.themeEn}`} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.55rem', background: '#f8fafc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <strong style={{ color: '#0f172a' }}>{l === 'de' ? item.themeDe : item.themeEn}</strong>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.date}</span>
                    </div>
                    <div style={{ marginTop: '0.25rem', color: '#334155', fontSize: '0.85rem' }}>{l === 'de' ? item.textDe : item.textEn}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '0.85rem' }}>
            <h3 style={subHeadingStyle}>{bi({ de: 'Contacts & Org Map (Demo)', en: 'Contacts & org map (demo)' }, l)}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.6rem' }}>
              {orgMapContacts.map((contact) => (
                <div key={contact.role.en} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.6rem', background: '#f8fafc' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{bi(contact.role, l)}</div>
                  <div style={{ marginTop: '0.2rem', color: '#334155', fontSize: '0.85rem' }}>{contact.owner}</div>
                  <div style={{ marginTop: '0.25rem', color: '#475569', fontSize: '0.8rem' }}>{bi(contact.note, l)}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card title={bi({ de: 'Sources & Assumptions', en: 'Sources & assumptions' }, l)}>
          <div style={{ display: 'grid', gap: '0.45rem', color: '#334155' }}>
            <strong>{bi({ de: 'Sources', en: 'Sources' }, l)}</strong>
            <ul style={listStyle}>
              {referenceUrls.map((url) => (
                <li key={url}>{url}</li>
              ))}
            </ul>
            <strong>{bi({ de: 'Assumptions', en: 'Assumptions' }, l)}</strong>
            <ul style={listStyle}>
              <li>{bi({ de: 'Alle quantitativen Werte sind als Indicative estimate (demo) markiert.', en: 'All quantitative values are marked as Indicative estimate (demo).' }, l)}</li>
              <li>{bi({ de: 'Keine Laufzeit-Scrapes oder externe APIs; nur statische Daten und manuelle Anreicherung.', en: 'No runtime scraping or external APIs; static data and manual enrichment only.' }, l)}</li>
              <li>{bi({ de: 'LinkedIn-Profil dient ausschließlich als manuelle Recherche-Referenz.', en: 'LinkedIn profile is used only as manual research reference.' }, l)}</li>
            </ul>
            <p style={pMuted}>LinkedIn: https://www.linkedin.com/in/ACoAABLQ8ysB75ha4v5udouAJKtuZ18g7G11nx8</p>
            <p style={pMuted}>FBSPL: https://www.fbspl.com/</p>
          </div>
        </Card>
      </div>
    </section>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.65rem', background: '#f8fafc' }}>
      <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{label}</div>
      <div style={{ color: '#0f172a', fontWeight: 700, marginTop: '0.2rem', fontSize: '1.05rem' }}>{value}</div>
    </div>
  )
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  suffix: string
  onChange: (value: number) => void
}) {
  return (
    <label style={{ display: 'grid', gap: '0.35rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.6rem' }}>
        <span style={{ color: '#334155', fontWeight: 600 }}>{label}</span>
        <span style={{ color: '#0f172a', fontWeight: 700 }}>{suffix === '€' ? `${suffix}${value}` : `${formatNumber(value)}${suffix}`}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ accentColor: '#d4380d' }}
      />
    </label>
  )
}

function FormInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label style={{ display: 'grid', gap: '0.25rem' }}>
      <span style={{ color: '#334155', fontWeight: 600, fontSize: '0.86rem' }}>{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        style={inputStyle}
      />
    </label>
  )
}

function FormArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label style={{ display: 'grid', gap: '0.25rem' }}>
      <span style={{ color: '#334155', fontWeight: 600, fontSize: '0.86rem' }}>{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={3}
        style={{ ...inputStyle, resize: 'vertical' }}
      />
    </label>
  )
}

function formatNumber(value: number) {
  const abs = Math.round(Math.abs(value))
  const formatted = new Intl.NumberFormat('en-US').format(abs)
  return value < 0 ? `-${formatted}` : formatted
}

const listStyle: React.CSSProperties = {
  margin: 0,
  paddingLeft: '1rem',
  display: 'grid',
  gap: '0.35rem',
  color: '#334155'
}

const pMuted: React.CSSProperties = {
  margin: 0,
  color: '#64748b',
  fontSize: '0.82rem',
  lineHeight: 1.5
}

const subHeadingStyle: React.CSSProperties = {
  margin: '0 0 0.5rem',
  color: '#0f172a',
  fontSize: '1rem'
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  fontSize: '0.86rem'
}

const headRowStyle: React.CSSProperties = {
  background: '#f1f5f9'
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  color: '#334155',
  padding: '0.55rem',
  borderBottom: '1px solid #dbe2ea',
  fontWeight: 700,
  whiteSpace: 'nowrap'
}

const tdStyle: React.CSSProperties = {
  color: '#334155',
  padding: '0.55rem',
  borderBottom: '1px solid #e2e8f0',
  verticalAlign: 'top'
}

const tdStrongStyle: React.CSSProperties = {
  ...tdStyle,
  color: '#0f172a',
  fontWeight: 700
}

const heatTag: React.CSSProperties = {
  fontSize: '0.76rem',
  border: '1px solid #dbe2ea',
  color: '#334155',
  borderRadius: 999,
  padding: '0.18rem 0.45rem',
  background: '#ffffff'
}

const inputStyle: React.CSSProperties = {
  border: '1px solid #cbd5e1',
  borderRadius: 8,
  padding: '0.45rem 0.55rem',
  fontSize: '0.9rem',
  color: '#0f172a'
}

const pillStyle: React.CSSProperties = {
  borderRadius: 999,
  padding: '0.2rem 0.55rem',
  fontSize: '0.78rem',
  color: '#334155'
}
