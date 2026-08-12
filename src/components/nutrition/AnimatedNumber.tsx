'use client'

import { useEffect, useRef } from 'react'
import { animate, useInView } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  duration?: number
  decimals?: number
  className?: string
}

/** Count-up number that animates when it enters the viewport. */
export function AnimatedNumber({ value, duration = 1, decimals = 0, className }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  useEffect(() => {
    if (!inView || !ref.current) return
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-US')
        }
      },
    })
    return () => controls.stop()
  }, [inView, value, duration, decimals])

  return (
    <span ref={ref} className={className}>
      {decimals > 0 ? (0).toFixed(decimals) : (0).toLocaleString('en-US')}
    </span>
  )
}