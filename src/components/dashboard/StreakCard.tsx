'use client'

import { Flame, Check, Trophy } from 'lucide-react'

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

  const completedCount = days.filter((d) => d.completed).length

  return (
    <div
      className="p-5 rounded-2xl flex flex-col justify-between h-full"
      style={{
        background: 'rgba(11, 17, 31, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/12 border border-amber-500/25 flex items-center justify-center">
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white leading-tight">7 Day Streak</h3>
            <p className="text-xs text-slate-400 mt-0.5">Keep your nutrition on track</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-bold text-amber-300">{completedCount}/7</span>
        </div>
      </div>

      {/* Days Row */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {days.map((item) => (
          <div key={item.day} className="flex flex-col items-center gap-2">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                item.completed
                  ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-400'
                  : item.isToday
                  ? 'bg-amber-500/15 border-2 border-amber-400 text-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.4)]'
                  : 'bg-white/[0.04] border border-white/[0.06] text-slate-600'
              }`}
            >
              {item.completed ? (
                <Check className="w-4 h-4 stroke-[3]" />
              ) : item.isToday ? (
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              )}
            </div>
            <span
              className={`text-[11px] font-semibold ${
                item.isToday ? 'text-amber-400 font-bold' : item.completed ? 'text-slate-300' : 'text-slate-500'
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
