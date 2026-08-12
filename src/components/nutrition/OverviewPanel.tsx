'use client'

import { motion } from 'framer-motion'
import { TodayAIBriefing, NutritionHero, AdaptiveDailyTarget, FeatureCard } from '@/components/nutrition'
import { useTodayIntake } from '@/hooks/useTodayIntake'
import { useNutritionStore } from '@/stores/nutritionStore'
import { NutritionCategory } from './CategoryTabs'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
}

interface OverviewPanelProps {
  onNavigate: (tab: NutritionCategory) => void
}

export function OverviewPanel({ onNavigate }: OverviewPanelProps) {
  const { calories, protein, carbs, fat, water, mealsLogged, totalMeals, targets } = useTodayIntake()
  const updateWater = useNutritionStore((s) => s.updateWater)
  const setModalOpen = useNutritionStore((s) => s.setModalOpen)

  const nextActions = [
    {
      emoji: '📝',
      title: 'Log your next meal',
      description: 'Mark meals as eaten so your remaining targets update live.',
      actionLabel: 'Open My Nutrition',
      accent: '#10b981',
      onClick: () => onNavigate('nutrition'),
    },
    {
      emoji: '📸',
      title: 'Scan a meal',
      description: 'Snap a photo of your plate and the AI logs the macros for you.',
      actionLabel: 'Open Scanner',
      accent: '#f43f5e',
      onClick: () => setModalOpen('scanner', true),
    },
    {
      emoji: '🔮',
      title: 'Ask your data',
      description: 'Ask anything about your meals, protein, hydration or progress.',
      actionLabel: 'Ask AI',
      accent: '#a855f7',
      onClick: () => setModalOpen('askdata', true),
    },
  ]

  return (
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      <motion.div variants={sectionVariants}>
        <TodayAIBriefing />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <NutritionHero
          calories={{ current: calories, target: targets.calories }}
          protein={{ current: protein, target: targets.protein }}
          carbs={{ current: carbs, target: targets.carbs }}
          fat={{ current: fat, target: targets.fat }}
          water={water}
          onWaterChange={updateWater}
          mealsLogged={mealsLogged}
          totalMeals={totalMeals}
        />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <AdaptiveDailyTarget />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <div>
          <div className="mb-7">
            <h2 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              What should you do next?
            </h2>
            <p className="text-slate-400 text-sm mt-1.5">
              Three quick actions, guided by where you stand today.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {nextActions.map((a) => (
              <FeatureCard key={a.title} {...a} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}