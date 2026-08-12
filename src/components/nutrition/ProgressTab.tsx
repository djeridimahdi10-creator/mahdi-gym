'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNutritionStore } from '@/stores/nutritionStore'
import { computeAdaptedTargets } from '@/lib/nutritionCalc'
import { NutritionScoreCard } from './NutritionScoreCard'
import { GoalForecastCard } from './GoalForecastCard'
import { WeeklyAIReview } from './WeeklyAIReview'
import { NutritionProgress } from './NutritionProgress'
import { SectionIntro } from './SectionIntro'
import { NUTRITION_TABS } from './tabs'

export function ProgressTab() {
  const { dailyCalories, targetMacros, todayWorkout } = useNutritionStore()

  const adapted = useMemo(
    () => computeAdaptedTargets(dailyCalories, targetMacros, todayWorkout),
    [dailyCalories, targetMacros, todayWorkout]
  )

  const meta = NUTRITION_TABS[5]

  return (
    <motion.div
      className="space-y-10 sm:space-y-12"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <SectionIntro icon={meta.icon} title={meta.title} description={meta.description} tone={meta.tone} />

      {/* Nutrition Intelligence + Goal Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7">
          <NutritionScoreCard />
        </div>
        <div className="lg:col-span-5">
          <GoalForecastCard />
        </div>
      </div>

      {/* Weekly AI Review */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <WeeklyAIReview />
      </motion.div>

      {/* Weekly Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <NutritionProgress targetCalories={adapted.calories} />
      </motion.div>
    </motion.div>
  )
}