'use client'

import { motion } from 'framer-motion'
import { Flame, Zap, Droplets, UtensilsCrossed, Plus, Activity, Target } from 'lucide-react'
import { NutritionOrb } from './NutritionOrb'

interface MetricData {
  current: number
  target: number
}

interface NutritionOverviewProps {
  calories: MetricData
  protein: MetricData
  carbs: MetricData
  fat: MetricData
  water: { current: number; target: number }
  onWaterChange?: (delta: number) => void
  mealsLogged: number
  totalMeals: number
}

function AnimatedNumber({ value }: { value: number }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0.4, y: -3 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {value.toLocaleString()}
    </motion.span>
  )
}

function BigProgressBar({
  label,
  current,
  target,
  unit,
  color,
  icon,
  children,
}: {
  label: string
  current: number
  target: number
  unit: string
  color: string
  icon: React.ReactNode
  children?: React.ReactNode
}) {
  const pct = Math.min(100, Math.round((current / (target || 1)) * 100))

  return (
    <div
      className="rounded-3xl p-5 sm:p-6 bg-white/[0.03] border border-white/[0.08]"
      style={{ boxShadow: '0 2px 14px rgba(0,0,0,0.2)' }}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${color}15`, border: `1px solid ${color}30` }}
          >
            <span style={{ color }}>{icon}</span>
          </div>
          <span className="text-sm sm:text-base font-bold text-white">{label}</span>
        </div>
        <span className="text-sm sm:text-base font-extrabold tabular-nums" style={{ color }}>
          {pct}%
        </span>
      </div>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums font-display leading-none">
          <AnimatedNumber value={current} />
          <span className="text-xl sm:text-2xl text-slate-300">{unit}</span>
        </span>
        <span className="text-base text-slate-500">
          / {target}
          {unit}
        </span>
      </div>

      <div className="h-4 rounded-full bg-white/[0.06] overflow-hidden border border-white/[0.06]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}aa)`, boxShadow: `0 0 14px ${color}55` }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {children}
    </div>
  )
}

export function NutritionOverview({
  calories,
  protein,
  carbs,
  fat,
  water,
  onWaterChange,
  mealsLogged,
  totalMeals,
}: NutritionOverviewProps) {
  const calPct = Math.min(100, Math.round((calories.current / (calories.target || 1)) * 100))
  const waterPct = Math.min(100, Math.round((water.current / (water.target || 1)) * 100))
  const remainingCalories = Math.max(0, calories.target - calories.current)

  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden p-6 sm:p-8 lg:p-10"
      style={{
        background:
          'linear-gradient(140deg, rgba(0,240,255,0.04) 0%, rgba(17,23,36,0.96) 45%, rgba(168,85,247,0.05) 100%)',
        border: '1px solid rgba(0,240,255,0.16)',
        boxShadow: '0 0 45px rgba(0,240,255,0.03)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-8 sm:mb-10 flex items-center gap-3">
        <span className="badge-live" style={{ background: 'rgba(0,240,255,0.1)', color: '#00F0FF', border: '1px solid rgba(0,240,255,0.3)' }}>
          How am I doing today?
        </span>
        <span className="text-sm text-slate-400">One look, everything that matters.</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* ── 3D Nutrition Core ── */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative">
            <div
              className="absolute inset-4 rounded-full blur-2xl"
              style={{
                background: 'radial-gradient(circle at 40% 35%, rgba(16,185,129,0.14) 0%, rgba(168,85,247,0.08) 55%, transparent 75%)',
              }}
            />
            <NutritionOrb
              calories={calories}
              protein={protein}
              carbs={carbs}
              fat={fat}
            />
          </div>

          {/* Calorie readout under the orb */}
          <div className="mt-6 text-center">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums font-display leading-none">
                <AnimatedNumber value={calories.current} />
              </span>
              <span className="text-lg sm:text-xl text-slate-400">/ {calories.target} kcal</span>
            </div>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span
                className="text-sm font-bold px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5"
                style={{ background: 'rgba(0,240,255,0.1)', color: '#00F0FF', border: '1px solid rgba(0,240,255,0.3)' }}
              >
                <Flame className="w-4 h-4" />
                {calPct}% Reached
              </span>
              <span className="text-sm text-slate-400">
                {remainingCalories} kcal remaining
              </span>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500 max-w-xs leading-relaxed">
            Live 3D Nutrition Core — the sphere tracks your calories, the orbiting rings your protein, carbs and fats.
          </p>
        </div>

        {/* ── Big daily metrics ── */}
        <div className="lg:col-span-7 space-y-5">
          <BigProgressBar
            label="Protein"
            current={protein.current}
            target={protein.target}
            unit="g"
            color="#FFB300"
            icon={<Zap className="w-5 h-5" />}
          />

          <BigProgressBar
            label="Hydration"
            current={Math.round(water.current * 100) / 100}
            target={water.target}
            unit="L"
            color="#3B82F6"
            icon={<Droplets className="w-5 h-5" />}
          >
            {onWaterChange && (
              <div className="flex items-center gap-2.5 mt-4">
                <button
                  onClick={() => onWaterChange(0.25)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-300 text-sm font-bold transition-all"
                >
                  <Plus className="w-4 h-4" /> +250 ml
                </button>
                <button
                  onClick={() => onWaterChange(0.5)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-300 text-sm font-bold transition-all"
                >
                  <Plus className="w-4 h-4" /> +500 ml
                </button>
                <button
                  onClick={() => onWaterChange(1.0)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all shadow-md shadow-blue-500/25"
                >
                  <Plus className="w-4 h-4" /> +1 Liter
                </button>
                <span className="text-xs text-slate-500 ml-auto hidden sm:block">{waterPct}% of daily goal</span>
              </div>
            )}
          </BigProgressBar>

          <BigProgressBar
            label="Meals Completed"
            current={mealsLogged}
            target={totalMeals}
            unit=""
            color="#10B981"
            icon={<UtensilsCrossed className="w-5 h-5" />}
          >
            <div className="flex items-center gap-2 mt-4">
              {Array.from({ length: totalMeals }).map((_, i) => (
                <div
                  key={i}
                  className="h-2 flex-1 rounded-full"
                  style={{
                    background: i < mealsLogged ? '#10B981' : 'rgba(255,255,255,0.08)',
                    boxShadow: i < mealsLogged ? '0 0 10px rgba(16,185,129,0.4)' : 'none',
                  }}
                />
              ))}
            </div>
          </BigProgressBar>

          {/* Carbs & Fats quick tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="rounded-2xl p-5 bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-500/15 border border-purple-500/30">
                  <Activity className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Carbohydrates</p>
                  <p className="text-2xl font-extrabold text-white tabular-nums font-display">
                    {carbs.current}
                    <span className="text-base text-slate-400"> / {carbs.target}g</span>
                  </p>
                </div>
              </div>
              <span className="text-sm font-bold text-purple-400">{Math.min(100, Math.round((carbs.current / (carbs.target || 1)) * 100))}%</span>
            </div>

            <div
              className="rounded-2xl p-5 bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-pink-500/15 border border-pink-500/30">
                  <Target className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Fats</p>
                  <p className="text-2xl font-extrabold text-white tabular-nums font-display">
                    {fat.current}
                    <span className="text-base text-slate-400"> / {fat.target}g</span>
                  </p>
                </div>
              </div>
              <span className="text-sm font-bold text-pink-400">{Math.min(100, Math.round((fat.current / (fat.target || 1)) * 100))}%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}