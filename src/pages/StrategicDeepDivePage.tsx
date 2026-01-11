import React from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import InternAuthGate from '@/components/InternAuthGate'
import InsurfoxLogo from '@/assets/logos/Insurfox_Logo_colored_dark.png'

type SectionBlock = {
  id: string
  title: string
  intro?: string
  bullets?: string[]
  text?: string
}

const sections: SectionBlock[] = [
  {
    id: 'intro',
    title: 'Strategic Technology & AI Governance Deep Dive',
    intro: 'Insurfox IaaS – Enabling Regulated AI at Scale',
    text:
      'Dieses Dokument stellt einen strategischen Deep Dive in die technologische Architektur und das AI-Governance-Modell der Insurfox IaaS dar. Es baut auf vorangegangenen Präsentationen und Whitepapern auf und richtet sich an Investment Committees sowie strategische Partner aus dem Versicherungs- und Rückversicherungsumfeld.'
  },
  {
    id: 'purpose',
    title: '1. Zweck dieses Dokuments',
    bullets: [
      'technologischer Reife und Architekturentscheidungen',
      'regulatorischer Sicherheit im Einsatz von KI',
      'langfristiger strategischer Kontrolle über KI-Systeme',
      'Skalierbarkeit in regulierten Versicherungsmärkten'
    ],
    text: 'Dieses Dokument dient als Entscheidungsgrundlage für eine vertiefte Zusammenarbeit.'
  },
  {
    id: 'context',
    title: '2. Ausgangslage und strategischer Kontext',
    bullets: [
      'regulatorische Risiken einzugehen',
      'operative Kontrolle zu verlieren',
      'strategische Abhängigkeiten von externen KI-Anbietern zu schaffen'
    ],
    text:
      'Versicherer und Rückversicherer stehen vor der Herausforderung, KI produktiv zu nutzen. Insurfox adressiert diese Lücke, indem KI als integrierte Infrastrukturkomponente innerhalb einer Insurance-IaaS bereitgestellt wird.'
  },
  {
    id: 'overview',
    title: '3. Überblick Insurfox IaaS',
    bullets: [
      'versicherungsfachliche Prozesslogik',
      'skalierbare IaaS-Strukturen',
      'native, intern betriebene KI-Systeme',
      'technische AI- und Data-Governance'
    ],
    text:
      'Insurfox ist eine AI-native Insurance-IaaS-Plattform zur Abbildung zentraler Versicherungsprozesse, darunter Underwriting, Pricing, Claims, Fleet- und Bestandsmanagement.'
  },
  {
    id: 'architecture',
    title: '4. Technologischer Ansatz und Architektur',
    bullets: [
      'modulare IaaS-Struktur',
      'klare Mandantentrennung',
      'definierte Daten- und KI-Domänen',
      'durchgängige Auditierbarkeit'
    ],
    text: 'Diese Architektur erlaubt es, neue Produkte, Versicherer und Märkte kontrolliert zu integrieren.'
  },
  {
    id: 'native-ai',
    title: '5. Native KI als strategische Infrastruktur',
    bullets: [
      'keine Nutzung externer AI-SaaS-Angebote',
      'keine Abhängigkeit von Hyperscalern oder Foundation Models',
      'keine Weitergabe von Trainings- oder Inferenzdaten'
    ],
    text:
      'Alle KI-Modelle werden innerhalb der Insurfox IaaS betrieben und kontrolliert. KI wird ausschließlich entscheidungsunterstützend eingesetzt.'
  },
  {
    id: 'ai-use',
    title: '6. Strategische Kontrolle über KI',
    bullets: [
      'Modelle und Modellversionen',
      'Trainings- und Inferenzdaten',
      'Einsatzkontexte und Use-Cases',
      'Outputs und Entscheidungslogiken'
    ],
    text: 'Versicherer behalten die Hoheit über fachliche Entscheidungen, regulatorische Verantwortung und strategische Weiterentwicklung.'
  },
  {
    id: 'regulatory',
    title: '7. Regulatorische Sicherheit als Fundament',
    bullets: [
      'DSGVO / GDPR',
      'BaFin-aufsichtsrechtliche Anforderungen',
      'EU AI Act (inkl. High-Risk-KI-Systeme)',
      'EIOPA-Leitlinien zur Digitalisierung',
      'Lloyd’s Mindeststandards und Governance-Anforderungen'
    ],
    text: 'Regulatorische Anforderungen sind technisch verankert, nicht nachgelagert.'
  },
  {
    id: 'high-risk',
    title: '8. High-Risk-KI-Readiness',
    bullets: [
      'klar definierte KI-Use-Cases',
      'verpflichtender Human-in-the-Loop',
      'vollständiges Model Lifecycle Management',
      'dokumentierte Release- und Änderungsprozesse'
    ],
    text: 'Insurfox geht konservativ von High-Risk-Einstufung aus und schafft Planungssicherheit.'
  },
  {
    id: 'data-governance',
    title: '9. Data Governance und Datenschutz',
    bullets: ['zweckgebunden', 'minimiert', 'auf rechtmäßiger Grundlage'],
    text:
      'Grundpfeiler der Data Governance sind rollenbasierte Zugriffskontrolle, Mandantentrennung und vollständiges Audit-Logging. Die Datenhoheit verbleibt beim jeweiligen Versicherer.'
  },
  {
    id: 'sensitive',
    title: '10. Umgang mit sensiblen Daten',
    bullets: ['Gesundheitsdaten', 'biometrische Daten', 'Bewegungs- und Standortdaten'],
    text: 'Die Verarbeitung erfolgt ausschließlich mit expliziter Einwilligung oder gesetzlicher Versicherungsgrundlage.'
  },
  {
    id: 'sensitive-controls',
    title: '11. Erweiterte Schutzmaßnahmen für sensible Daten',
    bullets: [
      'getrennte Daten- und KI-Domänen',
      'eingeschränkten Zugriff auf Modelle',
      'separate Verarbeitungs- und Analysepipelines',
      'erweiterte Logging- und Reviewpflichten'
    ],
    text: 'Eine mandanten- oder spartenübergreifende Nutzung sensibler Daten findet nicht statt.'
  },
  {
    id: 'audit',
    title: '12. Auditierbarkeit und Nachvollziehbarkeit',
    bullets: [
      'verwendete Eingabedaten (pseudonymisiert)',
      'Modellversionen und Konfigurationen',
      'erzeugte Outputs',
      'Zeitstempel',
      'Nutzer- und Rolleninteraktionen'
    ],
    text: 'Die Aufbewahrung erfolgt gemäß regulatorischer Anforderungen.'
  },
  {
    id: 'outsourcing',
    title: '13. Outsourcing- und Drittparteirisiken',
    bullets: [
      'keine externen KI-Service-Provider',
      'keine Weitergabe von Trainings- oder Inferenzdaten',
      'keine Abhängigkeit von externen KI-Modellen'
    ],
    text: 'Dadurch wird die regulatorische Komplexität deutlich reduziert.'
  },
  {
    id: 'sovereignty',
    title: '14. Datensouveränität, Sicherheit und Residenz',
    bullets: [
      'konfigurierbare Datenresidenz innerhalb der EU',
      'logische Mandantentrennung',
      'Verschlüsselung von Daten im Ruhezustand und bei Übertragung',
      'Zugriffskontrollen, Monitoring und Incident-Response-Prozesse'
    ],
    text: 'Versicherer behalten jederzeit die volle Datenhoheit.'
  },
  {
    id: 'maturity',
    title: '15. Marktreife und aktueller Status',
    bullets: [
      'ein Produkt (Frachtführerhaftpflicht) ist produktiv im Einsatz',
      'Policen sind aktiv',
      'kleinere Logistik- und Transportunternehmen nutzen die Plattform',
      'ein größerer Versicherer ist aktiver Partner',
      'weitere Versicherer befinden sich nach Letter of Intent in der Definitionsphase'
    ],
    text: 'Der Gesamtstatus liegt bei ca. 75 % Architektur- und Konzeptreife bei laufender MVP-Umsetzung.'
  },
  {
    id: 'framework',
    title: '16. Strategischer Rahmen: Europa, Emirate und Lloyd’s',
    bullets: [
      'Europa: operative Nutzung, Regulierung, Datenresidenz',
      'Emirate: Kapitalbasis und internationale Versicherungsexpertise',
      'Lloyd’s: Governance- und Trust-Layer für den Zugang zum europäischen Markt'
    ],
    text: 'Diese Struktur ermöglicht internationale Zusammenarbeit ohne regulatorische Abstriche.'
  },
  {
    id: 'business',
    title: '17. Geschäftsmodell und Monetarisierung',
    bullets: [
      'Produkt- und Rollenlizenzen innerhalb der IaaS',
      'Flat Fees für Claims- und Fleet-Management',
      'Revenue-Share-Modelle mit Versicherungen',
      'Plattform- und Marketplace-Ansätze'
    ],
    text: 'Die Monetarisierung ist skalierbar und auf langfristige Partnerschaften ausgelegt.'
  },
  {
    id: 'market',
    title: '18. Abgrenzung zum Markt',
    bullets: [
      'vollständige Kontrolle über KI und Daten',
      'regulatorisch integrierte Governance',
      'keine strategischen Abhängigkeiten'
    ],
    text: 'Dies ist insbesondere für Versicherer und Rückversicherer von zentraler Bedeutung.'
  },
  {
    id: 'summary',
    title: '19. Zusammenfassung und Investment-Perspektive',
    bullets: [
      'technologischen Vorsprung',
      'regulatorische Sicherheit',
      'strategische Kontrolle über KI',
      'Vertrauen und Compliance-Fähigkeit',
      'Zugang zu europäischen Versicherungsmärkten'
    ],
    text:
      'Insurfox adressiert den kontrollierten, regulatorisch sauberen Einsatz von KI in produktiven Versicherungsprozessen.'
  },
  {
    id: 'closing',
    title: 'Schlussbemerkung',
    text: 'Insurfox versteht KI nicht als Experiment, sondern als kritische Infrastruktur für regulierte Versicherungsmärkte.'
  }
]

