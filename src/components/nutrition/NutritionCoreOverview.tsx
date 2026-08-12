'use client'

import { motion } from 'framer-motion'
import { Flame, Zap, Droplets, Utensils, Plus, Minus } from 'lucide-react'
import { NutritionOrb } from './NutritionOrb'
import { CountUp } from './CountUp'

interface CoreStat {
  current: number
  target: number
}

interface NutritionCoreOverviewProps {
  calories: CoreStat
  protein: CoreStat
  carbs: CoreStat
  fat: CoreStat
  water: { current: number; target: number }
  onWaterChange?: (delta: number) => void
  mealsLogged: number
  totalMeals: number
}

function CalorieRing({ current, target }: CoreStat) {
  const pct = Math.min(100, Math.round((current / (target || 1)) * 100))
  const radius = 78
  const strokeWidth = 13
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (pct / 100) * circumference
  const remaining = Math.max(0, target - current)

  return (
    <div className="stat-tile p-7 flex flex-col items-center gap-4">
      <div className="w-full flex items-center justify-between">
        <span className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
          <Flame className="w-4.5 h-4.5 text-[#00F0FF]" />
          Calories
        </span>
        <span className="pill-tag" style={{ background: 'rgba(0,240,255,0.12)', color: '#00F0FF', border: '1px solid rgba(0,240,255,0.3)' }}>
          {pct}%
        </span>
      </div>

      <div className="relative w-44 h-44 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 180 180">
          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <motion.circle
            cx="90"
            cy="90"
            r={radius}
            stroke="url(#overviewCalGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            fill="transparent"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.45))' }}
          />
          <defs>
            <linearGradient id="overviewCalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute flex flex-col items-center text-center">
          <CountUp
            value={current}
            className="text-4xl font-extrabold text-white tracking-tight tabular-nums"
          />
          <span className="text-slate-400 text-sm font-medium mt-0.5">/ {target} kcal</span>
        </div>
      </div>

      <p className="text-sm text-slate-400">
        Remaining budget:{' '}
        <span className="text-white font-bold tabular-nums">{remaining} kcal</span>
      </p>
    </div>
  )
}

function MacroBar({
  icon: Icon,
  color,
  bg,
  border,
  label,
  current,
  target,
  unit,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
  bg: string
  border: string
  label: string
  current: number
  target: number
  unit: string
}) {
  const pct = Math.min(100, Math.round((current / (target || 1)) * 100))

  return (
    <div className="stat-tile p-7 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2.5 text-slate-300 font-semibold text-sm">
          <span
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: bg, border: `1px solid ${border}` }}
          >
            <Icon className="w-[18px] h-[18px]" style={{ color }} />
          </span>
          {label}
        </span>
        <span className="pill-tag tabular-nums" style={{ background: bg, color, border: `1px solid ${border}` }}>
          {pct}%
        </span>
      </div>

      <div className="flex items-baseline gap-1.5">
        <CountUp
          value={current}
          suffix={unit}
          className="text-4xl font-extrabold text-white tracking-tight tabular-nums"
        />
        <span className="text-slate-400 text-sm">/ {target}{unit}</span>
      </div>

      <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}cc)`, boxShadow: `0 0 12px ${color}50` }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

function WaterTile({
  water,
  onWaterChange,
}: {
  water: { current: number; target: number }
  onWaterChange?: (delta: number) => void
}) {
  const pct = Math.min(100, Math.round((water.current / (water.target || 1)) * 100))

  return (
    <div className="stat-tile p-7 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2.5 text-slate-300 font-semibold text-sm">
          <span
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(59,130,246,0.14)', border: '1px solid rgba(59,130,246,0.35)' }}
          >
            <Droplets className="w-[18px] h-[18px] text-blue-400" />
          </span>
          Hydration
        </span>
        <span className="pill-tag tabular-nums" style={{ background: 'rgba(59,130,246,0.14)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.35)' }}>
          {pct}%
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-1.5">
          <CountUp
            value={water.current}
            decimals={1}
            suffix="L"
            className="text-4xl font-extrabold text-white tracking-tight tabular-nums"
          />
          <span className="text-slate-400 text-sm">/ {water.target}L</span>
        </div>

        {onWaterChange && (
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => onWaterChange(-0.25)}
              disabled={water.current <= 0}
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 disabled:opacity-30 transition-all"
              whileTap={{ scale: 0.9 }}
              title="Remove 250ml"
            >
              <Minus className="w-4.5 h-4.5" />
            </motion.button>
            <motion.button
              onClick={() => onWaterChange(0.25)}
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/20 border border-blue-500/35 text-blue-400 hover:bg-blue-500/30 transition-all"
              whileTap={{ scale: 0.9 }}
              title="Add 250ml"
            >
              <Plus className="w-4.5 h-4.5" />
            </motion.button>
          </div>
        )}
      </div>

      <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-[#00F0FF]"
          style={{ boxShadow: '0 0 12px rgba(0,240,255,0.45)' }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

export function NutritionCoreOverview({
  calories,
  protein,
  carbs,
  fat,
  water,
  onWaterChange,
  mealsLogged,
  totalMeals,
}: NutritionCoreOverviewProps) {
  const mealsPct = Math.min(100, Math.round((mealsLogged / (totalMeals || 1)) * 100))

  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden p-6 sm:p-10"
      style={{
        background:
          'linear-gradient(135deg, rgba(0,240,255,0.04) 0%, rgba(17,23,36,0.96) 45%, rgba(168,85,247,0.04) 100%)',
        border: '1px solid rgba(0,240,255,0.14)',
        boxShadow: '0 0 40px rgba(0,240,255,0.03)',
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
        {/* 3D Interactive Nutrition Core */}
        <div className="lg:w-[34%] flex flex-col items-center gap-5 flex-shrink-0">
          <div
            className="rounded-3xl p-6 flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 50% 35%, rgba(0,240,255,0.07) 0%, rgba(168,85,247,0.04) 55%, transparent 75%)',
              border: '1px solid rgba(0,240,255,0.12)',
            }}
          >
            <NutritionOrb calories={calories} protein={protein} carbs={carbs} fat={fat} />
          </div>
          <p className="text-sm text-slate-400 text-center leading-relaxed max-w-[240px]">
            <span className="text-[#00F0FF] font-bold">Interactive Nutrition Core</span> — your live calorie &amp;
            macro rings, rendered in 3D.
          </p>
        </div>

        {/* Four Primary Gauges */}
        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
          <CalorieRing current={calories.current} target={calories.target} />
          <MacroBar
            icon={Zap}
            color="#FFB300"
            bg="rgba(255,179,0,0.12)"
            border="rgba(255,179,0,0.32)"
            label="Protein"
            current={protein.current}
            target={protein.target}
            unit="g"
          />
          <WaterTile water={water} onWaterChange={onWaterChange} />
          <MacroBar
            icon={Utensils}
            color="#10b981"
            bg="rgba(16,185,129,0.12)"
            border="rgba(16,185,129,0.32)"
            label="Meals Completed"
            current={mealsLogged}
            target={totalMeals}
            unit=""
          />
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-7 text-center">
        Protein, carbs &amp; fat intake update live as you log meals · Hydration adjusts with each glass logged
      </p>
    </motion.div>
  )
}