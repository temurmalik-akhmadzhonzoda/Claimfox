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

export default function LegalCarrierFinalAuthorityPage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'Legal Carrier Final Authority — Legal Dashboard',
        subtitle: 'Final legal approvals with audit-ready evidence and carrier authority.',
        lastUpdated: 'Last updated: 27 Jan 2026, 14:55',
        kpi: {
          open: 'Open approvals',
          dueToday: 'Decisions due today',
          breaches: 'SLA breaches',
          cycle: 'Avg approval cycle',
          escalations: 'Escalations pending',
          audit: 'Audit completeness %'
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
          summary: 'Consolidated recommendation',
          risks: 'Audit-ready evidence bundle',
          rules: 'Applicable rules / clauses',
          aiTitle: 'AI-generated decision template — requires human validation',
          templates: 'Decision templates'
        },
        actions: {
          approve: 'Final approve',
          approveConditions: 'Approve with conditions',
          decline: 'Decline'
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
        authorityNote: 'Carrier retains final legal authority at all times.',
        footer: {
          hitl: 'Human-in-the-loop: AI supports decisions; final responsibility remains with authorized legal roles.',
          demo: 'Indicative demo data — not a legal opinion.'
        }
      }
    : {
        title: 'Legal Carrier Final Authority — Legal Dashboard',
        subtitle: 'Finale rechtliche Freigaben mit auditierbarer Evidenz und Carrier-Authority.',
        lastUpdated: 'Zuletzt aktualisiert: 27. Jan 2026, 14:55',
        kpi: {
          open: 'Offene Approvals',
          dueToday: 'Entscheidungen heute fällig',
          breaches: 'SLA Breaches',
          cycle: 'Ø Approval-Zyklus',
          escalations: 'Eskalationen pending',
          audit: 'Audit-Vollständigkeit %'
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
          summary: 'Konsolidierte Empfehlung',
          risks: 'Audit-ready Evidenzpaket',
          rules: 'Anwendbare Regeln / Klauseln',
          aiTitle: 'AI-Decision-Template — Human Validation erforderlich',
          templates: 'Entscheidungsvorlagen'
        },
        actions: {
          approve: 'Final freigeben',
          approveConditions: 'Freigabe mit Auflagen',
          decline: 'Ablehnen'
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
        authorityNote: 'Carrier behält jederzeit die finale Legal Authority.',
        footer: {
          hitl: 'Human-in-the-loop: AI unterstützt Entscheidungen; finale Verantwortung verbleibt bei autorisierten Legal-Rollen.',
          demo: 'Indikative Demo-Daten — keine Rechtsberatung.'
        }
      }

  const cases: LegalCase[] = [
    {
      id: 'CF-88',
      type: 'Regulatory',
      trigger: 'Carrier approval required',
      severity: 'High',
      slaDue: '2026-01-27T16:40:00Z',
      slaBucket: 'due_today',
      recommendation: 'Final approve',
      status: 'In review',
      applicableRules: ['Carrier Legal Authority Matrix', 'Delegated Authority Schedule 2025'],
      keyRisks: ['Authority override risk', 'Regulatory exposure'],
      evidenceQuality: 92,
      escalationRequired: true,
      summary: 'Consolidated recommendation from Legal and MGA; audit-ready evidence attached.'
    },
    {
      id: 'CF-91',
      type: 'Claim',
      trigger: 'Settlement above threshold',
      severity: 'Medium',
      slaDue: '2026-01-28T12:00:00Z',
      slaBucket: 'due_48h',
      recommendation: 'Approve with conditions',
      status: 'Open',
      applicableRules: ['Settlement Authority v2.1', 'Carrier Conditions Matrix'],
      keyRisks: ['Budget impact', 'Documentation completeness'],
      evidenceQuality: 85,
      escalationRequired: false,
      summary: 'Settlement proposal exceeds MGA authority; carrier approval required.'
    },
    {
      id: 'CF-95',
      type: 'Wording',
      trigger: 'Exception escalation',
      severity: 'High',
      slaDue: '2026-01-27T09:10:00Z',
      slaBucket: 'breached',
      recommendation: 'Decline',
      status: 'Breached',
      applicableRules: ['Wording Control v5.0', 'Carrier Approval Matrix'],
      keyRisks: ['Out-of-scope terms', 'Compliance risk'],
      evidenceQuality: 66,
      escalationRequired: true,
      summary: 'Exception outside carrier appetite; recommend decline.'
    }
  ]

  const logs: LogEntry[] = [
    { timestamp: '2026-01-27 10:05', role: 'Carrier Legal', action: 'Final review', ruleVersion: 'v5.0', evidenceStatus: 'ok', note: 'Ready for approval' },
    { timestamp: '2026-01-27 09:10', role: 'Carrier Legal', action: 'SLA flagged', ruleVersion: 'v5.0', evidenceStatus: 'ok', note: 'Due today' },
    { timestamp: '2026-01-26 18:02', role: 'Senior Legal', action: 'Recommendation submitted', ruleVersion: 'v4.2', evidenceStatus: 'ok', note: 'Conditions included' },
    { timestamp: '2026-01-26 14:26', role: 'Compliance', action: 'Audit check', ruleVersion: 'v4.2', evidenceStatus: 'ok', note: 'Audit-ready' },
    { timestamp: '2026-01-25 16:40', role: 'Carrier Legal', action: 'Exception review', ruleVersion: 'v5.0', evidenceStatus: 'stale', note: 'Awaiting addendum' }
  ]

  const kpis = React.useMemo(() => {
    const open = cases.filter((item) => item.status !== 'Closed').length
    const dueToday = cases.filter((item) => item.slaBucket === 'due_today').length
    const breaches = cases.filter((item) => item.slaBucket === 'breached').length
    const escalations = cases.filter((item) => item.escalationRequired).length
    const audit = Math.round(cases.reduce((acc, item) => acc + item.evidenceQuality, 0) / cases.length)
    return {
      open,
      dueToday,
      breaches,
      cycle: '2.3d',
      escalations,
      audit: `${audit}%`
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
          <Card title={copy.kpi.audit} variant="glass" className="uw-card"><div className="uw-card-body"><strong>{kpis.audit}</strong></div></Card>
        </div>

        <div className="uw-grid uw-split">
          <Card variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.75rem' }}>
              <strong>{copy.table.title}</strong>
              <div style={{ overflowX: 'auto' }}>
                <table className="uw-table" aria-label="Carrier legal decision inbox">
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
              </div>
            </div>
          </Card>

          <Card variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.75rem' }}>
              <strong>{copy.snapshot.title}</strong>
              <div className="uw-panel">
                <strong>{selected.id}</strong>
                <div className="uw-muted">{selected.summary}</div>
              </div>
              <div className="uw-panel">
                <div className="uw-muted">{copy.snapshot.risks}</div>
                <ul style={{ margin: '0.3rem 0 0', paddingLeft: '1rem', color: '#475569' }}>
                  {selected.keyRisks.map((risk) => (
                    <li key={risk}>{risk}</li>
                  ))}
                </ul>
              </div>
              <div className="uw-panel">
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
              <div className="uw-panel">
                <div className="uw-muted">{copy.snapshot.templates}</div>
                <div className="uw-actions">
                  <Button variant="secondary" onClick={() => {}}>{copy.actions.approve}</Button>
                  <Button variant="secondary" onClick={() => {}}>{copy.actions.approveConditions}</Button>
                  <Button onClick={() => {}}>{copy.actions.decline}</Button>
                </div>
              </div>
              <div className="uw-disclaimer">{copy.authorityNote}</div>
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
              <table className="uw-table" aria-label="Carrier legal audit log">
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
