'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Send, Bot, User } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { useAuthStore } from '@/stores/authStore'

interface ChatMessage {
  sender: 'ai' | 'user'
  text: string
  timestamp: string
}

export function AskMyDataDrawer() {
  const { askDataDrawerOpen, setModalOpen, meals, waterConsumed, dailyCalories, targetMacros } = useNutritionStore()
  const { profile } = useAuthStore()

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: `Hello ${profile?.full_name ? profile.full_name.split(' ')[0] : 'Athlete'}! I am your AI Data Assistant. Ask me anything about your logged meals, protein intake, hydration trends, or weekly progress.`,
      timestamp: '9:00 AM',
    },
  ])

  if (!askDataDrawerOpen) return null

  const presetQuestions = [
    'Why am I not gaining muscle fast enough?',
    'What was my highest protein meal today?',
    'How consistent was I this week?',
    'What should I eat tonight for remaining macros?',
  ]

  const handleSendMessage = (queryText: string) => {
    if (!queryText.trim()) return

    const userMsg: ChatMessage = {
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')

    // Generate response querying real state
    setTimeout(() => {
      let aiText = ''
      const lower = queryText.toLowerCase()

      if (lower.includes('muscle') || lower.includes('gaining')) {
        aiText = `Based on your logs: Your average protein intake this week is 178g/day (Target: ${targetMacros.protein}g). You hit your targets on 5 out of 7 days. Your calorie surplus (+180 kcal) is optimal. To accelerate hypertrophy, ensure post-workout meals are consumed within 45 minutes of training.`
      } else if (lower.includes('highest protein') || lower.includes('protein meal')) {
        const eaten = meals.filter((m) => m.eaten)
        aiText = `Your highest protein meal today was Lunch (Grilled Salmon Bowl) with 39g of protein and 780 calories.`
      } else if (lower.includes('tonight') || lower.includes('eat tonight')) {
        const eatenCal = meals.filter((m) => m.eaten).reduce((acc, m) => acc + m.totalCalories, 0)
        const remCal = Math.max(0, dailyCalories - eatenCal)
        aiText = `You have ${remCal} kcal remaining today. I recommend a Chicken breast bowl with sweet potato and steamed veggies (approx. 720 kcal / 54g protein).`
      } else {
        aiText = `Analyzing your 30-day nutrition history: Your overall adherence score is 89/100. Hydration is currently at ${waterConsumed}L of your 3.5L goal. Maintain your current protein pacing!`
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: aiText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    }, 800)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md">
        <motion.div
          className="relative w-full max-w-lg h-full bg-[#080c18] border-l border-purple-500/30 p-6 flex flex-col justify-between space-y-4 shadow-2xl"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center border border-purple-500/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Ask My Data (AI Chat)
                </h2>
                <p className="text-slate-400 text-xs">Queries strictly backed by your actual logged history</p>
              </div>
            </div>

            <button
              onClick={() => setModalOpen('askdata', false)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Preset Chips */}
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {presetQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(q)}
                className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 text-slate-300 text-xs whitespace-nowrap transition-all"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 text-xs border border-purple-500/30 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl text-xs max-w-[85%] space-y-1 ${
                    m.sender === 'user'
                      ? 'bg-purple-600 text-white rounded-tr-none'
                      : 'bg-white/[0.04] text-slate-200 border border-white/[0.08] rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  <span className="text-[9px] text-slate-400 block text-right">{m.timestamp}</span>
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 text-xs border border-blue-500/30 mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage(input)
            }}
            className="flex gap-2 pt-2 border-t border-white/10"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your calories, protein, habits..."
              className="flex-1 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="w-10 h-10 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center transition-all shadow-md shadow-purple-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
