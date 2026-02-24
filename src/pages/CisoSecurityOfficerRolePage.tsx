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
  { id: 'executive-role', label: { de: '1. Executive-Rollendefinition', en: '1. Executive Role Definition' } },
  { id: 'organization', label: { de: '2. Organisatorische Position', en: '2. Organizational Position' } },
  { id: 'security-architecture', label: { de: '3. Security-Architekturdiagramm', en: '3. Security Architecture Diagram' } },
  { id: 'incident-flow', label: { de: '4. Incident-Response-Flow', en: '4. Incident Response Flow' } },
  { id: 'kpi', label: { de: '5. Security-KPI-Dashboard', en: '5. Security KPI Dashboard' } },
  { id: 'scenarios', label: { de: '6. Security-Szenarien', en: '6. Realistic Security Scenarios' } },
  { id: 'governance', label: { de: '7. Security-Governance-Matrix', en: '7. Security Governance Matrix' } },
  { id: 'risk', label: { de: '8. Risikoprofil', en: '8. Risk Profile' } },
  { id: 'ai', label: { de: '9. Interaktion mit AI', en: '9. Interaction With AI' } },
  { id: 'criticality', label: { de: '10. Warum diese Rolle kritisch ist', en: '10. Why This Role Is Structurally Critical' } }
]

const architectureFlow: BiText[] = [
  { de: 'User Access', en: 'User Access' },
  { de: 'IAM Layer', en: 'IAM Layer' },
  { de: 'API Gateway', en: 'API Gateway' },
  { de: 'Microservices', en: 'Microservices' },
  { de: 'Event Bus', en: 'Event Bus' },
  { de: 'Database', en: 'Database' },
  { de: 'Analytics', en: 'Analytics' },
  { de: 'AI Pipelines', en: 'AI Pipelines' }
]

const securityControls: BiText[] = [
  { de: 'Role-based Access Control', en: 'Role-based access' },
  { de: 'Encryption at Rest', en: 'Encryption at rest' },
  { de: 'Encryption in Transit', en: 'Encryption in transit' },
  { de: 'Network Segmentation (VPC)', en: 'Network segmentation (VPC)' },
  { de: 'Firewall Rules', en: 'Firewall rules' },
  { de: 'WAF', en: 'WAF' },
  { de: 'DDoS Protection', en: 'DDoS protection' },
  { de: 'Audit Logs', en: 'Audit logs' },
  { de: 'SIEM Integration', en: 'SIEM integration' }
]

const incidentFlow: BiText[] = [
  { de: 'Detection', en: 'Detection' },
  { de: 'Alert', en: 'Alert' },
  { de: 'Containment', en: 'Containment' },
  { de: 'Investigation', en: 'Investigation' },
  { de: 'Mitigation', en: 'Mitigation' },
  { de: 'Reporting', en: 'Reporting' },
  { de: 'Post-mortem', en: 'Post-mortem' },
  { de: 'Control Adjustment', en: 'Control Adjustment' }
]

const incidentLevels: Array<{ level: BiText; meaning: BiText }> = [
  {
    level: { de: 'Level 1 Anomaly', en: 'Level 1 anomaly' },
    meaning: {
      de: 'Lokale Abweichung, durch SOC innerhalb Standard-SLA bearbeitbar.',
      en: 'Localized deviation, handled by SOC within standard SLA.'
    }
  },
  {
    level: { de: 'Level 2 Breach', en: 'Level 2 breach' },
    meaning: {
      de: 'Bestätigte Sicherheitsverletzung mit notwendiger CISO-Eskalation.',
      en: 'Confirmed security breach requiring CISO escalation.'
    }
  },
  {
    level: { de: 'Level 3 Major Incident', en: 'Level 3 major incident' },
    meaning: {
      de: 'Plattformkritisches Ereignis mit Executive- und Regulatorik-Meldelinie.',
      en: 'Platform-critical event with executive and regulatory reporting line.'
    }
  }
]

const incidentsPerQuarter = [
  { quarter: 'Q1', incidents: 7 },
  { quarter: 'Q2', incidents: 6 },
  { quarter: 'Q3', incidents: 5 },
  { quarter: 'Q4', incidents: 4 }
]

const mttdData = [
  { category: { de: 'Anomalie', en: 'Anomaly' }, minutes: 12 },
  { category: { de: 'Breach', en: 'Breach' }, minutes: 18 },
  { category: { de: 'Major', en: 'Major' }, minutes: 24 }
]

