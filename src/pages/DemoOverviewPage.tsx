import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

const demoTracks = [
  {
    id: 'underwriting',
    title: 'Underwriting Decision',
    description: 'Decide fast with clear corridors and accountable authority.',
    badges: ['AI-supported', 'Audit-ready']
  },
  {
    id: 'claims-legal',
    title: 'Claims & Legal Review',
    description: 'Resolve complex cases with explainable guidance and traceability.',
    badges: ['AI-supported', 'Audit-ready']
  },
  {
    id: 'finance-reinsurance',
    title: 'Finance & Reinsurance',
    description: 'Protect capital while keeping decisions aligned and recorded.',
    badges: ['AI-supported', 'Audit-ready']
  },
  {
    id: 'fraud-compliance',
    title: 'Fraud & Compliance',
    description: 'Surface anomalies early with governance built into every action.',
    badges: ['AI-supported', 'Audit-ready']
  }
]

const clickDummies = [
  {
    id: 'guided-flow',
    title: 'Guided Decision Flow',
    description: 'Role to audit in five clear steps.',
    cta: 'Start flow'
  },
  {
    id: 'claims-legal',
    title: 'Claims & Legal Review',
    description: 'Dispute handling with explainable guidance.',
    cta: 'Open dummy'
  },
  {
    id: 'finance-reinsurance',
    title: 'Finance & Reinsurance',
    description: 'Capital decisions with governance guardrails.',
    cta: 'Open dummy'
  },
  {
    id: 'fraud-compliance',
    title: 'Fraud & Compliance',
    description: 'Anomaly escalation with audit trail.',
    cta: 'Open dummy'
  }
]

