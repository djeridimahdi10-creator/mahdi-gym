'use client'

import { HelpCircle, X } from 'lucide-react'

interface NutritionGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NutritionGuideModal({ isOpen, onClose }: NutritionGuideModalProps) {
  if (!isOpen) return null

  const items = [
    {
      term: 'Calories (kcal)',
      emoji: '🔥',
      simple: "Your body's energy fuel",
      desc: 'Calories are energy units from food. Your body burns them continuously to breathe, move, and work out.',
      color: '#f97316',
    },
    {
      term: 'Protein',
      emoji: '⚡',
      simple: 'Muscle building & repair',
      desc: 'Protein builds and repairs muscle tissue after activity while keeping you feeling full and satisfied.',
      color: '#a855f7',
    },
    {
      term: 'Carbohydrates',
      emoji: '🌾',
      simple: 'Fast daily energy source',
      desc: 'Carbs are your brain and muscles primary fast energy source for active performance.',
      color: '#38bdf8',
    },
    {
      term: 'Healthy Fats',
      emoji: '🥑',
      simple: 'Hormone & cell support',
      desc: 'Fats support hormone production, brain function, and essential vitamin absorption.',
      color: '#fbbf24',
    },
    {
      term: 'Hydration',
      emoji: '💧',
      simple: 'Vital cell balance',
      desc: 'Water transports nutrients across your body, flushes metabolic waste, and maintains physical performance.',
      color: '#00d4ff',
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-lg p-6 rounded-3xl relative max-h-[85vh] overflow-y-auto space-y-4"
        style={{
          background: 'rgba(9, 14, 26, 0.98)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
        }}
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Nutrition Terms Simplified</h3>
              <p className="text-xs text-slate-400">Beginner-friendly health guide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5">
          {items.map((item) => (
            <div
              key={item.term}
              className="p-3.5 rounded-2xl"
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.emoji}</span>
                  <h4 className="text-sm font-bold text-white">{item.term}</h4>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: `${item.color}15`,
                    color: item.color,
                    border: `1px solid ${item.color}30`,
                  }}
                >
                  {item.simple}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pl-7">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-bold text-sm text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  )
}
