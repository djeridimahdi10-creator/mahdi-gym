'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Plus,
  Flame,
  Zap,
  Activity,
  Target,
  Check,
  Sparkles,
  Utensils,
  ChevronRight,
  BookOpen,
  Loader2,
  Globe,
} from 'lucide-react'
import { getCombinedFoodDatabase, fetchFoodWithAI, FoodItem } from '@/lib/foodDatabase'
import { useNutritionStore } from '@/stores/nutritionStore'

interface FoodLibraryLoggerProps {
  onFoodAdded?: () => void
  isModal?: boolean
}

const CATEGORIES = [
  { id: 'all', label: 'All Foods', icon: '🌟' },
  { id: 'carbs', label: 'Carbs & Grains', icon: '🌾' },
  { id: 'protein', label: 'Proteins', icon: '🥩' },
  { id: 'fat', label: 'Healthy Fats', icon: '🥑' },
  { id: 'veg_fruit', label: 'Veggies & Fruit', icon: '🥦' },
  { id: 'algerian', label: 'Algerian Dishes', icon: '🇩🇿' },
]

const MEALS = [
  { index: 0, id: 'breakfast', label: 'Breakfast', emoji: '🌅', color: '#FFB300' },
  { index: 1, id: 'lunch', label: 'Lunch', emoji: '☀️', color: '#00F0FF' },
  { index: 2, id: 'snack', label: 'Snack', emoji: '🍎', color: '#10b981' },
  { index: 3, id: 'dinner', label: 'Dinner', emoji: '🌙', color: '#A855F7' },
]

