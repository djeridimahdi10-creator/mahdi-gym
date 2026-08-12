'use client'

import { Suspense, lazy, useState, useEffect } from 'react'
import { Bot, Sparkles } from 'lucide-react'

const ChatOrbCanvas = lazy(() => import('./ChatOrbCanvas'))

function ChatOrbFallback() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 140, height: 140 }}>
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center glow-ring-ai"
        style={{
          background: 'linear-gradient(135deg, rgba(168,85,247,0.25), rgba(147,51,234,0.15))',
          border: '1px solid rgba(168,85,247,0.3)',
        }}
      >
        <Bot className="w-9 h-9 text-purple-400 animate-breathe" />
      </div>
    </div>
  )
}

export function ChatOrb() {
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
    return <ChatOrbFallback />
  }

  return (
    <Suspense fallback={<ChatOrbFallback />}>
      <ChatOrbCanvas />
    </Suspense>
  )
}
