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
  { id: 'organization', label: { de: '2. Position in der Organisation', en: '2. Position in Organization' } },
  { id: 'target-architecture', label: { de: '3. Target-Architekturdiagramm', en: '3. Target Architecture Diagram' } },
  { id: 'dependency-matrix', label: { de: '4. Domain-Dependency-Matrix', en: '4. Domain Dependency Matrix' } },
  { id: 'adr', label: { de: '5. ADR-Beispiele', en: '5. ADR Examples' } },
  { id: 'kpi', label: { de: '6. Architektur-KPI-Dashboard', en: '6. Architecture KPI Dashboard' } },
  { id: 'governance', label: { de: '7. Governance-Modell', en: '7. Governance Model' } },
  { id: 'risk', label: { de: '8. Risikoprofil', en: '8. Risk Profile' } },
  { id: 'ai', label: { de: '9. Interaktion mit AI', en: '9. Interaction With AI' } },
  { id: 'criticality', label: { de: '10. Warum die Rolle kritisch ist', en: '10. Why This Role Is Structurally Critical' } }
]

const targetLayers: BiText[] = [
  { de: 'Experience Layer (Web / App)', en: 'Experience Layer (Web / App)' },
  { de: 'API Gateway', en: 'API Gateway' },
  { de: 'Domain Services: Broker / Claims / Fleet / AI / Partner', en: 'Domain Services: Broker / Claims / Fleet / AI / Partner' },
  { de: 'Event Bus', en: 'Event Bus' },
  { de: 'Data Layer', en: 'Data Layer' },
  { de: 'Analytics & AI', en: 'Analytics & AI' }
]

const dependencyRows = [
  {
    pair: { de: 'Broker ↔ Underwriting', en: 'Broker ↔ Underwriting' },
    contract: {
      de: 'Submission Contract + Referral Events; keine direkte Datenbankkopplung.',
      en: 'Submission contract + referral events; no direct database coupling.'
    },
    constraint: {
      de: 'Nur über API/Events, keine zirkulären Service-Aufrufe.',
      en: 'Only via API/events, no circular service calls.'
    }
  },
  {
    pair: { de: 'Claims ↔ Partner', en: 'Claims ↔ Partner' },
    contract: {
      de: 'Partner Assignment API + Status Events; klarer Task- und SLA-Scope.',
      en: 'Partner assignment API + status events; clear task and SLA scope.'
    },
    constraint: {
      de: 'Partner darf nur Task-Sicht, kein Claims-Core-Schreibzugriff.',
      en: 'Partner receives task scope only, no claims-core write access.'
    }
  },
  {
    pair: { de: 'Fleet ↔ AI', en: 'Fleet ↔ AI' },
    contract: {
      de: 'Telemetry Ingestion Events + Risk Score API.',
      en: 'Telemetry ingestion events + risk score API.'
    },
    constraint: {
      de: 'AI-Featurestore entkoppelt vom Fleet Core über Event Contracts.',
      en: 'AI feature store remains decoupled from fleet core via event contracts.'
    }
  },
  {
    pair: { de: 'AI ↔ Reporting', en: 'AI ↔ Reporting' },
    contract: {
      de: 'Model Output Facts in Analytics Layer; kein Rückschreiben in Domänencore.',
      en: 'Model output facts in analytics layer; no write-back into domain core.'
    },
    constraint: {
      de: 'Reporting konsumiert kuratierte Datensichten, keine Modellinterna.',
      en: 'Reporting consumes curated views, not model internals.'
    }
  },
  {
    pair: { de: 'Rückversicherung ↔ Reporting', en: 'Reinsurance ↔ Reporting' },
    contract: {
      de: 'Aggregation-/Treaty-Views als lesende Schnittstelle.',
      en: 'Aggregation/treaty views as read-only interface.'
    },
    constraint: {
      de: 'Keine bidirektionale Kopplung in operative Services.',
      en: 'No bidirectional coupling into operational services.'
    }
  }
]

const couplingTrend = [
  { month: 'Jan', score: 41 },
  { month: 'Feb', score: 39 },
  { month: 'Mär', score: 37 },
  { month: 'Apr', score: 36 },
  { month: 'Mai', score: 34 }
]

const apiErrorRate = [
  { month: 'Jan', rate: 1.6 },
  { month: 'Feb', rate: 1.4 },
  { month: 'Mär', rate: 1.3 },
  { month: 'Apr', rate: 1.2 },
  { month: 'Mai', rate: 1.1 }
]