export function FoodLibraryLogger({ onFoodAdded, isModal = false }: FoodLibraryLoggerProps) {
  const { addMealFood, meals } = useNutritionStore()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [dbVersion, setDbVersion] = useState<number>(0) // trigger re-render when AI adds to cache
  const [isAILoading, setIsAILoading] = useState<boolean>(false)

  // Get full combined food list (curated + AI cached)
  const fullDatabase = useMemo(() => getCombinedFoodDatabase(), [dbVersion])

  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(fullDatabase[0] || null)
  const [grams, setGrams] = useState<number>(150)
  const [selectedMealIndex, setSelectedMealIndex] = useState<number>(1) // Default to Lunch
  const [addedToast, setAddedToast] = useState<string | null>(null)

  // Filter foods by search query and category
  const filteredFoods = useMemo(() => {
    return fullDatabase.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        (item.nameAr && item.nameAr.includes(query)) ||
        item.category.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [fullDatabase, searchQuery, selectedCategory])

  // Perform AI Nutrition Lookup for any custom food query
  const handleAILookup = async (queryToSearch?: string) => {
    const q = (queryToSearch || searchQuery).trim()
    if (!q) return

    setIsAILoading(true)
    try {
      const aiFood = await fetchFoodWithAI(q)
      setDbVersion((v) => v + 1)
      setSelectedFood(aiFood)
      setGrams(aiFood.defaultGrams || 150)
      setSearchQuery('') // Clear search query after loading
    } catch (err) {
      console.error('AI Lookup error:', err)
    } finally {
      setIsAILoading(false)
    }
  }

  // Select food and preset default grams
  const handleSelectFood = (food: FoodItem) => {
    setSelectedFood(food)
    setGrams(food.defaultGrams)
  }

  // Calculate live dynamic macros based on chosen portion
  const computedNutrition = useMemo(() => {
    if (!selectedFood) return { calories: 0, protein: 0, carbs: 0, fat: 0 }
    const ratio = Math.max(1, grams) / 100
    return {
      calories: Math.round(selectedFood.caloriesPer100g * ratio),
      protein: Math.round(selectedFood.proteinPer100g * ratio * 10) / 10,
      carbs: Math.round(selectedFood.carbsPer100g * ratio * 10) / 10,
      fat: Math.round(selectedFood.fatPer100g * ratio * 10) / 10,
    }
  }, [selectedFood, grams])

  const handleAddFood = () => {
    if (!selectedFood) return

    const targetMeal = meals[selectedMealIndex] || meals[0]
    const mealLabel = targetMeal?.type ? targetMeal.type.toUpperCase() : 'MEAL'

    addMealFood(selectedMealIndex, {
      name: selectedFood.name,
      portion: `${grams}g`,
      calories: computedNutrition.calories,
      protein: computedNutrition.protein,
      carbs: computedNutrition.carbs,
      fat: computedNutrition.fat,
    })

    setAddedToast(`Added ${grams}g ${selectedFood.name} (${computedNutrition.calories} kcal) to ${mealLabel}! 🚀`)

    setTimeout(() => {
      setAddedToast(null)
    }, 4000)

    if (onFoodAdded) {
      onFoodAdded()
    }
  }

  return (
    <div className="space-y-6">
      {/* ── Toast Notification ── */}
      <AnimatePresence>
        {addedToast && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm flex items-center justify-between shadow-xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/30 flex items-center justify-center text-white">
                <Check className="w-5 h-5" />
              </div>
              <span>{addedToast}</span>
            </div>
            <span className="text-xs text-emerald-400/80 font-medium">Updated live in timeline</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ── LEFT: Food Library & AI Search (7 Cols) ── */}
        <div className="lg:col-span-7 space-y-4">
          {/* Header & Search */}
          <div className="rounded-3xl p-5 sm:p-6 space-y-4" style={{ background: 'rgba(17,23,36,0.95)', border: '1px solid rgba(0,240,255,0.18)' }}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-[#00F0FF]"
                  style={{ background: 'rgba(0,240,255,0.12)', border: '1px solid rgba(0,240,255,0.25)' }}
                >
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white text-lg font-bold tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      Universal Food Library &amp; AI Search
                    </h3>
                    <span className="badge-live text-[10px] px-2 py-0.5 rounded-full bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 animate-pulse" /> AI Powered
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">Search any food or dish in the world — AI analyzes exact calories &amp; macros per 100g.</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20 hidden sm:inline-block">
                {filteredFoods.length} Available
              </span>
            </div>

            {/* Instant Search Bar + AI Submit */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (searchQuery) handleAILookup()
              }}
              className="relative flex items-center gap-2"
            >
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search any food (e.g. Shawarma, Sushi, Tacos, Brik, Protein Bar, Rice...)"
                  className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm font-medium focus:outline-none focus:border-[#00F0FF] transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-white px-1.5 py-0.5 bg-white/10 rounded-md"
                  >
                    ✕
                  </button>
                )}
              </div>

              {searchQuery && (
                <button
                  type="submit"
                  disabled={isAILoading}
                  className="px-4 py-3.5 rounded-2xl bg-[#00F0FF] text-black font-extrabold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#00F0FF]/90 transition-all flex-shrink-0 disabled:opacity-50"
                >
                  {isAILoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">AI Lookup</span>
                </button>
              )}
            </form>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${selectedCategory === cat.id
                      ? 'bg-[#00F0FF] text-black font-extrabold shadow-lg shadow-[#00F0FF]/20'
                      : 'bg-white/[0.04] text-slate-400 hover:text-slate-200 hover:bg-white/[0.08] border border-white/5'
                    }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── AI Search Trigger Banner ── */}
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => handleAILookup()}
              className="p-4 rounded-2xl cursor-pointer flex items-center justify-between gap-4 transition-all"
              style={{
                background: 'linear-gradient(135deg, rgba(0,240,255,0.12) 0%, rgba(168,85,247,0.12) 100%)',
                border: '1px solid rgba(0,240,255,0.3)',
                boxShadow: '0 0 20px rgba(0,240,255,0.06)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/20 text-[#00F0FF] flex items-center justify-center font-bold flex-shrink-0">
                  {isAILoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-white text-sm font-bold flex items-center gap-2">
                    <span>Ask AI Web Engine to analyze &quot;{searchQuery}&quot;</span>
                  </p>
                  <p className="text-slate-300 text-xs mt-0.5">
                    {isAILoading ? 'AI is parsing web nutrition data...' : 'Extracts exact calories, protein, carbs & fat per 100g instantly.'}
                  </p>
                </div>
              </div>
              <button className="px-3.5 py-2 rounded-xl bg-[#00F0FF] text-black font-extrabold text-xs flex-shrink-0 hover:bg-[#00F0FF]/90">
                {isAILoading ? 'Analyzing...' : 'Analyze with AI'}
              </button>
            </motion.div>
          )}

          {/* Food List Grid */}
          <div className="max-h-[420px] overflow-y-auto pr-1 space-y-2.5 custom-scrollbar">
            {filteredFoods.length === 0 && !isAILoading ? (
              <div className="rounded-3xl p-8 text-center bg-white/[0.02] border border-white/5 space-y-3">
                <Sparkles className="w-10 h-10 text-[#00F0FF] mx-auto animate-pulse" />
                <p className="text-slate-300 text-sm font-bold">No local preset matching &quot;{searchQuery}&quot;</p>
                <p className="text-slate-400 text-xs max-w-sm mx-auto">
                  Click the button below to let our AI Nutrition Engine calculate exact calories &amp; macros for &quot;{searchQuery}&quot;.
                </p>
                <button
                  onClick={() => handleAILookup()}
                  className="px-5 py-3 rounded-2xl bg-[#00F0FF] text-black font-extrabold text-xs inline-flex items-center gap-2 shadow-lg shadow-[#00F0FF]/20 hover:scale-105 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Analyze &quot;{searchQuery}&quot; with AI Now
                </button>
              </div>
            ) : (
              filteredFoods.map((food) => {
                const isSelected = selectedFood?.id === food.id
                const isAIGenerated = food.id.startsWith('ai-')
                return (
                  <motion.div
                    key={food.id}
                    onClick={() => handleSelectFood(food)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-2xl cursor-pointer flex items-center justify-between gap-4 transition-all ${isSelected
                        ? 'bg-[#00F0FF]/10 border-2 border-[#00F0FF] shadow-lg shadow-[#00F0FF]/10'
                        : 'bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06]'
                      }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-2xl flex-shrink-0 relative">
                        {food.emoji}
                        {isAIGenerated && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00F0FF] text-black flex items-center justify-center text-[9px] font-bold">
                            ✨
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-white text-sm font-bold truncate">{food.name}</p>
                          {food.nameAr && <span className="text-[11px] text-slate-400 truncate hidden sm:inline">({food.nameAr})</span>}
                          {isAIGenerated && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                              AI Analyzed
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400 text-xs mt-0.5">
                          Per 100g: <span className="text-[#00F0FF] font-semibold">{food.caloriesPer100g} kcal</span> ·{' '}
                          <span className="text-amber-400">P: {food.proteinPer100g}g</span> ·{' '}
                          <span className="text-purple-400">C: {food.carbsPer100g}g</span> ·{' '}
                          <span className="text-rose-400">F: {food.fatPer100g}g</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {isSelected ? (
                        <div className="w-8 h-8 rounded-full bg-[#00F0FF] text-black flex items-center justify-center font-bold">
                          <Check className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-white/5 text-slate-400 hover:text-white flex items-center justify-center">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })
            )}
          </div>
        </div>

        {/* ── RIGHT: Portion Calculator & Destination Meal (5 Cols) ── */}
        <div className="lg:col-span-5 space-y-5">
          {selectedFood ? (
            <motion.div
              key={selectedFood.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl p-6 space-y-6"
              style={{
                background: 'linear-gradient(145deg, rgba(6,11,24,0.98) 0%, rgba(12,18,36,0.95) 100%)',
                border: '1px solid rgba(0,240,255,0.28)',
                boxShadow: '0 0 35px rgba(0,240,255,0.06)',
              }}
            >
              {/* Selected Food Header */}
              <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                <div className="w-14 h-14 rounded-2xl bg-[#00F0FF]/15 border border-[#00F0FF]/30 flex items-center justify-center text-3xl flex-shrink-0">
                  {selectedFood.emoji}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-white text-xl font-bold tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {selectedFood.name}
                    </h4>
                  </div>
                  {selectedFood.nameAr && <p className="text-slate-400 text-xs">{selectedFood.nameAr}</p>}
                  <p className="text-slate-400 text-xs mt-1">
                    Base: <span className="text-white font-semibold">{selectedFood.caloriesPer100g} kcal</span> / 100g
                  </p>
                </div>
              </div>

              {/* Portion Input & Presets */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 text-xs font-bold uppercase tracking-wider">Select Portion Quantity (Grams)</label>
                  <span className="text-[#00F0FF] text-base font-extrabold tabular-nums">{grams}g</span>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="10"
                    max="1500"
                    value={grams}
                    onChange={(e) => setGrams(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-32 px-4 py-3 rounded-2xl bg-white/[0.06] border border-[#00F0FF]/40 text-white font-bold text-lg text-center focus:outline-none focus:border-[#00F0FF]"
                  />
                  <div className="flex-1 space-y-1">
                    <input
                      type="range"
                      min="20"
                      max="600"
                      step="10"
                      value={grams}
                      onChange={(e) => setGrams(parseInt(e.target.value))}
                      className="w-full accent-[#00F0FF] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-semibold px-0.5">
                      <span>20g</span>
                      <span>150g</span>
                      <span>300g</span>
                      <span>600g</span>
                    </div>
                  </div>
                </div>

                {/* Quick Preset Buttons */}
                <div className="grid grid-cols-5 gap-1.5 pt-1">
                  {[50, 100, 150, 200, 250].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setGrams(amt)}
                      className={`py-1.5 rounded-xl text-xs font-bold transition-all ${grams === amt
                          ? 'bg-[#00F0FF] text-black shadow-md'
                          : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                        }`}
                    >
                      {amt}g
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated Nutrition Summary */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Calculated Nutrition ({grams}g)</p>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/20">
                    <Flame className="w-4 h-4 text-[#00F0FF] mx-auto mb-1" />
                    <p className="text-white text-lg font-extrabold tabular-nums">{computedNutrition.calories}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Calories</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <Zap className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                    <p className="text-white text-base font-bold tabular-nums">{computedNutrition.protein}g</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Protein</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <Activity className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                    <p className="text-white text-base font-bold tabular-nums">{computedNutrition.carbs}g</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Carbs</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                    <Target className="w-4 h-4 text-rose-400 mx-auto mb-1" />
                    <p className="text-white text-base font-bold tabular-nums">{computedNutrition.fat}g</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Fat</p>
                  </div>
                </div>
              </div>

              {/* Destination Meal Selector */}
              <div className="space-y-2.5">
                <label className="text-slate-300 text-xs font-bold uppercase tracking-wider flex items-center justify-between">
                  <span>Add to Meal Slot</span>
                  <span className="text-slate-500 font-normal text-[11px]">Select target meal</span>
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {MEALS.map((meal) => {
                    const isSelectedMeal = selectedMealIndex === meal.index
                    return (
                      <button
                        key={meal.id}
                        onClick={() => setSelectedMealIndex(meal.index)}
                        className={`p-3 rounded-2xl flex items-center gap-2.5 text-left text-xs font-bold transition-all ${isSelectedMeal
                            ? 'bg-white/15 text-white border-2'
                            : 'bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] border border-white/5'
                          }`}
                        style={isSelectedMeal ? { borderColor: meal.color } : {}}
                      >
                        <span className="text-base">{meal.emoji}</span>
                        <span>{meal.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Add to Meal Action Button */}
              <motion.button
                onClick={handleAddFood}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="w-full py-4 rounded-2xl bg-[#00F0FF] text-black font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-[#00F0FF]/25"
              >
                <Plus className="w-5 h-5" />
                <span>
                  Add {grams}g {selectedFood.name} ({computedNutrition.calories} kcal)
                </span>
              </motion.button>
            </motion.div>
          ) : (
            <div className="rounded-3xl p-8 text-center bg-white/[0.03] border border-white/10 space-y-3">
              <Utensils className="w-10 h-10 text-slate-500 mx-auto" />
              <h4 className="text-white font-bold text-base">Select a food item</h4>
              <p className="text-slate-400 text-xs">Choose any item from the library or use AI search to calculate calories &amp; add it to your daily intake.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
