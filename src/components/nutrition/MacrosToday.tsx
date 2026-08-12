'use client'

import { motion } from 'framer-motion'
import { Zap, Activity, Target } from 'lucide-react'
import { useTodayIntake } from '@/hooks/useTodayIntake'
import { SectionHeader } from './SectionHeader'
import { AnimatedNumber } from './AnimatedNumber'

export function MacrosToday() {
  const { protein, carbs, fat, targets } = useTodayIntake()

  const rows = [
    { label: 'Protein', value: protein, target: targets.protein, unit: 'g', color: '#FFB300', icon: Zap },
    { label: 'Carbohydrates', value: carbs, target: targets.carbs, unit: 'g', color: '#A855F7', icon: Activity },
    { label: 'Fats', value: fat, target: targets.fat, unit: 'g', color: '#FF5C8D', icon: Target },
  ]

  return (
    <section>
      <SectionHeader
        emoji="⚖️"
        title="Macros Today"
        subtitle="Your remaining grams update automatically as you log meals."
      />

      <div className="rounded-[28px] p-7 sm:p-8 space-y-6" style={{ background: 'rgba(17,23,36,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
        {rows.map((row) => {
          const pct = Math.min(100, Math.round((row.value / (row.target || 1)) * 100))
          const Icon = row.icon
          return (
            <div key={row.label} className="flex items-center gap-5">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${row.color}10`, border: `1px solid ${row.color}25` }}
              >
                <Icon className="w-6 h-6" style={{ color: row.color }} />
              </div>

              <div className="w-36 flex-shrink-0">
                <p className="text-white font-bold">{row.label}</p>
                <p className="text-sm text-slate-400 tabular-nums">
                  <AnimatedNumber value={row.value} /> / {row.target}{row.unit}
                </p>
              </div>

              <div className="flex-1 h-3.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${row.color}, ${row.color}aa)`, boxShadow: `0 0 14px ${row.color}45` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              <span className="w-16 text-right text-lg font-extrabold tabular-nums text-white flex-shrink-0">
                {pct}%
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}