import { type CSSProperties } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { findRoleBySlug, resolveRoleSlug, type RoleHandbookRole } from '@/components/inside-insurfox/roleHandbookData'
import { useI18n } from '@/i18n/I18nContext'

type BiText = { de: string; en: string }

function bi(value: BiText, lang: 'de' | 'en') {
  return lang === 'de' ? value.de : value.en
}

type RoleSection = {
  id: string
  title: string
  body: string
}

function rolePurpose(role: RoleHandbookRole) {
  return `This role ensures reliable execution for ${role.name} decisions inside the ${role.tenantLevel} boundary and protects underwriting, claims, and governance quality.`
}

function buildSections(role: RoleHandbookRole): RoleSection[] {
  return [
    {
      id: 'overview',
      title: '1. Role Overview',
      body: `${role.name} operates at tenant level ${role.tenantLevel}. The role is positioned as accountable owner for ${role.modules.join(', ')} execution and reports into the relevant platform/tenant leadership line. Strategic purpose: secure decision quality, speed, and controlled risk outcomes.`
    },
    {
      id: 'org',
      title: '2. Department & Organizational Embedding',
      body: `The role sits in the insurance operating organization and interacts with underwriting, claims, finance, partner, and compliance functions. Platform-vs-tenant boundary: platform defines policy and controls; tenant executes within approved authority corridors.`
    },
    {
      id: 'mission',
      title: '3. Mission & Strategic Responsibility',
      body: `${rolePurpose(role)} Business impact includes service quality and margin stability. The role directly influences risk exposure decisions and contributes to capital efficiency by reducing leakage and avoidable volatility.`
    },
    {
      id: 'responsibilities',
      title: '4. Core Responsibilities (Detailed)',
      body: `Operational: run role-specific workflows in ${role.modules.join(', ')}. Governance: comply with authority matrix and auditability rules. Escalation triggers: threshold breaches, policy exceptions, and AI-confidence anomalies. Approval corridor follows role authority; out-of-band cases escalate to senior governance.`
    },
    {
      id: 'daily',
      title: '5. Daily Work Scenario (Realistic Story)',
      body: `A typical day starts in dashboard triage, reviews AI outputs, validates case context, executes role decisions, and coordinates with adjacent teams. Critical escalations are handed over with evidence pack and decision rationale. Cross-functional alignment occurs through event-driven status updates and governance checkpoints.`
    },
    {
      id: 'access',
      title: '6. System Access & Modules',
      body: `Accessible modules: ${role.modules.join(', ')}. Access model follows read/write segregation by permission policy. AI interaction level: ${role.aiInteraction}. Data sensitivity follows least-privilege scope and masking policy for sensitive fields.`
    },
    {
      id: 'decisions',
      title: '7. Key Decisions',
      body: `Approvals: ${role.decisionAuthority} Escalation required for threshold exceedance, unresolved compliance conflicts, major claims deviations, and underwriting exceptions beyond delegated authority.`
    },
    {
      id: 'kpi',
      title: '8. KPIs & Performance Metrics',
      body: `Financial KPIs: margin contribution, leakage control, cost-to-serve. Operational KPIs: cycle time, SLA adherence, backlog stability. Risk KPIs: loss trend signals, exception rates, escalation quality. AI oversight KPIs: model usage quality, override rationale quality, alert response time.`
    },
    {
      id: 'ai',
      title: '9. Interaction with AI',
      body: `AI interaction mode: ${role.aiInteraction}. The role consumes and validates AI recommendations in context. Depending on authority level, the role may approve, override, or audit AI decisions and must document rationale for governance traceability.`
    },
    {
      id: 'escalation',
      title: '10. Escalation & Governance Matrix',
      body: `Upward escalation: policy exception, threshold breach, legal risk, unresolved fraud signal. Downward delegation: routine tasks under controlled SOPs. Cross-functional conflict resolution follows documented governance path with compliance and accountable owners involved.`
    },
    {
      id: 'risk',
      title: '11. Risk Exposure',
      body: `Regulatory exposure: process and decision compliance. Capital exposure: cumulative portfolio and severity drift. Reputational exposure: service failure, unfair decisioning, insufficient transparency. Role holders must preserve evidence quality and policy conformance.`
    },
    {
      id: 'training',
      title: '12. Training & Knowledge Requirements',
      body: `Required capability stack: insurance technical expertise, regulatory literacy, data literacy, and AI literacy. Role maturity requires continuous training in threshold governance, decision documentation, and cross-functional incident handling.`
    },
    {
      id: 'why',
      title: '13. Why This Role Matters for Insurfox',
      body: `This role is a structural part of Insurfox mission execution. It links the IaaS platform model to MGA/Broker operating reality and ensures disciplined, auditable outcomes across underwriting, claims, and partner workflows.`
    }
  ]
}

