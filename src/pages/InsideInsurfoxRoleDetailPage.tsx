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
  title: BiText
  body: BiText
}

function tenantLevelText(value: string, lang: 'de' | 'en') {
  if (lang !== 'de') return value
  const map: Record<string, string> = {
    Platform: 'Plattform',
    Broker: 'Makler',
    'Corporate Client': 'Unternehmenskunde',
    Carrier: 'Versicherer',
    Partner: 'Partner',
    MGA: 'MGA',
    'Platform/MGA': 'Plattform/MGA',
    'Platform/Broker': 'Plattform/Makler',
    'Platform/Compliance': 'Plattform/Compliance',
    'Platform/Carrier': 'Plattform/Versicherer',
    'MGA/Carrier': 'MGA/Versicherer',
    'Partner/Platform': 'Partner/Plattform',
    'Platform/Broker/MGA': 'Plattform/Makler/MGA'
  }
  return map[value] ?? value
}

function aiInteractionText(value: RoleHandbookRole['aiInteraction'], lang: 'de' | 'en') {
  if (lang !== 'de') return value
  const map: Record<RoleHandbookRole['aiInteraction'], string> = {
    none: 'keine',
    consume: 'konsumiert',
    approve: 'genehmigt',
    override: 'überschreibt',
    audit: 'auditiert'
  }
  return map[value]
}

