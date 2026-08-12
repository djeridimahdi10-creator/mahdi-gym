'use client'

import { motion } from 'framer-motion'
import { Gauge, Flame, Zap, Droplets, Utensils, Plus, Minus, ArrowRight, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { NutritionOrb } from './NutritionOrb'

interface TodayOverviewProps {
  calories: { current: number; target: number }
  protein: { current: number; target: number }
  carbs: { current: number; target: number }
  fat: { current: number; target: number }
  water: { current: number; target: number }
  onWaterChange?: (delta: number) => void
  mealsLogged: number
  totalMeals: number
  onManageMeals?: () => void
}

function CountNumber({ value, className }: { value: number; className?: string }) {
  return (
    <motion.span
      key={value}
      className={className}
      initial={{ opacity: 0.3, y: -3 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {value.toLocaleString()}
    </motion.span>
  )
}

function CalorieRing({ current, target }: { current: number; target: number }) {
  const pct = Math.min(100, Math.round((current / (target || 1)) * 100))
  const remaining = Math.max(0, target - current)
  const radius = 74
  const strokeWidth = 13
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (pct / 100) * circumference

  return (
    <div className="relative w-[190px] h-[190px] mx-auto flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 180 180">
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <motion.circle
          cx="90"
          cy="90"
          r={radius}
          stroke="url(#overviewCalGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <defs>
          <linearGradient id="overviewCalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <Flame className="w-5 h-5 text-[#00F0FF] mb-1" />
        <span className="text-4xl font-extrabold text-white tracking-tight tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          <CountNumber value={current} />
        </span>
        <span className="text-slate-400 text-sm font-medium">/ {target} kcal</span>
        <span className="text-xs font-bold text-[#00F0FF] mt-1.5 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/25">
          {pct}% reached
        </span>
      </div>
    </div>
  )
}

function BigStatCard({
  icon: Icon,
  label,
  color,
  current,
  target,
  unit,
  helper,
  extra,
}: {
  icon: LucideIcon
  label: string
  color: string
  current: number
  target: number
  unit: string
  helper?: React.ReactNode
  extra?: React.ReactNode
}) {
  const pct = Math.min(100, Math.round((current / (target || 1)) * 100))

  return (
    <div
      className="rounded-3xl p-6 sm:p-7 flex flex-col gap-4"
      style={{ background: 'rgba(17,23,36,0.92)', border: `1px solid ${color}30`, boxShadow: '0 4px 24px rgba(0,0,0,0.25)' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ background: `${color}15`, border: `1px solid ${color}35` }}
          >
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <span className="text-slate-200 text-sm font-bold">{label}</span>
        </div>
        <span className="text-xs font-extrabold px-2.5 py-1 rounded-full tabular-nums" style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
          {pct}%
        </span>
      </div>

      <div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-4xl font-extrabold text-white tabular-nums tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <CountNumber value={current} />
          </span>
          <span className="text-slate-500 text-sm font-semibold">{unit} / {target.toLocaleString()}</span>
        </div>
        <div className="h-3 w-full rounded-full mt-3 bg-white/[0.06] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: color, boxShadow: `0 0 12px ${color}50` }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {helper && <div className="text-xs text-slate-400 leading-relaxed">{helper}</div>}
      {extra}
    </div>
  )
}

export function TodayOverview({
  calories,
  protein,
  carbs,
  fat,
  water,
  onWaterChange,
  mealsLogged,
  totalMeals,
  onManageMeals,
}: TodayOverviewProps) {
  const waterPct = Math.min(100, Math.round((water.current / (water.target || 1)) * 100))
  const mealsPct = Math.min(100, Math.round((mealsLogged / (totalMeals || 1)) * 100))

  const legend = [
    { label: 'Calories', current: calories.current, target: calories.target, unit: 'kcal', color: '#10b981' },
    { label: 'Protein', current: protein.current, target: protein.target, unit: 'g', color: '#FFB300' },
    { label: 'Carbs', current: carbs.current, target: carbs.target, unit: 'g', color: '#A855F7' },
    { label: 'Fats', current: fat.current, target: fat.target, unit: 'g', color: '#FF5C8D' },
  ]

  return (
    <section className="space-y-8">
      <SectionHeading
        icon={Gauge}
        title="Today's Overview"
        subtitle="How am I doing today?"
        accent="#10b981"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Nutrition Core (3D) */}
        <div
          className="lg:col-span-5 rounded-3xl p-6 sm:p-8 flex flex-col gap-6"
          style={{
            background: 'linear-gradient(160deg, rgba(16,185,129,0.05) 0%, rgba(17,23,36,0.95) 55%, rgba(0,240,255,0.04) 100%)',
            border: '1px solid rgba(16,185,129,0.22)',
            boxShadow: '0 4px 28px rgba(0,0,0,0.3)',
          }}
        >
          <div className="flex items-center gap-2.5">
            <span className="badge-live flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold" style={{ background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.35)' }}>
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Interactive Nutrition Core
            </span>
          </div>

          <div className="flex justify-center">
            <NutritionOrb calories={calories} protein={protein} carbs={carbs} fat={fat} />
          </div>

          <div className="space-y-3">
            {legend.map((row) => {
              const pct = Math.min(100, Math.round((row.current / (row.target || 1)) * 100))
              return (
                <div key={row.label} className="flex items-center gap-3">
                  <span className="w-14 text-xs font-bold text-slate-300 flex-shrink-0 capitalize">{row.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: row.color, boxShadow: `0 0 8px ${row.color}50` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <span className="w-24 text-right text-xs font-bold text-white tabular-nums flex-shrink-0">
                    {row.current.toLocaleString()} / {row.target.toLocaleString()} {row.unit}
                  </span>
                </div>
              )
            })}
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            Your live nutrition core — the glass core and rings grow as you eat. Tap into each category above to manage today.
          </p>
        </div>

        {/* Big Metric Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            className="rounded-3xl p-6 sm:p-7 flex flex-col gap-4"
            style={{ background: 'rgba(17,23,36,0.92)', border: '1px solid rgba(0,240,255,0.30)', boxShadow: '0 4px 24px rgba(0,0,0,0.25)' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(0,240,255,0.15)', border: '1px solid rgba(0,240,255,0.35)' }}>
                  <Flame className="w-5 h-5 text-[#00F0FF]" />
                </div>
                <span className="text-slate-200 text-sm font-bold">Calories</span>
              </div>
            </div>

            <CalorieRing current={calories.current} target={calories.target} />

            <p className="text-xs text-slate-400 text-center">
              Remaining budget:{' '}
              <span className="text-white font-bold tabular-nums">{Math.max(0, calories.target - calories.current).toLocaleString()} kcal</span>
            </p>
          </div>

          <BigStatCard
            icon={Zap}
            label="Protein"
            color="#FFB300"
            current={protein.current}
            target={protein.target}
            unit="g"
            helper={
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Muscle recovery fuel — stay on pace all day.
              </div>
            }
          />

          <BigStatCard
            icon={Droplets}
            label="Hydration"
            color="#3b82f6"
            current={Math.round(water.current * 10) / 10}
            target={water.target}
            unit="L"
            helper={`${Math.max(0, water.target - water.current).toFixed(1)}L to go — pace yourself through the day.`}
            extra={
              onWaterChange && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onWaterChange(-0.25)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all"
                    title="Remove 250ml"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onWaterChange(0.25)}
                    className="flex-1 py-2.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/35 text-blue-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ 250 ml</span>
                  </button>
                </div>
              )
            }
          />

          <BigStatCard
            icon={Utensils}
            label="Meals"
            color="#a855f7"
            current={mealsLogged}
            target={totalMeals}
            unit=""
            helper={`${mealsLogged} of ${totalMeals} meals logged${mealsLogged < totalMeals ? ' — keep going!' : ' — perfect day.'}`}
            extra={
              onManageMeals && (
                <button
                  onClick={onManageMeals}
                  className="w-full py-2.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/35 text-purple-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Manage Meals</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )
            }
          />
        </div>
      </div>
    </section>
  )
}