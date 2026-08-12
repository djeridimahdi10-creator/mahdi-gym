'use client'

import { motion } from 'framer-motion'
import type { ComponentType, ReactNode } from 'react'

type HeadingIcon = ReactNode | ((props: { className?: string }) => ReactNode)

interface SectionHeadingProps {
  icon?: HeadingIcon
  emoji?: string
  title: string
  subtitle?: string
  accent?: string
  right?: ReactNode
}

export function SectionHeading({ icon, emoji, title, subtitle, accent = '#00F0FF', right }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-end justify-between gap-4 flex-wrap"
    >
      <div className="flex items-center gap-4">
        <div
          className="w-13 h-13 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${accent}14`, border: `1px solid ${accent}35`, boxShadow: `0 0 24px ${accent}0d` }}
        >
          {emoji ? (
            <span className="text-2xl leading-none">{emoji}</span>
          ) : typeof icon === 'function' ? (
            icon({ className: 'w-6 h-6' })
          ) : (
            icon
          )}
        </div>
        <div>
          <h2 className="text-white text-2xl font-bold tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {title}
          </h2>
          {subtitle && <p className="text-slate-400 text-sm mt-1">{subtitle}</p>}
        </div>
      </div>
      {right}
    </motion.div>
  )
}