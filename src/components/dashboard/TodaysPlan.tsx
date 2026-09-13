'use client'

import React from 'react'
import { CheckCircle2, Check, Plus, Clock } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { MealBadgeSVG } from './DashboardVisuals'

interface TodaysPlanProps {
  onOpenQuickLog?: () => void
}

export function TodaysPlan({ onOpenQuickLog }: TodaysPlanProps) {
  const { meals, toggleMealEaten } = useNutritionStore()

  return (
    <div
      className="p-5 rounded-2xl relative overflow-hidden flex flex-col h-full"
      style={{
        background: 'rgba(11, 17, 31, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, #10b981 0%, #00d4ff 50%, #a855f7 100%)' }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">Today&apos;s Meal Plan</h3>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Tap any meal to mark as eaten</p>
          </div>
        </div>

        {onOpenQuickLog && (
          <button
            onClick={onOpenQuickLog}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-500/12 border border-emerald-500/25 hover:bg-emerald-500/20 transition-all duration-200"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Food</span>
          </button>
        )}
      </div>

      {/* Meal Cards Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 flex-1">
        {meals.map((meal, index) => {
          const typeKey = meal.type as 'breakfast' | 'lunch' | 'snack' | 'dinner'

          return (
            <div
              key={meal.type}
              onClick={() => toggleMealEaten(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggleMealEaten(index)
                }
              }}
              className={`p-4 rounded-2xl flex flex-col justify-between relative transition-all duration-200 cursor-pointer group text-left border ${meal.eaten
                  ? 'bg-emerald-950/15 border-emerald-500/25 hover:border-emerald-500/40'
                  : 'bg-slate-900/50 border-white/[0.06] hover:border-white/12'
                }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 flex-shrink-0">
                      <MealBadgeSVG type={typeKey} />
                    </div>
                    <span className="text-sm font-bold text-white capitalize">{meal.type}</span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${meal.eaten
                        ? 'bg-emerald-500 text-white shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                        : 'border border-slate-600 group-hover:border-slate-400'
                      }`}
                  >
                    {meal.eaten && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                {/* Calories */}
                <p className={`text-lg font-black tracking-tight ${meal.eaten ? 'text-emerald-300' : 'text-slate-200'}`}>
                  {meal.totalCalories}{' '}
                  <span className="text-[11px] font-semibold text-slate-400">kcal</span>
                </p>

                {/* Food preview */}
                <p className="text-[11px] text-slate-400 truncate mt-1.5">
                  {meal.foods[0]?.name || 'Planned meal'}
                  {meal.foods.length > 1 && ` +${meal.foods.length - 1} more`}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/[0.06] text-[11px]">
                <span className="flex items-center gap-1 text-slate-400 font-medium">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {meal.time}
                </span>
                <span className={`font-bold ${meal.eaten ? 'text-emerald-400' : 'text-amber-400/90'}`}>
                  {meal.eaten ? 'Logged' : 'Pending'}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
