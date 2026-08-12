'use client'

import { CheckCircle2, Sun, Apple, Moon, Check } from 'lucide-react'

export function TodaysPlan() {
  const meals = [
    {
      name: 'Breakfast',
      calories: '620 kcal',
      time: '7:30 AM',
      completed: true,
      icon: Sun,
      iconColor: '#fbbf24',
    },
    {
      name: 'Lunch',
      calories: '780 kcal',
      time: '12:30 PM',
      completed: true,
      icon: Sun,
      iconColor: '#fbbf24',
    },
    {
      name: 'Snack',
      calories: '120 kcal',
      time: '3:30 PM',
      completed: true,
      icon: Apple,
      iconColor: '#f43f5e',
    },
    {
      name: 'Dinner',
      calories: 'Pending',
      time: '7:00 PM',
      completed: false,
      icon: Moon,
      iconColor: '#a855f7',
    },
  ]

  return (
    <div
      className="p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between h-full space-y-4"
      style={{
        background: 'rgba(11, 17, 31, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      {/* Top multi-color gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2.5px]"
        style={{
          background: 'linear-gradient(90deg, #10b981 0%, #00d4ff 50%, #a855f7 100%)',
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-white tracking-wide">Today&apos;s Plan</h3>
        </div>
      </div>

      {/* 4 Meal Cards Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4 flex-1">
        {meals.map((meal) => {
          const Icon = meal.icon
          return (
            <div
              key={meal.name}
              className="p-4 sm:p-5 rounded-xl flex flex-col justify-between relative transition-all duration-200 hover:border-white/15"
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <Icon className="w-5 h-5" style={{ color: meal.iconColor }} />
                  <span className="text-sm font-bold text-slate-200">{meal.name}</span>
                </div>
                <p
                  className={`text-base sm:text-lg font-black tracking-tight ${
                    meal.completed ? 'text-emerald-400' : 'text-purple-400'
                  }`}
                >
                  {meal.calories}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.05]">
                <span className="text-xs text-slate-400 font-medium">{meal.time}</span>
                {meal.completed ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400/50" />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
