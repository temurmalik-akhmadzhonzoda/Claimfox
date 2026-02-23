import { useMemo, useState, type CSSProperties } from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import { InsideInsurfoxSubnav, type InsideSectionKey } from '@/components/inside-insurfox/InsideInsurfoxSubnav'
import DataFieldExplorer from '@/components/inside-insurfox/DataFieldExplorer'

type BiText = { de: string; en: string }

type RoleDetail = {
  role: BiText
  objectives: BiText
  responsibilities: BiText
  dataScope: BiText
  decisions: BiText
  kpis: BiText
}

type LifecycleDetail = {
  key: string
  label: BiText
  whoActs: BiText
  dataCreated: BiText
  aiModules: BiText
  decisions: BiText
}

type ModuleDetail = {
  name: string
  primaryUser: BiText
  coreData: BiText
  aiContribution: BiText
  businessValue: BiText
}

type ReportingMetric = {
  title: BiText
  meaning: BiText
  action: BiText
}

const roleDetails: RoleDetail[] = [
  {
    role: { de: 'Platform Owner', en: 'Platform Owner' },
    objectives: { de: 'Skalierbare Plattformleistung und strategische Produktkohärenz sicherstellen.', en: 'Ensure scalable platform performance and strategic product coherence.' },
    responsibilities: { de: 'Roadmap-Steuerung, Priorisierung, Architekturentscheidungen, Abhängigkeitsmanagement.', en: 'Roadmap steering, prioritization, architecture decisions, and dependency management.' },
    dataScope: { de: 'Cross-Module KPI- und Qualitätsdaten, Betriebs- und Governance-Indikatoren.', en: 'Cross-module KPI and quality data, operational and governance indicators.' },
    decisions: { de: 'Release-Go/No-Go, Investitionsprioritäten, Standardisierungsrichtlinien.', en: 'Release go/no-go, investment priorities, and standardization policies.' },
    kpis: { de: 'Delivery-Zykluszeit, Verfügbarkeit, Defect-Rate, Plattformmarge.', en: 'Delivery cycle time, availability, defect rate, and platform margin.' }
  },
  {
    role: { de: 'Carrier', en: 'Carrier' },
    objectives: { de: 'Risikoadäquate Portfolios und stabile Combined Ratio.', en: 'Risk-adequate portfolios and stable combined ratio.' },
    responsibilities: { de: 'Kapazitätsfreigabe, Guidelines, Underwriting-Rahmen, Portfolioüberwachung.', en: 'Capacity approval, guidelines, underwriting framework, and portfolio oversight.' },
    dataScope: { de: 'Portfolio-Performance, Schadenentwicklung, Pricing-Korridore.', en: 'Portfolio performance, claims development, and pricing corridors.' },
    decisions: { de: 'Kapazitätsallokation, Zeichnungsgrenzen, Repricing-Impulse.', en: 'Capacity allocation, underwriting limits, and repricing impulses.' },
    kpis: { de: 'Loss Ratio, Combined Ratio, Capacity Utilization.', en: 'Loss ratio, combined ratio, and capacity utilization.' }
  },
  {
    role: { de: 'MGA', en: 'MGA' },
    objectives: { de: 'Profitables Wachstum durch kontrollierte Zeichnung und operative Exzellenz.', en: 'Profitable growth through controlled underwriting and operational excellence.' },
    responsibilities: { de: 'Submission-Triage, Pricing, Authority-Steuerung, Erneuerungslogik.', en: 'Submission triage, pricing, authority steering, and renewal logic.' },
    dataScope: { de: 'Risikoscores, erwartete Verluste, Referral-Historie, Renewal-Signale.', en: 'Risk scores, expected losses, referral history, and renewal signals.' },
    decisions: { de: 'Annahme/Ablehnung/Referral, Prämienband, Deckungsstruktur.', en: 'Accept/decline/referral, premium corridor, and coverage structure.' },
    kpis: { de: 'Hit Ratio, Margin je Segment, Referral-Quote.', en: 'Hit ratio, margin by segment, and referral ratio.' }
  },
  {
    role: { de: 'Broker', en: 'Broker' },
    objectives: { de: 'Kundenpassung, Platzierungsqualität und Bindungsrate steigern.', en: 'Increase client fit, placement quality, and retention.' },
    responsibilities: { de: 'Risikoaufbereitung, Marktansprache, Angebotskommunikation, Renewal-Vorbereitung.', en: 'Risk packaging, market outreach, offer communication, and renewal preparation.' },
    dataScope: { de: 'Kundenprofil, Angebotsstatus, Schadensmuster, Renewal-Empfehlungen.', en: 'Client profile, offer status, claims patterns, and renewal recommendations.' },
    decisions: { de: 'Platzierungsstrategie, Angebotsselektion, Verhandlungspfad.', en: 'Placement strategy, offer selection, and negotiation path.' },
    kpis: { de: 'Bindungsquote, Time-to-Quote, Renewal-Erfolg.', en: 'Bind rate, time-to-quote, and renewal success.' }
  },
  {
    role: { de: 'Corporate Client', en: 'Corporate Client' },
    objectives: { de: 'Planbare Kosten, Risikoabsicherung und Servicequalität über die Laufzeit.', en: 'Achieve predictable cost, risk protection, and service quality over policy term.' },
    responsibilities: { de: 'Datenbereitstellung, Präventionsmaßnahmen, FNOL-Qualität.', en: 'Data provision, prevention actions, and FNOL quality.' },
    dataScope: { de: 'Flottenstatus, Policeninformationen, Schaden- und Präventionsdaten.', en: 'Fleet status, policy data, claims, and prevention data.' },
    decisions: { de: 'Risikomaßnahmen, Flottenrichtlinien, Renewal-Freigabe.', en: 'Risk actions, fleet policies, and renewal approval.' },
    kpis: { de: 'Total Cost of Risk, Schadenhäufigkeit, Service-Zufriedenheit.', en: 'Total cost of risk, claim frequency, and service satisfaction.' }
  },
  {
    role: { de: 'Driver', en: 'Driver' },
    objectives: { de: 'Sicheres Fahrverhalten und geringere Incident-Rate.', en: 'Safer driving behavior and reduced incident rate.' },
    responsibilities: { de: 'Regelkonformes Fahren, Meldung von Ereignissen, Präventionsfeedback umsetzen.', en: 'Compliant driving, event reporting, and prevention feedback execution.' },
    dataScope: { de: 'Eigene Verhaltens- und Sicherheitsindikatoren.', en: 'Own behavior and safety indicators.' },
    decisions: { de: 'Verhaltensanpassung und Sicherheitstasks im Tagesbetrieb.', en: 'Behavior adjustments and safety-task execution in daily operations.' },
    kpis: { de: 'Risk-Score-Verlauf, Harsh-Braking-Rate, Incident-Frequenz.', en: 'Risk score trend, harsh braking rate, and incident frequency.' }
  },
  {
    role: { de: 'Claims Adjuster', en: 'Claims Adjuster' },
    objectives: { de: 'Schnelle, faire und fraud-resistente Schadenabwicklung.', en: 'Fast, fair, and fraud-resilient claims handling.' },
    responsibilities: { de: 'FNOL-Prüfung, Reservierung, Partnersteuerung, Eskalation.', en: 'FNOL review, reserving, partner steering, and escalation.' },
    dataScope: { de: 'Schadendokumentation, Telematik-Kontext, Fraud-/Severity-Scores.', en: 'Claims documentation, telematics context, and fraud/severity scores.' },
    decisions: { de: 'Deckungsprüfung, Reservehöhe, Settlement-Pfad.', en: 'Coverage assessment, reserve level, and settlement path.' },
    kpis: { de: 'Cycle Time, Leakage, Reopen-Rate.', en: 'Cycle time, leakage, and reopen rate.' }
  },
  {
    role: { de: 'Partner Network', en: 'Partner Network' },
    objectives: { de: 'Konsistente Serviceleistung in Reparatur-, Assistance- und Spezialfällen.', en: 'Consistent service delivery across repair, assistance, and specialty cases.' },
    responsibilities: { de: 'Leistungserbringung, SLA-Einhaltung, Qualitätstransparenz.', en: 'Service execution, SLA compliance, and quality transparency.' },
    dataScope: { de: 'Fallzuweisungen, Bearbeitungsstatus, Leistungsnachweise.', en: 'Case assignments, processing status, and service evidence.' },
    decisions: { de: 'Priorisierung, Kapazitätsplanung, Eskalationshandling.', en: 'Prioritization, capacity planning, and escalation handling.' },
    kpis: { de: 'SLA-Erfüllung, Kosten je Fall, Servicequalität.', en: 'SLA fulfillment, cost per case, and service quality.' }
  },
  {
    role: { de: 'AI Governance', en: 'AI Governance' },
    objectives: { de: 'Modellsicherheit, Transparenz und regulatorische Konformität sicherstellen.', en: 'Ensure model safety, transparency, and regulatory compliance.' },
    responsibilities: { de: 'Model Monitoring, Drift-Kontrolle, Explainability und Dokumentation.', en: 'Model monitoring, drift control, explainability, and documentation.' },
    dataScope: { de: 'Feature-Nutzung, Modelloutputs, Bias-Indikatoren, Audit-Trails.', en: 'Feature usage, model outputs, bias indicators, and audit trails.' },
    decisions: { de: 'Model Release/Freeze, Schwellenwerte, Governance-Eskalation.', en: 'Model release/freeze, thresholds, and governance escalation.' },
    kpis: { de: 'Stabilität, Fehlalarmquote, Governance-Compliance.', en: 'Stability, false-positive ratio, and governance compliance.' }
  }
]

