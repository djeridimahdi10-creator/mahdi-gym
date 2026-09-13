'use client'

import React, { useState } from 'react'
import {
  Plus,
  Check,
  Zap,
  Sparkles,
  X,
  Apple,
  Utensils,
  ChevronRight,
} from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'

interface QuickPreset {
  name: string
  portion: string
  calories: number
  protein: number
  carbs: number
  fat: number
  emoji: string
  category: 'snack' | 'protein' | 'breakfast' | 'meal'
}

const PRESET_FOODS: QuickPreset[] = [
  { name: 'Whey Protein Shake', portion: '1 scoop (30g)', calories: 120, protein: 24, carbs: 3, fat: 1, emoji: '🥛', category: 'protein' },
  { name: '2 Hard-Boiled Eggs', portion: '2 large (100g)', calories: 155, protein: 13, carbs: 1, fat: 11, emoji: '🥚', category: 'breakfast' },
  { name: 'Greek Yogurt 0%', portion: '1 cup (170g)', calories: 100, protein: 18, carbs: 6, fat: 0, emoji: '🥣', category: 'breakfast' },
  { name: 'Grilled Chicken Fillet', portion: '150g cooked', calories: 250, protein: 46, carbs: 0, fat: 5, emoji: '🍗', category: 'meal' },
  { name: 'White / Brown Rice', portion: '1 cup (150g)', calories: 195, protein: 4, carbs: 42, fat: 1, emoji: '🍚', category: 'meal' },
  { name: 'Ripe Banana', portion: '1 medium', calories: 95, protein: 1, carbs: 24, fat: 0, emoji: '🍌', category: 'snack' },
  { name: 'Handful Roasted Almonds', portion: '30g', calories: 180, protein: 6, carbs: 6, fat: 15, emoji: '🥜', category: 'snack' },
  { name: 'Tuna Salad w/ Olive Oil', portion: '140g can', calories: 210, protein: 30, carbs: 2, fat: 9, emoji: '🥗', category: 'meal' },
]

interface InteractiveQuickLoggerProps {
  isOpen: boolean
  onClose: () => void
}

export function InteractiveQuickLogger({ isOpen, onClose }: InteractiveQuickLoggerProps) {
  const { addMealFood, meals } = useNutritionStore()

  const [selectedMealIndex, setSelectedMealIndex] = useState(0) // 0: breakfast, 1: lunch, 2: snack, 3: dinner
  const [customName, setCustomName] = useState('')
  const [customPortion, setCustomPortion] = useState('')
  const [customCalories, setCustomCalories] = useState('')
  const [customProtein, setCustomProtein] = useState('')
  const [justAddedName, setJustAddedName] = useState<string | null>(null)

  if (!isOpen) return null

  const handleAddPreset = (preset: QuickPreset) => {
    addMealFood(selectedMealIndex, {
      name: preset.name,
      portion: preset.portion,
      calories: preset.calories,
      protein: preset.protein,
      carbs: preset.carbs,
      fat: preset.fat,
    })
    setJustAddedName(preset.name)
    setTimeout(() => setJustAddedName(null), 2200)
  }

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customName.trim()) return

    const cals = parseInt(customCalories, 10) || 150
    const prot = parseInt(customProtein, 10) || 10

    addMealFood(selectedMealIndex, {
      name: customName.trim(),
      portion: customPortion.trim() || '1 serving',
      calories: cals,
      protein: prot,
      carbs: Math.round(cals * 0.1),
      fat: Math.round(cals * 0.03),
    })

    setJustAddedName(customName.trim())
    setCustomName('')
    setCustomPortion('')
    setCustomCalories('')
    setCustomProtein('')
    setTimeout(() => setJustAddedName(null), 2200)
  }

  const mealOptions = meals.map((m, idx) => ({
    index: idx,
    label: m.type.charAt(0).toUpperCase() + m.type.slice(1),
  }))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-2xl rounded-3xl p-5 sm:p-7 relative overflow-hidden flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
        style={{
          background: 'linear-gradient(175deg, rgba(15, 23, 42, 0.98) 0%, rgba(8, 14, 28, 0.99) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 24px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(16, 185, 129, 0.15)',
        }}
      >
        {/* Top Accent Line */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg, #10b981 0%, #06b6d4 50%, #a855f7 100%)' }}
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Quick Food Logger
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Log with 1 click or enter custom macros
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Just Added Success Banner */}
        {justAddedName && (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-scale-in">
            <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
            <span>Added “{justAddedName}” to your daily log!</span>
          </div>
        )}

        {/* Target Meal Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Target Meal Slot:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {mealOptions.map((opt) => (
              <button
                key={opt.index}
                type="button"
                onClick={() => setSelectedMealIndex(opt.index)}
                className={`py-2 px-3 rounded-xl text-xs font-black transition-all ${
                  selectedMealIndex === opt.index
                    ? 'bg-emerald-500 text-white shadow-[0_2px_14px_rgba(16,185,129,0.4)] border border-emerald-400'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 1-Click Fast Presets */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              1-Click Smart Presets
            </span>
            <span className="text-[11px] text-slate-400 font-medium">Click to instantly log</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {PRESET_FOODS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleAddPreset(preset)}
                className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.07] hover:border-emerald-500/40 text-left transition-all duration-200 group flex flex-col justify-between hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">{preset.emoji}</span>
                  <div className="w-5 h-5 rounded-full bg-white/[0.06] group-hover:bg-emerald-500 group-hover:text-white text-slate-400 flex items-center justify-center transition-colors">
                    <Plus className="w-3 h-3" />
                  </div>
                </div>
                <p className="text-xs font-bold text-white leading-tight line-clamp-1">
                  {preset.name}
                </p>
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mt-1">
                  <span className="text-orange-400">{preset.calories} kcal</span>
                  <span className="text-purple-300">{preset.protein}g P</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Food Form */}
        <form onSubmit={handleAddCustom} className="space-y-3 pt-2 border-t border-white/[0.08]">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
            <Utensils className="w-3.5 h-3.5 text-cyan-400" />
            Or Enter Custom Food Item
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            <input
              type="text"
              placeholder="Food name (e.g. Oatmeal Bowl)"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="sm:col-span-2 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs font-medium text-white placeholder:text-slate-500 outline-none focus:border-emerald-500"
            />
            <input
              type="number"
              placeholder="Calories (kcal)"
              value={customCalories}
              onChange={(e) => setCustomCalories(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs font-medium text-white placeholder:text-slate-500 outline-none focus:border-emerald-500"
            />
            <input
              type="number"
              placeholder="Protein (g)"
              value={customProtein}
              onChange={(e) => setCustomProtein(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs font-medium text-white placeholder:text-slate-500 outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={!customName.trim()}
            className="w-full py-3 rounded-xl text-xs font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              boxShadow: '0 4px 18px rgba(16,185,129,0.3)',
            }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Food to {mealOptions[selectedMealIndex]?.label}</span>
          </button>
        </form>
      </div>
    </div>
  )
}
