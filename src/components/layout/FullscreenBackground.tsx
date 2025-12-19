import React from 'react'
import BackgroundLogin from '@/assets/images/background_login.png'

type FullscreenBackgroundProps = {
  children: React.ReactNode
  backgroundImage?: string
  overlay?: string
  className?: string
  contentClassName?: string
  backgroundStyle?: React.CSSProperties
  overlayStyle?: React.CSSProperties
  contentStyle?: React.CSSProperties
}

const DEFAULT_OVERLAY = 'linear-gradient(180deg, rgba(8,16,64,0.72), rgba(8,16,64,0.45))'

export default function FullscreenBackground({
  children,
  backgroundImage = BackgroundLogin,
  overlay = DEFAULT_OVERLAY,
  className,
  contentClassName,
  backgroundStyle,
  overlayStyle,
  contentStyle
}: FullscreenBackgroundProps) {
  return (
    <div className={className} style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
          ...backgroundStyle
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: overlay,
          zIndex: 1,
          ...overlayStyle
        }}
      />
      <div className={contentClassName} style={{ position: 'relative', zIndex: 2, width: '100%', ...contentStyle }}>
        {children}
      </div>
    </div>
  )
}
