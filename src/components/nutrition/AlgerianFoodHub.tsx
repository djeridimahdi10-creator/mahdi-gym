'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Plus, Sparkles, Search, CheckCircle2 } from 'lucide-react'
import { ALGERIAN_FOODS, AlgerianFoodItem } from '@/lib/algerianFoods'
import { useNutritionStore } from '@/stores/nutritionStore'

export function AlgerianFoodHub() {
  const { addMealFood } = useNutritionStore()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [addedItem, setAddedItem] = useState<string | null>(null)

  const categories = [
    { id: 'all', label: 'All Dishes' },
    { id: 'main', label: 'Main Courses' },
    { id: 'soup', label: 'Soups & Chorba' },
    { id: 'side', label: 'Street Food & Sides' },
    { id: 'bread', label: 'Artisanal Breads' },
    { id: 'pastry', label: 'Pastries' },
  ]

  const filtered = ALGERIAN_FOODS.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameAr.includes(searchQuery)
    return matchesCat && matchesQuery
  })

  const handleLogDish = (item: AlgerianFoodItem) => {
    addMealFood(2, {
      name: `🇩🇿 ${item.name}`,
      portion: item.servingSize,
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fat: item.fat,
    })
    setAddedItem(item.id)
    setTimeout(() => setAddedItem(null), 1500)
  }

  return (
    <div
      id="algerian-food-hub"
      className="rounded-[2rem] p-8 space-y-6 scroll-mt-28"
      style={{
        background: 'linear-gradient(135deg, rgba(16,185,129,0.07) 0%, rgba(17,23,36,0.96) 100%)',
        border: '1px solid rgba(16,185,129,0.28)',
        boxShadow: '0 6px 30px rgba(0,0,0,0.25)',
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30 text-2xl">
            🇩🇿
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-white font-bold text-2xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Algerian Food Intelligence
              </h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                Authentic Macro DB
              </span>
            </div>
            <p className="text-slate-400 text-sm">Traditional Algerian dishes mapped to exact nutritional macros</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Couscous, Rechta..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === c.id
                ? 'bg-emerald-500 text-black font-bold'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Dish Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[480px] overflow-y-auto pr-1">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-emerald-500/30 transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-white text-sm font-bold leading-snug">{item.name}</h3>
                  <p className="text-emerald-400 text-xs font-arabic mt-0.5">{item.nameAr}</p>
                </div>
                <span className="text-2xl flex-shrink-0">{item.imageEmoji}</span>
              </div>
              <p className="text-slate-400 text-[11px] mt-1.5 leading-normal line-clamp-2">{item.description}</p>
            </div>

            <div className="pt-2 border-t border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white font-bold tabular-nums">{item.calories} kcal</span>
                <span className="text-amber-400 font-semibold">{item.protein}g P</span>
                <span className="text-purple-400 font-semibold">{item.carbs}g C</span>
                <span className="text-pink-400 font-semibold">{item.fat}g F</span>
              </div>

              <button
                onClick={() => handleLogDish(item)}
                className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  addedItem === item.id
                    ? 'bg-emerald-500 text-black'
                    : 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30'
                }`}
              >
                {addedItem === item.id ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" /> Logged!
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" /> Log This Meal
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
