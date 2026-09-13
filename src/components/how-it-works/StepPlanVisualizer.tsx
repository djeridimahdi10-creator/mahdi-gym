'use client'

import React, { useState } from 'react'
import { Cpu, Sparkles, RefreshCw, Check, ArrowRight, ShoppingBag, Shuffle, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface MealItem {
  id: string
  slot: 'Breakfast' | 'Lunch' | 'Snack' | 'Dinner'
  name: string
  kcal: number
  p: number
  c: number
  f: number
  time: string
  emoji: string
}

interface PlanPreset {
  id: string
  tag: string
  name: string
  description: string
  targetKcal: number
  meals: MealItem[]
  groceries: string[]
}

const mealAlternatives: Record<string, MealItem[]> = {
  Breakfast: [
    { id: 'b1', slot: 'Breakfast', name: 'Oatmeal & Vanilla Whey with Blueberries', kcal: 460, p: 38, c: 54, f: 8, time: '5 min', emoji: '🥣' },
    { id: 'b2', slot: 'Breakfast', name: 'Eggs Shakshuka with Sourdough & Olive Oil', kcal: 440, p: 32, c: 38, f: 16, time: '12 min', emoji: '🍳' },
    { id: 'b3', slot: 'Breakfast', name: 'High-Protein Greek Yogurt Bowl with Almonds', kcal: 390, p: 36, c: 28, f: 12, time: '3 min', emoji: '🫐' },
  ],
  Lunch: [
    { id: 'l1', slot: 'Lunch', name: 'Grilled Chicken Breast, Basmati Rice & Broccoli', kcal: 660, p: 58, c: 70, f: 14, time: '20 min', emoji: '🍗' },
    { id: 'l2', slot: 'Lunch', name: 'Algerian Couscous with Lean Beef & Steamed Squash', kcal: 690, p: 52, c: 78, f: 16, time: '25 min', emoji: '🍲' },
    { id: 'l3', slot: 'Lunch', name: 'Seared Tuna Steak Salad with Quinoa & Lemon Dressing', kcal: 610, p: 54, c: 45, f: 20, time: '15 min', emoji: '🥗' },
  ],
  Snack: [
    { id: 's1', slot: 'Snack', name: 'Whey Protein Shake + Banana + Peanut Butter', kcal: 330, p: 32, c: 36, f: 8, time: '2 min', emoji: '🥤' },
    { id: 's2', slot: 'Snack', name: 'Cottage Cheese with Walnuts & Raw Honey', kcal: 290, p: 26, c: 18, f: 11, time: '2 min', emoji: '🍯' },
    { id: 's3', slot: 'Snack', name: 'Boiled Eggs & Handful of Algerian Deglet Nour Dates', kcal: 280, p: 20, c: 32, f: 7, time: '5 min', emoji: '🥚' },
  ],
  Dinner: [
    { id: 'd1', slot: 'Dinner', name: 'Baked Atlantic Salmon with Sweet Potato Mash', kcal: 620, p: 48, c: 48, f: 22, time: '22 min', emoji: '🥩' },
    { id: 'd2', slot: 'Dinner', name: 'Traditional Chicken Chtitha with Chickpeas', kcal: 590, p: 50, c: 42, f: 18, time: '30 min', emoji: '🥘' },
    { id: 'd3', slot: 'Dinner', name: 'Lean Ground Beef (95/5) with Jasmine Rice & Spinach', kcal: 640, p: 54, c: 60, f: 18, time: '18 min', emoji: '🥩' },
  ],
}

const planPresets: PlanPreset[] = [
  {
    id: 'high-protein',
    tag: 'Muscle Builder',
    name: 'High Protein / Lean Bulking',
    description: 'Optimized for hypertrophy with 2.2g protein per kg and clean complex carbs.',
    targetKcal: 2070,
    meals: [
      mealAlternatives.Breakfast[0],
      mealAlternatives.Lunch[0],
      mealAlternatives.Snack[0],
      mealAlternatives.Dinner[0],
    ],
    groceries: ['1kg Chicken Breast', '500g Salmon Fillet', '1kg Basmati Rice', 'Whey Protein Isolate', 'Rolled Oats', 'Fresh Blueberries', 'Broccoli', 'Sweet Potatoes'],
  },
  {
    id: 'algerian-fit',
    tag: '🇩🇿 Maghrebi Fit',
    name: 'Algerian Culinary Adaptation',
    description: 'Traditional authentic Algerian dishes modified with lean protein ratios and reduced cooking oil.',
    targetKcal: 2000,
    meals: [
      mealAlternatives.Breakfast[1],
      mealAlternatives.Lunch[1],
      mealAlternatives.Snack[2],
      mealAlternatives.Dinner[1],
    ],
    groceries: ['500g Lean Stewing Beef', 'Whole Chicken', 'Algerian Couscous (Semolina)', 'Chickpeas', 'Deglet Nour Dates', 'Eggs', 'Extra Virgin Olive Oil', 'Squash & Carrots'],
  },
  {
    id: 'budget-fast',
    tag: 'Quick & Budget',
    name: 'Student / High-Speed Prep',
    description: 'Minimal prep time (<15 min/meal) with affordable everyday ingredients.',
    targetKcal: 1910,
    meals: [
      mealAlternatives.Breakfast[2],
      mealAlternatives.Lunch[2],
      mealAlternatives.Snack[1],
      mealAlternatives.Dinner[2],
    ],
    groceries: ['Canned Tuna', 'Greek Yogurt', 'Ground Beef 95/5', 'Eggs', 'Bananas', 'Cottage Cheese', 'Frozen Spinach', 'Jasmine Rice'],
  },
]

export function StepPlanVisualizer() {
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0)
  const [currentMeals, setCurrentMeals] = useState<MealItem[]>(planPresets[0].meals)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showGroceries, setShowGroceries] = useState(false)
  const [swappedSlot, setSwappedSlot] = useState<string | null>(null)

  const activePreset = planPresets[selectedPresetIdx]

  // Switch preset
  const handleSelectPreset = (idx: number) => {
    setIsGenerating(true)
    setSelectedPresetIdx(idx)
    setTimeout(() => {
      setCurrentMeals(planPresets[idx].meals)
      setIsGenerating(false)
    }, 450)
  }

  // Swap an individual meal slot
  const handleSwapSlot = (slot: 'Breakfast' | 'Lunch' | 'Snack' | 'Dinner') => {
    setSwappedSlot(slot)
    const alts = mealAlternatives[slot]
    const currentMeal = currentMeals.find((m) => m.slot === slot)
    const currentIndex = alts.findIndex((a) => a.id === currentMeal?.id)
    const nextMeal = alts[(currentIndex + 1) % alts.length]

    setTimeout(() => {
      setCurrentMeals((prev) => prev.map((m) => (m.slot === slot ? nextMeal : m)))
      setSwappedSlot(null)
    }, 300)
  }

  // Totals
  const totalKcal = currentMeals.reduce((acc, m) => acc + m.kcal, 0)
  const totalProtein = currentMeals.reduce((acc, m) => acc + m.p, 0)
  const totalCarbs = currentMeals.reduce((acc, m) => acc + m.c, 0)
  const totalFats = currentMeals.reduce((acc, m) => acc + m.f, 0)

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-ai-500/20 border border-ai-400/30 flex items-center justify-center text-ai-300 shadow-sm">
            <Cpu className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              AI Meal Architecture & Recipe Engine
            </h4>
            <p className="text-xs text-dark-400">Personalized macro matching with 1-click recipe swapping</p>
          </div>
        </div>

        <Button
          variant="ai"
          size="xs"
          onClick={() => {
            setIsGenerating(true)
            setTimeout(() => {
              const newMeals: MealItem[] = [
                mealAlternatives.Breakfast[Math.floor(Math.random() * mealAlternatives.Breakfast.length)],
                mealAlternatives.Lunch[Math.floor(Math.random() * mealAlternatives.Lunch.length)],
                mealAlternatives.Snack[Math.floor(Math.random() * mealAlternatives.Snack.length)],
                mealAlternatives.Dinner[Math.floor(Math.random() * mealAlternatives.Dinner.length)],
              ]
              setCurrentMeals(newMeals)
              setIsGenerating(false)
            }, 600)
          }}
          disabled={isGenerating}
          loading={isGenerating}
          className="text-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Regenerating...' : 'Re-roll Day'}</span>
        </Button>
      </div>

      {/* Preset Diet Filter Tabs using shadcn Card */}
      <div>
        <div className="text-[11px] font-semibold text-dark-400 uppercase tracking-wider mb-2">
          Select Dietary Profile
        </div>
        <div className="grid grid-cols-3 gap-2">
          {planPresets.map((preset, idx) => (
            <Card
              key={preset.id}
              variant="hover"
              onClick={() => handleSelectPreset(idx)}
              className={`p-2.5 text-xs font-medium transition-all text-left flex flex-col justify-between cursor-pointer ${
                selectedPresetIdx === idx
                  ? 'bg-ai-500/20 border-ai-400 text-white shadow-lg shadow-ai-500/15'
                  : 'bg-dark-900/60 border-white/5 text-dark-400 hover:border-white/20 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <Badge variant="ai" size="sm">
                  {preset.tag}
                </Badge>
              </div>
              <div className="font-bold text-white text-xs truncate">{preset.name}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Real-time Macro Target Counter Bar */}
      <Card variant="static" className="p-3 border-ai-400/20 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-ai-400" />
          <span className="text-xs font-bold text-white">{activePreset.name}</span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-white font-bold">{totalKcal} kcal</span>
          <span className="text-primary-300 font-semibold">{totalProtein}g Protein</span>
          <span className="text-energy-300 font-semibold">{totalCarbs}g Carbs</span>
          <span className="text-coral-400 font-semibold">{totalFats}g Fat</span>
        </div>
      </Card>

      {/* Generated Meal List */}
      <div className="space-y-2">
        {currentMeals.map((meal) => {
          const isSlotSwapping = swappedSlot === meal.slot
          return (
            <Card
              key={meal.slot}
              variant="hover"
              className={`p-3 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isSlotSwapping || isGenerating
                  ? 'opacity-40 scale-[0.99] blur-[1px]'
                  : 'border-white/5 hover:border-ai-400/30'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-2xl p-2 rounded-xl bg-dark-950 border border-white/5 flex-shrink-0">
                  {meal.emoji}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge variant="ai" size="sm">
                      {meal.slot}
                    </Badge>
                    <span className="text-[11px] text-dark-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {meal.time}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white truncate mt-0.5">{meal.name}</div>
                  <div className="text-[11px] text-dark-400 font-mono mt-0.5">
                    {meal.kcal} kcal • <span className="text-primary-300 font-semibold">{meal.p}g P</span> •{' '}
                    <span className="text-energy-300">{meal.c}g C</span> •{' '}
                    <span className="text-coral-400">{meal.f}g F</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons using shadcn Button */}
              <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => handleSwapSlot(meal.slot)}
                  className="text-xs border border-white/10 text-dark-300 hover:text-white"
                  title="Swap with alternative dish"
                >
                  <Shuffle className="w-3 h-3 text-ai-300" />
                  <span>Swap</span>
                </Button>
                <div className="w-6 h-6 rounded-full bg-primary-500/15 border border-primary-400/30 flex items-center justify-center text-primary-400">
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Grocery List Expandable Drawer */}
      <Card variant="static" className="p-0 overflow-hidden">
        <button
          onClick={() => setShowGroceries(!showGroceries)}
          className="w-full p-3 flex items-center justify-between text-xs font-semibold text-dark-300 hover:text-white transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-ai-400" />
            <span>AI Automated Grocery Shopping List ({activePreset.groceries.length} items)</span>
          </div>
          {showGroceries ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showGroceries && (
          <div className="p-3.5 pt-0 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {activePreset.groceries.map((item, i) => (
              <div
                key={i}
                className="p-2 rounded-lg bg-dark-950/60 border border-white/5 text-dark-200 flex items-center gap-1.5 text-[11px]"
              >
                <Check className="w-3 h-3 text-primary-400 flex-shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Bottom Status Banner */}
      <div className="bg-gradient-to-r from-ai-500/10 via-primary-500/10 to-transparent p-3 rounded-xl border border-ai-400/20 flex items-center justify-between text-xs">
        <span className="text-dark-300">Target calorie & macro split matched with 99.8% precision</span>
        <span className="text-ai-300 font-bold flex items-center gap-1">
          Auto-Synced to Step 03 <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  )
}
