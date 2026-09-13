'use client'

import React, { useState } from 'react'
import { Camera, Scan, Sparkles, Sliders, CheckCircle2, Zap } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface DishSample {
  id: string
  name: string
  category: string
  emoji: string
  baseWeight: number
  baseKcal: number
  baseProtein: number
  baseCarbs: number
  baseFats: number
  fiber: number
  confidence: string
  ingredients: string[]
}

const dishes: DishSample[] = [
  {
    id: 'couscous',
    name: 'Algerian Couscous with Lean Chicken',
    category: '🇩🇿 Traditional Maghrebi Fit',
    emoji: '🍲',
    baseWeight: 350,
    baseKcal: 560,
    baseProtein: 48,
    baseCarbs: 64,
    baseFats: 12,
    fiber: 7,
    confidence: '99.4%',
    ingredients: ['Grilled Chicken Breast', 'Steamed Semolina', 'Carrots & Courgettes', 'Chickpeas', 'Olive Oil Broth'],
  },
  {
    id: 'salmon',
    name: 'Seared Salmon & Avocado Quinoa Bowl',
    category: 'Omega-3 Lean Superfood',
    emoji: '🥗',
    baseWeight: 300,
    baseKcal: 490,
    baseProtein: 38,
    baseCarbs: 26,
    baseFats: 24,
    fiber: 8,
    confidence: '99.1%',
    ingredients: ['Wild Salmon Fillet', 'Fresh Avocado', 'Tri-Color Quinoa', 'Baby Spinach', 'Lemon Dressing'],
  },
  {
    id: 'shakshuka',
    name: 'Spiced Eggs Shakshuka & Wholewheat',
    category: 'High Protein Breakfast',
    emoji: '🍳',
    baseWeight: 260,
    baseKcal: 420,
    baseProtein: 32,
    baseCarbs: 34,
    baseFats: 18,
    fiber: 6,
    confidence: '98.9%',
    ingredients: ['3 Farm Eggs', 'San Marzano Tomatoes', 'Bell Peppers', 'Cumin & Paprika', 'Wholewheat Toast'],
  },
  {
    id: 'smoothie',
    name: 'Blueberry Whey Protein Super-Shake',
    category: 'Post-Workout Recovery',
    emoji: '🫐',
    baseWeight: 320,
    baseKcal: 340,
    baseProtein: 36,
    baseCarbs: 38,
    baseFats: 4,
    fiber: 5,
    confidence: '99.6%',
    ingredients: ['Whey Isolate', 'Organic Blueberries', 'Unsweetened Almond Milk', 'Chia Seeds', 'Greek Yogurt'],
  },
]