const dependencyGrowth = [
  { quarter: 'Q1', links: 14 },
  { quarter: 'Q2', links: 16 },
  { quarter: 'Q3', links: 17 },
  { quarter: 'Q4', links: 17 }
]

const debtIndex = [
  { month: 'Jan', index: 58 },
  { month: 'Feb', index: 56 },
  { month: 'Mär', index: 53 },
  { month: 'Apr', index: 51 },
  { month: 'Mai', index: 48 }
]

const eventLatency = [
  { stream: 'Claims', ms: 180 },
  { stream: 'Fleet', ms: 140 },
  { stream: 'Broker', ms: 120 },
  { stream: 'AI', ms: 210 },
  { stream: 'Partner', ms: 160 }
]

const boardRows: Array<{ stage: BiText; focus: BiText }> = [
  {
    stage: { de: 'Feature Intake', en: 'Feature Intake' },
    focus: {
      de: 'Architekturvorprüfung vor Build-Freigabe.',
      en: 'Architecture pre-check before build approval.'
    }
  },
  {
    stage: { de: 'Integrationsprüfung', en: 'Integration Validation' },
    focus: {
      de: 'API Contracts, Event-Schemata und Fehlerpfade validieren.',
      en: 'Validate API contracts, event schemas, and failure paths.'
    }
  },
  {
    stage: { de: 'Data-Model Review', en: 'Data Model Extension Review' },
    focus: {
      de: 'Entitäten, Keys und Tenant-Isolation vor Go-live prüfen.',
      en: 'Validate entities, keys, and tenant isolation before go-live.'
    }
  },
  {
    stage: { de: 'AI-Integrationsreview', en: 'AI Pipeline Integration Review' },
    focus: {
      de: 'Schnittstellen, Event-Folgen und Entkopplung der AI-Services sicherstellen.',
      en: 'Ensure interface integrity, event consequences, and AI-service decoupling.'
    }
  },
  {
    stage: { de: 'Security Compliance', en: 'Security Architecture Compliance' },
    focus: {
      de: 'Least Privilege, Boundary Controls und Audit-Pfade bestätigen.',
      en: 'Confirm least privilege, boundary controls, and audit paths.'
    }
  }
]

const criticalRisks: BiText[] = [
  { de: 'Domänenkopplung', en: 'Domain coupling' },
  { de: 'Inkonsistentes Datenmodell', en: 'Data model inconsistency' },
  { de: 'Integrationsfragmentierung', en: 'Integration fragmentation' }
]

const highRisks: BiText[] = [
  { de: 'Architekturdrift', en: 'Architecture drift' },
  { de: 'Feature-getriebene Strukturerosion', en: 'Feature-driven structural erosion' }
]

const mediumRisks: BiText[] = [{ de: 'Over-Engineering', en: 'Over-engineering' }]

