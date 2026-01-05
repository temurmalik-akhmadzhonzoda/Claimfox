import React, { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import ClaimsfoxIcon from '@/assets/logos/Claimsfox_icon.png'
import { useI18n } from '@/i18n/I18nContext'

type ChatMessage = {
  id: string
  author: 'bot' | 'user'
  text: string
  time: string
}

const layoutStyles = `
  .claim-process-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: minmax(0, 1fr);
  }
  @media (min-width: 980px) {
    .claim-process-grid {
      grid-template-columns: minmax(0, 1.55fr) minmax(0, 0.9fr);
    }
  }
`

const BOT_BUBBLE = '#F8F7FF'
const USER_BUBBLE = '#FFE4DB'

export default function ClaimProcessPage() {
  const { t, lang } = useI18n()
  const navigate = useNavigate()
  const locale = lang === 'de' ? 'de-DE' : 'en-US'
  const now = useMemo(() => new Date(), [])
  const dateLabel = useMemo(
    () => now.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' }),
    [now, locale]
  )
  const timeLabel = useMemo(
    () => now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }),
    [now, locale]
  )
  const messageId = useRef(0)
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: `m-${messageId.current++}`,
      author: 'bot',
      text: t('claimProcess.intro'),
      time: timeLabel
    },
    {
      id: `m-${messageId.current++}`,
      author: 'bot',
      text: t('claimProcess.timeStampMessage', { date: dateLabel, time: timeLabel }),
      time: timeLabel
    },
    {
      id: `m-${messageId.current++}`,
      author: 'bot',
      text: t('claimProcess.askLocation'),
      time: timeLabel
    },
    {
      id: `m-${messageId.current++}`,
      author: 'bot',
      text: t('claimProcess.askDescription'),
      time: timeLabel
    }
  ])
  const [draft, setDraft] = useState('')
  const [locationState, setLocationState] = useState<'idle' | 'pending' | 'granted' | 'denied'>('idle')
  const [street, setStreet] = useState('')
  const [houseNumber, setHouseNumber] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')
  const [claimNumber] = useState(() => `DE-${Math.floor(100000 + Math.random() * 900000)}`)
  const [files, setFiles] = useState<File[]>([])

  const locationLabel =
    street && houseNumber && postalCode && city
      ? `${street} ${houseNumber}, ${postalCode} ${city}`
      : locationState === 'pending'
      ? t('claimProcess.locationPendingShort')
      : locationState === 'denied'
      ? t('claimProcess.locationUnknown')
      : t('claimProcess.locationUnknown')

  const locationDetail =
    street && houseNumber && postalCode && city ? locationLabel : t('claimProcess.locationUnknown')

  const uploadLabel =
    files.length === 0
      ? t('claimProcess.uploadEmpty')
      : t('claimProcess.uploadCount', { count: files.length })

  function fillDemoAddress() {
    setStreet(t('claimProcess.demoStreet'))
    setHouseNumber(t('claimProcess.demoHouseNumber'))
    setPostalCode(t('claimProcess.demoPostalCode'))
    setCity(t('claimProcess.demoCity'))
  }

  function getTimeStamp() {
    return new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
  }

  function appendMessage(author: ChatMessage['author'], text: string) {
    setMessages((prev) => [
      ...prev,
      {
        id: `m-${messageId.current++}`,
        author,
        text,
        time: getTimeStamp()
      }
    ])
  }

  function handleSend() {
    const trimmed = draft.trim()
    if (!trimmed) return
    appendMessage('user', trimmed)
    setDraft('')
    appendMessage('bot', t('claimProcess.botAck'))
    appendMessage('bot', t('claimProcess.claimNumberMessage', { claimNumber }))
  }

  function handleLocationRequest() {
    if (locationState === 'pending') return
    setLocationState('pending')
    appendMessage('bot', t('claimProcess.locationPending'))

    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setLocationState('denied')
      appendMessage('bot', t('claimProcess.locationDenied'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        const demoStreet = t('claimProcess.demoStreet')
        const demoHouseNumber = t('claimProcess.demoHouseNumber')
        const demoPostalCode = t('claimProcess.demoPostalCode')
        const demoCity = t('claimProcess.demoCity')
        const demoAddress = `${demoStreet} ${demoHouseNumber}, ${demoPostalCode} ${demoCity}`
        fillDemoAddress()
        setLocationState('granted')
        appendMessage('bot', t('claimProcess.locationGranted', { address: demoAddress }))
      },
      () => {
        setLocationState('denied')
        appendMessage('bot', t('claimProcess.locationDenied'))
      },
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  return (
    <>
      <style>{layoutStyles}</style>
      <section
        style={{
          minHeight: '100vh',
          width: '100%',
          padding: 'calc(var(--header-height) + 32px) 1.25rem 4rem',
          display: 'flex',
          justifyContent: 'center',
          color: '#ffffff'
        }}
      >
        <div style={{ width: '100%', maxWidth: 1200, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Header
            title={t('claimProcess.title')}
            subtitle={t('claimProcess.subtitle')}
            titleColor="#ffffff"
            subtitleColor="rgba(255,255,255,0.8)"
            actions={
              <Button variant="secondary" onClick={() => navigate('/roles')}>
                {t('claimProcess.back')}
              </Button>
            }
          />

          <div className="claim-process-grid">
            <Card variant="glass" style={{ padding: '1.5rem', color: '#0e0d1c' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    borderRadius: '20px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    minHeight: '360px'
                  }}
                >
                  {messages.map((message) => {
                    const isUser = message.author === 'user'
                    return (
                      <div
                        key={message.id}
                        style={{
                          display: 'flex',
                          justifyContent: isUser ? 'flex-end' : 'flex-start',
                          gap: '0.5rem'
                        }}
                      >
                        {!isUser && (
                          <img src={ClaimsfoxIcon} alt="Claimsfox" style={{ width: '28px', height: '28px' }} />
                        )}
                        <div style={{ maxWidth: '78%', display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start' }}>
                          <div
                            style={{
                              background: isUser ? USER_BUBBLE : BOT_BUBBLE,
                              color: '#0e0d1c',
                              padding: '0.85rem 1.1rem',
                              borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                              boxShadow: '0 12px 25px rgba(8, 4, 50, 0.08)',
                              whiteSpace: 'pre-line'
                            }}
                          >
                            {message.text}
                          </div>
                          <span style={{ fontSize: '0.7rem', color: 'rgba(8,0,40,0.5)', marginTop: '0.25rem' }}>
                            {message.time}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                  <Button
                    onClick={handleLocationRequest}
                    disabled={locationState === 'pending'}
                    style={{ padding: '0.6rem 1.3rem' }}
                  >
                    {t('claimProcess.locationButton')}
                  </Button>
                  <span style={{ color: '#ffffff', fontSize: '0.9rem' }}>{t('claimProcess.nextPrompt')}</span>
                </div>

                <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
                  <input
                    value={street}
                    onChange={(event) => setStreet(event.target.value)}
                    placeholder={t('claimProcess.street')}
                    style={{
                      borderRadius: '14px',
                      border: '1px solid rgba(255,255,255,0.35)',
                      padding: '0.6rem 0.85rem',
                      background: 'rgba(255,255,255,0.9)',
                      color: '#0e0d1c'
                    }}
                  />
                  <input
                    value={houseNumber}
                    onChange={(event) => setHouseNumber(event.target.value)}
                    placeholder={t('claimProcess.houseNumber')}
                    style={{
                      borderRadius: '14px',
                      border: '1px solid rgba(255,255,255,0.35)',
                      padding: '0.6rem 0.85rem',
                      background: 'rgba(255,255,255,0.9)',
                      color: '#0e0d1c'
                    }}
                  />
                  <input
                    value={postalCode}
                    onChange={(event) => setPostalCode(event.target.value)}
                    placeholder={t('claimProcess.postalCode')}
                    style={{
                      borderRadius: '14px',
                      border: '1px solid rgba(255,255,255,0.35)',
                      padding: '0.6rem 0.85rem',
                      background: 'rgba(255,255,255,0.9)',
                      color: '#0e0d1c'
                    }}
                  />
                  <input
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    placeholder={t('claimProcess.city')}
                    style={{
                      borderRadius: '14px',
                      border: '1px solid rgba(255,255,255,0.35)',
                      padding: '0.6rem 0.85rem',
                      background: 'rgba(255,255,255,0.9)',
                      color: '#0e0d1c'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                  <label
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: '#d4380d',
                      color: '#fff',
                      padding: '0.6rem 1.2rem',
                      borderRadius: '999px',
                      cursor: 'pointer',
                      fontWeight: 700
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
                      style={{ display: 'none' }}
                    />
                    {t('claimProcess.upload')}
                  </label>
                  <span style={{ color: 'rgba(255,255,255,0.8)' }}>{uploadLabel}</span>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <input
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder={t('claimProcess.inputPlaceholder')}
                    style={{
                      flex: '1 1 240px',
                      borderRadius: '14px',
                      border: '1px solid rgba(255,255,255,0.35)',
                      padding: '0.7rem 0.9rem',
                      background: 'rgba(255,255,255,0.9)',
                      color: '#0e0d1c'
                    }}
                  />
                  <Button onClick={handleSend} style={{ padding: '0.6rem 1.5rem' }}>
                    {t('claimProcess.send')}
                  </Button>
                </div>
              </div>
            </Card>

            <Card variant="glass" style={{ padding: '1.5rem', color: '#ffffff' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0 }}>{t('claimProcess.infoTitle')}</h3>
                  <p style={{ margin: '0.35rem 0 0', color: 'rgba(255,255,255,0.75)' }}>
                    {t('claimProcess.infoSubtitle')}
                  </p>
                </div>

                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>{t('claimProcess.infoLocation')}</span>
                    <strong>{locationDetail}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>{t('claimProcess.infoDate')}</span>
                    <strong>{dateLabel}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>{t('claimProcess.infoTime')}</span>
                    <strong>{timeLabel}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>{t('claimProcess.infoClaimNumber')}</span>
                    <strong>{claimNumber}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>{t('claimProcess.infoStatus')}</span>
                    <strong>{t('claimProcess.statusOpen')}</strong>
                  </div>
                </div>

                <div
                  style={{
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.25)',
                    background: 'rgba(255,255,255,0.08)',
                    padding: '0.85rem'
                  }}
                >
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
                    {t('claimProcess.demoHint')}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
