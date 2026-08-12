'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Smile, Sparkles } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { HubSection } from './HubSection'

export function SatietyTracker() {
  const { meals, satietyLogs, logSatiety } = useNutritionStore()
  const [selectedMealIndex, setSelectedMealIndex] = useState(1) // Lunch

  const currentLog = satietyLogs.find((l) => l.mealIndex === selectedMealIndex)

  const emojis = [
    { rating: 1, icon: '😫', label: 'Starving', color: '#f43f5e' },
    { rating: 2, icon: '🙁', label: 'Hungry', color: '#fbbf24' },
    { rating: 3, icon: '😐', label: 'Satisfied', color: '#facc15' },
    { rating: 4, icon: '😋', label: 'Well Fed', color: '#34d399' },
    { rating: 5, icon: '🫄', label: 'Stuffed', color: '#10b981' },
  ]

  return (
    <div id="satiety" className="space-y-5 scroll-mt-28">
      <HubSection
        emoji="😋"
        title="Satiety & Habits"
        subtitle="Correlate meal composition with how you actually feel after eating."
      />

      <motion.div
        className="rounded-[2rem] p-7 space-y-6"
        style={{
          background: 'rgba(17,23,36,0.95)',
          border: '1px solid rgba(255,179,0,0.2)',
          boxShadow: '0 6px 30px rgba(0,0,0,0.25)',
        }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Select Meal Tabs */}
        <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 overflow-x-auto">
          {meals.map((m, i) => (
            <button
              key={i}
              onClick={() => setSelectedMealIndex(i)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize whitespace-nowrap transition-all ${
                selectedMealIndex === i ? 'bg-amber-400 text-black font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {m.type}
            </button>
          ))}
        </div>

        {/* Emoji Scale */}
        <div className="space-y-4">
          <p className="text-base text-slate-200 text-center font-medium">
            How satisfied did you feel after <span className="text-white font-bold capitalize">{meals[selectedMealIndex]?.type}</span>?
          </p>

          <div className="grid grid-cols-5 gap-2.5 max-w-2xl mx-auto">
            {emojis.map((e) => (
              <motion.button
                key={e.rating}
                onClick={() => logSatiety(selectedMealIndex, e.rating)}
                className={`flex flex-col items-center gap-1.5 p-3.5 rounded-2xl border transition-all ${
                  currentLog?.rating === e.rating
                    ? 'border-amber-400 scale-105'
                    : 'border-white/10 hover:bg-white/[0.06]'
                }`}
                style={currentLog?.rating === e.rating ? { background: `${e.color}22`, boxShadow: `0 0 18px ${e.color}30` } : { background: 'rgba(255,255,255,0.03)' }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-3xl leading-none">{e.icon}</span>
                <span className="text-xs font-bold text-slate-300">{e.label}</span>
              </motion.button>
            ))}
          </div>

          {currentLog && (
            <p className="text-center text-xs text-emerald-400 font-bold">
              Logged: {emojis[currentLog.rating - 1]?.icon} {emojis[currentLog.rating - 1]?.label.toUpperCase()}
            </p>
          )}
        </div>

        {/* AI Habit Pattern Alert */}
        <div className="p-5 rounded-2xl text-sm text-purple-200 flex items-start gap-3" style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.24)' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(168,85,247,0.18)' }}>
            <Sparkles className="w-5 h-5 text-purple-300" />
          </div>
          <div>
            <strong className="text-white">AI Satiety Insight:</strong>
            <p className="text-slate-300 text-sm mt-1 leading-relaxed">
              You tend to feel hungry sooner after low-fiber breakfasts. Adding 15g chia or oats extends satiety by +2.4 hours.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}