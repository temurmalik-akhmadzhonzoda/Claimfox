import { type CSSProperties } from 'react'
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

const anchorSections: { id: string; label: BiText }[] = [
  { id: 'role-definition', label: { de: '1. Executive-Rollendefinition', en: '1. Executive Role Definition' } },
  { id: 'role-delineation', label: { de: '2. Rollenabgrenzung', en: '2. Role Delineation' } },
  { id: 'org-embedding', label: { de: '3. Organisatorische Einbettung', en: '3. Organizational Embedding' } },
  { id: 'iam-governance', label: { de: '4. Identity & Access Governance', en: '4. Identity & Access Governance' } },
  { id: 'tenant-lifecycle', label: { de: '5. Tenant Lifecycle Management', en: '5. Tenant Lifecycle Management' } },
  { id: 'break-glass', label: { de: '6. Break-Glass-Befugnis', en: '6. Break-Glass Authority' } },
  { id: 'system-configuration', label: { de: '7. Systemkonfigurationshoheit', en: '7. System Configuration Authority' } },
  { id: 'audit-oversight', label: { de: '8. Audit- und Logging-Aufsicht', en: '8. Audit & Logging Oversight' } },
  { id: 'architecture-context', label: { de: '9. Architekturkontext', en: '9. System Architecture Context' } },
  { id: 'kpi-monitoring', label: { de: '10. KPI-Monitoring', en: '10. KPI Monitoring' } },
  { id: 'decision-scenarios', label: { de: '11. Realistische Entscheidungsszenarien', en: '11. Realistic Decision Scenarios' } },
  { id: 'risk-ai-profile', label: { de: '12. Risikoprofil & AI-Interaktion', en: '12. Risk Profile & AI Interaction' } },
  { id: 'permission-criticality', label: { de: '13. Permission-Heatmap & strukturelle Kritikalität', en: '13. Permission Heatmap & Structural Criticality' } }
]

const uptimeData = [
  { period: { de: 'Jan', en: 'Jan' }, uptime: 99.92 },
  { period: { de: 'Feb', en: 'Feb' }, uptime: 99.95 },
  { period: { de: 'Mär', en: 'Mar' }, uptime: 99.9 },
  { period: { de: 'Apr', en: 'Apr' }, uptime: 99.97 },
  { period: { de: 'Mai', en: 'May' }, uptime: 99.96 }
]

const incidentResponseData = [
  { sev: 'SEV-1', minutes: 18 },
  { sev: 'SEV-2', minutes: 42 },
  { sev: 'SEV-3', minutes: 95 },
  { sev: 'SEV-4', minutes: 210 }
]

const unauthorizedAccessData = [
  { week: 'W1', attempts: 14 },
  { week: 'W2', attempts: 11 },
  { week: 'W3', attempts: 17 },
  { week: 'W4', attempts: 9 },
  { week: 'W5', attempts: 6 }
]

const tenantActivationData = [
  { type: { de: 'Makler', en: 'Broker' }, hours: 11 },
  { type: { de: 'Versicherer', en: 'Carrier' }, hours: 14 },
  { type: { de: 'Unternehmen', en: 'Corporate' }, hours: 8 },
  { type: { de: 'Partner', en: 'Partner' }, hours: 6 }
]

type PermissionRow = {
  role: BiText
  tenantCreation: boolean
  globalRoleEdit: boolean
  breakGlassOverride: boolean
  aiDeploymentApproval: boolean
  policyParameterChange: boolean
}

