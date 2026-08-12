'use client'

import { useRef, useMemo, Suspense, lazy, useState, useEffect } from 'react'
import { MacroRings } from './MacroRings'

// Lazy-load the heavy Three.js canvas only when needed
const ThreeCanvas = lazy(() => import('./NutritionOrbCanvas'))

interface NutritionOrbProps {
  calories: { current: number; target: number }
  protein: { current: number; target: number }
  carbs: { current: number; target: number }
  fat: { current: number; target: number }
}

function OrbFallback({ calories }: { calories: { current: number; target: number } }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 280, height: 280 }}>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at 40% 35%, rgba(16,185,129,0.12) 0%, rgba(168,85,247,0.06) 50%, transparent 70%)',
          animation: 'pulse 3s ease-in-out infinite',
        }}
      />
      <MacroRings
        calories={calories}
        protein={{ current: 0, target: 1 }}
        carbs={{ current: 0, target: 1 }}
        fat={{ current: 0, target: 1 }}
        size={220}
      />
    </div>
  )
}

export function NutritionOrb(props: NutritionOrbProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  })
  const [hasWebGL, setHasWebGL] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
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

  // If reduced motion or no WebGL, use MacroRings SVG fallback
  if (prefersReducedMotion || !hasWebGL) {
    return (
      <MacroRings
        calories={props.calories}
        protein={props.protein}
        carbs={props.carbs}
        fat={props.fat}
        size={240}
      />
    )
  }

  return (
    <Suspense fallback={<OrbFallback calories={props.calories} />}>
      <ThreeCanvas {...props} />
    </Suspense>
  )
}
