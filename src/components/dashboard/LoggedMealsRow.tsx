'use client'

import React from 'react'
import Link from 'next/link'
import { Utensils, Plus, ChevronRight } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { MealBadgeSVG } from './DashboardVisuals'

interface LoggedMealsRowProps {
  onOpenQuickLog?: () => void
}

export function LoggedMealsRow({ onOpenQuickLog }: LoggedMealsRowProps) {
  const { meals, toggleMealEaten } = useNutritionStore()

  return (
    <div
      className="p-5 rounded-2xl flex flex-col h-full"
      style={{
        background: 'rgba(11, 17, 31, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
            <Utensils className="w-4.5 h-4.5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">Today&apos;s Food Intake</h3>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Your meal journal</p>
          </div>
        </div>

        <Link
          href="/dashboard/nutrition"
          className="flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Meal Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 flex-1">
        {meals.map((meal, index) => {
          const typeKey = meal.type as 'breakfast' | 'lunch' | 'snack' | 'dinner'

          return (
            <div
              key={meal.type}
              className={`p-3.5 rounded-2xl flex flex-col justify-between relative transition-all duration-200 border text-left ${meal.eaten
                  ? 'bg-slate-900/70 border-white/[0.08] hover:border-emerald-500/25'
                  : 'bg-slate-900/35 border-dashed border-white/[0.08]'
                }`}
            >
              {/* Badge + Toggle */}
              <div className="flex items-center justify-between gap-1 mb-2">
                <div className="w-8 h-8 flex-shrink-0">
                  <MealBadgeSVG type={typeKey} />
                </div>
                <button
                  onClick={() => toggleMealEaten(index)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all duration-200 ${meal.eaten
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : 'bg-white/[0.05] text-slate-400 border border-white/[0.08] hover:text-white'
                    }`}
                >
                  {meal.eaten ? '✓ Done' : 'Pending'}
                </button>
              </div>

              {/* Title & Calories */}
              <div>
                <p className="text-xs font-bold text-white capitalize">{meal.type}</p>
                <p className="text-sm font-black text-emerald-400 mt-0.5">
                  {meal.totalCalories} kcal
                </p>
              </div>

              {/* Food Items */}
              <div className="space-y-1 mt-2 pt-2 border-t border-white/[0.05]">
                {meal.foods.slice(0, 2).map((food) => (
                  <div key={food.name} className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="truncate max-w-[90px]">{food.name}</span>
                    <span className="text-slate-300 font-semibold">{food.calories}</span>
                  </div>
                ))}
                {meal.foods.length > 2 && (
                  <p className="text-[9.5px] text-emerald-400/80 font-bold">
                    +{meal.foods.length - 2} more items
                  </p>
                )}
              </div>
            </div>
          )
        })}

        {/* Add Meal Slot */}
        <button
          type="button"
          onClick={onOpenQuickLog}
          className="p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-200 hover:bg-white/[0.04] cursor-pointer group min-h-[140px] border border-dashed border-white/15 hover:border-emerald-400/40"
          style={{ background: 'rgba(15, 23, 42, 0.3)' }}
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/12 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-200 mb-2">
            <Plus className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-slate-200 group-hover:text-white">
            + Quick Log Food
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">Presets or custom</p>
        </button>
      </div>
    </div>
  )
}
