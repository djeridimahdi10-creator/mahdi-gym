'use client'

import { motion } from 'framer-motion'
import { MealTimeline, NextMealRecommendation, HydrationIntelligence, DailyMissionsCard, MacrosToday } from '@/components/nutrition'
import { useNutritionStore } from '@/stores/nutritionStore'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
}

export function MyNutritionPanel() {
  const meals = useNutritionStore((s) => s.meals)
  const toggleMealEaten = useNutritionStore((s) => s.toggleMealEaten)

  return (
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      <motion.div variants={sectionVariants}>
        <MealTimeline meals={meals} onToggleMeal={toggleMealEaten} />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <MacrosToday />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <NextMealRecommendation />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <HydrationIntelligence />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <DailyMissionsCard />
      </motion.div>
    </motion.div>
  )
}