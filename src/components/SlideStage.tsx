import React, { useEffect, useRef, useState } from 'react'

type SlideStageProps = {
  children: React.ReactNode
  className?: string
  isPrint?: boolean
  width?: number
  height?: number
}

const DEFAULT_WIDTH = 1122
const DEFAULT_HEIGHT = 793
const MIN_SCALE = 0.85

export default function SlideStage({
  children,
  className,
  isPrint = false,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT
}: SlideStageProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (isPrint) {
      return
    }

    const headerEl = document.querySelector<HTMLElement>('[data-app-header="true"]')

    const updateVars = () => {
      const vv = window.visualViewport
      const viewportHeight = vv?.height ?? window.innerHeight
      const viewportTop = vv?.offsetTop ?? 0
      const headerHeight = headerEl?.offsetHeight ?? 0

      document.documentElement.style.setProperty('--app-header-h', `${headerHeight}px`)
      document.documentElement.style.setProperty('--vvh', `${viewportHeight}px`)
      document.documentElement.style.setProperty('--vv-top', `${viewportTop}px`)
    }

    const updateScale = () => {
      updateVars()
      const stage = stageRef.current
      const board = boardRef.current
      if (!stage || !board) {
        return
      }
      const stageWidth = stage.clientWidth
      const stageHeight = stage.clientHeight
      const nextScale = Math.min(stageWidth / width, stageHeight / height, 1)
      setScale(Math.max(nextScale, MIN_SCALE))
    }

    updateScale()

    let observer: ResizeObserver | null = null
    if (headerEl && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(updateScale)
      observer.observe(headerEl)
    }

    const vv = window.visualViewport
    window.addEventListener('resize', updateScale)
    vv?.addEventListener('resize', updateScale)
    vv?.addEventListener('scroll', updateScale)

    return () => {
      window.removeEventListener('resize', updateScale)
      vv?.removeEventListener('resize', updateScale)
      vv?.removeEventListener('scroll', updateScale)
      observer?.disconnect()
    }
  }, [height, isPrint, width])

  return (
    <div ref={stageRef} className={`slide-stage ${className ?? ''}`}>
      <div
        ref={boardRef}
        className="slide-board"
        style={{ transform: isPrint ? 'none' : `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  )
}
