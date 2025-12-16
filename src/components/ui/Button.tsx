import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

const VARIANT_STYLES: Record<'primary' | 'secondary', React.CSSProperties> = {
  primary: {
    background: 'linear-gradient(135deg, #5b2d8b, #ee6a7c)',
    color: '#fff'
  },
  secondary: {
    background: '#ffffff',
    border: '1px solid #d6d6f2',
    color: '#080064'
  }
}

export default function Button({
  children,
  className,
  style,
  variant = 'primary',
  type,
  ...props
}: ButtonProps) {
  const isDisabled = Boolean(props.disabled)

  return (
    <button
      {...props}
      type={type ?? 'button'}
      className={className}
      style={{
        border: 'none',
        borderRadius: '999px',
        padding: '0.85rem 1.75rem',
        fontWeight: 700,
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        boxShadow: variant === 'secondary' ? 'none' : '0 12px 24px rgba(77, 38, 139, 0.25)',
        transition: 'transform 0.15s ease, opacity 0.15s ease',
        opacity: isDisabled ? 0.6 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ...VARIANT_STYLES[variant],
        ...style
      }}
      onMouseDown={(event) => {
        props.onMouseDown?.(event)
        if (!isDisabled) {
          event.currentTarget.style.transform = 'translateY(1px)'
        }
      }}
      onMouseUp={(event) => {
        props.onMouseUp?.(event)
        if (!isDisabled) {
          event.currentTarget.style.transform = 'translateY(0)'
        }
      }}
      onMouseLeave={(event) => {
        props.onMouseLeave?.(event)
        if (!isDisabled) {
          event.currentTarget.style.transform = 'translateY(0)'
        }
      }}
    >
      {children}
    </button>
  )
}
