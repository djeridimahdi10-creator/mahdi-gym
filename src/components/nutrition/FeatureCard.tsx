'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { ComponentType, ReactNode } from 'react'

type FeatureIcon = ReactNode | ((props: { className?: string }) => ReactNode)

interface FeatureCardProps {
  icon?: FeatureIcon
  emoji?: string
  title: string
  description: string
  actionLabel: string
  onClick?: () => void
  accent?: string
  color?: string
  badge?: string
}

export function FeatureCard({
  icon,
  emoji,
  title,
  description,
  actionLabel,
  onClick,
  accent = '#00F0FF',
  color,
  badge,
}: FeatureCardProps) {
  const resolvedAccent = color || accent

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="group relative overflow-hidden rounded-3xl p-6 sm:p-7 text-left transition-all duration-300 hover:-translate-y-1 cursor-pointer w-full"
      style={{
        background: 'linear-gradient(150deg, rgba(17,23,36,0.94) 0%, rgba(8,15,30,0.9) 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-1 opacity-40 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${resolvedAccent}, transparent)` }}
      />

      <div className="flex items-start justify-between gap-4">
        <div
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${resolvedAccent}12`, border: `1px solid ${resolvedAccent}30`, color: resolvedAccent }}
        >
          {emoji ? (
            <span className="text-3xl leading-none">{emoji}</span>
          ) : typeof icon === 'function' ? (
            icon({ className: 'w-7 h-7' })
          ) : (
            icon
          )}
        </div>
        {badge && (
          <span
            className="px-3 py-1 rounded-full text-[11px] font-extrabold whitespace-nowrap"
            style={{ background: `${resolvedAccent}12`, color: resolvedAccent, border: `1px solid ${resolvedAccent}28` }}
          >
            {badge}
          </span>
        )}
      </div>

      <h3 className="mt-5 text-lg sm:text-xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed">{description}</p>

      <span
        className="mt-6 inline-flex items-center gap-2 text-sm font-bold transition-colors"
        style={{ color: resolvedAccent }}
      >
        {actionLabel}
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
      </span>
    </motion.button>
  )
}

export function FeatureCardGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">{children}</div>
}