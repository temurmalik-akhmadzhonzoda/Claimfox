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

type EnterpriseRole = {
  name: string
  tenantLevel: string
  functionalDescription: string
  coreResponsibilities: string
  decisionAuthority: string
  dataAccessScope: string
  modulesUsed: string
  trigger?: string
  temporaryAccess?: string
}

type EnterpriseRoleSection = {
  title: BiText
  intro: BiText
  roles: EnterpriseRole[]
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

const enterpriseRoleSections: EnterpriseRoleSection[] = [
  {
    title: { de: '1) PLATFORM LEVEL (INSURFOX CORE)', en: '1) PLATFORM LEVEL (INSURFOX CORE)' },
    intro: { de: 'Zentrale Rollen mit systemweiter Steuerung über Governance, Zeichnung, Schaden, Plattformbetrieb, AI und Compliance.', en: 'Central roles with system-wide control across governance, underwriting, claims, platform operations, AI, and compliance.' },
    roles: [
      { name: 'Platform Super Admin', tenantLevel: 'Platform', functionalDescription: 'Owns global platform administration and tenant lifecycle.', coreResponsibilities: 'Tenant provisioning, root IAM, emergency controls, platform configuration baselines.', decisionAuthority: 'System-wide authorization and break-glass approval.', dataAccessScope: 'Cross-tenant metadata, audit domain, no default business data read.', modulesUsed: 'All (admin-only controls)' },
      { name: 'Chief Underwriting Officer (MGA)', tenantLevel: 'Platform / MGA', functionalDescription: 'Defines MGA underwriting framework and authority design.', coreResponsibilities: 'Authority corridors, referral thresholds, portfolio appetite, underwriting governance.', decisionAuthority: 'Final underwriting policy and override rights for delegated lines.', dataAccessScope: 'Underwriting portfolios, referral history, risk-model outputs.', modulesUsed: 'Brokerfox, AI Fox, Reporting' },
      { name: 'Head of Claims (MGA)', tenantLevel: 'Platform / MGA', functionalDescription: 'Leads claims operating model and leakage controls.', coreResponsibilities: 'Claims SOPs, reserve governance, partner SLAs, escalation protocols.', decisionAuthority: 'Claims policy decisions and high-severity approval thresholds.', dataAccessScope: 'Claims files, reserves, fraud outputs, partner performance.', modulesUsed: 'Claimsfox, Partnerfox, Reporting' },
      { name: 'Broker Portal Director', tenantLevel: 'Platform', functionalDescription: 'Owns broker operating model and distribution processes.', coreResponsibilities: 'Broker onboarding policy, portal workflow standards, service quality.', decisionAuthority: 'Broker experience standards and distribution operations decisions.', dataAccessScope: 'Broker account metadata, submission throughput, channel KPIs.', modulesUsed: 'Brokerfox, Reporting' },
      { name: 'AI Governance Officer', tenantLevel: 'Platform', functionalDescription: 'Controls AI risk governance and model assurance.', coreResponsibilities: 'Model approval gates, explainability standards, monitoring and drift policies.', decisionAuthority: 'AI go-live/freeze decisions and mandatory human override rules.', dataAccessScope: 'Model registry, feature usage, decision traces, bias indicators.', modulesUsed: 'AI Fox, Reporting' },
      { name: 'Compliance & Risk Officer', tenantLevel: 'Platform', functionalDescription: 'Supervises regulatory and operational compliance.', coreResponsibilities: 'Control framework, regulatory evidence, policy adherence, remediation tracking.', decisionAuthority: 'Compliance exceptions, control escalations, audit response coordination.', dataAccessScope: 'Audit logs, control events, policy and process evidence.', modulesUsed: 'Reporting, Admin governance views' },
      { name: 'Reinsurance Manager', tenantLevel: 'Platform / MGA', functionalDescription: 'Manages treaty architecture and ceded risk strategy.', coreResponsibilities: 'Treaty structure, placement negotiation, cession rules, recovery governance.', decisionAuthority: 'Treaty and facultative placement recommendations for approval.', dataAccessScope: 'Aggregation metrics, treaty utilization, ceded-loss events.', modulesUsed: 'Reporting, Underwriting views' },
      { name: 'Product Owner', tenantLevel: 'Platform', functionalDescription: 'Owns product backlog across insurance modules.', coreResponsibilities: 'Feature prioritization, release scope, cross-domain dependency management.', decisionAuthority: 'Functional roadmap and release content sign-off.', dataAccessScope: 'Product telemetry, workflow KPIs, adoption metrics.', modulesUsed: 'All (product perspective)' },
      { name: 'DevOps Lead', tenantLevel: 'Platform', functionalDescription: 'Owns reliability, deployment architecture, and runtime operations.', coreResponsibilities: 'CI/CD, environment hardening, observability, incident response.', decisionAuthority: 'Deployment gates, rollback decisions, operational risk mitigation.', dataAccessScope: 'Infrastructure logs, runtime metrics, deployment records.', modulesUsed: 'Platform ops tooling, monitoring stack' },
      { name: 'Data Protection Officer (DPO)', tenantLevel: 'Platform', functionalDescription: 'Ensures data protection by design and by default.', coreResponsibilities: 'PII policy, retention controls, lawful processing review, data-rights governance.', decisionAuthority: 'Privacy control approval and data access escalation decisions.', dataAccessScope: 'PII policy metadata, access events, retention/audit evidence.', modulesUsed: 'Reporting, compliance views' }
    ]
  },
  {
    title: { de: '2) BROKER TENANT', en: '2) BROKER TENANT' },
    intro: { de: 'Broker-Rollen für Onboarding, Submission-Handling, Portfoliosteuerung und Renewals.', en: 'Broker roles covering onboarding, submission handling, portfolio steering, and renewals.' },
    roles: [
      { name: 'Broker Admin', tenantLevel: 'Broker', functionalDescription: 'Administers broker tenant users and operating setup.', coreResponsibilities: 'Client onboarding, user-role assignment, workflow routing configuration.', decisionAuthority: 'Broker-internal access grants and process settings.', dataAccessScope: 'Broker tenant clients, submissions, policy-level broker views.', modulesUsed: 'Brokerfox, Reporting' },
      { name: 'Broker Underwriter', tenantLevel: 'Broker', functionalDescription: 'Prepares risk submissions and supports market placement quality.', coreResponsibilities: 'Data quality checks, submission packaging, referral communication.', decisionAuthority: 'Submission readiness and market-routing proposals.', dataAccessScope: 'Risk intake data, quote comparisons, underwriting notes.', modulesUsed: 'Brokerfox, AI Fox' },
      { name: 'Broker Claims Manager', tenantLevel: 'Broker', functionalDescription: 'Coordinates client-side claims oversight.', coreResponsibilities: 'FNOL validation, client communication, claims progress monitoring.', decisionAuthority: 'Escalation initiation and client-side settlement coordination.', dataAccessScope: 'Claims status, reserve summaries, communication logs.', modulesUsed: 'Claimsfox, Reporting' },
      { name: 'Broker Account Executive', tenantLevel: 'Broker', functionalDescription: 'Owns portfolio relationship and growth strategy for assigned clients.', coreResponsibilities: 'Renewal planning, placement strategy, account expansion.', decisionAuthority: 'Offer selection recommendations and renewal negotiation strategy.', dataAccessScope: 'Account KPIs, quote outcomes, renewal pipeline.', modulesUsed: 'Brokerfox, Reporting' },
      { name: 'Broker Finance Officer', tenantLevel: 'Broker', functionalDescription: 'Manages commission visibility and broker financial controls.', coreResponsibilities: 'Commission reconciliation, invoicing checks, broker finance reporting.', decisionAuthority: 'Broker financial validation and exception escalation.', dataAccessScope: 'Commission statements, invoice summaries, payment status.', modulesUsed: 'Reporting, finance views' }
    ]
  },
  {
    title: { de: '3) MGA / UNDERWRITING OPERATIONS', en: '3) MGA / UNDERWRITING OPERATIONS' },
    intro: { de: 'Rollen für Risikobewertung, Pricing, Aggregationskontrolle und Kapazitätssteuerung.', en: 'Roles for risk assessment, pricing, aggregation control, and capacity steering.' },
    roles: [
      { name: 'MGA Underwriter', tenantLevel: 'MGA', functionalDescription: 'Executes delegated underwriting decisions within authority band.', coreResponsibilities: 'Risk scoring review, policy terms, referral handling.', decisionAuthority: 'Accept/decline/referral within defined underwriting authority.', dataAccessScope: 'Submission data, model outputs, policy terms history.', modulesUsed: 'Brokerfox, AI Fox' },
      { name: 'Senior Underwriter', tenantLevel: 'MGA', functionalDescription: 'Handles complex or escalated underwriting cases.', coreResponsibilities: 'High-risk review, exception handling, mentoring quality standards.', decisionAuthority: 'Escalated case decisions and authority exceptions.', dataAccessScope: 'Complex submissions, referral evidence, historical loss signals.', modulesUsed: 'Brokerfox, AI Fox, Reporting' },
      { name: 'Portfolio Manager', tenantLevel: 'MGA', functionalDescription: 'Steers portfolio performance against appetite and margin goals.', coreResponsibilities: 'Loss-ratio monitoring, segment steering, renewal direction.', decisionAuthority: 'Portfolio steering actions and risk appetite adjustments (proposed).', dataAccessScope: 'Portfolio KPIs, segment trends, accumulation metrics.', modulesUsed: 'Reporting, AI Fox' },
      { name: 'Pricing Actuary', tenantLevel: 'MGA', functionalDescription: 'Maintains pricing assumptions and actuarial calibration.', coreResponsibilities: 'Rate model review, assumption governance, trend updates.', decisionAuthority: 'Pricing parameter recommendations and model-calibration sign-off.', dataAccessScope: 'Loss/severity trends, exposure metrics, pricing performance.', modulesUsed: 'AI Fox, Reporting' },
      { name: 'Capacity Manager', tenantLevel: 'MGA / Carrier', functionalDescription: 'Coordinates capacity allocation and treaty alignment.', coreResponsibilities: 'Capacity distribution, authority utilization checks, carrier coordination.', decisionAuthority: 'Capacity allocation proposals and referral escalations to carrier.', dataAccessScope: 'Capacity utilization, treaty constraints, placement outcomes.', modulesUsed: 'Reporting, underwriting views' }
    ]
  },
  {
    title: { de: '4) CORPORATE CLIENT (LOGISTICS COMPANY)', en: '4) CORPORATE CLIENT (LOGISTICS COMPANY)' },
    intro: { de: 'Interne Rollen eines Unternehmenskunden mit regionalem Scope und delegierbaren Rechten.', en: 'Internal corporate-client roles with regional scope and delegated permissions.' },
    roles: [
      { name: 'Global Client Administrator', tenantLevel: 'Corporate Client', functionalDescription: 'Administers tenant-internal user and module governance.', coreResponsibilities: 'User onboarding, role delegation, module activation by region.', decisionAuthority: 'Client-internal access decisions and permission delegation.', dataAccessScope: 'Organization-wide metadata and permission assignments.', modulesUsed: 'Brokerfox, Claimsfox, Fleetfox, Reporting' },
      { name: 'Regional Fleet Manager', tenantLevel: 'Corporate Client', functionalDescription: 'Owns regional fleet operations and risk controls.', coreResponsibilities: 'Fleet supervision, event triage, regional safety execution.', decisionAuthority: 'Operational actions for assigned regional fleet scope.', dataAccessScope: 'Regional vehicle/driver telemetry, regional claims visibility.', modulesUsed: 'Fleetfox, Claimsfox, Reporting' },
      { name: 'Claims Manager', tenantLevel: 'Corporate Client', functionalDescription: 'Manages corporate claims process and escalation.', coreResponsibilities: 'FNOL quality control, status oversight, reserve discussions.', decisionAuthority: 'Escalation and evidence completion decisions.', dataAccessScope: 'Corporate claims files and settlement-status views.', modulesUsed: 'Claimsfox, Reporting' },
      { name: 'Risk Manager', tenantLevel: 'Corporate Client', functionalDescription: 'Coordinates risk prevention and insurance control framework.', coreResponsibilities: 'Risk register updates, mitigation measures, policy adequacy review.', decisionAuthority: 'Internal risk-control actions and prevention priorities.', dataAccessScope: 'Risk indicators, incident trends, policy coverage mapping.', modulesUsed: 'Fleetfox, Reporting' },
      { name: 'Finance Officer', tenantLevel: 'Corporate Client', functionalDescription: 'Controls premium, invoice, and settlement finance flows.', coreResponsibilities: 'Billing review, premium allocation, financial reconciliation.', decisionAuthority: 'Financial validation and exception escalation.', dataAccessScope: 'Invoices, premium statements, settlement payment status.', modulesUsed: 'Reporting, finance views' },
      { name: 'Warehouse Manager', tenantLevel: 'Corporate Client', functionalDescription: 'Manages warehouse and goods-handling risk operations.', coreResponsibilities: 'Incident documentation, handling controls, storage risk compliance.', decisionAuthority: 'Operational safety actions in warehouse domain.', dataAccessScope: 'Warehouse incidents, asset and handling event data.', modulesUsed: 'Claimsfox, Reporting' },
      { name: 'Driver', tenantLevel: 'Corporate Client', functionalDescription: 'Executes transport operations and primary FNOL input.', coreResponsibilities: 'Event reporting, photo capture, incident detail submission.', decisionAuthority: 'Can submit own incidents; no pricing/policy governance rights.', dataAccessScope: 'Own journey and incident records only.', modulesUsed: 'Fleetfox, Claimsfox (restricted)' },
      { name: 'Transport Planner', tenantLevel: 'Corporate Client', functionalDescription: 'Plans routes and load operations with risk awareness.', coreResponsibilities: 'Route assignment, exposure balancing, service continuity planning.', decisionAuthority: 'Operational route decisions within planning mandate.', dataAccessScope: 'Shipment schedules, route context, incident heatmaps.', modulesUsed: 'Fleetfox, Reporting' },
      { name: 'HR / Compliance Officer', tenantLevel: 'Corporate Client', functionalDescription: 'Monitors policy adherence for people and process compliance.', coreResponsibilities: 'Training compliance, incident governance, conduct escalation.', decisionAuthority: 'Internal compliance escalation and control recommendations.', dataAccessScope: 'Compliance logs, role assignments, incident governance traces.', modulesUsed: 'Reporting, governance views' }
    ]
  },
  {
    title: { de: '5) CLAIMS ECOSYSTEM ROLES', en: '5) CLAIMS ECOSYSTEM ROLES' },
    intro: { de: 'Partnerrollen mit ereignisgesteuertem, häufig zeitlich begrenztem Zugriff im Schadenökosystem.', en: 'Partner roles with event-triggered, often time-bound access in the claims ecosystem.' },
    roles: [
      { name: 'Claims Handler (Insurfox / Broker)', tenantLevel: 'Platform / Broker', functionalDescription: 'Primary operational claim processor.', coreResponsibilities: 'Coverage checks, reserve setting, workflow progression.', decisionAuthority: 'Operational claim-handling decisions within authority.', dataAccessScope: 'Assigned claims and relevant policy context.', modulesUsed: 'Claimsfox', trigger: 'Triggered on claim.created and escalation events.', temporaryAccess: 'No (core ongoing role).' },
      { name: 'Surveyor / Loss Adjuster', tenantLevel: 'Partner', functionalDescription: 'Independent damage assessment specialist.', coreResponsibilities: 'Damage inspection, expert reports, technical causality evidence.', decisionAuthority: 'Assessment opinion; no final settlement authority.', dataAccessScope: 'Assigned claim dossier and evidence subset.', modulesUsed: 'Claimsfox (partner access)', trigger: 'Triggered for severity threshold or disputed causality.', temporaryAccess: 'Yes, assignment-bound access.' },
      { name: 'Repair Network Partner', tenantLevel: 'Partner', functionalDescription: 'Performs repair services and cost estimates.', coreResponsibilities: 'Repair quote, work-status updates, invoice submission.', decisionAuthority: 'Repair feasibility and estimate confirmation.', dataAccessScope: 'Repair-relevant claim fields only.', modulesUsed: 'Partnerfox', trigger: 'Triggered after partner.assigned for repair path.', temporaryAccess: 'Yes, claim-task scope only.' },
      { name: 'Rental Provider', tenantLevel: 'Partner', functionalDescription: 'Provides replacement vehicle continuity services.', coreResponsibilities: 'Rental confirmation, cost upload, utilization updates.', decisionAuthority: 'Can confirm rental costs; cannot approve settlement.', dataAccessScope: 'Assignment details only; no premium visibility.', modulesUsed: 'Partnerfox', trigger: 'Triggered after vehicle immobilization event.', temporaryAccess: 'Yes, temporary and assignment-bound.' },
      { name: 'Towing & Recovery Operator', tenantLevel: 'Partner', functionalDescription: 'Handles towing, recovery, and transport assistance.', coreResponsibilities: 'Dispatch confirmation, incident recovery evidence upload.', decisionAuthority: 'Operational recovery completion decisions.', dataAccessScope: 'Location and assignment data only.', modulesUsed: 'Partnerfox', trigger: 'Triggered for disabled-vehicle events.', temporaryAccess: 'Yes, short-lived task access.' },
      { name: 'Salvage Partner', tenantLevel: 'Partner', functionalDescription: 'Manages salvage valuation and disposal channels.', coreResponsibilities: 'Residual value estimation, disposal process execution.', decisionAuthority: 'Salvage bid and value recommendations.', dataAccessScope: 'Asset condition and claim disposition subset.', modulesUsed: 'Partnerfox, Claimsfox (limited)', trigger: 'Triggered on total-loss or salvage flag.', temporaryAccess: 'Yes, until salvage completion.' },
      { name: 'Subrogation Specialist', tenantLevel: 'Partner / Platform', functionalDescription: 'Pursues recovery from liable third parties.', coreResponsibilities: 'Liability review, recovery documentation, recourse tracking.', decisionAuthority: 'Recovery-path recommendation and legal escalation input.', dataAccessScope: 'Liability evidence and payment history subset.', modulesUsed: 'Claimsfox, Reporting', trigger: 'Triggered on third-party liability indication.', temporaryAccess: 'Often case-bound; may be extended by mandate.' },
      { name: 'Legal Counsel', tenantLevel: 'Partner / Platform', functionalDescription: 'Provides legal strategy for disputed claims.', coreResponsibilities: 'Legal review, litigation advisory, settlement risk analysis.', decisionAuthority: 'Legal recommendation authority; final settlement per claims governance.', dataAccessScope: 'Legal evidence set and case chronology.', modulesUsed: 'Claimsfox (restricted), Reporting', trigger: 'Triggered on legal dispute or high-severity escalation.', temporaryAccess: 'Yes, mandate-scoped.' },
      { name: 'External Forensic Investigator', tenantLevel: 'Partner', functionalDescription: 'Performs forensic investigation for suspicious events.', coreResponsibilities: 'Forensic analysis, evidence chain validation, investigation report.', decisionAuthority: 'Forensic conclusion, no direct settlement control.', dataAccessScope: 'Investigation-specific evidence package only.', modulesUsed: 'Claimsfox (restricted)', trigger: 'Triggered on elevated fraud score or anomaly cluster.', temporaryAccess: 'Yes, strictly temporary.' },
      { name: 'Fraud Analyst', tenantLevel: 'Platform / MGA', functionalDescription: 'Operates fraud detection review and intervention.', coreResponsibilities: 'Case triage, fraud-pattern validation, escalation to legal/claims.', decisionAuthority: 'Fraud investigation escalation and hold recommendation.', dataAccessScope: 'Fraud scores, signals, selected claim evidence.', modulesUsed: 'AI Fox, Claimsfox, Reporting', trigger: 'Triggered by fraud.flagged and risk anomalies.', temporaryAccess: 'No (core role), with case-scoped deep view.' }
    ]
  },
  {
    title: { de: '6) CARRIER / CAPACITY PROVIDER', en: '6) CARRIER / CAPACITY PROVIDER' },
    intro: { de: 'Rollen der Kapazitätsgeber mit Oversight, Schwellenwerten und Eskalationsrechten.', en: 'Capacity-provider roles with oversight, threshold control, and escalation rights.' },
    roles: [
      { name: 'Carrier Underwriter', tenantLevel: 'Carrier', functionalDescription: 'Reviews carrier-risk view and delegated authority outcomes.', coreResponsibilities: 'Referral review, underwriting oversight, appetite alignment.', decisionAuthority: 'Approval/decline on carrier referral thresholds.', dataAccessScope: 'Referred cases, underwriting evidence, policy terms.', modulesUsed: 'Brokerfox, Reporting' },
      { name: 'Carrier Claims Supervisor', tenantLevel: 'Carrier', functionalDescription: 'Supervises claim quality for carrier-exposed portfolios.', coreResponsibilities: 'Escalated claims review, reserve oversight, outcome validation.', decisionAuthority: 'Claims governance decisions above contractual threshold.', dataAccessScope: 'Escalated claims and reserve audit views.', modulesUsed: 'Claimsfox, Reporting' },
      { name: 'Reinsurance Analyst', tenantLevel: 'Carrier', functionalDescription: 'Monitors ceded impact and exposure accumulation.', coreResponsibilities: 'Treaty utilization checks, aggregation analytics, recovery trend tracking.', decisionAuthority: 'Analytical recommendation for capacity/treaty adjustments.', dataAccessScope: 'Portfolio aggregates, event accumulations, ceded-loss analytics.', modulesUsed: 'Reporting' },
      { name: 'Capacity Approval Officer', tenantLevel: 'Carrier', functionalDescription: 'Approves or adjusts capacity commitments.', coreResponsibilities: 'Capacity thresholds, line-level approvals, escalation management.', decisionAuthority: 'Formal capacity approval within carrier governance.', dataAccessScope: 'Capacity dashboards, performance indicators, risk concentration metrics.', modulesUsed: 'Reporting, underwriting views' }
    ]
  },
  {
    title: { de: '7) REINSURANCE & FINANCIAL CONTROL', en: '7) REINSURANCE & FINANCIAL CONTROL' },
    intro: { de: 'Finanz- und Rückversicherungsrollen für Verluststeuerung, Aggregationen und Kapitalallokation.', en: 'Financial and reinsurance roles for loss control, aggregation oversight, and capital allocation.' },
    roles: [
      { name: 'Treaty Manager', tenantLevel: 'Platform / MGA', functionalDescription: 'Controls treaty performance and structure fitness.', coreResponsibilities: 'Treaty terms management, utilization controls, renewal negotiation input.', decisionAuthority: 'Treaty structure recommendations and trigger escalations.', dataAccessScope: 'Treaty metrics, cession flows, portfolio loss dynamics.', modulesUsed: 'Reporting' },
      { name: 'Actuarial Analyst', tenantLevel: 'Platform / MGA', functionalDescription: 'Evaluates profitability and risk trend assumptions.', coreResponsibilities: 'Loss-ratio analysis, trend decomposition, scenario testing.', decisionAuthority: 'Actuarial recommendation authority for pricing updates.', dataAccessScope: 'Exposure data, claim severity/frequency trends, renewal outputs.', modulesUsed: 'AI Fox, Reporting' },
      { name: 'Capital Risk Analyst', tenantLevel: 'Platform / Carrier', functionalDescription: 'Monitors capital stress and concentration risk.', coreResponsibilities: 'Aggregation exposure controls, capital stress analytics, risk limits monitoring.', decisionAuthority: 'Risk-limit escalation recommendations.', dataAccessScope: 'Aggregation cubes, catastrophe and concentration indicators.', modulesUsed: 'Reporting' },
      { name: 'Financial Controller', tenantLevel: 'Platform / Broker / MGA', functionalDescription: 'Ensures financial integrity of premium and claims flows.', coreResponsibilities: 'Financial close controls, reconciliation, management reporting.', decisionAuthority: 'Financial control sign-off and exception escalation.', dataAccessScope: 'Premium flows, claim payments, reconciliation logs.', modulesUsed: 'Reporting, finance views' }
    ]
  },
  {
    title: { de: '8) KI- & DATENROLLEN', en: '8) AI & DATA ROLES' },
    intro: { de: 'Rollen für Modelllebenszyklus, Daten-Governance, Audit und EU-AI-Act-konforme Steuerung.', en: 'Roles covering model lifecycle, data governance, audit, and EU AI Act-aligned control.' },
    roles: [
      { name: 'AI Model Owner', tenantLevel: 'Platform', functionalDescription: 'Owns business accountability for production AI models.', coreResponsibilities: 'Model objective definition, approval criteria, lifecycle sign-off.', decisionAuthority: 'Model release/freeze recommendation with governance board.', dataAccessScope: 'Model KPIs, drift metrics, explainability outcomes.', modulesUsed: 'AI Fox, Reporting' },
      { name: 'Data Scientist', tenantLevel: 'Platform', functionalDescription: 'Develops and validates predictive model logic.', coreResponsibilities: 'Feature design, model experimentation, validation and recalibration.', decisionAuthority: 'Technical model recommendation authority.', dataAccessScope: 'Training datasets, engineered features, validation sets.', modulesUsed: 'AI Fox' },
      { name: 'ML Engineer', tenantLevel: 'Platform', functionalDescription: 'Operates ML pipelines and production deployment reliability.', coreResponsibilities: 'CI/CD for models, inference performance, monitoring integration.', decisionAuthority: 'Technical deployment and rollback decisions.', dataAccessScope: 'Model artifacts, runtime telemetry, deployment traces.', modulesUsed: 'AI Fox, platform ops tooling' },
      { name: 'Risk Analytics Lead', tenantLevel: 'Platform / MGA', functionalDescription: 'Connects analytics outcomes to underwriting and claims strategy.', coreResponsibilities: 'Risk dashboard design, decision analytics, scenario interpretation.', decisionAuthority: 'Analytical steering recommendations for management.', dataAccessScope: 'Cross-domain risk metrics, portfolio and claims analytics.', modulesUsed: 'Reporting, AI Fox' },
      { name: 'AI Auditor', tenantLevel: 'Platform / Compliance', functionalDescription: 'Validates AI control compliance and traceability.', coreResponsibilities: 'Audit sampling, policy conformity checks, evidence packaging.', decisionAuthority: 'Audit findings and remediation escalation rights.', dataAccessScope: 'Model decisions, audit trails, policy versions, override logs.', modulesUsed: 'AI Fox, Reporting, governance views' }
    ]
  }
]

function bi(value: BiText, lang: 'de' | 'en') {
  return lang === 'de' ? value.de : value.en
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
    'Platform / MGA': 'Plattform / MGA',
    'Platform / Broker': 'Plattform / Makler',
    'Platform / Compliance': 'Plattform / Compliance',
    'Platform / Carrier': 'Plattform / Versicherer',
    'Broker / MGA': 'Makler / MGA',
    'Partner / Platform': 'Partner / Plattform',
    'Platform / MGA / Broker': 'Plattform / MGA / Makler'
  }
  return map[value] ?? value
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
            <Card title={t('insideInsurfox.architecture.title')}>
              <p style={pStyle}>{t('insideInsurfox.architecture.body')}</p>
              <div style={{ ...architectureDiagramStyle, marginTop: '0.75rem' }}>
                <div style={architectureNodeStyle}>Frontend Layer</div>
                <div style={architectureNodeStyle}>API Layer</div>
                <div style={architectureNodeStyle}>Event Stream (Pub/Sub)</div>
                <div style={architectureNodeStyle}>Data Layer (Cloud SQL + BigQuery)</div>
                <div style={architectureNodeStyle}>AI Layer</div>
                <div style={architectureNodeStyle}>Reporting Layer</div>
              </div>
            </Card>

            <Card title={bi({ de: '1) Plattformidentität', en: '1) Platform Identity' }, l)}>
              <h3 style={subHeadingStyle}>{bi({ de: 'Insurfox – Enterprise Insurance Operating System', en: 'Insurfox – Enterprise Insurance Operating System' }, l)}</h3>
              <p style={pStyle}>
                {bi(
                  {
                    de: 'Insurfox agiert gleichzeitig als AI-native Insurance Infrastructure as a Service (IaaS), als MGA mit delegierter Zeichnungsvollmacht, als gewerblicher Broker, als Broker-Portal-Betreiber sowie als AI Risk & Claims Engine mit Fleet- und Logistics-Intelligence.',
                    en: 'Insurfox operates simultaneously as an AI-native Insurance Infrastructure as a Service (IaaS), an MGA with delegated underwriting authority, a commercial broker, a broker portal operator, and an AI risk & claims engine with fleet and logistics intelligence.'
                  },
                  l
                )}
              </p>
              <p style={{ ...pStyle, marginTop: '0.55rem' }}>
                {bi(
                  {
                    de: 'Das Zielbild ist ein Multi-Line Commercial Insurance Operating System für DE/EU und globale Programme, das Transport Core und Logistics Composite in einer einheitlichen Ausführungsarchitektur verbindet.',
                    en: 'The target model is a multi-line commercial insurance operating system for DE/EU and global programs, connecting transport core and logistics composite in one unified execution architecture.'
                  },
                  l
                )}
              </p>
              <div style={{ ...roleCardStyle, marginTop: '0.65rem' }}>
                <h3 style={subHeadingStyle}>{bi({ de: 'Transport Core', en: 'Transport Core' }, l)}</h3>
                <p style={noteStyle}>{bi({ de: 'Carrier’s Liability, Fleet Insurance, Cargo Insurance.', en: 'Carrier’s Liability, Fleet Insurance, Cargo Insurance.' }, l)}</p>
                <h3 style={{ ...subHeadingStyle, marginTop: '0.55rem' }}>{bi({ de: 'Logistics Composite', en: 'Logistics Composite' }, l)}</h3>
                <p style={noteStyle}>{bi({ de: 'Contents, General Liability, Photovoltaic, Cyber, D&O, Legal Expenses, Electronic Equipment, Machinery, Trade Credit.', en: 'Contents, General Liability, Photovoltaic, Cyber, D&O, Legal Expenses, Electronic Equipment, Machinery, Trade Credit.' }, l)}</p>
              </div>
            </Card>

            <Card title={bi({ de: '2) Multi-Tenant-Enterprise-Modell', en: '2) Multi-Tenant Enterprise Model' }, l)}>
              <p style={pStyle}>
                {bi(
                  {
                    de: 'Die Mandantenstruktur ist dreistufig aufgebaut: Level 1 bildet den Insurfox Platform Operator, Level 2 umfasst Broker-Tenants, MGA-Programme, Carrier-Partner und Logistik-Unternehmenskunden, Level 3 steuert die internen Rollen eines Corporate Clients.',
                    en: 'The tenant structure is organized in three levels: level 1 is the Insurfox platform operator, level 2 includes broker tenants, MGA programs, carrier partners, and logistics corporate clients, and level 3 governs internal roles within each corporate client.'
                  },
                  l
                )}
              </p>
              <div style={{ ...roleCardStyle, marginTop: '0.65rem' }}>
                <p style={noteStyle}><strong>Level 1:</strong> {bi({ de: 'Insurfox Platform Operator', en: 'Insurfox platform operator' }, l)}</p>
                <p style={{ ...noteStyle, marginTop: '0.35rem' }}><strong>Level 2:</strong> {bi({ de: 'Broker Tenants, MGA Programs, Carrier Partners, Logistics Corporate Clients', en: 'Broker tenants, MGA programs, carrier partners, logistics corporate clients' }, l)}</p>
                <p style={{ ...noteStyle, marginTop: '0.35rem' }}><strong>Level 3:</strong> {bi({ de: 'Global Admin, Regional Fleet Manager, Claims Manager, Finance Officer, Driver, Warehouse Manager', en: 'Global admin, regional fleet manager, claims manager, finance officer, driver, warehouse manager' }, l)}</p>
              </div>
              <p style={{ ...pStyle, marginTop: '0.55rem' }}>
                {bi(
                  {
                    de: 'Jeder Unternehmenskunde besitzt ein eigenes Admin-Panel zur Vergabe von Modulzugriff, Daten-Sichtbarkeit, Rollenrechten, geografischem Scope, Bearbeitungsrechten für Schäden und Leserechten auf Policen. Das Zugriffsmodell kombiniert Row-Level-Isolation pro Tenant, rollenbasiertes View-Filtering und Field-Level-Masking für sensible Daten.',
                    en: 'Each corporate client has an internal admin panel to assign module access, data visibility, role permissions, geographic scope, claim editing rights, and policy view rights. The access model combines row-level tenant isolation, role-based view filtering, and field-level masking for sensitive data.'
                  },
                  l
                )}
              </p>
            </Card>

            <Card title={bi({ de: '3) End-to-End-Insurance-Lifecycle', en: '3) End-to-End Insurance Lifecycle' }, l)}>
              <div style={{ overflowX: 'auto' }}>
                <table style={tableStyle}>
                  <thead>
                    <tr style={headRowStyle}>
                      <th style={thStyle}>#</th>
                      <th style={thStyle}>{bi({ de: 'Schritt', en: 'Step' }, l)}</th>
                      <th style={thStyle}>{bi({ de: 'Rollen', en: 'Roles involved' }, l)}</th>
                      <th style={thStyle}>{bi({ de: 'Erzeugte Daten', en: 'Data created' }, l)}</th>
                      <th style={thStyle}>{bi({ de: 'AI-Nutzung', en: 'AI usage' }, l)}</th>
                      <th style={thStyle}>{bi({ de: 'Events', en: 'Events emitted' }, l)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['1', { de: 'Plattform-Registrierung', en: 'Platform Registration' }, { de: 'Platform Owner, Tenant Admin', en: 'Platform owner, tenant admin' }, { de: 'Tenant-Metadaten, Vertrags- und Compliance-Profil', en: 'Tenant metadata, contract and compliance profile' }, { de: 'Policy-basierte Onboarding-Prüfung', en: 'Policy-based onboarding checks' }, 'tenant.registered'],
                      ['2', { de: 'Makler-Onboarding', en: 'Broker Onboarding' }, { de: 'Broker, Operations', en: 'Broker, operations' }, { de: 'Brokerkonto, Vollmachten, API-Setup', en: 'Broker account, authority mapping, API setup' }, { de: 'Dokument- und Konsistenzprüfung', en: 'Document and consistency checks' }, 'broker.onboarded'],
                      ['3', { de: 'Unternehmenskunden-Onboarding', en: 'Corporate Client Onboarding' }, { de: 'Broker, Client Admin', en: 'Broker, client admin' }, { de: 'Organisationseinheiten, User-Gruppen, Regionen', en: 'Organization units, user groups, regions' }, { de: 'Rollen-/Berechtigungs-Vorschläge', en: 'Role and permission recommendations' }, 'organization.created'],
                      ['4', { de: 'Risikoeinreichung (Fleet, Cargo, Composite)', en: 'Risk Submission (Fleet, Cargo, Composite)' }, { de: 'Broker, Corporate Client', en: 'Broker, corporate client' }, { de: 'Risk Objects, Deckungswunsch, Exposure-Daten', en: 'Risk objects, coverage request, exposure data' }, { de: 'Datenqualitäts-Scoring', en: 'Data quality scoring' }, 'submission.created'],
                      ['5', { de: 'AI-Pre-Scoring', en: 'AI Pre-Scoring' }, { de: 'MGA UW Team, AI Core', en: 'MGA underwriting team, AI core' }, { de: 'Fleet/Cargo/Composite Risk Scores', en: 'Fleet/cargo/composite risk scores' }, { de: 'Vorläufige Risikoklassifikation', en: 'Preliminary risk classification' }, 'risk.scored'],
                      ['6', { de: 'Underwriting-Entscheidung (MGA oder Carrier)', en: 'Underwriting Decision (MGA or Carrier)' }, { de: 'MGA, Carrier Underwriter', en: 'MGA, carrier underwriter' }, { de: 'Pricing-Korridor, Referral-Flags, Zeichnungsentscheid', en: 'Pricing corridor, referral flags, underwriting decision' }, { de: 'Entscheidungsunterstützung & Explainability', en: 'Decision support and explainability' }, 'underwriting.decisioned'],
                      ['7', { de: 'Policierung', en: 'Policy Issuance' }, { de: 'Broker, Policy Ops', en: 'Broker, policy ops' }, { de: 'Police, Endorsement-Basis, Dokumente', en: 'Policy, endorsement baseline, documents' }, { de: 'Dokumenten-Konsistenzcheck', en: 'Document consistency checks' }, 'policy.bound'],
                      ['8', { de: 'Interner Client-Rollenzugriff', en: 'Internal Client Role Access' }, { de: 'Client Admin, Internal Users', en: 'Client admin, internal users' }, { de: 'Rollenfreigaben, Scope-Mappings', en: 'Role grants, scope mappings' }, { de: 'Anomalie-Hinweise bei Rechten', en: 'Anomaly hints on access rights' }, 'access.scope.updated'],
                      ['9', { de: 'Shipment- & Fleet-Monitoring', en: 'Shipment & Fleet Monitoring' }, { de: 'Fleet Manager, Driver, AI Core', en: 'Fleet manager, driver, AI core' }, { de: 'Telematik, Shipment-Legs, Verhaltenssignale', en: 'Telematics, shipment legs, behavior signals' }, { de: 'Laufendes Risk Re-Scoring', en: 'Continuous risk re-scoring' }, 'shipment.declared'],
                      ['10', { de: 'FNOL', en: 'FNOL' }, { de: 'Driver, Claims Manager', en: 'Driver, claims manager' }, { de: 'Schadenmeldung, Erstbelege, Kontextdaten', en: 'First notice of loss, evidence, context data' }, { de: 'Priorisierung nach Schweregrad', en: 'Severity-based prioritization' }, 'claim.created'],
                      ['11', { de: 'AI-Schadenscan', en: 'AI Damage Scan' }, { de: 'Claims AI, Adjuster', en: 'Claims AI, adjuster' }, { de: 'Bildmerkmale, Schadenshypothesen', en: 'Image features, damage hypotheses' }, { de: 'Vision Damage Detection', en: 'Vision damage detection' }, 'scan.completed'],
                      ['12', { de: 'Betrugs-Scoring', en: 'Fraud Scoring' }, { de: 'Claims AI, Fraud Team', en: 'Claims AI, fraud team' }, { de: 'Betrugsindikatoren, Anomaliecluster', en: 'Fraud indicators, anomaly clusters' }, { de: 'Loss Pattern Matching', en: 'Loss pattern matching' }, 'fraud.flagged'],
                      ['13', { de: 'Partnerzuweisung', en: 'Partner Assignment' }, { de: 'Claims Manager, Partner Network', en: 'Claims manager, partner network' }, { de: 'Dispatch-Daten, SLA-Priorität', en: 'Dispatch data, SLA priority' }, { de: 'Match gegen Partnerprofil', en: 'Match against partner profile' }, 'partner.assigned'],
                      ['14', { de: 'Regulierung', en: 'Settlement' }, { de: 'Claims, Finance Officer', en: 'Claims, finance officer' }, { de: 'Reserve, Auszahlungsdatensatz, Abschlussstatus', en: 'Reserve, payout record, closure status' }, { de: 'Leakage-/Outlier-Prüfung', en: 'Leakage and outlier checks' }, 'claim.settled'],
                      ['15', { de: 'Reporting & Portfolio-Steuerung', en: 'Reporting & Portfolio Steering' }, { de: 'Management, Carrier, MGA', en: 'Management, carrier, MGA' }, { de: 'Loss Ratio, Segment-Marge, Kumulationssicht', en: 'Loss ratio, segment margin, accumulation view' }, { de: 'Forecasting & Renewal-Signale', en: 'Forecasting and renewal signals' }, 'report.generated'],
                      ['16', { de: 'Erneuerung / Verlängerung', en: 'Renewal / Prolongation' }, { de: 'Broker, MGA, Carrier, Client', en: 'Broker, MGA, carrier, client' }, { de: 'Renewal Score, Konditionsvorschlag', en: 'Renewal score, terms proposal' }, { de: 'Renewal Optimization', en: 'Renewal optimization' }, 'renewal.generated']
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

            <Card title={bi({ de: '4) Rollenbasierte Access-Architektur', en: '4) Role-Based Access Architecture' }, l)}>
              <p style={pStyle}>
                {bi(
                  {
                    de: 'Das Enterprise-IAM-Modell basiert auf den Entitäten tenants, organizations, user_accounts, roles, permissions und user_role_assignments. Berechtigungen werden dynamisch über Plattform-, Broker- und Client-Level zugewiesen.',
                    en: 'The enterprise IAM model is based on entities tenants, organizations, user_accounts, roles, permissions, and user_role_assignments. Permissions are dynamically assigned across platform, broker, and client levels.'
                  },
                  l
                )}
              </p>
              <div style={{ ...roleCardStyle, marginTop: '0.65rem' }}>
                <p style={noteStyle}><strong>{bi({ de: 'Driver', en: 'Driver' }, l)}:</strong> {bi({ de: 'darf Schaden melden, Fotos hochladen und eigene Vorfälle einsehen.', en: 'can submit claims, upload photos, and view own incidents.' }, l)}</p>
                <p style={{ ...noteStyle, marginTop: '0.35rem' }}><strong>{bi({ de: 'Regional Fleet Manager', en: 'Regional Fleet Manager' }, l)}:</strong> {bi({ de: 'sieht regionale Fahrzeuge, Schäden und Flottenreports.', en: 'can view regional vehicles, claims, and fleet reports.' }, l)}</p>
                <p style={{ ...noteStyle, marginTop: '0.35rem' }}><strong>{bi({ de: 'Finance Officer', en: 'Finance Officer' }, l)}:</strong> {bi({ de: 'sieht Rechnungen und Prämienabrechnungen.', en: 'can view invoices and premium statements.' }, l)}</p>
              </div>
              <p style={{ ...pStyle, marginTop: '0.55rem' }}>
                {bi(
                  {
                    de: 'Der interne Client-Admin steuert Rechte pro Modul, Region und Funktion. Dadurch bleiben operative Rollen fokussiert, während Governance und Datenhoheit tenant-spezifisch erhalten bleiben.',
                    en: 'The internal client admin controls rights per module, region, and function. This keeps operational roles focused while preserving tenant-specific governance and data ownership.'
                  },
                  l
                )}
              </p>
            </Card>

            <Card title={bi({ de: '5) Erweitertes Datenmodell', en: '5) Extended Data Model' }, l)}>
              <p style={pStyle}>
                {bi(
                  {
                    de: 'Die Domänenmodellierung basiert auf dem abstrakten RiskObject, das in operative Risikotypen für Transport und Composite aufgelöst wird.',
                    en: 'Domain modeling is based on an abstract RiskObject that is specialized into operational risk types for transport and composite lines.'
                  },
                  l
                )}
              </p>
              <MermaidBlock title={bi({ de: 'RiskObject-Abstraktion', en: 'RiskObject Abstraction' }, l)} code={`flowchart TB
  R[RiskObject]
  R --> V[Vehicle]
  R --> S[Shipment]
  R --> W[Warehouse]
  R --> B[Building]
  R --> A[Asset]
  R --> D[Director]
  R --> C[CreditExposure]`} />
              <div style={{ ...roleCardStyle, marginTop: '0.65rem' }}>
                <p style={noteStyle}><strong>{bi({ de: 'Transport', en: 'Transport' }, l)}:</strong> <code>vehicles</code>, <code>drivers</code>, <code>shipments</code>, <code>shipment_legs</code></p>
                <p style={{ ...noteStyle, marginTop: '0.35rem' }}><strong>{bi({ de: 'Composite', en: 'Composite' }, l)}:</strong> <code>assets</code>, <code>locations</code>, <code>machinery_profiles</code>, <code>cyber_profiles</code>, <code>directors</code>, <code>credit_exposures</code></p>
                <p style={{ ...noteStyle, marginTop: '0.35rem' }}><strong>{bi({ de: 'Governance', en: 'Governance' }, l)}:</strong> <code>policies</code>, <code>endorsements</code>, <code>renewals</code>, <code>claims</code>, <code>claim_photos</code>, <code>ai_runs</code>, <code>timeline_events</code></p>
              </div>
              <p style={{ ...pStyle, marginTop: '0.55rem' }}>
                {bi(
                  {
                    de: 'Cloud Spanner dient als primäre verteilte Datenbank mit Multi-Region-Konfiguration, starker Konsistenz, tenant-orientierter Partitionierung und hoher Write-Throughput-Fähigkeit für ereignisintensive Versicherungsprozesse.',
                    en: 'Cloud Spanner is the primary distributed database with multi-region configuration, strong consistency, tenant-oriented partitioning, and high write-throughput for event-intensive insurance operations.'
                  },
                  l
                )}
              </p>
            </Card>

            <Card title={bi({ de: '6) Event-Driven Core', en: '6) Event-Driven Core' }, l)}>
              <p style={pStyle}>
                {bi(
                  {
                    de: 'Der fachliche Kern ist event-getrieben über Pub/Sub orchestriert. Services verarbeiten idempotent, speichern Prozessstände deterministisch und unterstützen Event-Replay für Recovery, Audit und Modell-Retraining.',
                    en: 'The business core is orchestrated via Pub/Sub in an event-driven architecture. Services process idempotently, persist deterministic process states, and support event replay for recovery, audit, and model retraining.'
                  },
                  l
                )}
              </p>
              <div style={{ ...roleCardStyle, marginTop: '0.65rem' }}>
                <p style={noteStyle}><code>submission.created</code>, <code>risk.scored</code>, <code>policy.bound</code>, <code>shipment.declared</code>, <code>claim.created</code>, <code>scan.completed</code>, <code>fraud.flagged</code>, <code>renewal.generated</code></p>
              </div>
            </Card>

            <Card title={bi({ de: '7) AI-Core-Architektur', en: '7) AI Core Architecture' }, l)}>
              <p style={pStyle}>
                {bi(
                  {
                    de: 'Underwriting AI umfasst Fleet Risk Score, Cargo Risk Score und Composite Risk Aggregation. Claims AI liefert Vision Damage Detection, Fraud Detection und Loss Pattern Matching. Portfolio AI steuert Loss-Ratio-Forecast, Renewal-Optimierung und Accumulation-Risk-Engine.',
                    en: 'Underwriting AI covers fleet risk score, cargo risk score, and composite risk aggregation. Claims AI provides vision damage detection, fraud detection, and loss pattern matching. Portfolio AI drives loss ratio forecasting, renewal optimization, and accumulation risk engine.'
                  },
                  l
                )}
              </p>
              <div style={flowGridStyle}>
                {[
                  { de: 'Datenaufnahme', en: 'Data ingestion' },
                  { de: 'Feature Engineering', en: 'Feature engineering' },
                  { de: 'Training', en: 'Training' },
                  { de: 'Modell-Registry', en: 'Model registry' },
                  { de: 'Deployment', en: 'Deployment' },
                  { de: 'Monitoring', en: 'Monitoring' },
                  { de: 'Human Override', en: 'Human override' }
                ].map((step, idx) => (
                  <div key={step.en} style={flowItemStyle}>
                    <div style={flowIndexStyle}>{idx + 1}</div>
                    <div style={flowLabelStyle}>{bi(step, l)}</div>
                  </div>
                ))}
              </div>
              <p style={{ ...noteStyle, marginTop: '0.55rem' }}>
                {bi(
                  {
                    de: 'AI-Governance enthält EU-AI-Act-Readiness, Human Override, Audit Logging und Explainability-Layer für regulatorisch belastbare Entscheidungen.',
                    en: 'AI governance includes EU AI Act readiness, human override, audit logging, and an explainability layer for regulatorily defensible decisions.'
                  },
                  l
                )}
              </p>
            </Card>

            <Card title={bi({ de: '8) GCP-Cloud-Architektur', en: '8) GCP Cloud Architecture' }, l)}>
              <p style={pStyle}>
                {bi(
                  {
                    de: 'Das Architekturziel kombiniert React SPA auf CDN mit Cloud-Run-Microservices hinter API Gateway. Eventing läuft über Pub/Sub; persistente Kernprozesse liegen in Cloud Spanner, Dokumente in Cloud Storage, Analytics in BigQuery und Modelle in Vertex AI.',
                    en: 'The architecture combines a React SPA on CDN with Cloud Run microservices behind API Gateway. Eventing is handled by Pub/Sub; persistent core processes run in Cloud Spanner, documents in Cloud Storage, analytics in BigQuery, and models in Vertex AI.'
                  },
                  l
                )}
              </p>
              <p style={{ ...pStyle, marginTop: '0.55rem' }}>
                {bi(
                  {
                    de: 'Shared VPC, getrennte Umgebungen (prod/staging/dev), Folder-Struktur, Multi-Region-Replikation, Cloud Armor und Load Balancer bilden die Grundlage für globalen Enterprise-Betrieb.',
                    en: 'Shared VPC, separated environments (prod/staging/dev), folder structure, multi-region replication, Cloud Armor, and load balancing form the foundation for global enterprise operations.'
                  },
                  l
                )}
              </p>
              <MermaidBlock title={bi({ de: 'Context Diagram', en: 'Context Diagram' }, l)} code={`flowchart LR
  Broker[Broker] --> Platform[Insurfox Platform]
  Carrier[Carrier] --> Platform
  Logistics[Logistics Client] --> Platform
  Driver[Driver] --> Platform
  Partner[Partner Network] --> Platform
  APIs[External APIs] --> Platform`} />
              <MermaidBlock title={bi({ de: 'Container Diagram', en: 'Container Diagram' }, l)} code={`flowchart TB
  FE[React SPA / CDN] --> APIGW[API Gateway]
  APIGW --> RUN[Cloud Run Microservices]
  RUN --> BUS[Pub/Sub]
  RUN --> SP[(Cloud Spanner)]
  RUN --> ST[(Cloud Storage)]
  RUN --> BQ[(BigQuery)]
  RUN --> VAI[Vertex AI]
  RUN --> SM[Secret Manager]
  RUN --> IAM[IAM]
  APIGW --> LB[Load Balancer]
  LB --> ARM[Cloud Armor]`} />
              <MermaidBlock title={bi({ de: 'Deployment Diagram', en: 'Deployment Diagram' }, l)} code={`flowchart TB
  ORG[GCP Organization]
  ORG --> PROD[Folder: prod]
  ORG --> STAGE[Folder: staging]
  ORG --> DEV[Folder: dev]
  PROD --> NET[shared-vpc-prod]
  PROD --> CORE[platform-core-prod]
  PROD --> DATA[data-platform-prod]
  PROD --> ML[ml-platform-prod]
  NET --> VPC[Shared VPC]
  VPC --> RUN[Cloud Run services]
  VPC --> LB[Global Load Balancer]
  LB --> ARM[Cloud Armor]
  DATA --> SPN[Spanner multi-region]
  DATA --> BQD[BigQuery datasets]
  ML --> VEP[Vertex AI endpoints]`} />
            </Card>

            <Card title={bi({ de: '9) Security & Data Governance', en: '9) Security & Data Governance' }, l)}>
              <p style={pStyle}>
                {bi(
                  {
                    de: 'Die Sicherheitsarchitektur folgt Zero-Trust-Prinzipien mit rollenbasierter Zugriffskontrolle, Row-Level-Filtering und Field-Level-Masking. Verschlüsselung erfolgt at rest und in transit; Audit Trails sowie zentrales Logging und Monitoring sichern Nachvollziehbarkeit und Betriebsstabilität.',
                    en: 'The security architecture follows zero-trust principles with role-based access control, row-level filtering, and field-level masking. Encryption is enforced at rest and in transit; audit trails and centralized logging and monitoring ensure traceability and operational stability.'
                  },
                  l
                )}
              </p>
              <p style={{ ...pStyle, marginTop: '0.55rem' }}>
                {bi(
                  {
                    de: 'Der Governance-Rahmen ist auf Compliance-Readiness für internationale Programme ausgelegt und unterstützt regulatorische Prüfpfade ohne Medienbruch.',
                    en: 'The governance framework is designed for compliance readiness across international programs and supports regulatory audit paths without process breaks.'
                  },
                  l
                )}
              </p>
            </Card>

            <Card title={bi({ de: '10) Strategische Positionierung', en: '10) Strategic Positioning' }, l)}>
              <p style={pStyle}>
                {bi(
                  {
                    de: 'Insurfox ist nicht nur ein SaaS-Tool. Die Plattform vereint MGA, Broker, Infrastruktur und AI Risk Operator in einem Enterprise Insurance Backbone und verbindet Vertrieb, Zeichnung, Schaden und Portfoliosteuerung in einer operativen Einheit.',
                    en: 'Insurfox is not just a SaaS tool. The platform combines MGA, broker, infrastructure, and AI risk operator capabilities into one enterprise insurance backbone, connecting distribution, underwriting, claims, and portfolio steering in a single operating unit.'
                  },
                  l
                )}
              </p>
              <p style={{ ...pStyle, marginTop: '0.55rem' }}>
                {bi(
                  {
                    de: 'Damit differenziert sich Insurfox strukturell gegenüber Claims-only-Lösungen, Broker-only-Plattformen und Underwriting-only-Systemen durch eine durchgängige End-to-End-Execution mit Multi-Tenant- und Multi-Role-Fähigkeit.',
                    en: 'This structurally differentiates Insurfox from claims-only tools, broker-only platforms, and underwriting-only systems by delivering end-to-end execution with multi-tenant and multi-role capability.'
                  },
                  l
                )}
              </p>
            </Card>

            <Card title={bi({ de: '11) Enterprise Permission Matrix & Multi-Tenant Access Control', en: '11) Enterprise Permission Matrix & Multi-Tenant Access Control' }, l)}>
              <h3 style={subHeadingStyle}>{bi({ de: 'Multi-Level Access Model', en: 'Multi-Level Access Model' }, l)}</h3>
              <p style={pStyle}>
                {bi(
                  {
                    de: 'Das Berechtigungsmodell ist hierarchisch und tenantfähig aufgebaut: Platform Level (Insurfox Operator), Broker Level, Corporate Client Level und Internal Client Role Level. Jede Ebene erweitert Rechte nur innerhalb ihres Governance-Scope.',
                    en: 'The permission model is hierarchical and tenant-aware: platform level (Insurfox operator), broker level, corporate client level, and internal client role level. Each level can extend access only within its governance scope.'
                  },
                  l
                )}
              </p>
              <h3 style={{ ...subHeadingStyle, marginTop: '0.65rem' }}>{bi({ de: 'Hybrid RBAC + ABAC', en: 'Hybrid RBAC + ABAC' }, l)}</h3>
              <p style={noteStyle}>
                {bi(
                  {
                    de: 'RBAC steuert Rollenrechte (z. B. claim.edit, policy.read). ABAC filtert zur Laufzeit über Attribute wie region, location, object_type und tenant_id.',
                    en: 'RBAC governs role permissions (e.g., claim.edit, policy.read). ABAC applies runtime filters using attributes such as region, location, object_type, and tenant_id.'
                  },
                  l
                )}
              </p>
              <div style={{ ...roleCardStyle, marginTop: '0.65rem' }}>
                <p style={noteStyle}><strong>{bi({ de: 'Permission Layers', en: 'Permission Layers' }, l)}:</strong> {bi({ de: 'Module access, Action permissions, Data scope permissions, Object-level filtering, Field-level masking.', en: 'Module access, action permissions, data scope permissions, object-level filtering, field-level masking.' }, l)}</p>
              </div>

              <MermaidBlock
                title={bi({ de: 'Autorisierungs-Schema (logisch)', en: 'Authorization Schema (logical)' }, l)}
                code={`erDiagram
  tenants ||--o{ organizations : has
  organizations ||--o{ users : contains
  roles ||--o{ role_permissions : grants
  permissions ||--o{ role_permissions : maps
  users ||--o{ user_roles : assigned
  roles ||--o{ user_roles : linked
  users ||--o{ permission_audit_log : triggers
  permissions ||--o{ permission_audit_log : references`}
              />

              <div style={{ overflowX: 'auto', marginTop: '0.65rem' }}>
                <table style={tableStyle}>
                  <thead>
                    <tr style={headRowStyle}>
                      <th style={thStyle}>{bi({ de: 'Rolle', en: 'Role' }, l)}</th>
                      <th style={thStyle}>Module</th>
                      <th style={thStyle}>{bi({ de: 'Aktionen', en: 'Actions' }, l)}</th>
                      <th style={thStyle}>{bi({ de: 'Datenscope', en: 'Data scope' }, l)}</th>
                      <th style={thStyle}>{bi({ de: 'Objektfilter', en: 'Object filtering' }, l)}</th>
                      <th style={thStyle}>{bi({ de: 'Feldmaskierung', en: 'Field masking' }, l)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [{ de: 'Driver', en: 'Driver' }, 'FNOL', { de: 'create_claim, upload_photo, read_own_claim', en: 'create_claim, upload_photo, read_own_claim' }, { de: 'own_user_id', en: 'own_user_id' }, { de: 'vehicle_id in assigned_vehicles', en: 'vehicle_id in assigned_vehicles' }, { de: 'Finanz-/Policydaten maskiert', en: 'Finance/policy fields masked' }],
                      [{ de: 'Regional Fleet Manager', en: 'Regional Fleet Manager' }, 'Fleetfox, Claimsfox', { de: 'read_claim, read_fleet_report, assign_task', en: 'read_claim, read_fleet_report, assign_task' }, { de: 'region in user_regions', en: 'region in user_regions' }, { de: 'location and fleet_cluster filters', en: 'location and fleet_cluster filters' }, { de: 'PII teilmaskiert', en: 'PII partially masked' }],
                      [{ de: 'Claims Manager', en: 'Claims Manager' }, 'Claimsfox', { de: 'edit_claim, reserve_update, settlement_approve', en: 'edit_claim, reserve_update, settlement_approve' }, { de: 'tenant + claims_domain', en: 'tenant + claims_domain' }, { de: 'claim_state and partner_scope', en: 'claim_state and partner_scope' }, { de: 'Bankdaten maskiert', en: 'Bank details masked' }],
                      [{ de: 'Finance Officer', en: 'Finance Officer' }, 'Finance, Reporting', { de: 'read_invoice, read_statement, export_report', en: 'read_invoice, read_statement, export_report' }, { de: 'tenant + finance_scope', en: 'tenant + finance_scope' }, { de: 'document_type=finance', en: 'document_type=finance' }, { de: 'Schadendetails maskiert', en: 'Claim details masked' }],
                      [{ de: 'Broker Admin', en: 'Broker Admin' }, 'Brokerfox', { de: 'manage_client, submit_risk, read_policy', en: 'manage_client, submit_risk, read_policy' }, { de: 'broker_id + tenant scope', en: 'broker_id + tenant scope' }, { de: 'assigned_clients only', en: 'assigned_clients only' }, { de: 'Carrier-internes Pricing maskiert', en: 'Carrier internal pricing masked' }],
                      [{ de: 'MGA Underwriter', en: 'MGA Underwriter' }, 'Underwriting, Claims', { de: 'risk_decide, pricing_edit, referral_handle', en: 'risk_decide, pricing_edit, referral_handle' }, { de: 'program_id + authority_band', en: 'program_id + authority_band' }, { de: 'line_of_business and limit caps', en: 'line_of_business and limit caps' }, { de: 'nur notwendige PII sichtbar', en: 'need-to-know PII only' }],
                      [{ de: 'Platform Admin', en: 'Platform Admin' }, 'All', { de: 'tenant_admin, policy_admin, iam_admin', en: 'tenant_admin, policy_admin, iam_admin' }, { de: 'cross-tenant by explicit break-glass policy', en: 'cross-tenant by explicit break-glass policy' }, { de: 'full governance scope', en: 'full governance scope' }, { de: 'unmasking nur per auditierter Freigabe', en: 'unmasking only via audited approval' }]
                    ].map((row) => (
                      <tr key={(row[0] as BiText).en}>
                        <td style={tdStrongStyle}>{bi(row[0] as BiText, l)}</td>
                        <td style={tdStyle}>{row[1] as string}</td>
                        <td style={tdStyle}>{bi(row[2] as BiText, l)}</td>
                        <td style={tdStyle}>{bi(row[3] as BiText, l)}</td>
                        <td style={tdStyle}>{bi(row[4] as BiText, l)}</td>
                        <td style={tdStyle}>{bi(row[5] as BiText, l)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 style={{ ...subHeadingStyle, marginTop: '0.7rem' }}>{bi({ de: 'Runtime Permission Evaluation', en: 'Runtime Permission Evaluation' }, l)}</h3>
              <p style={noteStyle}>
                {bi(
                  {
                    de: '1) User authentifizieren. 2) Rollen aus user_roles laden. 3) Aktionen über role_permissions auflösen. 4) ABAC-Filter aus Tenant/Region/Object anwenden. 5) Feldmaskierung anwenden. 6) Entscheidung und Kontext in permission_audit_log protokollieren.',
                    en: '1) Authenticate user. 2) Load roles from user_roles. 3) Resolve actions via role_permissions. 4) Apply ABAC filters from tenant/region/object attributes. 5) Apply field masking. 6) Log decision context into permission_audit_log.'
                  },
                  l
                )}
              </p>

              <h3 style={{ ...subHeadingStyle, marginTop: '0.7rem' }}>{bi({ de: 'Row-Level-Filtering in Cloud Spanner', en: 'Row-Level Filtering in Cloud Spanner' }, l)}</h3>
              <p style={noteStyle}>
                {bi(
                  {
                    de: 'Alle Abfragen werden mit tenant_id als Pflichtprädikat ausgeführt. Zusätzliche ABAC-Filter (region, organization_id, object scope) werden serverseitig erzwungen. Ergebnis: kein Cross-Tenant-Read ohne explizite, auditierte Break-Glass-Freigabe.',
                    en: 'All queries enforce tenant_id as a mandatory predicate. Additional ABAC filters (region, organization_id, object scope) are applied server-side. Result: no cross-tenant reads without explicit, audited break-glass approval.'
                  },
                  l
                )}
              </p>

              <h3 style={{ ...subHeadingStyle, marginTop: '0.7rem' }}>{bi({ de: 'Audit Logging & Compliance', en: 'Audit Logging & Compliance' }, l)}</h3>
              <p style={noteStyle}>
                {bi(
                  {
                    de: 'permission_audit_log erfasst Subject, Action, Resource, Decision, Policy-Version, Zeitstempel und Begründung. Damit werden interne Kontrollanforderungen, regulatorische Prüfpfade und Forensik für Datenschutz- und Versicherungs-Compliance unterstützt.',
                    en: 'permission_audit_log records subject, action, resource, decision, policy version, timestamp, and rationale. This supports internal controls, regulatory audit trails, and forensic requirements for privacy and insurance compliance.'
                  },
                  l
                )}
              </p>
            </Card>
          </>
        )}

        {section === 'app-architecture' && (
          <>
            <Card title={bi({ de: '1) ARCHITEKTONISCHE VISION', en: '1) ARCHITECTURAL VISION' }, l)}>
              <h3 style={subHeadingStyle}>{bi({ de: 'Hybrid Web + Native Architecture for Insurfox', en: 'Hybrid Web + Native Architecture for Insurfox' }, l)}</h3>
              <p style={pStyle}>
                {bi(
                  {
                    de: 'Insurfox folgt einem One-Platform-Modell mit einem Backend, einer API und rollenbasierter UI-Aussteuerung für MGA, Broker und Corporate Clients in einer Multi-Tenant-Architektur.',
                    en: 'Insurfox follows a one-platform model with one backend, one API, and role-based UI rendering for MGA, broker, and corporate clients in a multi-tenant architecture.'
                  },
                  l
                )}
              </p>
              <p style={{ ...pStyle, marginTop: '0.55rem' }}>
                {bi(
                  {
                    de: 'Claimsfox, Brokerfox, Fleetfox, Partnerfox und AI Fox sind Feature-Domänen innerhalb derselben Anwendung und nicht separate Apps. Für Mobile wird ein einzelner App-Store-Client betrieben.',
                    en: 'Claimsfox, Brokerfox, Fleetfox, Partnerfox, and AI Fox are feature domains inside one application, not separate apps. Mobile is delivered through one single app-store client.'
                  },
                  l
                )}
              </p>
            </Card>

            <Card title={bi({ de: '2) SYSTEMÜBERSICHT', en: '2) HIGH-LEVEL SYSTEM OVERVIEW' }, l)}>
              <MermaidBlock
                title={bi({ de: 'Systemübersicht', en: 'System Overview' }, l)}
                code={`flowchart LR
  WEB[Web App React SPA] --> GW[API Gateway]
  MOB[Mobile App React Native] --> GW
  GW --> RUN[Cloud Run Services]
  RUN --> SP[(Cloud Spanner)]
  RUN --> BUS[Pub/Sub]
  RUN --> ST[(Cloud Storage)]
  RUN --> BQ[(BigQuery)]
  RUN --> AI[Vertex AI]`}
              />
              <p style={{ ...noteStyle, marginTop: '0.55rem' }}>
                {bi(
                  {
                    de: 'Web und Mobile nutzen eine gemeinsame API-Schicht. Backend-Services arbeiten event-getrieben und tenant-aware.',
                    en: 'Web and mobile share the same API layer. Backend services are event-driven and tenant-aware.'
                  },
                  l
                )}
              </p>
            </Card>

            <Card title={bi({ de: '3) FRONTEND-ARCHITEKTUR', en: '3) FRONTEND ARCHITECTURE' }, l)}>
              <div style={{ ...roleCardStyle, marginBottom: '0.6rem' }}>
                <pre style={mermaidPreStyle}>
                  <code>{`apps/
  web/
  mobile/
packages/
  ui/
  auth/
  permissions/
  api-client/`}</code>
                </pre>
              </div>
              <p style={pStyle}>
                {bi(
                  {
                    de: 'Die Monorepo-Strategie konsolidiert UI-Komponenten, Auth-Logik, Permission Engine und API-Client. Navigation und Modul-Rendering werden zur Laufzeit über JWT-basierte Rechte gesteuert.',
                    en: 'The monorepo strategy consolidates UI components, auth logic, permission engine, and API client. Navigation and module rendering are controlled at runtime via JWT-based permissions.'
                  },
                  l
                )}
              </p>
            </Card>

            <Card title={bi({ de: '4) MOBILE-ARCHITEKTUR', en: '4) MOBILE ARCHITECTURE' }, l)}>
              <p style={pStyle}>
                {bi(
                  {
                    de: 'Mobile basiert auf React Native (Expo mit Übergang auf Bare Workflow für Enterprise-Anforderungen). Offline-Fähigkeit umfasst FNOL, Foto-Upload und Standorterfassung.',
                    en: 'Mobile is based on React Native (Expo with transition to Bare Workflow for enterprise requirements). Offline capability includes FNOL, photo upload, and location capture.'
                  },
                  l
                )}
              </p>
              <p style={{ ...noteStyle, marginTop: '0.45rem' }}>
                {bi(
                  {
                    de: 'Offline-Sync-Modell: lokale SQLite-Persistenz, Queue-System, Retry bei Reconnect, Background-Sync mit Konfliktauflösung per serverseitigem Timestamp.',
                    en: 'Offline sync model: local SQLite persistence, queue system, retry on reconnect, background sync with server-side timestamp conflict resolution.'
                  },
                  l
                )}
              </p>
            </Card>

            <Card title={bi({ de: '5) AUTHENTIFIZIERUNG & ROLLENMODELL', en: '5) AUTHENTICATION & ROLE MODEL' }, l)}>
              <p style={pStyle}>
                {bi(
                  {
                    de: 'Authentifizierung erfolgt über OAuth2/OIDC. Das JWT enthält tenant_id, role_ids, module_permissions, region_scope und field_mask_rules.',
                    en: 'Authentication uses OAuth2/OIDC. The JWT contains tenant_id, role_ids, module_permissions, region_scope, and field_mask_rules.'
                  },
                  l
                )}
              </p>
              <div style={{ ...roleCardStyle, marginTop: '0.6rem' }}>
                <pre style={mermaidPreStyle}>
                  <code>{`const canAccess = (token, action, resource) => {
  const hasRolePermission = token.module_permissions.includes(action)
  const inScope = resource.tenant_id === token.tenant_id
    && token.region_scope.includes(resource.region)
  return hasRolePermission && inScope
}`}</code>
                </pre>
              </div>
            </Card>

            <Card title={bi({ de: '6) BACKEND-SERVICE-LAYER', en: '6) BACKEND SERVICE LAYER' }, l)}>
              <p style={pStyle}>
                {bi(
                  {
                    de: 'Cloud-Run-Microservices: auth-service, policy-service, claims-service, fleet-service, cargo-service, partner-service, reporting-service und ai-service. Alle Services sind tenant-aware und erzwingen Berechtigungsprüfungen serverseitig.',
                    en: 'Cloud Run microservices: auth-service, policy-service, claims-service, fleet-service, cargo-service, partner-service, reporting-service, and ai-service. All services are tenant-aware and enforce permission checks server-side.'
                  },
                  l
                )}
              </p>
            </Card>

            <Card title={bi({ de: '7) EREIGNISGETRIEBENE ARCHITEKTUR', en: '7) EVENT-DRIVEN ARCHITECTURE' }, l)}>
              <p style={pStyle}>
                {bi(
                  {
                    de: 'Alle Domänenevents werden über Pub/Sub publiziert. Konsumenten verarbeiten idempotent (dedupe_key) und unterstützen Replay für Recovery, Reprocessing und Audit.',
                    en: 'All domain events are published via Pub/Sub. Consumers process idempotently (dedupe_key) and support replay for recovery, reprocessing, and audit.'
                  },
                  l
                )}
              </p>
              <MermaidBlock
                title={bi({ de: 'Event Flow', en: 'Event Flow' }, l)}
                code={`flowchart LR
  C[claim.created] --> BUS[Pub/Sub]
  B[policy.bound] --> BUS
  R[renewal.generated] --> BUS
  S[scan.completed] --> BUS
  BUS --> CS[claims-service]
  BUS --> RS[reporting-service]
  BUS --> AIS[ai-service]`}
              />
            </Card>

            <Card title={bi({ de: '8) AI-INTEGRATIONSFLUSS', en: '8) AI INTEGRATION FLOW' }, l)}>
              <MermaidBlock
                title={bi({ de: 'Mobile-to-AI-Pipeline', en: 'Mobile-to-AI Pipeline' }, l)}
                code={`flowchart LR
  M[Mobile App] --> U[Image Upload]
  U --> ST[Cloud Storage]
  ST --> BUS[Pub/Sub]
  BUS --> AI[AI Service]
  AI --> TL[Timeline Event]
  TL --> APP[Web/Mobile App]`}
              />
              <p style={{ ...noteStyle, marginTop: '0.55rem' }}>
                {bi(
                  {
                    de: 'AI-Use-Cases: Damage Detection, Fraud Scoring, Fleet Risk Scoring und Renewal Optimization.',
                    en: 'AI use cases: damage detection, fraud scoring, fleet risk scoring, and renewal optimization.'
                  },
                  l
                )}
              </p>
            </Card>

            <Card title={bi({ de: '9) CLOUD-ARCHITEKTUR (GCP)', en: '9) CLOUD ARCHITECTURE (GCP)' }, l)}>
              <p style={pStyle}>
                {bi(
                  {
                    de: 'Betriebsmodell mit Shared VPC, Environment-Trennung (prod/staging/dev), Cloud Armor, Load Balancer, Cloud Run, Spanner Multi-Region, BigQuery, Vertex AI Endpoints, Secret Manager und IAM-Rollen.',
                    en: 'Operating model with shared VPC, environment separation (prod/staging/dev), Cloud Armor, load balancer, Cloud Run, Spanner multi-region, BigQuery, Vertex AI endpoints, Secret Manager, and IAM roles.'
                  },
                  l
                )}
              </p>
              <MermaidBlock
                title={bi({ de: 'Deployment Diagram', en: 'Deployment Diagram' }, l)}
                code={`flowchart TB
  ORG[GCP Org] --> PROD[prod]
  ORG --> STG[staging]
  ORG --> DEV[dev]
  PROD --> VPC[Shared VPC]
  VPC --> LB[Load Balancer + Cloud Armor]
  LB --> RUN[Cloud Run]
  RUN --> SP[Spanner Multi-Region]
  RUN --> BQ[BigQuery]
  RUN --> VAI[Vertex AI Endpoints]
  RUN --> SEC[Secret Manager]
  RUN --> IAM[IAM]`}
              />
            </Card>

            <Card title={bi({ de: '10) SICHERHEIT & DEVOPS', en: '10) SECURITY & DEVOPS' }, l)}>
              <p style={pStyle}>
                {bi(
                  {
                    de: 'Security Controls: kurze JWT-Laufzeiten, Refresh-Token-Rotation, sichere Token-Speicherung (Keychain/Keystore), Certificate Pinning, Zero-Trust-Networking, serverseitige Rollenvalidierung, Audit Logging sowie Cloud Logging/Monitoring.',
                    en: 'Security controls: short JWT lifetimes, refresh-token rotation, secure token storage (Keychain/Keystore), certificate pinning, zero-trust networking, server-side role validation, audit logging, and Cloud Logging/Monitoring.'
                  },
                  l
                )}
              </p>
              <p style={{ ...noteStyle, marginTop: '0.45rem' }}>
                {bi(
                  {
                    de: 'CI/CD Web: Vite Build + CDN Deploy. CI/CD Mobile: Expo EAS, Store Releases (App Store / Google Play) und optional Enterprise Distribution.',
                    en: 'CI/CD web: Vite build + CDN deploy. CI/CD mobile: Expo EAS, store releases (App Store / Google Play), and optional enterprise distribution.'
                  },
                  l
                )}
              </p>
            </Card>

            <Card title={bi({ de: '11) WHITE-LABEL-STRATEGIE', en: '11) WHITE LABEL STRATEGY' }, l)}>
              <p style={pStyle}>
                {bi(
                  {
                    de: 'Ein App-Binary, tenantbasierte Branding-Konfiguration, modulare Aktivierung pro Tenant. Themes, Logos und Feature Flags werden zur Laufzeit aus Tenant-Metadaten geladen.',
                    en: 'One app binary with tenant-based branding configuration and per-tenant module activation. Themes, logos, and feature flags are loaded at runtime from tenant metadata.'
                  },
                  l
                )}
              </p>
            </Card>

            <Card title={bi({ de: '12) SKALIERUNGSSTRATEGIE', en: '12) SCALING STRATEGY' }, l)}>
              <div style={{ display: 'grid', gap: '0.65rem' }}>
                <div style={roleCardStyle}>
                  <h3 style={subHeadingStyle}>Phase 1</h3>
                  <p style={noteStyle}>{bi({ de: 'Cloud SQL + Cloud Run als initiale Delivery-Basis.', en: 'Cloud SQL + Cloud Run as initial delivery baseline.' }, l)}</p>
                </div>
                <div style={roleCardStyle}>
                  <h3 style={subHeadingStyle}>Phase 2</h3>
                  <p style={noteStyle}>{bi({ de: 'Migration auf Spanner und event-getriebene Orchestrierung.', en: 'Migration to Spanner and event-driven orchestration.' }, l)}</p>
                </div>
                <div style={roleCardStyle}>
                  <h3 style={subHeadingStyle}>Phase 3</h3>
                  <p style={noteStyle}>{bi({ de: 'Multi-Region-Deployment, vollständiger AI-Feedback-Loop und globale Datenresidenz.', en: 'Multi-region deployment, full AI feedback loop, and global data residency.' }, l)}</p>
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
          <>
            {enterpriseRoleSections.map((sectionDef) => (
              <Card key={sectionDef.title.en} title={bi(sectionDef.title, l)}>
                <p style={pStyle}>{bi(sectionDef.intro, l)}</p>

                <div style={{ overflowX: 'auto', marginTop: '0.65rem' }}>
                  <table style={tableStyle}>
                    <thead>
                      <tr style={headRowStyle}>
                        <th style={thStyle}>{bi({ de: 'Rolle', en: 'Role' }, l)}</th>
                        <th style={thStyle}>{bi({ de: 'Mandantenebene', en: 'Tenant Level' }, l)}</th>
                        <th style={thStyle}>{bi({ de: 'Module', en: 'Modules' }, l)}</th>
                        <th style={thStyle}>{bi({ de: 'Entscheidungsbefugnis', en: 'Decision Authority' }, l)}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sectionDef.roles.map((r) => (
                        <tr key={`${sectionDef.title.en}-${r.name}`}>
                          <td style={tdStrongStyle}>{r.name}</td>
                          <td style={tdStyle}>{tenantLevelText(r.tenantLevel, l)}</td>
                          <td style={tdStyle}>{r.modulesUsed}</td>
                          <td style={tdStyle}>{r.decisionAuthority}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ display: 'grid', gap: '0.75rem', marginTop: '0.75rem' }}>
                  {sectionDef.roles.map((r) => (
                    <div key={`${sectionDef.title.en}-${r.name}-detail`} style={roleCardStyle}>
                      <h3 style={subHeadingStyle}>{r.name}</h3>
                      <RoleLine label={bi({ de: 'Mandantenebene', en: 'Tenant Level' }, l)} value={tenantLevelText(r.tenantLevel, l)} />
                      <RoleLine label={bi({ de: 'Funktionale Beschreibung', en: 'Functional Description' }, l)} value={r.functionalDescription} />
                      <RoleLine label={bi({ de: 'Kernverantwortungen', en: 'Core Responsibilities' }, l)} value={r.coreResponsibilities} />
                      <RoleLine label={bi({ de: 'Entscheidungsbefugnis', en: 'Decision Authority' }, l)} value={r.decisionAuthority} />
                      <RoleLine label={bi({ de: 'Datenzugriff', en: 'Data Access Scope' }, l)} value={r.dataAccessScope} />
                      <RoleLine label={bi({ de: 'Genutzte Module', en: 'Modules Used' }, l)} value={r.modulesUsed} />
                      {r.trigger ? <RoleLine label={bi({ de: 'Trigger', en: 'Trigger' }, l)} value={r.trigger} /> : null}
                      {r.temporaryAccess ? <RoleLine label={bi({ de: 'Temporärer Zugriff', en: 'Temporary Access' }, l)} value={r.temporaryAccess} /> : null}
                    </div>
                  ))}
                </div>
              </Card>
            ))}

            <Card title={bi({ de: '9) ROLLEN-INTERAKTIONSKARTE', en: '9) ROLE INTERACTION MAP' }, l)}>
              <MermaidBlock
                title={bi({ de: 'Interaktionsfluss', en: 'Interaction Flow' }, l)}
                code={`flowchart LR
  D[Driver] --> CH[Claims Handler]
  CH --> SV[Surveyor]
  SV --> RP[Repair Partner]
  RP --> RT[Rental Provider]
  RT --> FI[Finance Officer]
  FI --> PM[Portfolio Manager]
  PM --> RE[Reinsurance]`}
              />
              <p style={{ ...noteStyle, marginTop: '0.55rem' }}>
                {bi(
                  {
                    de: 'Die Orchestrierung erfolgt ereignisgetrieben: Jeder Rollenschritt wird über Domain Events aktiviert, mit rollenbasierten Rechten versehen und auditierbar protokolliert.',
                    en: 'Orchestration is event-driven: each role step is activated via domain events, constrained by role-based permissions, and fully audit-logged.'
                  },
                  l
                )}
              </p>
            </Card>

            <Card title={bi({ de: '10) ROLLEN-HIERARCHIEMODELL', en: '10) ROLE HIERARCHY MODEL' }, l)}>
              <MermaidBlock
                title={bi({ de: 'Hierarchieebenen', en: 'Hierarchy Layers' }, l)}
                code={`flowchart TB
  P[Platform Level]
  B[Broker Level]
  C[Corporate Level]
  O[Operational Partner Level]
  P --> B
  B --> C
  C --> O`}
              />
              <p style={{ ...noteStyle, marginTop: '0.55rem' }}>
                {bi(
                  {
                    de: 'Berechtigungsgrenzen werden von oben nach unten vererbt, aber niemals ohne Scope-Filter erweitert. Plattformrechte steuern Governance, Brokerrechte steuern Kundenprozesse, Corporaterechte steuern interne Rollen, Partnerrechte bleiben strikt auf Aufgabenebene begrenzt.',
                    en: 'Permission boundaries inherit top-down but never expand without scope filters. Platform rights govern governance, broker rights govern client processes, corporate rights govern internal roles, and partner rights stay strictly task-scoped.'
                  },
                  l
                )}
              </p>
            </Card>
          </>
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
