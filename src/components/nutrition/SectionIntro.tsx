'use client'

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { TONE_STYLES, type Tone } from './tabs'

interface SectionIntroProps {
  icon: LucideIcon
  title: string
  description?: string
  tone?: Tone
}

export function SectionIntro({ icon: Icon, title, description, tone = 'cyan' }: SectionIntroProps) {
  const t = TONE_STYLES[tone]

  return (
    <motion.div
      className="flex items-start gap-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center glow-ring"
        style={{ background: t.bg, border: `1px solid ${t.border}` }}
      >
        <Icon className="w-7 h-7" style={{ color: t.color }} />
      </div>
      <div className="pt-1">
        <h2
          className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {title}
        </h2>
        {description && (
          <p className="text-sm sm:text-base text-slate-400 mt-1 leading-relaxed max-w-2xl">{description}</p>
        )}
      </div>
    </motion.div>
  )
}