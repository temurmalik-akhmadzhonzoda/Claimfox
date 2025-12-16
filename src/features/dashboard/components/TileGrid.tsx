import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon, IconName } from '../../../shared/ui/icons'

type Tile = {
  to: string
  label: string
  icon: IconName
}

const tiles: Tile[] = [
  { to: '/my-profile', label: 'My Profile', icon: 'profile' },
  { to: '/my-company', label: 'My Company', icon: 'company' },
  { to: '/my-fleet', label: 'My Fleet', icon: 'fleet' },
  { to: '/my-insurance', label: 'My Insurance', icon: 'insurance' },
  { to: '/my-locations', label: 'My Locations', icon: 'locations' },
  { to: '/my-reporting', label: 'My Reporting', icon: 'reporting' },
  { to: '/get-a-quote', label: 'Get a quote', icon: 'quote' },
  { to: '/presentations', label: 'Presentations', icon: 'presentations' }
]

export default function TileGrid() {
  return (
    <div className="tile-grid">
      {tiles.map((t) => (
        <Link to={t.to} className="tile" key={t.to}>
          <div className="tile-icon">
            <Icon name={t.icon} />
          </div>
          <div className="tile-label">{t.label}</div>
        </Link>
      ))}
    </div>
  )
}
