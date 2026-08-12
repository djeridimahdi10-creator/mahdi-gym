'use client'

import { motion } from 'framer-motion'
import { Flame, ShieldCheck, Info } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'

export function AdaptiveDailyTarget() {
  const { dailyCalories, targetMacros, todayWorkout } = useNutritionStore()

  const bonusCal = todayWorkout ? todayWorkout.caloriesBonus : 0
  const bonusProt = todayWorkout ? todayWorkout.proteinBonus : 0

  const adaptedCal = dailyCalories + bonusCal
  const adaptedProt = targetMacros.protein + bonusProt
  const adaptedCarbs = targetMacros.carbs + Math.round(bonusCal * 0.5 / 4)
  const adaptedFat = targetMacros.fat + Math.round(bonusCal * 0.2 / 9)

  const cards = [
    {
      label: 'Calories',
      value: adaptedCal,
      unit: 'kcal/day',
      base: `Base: ${dailyCalories} kcal`,
      color: '#00F0FF',
      badge: bonusCal > 0 ? `+${bonusCal} kcal` : null,
    },
    {
      label: 'Protein',
      value: adaptedProt,
      unit: 'g/day',
      base: `Base: ${targetMacros.protein}g`,
      color: '#FFB300',
      badge: bonusProt > 0 ? `+${bonusProt}g` : null,
    },
    {
      label: 'Carbohydrates',
      value: adaptedCarbs,
      unit: 'g/day',
      base: `Base: ${targetMacros.carbs}g`,
      color: '#A855F7',
      badge: 'Glycogen Fuel',
    },
    {
      label: 'Fats',
      value: adaptedFat,
      unit: 'g/day',
      base: `Base: ${targetMacros.fat}g`,
      color: '#FF5C8D',
      badge: 'Hormone Buffer',
    },
  ]

  return (
    <section className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/25">
              <Flame className="w-5 h-5" />
            </div>
            <h2 className="text-white font-bold text-xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Adaptive Daily Targets
            </h2>
          </div>
          <p className="text-slate-400 text-sm mt-2">
            Your targets automatically adapt based on today&apos;s activity and workout — no manual math needed.
          </p>
        </div>

        <span className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 w-fit">
          <ShieldCheck className="w-4 h-4" /> Transparent Logic
        </span>
      </motion.div>

      {/* Target Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 rounded-3xl space-y-2.5"
            style={{ background: 'rgba(17,23,36,0.92)', border: `1px solid ${card.color}28`, boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-300 text-sm font-bold">{card.label}</span>
              {card.badge && (
                <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg" style={{ background: `${card.color}12`, color: card.color, border: `1px solid ${card.color}28` }}>
                  {card.badge}
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tabular-nums" style={{ color: card.color, fontFamily: 'Space Grotesk, sans-serif' }}>
                {card.value}
              </span>
              <span className="text-slate-500 text-sm">{card.unit}</span>
            </div>
            <p className="text-xs text-slate-500">{card.base}</p>
          </motion.div>
        ))}
      </div>

      {/* Rationale Notice */}
      <div className="flex items-center gap-2.5 p-4 rounded-2xl bg-[#00F0FF]/5 border border-[#00F0FF]/15 text-sm text-slate-300">
        <Info className="w-5 h-5 text-[#00F0FF] flex-shrink-0" />
        <span>
          <strong className="text-white">Why adjusted?</strong> {todayWorkout?.name || 'No workout today'} detected from your Iron Command Gym Schedule (+{bonusCal} kcal for muscular recovery and glycogen synthesis).
        </span>
      </div>
    </section>
  )
}