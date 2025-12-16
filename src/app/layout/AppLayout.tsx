import React from 'react'
import { Outlet } from 'react-router-dom'
import BottomNav from '../../shared/ui/BottomNav'
import PageHeader from '../../shared/ui/PageHeader'
import ExecHomeButton from '../../features/exec-summary/ExecHomeButton'

export default function AppLayout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <PageHeader title="My Insurfox" />
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <ExecHomeButton />
      <BottomNav />
    </div>
  )
}
