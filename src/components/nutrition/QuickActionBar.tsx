'use client'

import { motion } from 'framer-motion'
import { Plus, Camera, Mic, Sparkles, UtensilsCrossed, ShoppingCart, Sliders, Activity, Search } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'

export function QuickActionBar() {
  const { setModalOpen } = useNutritionStore()

  const actions = [
    { id: 'searchfood', label: 'Search Food', icon: Search, color: '#00F0FF', bg: 'rgba(0,240,255,0.14)' },
    { id: 'scanner', label: 'Scan Food', icon: Camera, color: '#f43f5e', bg: 'rgba(244,63,94,0.12)' },
    { id: 'voice', label: 'Voice Log', icon: Mic, color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
    { id: 'askdata', label: 'Ask AI Data', icon: Sparkles, color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
    { id: 'restaurant', label: 'Outside Dining', icon: UtensilsCrossed, color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
    { id: 'grocery', label: 'Grocery List', icon: ShoppingCart, color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
    { id: 'whatif', label: 'Simulator', icon: Sliders, color: '#c084fc', bg: 'rgba(192,132,252,0.12)' },
  ]

  return (
    <motion.div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-[92%] sm:w-auto px-4 py-2.5 rounded-full flex items-center justify-center gap-2 sm:gap-3 backdrop-blur-xl border overflow-x-auto"
      style={{
        background: 'rgba(6,11,24,0.85)',
        border: '1px solid rgba(0,240,255,0.25)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {actions.map((act) => {
        const Icon = act.icon
        return (
          <motion.button
            key={act.id}
            onClick={() => setModalOpen(act.id, true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap"
            style={{ background: act.bg, color: act.color, border: `1px solid ${act.color}30` }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{act.label}</span>
          </motion.button>
        )
      })}
    </motion.div>
  )
}