const permissionMatrix: PermissionRow[] = [
  {
    role: { de: 'Platform Super Admin', en: 'Platform Super Admin' },
    tenantCreation: true,
    globalRoleEdit: true,
    breakGlassOverride: true,
    aiDeploymentApproval: true,
    policyParameterChange: true
  },
  {
    role: { de: 'DevOps Lead', en: 'DevOps Lead' },
    tenantCreation: false,
    globalRoleEdit: false,
    breakGlassOverride: false,
    aiDeploymentApproval: true,
    policyParameterChange: false
  },
  {
    role: { de: 'AI Governance Officer', en: 'AI Governance Officer' },
    tenantCreation: false,
    globalRoleEdit: false,
    breakGlassOverride: false,
    aiDeploymentApproval: true,
    policyParameterChange: false
  },
  {
    role: { de: 'Broker Admin', en: 'Broker Admin' },
    tenantCreation: false,
    globalRoleEdit: false,
    breakGlassOverride: false,
    aiDeploymentApproval: false,
    policyParameterChange: false
  },
  {
    role: { de: 'Tenant Admin', en: 'Tenant Admin' },
    tenantCreation: false,
    globalRoleEdit: false,
    breakGlassOverride: false,
    aiDeploymentApproval: false,
    policyParameterChange: false
  }
]

