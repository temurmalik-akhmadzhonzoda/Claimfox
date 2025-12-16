import React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon, IconName } from './icons'

type NavItem = { to: string; label: string; icon: IconName; end?: boolean }

const navItems: NavItem[] = [
  { to: '/', label: 'Home', icon: 'home', end: true },
  { to: '/products', label: 'Products', icon: 'products' },
  { to: '/damages', label: 'Damages', icon: 'damages' },
  { to: '/my-profile', label: 'Profile', icon: 'nav-profile' }
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <NavLink
          to={item.to}
          end={item.end}
          key={item.to}
          className={({ isActive }) => `bottom-nav-link${isActive ? ' active' : ''}`}
        >
          <span className="icon-badge">
            <Icon name={item.icon} />
          </span>
          <span className="label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
