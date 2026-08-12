'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, SlidersHorizontal, RefreshCcw, ClipboardList, ArrowRight } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'

interface ToolsHubProps {
  onNavigate: (tab: string, anchorId?: string) => void
}

const FEATURES = [
  {
    id: 'grocery',
    title: 'AI Grocery List',
    description: 'Auto-group your shopping into Protein, Carbs, Veggies and Algerian Staples — ready for the market.',
    action: 'Generate List',
    color: '#00F0FF',
    bg: 'rgba(0,240,255,0.08)',
    icon: ShoppingCart,
    modal: 'grocery',
  },
  {
    id: 'whatif',
    title: 'Nutrition Simulator',
    description: 'Simulate calorie surplus or deficit and project 12-week body composition changes.',
    action: 'Open Simulator',
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.08)',
    icon: SlidersHorizontal,
    modal: 'whatif',
  },
  {
    id: 'replace',
    title: 'Meal Replacement',
    description: 'Swap any planned meal with a smarter, macro-matched alternative that fits your remaining budget.',
    action: 'Replace a Meal',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.08)',
    icon: RefreshCcw,
    modal: 'replace',
    mealIndex: 2,
  },
  {
    id: 'planner',
    title: 'Meal Planner',
    description: 'Open today&apos;s full meal plan to review, log or rebuild each meal of the day.',
    action: 'Open Meal Plan',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    icon: ClipboardList,
    tab: 'nutrition',
    anchor: 'meals',
  },
]

export function ToolsHub({ onNavigate }: ToolsHubProps) {
  const { setModalOpen } = useNutritionStore()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {FEATURES.map((feature, index) => {
        const Icon = feature.icon
        const handleClick = () => {
          if (feature.modal) setModalOpen(feature.modal, true, 'mealIndex' in feature ? (feature as { mealIndex: number }).mealIndex : null)
          else if (feature.tab) onNavigate(feature.tab, feature.anchor)
        }

        return (
          <motion.div
            key={feature.id}
            className="rounded-3xl p-7 flex flex-col justify-between gap-6 min-h-[240px]"
            style={{ background: feature.bg, border: `1px solid ${feature.color}24` }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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