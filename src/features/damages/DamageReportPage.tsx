import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createMockClaim } from '../../shared/api/mock/claims'
import { useTranslation } from 'react-i18next'

export default function DamageReportPage() {
  const { t } = useTranslation()
  const [step, setStep] = useState(1)
  const [title, setTitle] = useState('')
  const navigate = useNavigate()

  function submit() {
    createMockClaim({ title: title || 'New claim' })
    navigate('/damages')
  }

  return (
    <div className="page damage-report">
      <h2>{t('damageReport.title', 'Damage Report')}</h2>
      {step === 1 && (
        <div>
          <label>What happened?<input value={title} onChange={(e) => setTitle(e.target.value)} /></label>
          <button onClick={() => setStep(2)}>{t('common.next', 'Next')}</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <p>Confirm and submit</p>
          <button onClick={submit}>{t('damageReport.submit', 'Submit')}</button>
        </div>
      )}
    </div>
  )
}
