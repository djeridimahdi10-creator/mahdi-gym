'use client'

import { motion } from 'framer-motion'
import {
  Sparkles,
  MessageSquareText,
  Stethoscope,
  ChefHat,
  TrendingUp,
  Brain,
  ArrowRight,
} from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'

interface AICoachHubProps {
  onNavigate: (tab: string, anchorId?: string) => void
}

const FEATURES = [
  {
    id: 'briefing',
    title: 'AI Daily Briefing',
    description: 'A personalized morning briefing on how you are tracking today and what matters most.',
    action: 'View Briefing',
    color: '#00F0FF',
    bg: 'rgba(0,240,255,0.08)',
    icon: Sparkles,
    tab: 'overview',
    anchor: 'ai-briefing',
  },
  {
    id: 'ask',
    title: 'Ask My Data',
    description: 'Ask questions about your nutrition, meals, workouts, and progress — answered from your real data.',
    action: 'Ask AI',
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.08)',
    icon: MessageSquareText,
    modal: 'askdata',
  },
  {
    id: 'diagnostic',
    title: 'AI Diagnostics',
    description: 'A deep algorithmic audit of your nutrition, weight history, macro adherence and workout intensity.',
    action: 'Run Audit',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.08)',
    icon: Stethoscope,
    modal: 'diagnostic',
  },
  {
    id: 'recommendations',
    title: 'AI Meal Recommendations',
    description: 'Smart meal suggestions matched against your remaining macro budget for the day.',
    action: 'Get Recommendations',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    icon: ChefHat,
    tab: 'nutrition',
    anchor: 'next-meal',
  },
  {
    id: 'progress',
    title: 'Analyze My Progress',
    description: 'Weekly trends, adherence streaks, and your goal forecast — see where you stand.',
    action: 'View Analysis',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.08)',
    icon: TrendingUp,
    tab: 'progress',
  },
  {
    id: 'habits',
    title: 'Habit Intelligence',
    description: 'Patterns discovered from your logs — satiety, meal timing, and consistency insights.',
    action: 'Explore Habits',
    color: '#f472b6',
    bg: 'rgba(244,114,182,0.08)',
    icon: Brain,
    tab: 'nutrition',
    anchor: 'satiety',
  },
]

export function AICoachHub({ onNavigate }: AICoachHubProps) {
  const { setModalOpen } = useNutritionStore()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {FEATURES.map((feature, index) => {
        const Icon = feature.icon
        const handleClick = () => {
          if (feature.modal) setModalOpen(feature.modal, true)
          else if (feature.tab) onNavigate(feature.tab, feature.anchor)
        }

        return (
          <motion.div
            key={feature.id}
            className="rounded-3xl p-7 flex flex-col justify-between gap-6 min-h-[240px]"
            style={{ background: feature.bg, border: `1px solid ${feature.color}24` }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.07 }}
            whileHover={{ y: -4 }}
          >
            <div className="space-y-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: `${feature.color}14`, border: `1px solid ${feature.color}30` }}
              >
                <Icon className="w-7 h-7" style={{ color: feature.color }} />
              </div>
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {feature.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">{feature.description}</p>
            </div>

            <button
              onClick={handleClick}
              className="w-full py-3 px-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold transition-all"
              style={{
                background: `${feature.color}18`,
                border: `1px solid ${feature.color}35`,
                color: feature.color,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = `${feature.color}28`)}
              onMouseLeave={(e) => (e.currentTarget.style.background = `${feature.color}18`)}
            >
              <span>{feature.action}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )
      })}
    </div>
  )
}