import React from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  interactive?: boolean
  variant?: 'default' | 'glass'
}

export default function Card({
  children,
  className,
  subtitle,
  title,
  style,
  interactive,
  onClick,
  tabIndex,
  role,
  variant = 'default',
  ...props
}: CardProps) {
  const isInteractive = interactive || Boolean(onClick)
  const isGlass = variant === 'glass'

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!isInteractive) {
      props.onKeyDown?.(event)
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick?.(event as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>)
    }

    props.onKeyDown?.(event)
  }

  return (
    <div
      {...props}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isInteractive ? role ?? 'button' : role}
      tabIndex={isInteractive ? tabIndex ?? 0 : tabIndex}
      className={className}
      style={{
        backgroundColor: isGlass ? 'rgba(255,255,255,0.1)' : '#fff',
        border: isGlass ? '1px solid rgba(255,255,255,0.15)' : undefined,
        borderRadius: '24px',
        padding: '2rem',
        boxShadow: isGlass ? '0 20px 60px rgba(0,0,0,0.35)' : '0 22px 50px rgba(8, 4, 50, 0.15)',
        backdropFilter: isGlass ? 'blur(18px)' : undefined,
        WebkitBackdropFilter: isGlass ? 'blur(18px)' : undefined,
        color: isGlass ? '#ffffff' : undefined,
        width: '100%',
        cursor: isInteractive ? 'pointer' : undefined,
        transition: isInteractive ? 'transform 0.2s ease, box-shadow 0.2s ease' : undefined,
        ...style
      }}
    >
      {(title || subtitle) && (
        <header style={{ marginBottom: '1.5rem' }}>
          {title && (
            <h2 style={{ margin: 0, fontSize: '1.3rem', color: isGlass ? '#ffffff' : '#080064' }}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p style={{ marginTop: '0.35rem', marginBottom: 0, color: isGlass ? 'rgba(255,255,255,0.8)' : '#616075' }}>
              {subtitle}
            </p>
          )}
        </header>
      )}
      {children}
    </div>
  )
}