export default function PlatformSuperAdminRolePage() {
  const navigate = useNavigate()
  const { lang } = useI18n()
  const l: Lang = lang === 'de' ? 'de' : 'en'

  function handlePrint() {
    const previous = document.title
    document.title = bi({ de: 'Platform_Super_Admin_Governance_DE', en: 'Platform_Super_Admin_Governance_EN' }, l)
    window.print()
    window.setTimeout(() => {
      document.title = previous
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
                  de: 'Platform Super Admin – Enterprise-Governance-Rolle',
                  en: 'Platform Super Admin – Enterprise Governance Definition'
                },
                l
              )}
              subtitle={bi(
                {
                  de: 'Inside Insurfox / Rollen / Platform Super Admin',
                  en: 'Inside Insurfox / Roles / Platform Super Admin'
                },
                l
              )}
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
            <span>Platform Super Admin</span>
          </div>

          <div className="print-hide" style={{ marginTop: '0.8rem', display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {anchorSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} style={anchorStyle}>{bi(section.label, l)}</a>
            ))}
          </div>
        </Card>

        <Card title={bi({ de: '1. Executive-Rollendefinition', en: '1. Executive Role Definition' }, l)}>
          <div id="role-definition" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Der Platform Super Admin ist die höchste technische und governance-seitige Instanz im gesamten Insurfox Insurance Operating System. Die Rolle verantwortet Tenant-Lifecycle-Kontrolle, systemweite Zugriffssteuerung, Notfallinterventionsrechte und globale Plattformkonfiguration.',
                  en: 'The Platform Super Admin is the highest technical and governance authority across the Insurfox Insurance Operating System. This role owns tenant lifecycle control, platform-wide access governance, emergency intervention rights, and global configuration control.'
                },
                l
              )}
            </p>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Die Rolle besitzt formale Break-Glass-Befugnis, trifft jedoch keine Underwriting-, Schaden-, Pricing- oder Portfolioentscheidungen. Versicherungsfachliche Risikoselektion bleibt ausdrücklich bei Underwriting- und Claims-Governance-Rollen.',
                  en: 'The role has formal break-glass authority, but it does not make underwriting, claims, pricing, or portfolio acceptance decisions. Insurance risk selection remains with underwriting and claims governance roles.'
                },
                l
              )}
            </p>
          </div>
        </Card>

        <Card title={bi({ de: '2. Rollenabgrenzung', en: '2. Role Delineation' }, l)}>
          <div id="role-delineation" style={{ display: 'grid', gap: '0.6rem' }}>
            <div style={compareGridStyle}>
              <div style={compareBoxStyle}>
                <h3 style={subHeadingStyle}>Platform Super Admin</h3>
                <p style={noteStyle}>{bi({ de: 'Verantwortet globales IAM, Tenant-Separation, Break-Glass-Zugriffe und unveränderliche Audit-Integrität.', en: 'Owns platform-wide IAM, tenant separation, break-glass access, and immutable audit integrity.' }, l)}</p>
              </div>
              <div style={compareBoxStyle}>
                <h3 style={subHeadingStyle}>DevOps Lead</h3>
                <p style={noteStyle}>{bi({ de: 'Steuert Stabilität, Deployments und Betrieb, jedoch ohne globale Rollenhoheit.', en: 'Runs reliability, deployments, and runtime operations, without global role-governance authority.' }, l)}</p>
              </div>
              <div style={compareBoxStyle}>
                <h3 style={subHeadingStyle}>AI Governance Officer</h3>
                <p style={noteStyle}>{bi({ de: 'Definiert AI-Policies und Modell-Governance, ohne vollständige Tenant-Lifecycle-Rechte.', en: 'Defines AI policy controls and model governance, without full tenant lifecycle authority.' }, l)}</p>
              </div>
              <div style={compareBoxStyle}>
                <h3 style={subHeadingStyle}>Broker Admin / Tenant Admin</h3>
                <p style={noteStyle}>{bi({ de: 'Agiert innerhalb delegierter Tenant-Grenzen und kann keine globalen Policy-Engines ändern.', en: 'Operates within delegated tenant boundaries and cannot modify global policy engines.' }, l)}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '3. Organisatorische Einbettung', en: '3. Organizational Embedding' }, l)}>
          <div id="org-embedding" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Die Rolle ist in Platform Operations/Core Infrastructure verankert und berichtet typischerweise an CTO oder Chief Platform Officer.', en: 'The role sits in Platform Operations/Core Infrastructure and typically reports to the CTO or Chief Platform Officer.' }, l)}</p>
            <p style={pStyle}>{bi({ de: 'Zusammenarbeit erfolgt mit DevOps, Security, Compliance, DPO, Product Owner und AI Governance zur Sicherstellung regulatorisch belastbarer Betriebsstabilität.', en: 'It works closely with DevOps, Security, Compliance, DPO, Product Owner, and AI Governance to ensure resilient and compliant platform operations.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '4. Kernaufgaben A: Identity & Access Governance', en: '4. Core Responsibilities A: Identity & Access Governance' }, l)}>
          <div id="iam-governance" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Definiert IAM-Struktur, Rollen-Templates und Policy-Grenzen über Plattform-, Makler-, Versicherer- und Unternehmensebene.', en: 'Defines IAM hierarchy, role templates, and policy guardrails across platform, broker, carrier, and corporate layers.' }, l)}</p>
            <p style={pStyle}>{bi({ de: 'Setzt Least-Privilege, Feldmaskierung für sensible Daten und konsequente Tenant-Isolation durch.', en: 'Enforces least-privilege access, field-level masking for sensitive data, and strict tenant isolation.' }, l)}</p>
            <p style={pStyle}>{bi({ de: 'Freigabe und Audit von Privileg-Eskalation inklusive Segregation-of-Duties-Kontrollen.', en: 'Approves and audits privilege escalation pathways and segregation-of-duties controls.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '5. Kernaufgaben B: Tenant Lifecycle Management', en: '5. Core Responsibilities B: Tenant Lifecycle Management' }, l)}>
          <div id="tenant-lifecycle" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Verantwortet Provisionierung neuer Tenants, Makler-Onboarding-Umgebungen und Aktivierung von Versicherer-Tenants.', en: 'Owns provisioning of new tenants, broker onboarding environments, and carrier tenant activation.' }, l)}</p>
            <p style={pStyle}>{bi({ de: 'Steuert Suspendierung, kontrollierte Sperrung und Terminierung inklusive Legal Hold, Archivierung und Nachvollziehbarkeit.', en: 'Executes suspension, controlled lockout, and termination with legal hold, archival, and traceability controls.' }, l)}</p>
            <p style={pStyle}>{bi({ de: 'Sichert die Einhaltung von Retention-Vorgaben, Vertragsauflagen und grenzüberschreitenden Datenanforderungen.', en: 'Ensures lifecycle actions comply with retention policy, contractual requirements, and cross-border data constraints.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '6. Kernaufgaben C: Break-Glass-Befugnis', en: '6. Core Responsibilities C: Break-Glass Authority' }, l)}>
          <div id="break-glass" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Kann Notfall-Overrides aktivieren, wenn Produktionssicherheit, regulatorische Integrität oder Betriebsfähigkeit gefährdet sind.', en: 'Can trigger emergency access override when production security, regulatory integrity, or operational continuity is at risk.' }, l)}</p>
            <p style={pStyle}>{bi({ de: 'Temporäre Privileg-Erhöhung nur mit TTL, Genehmiger-Logging und verpflichtender Rücknahme.', en: 'Applies temporary privilege elevation only with TTL, approver logging, and mandatory rollback.' }, l)}</p>
            <p style={pStyle}>{bi({ de: 'Kann regulatorischen Freeze zur Sicherung des Evidenzzustands durchsetzen.', en: 'Can enforce a regulatory freeze to preserve evidentiary state during formal investigations.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '7. Kernaufgaben D: Systemkonfigurationshoheit', en: '7. Core Responsibilities D: System Configuration Authority' }, l)}>
          <div id="system-configuration" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Steuert Feature-Flags und globale Parameter mit Wirkung auf alle Module und Tenants.', en: 'Governs feature flags and global configuration parameters affecting all modules and tenants.' }, l)}</p>
            <p style={pStyle}>{bi({ de: 'Kontrolliert API-Zugriffsrichtlinien, Service-Trust-Boundaries und Integrationsfreigaben.', en: 'Controls API access posture, service trust boundaries, and integration enable/disable flows.' }, l)}</p>
            <p style={pStyle}>{bi({ de: 'Validiert High-Impact-Änderungen vor Produktivsetzung.', en: 'Validates high-impact configuration edits before production rollout.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '8. Kernaufgaben E: Audit- und Logging-Aufsicht', en: '8. Core Responsibilities E: Audit & Logging Oversight' }, l)}>
          <div id="audit-oversight" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Stellt unveränderliche Audit-Trails für Zugriffsänderungen, Privileg-Nutzung und kritische Konfiguration sicher.', en: 'Enforces immutable audit trails for access changes, privilege usage, and critical configuration actions.' }, l)}</p>
            <p style={pStyle}>{bi({ de: 'Bewertet Access-Violations und eskaliert auffällige Muster mit Security/Compliance.', en: 'Reviews access violations and escalates suspicious patterns with Security and Compliance.' }, l)}</p>
            <p style={pStyle}>{bi({ de: 'Gewährleistet forensisch rekonstruierbare Ereignisketten für interne und regulatorische Prüfungen.', en: 'Ensures events remain forensically reconstructable for audit and regulatory inquiry.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '9. Architekturkontext', en: '9. System Architecture Context' }, l)}>
          <div id="architecture-context" style={{ display: 'grid', gap: '0.8rem' }}>
            <div style={archStackStyle}>
              <div style={archNodeStyle}>{bi({ de: 'User Layer', en: 'User Layer' }, l)}</div>
              <div style={archArrowStyle}>↓</div>
              <div style={archNodeStyle}>{bi({ de: 'Application Layer (Brokerfox / Claimsfox / Fleetfox / Partnerfox / AI Fox)', en: 'Application Layer (Brokerfox / Claimsfox / Fleetfox / Partnerfox / AI Fox)' }, l)}</div>
              <div style={archArrowStyle}>↓</div>
              <div style={{ ...archNodeStyle, borderColor: '#0f172a', background: '#e2e8f0' }}>
                {bi({ de: 'Authorization Layer (IAM / Role Engine / Policy Engine)', en: 'Authorization Layer (IAM / Role Engine / Policy Engine)' }, l)}
              </div>
              <div style={archArrowStyle}>↓</div>
              <div style={archNodeStyle}>{bi({ de: 'Data Layer (Spanner / Cloud Storage / Logging)', en: 'Data Layer (Spanner / Cloud Storage / Logging)' }, l)}</div>
              <div style={archArrowStyle}>↓</div>
              <div style={archNodeStyle}>{bi({ de: 'Security & Monitoring Layer (SIEM / Alerts / Audit Logs)', en: 'Security & Monitoring Layer (SIEM / Alerts / Audit Logs)' }, l)}</div>
            </div>
            <p style={pStyle}>{bi({ de: 'Die Hoheit des Platform Super Admin konzentriert sich auf Authorization-Layer, Tenant-Separation und Break-Glass-Governance.', en: 'Platform Super Admin authority is concentrated on authorization-layer control, tenant separation integrity, and break-glass governance.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '10. KPI-Monitoring', en: '10. KPI Monitoring Section' }, l)}>
          <div id="kpi-monitoring" style={chartGridStyle}>
            <div style={chartCardStyle}>
              <h3 style={chartTitleStyle}>{bi({ de: 'System-Uptime (%)', en: 'System Uptime (%)' }, l)}</h3>
              <div style={chartWrapStyle}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={uptimeData.map((d) => ({ ...d, periodLabel: bi(d.period, l) }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="periodLabel" />
                    <YAxis domain={[99.8, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="uptime" stroke="#0f172a" strokeWidth={2} name={bi({ de: 'Uptime', en: 'Uptime' }, l)} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={chartCardStyle}>
              <h3 style={chartTitleStyle}>{bi({ de: 'Incident Response Time (Minuten)', en: 'Incident Response Time (minutes)' }, l)}</h3>
              <div style={chartWrapStyle}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incidentResponseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sev" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="minutes" fill="#334155" name={bi({ de: 'Minuten', en: 'Minutes' }, l)} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={chartCardStyle}>
              <h3 style={chartTitleStyle}>{bi({ de: 'Unbefugte Zugriffsversuche', en: 'Unauthorized Access Attempts' }, l)}</h3>
              <div style={chartWrapStyle}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={unauthorizedAccessData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="attempts" stroke="#b91c1c" strokeWidth={2} name={bi({ de: 'Versuche', en: 'Attempts' }, l)} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={chartCardStyle}>
              <h3 style={chartTitleStyle}>{bi({ de: 'Tenant-Aktivierungszeit (Stunden)', en: 'Tenant Activation Time (hours)' }, l)}</h3>
              <div style={chartWrapStyle}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tenantActivationData.map((d) => ({ ...d, typeLabel: bi(d.type, l) }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="typeLabel" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#475569" name={bi({ de: 'Stunden', en: 'Hours' }, l)} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '11. Realistische Entscheidungsszenarien', en: '11. Realistic Decision Scenarios' }, l)}>
          <div id="decision-scenarios" style={{ display: 'grid', gap: '0.75rem' }}>
            <div style={scenarioCardStyle}>
              <h3 style={subHeadingStyle}>{bi({ de: 'Szenario 1: Broker-Tenant fordert zusätzliche Admin-Rechte', en: 'Scenario 1: Broker tenant requests additional admin rights' }, l)}</h3>
              <p style={noteStyle}><strong>{bi({ de: 'Trigger:', en: 'Trigger:' }, l)}</strong> {bi({ de: 'Antrag auf erhöhte globale Administratorrechte.', en: 'Request for elevated global administrator capability.' }, l)}</p>
              <p style={noteStyle}><strong>{bi({ de: 'Entscheidung:', en: 'Decision:' }, l)}</strong> {bi({ de: 'Ablehnung wegen Segregation-of-Duties und Tenant-Grenzverletzung.', en: 'Denied due to segregation policy and tenant boundary protection.' }, l)}</p>
              <p style={noteStyle}><strong>{bi({ de: 'Governance-Wirkung:', en: 'Governance impact:' }, l)}</strong> {bi({ de: 'Schützt Least-Privilege und verhindert Rechteausweitung über Tenant-Grenzen.', en: 'Preserves least-privilege and prevents cross-tenant privilege creep.' }, l)}</p>
              <p style={noteStyle}><strong>{bi({ de: 'Dokumentation:', en: 'Documentation requirement:' }, l)}</strong> {bi({ de: 'Antrag, Policy-Referenz und Ablehnungsbegründung im Audit-Log erfassen.', en: 'Record request, policy clause, and denial rationale in audit log.' }, l)}</p>
            </div>

            <div style={scenarioCardStyle}>
              <h3 style={subHeadingStyle}>{bi({ de: 'Szenario 2: Auffälliges Login-Muster', en: 'Scenario 2: Suspicious login pattern detected' }, l)}</h3>
              <p style={noteStyle}><strong>{bi({ de: 'Trigger:', en: 'Trigger:' }, l)}</strong> {bi({ de: 'SIEM meldet Impossible-Travel und wiederholte privilegierte Login-Anomalien.', en: 'SIEM flags impossible-travel and repeated privileged login anomalies.' }, l)}</p>
              <p style={noteStyle}><strong>{bi({ de: 'Entscheidung:', en: 'Decision:' }, l)}</strong> {bi({ de: 'Sofortige Kontensperre und erzwungener Credential-Reset.', en: 'Immediate account freeze and forced credential reset.' }, l)}</p>
              <p style={noteStyle}><strong>{bi({ de: 'Governance-Wirkung:', en: 'Governance impact:' }, l)}</strong> {bi({ de: 'Eindämmung des Kompromittierungsrisikos und Reduktion des Blast Radius.', en: 'Contains potential compromise and reduces blast radius.' }, l)}</p>
              <p style={noteStyle}><strong>{bi({ de: 'Dokumentation:', en: 'Documentation requirement:' }, l)}</strong> {bi({ de: 'Incident-Timeline, forensische Indikatoren und Maßnahmen protokollieren.', en: 'Log incident timeline, forensic indicators, and remediation actions.' }, l)}</p>
            </div>

            <div style={scenarioCardStyle}>
              <h3 style={subHeadingStyle}>{bi({ de: 'Szenario 3: Data-Breach-Alarm', en: 'Scenario 3: Data breach alert triggered' }, l)}</h3>
              <p style={noteStyle}><strong>{bi({ de: 'Trigger:', en: 'Trigger:' }, l)}</strong> {bi({ de: 'Monitoring erkennt Exfiltrationssignal auf privilegiertem Service-Account-Pfad.', en: 'Monitoring detects exfiltration signal in privileged service account path.' }, l)}</p>
              <p style={noteStyle}><strong>{bi({ de: 'Entscheidung:', en: 'Decision:' }, l)}</strong> {bi({ de: 'Break-Glass-Protokoll aktivieren: Zugriff entziehen und Notfall-Freeze setzen.', en: 'Activate break-glass protocol: revoke access and enforce emergency freeze.' }, l)}</p>
              <p style={noteStyle}><strong>{bi({ de: 'Governance-Wirkung:', en: 'Governance impact:' }, l)}</strong> {bi({ de: 'Sichert Evidenzintegrität und regulatorische Handlungsfähigkeit.', en: 'Protects evidentiary integrity and supports mandatory regulatory handling.' }, l)}</p>
              <p style={noteStyle}><strong>{bi({ de: 'Dokumentation:', en: 'Documentation requirement:' }, l)}</strong> {bi({ de: 'Chain-of-Custody und regulatorisches Incident-Paket erstellen.', en: 'Produce full chain-of-custody and regulator-ready incident package.' }, l)}</p>
            </div>

            <div style={scenarioCardStyle}>
              <h3 style={subHeadingStyle}>{bi({ de: 'Szenario 4: Fehlkonfiguration bei Versicherer-Integration', en: 'Scenario 4: Carrier integration misconfiguration detected' }, l)}</h3>
              <p style={noteStyle}><strong>{bi({ de: 'Trigger:', en: 'Trigger:' }, l)}</strong> {bi({ de: 'API-Drift führt zu unzulässigem Scope in der Carrier-Integration.', en: 'API drift introduces unauthorized scope in carrier integration.' }, l)}</p>
              <p style={noteStyle}><strong>{bi({ de: 'Entscheidung:', en: 'Decision:' }, l)}</strong> {bi({ de: 'Plattformweite API-Zugriffsdeaktivierung bis zur Korrektur.', en: 'Revoke affected API access platform-wide until corrected.' }, l)}</p>
              <p style={noteStyle}><strong>{bi({ de: 'Governance-Wirkung:', en: 'Governance impact:' }, l)}</strong> {bi({ de: 'Verhindert die Ausbreitung unsicherer Integrationszustände.', en: 'Blocks propagation of insecure integration behavior.' }, l)}</p>
              <p style={noteStyle}><strong>{bi({ de: 'Dokumentation:', en: 'Documentation requirement:' }, l)}</strong> {bi({ de: 'Change-Record, Rollback-Nachweis und Re-Approval-Checkpoint erforderlich.', en: 'Change record, rollback proof, and re-approval checkpoint are mandatory.' }, l)}</p>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '12. Risikoprofil & AI-Interaktion', en: '12. Risk Profile & AI Interaction' }, l)}>
          <div id="risk-ai-profile" style={{ display: 'grid', gap: '0.7rem' }}>
            <p style={pStyle}>{bi({ de: 'Das Rollenprofil trägt sehr hohe operative Exponierung, hohe regulatorische Exponierung und hohe Cyber-Security-Exponierung. Es besteht keine Underwriting-Kapitalexponierung.', en: 'This role carries very high operational exposure, high regulatory exposure, and high cyber-security exposure. It has no underwriting capital exposure.' }, l)}</p>
            <div style={riskPillRowStyle}>
              {[
                { label: { de: 'Operatives Risiko', en: 'Operational Risk' }, level: { de: 'Sehr hoch', en: 'Very High' }, color: '#7f1d1d' },
                { label: { de: 'Regulatorische Exponierung', en: 'Regulatory Exposure' }, level: { de: 'Hoch', en: 'High' }, color: '#9a3412' },
                { label: { de: 'Cyber-Security-Exponierung', en: 'Cyber Security Exposure' }, level: { de: 'Hoch', en: 'High' }, color: '#9a3412' },
                { label: { de: 'Underwriting-Kapitalexponierung', en: 'Underwriting Capital Exposure' }, level: { de: 'Keine', en: 'None' }, color: '#166534' }
              ].map((item) => (
                <div key={item.label.en} style={{ ...riskPillStyle, borderLeft: `6px solid ${item.color}` }}>
                  <strong>{bi(item.label, l)}</strong>
                  <span>{bi(item.level, l)}</span>
                </div>
              ))}
            </div>
            <p style={pStyle}>{bi({ de: 'Die AI-Interaktion ist rein plattformseitig: Freigabe von AI-Deployment in Produktion, Rollback-Freigabe, Zugriffskontrolle und Auditierbarkeit. Keine Freigabe fachlicher AI-Underwriting- oder Schadenentscheidungen.', en: 'AI interaction is platform-governance only: production deployment approval, rollback approval, access control enforcement, and auditability. No approval of AI business decisions in underwriting or claims.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '13. Permission-Heatmap & strukturelle Kritikalität', en: '13. Permission Heatmap & Structural Criticality' }, l)}>
          <div id="permission-criticality" style={{ display: 'grid', gap: '0.85rem' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>{bi({ de: 'Rolle', en: 'Role' }, l)}</th>
                    <th style={thStyle}>{bi({ de: 'Tenant-Erstellung', en: 'Tenant Creation' }, l)}</th>
                    <th style={thStyle}>{bi({ de: 'Globale Rollenbearbeitung', en: 'Global Role Edit' }, l)}</th>
                    <th style={thStyle}>{bi({ de: 'Break-Glass-Override', en: 'Break-Glass Override' }, l)}</th>
                    <th style={thStyle}>{bi({ de: 'AI-Deployment-Freigabe', en: 'AI Deployment Approval' }, l)}</th>
                    <th style={thStyle}>{bi({ de: 'Policy-Parameter-Änderung', en: 'Policy Parameter Change' }, l)}</th>
                  </tr>
                </thead>
                <tbody>
                  {permissionMatrix.map((row) => (
                    <tr key={row.role.en}>
                      <td style={tdRoleStyle}>{bi(row.role, l)}</td>
                      <HeatCell allowed={row.tenantCreation} lang={l} />
                      <HeatCell allowed={row.globalRoleEdit} lang={l} />
                      <HeatCell allowed={row.breakGlassOverride} lang={l} />
                      <HeatCell allowed={row.aiDeploymentApproval} lang={l} />
                      <HeatCell allowed={row.policyParameterChange} lang={l} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p style={pStyle}>{bi({ de: 'Ohne Platform Super Admin fehlen durchsetzbare Tenant-Isolation, regulatorische Steuerbarkeit, Break-Glass-Containment, Audit-Integrität und belastbare Vertrauensbasis für Versicherer.', en: 'Without Platform Super Admin governance, there is no enforceable tenant isolation, no reliable regulatory control, no break-glass containment capability, no audit integrity, and no trust baseline for carriers.' }, l)}</p>
          </div>
        </Card>
      </div>
    </section>
  )
}

function HeatCell({ allowed, lang }: { allowed: boolean; lang: Lang }) {
  return (
    <td
      style={{
        padding: '0.5rem 0.6rem',
        borderBottom: '1px solid #e2e8f0',
        textAlign: 'center',
        background: allowed ? '#dcfce7' : '#fee2e2',
        color: allowed ? '#166534' : '#991b1b',
        fontWeight: 600,
        fontSize: '0.82rem'
      }}
    >
      {allowed ? bi({ de: 'Erlaubt', en: 'Allowed' }, lang) : bi({ de: 'Gesperrt', en: 'Blocked' }, lang)}
    </td>
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

const compareGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '0.6rem'
}

const compareBoxStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 10,
  background: '#f8fafc',
  padding: '0.65rem',
  display: 'grid',
  gap: '0.35rem'
}

const archStackStyle: CSSProperties = {
  display: 'grid',
  gap: '0.35rem',
  maxWidth: 860,
  margin: '0 auto'
}

const archNodeStyle: CSSProperties = {
  border: '1px solid #cbd5e1',
  borderRadius: 10,
  padding: '0.5rem 0.75rem',
  background: '#f8fafc',
  color: '#0f172a',
  textAlign: 'center',
  fontSize: '0.86rem'
}

const archArrowStyle: CSSProperties = {
  textAlign: 'center',
  color: '#64748b',
  fontWeight: 700
}

const chartGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '0.7rem'
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
  height: 240
}

const scenarioCardStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 10,
  padding: '0.65rem',
  background: '#f8fafc',
  display: 'grid',
  gap: '0.35rem'
}

const riskPillRowStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '0.6rem'
}

const riskPillStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 10,
  background: '#f8fafc',
  padding: '0.55rem 0.6rem',
  display: 'grid',
  gap: '0.2rem',
  color: '#0f172a',
  fontSize: '0.84rem'
}

const tableStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  minWidth: 860,
  fontSize: '0.84rem'
}

const thStyle: CSSProperties = {
  textAlign: 'left',
  padding: '0.5rem 0.6rem',
  borderBottom: '1px solid #cbd5e1',
  color: '#334155',
  background: '#f8fafc',
  whiteSpace: 'nowrap'
}

const tdRoleStyle: CSSProperties = {
  padding: '0.5rem 0.6rem',
  borderBottom: '1px solid #e2e8f0',
  color: '#0f172a',
  whiteSpace: 'nowrap',
  fontWeight: 600
}
