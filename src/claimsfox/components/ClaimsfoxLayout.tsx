import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import ClaimsfoxNav from '@/claimsfox/components/ClaimsfoxNav'
import ClaimsfoxModal from '@/claimsfox/components/ClaimsfoxModal'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listCalendarEvents } from '@/claimsfox/api/claimsfoxApi'
import type { CalendarEvent } from '@/claimsfox/types'
import HomeHeroBackground from '@/assets/images/Home1.png'
import InsurfoxLogoLight from '@/assets/logos/insurfox-logo-light.png'
import Button from '@/components/ui/Button'

const RIGHT_RAIL_WIDTH = 280
const TOP_ROW_HEIGHT = RIGHT_RAIL_WIDTH

type ClaimsfoxLayoutProps = {
  title: string
  subtitle?: string
  topLeft?: ReactNode
  children: ReactNode
}

export default function ClaimsfoxLayout({ title, subtitle, topLeft, children }: ClaimsfoxLayoutProps) {
  const ctx = useTenantContext()
  const { t, lang } = useI18n()
  const navigate = useNavigate()
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selected, setSelected] = useState<CalendarEvent | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      const data = await listCalendarEvents(ctx)
      if (!mounted) return
      setEvents(data)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const upcoming = useMemo(() => {
    return [...events]
      .filter((event) => !Number.isNaN(new Date(event.date).getTime()))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5)
  }, [events])

  function openRelated(event: CalendarEvent) {
    if (!event.entityType || !event.entityId) return
    if (event.entityType === 'claim') {
      navigate(`/claimsfox/claims/${event.entityId}`)
    } else if (event.entityType === 'partner') {
      navigate('/claimsfox/partners')
    } else if (event.entityType === 'task') {
      navigate('/claimsfox/tasks')
    }
  }

  return (
    <div style={{ width: '100%', maxWidth: 1200, margin: '1rem auto 0', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          background: '#f1f5f9',
          border: '1px solid #e2e8f0',
          borderBottom: 0,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          padding: '8px 10px 0'
        }}
      >
        <ClaimsfoxNav />
      </div>
      <div
        style={{
          border: '1px solid #e2e8f0',
          borderTop: 0,
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
          background: '#ffffff',
          padding: '22px 22px 24px',
          boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: `minmax(0, 1fr) ${RIGHT_RAIL_WIDTH}px`, gap: '1.5rem', alignItems: 'stretch' }}>
          <div
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: '1rem 1.1rem',
              display: 'grid',
              gap: '0.75rem',
              backgroundColor: '#fff',
              backgroundImage: `url(${HomeHeroBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              height: TOP_ROW_HEIGHT,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Header title={title} subtitle={subtitle} titleColor="#d4380d" subtitleColor="#ffffff" />
            {topLeft}
            <img
              src={InsurfoxLogoLight}
              alt="Insurfox"
              style={{
                position: 'absolute',
                right: 14,
                bottom: 12,
                width: 156,
                opacity: 0.9
              }}
            />
          </div>
          <div style={{ height: TOP_ROW_HEIGHT, alignSelf: 'stretch', minHeight: 0 }}>
            <Card
              variant="glass"
              title={t('claimsfox.calendar.title')}
              subtitle={t('claimsfox.calendar.subtitle')}
              style={{ height: TOP_ROW_HEIGHT, display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'grid', gap: '0.65rem', fontSize: '0.84rem', marginTop: '0.2rem' }}>
                {upcoming.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => setSelected(event)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '0.5rem',
                      border: 'none',
                      background: 'transparent',
                      textAlign: 'left',
                      padding: 0,
                      color: '#0f172a',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.title}</span>
                    <span style={{ color: '#64748b', whiteSpace: 'nowrap' }}>
                      {new Intl.DateTimeFormat(lang, { month: 'short', day: '2-digit' }).format(new Date(event.date))}
                    </span>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {children}
        </div>
      </div>
      <ClaimsfoxModal open={Boolean(selected)} onClose={() => setSelected(null)}>
        {selected && (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <div style={{ display: 'grid', gap: '0.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a' }}>{selected.title}</h3>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                {new Intl.DateTimeFormat(lang, { dateStyle: 'full', timeStyle: 'short' }).format(new Date(selected.date))}
              </div>
            </div>
            <div style={{ display: 'grid', gap: '0.35rem', fontSize: '0.95rem', color: '#0f172a' }}>
              <div><strong>{t('claimsfox.calendar.location')}:</strong> {selected.location ?? t('claimsfox.calendar.locationTbd')}</div>
              <div><strong>{t('claimsfox.calendar.participants')}:</strong> {(selected.participants ?? []).join(', ') || t('claimsfox.calendar.participantsTbd')}</div>
              <div style={{ color: '#475569' }}>{selected.description ?? t('claimsfox.calendar.descriptionTbd')}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Button variant="secondary" size="sm" onClick={() => setSelected(null)}>{t('claimsfox.calendar.close')}</Button>
              <Button size="sm" onClick={() => openRelated(selected)}>{t('claimsfox.calendar.openRelated')}</Button>
            </div>
          </div>
        )}
      </ClaimsfoxModal>
    </div>
  )
}
