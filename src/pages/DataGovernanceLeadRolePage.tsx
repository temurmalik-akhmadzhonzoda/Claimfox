import { type CSSProperties, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Bar,
  BarChart,
  CartesianGrid,
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
  { id: 'data-architecture', label: { de: '3. Datenarchitekturdiagramm', en: '3. Data Architecture Diagram' } },
  { id: 'ownership-matrix', label: { de: '4. Data-Ownership-Matrix', en: '4. Data Ownership Matrix' } },
  { id: 'kpi', label: { de: '5. Data-Quality-KPI-Dashboard', en: '5. Data Quality KPI Dashboard' } },
  { id: 'scenarios', label: { de: '6. Data-Governance-Szenarien', en: '6. Data Governance Scenarios' } },
  { id: 'governance-model', label: { de: '7. Data-Governance-Modell', en: '7. Data Governance Model' } },
  { id: 'risk', label: { de: '8. Risikoprofil', en: '8. Risk Profile' } },
  { id: 'ai', label: { de: '9. Interaktion mit AI', en: '9. Interaction With AI' } },
  { id: 'criticality', label: { de: '10. Warum die Rolle kritisch ist', en: '10. Why This Role Is Structurally Critical' } }
]

const dataArchitectureFlow: BiText[] = [
  { de: 'Source Systems (Broker, Claims, Fleet, Partner)', en: 'Source Systems (Broker, Claims, Fleet, Partner)' },
  { de: 'Operational Data Layer', en: 'Operational Data Layer' },
  { de: 'Master Data Layer', en: 'Master Data Layer' },
  { de: 'Analytics Layer (BigQuery)', en: 'Analytics Layer (BigQuery)' },
  { de: 'AI Training Data', en: 'AI Training Data' },
  { de: 'Reporting Layer', en: 'Reporting Layer' }
]

const ownershipRows: Array<{ domain: BiText; owner: BiText; steward: BiText; consumer: BiText }> = [
  {
    domain: { de: 'Broker Domain', en: 'Broker Domain' },
    owner: { de: 'Broker PO', en: 'Broker PO' },
    steward: { de: 'Data Steward', en: 'Data Steward' },
    consumer: { de: 'AI / Reporting', en: 'AI / Reporting' }
  },
  {
    domain: { de: 'Claims Domain', en: 'Claims Domain' },
    owner: { de: 'Head of Claims', en: 'Head of Claims' },
    steward: { de: 'Claims Steward', en: 'Claims Steward' },
    consumer: { de: 'AI / Reinsurance', en: 'AI / Reinsurance' }
  },
  {
    domain: { de: 'Fleet Domain', en: 'Fleet Domain' },
    owner: { de: 'Fleet PO', en: 'Fleet PO' },
    steward: { de: 'Fleet Steward', en: 'Fleet Steward' },
    consumer: { de: 'Risk Analytics', en: 'Risk Analytics' }
  }
]

const completenessData = [
  { domain: 'Broker', value: 96 },
  { domain: 'Claims', value: 93 },
  { domain: 'Fleet', value: 91 },
  { domain: 'Partner', value: 94 }
]

const accuracyData = [
  { month: 'Jan', score: 94 },
  { month: 'Feb', score: 95 },
  { month: 'Mär', score: 95.4 },
  { month: 'Apr', score: 96.1 },
  { month: 'Mai', score: 96.4 }
]

const duplicateRateData = [
  { month: 'Jan', rate: 1.8 },
  { month: 'Feb', rate: 1.6 },
  { month: 'Mär', rate: 1.4 },
  { month: 'Apr', rate: 1.3 },
  { month: 'Mai', rate: 1.1 }
]

const definitionDriftData = [
  { quarter: 'Q1', incidents: 6 },
  { quarter: 'Q2', incidents: 5 },
  { quarter: 'Q3', incidents: 3 },
  { quarter: 'Q4', incidents: 2 }
]

const crossTenantErrorsData = [
  { month: 'Jan', errors: 12 },
  { month: 'Feb', errors: 10 },
  { month: 'Mär', errors: 8 },
  { month: 'Apr', errors: 6 },
  { month: 'Mai', errors: 5 }
]

const classificationCoverageData = [
  { class: { de: 'PII', en: 'PII' }, coverage: 98 },
  { class: { de: 'Regulatorisch', en: 'Regulatory' }, coverage: 95 },
  { class: { de: 'Operativ', en: 'Operational' }, coverage: 92 }
]