function buildSections(role: RoleHandbookRole): RoleSection[] {
  return [
    {
      id: 'overview',
      title: { de: '1. Rollenüberblick', en: '1. Role Overview' },
      body: {
        de: `${role.name} arbeitet auf der Mandantenebene ${tenantLevelText(role.tenantLevel, 'de')}. Die Rolle verantwortet die Ausführung in ${role.modules.join(', ')} und berichtet in die jeweilige Führungsstruktur von Plattform oder Tenant. Strategischer Zweck: hohe Entscheidungsqualität, Geschwindigkeit und kontrollierte Risikoergebnisse.`,
        en: `${role.name} operates at tenant level ${role.tenantLevel}. The role is positioned as accountable owner for ${role.modules.join(', ')} execution and reports into the relevant platform/tenant leadership line. Strategic purpose: secure decision quality, speed, and controlled risk outcomes.`
      }
    },
    {
      id: 'org',
      title: { de: '2. Bereich & organisatorische Einbettung', en: '2. Department & Organizational Embedding' },
      body: {
        de: `Die Rolle ist in der Versicherungsorganisation verankert und arbeitet mit Underwriting, Schaden, Finance, Partnern und Compliance zusammen. Plattform-vs.-Tenant-Grenze: Die Plattform definiert Policies und Kontrollen, der Tenant führt innerhalb freigegebener Autoritätskorridore aus.`,
        en: `The role sits in the insurance operating organization and interacts with underwriting, claims, finance, partner, and compliance functions. Platform-vs-tenant boundary: platform defines policy and controls; tenant executes within approved authority corridors.`
      }
    },
    {
      id: 'mission',
      title: { de: '3. Mission & strategische Verantwortung', en: '3. Mission & Strategic Responsibility' },
      body: {
        de: `Die Rolle stellt verlässliche Entscheidungen im Zuständigkeitsbereich sicher und schützt Qualität in Underwriting, Schaden und Governance. Der Business-Impact liegt in Servicequalität und Margenstabilität. Gleichzeitig beeinflusst die Rolle Risikopositionen und die Kapitaleffizienz durch geringere Leakage und weniger vermeidbare Volatilität.`,
        en: `This role ensures reliable execution for ${role.name} decisions inside the ${role.tenantLevel} boundary and protects underwriting, claims, and governance quality. Business impact includes service quality and margin stability. The role directly influences risk exposure decisions and contributes to capital efficiency by reducing leakage and avoidable volatility.`
      }
    },
    {
      id: 'responsibilities',
      title: { de: '4. Kernverantwortungen (detailliert)', en: '4. Core Responsibilities (Detailed)' },
      body: {
        de: `Operativ: rollenspezifische Workflows in ${role.modules.join(', ')} ausführen. Governance: Autoritätsmatrix und Auditierbarkeit einhalten. Eskalationstrigger: Schwellenwertverletzungen, Policy-Ausnahmen und Auffälligkeiten bei KI-Confidence. Freigaben erfolgen im Autoritätskorridor; Out-of-Band-Fälle gehen an die Senior Governance.`,
        en: `Operational: run role-specific workflows in ${role.modules.join(', ')}. Governance: comply with authority matrix and auditability rules. Escalation triggers: threshold breaches, policy exceptions, and AI-confidence anomalies. Approval corridor follows role authority; out-of-band cases escalate to senior governance.`
      }
    },
    {
      id: 'daily',
      title: { de: '5. Tagesablauf (realistisches Szenario)', en: '5. Daily Work Scenario (Realistic Story)' },
      body: {
        de: `Ein typischer Tag beginnt mit Dashboard-Triage, der Prüfung von KI-Outputs, der Validierung des Fallkontexts und der Umsetzung rollenspezifischer Entscheidungen. Kritische Eskalationen werden mit Nachweispaket und Entscheidungsbegründung übergeben. Die Abstimmung erfolgt funktionsübergreifend über eventgetriebene Statusupdates und Governance-Checkpoints.`,
        en: `A typical day starts in dashboard triage, reviews AI outputs, validates case context, executes role decisions, and coordinates with adjacent teams. Critical escalations are handed over with evidence pack and decision rationale. Cross-functional alignment occurs through event-driven status updates and governance checkpoints.`
      }
    },
    {
      id: 'access',
      title: { de: '6. Systemzugriff & Module', en: '6. System Access & Modules' },
      body: {
        de: `Zugängliche Module: ${role.modules.join(', ')}. Das Zugriffsmodell folgt Read/Write-Trennung gemäß Berechtigungspolicy. KI-Interaktionslevel: ${aiInteractionText(role.aiInteraction, 'de')}. Datensensitivität wird über Least-Privilege und Feldmaskierung gesteuert.`,
        en: `Accessible modules: ${role.modules.join(', ')}. Access model follows read/write segregation by permission policy. AI interaction level: ${role.aiInteraction}. Data sensitivity follows least-privilege scope and masking policy for sensitive fields.`
      }
    },
    {
      id: 'decisions',
      title: { de: '7. Schlüsselentscheidungen', en: '7. Key Decisions' },
      body: {
        de: `Freigaben: ${role.decisionAuthority} Eine Eskalation ist erforderlich bei Schwellenwertüberschreitungen, ungelösten Compliance-Konflikten, wesentlichen Schadenabweichungen und Underwriting-Ausnahmen außerhalb der delegierten Autorität.`,
        en: `Approvals: ${role.decisionAuthority} Escalation required for threshold exceedance, unresolved compliance conflicts, major claims deviations, and underwriting exceptions beyond delegated authority.`
      }
    },
    {
      id: 'kpi',
      title: { de: '8. KPIs & Performance-Metriken', en: '8. KPIs & Performance Metrics' },
      body: {
        de: `Finanz-KPIs: Margenbeitrag, Leakage-Kontrolle, Cost-to-Serve. Operative KPIs: Durchlaufzeit, SLA-Einhaltung, Backlog-Stabilität. Risiko-KPIs: Schaden-Trendsignale, Ausnahmequoten, Eskalationsqualität. KI-KPIs: Qualität der Modellnutzung, Qualität der Override-Begründung, Reaktionszeit auf Alerts.`,
        en: `Financial KPIs: margin contribution, leakage control, cost-to-serve. Operational KPIs: cycle time, SLA adherence, backlog stability. Risk KPIs: loss trend signals, exception rates, escalation quality. AI oversight KPIs: model usage quality, override rationale quality, alert response time.`
      }
    },
    {
      id: 'ai',
      title: { de: '9. Interaktion mit KI', en: '9. Interaction with AI' },
      body: {
        de: `KI-Interaktionsmodus: ${aiInteractionText(role.aiInteraction, 'de')}. Die Rolle nutzt und validiert KI-Empfehlungen im Kontext. Je nach Autoritätsniveau kann die Rolle KI-Entscheidungen genehmigen, überschreiben oder auditieren und muss die Begründung governance-konform dokumentieren.`,
        en: `AI interaction mode: ${role.aiInteraction}. The role consumes and validates AI recommendations in context. Depending on authority level, the role may approve, override, or audit AI decisions and must document rationale for governance traceability.`
      }
    },
    {
      id: 'escalation',
      title: { de: '10. Eskalations- & Governance-Matrix', en: '10. Escalation & Governance Matrix' },
      body: {
        de: `Aufwärtseskalation: Policy-Ausnahme, Schwellenwertverletzung, Rechtsrisiko, ungelöstes Betrugssignal. Abwärtsdelegation: Routinetätigkeiten unter kontrollierten SOPs. Funktionsübergreifende Konfliktlösung folgt dem dokumentierten Governance-Pfad mit Compliance und verantwortlichen Owners.`,
        en: `Upward escalation: policy exception, threshold breach, legal risk, unresolved fraud signal. Downward delegation: routine tasks under controlled SOPs. Cross-functional conflict resolution follows documented governance path with compliance and accountable owners involved.`
      }
    },
    {
      id: 'risk',
      title: { de: '11. Risikoprofil', en: '11. Risk Exposure' },
      body: {
        de: `Regulatorisches Risiko: Prozess- und Entscheidungs-Compliance. Kapitalrisiko: kumulierte Portfolioeffekte und Schadenhöhendrift. Reputationsrisiko: Servicefehler, intransparente oder unausgewogene Entscheidungslogik. Rolleninhaber müssen Nachweisqualität und Policy-Konformität sichern.`,
        en: `Regulatory exposure: process and decision compliance. Capital exposure: cumulative portfolio and severity drift. Reputational exposure: service failure, unfair decisioning, insufficient transparency. Role holders must preserve evidence quality and policy conformance.`
      }
    },
    {
      id: 'training',
      title: { de: '12. Training & Wissensanforderungen', en: '12. Training & Knowledge Requirements' },
      body: {
        de: `Erforderliche Fähigkeiten: versicherungstechnische Expertise, regulatorische Kompetenz, Data Literacy und KI-Literacy. Rollenreife erfordert kontinuierliches Training in Schwellenwert-Governance, Entscheidungsdokumentation und funktionsübergreifendem Incident-Handling.`,
        en: `Required capability stack: insurance technical expertise, regulatory literacy, data literacy, and AI literacy. Role maturity requires continuous training in threshold governance, decision documentation, and cross-functional incident handling.`
      }
    },
    {
      id: 'why',
      title: { de: '13. Warum diese Rolle für Insurfox zentral ist', en: '13. Why This Role Matters for Insurfox' },
      body: {
        de: `Diese Rolle ist ein struktureller Baustein der Insurfox-Mission. Sie verbindet das IaaS-Plattformmodell mit der operativen MGA-/Broker-Realität und sichert disziplinierte, auditierbare Ergebnisse über Underwriting-, Schaden- und Partner-Workflows.`,
        en: `This role is a structural part of Insurfox mission execution. It links the IaaS platform model to MGA/Broker operating reality and ensures disciplined, auditable outcomes across underwriting, claims, and partner workflows.`
      }
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
                <a key={s.id} href={`#${s.id}`} style={anchorStyle}>{bi(s.title, l)}</a>
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
          <p style={metaPStyle}><strong>{bi({ de: 'Mandantenebene', en: 'Tenant Level' }, l)}:</strong> {tenantLevelText(role.tenantLevel, l)}</p>
          <p style={metaPStyle}><strong>{bi({ de: 'Module', en: 'Modules' }, l)}:</strong> {role.modules.join(', ')}</p>
          <p style={metaPStyle}><strong>{bi({ de: 'KI-Interaktion', en: 'AI Interaction' }, l)}:</strong> {aiInteractionText(role.aiInteraction, l)}</p>
          <p style={metaPStyle}><strong>{bi({ de: 'Slug', en: 'Slug' }, l)}:</strong> {canonicalSlug}</p>
        </Card>

        {sections.map((section) => (
          <Card key={section.id} title={bi(section.title, l)}>
            <div id={section.id}>
              <p style={bodyPStyle}>{bi(section.body, l)}</p>
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
