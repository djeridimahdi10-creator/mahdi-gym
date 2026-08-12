'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Target, Info } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'

export function GoalForecastCard() {
  const { profile } = useAuthStore()

  const currentWeight = profile?.weight || 72.4
  const targetWeight = profile?.goal === 'lose' ? 68.0 : 78.0
  const isGain = targetWeight > currentWeight
  const diff = Math.abs(targetWeight - currentWeight)

  return (
    <div
      className="rounded-3xl p-6 sm:p-7 space-y-5"
      style={{
        background: 'linear-gradient(135deg, rgba(168,85,247,0.06) 0%, rgba(17,23,36,0.95) 100%)',
        border: '1px solid rgba(168,85,247,0.2)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.22)',
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center border border-purple-500/30">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Goal Forecast
            </h2>
            <p className="text-slate-400 text-sm">Estimated weight trajectory from current adherence</p>
          </div>
        </div>

        <span className="text-xs font-bold text-purple-400 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 flex-shrink-0">
          Target: {targetWeight} kg
        </span>
      </div>

      {/* Progress metrics */}
      <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
        <div>
          <span className="text-xs text-slate-400 font-semibold uppercase block">Current Weight</span>
          <span className="text-white text-xl font-bold tabular-nums">{currentWeight} kg</span>
        </div>
        <div>
          <span className="text-xs text-slate-400 font-semibold uppercase block">Projected Date</span>
          <span className="text-purple-300 text-xl font-bold">Oct 14, 2026</span>
        </div>
        <div>
          <span className="text-xs text-slate-400 font-semibold uppercase block">Remaining</span>
          <span className="text-emerald-400 text-xl font-bold tabular-nums">
            {isGain ? `+${diff.toFixed(1)}` : `-${diff.toFixed(1)}`} kg
          </span>
        </div>
      </div>

      {/* Trajectory Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-400 font-semibold">
          <span>Current ({currentWeight}kg)</span>
          <span>Goal ({targetWeight}kg)</span>
        </div>
        <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-[#00F0FF]" style={{ width: '64%' }} />
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-400 italic">
        <Info className="w-4 h-4 text-purple-400 flex-shrink-0" />
        <span>Estimated trajectory based on recent 14-day energy balance and macronutrient consistency.</span>
      </div>
    </div>
  )
}