const governanceSteps: Array<{ step: BiText; detail: BiText }> = [
  {
    step: { de: 'Data Dictionary Ownership', en: 'Data Dictionary Ownership' },
    detail: {
      de: 'Zentrale Ownership für Felddefinitionen, Datentypen und verpflichtende Semantikregeln.',
      en: 'Central ownership for field definitions, data types, and mandatory semantic rules.'
    }
  },
  {
    step: { de: 'Schema Change Approval', en: 'Schema Change Approval Process' },
    detail: {
      de: 'Alle Schemaänderungen durchlaufen Governance-Gates inkl. Impact-Bewertung.',
      en: 'All schema changes pass governance gates including impact assessment.'
    }
  },
  {
    step: { de: 'Metadata Documentation', en: 'Metadata Documentation Requirement' },
    detail: {
      de: 'Neue Felder nur mit vollständig gepflegten Metadaten und Herkunftsnachweis.',
      en: 'New fields are accepted only with complete metadata and lineage trace.'
    }
  },
  {
    step: { de: 'Change Impact Analysis', en: 'Change Impact Analysis Workflow' },
    detail: {
      de: 'Cross-Domain-Effekte, Reporting-Folgen und AI-Feldnutzung werden vorab bewertet.',
      en: 'Cross-domain effects, reporting consequences, and AI field usage are assessed upfront.'
    }
  },
  {
    step: { de: 'Quarterly Data Quality Review', en: 'Quarterly Data Quality Review' },
    detail: {
      de: 'Quartalsweiser Review mit Drift-Analyse, Korrekturplan und Verantwortungsnachweis.',
      en: 'Quarterly review with drift analysis, remediation plan, and accountability record.'
    }
  }
]

const criticalRisks: BiText[] = [
  { de: 'Inkonsistente Felddefinitionen', en: 'Inconsistent field definitions' },
  { de: 'Cross-Tenant-Datenkontamination', en: 'Cross-tenant data contamination' },
  { de: 'Broken Lineage', en: 'Broken lineage' },
  { de: 'Ungetrackte Schemaänderungen', en: 'Untracked schema changes' }
]

const highRisks: BiText[] = [
  { de: 'AI mit korrumpierten Trainingsdaten', en: 'AI trained on corrupted data' },
  { de: 'Reporting-Inkonsistenzen', en: 'Reporting inconsistencies' },
  { de: 'Master-Data-Duplikate', en: 'Master data duplication' }
]

const mediumRisks: BiText[] = [
  { de: 'Fehlende optionale Felder', en: 'Missing optional fields' },
  { de: 'Domain-Extension-Drift', en: 'Domain extension drift' }
]

