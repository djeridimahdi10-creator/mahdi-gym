'use client'

import { useEffect, useRef } from 'react'
import { animate, useMotionValue, useInView } from 'framer-motion'

interface CountUpProps {
  value: number
  className?: string
  prefix?: string
  suffix?: string
  decimals?: number
}

export function CountUp({ value, className, prefix = '', suffix = '', decimals = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const mv = useMotionValue(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, value, { duration: 1.1, ease: [0.16, 1, 0.3, 1] })
    const unsub = mv.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${v.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}${suffix}`
      }
    })
    return () => {
      controls.stop()
      unsub()
    }
  }, [value, inView, decimals, prefix, suffix, mv])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {(0).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}