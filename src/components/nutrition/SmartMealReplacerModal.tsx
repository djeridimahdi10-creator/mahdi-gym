'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, RefreshCw, CheckCircle2, ArrowRight, Zap, Flame, Sparkles } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { Meal } from '@/components/nutrition'

interface FilterOption {
  id: string
  label: string
  icon: string
}

const FILTERS: FilterOption[] = [
  { id: 'protein', label: 'Higher Protein', icon: '⚡' },
  { id: 'calories', label: 'Lower Calories', icon: '🔥' },
  { id: 'quick', label: 'Quick (<15 min)', icon: '⏱️' },
  { id: 'budget', label: 'Budget Friendly', icon: '💵' },
  { id: 'algerian', label: 'Algerian Local 🇩🇿', icon: '🍲' },
  { id: 'veggie', label: 'Vegetarian', icon: '🥗' },
]

export function SmartMealReplacerModal() {
  const { replaceMealIndex, setModalOpen, replaceMeal, meals } = useNutritionStore()
  const [activeFilter, setActiveFilter] = useState('protein')

  if (replaceMealIndex === null) return null

  const currentMeal = meals[replaceMealIndex] || meals[2]

  const alternatives: { title: string; calories: number; protein: number; carbs: number; fat: number; time: string; rationale: string; meal: Meal }[] = [
    {
      title: '🍗 Grilled Turkey Breast & Quinoa Bowl',
      calories: 790,
      protein: 58,
      carbs: 65,
      fat: 14,
      time: '18 min',
      rationale: '+8g higher protein than original with 60 fewer calories.',
      meal: {
        type: currentMeal?.type || 'dinner',
        time: currentMeal?.time || '7:00 PM',
        totalCalories: 790,
        foods: [
          { name: 'Lean Turkey Breast', portion: '220g', calories: 340, protein: 48, carbs: 0, fat: 4 },
          { name: 'Cooked Quinoa', portion: '180g', calories: 220, protein: 8, carbs: 40, fat: 4 },
          { name: 'Steamed Zucchini & Peppers', portion: '150g', calories: 75, protein: 2, carbs: 15, fat: 1 },
          { name: 'Avocado slice', portion: '40g', calories: 65, protein: 1, carbs: 3, fat: 6 },
        ],
      },
    },
    {
      title: '🇩🇿 Authentic Rechta with Chicken Breast',
      calories: 620,
      protein: 42,
      carbs: 82,
      fat: 15,
      time: '25 min',
      rationale: 'Local traditional dish high in complex semolina carbs and clean chicken protein.',
      meal: {
        type: currentMeal?.type || 'dinner',
        time: currentMeal?.time || '7:00 PM',
        totalCalories: 620,
        foods: [
          { name: 'Steamed Rechta Noodles', portion: '250g', calories: 380, protein: 12, carbs: 75, fat: 4 },
          { name: 'Skinless Chicken Breast', portion: '180g', calories: 210, protein: 30, carbs: 0, fat: 4 },
          { name: 'Turnips & Chickpeas', portion: '100g', calories: 30, protein: 2, carbs: 7, fat: 1 },
        ],
      },
    },
    {
      title: '🐟 Seared Tuna Steak with Sweet Potato',
      calories: 690,
      protein: 52,
      carbs: 55,
      fat: 16,
      time: '12 min',
      rationale: 'Quick 12-minute prep rich in Omega-3 fatty acids and lean protein.',
      meal: {
        type: currentMeal?.type || 'dinner',
        time: currentMeal?.time || '7:00 PM',
        totalCalories: 690,
        foods: [
          { name: 'Yellowfin Tuna Steak', portion: '200g', calories: 260, protein: 46, carbs: 0, fat: 6 },
          { name: 'Roasted Sweet Potato Cubes', portion: '200g', calories: 170, protein: 3, carbs: 40, fat: 1 },
          { name: 'Steamed Green Beans', portion: '150g', calories: 50, protein: 3, carbs: 10, fat: 1 },
          { name: 'Sesame Dressing', portion: '15ml', calories: 110, protein: 0, carbs: 2, fat: 10 },
        ],
      },
    },
  ]

  const handleSelectReplacer = (newMeal: Meal) => {
    replaceMeal(replaceMealIndex, newMeal)
    setModalOpen('replace', false)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          className="relative w-full max-w-2xl rounded-3xl p-6 space-y-5 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(12,18,34,0.98) 0%, rgba(8,12,24,0.98) 100%)',
            border: '1px solid rgba(0,240,255,0.25)',
            boxShadow: '0 0 50px rgba(0,240,255,0.08)',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#00F0FF]/15 text-[#00F0FF] flex items-center justify-center border border-[#00F0FF]/30">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Smart Meal Replacer
                </h2>
                <p className="text-slate-400 text-xs">Finding alternatives for &quot;{currentMeal?.type}&quot; target</p>
              </div>
            </div>

            <button
              onClick={() => setModalOpen('replace', false)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Current vs Target Comparison Header */}
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-between text-xs">
            <span className="text-slate-400">Original Target:</span>
            <span className="text-white font-bold">{currentMeal?.totalCalories || 850} kcal</span>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeFilter === f.id
                    ? 'bg-[#00F0FF] text-black font-bold'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                <span>{f.icon}</span>
                <span>{f.label}</span>
              </button>
            ))}
          </div>

          {/* Alternatives List */}
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {alternatives.map((alt, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl space-y-3 bg-white/[0.02] border border-white/[0.08] hover:border-[#00F0FF]/30 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-white text-sm font-bold">{alt.title}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-slate-300 self-start sm:self-auto">
                    {alt.time}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-white font-bold tabular-nums">{alt.calories} kcal</span>
                  <span className="text-amber-400 font-semibold">{alt.protein}g protein</span>
                  <span className="text-purple-400 font-semibold">{alt.carbs}g carbs</span>
                  <span className="text-pink-400 font-semibold">{alt.fat}g fat</span>
                </div>

                <p className="text-[#00F0FF] text-[11px] font-medium bg-[#00F0FF]/5 p-2 rounded-xl border border-[#00F0FF]/15">
                  💡 {alt.rationale}
                </p>

                <button
                  onClick={() => handleSelectReplacer(alt.meal)}
                  className="w-full py-2 rounded-xl text-xs font-bold bg-[#00F0FF]/15 hover:bg-[#00F0FF]/25 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center gap-1.5 transition-all"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Choose This Replacement</span>
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
