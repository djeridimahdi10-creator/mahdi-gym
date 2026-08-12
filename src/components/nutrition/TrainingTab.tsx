'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Dumbbell, Flame, Zap, ArrowRight, CalendarX2 } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { WorkoutNutritionBridge } from './WorkoutNutritionBridge'
import { SectionIntro } from './SectionIntro'
import { NUTRITION_TABS } from './tabs'

export function TrainingTab() {
  const { todayWorkout } = useNutritionStore()

  const meta = NUTRITION_TABS[3]

  return (
    <motion.div
      className="space-y-10 sm:space-y-12"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <SectionIntro icon={meta.icon} title={meta.title} description={meta.description} tone={meta.tone} />

      {todayWorkout ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Today's Workout — primary block */}
          <motion.div
            className="lg:col-span-5 rounded-3xl p-7 sm:p-8 flex flex-col gap-5"
            style={{
              background: 'linear-gradient(135deg, rgba(255,179,0,0.08) 0%, rgba(17,23,36,0.95) 100%)',
              border: '1px solid rgba(255,179,0,0.25)',
              boxShadow: '0 4px 25px rgba(0,0,0,0.2)',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Dumbbell className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Today&apos;s Workout</p>
                <h3 className="text-white text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {todayWorkout.name}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                  <Zap className="w-4 h-4" /> Calorie Bonus
                </span>
                <p className="text-2xl font-extrabold text-white tabular-nums">+{todayWorkout.caloriesBonus} kcal</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                  <Flame className="w-4 h-4" /> Protein Bonus
                </span>
                <p className="text-2xl font-extrabold text-white tabular-nums">+{todayWorkout.proteinBonus} g</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Training days automatically raise your targets to fuel muscular recovery and glycogen synthesis. Your
              Adaptive Targets in the Overview already include this bonus.
            </p>

            <Link href="/dashboard/gym" className="mt-auto">
              <motion.span
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 text-black text-sm font-bold transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Open Gym Schedule
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </motion.div>

          {/* Pre / Post Workout Nutrition */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <WorkoutNutritionBridge />
          </motion.div>
        </div>
      ) : (
        <motion.div
          className="rounded-3xl p-8 sm:p-10 text-center"
          style={{
            background: 'rgba(17,23,36,0.92)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center bg-white/5 border border-white/10">
            <CalendarX2 className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            No workout scheduled today
          </h3>
          <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
            When you schedule a workout in the Gym, this section will show your pre-workout fuel and post-workout
            recovery plan — plus an automatic adjustment of your daily targets.
          </p>
          <Link href="/dashboard/gym" className="mt-6 inline-block">
            <motion.span
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 text-black text-sm font-bold transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Plan a Workout
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </motion.div>
      )}
    </motion.div>
  )
}