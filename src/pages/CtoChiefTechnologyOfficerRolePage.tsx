import { type CSSProperties, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
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

type Lang = 'de' | 'en'
type BiText = { de: string; en: string }

function bi(value: BiText, lang: Lang) {
  return lang === 'de' ? value.de : value.en
}

const anchors: { id: string; label: BiText }[] = [
  { id: 'executive-role', label: { de: '1. Executive-Rollendefinition', en: '1. Executive Role Definition' } },
  { id: 'organization', label: { de: '2. Organisatorische Position', en: '2. Organizational Position' } },
  { id: 'gcp-architecture', label: { de: '3. GCP-Architekturdiagramm', en: '3. GCP Architecture Diagram' } },
  { id: 'infra-matrix', label: { de: '4. Infrastruktur-Entscheidungsmatrix', en: '4. Infrastructure Decision Matrix' } },
  { id: 'kpi-dashboard', label: { de: '5. KPI-Dashboard', en: '5. KPI Dashboard' } },
  { id: 'technology-scenarios', label: { de: '6. Strategische Technologieszenarien', en: '6. Strategic Technology Scenarios' } },
  { id: 'devops-model', label: { de: '7. DevOps- und Deployment-Modell', en: '7. DevOps & Deployment Model' } },
  { id: 'risk-profile', label: { de: '8. Risikoprofil', en: '8. Risk Profile' } },
  { id: 'ai-interaction', label: { de: '9. Interaktion mit AI', en: '9. Interaction With AI' } },
  { id: 'criticality', label: { de: '10. Warum diese Rolle kritisch ist', en: '10. Why This Role Is Structurally Critical' } }
]

const architectureFlow: BiText[] = [
  { de: 'Frontend (Next.js)', en: 'Frontend (Next.js)' },
  { de: 'API Gateway', en: 'API Gateway' },
  { de: 'Microservices (Broker, Claims, Fleet, AI)', en: 'Microservices (Broker, Claims, Fleet, AI)' },
  { de: 'Event Bus (Pub/Sub)', en: 'Event Bus (Pub/Sub)' },
  { de: 'Cloud SQL / Firestore', en: 'Cloud SQL / Firestore' },
  { de: 'BigQuery', en: 'BigQuery' },
  { de: 'AI Pipelines (Vertex AI)', en: 'AI Pipelines (Vertex AI)' },
  { de: 'Monitoring (Cloud Monitoring + Logging)', en: 'Monitoring (Cloud Monitoring + Logging)' }
]

const infraMatrix = [
  {
    id: 'multi-region',
    initiative: { de: 'Multi-Region-Rollout', en: 'Move to multi-region' },
    x: 92,
    y: 86,
    fill: '#0f172a'
  },
  {
    id: 'k8s-migration',
    initiative: { de: 'Kubernetes-Migration', en: 'Kubernetes migration' },
    x: 78,
    y: 82,
    fill: '#334155'
  },
  {
    id: 'event-claims',
    initiative: { de: 'Event-getriebene Claims-Orchestrierung', en: 'Event-driven claims orchestration' },
    x: 84,
    y: 66,
    fill: '#64748b'
  },
  {
    id: 'edge-inference',
    initiative: { de: 'AI-Inferenz am Edge', en: 'AI inference at edge' },
    x: 72,
    y: 74,
    fill: '#94a3b8'
  },
  {
    id: 'telematics-realtime',
    initiative: { de: 'Realtime-Telematik-Ingestion', en: 'Real-time telematics ingestion' },
    x: 95,
    y: 71,
    fill: '#1d4ed8'
  }
]

const uptimeTrend = [
  { month: 'Jan', uptime: 99.89 },
  { month: 'Feb', uptime: 99.92 },
  { month: 'Mär', uptime: 99.95 },
  { month: 'Apr', uptime: 99.9 },
  { month: 'Mai', uptime: 99.96 }
]

const incidentResponse = [
  { severity: { de: 'P1', en: 'P1' }, minutes: 18 },
  { severity: { de: 'P2', en: 'P2' }, minutes: 32 },
  { severity: { de: 'P3', en: 'P3' }, minutes: 54 },
  { severity: { de: 'P4', en: 'P4' }, minutes: 90 }
]

const deploymentFrequency = [
  { week: 'W1', deploys: 18 },
  { week: 'W2', deploys: 21 },
  { week: 'W3', deploys: 19 },
  { week: 'W4', deploys: 23 },
  { week: 'W5', deploys: 24 }
]

const costVsRevenue = [
  { month: 'Jan', infraCost: 1.8, revenue: 6.4 },
  { month: 'Feb', infraCost: 1.9, revenue: 6.8 },
  { month: 'Mär', infraCost: 2.0, revenue: 7.1 },
  { month: 'Apr', infraCost: 2.2, revenue: 7.3 },
  { month: 'Mai', infraCost: 2.3, revenue: 7.7 }
]

const latencyByRegion = [
  { region: 'EU-Central', latency: 58 },
  { region: 'EU-West', latency: 64 },
  { region: 'ME-GCC', latency: 88 },
  { region: 'APAC', latency: 112 }
]

const securityIncidents = [
  { quarter: 'Q1', incidents: 6 },
  { quarter: 'Q2', incidents: 5 },
  { quarter: 'Q3', incidents: 4 },
  { quarter: 'Q4', incidents: 3 }
]

const authorityRows: Array<{ domain: BiText; owner: BiText; scope: BiText }> = [
  {
    domain: { de: 'Architektur', en: 'Architecture' },
    owner: { de: 'CTO', en: 'CTO' },
    scope: {
      de: 'Systemdesign, Cloud-Landing-Zones, Reliability und Security-Baselines.',
      en: 'System design, cloud landing zones, reliability, and security baselines.'
    }
  },
  {
    domain: { de: 'Business-Roadmap', en: 'Business Roadmap' },
    owner: { de: 'CPO', en: 'CPO' },
    scope: {
      de: 'Portfoliopriorisierung, Marktstrategie und Produktzielbild.',
      en: 'Portfolio prioritization, market strategy, and product target model.'
    }
  },
  {
    domain: { de: 'Risikoselektion', en: 'Risk Acceptance' },
    owner: { de: 'CUO', en: 'CUO' },
    scope: {
      de: 'Underwriting-Appetite, Authority-Korridore, Referral-Entscheidungen.',
      en: 'Underwriting appetite, authority corridors, and referral decisions.'
    }
  },
  {
    domain: { de: 'Claims-Governance', en: 'Claims Governance' },
    owner: { de: 'Head of Claims', en: 'Head of Claims' },
    scope: {
      de: 'Schadenstrategie, Reservelogik, Eskalationen und Partnersteuerung.',
      en: 'Claims strategy, reserve logic, escalations, and partner steering.'
    }
  },
  {
    domain: { de: 'AI-Modellfreigabe', en: 'AI Model Approval' },
    owner: { de: 'AI Governance Officer', en: 'AI Governance Officer' },
    scope: {
      de: 'Model-Release, Drift-Freeze und Human-in-the-Loop-Governance.',
      en: 'Model release, drift freeze, and human-in-the-loop governance.'
    }
  }
]

const devopsFlow: BiText[] = [
  { de: 'Code Commit', en: 'Code Commit' },
  { de: 'CI Pipeline', en: 'CI Pipeline' },
  { de: 'Automatisierte Tests', en: 'Automated Testing' },
  { de: 'Containerization', en: 'Containerization' },
  { de: 'GKE Deployment', en: 'GKE Deployment' },
  { de: 'Monitoring', en: 'Monitoring' },
  { de: 'Alerting', en: 'Alerting' },
  { de: 'Rollback', en: 'Rollback' }
]

const criticalRisks: BiText[] = [
  { de: 'Cloud-Dependency-Risiko', en: 'Cloud dependency risk' },
  { de: 'Security-Breach-Risiko', en: 'Security breach risk' },
  { de: 'Multi-Tenant-Isolationsfehler', en: 'Multi-tenant isolation failure' },
  { de: 'Datenkorruption', en: 'Data corruption' },
  { de: 'AI-Pipeline-Ausfall', en: 'AI pipeline failure' }
]

const highRisks: BiText[] = [
  { de: 'Kostenüberlauf', en: 'Cost overrun' },
  { de: 'Latenzspitzen', en: 'Latency spikes' },
  { de: 'Skalierungsengpässe', en: 'Scaling bottlenecks' }
]

export default function CtoChiefTechnologyOfficerRolePage() {
  const navigate = useNavigate()
  const { lang } = useI18n()
  const l: Lang = lang === 'de' ? 'de' : 'en'

  function handlePrint() {
    const old = document.title
    document.title = bi(
      { de: 'CTO_Chief_Technology_Officer_Rollenprofil', en: 'CTO_Chief_Technology_Officer_Role_Profile' },
      l
    )
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
              title={bi(
                {
                  de: 'CTO (Chief Technology Officer) – Technisch-exekutives Rollenprofil',
                  en: 'CTO (Chief Technology Officer) – Technical Executive Role Profile'
                },
                l
              )}
              subtitle={bi(
                {
                  de: 'Inside Insurfox / Rollen / CTO – Chief Technology Officer',
                  en: 'Inside Insurfox / Roles / CTO – Chief Technology Officer'
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
            <span>CTO – Chief Technology Officer</span>
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
                  de: 'Der CTO ist die höchste technische Autorität der Insurfox-Plattform. Die Rolle verantwortet Systemarchitektur, GCP-Cloud-Architektur, Skalierbarkeit, Security-Architektur, DevOps- und CI/CD-Standards, Reliability (SRE), Datenarchitektur, Produktionsinfrastruktur für AI und technische Kostensteuerung.',
                  en: 'The CTO is the highest technical authority of the Insurfox platform. The role owns system architecture, GCP cloud architecture, scalability, security architecture, DevOps and CI/CD standards, reliability (SRE), data architecture, production AI infrastructure, and technical cost governance.'
                },
                l
              )}
            </p>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Kernauftrag: Der CTO definiert, wie Insurfox global gebaut, betrieben und zuverlässig skaliert wird.',
                  en: 'Core mandate: the CTO defines how Insurfox is built, operated, and scaled globally.'
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
                  de: 'Berichtslinie an CEO bzw. Board. Enge Zusammenarbeit mit CPO (Business Alignment), Head of Engineering, AI Governance Officer, Compliance Officer, DevOps Lead und Enterprise Architect.',
                  en: 'Reports to the CEO or board. Works closely with the CPO (business alignment), Head of Engineering, AI Governance Officer, Compliance Officer, DevOps Lead, and Enterprise Architect.'
                },
                l
              )}
            </p>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Abgrenzung der Entscheidungsbefugnis: Architektur beim CTO, Business-Roadmap beim CPO, Risikoakzeptanz beim CUO, Claims-Governance beim Head of Claims, AI-Modellfreigabe beim AI Governance Officer.',
                  en: 'Authority boundary: architecture with the CTO, business roadmap with the CPO, risk acceptance with the CUO, claims governance with Head of Claims, AI model approval with AI Governance Officer.'
                },
                l
              )}
            </p>
          </div>
        </Card>

        <Card title={bi({ de: '3. GCP-Architekturdiagramm', en: '3. GCP Architecture Diagram' }, l)}>
          <div id="gcp-architecture" style={{ display: 'grid', gap: '0.65rem' }}>
            <div style={flowWrapStyle}>
              {architectureFlow.map((step, idx) => (
                <div key={step.en} style={flowItemStyle}>
                  <div style={flowNumberStyle}>{idx + 1}</div>
                  <div style={flowLabelStyle}>{bi(step, l)}</div>
                  {idx < architectureFlow.length - 1 ? <div style={flowConnectorStyle} /> : null}
                </div>
              ))}
            </div>
            <div style={highlightGridStyle}>
              <Highlight title={bi({ de: 'VPC-Isolation', en: 'VPC Isolation' }, l)} text={bi({ de: 'Getrennte Netzsegmente pro Umgebung und Workload.', en: 'Isolated network segments per environment and workload.' }, l)} />
              <Highlight title={bi({ de: 'IAM-Rollenmodell', en: 'IAM Role-Based Access' }, l)} text={bi({ de: 'Least-Privilege-Zugriff auf Service- und Datenebene.', en: 'Least-privilege access at service and data level.' }, l)} />
              <Highlight title={bi({ de: 'Multi-Region-Skalierung', en: 'Multi-Region Scaling' }, l)} text={bi({ de: 'Regionale Lastverteilung für Performance und Resilienz.', en: 'Regional load distribution for performance and resilience.' }, l)} />
              <Highlight title={bi({ de: 'Disaster-Recovery-Zonen', en: 'Disaster Recovery Zones' }, l)} text={bi({ de: 'Failover-fähige Recovery-Pfade für kritische Services.', en: 'Failover-ready recovery paths for critical services.' }, l)} />
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '4. Infrastruktur-Entscheidungsmatrix', en: '4. Infrastructure Decision Matrix' }, l)}>
          <div id="infra-matrix" style={{ display: 'grid', gap: '0.65rem' }}>
            <div style={{ height: 330, border: '1px solid #e2e8f0', borderRadius: 12, padding: '0.45rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 14, left: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="x" domain={[0, 100]} name={bi({ de: 'Skalierungswirkung', en: 'Scalability Impact' }, l)} />
                  <YAxis type="number" dataKey="y" domain={[0, 100]} name={bi({ de: 'Betriebskomplexität', en: 'Operational Complexity' }, l)} />
                  <Tooltip
                    formatter={(value: number) => `${value}`}
                    labelFormatter={(_, payload) => {
                      if (!payload?.length) return ''
                      const row = payload[0]?.payload as (typeof infraMatrix)[number]
                      return bi(row.initiative, l)
                    }}
                  />
                  <ReferenceLine x={50} stroke="#94a3b8" strokeDasharray="4 4" />
                  <ReferenceLine y={50} stroke="#94a3b8" strokeDasharray="4 4" />
                  <Scatter data={infraMatrix}>
                    {infraMatrix.map((row) => (
                      <Cell key={row.id} fill={row.fill} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <p style={noteStyle}>
              {bi(
                {
                  de: 'Priorisierungslogik des CTO: Zuerst Initiativen mit hohem Skalierungsnutzen und kontrollierbarer Betriebskomplexität. Hochkomplexe Vorhaben werden nur mit klaren Reliability-, Security- und Cost-Gates in die Umsetzung gebracht.',
                  en: 'CTO prioritization logic: first, initiatives with high scalability value and manageable operational complexity. High-complexity items proceed only with explicit reliability, security, and cost gates.'
                },
                l
              )}
            </p>
          </div>
        </Card>

        <Card title={bi({ de: '5. KPI-Dashboard', en: '5. KPI Dashboard' }, l)}>
          <div id="kpi-dashboard" style={chartGridStyle}>
            <ChartCard title={bi({ de: 'Plattform-Uptime (%)', en: 'Platform Uptime (%)' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={uptimeTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[99.7, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="uptime" stroke="#0f172a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Incident-Response-Zeit (Min.)', en: 'Incident Response Time (min)' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incidentResponse.map((r) => ({ ...r, label: bi(r.severity, l) }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="minutes" fill="#334155" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Deployment-Frequenz', en: 'Deployment Frequency' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={deploymentFrequency}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="deploys" stroke="#475569" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Infrastrukturkosten vs. Erlös (EUR Mio.)', en: 'Infrastructure Cost vs Revenue (EUR m)' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={costVsRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="infraCost" stroke="#94a3b8" strokeWidth={2} name={bi({ de: 'Infra-Kosten', en: 'Infra Cost' }, l)} />
                  <Line type="monotone" dataKey="revenue" stroke="#0f172a" strokeWidth={2} name={bi({ de: 'Erlös', en: 'Revenue' }, l)} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Cloud-Latenz nach Region (ms)', en: 'Cloud Latency by Region (ms)' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={latencyByRegion}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="latency" fill="#64748b" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Security-Incidents je Quartal', en: 'Security Incidents per Quarter' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={securityIncidents}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="incidents" stroke="#1d4ed8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </Card>

        <Card title={bi({ de: '6. Strategische Technologieszenarien', en: '6. Strategic Technology Scenarios' }, l)}>
          <div id="technology-scenarios" style={{ display: 'grid', gap: '0.7rem' }}>
            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 1: Eintritt in GCC-Region', en: 'Scenario 1: Entering GCC region' }, l)}
              risk={bi({ de: 'Risiko unzureichender Datenresidenz und regionaler Latenz.', en: 'Risk of insufficient data residency and regional latency.' }, l)}
              capital={bi({ de: 'Mehrkosten für Multi-Region-Betrieb und zusätzliche Security-Kontrollen.', en: 'Higher cost for multi-region operations and additional security controls.' }, l)}
              compliance={bi({ de: 'Regulatorische Vorgaben zu Datenhaltung und Zugriffspfaden müssen erfüllt werden.', en: 'Regulatory constraints for data residency and access paths must be met.' }, l)}
              decision={bi({ de: 'Gestufte Multi-Region-Architektur mit lokalem Datenanker und globalem Control Plane.', en: 'Phased multi-region architecture with local data anchor and global control plane.' }, l)}
            />

            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 2: Schnelles Wachstum der Flotten-Telematik', en: 'Scenario 2: Rapid fleet telematics expansion' }, l)}
              risk={bi({ de: 'Backpressure und Verzögerungen im Event-Stream bei Lastspitzen.', en: 'Backpressure and delayed event processing during load peaks.' }, l)}
              capital={bi({ de: 'Skalierungsinvestitionen in Pub/Sub-Topics, Consumer-Gruppen und Storage-Tiering.', en: 'Scaling investment in Pub/Sub topics, consumer groups, and storage tiering.' }, l)}
              compliance={bi({ de: 'Sicherstellung von Datenminimierung und klaren Aufbewahrungsfristen.', en: 'Ensuring data minimization and clear retention windows.' }, l)}
              decision={bi({ de: 'Pub/Sub-Redesign mit Partitionierung, Retry-Strategie und dedizierten Telematik-Pipelines.', en: 'Pub/Sub redesign with partitioning, retry strategy, and dedicated telematics pipelines.' }, l)}
            />

            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 3: Major-Outage', en: 'Scenario 3: Major outage scenario' }, l)}
              risk={bi({ de: 'Unterbrechung kritischer Claims- und Underwriting-Prozesse.', en: 'Interruption of critical claims and underwriting processes.' }, l)}
              capital={bi({ de: 'Direkte Kosten durch SLA-Verletzung und potenzielle Umsatzverluste.', en: 'Direct cost from SLA breach and potential revenue loss.' }, l)}
              compliance={bi({ de: 'Meldepflichten, Incident-Dokumentation und Auditfähigkeit müssen sofort greifen.', en: 'Notification duties, incident documentation, and auditability must activate immediately.' }, l)}
              decision={bi({ de: 'Failover-Protokoll mit DR-Aktivierung, priorisiertem Recovery-Runbook und Stakeholder-Bridge.', en: 'Failover protocol with DR activation, prioritized recovery runbook, and stakeholder bridge.' }, l)}
            />

            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 4: AI-Inferenz-Überlast', en: 'Scenario 4: AI inference overload' }, l)}
              risk={bi({ de: 'Latenzsteigerung und Queue-Stau in produktiven Entscheidungsprozessen.', en: 'Rising latency and queue congestion in production decision flows.' }, l)}
              capital={bi({ de: 'Trade-off zwischen horizontaler Skalierung und Kostenoptimierung.', en: 'Trade-off between horizontal scaling and cost optimization.' }, l)}
              compliance={bi({ de: 'Keine Beeinträchtigung auditierbarer Entscheidungsprotokolle zulässig.', en: 'No compromise on auditable decision logs is acceptable.' }, l)}
              decision={bi({ de: 'Autoscaling plus Workload-Tiering mit klaren Prioritätsklassen für kritische Inferenzpfade.', en: 'Autoscaling plus workload tiering with strict priority classes for critical inference paths.' }, l)}
            />
          </div>
        </Card>

        <Card title={bi({ de: '7. DevOps- und Deployment-Modell', en: '7. DevOps & Deployment Model' }, l)}>
          <div id="devops-model" style={{ display: 'grid', gap: '0.65rem' }}>
            <div style={flowWrapStyle}>
              {devopsFlow.map((step, idx) => (
                <div key={step.en} style={flowItemStyle}>
                  <div style={flowNumberStyle}>{idx + 1}</div>
                  <div style={flowLabelStyle}>{bi(step, l)}</div>
                  {idx < devopsFlow.length - 1 ? <div style={flowConnectorStyle} /> : null}
                </div>
              ))}
            </div>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Blue/Green-Deployments und Canary-Releases reduzieren Risiko bei produktiven Änderungen. Zero-Downtime-Updates werden über progressive Rollouts und health-basierte Automatik-Rollbacks erzwungen.',
                  en: 'Blue/green deployments and canary releases reduce production change risk. Zero-downtime updates are enforced through progressive rollouts and health-based automatic rollbacks.'
                },
                l
              )}
            </p>
          </div>
        </Card>

        <Card title={bi({ de: '8. Risikoprofil', en: '8. Risk Profile' }, l)}>
          <div id="risk-profile" style={{ display: 'grid', gap: '0.65rem' }}>
            <div style={riskCardStyle}>
              <h3 style={riskHeadingStyle}>{bi({ de: 'Kritische Risiken', en: 'Critical Risks' }, l)}</h3>
              <ul style={listStyle}>
                {criticalRisks.map((item) => (
                  <li key={item.en}>{bi(item, l)}</li>
                ))}
              </ul>
            </div>
            <div style={riskCardStyle}>
              <h3 style={riskHeadingStyle}>{bi({ de: 'Hohe Risiken', en: 'High Risks' }, l)}</h3>
              <ul style={listStyle}>
                {highRisks.map((item) => (
                  <li key={item.en}>{bi(item, l)}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '9. Interaktion mit AI', en: '9. Interaction With AI' }, l)}>
          <div id="ai-interaction" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Der CTO genehmigt nicht die fachliche Modelllogik. Die Rolle verantwortet jedoch AI-Produktionsinfrastruktur, Hosting-Umgebung, Inferenz-Performance-Standards, Security-Isolation sowie Monitoring und Logging für alle produktiven AI-Pfade.',
                  en: 'The CTO does not approve model logic. The role is accountable for production AI infrastructure, hosting environment, inference performance standards, security isolation, and monitoring/logging for all production AI paths.'
                },
                l
              )}
            </p>
            <p style={noteStyle}>{bi({ de: 'AI Interaction Level: technische Governance.', en: 'AI Interaction Level: technical governance.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '10. Warum diese Rolle strukturell kritisch ist', en: '10. Why This Role Is Structurally Critical' }, l)}>
          <div id="criticality" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Ohne CTO verliert Insurfox technische Stabilität, Skalierungssicherheit und Security-Kontrolle. Infrastrukturkosten entgleiten, AI-Pipelines werden fragil und internationale Expansion wird operativ nicht tragfähig.',
                  en: 'Without a CTO, Insurfox loses technical stability, scaling confidence, and security control. Infrastructure cost drifts, AI pipelines become fragile, and international expansion turns operationally unsustainable.'
                },
                l
              )}
            </p>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Der CTO bildet damit das strukturelle Rückgrat der Plattform: technisch belastbar, regulatorisch anschlussfähig und wirtschaftlich steuerbar.',
                  en: 'The CTO is the structural backbone of the platform: technically resilient, regulatorily aligned, and economically controllable.'
                },
                l
              )}
            </p>
          </div>
        </Card>

        <Card title={bi({ de: 'Decision-Ownership-Matrix', en: 'Decision Ownership Matrix' }, l)}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={thStyle}>{bi({ de: 'Entscheidungsfeld', en: 'Decision Domain' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Owner', en: 'Owner' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Abgrenzung', en: 'Boundary Definition' }, l)}</th>
                </tr>
              </thead>
              <tbody>
                {authorityRows.map((row) => (
                  <tr key={row.domain.en}>
                    <td style={tdStrongStyle}>{bi(row.domain, l)}</td>
                    <td style={tdStyle}>{bi(row.owner, l)}</td>
                    <td style={tdStyle}>{bi(row.scope, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

function Highlight({ title, text }: { title: string; text: string }) {
  return (
    <article style={highlightCardStyle}>
      <h3 style={highlightTitleStyle}>{title}</h3>
      <p style={highlightTextStyle}>{text}</p>
    </article>
  )
}

function Scenario({
  lang,
  title,
  risk,
  capital,
  compliance,
  decision
}: {
  lang: Lang
  title: string
  risk: string
  capital: string
  compliance: string
  decision: string
}) {
  return (
    <article style={scenarioStyle}>
      <h3 style={{ margin: 0, color: '#0f172a', fontSize: '0.95rem' }}>{title}</h3>
      <p style={scenarioTextStyle}><strong>{bi({ de: 'Technisches Risiko:', en: 'Technical Risk:' }, lang)}</strong> {risk}</p>
      <p style={scenarioTextStyle}><strong>{bi({ de: 'Kapitalimplikation:', en: 'Capital Implication:' }, lang)}</strong> {capital}</p>
      <p style={scenarioTextStyle}><strong>{bi({ de: 'Compliance-Implikation:', en: 'Compliance Implication:' }, lang)}</strong> {compliance}</p>
      <p style={scenarioTextStyle}><strong>{bi({ de: 'Architekturentscheidung:', en: 'Final Architecture Decision:' }, lang)}</strong> {decision}</p>
    </article>
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
  gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))',
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

const highlightGridStyle: CSSProperties = {
  display: 'grid',
  gap: '0.55rem',
  gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))'
}

const highlightCardStyle: CSSProperties = {
  border: '1px solid #e2e8f0',
  borderRadius: 10,
  padding: '0.6rem 0.65rem',
  background: '#fff'
}

const highlightTitleStyle: CSSProperties = {
  margin: 0,
  color: '#0f172a',
  fontSize: '0.86rem',
  fontWeight: 700
}

const highlightTextStyle: CSSProperties = {
  margin: '0.35rem 0 0 0',
  color: '#475569',
  fontSize: '0.83rem',
  lineHeight: 1.45
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
