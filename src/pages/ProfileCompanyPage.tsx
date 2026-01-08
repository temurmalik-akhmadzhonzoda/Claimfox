import React, { useState } from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

type FieldType = 'text'

type FieldDefinition = {
  key: string
  labelKey: string
  required: boolean
  type: FieldType
}

const COMPANY_FIELDS: FieldDefinition[] = [
  { key: 'company.name', labelKey: 'profile.fields.companyName', required: true, type: 'text' },
  { key: 'company.legal_form', labelKey: 'profile.fields.legalForm', required: true, type: 'text' },
  { key: 'company.address.street', labelKey: 'profile.fields.street', required: true, type: 'text' },
  { key: 'company.address.house_number', labelKey: 'profile.fields.houseNumber', required: true, type: 'text' },
  { key: 'company.address.additional', labelKey: 'profile.fields.addressAdditional', required: false, type: 'text' },
  { key: 'company.address.zip', labelKey: 'profile.fields.zip', required: true, type: 'text' },
  { key: 'company.address.city', labelKey: 'profile.fields.city', required: true, type: 'text' },
  { key: 'company.address.country', labelKey: 'profile.fields.country', required: true, type: 'text' },
  { key: 'company.vat_id', labelKey: 'profile.fields.vatId', required: false, type: 'text' }
]

const STORAGE_KEY = 'cf_profile_wizard'

export default function ProfileCompanyPage() {
  const { t } = useI18n()
  const [saved, setSaved] = useState(false)
  const [formData, setFormData] = useState<Record<string, string | boolean>>(() => {
    if (typeof window === 'undefined') return {}
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as { data?: Record<string, string | boolean> }) : undefined
    return parsed?.data ?? {}
  })
  const [initialData, setInitialData] = useState(() => formData)

  function handleChange(fieldKey: string, value: string) {
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
    setInitialData(formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const hasChanges = JSON.stringify(initialData) !== JSON.stringify(formData)

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 980, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Header title={t('profile.overview.sections.company')} subtitle={t('profile.steps.company.subtitle')} subtitleColor="#65748b" />
        <Card>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {COMPANY_FIELDS.map((field) => {
              const value = formData[field.key]
              return (
                <label key={field.key} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', color: '#475569' }}>
                  <span style={{ fontWeight: 600 }}>
                    {t(field.labelKey)}
                    {field.required ? ' *' : ''}
                  </span>
                  <input
                    className="text-input"
                    type="text"
                    value={typeof value === 'string' ? value : ''}
                    onChange={(event) => handleChange(field.key, event.target.value)}
                  />
                </label>
              )
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Button onClick={handleSave} disabled={!hasChanges}>
                {t('profile.actions.save')}
              </Button>
              {saved && <span style={{ alignSelf: 'center', color: '#15803d', fontWeight: 600 }}>{t('profile.saved')}</span>}
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
