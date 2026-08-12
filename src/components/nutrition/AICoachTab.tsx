'use client'

import { motion } from 'framer-motion'
import {
  Sparkles,
  Stethoscope,
  TrendingUp,
  ChefHat,
  Sun,
  Brain,
  ArrowRight,
} from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { AICoachInsights } from './AICoachInsights'
import { SectionIntro } from './SectionIntro'
import { NUTRITION_TABS, TONE_STYLES, type NutritionTab, type Tone } from './tabs'

interface AICoachTabProps {
  onNavigate: (tab: NutritionTab) => void
}

interface CoachFeature {
  id: string
  title: string
  description: string
  icon: typeof Sparkles
  tone: Tone
  action: string
  modal?: string
  navigate?: NutritionTab
  index?: number
}

const FEATURES: CoachFeature[] = [
  {
    id: 'askdata',
    title: 'Ask My Data',
    description: 'Ask questions about your nutrition, meals, workouts and progress — get instant AI answers.',
    icon: Sparkles,
    tone: 'cyan',
    action: 'Ask AI',
    modal: 'askdata',
  },
  {
    id: 'diagnostic',
    title: 'AI Diagnostics',
    description: 'Run a deep audit on your macros, weight history, adherence and workout intensity.',
    icon: Stethoscope,
    tone: 'blue',
    action: 'Run Diagnostic',
    modal: 'diagnostic',
  },
  {
    id: 'progress',
    title: 'Analyze My Progress',
    description: 'Review weekly trends, your nutrition score and the goal forecast engine.',
    icon: TrendingUp,
    tone: 'emerald',
    action: 'View Progress',
    navigate: 'progress',
  },
  {
    id: 'meals',
    title: 'AI Meal Recommendations',
    description: 'Get the best next meal for your remaining calorie and protein budget.',
    icon: ChefHat,
    tone: 'amber',
    action: 'See Recommendations',
    navigate: 'meals',
  },
  {
    id: 'briefing',
    title: 'AI Daily Briefing',
    description: 'Start the day with a clear, personal briefing of what matters most today.',
    icon: Sun,
    tone: 'purple',
    action: 'Open Briefing',
    navigate: 'overview',
  },
  {
    id: 'habits',
    title: 'Habit Intelligence',
    description: 'Patterns discovered from your meals, hydration and satiety logs.',
    icon: Brain,
    tone: 'rose',
    action: 'Explore Habits',
    navigate: 'meals',
  },
]

export function AICoachTab({ onNavigate }: AICoachTabProps) {
  const { setModalOpen } = useNutritionStore()

  const meta = NUTRITION_TABS[2]

  const handleClick = (f: CoachFeature) => {
    if (f.modal) setModalOpen(f.modal, true, f.index ?? null)
    else if (f.navigate) onNavigate(f.navigate)
  }

  return (
    <motion.div
      className="space-y-10 sm:space-y-12"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <SectionIntro icon={meta.icon} title={meta.title} description={meta.description} tone={meta.tone} />

      {/* Large feature cards — one primary action each */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {FEATURES.map((f, i) => {
          const Icon = f.icon
          const t = TONE_STYLES[f.tone]
          return (
            <motion.div
              key={f.id}
              className="rounded-3xl p-7 flex flex-col gap-5 card-lift"
              style={{
                background: 'rgba(17,23,36,0.92)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 + i * 0.06 }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: t.bg, border: `1px solid ${t.border}` }}
              >
                <Icon className="w-7 h-7" style={{ color: t.color }} />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {f.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
              </div>

              <motion.button
                onClick={() => handleClick(f)}
                className="mt-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all self-start"
                style={{ background: t.bg, color: t.color, border: `1px solid ${t.border}` }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {f.action}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )
        })}
      </div>

      {/* Live AI Coach Insights */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AICoachInsights tips={[]} onRegenerate={() => {}} loading={false} />
      </motion.div>
    </motion.div>
  )
}