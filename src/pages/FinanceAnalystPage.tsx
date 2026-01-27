import React from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'
import '@/styles/underwriter-premium.css'

type FinanceCase = {
  id: string
  type: string
  trigger: string
  severity: 'Low' | 'Medium' | 'High'
  slaDue: string
  slaBucket: 'due_today' | 'due_48h' | 'breached'
  recommendation: string
  status: string
  applicableRules: string[]
  keyRisks: string[]
  evidenceQuality: number
  escalationRequired: boolean
  summary: string
}

type LogEntry = {
  timestamp: string
  role: string
  action: string
  ruleVersion: string
  evidenceStatus: string
  note: string
}

const formatSla = (iso: string, lang: string) => {
  const date = new Date(iso)
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'de-DE', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export default function FinanceAnalystPage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'Finance Analyst — Finance Dashboard',
        subtitle: 'Portfolio and performance analysis with carrier-aligned governance.',
        lastUpdated: 'Last updated: 27 Jan 2026, 15:05',
        kpi: {
          open: 'Open finance cases',
          dueToday: 'Decisions due today',
          breaches: 'SLA breaches',
          cycle: 'Avg decision cycle',
          escalations: 'Escalations pending',
          performance: 'Portfolio performance %'
        },
        table: {
          title: 'Decision inbox',
          id: 'Case ID',
          type: 'Case type',
          trigger: 'Trigger reason',
          severity: 'Severity',
          sla: 'SLA due',
          recommendation: 'Recommended action',
          status: 'Status'
        },
        snapshot: {
          title: 'Decision snapshot',
          summary: 'Performance summary',
          risks: 'Key financial risks',
          rules: 'Applicable policies',
          aiTitle: 'AI-generated decision template — requires human validation',
          templates: 'Decision templates'
        },
        actions: {
          approve: 'Approve report',
          adjust: 'Adjust assumptions',
          escalate: 'Escalate to Controller'
        },
        slaPanel: {
          title: 'SLA & governance',
          buckets: 'SLA buckets',
          governance: 'Governance status',
          within: 'Within mandate',
          escalation: 'Escalation required',
          carrier: 'Carrier approval required'
        },
        audit: {
          title: 'Audit & governance reports',
          logTitle: 'Decision log',
          governanceTitle: 'Governance indicators',
          logCols: ['Timestamp', 'Role', 'Action', 'Rule version', 'Evidence status', 'Note'],
          indicators: ['Mandatory sign-offs completed', 'Override reason present', 'Portfolio scope confirmed']
        },
        footer: {
          hitl: 'Human-in-the-loop: AI supports decisions; final responsibility remains with authorized finance roles.',
          demo: 'Indicative demo data — not financial advice.'
        }
      }
    : {
        title: 'Finance Analyst — Finance Dashboard',
        subtitle: 'Portfolio- und Performance-Analyse mit carrier-konformer Governance.',
        lastUpdated: 'Zuletzt aktualisiert: 27. Jan 2026, 15:05',
        kpi: {
          open: 'Offene Finance Cases',
          dueToday: 'Entscheidungen heute fällig',
          breaches: 'SLA Breaches',
          cycle: 'Ø Entscheidungszyklus',
          escalations: 'Eskalationen pending',
          performance: 'Portfolio-Performance %'
        },
        table: {
          title: 'Decision Inbox',
          id: 'Case ID',
          type: 'Case-Typ',
          trigger: 'Trigger-Grund',
          severity: 'Severity',
          sla: 'SLA fällig',
          recommendation: 'Empfohlene Aktion',
          status: 'Status'
        },
        snapshot: {
          title: 'Decision Snapshot',
          summary: 'Performance Summary',
          risks: 'Zentrale Finanzrisiken',
          rules: 'Anwendbare Policies',
          aiTitle: 'AI-Decision-Template — Human Validation erforderlich',
          templates: 'Entscheidungsvorlagen'
        },
        actions: {
          approve: 'Report freigeben',
          adjust: 'Annahmen anpassen',
          escalate: 'An Controller eskalieren'
        },
        slaPanel: {
          title: 'SLA & Governance',
          buckets: 'SLA Buckets',
          governance: 'Governance-Status',
          within: 'Im Mandat',
          escalation: 'Eskalation erforderlich',
          carrier: 'Carrier-Approval erforderlich'
        },
        audit: {
          title: 'Audit- & Governance-Reports',
          logTitle: 'Decision Log',
          governanceTitle: 'Governance-Indikatoren',
          logCols: ['Zeitstempel', 'Rolle', 'Aktion', 'Rule-Version', 'Evidenzstatus', 'Notiz'],
          indicators: ['Mandatory Sign-offs abgeschlossen', 'Override-Begründung vorhanden', 'Portfolio-Scope bestätigt']
        },
        footer: {
          hitl: 'Human-in-the-loop: AI unterstützt Entscheidungen; finale Verantwortung verbleibt bei autorisierten Finance-Rollen.',
          demo: 'Indikative Demo-Daten — keine Finanzberatung.'
        }
      }

  const cases: FinanceCase[] = [
    {
      id: 'FA-102',
      type: 'Portfolio',
      trigger: 'Loss ratio variance',
      severity: 'Medium',
      slaDue: '2026-01-27T16:10:00Z',
      slaBucket: 'due_today',
      recommendation: 'Adjust assumptions',
      status: 'In review',
      applicableRules: ['Performance Policy v3.2', 'Capital Efficiency KPI Pack'],
      keyRisks: ['Performance drift', 'Capital efficiency impact'],
      evidenceQuality: 81,
      escalationRequired: false,
      summary: 'Loss ratio variance detected in fleet portfolio.'
    },
    {
      id: 'FA-109',
      type: 'Performance',
      trigger: 'Expense ratio deviation',
      severity: 'Low',
      slaDue: '2026-01-28T11:20:00Z',
      slaBucket: 'due_48h',
      recommendation: 'Approve report',
      status: 'Open',
      applicableRules: ['Finance Policy v2.5', 'KPI Governance v1.6'],
      keyRisks: ['Expense drift'],
      evidenceQuality: 88,
      escalationRequired: false,
      summary: 'Expense ratio slightly above corridor; within tolerance.'
    },
    {
      id: 'FA-115',
      type: 'Portfolio',
      trigger: 'Outlier exposure',
      severity: 'High',
      slaDue: '2026-01-27T09:30:00Z',
      slaBucket: 'breached',
      recommendation: 'Escalate to Controller',
      status: 'Breached',
      applicableRules: ['Exposure Policy v3.0', 'Aggregation Limits'],
      keyRisks: ['Concentration risk', 'Capital strain'],
      evidenceQuality: 63,
      escalationRequired: true,
      summary: 'Outlier exposure requires controller review.'
    }
  ]

  const logs: LogEntry[] = [
    { timestamp: '2026-01-27 09:22', role: 'Finance Analyst', action: 'Variance review', ruleVersion: 'v3.2', evidenceStatus: 'ok', note: 'Within tolerance' },
    { timestamp: '2026-01-27 08:35', role: 'Finance Analyst', action: 'KPI update', ruleVersion: 'v1.6', evidenceStatus: 'ok', note: 'Expense ratio' },
    { timestamp: '2026-01-26 17:40', role: 'Controller', action: 'Escalation flagged', ruleVersion: 'v3.0', evidenceStatus: 'stale', note: 'Outlier exposure' },
    { timestamp: '2026-01-26 12:15', role: 'Finance Analyst', action: 'Evidence request', ruleVersion: 'v3.2', evidenceStatus: 'missing', note: 'Portfolio pack' },
    { timestamp: '2026-01-25 16:50', role: 'Compliance', action: 'Audit check', ruleVersion: 'v1.6', evidenceStatus: 'ok', note: 'No issues' }
  ]

  const kpis = React.useMemo(() => {
    const open = cases.filter((item) => item.status !== 'Closed').length
    const dueToday = cases.filter((item) => item.slaBucket === 'due_today').length
    const breaches = cases.filter((item) => item.slaBucket === 'breached').length
    const escalations = cases.filter((item) => item.escalationRequired).length
    return {
      open,
      dueToday,
      breaches,
      cycle: '1.8d',
      escalations,
      performance: '92%'
    }
  }, [cases])

  const [selectedId, setSelectedId] = React.useState(cases[0]?.id)
  const selected = cases.find((item) => item.id === selectedId) || cases[0]

  const buckets = React.useMemo(() => ({
    due_today: cases.filter((item) => item.slaBucket === 'due_today').length,
    due_48h: cases.filter((item) => item.slaBucket === 'due_48h').length,
    breached: cases.filter((item) => item.slaBucket === 'breached').length
  }), [cases])

  return (
    <section className="uw-page">
      <div
        className="roles-hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(7, 20, 74, 0.9) 0%, rgba(11, 45, 122, 0.9) 100%), url(${HeroBlockBackground})`
        }}
      >
        <div className="roles-hero-inner">
          <Header title={copy.title} subtitle={copy.subtitle} subtitleColor="rgba(255,255,255,0.82)" />
          <div className="uw-footnote" style={{ color: 'rgba(255,255,255,0.7)' }}>{copy.lastUpdated}</div>
        </div>
      </div>

      <div className="uw-container">
        <div className="uw-grid uw-kpi">
          <Card title={copy.kpi.open} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.open}</strong></div></Card>
          <Card title={copy.kpi.dueToday} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.dueToday}</strong></div></Card>
          <Card title={copy.kpi.breaches} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.breaches}</strong></div></Card>
          <Card title={copy.kpi.cycle} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.cycle}</strong></div></Card>
          <Card title={copy.kpi.escalations} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.escalations}</strong></div></Card>
          <Card title={copy.kpi.performance} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.performance}</strong></div></Card>
        </div>

        <div className="uw-grid uw-split">
          <Card title={copy.table.title} variant="glass" className="uw-card" style={{ overflowX: 'auto' }}>
            <table className="uw-table" aria-label="Finance analyst decision inbox">
              <thead>
                <tr>
                  <th>{copy.table.id}</th>
                  <th>{copy.table.type}</th>
                  <th>{copy.table.trigger}</th>
                  <th>{copy.table.severity}</th>
                  <th>{copy.table.sla}</th>
                  <th>{copy.table.recommendation}</th>
                  <th>{copy.table.status}</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((item) => (
                  <tr key={item.id} onClick={() => setSelectedId(item.id)} className={item.id === selectedId ? 'uw-row-active' : undefined} style={{ cursor: 'pointer' }}>
                    <td>{item.id}</td>
                    <td>{item.type}</td>
                    <td>{item.trigger}</td>
                    <td>{item.severity}</td>
                    <td>{formatSla(item.slaDue, lang)}</td>
                    <td>{item.recommendation}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card title={copy.snapshot.title} variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.75rem' }}>
              <div>
                <strong>{selected.id}</strong>
                <div className="uw-muted">{selected.summary}</div>
              </div>
              <div>
                <div className="uw-muted">{copy.snapshot.risks}</div>
                <ul style={{ margin: '0.3rem 0 0', paddingLeft: '1rem', color: '#475569' }}>
                  {selected.keyRisks.map((risk) => (
                    <li key={risk}>{risk}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="uw-muted">{copy.snapshot.rules}</div>
                <ul style={{ margin: '0.3rem 0 0', paddingLeft: '1rem', color: '#475569' }}>
                  {selected.applicableRules.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ul>
              </div>
              <div className="uw-panel">
                <strong>{copy.snapshot.aiTitle}</strong>
                <div className="uw-muted" style={{ marginTop: '0.4rem' }}>{selected.recommendation}</div>
              </div>
              <div>
                <div className="uw-muted">{copy.snapshot.templates}</div>
                <div className="uw-actions">
                  <Button variant="secondary" onClick={() => {}}>{copy.actions.approve}</Button>
                  <Button variant="secondary" onClick={() => {}}>{copy.actions.adjust}</Button>
                  <Button onClick={() => {}}>{copy.actions.escalate}</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="uw-grid uw-triplet">
          <Card title={copy.slaPanel.title} variant="glass" className="uw-card">
            <div className="uw-card-body">
              <div className="uw-muted">{copy.slaPanel.buckets}</div>
              <div className="uw-muted">Due today: {buckets.due_today}</div>
              <div className="uw-muted">Due 48h: {buckets.due_48h}</div>
              <div className="uw-muted">Breached: {buckets.breached}</div>
              <div className="uw-muted" style={{ marginTop: '0.5rem' }}>{copy.slaPanel.governance}</div>
              <div className="uw-muted">{copy.slaPanel.within}</div>
              <div className="uw-muted">{selected.escalationRequired ? copy.slaPanel.escalation : copy.slaPanel.within}</div>
              <div className="uw-muted">{selected.severity === 'High' ? copy.slaPanel.carrier : copy.slaPanel.within}</div>
            </div>
          </Card>
          <Card title={copy.audit.title} variant="glass" className="uw-card">
            <div className="uw-muted" style={{ marginBottom: '0.5rem' }}>{copy.audit.logTitle}</div>
            <div style={{ overflowX: 'auto' }}>
              <table className="uw-table" aria-label="Finance analyst audit log">
                <thead>
                  <tr>
                    {copy.audit.logCols.map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {logs.slice(0, 5).map((log) => (
                    <tr key={log.timestamp}>
                      <td>{log.timestamp}</td>
                      <td>{log.role}</td>
                      <td>{log.action}</td>
                      <td>{log.ruleVersion}</td>
                      <td>{log.evidenceStatus}</td>
                      <td>{log.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card title={copy.audit.governanceTitle} variant="glass" className="uw-card">
            <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.55 }}>
              {copy.audit.indicators.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="uw-disclaimer">{copy.footer.hitl}</div>
        <div className="uw-disclaimer">{copy.footer.demo}</div>
      </div>
    </section>
  )
}