const lifecycleDetails: LifecycleDetail[] = [
  {
    key: 'registration',
    label: { de: 'Registration', en: 'Registration' },
    whoActs: { de: 'Broker + Corporate Client', en: 'Broker + corporate client' },
    dataCreated: { de: 'Stammdaten, Unternehmensprofil, Exponierungsbasis.', en: 'Master data, company profile, and exposure baseline.' },
    aiModules: { de: 'Data quality checks, initial segmentation.', en: 'Data quality checks and initial segmentation.' },
    decisions: { de: 'Onboarding-Freigabe und Datenvollständigkeit.', en: 'Onboarding approval and data completeness.' }
  },
  {
    key: 'risk-analysis',
    label: { de: 'Risk Analysis', en: 'Risk Analysis' },
    whoActs: { de: 'MGA + AI Governance', en: 'MGA + AI governance' },
    dataCreated: { de: 'Risikoindikatoren, Basisscore, Segmentklassifizierung.', en: 'Risk indicators, baseline score, and segment classification.' },
    aiModules: { de: 'Risk scoring engine, anomaly checks.', en: 'Risk scoring engine and anomaly checks.' },
    decisions: { de: 'Priorisierung und Bearbeitungspfad.', en: 'Prioritization and processing path.' }
  },
  {
    key: 'underwriting',
    label: { de: 'Underwriting', en: 'Underwriting' },
    whoActs: { de: 'MGA + Carrier', en: 'MGA + carrier' },
    dataCreated: { de: 'Deckungs- und Pricing-Parameter, Referral-Hinweise.', en: 'Coverage and pricing parameters, referral flags.' },
    aiModules: { de: 'Pricing suggestion, expected loss model.', en: 'Pricing suggestion and expected loss model.' },
    decisions: { de: 'Annahme, Ablehnung oder Referral.', en: 'Accept, decline, or referral.' }
  },
  {
    key: 'policy-issuance',
    label: { de: 'Policy Issuance', en: 'Policy Issuance' },
    whoActs: { de: 'Broker + Operations', en: 'Broker + operations' },
    dataCreated: { de: 'Policenobjekt, Laufzeit, Limits, Dokumentation.', en: 'Policy object, term, limits, and documentation.' },
    aiModules: { de: 'Dokumentenvalidierung, Pflichtfeldprüfung.', en: 'Document validation and mandatory field checks.' },
    decisions: { de: 'Bindung und Vertragsfreigabe.', en: 'Binding and contract release.' }
  },
  {
    key: 'fleet-monitoring',
    label: { de: 'Fleet Monitoring', en: 'Fleet Monitoring' },
    whoActs: { de: 'Fleet Operator + AI Core', en: 'Fleet operator + AI core' },
    dataCreated: { de: 'Telematik-Events, Fahrer- und Flottenrisikoindex.', en: 'Telematics events, driver and fleet risk index.' },
    aiModules: { de: 'Driver risk scoring, intervention triggers.', en: 'Driver risk scoring and intervention triggers.' },
    decisions: { de: 'Präventionsmaßnahmen und Coaching-Prioritäten.', en: 'Prevention actions and coaching priorities.' }
  },
  {
    key: 'claims',
    label: { de: 'Claims', en: 'Claims' },
    whoActs: { de: 'Claims Adjuster + Partner', en: 'Claims adjuster + partner' },
    dataCreated: { de: 'FNOL, Schadenakte, Reserve- und Betrugsindikatoren.', en: 'FNOL, claim file, reserve and fraud indicators.' },
    aiModules: { de: 'Severity estimate, fraud scoring.', en: 'Severity estimate and fraud scoring.' },
    decisions: { de: 'Deckung, Bearbeitungspfad, Partnerzuteilung.', en: 'Coverage, processing path, and partner assignment.' }
  },
  {
    key: 'settlement',
    label: { de: 'Settlement', en: 'Settlement' },
    whoActs: { de: 'Claims + Finance', en: 'Claims + finance' },
    dataCreated: { de: 'Abrechnung, Abschlussstatus, Outcome-Qualität.', en: 'Settlement data, closure status, and outcome quality.' },
    aiModules: { de: 'Leakage checks, anomaly controls.', en: 'Leakage checks and anomaly controls.' },
    decisions: { de: 'Auszahlung, Abschluss, Reopen-Handling.', en: 'Payout, closure, and reopen handling.' }
  },
  {
    key: 'reporting',
    label: { de: 'Reporting', en: 'Reporting' },
    whoActs: { de: 'Management + Platform Owner', en: 'Management + platform owner' },
    dataCreated: { de: 'Portfolio-, Schaden- und Effizienzkennzahlen.', en: 'Portfolio, claims, and efficiency metrics.' },
    aiModules: { de: 'Forecasting, trend alerts.', en: 'Forecasting and trend alerts.' },
    decisions: { de: 'Portfolioanpassung, Kapazitäts- und Pricing-Steuerung.', en: 'Portfolio adjustment, capacity and pricing steering.' }
  },
  {
    key: 'renewal',
    label: { de: 'Renewal', en: 'Renewal' },
    whoActs: { de: 'Broker + MGA + Carrier', en: 'Broker + MGA + carrier' },
    dataCreated: { de: 'Renewal-Risikoscore, Preisanpassung, Retention-Prognose.', en: 'Renewal risk score, price adjustment, and retention forecast.' },
    aiModules: { de: 'Renewal intelligence, discount/surcharge recommendations.', en: 'Renewal intelligence and discount/surcharge recommendations.' },
    decisions: { de: 'Verlängerungskonditionen und Segmentstrategie.', en: 'Renewal terms and segment strategy.' }
  }
]

