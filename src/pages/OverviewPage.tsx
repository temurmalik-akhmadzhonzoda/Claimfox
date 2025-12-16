import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ROLES = [
  { key: 'driver', fallback: 'Driver' },
  { key: 'broker', fallback: 'Broker' },
  { key: 'fleetManager', fallback: 'Fleet Manager' },
  { key: 'insurer', fallback: 'Insurer' },
  { key: 'logisticCompany', fallback: 'Logistic Company' },
  { key: 'claimsManager', fallback: 'Claims Manager' },
  { key: 'assessor', fallback: 'Assessor' },
  { key: 'repairNetwork', fallback: 'Repair Network' },
  { key: 'finance', fallback: 'Finance' },
  { key: 'reinsurer', fallback: 'Reinsurer' }
] as const

export default function OverviewPage() {
  const { t } = useTranslation()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  function handleRoleClick(label: string) {
    setSelectedRole(label)
  }

  return (
    <section className="page">
      <h1 className="page-title">{t('overview.title')}</h1>
      <div className="overview-grid">
        {ROLES.map((role) => {
          const label = t(`overview.roles.${role.key}`, role.fallback)
          return (
            <button
              key={role.key}
              type="button"
              className="overview-card"
              onClick={() => handleRoleClick(label)}
            >
              {label}
            </button>
          )
        })}
      </div>
      {selectedRole && <p className="selected-role">{t('overview.selected', { role: selectedRole })}</p>}
    </section>
  )
}
