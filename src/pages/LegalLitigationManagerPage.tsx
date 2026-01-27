import React from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'
import '@/styles/underwriter-premium.css'

type LegalCase = {
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

export default function LegalLitigationManagerPage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'Legal Litigation Manager — Legal Dashboard',
        subtitle: 'Litigation strategy, counsel oversight and budget governance.',
        lastUpdated: 'Last updated: 27 Jan 2026, 14:52',
        kpi: {
          open: 'Open litigations',
          dueToday: 'Decisions due today',
          breaches: 'SLA breaches',
          cycle: 'Avg litigation cycle',
          escalations: 'Escalations pending',
          spend: 'Spend vs budget'
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
          summary: 'Case strategy',
          risks: 'Budget & reserve view',
          rules: 'Applicable rules / clauses',
          aiTitle: 'AI-generated decision template — requires human validation',
          templates: 'Decision templates'
        },
        actions: {
          proceed: 'Proceed with litigation',
          settle: 'Approve settlement range',
          counsel: 'Change counsel'
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
          indicators: ['Mandatory sign-offs completed', 'Override reason present', 'Regulatory scope confirmed']
        },
        footer: {
          hitl: 'Human-in-the-loop: AI supports decisions; final responsibility remains with authorized legal roles.',
          demo: 'Indicative demo data — not a legal opinion.'
        }
      }
    : {
        title: 'Legal Litigation Manager — Legal Dashboard',
        subtitle: 'Streitstrategie, Kanzlei-Steuerung und Budget-Governance.',
        lastUpdated: 'Zuletzt aktualisiert: 27. Jan 2026, 14:52',
        kpi: {
          open: 'Offene Litigation Cases',
          dueToday: 'Entscheidungen heute fällig',
          breaches: 'SLA Breaches',
          cycle: 'Ø Litigation-Zyklus',
          escalations: 'Eskalationen pending',
          spend: 'Spend vs Budget'
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
          summary: 'Case-Strategie',
          risks: 'Budget- & Reserve-View',
          rules: 'Anwendbare Regeln / Klauseln',
          aiTitle: 'AI-Decision-Template — Human Validation erforderlich',
          templates: 'Entscheidungsvorlagen'
        },
        actions: {
          proceed: 'Litigation fortführen',
          settle: 'Settlement-Range freigeben',
          counsel: 'Kanzlei wechseln'
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
          indicators: ['Mandatory Sign-offs abgeschlossen', 'Override-Begründung vorhanden', 'Regulatorischer Scope bestätigt']
        },
        footer: {
          hitl: 'Human-in-the-loop: AI unterstützt Entscheidungen; finale Verantwortung verbleibt bei autorisierten Legal-Rollen.',
          demo: 'Indikative Demo-Daten — keine Rechtsberatung.'
        }
      }

  const cases: LegalCase[] = [
    {
      id: 'LM-501',
      type: 'Litigation',
      trigger: 'Claim dispute escalated',
      severity: 'High',
      slaDue: '2026-01-27T16:15:00Z',
      slaBucket: 'due_today',
      recommendation: 'Proceed with litigation',
      status: 'In review',
      applicableRules: ['Litigation Policy v2.5', 'External Counsel Guidelines'],
      keyRisks: ['Adverse judgement exposure', 'Budget overrun'],
      evidenceQuality: 74,
      escalationRequired: true,
      summary: 'Dispute escalated to litigation; counsel strategy review required.'
    },
    {
      id: 'LM-508',
      type: 'Litigation',
      trigger: 'Settlement range request',
      severity: 'Medium',
      slaDue: '2026-01-28T11:15:00Z',
      slaBucket: 'due_48h',
      recommendation: 'Approve settlement range',
      status: 'Open',
      applicableRules: ['Settlement Authority v2.1', 'Reserve Policy v3.0'],
      keyRisks: ['Reserve adequacy', 'Timing pressure'],
      evidenceQuality: 82,
      escalationRequired: false,
      summary: 'Counsel proposes settlement range within authority threshold.'
    },
    {
      id: 'LM-515',
      type: 'Litigation',
      trigger: 'Counsel performance issue',
      severity: 'High',
      slaDue: '2026-01-27T09:20:00Z',
      slaBucket: 'breached',
      recommendation: 'Change counsel',
      status: 'Breached',
      applicableRules: ['Counsel Governance v1.7', 'Vendor Risk Policy'],
      keyRisks: ['Performance risk', 'Cost escalation'],
      evidenceQuality: 61,
      escalationRequired: true,
      summary: 'Performance KPIs below threshold; replacement required.'
    }
  ]

  const logs: LogEntry[] = [
    { timestamp: '2026-01-27 09:58', role: 'Litigation Manager', action: 'Strategy review', ruleVersion: 'v2.5', evidenceStatus: 'ok', note: 'Proceed recommendation' },
    { timestamp: '2026-01-27 08:30', role: 'Litigation Manager', action: 'Budget check', ruleVersion: 'v3.0', evidenceStatus: 'ok', note: 'Reserve aligned' },
    { timestamp: '2026-01-26 17:05', role: 'Carrier Legal', action: 'Escalation review', ruleVersion: 'v2.5', evidenceStatus: 'stale', note: 'Awaiting invoice' },
    { timestamp: '2026-01-26 12:44', role: 'Litigation Manager', action: 'Counsel review', ruleVersion: 'v1.7', evidenceStatus: 'missing', note: 'Performance report' },
    { timestamp: '2026-01-25 16:08', role: 'Compliance', action: 'Audit check', ruleVersion: 'v2.3', evidenceStatus: 'ok', note: 'No issues' }
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
      cycle: '3.4d',
      escalations,
      spend: '78%'
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
          <Card title={copy.kpi.spend} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.spend}</strong></div></Card>
        </div>

        <div className="uw-grid uw-split">
          <Card title={copy.table.title} variant="glass" className="uw-card" style={{ overflowX: 'auto' }}>
            <table className="uw-table" aria-label="Litigation decision inbox">
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
                  <Button variant="secondary" onClick={() => {}}>{copy.actions.proceed}</Button>
                  <Button variant="secondary" onClick={() => {}}>{copy.actions.settle}</Button>
                  <Button onClick={() => {}}>{copy.actions.counsel}</Button>
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
              <table className="uw-table" aria-label="Litigation audit log">
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
