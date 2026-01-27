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
  const classes = [
    'ui-card',
    isGlass ? 'ui-card--glass' : 'ui-card--default',
    isInteractive ? 'ui-card--interactive' : '',
    className
  ].filter(Boolean).join(' ')

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
      className={classes}
      style={style}
    >
      {(title || subtitle) && (
        <header className="ui-card__header">
          {title && (
            <h2 className="ui-card__title">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="ui-card__subtitle">
              {subtitle}
            </p>
          )}
        </header>
      )}
      {children}
    </div>
  )
}
