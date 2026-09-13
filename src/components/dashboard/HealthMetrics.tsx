'use client'

import React from 'react'
import { Flame, Zap, Droplets, Heart, Plus, Minus } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { MetabolicCalorieGaugeSVG } from './DashboardVisuals'

interface MetricRingCardProps {
  value: number
  max: number
  color: string
  label: string
  valueText: string
  targetText: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  onQuickAdd?: (delta: number) => void
}

function MetricRingCard({
  value,
  max,
  color,
  label,
  valueText,
  targetText,
  icon: Icon,
  onQuickAdd,
}: MetricRingCardProps) {
  const size = 72
  const strokeWidth = 5.5
  const r = (size - strokeWidth * 2) / 2
  const circ = 2 * Math.PI * r
  const pct = Math.min(1, Math.max(0, value / (max || 1)))
  const offset = circ * (1 - pct)
  const cx = size / 2

  return (
    <div
      className="p-4 rounded-2xl flex flex-col items-center justify-between text-center h-full relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 group"
      style={{
        background: 'rgba(11, 17, 31, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
      }}
    >
      {/* Soft color halo */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}12 0%, transparent 70%)` }}
      />

      {/* Circular Progress Ring */}
      <div className="relative flex-shrink-0 mt-1">
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={cx} cy={cx} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
          <circle
            cx={cx}
            cy={cx}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circ}`}
            strokeDashoffset={offset}
            style={{
              filter: `drop-shadow(0 0 6px ${color}70)`,
              transition: 'stroke-dashoffset 1s ease-in-out',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>

      {/* Metric Data */}
      <div className="relative min-w-0 w-full mt-2">
        <span className="block text-lg font-black text-white tracking-tight leading-none">
          {valueText}
        </span>
        {targetText ? (
          <span className="block text-[11px] text-slate-400 font-medium mt-1 truncate">
            {targetText}
          </span>
        ) : (
          <span className="block text-[11px] text-emerald-400 font-semibold mt-1 truncate">
            Optimal
          </span>
        )}
        <p className="text-[10px] font-bold mt-1 tracking-[0.08em] uppercase" style={{ color }}>
          {label}
        </p>
      </div>

      {/* Quick +/- Buttons */}
      {onQuickAdd && (
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/[0.05] w-full justify-center opacity-70 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onQuickAdd(-1)}
            title="Decrease"
            className="w-6 h-6 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white flex items-center justify-center text-xs active:scale-95 transition-all"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-[10px] text-slate-500 font-semibold">Quick</span>
          <button
            onClick={() => onQuickAdd(1)}
            title="Increase"
            className="w-6 h-6 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white flex items-center justify-center text-xs active:scale-95 transition-all"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  )
}

export function HealthMetrics() {
  const {
    meals,
    dailyCalories,
    targetMacros,
    waterConsumed,
    waterTarget,
    updateWater,
    setCustomTargets,
  } = useNutritionStore()

  const eatenMeals = meals.filter((m) => m.eaten)
  const consumedCalories = eatenMeals.reduce((acc, m) => acc + m.totalCalories, 0)
  const consumedProtein = eatenMeals.reduce(
    (acc, m) => acc + m.foods.reduce((fAcc, f) => fAcc + (f.protein || 0), 0),
    0
  )

  const caloriePct = Math.min(100, Math.round((consumedCalories / (dailyCalories || 1)) * 100))
  const healthScore = Math.min(99, Math.max(65, Math.round(80 + (caloriePct > 90 ? 10 : 0) + (waterConsumed >= 2 ? 8 : 0))))

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full">
      {/* Metabolic Calorie Gauge */}
      <div
        className="md:col-span-5 p-5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          background: 'rgba(11, 17, 31, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
        }}
      >
        <MetabolicCalorieGaugeSVG
          consumed={consumedCalories}
          target={dailyCalories}
          activeBurn={460}
          size={190}
        />
      </div>

      {/* 3 Metric Rings */}
      <div className="md:col-span-7 grid grid-cols-3 gap-3">
        <MetricRingCard
          value={consumedProtein}
          max={targetMacros.protein}
          color="#a855f7"
          label="Protein"
          valueText={`${consumedProtein}g`}
          targetText={`/ ${targetMacros.protein}g`}
          icon={Zap}
          onQuickAdd={(dir) => setCustomTargets({ protein: targetMacros.protein + dir * 5 })}
        />
        <MetricRingCard
          value={waterConsumed}
          max={waterTarget}
          color="#00d4ff"
          label="Hydration"
          valueText={`${waterConsumed.toFixed(1)}L`}
          targetText={`/ ${waterTarget}L`}
          icon={Droplets}
          onQuickAdd={(dir) => updateWater(dir * 0.25)}
        />
        <MetricRingCard
          value={healthScore}
          max={100}
          color="#10b981"
          label="Health Score"
          valueText={`${healthScore}%`}
          targetText="Bio-Index"
          icon={Heart}
        />
      </div>
    </div>
  )
}
