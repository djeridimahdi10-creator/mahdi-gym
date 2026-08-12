'use client'

import { motion } from 'framer-motion'
import { WorkoutNutritionBridge } from '@/components/nutrition'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
}

export function TrainingPanel() {
  return (
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      <motion.div variants={sectionVariants}>
        <WorkoutNutritionBridge />
      </motion.div>
    </motion.div>
  )
}