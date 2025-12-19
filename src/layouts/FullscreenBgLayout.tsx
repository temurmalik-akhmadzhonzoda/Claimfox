import React from 'react'
import { Outlet } from 'react-router-dom'
import AppHeader from '@/components/layout/AppHeader'
import BackgroundLogin from '@/assets/images/background_login.png'

type FullscreenBgLayoutProps = {
  showHeader?: boolean
}

const DEFAULT_OVERLAY = 'linear-gradient(180deg, rgba(11,16,40,0.86) 0%, rgba(11,16,40,0.88) 45%, rgba(11,16,40,0.92) 100%)'

export default function FullscreenBgLayout({ showHeader = false }: FullscreenBgLayoutProps) {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%', overflow: 'hidden' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          backgroundImage: `url(${BackgroundLogin})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          backgroundImage: DEFAULT_OVERLAY
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh', width: '100%' }}>
        {showHeader ? <AppHeader /> : null}
        <Outlet />
      </div>
    </div>
  )
}
