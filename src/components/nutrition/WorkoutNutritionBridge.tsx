'use client'

import { motion } from 'framer-motion'
import { Dumbbell, Zap, Flame, CheckCircle2 } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'

export function WorkoutNutritionBridge() {
  const { todayWorkout, addMealFood } = useNutritionStore()

  if (!todayWorkout) return null

  const handleAddPreWorkout = () => {
    addMealFood(2, {
      name: '⚡ Pre-Workout Fuel (Banana & Whey Shake)',
      portion: '1 shake + 1 banana',
      calories: 320,
      protein: 24,
      carbs: 48,
      fat: 3,
    })
  }

  const handleAddPostWorkout = () => {
    addMealFood(3, {
      name: '🏋️ Hypertrophy Recovery Meal (Chicken & Rice)',
      portion: '1 full meal',
      calories: 520,
      protein: 42,
      carbs: 70,
      fat: 8,
    })
  }

  return (
    <div
      className="rounded-[2rem] p-6 sm:p-8 lg:p-10 space-y-7"
      style={{
        background: 'linear-gradient(135deg, rgba(124,92,252,0.09) 0%, rgba(17,23,36,0.95) 60%)',
        border: '1px solid rgba(124,92,252,0.3)',
        boxShadow: '0 12px 45px rgba(0,0,0,0.3), 0 0 50px rgba(124,92,252,0.04)',
      }}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(124,92,252,0.16)', border: '1px solid rgba(124,92,252,0.34)' }}
          >
            <Dumbbell className="w-7 h-7 text-purple-400" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Training &amp; Nutrition
              </h2>
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(124,92,252,0.16)', color: '#a78bfa', border: '1px solid rgba(124,92,252,0.36)' }}
              >
                Synced with Iron Command
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1.5">
              Today&apos;s workout:{' '}
              <strong className="text-white text-base">{todayWorkout.name}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Pre & Post Workout Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {/* Pre-Workout */}
        <motion.div
          className="p-6 sm:p-7 rounded-3xl space-y-4 flex flex-col justify-between"
          style={{ background: 'rgba(11,15,25,0.85)', border: '1px solid rgba(251,191,36,0.24)' }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)' }}
              >
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-base font-bold text-amber-400">Pre-Workout Fuel</span>
              <span className="text-xs text-slate-500 font-semibold">60 min before</span>
            </div>
            <p className="text-slate-100 text-xl font-extrabold tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              320 kcal
            </p>
            <p className="text-sm text-slate-300">
              <span className="text-amber-400 font-bold">24g protein</span> ·{' '}
              <span className="text-purple-400 font-bold">48g carbs</span> · quick-digesting fuel to top off muscle
              glycogen reserves.
            </p>
          </div>

          <motion.button
            onClick={handleAddPreWorkout}
            className="w-full py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
            style={{ background: 'rgba(251,191,36,0.14)', border: '1px solid rgba(251,191,36,0.32)', color: '#fbbf24' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <PlusIcon />
            <span>Log Pre-Workout Meal</span>
          </motion.button>
        </motion.div>

        {/* Post-Workout */}
        <motion.div
          className="p-6 sm:p-7 rounded-3xl space-y-4 flex flex-col justify-between"
          style={{ background: 'rgba(11,15,25,0.85)', border: '1px solid rgba(168,85,247,0.26)' }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.3)' }}
              >
                <Flame className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-base font-bold text-purple-400">Post-Workout Recovery</span>
              <span className="text-xs text-slate-500 font-semibold">Anabolic window</span>
            </div>
            <p className="text-slate-100 text-xl font-extrabold tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              520 kcal
            </p>
            <p className="text-sm text-slate-300">
              <span className="text-amber-400 font-bold">42g protein</span> ·{' '}
              <span className="text-purple-400 font-bold">70g carbs</span> · high-leucine protein + carbs for muscle
              protein synthesis.
            </p>
          </div>

          <motion.button
            onClick={handleAddPostWorkout}
            className="w-full py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
            style={{ background: 'rgba(168,85,247,0.16)', border: '1px solid rgba(168,85,247,0.34)', color: '#c084fc' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <PlusIcon />
            <span>Log Recovery Meal</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Adherence note */}
      <div
        className="flex items-center gap-3 p-4 rounded-2xl text-sm text-emerald-300"
        style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}
      >
        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <span className="leading-relaxed">
          Logging both meals around your session maximizes the workout-to-nutrition connection ({todayWorkout.caloriesBonus} kcal
          and {todayWorkout.proteinBonus}g protein bonus already added to today&apos;s targets).
        </span>
      </div>
    </div>
  )
}

function PlusIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  )
}