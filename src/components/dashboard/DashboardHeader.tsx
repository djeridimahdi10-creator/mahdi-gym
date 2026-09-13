'use client'

import { Calendar, Bell, BookOpen, Sparkles, Flame, Droplets, Zap } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useNutritionStore } from '@/stores/nutritionStore'

interface DashboardHeaderProps {
  onOpenGuide: () => void
}

export function DashboardHeader({ onOpenGuide }: DashboardHeaderProps) {
  const { profile } = useAuthStore()
  const { meals, dailyCalories, waterConsumed, waterTarget, targetMacros } = useNutritionStore()
  const userName = profile?.full_name?.split(' ')[0] || 'Mahdi'

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const eatenMeals = meals.filter((m) => m.eaten)
  const consumedCalories = eatenMeals.reduce((acc, m) => acc + m.totalCalories, 0)
  const consumedProtein = eatenMeals.reduce(
    (acc, m) => acc + m.foods.reduce((fAcc, f) => fAcc + (f.protein || 0), 0),
    0
  )
  const remainingCalories = Math.max(0, dailyCalories - consumedCalories)
  const caloriePct = Math.min(100, Math.round((consumedCalories / (dailyCalories || 1)) * 100))

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <header className="space-y-4 w-full">
      {/* Main greeting */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1
            className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight truncate"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {getGreeting()}, {userName}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 font-medium flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            {formattedDate}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-all duration-200 hover:bg-white/[0.06]"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Beginner Guide</span>
            <span className="sm:hidden">Guide</span>
          </button>

          <button
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-white/[0.06] text-slate-400 hover:text-white"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
          </button>
        </div>
      </div>

      {/* Quick stats ribbon */}
      <div
        className="flex items-center gap-3.5 sm:gap-4.5 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl overflow-x-auto scrollbar-none w-full"
        style={{
          background: 'rgba(11, 17, 31, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        }}
      >
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
          <span className="text-xs font-semibold text-slate-300 whitespace-nowrap">
            <span className="text-white font-bold">{consumedCalories.toLocaleString()}</span>
            <span className="text-slate-500"> / {dailyCalories.toLocaleString()} kcal</span>
          </span>
        </div>

        <div className="w-px h-4 bg-white/[0.08] flex-shrink-0" />

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">
            <span className="text-emerald-400 font-bold">{caloriePct}%</span> of daily goal
          </span>
        </div>

        <div className="w-px h-4 bg-white/[0.08] flex-shrink-0" />

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">
            <span className="text-orange-400 font-bold">{remainingCalories.toLocaleString()}</span> kcal left
          </span>
        </div>

        <div className="w-px h-4 bg-white/[0.08] flex-shrink-0" />

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Zap className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">
            <span className="text-purple-400 font-bold">{consumedProtein}g</span>
            <span className="text-slate-500"> / {targetMacros.protein}g protein</span>
          </span>
        </div>

        <div className="w-px h-4 bg-white/[0.08] flex-shrink-0" />

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Droplets className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">
            <span className="text-cyan-400 font-bold">{waterConsumed.toFixed(1)}L</span>
            <span className="text-slate-500"> / {waterTarget}L water</span>
          </span>
        </div>

        <div className="w-px h-4 bg-white/[0.08] flex-shrink-0" />

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">
            <span className="text-amber-400 font-bold">7</span> day streak
          </span>
        </div>
      </div>
    </header>
  )
}
