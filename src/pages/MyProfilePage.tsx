import React from 'react'
import { useTranslation } from 'react-i18next'

export default function MyProfilePage() {
  const { t } = useTranslation()
  return (
    <section className="page">
      <h1 className="page-title">{t('profile.title')}</h1>
      <div className="profile-card">
        <p>{t('profile.placeholder')}</p>
      </div>
    </section>
  )
}
