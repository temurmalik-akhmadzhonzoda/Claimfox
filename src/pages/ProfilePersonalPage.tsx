import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

type FieldType = 'text' | 'email' | 'password' | 'tel' | 'boolean' | 'select'

type FieldDefinition = {
  key: string
  labelKey: string
  required: boolean
  type: FieldType
  options?: Array<{ value: string; labelKey: string }>
}

const PERSONAL_FIELDS: FieldDefinition[] = [
  { key: 'contact.salutation', labelKey: 'profile.fields.salutation', required: false, type: 'text' },
  { key: 'contact.first_name', labelKey: 'profile.fields.contactFirstName', required: true, type: 'text' },
  { key: 'contact.last_name', labelKey: 'profile.fields.contactLastName', required: true, type: 'text' },
  { key: 'contact.phone_country_code', labelKey: 'profile.fields.phoneCountryCode', required: true, type: 'text' },
  { key: 'contact.phone', labelKey: 'profile.fields.phone', required: true, type: 'tel' },
  {
    key: 'account.language',
    labelKey: 'profile.fields.language',
    required: true,
    type: 'select',
    options: [
      { value: 'de', labelKey: 'profile.options.language.de' },
      { value: 'en', labelKey: 'profile.options.language.en' }
    ]
  },
  { key: 'account.password', labelKey: 'profile.fields.password', required: true, type: 'password' },
  { key: 'account.password_confirm', labelKey: 'profile.fields.passwordConfirm', required: true, type: 'password' },
  { key: 'account.advisor_code', labelKey: 'profile.fields.advisorCode', required: false, type: 'text' },
  { key: 'company.director.first_name', labelKey: 'profile.fields.directorFirstName', required: true, type: 'text' },
  { key: 'company.director.last_name', labelKey: 'profile.fields.directorLastName', required: true, type: 'text' },
  { key: 'kyc.has_branch_in_sanctioned_region', labelKey: 'profile.fields.kycBranch', required: true, type: 'boolean' },
  { key: 'kyc.director_from_sanctioned_region', labelKey: 'profile.fields.kycDirector', required: true, type: 'boolean' },
  { key: 'kyc.has_business_with_sanctioned_region', labelKey: 'profile.fields.kycBusiness', required: true, type: 'boolean' }
]

const STORAGE_KEY = 'cf_profile_wizard'

export default function ProfilePersonalPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)
  const [formData, setFormData] = useState<Record<string, string | boolean>>(() => {
    if (typeof window === 'undefined') return {}
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as { data?: Record<string, string | boolean> }) : undefined
    return parsed?.data ?? {}
  })

  function handleChange(fieldKey: string, value: string | boolean) {
    const next = { ...formData, [fieldKey]: value }
    setFormData(next)
    if (typeof window !== 'undefined') {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      const parsed = raw ? (JSON.parse(raw) as { step?: number; completed?: boolean }) : undefined
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: parsed?.step ?? 0, data: next, completed: parsed?.completed ?? false }))
    }
  }

  function handleSave() {
    if (typeof window !== 'undefined') {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      const parsed = raw ? (JSON.parse(raw) as { step?: number; completed?: boolean }) : undefined
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: parsed?.step ?? 0, data: formData, completed: parsed?.completed ?? false }))
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 980, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Header title={t('profile.overview.sections.personal')} subtitle={t('profile.steps.personal.subtitle')} subtitleColor="#65748b" />
        <Card>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {PERSONAL_FIELDS.map((field) => {
              const value = formData[field.key]
              return (
                <label key={field.key} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', color: '#475569' }}>
                  <span style={{ fontWeight: 600 }}>
                    {t(field.labelKey)}
                    {field.required ? ' *' : ''}
                  </span>
                  {field.type === 'boolean' ? (
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => handleChange(field.key, true)}
                        style={{
                          borderRadius: '999px',
                          padding: '0.45rem 1rem',
                          border: '1px solid #d9d9d9',
                          background: value === true ? '#fde8df' : '#ffffff',
                          color: '#0f172a',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {t('profile.options.yes')}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleChange(field.key, false)}
                        style={{
                          borderRadius: '999px',
                          padding: '0.45rem 1rem',
                          border: '1px solid #d9d9d9',
                          background: value === false ? '#fde8df' : '#ffffff',
                          color: '#0f172a',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {t('profile.options.no')}
                      </button>
                    </div>
                  ) : field.type === 'select' ? (
                    <select
                      className="text-input"
                      value={typeof value === 'string' ? value : ''}
                      onChange={(event) => handleChange(field.key, event.target.value)}
                    >
                      <option value="">{t('profile.options.select')}</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {t(option.labelKey)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="text-input"
                      type={field.type}
                      value={typeof value === 'string' ? value : ''}
                      onChange={(event) => handleChange(field.key, event.target.value)}
                    />
                  )}
                </label>
              )
            })}
          </div>
          {formData['account.password'] &&
            formData['account.password_confirm'] &&
            formData['account.password'] !== formData['account.password_confirm'] && (
              <p style={{ marginTop: '0.75rem', color: '#B42318', fontWeight: 600 }}>
                {t('profile.passwordMismatch')}
              </p>
            )}
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button variant="secondary" onClick={handleSave}>
                {t('profile.actions.save')}
              </Button>
              {saved && <span style={{ alignSelf: 'center', color: '#15803d', fontWeight: 600 }}>{t('profile.saved')}</span>}
            </div>
            <Button onClick={() => navigate('/profile')}>{t('profile.overview.back')}</Button>
          </div>
        </Card>
      </div>
    </section>
  )
}
