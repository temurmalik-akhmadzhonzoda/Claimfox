import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

export default function ProfileFleetPage() {
  const { t } = useI18n()
  const navigate = useNavigate()

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 980, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Header title={t('profile.overview.sections.fleet')} subtitle={t('profile.placeholders.fleet')} subtitleColor="#65748b" />
        <Card>
          <p style={{ margin: 0, color: '#475569' }}>{t('profile.placeholders.fleet')}</p>
          <div style={{ marginTop: '1rem' }}>
            <Button onClick={() => navigate('/profile')}>{t('profile.overview.back')}</Button>
          </div>
        </Card>
      </div>
    </section>
  )
}
