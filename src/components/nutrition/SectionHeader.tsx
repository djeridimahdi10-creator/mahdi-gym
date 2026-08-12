'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionHeaderProps {
  emoji?: string
  title: string
  subtitle?: string
  right?: ReactNode
  accent?: string
}

/** Large, consistent section header used across every Nutrition Hub tab. */
export function SectionHeader({ emoji, title, subtitle, right, accent = '#00F0FF' }: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
      <div className="flex items-start gap-4">
        {emoji && (
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{
              background: `${accent}0f`,
              border: `1px solid ${accent}30`,
              boxShadow: `0 0 24px ${accent}0a`,
            }}
          >
            {emoji}
          </div>
        )}
        <div>
          <h2
            className="text-2xl sm:text-[28px] font-bold text-white tracking-tight leading-tight"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {title}
          </h2>
          {subtitle && <p className="text-slate-400 text-sm mt-1.5 max-w-xl leading-relaxed">{subtitle}</p>}
        </div>
      </div>
      {right && <div className="flex-shrink-0">{right}</div>}
    </div>
  )
}