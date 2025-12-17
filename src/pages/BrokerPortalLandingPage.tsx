import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import InsurfoxLogoLight from '@/assets/logos/insurfox-logo-light.png'
import BrokerBackground from '@/assets/images/background_broker.png'

export default function BrokerPortalLandingPage() {
  const { t } = useI18n()
  const navigate = useNavigate()

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${BrokerBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(4, 1, 20, 0.85) 0%, rgba(4, 1, 20, 0.45) 60%, rgba(4, 1, 20, 0.75) 100%)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          zIndex: 2
        }}
      >
        <Button
          variant="secondary"
          onClick={() => navigate('/broker-crm')}
          style={{
            borderColor: '#fff',
            color: '#040114',
            background: '#fff',
            fontWeight: 600
          }}
        >
          {t('brokerLanding.login')}
        </Button>
      </div>
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          textAlign: 'center',
          color: '#fff',
          paddingTop: '56px'
        }}
      >
        <img
          src={InsurfoxLogoLight}
          alt="Insurfox"
          style={{
            height: '90px',
            width: 'auto',
            maxWidth: '260px',
            objectFit: 'contain',
            marginTop: '1rem'
          }}
        />
        <h1
          style={{
            margin: '1.5rem 0 0',
            color: '#ffffff',
            fontSize: '1.85rem',
            lineHeight: 1.4,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            textShadow: '0 10px 30px rgba(0, 0, 0, 0.45)'
          }}
        >
          {t('brokerLanding.title')}
        </h1>
      </div>
    </div>
  )
}
