'use client'

import { Flame, Check } from 'lucide-react'

export function StreakCard() {
  const days = [
    { day: 'Mon', completed: true, isToday: false },
    { day: 'Tue', completed: true, isToday: false },
    { day: 'Wed', completed: true, isToday: false },
    { day: 'Thu', completed: true, isToday: false },
    { day: 'Fri', completed: true, isToday: false },
    { day: 'Sat', completed: true, isToday: false },
    { day: 'Sun', completed: false, isToday: true },
  ]

  return (
    <div
      className="p-5 sm:p-6 rounded-2xl flex flex-col justify-between h-full space-y-4"
      style={{
        background: 'rgba(11, 17, 31, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      {/* Title & Subtitle Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
          <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white leading-tight">7 Day Streak</h3>
          <p className="text-xs text-amber-400 font-semibold">You&apos;re on fire! 🔥</p>
        </div>
      </div>

      {/* 7 Days Row */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center pt-1">
        {days.map((item) => (
          <div key={item.day} className="flex flex-col items-center gap-2">
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs transition-all ${
                item.completed
                  ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-400'
                  : item.isToday
                  ? 'bg-amber-500/20 border-2 border-amber-400 text-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.6)]'
                  : 'bg-white/[0.04] border border-white/[0.06] text-slate-600'
              }`}
            >
              {item.completed ? (
                <Check className="w-4 h-4 stroke-[3]" />
              ) : item.isToday ? (
                <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              )}
            </div>
            <span
              className={`text-xs font-semibold ${
                item.isToday ? 'text-amber-400 font-extrabold' : 'text-slate-400'
              }`}
            >
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
