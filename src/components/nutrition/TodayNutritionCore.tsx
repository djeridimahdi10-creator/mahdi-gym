'use client'

import { motion } from 'framer-motion'
import { Droplets, Zap, UtensilsCrossed, Flame } from 'lucide-react'
import { NutritionOrb } from './NutritionOrb'

interface StatInput {
  current: number
  target: number
  unit?: string
}

interface TodayNutritionCoreProps {
  calories: StatInput
  protein: StatInput
  carbs: StatInput
  fat: StatInput
  water: StatInput
  onWaterChange?: (delta: number) => void
  mealsLogged: number
  totalMeals: number
}

function BigStatCard({
  label,
  current,
  target,
  color,
  icon: Icon,
  delay = 0,
  pctOverride,
  unit,
  children,
}: {
  label: string
  current: number
  target: number
  color: string
  icon: React.ComponentType<{ className?: string }>
  delay?: number
  pctOverride?: number
  unit?: string
  children?: React.ReactNode
}) {
  const pct = pctOverride ?? Math.min(100, Math.round((current / (target || 1)) * 100))
  const unitLabel = unit ?? (label === 'Protein' ? 'g' : label === 'Hydration' ? 'L' : label === 'Meals' ? 'meals' : 'kcal')

  return (
    <motion.div
      className="rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-5"
      style={{
        background: 'rgba(17,23,36,0.9)',
        border: `1px solid ${color}28`,
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
      }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ background: `${color}14`, border: `1px solid ${color}30`, color }}
          >
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-white text-base font-semibold">{label}</span>
        </div>
        <span className="text-sm font-bold tabular-nums" style={{ color }}>
          {pct}%
        </span>
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-white tabular-nums tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {current.toLocaleString()}
          </span>
          <span className="text-slate-500 text-base font-semibold">
            / {target.toLocaleString()} {unitLabel}
          </span>
        </div>

        <div className="h-3.5 w-full rounded-full mt-4 overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${color}, ${color}88)`, boxShadow: `0 0 14px ${color}50` }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {children}
      </div>
    </motion.div>
  )
}

export function TodayNutritionCore({
  calories,
  protein,
  carbs,
  fat,
  water,
  onWaterChange,
  mealsLogged,
  totalMeals,
}: TodayNutritionCoreProps) {
  const mealsPct = Math.min(100, Math.round((mealsLogged / (totalMeals || 1)) * 100))
  const remaining = Math.max(0, calories.target - calories.current)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
      {/* 3D Nutrition Core Centerpiece */}
      <motion.div
        className="lg:col-span-5 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center gap-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(150deg, rgba(0,240,255,0.04) 0%, rgba(17,23,36,0.96) 55%, rgba(168,85,247,0.05) 100%)',
          border: '1px solid rgba(0,240,255,0.18)',
          boxShadow: '0 0 60px rgba(0,240,255,0.04)',
        }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <NutritionOrb calories={calories} protein={protein} carbs={carbs} fat={fat} />

        <div className="text-center space-y-1.5">
          <p className="text-white text-5xl font-extrabold tabular-nums tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {calories.current.toLocaleString()}
            <span className="text-slate-500 text-2xl font-bold"> / {calories.target.toLocaleString()}</span>
          </p>
          <p className="text-slate-300 text-sm font-medium flex items-center justify-center gap-1.5">
            <Flame className="w-4 h-4 text-[#FF5C8D]" />
            kcal consumed — <span className="text-emerald-400 font-bold">{remaining.toLocaleString()} kcal remaining</span>
          </p>
        </div>

        <div className="w-full rounded-2xl px-4 py-3 flex items-center justify-between mt-1" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <span className="text-sm text-slate-300 font-semibold">Meals Completed</span>
          <span className="text-white text-lg font-bold tabular-nums">
            {mealsLogged} <span className="text-slate-500 text-sm">/ {totalMeals}</span>
          </span>
        </div>
      </motion.div>

      {/* The four essential indicators */}
      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
        <BigStatCard label="Protein" current={protein.current} target={protein.target} color="#FFB300" icon={Zap} delay={0.05} />

        <BigStatCard label="Hydration" current={water.current} target={water.target} color="#3b82f6" icon={Droplets} delay={0.1}>
          {onWaterChange && (
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => onWaterChange(-0.25)}
                disabled={water.current <= 0}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 disabled:opacity-30 transition-all"
              >
                − 250ml
              </button>
              <button
                onClick={() => onWaterChange(0.25)}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/35 text-blue-300 transition-all"
              >
                + 250ml
              </button>
              <button
                onClick={() => onWaterChange(0.5)}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-blue-500 hover:bg-blue-400 text-white transition-all shadow-lg shadow-blue-500/25"
              >
                + 500ml
              </button>
            </div>
          )}
        </BigStatCard>

        <BigStatCard
          label="Meals"
          current={mealsLogged}
          target={totalMeals}
          unit="meals"
          color="#10b981"
          icon={UtensilsCrossed}
          delay={0.15}
        />

        <BigStatCard
          label="Remaining Budget"
          current={remaining}
          target={calories.target}
          unit="kcal"
          color="#A855F7"
          icon={Flame}
          delay={0.2}
          pctOverride={Math.min(100, Math.round(((calories.target - calories.current) / (calories.target || 1)) * 100))}
        />
      </div>
    </div>
  )
}