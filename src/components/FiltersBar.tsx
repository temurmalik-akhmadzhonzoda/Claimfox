import React from 'react'

type Props = {
  locale: string
  region: 'de' | 'eu'
  exposure: 'all' | 'direct' | 'indirect' | 'brokered'
  onRegionChange: (value: 'de' | 'eu') => void
  onExposureChange: (value: 'all' | 'direct' | 'indirect' | 'brokered') => void
  onSearchChange: (value: string) => void
  onExport: (type: 'kpi' | 'table' | 'sources') => void
}

export default function FiltersBar({
  locale,
  region,
  exposure,
  onRegionChange,
  onExposureChange,
  onSearchChange,
  onExport
}: Props) {
  return (
    <div className="ix-filters">
      <div className="ix-toggle-group" role="tablist" aria-label="Region toggle">
        <button
          type="button"
          className={region === 'de' ? 'is-active' : ''}
          onClick={() => onRegionChange('de')}
          aria-pressed={region === 'de'}
        >
          DE
        </button>
        <button
          type="button"
          className={region === 'eu' ? 'is-active' : ''}
          onClick={() => onRegionChange('eu')}
          aria-pressed={region === 'eu'}
        >
          EU
        </button>
      </div>
      <div className="ix-toggle-group" role="tablist" aria-label="Exposure type toggle">
        {(['all', 'direct', 'indirect', 'brokered'] as const).map((value) => (
          <button
            key={value}
            type="button"
            className={exposure === value ? 'is-active' : ''}
            onClick={() => onExposureChange(value)}
            aria-pressed={exposure === value}
          >
            {value.toUpperCase()}
          </button>
        ))}
      </div>
      <input
        type="search"
        placeholder={locale === 'de-DE' ? 'Search leads' : 'Search leads'}
        aria-label="Search leads"
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <div className="ix-export-group">
        <button type="button" onClick={() => onExport('kpi')}>Export KPIs</button>
        <button type="button" onClick={() => onExport('table')}>Export Table</button>
        <button type="button" onClick={() => onExport('sources')}>Export Sources</button>
      </div>
    </div>
  )
}