export default function InsideInsurfoxRoleDetailPage() {
  const navigate = useNavigate()
  const { roleSlug } = useParams()
  const { lang } = useI18n()
  const l = lang === 'de' ? 'de' : 'en'
  const role = roleSlug ? findRoleBySlug(roleSlug) : null

  function handlePrint() {
    const oldTitle = document.title
    document.title = `Inside_Insurfox_Role_${role?.slug ?? 'unknown'}`
    window.print()
    window.setTimeout(() => {
      document.title = oldTitle
    }, 700)
  }

  if (!role) {
    return (
      <section className="page" style={{ gap: '1rem', background: '#fff', paddingTop: '1rem' }}>
        <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', display: 'grid', gap: '1rem' }}>
          <Card>
            <Header title={bi({ de: 'Rolle nicht gefunden', en: 'Role Not Found' }, l)} subtitle={bi({ de: 'Die angeforderte Rollen-Seite ist nicht verfügbar.', en: 'The requested role page is not available.' }, l)} />
            <div style={{ marginTop: '0.75rem' }}>
              <Button onClick={() => navigate('/inside-insurfox/roles')}>{bi({ de: 'Zur Rollenübersicht', en: 'Back to Roles Overview' }, l)}</Button>
            </div>
          </Card>
        </div>
      </section>
    )
  }

  const sections = buildSections(role)
  const canonicalSlug = resolveRoleSlug(roleSlug ?? role.slug)

  return (
    <section className="page" style={{ gap: '1.25rem', background: '#fff', paddingTop: '1rem' }}>
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 10mm; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .print-hide { display: none !important; }
        }
      `}</style>
      <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', display: 'grid', gap: '1rem' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <Header
              title={`${role.name} – ${bi({ de: 'Rollenhandbuch', en: 'Role Handbook' }, l)}`}
              subtitle={bi({ de: 'Inside Insurfox / Rollen / Detail', en: 'Inside Insurfox / Roles / Detail' }, l)}
              titleColor="#0f172a"
              subtitleColor="#475569"
            />
            <div className="print-hide">
              <Button size="sm" onClick={handlePrint}>{bi({ de: 'Als PDF drucken', en: 'Print as PDF' }, l)}</Button>
            </div>
          </div>

          <div className="print-hide" style={{ marginTop: '0.7rem', fontSize: '0.84rem', color: '#334155', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <Link to="/inside-insurfox">{bi({ de: 'Inside Insurfox', en: 'Inside Insurfox' }, l)}</Link>
            <span>/</span>
            <Link to="/inside-insurfox/roles">{bi({ de: 'Rollen', en: 'Roles' }, l)}</Link>
            <span>/</span>
            <span>{role.name}</span>
          </div>

          <div className="print-hide" style={{ marginTop: '0.8rem', display: 'grid', gap: '0.45rem' }}>
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} style={anchorStyle}>{s.title}</a>
              ))}
            </div>
            <div>
              <Button size="sm" variant="secondary" onClick={() => navigate('/inside-insurfox/roles')}>
                {bi({ de: 'Zur Rollenübersicht', en: 'Back to Roles Overview' }, l)}
              </Button>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: 'Rollen-Metadaten', en: 'Role Metadata' }, l)}>
          <p style={metaPStyle}><strong>{bi({ de: 'Rolle', en: 'Role' }, l)}:</strong> {role.name}</p>
          <p style={metaPStyle}><strong>{bi({ de: 'Tenant Level', en: 'Tenant Level' }, l)}:</strong> {role.tenantLevel}</p>
          <p style={metaPStyle}><strong>{bi({ de: 'Module', en: 'Modules' }, l)}:</strong> {role.modules.join(', ')}</p>
          <p style={metaPStyle}><strong>{bi({ de: 'AI-Interaktion', en: 'AI Interaction' }, l)}:</strong> {role.aiInteraction}</p>
          <p style={metaPStyle}><strong>{bi({ de: 'Slug', en: 'Slug' }, l)}:</strong> {canonicalSlug}</p>
        </Card>

        {sections.map((section) => (
          <Card key={section.id} title={section.title}>
            <div id={section.id}>
              <p style={bodyPStyle}>{section.body}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

const bodyPStyle: CSSProperties = {
  margin: 0,
  color: '#334155',
  fontSize: '0.9rem',
  lineHeight: 1.62
}

const metaPStyle: CSSProperties = {
  margin: '0 0 0.25rem',
  color: '#334155',
  fontSize: '0.88rem',
  lineHeight: 1.55
}

const anchorStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 999,
  padding: '0.26rem 0.55rem',
  color: '#0f172a',
  fontSize: '0.75rem',
  textDecoration: 'none',
  background: '#f8fafc'
}
