'use client'

import React, { useState } from 'react'
import { User, Flame, Sparkles, CheckCircle2 } from 'lucide-react'

export function StepProfileVisualizer() {
  const [goal, setGoal] = useState<'loss' | 'muscle' | 'maint'>('muscle')
  const [weight, setWeight] = useState<number>(75)
  const [height, setHeight] = useState<number>(180)

  // Dynamic calculations for preview
  const baseCalories = Math.round(weight * 22 + height * 5)
  const goalMultiplier = goal === 'muscle' ? 1.15 : goal === 'loss' ? 0.85 : 1.0
  const totalCalories = Math.round(baseCalories * goalMultiplier)
  const protein = Math.round(weight * (goal === 'muscle' ? 2.2 : 1.8))
  const carbs = Math.round((totalCalories * 0.45) / 4)
  const fats = Math.round((totalCalories * 0.25) / 9)

  return (
    <div className="space-y-6">
      {/* Visualizer header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-300">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Live Onboarding Preview</h4>
            <p className="text-xs text-dark-400">Test how AI estimates your exact biometrics</p>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-400/20 text-xs font-semibold text-primary-300 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 animate-pulse" />
          Live Calculator
        </div>
      </div>

      {/* Goal Selector Buttons */}
      <div>
        <label className="text-xs font-medium text-dark-300 mb-2 block uppercase tracking-wider">Select Fitness Goal</label>
        <div className="grid grid-cols-3 gap-2">
          {([
            { id: 'muscle', label: 'Muscle Gain', icon: '💪' },
            { id: 'loss', label: 'Fat Loss', icon: '🔥' },
            { id: 'maint', label: 'Maintain', icon: '⚡' },
          ] as const).map((item) => (
            <button
              key={item.id}
              onClick={() => setGoal(item.id)}
              className={`p-3 rounded-xl border text-xs font-medium transition-all flex flex-col items-center gap-1 ${
                goal === item.id
                  ? 'bg-primary-500/20 border-primary-400 text-white shadow-lg shadow-primary-500/10 scale-[1.02]'
                  : 'bg-dark-800/60 border-white/5 text-dark-400 hover:border-white/20 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Metric Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-dark-800/40 p-3.5 rounded-xl border border-white/5 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-dark-400">Weight</span>
            <span className="text-primary-300 font-bold">{weight} kg</span>
          </div>
          <input
            type="range"
            min="50"
            max="120"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full accent-primary-400 h-1.5 bg-dark-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="bg-dark-800/40 p-3.5 rounded-xl border border-white/5 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-dark-400">Height</span>
            <span className="text-primary-300 font-bold">{height} cm</span>
          </div>
          <input
            type="range"
            min="150"
            max="210"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full accent-primary-400 h-1.5 bg-dark-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Calculated Output Card */}
      <div className="bg-gradient-to-br from-primary-950/40 via-dark-800/80 to-dark-900/90 p-4 rounded-2xl border border-primary-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[11px] text-primary-300 font-semibold uppercase tracking-wider">Estimated Daily Energy</div>
            <div className="text-2xl font-display font-bold text-white flex items-center gap-2">
              {totalCalories} <span className="text-xs text-dark-400 font-normal">kcal / day</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-primary-500/20 border border-primary-400/30 flex items-center justify-center text-primary-300">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        {/* Macro split pill bar */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-dark-900/60 p-2.5 rounded-xl border border-white/5 text-center">
            <div className="text-[10px] text-dark-400 uppercase">Protein</div>
            <div className="text-sm font-bold text-primary-300">{protein}g</div>
          </div>
          <div className="bg-dark-900/60 p-2.5 rounded-xl border border-white/5 text-center">
            <div className="text-[10px] text-dark-400 uppercase">Carbs</div>
            <div className="text-sm font-bold text-energy-300">{carbs}g</div>
          </div>
          <div className="bg-dark-900/60 p-2.5 rounded-xl border border-white/5 text-center">
            <div className="text-[10px] text-dark-400 uppercase">Fats</div>
            <div className="text-sm font-bold text-coral-400">{fats}g</div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-dark-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-primary-400" />
          <span>Profile ready! Instant AI plan generation initialized.</span>
        </div>
      </div>
    </div>
  )
}
