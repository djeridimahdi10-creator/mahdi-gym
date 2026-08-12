'use client'

import { motion } from 'framer-motion'
import { Flame, Zap, Activity, Target, Droplets, Plus, Minus, CheckCircle } from 'lucide-react'

interface MacroData {
  current: number
  target: number
}

interface NutritionHeroProps {
  calories: MacroData
  protein: MacroData
  carbs: MacroData
  fat: MacroData
  water: { current: number; target: number }
  onWaterChange?: (delta: number) => void
  mealsLogged: number
  totalMeals: number
}

function AnimatedNumber({ value }: { value: number }) {
  return (
    <motion.span key={value} initial={{ opacity: 0.5, y: -2 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      {value.toLocaleString()}
    </motion.span>
  )
}

function CalorieGauge({ current, target }: { current: number; target: number }) {
  const pct = Math.min(100, Math.round((current / (target || 1)) * 100))
  const remaining = Math.max(0, target - current)

  const radius = 82
  const strokeWidth = 12
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (pct / 100) * circumference

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 190 190">
          <circle
            cx="95"
            cy="95"
            r={radius}
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <motion.circle
            cx="95"
            cy="95"
            r={radius}
            stroke="url(#calorieGlowGradient)"
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
            <linearGradient id="calorieGlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <Flame className="w-6 h-6 text-[#00F0FF] mb-1 animate-pulse" />
          <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <AnimatedNumber value={current} />
          </span>
          <span className="text-slate-400 text-sm font-medium">/ {target} kcal</span>
          <span className="text-xs font-bold text-[#00F0FF] mt-1.5 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/20">
            {pct}% Reached
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-400">
        Remaining Budget: <span className="text-white font-bold tabular-nums">{remaining} kcal</span>
      </p>
    </div>
  )
}

function MacroCard({
  label,
  current,
  target,
  unit,
  color,
  bgColor,
  borderColor,
  icon: Icon,
}: {
  label: string
  current: number
  target: number
  unit: string
  color: string
  bgColor: string
  borderColor: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
}) {
  const pct = Math.min(100, Math.round((current / (target || 1)) * 100))

  return (
    <div
      className="rounded-2xl p-5 flex flex-col justify-between space-y-3 transition-all hover:scale-[1.01]"
      style={{ background: bgColor, border: `1px solid ${borderColor}` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}18`, border: `1px solid ${color}25` }}>
            <Icon className="w-4 h-4" style={{ color }} />
          </div>
          <span className="text-slate-300 text-sm font-semibold">{label}</span>
        </div>
        <span className="text-sm font-bold tabular-nums" style={{ color }}>{pct}%</span>
      </div>

      <div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-extrabold text-white tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <AnimatedNumber value={current} />
          </span>
          <span className="text-slate-500 text-sm">/ {target}{unit}</span>
        </div>

        <div className="h-2 w-full rounded-full mt-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: color, boxShadow: `0 0 10px ${color}40` }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </div>
  )
}

export function NutritionHero({
  calories,
  protein,
  carbs,
  fat,
  water,
  onWaterChange,
  mealsLogged,
  totalMeals,
}: NutritionHeroProps) {
  const macros = [
    { label: 'Protein', ...protein, unit: 'g', color: '#FFB300', bgColor: 'rgba(255,179,0,0.06)', borderColor: 'rgba(255,179,0,0.16)', icon: Zap },
    { label: 'Carbs', ...carbs, unit: 'g', color: '#A855F7', bgColor: 'rgba(168,85,247,0.06)', borderColor: 'rgba(168,85,247,0.16)', icon: Activity },
    { label: 'Fats', ...fat, unit: 'g', color: '#FF5C8D', bgColor: 'rgba(255,92,141,0.06)', borderColor: 'rgba(255,92,141,0.16)', icon: Target },
  ]

  const waterPct = Math.min(100, Math.round((water.current / (water.target || 1)) * 100))

  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden p-6 sm:p-8"
      style={{
        background: 'linear-gradient(135deg, rgba(0,240,255,0.03) 0%, rgba(17,23,36,0.96) 50%, rgba(168,85,247,0.03) 100%)',
        border: '1px solid rgba(0,240,255,0.12)',
        boxShadow: '0 0 45px rgba(0,240,255,0.02)',
      }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 flex justify-center">
          <CalorieGauge current={calories.current} target={calories.target} />
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-slate-300 text-sm font-semibold">Daily Macronutrient Targets</span>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle className="w-4 h-4" />
              <span>{mealsLogged} / {totalMeals} Meals Eaten</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {macros.map((m) => (
              <MacroCard key={m.label} {...m} />
            ))}
          </div>

          <div
            className="rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{ background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.18)' }}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <Droplets className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-white text-sm font-bold">Hydration Tracker</span>
                  <span className="text-xs text-blue-400 font-bold tabular-nums">{waterPct}%</span>
                </div>
                <p className="text-slate-400 text-sm">
                  <span className="text-white font-bold tabular-nums">{water.current.toFixed(1)}L</span> / {water.target}L daily goal
                </p>
              </div>
            </div>

            {onWaterChange && (
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => onWaterChange(-0.25)}
                  disabled={water.current <= 0}
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 disabled:opacity-30"
                  whileTap={{ scale: 0.9 }}
                  title="Remove 250ml"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => onWaterChange(0.25)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30"
                  whileTap={{ scale: 0.9 }}
                  title="Add 250ml"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => onWaterChange(0.5)}
                  className="px-4 h-10 rounded-xl flex items-center justify-center bg-blue-500 text-white text-sm font-bold hover:bg-blue-400 shadow-lg shadow-blue-500/25"
                  whileTap={{ scale: 0.9 }}
                  title="Add 500ml"
                >
                  + 500ml
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}