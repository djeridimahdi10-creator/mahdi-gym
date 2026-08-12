'use client'

import { ReactNode } from 'react'

interface SectionHeadingProps {
  emoji?: string
  icon?: ReactNode
  title: string
  subtitle?: string
  accent?: string
  action?: ReactNode
}

export function SectionHeading({ emoji, icon, title, subtitle, accent = '#00F0FF', action }: SectionHeadingProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${accent}14`, border: `1px solid ${accent}30`, boxShadow: `0 0 24px ${accent}0d` }}
        >
          {emoji ? (
            <span className="text-2xl sm:text-3xl">{emoji}</span>
          ) : (
            <span style={{ color: accent }} className="[&>svg]:w-6 [&>svg]:h-6 sm:[&>svg]:w-7 sm:[&>svg]:h-7">
              {icon}
            </span>
          )}
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {title}
          </h2>
          {subtitle && <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
}