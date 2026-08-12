'use client'

import { Calendar, Bell, BookOpen } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'

interface DashboardHeaderProps {
  onOpenGuide: () => void
}

export function DashboardHeader({ onOpenGuide }: DashboardHeaderProps) {
  const { profile } = useAuthStore()
  const userName = profile?.full_name?.split(' ')[0] || 'Mahdi'

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-3 border-b border-white/[0.05]">
      {/* Greeting & Calorie Progress Subtitle */}
      <div>
        <h1
          className="text-xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Good morning, {userName}! 👋
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm mt-1 font-medium flex items-center gap-1.5 flex-wrap">
          <span>You&apos;re</span>
          <span className="font-black text-emerald-400 text-xs sm:text-base px-2 py-0.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30">
            69%
          </span>
          <span>toward your daily calorie goal. Keep it up!</span>
        </p>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap self-start sm:self-auto">
        {/* Nutrition Guide Button */}
        <button
          onClick={onOpenGuide}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold text-slate-200 transition-all hover:bg-white/[0.08] hover:text-white"
          style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <BookOpen className="w-4 h-4 text-purple-400" />
          <span>Guide</span>
        </button>

        {/* Date Pill */}
        <div
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold text-slate-300"
          style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>{formattedDate}</span>
        </div>

        {/* Notification Bell */}
        <button
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all hover:bg-white/[0.08] text-slate-400 hover:text-white"
          style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          title="Notifications"
        >
          <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
        </button>
      </div>
    </header>
  )
}
