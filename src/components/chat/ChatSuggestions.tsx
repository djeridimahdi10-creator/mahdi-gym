'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Utensils, Dumbbell, HeartPulse, Globe, ArrowUpRight, Terminal } from 'lucide-react'

interface Suggestion {
  text: string
  emoji: string
  category: 'nutrition' | 'fitness' | 'recovery' | 'darija'
  highlight?: string
}

const SUGGESTIONS: Suggestion[] = [
  {
    text: 'Create a high-protein 2,400 kcal meal plan for lean bulking',
    emoji: '🥗',
    category: 'nutrition',
    highlight: 'Lean Bulk Plan',
  },
  {
    text: 'What should I eat 60 minutes before a heavy leg workout?',
    emoji: '🥩',
    category: 'nutrition',
    highlight: 'Pre-Workout Fuel',
  },
  {
    text: 'What is the optimal daily protein intake for an 80kg athlete?',
    emoji: '💪',
    category: 'fitness',
    highlight: 'Macro Formula',
  },
  {
    text: 'Give me a 4-day Push-Pull-Legs hyper-growth split',
    emoji: '🏋️',
    category: 'fitness',
    highlight: 'Hypertrophy Split',
  },
  {
    text: 'How to optimize sleep stages and HRV for faster muscle recovery?',
    emoji: '💤',
    category: 'recovery',
    highlight: 'Sleep & HRV',
  },
  {
    text: 'Best proven supplements for muscle soreness and tendon health?',
    emoji: '⚡',
    category: 'recovery',
    highlight: 'Supplements',
  },
  {
    text: 'واش ناكل اليوم باش نزيد ف لاماس؟',
    emoji: '🇩🇿',
    category: 'darija',
    highlight: 'Takhssis & Bulk',
  },
  {
    text: 'اعطيني بروغرام قاوي تع لاصال للمبتدئين',
    emoji: '🇩🇿',
    category: 'darija',
    highlight: 'Gym Routine',
  },
]

interface ChatSuggestionsProps {
  onSelectSuggestion: (text: string) => void
}

const categoryColors: Record<string, { border: string; accent: string; bg: string }> = {
  nutrition: { border: 'rgba(52, 211, 153, 0.2)', accent: 'rgba(52, 211, 153, 0.8)', bg: 'rgba(52, 211, 153, 0.04)' },
  fitness: { border: 'rgba(168, 85, 247, 0.2)', accent: 'rgba(168, 85, 247, 0.8)', bg: 'rgba(168, 85, 247, 0.04)' },
  recovery: { border: 'rgba(251, 146, 60, 0.2)', accent: 'rgba(251, 146, 60, 0.8)', bg: 'rgba(251, 146, 60, 0.04)' },
  darija: { border: 'rgba(52, 211, 153, 0.15)', accent: 'rgba(52, 211, 153, 0.7)', bg: 'rgba(52, 211, 153, 0.03)' },
}

export function ChatSuggestions({ onSelectSuggestion }: ChatSuggestionsProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'nutrition' | 'fitness' | 'recovery' | 'darija'>('all')

  const categories = [
    { id: 'all', label: 'All Queries', icon: Terminal },
    { id: 'nutrition', label: 'Nutrition', icon: Utensils },
    { id: 'fitness', label: 'Workouts', icon: Dumbbell },
    { id: 'recovery', label: 'Recovery', icon: HeartPulse },
    { id: 'darija', label: '🇩🇿 Darija', icon: Globe },
  ] as const

  const filtered = SUGGESTIONS.filter((s) => activeCategory === 'all' || s.category === activeCategory)

  return (
    <div className="w-full max-w-5xl mx-auto space-y-3 pt-1 px-2">
      {/* Category filter tabs — angular HUD style */}
      <div className="flex items-center justify-center gap-1 sm:gap-1.5 flex-wrap">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer uppercase tracking-[0.12em]"
              style={{
                clipPath: 'polygon(4px 0%, calc(100% - 4px) 0%, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0% calc(100% - 4px), 0% 4px)',
                fontFamily: "'Space Grotesk', sans-serif",
                ...(isActive
                  ? {
                      background: 'rgba(168, 85, 247, 0.12)',
                      color: '#c084fc',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                      boxShadow: '0 0 12px rgba(168, 85, 247, 0.15)',
                    }
                  : {
                      background: 'rgba(255, 255, 255, 0.03)',
                      color: '#64748b',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }),
              }}
            >
              <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* Suggestion Cards Grid — angular HUD cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {filtered.map((s, index) => {
          const colors = categoryColors[s.category]
          return (
            <motion.button
              key={s.text}
              onClick={() => onSelectSuggestion(s.text)}
              className="group flex items-start gap-3 p-3 sm:p-3.5 text-left transition-all duration-200 relative overflow-hidden cursor-pointer"
              style={{
                background: 'rgba(8, 15, 30, 0.6)',
                border: `1px solid ${colors.border}`,
                clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)',
                backdropFilter: 'blur(8px)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              whileHover={{
                scale: 1.01,
                borderColor: colors.accent,
                boxShadow: `0 0 20px ${colors.bg}, 0 4px 20px rgba(0, 0, 0, 0.3)`,
              }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-[20%] bottom-[20%] w-[2px] opacity-40 group-hover:opacity-80 transition-opacity"
                style={{ background: colors.accent }}
              />

              <span className="text-lg flex-shrink-0 mt-0.5">{s.emoji}</span>
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[8px] font-extrabold uppercase tracking-[0.2em]"
                    style={{ color: colors.accent, fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {s.highlight || s.category}
                  </span>
                </div>
                <p
                  className="text-xs sm:text-[12.5px] text-dark-400 leading-snug group-hover:text-white transition-colors"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {s.text}
                </p>
              </div>

              {/* Arrow — angular */}
              <div
                className="absolute top-2.5 right-2.5 w-5 h-5 flex items-center justify-center opacity-30 group-hover:opacity-80 transition-opacity"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  background: colors.bg,
                }}
              >
                <ArrowUpRight className="w-2.5 h-2.5" style={{ color: colors.accent }} />
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
