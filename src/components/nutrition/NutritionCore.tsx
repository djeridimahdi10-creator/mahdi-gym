'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, Zap, Activity, Target, Droplets, Plus, Minus, Utensils, CheckCircle2 } from 'lucide-react'
import { NutritionOrb } from './NutritionOrb'

function useCountUp(value: number, duration = 900): number {
  const [display, setDisplay] = useState(value)
  const prevRef = useRef(value)

  useEffect(() => {
    const from = prevRef.current
    const diff = value - from
    if (diff === 0) return

    let raf: number
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(from + diff * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      prevRef.current = value
    }
  }, [value, duration])

  return display
}

interface MacroData {
  current: number
  target: number
}

interface NutritionCoreProps {
  calories: MacroData
  protein: MacroData
  carbs: MacroData
  fat: MacroData
  water: { current: number; target: number }
  onWaterChange?: (delta: number) => void
  mealsLogged: number
  totalMeals: number
}

function CalorieRing({ current, target }: { current: number; target: number }) {
  const shown = useCountUp(current)
  const pct = Math.min(100, Math.round((current / (target || 1)) * 100))
  const radius = 86
  const strokeWidth = 14
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (pct / 100) * circumference

  return (
    <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r={radius} stroke="rgba(255,255,255,0.07)" strokeWidth={strokeWidth} fill="transparent" />
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="url(#coreCalGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1)' }}
        />
        <defs>
          <linearGradient id="coreCalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="flex items-center gap-2 text-xs font-bold text-[#00F0FF] uppercase tracking-widest">
          <Flame className="w-4 h-4" /> Calories
        </span>
        <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {shown.toLocaleString()}
        </span>
        <span className="text-sm text-slate-400 font-medium">/ {target.toLocaleString()} kcal</span>
        <span
          className="mt-2 text-xs font-extrabold px-3 py-1 rounded-full tabular-nums"
          style={{ background: 'rgba(0,240,255,0.1)', color: '#00F0FF', border: '1px solid rgba(0,240,255,0.3)' }}
        >
          {pct}% Reached
        </span>
      </div>
    </div>
  )
}

function MacroRow({
  label,
  current,
  target,
  unit,
  color,
  icon: Icon,
}: {
  label: string
  current: number
  target: number
  unit: string
  color: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
}) {
  const shown = useCountUp(current)
  const pct = Math.min(100, Math.round((current / (target || 1)) * 100))

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Icon className="w-5 h-5" style={{ color }} />
          <span className="text-sm font-bold text-slate-200 uppercase tracking-wider">{label}</span>
        </div>
        <span className="text-sm font-extrabold tabular-nums" style={{ color }}>
          {pct}%
        </span>
      </div>
      <div className="h-3.5 w-full rounded-full bg-white/5 border border-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 14px ${color}60` }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-extrabold text-white tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {shown}
        </span>
        <span className="text-sm text-slate-500">
          {unit} <span className="text-slate-400">/ {target}{unit}</span>
        </span>
      </div>
    </div>
  )
}

export function NutritionCore({
  calories,
  protein,
  carbs,
  fat,
  water,
  onWaterChange,
  mealsLogged,
  totalMeals,
}: NutritionCoreProps) {
  const waterPct = Math.min(100, Math.round((water.current / (water.target || 1)) * 100))
  const mealsPct = Math.min(100, Math.round((mealsLogged / (totalMeals || 1)) * 100))
  const shownWater = useCountUp(Math.round(water.current * 100)) / 100

  return (
    <motion.div
      className="relative rounded-[2rem] overflow-hidden p-6 sm:p-8 lg:p-10"
      style={{
        background: 'linear-gradient(135deg, rgba(0,240,255,0.04) 0%, rgba(17,23,36,0.97) 45%, rgba(168,85,247,0.05) 100%)',
        border: '1px solid rgba(0,240,255,0.16)',
        boxShadow: '0 10px 50px rgba(0,0,0,0.35)',
      }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* ── Left: Interactive 3D Nutrition Core ── */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <div
              className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, rgba(168,85,247,0.06) 45%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
            <NutritionOrb
              calories={calories}
              protein={protein}
              carbs={carbs}
              fat={fat}
            />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              Interactive Nutrition Core
            </span>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(168,85,247,0.12)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.3)' }}
            >
              3D LIVE
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2.5">
            {[
              { label: 'Protein', color: '#FFB300' },
              { label: 'Carbs', color: '#A855F7' },
              { label: 'Fats', color: '#FF5C8D' },
            ].map((m) => (
              <span key={m.label} className="flex items-center gap-1.5 text-[11px] font-bold" style={{ color: m.color }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: m.color }} />
                {m.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right: Today's Status ── */}
        <div className="lg:col-span-7 space-y-7">
          {/* Headline row */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                How am I doing today?
              </h2>
              <p className="text-sm text-slate-400 mt-1">Live intake vs your adaptive targets</p>
            </div>
            <span
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-emerald-400"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}
            >
              <CheckCircle2 className="w-4 h-4" />
              {mealsLogged} / {totalMeals} Meals Eaten
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-10">
            <CalorieRing current={calories.current} target={calories.target} />
            <div className="flex-1 w-full space-y-6">
              <MacroRow label="Protein" {...protein} unit="g" color="#FFB300" icon={Zap} />
              <MacroRow label="Carbs" {...carbs} unit="g" color="#A855F7" icon={Activity} />
              <MacroRow label="Fats" {...fat} unit="g" color="#FF5C8D" icon={Target} />
            </div>
          </div>

          {/* Hydration + Meals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div
              className="rounded-2xl p-5 space-y-3"
              style={{ background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.2)' }}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-bold text-slate-100">
                  <Droplets className="w-4 h-4 text-blue-400" /> Hydration
                </span>
                <span className="text-sm font-extrabold text-blue-400 tabular-nums">{waterPct}%</span>
              </div>
              <div className="h-3.5 w-full rounded-full bg-white/5 border border-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-[#00F0FF]"
                  style={{ boxShadow: '0 0 12px rgba(59,130,246,0.5)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${waterPct}%` }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-slate-400">
                  <span className="text-white font-extrabold text-lg tabular-nums">{shownWater.toFixed(1)}L</span> / {water.target}L
                </p>
                {onWaterChange && (
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => onWaterChange(-0.25)}
                      disabled={water.current <= 0}
                      className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 disabled:opacity-30"
                      whileTap={{ scale: 0.9 }}
                      aria-label="Remove 250ml"
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => onWaterChange(0.25)}
                      className="w-11 h-9 rounded-xl flex items-center justify-center gap-1 bg-blue-500/20 border border-blue-500/40 text-blue-300 hover:bg-blue-500/30 text-xs font-bold"
                      whileTap={{ scale: 0.9 }}
                      aria-label="Add 250ml"
                    >
                      <Plus className="w-4 h-4" /> 250ml
                    </motion.button>
                  </div>
                )}
              </div>
            </div>

            <div
              className="rounded-2xl p-5 space-y-3"
              style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-bold text-slate-100">
                  <Utensils className="w-4 h-4 text-emerald-400" /> Meals
                </span>
                <span className="text-sm font-extrabold text-emerald-400 tabular-nums">{mealsPct}%</span>
              </div>
              <div className="h-3.5 w-full rounded-full bg-white/5 border border-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-[#10b981]"
                  style={{ boxShadow: '0 0 12px rgba(16,185,129,0.5)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${mealsPct}%` }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <p className="text-sm text-slate-400">
                <span className="text-white font-extrabold text-lg tabular-nums">{mealsLogged}</span> of {totalMeals} planned meals completed
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}