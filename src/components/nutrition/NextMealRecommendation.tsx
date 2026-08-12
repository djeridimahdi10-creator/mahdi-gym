'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Utensils, RefreshCw, CheckCircle2, ChevronRight, HelpCircle, DollarSign, Globe } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { ALGERIAN_FOODS } from '@/lib/algerianFoods'

export function NextMealRecommendation() {
  const {
    dailyCalories,
    targetMacros,
    meals,
    foodBudget,
    algerianFoodPreferred,
    addMealFood,
    setModalOpen,
  } = useNutritionStore()

  const [loading, setLoading] = useState(false)

  // Compute remaining macros
  const eatenMeals = meals.filter((m) => m.eaten)
  const eatenCalories = eatenMeals.reduce((sum, m) => sum + m.totalCalories, 0)
  const eatenProtein = eatenMeals.reduce(
    (sum, m) =>
      sum +
      m.foods.reduce((acc, f) => acc + (f.protein || Math.round((f.calories * 0.28) / 4)), 0),
    0
  )
  const eatenCarbs = eatenMeals.reduce(
    (sum, m) =>
      sum +
      m.foods.reduce((acc, f) => acc + (f.carbs || Math.round((f.calories * 0.42) / 4)), 0),
    0
  )

  const remCalories = Math.max(0, dailyCalories - eatenCalories)
  const remProtein = Math.max(0, targetMacros.protein - eatenProtein)
  const remCarbs = Math.max(0, targetMacros.carbs - eatenCarbs)

  // Select recommended meal
  const isAlgerian = algerianFoodPreferred
  const selectedAlgerian = ALGERIAN_FOODS[1] // Rechta or Chicken Bowl

  const recommendedMeal = isAlgerian
    ? {
        name: selectedAlgerian.name,
        nameAr: selectedAlgerian.nameAr,
        calories: selectedAlgerian.calories,
        protein: selectedAlgerian.protein,
        carbs: selectedAlgerian.carbs,
        fat: selectedAlgerian.fat,
        emoji: selectedAlgerian.imageEmoji,
        rationale: `You need ${remProtein}g more protein today. This authentic dish delivers high-quality protein (${selectedAlgerian.protein}g) and slow-digesting carb energy.`,
      }
    : {
        name: '🍗 Grilled Chicken & Brown Rice Bowl',
        nameAr: '',
        calories: 720,
        protein: 48,
        carbs: 82,
        fat: 18,
        emoji: '🍱',
        rationale: `You are behind your protein pace by ${remProtein}g. This meal provides 48g of fast-absorbing protein and 82g of clean glycogen carbs.`,
      }

  const handleEatThis = () => {
    // Find next uneaten meal index or default to 2 (snack/dinner)
    const nextIndex = meals.findIndex((m) => !m.eaten)
    const targetIdx = nextIndex !== -1 ? nextIndex : 2

    addMealFood(targetIdx, {
      name: recommendedMeal.name,
      portion: '1 full serving',
      calories: recommendedMeal.calories,
      protein: recommendedMeal.protein,
      carbs: recommendedMeal.carbs,
      fat: recommendedMeal.fat,
    })
  }

  return (
    <motion.div
      id="next-meal"
      className="relative rounded-[2rem] p-8 sm:p-10 overflow-hidden scroll-mt-28"
      style={{
        background: 'linear-gradient(135deg, rgba(168,85,247,0.07) 0%, rgba(17,23,36,0.95) 50%, rgba(0,240,255,0.07) 100%)',
        border: '1px solid rgba(168,85,247,0.28)',
        boxShadow: '0 0 45px rgba(168,85,247,0.05)',
      }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-live flex items-center gap-1.5 px-3.5 py-1 rounded-full text-sm font-bold bg-purple-500/10 text-purple-300 border border-purple-500/25">
              <Sparkles className="w-4 h-4" />
              <span>AI Engine</span>
            </span>
            <span className="text-sm text-slate-400 font-mono">
              Remaining Budget: <strong className="text-white font-bold">{remCalories} kcal</strong>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            What should I eat next?
          </h2>
        </div>

        {/* Toggles Strip */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => useNutritionStore.getState().setAlgerianPreferred(!algerianFoodPreferred)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              algerianFoodPreferred
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-white/5 text-slate-400 border border-white/10'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>🇩🇿 Algerian Food</span>
          </button>
        </div>
      </div>

      {/* Main Meal Card */}
      <div
        className="rounded-2xl p-5 space-y-4"
        style={{ background: 'rgba(11,15,25,0.85)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-3xl flex-shrink-0">
              {recommendedMeal.emoji}
            </div>
            <div>
              <h3 className="text-white text-base sm:text-lg font-bold">{recommendedMeal.name}</h3>
              {recommendedMeal.nameAr && <p className="text-emerald-400 text-xs font-arabic">{recommendedMeal.nameAr}</p>}
              <p className="text-slate-400 text-xs mt-0.5">
                <span className="text-white font-bold tabular-nums">{recommendedMeal.calories} kcal</span> •{' '}
                <span className="text-amber-400 font-bold">{recommendedMeal.protein}g protein</span> •{' '}
                <span className="text-purple-400 font-bold">{recommendedMeal.carbs}g carbs</span> •{' '}
                <span className="text-pink-400 font-bold">{recommendedMeal.fat}g fat</span>
              </p>
            </div>
          </div>
        </div>

        {/* Why this meal */}
        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">Why this recommendation?</strong>
            <p className="text-slate-300 text-xs mt-0.5 leading-relaxed">{recommendedMeal.rationale}</p>
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          <motion.button
            onClick={handleEatThis}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 text-black flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Eat This (Log Now)</span>
          </motion.button>

          <motion.button
            onClick={() => setModalOpen('replace', true, 2)}
            className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-white/5 border border-white/10 text-white hover:bg-white/10 flex items-center gap-2 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>Replace Meal</span>
          </motion.button>

          <motion.button
            onClick={() => setModalOpen('askdata', true)}
            className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-purple-500/15 border border-purple-500/30 text-purple-300 hover:bg-purple-500/25 flex items-center gap-2 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
