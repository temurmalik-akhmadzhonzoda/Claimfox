import { type CSSProperties } from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import { InsideInsurfoxSubnav, type InsideSectionKey } from '@/components/inside-insurfox/InsideInsurfoxSubnav'

type BiText = { de: string; en: string }

type SectionContent = {
  title: BiText
  subtitle: BiText
  summary: BiText[]
  flow: BiText[]
  callouts: BiText[]
}

const sectionContent: Record<InsideSectionKey, SectionContent> = {
  home: {
    title: { de: 'Inside Insurfox - The Insurance Operating System', en: 'Inside Insurfox - The Insurance Operating System' },
    subtitle: { de: 'Strategische Innenansicht über Operating Model, Architektur und Skalierungslogik', en: 'Strategic internal view of operating model, architecture, and scaling logic' },
    summary: [
      { de: 'Diese Rubrik zeigt die Zielarchitektur von Insurfox als durchgängiges Insurance Operating System mit klaren Führungs- und Ausführungsverantwortungen.', en: 'This section presents the target architecture of Insurfox as an integrated insurance operating system with clear leadership and execution responsibilities.' },
      { de: 'Der Fokus liegt auf End-to-end Steuerung über Underwriting, Claims, Fleet, Partner und Reporting, inklusive AI-unterstützter Entscheidungslogik.', en: 'The focus is end-to-end control across underwriting, claims, fleet, partner, and reporting, including AI-supported decision logic.' }
    ],
    flow: [
      { de: 'Strategie & Ziele', en: 'Strategy & goals' },
      { de: 'Operating Model', en: 'Operating model' },
      { de: 'Plattformarchitektur', en: 'Platform architecture' },
      { de: 'Ausführungs-Module', en: 'Execution modules' },
      { de: 'Messung & Lernschleife', en: 'Measurement & learning loop' }
    ],
    callouts: [
      { de: 'Ein Betriebssystem statt isolierter Tools: jede Funktion zahlt auf Governance und Profitabilität ein.', en: 'An operating system instead of isolated tools: every function contributes to governance and profitability.' },
      { de: 'Module sind skalierbar kombinierbar, aber zentral über Datenmodell und Rollenmodell gekoppelt.', en: 'Modules are combinable at scale, yet centrally linked through data and role models.' },
      { de: 'Die Rubrik dient als interne Referenz für Management, Produkt und Delivery.', en: 'This section serves as internal reference for management, product, and delivery.' }
    ]
  },
  vision: {
    title: { de: 'Vision', en: 'Vision' },
    subtitle: { de: 'Insurfox als durchgängige Versicherungsinfrastruktur', en: 'Insurfox as end-to-end insurance infrastructure' },
    summary: [
      { de: 'Die Vision verbindet MGA-, Broker- und Plattformfähigkeiten in einem integrierten Modell statt in getrennten Organisationssilos.', en: 'The vision combines MGA, broker, and platform capabilities in one integrated model rather than separate organizational silos.' },
      { de: 'Strategisches Ziel ist ein belastbarer Ausführungsstandard von Risikoaufnahme bis Erneuerung, mit klarer Daten- und Entscheidungsführung.', en: 'The strategic goal is a robust execution standard from risk intake to renewal, with clear data and decision governance.' }
    ],
    flow: [
      { de: 'Marktproblem', en: 'Market problem' },
      { de: 'Integrierte Wertkette', en: 'Integrated value chain' },
      { de: 'Skalierbare Plattform', en: 'Scalable platform' },
      { de: 'Operative Exzellenz', en: 'Operational excellence' },
      { de: 'Nachhaltiger Moat', en: 'Sustainable moat' }
    ],
    callouts: [
      { de: 'Vision und Ausführung sind gekoppelt: nur operative Tiefe schafft verteidigbare Margen.', en: 'Vision and execution are linked: only operational depth creates defendable margins.' },
      { de: 'AI ist kein Add-on, sondern Bestandteil des Betriebsmodells.', en: 'AI is not an add-on; it is part of the operating model.' },
      { de: 'Distribution und Operating Stack müssen gemeinsam skaliert werden.', en: 'Distribution and operating stack must scale together.' }
    ]
  },
  roles: {
    title: { de: 'Rollenmodell', en: 'Roles' },
    subtitle: { de: 'Verantwortlichkeiten über Management, Underwriting, Claims und Operations', en: 'Responsibilities across management, underwriting, claims, and operations' },
    summary: [
      { de: 'Das Rollenmodell definiert Entscheidungswege, Eskalationen und Qualitätsverantwortung entlang der Kernprozesse.', en: 'The role model defines decision paths, escalations, and quality accountability across core processes.' },
      { de: 'Jede Rolle verfügt über klare Inputs, KPIs und Governance-Pflichten, um Geschwindigkeit ohne Kontrollverlust zu ermöglichen.', en: 'Each role has explicit inputs, KPIs, and governance duties to enable speed without losing control.' }
    ],
    flow: [
      { de: 'Vorstand/Management', en: 'Board/management' },
      { de: 'Produkt & Underwriting', en: 'Product & underwriting' },
      { de: 'Claims & Partnersteuerung', en: 'Claims & partner steering' },
      { de: 'Operations & Compliance', en: 'Operations & compliance' },
      { de: 'Reporting & Steering', en: 'Reporting & steering' }
    ],
    callouts: [
      { de: 'Klare Rollen reduzieren Reibung und verkürzen Durchlaufzeiten.', en: 'Clear roles reduce friction and shorten cycle times.' },
      { de: 'Governance ist integraler Teil jeder Rolle, nicht nur der Compliance-Funktion.', en: 'Governance is integral to every role, not only compliance.' },
      { de: 'Ownership über Datenpunkte ist Voraussetzung für belastbare Entscheidungen.', en: 'Data-point ownership is a prerequisite for robust decisions.' }
    ]
  },
  lifecycle: {
    title: { de: 'Lifecycle', en: 'Lifecycle' },
    subtitle: { de: 'Von Intake bis Renewal als zusammenhängender Prozess', en: 'From intake to renewal as one connected process' },
    summary: [
      { de: 'Der Lifecycle-Ansatz orchestriert Akquise, Underwriting, Policierung, Claims und Erneuerung in einer durchgehenden Prozesskette.', en: 'The lifecycle approach orchestrates acquisition, underwriting, policy operations, claims, and renewal in one continuous process chain.' },
      { de: 'Übergaben zwischen Teams werden über standardisierte Datenobjekte statt ad-hoc Kommunikation gesteuert.', en: 'Handoffs between teams are governed via standardized data objects instead of ad-hoc communication.' }
    ],
    flow: [
      { de: 'Intake & Qualifizierung', en: 'Intake & qualification' },
      { de: 'Underwriting & Pricing', en: 'Underwriting & pricing' },
      { de: 'Policy Operations', en: 'Policy operations' },
      { de: 'Claims & Service', en: 'Claims & service' },
      { de: 'Renewal & Cross-Sell', en: 'Renewal & cross-sell' }
    ],
    callouts: [
      { de: 'Lifecycle-Kohärenz senkt operative Kosten und verbessert Servicelevels.', en: 'Lifecycle coherence reduces operating cost and improves service levels.' },
      { de: 'Relevante Signale werden an Folgeschritte übergeben, nicht verworfen.', en: 'Relevant signals are passed to downstream steps, not discarded.' },
      { de: 'Renewal ist Ergebnis der gesamten Vorperiode, nicht nur Vertriebsaufgabe.', en: 'Renewal is the outcome of the full prior period, not only a sales task.' }
    ]
  },
  'data-model': {
    title: { de: 'Datenmodell', en: 'Data Model' },
    subtitle: { de: 'Einheitliche Entitäten für konsistente Entscheidungen', en: 'Unified entities for consistent decisions' },
    summary: [
      { de: 'Das Datenmodell bildet Risiken, Policen, Schäden, Partner und Flottenobjekte in einem gemeinsamen Referenzrahmen ab.', en: 'The data model maps risks, policies, claims, partners, and fleet objects in one common reference framework.' },
      { de: 'So werden Reporting, AI-Modelle und operative Entscheidungen auf konsistente Definitionen gestellt.', en: 'This aligns reporting, AI models, and operational decisions on consistent definitions.' }
    ],
    flow: [
      { de: 'Datenquellen', en: 'Data sources' },
      { de: 'Normalisierung', en: 'Normalization' },
      { de: 'Kernentitäten', en: 'Core entities' },
      { de: 'Prozesskontext', en: 'Process context' },
      { de: 'Steuerung & Audit', en: 'Steering & audit' }
    ],
    callouts: [
      { de: 'Ohne einheitliches Datenmodell entstehen widersprüchliche KPIs und Entscheidungen.', en: 'Without a unified data model, KPIs and decisions become inconsistent.' },
      { de: 'Datenqualität ist ein Management-Thema, kein rein technisches Thema.', en: 'Data quality is a management topic, not purely technical.' },
      { de: 'Traceability auf Entitätsebene ist Basis für regulatorische Nachvollziehbarkeit.', en: 'Entity-level traceability is foundational for regulatory auditability.' }
    ]
  },
  'ai-core': {
    title: { de: 'AI Core', en: 'AI Core' },
    subtitle: { de: 'KI als Steuerungsschicht für Priorisierung und Entscheidungshilfe', en: 'AI as a steering layer for prioritization and decision support' },
    summary: [
      { de: 'Der AI Core bündelt Regeln, Modelle und Monitoring, um operative Entscheidungen entlang des Lifecycles zu unterstützen.', en: 'The AI core combines rules, models, and monitoring to support operational decisions across the lifecycle.' },
      { de: 'Er priorisiert Fälle, markiert Risiken und liefert erklärbare Empfehlungen für menschliche Freigaben.', en: 'It prioritizes cases, flags risk, and provides explainable recommendations for human approval.' }
    ],
    flow: [
      { de: 'Feature-Eingang', en: 'Feature intake' },
      { de: 'Regeln + Modelle', en: 'Rules + models' },
      { de: 'Empfehlung', en: 'Recommendation' },
      { de: 'Human-in-the-loop', en: 'Human-in-the-loop' },
      { de: 'Monitoring', en: 'Monitoring' }
    ],
    callouts: [
      { de: 'AI-Output ist kontrolliert und erklärbar, nicht autonomer Endentscheid.', en: 'AI output is controlled and explainable, not autonomous final decision.' },
      { de: 'Modellüberwachung schützt vor Drift und Qualitätsverlust.', en: 'Model monitoring protects against drift and quality deterioration.' },
      { de: 'Governance und Fairness sind Designprinzipien, nicht Nacharbeit.', en: 'Governance and fairness are design principles, not afterthoughts.' }
    ]
  },
  architecture: {
    title: { de: 'Architektur', en: 'Architecture' },
    subtitle: { de: 'Plattformschichten von Interface bis Governance', en: 'Platform layers from interface to governance' },
    summary: [
      { de: 'Die Architektur trennt Kanäle, Geschäftslogik, Daten und Governance klar, bleibt aber prozessual integriert.', en: 'The architecture separates channels, business logic, data, and governance clearly while remaining process-integrated.' },
      { de: 'Dadurch entsteht Modularität ohne Fragmentierung und eine belastbare Basis für internationale Skalierung.', en: 'This enables modularity without fragmentation and a robust base for international scaling.' }
    ],
    flow: [
      { de: 'Experience Layer', en: 'Experience layer' },
      { de: 'Workflow Engine', en: 'Workflow engine' },
      { de: 'Domain Services', en: 'Domain services' },
      { de: 'Data & AI Core', en: 'Data & AI core' },
      { de: 'Governance Layer', en: 'Governance layer' }
    ],
    callouts: [
      { de: 'Schichten entkoppeln Komplexität und erhöhen Liefergeschwindigkeit.', en: 'Layering decouples complexity and increases delivery speed.' },
      { de: 'Jede Architekturentscheidung braucht ein klares Betriebs- und Ownership-Modell.', en: 'Every architecture decision needs a clear operating and ownership model.' },
      { de: 'Skalierung funktioniert nur mit beobachtbarer Plattformqualität.', en: 'Scaling works only with observable platform quality.' }
    ]
  },
  modules: {
    title: { de: 'Module', en: 'Modules' },
    subtitle: { de: 'Brokerfox, Claimsfox, Fleetfox, Partnerfox und AI Fox im Zusammenspiel', en: 'Brokerfox, Claimsfox, Fleetfox, Partnerfox, and AI Fox working together' },
    summary: [
      { de: 'Die Module sind fachlich fokussiert, aber über gemeinsame Entitäten und Workflows orchestriert.', en: 'Modules are domain-focused but orchestrated via shared entities and workflows.' },
      { de: 'So lassen sich neue Produkte oder Märkte ohne Neuaufbau des gesamten Stacks ergänzen.', en: 'This enables adding new products or markets without rebuilding the entire stack.' }
    ],
    flow: [
      { de: 'Brokerfox', en: 'Brokerfox' },
      { de: 'Claimsfox', en: 'Claimsfox' },
      { de: 'Fleetfox', en: 'Fleetfox' },
      { de: 'Partnerfox', en: 'Partnerfox' },
      { de: 'AI Fox', en: 'AI Fox' }
    ],
    callouts: [
      { de: 'Module liefern Geschwindigkeit in Domänen, Plattform liefert Konsistenz.', en: 'Modules provide domain speed, platform provides consistency.' },
      { de: 'Wiederverwendbare Bausteine senken Time-to-market bei neuen Programmen.', en: 'Reusable building blocks reduce time-to-market for new programs.' },
      { de: 'Cross-Module-KPIs sind Pflicht für echte End-to-end-Steuerung.', en: 'Cross-module KPIs are required for true end-to-end control.' }
    ]
  },
  reporting: {
    title: { de: 'Reporting', en: 'Reporting' },
    subtitle: { de: 'Steuerungskennzahlen für Profitabilität, Qualität und Geschwindigkeit', en: 'Steering metrics for profitability, quality, and speed' },
    summary: [
      { de: 'Reporting verbindet operative und finanzielle Kennzahlen, um Managemententscheidungen evidenzbasiert zu machen.', en: 'Reporting connects operational and financial metrics to enable evidence-based management decisions.' },
      { de: 'Der Fokus liegt auf Ursachensteuerung statt reiner Rückspiegelanalyse.', en: 'The focus is on steering root causes rather than rear-view analysis only.' }
    ],
    flow: [
      { de: 'KPI-Definition', en: 'KPI definition' },
      { de: 'Datenerhebung', en: 'Data collection' },
      { de: 'Analyse & Segmentierung', en: 'Analysis & segmentation' },
      { de: 'Management-Entscheid', en: 'Management decision' },
      { de: 'Maßnahmen-Tracking', en: 'Action tracking' }
    ],
    callouts: [
      { de: 'Konsistente KPI-Logik verhindert Steuerungswidersprüche zwischen Teams.', en: 'Consistent KPI logic prevents steering conflicts across teams.' },
      { de: 'Reporting muss entscheidungsnah und handlungsorientiert sein.', en: 'Reporting must stay decision-proximate and action-oriented.' },
      { de: 'Auditierbarkeit erhöht Vertrauen bei Carriern und Partnern.', en: 'Auditability increases trust with carriers and partners.' }
    ]
  },
  'renewal-loop': {
    title: { de: 'Renewal Loop', en: 'Renewal Loop' },
    subtitle: { de: 'Erneuerung als integrierte Wertschöpfungsschleife', en: 'Renewal as an integrated value-creation loop' },
    summary: [
      { de: 'Die Erneuerung wird als kontinuierlicher Regelkreis mit Signalen aus Underwriting, Claims und Fleet geführt.', en: 'Renewal is managed as a continuous control loop using signals from underwriting, claims, and fleet.' },
      { de: 'Dadurch steigt Vorhersagbarkeit von Retention, Pricing und Portfoliomarge.', en: 'This improves predictability of retention, pricing, and portfolio margin.' }
    ],
    flow: [
      { de: 'Performance-Signale', en: 'Performance signals' },
      { de: 'Risikoneubewertung', en: 'Risk reassessment' },
      { de: 'Angebotsstrategie', en: 'Offer strategy' },
      { de: 'Kundeninteraktion', en: 'Client interaction' },
      { de: 'Feedback ins Underwriting', en: 'Feedback to underwriting' }
    ],
    callouts: [
      { de: 'Renewal ist der stärkste Hebel für profitable Skalierung.', en: 'Renewal is the strongest lever for profitable scaling.' },
      { de: 'Frühe Signale reduzieren Überraschungen in Preisverhandlungen.', en: 'Early signals reduce surprises in pricing negotiations.' },
      { de: 'Ein geschlossener Loop verbessert Portfoliostabilität über Zyklen hinweg.', en: 'A closed loop improves portfolio stability across cycles.' }
    ]
  },
  'mvp-roadmap': {
    title: { de: 'MVP Roadmap', en: 'MVP Roadmap' },
    subtitle: { de: 'Priorisierte Ausbaupfade für Plattformreife', en: 'Prioritized expansion paths for platform maturity' },
    summary: [
      { de: 'Die Roadmap priorisiert wertorientierte Inkremente entlang Produkt, Technologie und Operating Model.', en: 'The roadmap prioritizes value-oriented increments across product, technology, and operating model.' },
      { de: 'Ziel ist ein kontrolliertes Skalierungstempo mit messbarer Wirkung auf Wachstum und Combined Ratio.', en: 'The target is controlled scaling speed with measurable impact on growth and combined ratio.' }
    ],
    flow: [
      { de: 'Now: Stabilisierung', en: 'Now: stabilization' },
      { de: 'Next: Automatisierung', en: 'Next: automation' },
      { de: 'Later: Internationalisierung', en: 'Later: internationalization' },
      { de: 'Scale: Ökosystem', en: 'Scale: ecosystem' },
      { de: 'Optimize: Governance', en: 'Optimize: governance' }
    ],
    callouts: [
      { de: 'Roadmap-Entscheide müssen an P&L-Wirkung gekoppelt sein.', en: 'Roadmap decisions must be tied to P&L impact.' },
      { de: 'Technischer Ausbau ohne Operating Readiness erzeugt Reibung.', en: 'Technical expansion without operating readiness creates friction.' },
      { de: 'MVP heißt fokussiert, nicht oberflächlich.', en: 'MVP means focused, not superficial.' }
    ]
  }
}

