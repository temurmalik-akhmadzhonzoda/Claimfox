import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './BottomNav.css'

const NAV_ITEMS = [
  { label: 'Exec', path: '/overview', tab: 'exec' },
  { label: 'Summary', path: '/overview', tab: 'summary' },
  { label: 'Chat', path: '/overview', tab: 'chat' },
  { label: 'Profile', path: '/my-profile' }
] as const

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const activeTab = params.get('tab') || 'exec'

  function isActive(item: (typeof NAV_ITEMS)[number]) {
    if (item.path === '/overview') {
      return location.pathname === '/overview' && activeTab === (item.tab ?? 'exec')
    }
    return location.pathname === item.path
  }

  function handleClick(item: (typeof NAV_ITEMS)[number]) {
    if (item.path === '/overview') {
      const tab = item.tab ?? 'exec'
      navigate(`/overview?tab=${tab}`)
    } else {
      navigate(item.path)
    }
  }

  return (
    <nav className="bottom-nav" aria-label="Primary">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.label}
          type="button"
          className={`bottom-nav__link${isActive(item) ? ' is-active' : ''}`}
          onClick={() => handleClick(item)}
        >
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
