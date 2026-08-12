'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, SlidersHorizontal, RefreshCw, CalendarDays, Camera, Mic, ArrowRight } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { SectionIntro } from './SectionIntro'
import { NUTRITION_TABS, TONE_STYLES, type NutritionTab, type Tone } from './tabs'

interface ToolsTabProps {
  onNavigate: (tab: NutritionTab) => void
}

interface ToolFeature {
  id: string
  title: string
  description: string
  icon: typeof ShoppingCart
  tone: Tone
  action: string
  modal?: string
  navigate?: NutritionTab
  index?: number
}

const TOOLS: ToolFeature[] = [
  {
    id: 'grocery',
    title: 'AI Grocery List',
    description: 'Auto-generate a weekly shopping list grouped by protein, carbs, vegetables and Algerian staples.',
    icon: ShoppingCart,
    tone: 'emerald',
    action: 'Generate List',
    modal: 'grocery',
  },
  {
    id: 'whatif',
    title: 'Nutrition Simulator',
    description: 'Simulate a calorie surplus or deficit and project your 12-week body composition changes.',
    icon: SlidersHorizontal,
    tone: 'purple',
    action: 'Run Simulation',
    modal: 'whatif',
  },
  {
    id: 'replace',
    title: 'Meal Replacement',
    description: 'Replace any planned meal with a better-fitting alternative that matches your remaining macros.',
    icon: RefreshCw,
    tone: 'cyan',
    action: 'Replace a Meal',
    modal: 'replace',
    index: 2,
  },
  {
    id: 'planner',
    title: 'Meal Planner',
    description: 'Plan and review your full day of meals with precise macro tracking for every dish.',
    icon: CalendarDays,
    tone: 'amber',
    action: 'Open Planner',
    navigate: 'meals',
  },
  {
    id: 'scanner',
    title: 'Food Scanner',
    description: 'Analyze any meal straight from a photo and log it in seconds.',
    icon: Camera,
    tone: 'rose',
    action: 'Scan Food',
    modal: 'scanner',
  },
  {
    id: 'voice',
    title: 'Voice Logging',
    description: 'Log meals hands-free — just describe what you ate and the AI does the rest.',
    icon: Mic,
    tone: 'blue',
    action: 'Voice Log',
    modal: 'voice',
  },
]

export function ToolsTab({ onNavigate }: ToolsTabProps) {
  const { setModalOpen } = useNutritionStore()

  const meta = NUTRITION_TABS[6]

  const handleClick = (t: ToolFeature) => {
    if (t.modal) setModalOpen(t.modal, true, t.index ?? null)
    else if (t.navigate) onNavigate(t.navigate)
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {TOOLS.map((t, i) => {
          const Icon = t.icon
          const tone = TONE_STYLES[t.tone]
          return (
            <motion.div
              key={t.id}
              className="rounded-3xl p-7 flex flex-col gap-5 card-lift"
              style={{
                background: 'rgba(17,23,36,0.92)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 + i * 0.05 }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: tone.bg, border: `1px solid ${tone.border}` }}
              >
                <Icon className="w-7 h-7" style={{ color: tone.color }} />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {t.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{t.description}</p>
              </div>

              <motion.button
                onClick={() => handleClick(t)}
                className="mt-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all self-start"
                style={{ background: tone.bg, color: tone.color, border: `1px solid ${tone.border}` }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {t.action}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}