'use client'

import { motion } from 'framer-motion'
import { useNutritionStore } from '@/stores/nutritionStore'
import { MealTimeline } from './MealTimeline'
import { NextMealRecommendation } from './NextMealRecommendation'
import { HydrationIntelligence } from './HydrationIntelligence'
import { SatietyTracker } from './SatietyTracker'
import { DailyMissionsCard } from './DailyMissionsCard'
import { SectionIntro } from './SectionIntro'
import { NUTRITION_TABS } from './tabs'

export function MyNutritionTab() {
  const { meals, toggleMealEaten } = useNutritionStore()

  const meta = NUTRITION_TABS[1]

  return (
    <motion.div
      className="space-y-10 sm:space-y-12"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <SectionIntro icon={meta.icon} title={meta.title} description={meta.description} tone={meta.tone} />

      {/* Today's Meals — large dedicated cards, comfy reading width */}
      <div className="mx-auto max-w-3xl">
        <MealTimeline meals={meals} onToggleMeal={toggleMealEaten} />
      </div>

      {/* AI recommendation: What Should I Eat Next */}
      <div className="mx-auto max-w-4xl">
        <NextMealRecommendation />
      </div>

      {/* Hydration + Satiety */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HydrationIntelligence />
        <SatietyTracker />
      </div>

      {/* Daily Missions */}
      <div className="mx-auto max-w-3xl">
        <DailyMissionsCard />
      </div>
    </motion.div>
  )
}