export default function DataGovernanceLeadRolePage() {
  const navigate = useNavigate()
  const { lang } = useI18n()
  const l: Lang = lang === 'de' ? 'de' : 'en'

  function handlePrint() {
    const old = document.title
    document.title = bi({ de: 'Data_Governance_Lead_Rollenprofil', en: 'Data_Governance_Lead_Role_Profile' }, l)
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
              title={bi({ de: 'Data Governance Lead – Executive-Rollenprofil', en: 'Data Governance Lead – Executive Role Profile' }, l)}
              subtitle={bi({ de: 'Inside Insurfox / Rollen / Data Governance Lead', en: 'Inside Insurfox / Roles / Data Governance Lead' }, l)}
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
            <span>Data Governance Lead</span>
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
                  de: 'Der Data Governance Lead ist weder AI-Rolle noch Security-Rolle noch Product-Rolle. Die Position verantwortet strukturelle Datenintegrität über alle Plattformdomänen hinweg: Datenstandards, Data Dictionary, Felddefinitionen, Ownership-Zuordnung, Cross-Domain-Konsistenz, Data Lineage, Master-Data-Governance, Tenant-Isolationslogik, regulatorische Datenklassifikation, Retention-Governance und Analytics-Validierung.',
                  en: 'The Data Governance Lead is not an AI role, not a security role, and not a product role. The position owns structural data integrity across all platform domains: data standards, data dictionary, field definitions, ownership assignment, cross-domain consistency, data lineage, master data governance, tenant isolation logic, regulatory data classification, retention governance, and analytics validation.'
                },
                l
              )}
            </p>
            <p style={pStyle}>{bi({ de: 'Kernaussage: Die Rolle definiert, was Daten innerhalb von Insurfox bedeuten.', en: 'Core statement: the role defines what data means inside Insurfox.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '2. Organisatorische Position', en: '2. Organizational Position' }, l)}>
          <div id="organization" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Berichtslinie an CTO (perspektivisch Chief Data Officer). Zusammenarbeit mit Enterprise Architect, AI Governance Officer, Compliance & Risk Officer, DPO, Product Ownern und Head of Engineering.', en: 'Reports to CTO (or future Chief Data Officer). Works with Enterprise Architect, AI Governance Officer, Compliance & Risk Officer, DPO, Product Owners, and Head of Engineering.' }, l)}</p>
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={thStyle}>{bi({ de: 'Funktion', en: 'Function' }, l)}</th>
                    <th style={thStyle}>{bi({ de: 'Verantwortungsgrenze', en: 'Authority Boundary' }, l)}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={tdStrongStyle}>{bi({ de: 'Data Governance', en: 'Data Governance' }, l)}</td><td style={tdStyle}>{bi({ de: 'Datendefinitionen und Standards.', en: 'Data definitions and standards.' }, l)}</td></tr>
                  <tr><td style={tdStrongStyle}>{bi({ de: 'AI Governance', en: 'AI Governance' }, l)}</td><td style={tdStyle}>{bi({ de: 'Model Oversight.', en: 'Model oversight.' }, l)}</td></tr>
                  <tr><td style={tdStrongStyle}>CISO</td><td style={tdStyle}>{bi({ de: 'Datenschutz und Security Controls.', en: 'Data protection and security controls.' }, l)}</td></tr>
                  <tr><td style={tdStrongStyle}>CTO</td><td style={tdStyle}>{bi({ de: 'Infrastruktur.', en: 'Infrastructure.' }, l)}</td></tr>
                  <tr><td style={tdStrongStyle}>{bi({ de: 'Product Owner', en: 'Product Owner' }, l)}</td><td style={tdStyle}>{bi({ de: 'Feature-Design.', en: 'Feature design.' }, l)}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '3. Datenarchitekturdiagramm', en: '3. Data Architecture Diagram' }, l)}>
          <div id="data-architecture" style={{ display: 'grid', gap: '0.65rem' }}>
            <div style={flowWrapStyle}>
              {dataArchitectureFlow.map((step, idx) => (
                <div key={step.en} style={flowItemStyle}>
                  <div style={flowNumberStyle}>{idx + 1}</div>
                  <div style={flowLabelStyle}>{bi(step, l)}</div>
                  {idx < dataArchitectureFlow.length - 1 ? <div style={flowConnectorStyle} /> : null}
                </div>
              ))}
            </div>
            <div style={highlightGridStyle}>
              <Highlight title={bi({ de: 'Data Lineage Tracking', en: 'Data lineage tracking' }, l)} text={bi({ de: 'Nachvollziehbare Herkunft je Feld von Source bis Reporting.', en: 'Traceable origin per field from source to reporting.' }, l)} />
              <Highlight title={bi({ de: 'Source-of-Truth-Prinzip', en: 'Source-of-truth principle' }, l)} text={bi({ de: 'Jede Datenklasse hat genau einen führenden Eigentümer.', en: 'Each data class has one authoritative owner.' }, l)} />
              <Highlight title={bi({ de: 'Domain Ownership', en: 'Domain ownership' }, l)} text={bi({ de: 'Klare Verantwortlichkeit je Domäne für Qualität und Semantik.', en: 'Clear domain accountability for quality and semantics.' }, l)} />
              <Highlight title={bi({ de: 'Field-Level Metadata', en: 'Field-level metadata' }, l)} text={bi({ de: 'Klassifikation, Retention, Sensitivität und Verwendungszweck je Feld.', en: 'Classification, retention, sensitivity, and purpose per field.' }, l)} />
            </div>
          </div>
        </Card>

        <Card title={bi({ de: '4. Data-Ownership-Matrix', en: '4. Data Ownership Matrix' }, l)}>
          <div id="ownership-matrix" style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={thStyle}>{bi({ de: 'Domain', en: 'Domain' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Data Owner', en: 'Data Owner' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Steward', en: 'Steward' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Consumer', en: 'Consumer' }, l)}</th>
                </tr>
              </thead>
              <tbody>
                {ownershipRows.map((row) => (
                  <tr key={row.domain.en}>
                    <td style={tdStrongStyle}>{bi(row.domain, l)}</td>
                    <td style={tdStyle}>{bi(row.owner, l)}</td>
                    <td style={tdStyle}>{bi(row.steward, l)}</td>
                    <td style={tdStyle}>{bi(row.consumer, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title={bi({ de: '5. Data-Quality-KPI-Dashboard', en: '5. Data Quality KPI Dashboard' }, l)}>
          <div id="kpi" style={chartGridStyle}>
            <ChartCard title={bi({ de: 'Data Completeness % je Domain', en: 'Data Completeness % by Domain' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={completenessData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="domain" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0f172a" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Data Accuracy Score', en: 'Data Accuracy Score' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={accuracyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[90, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#334155" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Duplicate Record Rate %', en: 'Duplicate Record Rate %' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={duplicateRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" stroke="#64748b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Field Definition Drift Incidents', en: 'Field Definition Drift Incidents' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={definitionDriftData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="incidents" fill="#475569" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Cross-Tenant Validation Errors', en: 'Cross-Tenant Data Validation Errors' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={crossTenantErrorsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="errors" stroke="#1d4ed8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title={bi({ de: 'Regulatory Classification Coverage %', en: 'Regulatory Data Classification Coverage %' }, l)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classificationCoverageData.map((r) => ({ ...r, label: bi(r.class, l) }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="coverage" fill="#94a3b8" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </Card>

        <Card title={bi({ de: '6. Realistische Data-Governance-Szenarien', en: '6. Realistic Data Governance Scenarios' }, l)}>
          <div id="scenarios" style={{ display: 'grid', gap: '0.7rem' }}>
            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 1: Neues Cargo-Produkt erweitert Feldkatalog', en: 'Scenario 1: New cargo product adds fields' }, l)}
              dataRisk={bi({ de: 'Inkompatible Feldsemantik zwischen Broker- und Claims-Domäne.', en: 'Incompatible field semantics between broker and claims domains.' }, l)}
              regulatoryImpact={bi({ de: 'Neue Felder benötigen Klassifikation und Retention-Mapping.', en: 'New fields require classification and retention mapping.' }, l)}
              crossDomainImpact={bi({ de: 'AI-Feature-Mapping und Reporting-Konsistenz müssen vor Go-live geprüft werden.', en: 'AI feature mapping and reporting consistency must be validated before go-live.' }, l)}
              decision={bi({ de: 'Data Dictionary Update + Cross-Domain-Mapping + AI-Feature-Validierung verpflichtend.', en: 'Data dictionary update + cross-domain mapping + AI feature validation are mandatory.' }, l)}
            />

            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 2: Claims erweitert Free-Text-Felder', en: 'Scenario 2: Claims module introduces free-text expansion' }, l)}
              dataRisk={bi({ de: 'Semantische Unschärfe und reduzierte Auswertbarkeit.', en: 'Semantic ambiguity and reduced analytical consistency.' }, l)}
              regulatoryImpact={bi({ de: 'Unstrukturierte Eingaben erhöhen Risiko sensitiver Daten ohne Klassifikation.', en: 'Unstructured input increases risk of sensitive unclassified data.' }, l)}
              crossDomainImpact={bi({ de: 'Lineage und Parsing-Regeln in Analytics und AI müssen angepasst werden.', en: 'Lineage and parsing rules must be adjusted in analytics and AI.' }, l)}
              decision={bi({ de: 'Structured-Extraction-Policy + Lineage-Anpassung vor Freigabe.', en: 'Structured extraction policy + lineage update before release.' }, l)}
            />

            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 3: GCC-Datenresidenzregeln', en: 'Scenario 3: GCC region introduces data residency rules' }, l)}
              dataRisk={bi({ de: 'Fehlende Partitionierung kann Datenflüsse über Regionsgrenzen mischen.', en: 'Missing partitioning can mix data flows across region boundaries.' }, l)}
              regulatoryImpact={bi({ de: 'Regionale Klassifikations- und Aufbewahrungspflichten werden verschärft.', en: 'Regional classification and retention obligations are stricter.' }, l)}
              crossDomainImpact={bi({ de: 'Alle Domänen müssen Feldklassifikation und Partition-Key-Logik synchronisieren.', en: 'All domains must synchronize field classification and partition-key logic.' }, l)}
              decision={bi({ de: 'Field-Classification-Update + Partition-Validation als Hard Gate.', en: 'Field classification update + partition validation as hard gate.' }, l)}
            />

            <Scenario
              lang={l}
              title={bi({ de: 'Szenario 4: AI-Team fordert zusätzliche Driver-Daten', en: 'Scenario 4: AI team requests additional driver data' }, l)}
              dataRisk={bi({ de: 'Unnötige Datenerweiterung erhöht Drift- und Qualitätsrisiko.', en: 'Unnecessary data expansion increases drift and quality risk.' }, l)}
              regulatoryImpact={bi({ de: 'Data-Minimization und Sensitivitätsklassifikation sind verpflichtend zu prüfen.', en: 'Data minimization and sensitivity classification are mandatory checks.' }, l)}
              crossDomainImpact={bi({ de: 'Zusatzfelder beeinflussen Fleet-, Claims- und Reporting-Schemata.', en: 'Additional fields affect fleet, claims, and reporting schemas.' }, l)}
              decision={bi({ de: 'Nur freigegebene Felder mit dokumentierter Lineage und Minimization-Nachweis.', en: 'Only approved fields with documented lineage and minimization evidence.' }, l)}
            />
          </div>
        </Card>

        <Card title={bi({ de: '7. Data-Governance-Modell', en: '7. Data Governance Model' }, l)}>
          <div id="governance-model" style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={thStyle}>{bi({ de: 'Governance-Baustein', en: 'Governance Building Block' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Umsetzung', en: 'Implementation' }, l)}</th>
                </tr>
              </thead>
              <tbody>
                {governanceSteps.map((row) => (
                  <tr key={row.step.en}>
                    <td style={tdStrongStyle}>{bi(row.step, l)}</td>
                    <td style={tdStyle}>{bi(row.detail, l)}</td>
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
            <p style={pStyle}>{bi({ de: 'Der Data Governance Lead stellt sicher, dass AI nur freigegebene Felder nutzt, Trainingsdaten-Lineage dokumentiert ist, bias-sensitive Attribute klassifiziert sind, Data-Minimization-Regeln gelten und Auditierbarkeit erhalten bleibt.', en: 'The Data Governance Lead ensures AI uses only approved fields, training-data lineage is documented, bias-sensitive attributes are classified, data-minimization rules are enforced, and auditability is preserved.' }, l)}</p>
            <p style={noteStyle}>{bi({ de: 'AI Interaction Level: Data Validation and Oversight.', en: 'AI interaction level: data validation and oversight.' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: '10. Warum diese Rolle strukturell kritisch ist', en: '10. Why This Role Is Structurally Critical' }, l)}>
          <div id="criticality" style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{bi({ de: 'Ohne Data Governance wird AI unzuverlässig, Reporting widersprüchlich und internationale Expansion erzeugt Datenchaos. Regulatorische Exposition steigt, Cross-Module-Integration verliert Verlässlichkeit.', en: 'Without data governance, AI becomes unreliable, reporting conflicts increase, and international expansion creates data chaos. Regulatory exposure rises and cross-module integration loses reliability.' }, l)}</p>
            <p style={pStyle}>{bi({ de: 'Der Data Governance Lead schützt damit die strukturelle Wahrheit der Plattform.', en: 'The Data Governance Lead protects the structural truth of the platform.' }, l)}</p>
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

function Scenario({
  lang,
  title,
  dataRisk,
  regulatoryImpact,
  crossDomainImpact,
  decision
}: {
  lang: Lang
  title: string
  dataRisk: string
  regulatoryImpact: string
  crossDomainImpact: string
  decision: string
}) {
  return (
    <article style={scenarioStyle}>
      <h3 style={{ margin: 0, color: '#0f172a', fontSize: '0.95rem' }}>{title}</h3>
      <p style={scenarioTextStyle}><strong>{bi({ de: 'Data Risk:', en: 'Data Risk:' }, lang)}</strong> {dataRisk}</p>
      <p style={scenarioTextStyle}><strong>{bi({ de: 'Regulatory Impact:', en: 'Regulatory Impact:' }, lang)}</strong> {regulatoryImpact}</p>
      <p style={scenarioTextStyle}><strong>{bi({ de: 'Cross-Domain Impact:', en: 'Cross-Domain Impact:' }, lang)}</strong> {crossDomainImpact}</p>
      <p style={scenarioTextStyle}><strong>{bi({ de: 'Final Governance Decision:', en: 'Final Governance Decision:' }, lang)}</strong> {decision}</p>
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
  gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
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
  fontSize: '0.8rem',
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
