'use client'

import { motion } from 'framer-motion'
import { Camera, Mic, RefreshCw, UtensilsCrossed, ArrowRight } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { AlgerianFoodHub } from './AlgerianFoodHub'
import { SectionIntro } from './SectionIntro'
import { NUTRITION_TABS, TONE_STYLES, type Tone } from './tabs'

interface FoodFeature {
  id: string
  title: string
  description: string
  icon: typeof Camera
  tone: Tone
  action: string
  modal: string
  index?: number
}

const FEATURES: FoodFeature[] = [
  {
    id: 'scanner',
    title: 'Scan Food',
    description: 'Take a picture of your meal and get an instant, accurate macro analysis.',
    icon: Camera,
    tone: 'rose',
    action: 'Start Scan',
    modal: 'scanner',
  },
  {
    id: 'voice',
    title: 'Voice Log',
    description: 'Just tell the AI what you ate — hands-free meal logging in seconds.',
    icon: Mic,
    tone: 'purple',
    action: 'Start Voice Log',
    modal: 'voice',
  },
  {
    id: 'swap',
    title: 'Smart Food Swap',
    description: 'Find a healthier or more suitable alternative for any meal — keeping your macros on track.',
    icon: RefreshCw,
    tone: 'cyan',
    action: 'Find Alternatives',
    modal: 'swap',
    index: 2,
  },
  {
    id: 'restaurant',
    title: 'Restaurant Mode',
    description: 'Eating outside? Search any menu and get AI fit scores for your remaining targets.',
    icon: UtensilsCrossed,
    tone: 'amber',
    action: 'Open Restaurant Mode',
    modal: 'restaurant',
  },
]

export function SmartFoodTab() {
  const { setModalOpen } = useNutritionStore()

  const meta = NUTRITION_TABS[4]

  return (
    <motion.div
      className="space-y-10 sm:space-y-12"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <SectionIntro icon={meta.icon} title={meta.title} description={meta.description} tone={meta.tone} />

      {/* Feature grid — scanner, voice, swaps, restaurant */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
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
              <div className="flex items-start justify-between gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: t.bg, border: `1px solid ${t.border}` }}
                >
                  <Icon className="w-7 h-7" style={{ color: t.color }} />
                </div>
                <span className="text-2xl" aria-hidden>
                  {f.id === 'scanner' ? '📸' : f.id === 'voice' ? '🎤' : f.id === 'swap' ? '🔄' : '🍽'}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {f.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
              </div>

              <motion.button
                onClick={() => setModalOpen(f.modal, true, f.index ?? null)}
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

      {/* Algerian Food Intelligence */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <AlgerianFoodHub />
      </motion.div>
    </motion.div>
  )
}