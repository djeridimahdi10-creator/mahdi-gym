'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AICoachInsights, SatietyTracker, FeatureCard, CollapsiblePanel } from '@/components/nutrition'
import { useNutritionStore } from '@/stores/nutritionStore'
import { NutritionCategory } from './CategoryTabs'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
}

interface AICoachPanelProps {
  onNavigate: (tab: NutritionCategory) => void
}

export function AICoachPanel({ onNavigate }: AICoachPanelProps) {
  const setModalOpen = useNutritionStore((s) => s.setModalOpen)
  const [showHabits, setShowHabits] = useState(false)

  const features = [
    {
      emoji: '🤖',
      title: 'AI Daily Briefing',
      description: 'Your personalized morning summary: progress, opportunities and today\'s priorities.',
      actionLabel: 'Read Briefing',
      accent: '#00F0FF',
      onClick: () => onNavigate('overview'),
    },
    {
      emoji: '🔮',
      title: 'Ask My Data',
      description: 'Ask questions about your nutrition, meals, workouts, and progress — answered from your real logs.',
      actionLabel: 'Ask AI',
      accent: '#a855f7',
      onClick: () => setModalOpen('askdata', true),
    },
    {
      emoji: '🧠',
      title: 'Analyze My Progress',
      description: 'Deep-dive into weekly adherence, scores, forecasts and AI-synthesized takeaways.',
      actionLabel: 'Open Analytics',
      accent: '#ec4899',
      onClick: () => onNavigate('progress'),
    },
    {
      emoji: '⚕️',
      title: 'AI Diagnostics',
      description: '"Why am I not progressing?" — a deep algorithmic audit across your entire nutrition history.',
      actionLabel: 'Run Diagnostic',
      accent: '#3b82f6',
      onClick: () => setModalOpen('diagnostic', true),
    },
    {
      emoji: '🍽️',
      title: 'AI Meal Recommendations',
      description: 'Smart dish suggestions matched to your remaining calories, protein and macros.',
      actionLabel: 'See Recommendation',
      accent: '#10b981',
      onClick: () => onNavigate('nutrition'),
    },
    {
      emoji: '🧬',
      title: 'Habit Intelligence',
      description: 'Patterns discovered from your data — like how meal composition shapes your satiety.',
      actionLabel: showHabits ? 'Hide Insights' : 'View Insights',
      accent: '#fbbf24',
      onClick: () => setShowHabits(!showHabits),
    },
  ]

  return (
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      <motion.div variants={sectionVariants}>
        <div>
          <div className="mb-7">
            <h2 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              🤖 AI Coach
            </h2>
            <p className="text-slate-400 text-sm mt-1.5 max-w-xl leading-relaxed">
              Your AI nutrition intelligence, organized by capability. Pick one — each opens its full experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>

          {showHabits && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6"
            >
              <SatietyTracker />
            </motion.div>
          )}
        </div>
      </motion.div>

      <motion.div variants={sectionVariants}>
        <CollapsiblePanel
          label="Advanced AI Insights"
          hint="Power-user coaching breakdowns — expand only if you want the full detail."
          accent="#a855f7"
        >
          <AICoachInsights tips={[]} onRegenerate={() => {}} loading={false} />
        </CollapsiblePanel>
      </motion.div>
    </motion.div>
  )
}