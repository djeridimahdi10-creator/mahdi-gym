'use client'

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface HubSectionHeaderProps {
  icon: LucideIcon
  title: string
  subtitle?: string
  accent?: string
  badge?: string
  right?: React.ReactNode
}

export function HubSectionHeader({
  icon: Icon,
  title,
  subtitle,
  accent = '#00F0FF',
  badge,
  right,
}: HubSectionHeaderProps) {
  return (
    <motion.div
      className="flex flex-wrap items-center justify-between gap-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `${accent}14`,
            border: `1px solid ${accent}30`,
            boxShadow: `0 0 24px ${accent}12`,
          }}
        >
          <Icon className="w-6 h-6" style={{ color: accent }} />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h2
              className="text-xl sm:text-2xl font-bold text-white tracking-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {title}
            </h2>
            {badge && (
              <span
                className="text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap"
                style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}30` }}
              >
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-sm text-slate-400 mt-1 max-w-2xl">{subtitle}</p>}
        </div>
      </div>
      {right && <div className="flex items-center gap-3">{right}</div>}
    </motion.div>
  )
}