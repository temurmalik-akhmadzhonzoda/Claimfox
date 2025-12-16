import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import PageHeader from '../shared/ui/PageHeader'
import BottomNav from '../shared/ui/BottomNav'

export default function AppShell() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <PageHeader title="My Insurfox" />
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
