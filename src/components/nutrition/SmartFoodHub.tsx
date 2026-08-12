'use client'

import { motion } from 'framer-motion'
import { Camera, Mic, RefreshCcw, UtensilsCrossed, Globe2, ArrowRight } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'

interface SmartFoodHubProps {
  onNavigate: (tab: string, anchorId?: string) => void
}

const FEATURES = [
  {
    id: 'scanner',
    title: 'Scan Food',
    description: 'Take a picture of your meal and let AI identify it, estimate macros, and log it instantly.',
    action: 'Open Scanner',
    color: '#f43f5e',
    bg: 'rgba(244,63,94,0.08)',
    icon: Camera,
    modal: 'scanner',
  },
  {
    id: 'voice',
    title: 'Voice Log',
    description: 'Tell the AI what you just ate with your voice — logging without touching your phone.',
    action: 'Start Voice Log',
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.08)',
    icon: Mic,
    modal: 'voice',
  },
  {
    id: 'swap',
    title: 'Smart Food Swap',
    description: 'Find a healthier or more suitable alternative to any meal without losing taste.',
    action: 'Swap My Meal',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    icon: RefreshCcw,
    modal: 'swap',
    swapIndex: 2,
  },
  {
    id: 'restaurant',
    title: 'Restaurant Mode',
    description: 'Eating outside? Search menu items and get AI fit scores for your remaining macros.',
    action: 'Open Restaurant Mode',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.08)',
    icon: UtensilsCrossed,
    modal: 'restaurant',
  },
  {
    id: 'algerian',
    title: 'Algerian Food AI',
    description: 'Understand local Algerian dishes — couscous, rechta, chorba — mapped to exact macros.',
    action: 'Browse Dishes',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.08)',
    icon: Globe2,
    anchor: 'algerian-food-hub',
  },
]

export function SmartFoodHub({ onNavigate }: SmartFoodHubProps) {
  const { setModalOpen } = useNutritionStore()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {FEATURES.map((feature, index) => {
        const Icon = feature.icon
        const handleClick = () => {
          if (feature.anchor) scrollToId(feature.anchor)
          else if (feature.modal) setModalOpen(feature.modal, true, feature.swapIndex ?? null)
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

function scrollToId(id: string) {
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}