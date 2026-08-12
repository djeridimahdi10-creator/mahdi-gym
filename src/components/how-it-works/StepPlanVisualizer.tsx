'use client'

import React, { useState } from 'react'
import { Cpu, Sparkles, RefreshCw, Check, ArrowRight } from 'lucide-react'

const samplePlans = [
  {
    type: 'High Protein / Lean Muscle',
    meals: [
      { name: 'Oatmeal & Whey Protein', kcal: 450, p: 35, c: 55, f: 8, emoji: '🥣' },
      { name: 'Grilled Chicken & Rice', kcal: 650, p: 52, c: 68, f: 12, emoji: '🍗' },
      { name: 'Greek Yogurt & Berries', kcal: 280, p: 24, c: 22, f: 4, emoji: '🫐' },
      { name: 'Salmon & Sweet Potato', kcal: 580, p: 44, c: 45, f: 20, emoji: '🥩' },
    ],
  },
  {
    type: 'Low Carb / Fat Loss Focus',
    meals: [
      { name: 'Egg White Omelet & Avocado', kcal: 380, p: 32, c: 8, f: 22, emoji: '🍳' },
      { name: 'Tuna Salad & Olive Oil', kcal: 520, p: 48, c: 12, f: 26, emoji: '🥗' },
      { name: 'Almonds & Cottage Cheese', kcal: 260, p: 20, c: 6, f: 16, emoji: '🥜' },
      { name: 'Steak & Grilled Asparagus', kcal: 610, p: 54, c: 10, f: 34, emoji: '🥩' },
    ],
  },
]

export function StepPlanVisualizer() {
  const [activePlanIdx, setActivePlanIdx] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setActivePlanIdx((prev) => (prev === 0 ? 1 : 0))
      setIsGenerating(false)
    }, 800)
  }

  const currentPlan = samplePlans[activePlanIdx]
  const totalKcal = currentPlan.meals.reduce((acc, m) => acc + m.kcal, 0)
  const totalProtein = currentPlan.meals.reduce((acc, m) => acc + m.p, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-ai-500/20 flex items-center justify-center text-ai-300">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">AI Plan Generator</h4>
            <p className="text-xs text-dark-400">Customized macro-balanced meals</p>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-3 py-1.5 rounded-xl bg-ai-500/20 border border-ai-400/30 text-xs font-semibold text-ai-300 hover:bg-ai-500/30 transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'AI Thinking...' : 'Regenerate'}
        </button>
      </div>

      {/* Plan Title Badge */}
      <div className="flex items-center justify-between bg-dark-800/60 p-3 rounded-xl border border-white/5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-ai-400" />
          <span className="text-xs font-bold text-white">{currentPlan.type}</span>
        </div>
        <span className="text-xs text-ai-300 font-semibold">{totalKcal} kcal / {totalProtein}g Protein</span>
      </div>

      {/* Generated Meal List */}
      <div className="space-y-2.5">
        {currentPlan.meals.map((meal, idx) => (
          <div
            key={meal.name}
            className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
              isGenerating
                ? 'opacity-40 blur-xs'
                : 'bg-dark-800/40 border-white/5 hover:border-ai-400/30 hover:bg-dark-800/80'
            }`}
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl bg-dark-900/80 p-2 rounded-xl border border-white/5">{meal.emoji}</span>
              <div>
                <div className="text-xs font-semibold text-white">{meal.name}</div>
                <div className="text-[11px] text-dark-400">
                  {meal.kcal} kcal • {meal.p}g P • {meal.c}g C • {meal.f}g F
                </div>
              </div>
            </div>

            <div className="w-6 h-6 rounded-full bg-primary-500/10 border border-primary-400/20 flex items-center justify-center text-primary-300">
              <Check className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* AI Processing Status */}
      <div className="bg-gradient-to-r from-ai-500/10 via-primary-500/10 to-transparent p-3 rounded-xl border border-ai-400/20 flex items-center justify-between text-xs">
        <span className="text-dark-300">AI Recipe Engine matched target micronutrients</span>
        <span className="text-ai-300 font-bold flex items-center gap-1">
          100% Match <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  )
}