const moduleDetails: ModuleDetail[] = [
  {
    name: 'Brokerfox',
    primaryUser: { de: 'Broker / Distribution Teams', en: 'Broker / distribution teams' },
    coreData: { de: 'Kundenprofil, Submission-Daten, Angebots- und Renewal-Status.', en: 'Client profile, submission data, offer and renewal status.' },
    aiContribution: { de: 'Priorisierung, Angebotsvergleich, Renewal-Hinweise.', en: 'Prioritization, offer comparison, and renewal hints.' },
    businessValue: { de: 'Höhere Bindungsquote und kürzere Time-to-Quote.', en: 'Higher bind rate and shorter time-to-quote.' }
  },
  {
    name: 'Claimsfox',
    primaryUser: { de: 'Claims Operations', en: 'Claims operations' },
    coreData: { de: 'FNOL, Schadenakte, Reserveentwicklung, Partnerstatus.', en: 'FNOL, claim file, reserve development, partner status.' },
    aiContribution: { de: 'Fraud Score, Severity Estimate, Triage-Routing.', en: 'Fraud score, severity estimate, and triage routing.' },
    businessValue: { de: 'Schnellere Bearbeitung und geringere Leakage.', en: 'Faster handling and lower leakage.' }
  },
  {
    name: 'Fleetfox',
    primaryUser: { de: 'Fleet Manager / Risk Teams', en: 'Fleet manager / risk teams' },
    coreData: { de: 'Telematikdaten, Verhaltensmuster, Flottenrisikoindex.', en: 'Telematics data, behavior patterns, fleet risk index.' },
    aiContribution: { de: 'Risikoscoring und Präventionsauslöser.', en: 'Risk scoring and prevention triggers.' },
    businessValue: { de: 'Niedrigere Schadenfrequenz und bessere Retention.', en: 'Lower claim frequency and improved retention.' }
  },
  {
    name: 'Partnerfox',
    primaryUser: { de: 'Partner Management', en: 'Partner management' },
    coreData: { de: 'SLA-Daten, Kapazität, Leistungsmessung.', en: 'SLA data, capacity, and performance measurement.' },
    aiContribution: { de: 'Eskalationswarnungen und Qualitätsprognosen.', en: 'Escalation warnings and quality forecasts.' },
    businessValue: { de: 'Besseres Service-Level und skalierbare Ausführung.', en: 'Better service level and scalable execution.' }
  },
  {
    name: 'AI Fox',
    primaryUser: { de: 'Underwriting, Claims, Management', en: 'Underwriting, claims, management' },
    coreData: { de: 'Cross-Module Features, Modelloutputs, Audit-Trails.', en: 'Cross-module features, model outputs, and audit trails.' },
    aiContribution: { de: 'Scoring, Empfehlung, Forecasting und Explainability.', en: 'Scoring, recommendation, forecasting, and explainability.' },
    businessValue: { de: 'Konsistente AI-Steuerung über den gesamten Lifecycle.', en: 'Consistent AI steering across the full lifecycle.' }
  }
]

const reportingMetrics: ReportingMetric[] = [
  { title: { de: 'Loss Ratio', en: 'Loss Ratio' }, meaning: { de: 'Schadenquote als Kernindikator der technischen Profitabilität.', en: 'Core indicator of technical profitability.' }, action: { de: 'Pricing und Segmentgrenzen nachjustieren.', en: 'Adjust pricing and segment boundaries.' } },
  { title: { de: 'Combined Ratio', en: 'Combined Ratio' }, meaning: { de: 'Gesamteffizienz aus Schaden- und Kostenquote.', en: 'Overall efficiency combining loss and expense ratios.' }, action: { de: 'Kosten- und Prozesshebel priorisieren.', en: 'Prioritize cost and process levers.' } },
  { title: { de: 'Claim Frequency', en: 'Claim Frequency' }, meaning: { de: 'Häufigkeit als Frühindikator für Portfolioqualität.', en: 'Frequency as early indicator of portfolio quality.' }, action: { de: 'Präventionsprogramme und Underwriting-Kriterien anpassen.', en: 'Tune prevention programs and underwriting criteria.' } },
  { title: { de: 'Severity Trends', en: 'Severity Trends' }, meaning: { de: 'Schadenschwere und Inflationseffekte im Zeitverlauf.', en: 'Severity and inflation effects over time.' }, action: { de: 'Reserve- und Pricing-Annahmen aktualisieren.', en: 'Update reserve and pricing assumptions.' } },
  { title: { de: 'Driver Risk Ranking', en: 'Driver Risk Ranking' }, meaning: { de: 'Fahrer-Risikoranking für Coaching und Steering.', en: 'Driver risk ranking for coaching and steering.' }, action: { de: 'Gezielte Sicherheitsmaßnahmen ausrollen.', en: 'Roll out targeted safety actions.' } },
  { title: { de: 'Geo Heatmap', en: 'Geo Heatmap' }, meaning: { de: 'Regionale Risikoballungen und Schadenschwerpunkte.', en: 'Regional risk concentrations and claims hotspots.' }, action: { de: 'Geosteuerung in Pricing und Kapazität integrieren.', en: 'Integrate geo steering into pricing and capacity.' } },
  { title: { de: 'Capacity Utilization', en: 'Capacity Utilization' }, meaning: { de: 'Auslastung verfügbarer Kapazitäten je Segment.', en: 'Utilization of available capacity by segment.' }, action: { de: 'Kapazitätsallokation und Referral-Pfade anpassen.', en: 'Adjust capacity allocation and referral paths.' } },
  { title: { de: 'Renewal Forecast', en: 'Renewal Forecast' }, meaning: { de: 'Prognose der Verlängerungswahrscheinlichkeit und Margenwirkung.', en: 'Forecast of renewal likelihood and margin impact.' }, action: { de: 'Frühzeitige Angebots- und Kundenstrategie steuern.', en: 'Steer offer and client strategy early.' } }
]

