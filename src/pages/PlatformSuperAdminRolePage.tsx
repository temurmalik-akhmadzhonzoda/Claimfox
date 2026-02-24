import { type CSSProperties } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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

const anchorSections = [
  { id: 'role-definition', label: '1. Executive Role Definition' },
  { id: 'role-delineation', label: '2. Role Delineation' },
  { id: 'org-embedding', label: '3. Organizational Embedding' },
  { id: 'iam-governance', label: '4. Identity & Access Governance' },
  { id: 'tenant-lifecycle', label: '5. Tenant Lifecycle Management' },
  { id: 'break-glass', label: '6. Break-Glass Authority' },
  { id: 'system-configuration', label: '7. System Configuration Authority' },
  { id: 'audit-oversight', label: '8. Audit & Logging Oversight' },
  { id: 'architecture-context', label: '9. System Architecture Context' },
  { id: 'kpi-monitoring', label: '10. KPI Monitoring' },
  { id: 'decision-scenarios', label: '11. Realistic Decision Scenarios' },
  { id: 'risk-ai-profile', label: '12. Risk Profile & AI Interaction' },
  { id: 'permission-criticality', label: '13. Permission Heatmap & Structural Criticality' }
]

const uptimeData = [
  { month: 'Jan', uptime: 99.92 },
  { month: 'Feb', uptime: 99.95 },
  { month: 'Mar', uptime: 99.9 },
  { month: 'Apr', uptime: 99.97 },
  { month: 'May', uptime: 99.96 }
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
  { type: 'Broker', hours: 11 },
  { type: 'Carrier', hours: 14 },
  { type: 'Corporate', hours: 8 },
  { type: 'Partner', hours: 6 }
]

type PermissionRow = {
  role: string
  tenantCreation: boolean
  globalRoleEdit: boolean
  breakGlassOverride: boolean
  aiDeploymentApproval: boolean
  policyParameterChange: boolean
}

const permissionMatrix: PermissionRow[] = [
  {
    role: 'Platform Super Admin',
    tenantCreation: true,
    globalRoleEdit: true,
    breakGlassOverride: true,
    aiDeploymentApproval: true,
    policyParameterChange: true
  },
  {
    role: 'DevOps Lead',
    tenantCreation: false,
    globalRoleEdit: false,
    breakGlassOverride: false,
    aiDeploymentApproval: true,
    policyParameterChange: false
  },
  {
    role: 'AI Governance Officer',
    tenantCreation: false,
    globalRoleEdit: false,
    breakGlassOverride: false,
    aiDeploymentApproval: true,
    policyParameterChange: false
  },
  {
    role: 'Broker Admin',
    tenantCreation: false,
    globalRoleEdit: false,
    breakGlassOverride: false,
    aiDeploymentApproval: false,
    policyParameterChange: false
  },
  {
    role: 'Tenant Admin',
    tenantCreation: false,
    globalRoleEdit: false,
    breakGlassOverride: false,
    aiDeploymentApproval: false,
    policyParameterChange: false
  }
]

