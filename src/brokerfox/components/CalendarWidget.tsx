import React, { useMemo } from 'react'
import Card from '@/components/ui/Card'
import { useI18n } from '@/i18n/I18nContext'
import type { CalendarEvent } from '@/brokerfox/types'

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

function getMonthDays(date: Date) {
  const start = startOfMonth(date)
  const end = endOfMonth(date)
  const days = []
  for (let d = start.getDate(); d <= end.getDate(); d += 1) {
    days.push(new Date(date.getFullYear(), date.getMonth(), d))
  }
  return days
}

type CalendarWidgetProps = {
  events: CalendarEvent[]
  density?: 'compact' | 'regular'
  height?: number | string
}

export default function CalendarWidget({ events, density = 'regular', height }: CalendarWidgetProps) {
  const { lang } = useI18n()
  const activeMonth = useMemo(() => new Date(), [])

  const days = useMemo(() => getMonthDays(activeMonth), [activeMonth])
  const weekdayLabels = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(lang, { weekday: 'short' })
    const base = new Date(2025, 0, 5)
    return Array.from({ length: 7 }).map((_, idx) => formatter.format(new Date(base.getTime() + idx * 86400000)))
  }, [lang])

  return (
    <Card
      variant="glass"
      style={{ minWidth: density === 'compact' ? 260 : 300, height, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: density === 'compact' ? '0.35rem' : '0.5rem', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: density === 'compact' ? '0.12rem' : '0.2rem' }}>
          {weekdayLabels.map((label) => (
            <span key={label} style={{ fontSize: density === 'compact' ? '0.6rem' : '0.7rem', color: '#64748b', textAlign: 'center' }}>{label}</span>
          ))}
          {days.map((day) => {
            const hasEvent = events.some((event) => new Date(event.date).toDateString() === day.toDateString())
            return (
              <button
                key={day.toISOString()}
                type="button"
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: 8,
                  padding: density === 'compact' ? '0.08rem' : '0.2rem',
                  background: '#fff',
                  color: '#0f172a',
                  position: 'relative',
                  fontSize: density === 'compact' ? '0.7rem' : '0.8rem'
                }}
              >
                {day.getDate()}
                {hasEvent ? <span style={{ position: 'absolute', bottom: 4, right: 6, width: density === 'compact' ? 5 : 6, height: density === 'compact' ? 5 : 6, borderRadius: '50%', background: '#f59e0b' }} /> : null}
              </button>
            )
          })}
        </div>

      </div>

    </Card>
  )
}
