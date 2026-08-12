'use client'

import { motion } from 'framer-motion'
import { Target, CheckCircle2, Circle } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'

export function DailyMissionsCard() {
  const { waterConsumed, waterTarget, meals, targetMacros } = useNutritionStore()

  const eatenMeals = meals.filter((m) => m.eaten)
  const eatenProt = eatenMeals.reduce((sum, m) => sum + m.foods.reduce((acc, f) => acc + (f.protein || 20), 0), 0)

  const missions = [
    {
      id: 'protein',
      label: `Hit protein daily target (${eatenProt}/${targetMacros.protein}g)`,
      done: eatenProt >= targetMacros.protein,
    },
    {
      id: 'water',
      label: `Drink ${waterTarget}L water (${waterConsumed.toFixed(1)}L logged)`,
      done: waterConsumed >= waterTarget,
    },
    {
      id: 'veggies',
      label: 'Eat 2 servings of fiber-rich green vegetables',
      done: true,
    },
    {
      id: 'meals',
      label: `Log all ${meals.length} planned meals (${eatenMeals.length}/${meals.length})`,
      done: eatenMeals.length === meals.length,
    },
  ]

  const completedCount = missions.filter((m) => m.done).length

  return (
    <motion.div
      className="rounded-[2rem] p-7 space-y-5 h-full"
      style={{
        background: 'rgba(17,23,36,0.95)',
        border: '1px solid rgba(0,240,255,0.18)',
        boxShadow: '0 6px 30px rgba(0,0,0,0.25)',
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,240,255,0.14)', border: '1px solid rgba(0,240,255,0.28)' }}>
            <Target className="w-5 h-5 text-[#00F0FF]" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Today&apos;s Missions
            </h2>
            <p className="text-slate-400 text-sm">Small wins that build big consistency</p>
          </div>
        </div>

        <span className="text-sm font-bold px-4 py-1.5 rounded-full shrink-0" style={{ background: 'rgba(0,240,255,0.1)', color: '#00F0FF', border: '1px solid rgba(0,240,255,0.24)' }}>
          {completedCount} / {missions.length}
        </span>
      </div>

      <div className="space-y-3">
        {missions.map((m) => (
          <div
            key={m.id}
            className={`p-4 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
              m.done
                ? 'border-emerald-500/30 text-emerald-300'
                : 'border-white/10 text-slate-300'
            }`}
            style={{ background: m.done ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.03)' }}
          >
            <span className="text-sm font-semibold leading-snug">{m.label}</span>
            {m.done ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-slate-500 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}