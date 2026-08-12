'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { cn } from '@/lib/utils'

/* ─────────────────────────────────────────────────────────────
   Shared primitives for the Nutrition Hub experience.
   Big numbers, big bars, consistent section blocks and
   feature launcher cards — one spacing/typography system.
   ───────────────────────────────────────────────────────────── */

export const HUB_CARD_BASE: React.CSSProperties = {
  background: 'rgba(17,23,36,0.92)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 24,
  boxShadow: '0 10px 32px rgba(0,0,0,0.35)',
}

export function HubCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div className={cn('rounded-3xl p-6 sm:p-8', className)} style={{ ...HUB_CARD_BASE, ...style }}>
      {children}
    </div>
  )
}

/* Smooth counting number */
export function AnimatedNumber({
  value,
  className,
  style,
}: {
  value: number
  className?: string
  style?: React.CSSProperties
}) {
  const mv = useMotionValue(0)
  const text = useTransform(mv, (v) => Math.round(v).toLocaleString())

  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.9, ease: [0.16, 1, 0.3, 1] })
    return controls.stop
  }, [value, mv])

  return (
    <motion.span className={className} style={style}>
      {text}
    </motion.span>
  )
}

/* Large animated progress bar */
export function BigProgressBar({
  value,
  color,
  className,
  height = 14,
  trackBg = 'rgba(255,255,255,0.06)',
}: {
  value: number
  color: string
  className?: string
  height?: number
  trackBg?: string
}) {
  const pct = Math.min(100, Math.max(0, value))
  return (
    <div
      className={cn('w-full rounded-full overflow-hidden border border-white/10', className)}
      style={{ height, background: trackBg }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ background: color, boxShadow: `0 0 14px ${color}55` }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

export const STAGGER = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}

export const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

/* Consistent section header: icon + title + subtitle + optional right slot */
export function SectionBlock({
  badge,
  title,
  subtitle,
  right,
  accent = '#00F0FF',
}: {
  badge?: string
  title: string
  subtitle?: string
  right?: React.ReactNode
  accent?: string
}) {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-4 min-w-0">
        {badge && (
          <div
            className="w-13 h-13 shrink-0 hidden sm:flex items-center justify-center text-2xl rounded-2xl"
            style={{ background: `${accent}12`, border: `1px solid ${accent}30` }}
          >
            <span>{badge}</span>
          </div>
        )}
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {title}
          </h2>
          {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
        </div>
      </div>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </div>
  )
}

/* Large launcher card used across feature tabs */
export function FeatureLaunchCard({
  icon: Icon,
  emoji,
  title,
  description,
  actionLabel,
  onAction,
  accent,
}: {
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  emoji?: string
  title: string
  description: string
  actionLabel: string
  onAction: () => void
  accent: string
}) {
  return (
    <motion.div
      variants={STAGGER}
      className="group rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-6 hover:-translate-y-1 transition-transform duration-300"
      style={{ ...HUB_CARD_BASE, border: `1px solid ${accent}22` }}
    >
      <div className="space-y-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
          style={{ background: `${accent}14`, border: `1px solid ${accent}35` }}
        >
          {emoji ? (
            <span className="text-2xl">{emoji}</span>
          ) : Icon ? (
            <Icon className="w-6 h-6" style={{ color: accent }} />
          ) : null}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {title}
          </h3>
          <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">{description}</p>
        </div>
      </div>

      <motion.button
        onClick={onAction}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="w-full py-3 px-5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
        style={{
          background: `${accent}16`,
          color: accent,
          border: `1px solid ${accent}38`,
        }}
      >
        <span>{actionLabel}</span>
        <span aria-hidden>→</span>
      </motion.button>
    </motion.div>
  )
}

/* Small meta chip used in headings and summaries */
export function MetaChip({
  children,
  color,
  bg,
  className,
}: {
  children: React.ReactNode
  color: string
  bg?: string
  className?: string
}) {
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap', className)}
      style={{ background: bg ?? `${color}12`, color, border: `1px solid ${color}30` }}
    >
      {children}
    </span>
  )
}

export type HubNavigate = (tab: string, anchorId?: string) => void