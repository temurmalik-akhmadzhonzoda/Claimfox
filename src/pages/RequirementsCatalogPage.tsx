import React, { useMemo } from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import { useI18n } from '@/i18n/I18nContext'

type CatalogSection = {
  id: string
  title: string
  paragraphs?: string[]
  extraParagraphs?: string[]
  bullets?: string[]
}

function getCatalogContent(lang: 'de' | 'en') {
  if (lang === 'de') {
    return {
      title: 'Anforderungskatalog – Short Version',
      subtitle: 'Zusammenarbeit mit Versicherungen · Insurfox AI IaaS Plattform',
      intro: [
        'Ziel ist die Integration von Versicherungsprozessen in die Insurfox AI IaaS Plattform sowie der Einsatz KI-gestützter Entscheidungsunterstützung unter vollständiger Wahrung regulatorischer, datenschutzrechtlicher und aufsichtsrechtlicher Anforderungen.'
      ],
      sections: [
        {
          id: '01',
          title: '1. Ziel der Zusammenarbeit',
          paragraphs: [
            'Ziel ist die Integration von Versicherungsprozessen in die Insurfox AI IaaS Plattform sowie der Einsatz KI-gestützter Entscheidungsunterstützung unter vollständiger Wahrung regulatorischer, datenschutzrechtlicher und aufsichtsrechtlicher Anforderungen.'
          ]
        },
        {
          id: '02',
          title: '2. Versicherungsprodukte',
          paragraphs: ['Der Partner stellt strukturierte Informationen zu den angebundenen Produkten bereit:'],
          bullets: ['Versicherungssparte und Produktart', 'Deckungsumfang, Limits, Selbstbehalte', 'Prämien- und Tariflogiken', 'Laufzeiten, Verlängerungs- und Kündigungsregeln']
        },
        {
          id: '03',
          title: '3. Historische Policendaten',
          paragraphs: ['Erforderlich sind strukturierte historische Daten, u. a.:'],
          bullets: ['Policenstammdaten (Nummer, Status, Laufzeit)', 'Prämien (Netto/Brutto), Versicherungssummen', 'Vertragsänderungen und -historien', 'Verlängerungen und Kündigungen'],
          extraParagraphs: ['Empfohlene Mindesthistorie: 5–10 Jahre, sofern verfügbar.']
        },
        {
          id: '04',
          title: '4. Historische Schadendaten',
          paragraphs: ['Bereitzustellen sind u. a.:'],
          bullets: ['Schadenstammdaten (Datum, Art, Ursache, Status)', 'Schadenverlauf (Reserven, Zahlungen, Rückstellungen)', 'Bearbeitungszeiten und Prozessschritte', 'Ablehnungs- und Regressinformationen']
        },
        {
          id: '05',
          title: '5. Angebots- und Quotierungsdaten',
          paragraphs: ['Für KI-gestützte Risiko- und Pricing-Analysen erforderlich:'],
          bullets: ['Angebots- und Quotierungsdaten', 'kalkulierte und genehmigte Prämien', 'Underwriting-Entscheidungen', 'Abweichungen, Zuschläge, Overrides']
        },
        {
          id: '06',
          title: '6. Versicherungsnehmer- und Risikodaten',
          paragraphs: ['Bereitzustellen sind u. a.:'],
          bullets: ['Stammdaten der Versicherungsnehmer', 'Branchen- und Unternehmensmerkmale', 'Risiko- und Objektinformationen (z. B. Fuhrpark, Transportarten)']
        },
        {
          id: '07',
          title: '7. Sensible Daten (optional)',
          paragraphs: ['Sensible Daten können verarbeitet werden, sofern rechtlich zulässig:'],
          bullets: ['Gesundheits-, biometrische oder Standortdaten', 'Telematik- und Bewegungsdaten', 'gesetzliche Grundlage oder explizite Einwilligung', 'Zweckbindung, Datenminimierung, zusätzliche Schutzmaßnahmen']
        },
        {
          id: '08',
          title: '8. Prozess- und Workflow-Informationen',
          paragraphs: ['Erforderlich sind Informationen zu:'],
          bullets: ['Underwriting- und Schadenprozessen', 'Genehmigungs- und Eskalationsstufen', 'Bearbeitungszeiten und Rollen']
        },
        {
          id: '09',
          title: '9. Technische Integration',
          paragraphs: ['Der Partner ermöglicht:'],
          bullets: ['API- oder Batch-basierte Datenübermittlung', 'definierte Datenformate (z. B. JSON, XML)', 'initiale Datenmigration und laufende Datenfeeds']
        },
        {
          id: '10',
          title: '10. Governance, Audit und Compliance',
          paragraphs: ['Vorausgesetzt werden:'],
          bullets: ['DSGVO/GDPR-Konformität', 'dokumentierte Datenquellen', 'Nachvollziehbarkeit und Auditierbarkeit', 'klare Rollen- und Verantwortlichkeitsmodelle']
        },
        {
          id: '11',
          title: '11. Ergebnis',
          paragraphs: [
            'Dieser Anforderungskatalog bildet die Grundlage für die fachliche, technische und regulatorische Bewertung einer Zusammenarbeit mit der Insurfox AI IaaS Plattform.',
            'Abweichungen oder Ergänzungen werden im Rahmen der gemeinsamen Definitionsphase abgestimmt.'
          ]
        }
      ]
    }
  }

  return {
    title: 'Requirements Catalog – Short Version',
    subtitle: 'Collaboration with Insurers · Insurfox AI IaaS Platform',
    intro: [
      'The goal is to integrate insurance processes into the Insurfox AI IaaS platform and use AI-supported decision support while fully complying with regulatory, data protection and supervisory requirements.'
    ],
    sections: [
      {
        id: '01',
        title: '1. Purpose of the Collaboration',
        paragraphs: [
          'The goal is to integrate insurance processes into the Insurfox AI IaaS platform and use AI-supported decision support while fully complying with regulatory, data protection and supervisory requirements.'
        ]
      },
      {
        id: '02',
        title: '2. Insurance Products',
        paragraphs: ['The partner provides structured information on connected products:'],
        bullets: ['Line of business and product type', 'Coverage scope, limits, deductibles', 'Premium and tariff logic', 'Terms, renewal and cancellation rules']
      },
        {
          id: '03',
          title: '3. Historical Policy Data',
          paragraphs: ['Required structured historical data includes:'],
          bullets: ['Policy master data (number, status, term)', 'Premiums (net/gross), sums insured', 'Policy changes and history', 'Renewals and cancellations'],
          extraParagraphs: ['Recommended minimum history: 5–10 years, if available.']
        },
      {
        id: '04',
        title: '4. Historical Claims Data',
        paragraphs: ['To be provided, among others:'],
        bullets: ['Claim master data (date, type, cause, status)', 'Claim development (reserves, payments, provisions)', 'Handling times and process steps', 'Decline and recovery information']
      },
      {
        id: '05',
        title: '5. Quotation and Pricing Data',
        paragraphs: ['Required for AI-supported risk and pricing analytics:'],
        bullets: ['Quote and quotation data', 'Calculated and approved premiums', 'Underwriting decisions', 'Deviations, loadings, overrides']
      },
      {
        id: '06',
        title: '6. Policyholder and Risk Data',
        paragraphs: ['To be provided, among others:'],
        bullets: ['Policyholder master data', 'Industry and company characteristics', 'Risk and object information (e.g. fleet, transport types)']
      },
      {
        id: '07',
        title: '7. Sensitive Data (optional)',
        paragraphs: ['Sensitive data may be processed where legally permitted:'],
        bullets: ['Health, biometric or location data', 'Telematics and movement data', 'Legal basis or explicit consent', 'Purpose limitation, data minimisation, additional safeguards']
      },
      {
        id: '08',
        title: '8. Process and Workflow Information',
        paragraphs: ['Required information includes:'],
        bullets: ['Underwriting and claims processes', 'Approval and escalation levels', 'Processing times and roles']
      },
      {
        id: '09',
        title: '9. Technical Integration',
        paragraphs: ['The partner enables:'],
        bullets: ['API or batch-based data transfer', 'Defined data formats (e.g. JSON, XML)', 'Initial data migration and ongoing data feeds']
      },
      {
        id: '10',
        title: '10. Governance, Audit and Compliance',
        paragraphs: ['Prerequisites include:'],
        bullets: ['GDPR compliance', 'Documented data sources', 'Traceability and auditability', 'Clear role and responsibility models']
      },
      {
        id: '11',
        title: '11. Outcome',
        paragraphs: [
          'This requirements catalog forms the basis for the professional, technical and regulatory evaluation of a collaboration with the Insurfox AI IaaS platform.',
          'Any deviations or additions are aligned during the joint definition phase.'
        ]
      }
    ]
  }
}

export default function RequirementsCatalogPage() {
  const { lang } = useI18n()
  const content = useMemo(() => getCatalogContent(lang), [lang])

  return (
    <section className="page insurfox-whitepaper-page">
      <div className="insurfox-whitepaper-shell">
        <div className="framework-header-row insurfox-whitepaper-header">
          <Header title={content.title} subtitle={content.subtitle} subtitleColor="#65748b" />
        </div>
        <div className="insurfox-whitepaper-hero">
          <Card className="insurfox-whitepaper-summary">
            <h2>{lang === 'en' ? 'Overview' : 'Überblick'}</h2>
            {content.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Card>
        </div>
        <div className="insurfox-whitepaper-grid">
          {content.sections.map((section) => (
            <Card key={section.id} className="insurfox-whitepaper-card">
              <div className="insurfox-whitepaper-card-head">
                <h3>{section.title}</h3>
              </div>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.extraParagraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
