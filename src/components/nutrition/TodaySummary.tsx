'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, animate } from 'framer-motion'
import { Flame, Zap, Droplets, Utensils, Plus } from 'lucide-react'

interface ValuePair {
  current: number
  target: number
}

interface TodaySummaryProps {
  calories: ValuePair
  protein: ValuePair
  water: ValuePair
  mealsLogged: number
  totalMeals: number
  onWaterChange?: (delta: number) => void
}

function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0)
  const prev = useRef(0)

  useEffect(() => {
    const controls = animate(prev.current, value, {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    prev.current = value
    return () => controls.stop()
  }, [value])

  return (
    <span className="tabular-nums">
      {display.toLocaleString()}
      {suffix}
    </span>
  )
}

function BigRing({ current, target }: { current: number; target: number }) {
  const pct = Math.min(100, Math.round((current / (target || 1)) * 100))
  const radius = 88
  const strokeWidth = 14
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (pct / 100) * circumference

  return (
    <div className="relative w-[220px] h-[220px] sm:w-[240px] sm:h-[240px] flex items-center justify-center">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r={radius} stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} fill="transparent" />
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          stroke="url(#summaryCalorieGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          fill="transparent"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: 'drop-shadow(0 0 14px rgba(0,240,255,0.35))' }}
        />
        <defs>
          <linearGradient id="summaryCalorieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2" style={{ background: 'rgba(0,240,255,0.12)', border: '1px solid rgba(0,240,255,0.3)' }}>
          <Flame className="w-5 h-5 text-[#00F0FF]" />
        </div>
        <div
          className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          <CountUp value={current} />
        </div>
        <p className="text-sm text-slate-400 mt-1">/ {target} kcal</p>
        <span className="text-xs font-bold text-[#00F0FF] mt-2 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/25">
          {pct}% Reached
        </span>
      </div>
    </div>
  )
}

function BigBar({
  icon: Icon,
  label,
  current,
  target,
  color,
  suffix,
  children,
  accentBorder,
}: {
  icon: typeof Zap
  label: string
  current: number
  target: number
  color: string
  suffix: string
  children?: React.ReactNode
  accentBorder: string
}) {
  const pct = Math.min(100, Math.round((current / (target || 1)) * 100))

  return (
    <div
      className="rounded-2xl p-5 sm:p-6 space-y-3 transition-colors"
      style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${accentBorder}` }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${color}14`, border: `1px solid ${color}30` }}
          >
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <p className="text-sm font-semibold text-slate-300">{label}</p>
        </div>
        <div className="text-right">
          <p className="text-xl sm:text-2xl font-extrabold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <CountUp value={current} />
            <span className="text-slate-500 text-sm font-bold"> / {target}{suffix}</span>
          </p>
        </div>
      </div>

      <div className="h-3.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}cc)`, boxShadow: `0 0 14px ${color}55` }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-bold" style={{ color }}>
          {pct}% completed
        </span>
        {children}
      </div>
    </div>
  )
}

export function TodaySummary({ calories, protein, water, mealsLogged, totalMeals, onWaterChange }: TodaySummaryProps) {
  const mealsPair = { current: mealsLogged, target: totalMeals }
  const mealsPct = Math.min(100, Math.round((mealsLogged / (totalMeals || 1)) * 100))

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(0,240,255,0.04) 0%, rgba(17,23,36,0.95) 55%, rgba(16,185,129,0.04) 100%)',
        border: '1px solid rgba(0,240,255,0.14)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-6 items-stretch">
        {/* Calorie ring */}
        <motion.div
          className="flex flex-col items-center justify-center p-7 sm:p-9 border-b lg:border-b-0 lg:border-r border-white/[0.06]"
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BigRing current={calories.current} target={calories.target} />
          <p className="text-sm text-slate-400 mt-4 text-center">
            Remaining budget:{' '}
            <span className="text-white font-bold tabular-nums">{Math.max(0, calories.target - calories.current)} kcal</span>
          </p>
        </motion.div>

        {/* Metric bars */}
        <div className="flex flex-col justify-center gap-5 p-6 sm:p-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            <BigBar
              icon={Zap}
              label="Protein"
              current={protein.current}
              target={protein.target}
              color="#FFB300"
              suffix="g"
              accentBorder="rgba(255,179,0,0.18)"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
          >
            <BigBar
              icon={Droplets}
              label="Hydration"
              current={water.current}
              target={water.target}
              color="#3b82f6"
              suffix="L"
              accentBorder="rgba(59,130,246,0.22)"
            >
              {onWaterChange && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onWaterChange(0.25)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-300 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> 250ml
                  </button>
                  <button
                    onClick={() => onWaterChange(0.5)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-500/25 hover:bg-blue-500/40 border border-blue-500/40 text-blue-200 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> 500ml
                  </button>
                </div>
              )}
            </BigBar>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.19 }}
          >
            <BigBar
              icon={Utensils}
              label="Meals"
              current={mealsLogged}
              target={totalMeals}
              color="#10b981"
              suffix=""
              accentBorder="rgba(16,185,129,0.2)"
            >
              <span className="text-xs text-slate-400">
                {mealsPct >= 100 ? 'All meals logged – great consistency!' : `${totalMeals - mealsLogged} remaining`}
              </span>
            </BigBar>
          </motion.div>
        </div>
      </div>
    </div>
  )
}