function bi(value: BiText, lang: 'de' | 'en') {
  return lang === 'de' ? value.de : value.en
}

export default function InsideInsurfoxPage({ section }: { section: InsideSectionKey }) {
  const { lang, t } = useI18n()
  const l = lang === 'de' ? 'de' : 'en'
  const [selectedLifecycle, setSelectedLifecycle] = useState<string>('registration')

  const activeLifecycle = useMemo(() => {
    return lifecycleDetails.find((item) => item.key === selectedLifecycle) ?? lifecycleDetails[0]
  }, [selectedLifecycle])

  function handlePrint() {
    const oldTitle = document.title
    document.title = `Inside_Insurfox_${section}`
    window.print()
    window.setTimeout(() => {
      document.title = oldTitle
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
            <Header title={t(`insideInsurfox.pages.${section}.title`)} subtitle={t(`insideInsurfox.pages.${section}.subtitle`)} titleColor="#0f172a" subtitleColor="#475569" />
            <div className="print-hide" style={{ position: 'sticky', top: 84 }}>
              <Button size="sm" onClick={handlePrint}>{t('insideInsurfox.exportPdf')}</Button>
            </div>
          </div>
          <div style={{ marginTop: '0.8rem' }}>
            <InsideInsurfoxSubnav current={section} />
          </div>
        </Card>

        {section === 'home' && (
          <>
            <Card title={bi({ de: '1) Plattformidentität', en: '1) Platform Identity' }, l)}>
              <h3 style={subHeadingStyle}>{bi({ de: 'Insurfox – AI-Native Insurance Operating System', en: 'Insurfox – AI-Native Insurance Operating System' }, l)}</h3>
              <p style={pStyle}>
                {bi(
                  {
                    de: 'Insurfox ist als Insurance Infrastructure as a Service (IaaS) aufgebaut und vereint Broker-, MGA-, AI-, Fleet- und Claims-Kompetenz in einem durchgängigen Betriebsmodell.',
                    en: 'Insurfox is built as Insurance Infrastructure as a Service (IaaS), combining broker, MGA, AI, fleet, and claims capabilities in one integrated operating model.'
                  },
                  l
                )}
              </p>
              <p style={{ ...pStyle, marginTop: '0.55rem' }}>
                {bi(
                  {
                    de: 'Die Plattform umfasst Broker, MGA, AI Platform, Fleet Intelligence Engine, Claims Automation Engine und Partner Network Orchestrator. Multi-Tenant-Design und Rollenentkopplung stellen sicher, dass Mandanten sauber getrennt und gleichzeitig global skalierbar betrieben werden können.',
                    en: 'The platform includes broker, MGA, AI platform, fleet intelligence engine, claims automation engine, and partner network orchestrator. Multi-tenant design and role separation ensure clean tenant boundaries with global scalability.'
                  },
                  l
                )}
              </p>
            </Card>

            <Card title={bi({ de: '2) Globale Skalierungsstrategie', en: '2) Global Scaling Strategy' }, l)}>
              <p style={pStyle}>
                {bi(
                  {
                    de: 'Die Skalierungslogik startet mit einer DE-/EU-Compliance-Basis (Datenschutz, Governance, Auditierbarkeit) und erweitert sich auf Multi-Region-Betrieb für internationale Programme.',
                    en: 'The scaling model starts from a DE/EU compliance baseline (data protection, governance, auditability) and expands into multi-region operations for international programs.'
                  },
                  l
                )}
              </p>
              <p style={{ ...pStyle, marginTop: '0.55rem' }}>
                {bi(
                  {
                    de: 'Datenresidenz wird über regionale Datenhaltung und tenant-spezifische Kontrollpfade umgesetzt. Tenant Isolation erfolgt auf Daten-, Zugriff- und Workflow-Ebene, um regulatorische Flexibilität für MGA-Expansion in mehreren Jurisdiktionen zu ermöglichen.',
                    en: 'Data residency is implemented through regional storage and tenant-specific control paths. Tenant isolation is enforced at data, access, and workflow levels to support MGA expansion across jurisdictions.'
                  },
                  l
                )}
              </p>
              <div style={{ ...roleCardStyle, marginTop: '0.65rem' }}>
                <h3 style={subHeadingStyle}>{bi({ de: 'Warum Cloud Spanner statt nur Cloud SQL', en: 'Why Cloud Spanner instead of only Cloud SQL' }, l)}</h3>
                <p style={noteStyle}>{bi({ de: 'Horizontale Skalierung, globale Replikation, starke Konsistenz, Multi-Region-Verfügbarkeit und niedrige Latenz bei regionübergreifenden Writes sind für globale Insurance-IaaS-Workloads entscheidend.', en: 'Horizontal scaling, global replication, strong consistency, multi-region availability, and low-latency cross-region writes are critical for global insurance IaaS workloads.' }, l)}</p>
              </div>
            </Card>

            <Card title={bi({ de: '3) End-to-End Prozessfluss', en: '3) Full End-to-End Process Flow' }, l)}>
              <div style={{ overflowX: 'auto' }}>
                <table style={tableStyle}>
                  <thead>
                    <tr style={headRowStyle}>
                      <th style={thStyle}>#</th>
                      <th style={thStyle}>{bi({ de: 'Schritt', en: 'Step' }, l)}</th>
                      <th style={thStyle}>{bi({ de: 'Rollen', en: 'Roles involved' }, l)}</th>
                      <th style={thStyle}>{bi({ de: 'Erzeugte Daten', en: 'Data generated' }, l)}</th>
                      <th style={thStyle}>{bi({ de: 'Entscheidungen', en: 'Decisions made' }, l)}</th>
                      <th style={thStyle}>{bi({ de: 'Events', en: 'Events emitted' }, l)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['1', { de: 'Mandanten-Registrierung', en: 'Tenant Registration' }, { de: 'Platform Owner, Unternehmens-Admin', en: 'Platform owner, corporate admin' }, { de: 'Mandantenprofil, Zugriffsbasis', en: 'Tenant profile, access baseline' }, { de: 'Mandantenaktivierung', en: 'Tenant activation' }, 'tenant.registered'],
                      ['2', { de: 'Makler-Onboarding', en: 'Broker Onboarding' }, { de: 'Makler, Operations', en: 'Broker, operations' }, { de: 'Maklerkonto, Vollmachten-Mapping', en: 'Broker account, authority mapping' }, { de: 'Maklerfreigabe', en: 'Broker approval' }, 'broker.onboarded'],
                      ['3', { de: 'Risikoeinreichung', en: 'Risk Submission' }, { de: 'Makler, Unternehmenskunde', en: 'Broker, corporate client' }, { de: 'Submission-Payload, Exponierungsdaten', en: 'Submission payload, exposure data' }, { de: 'Vollständigkeitsprüfung', en: 'Submission completeness' }, 'submission.created'],
                      ['4', { de: 'AI-Risikoscoring', en: 'AI Risk Scoring' }, { de: 'MGA, AI Core', en: 'MGA, AI core' }, { de: 'Risikoscore, Feature-Snapshot', en: 'Risk score, feature snapshot' }, { de: 'Risikotier-Zuordnung', en: 'Risk tier assignment' }, 'submission.scored'],
                      ['5', { de: 'Underwriting-Entscheidung', en: 'Underwriting Decision' }, { de: 'MGA, Carrier', en: 'MGA, carrier' }, { de: 'Pricing-Korridor, Referral-Flags', en: 'Pricing corridor, referral flags' }, { de: 'Annehmen/Ablehnen/Referral', en: 'Accept/decline/referral' }, 'underwriting.decisioned'],
                      ['6', { de: 'Policierung', en: 'Policy Issuance' }, { de: 'Makler, Operations', en: 'Broker, operations' }, { de: 'Policenobjekt, Konditionen', en: 'Policy object, terms' }, { de: 'Binden + ausstellen', en: 'Bind + issue' }, 'policy.bound'],
                      ['7', { de: 'Flotten-Monitoring', en: 'Fleet Monitoring' }, { de: 'Flottenbetreiber, AI Core', en: 'Fleet operator, AI core' }, { de: 'Telematik-Stream, Verhaltens-KPIs', en: 'Telematics stream, behavior KPIs' }, { de: 'Interventions-Trigger', en: 'Intervention trigger' }, 'fleet.signal.ingested'],
                      ['8', { de: 'FNOL (Schadenaufnahme)', en: 'FNOL (Claims Intake)' }, { de: 'Kunde, Claims Ops', en: 'Client, claims ops' }, { de: 'FNOL-Datensatz, Ereigniskontext', en: 'FNOL record, incident context' }, { de: 'Schadeneröffnung', en: 'Claim opening' }, 'claim.created'],
                      ['9', { de: 'AI-Schadenscan', en: 'AI Damage Scan' }, { de: 'Claims AI, Sachbearbeitung', en: 'Claims AI, adjuster' }, { de: 'Bildextraktion, Schadensindikatoren', en: 'Image extraction, damage indicators' }, { de: 'Reparaturpfad-Empfehlung', en: 'Repair path recommendation' }, 'scan.completed'],
                      ['10', { de: 'Betrugs-Scoring', en: 'Fraud Scoring' }, { de: 'Claims AI, Governance', en: 'Claims AI, governance' }, { de: 'Betrugsscore, Anomalie-Evidenz', en: 'Fraud score, anomaly evidence' }, { de: 'Untersuchungs-Trigger', en: 'Investigation trigger' }, 'fraud.flagged'],
                      ['11', { de: 'Partnerzuweisung', en: 'Partner Assignment' }, { de: 'Claims Ops, Partnernetzwerk', en: 'Claims ops, partner network' }, { de: 'Partner-SLA-Zuweisung', en: 'Partner SLA assignment' }, { de: 'Dispatch-Entscheidung', en: 'Dispatch decision' }, 'partner.assigned'],
                      ['12', { de: 'Regulierung', en: 'Settlement' }, { de: 'Claims, Finance', en: 'Claims, finance' }, { de: 'Reserve-Update, Auszahlungsdatensatz', en: 'Reserve update, payout record' }, { de: 'Regulieren / schließen', en: 'Settle / close' }, 'claim.settled'],
                      ['13', { de: 'Portfolio-Reporting', en: 'Portfolio Reporting' }, { de: 'Management, Carrier', en: 'Management, carrier' }, { de: 'Loss-, Marge-, Risiko-Dashboards', en: 'Loss, margin, risk dashboards' }, { de: 'Portfolio-Steuerung', en: 'Portfolio steering' }, 'report.generated'],
                      ['14', { de: 'Erneuerung / Verlängerung', en: 'Renewal / Prolongation' }, { de: 'Makler, MGA, Carrier', en: 'Broker, MGA, carrier' }, { de: 'Renewal-Score, Repricing-Vorschlag', en: 'Renewal score, repricing suggestion' }, { de: 'Renewal-Konditionen', en: 'Renewal terms' }, 'renewal.generated']
                    ].map((row) => (
                      <tr key={row[0]}>
                        <td style={tdStrongStyle}>{row[0]}</td>
                        <td style={tdStrongStyle}>{bi(row[1] as BiText, l)}</td>
                        <td style={tdStyle}>{bi(row[2] as BiText, l)}</td>
                        <td style={tdStyle}>{bi(row[3] as BiText, l)}</td>
                        <td style={tdStyle}>{bi(row[4] as BiText, l)}</td>
                        <td style={tdStyle}><code>{row[5] as string}</code></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card title={bi({ de: '4) Detaillierte GCP-Architektur', en: '4) Detailed GCP Architecture' }, l)}>
              <MermaidBlock title={bi({ de: 'Diagramm 1 – Context', en: 'Diagram 1 – Context' }, l)} code={`flowchart LR
  Broker[Broker] --> Platform[Insurfox Platform]
  Carrier[Carrier] --> Platform
  Fleet[Fleet] --> Platform
  Driver[Driver] --> Platform
  Partner[Partner] --> Platform
  APIs[External APIs] --> Platform`} />
              <MermaidBlock title={bi({ de: 'Diagramm 2 – Container', en: 'Diagram 2 – Container' }, l)} code={`flowchart TB
  FE[Frontend React / CDN] --> GW[API Gateway]
  GW --> CR[Cloud Run Services]
  CR --> BUS[Event Bus Pub/Sub]
  CR --> SP[(Spanner Core DB)]
  CR --> ST[(Cloud Storage Docs & Images)]
  CR --> BQ[(BigQuery Analytics)]
  CR --> VAI[Vertex AI Models]
  CR --> SEC[Secret Manager]
  CR --> IAM[IAM]
  CR --> MON[Monitoring]`} />
              <MermaidBlock title={bi({ de: 'Diagramm 3 – Deployment', en: 'Diagram 3 – Deployment' }, l)} code={`flowchart TB
  ORG[GCP Organization]
  ORG --> PROD[Folder prod]
  ORG --> STAGE[Folder staging]
  ORG --> DEV[Folder dev]
  PROD --> NET[shared-net-prod]
  PROD --> CORE[platform-core-prod]
  PROD --> DATA[data-platform-prod]
  PROD --> ML[ml-platform-prod]
  NET --> VPC[Shared VPC]
  VPC --> SUB[Private Subnets]
  VPC --> NAT[Cloud NAT]
  VPC --> LB[Load Balancer + Cloud Armor]
  CORE --> RUN[Cloud Run services]
  DATA --> SPN[Spanner multi-region]
  DATA --> BQD[BigQuery datasets]
  ML --> VEP[Vertex AI endpoints]`} />
            </Card>

            <Card title={bi({ de: '5) Datenbankstruktur (Spanner-ready)', en: '5) Database Structure (Spanner-ready)' }, l)}>
              <p style={pStyle}>
                {bi(
                  {
                    de: 'Domänentrennung erfolgt entlang Tenant & Identity, Company & Broker, Fleet & Driver, Underwriting & Policy, Claims, Telematics, Partner Network, AI Governance sowie Audit & Timeline.',
                    en: 'Domain separation follows Tenant & Identity, Company & Broker, Fleet & Driver, Underwriting & Policy, Claims, Telematics, Partner Network, AI Governance, and Audit & Timeline.'
                  },
                  l
                )}
              </p>
              <MermaidBlock title={bi({ de: 'Kern-ERD', en: 'Core ERD' }, l)} code={`erDiagram
  tenants ||--o{ users : has
  tenants ||--o{ accounts : owns
  accounts ||--o{ submissions : creates
  submissions ||--o{ policies : converts_to
  policies ||--o{ endorsements : has
  policies ||--o{ renewals : has
  policies ||--o{ claims : suffers
  claims ||--o{ claim_photos : contains
  accounts ||--o{ vehicles : owns
  vehicles ||--o{ drivers : assigned_to
  claims }o--|| partners : handled_by
  submissions ||--o{ ai_runs : evaluated_by
  tenants ||--o{ timeline_events : logs`} />
              <div style={{ ...roleCardStyle, marginTop: '0.65rem' }}>
                <p style={noteStyle}><strong>{bi({ de: 'Primärschlüssel', en: 'Primary keys' }, l)}:</strong> {bi({ de: 'Globale IDs pro Entität mit tenant_id als führendem Partitionierungsmerkmal.', en: 'Global IDs per entity with tenant_id as leading partition key.' }, l)}</p>
                <p style={{ ...noteStyle, marginTop: '0.35rem' }}><strong>{bi({ de: 'Fremdschlüssel', en: 'Foreign keys' }, l)}:</strong> {bi({ de: 'Domänensichere Referenzen zwischen Submission, Policy, Claim und Partner.', en: 'Domain-safe references across submission, policy, claim, and partner.' }, l)}</p>
                <p style={{ ...noteStyle, marginTop: '0.35rem' }}><strong>{bi({ de: 'Indexing', en: 'Indexing strategy' }, l)}:</strong> {bi({ de: 'Sekundärindizes auf tenant_id + status + time für schnelle operative Filter.', en: 'Secondary indexes on tenant_id + status + time for fast operational filtering.' }, l)}</p>
                <p style={{ ...noteStyle, marginTop: '0.35rem' }}><strong>{bi({ de: 'PII-Schutz', en: 'PII encryption' }, l)}:</strong> {bi({ de: 'Feldbasierte Verschlüsselung über Cloud KMS und rollenbasierte Entschlüsselung.', en: 'Field-level encryption via Cloud KMS with role-based decryption.' }, l)}</p>
                <p style={{ ...noteStyle, marginTop: '0.35rem' }}><strong>{bi({ de: 'Retention', en: 'Retention policy' }, l)}:</strong> {bi({ de: 'Lifecycle-basierte Lösch-/Archivregeln je Datenklasse und regulatorischem Rahmen.', en: 'Lifecycle-based purge/archive rules by data class and regulatory context.' }, l)}</p>
              </div>
            </Card>

            <Card title={bi({ de: '6) Event-Driven Architecture', en: '6) Event-Driven Architecture' }, l)}>
              <p style={pStyle}>{bi({ de: 'Jede fachliche Aktion erzeugt ein Domain-Event und wird über Pub/Sub verteilt. Services verarbeiten Events idempotent, um Mehrfachzustellungen ohne Seiteneffekte zu beherrschen.', en: 'Every business action emits a domain event distributed over Pub/Sub. Services consume events idempotently to handle duplicate delivery without side effects.' }, l)}</p>
              <div style={{ ...roleCardStyle, marginTop: '0.65rem' }}>
                <p style={noteStyle}><code>submission.created</code>, <code>quote.generated</code>, <code>policy.bound</code>, <code>claim.created</code>, <code>scan.completed</code>, <code>fraud.flagged</code>, <code>renewal.generated</code></p>
              </div>
            </Card>

            <Card title={bi({ de: '7) AI Core Integration', en: '7) AI Core Integration' }, l)}>
              <p style={pStyle}>{bi({ de: 'Der AI Core umfasst Underwriting AI, Claims Vision AI, Fraud Detection, Fleet Risk Scoring und Renewal Optimization. Das Modell-Lifecycle-Management folgt einem kontrollierten Betriebsprozess.', en: 'The AI core includes underwriting AI, claims vision AI, fraud detection, fleet risk scoring, and renewal optimization. Model lifecycle management follows a controlled operating process.' }, l)}</p>
              <div style={flowGridStyle}>
                {[
                  { de: 'Datenaufnahme', en: 'Data ingestion' },
                  { de: 'Feature Engineering', en: 'Feature engineering' },
                  { de: 'Training', en: 'Training' },
                  { de: 'Modell-Registry', en: 'Registry' },
                  { de: 'Deployment', en: 'Deployment' },
                  { de: 'Monitoring', en: 'Monitoring' },
                  { de: 'Menschliche Prüfung', en: 'Human review' }
                ].map((step, idx) => (
                  <div key={step.en} style={flowItemStyle}>
                    <div style={flowIndexStyle}>{idx + 1}</div>
                    <div style={flowLabelStyle}>{bi(step, l)}</div>
                  </div>
                ))}
              </div>
              <p style={{ ...noteStyle, marginTop: '0.55rem' }}>{bi({ de: 'Explainability, Human Override, Audit Logging und EU-AI-Act-konforme Governance sind verpflichtende Architekturbausteine.', en: 'Explainability, human override, audit logging, and EU AI Act-aligned governance are mandatory architecture components.' }, l)}</p>
            </Card>

            <Card title={bi({ de: '8) Data Flow Summary', en: '8) Data Flow Summary' }, l)}>
              <MermaidBlock title={bi({ de: 'Lineare Übersicht', en: 'Linear Summary' }, l)} code={`flowchart LR
  U[User Input] --> API[API]
  API --> BUS[Event Bus]
  BUS --> DB[Spanner]
  DB --> AI[AI]
  AI --> DEC[Decision]
  DEC --> TL[Timeline]
  TL --> REP[Reporting]
  REP --> REN[Renewal]`} />
            </Card>

            <Card title={bi({ de: '9) Observability & Security', en: '9) Observability & Security' }, l)}>
              <p style={pStyle}>{bi({ de: 'Sicherheits- und Betriebskontrollen basieren auf IAM-Rollenmodellen, dedizierten Service Accounts, Secret Manager, Cloud KMS, vollständigem Audit Trail sowie zentralem Logging & Monitoring.', en: 'Security and operations controls are built on IAM role models, dedicated service accounts, Secret Manager, Cloud KMS, full audit trails, and centralized logging & monitoring.' }, l)}</p>
              <p style={{ ...pStyle, marginTop: '0.55rem' }}>{bi({ de: 'Zero-Trust-Netzwerkprinzipien mit privaten Subnetzen, kontrolliertem Egress und Perimeter-Schutz reduzieren laterale Risiken in Multi-Tenant-Umgebungen.', en: 'Zero-trust networking with private subnets, controlled egress, and perimeter protection reduces lateral risk in multi-tenant environments.' }, l)}</p>
            </Card>

            <Card title={bi({ de: '10) MVP zu globaler Skalierung', en: '10) MVP to Global Scale Roadmap' }, l)}>
              <div style={{ display: 'grid', gap: '0.65rem' }}>
                <div style={roleCardStyle}>
                  <h3 style={subHeadingStyle}>Phase 1</h3>
                  <p style={noteStyle}>{bi({ de: 'Cloud Run + Cloud SQL, manuelles Underwriting und FNOL-Kernprozess.', en: 'Cloud Run + Cloud SQL, manual underwriting and FNOL core flow.' }, l)}</p>
                </div>
                <div style={roleCardStyle}>
                  <h3 style={subHeadingStyle}>Phase 2</h3>
                  <p style={noteStyle}>{bi({ de: 'Spanner-Migration, event-driven Orchestrierung, AI Damage Scan in Claims.', en: 'Spanner migration, event-driven orchestration, and AI damage scan in claims.' }, l)}</p>
                </div>
                <div style={roleCardStyle}>
                  <h3 style={subHeadingStyle}>Phase 3</h3>
                  <p style={noteStyle}>{bi({ de: 'Multi-Region-Spanner, vollständiger AI-Feedback-Loop, Portfolio-Steering und Reinsurance-Integration.', en: 'Multi-region Spanner, full AI feedback loop, portfolio steering, and reinsurance integration.' }, l)}</p>
                </div>
              </div>
            </Card>
          </>
        )}

        {section === 'vision' && (
          <>
            <Card title={t('insideInsurfox.vision.strategyTitle')}>
              <p style={pStyle}>{t('insideInsurfox.vision.strategyBody')}</p>
              <p style={{ ...pStyle, marginTop: '0.55rem' }}>{t('insideInsurfox.vision.problemBody')}</p>
            </Card>
            <Card title={t('insideInsurfox.vision.loopTitle')}>
              <div style={flowGridStyle}>
                {[
                  { de: 'Registrierung', en: 'Registration' },
                  { de: 'Risikoanalyse', en: 'Risk Analysis' },
                  { de: 'Underwriting', en: 'Underwriting' },
                  { de: 'Schadenbearbeitung', en: 'Claims' },
                  { de: 'Erneuerung', en: 'Renewal' },
                  { de: 'Modell-Update', en: 'Model Update' }
                ].map((step, idx) => (
                  <div key={step.en} style={flowItemStyle}>
                    <div style={flowIndexStyle}>{idx + 1}</div>
                    <div style={flowLabelStyle}>{bi(step, l)}</div>
                  </div>
                ))}
              </div>
              <p style={{ ...noteStyle, marginTop: '0.55rem' }}>{t('insideInsurfox.vision.loopBody')}</p>
            </Card>
            <Card title={t('insideInsurfox.vision.employeeValueTitle')}>
              <p style={pStyle}>{t('insideInsurfox.vision.employeeValueBody')}</p>
            </Card>
          </>
        )}

        {section === 'roles' && (
          <Card title={t('insideInsurfox.roles.title')}>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {roleDetails.map((row) => (
                <div key={row.role.en} style={roleCardStyle}>
                  <h3 style={subHeadingStyle}>{bi(row.role, l)}</h3>
                  <RoleLine label={t('insideInsurfox.roles.objectives')} value={bi(row.objectives, l)} />
                  <RoleLine label={t('insideInsurfox.roles.responsibilities')} value={bi(row.responsibilities, l)} />
                  <RoleLine label={t('insideInsurfox.roles.dataScope')} value={bi(row.dataScope, l)} />
                  <RoleLine label={t('insideInsurfox.roles.decisions')} value={bi(row.decisions, l)} />
                  <RoleLine label={t('insideInsurfox.roles.kpis')} value={bi(row.kpis, l)} />
                </div>
              ))}
            </div>
          </Card>
        )}

        {section === 'lifecycle' && (
          <>
            <Card title={t('insideInsurfox.lifecycle.title')}>
              <div className="print-hide" style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                {lifecycleDetails.map((item) => (
                  <Button
                    key={item.key}
                    size="sm"
                    variant={selectedLifecycle === item.key ? 'primary' : 'secondary'}
                    onClick={() => setSelectedLifecycle(item.key)}
                  >
                    {bi(item.label, l)}
                  </Button>
                ))}
              </div>
              <div style={{ ...roleCardStyle, marginTop: '0.75rem' }}>
                <h3 style={subHeadingStyle}>{bi(activeLifecycle.label, l)}</h3>
                <RoleLine label={t('insideInsurfox.lifecycle.whoActs')} value={bi(activeLifecycle.whoActs, l)} />
                <RoleLine label={t('insideInsurfox.lifecycle.dataCreated')} value={bi(activeLifecycle.dataCreated, l)} />
                <RoleLine label={t('insideInsurfox.lifecycle.aiModules')} value={bi(activeLifecycle.aiModules, l)} />
                <RoleLine label={t('insideInsurfox.lifecycle.decisions')} value={bi(activeLifecycle.decisions, l)} />
              </div>
            </Card>
          </>
        )}

        {section === 'data-model' && (
          <>
            <Card title={t('insideInsurfox.dataModel.title')}>
              <p style={pStyle}>{t('insideInsurfox.dataModel.body')}</p>
            </Card>
            <Card title={t('insideInsurfox.dataModel.explorerTitle')}>
              <DataFieldExplorer />
            </Card>
          </>
        )}

        {section === 'ai-core' && (
          <>
            <Card title={t('insideInsurfox.aiCore.capabilitiesTitle')}>
              <div style={flowGridStyle}>
                {[
                  t('insideInsurfox.aiCore.capRiskScoring'),
                  t('insideInsurfox.aiCore.capUnderwritingAi'),
                  t('insideInsurfox.aiCore.capClaimsAi'),
                  t('insideInsurfox.aiCore.capFraudDetection'),
                  t('insideInsurfox.aiCore.capPortfolioForecasting'),
                  t('insideInsurfox.aiCore.capRenewalIntelligence')
                ].map((item) => (
                  <div key={item} style={flowItemStyle}><div style={flowLabelStyle}>{item}</div></div>
                ))}
              </div>
            </Card>
            <Card title={t('insideInsurfox.aiCore.feedbackLoopTitle')}>
              <div style={flowGridStyle}>
                {[t('insideInsurfox.aiCore.loopData'), t('insideInsurfox.aiCore.loopModel'), t('insideInsurfox.aiCore.loopDecision'), t('insideInsurfox.aiCore.loopRetrain')].map((item, idx) => (
                  <div key={item} style={flowItemStyle}>
                    <div style={flowIndexStyle}>{idx + 1}</div>
                    <div style={flowLabelStyle}>{item}</div>
                  </div>
                ))}
              </div>
              <p style={{ ...noteStyle, marginTop: '0.55rem' }}>{t('insideInsurfox.aiCore.explainability')}</p>
              <p style={{ ...noteStyle, marginTop: '0.35rem' }}>{t('insideInsurfox.aiCore.euAiAct')}</p>
            </Card>
          </>
        )}

        {section === 'architecture' && (
          <Card title={t('insideInsurfox.architecture.title')}>
            <p style={pStyle}>{t('insideInsurfox.architecture.body')}</p>
            <div style={{ ...architectureDiagramStyle, marginTop: '0.75rem' }}>
              <div style={architectureNodeStyle}>Frontend Layer</div>
              <div style={architectureNodeStyle}>API Layer</div>
              <div style={architectureNodeStyle}>Event Stream (Pub/Sub)</div>
              <div style={architectureNodeStyle}>Data Layer (Cloud SQL + BigQuery)</div>
              <div style={architectureNodeStyle}>AI Layer (Vertex AI)</div>
              <div style={architectureNodeStyle}>Reporting Layer</div>
            </div>
          </Card>
        )}

        {section === 'modules' && (
          <Card title={t('insideInsurfox.modules.title')}>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {moduleDetails.map((m) => (
                <div key={m.name} style={roleCardStyle}>
                  <h3 style={subHeadingStyle}>{m.name}</h3>
                  <RoleLine label={t('insideInsurfox.modules.primaryUser')} value={bi(m.primaryUser, l)} />
                  <RoleLine label={t('insideInsurfox.modules.coreData')} value={bi(m.coreData, l)} />
                  <RoleLine label={t('insideInsurfox.modules.aiContribution')} value={bi(m.aiContribution, l)} />
                  <RoleLine label={t('insideInsurfox.modules.businessValue')} value={bi(m.businessValue, l)} />
                </div>
              ))}
            </div>
          </Card>
        )}

        {section === 'reporting' && (
          <Card title={t('insideInsurfox.reporting.title')}>
            <div style={{ display: 'grid', gap: '0.7rem' }}>
              {reportingMetrics.map((m) => (
                <div key={m.title.en} style={roleCardStyle}>
                  <h3 style={subHeadingStyle}>{bi(m.title, l)}</h3>
                  <RoleLine label={t('insideInsurfox.reporting.meaning')} value={bi(m.meaning, l)} />
                  <RoleLine label={t('insideInsurfox.reporting.action')} value={bi(m.action, l)} />
                </div>
              ))}
            </div>
          </Card>
        )}

        {section === 'renewal-loop' && (
          <>
            <Card title={t('insideInsurfox.renewal.title')}>
              <p style={pStyle}>{t('insideInsurfox.renewal.body1')}</p>
              <p style={{ ...pStyle, marginTop: '0.55rem' }}>{t('insideInsurfox.renewal.body2')}</p>
            </Card>
            <Card title={t('insideInsurfox.renewal.logicTitle')}>
              <div style={flowGridStyle}>
                {[t('insideInsurfox.renewal.logicStep1'), t('insideInsurfox.renewal.logicStep2'), t('insideInsurfox.renewal.logicStep3'), t('insideInsurfox.renewal.logicStep4')].map((s, idx) => (
                  <div key={s} style={flowItemStyle}>
                    <div style={flowIndexStyle}>{idx + 1}</div>
                    <div style={flowLabelStyle}>{s}</div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {section === 'mvp-roadmap' && (
          <Card title={t('insideInsurfox.roadmap.title')}>
            <div style={{ display: 'grid', gap: '0.7rem' }}>
              <div style={roleCardStyle}>
                <h3 style={subHeadingStyle}>{t('insideInsurfox.roadmap.phase1Title')}</h3>
                <p style={noteStyle}>{t('insideInsurfox.roadmap.phase1Body')}</p>
              </div>
              <div style={roleCardStyle}>
                <h3 style={subHeadingStyle}>{t('insideInsurfox.roadmap.phase2Title')}</h3>
                <p style={noteStyle}>{t('insideInsurfox.roadmap.phase2Body')}</p>
              </div>
              <div style={roleCardStyle}>
                <h3 style={subHeadingStyle}>{t('insideInsurfox.roadmap.phase3Title')}</h3>
                <p style={noteStyle}>{t('insideInsurfox.roadmap.phase3Body')}</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </section>
  )
}

function RoleLine({ label, value }: { label: string; value: string }) {
  return (
    <p style={{ ...noteStyle, marginBottom: '0.35rem' }}>
      <strong>{label}:</strong> {value}
    </p>
  )
}

function MermaidBlock({ title, code }: { title: string; code: string }) {
  return (
    <div style={{ ...roleCardStyle, marginTop: '0.65rem' }}>
      <h3 style={subHeadingStyle}>{title}</h3>
      <pre style={mermaidPreStyle}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

const pStyle: CSSProperties = {
  margin: 0,
  color: '#334155',
  fontSize: '0.89rem',
  lineHeight: 1.62
}

const noteStyle: CSSProperties = {
  margin: 0,
  color: '#334155',
  fontSize: '0.84rem',
  lineHeight: 1.55
}

const subHeadingStyle: CSSProperties = {
  margin: '0 0 0.45rem',
  color: '#0f172a',
  fontSize: '0.95rem'
}

const flowGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '0.65rem'
}

const flowItemStyle: CSSProperties = {
  border: '1px solid #e2e8f0',
  borderRadius: 10,
  padding: '0.55rem',
  background: '#f8fafc',
  display: 'grid',
  gap: '0.35rem'
}

const flowIndexStyle: CSSProperties = {
  width: 22,
  height: 22,
  borderRadius: 999,
  background: '#0f172a',
  color: '#fff',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.75rem',
  fontWeight: 700
}

const flowLabelStyle: CSSProperties = {
  color: '#0f172a',
  fontWeight: 700,
  fontSize: '0.84rem'
}

const roleCardStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 10,
  padding: '0.65rem',
  background: '#f8fafc'
}

const architectureDiagramStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '0.6rem'
}

const architectureNodeStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 10,
  padding: '0.65rem',
  background: '#f8fafc',
  color: '#0f172a',
  fontWeight: 700,
  fontSize: '0.84rem'
}

const tableStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  minWidth: 980
}

const headRowStyle: CSSProperties = {
  background: '#e2e8f0'
}

const thStyle: CSSProperties = {
  textAlign: 'left',
  color: '#0f172a',
  fontSize: '0.79rem',
  fontWeight: 700,
  border: '1px solid #dbe2ea',
  padding: '0.48rem 0.52rem'
}

const tdStyle: CSSProperties = {
  color: '#334155',
  fontSize: '0.78rem',
  border: '1px solid #dbe2ea',
  padding: '0.46rem 0.52rem',
  verticalAlign: 'top',
  lineHeight: 1.45
}

const tdStrongStyle: CSSProperties = {
  ...tdStyle,
  color: '#0f172a',
  fontWeight: 700
}

const mermaidPreStyle: CSSProperties = {
  margin: 0,
  overflowX: 'auto',
  background: '#0f172a',
  color: '#e2e8f0',
  borderRadius: 8,
  padding: '0.7rem',
  fontSize: '0.75rem',
  lineHeight: 1.5
}