const mttrData = [
  { category: { de: 'Anomalie', en: 'Anomaly' }, minutes: 36 },
  { category: { de: 'Breach', en: 'Breach' }, minutes: 74 },
  { category: { de: 'Major', en: 'Major' }, minutes: 145 }
]

const iamViolations = [
  { month: 'Jan', value: 14 },
  { month: 'Feb', value: 11 },
  { month: 'Mär', value: 10 },
  { month: 'Apr', value: 9 },
  { month: 'Mai', value: 8 }
]

const failedLogins = [
  { month: 'Jan', value: 920 },
  { month: 'Feb', value: 860 },
  { month: 'Mär', value: 790 },
  { month: 'Apr', value: 770 },
  { month: 'Mai', value: 740 }
]

const patchSla = [
  { zone: { de: 'Kritisch (72h)', en: 'Critical (72h)' }, compliance: 94 },
  { zone: { de: 'Hoch (7d)', en: 'High (7d)' }, compliance: 91 },
  { zone: { de: 'Mittel (30d)', en: 'Medium (30d)' }, compliance: 88 }
]

const governanceRows: Array<{ area: BiText; owner: BiText; requirement: BiText }> = [
  {
    area: { de: 'Feature Launch Approval', en: 'Feature Launch Approval' },
    owner: { de: 'CISO', en: 'CISO' },
    requirement: {
      de: 'Freigabe der Security Controls und Threat-Mitigation.',
      en: 'Sign-off on security controls and threat mitigation.'
    }
  },
  {
    area: { de: 'Infrastructure Readiness', en: 'Infrastructure Readiness' },
    owner: { de: 'CTO', en: 'CTO' },
    requirement: {
      de: 'Freigabe der Infrastruktur- und Reliability-Fitness.',
      en: 'Sign-off on infrastructure and reliability fitness.'
    }
  },
  {
    area: { de: 'Structural Validation', en: 'Structural Validation' },
    owner: { de: 'Enterprise Architect', en: 'Enterprise Architect' },
    requirement: {
      de: 'Validierung von Integrationsgrenzen und Domänenkonsistenz.',
      en: 'Validation of integration boundaries and domain consistency.'
    }
  }
]

const criticalRisks: BiText[] = [
  { de: 'Datenpanne', en: 'Data breach' },
  { de: 'Multi-Tenant-Isolationsfehler', en: 'Multi-tenant isolation failure' },
  { de: 'Cloud-Fehlkonfiguration', en: 'Cloud misconfiguration' }
]

const highRisks: BiText[] = [
  { de: 'Credential-Kompromittierung', en: 'Credential compromise' },
  { de: 'API-Missbrauch', en: 'API abuse' },
  { de: 'AI-Model-Exposure', en: 'AI model exposure' }
]

const mediumRisks: BiText[] = [
  { de: 'Phishing-Versuche', en: 'Phishing attempts' },
  { de: 'Interne Policy-Verstöße', en: 'Internal policy violations' }
]

