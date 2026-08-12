'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Camera, Mic, UtensilsCrossed, Zap } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { computeIntake, computeAdaptedTargets } from '@/lib/nutritionCalc'
import { TodayAIBriefing } from './TodayAIBriefing'
import { AdaptiveDailyTarget } from './AdaptiveDailyTarget'
import { NutritionCoreOverview } from './NutritionCoreOverview'
import { SectionIntro } from './SectionIntro'
import { NUTRITION_TABS, type NutritionTab } from './tabs'

interface OverviewTabProps {
  onNavigate: (tab: NutritionTab) => void
}

const QUICK_ACTIONS = [
  { id: 'askdata', label: 'Ask My Data', icon: Sparkles, color: '#00F0FF', bg: 'rgba(0,240,255,0.1)' },
  { id: 'scanner', label: 'Scan Food', icon: Camera, color: '#f43f5e', bg: 'rgba(244,63,94,0.1)' },
  { id: 'voice', label: 'Voice Log', icon: Mic, color: '#a855f7', bg: 'rgba(168,85,247,0.1)' },
  { id: 'restaurant', label: 'Restaurant Mode', icon: UtensilsCrossed, color: '#fbbf24', bg: 'rgba(251,191,36,0.1)' },
]

export function OverviewTab({ onNavigate }: OverviewTabProps) {
  const { meals, waterConsumed, waterTarget, updateWater, dailyCalories, targetMacros, todayWorkout, setModalOpen } =
    useNutritionStore()

  const intake = useMemo(() => computeIntake(meals), [meals])
  const adapted = useMemo(
    () => computeAdaptedTargets(dailyCalories, targetMacros, todayWorkout),
    [dailyCalories, targetMacros, todayWorkout]
  )

  const meta = NUTRITION_TABS[0]

  return (
    <motion.div
      className="space-y-10 sm:space-y-12"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <SectionIntro icon={meta.icon} title={meta.title} description={meta.description} tone={meta.tone} />

      {/* AI Briefing — large dedicated section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <TodayAIBriefing onTakeAction={() => onNavigate('meals')} />
      </motion.div>

      {/* How Am I Doing Today */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <NutritionCoreOverview
          calories={{ current: intake.calories, target: adapted.calories }}
          protein={{ current: intake.protein, target: adapted.protein }}
          carbs={{ current: intake.carbs, target: adapted.carbs }}
          fat={{ current: intake.fat, target: adapted.fat }}
          water={{ current: waterConsumed, target: waterTarget }}
          onWaterChange={updateWater}
          mealsLogged={intake.mealsLogged}
          totalMeals={intake.totalMeals}
        />
      </motion.div>

      {/* Adaptive Daily Targets */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <AdaptiveDailyTarget />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div
          className="rounded-3xl p-6 sm:p-8"
          style={{
            background: 'rgba(17,23,36,0.92)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(0,240,255,0.12)', border: '1px solid rgba(0,240,255,0.3)' }}
            >
              <Zap className="w-5 h-5 text-[#00F0FF]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Quick Actions
              </h2>
              <p className="text-sm text-slate-400">One tap to your most-used tools.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {QUICK_ACTIONS.map((act) => {
              const Icon = act.icon
              return (
                <motion.button
                  key={act.id}
                  onClick={() => setModalOpen(act.id, true)}
                  className="flex items-center gap-2.5 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all"
                  style={{ background: act.bg, color: act.color, border: `1px solid ${act.color}35` }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Icon className="w-5 h-5" />
                  {act.label}
                </motion.button>
              )
            })}
          </div>
        </div>
      </motion.div>

      </motion.div>
  )
}