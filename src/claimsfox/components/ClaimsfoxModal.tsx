import type { ReactNode } from 'react'
import { useEffect } from 'react'

type ClaimsfoxModalProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export default function ClaimsfoxModal({ open, onClose, children }: ClaimsfoxModalProps) {
  if (!open) return null
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(8,0,32,0.65)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.98)',
          borderRadius: 20,
          padding: '1.5rem',
          width: 'min(640px, 100%)',
          maxHeight: '80vh',
          overflowY: 'auto',
          color: '#0e0d1c',
          boxShadow: '0 12px 30px rgba(15, 23, 42, 0.18)'
        }}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
