import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

export default function DemoOverviewPage() {
  const navigate = useNavigate()
  const { t } = useI18n()

  const overviewGroups = [
    {
      title: t('roles.overviewGroups.insurance'),
      items: [
        { label: t('roles.cards.underwriter.title'), roleId: 'underwriter' },
        { label: t('roles.cards.legal.title'), roleId: 'legal' },
        { label: t('roles.cards.finance.title'), roleId: 'finance' },
        { label: t('roles.cards.claims.title'), roleId: 'claims' },
        { label: t('roles.cards.partner.title'), roleId: 'partner' }
      ]
    },
    {
      title: t('roles.overviewGroups.fleet'),
      items: [
        { label: 'Fahrer', roleId: 'driver-demo' },
        { label: t('roles.cards.reporting.title'), roleId: 'reporting' },
        { label: t('roles.cards.fleetManagement.title'), roleId: 'fleet-management' }
      ]
    },
    {
      title: t('roles.overviewGroups.logistics'),
      items: [
        { label: t('roles.cards.logistics.title'), roleId: 'logistics' }
      ]
    },
    {
      title: t('roles.overviewGroups.broker'),
      items: [
        { label: t('roles.brokerPortal'), roleId: 'broker-crm' },
        { label: t('roles.cards.brokerAdmin.title'), roleId: 'broker-admin' }
      ]
    }
  ]

  return (
    <section className="uw-page">
      <div className="uw-container">
        <div className="uw-section">
          <h2 className="uw-section-title">{t('roles.sections.overview')}</h2>
          <div className="uw-grid uw-cards">
            {overviewGroups.map((group) => (
              <Card
                key={group.title}
                title={group.title}
                variant="glass"
                className="uw-card"
              >
                <div className="uw-card-body">
                  <div className="uw-actions">
                    {group.items.map((role) => (
                      <Button
                        key={role.roleId}
                        variant="secondary"
                        disableHover
                        onClick={() => {
                          if (role.roleId === 'driver-demo') {
                            navigate('/demo-driver')
                            return
                          }
                          navigate(`/demo/role/${role.roleId}`)
                        }}
                      >
                        {role.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
