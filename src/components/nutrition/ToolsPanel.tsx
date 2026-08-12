'use client'

import { motion } from 'framer-motion'
import { FeatureCard } from '@/components/nutrition'
import { useNutritionStore } from '@/stores/nutritionStore'
import { NutritionCategory } from './CategoryTabs'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
}

interface ToolsPanelProps {
  onNavigate: (tab: NutritionCategory) => void
}

export function ToolsPanel({ onNavigate }: ToolsPanelProps) {
  const setModalOpen = useNutritionStore((s) => s.setModalOpen)

  const features = [
    {
      emoji: '🛒',
      title: 'AI Grocery List',
      description: 'Auto-generated shopping list grouped into Protein, Carbs, Vegetables & Algerian Staples.',
      actionLabel: 'Generate List',
      accent: '#10b981',
      onClick: () => setModalOpen('grocery', true),
    },
    {
      emoji: '🎛️',
      title: 'Nutrition Simulator',
      description: 'Simulate calorie surplus or deficit and project 12-week body composition changes.',
      actionLabel: 'Run Simulation',
      accent: '#c084fc',
      onClick: () => setModalOpen('whatif', true),
    },
    {
      emoji: '🔄',
      title: 'Meal Replacement',
      description: 'Swap any planned meal for a better-fitting alternative — protein, budget or comfort.',
      actionLabel: 'Find Replacement',
      accent: '#00F0FF',
      onClick: () => setModalOpen('replace', true, 0),
    },
    {
      emoji: '🗓️',
      title: 'Meal Planner',
      description: 'Review and plan today\'s full meal schedule with live macro feedback.',
      actionLabel: 'Open Planner',
      accent: '#a855f7',
      onClick: () => onNavigate('nutrition'),
    },
    {
      emoji: '🎤',
      title: 'Voice Logging',
      description: 'Quick hands-free logging — say what you ate and the AI builds the entry.',
      actionLabel: 'Start Logging',
      accent: '#fbbf24',
      onClick: () => setModalOpen('voice', true),
    },
    {
      emoji: '📸',
      title: 'Food Scanner',
      description: 'Advanced photo analysis of plates, portions and restaurant dishes.',
      actionLabel: 'Open Scanner',
      accent: '#f43f5e',
      onClick: () => setModalOpen('scanner', true),
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
              🛠 Nutrition Tools
            </h2>
            <p className="text-slate-400 text-sm mt-1.5 max-w-xl leading-relaxed">
              Secondary power tools, kept out of your main flow — here when you need them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}