export default function PlatformSuperAdminRolePage() {
  const navigate = useNavigate()

  function handlePrint() {
    const previous = document.title
    document.title = 'Platform_Super_Admin_Governance'
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
              title="Platform Super Admin – Enterprise Governance Definition"
              subtitle="Inside Insurfox / Roles / Platform Super Admin"
              titleColor="#0f172a"
              subtitleColor="#475569"
            />
            <div className="print-hide" style={{ display: 'grid', gap: '0.45rem' }}>
              <Button size="sm" onClick={handlePrint}>Print as PDF</Button>
              <Button size="sm" variant="secondary" onClick={() => navigate('/inside-insurfox/roles')}>
                Back to Roles Overview
              </Button>
            </div>
          </div>

          <div className="print-hide" style={{ marginTop: '0.7rem', fontSize: '0.84rem', color: '#334155', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <Link to="/inside-insurfox">Inside Insurfox</Link>
            <span>/</span>
            <Link to="/inside-insurfox/roles">Roles</Link>
            <span>/</span>
            <span>Platform Super Admin</span>
          </div>

          <div className="print-hide" style={{ marginTop: '0.8rem', display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {anchorSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} style={anchorStyle}>{section.label}</a>
            ))}
          </div>
        </Card>

        <Card title="1. Executive Role Definition">
          <div id="role-definition" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>
              The Platform Super Admin is the highest technical and governance authority across the Insurfox Insurance Operating System.
              This role owns tenant lifecycle control, system-level access governance, emergency intervention rights, and global platform configuration.
            </p>
            <p style={pStyle}>
              The role has formal break-glass authority for major incidents and regulatory controls, but it does not make underwriting,
              claims, pricing, or portfolio acceptance decisions. Business risk selection remains under underwriting and claims governance roles.
            </p>
          </div>
        </Card>

        <Card title="2. Role Delineation">
          <div id="role-delineation" style={{ display: 'grid', gap: '0.6rem' }}>
            <div style={compareGridStyle}>
              <div style={compareBoxStyle}>
                <h3 style={subHeadingStyle}>Platform Super Admin</h3>
                <p style={noteStyle}>Owns platform-wide IAM control, tenant separation, break-glass access, and immutable audit integrity.</p>
              </div>
              <div style={compareBoxStyle}>
                <h3 style={subHeadingStyle}>DevOps Lead</h3>
                <p style={noteStyle}>Runs service reliability, deployments, and runtime operations, without global role governance authority.</p>
              </div>
              <div style={compareBoxStyle}>
                <h3 style={subHeadingStyle}>AI Governance Officer</h3>
                <p style={noteStyle}>Defines AI policy controls and model governance but does not own full platform tenant lifecycle rights.</p>
              </div>
              <div style={compareBoxStyle}>
                <h3 style={subHeadingStyle}>Broker Admin / Tenant Admin</h3>
                <p style={noteStyle}>Operates inside delegated tenant boundaries and cannot modify global policy engines or cross-tenant controls.</p>
              </div>
            </div>
          </div>
        </Card>

        <Card title="3. Organizational Embedding">
          <div id="org-embedding" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>
              This function sits within Platform Operations and Core Infrastructure, typically reporting to the CTO or Chief Platform Officer.
              It operates as the final technical governance instance for cross-tenant control, security posture, and compliance-enforceable access design.
            </p>
            <p style={pStyle}>
              The role works daily with DevOps, Security Engineering, Compliance, the Data Protection Officer, Product Owner,
              and the AI Governance Officer to align operational resilience with regulatory obligations.
            </p>
          </div>
        </Card>

        <Card title="4. Core Responsibilities A: Identity & Access Governance">
          <div id="iam-governance" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>Defines IAM hierarchy, role templates, and policy guardrails across platform, broker, carrier, and corporate tenants.</p>
            <p style={pStyle}>Enforces least-privilege access, field-level masking for sensitive data, and strict tenant isolation by design.</p>
            <p style={pStyle}>Approves and audits privilege elevation pathways and validates segregation-of-duties controls for regulated workflows.</p>
          </div>
        </Card>

        <Card title="5. Core Responsibilities B: Tenant Lifecycle Management">
          <div id="tenant-lifecycle" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>Owns provisioning of new tenants, broker onboarding environments, and carrier tenant activation templates.</p>
            <p style={pStyle}>Executes suspension, controlled lockout, and termination procedures with legal hold, archival, and traceability controls.</p>
            <p style={pStyle}>Ensures lifecycle actions are compliant with retention policy, contractual requirements, and cross-border data constraints.</p>
          </div>
        </Card>

        <Card title="6. Core Responsibilities C: Break-Glass Authority">
          <div id="break-glass" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>Can trigger emergency access override when production security, regulatory integrity, or operational continuity is at risk.</p>
            <p style={pStyle}>Applies temporary privilege elevation with strict TTL controls, approver logging, and mandatory post-incident revocation.</p>
            <p style={pStyle}>Can enforce a regulatory freeze to block risky changes and preserve evidentiary state during formal investigations.</p>
          </div>
        </Card>

        <Card title="7. Core Responsibilities D: System Configuration Authority">
          <div id="system-configuration" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>Governs feature flags and global policy parameters that affect system behavior across all modules and tenants.</p>
            <p style={pStyle}>Controls API access posture, service-to-service trust boundaries, and integration onboarding/disablement procedures.</p>
            <p style={pStyle}>Validates change controls for high-impact configuration edits before they are promoted to production.</p>
          </div>
        </Card>

        <Card title="8. Core Responsibilities E: Audit & Logging Oversight">
          <div id="audit-oversight" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>Enforces immutable audit trail integrity for access changes, privilege use, and critical configuration actions.</p>
            <p style={pStyle}>Reviews access violations and suspicious behavior signals with Security and Compliance escalation paths.</p>
            <p style={pStyle}>Ensures platform events remain forensically reconstructable for internal audit and regulatory inquiry.</p>
          </div>
        </Card>

        <Card title="9. System Architecture Context">
          <div id="architecture-context" style={{ display: 'grid', gap: '0.8rem' }}>
            <div style={archStackStyle}>
              <div style={archNodeStyle}>User Layer</div>
              <div style={archArrowStyle}>↓</div>
              <div style={archNodeStyle}>Application Layer (Brokerfox / Claimsfox / Fleetfox / Partnerfox / AI Fox)</div>
              <div style={archArrowStyle}>↓</div>
              <div style={{ ...archNodeStyle, borderColor: '#0f172a', background: '#e2e8f0' }}>
                Authorization Layer (IAM / Role Engine / Policy Engine)
              </div>
              <div style={archArrowStyle}>↓</div>
              <div style={archNodeStyle}>Data Layer (Spanner / Cloud Storage / Logging)</div>
              <div style={archArrowStyle}>↓</div>
              <div style={archNodeStyle}>Security & Monitoring Layer (SIEM / Alerts / Audit Logs)</div>
            </div>
            <p style={pStyle}>
              Platform Super Admin authority is concentrated on authorization control, tenant separation integrity,
              and break-glass override governance. This is the control point for platform trust and regulatory defensibility.
            </p>
          </div>
        </Card>

        <Card title="10. KPI Monitoring Section">
          <div id="kpi-monitoring" style={chartGridStyle}>
            <div style={chartCardStyle}>
              <h3 style={chartTitleStyle}>System Uptime (%)</h3>
              <div style={chartWrapStyle}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={uptimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[99.8, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="uptime" stroke="#0f172a" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={chartCardStyle}>
              <h3 style={chartTitleStyle}>Incident Response Time (minutes)</h3>
              <div style={chartWrapStyle}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incidentResponseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sev" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="minutes" fill="#334155" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={chartCardStyle}>
              <h3 style={chartTitleStyle}>Unauthorized Access Attempts</h3>
              <div style={chartWrapStyle}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={unauthorizedAccessData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="attempts" stroke="#b91c1c" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={chartCardStyle}>
              <h3 style={chartTitleStyle}>Tenant Activation Time (hours)</h3>
              <div style={chartWrapStyle}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tenantActivationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#475569" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>

        <Card title="11. Realistic Decision Scenarios">
          <div id="decision-scenarios" style={{ display: 'grid', gap: '0.75rem' }}>
            <div style={scenarioCardStyle}>
              <h3 style={subHeadingStyle}>Scenario 1: Broker tenant requests additional admin rights</h3>
              <p style={noteStyle}><strong>Trigger:</strong> Broker tenant requests elevated global administrator capability.</p>
              <p style={noteStyle}><strong>Decision:</strong> Super Admin denies request because it violates segregation and tenant boundary policy.</p>
              <p style={noteStyle}><strong>Governance impact:</strong> Preserves least-privilege and prevents cross-tenant privilege creep.</p>
              <p style={noteStyle}><strong>Documentation requirement:</strong> Record request, policy clause, and formal denial rationale in audit log.</p>
            </div>

            <div style={scenarioCardStyle}>
              <h3 style={subHeadingStyle}>Scenario 2: Suspicious login pattern detected</h3>
              <p style={noteStyle}><strong>Trigger:</strong> SIEM flags impossible-travel and repeated privileged login anomalies.</p>
              <p style={noteStyle}><strong>Decision:</strong> Emergency account freeze and forced credential reset for affected principals.</p>
              <p style={noteStyle}><strong>Governance impact:</strong> Containment of potential account compromise and reduced blast radius.</p>
              <p style={noteStyle}><strong>Documentation requirement:</strong> Incident timeline, forensic indicators, and remediation actions must be logged.</p>
            </div>

            <div style={scenarioCardStyle}>
              <h3 style={subHeadingStyle}>Scenario 3: Data breach alert triggered</h3>
              <p style={noteStyle}><strong>Trigger:</strong> Monitoring detects exfiltration signal in a privileged service account path.</p>
              <p style={noteStyle}><strong>Decision:</strong> Break-glass protocol activated: immediate access revocation and emergency freeze.</p>
              <p style={noteStyle}><strong>Governance impact:</strong> Protects evidentiary integrity and supports mandatory regulatory handling.</p>
              <p style={noteStyle}><strong>Documentation requirement:</strong> Full chain-of-custody and regulator-ready incident packet required.</p>
            </div>

            <div style={scenarioCardStyle}>
              <h3 style={subHeadingStyle}>Scenario 4: Carrier integration misconfiguration detected</h3>
              <p style={noteStyle}><strong>Trigger:</strong> API contract drift introduces unauthorized scope in carrier integration.</p>
              <p style={noteStyle}><strong>Decision:</strong> Platform-wide API key revocation for affected integration until corrected.</p>
              <p style={noteStyle}><strong>Governance impact:</strong> Blocks propagation of insecure integration behavior.</p>
              <p style={noteStyle}><strong>Documentation requirement:</strong> Change record, rollback proof, and re-approval checkpoint are mandatory.</p>
            </div>
          </div>
        </Card>

        <Card title="12. Risk Profile & AI Interaction">
          <div id="risk-ai-profile" style={{ display: 'grid', gap: '0.7rem' }}>
            <p style={pStyle}>
              Risk exposure for this role is very high on operational continuity, high on regulatory accountability,
              and high on cyber security posture. It has no underwriting capital exposure because the role does not accept insurance risk.
            </p>
            <div style={riskPillRowStyle}>
              {[
                { label: 'Operational Risk', level: 'Very High', color: '#7f1d1d' },
                { label: 'Regulatory Exposure', level: 'High', color: '#9a3412' },
                { label: 'Cyber Security Exposure', level: 'High', color: '#9a3412' },
                { label: 'Underwriting Capital Exposure', level: 'None', color: '#166534' }
              ].map((item) => (
                <div key={item.label} style={{ ...riskPillStyle, borderLeft: `6px solid ${item.color}` }}>
                  <strong>{item.label}</strong>
                  <span>{item.level}</span>
                </div>
              ))}
            </div>
            <p style={pStyle}>
              AI interaction is platform-governance focused: the Platform Super Admin may approve AI deployment to production,
              approve rollback, enforce AI access controls, and ensure full auditability of model access events.
              The role does not approve AI business decisions in underwriting or claims.
            </p>
          </div>
        </Card>

        <Card title="13. Permission Heatmap & Structural Criticality">
          <div id="permission-criticality" style={{ display: 'grid', gap: '0.85rem' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Role</th>
                    <th style={thStyle}>Tenant Creation</th>
                    <th style={thStyle}>Global Role Edit</th>
                    <th style={thStyle}>Break-Glass Override</th>
                    <th style={thStyle}>AI Deployment Approval</th>
                    <th style={thStyle}>Policy Parameter Change</th>
                  </tr>
                </thead>
                <tbody>
                  {permissionMatrix.map((row) => (
                    <tr key={row.role}>
                      <td style={tdRoleStyle}>{row.role}</td>
                      <HeatCell allowed={row.tenantCreation} />
                      <HeatCell allowed={row.globalRoleEdit} />
                      <HeatCell allowed={row.breakGlassOverride} />
                      <HeatCell allowed={row.aiDeploymentApproval} />
                      <HeatCell allowed={row.policyParameterChange} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p style={pStyle}>
              This role is structurally critical: without Platform Super Admin governance there is no enforceable tenant isolation,
              no reliable regulatory control, no break-glass containment capability, no audit trail integrity, and no platform trust baseline for carriers.
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}

function HeatCell({ allowed }: { allowed: boolean }) {
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
      {allowed ? 'Allowed' : 'Blocked'}
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
