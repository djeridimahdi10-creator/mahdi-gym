'use client'

import Link from 'next/link'
import { Utensils, Check, Plus, Sun, Apple, Moon } from 'lucide-react'

export function LoggedMealsRow() {
  const loggedMeals = [
    {
      name: 'Breakfast',
      calories: '620 kcal',
      time: '7:30 AM',
      completed: true,
      emoji: '🍳',
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.15)',
      border: 'rgba(245, 158, 11, 0.3)',
    },
    {
      name: 'Lunch',
      calories: '780 kcal',
      time: '12:30 PM',
      completed: true,
      emoji: '🥗',
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.15)',
      border: 'rgba(16, 185, 129, 0.3)',
    },
    {
      name: 'Snack',
      calories: '120 kcal',
      time: '3:30 PM',
      completed: true,
      emoji: '🍎',
      color: '#f43f5e',
      bg: 'rgba(244, 63, 94, 0.15)',
      border: 'rgba(244, 63, 94, 0.3)',
    },
    {
      name: 'Dinner',
      calories: 'Pending',
      time: '7:00 PM',
      completed: false,
      emoji: '🍲',
      color: '#a855f7',
      bg: 'rgba(168, 85, 247, 0.15)',
      border: 'rgba(168, 85, 247, 0.3)',
    },
  ]

  return (
    <div
      className="p-6 rounded-2xl flex flex-col justify-between h-full space-y-4"
      style={{
        background: 'rgba(11, 17, 31, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      {/* Title Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Utensils className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-white tracking-wide">Today&apos;s Logged Meals</h3>
        </div>
      </div>

      {/* Meal Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 sm:gap-3.5 flex-1">
        {loggedMeals.map((meal) => (
          <div
            key={meal.name}
            className="p-3 sm:p-4 rounded-xl flex flex-col items-center text-center justify-between relative transition-all duration-200 hover:scale-[1.02] hover:border-white/15"
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            {/* Meal Icon Thumbnail Box */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-2 flex-shrink-0"
              style={{
                background: meal.bg,
                border: `1px solid ${meal.border}`,
                boxShadow: `0 4px 16px ${meal.color}20`,
              }}
            >
              {meal.emoji}
            </div>

            {/* Meal Details */}
            <div>
              <p className="text-xs sm:text-sm font-bold text-white">{meal.name}</p>
              <p
                className={`text-xs sm:text-sm font-black mt-0.5 ${
                  meal.completed ? 'text-emerald-400' : 'text-purple-400'
                }`}
              >
                {meal.calories}
              </p>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">{meal.time}</p>
            </div>

            {/* Completion Indicator */}
            <div className="mt-3">
              {meal.completed ? (
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center" />
              )}
            </div>
          </div>
        ))}

        {/* Add Meal Empty State Card */}
        <Link href="/dashboard/scan" className="block">
          <div
            className="p-4 rounded-xl flex flex-col items-center justify-center text-center h-full transition-all duration-200 hover:bg-white/[0.05] cursor-pointer group min-h-[140px]"
            style={{
              background: 'rgba(15, 23, 42, 0.35)',
              border: '1.5px dashed rgba(255, 255, 255, 0.15)',
            }}
          >
            <div className="w-10 h-10 rounded-full bg-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white group-hover:scale-110 transition-all mb-2">
              <Plus className="w-5 h-5" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white">+ Add Meal</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Manually log meal</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