export function StepScanVisualizer() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [weight, setWeight] = useState(dishes[0].baseWeight)
  const [isScanning, setIsScanning] = useState(false)
  const [isLogged, setIsLogged] = useState(false)

  const dish = dishes[selectedIdx]

  const handleSelectDish = (idx: number) => {
    setIsScanning(true)
    setSelectedIdx(idx)
    setWeight(dishes[idx].baseWeight)
    setIsLogged(false)
    setTimeout(() => {
      setIsScanning(false)
    }, 450)
  }

  // Dynamic calculations according to portion weight slider
  const multiplier = weight / dish.baseWeight
  const currentKcal = Math.round(dish.baseKcal * multiplier)
  const currentProtein = Math.round(dish.baseProtein * multiplier)
  const currentCarbs = Math.round(dish.baseCarbs * multiplier)
  const currentFats = Math.round(dish.baseFats * multiplier)
  const currentFiber = Math.round(dish.fiber * multiplier)

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-coral-400/20 border border-coral-400/30 flex items-center justify-center text-coral-400 shadow-sm">
            <Camera className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              Computer Vision Food & Plate Scanner
            </h4>
            <p className="text-xs text-dark-400">Instant multi-ingredient detection & macro calculation</p>
          </div>
        </div>

        <Badge variant="coral" size="sm" className="gap-1.5">
          <Scan className="w-3.5 h-3.5 animate-pulse" />
          Camera Vision HUD
        </Badge>
      </div>

      {/* Dish Selector Tabs using shadcn Card */}
      <div>
        <div className="text-[11px] font-semibold text-dark-400 uppercase tracking-wider mb-2">
          Choose a Dish to Scan
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {dishes.map((item, idx) => (
            <Card
              key={item.id}
              variant="hover"
              onClick={() => handleSelectDish(idx)}
              className={`p-2.5 text-xs transition-all flex items-center gap-2.5 cursor-pointer ${
                selectedIdx === idx
                  ? 'bg-coral-400/20 border-coral-400 text-white shadow-lg shadow-coral-400/15 scale-[1.02]'
                  : 'bg-dark-900/60 border-white/5 text-dark-400 hover:border-white/20 hover:text-white'
              }`}
            >
              <span className="text-2xl flex-shrink-0">{item.emoji}</span>
              <div className="truncate text-left">
                <div className="font-bold text-white truncate text-xs">{item.name.split(' ')[0]}</div>
                <div className="text-[10px] text-dark-500 truncate">{item.baseKcal} kcal</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Interactive Camera Viewport Box */}
      <Card variant="static" className="relative bg-dark-950 border-coral-400/30 overflow-hidden p-6 sm:p-8 min-h-[220px] flex flex-col items-center justify-center">
        {/* Animated Laser Scan Bar */}
        {isScanning ? (
          <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-coral-400 to-transparent top-0 animate-bounce shadow-[0_0_15px_#f43f5e]" />
        ) : (
          <div className="absolute inset-x-0 h-0.5 bg-coral-400/40 top-1/2 -translate-y-1/2 animate-pulse pointer-events-none" />
        )}

        {/* HUD Corner Brackets */}
        <div className="absolute inset-4 sm:inset-6 border border-coral-400/20 rounded-2xl pointer-events-none p-3 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="bg-dark-900/90 border border-coral-400/40 px-2.5 py-1 rounded-lg text-[10px] font-mono text-coral-300 font-bold flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3 h-3 text-coral-400 animate-pulse" />
              <span>{dish.confidence} Neural Match</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-dark-400 bg-dark-900/80 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE SENSOR</span>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="text-[10px] font-mono text-dark-400">USDA & Maghreb Compendium</div>
            <div className="text-[10px] font-mono text-coral-300 font-bold">{weight}g Portion</div>
          </div>
        </div>

        {/* Food Visual & Name */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-2">
          <div className="text-6xl sm:text-7xl filter drop-shadow-xl animate-float-slow">
            {dish.emoji}
          </div>
          <div className="text-sm sm:text-base font-bold text-white tracking-tight">
            {dish.name}
          </div>
          <div className="text-xs text-coral-300 font-medium">
            {dish.category}
          </div>
        </div>
      </Card>

      {/* Detected Ingredients Tags */}
      <div>
        <div className="text-[11px] font-semibold text-dark-400 uppercase tracking-wider mb-2">
          Detected Ingredients by Vision AI
        </div>
        <div className="flex flex-wrap gap-1.5">
          {dish.ingredients.map((ing, i) => (
            <Badge key={i} variant="outline" size="sm" className="bg-dark-900/80 text-dark-200">
              ✓ {ing}
            </Badge>
          ))}
        </div>
      </div>

      {/* Interactive Portion Slider */}
      <Card variant="static" className="p-4 space-y-2.5">
        <div className="flex justify-between items-center text-xs">
          <span className="text-dark-300 font-semibold flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-coral-400" />
            Adjust Portion Serving Size
          </span>
          <span className="text-coral-300 font-bold font-mono text-sm bg-coral-400/10 px-2.5 py-0.5 rounded-lg border border-coral-400/20">
            {weight} grams
          </span>
        </div>
        <input
          type="range"
          min="100"
          max="550"
          step="10"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="w-full accent-coral-400 h-1.5 bg-dark-800 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-dark-500">
          <span>Small (100g)</span>
          <span>Standard ({dish.baseWeight}g)</span>
          <span>Extra Large (550g)</span>
        </div>
      </Card>

      {/* Dynamic Calculated Nutrition Table */}
      <Card variant="static" className="p-4 border-coral-400/25 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-[10px] text-dark-400 uppercase font-semibold">Total Energy</div>
          <div className="text-2xl font-display font-extrabold text-white mt-0.5">
            🔥 {currentKcal} <span className="text-xs text-dark-400 font-normal">kcal</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-primary-500/15 border border-primary-400/30 text-center">
            <div className="text-[10px] text-dark-400">Protein</div>
            <div className="font-bold text-primary-300 font-mono">{currentProtein}g</div>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-energy-400/15 border border-energy-300/30 text-center">
            <div className="text-[10px] text-dark-400">Carbs</div>
            <div className="font-bold text-energy-300 font-mono">{currentCarbs}g</div>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-coral-400/15 border border-coral-400/30 text-center">
            <div className="text-[10px] text-dark-400">Fats</div>
            <div className="font-bold text-coral-400 font-mono">{currentFats}g</div>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-center">
            <div className="text-[10px] text-dark-400">Fiber</div>
            <div className="font-bold text-white font-mono">{currentFiber}g</div>
          </div>
        </div>

        <Button
          variant={isLogged ? 'default' : 'energy'}
          size="sm"
          onClick={() => setIsLogged(true)}
          className="text-xs font-bold"
        >
          {isLogged ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Logged to Tracker!
            </>
          ) : (
            <>
              <Zap className="w-3.5 h-3.5" />
              Log Scanned Meal
            </>
          )}
        </Button>
      </Card>
    </div>
  )
}
