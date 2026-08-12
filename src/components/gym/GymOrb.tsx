'use client'

import { Suspense, lazy, useState, useEffect } from 'react'
import { MuscleHeatmap } from './MuscleHeatmap'
import type { MuscleGroup } from '@/types'

const GymOrbCanvas = lazy(() => import('./GymOrbCanvas'))

interface GymOrbProps {
  selectedGroup: MuscleGroup | 'all'
  onSelectGroup: (g: MuscleGroup | 'all') => void
  color?: string
}

function GymOrbFallback({ selectedGroup, onSelectGroup }: GymOrbProps) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 280, height: 320 }}>
      <MuscleHeatmap selectedGroup={selectedGroup} onSelectGroup={onSelectGroup} />
    </div>
  )
}

export function GymOrb(props: GymOrbProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [hasWebGL, setHasWebGL] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)

    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      if (!gl) setHasWebGL(false)
    } catch {
      setHasWebGL(false)
    }

    return () => mq.removeEventListener('change', handler)
  }, [])

  if (prefersReducedMotion || !hasWebGL) {
    return <GymOrbFallback {...props} />
  }

  return (
    <Suspense fallback={<GymOrbFallback {...props} />}>
      <GymOrbCanvas {...props} />
    </Suspense>
  )
}
