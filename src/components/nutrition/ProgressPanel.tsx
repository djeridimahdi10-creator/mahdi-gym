'use client'

import { motion } from 'framer-motion'
import { WeeklyAIReview, NutritionScoreCard, GoalForecastCard, NutritionProgress } from '@/components/nutrition'
import { useTodayIntake } from '@/hooks/useTodayIntake'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
}

export function ProgressPanel() {
  const { targets } = useTodayIntake()

  return (
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      <motion.div variants={sectionVariants}>
        <WeeklyAIReview />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <NutritionScoreCard />
          <GoalForecastCard />
        </div>
      </motion.div>

      <motion.div variants={sectionVariants}>
        <NutritionProgress targetCalories={targets.calories} />
      </motion.div>
    </motion.div>
  )
}