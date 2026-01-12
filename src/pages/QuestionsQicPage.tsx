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
      title: 'Strategic Business Questionnaire',
      subtitle: 'Exploring a Potential Partnership between QIC and Insurfox',
      sections: [
        {
          id: 'I',
          title: 'I. Strategic Context & Portfolio Positioning',
          questions: [
            'How is QIC currently positioning its insurance portfolio across core and specialty lines (P&C, Motor, Marine/Cargo, Liability, Health, Specialty) in international markets?',
            'Which lines of business are considered strategically relevant for digital enablement and scalable platform-based operations over the next 24–36 months?',
            'How does QIC differentiate between retail, SME, mid-market and corporate portfolios from an operational and underwriting perspective?',
            'What role do brokers, MGAs, coverholders and digital distribution channels play within QIC’s current and future go-to-market strategy?',
            'How does QIC balance local market customization with group-wide standardisation of insurance processes?'
          ]
        },
        {
          id: 'II',
          title: 'II. Operating Model & Value Chain',
          questions: [
            'How are core insurance processes (underwriting, policy administration, claims, renewals) currently organised across regions and entities?',
            'Which parts of the value chain are considered strategic core capabilities versus candidates for platform-based enablement?',
            'How does QIC currently manage cross-functional alignment between underwriting, claims, actuarial, IT and compliance functions?',
            'Where does QIC see the greatest operational friction today across the insurance lifecycle?',
            'How does QIC assess scalability constraints in its current operating model when entering new markets or launching new products?'
          ]
        },
        {
          id: 'III',
          title: 'III. Claims Strategy & Claims Excellence',
          questions: [
            'How does QIC define claims excellence at group level (e.g. speed, accuracy, leakage control, customer experience)?',
            'How are claims processes differentiated between high-frequency/low-severity and low-frequency/high-severity losses?',
            'To what extent are claims workflows standardised versus locally adapted?',
            'How does QIC currently approach fraud detection, claims triage and early loss intervention?',
            'Which claims KPIs are most critical for management steering and portfolio optimisation?'
          ]
        },
        {
          id: 'IV',
          title: 'IV. Data, Analytics & Decision Support',
          questions: [
            'How does QIC currently leverage data across underwriting, pricing, claims and portfolio management?',
            'Which data domains are considered most mature, and where does QIC see structural data gaps?',
            'How are historical data assets governed and reused across different business functions?',
            'What role does real-time or near-real-time data play today in operational decision-making?',
            'How does QIC ensure consistency between actuarial models, underwriting decisions and operational outcomes?'
          ]
        },
        {
          id: 'V',
          title: 'V. Artificial Intelligence & Advanced Analytics',
          questions: [
            'How does QIC currently classify the role of AI within its insurance operations (decision support, automation, optimisation)?',
            'Which AI-enabled use cases are already in production, piloting or strategic planning?',
            'How does QIC address explainability, transparency and human oversight in AI-supported decisions?',
            'How are AI models governed across their lifecycle (development, validation, deployment, monitoring)?',
            'What strategic considerations guide the decision between in-house AI capabilities versus external AI solutions?'
          ]
        },
        {
          id: 'VI',
          title: 'VI. Governance, Risk & Regulatory Alignment',
          questions: [
            'How does QIC ensure regulatory compliance across multiple jurisdictions while maintaining operational efficiency?',
            'How are data protection, data residency and cross-border data flows governed at group level?',
            'How does QIC prepare for evolving AI regulation, including high-risk AI classifications?',
            'How are auditability, traceability and accountability ensured within digital insurance processes?',
            'Which governance principles are considered non-negotiable in any technology partnership?'
          ]
        },
        {
          id: 'VII',
          title: 'VII. Partnership & Platform Strategy',
          questions: [
            'What role do strategic technology partners play within QIC’s long-term operating model?',
            'How does QIC evaluate platform-based partnerships versus point solutions?',
            'What expectations does QIC have regarding ownership of data, models and decision logic in a partnership context?',
            'How does QIC typically structure collaboration models (pilot, phased rollout, joint roadmap)?',
            'Which success criteria determine whether a partnership is scaled or discontinued?'
          ]
        },
        {
          id: 'VIII',
          title: 'VIII. Pilot & Joint Initiative Design',
          questions: [
            'Which lines of business or processes would be most suitable for a controlled pilot initiative?',
            'What scope and duration would QIC consider appropriate for an initial pilot?',
            'Which governance bodies or decision forums would oversee such a pilot?',
            'How would success be measured from a business, operational and risk perspective?',
            'What internal prerequisites must be fulfilled before initiating a joint pilot?'
          ]
        },
        {
          id: 'IX',
          title: 'IX. Commercial & Strategic Alignment',
          questions: [
            'How does QIC typically align commercial models with long-term strategic partnerships?',
            'Which principles guide pricing, revenue sharing or platform economics in partner relationships?',
            'How important is flexibility versus standardisation in commercial arrangements?',
            'What time horizon does QIC typically apply when assessing strategic return on technology partnerships?',
            'How does QIC ensure alignment between commercial outcomes and risk governance?'
          ]
        },
        {
          id: 'X',
          title: 'X. Strategic Outlook',
          questions: [
            'How does QIC envision the evolution of its insurance operating model over the next five years?',
            'What role should integrated digital platforms play in this evolution?',
            'Where does QIC see the greatest opportunity for structural differentiation versus competitors?',
            'Which external developments (technology, regulation, customer behaviour) are most critical for future positioning?',
            'What would define a successful long-term partnership between QIC and Insurfox from QIC’s perspective?',
            'This questionnaire is intended to establish a structured strategic dialogue and identify concrete collaboration opportunities, aligned with QIC’s business objectives, governance standards and long-term market positioning.'
          ]
        }
      ]
    }
  }

  return {
    title: 'QIC Questions',
    subtitle: 'Exploring a Potential Partnership between QIC and Insurfox',
    sections: [
      {
        id: 'A',
        title: 'I. Strategic Context & Portfolio Positioning',
        questions: [
          'Which insurance lines are you currently active in?',
          'Which lines are prioritized for a potential collaboration?',
          'Which target segments do you primarily address (e.g. SME, mid-market, corporate, consumer)?',
          'Which distribution channels are predominantly used (direct, broker, MGA, digital)?',
          'In which jurisdictions are the relevant insurance activities based?'
        ]
      },
      {
        id: 'II',
        title: 'II. Operating Model & Value Chain',
        questions: [
          'How are core insurance processes (underwriting, policy administration, claims, renewals) currently organised across regions and entities?',
          'Which parts of the value chain are considered strategic core capabilities versus candidates for platform-based enablement?',
          'How does QIC currently manage cross-functional alignment between underwriting, claims, actuarial, IT and compliance functions?',
          'Where does QIC see the greatest operational friction today across the insurance lifecycle?',
          'How does QIC assess scalability constraints in its current operating model when entering new markets or launching new products?'
        ]
      },
      {
        id: 'III',
        title: 'III. Claims Strategy & Claims Excellence',
        questions: [
          'How does QIC define claims excellence at group level (e.g. speed, accuracy, leakage control, customer experience)?',
          'How are claims processes differentiated between high-frequency/low-severity and low-frequency/high-severity losses?',
          'To what extent are claims workflows standardised versus locally adapted?',
          'How does QIC currently approach fraud detection, claims triage and early loss intervention?',
          'Which claims KPIs are most critical for management steering and portfolio optimisation?'
        ]
      },
      {
        id: 'IV',
        title: 'IV. Data, Analytics & Decision Support',
        questions: [
          'How does QIC currently leverage data across underwriting, pricing, claims and portfolio management?',
          'Which data domains are considered most mature, and where does QIC see structural data gaps?',
          'How are historical data assets governed and reused across different business functions?',
          'What role does real-time or near-real-time data play today in operational decision-making?',
          'How does QIC ensure consistency between actuarial models, underwriting decisions and operational outcomes?'
        ]
      },
      {
        id: 'V',
        title: 'V. Artificial Intelligence & Advanced Analytics',
        questions: [
          'How does QIC currently classify the role of AI within its insurance operations (decision support, automation, optimisation)?',
          'Which AI-enabled use cases are already in production, piloting or strategic planning?',
          'How does QIC address explainability, transparency and human oversight in AI-supported decisions?',
          'How are AI models governed across their lifecycle (development, validation, deployment, monitoring)?',
          'What strategic considerations guide the decision between in-house AI capabilities versus external AI solutions?'
        ]
      },
      {
        id: 'VI',
        title: 'VI. Governance, Risk & Regulatory Alignment',
        questions: [
          'How does QIC ensure regulatory compliance across multiple jurisdictions while maintaining operational efficiency?',
          'How are data protection, data residency and cross-border data flows governed at group level?',
          'How does QIC prepare for evolving AI regulation, including high-risk AI classifications?',
          'How are auditability, traceability and accountability ensured within digital insurance processes?',
          'Which governance principles are considered non-negotiable in any technology partnership?'
        ]
      },
      {
        id: 'VII',
        title: 'VII. Partnership & Platform Strategy',
        questions: [
          'What role do strategic technology partners play within QIC’s long-term operating model?',
          'How does QIC evaluate platform-based partnerships versus point solutions?',
          'What expectations does QIC have regarding ownership of data, models and decision logic in a partnership context?',
          'How does QIC typically structure collaboration models (pilot, phased rollout, joint roadmap)?',
          'Which success criteria determine whether a partnership is scaled or discontinued?'
        ]
      },
      {
        id: 'VIII',
        title: 'VIII. Pilot & Joint Initiative Design',
        questions: [
          'Which lines of business or processes would be most suitable for a controlled pilot initiative?',
          'What scope and duration would QIC consider appropriate for an initial pilot?',
          'Which governance bodies or decision forums would oversee such a pilot?',
          'How would success be measured from a business, operational and risk perspective?',
          'What internal prerequisites must be fulfilled before initiating a joint pilot?'
        ]
      },
      {
        id: 'IX',
        title: 'IX. Commercial & Strategic Alignment',
        questions: [
          'How does QIC typically align commercial models with long-term strategic partnerships?',
          'Which principles guide pricing, revenue sharing or platform economics in partner relationships?',
          'How important is flexibility versus standardisation in commercial arrangements?',
          'What time horizon does QIC typically apply when assessing strategic return on technology partnerships?',
          'How does QIC ensure alignment between commercial outcomes and risk governance?'
        ]
      },
      {
        id: 'X',
        title: 'X. Strategic Outlook',
        questions: [
          'How does QIC envision the evolution of its insurance operating model over the next five years?',
          'What role should integrated digital platforms play in this evolution?',
          'Where does QIC see the greatest opportunity for structural differentiation versus competitors?',
          'Which external developments (technology, regulation, customer behaviour) are most critical for future positioning?',
          'What would define a successful long-term partnership between QIC and Insurfox from QIC’s perspective?',
          'This questionnaire is intended to establish a structured strategic dialogue and identify concrete collaboration opportunities, aligned with QIC’s business objectives, governance standards and long-term market positioning.'
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