export default function StrategicDeepDivePage() {
  return (
    <InternAuthGate>
      <section className="page strategic-deep-dive-page">
        <div className="framework-header-row">
          <Header
            title="Strategic Technology & AI Governance Deep Dive"
            subtitle="Insurfox IaaS – Enabling Regulated AI at Scale"
            subtitleColor="#65748b"
          />
          <button
            type="button"
            className="framework-download"
            onClick={() => window.print()}
          >
            PDF herunterladen
          </button>
        </div>
        <div className="strategic-grid">
          <div className="strategic-column">
            {sections.slice(0, 10).map((section) => (
              <Card key={section.id} title={section.title}>
                {section.intro && <p className="framework-paragraph">{section.intro}</p>}
                {section.text && <p className="framework-paragraph">{section.text}</p>}
                {section.bullets && (
                  <ul className="framework-list">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </Card>
            ))}
          </div>
          <div className="strategic-column">
            {sections.slice(10).map((section) => (
              <Card key={section.id} title={section.title}>
                {section.text && <p className="framework-paragraph">{section.text}</p>}
                {section.bullets && (
                  <ul className="framework-list">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </Card>
            ))}
          </div>
        </div>
        <div className="framework-print">
          <div className="framework-print-header">
            <img src={InsurfoxLogo} alt="Insurfox" />
          </div>
          <h1>Strategic Technology & AI Governance Deep Dive</h1>
          <p className="framework-print-subtitle">Insurfox IaaS – Enabling Regulated AI at Scale</p>
          {sections.map((section) => (
            <div key={section.id} className="framework-print-section">
              <h2>{section.title}</h2>
              {section.intro && <p>{section.intro}</p>}
              {section.text && <p>{section.text}</p>}
              {section.bullets && (
                <ul>
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </InternAuthGate>
  )
}
