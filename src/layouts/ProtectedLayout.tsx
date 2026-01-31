import React from 'react'
import { Outlet } from 'react-router-dom'
import AppHeader from '@/components/layout/AppHeader'
import MobileBottomBar from '@/components/layout/MobileBottomBar'

export default function ProtectedLayout() {
  return (
    <div className="app-shell">
      <AppHeader />
      <main className="app-main">
        <Outlet />
      </main>
      <MobileBottomBar />
    </div>
  )
}