export default function CisoSecurityOfficerRolePage() {
  const navigate = useNavigate()
  const { lang } = useI18n()
  const l: Lang = lang === 'de' ? 'de' : 'en'

  function handlePrint() {
    const old = document.title
    document.title = bi({ de: 'CISO_Security_Officer_Rollenprofil', en: 'CISO_Security_Officer_Role_Profile' }, l)
    window.print()
    window.setTimeout(() => {
      document.title = old
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
              title={bi({ de: 'CISO / Security Officer – Security-Executive-Rollenprofil', en: 'CISO / Security Officer – Security Executive Role Profile' }, l)}
              subtitle={bi({ de: 'Inside Insurfox / Rollen / CISO / Security Officer', en: 'Inside Insurfox / Roles / CISO / Security Officer' }, l)}
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
            <span>CISO / Security Officer</span>
          </div>

          <div className="print-hide" style={{ marginTop: '0.8rem', display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {anchors.map((a) => (
              <a key={a.id} href={`#${a.id}`} style={anchorStyle}>{bi(a.label, l)}</a>
            ))}
          </div>
        </Card>

        <Card title={bi({ de: '1. Executive-Rollendefinition', en: '1. Executive Role Definition' }, l)}>
          <div id="executive-role" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Der CISO ist die höchste Autorität für Informationssicherheit, Cloud-Schutz und Cyber-Defense der Insurfox-Plattform. Die Rolle verantwortet Security-Strategie, GCP-Sicherheitsgovernance, IAM-Architektur, Multi-Tenant-Isolation, Verschlüsselungsstandards, Incident-Response-Governance, Threat Detection, Penetration-Testing-Programm, Security-Compliance (ISO 27001 / SOC2 Readiness) und Zero-Trust-Design.',
                  en: 'The CISO is the highest authority for information security, cloud protection, and cyber defense of the Insurfox platform. The role owns security strategy, GCP security governance, IAM architecture, multi-tenant isolation, encryption standards, incident response governance, threat detection, penetration-testing oversight, security compliance (ISO 27001 / SOC2 readiness), and zero-trust architecture.'
                },
                l
              )}
            </p>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Kernaussage: Der CISO definiert, wie Insurfox Daten und Infrastruktur wirksam schützt.',
                  en: 'Core statement: the CISO defines how Insurfox protects data and infrastructure.'
                },
                l
              )}
            </p>
          </div>
        </Card>

        <Card title={bi({ de: '2. Organisatorische Position', en: '2. Organizational Position' }, l)}>
          <div id="organization" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Berichtslinie direkt an CEO/Board mit unabhängiger Eskalationslinie. Enge Zusammenarbeit mit CTO, Enterprise Architect, Compliance Officer, DPO, DevOps Lead und AI Governance Officer.',
                  en: 'Reports to CEO/board with an independent escalation line. Works closely with CTO, Enterprise Architect, Compliance Officer, DPO, DevOps Lead, and AI Governance Officer.'
                },
                l
              )}
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={thStyle}>{bi({ de: 'Rolle', en: 'Role' }, l)}</th>
                    <th style={thStyle}>{bi({ de: 'Abgrenzung', en: 'Authority Boundary' }, l)}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={tdStrongStyle}>CISO</td><td style={tdStyle}>{bi({ de: 'Security-Standards und Enforcement.', en: 'Security standards and enforcement.' }, l)}</td></tr>
                  <tr><td style={tdStrongStyle}>CTO</td><td style={tdStyle}>{bi({ de: 'Infrastrukturaufbau.', en: 'Infrastructure build.' }, l)}</td></tr>
                  <tr><td style={tdStrongStyle}>Enterprise Architect</td><td style={tdStyle}>{bi({ de: 'Strukturelle Integration.', en: 'Structural integration.' }, l)}</td></tr>
                  <tr><td style={tdStrongStyle}>{bi({ de: 'Compliance', en: 'Compliance' }, l)}</td><td style={tdStyle}>{bi({ de: 'Regulatorische Konformität.', en: 'Regulatory compliance.' }, l)}</td></tr>
                  <tr><td style={tdStrongStyle}>DPO</td><td style={tdStyle}>{bi({ de: 'Datenschutzrecht.', en: 'Data protection law.' }, l)}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '3. Security-Architekturdiagramm', en: '3. Security Architecture Diagram' }, l)}>
          <div id="security-architecture" style={{ display: 'grid', gap: '0.65rem' }}>
            <div style={flowWrapStyle}>
              {architectureFlow.map((step, idx) => (
                <div key={step.en} style={flowItemStyle}>
                  <div style={flowNumberStyle}>{idx + 1}</div>
                  <div style={flowLabelStyle}>{bi(step, l)}</div>
                  {idx < architectureFlow.length - 1 ? <div style={flowConnectorStyle} /> : null}
                </div>
              ))}
            </div>
            <div style={controlsGridStyle}>
              {securityControls.map((control) => (
                <div key={control.en} style={controlPillStyle}>{bi(control, l)}</div>
              ))}
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '4. Incident-Response-Flow', en: '4. Incident Response Flow' }, l)}>
          <div id="incident-flow" style={{ display: 'grid', gap: '0.65rem' }}>
            <div style={flowWrapStyle}>
              {incidentFlow.map((step, idx) => (
                <div key={step.en} style={flowItemStyle}>
                  <div style={flowNumberStyle}>{idx + 1}</div>
                  <div style={flowLabelStyle}>{bi(step, l)}</div>
                  {idx < incidentFlow.length - 1 ? <div style={flowConnectorStyle} /> : null}
                </div>
              ))}
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={thStyle}>{bi({ de: 'Eskalationsstufe', en: 'Escalation Level' }, l)}</th>
                    <th style={thStyle}>{bi({ de: 'Bedeutung', en: 'Meaning' }, l)}</th>
                  </tr>
                </thead>
                <tbody>
                  {incidentLevels.map((row) => (
                    <tr key={row.level.en}>
                      <td style={tdStrongStyle}>{bi(row.level, l)}</td>
                      <td style={tdStyle}>{bi(row.meaning, l)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '5. Security-KPI-Dashboard', en: '5. Security KPI Dashboard' }, l)}>
          <div id="kpi" style={chartGridStyle}>
            <ChartCard title={bi({ de: 'Security Incidents je Quartal', en: 'Security Incidents per Quarter' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={incidentsPerQuarter}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="incidents" stroke="#0f172a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'MTTD (Min.)', en: 'Mean Time to Detect (min)' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mttdData.map((r) => ({ ...r, label: bi(r.category, l) }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="minutes" fill="#334155" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'MTTR (Min.)', en: 'Mean Time to Respond (min)' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mttrData.map((r) => ({ ...r, label: bi(r.category, l) }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="minutes" fill="#475569" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'IAM Violations', en: 'IAM Violations' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={iamViolations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#64748b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Fehlgeschlagene Logins', en: 'Failed Login Attempts' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={failedLogins}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#1d4ed8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Patch-SLA-Compliance (%)', en: 'Vulnerability Patch SLA Compliance (%)' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={patchSla.map((r) => ({ ...r, label: bi(r.zone, l) }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="compliance" fill="#94a3b8" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </Card>

        <Card title={bi({ de: '6. Realistische Security-Szenarien', en: '6. Realistic Security Scenarios' }, l)}>
          <div id="scenarios" style={{ display: 'grid', gap: '0.7rem' }}>
            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 1: Verdächtige Cross-Tenant-Abfrage', en: 'Scenario 1: Suspicious cross-tenant data query' }, l)}
              risk={bi({ de: 'Kritisch', en: 'Critical' }, l)}
              business={bi({ de: 'Gefahr direkter Vertrauens- und Reputationsschäden.', en: 'Direct trust and reputational damage risk.' }, l)}
              regulatory={bi({ de: 'Potenzielle Meldepflicht bei bestätigter Exfiltration.', en: 'Potential notification duty if exfiltration is confirmed.' }, l)}
              decision={bi({ de: 'Sofortige Containment-Maßnahmen, Audit-Log-Analyse und Access-Freeze.', en: 'Immediate containment, audit-log analysis, and access freeze.' }, l)}
            />

            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 2: Ransomware-Versuch über kompromittierte Credentials', en: 'Scenario 2: Ransomware attempt via compromised credentials' }, l)}
              risk={bi({ de: 'Kritisch', en: 'Critical' }, l)}
              business={bi({ de: 'Betriebsunterbrechung und mögliche SLA-Verletzungen.', en: 'Operational disruption and potential SLA breaches.' }, l)}
              regulatory={bi({ de: 'Erweiterte Incident-Dokumentation und behördliche Bewertung erforderlich.', en: 'Extended incident documentation and regulatory assessment required.' }, l)}
              decision={bi({ de: 'IAM-Lockdown, Credential-Rotation, forensischer Incident-Report.', en: 'IAM lockdown, credential rotation, and forensic incident report.' }, l)}
            />

            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 3: Versuch der AI-Model-Extraktion', en: 'Scenario 3: AI model extraction attempt' }, l)}
              risk={bi({ de: 'Hoch', en: 'High' }, l)}
              business={bi({ de: 'Gefahr von IP-Verlust und Qualitätsmanipulationen.', en: 'Risk of IP loss and quality manipulation.' }, l)}
              regulatory={bi({ de: 'Prüfung auf unerlaubte Datenabflüsse und Zugriffsverletzungen.', en: 'Assessment for unauthorized data outflow and access violations.' }, l)}
              decision={bi({ de: 'API-Throttling, Endpoint-Restriktion und zusätzliche AuthN-Härtung.', en: 'API throttling, endpoint restrictions, and stronger authN hardening.' }, l)}
            />

            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 4: Neuer Regionsstart (GCC)', en: 'Scenario 4: New region launch (GCC)' }, l)}
              risk={bi({ de: 'Hoch', en: 'High' }, l)}
              business={bi({ de: 'Skalierungschance bei gleichzeitigem Security-Komplexitätsanstieg.', en: 'Scaling opportunity with increased security complexity.' }, l)}
              regulatory={bi({ de: 'Data-Residency- und Key-Management-Vorgaben strikt umzusetzen.', en: 'Strict data residency and key-management requirements apply.' }, l)}
              decision={bi({ de: 'Regionale Datenhaltung, isolierte Key-Hierarchie und segmentierte Security-Zonen.', en: 'Regional data residency, isolated key hierarchy, and segmented security zones.' }, l)}
            />
          </div>
        </Card>

        <Card title={bi({ de: '7. Security-Governance-Matrix', en: '7. Security Governance Matrix' }, l)}>
          <div id="governance" style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={thStyle}>{bi({ de: 'Freigabebereich', en: 'Approval Area' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Owner', en: 'Owner' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Anforderung', en: 'Requirement' }, l)}</th>
                </tr>
              </thead>
              <tbody>
                {governanceRows.map((row) => (
                  <tr key={row.area.en}>
                    <td style={tdStrongStyle}>{bi(row.area, l)}</td>
                    <td style={tdStyle}>{bi(row.owner, l)}</td>
                    <td style={tdStyle}>{bi(row.requirement, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title={bi({ de: '8. Risikoprofil', en: '8. Risk Profile' }, l)}>
          <div id="risk" style={{ display: 'grid', gap: '0.65rem' }}>
            <RiskBlock title={bi({ de: 'Kritisch', en: 'Critical' }, l)} items={criticalRisks.map((r) => bi(r, l))} />
            <RiskBlock title={bi({ de: 'Hoch', en: 'High' }, l)} items={highRisks.map((r) => bi(r, l))} />
            <RiskBlock title={bi({ de: 'Mittel', en: 'Medium' }, l)} items={mediumRisks.map((r) => bi(r, l))} />
          </div>
        </Card>

        <Card title={bi({ de: '9. Interaktion mit AI', en: '9. Interaction With AI' }, l)}>
          <div id="ai" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Der CISO auditiert AI-Zugriffsrechte, Sicherheit der Trainingsdaten, Exposition von Inferenz-Endpunkten und Logging-/Explainability-Zugriffe. Die Rolle genehmigt keine Modelllogik.',
                  en: 'The CISO audits AI access rights, training data security, inference endpoint exposure, and logging/explainability access controls. The role does not approve model logic.'
                },
                l
              )}
            </p>
            <p style={noteStyle}>{bi({ de: 'AI Interaction Level: Security Oversight.', en: 'AI interaction level: security oversight.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '10. Warum diese Rolle strukturell kritisch ist', en: '10. Why This Role Is Structurally Critical' }, l)}>
          <div id="criticality" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Ohne CISO bricht das Vertrauen in Multi-Tenant-Sicherheit, regulatorische Exposition steigt stark an, internationale Skalierung wird blockiert, Investor Confidence sinkt und Plattformrisiken multiplizieren sich.',
                  en: 'Without a CISO, trust in multi-tenant security collapses, regulatory exposure escalates, international scaling is blocked, investor confidence weakens, and platform risk multiplies.'
                },
                l
              )}
            </p>
            <p style={pStyle}>{bi({ de: 'Der CISO ist der Guardian des Platform Trust.', en: 'The CISO is the guardian of platform trust.' }, l)}</p>
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

function Scenario({
  lang,
  title,
  risk,
  business,
  regulatory,
  decision
}: {
  lang: Lang
  title: string
  risk: string
  business: string
  regulatory: string
  decision: string
}) {
  return (
    <article style={scenarioStyle}>
      <h3 style={{ margin: 0, color: '#0f172a', fontSize: '0.95rem' }}>{title}</h3>
      <p style={scenarioTextStyle}><strong>{bi({ de: 'Risk Level:', en: 'Risk Level:' }, lang)}</strong> {risk}</p>
      <p style={scenarioTextStyle}><strong>{bi({ de: 'Business Impact:', en: 'Business Impact:' }, lang)}</strong> {business}</p>
      <p style={scenarioTextStyle}><strong>{bi({ de: 'Regulatory Impact:', en: 'Regulatory Impact:' }, lang)}</strong> {regulatory}</p>
      <p style={scenarioTextStyle}><strong>{bi({ de: 'Final Security Decision:', en: 'Final Security Decision:' }, lang)}</strong> {decision}</p>
    </article>
  )
}

function RiskBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={riskCardStyle}>
      <h3 style={riskHeadingStyle}>{title}</h3>
      <ul style={listStyle}>
        {items.map((item) => (
          <li key={`${title}-${item}`}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

const pStyle: CSSProperties = {
  margin: 0,
  color: '#334155',
  lineHeight: 1.62,
  fontSize: '0.95rem'
}

const noteStyle: CSSProperties = {
  margin: 0,
  color: '#475569',
  fontSize: '0.87rem',
  lineHeight: 1.55
}

const anchorStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: 999,
  border: '1px solid #cbd5e1',
  color: '#1e293b',
  textDecoration: 'none',
  fontSize: '0.78rem',
  padding: '0.3rem 0.65rem',
  background: '#f8fafc'
}

const flowWrapStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
  gap: '0.55rem'
}

const flowItemStyle: CSSProperties = {
  position: 'relative',
  border: '1px solid #dbe3ef',
  borderRadius: 10,
  padding: '0.5rem 0.55rem',
  background: '#f8fafc',
  display: 'grid',
  gap: '0.3rem'
}

const flowNumberStyle: CSSProperties = {
  width: 20,
  height: 20,
  borderRadius: 999,
  background: '#0f172a',
  color: '#fff',
  fontSize: '0.72rem',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700
}

const flowLabelStyle: CSSProperties = {
  color: '#0f172a',
  fontSize: '0.82rem',
  fontWeight: 600,
  lineHeight: 1.35
}

const flowConnectorStyle: CSSProperties = {
  position: 'absolute',
  right: -8,
  top: '50%',
  width: 14,
  height: 2,
  background: '#94a3b8'
}

const controlsGridStyle: CSSProperties = {
  display: 'grid',
  gap: '0.5rem',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))'
}

const controlPillStyle: CSSProperties = {
  border: '1px solid #dbe3ef',
  borderRadius: 999,
  padding: '0.35rem 0.6rem',
  fontSize: '0.78rem',
  color: '#334155',
  background: '#fff'
}

const chartGridStyle: CSSProperties = {
  display: 'grid',
  gap: '0.7rem',
  gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))'
}

const chartCardStyle: CSSProperties = {
  border: '1px solid #e2e8f0',
  borderRadius: 10,
  padding: '0.5rem 0.55rem',
  background: '#fff'
}

const chartTitleStyle: CSSProperties = {
  margin: 0,
  color: '#0f172a',
  fontSize: '0.81rem',
  lineHeight: 1.3,
  minHeight: 34
}

const chartWrapStyle: CSSProperties = {
  width: '100%',
  height: 185,
  marginTop: '0.3rem'
}

const scenarioStyle: CSSProperties = {
  border: '1px solid #e2e8f0',
  borderRadius: 10,
  padding: '0.7rem 0.8rem',
  background: '#fff',
  display: 'grid',
  gap: '0.4rem'
}

const scenarioTextStyle: CSSProperties = {
  margin: 0,
  color: '#334155',
  fontSize: '0.89rem',
  lineHeight: 1.5
}

const riskCardStyle: CSSProperties = {
  border: '1px solid #e2e8f0',
  borderRadius: 10,
  padding: '0.7rem 0.8rem',
  background: '#fff'
}

const riskHeadingStyle: CSSProperties = {
  margin: 0,
  color: '#0f172a',
  fontSize: '0.9rem'
}

const listStyle: CSSProperties = {
  margin: '0.45rem 0 0 1rem',
  color: '#334155',
  lineHeight: 1.45,
  fontSize: '0.88rem'
}

const tableStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.84rem'
}

const thStyle: CSSProperties = {
  textAlign: 'left',
  padding: '0.58rem 0.62rem',
  borderBottom: '1px solid #dbe3ef',
  color: '#0f172a',
  fontWeight: 700,
  whiteSpace: 'nowrap'
}

const tdStyle: CSSProperties = {
  padding: '0.55rem 0.62rem',
  borderBottom: '1px solid #e2e8f0',
  color: '#334155',
  verticalAlign: 'top',
  lineHeight: 1.45
}

const tdStrongStyle: CSSProperties = {
  ...tdStyle,
  color: '#0f172a',
  fontWeight: 600
}
