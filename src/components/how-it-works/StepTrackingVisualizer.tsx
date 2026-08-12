'use client'

import React, { useState } from 'react'
import { Plus, Flame, Clock, CheckCircle } from 'lucide-react'

export function StepTrackingVisualizer() {
  const [loggedCalories, setLoggedCalories] = useState(1840)
  const targetCalories = 2400
  const percentage = Math.min(100, Math.round((loggedCalories / targetCalories) * 100))

  const handleAddSnack = () => {
    if (loggedCalories < 2400) {
      setLoggedCalories((prev) => Math.min(2400, prev + 280))
    } else {
      setLoggedCalories(1400)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-coral-400/20 flex items-center justify-center text-coral-400">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Daily Calorie Tracker</h4>
            <p className="text-xs text-dark-400">Real-time energy & macro balance</p>
          </div>
        </div>

        <button
          onClick={handleAddSnack}
          className="px-3 py-1.5 rounded-xl bg-primary-500/20 border border-primary-400/30 text-xs font-semibold text-primary-300 hover:bg-primary-500/30 transition-all flex items-center gap-1.5 active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          {loggedCalories >= 2400 ? 'Reset Demo' : 'Log Quick Snack (+280)'}
        </button>
      </div>

      {/* Progress Ring Card */}
      <div className="bg-dark-800/40 p-5 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-center gap-6">
        {/* SVG Gauge Circle */}
        <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-dark-700"
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
            <span className="text-xl font-display font-bold text-white">{percentage}%</span>
            <span className="text-[10px] text-dark-400 uppercase">Goal Met</span>
          </div>
        </div>

        {/* Counter Info */}
        <div className="flex-1 w-full space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-dark-400">Calories Consumed</span>
            <span className="text-lg font-bold text-white">
              {loggedCalories} <span className="text-xs text-dark-500 font-normal">/ {targetCalories} kcal</span>
            </span>
          </div>

          {/* Macro Progress Bars */}
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-dark-300">Protein (145g / 170g)</span>
                <span className="text-primary-300 font-semibold">85%</span>
              </div>
              <div className="h-1.5 bg-dark-900 rounded-full overflow-hidden">
                <div className="h-full bg-primary-400 rounded-full transition-all duration-500" style={{ width: '85%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-dark-300">Carbs (180g / 240g)</span>
                <span className="text-energy-300 font-semibold">75%</span>
              </div>
              <div className="h-1.5 bg-dark-900 rounded-full overflow-hidden">
                <div className="h-full bg-energy-400 rounded-full transition-all duration-500" style={{ width: '75%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logged Meal Timeline */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-dark-400 uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-dark-400" /> Today&apos;s Logged Timeline
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-dark-800/40 border border-white/5 flex items-center justify-between">
            <div>
              <div className="font-semibold text-white">Breakfast • 08:30</div>
              <div className="text-[10px] text-dark-400">Eggs & Toast (420 kcal)</div>
            </div>
            <CheckCircle className="w-4 h-4 text-primary-400" />
          </div>

          <div className="p-2.5 rounded-xl bg-dark-800/40 border border-white/5 flex items-center justify-between">
            <div>
              <div className="font-semibold text-white">Lunch • 13:00</div>
              <div className="text-[10px] text-dark-400">Chicken Rice (650 kcal)</div>
            </div>
            <CheckCircle className="w-4 h-4 text-primary-400" />
          </div>
        </div>
      </div>
    </div>
  )
}
