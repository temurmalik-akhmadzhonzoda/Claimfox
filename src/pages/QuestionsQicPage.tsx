import React, { useMemo } from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import { useI18n } from '@/i18n/I18nContext'

type QicSection = {
  id: string
  title: string
  questions: string[]
}

function getQicContent(lang: 'de' | 'en') {
  if (lang === 'de') {
    return {
      title: 'Fragen QIC',
      subtitle: 'Questionnaire – Zusammenarbeit mit Insurfox AI IaaS',
      sections: [
        {
          id: 'A',
          title: 'A. Unternehmens- und Portfoliokontext',
          questions: [
            'In welchen Versicherungssparten ist Ihr Unternehmen aktuell aktiv?',
            'Welche Sparten sind für eine mögliche Zusammenarbeit priorisiert?',
            'Welche Zielkundensegmente adressieren Sie primär (z. B. SME, Mid-Market, Corporate, Consumer)?',
            'Über welche Vertriebskanäle werden die Produkte überwiegend vertrieben (Direkt, Makler, MGA, digital)?',
            'In welchen Jurisdiktionen sind die relevanten Versicherungsaktivitäten angesiedelt?'
          ]
        },
        {
          id: 'B',
          title: 'B. Versicherungsprodukte und Underwriting',
          questions: [
            'Welche Versicherungsprodukte sollen grundsätzlich für eine Plattformintegration betrachtet werden?',
            'Wie sind die Produkte strukturiert (Deckungsbausteine, Limits, Selbstbehalte, Ausschlüsse)?',
            'Erfolgt die Tarifermittlung überwiegend regelbasiert, individuell oder hybrid?',
            'Welche Underwriting-Entscheidungsstufen existieren (automatisiert, manuell, Referral)?',
            'Welche wesentlichen Risikomerkmale werden je Produkt berücksichtigt?'
          ]
        },
        {
          id: 'C',
          title: 'C. Angebots- und Quotierungsprozesse',
          questions: [
            'Wie ist der Angebots- und Quotierungsprozess organisiert?',
            'Welche Angebotsstatus werden unterschieden (z. B. angenommen, abgelehnt, offen)?',
            'Werden Underwriting-Entscheidungen dokumentiert (z. B. Annahme-/Ablehnungsgründe)?',
            'Existieren manuelle Overrides oder Sonderfreigaben?',
            'Welche historischen Angebotsdaten stehen grundsätzlich zur Verfügung?'
          ]
        },
        {
          id: 'D',
          title: 'D. Policen- und Vertragsdaten',
          questions: [
            'Welche Policenstammdaten sind historisch verfügbar (z. B. Laufzeit, Prämie, Versicherungssumme)?',
            'Sind Vertragsänderungen, Verlängerungen und Kündigungen historisiert?',
            'Welche zeitliche Historie steht zur Verfügung (Jahre)?',
            'Wie werden Policen unterschiedlichen Produkten und Sparten zugeordnet?',
            'Existieren Verknüpfungen zwischen Angeboten und abgeschlossenen Policen?'
          ]
        },
        {
          id: 'E',
          title: 'E. Schadenmanagement (Claims)',
          questions: [
            'Wie ist das Schadenmanagement organisatorisch aufgebaut?',
            'Welche Schadenarten sind volumen- bzw. kostenrelevant?',
            'Welche Schadenstammdaten werden erfasst (z. B. Datum, Ursache, Status)?',
            'Sind Schadenverläufe historisiert (Reserven, Zahlungen, Abschluss)?',
            'Werden Bearbeitungszeiten und Prozessschritte dokumentiert?'
          ]
        },
        {
          id: 'F',
          title: 'F. Betrugs- und Anomalieerkennung',
          questions: [
            'Existieren Prozesse zur Betrugs- oder Anomalieerkennung?',
            'Werden Schäden als auffällig oder betrugsrelevant gekennzeichnet?',
            'Sind Entscheidungen oder Ergebnisse dokumentiert (z. B. bestätigt, verworfen)?',
            'Existieren strukturierte Gründe oder Kategorien für Betrugsverdacht?',
            'Welche historischen Daten stehen hierzu zur Verfügung?'
          ]
        },
        {
          id: 'G',
          title: 'G. Versicherungsnehmer- und Risikodaten',
          questions: [
            'Welche Stammdaten zu Versicherungsnehmern sind verfügbar?',
            'Welche risikorelevanten Objekt- oder Expositionsdaten werden erfasst?',
            'Existieren branchenspezifische Risikomerkmale?',
            'Sind diese Daten historisiert?',
            'Können Daten produkt- oder spartenbezogen bereitgestellt werden?'
          ]
        },
        {
          id: 'H',
          title: 'H. Sensible Daten',
          questions: [
            'Werden im Versicherungsprozess sensible Daten verarbeitet (z. B. Gesundheits-, biometrische oder Standortdaten)?',
            'Falls ja, für welche Produkte oder Prozesse?',
            'In welcher Form liegen diese Daten vor (strukturiert, unstrukturiert)?',
            'Welche rechtlichen Grundlagen liegen für die Verarbeitung vor?',
            'Können sensible Daten getrennt und zweckgebunden bereitgestellt werden?'
          ]
        },
        {
          id: 'I',
          title: 'I. Prozesse und Workflows',
          questions: [
            'Welche Kernprozesse sind dokumentiert (Underwriting, Claims, Renewals)?',
            'Welche Genehmigungs- und Eskalationsstufen existieren?',
            'Sind Prozessstatus und Übergänge historisiert?',
            'Welche Rollen sind in den Prozessen beteiligt?',
            'Existieren definierte SLAs oder Durchlaufzeiten?'
          ]
        },
        {
          id: 'J',
          title: 'J. Systemlandschaft und Integration',
          questions: [
            'Welche Kernsysteme werden für Policen, Schäden und Abrechnung genutzt?',
            'Welche Integrationsmechanismen stehen zur Verfügung (API, Batch, Realtime)?',
            'In welchen Datenformaten können Daten bereitgestellt werden?',
            'Gibt es zentrale Datenplattformen oder Data Warehouses?',
            'Welche Systemrestriktionen sind zu berücksichtigen?'
          ]
        },
        {
          id: 'K',
          title: 'K. Datenbereitstellung und Qualität',
          questions: [
            'Welche Mindesthistorie kann bereitgestellt werden?',
            'Wie wird Datenqualität sichergestellt?',
            'Sind Datenlücken dokumentiert?',
            'Können Daten mandanten- oder produktbezogen getrennt geliefert werden?',
            'Welche Aktualisierungsfrequenzen sind möglich?'
          ]
        },
        {
          id: 'L',
          title: 'L. Governance, Compliance und Audit',
          questions: [
            'Welche regulatorischen Anforderungen sind maßgeblich (z. B. DSGVO, BaFin)?',
            'Welche Audit- und Logging-Anforderungen bestehen?',
            'Welche Vorgaben gelten für Datenresidenz?',
            'Welche Rollen- und Berechtigungskonzepte existieren?',
            'Welche Anforderungen bestehen an Nachvollziehbarkeit und Transparenz?'
          ]
        },
        {
          id: 'M',
          title: 'M. Zusammenarbeit und Pilotierung',
          questions: [
            'Welche Produkte oder Prozesse eignen sich für einen Pilot?',
            'Welche internen Stakeholder sind einzubinden?',
            'Welche Voraussetzungen müssen vor einem Pilot erfüllt sein?',
            'Welche Kriterien definieren einen erfolgreichen Pilot?',
            'Welche nächsten Schritte sind aus Ihrer Sicht erforderlich?'
          ]
        }
      ]
    }
  }

  return {
    title: 'QIC Questions',
    subtitle: 'Questionnaire – Collaboration with Insurfox AI IaaS',
    sections: [
      {
        id: 'A',
        title: 'A. Company and portfolio context',
        questions: [
          'Which insurance lines are you currently active in?',
          'Which lines are prioritized for a potential collaboration?',
          'Which target segments do you primarily address (e.g. SME, mid-market, corporate, consumer)?',
          'Which distribution channels are predominantly used (direct, broker, MGA, digital)?',
          'In which jurisdictions are the relevant insurance activities based?'
        ]
      },
      {
        id: 'B',
        title: 'B. Insurance products and underwriting',
        questions: [
          'Which insurance products should be considered for platform integration?',
          'How are products structured (coverage modules, limits, deductibles, exclusions)?',
          'Is pricing primarily rules-based, individual, or hybrid?',
          'Which underwriting decision stages exist (automated, manual, referral)?',
          'Which key risk characteristics are considered per product?'
        ]
      },
      {
        id: 'C',
        title: 'C. Quotation and pricing processes',
        questions: [
          'How is the quotation and pricing process organized?',
          'Which quote statuses are distinguished (e.g. accepted, declined, open)?',
          'Are underwriting decisions documented (e.g. acceptance/decline reasons)?',
          'Are there manual overrides or special approvals?',
          'Which historical quotation data is available?'
        ]
      },
      {
        id: 'D',
        title: 'D. Policy and contract data',
        questions: [
          'Which policy master data is historically available (e.g. term, premium, sum insured)?',
          'Are policy changes, renewals and cancellations historized?',
          'What historical time horizon is available (years)?',
          'How are policies assigned to products and lines?',
          'Are there links between quotes and issued policies?'
        ]
      },
      {
        id: 'E',
        title: 'E. Claims management',
        questions: [
          'How is claims management organized?',
          'Which claim types are volume- or cost-relevant?',
          'Which claim master data is captured (e.g. date, cause, status)?',
          'Are claim developments historized (reserves, payments, closure)?',
          'Are handling times and process steps documented?'
        ]
      },
      {
        id: 'F',
        title: 'F. Fraud and anomaly detection',
        questions: [
          'Are there processes for fraud or anomaly detection?',
          'Are claims flagged as suspicious or fraud-related?',
          'Are decisions or outcomes documented (e.g. confirmed, rejected)?',
          'Are there structured reasons or categories for fraud suspicion?',
          'Which historical data is available for this?'
        ]
      },
      {
        id: 'G',
        title: 'G. Policyholder and risk data',
        questions: [
          'Which policyholder master data is available?',
          'Which risk-relevant object or exposure data is captured?',
          'Are there industry-specific risk characteristics?',
          'Is this data historized?',
          'Can data be provided by product or line?'
        ]
      },
      {
        id: 'H',
        title: 'H. Sensitive data',
        questions: [
          'Is sensitive data processed in the insurance process (e.g. health, biometric or location data)?',
          'If yes, for which products or processes?',
          'In which form is this data available (structured, unstructured)?',
          'Which legal bases exist for processing?',
          'Can sensitive data be provided separately and purpose-bound?'
        ]
      },
      {
        id: 'I',
        title: 'I. Processes and workflows',
        questions: [
          'Which core processes are documented (underwriting, claims, renewals)?',
          'Which approval and escalation levels exist?',
          'Are process statuses and transitions historized?',
          'Which roles are involved in the processes?',
          'Are defined SLAs or cycle times in place?'
        ]
      },
      {
        id: 'J',
        title: 'J. System landscape and integration',
        questions: [
          'Which core systems are used for policies, claims and billing?',
          'Which integration mechanisms are available (API, batch, realtime)?',
          'In which data formats can data be provided?',
          'Are there central data platforms or data warehouses?',
          'Which system restrictions must be considered?'
        ]
      },
      {
        id: 'K',
        title: 'K. Data delivery and quality',
        questions: [
          'What minimum history can be provided?',
          'How is data quality ensured?',
          'Are data gaps documented?',
          'Can data be delivered separated by tenant or product?',
          'Which update frequencies are possible?'
        ]
      },
      {
        id: 'L',
        title: 'L. Governance, compliance and audit',
        questions: [
          'Which regulatory requirements are relevant (e.g. GDPR, BaFin)?',
          'Which audit and logging requirements exist?',
          'Which data residency requirements apply?',
          'Which role and permission concepts exist?',
          'Which requirements exist for traceability and transparency?'
        ]
      },
      {
        id: 'M',
        title: 'M. Collaboration and pilot',
        questions: [
          'Which products or processes are suitable for a pilot?',
          'Which internal stakeholders need to be involved?',
          'Which prerequisites must be met before a pilot?',
          'Which criteria define a successful pilot?',
          'Which next steps are required from your perspective?'
        ]
      }
    ]
  }
}

export default function QuestionsQicPage() {
  const { lang } = useI18n()
  const content = useMemo(() => getQicContent(lang), [lang])

  return (
    <section className="page insurfox-whitepaper-page">
      <div className="insurfox-whitepaper-shell">
        <div className="framework-header-row insurfox-whitepaper-header">
          <Header title={content.title} subtitle={content.subtitle} subtitleColor="#65748b" />
        </div>
        <div className="insurfox-whitepaper-grid">
          {content.sections.map((section) => (
            <Card key={section.id} className="insurfox-whitepaper-card">
              <div className="insurfox-whitepaper-card-head">
                <h3>{section.title}</h3>
              </div>
              <ul>
                {section.questions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
