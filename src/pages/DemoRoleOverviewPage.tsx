import React from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

type SubRole = {
  label: string
  route: string
  demoKey?: string
}

type RoleConfig = {
  title: string
  subtitle: string
  subroles: SubRole[]
}

export default function DemoRoleOverviewPage() {
  const { roleId } = useParams()
  const navigate = useNavigate()
  const { lang, t } = useI18n()

  const isEn = lang === 'en'

  const roles: Record<string, RoleConfig> = {
    underwriter: {
      title: t('roles.cards.underwriter.title'),
      subtitle: isEn ? 'Underwriting subroles' : 'Underwriter Unterrollen',
      subroles: [
        { label: 'Junior Underwriter', route: '/roles/underwriter/junior', demoKey: 'uw-junior' },
        { label: 'Senior Underwriter', route: '/roles/underwriter/senior', demoKey: 'uw-senior' },
        { label: 'Carrier UW', route: '/roles/underwriter/carrier', demoKey: 'uw-carrier' },
        { label: 'Compliance', route: '/roles/underwriter/compliance', demoKey: 'uw-compliance' },
        { label: isEn ? 'Underwriter Reporting' : 'Underwriter Reporting', route: '/roles/underwriter/reporting', demoKey: 'uw-reporting' }
      ]
    },
    legal: {
      title: t('roles.cards.legal.title'),
      subtitle: isEn ? 'Legal subroles' : 'Legal Unterrollen',
      subroles: [
        { label: 'Legal Intake', route: '/roles/legal/intake' },
        { label: 'Legal Claims Specialist', route: '/roles/legal/claims-specialist' },
        { label: 'Legal Product Distribution', route: '/roles/legal/product-distribution' },
        { label: 'Legal Regulatory Compliance', route: '/roles/legal/regulatory-compliance' },
        { label: 'Legal Litigation Manager', route: '/roles/legal/litigation-manager' },
        { label: 'Legal Carrier Final Authority', route: '/roles/legal/carrier-final-authority' }
      ]
    },
    finance: {
      title: t('roles.cards.finance.title'),
      subtitle: isEn ? 'Finance subroles' : 'Finance Unterrollen',
      subroles: [
        { label: 'Finance Analyst', route: '/roles/finance/analyst' },
        { label: 'Premium & Billing Operations', route: '/roles/finance/premium-billing' },
        { label: 'Claims Finance', route: '/roles/finance/claims' },
        { label: 'Reinsurance Finance', route: '/roles/finance/reinsurance' },
        { label: 'Financial Controller', route: '/roles/finance/controller' },
        { label: 'CFO / Carrier Finance Final Authority', route: '/roles/finance/cfo-final-authority' }
      ]
    },
    claims: {
      title: t('roles.cards.claims.title'),
      subtitle: isEn ? 'Claims subroles' : 'Claims Unterrollen',
      subroles: [
        { label: isEn ? 'Claim Manager Overview' : 'Schadenmanager Übersicht', route: '/claim-manager' },
        { label: isEn ? 'Claim Manager App' : 'Schadenmanager App', route: '/claim-manager-app' },
        { label: isEn ? 'Claim Case' : 'Schadenfall', route: '/claim-manager-case' },
        { label: isEn ? 'Claim Intake (Chatbot)' : 'Schadenmeldung (Chatbot)', route: '/claim-process' }
      ]
    },
    partner: {
      title: t('roles.cards.partner.title'),
      subtitle: isEn ? 'Partner subroles' : 'Partner Unterrollen',
      subroles: [
        { label: isEn ? 'Partner Overview' : 'Partner Übersicht', route: '/partner-management-overview' },
        { label: isEn ? 'Partner Management' : 'Partner Management', route: '/partner-management' },
        { label: isEn ? 'Assistance' : 'Assistance', route: '/partner-management-assistance' },
        { label: isEn ? 'Rental' : 'Rental', route: '/partner-management-rental' },
        { label: isEn ? 'Surveyors' : 'Surveyors', route: '/partner-management-surveyors' },
        { label: isEn ? 'Major Loss' : 'Major Loss', route: '/partner-management-major-loss' },
        { label: isEn ? 'Parts' : 'Parts', route: '/partner-management-parts' }
      ]
    },
    reporting: {
      title: t('roles.cards.reporting.title'),
      subtitle: isEn ? 'Reporting subroles' : 'Reporting Unterrollen',
      subroles: [
        { label: isEn ? 'Fleet Reporting' : 'Fleet Reporting', route: '/fleet-reporting' },
        { label: isEn ? 'Marketing Landing' : 'Marketing Landing', route: '/marketing' }
      ]
    },
    'fleet-management': {
      title: t('roles.cards.fleetManagement.title'),
      subtitle: isEn ? 'Fleet subroles' : 'Fleet Unterrollen',
      subroles: [
        { label: isEn ? 'Fleet Management' : 'Fuhrparkverwaltung', route: '/fleet-management' },
        { label: isEn ? 'Fleet Reporting' : 'Fleet Reporting', route: '/fleet-reporting' }
      ]
    },
    logistics: {
      title: t('roles.cards.logistics.title'),
      subtitle: isEn ? 'Logistics subroles' : 'Logistik Unterrollen',
      subroles: [
        { label: isEn ? 'Logistics Landing' : 'Logistik Landing', route: '/logistics' },
        { label: isEn ? 'Logistics App' : 'Logistik App', route: '/logistics-app' }
      ]
    },
    'broker-crm': {
      title: t('roles.brokerPortal'),
      subtitle: isEn ? 'Broker CRM subroles' : 'Broker CRM Unterrollen',
      subroles: [
        { label: t('roles.brokerPortal'), route: '/broker-crm' }
      ]
    },
    'broker-admin': {
      title: t('roles.cards.brokerAdmin.title'),
      subtitle: isEn ? 'Broker administration subroles' : 'Broker Verwaltung Unterrollen',
      subroles: [
        { label: t('roles.cards.brokerAdmin.title'), route: '/broker-admin' }
      ]
    }
  }

  if (!roleId || !roles[roleId]) {
    return <Navigate to="/demo" replace />
  }

  const config = roles[roleId]
  const showContext = roleId === 'underwriter'
  const underwriterContext = showContext
    ? [
        {
          label: 'Junior Underwriter',
          decision: 'Risiken im Korridor freigeben.',
          accountability: 'Evidenzqualität und SLA-Einhaltung.',
          selected: true
        },
        {
          label: 'Senior Underwriter',
          decision: 'Overrides mit Governance-Freigabe.',
          accountability: 'Portfolio-Impact und Eskalationslogik.'
        },
        {
          label: 'Carrier Authority',
          decision: 'finale Kapazitäts- und Limitfreigaben.',
          accountability: 'Risikotragung und regulatorische Konformität.'
        },
        {
          label: 'Compliance',
          decision: 'Regel- und Audit-Integrität prüfen.',
          accountability: 'Audit-Trail und Governance-Disziplin.'
        },
        {
          label: 'Underwriter Reporting',
          decision: 'Portfolio- und Referral-Transparenz steuern.',
          accountability: 'Entscheidungsqualität und Reporting-Standards.'
        }
      ]
    : []
  const underwriterDescriptions = showContext
    ? underwriterContext.reduce<Record<string, { decision: string; accountability: string }>>((acc, role) => {
        const key = role.label.toLowerCase().replace(/\s+/g, '-')
        acc[key] = { decision: role.decision, accountability: role.accountability }
        return acc
      }, {})
    : {}

  return (
    <section className="uw-page">
      <div className="uw-container">
        <Header
          title={config.title}
          subtitle={config.subtitle}
          subtitleColor="#65748b"
          actions={(
            <Button variant="secondary" disableHover onClick={() => navigate('/demo')}>
              Back to overview
            </Button>
          )}
        />

        {showContext && (
          <Card variant="glass" className="uw-card" style={{ padding: '8px 10px' }}>
            <div className="uw-card-body" style={{ gap: '0.45rem' }}>
              <strong style={{ fontSize: '0.9rem' }}>Role context</strong>
              {underwriterContext.map((role) => (
                <div key={role.label} style={{ display: 'grid', gap: '0.08rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <strong style={{ fontSize: '0.88rem' }}>{role.label}</strong>
                    {role.selected && (
                      <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ix-text-muted)' }}>
                        Selected
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.85rem' }}>Decides on {role.decision}</span>
                  <span style={{ fontSize: '0.85rem' }}>Accountable for {role.accountability}</span>
                </div>
              ))}
              <span className="uw-muted" style={{ fontSize: '0.82rem' }}>
                This role decides on Risiken im Korridor freigeben and is accountable for Evidenzqualität und SLA-Einhaltung.
              </span>
            </div>
          </Card>
        )}

        <div
          className="uw-grid uw-cards"
          style={roleId === 'underwriter' ? { gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '0.6rem' } : undefined}
        >
          {config.subroles.map((subrole) => {
            const isCompact = roleId === 'underwriter'
            const targetRoute = subrole.demoKey ? `/demo/step/1?role=${subrole.demoKey}` : '/demo/step/1'
            const helperText = isCompact
              ? (isEn ? 'Demo' : 'Demo')
              : (isEn ? 'Start the guided demo flow (no data captured).' : 'Starte den geführten Demo-Flow (keine Datenerfassung).')
            const descriptionKey = isCompact
              ? subrole.label.toLowerCase().replace(/\s+/g, '-')
              : ''
            const description = isCompact ? underwriterDescriptions[descriptionKey] : undefined
            return (
              <Card
                key={subrole.route}
                title={isCompact ? undefined : subrole.label}
                variant="glass"
                className="uw-card"
                style={isCompact ? { minHeight: '56px', padding: '8px 10px' } : undefined}
              >
                <div
                  className="uw-card-body"
                  style={{
                    gap: isCompact ? '0.4rem' : '0.35rem',
                    flexDirection: isCompact ? 'row' : 'column',
                    alignItems: isCompact ? 'center' : 'flex-start',
                    justifyContent: isCompact ? 'space-between' : 'flex-start',
                    width: '100%'
                  }}
                >
                  {isCompact && (
                    <div style={{ display: 'grid', gap: '0.15rem', minWidth: 0 }}>
                      <strong style={{ fontSize: '0.9rem' }}>{subrole.label}</strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--ix-text-muted)' }}>{helperText}</span>
                      {description && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--ix-text)' }}>
                          Decides on {description.decision}
                        </span>
                      )}
                      {description && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--ix-text-muted)' }}>
                          Accountable for {description.accountability}
                        </span>
                      )}
                    </div>
                  )}
                  {!isCompact && (
                    <span style={{ fontSize: '0.85rem', color: 'var(--ix-text-muted)' }}>{helperText}</span>
                  )}
                  <Button
                    onClick={() => navigate(targetRoute)}
                    disableHover
                    style={{
                      background: '#281c65',
                      color: '#fff',
                      padding: isCompact ? '0.2rem 0.6rem' : '0.4rem 0.9rem',
                      fontSize: isCompact ? '0.75rem' : '0.9rem',
                      boxShadow: 'none',
                      flexShrink: 0
                    }}
                  >
                    Demo starten
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
