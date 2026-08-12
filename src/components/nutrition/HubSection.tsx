'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface HubSectionProps {
  icon?: ReactNode
  emoji?: string
  title: string
  subtitle?: string
  description?: string
  accent?: string
  badge?: ReactNode
  action?: ReactNode
  children?: ReactNode
  className?: string
  id?: string
}

/**
 * A large, roomy section wrapper with a consistent header row.
 * Every major block of the Nutrition Hub shares this structure so the
 * page reads as a single designed system instead of a wall of cards.
 */
export function HubSection({
  icon,
  emoji,
  title,
  subtitle,
  description,
  accent = '#00F0FF',
  badge,
  action,
  children,
  className = '',
  id,
}: HubSectionProps) {
  const headingText = subtitle || description

  return (
    <motion.section
      id={id}
      className={`space-y-6 sm:space-y-7 ${className}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          {icon && (
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${accent}14`, border: `1px solid ${accent}30` }}
            >
              {icon}
            </div>
          )}
          {emoji && !icon && (
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 bg-white/[0.04] border border-white/10">
              {emoji}
            </div>
          )}
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">{title}</h2>
              {badge}
            </div>
            {headingText && (
              <p className="text-sm sm:text-base text-slate-400 mt-1.5 max-w-2xl leading-relaxed">{headingText}</p>
            )}
          </div>
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      {children}
    </motion.section>
  )
}