export default function DemoOverviewPage() {
  const navigate = useNavigate()
  const { t } = useI18n()

  const overviewGroups = [
    {
      title: t('roles.overviewGroups.insurance'),
      items: [
        { label: t('roles.cards.underwriter.title'), route: '/roles/underwriter' },
        { label: t('roles.cards.legal.title'), route: '/roles/legal' },
        { label: t('roles.cards.finance.title'), route: '/roles/finance' },
        { label: t('roles.cards.claims.title'), route: '/claim-manager' },
        { label: t('roles.cards.partner.title'), route: '/partner-management-overview' }
      ]
    },
    {
      title: t('roles.overviewGroups.fleet'),
      items: [
        { label: t('roles.cards.reporting.title'), route: '/marketing' },
        { label: t('roles.cards.fleetManagement.title'), route: '/fleet-management' }
      ]
    },
    {
      title: t('roles.overviewGroups.logistics'),
      items: [
        { label: t('roles.cards.logistics.title'), route: '/logistics' }
      ]
    },
    {
      title: t('roles.overviewGroups.broker'),
      items: [
        { label: t('roles.brokerPortal'), route: '/broker-portal' }
      ]
    }
  ]

  const processItems = [
    { label: t('roles.cards.registration.title'), route: '/registration' },
    { label: t('roles.cards.onboarding.title'), route: '/profile/onboarding' },
    { label: t('roles.cards.profile.title'), route: '/profile' },
    { label: t('roles.cards.identification.title'), route: '/user-identification' },
    { label: t('roles.cards.getQuote.title'), route: '/get-quote' },
    { label: t('roles.cards.policyPurchase.title'), route: '/policy-purchase' },
    { label: t('roles.cards.claimProcess.title'), route: '/claim-process' }
  ]

  const governanceItems = [
    { label: t('roles.cards.regulatoryGovernance.title'), route: '/governance/regulatory-ai-governance' },
    { label: t('roles.cards.auditAppendix.title'), route: '/governance/audit-appendix' }
  ]

  const presentationItems = [
    { label: t('roles.cards.insurfoxWhitepaper.title'), route: '/insurfox-whitepaper' },
    { label: t('roles.cards.businessModelAntares.title'), route: '/business-model-antares' },
    { label: t('roles.cards.businessModelAntaresTest.title'), route: '/business-model-antares-test' },
    { label: t('roles.cards.strategicDeepDive.title'), route: '/governance/strategic-deep-dive' },
    { label: t('roles.cards.requirementsCatalog.title'), route: '/requirements-catalog' },
    { label: t('roles.cards.whitepaper.title'), route: '/ai-whitepaper' },
    { label: t('roles.cards.questionsQic.title'), route: '/questions-qic' }
  ]

  const developmentItems = [
    { label: t('roles.cards.mvp.title'), route: '/mvp' },
    { label: t('roles.cards.setup.title'), route: '/setup' },
    { label: t('roles.cards.aiOnboarding.title'), route: '/ai-onboarding' },
    { label: t('roles.cards.featureTree.title'), route: '/feature-tree' },
    { label: t('roles.cards.intern.title'), route: '/intern' }
  ]

  const projectLandingItems = [
    { label: t('roles.cards.landingSitemap.title'), route: '/landing/sitemap' },
    { label: t('roles.cards.landingTools.title'), route: '/landing/tools' }
  ]

  return (
    <section className="uw-page">
      <div className="uw-container">
        <Header
          title="Insurfox Interactive Demo"
          subtitle="Experience insurance decisions across roles - powered by AI and governance."
          subtitleColor="#65748b"
          actions={(
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Button onClick={() => navigate('/demo/step/1')} disableHover>
                Start Guided Demo
              </Button>
              <Button onClick={() => navigate('/demo/step/1')} variant="secondary" disableHover>
                Jump to Role
              </Button>
            </div>
          )}
        />

        <div className="uw-section">
          <h2 className="uw-section-title">Decision storylines</h2>
          <div className="uw-grid uw-cards">
            {demoTracks.map((track) => (
              <Card
                key={track.id}
                title={track.title}
                subtitle={track.description}
                variant="glass"
                className="uw-card"
                interactive
                onClick={() => navigate('/demo/step/1')}
              >
                <div className="uw-card-body" style={{ gap: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {track.badges.map((badge) => (
                      <span
                        key={badge}
                        style={{
                          fontSize: '0.72rem',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          padding: '0.25rem 0.5rem',
                          border: '1px solid var(--ix-border)',
                          color: 'var(--ix-text-muted)'
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <Button onClick={() => navigate('/demo/step/1')} variant="secondary" disableHover>
                    Open track
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="uw-section">
          <h2 className="uw-section-title">Click dummies</h2>
          <div className="uw-grid uw-cards">
            {clickDummies.map((dummy) => (
              <Card
                key={dummy.id}
                title={dummy.title}
                subtitle={dummy.description}
                variant="glass"
                className="uw-card"
                interactive
                onClick={() => navigate('/demo/step/1')}
              >
                <div className="uw-card-body" style={{ gap: '0.75rem' }}>
                  <Button onClick={() => navigate('/demo/step/1')} variant="secondary" disableHover>
                    {dummy.cta}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="uw-section">
          <h2 className="uw-section-title">{t('roles.sections.overview')}</h2>
          <div className="uw-grid uw-cards">
            {overviewGroups.map((group) => (
              <Card key={group.title} variant="glass" className="uw-card">
                <div className="uw-card-body" style={{ gap: '0.5rem' }}>
                  <strong>{group.title}</strong>
                  {group.items.map((role) => (
                    <button
                      key={role.route}
                      type="button"
                      onClick={() => navigate(role.route)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        color: 'var(--ix-primary)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="uw-section">
          <h2 className="uw-section-title">{t('roles.sections.processes')}</h2>
          <Card variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.5rem' }}>
              {processItems.map((item) => (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => navigate(item.route)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--ix-primary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </Card>
        </div>

        <div className="uw-section">
          <h2 className="uw-section-title">{t('roles.sections.governance')}</h2>
          <Card variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.5rem' }}>
              {governanceItems.map((item) => (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => navigate(item.route)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--ix-primary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </Card>
        </div>

        <div className="uw-section">
          <h2 className="uw-section-title">{t('roles.sections.presentations')}</h2>
          <Card variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.5rem' }}>
              {presentationItems.map((item) => (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => navigate(item.route)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--ix-primary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </Card>
        </div>

        <div className="uw-section">
          <h2 className="uw-section-title">{t('roles.sections.development')}</h2>
          <Card variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.5rem' }}>
              {developmentItems.map((item) => (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => navigate(item.route)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--ix-primary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </Card>
        </div>

        <div className="uw-section">
          <h2 className="uw-section-title">{t('roles.sections.projectLanding')}</h2>
          <Card variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.5rem' }}>
              {projectLandingItems.map((item) => (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => navigate(item.route)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--ix-primary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </Card>
        </div>

        <div className="uw-section">
          <h2 className="uw-section-title">{t('roles.sections.internalDocs')}</h2>
          <Card variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => navigate('/internal-docs')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: 'var(--ix-primary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {t('roles.sections.internalDocs')}
              </button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
