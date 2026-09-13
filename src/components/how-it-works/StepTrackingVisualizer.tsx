'use client'

import React, { useState } from 'react'
import { Plus, Flame, Clock, CheckCircle, Droplets, RotateCcw } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface LoggedMeal {
  id: string
  title: string
  time: string
  kcal: number
  p: number
  c: number
  f: number
  logged: boolean
}

const initialMeals: LoggedMeal[] = [
  { id: 'm1', title: 'Eggs & Wholewheat Toast', time: '08:30 AM', kcal: 420, p: 28, c: 38, f: 16, logged: true },
  { id: 'm2', title: 'Grilled Chicken & Rice', time: '01:15 PM', kcal: 680, p: 56, c: 72, f: 14, logged: true },
  { id: 'm3', title: 'Whey Protein & Banana', time: '04:45 PM', kcal: 320, p: 30, c: 36, f: 5, logged: true },
  { id: 'm4', title: 'Salmon Steak & Sweet Potato', time: '08:00 PM', kcal: 580, p: 46, c: 45, f: 20, logged: false },
]

export function StepTrackingVisualizer() {
  const [meals, setMeals] = useState<LoggedMeal[]>(initialMeals)
  const [waterGlasses, setWaterGlasses] = useState(5)
  const targetCalories = 2300
  const targetProtein = 165
  const targetCarbs = 230
  const targetFats = 65

  // Calculations based on logged meals
  const loggedMeals = meals.filter((m) => m.logged)
  const consumedCalories = loggedMeals.reduce((acc, m) => acc + m.kcal, 0)
  const consumedProtein = loggedMeals.reduce((acc, m) => acc + m.p, 0)
  const consumedCarbs = loggedMeals.reduce((acc, m) => acc + m.c, 0)
  const consumedFats = loggedMeals.reduce((acc, m) => acc + m.f, 0)

  const remainingCalories = Math.max(0, targetCalories - consumedCalories)
  const percentage = Math.min(100, Math.round((consumedCalories / targetCalories) * 100))

  const toggleMeal = (id: string) => {
    setMeals((prev) =>
      prev.map((m) => (m.id === id ? { ...m, logged: !m.logged } : m))
    )
  }

  const addQuickSnack = () => {
    const newId = `snack-${Date.now()}`
    setMeals((prev) => [
      ...prev,
      {
        id: newId,
        title: 'Almonds & Greek Yogurt',
        time: 'Just now',
        kcal: 250,
        p: 20,
        c: 12,
        f: 14,
        logged: true,
      },
    ])
  }

  const resetTracker = () => {
    setMeals(initialMeals)
    setWaterGlasses(5)
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-coral-400/20 border border-coral-400/30 flex items-center justify-center text-coral-400 shadow-sm">
            <Flame className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              Real-Time Calorie & Macro Ring Tracker
            </h4>
            <p className="text-xs text-dark-400">Live energy balance, deficit counter, and hydration log</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="xs"
          onClick={resetTracker}
          className="text-xs text-dark-400 hover:text-white border border-white/5"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </Button>
      </div>

      {/* Main Gauge and Macro Summary Card using shadcn Card */}
      <Card variant="static" className="p-5 flex flex-col sm:flex-row items-center gap-6">
        {/* SVG Progress Ring */}
        <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-dark-800"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-primary-400 transition-all duration-700 ease-out"
              strokeDasharray={`${percentage}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-display font-extrabold text-white">{percentage}%</span>
            <span className="text-[10px] font-semibold text-primary-300 uppercase tracking-wider">
              {remainingCalories === 0 ? 'Goal Met!' : `${remainingCalories} kcal left`}
            </span>
          </div>
        </div>

        {/* Counter Info & Macro Progress Bars */}
        <div className="flex-1 w-full space-y-3.5">
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-dark-400 font-medium">Daily Energy Consumed</span>
            <span className="text-xl font-bold text-white font-mono">
              {consumedCalories.toLocaleString()}{' '}
              <span className="text-xs text-dark-500 font-normal">/ {targetCalories.toLocaleString()} kcal</span>
            </span>
          </div>

          {/* Macro Progress Bars */}
          <div className="space-y-2.5">
            {/* Protein */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-dark-300">
                  Protein: <span className="text-white font-semibold font-mono">{consumedProtein}g</span> / {targetProtein}g
                </span>
                <span className="text-primary-300 font-bold text-[11px]">
                  {Math.round((consumedProtein / targetProtein) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-dark-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.round((consumedProtein / targetProtein) * 100))}%` }}
                />
              </div>
            </div>

            {/* Carbs */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-dark-300">
                  Carbs: <span className="text-white font-semibold font-mono">{consumedCarbs}g</span> / {targetCarbs}g
                </span>
                <span className="text-energy-300 font-bold text-[11px]">
                  {Math.round((consumedCarbs / targetCarbs) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-dark-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-energy-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.round((consumedCarbs / targetCarbs) * 100))}%` }}
                />
              </div>
            </div>

            {/* Fats */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-dark-300">
                  Fats: <span className="text-white font-semibold font-mono">{consumedFats}g</span> / {targetFats}g
                </span>
                <span className="text-coral-400 font-bold text-[11px]">
                  {Math.round((consumedFats / targetFats) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-dark-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-coral-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.round((consumedFats / targetFats) * 100))}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Interactive Meal Logging Checklist */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-dark-300 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-primary-400" />
            Click to Log / Unlog Today&apos;s Meals
          </span>
          <Button
            variant="outline"
            size="xs"
            onClick={addQuickSnack}
            className="text-primary-300 hover:text-white"
          >
            <Plus className="w-3 h-3" />
            + Quick Snack (250 kcal)
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {meals.map((meal) => (
            <Card
              key={meal.id}
              variant="hover"
              onClick={() => toggleMeal(meal.id)}
              className={`p-3 text-left transition-all flex items-center justify-between cursor-pointer ${
                meal.logged
                  ? 'bg-primary-500/10 border-primary-400/30 text-white'
                  : 'bg-dark-900/40 border-white/5 text-dark-400 hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{meal.title}</span>
                  <span className="text-[10px] text-dark-400">{meal.time}</span>
                </div>
                <div className="text-[11px] text-dark-400 font-mono mt-0.5">
                  {meal.kcal} kcal • {meal.p}g P • {meal.c}g C
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                  meal.logged
                    ? 'bg-primary-500 text-dark-950 font-bold'
                    : 'border border-dark-600'
                }`}
              >
                {meal.logged && <CheckCircle className="w-4 h-4 text-white" />}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Water Hydration Tracker Row */}
      <Card variant="static" className="p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Daily Hydration</div>
            <div className="text-[11px] text-dark-400">{waterGlasses * 250}ml of 2,000ml (8 glasses)</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setWaterGlasses(i + 1 === waterGlasses ? i : i + 1)}
              className={`w-6 h-7 rounded-md transition-all flex items-center justify-center text-[10px] cursor-pointer ${
                i < waterGlasses
                  ? 'bg-sky-500/30 border border-sky-400 text-sky-300 shadow-sm'
                  : 'bg-dark-950 border border-white/5 text-dark-600 hover:border-white/20'
              }`}
              title={`${(i + 1) * 250}ml`}
            >
              💧
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}
