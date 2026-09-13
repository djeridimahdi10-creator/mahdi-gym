'use client'

import { Suspense, lazy, useState, useEffect } from 'react'
import { Dumbbell } from 'lucide-react'
import type { MuscleGroup } from '@/types'

const GymOrbCanvas = lazy(() => import('./GymOrbCanvas'))

interface GymOrbProps {
  selectedGroup: MuscleGroup | 'all'
  onSelectGroup?: (g: MuscleGroup | 'all') => void
  color?: string
}

function GymOrbFallback() {
  return (
    <div className="relative w-full h-[280px] sm:h-[320px] flex flex-col items-center justify-center rounded-2xl bg-slate-900/40 border border-white/5 p-6">
      <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-3 animate-pulse">
        <Dumbbell className="w-8 h-8 text-cyan-400" />
      </div>
      <p className="text-white text-xs font-semibold">3D Barbell View</p>
      <p className="text-slate-500 text-[11px] mt-0.5">Interactive 3D acceleration</p>
    </div>
  )
}

export function GymOrb(props: GymOrbProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [hasWebGL] = useState(() => {
    if (typeof window === 'undefined') return true
    try {
      const canvas = document.createElement('canvas')
      return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
    } catch {
      return false
    }
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)

    return () => mq.removeEventListener('change', handler)
  }, [])

  if (prefersReducedMotion || !hasWebGL) {
    return <GymOrbFallback />
  }

  return (
    <Suspense fallback={<GymOrbFallback />}>
      <GymOrbCanvas {...props} />
    </Suspense>
  )
}
