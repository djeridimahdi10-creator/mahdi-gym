'use client'

import { motion } from 'framer-motion'
import { Droplets, Plus, Clock, CheckCircle2 } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { HubSection } from './HubSection'

export function HydrationIntelligence() {
  const { waterConsumed, waterTarget, updateWater } = useNutritionStore()

  const pct = Math.min(100, Math.round((waterConsumed / waterTarget) * 100))
  const remainingMl = Math.max(0, Math.round((waterTarget - waterConsumed) * 1000))

  // Hydration Pace Calculation (assumes 14-hour awake window)
  const currentHour = new Date().getHours()
  const awakeHoursPassed = Math.max(1, currentHour - 7) // assume awake at 7 AM
  const expectedTargetAtNow = Math.min(waterTarget, (waterTarget / 14) * awakeHoursPassed)
  const behindPaceMl = Math.max(0, Math.round((expectedTargetAtNow - waterConsumed) * 1000))

  return (
    <div className="space-y-5">
      <HubSection
        emoji="💧"
        title="Hydration"
        subtitle="Real-time fluid pacing — stay on track for recovery and performance."
      >
        {null}
      </HubSection>

      <motion.div
        className="rounded-[2rem] p-7 space-y-6"
        style={{
          background: 'linear-gradient(135deg, rgba(59,130,246,0.07) 0%, rgba(17,23,36,0.97) 100%)',
          border: '1px solid rgba(59,130,246,0.24)',
          boxShadow: '0 6px 30px rgba(0,0,0,0.25)',
        }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.16)', border: '1px solid rgba(59,130,246,0.32)' }}>
              <Droplets className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Hydration Progress</p>
              <p className="text-3xl font-extrabold tabular-nums text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {waterConsumed.toFixed(1)}L
                <span className="text-slate-400 text-base font-semibold"> / {waterTarget}L</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-xl font-extrabold text-blue-400 tabular-nums">{pct}%</span>
            <span className="text-xs text-slate-400">{remainingMl}ml remaining</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-4 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-[#00F0FF]"
            style={{ boxShadow: '0 0 16px rgba(0,240,255,0.4)' }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9 }}
          />
        </div>

        {/* Pace Status */}
        {behindPaceMl > 0 ? (
          <div className="flex items-start gap-3 p-4 rounded-2xl text-sm text-amber-200" style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.26)' }}>
            <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Hydration Pace Alert: You are <strong className="text-white">{behindPaceMl}ml behind</strong> your ideal pace for this
              time of day. A couple of glasses now keeps you on track.
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 rounded-2xl text-sm text-emerald-300" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.26)' }}>
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Optimal Pace: You are perfectly hydrated for your training intensity!</span>
          </div>
        )}

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => updateWater(0.25)}
            className="py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
            style={{ background: 'rgba(59,130,246,0.14)', border: '1px solid rgba(59,130,246,0.3)', color: '#93c5fd' }}
          >
            <Plus className="w-4 h-4" />
            <span>+250ml (Glass)</span>
          </button>

          <button
            onClick={() => updateWater(0.5)}
            className="py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
            style={{ background: 'rgba(59,130,246,0.22)', border: '1px solid rgba(59,130,246,0.42)', color: '#93c5fd' }}
          >
            <Plus className="w-4 h-4" />
            <span>+500ml (Bottle)</span>
          </button>

          <button
            onClick={() => updateWater(1.0)}
            className="py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all text-black"
            style={{ background: '#3b82f6', boxShadow: '0 4px 20px rgba(59,130,246,0.3)' }}
          >
            <Plus className="w-4 h-4" />
            <span>+1.0 Liter</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}