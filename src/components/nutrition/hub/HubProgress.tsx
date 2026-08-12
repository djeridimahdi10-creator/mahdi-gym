'use client'

import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { SectionBlock, STAGGER_CONTAINER } from './HubShared'
import { NutritionScoreCard, WeeklyAIReview, GoalForecastCard, NutritionProgress } from '@/components/nutrition'
import { useNutritionData } from './useNutritionData'

export function HubProgress() {
  const d = useNutritionData()

  return (
    <motion.section variants={STAGGER_CONTAINER} initial="hidden" animate="show" className="space-y-10">
      {/* ── Nutrition intelligence score ── */}
      <section className="space-y-5">
        <SectionBlock
          badge="🧠"
          title="Nutrition Intelligence"
          subtitle="Your daily score across calories, protein, hydration, fiber and food quality."
        />
        <NutritionScoreCard />
      </section>

      {/* ── Forecast + weekly review ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GoalForecastCard />
        <WeeklyAIReview />
      </div>

      {/* ── Weekly analytics ── */}
      <section className="space-y-5">
        <SectionBlock
          badge="📊"
          title="Weekly Analytics"
          subtitle="Adherence across the week, today's intake curve and micronutrient coverage."
          right={
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-400">
              <TrendingUp className="w-4 h-4 text-[#10b981]" />
              <span>3 / 7 days completed</span>
            </div>
          }
        />
        <NutritionProgress targetCalories={d.targets.calories} />
      </section>
    </motion.section>
  )
}