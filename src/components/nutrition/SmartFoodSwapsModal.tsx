'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Zap, RefreshCw, CheckCircle2 } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'

export function SmartFoodSwapsModal() {
  const { swapMealIndex, setModalOpen, meals } = useNutritionStore()

  if (swapMealIndex === null) return null

  const meal = meals[swapMealIndex] || meals[0]

  const swapItems = [
    {
      current: 'White Bread Slices (80g)',
      currentCal: 210,
      alternatives: [
        { name: '🥖 Whole Grain Artisan Bread', delta: '+4.5g Fiber', deltaColor: '#10b981', calories: 180, protein: 7, carbs: 32 },
        { name: '🥔 Roasted Sweet Potato Slices', delta: '-45 Calories', deltaColor: '#00F0FF', calories: 140, protein: 3, carbs: 30 },
        { name: '🍚 Brown Jasmine Rice', delta: '+ Slow Carbs', deltaColor: '#a855f7', calories: 165, protein: 4, carbs: 35 },
      ],
    },
    {
      current: 'Full Fat Mayonnaise (20g)',
      currentCal: 140,
      alternatives: [
        { name: '🥑 Mashed Fresh Avocado', delta: '+ Healthy Fats', deltaColor: '#10b981', calories: 80, protein: 1, carbs: 4 },
        { name: '🥛 Greek Yogurt Garlic Dip', delta: '+8g Protein', deltaColor: '#FFB300', calories: 45, protein: 8, carbs: 3 },
      ],
    },
  ]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          className="relative w-full max-w-xl rounded-3xl p-6 space-y-5 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(12,18,34,0.98) 0%, rgba(8,12,24,0.98) 100%)',
            border: '1px solid rgba(16,185,129,0.3)',
            boxShadow: '0 0 50px rgba(16,185,129,0.1)',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Smart Food Swaps
                </h2>
                <p className="text-slate-400 text-xs">Improve meal quality & nutrient density for &quot;{meal?.type}&quot;</p>
              </div>
            </div>

            <button
              onClick={() => setModalOpen('swap', false)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Swap Options List */}
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
            {swapItems.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Current Item:</span>
                  <span className="text-rose-400 font-bold">{item.current} ({item.currentCal} kcal)</span>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Recommended Smart Swaps</p>
                  {item.alternatives.map((alt, aIdx) => (
                    <div
                      key={aIdx}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-all flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold">{alt.name}</span>
                          <span
                            className="text-[10px] font-bold px-1.5 py-0.2 rounded"
                            style={{ background: `${alt.deltaColor}15`, color: alt.deltaColor }}
                          >
                            {alt.delta}
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px] mt-0.5">
                          {alt.calories} kcal • {alt.protein}g P • {alt.carbs}g C
                        </p>
                      </div>

                      <button
                        onClick={() => setModalOpen('swap', false)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30 text-[11px] font-bold transition-all"
                      >
                        Swap
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
