'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export interface FeatureCardProps {
  emoji?: string
  icon: ReactNode
  title: string
  description: string
  actionLabel: string
  accent: string
  onAction: () => void
}

export function FeatureCard({ emoji, icon, title, description, actionLabel, accent, onAction }: FeatureCardProps) {
  return (
    <motion.button
      onClick={onAction}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative text-left w-full rounded-3xl p-6 sm:p-7 space-y-5 overflow-hidden transition-colors duration-300"
      style={{
        background: 'linear-gradient(150deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)',
        border: '1px solid rgba(255,255,255,0.09)',
      }}
    >
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${accent}1f 0%, transparent 70%)` }}
      />

      <div
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center"
        style={{ background: `${accent}16`, border: `1px solid ${accent}30` }}
      >
        {emoji ? <span className="text-2xl sm:text-3xl">{emoji}</span> : <span style={{ color: accent }} className="[&>svg]:w-6 [&>svg]:h-6 sm:[&>svg]:w-7 sm:[&>svg]:h-7">{icon}</span>}
      </div>

      <div className="space-y-2">
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>

      <div
        className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-300 group-hover:gap-3"
        style={{ background: `${accent}18`, border: `1px solid ${accent}38`, color: accent }}
      >
        <span>{actionLabel}</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </motion.button>
  )
}