function bi(value: BiText, lang: 'de' | 'en') {
  return lang === 'de' ? value.de : value.en
}

export default function InsideInsurfoxPage({ section }: { section: InsideSectionKey }) {
  const { lang, t } = useI18n()
  const l = lang === 'de' ? 'de' : 'en'
  const content = sectionContent[section]

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
            <Header title={bi(content.title, l)} subtitle={bi(content.subtitle, l)} titleColor="#0f172a" subtitleColor="#475569" />
            <div className="print-hide" style={{ position: 'sticky', top: 84 }}>
              <Button size="sm" onClick={handlePrint}>{t('insideInsurfox.exportPdf')}</Button>
            </div>
          </div>
          <div style={{ marginTop: '0.8rem' }}>
            <InsideInsurfoxSubnav current={section} />
          </div>
        </Card>

        <Card title={t('insideInsurfox.labels.structuredOverview')}>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {content.summary.map((item, idx) => (
              <p key={`${section}-summary-${idx}`} style={pStyle}>{bi(item, l)}</p>
            ))}
          </div>
        </Card>

        <Card title={t('insideInsurfox.labels.architectureFlow')}>
          <div style={flowGridStyle}>
            {content.flow.map((item, idx) => (
              <div key={`${section}-flow-${idx}`} style={flowItemStyle}>
                <div style={flowIndexStyle}>{idx + 1}</div>
                <div style={flowLabelStyle}>{bi(item, l)}</div>
              </div>
            ))}
          </div>
          <p style={{ ...noteStyle, marginTop: '0.55rem' }}>{t('insideInsurfox.labels.flowHint')}</p>
        </Card>

        <Card title={t('insideInsurfox.labels.keyConcepts')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.8rem' }}>
            {content.callouts.map((item, idx) => (
              <div key={`${section}-callout-${idx}`} style={calloutStyle}>
                <div style={calloutTagStyle}>{t('insideInsurfox.labels.callout')}</div>
                <p style={noteStyle}>{bi(item, l)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
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

const calloutStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 10,
  padding: '0.65rem',
  background: '#fffef8'
}

const calloutTagStyle: CSSProperties = {
  display: 'inline-block',
  padding: '0.15rem 0.45rem',
  borderRadius: 999,
  fontSize: '0.73rem',
  fontWeight: 700,
  color: '#854d0e',
  background: '#fef3c7',
  marginBottom: '0.4rem'
}