export default function EnterpriseArchitectRolePage() {
  const navigate = useNavigate()
  const { lang } = useI18n()
  const l: Lang = lang === 'de' ? 'de' : 'en'

  function handlePrint() {
    const old = document.title
    document.title = bi(
      { de: 'Enterprise_Architect_Rollenprofil', en: 'Enterprise_Architect_Role_Profile' },
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
                  de: 'Enterprise Architect – Strukturelles Rollenprofil',
                  en: 'Enterprise Architect – Structural Role Profile'
                },
                l
              )}
              subtitle={bi(
                {
                  de: 'Inside Insurfox / Rollen / Enterprise Architect',
                  en: 'Inside Insurfox / Roles / Enterprise Architect'
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
            <span>Enterprise Architect</span>
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
                  de: 'Der Enterprise Architect ist nicht CTO, nicht DevOps Lead und nicht Product Owner. Die Rolle ist der langfristige strukturelle Guardrail der Plattform und verantwortet Zielarchitektur, Domänengrenzen, Integrationsmuster, API-Standards und Event-Architektur-Konsistenz.',
                  en: 'The Enterprise Architect is not the CTO, not the DevOps Lead, and not a Product Owner. The role is the long-term structural guardrail of the platform and owns target architecture, domain boundaries, integration patterns, API standards, and event architecture consistency.'
                },
                l
              )}
            </p>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Zusätzlich definiert die Rolle Multi-Tenant-Designprinzipien, sichert strukturelle Kohärenz über Modulgrenzen hinweg und trifft Entscheidungen im Architecture Review Board.',
                  en: 'The role also defines multi-tenant design principles, secures structural coherence across module boundaries, and decides architecture review board outcomes.'
                },
                l
              )}
            </p>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Kernaussage: Der Enterprise Architect definiert, wie Module strukturell über Zeit zusammenpassen.',
                  en: 'Core statement: the Enterprise Architect defines how modules fit together structurally over time.'
                },
                l
              )}
            </p>
          </div>
        </Card>

        <Card title={bi({ de: '2. Position in der Organisation', en: '2. Position in Organization' }, l)}>
          <div id="organization" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Berichtslinie an den CTO. Enge Zusammenarbeit mit CPO (strategische Ausrichtung), Product Ownern, Head of Engineering, AI Governance Officer und Compliance Officer.',
                  en: 'Reports to the CTO. Works closely with the CPO (strategic alignment), Product Owners, Head of Engineering, AI Governance Officer, and Compliance Officer.'
                },
                l
              )}
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={thStyle}>{bi({ de: 'Rolle', en: 'Role' }, l)}</th>
                    <th style={thStyle}>{bi({ de: 'Primäre Verantwortung', en: 'Primary Responsibility' }, l)}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={tdStrongStyle}>CTO</td>
                    <td style={tdStyle}>{bi({ de: 'Technologiestack und Cloud-Infrastruktur.', en: 'Technology stack and cloud infrastructure.' }, l)}</td>
                  </tr>
                  <tr>
                    <td style={tdStrongStyle}>Enterprise Architect</td>
                    <td style={tdStyle}>{bi({ de: 'Systemstruktur und Integrationslogik.', en: 'System structure and integration logic.' }, l)}</td>
                  </tr>
                  <tr>
                    <td style={tdStrongStyle}>{bi({ de: 'Product Owner', en: 'Product Owner' }, l)}</td>
                    <td style={tdStyle}>{bi({ de: 'Feature-Scope.', en: 'Feature scope.' }, l)}</td>
                  </tr>
                  <tr>
                    <td style={tdStrongStyle}>DevOps</td>
                    <td style={tdStyle}>{bi({ de: 'Deployment-Ausführung und Betriebsautomatisierung.', en: 'Deployment execution and operational automation.' }, l)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '3. Target-Architekturdiagramm', en: '3. Target Architecture Diagram' }, l)}>
          <div id="target-architecture" style={{ display: 'grid', gap: '0.65rem' }}>
            <div style={flowWrapStyle}>
              {targetLayers.map((layer, idx) => (
                <div key={layer.en} style={flowItemStyle}>
                  <div style={flowNumberStyle}>{idx + 1}</div>
                  <div style={flowLabelStyle}>{bi(layer, l)}</div>
                  {idx < targetLayers.length - 1 ? <div style={flowConnectorStyle} /> : null}
                </div>
              ))}
            </div>
            <div style={highlightGridStyle}>
              <Highlight title={bi({ de: 'Domain Isolation', en: 'Domain Isolation' }, l)} text={bi({ de: 'Jede Domäne besitzt eigene Zustandsgrenzen.', en: 'Each domain owns its own state boundaries.' }, l)} />
              <Highlight title={bi({ de: 'Bounded Contexts', en: 'Bounded Contexts' }, l)} text={bi({ de: 'Klare semantische Grenzen zwischen Modulen.', en: 'Clear semantic boundaries between modules.' }, l)} />
              <Highlight title={bi({ de: 'API Contracts', en: 'API Contracts' }, l)} text={bi({ de: 'Versionierte Schnittstellen mit expliziter Rückwärtskompatibilität.', en: 'Versioned interfaces with explicit backward compatibility.' }, l)} />
              <Highlight title={bi({ de: 'Event-driven Decoupling', en: 'Event-driven Decoupling' }, l)} text={bi({ de: 'Asynchrone Entkopplung über stabile Event-Schemata.', en: 'Asynchronous decoupling via stable event schemas.' }, l)} />
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '4. Domain-Dependency-Matrix', en: '4. Domain Dependency Matrix' }, l)}>
          <div id="dependency-matrix" style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={thStyle}>{bi({ de: 'Domain-Paar', en: 'Domain Pair' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Integrationsvertrag', en: 'Integration Contract' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Architekturgrenze', en: 'Architectural Constraint' }, l)}</th>
                </tr>
              </thead>
              <tbody>
                {dependencyRows.map((row) => (
                  <tr key={row.pair.en}>
                    <td style={tdStrongStyle}>{bi(row.pair, l)}</td>
                    <td style={tdStyle}>{bi(row.contract, l)}</td>
                    <td style={tdStyle}>{bi(row.constraint, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ ...noteStyle, marginTop: '0.55rem' }}>
            {bi(
              {
                de: 'Zirkuläre Abhängigkeiten werden durch einseitige API-Verträge und Event-getriebene Kommunikation verhindert. Jede Domäne konsumiert nur freigegebene Schnittstellen, nie interne Datenstrukturen anderer Domänen.',
                en: 'Circular dependencies are prevented through one-way API contracts and event-driven communication. Each domain consumes only published interfaces, never internal data structures of other domains.'
              },
              l
            )}
          </p>
        </Card>

        <Card title={bi({ de: '5. Architectural Decision Record (ADR) – Beispiele', en: '5. Architectural Decision Record (ADR) Examples' }, l)}>
          <div id="adr" style={{ display: 'grid', gap: '0.7rem' }}>
            <AdrCase
              lang={l}
              title={bi({ de: 'ADR 01: Cargo Composite einführen', en: 'ADR 01: Introducing Cargo Composite product' }, l)}
              risk={bi({ de: 'Domänenausweitung kann Broker- und Fleet-Domäne überladen.', en: 'Domain expansion may overload broker and fleet domains.' }, l)}
              tradeoff={bi({ de: 'Domain-Extension ist schneller, neues Microservice ist sauberer.', en: 'Domain extension is faster, new microservice is structurally cleaner.' }, l)}
              impact={bi({ de: 'Falsche Zuordnung erhöht Kopplung und zukünftige Änderungskosten.', en: 'Wrong placement increases coupling and future change cost.' }, l)}
              decision={bi({ de: 'Neues Cargo-Composite-Service mit klaren API- und Event-Grenzen.', en: 'New cargo composite service with explicit API and event boundaries.' }, l)}
            />

            <AdrCase
              lang={l}
              title={bi({ de: 'ADR 02: Externe Carrier-API integrieren', en: 'ADR 02: Integrating external carrier API' }, l)}
              risk={bi({ de: 'Direkte Core-Änderung erzeugt Vendor-Lock in Kernlogik.', en: 'Direct core modification creates vendor lock in core logic.' }, l)}
              tradeoff={bi({ de: 'Adapter-Pattern erhöht initialen Aufwand, schützt aber den Core.', en: 'Adapter pattern increases initial effort but protects the core.' }, l)}
              impact={bi({ de: 'Langfristig austauschbare Integrationen und geringere Migrationskosten.', en: 'Long-term replaceable integrations and lower migration cost.' }, l)}
              decision={bi({ de: 'Adapter-Layer außerhalb des Domänencores, versionierte Contracts.', en: 'Adapter layer outside the domain core with versioned contracts.' }, l)}
            />

            <AdrCase
              lang={l}
              title={bi({ de: 'ADR 03: AI-Inferenz in Claims-Flow', en: 'ADR 03: AI inference inside claims flow' }, l)}
              risk={bi({ de: 'Synchronous Calls erhöhen Latenz und Ausfallkaskaden.', en: 'Synchronous calls increase latency and failure cascades.' }, l)}
              tradeoff={bi({ de: 'Sync ist einfacher, Async ist resilienter und skalierbarer.', en: 'Sync is simpler; async is more resilient and scalable.' }, l)}
              impact={bi({ de: 'Asynchrone Muster stabilisieren Event-Traffic bei Lastspitzen.', en: 'Asynchronous patterns stabilize event traffic under peak load.' }, l)}
              decision={bi({ de: 'Asynchrone Event-Inferenz mit Fallback für kritische Fälle.', en: 'Asynchronous event inference with fallback path for critical cases.' }, l)}
            />

            <AdrCase
              lang={l}
              title={bi({ de: 'ADR 04: Regionale Datensegregation GCC', en: 'ADR 04: Regional data segregation for GCC' }, l)}
              risk={bi({ de: 'Global Partitioning kann regulatorische Grenzen verletzen.', en: 'Global partitioning can violate regulatory boundaries.' }, l)}
              tradeoff={bi({ de: 'Partition ist günstiger, isoliertes Projekt erhöht Compliance-Sicherheit.', en: 'Partition is cheaper; isolated project increases compliance confidence.' }, l)}
              impact={bi({ de: 'Saubere Segregation verbessert Auditierbarkeit und Mandantenschutz.', en: 'Clean segregation improves auditability and tenant protection.' }, l)}
              decision={bi({ de: 'Isoliertes Regionalprojekt mit standardisiertem Interop-Layer.', en: 'Isolated regional project with standardized interoperability layer.' }, l)}
            />
          </div>
        </Card>

        <Card title={bi({ de: '6. Architektur-KPI-Dashboard', en: '6. Architecture KPI Dashboard' }, l)}>
          <div id="kpi" style={chartGridStyle}>
            <ChartCard title={bi({ de: 'Service Coupling Index', en: 'Service Coupling Index' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={couplingTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#0f172a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'API Error Rate (%)', en: 'API Error Rate (%)' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={apiErrorRate}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" stroke="#334155" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Cross-Domain Dependency Growth', en: 'Cross-Domain Dependency Growth' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dependencyGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="links" fill="#64748b" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Architectural Debt Index', en: 'Architectural Debt Index' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={debtIndex}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="index" stroke="#475569" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Event Processing Latency (ms)', en: 'Event Processing Latency (ms)' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={eventLatency}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stream" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="ms" fill="#94a3b8" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </Card>

        <Card title={bi({ de: '7. Governance-Modell', en: '7. Governance Model' }, l)}>
          <div id="governance" style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={thStyle}>{bi({ de: 'Review-Stufe', en: 'Review Stage' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Governance-Fokus', en: 'Governance Focus' }, l)}</th>
                </tr>
              </thead>
              <tbody>
                {boardRows.map((row) => (
                  <tr key={row.stage.en}>
                    <td style={tdStrongStyle}>{bi(row.stage, l)}</td>
                    <td style={tdStyle}>{bi(row.focus, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ ...noteStyle, marginTop: '0.55rem' }}>
            {bi(
              {
                de: 'Das Architecture Review Board stellt sicher, dass neue Features keine strukturellen Seiteneffekte auslösen und Integrationen innerhalb freigegebener Standards bleiben.',
                en: 'The architecture review board ensures that new features do not cause structural side effects and that integrations stay within approved standards.'
              },
              l
            )}
          </p>
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
                  de: 'Der Enterprise Architect genehmigt keine Modelllogik. Die Rolle stellt sicher, dass AI-Integration Domänengrenzen respektiert, AI-Events Entkopplung nicht verletzen, Datenflüsse zur Data Governance passen und AI-Microservices Plattformstandards einhalten.',
                  en: 'The Enterprise Architect does not approve model logic. The role ensures AI integration respects domain boundaries, AI events preserve decoupling, data flows align with data governance, and AI microservices follow platform standards.'
                },
                l
              )}
            </p>
            <p style={noteStyle}>{bi({ de: 'AI Interaction Level: strukturelle Aufsicht.', en: 'AI interaction level: structural oversight.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '10. Warum diese Rolle strukturell kritisch ist', en: '10. Why This Role Is Structurally Critical' }, l)}>
          <div id="criticality" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Ohne Enterprise Architect koppeln Module eng, internationale Skalierung wird instabil, Feature-Erweiterungen erodieren die Struktur und technische Schulden steigen überproportional.',
                  en: 'Without an Enterprise Architect, modules become tightly coupled, international scaling turns unstable, feature growth erodes structure, and technical debt accelerates.'
                },
                l
              )}
            </p>
            <p style={pStyle}>
              {bi(
                {
                  de: 'Zusätzlich wird Multi-Tenant-Isolation fragil und regulatorische Segregation deutlich komplexer. Der Enterprise Architect schützt damit die langfristige Skalierbarkeit der Plattform.',
                  en: 'In addition, multi-tenant isolation becomes fragile and regulatory segregation significantly more complex. The Enterprise Architect therefore protects long-term platform scalability.'
                },
                l
              )}
            </p>
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

function AdrCase({
  lang,
  title,
  risk,
  tradeoff,
  impact,
  decision
}: {
  lang: Lang
  title: string
  risk: string
  tradeoff: string
  impact: string
  decision: string
}) {
  return (
    <article style={scenarioStyle}>
      <h3 style={{ margin: 0, color: '#0f172a', fontSize: '0.95rem' }}>{title}</h3>
      <p style={scenarioTextStyle}><strong>{bi({ de: 'Architekturrisiko:', en: 'Architectural Risk:' }, lang)}</strong> {risk}</p>
      <p style={scenarioTextStyle}><strong>{bi({ de: 'Trade-off:', en: 'Technical Trade-off:' }, lang)}</strong> {tradeoff}</p>
      <p style={scenarioTextStyle}><strong>{bi({ de: 'Langfristige Wirkung:', en: 'Long-term Impact:' }, lang)}</strong> {impact}</p>
      <p style={scenarioTextStyle}><strong>{bi({ de: 'Entscheidungslogik:', en: 'Decision Rationale:' }, lang)}</strong> {decision}</p>
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
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
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
  fontSize: '0.81rem',
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
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'
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
