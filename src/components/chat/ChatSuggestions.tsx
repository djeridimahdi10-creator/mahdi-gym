'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Utensils, Dumbbell, HeartPulse, Globe } from 'lucide-react'

interface Suggestion {
  text: string
  emoji: string
  category: 'nutrition' | 'fitness' | 'recovery' | 'darija'
}

const SUGGESTIONS: Suggestion[] = [
  { text: 'Create a high-protein meal plan for fat loss', emoji: '🍽️', category: 'nutrition' },
  { text: 'How to structure post-workout nutrition for hypertrophy?', emoji: '🥩', category: 'nutrition' },
  { text: 'What is the optimal daily protein intake for 80kg bodyweight?', emoji: '💪', category: 'fitness' },
  { text: 'Give me an effective 4-day push-pull-legs workout split', emoji: '🏋️', category: 'fitness' },
  { text: 'How to optimize sleep and HRV for faster muscle recovery?', emoji: '💤', category: 'recovery' },
  { text: 'واش ناكل اليوم باش نزيد ف لاماس؟', emoji: '🇩🇿', category: 'darija' },
  { text: 'اعطيني ترينينغ تع رجليين قاوي', emoji: '🏋️', category: 'darija' },
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
    <div className="w-full max-w-xl space-y-4">
      {/* Category Pills */}
      <div className="flex items-center justify-center gap-1.5 flex-wrap">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
              style={isActive
                ? { background: 'rgba(168,85,247,0.18)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.3)', boxShadow: '0 0 12px rgba(168,85,247,0.15)' }
                : { background: 'rgba(255,255,255,0.03)', color: '#64748b', border: '1px solid rgba(255,255,255,0.06)' }
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
            className="flex items-start gap-3 p-3.5 rounded-2xl text-left transition-all group"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(168,85,247,0.06)', borderColor: 'rgba(168,85,247,0.2)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg flex-shrink-0 mt-0.5">{s.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-300 leading-snug group-hover:text-white transition-colors">{s.text}</p>
              <span className="text-[9px] font-bold text-purple-400/70 capitalize mt-1 inline-block uppercase tracking-wider">
                {s.category}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
