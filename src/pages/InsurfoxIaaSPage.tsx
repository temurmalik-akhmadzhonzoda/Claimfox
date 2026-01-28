import React, { useMemo } from 'react'
import BciaDeckPage, { type BciaSlide } from '@/pages/BciaDeckPage'
import InsuranceProcesses from '@/assets/images/insurance_processes.png'
import InsurfoxLogo from '@/assets/logos/Insurfox_Logo_colored_dark.png'
import '@/styles/insurfox-iaas.css'

export default function InsurfoxIaaSPage() {
  const introSlide = useMemo<BciaSlide>(() => ({
    key: 'insurfox-iaas-intro',
    node: (
      <div className="insurfox-iaas-slide">
        <div className="insurfox-iaas-stage">
          <img
            className="insurfox-iaas-image"
            src={InsuranceProcesses}
            alt="Insurance processes"
          />
          <div className="insurfox-iaas-card">
            <img src={InsurfoxLogo} alt="Insurfox" />
          </div>
        </div>
      </div>
    )
  }), [])

  return (
    <BciaDeckPage
      includeKeys={['program-structure-intro', 'markets', 'premium']}
      prependSlides={[introSlide]}
      showPrint={false}
      showPrintButton={false}
    />
  )
}
