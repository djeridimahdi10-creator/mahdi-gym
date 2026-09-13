'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Utensils, Dumbbell, HeartPulse, Globe, ArrowUpRight } from 'lucide-react'

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

export function ChatSuggestions({ onSelectSuggestion }: ChatSuggestionsProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'nutrition' | 'fitness' | 'recovery' | 'darija'>('all')

  const categories = [
    { id: 'all', label: 'All Prompts', icon: Sparkles },
    { id: 'nutrition', label: 'Nutrition', icon: Utensils },
    { id: 'fitness', label: 'Workouts', icon: Dumbbell },
    { id: 'recovery', label: 'Recovery', icon: HeartPulse },
    { id: 'darija', label: '🇩🇿 Darija', icon: Globe },
  ] as const

  const filtered = SUGGESTIONS.filter((s) => activeCategory === 'all' || s.category === activeCategory)

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 pt-2">
      {/* Category Pills */}
      <div className="flex items-center justify-center gap-1.5 flex-wrap">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={
                isActive
                  ? {
                      background: 'rgba(168,85,247,0.2)',
                      color: '#c084fc',
                      border: '1px solid rgba(168,85,247,0.4)',
                      boxShadow: '0 0 14px rgba(168,85,247,0.2)',
                    }
                  : {
                      background: 'rgba(255,255,255,0.04)',
                      color: '#94a3b8',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }
              }
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* Suggestion Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {filtered.map((s, index) => (
          <motion.button
            key={s.text}
            onClick={() => onSelectSuggestion(s.text)}
            className="group flex items-start gap-3 p-3.5 rounded-xl text-left transition-all duration-200 relative overflow-hidden"
            style={{
              background: 'rgba(21, 31, 50, 0.65)',
              border: '1px solid rgba(71, 85, 105, 0.35)',
              backdropFilter: 'blur(8px)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.03 }}
            whileHover={{
              scale: 1.01,
              backgroundColor: 'rgba(26, 40, 68, 0.9)',
              borderColor: 'rgba(168, 85, 247, 0.4)',
            }}
            whileTap={{ scale: 0.99 }}
          >
            <span className="text-xl flex-shrink-0 mt-0.5">{s.emoji}</span>
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400/90">
                  {s.highlight || s.category}
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-300 leading-snug group-hover:text-white transition-colors">
                {s.text}
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-purple-400/50 group-hover:text-purple-300 absolute top-3 right-3 transition-colors" />
          </motion.button>
        ))}
      </div>
    </div>
  )
}
