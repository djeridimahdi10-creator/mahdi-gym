'use client'

import { motion } from 'framer-motion'
import { Sparkles, Flame, Droplets, Utensils, Activity, ArrowRight } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useNutritionStore } from '@/stores/nutritionStore'

interface TodayAIBriefingProps {
  onTakeAction?: () => void
}

export function TodayAIBriefing({ onTakeAction }: TodayAIBriefingProps = {}) {
  const { profile } = useAuthStore()
  const { dailyCalories, targetMacros, todayWorkout, waterTarget, waterConsumed, meals, setModalOpen } = useNutritionStore()

  const userName = profile?.full_name ? profile.full_name.split(' ')[0] : 'Athlete'
  const userGoal = profile?.goal || 'gain'

  const eatenMeals = meals.filter((m) => m.eaten).length
  const totalMeals = meals.length

  const adaptedCalories = dailyCalories + (todayWorkout ? todayWorkout.caloriesBonus : 0)
  const adaptedProtein = targetMacros.protein + (todayWorkout ? todayWorkout.proteinBonus : 0)

  const hydrationBehind = waterConsumed < waterTarget * 0.7
  const hydrationGapMl = Math.max(0, Math.round((waterTarget - waterConsumed) * 1000))

  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden p-6 sm:p-8"
      style={{
        background: 'linear-gradient(135deg, rgba(6,11,24,0.98) 0%, rgba(12,18,36,0.96) 50%, rgba(168,85,247,0.05) 100%)',
        border: '1px solid rgba(0,240,255,0.18)',
        boxShadow: '0 0 35px rgba(0,240,255,0.03)',
      }}
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top AI Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00F0FF] via-[#a855f7] to-[#10b981]" />

      <div className="flex flex-col lg:flex-row lg:items-stretch justify-between gap-6">
        {/* Left Welcome + Focus */}
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-2">
            <span className="badge-live flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/25">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Today&apos;s AI Briefing</span>
            </span>
            {todayWorkout && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/25">
                {todayWorkout.name}
              </span>
            )}
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Good morning, {userName} 👋
            </h1>
            <p className="text-slate-300 text-base mt-2 leading-relaxed">
              You are currently <span className="text-emerald-400 font-bold">on track (+4.2% consistency)</span> for your{' '}
              <span className="text-white font-semibold capitalize">{userGoal}</span> goal.
            </p>
          </div>

          {/* AI Focus Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF] flex items-center justify-center font-bold">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-semibold uppercase">Target</p>
                <p className="text-white text-base font-bold tabular-nums">{adaptedCalories} kcal</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-semibold uppercase">Protein</p>
                <p className="text-white text-base font-bold tabular-nums">{adaptedProtein}g</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-semibold uppercase">Water</p>
                <p className="text-white text-base font-bold tabular-nums">{waterTarget}L</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                <Utensils className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-semibold uppercase">Schedule</p>
                <p className="text-white text-base font-bold tabular-nums">{eatenMeals}/{totalMeals} Meals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right AI Insight + Take Action */}
        <div className="lg:w-[340px] flex flex-col gap-4">
          <div
            className="flex-1 p-5 rounded-2xl space-y-3 flex flex-col justify-between"
            style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.25)' }}
          >
            <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>AI Key Insight</span>
            </div>

            <p className="text-slate-200 text-sm leading-relaxed">
              {hydrationBehind ? (
                <>
                  Your biggest opportunity today is <span className="text-blue-400 font-bold">hydration</span> 💧
                  <br />
                  You&apos;re <span className="text-white font-bold">{hydrationGapMl}ml</span> behind your daily pace — drink 500ml before your next meal.
                </>
              ) : (
                <>
                  You were <span className="text-amber-400 font-semibold">14g below your protein target</span> yesterday.
                  Since today is a heavy leg day, prioritize a high-protein afternoon snack.
                </>
              )}
            </p>

            <div className="flex items-center gap-1 text-xs text-purple-300 font-bold hover:underline cursor-pointer">
              <span>View Meal Suggestion</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          <motion.button
            onClick={() => (onTakeAction ? onTakeAction() : setModalOpen('askdata', true))}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#00F0FF] text-black font-extrabold text-sm hover:bg-[#00F0FF]/90 transition-all shadow-lg shadow-[#00F0FF]/25"
          >
            <span>Take Action</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}