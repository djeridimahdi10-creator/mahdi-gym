'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, UtensilsCrossed, Search, Trophy, CheckCircle2, AlertTriangle } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'

export function RestaurantModeModal() {
  const { restaurantModalOpen, setModalOpen, addMealFood, dailyCalories, meals } = useNutritionStore()
  const [query, setQuery] = useState('')

  if (!restaurantModalOpen) return null

  const eatenCal = meals.filter((m) => m.eaten).reduce((acc, m) => acc + m.totalCalories, 0)
  const remCal = Math.max(0, dailyCalories - eatenCal)

  const choices = [
    {
      rank: '🥇 Best Pick',
      name: 'Grilled Chicken Breasts & Seasoned Rice',
      calories: 640,
      protein: 52,
      carbs: 70,
      fat: 12,
      fits: true,
      rationale: 'Fits perfectly within your remaining 1,110 kcal budget with high muscle-building protein.',
    },
    {
      rank: '🥈 Second Best',
      name: 'Grilled Steak Sandwich with Salad',
      calories: 710,
      protein: 44,
      carbs: 62,
      fat: 22,
      fits: true,
      rationale: 'Solid choice, slightly higher fat content from sauce.',
    },
    {
      rank: '🥉 High Calorie',
      name: 'Double Cheese Burger & Seasoned Fries',
      calories: 980,
      protein: 38,
      carbs: 95,
      fat: 46,
      fits: false,
      rationale: 'High in saturated fats. Will use 88% of your remaining daily calorie allowance.',
    },
  ]

  const handleSelectOption = (c: typeof choices[0]) => {
    addMealFood(3, {
      name: `🍽️ (Restaurant) ${c.name}`,
      portion: '1 restaurant meal',
      calories: c.calories,
      protein: c.protein,
      carbs: c.carbs,
      fat: c.fat,
    })
    setModalOpen('restaurant', false)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          className="relative w-full max-w-2xl rounded-3xl p-6 space-y-5 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(12,18,34,0.98) 0%, rgba(8,12,24,0.98) 100%)',
            border: '1px solid rgba(255,179,0,0.3)',
            boxShadow: '0 0 50px rgba(255,179,0,0.1)',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Restaurant Mode (&quot;I&apos;m Eating Outside&quot;)
                </h2>
                <p className="text-slate-400 text-xs">Analyze restaurant menus & match remaining targets ({remCal} kcal left)</p>
              </div>
            </div>

            <button
              onClick={() => setModalOpen('restaurant', false)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search menu */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search restaurant menu or dish..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Options List */}
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {choices.map((c, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border space-y-3 transition-all ${
                  c.fits ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-rose-500/5 border-rose-500/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">{c.rank}</span>
                  {c.fits ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      ✓ Fits Target
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> High Surplus Risk
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-white text-sm font-bold">{c.name}</h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    <span className="text-white font-bold tabular-nums">{c.calories} kcal</span> •{' '}
                    <span className="text-amber-400 font-semibold">{c.protein}g protein</span> •{' '}
                    <span className="text-purple-400 font-semibold">{c.carbs}g carbs</span> •{' '}
                    <span className="text-pink-400 font-semibold">{c.fat}g fat</span>
                  </p>
                </div>

                <p className="text-slate-300 text-xs bg-white/[0.03] p-2.5 rounded-xl border border-white/[0.05]">
                  💡 {c.rationale}
                </p>

                <button
                  onClick={() => handleSelectOption(c)}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 flex items-center justify-center gap-1.5 transition-all"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Select & Log Meal</span>
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
