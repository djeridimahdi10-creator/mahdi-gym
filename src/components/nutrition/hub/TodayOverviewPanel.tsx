'use client'

import { motion } from 'framer-motion'
import { Zap, Activity, Target, Droplets, Utensils, Plus, Minus, Sparkles } from 'lucide-react'
import { NutritionOrb } from '../NutritionOrb'

export interface OverviewData {
  calories: { current: number; target: number }
  protein: { current: number; target: number }
  carbs: { current: number; target: number }
  fat: { current: number; target: number }
  water: { current: number; target: number }
  mealsLogged: number
  totalMeals: number
  onWaterChange?: (delta: number) => void
  onHydrationTab?: () => void
}

function BigProgress({
  label,
  current,
  target,
  unit,
  color,
  icon: Icon,
  suffix,
}: {
  label: string
  current: number
  target: number
  unit: string
  color: string
  icon: typeof Zap
  suffix?: string
}) {
  const pct = Math.min(100, Math.round((current / (target || 1)) * 100))

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${color}16`, border: `1px solid ${color}30` }}
          >
            <Icon className="w-4 h-4" style={{ color }} />
          </span>
          <span className="text-sm font-semibold text-slate-200">{label}</span>
        </div>
        <span className="text-sm sm:text-base font-bold tabular-nums text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {typeof current === 'number' && !Number.isInteger(current) ? current.toFixed(1) : current}
          <span className="text-slate-500 font-medium"> / {target} {unit}</span>
        </span>
      </div>
      <div className="h-3.5 rounded-full overflow-hidden p-0.5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}aa)`, boxShadow: `0 0 12px ${color}50` }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500 font-semibold">{suffix || `Remaining: ${Math.max(0, target - current)} ${unit}`}</span>
        <span className="text-xs font-bold tabular-nums" style={{ color }}>{pct}%</span>
      </div>
    </div>
  )
}

export function TodayOverviewPanel({
  calories,
  protein,
  carbs,
  fat,
  water,
  mealsLogged,
  totalMeals,
  onWaterChange,
}: OverviewData) {
  const calPct = Math.min(100, Math.round((calories.current / (calories.target || 1)) * 100))
  const remaining = Math.max(0, calories.target - calories.current)
  const waterPct = Math.min(100, Math.round((water.current / (water.target || 1)) * 100))

  return (
    <div
      className="relative rounded-3xl overflow-hidden p-6 sm:p-8 lg:p-10"
      style={{
        background: 'linear-gradient(135deg, rgba(0,240,255,0.035) 0%, rgba(17,23,36,0.96) 45%, rgba(168,85,247,0.035) 100%)',
        border: '1px solid rgba(0,240,255,0.14)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* ── 3D Core Centerpiece ── */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <NutritionOrb calories={calories} protein={protein} carbs={carbs} fat={fat} />
          <div className="flex items-center gap-2 mt-5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08]">
            <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="text-xs font-bold text-slate-300">Interactive Nutrition Core</span>
            <span className="text-[10px] font-bold text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/25 px-2 py-0.5 rounded-full">3D</span>
          </div>
          <p className="text-xs text-slate-500 mt-3 text-center leading-relaxed max-w-xs">
            The core fills with your progress — orbiting rings track protein, carbs and fats.
          </p>
        </div>

        {/* ── Big Stats ── */}
        <div className="lg:col-span-7 space-y-8">
          <div className="grid grid-cols-2 gap-5">
            <div className="rounded-3xl p-6 bg-white/[0.03] border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#00F0FF]/12 border border-[#00F0FF]/30">
                  <Zap className="w-4.5 h-4.5 text-[#00F0FF]" />
                </span>
                <span className="text-sm font-bold text-slate-300">Calories</span>
              </div>
              <div>
                <p className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums leading-none" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {calories.current.toLocaleString()}
                </p>
                <p className="text-sm text-slate-500 font-semibold mt-1.5">of {calories.target.toLocaleString()} kcal · <span className="text-[#00F0FF] font-bold">{calPct}%</span></p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                <Sparkles className="w-3 h-3" /> {remaining.toLocaleString()} kcal remaining
              </span>
            </div>

            <div className="rounded-3xl p-6 bg-white/[0.03] border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl flex items-center justify-center bg-emerald-500/12 border border-emerald-500/30">
                  <Utensils className="w-4.5 h-4.5 text-emerald-400" />
                </span>
                <span className="text-sm font-bold text-slate-300">Meals</span>
              </div>
              <div>
                <p className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums leading-none" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {mealsLogged}<span className="text-2xl text-slate-500 font-bold">/{totalMeals}</span>
                </p>
                <p className="text-sm text-slate-500 font-semibold mt-1.5">completed today</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25">
                {totalMeals - mealsLogged > 0 ? `${totalMeals - mealsLogged} meal${totalMeals - mealsLogged > 1 ? 's' : ''} to go` : 'All meals done!'}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <BigProgress label="Protein" current={protein.current} target={protein.target} unit="g" color="#FFB300" icon={Zap} />
            <BigProgress label="Carbohydrates" current={carbs.current} target={carbs.target} unit="g" color="#A855F7" icon={Activity} />
            <BigProgress label="Fats" current={fat.current} target={fat.target} unit="g" color="#FF5C8D" icon={Target} />
            <BigProgress
              label="Hydration"
              current={water.current}
              target={water.target}
              unit="L"
              color="#3b82f6"
              icon={Droplets}
              suffix={`${waterPct}% of daily goal`}
            />
          </div>

          {/* Quick water log */}
          {onWaterChange && (
            <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-blue-500/[0.06] border border-blue-500/15">
              <p className="text-sm text-slate-300">
                <span className="text-white font-bold">{water.current.toFixed(1)}L</span> logged — quick add:
              </p>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => onWaterChange(-0.25)}
                  disabled={water.current <= 0}
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 disabled:opacity-30"
                  whileTap={{ scale: 0.9 }}
                  aria-label="Remove 250ml"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => onWaterChange(0.25)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30"
                  whileTap={{ scale: 0.9 }}
                  aria-label="Add 250ml"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}