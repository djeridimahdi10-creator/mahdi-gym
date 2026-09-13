'use client'

import React, { useState } from 'react'
import {
  Flame,
  Scale,
  Dumbbell,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  Plus,
} from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'

interface QuickControlBarProps {
  onOpenQuickLog?: () => void
}

export function QuickControlBar({ onOpenQuickLog }: QuickControlBarProps) {
  const {
    goalMode,
    setGoalMode,
    dailyCalories,
    targetMacros,
    waterTarget,
    setCustomTargets,
  } = useNutritionStore()

  const [customizeOpen, setCustomizeOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<'yesterday' | 'today' | 'tomorrow'>('today')

  const modes = [
    {
      id: 'cut' as const,
      label: 'Cut',
      badge: '-500 kcal',
      icon: Flame,
      color: '#f43f5e',
      bg: 'rgba(244, 63, 94, 0.1)',
      border: 'rgba(244, 63, 94, 0.3)',
    },
    {
      id: 'maintain' as const,
      label: 'Maintain',
      badge: 'Balanced',
      icon: Scale,
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.1)',
      border: 'rgba(16, 185, 129, 0.3)',
    },
    {
      id: 'bulk' as const,
      label: 'Bulk',
      badge: '+350 kcal',
      icon: Dumbbell,
      color: '#a855f7',
      bg: 'rgba(168, 85, 247, 0.1)',
      border: 'rgba(168, 85, 247, 0.3)',
    },
  ]

  const adjustCalories = (delta: number) => {
    setCustomTargets({ calories: Math.max(1200, Math.min(4500, dailyCalories + delta)) })
  }
  const adjustProtein = (delta: number) => {
    setCustomTargets({ protein: Math.max(50, Math.min(300, targetMacros.protein + delta)) })
  }
  const adjustCarbs = (delta: number) => {
    setCustomTargets({ carbs: Math.max(50, Math.min(500, targetMacros.carbs + delta)) })
  }
  const adjustFat = (delta: number) => {
    setCustomTargets({ fat: Math.max(20, Math.min(150, targetMacros.fat + delta)) })
  }

  return (
    <section className="w-full space-y-3">
      {/* Main Control Strip */}
      <div
        className="p-3 sm:p-4 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 relative overflow-hidden transition-all duration-300"
        style={{
          background: 'rgba(11, 17, 31, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
        }}
      >
        {/* Day Selector */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.04] border border-white/[0.06] self-start sm:self-auto">
          {(['yesterday', 'today', 'tomorrow'] as const).map((day) => {
            const isSelected = selectedDay === day
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold capitalize transition-all duration-200 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-500 text-white shadow-[0_2px_10px_rgba(16,185,129,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                {day === 'today' && isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
                {day}
              </button>
            )
          })}
        </div>

        {/* Goal Mode Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap flex-1 justify-center">
          {modes.map((mode) => {
            const Icon = mode.icon
            const active = goalMode === mode.id
            return (
              <button
                key={mode.id}
                onClick={() => setGoalMode(mode.id)}
                className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-200 relative ${
                  active ? 'scale-[1.02]' : 'hover:scale-[1.01] opacity-80 hover:opacity-100'
                }`}
                style={{
                  background: active ? mode.bg : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${active ? mode.border : 'rgba(255,255,255,0.06)'}`,
                  color: active ? '#ffffff' : '#94a3b8',
                  boxShadow: active ? `0 4px 16px ${mode.color}25` : 'none',
                }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: mode.color }} />
                <span>{mode.label}</span>
                <span
                  className="text-[10px] px-1.5 py-0.2 rounded font-bold hidden sm:inline-block"
                  style={{
                    background: active ? `${mode.color}25` : 'rgba(255,255,255,0.05)',
                    color: active ? '#ffffff' : '#64748b',
                  }}
                >
                  {mode.badge}
                </span>
              </button>
            )
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => setCustomizeOpen(!customizeOpen)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 border ${
              customizeOpen
                ? 'bg-purple-500/15 text-purple-300 border-purple-500/35'
                : 'text-slate-300 hover:text-white bg-white/[0.04] border-white/[0.06] hover:bg-white/[0.08]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
            <span>Customize</span>
            {customizeOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {onOpenQuickLog && (
            <button
              onClick={onOpenQuickLog}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 4px 14px rgba(16,185,129,0.3)',
              }}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Quick Log</span>
            </button>
          )}
        </div>
      </div>

      {/* Expandable Target Customizer */}
      {customizeOpen && (
        <div
          className="p-4 sm:p-5 rounded-2xl animate-fade-in transition-all"
          style={{
            background: 'rgba(11, 17, 31, 0.95)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h4 className="text-sm font-bold text-white tracking-wide">
                Calorie & Macro Target Tuner
              </h4>
              <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                Changes apply instantly
              </span>
            </div>
            <button
              onClick={() => setGoalMode('maintain')}
              className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition-colors self-start sm:self-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Calories */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="text-orange-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> Calories
                </span>
                <span className="text-sm font-black text-white">{dailyCalories} kcal</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <button onClick={() => adjustCalories(-50)} className="flex-1 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-bold text-slate-300 active:scale-95 transition-all">-50</button>
                <button onClick={() => adjustCalories(50)} className="flex-1 py-1 rounded-lg bg-orange-500/15 hover:bg-orange-500/25 text-xs font-bold text-orange-300 active:scale-95 transition-all">+50</button>
              </div>
            </div>

            {/* Protein */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="text-purple-400 flex items-center gap-1">⚡ Protein</span>
                <span className="text-sm font-black text-white">{targetMacros.protein}g</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <button onClick={() => adjustProtein(-5)} className="flex-1 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-bold text-slate-300 active:scale-95 transition-all">-5g</button>
                <button onClick={() => adjustProtein(5)} className="flex-1 py-1 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 text-xs font-bold text-purple-300 active:scale-95 transition-all">+5g</button>
              </div>
            </div>

            {/* Carbs */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="text-amber-400 flex items-center gap-1">🌾 Carbs</span>
                <span className="text-sm font-black text-white">{targetMacros.carbs}g</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <button onClick={() => adjustCarbs(-10)} className="flex-1 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-bold text-slate-300 active:scale-95 transition-all">-10g</button>
                <button onClick={() => adjustCarbs(10)} className="flex-1 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-xs font-bold text-amber-300 active:scale-95 transition-all">+10g</button>
              </div>
            </div>

            {/* Fat */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="text-cyan-400 flex items-center gap-1">🥑 Fat</span>
                <span className="text-sm font-black text-white">{targetMacros.fat}g</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <button onClick={() => adjustFat(-5)} className="flex-1 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-bold text-slate-300 active:scale-95 transition-all">-5g</button>
                <button onClick={() => adjustFat(5)} className="flex-1 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-xs font-bold text-cyan-300 active:scale-95 transition-all">+5g</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
