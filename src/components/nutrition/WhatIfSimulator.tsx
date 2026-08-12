'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sliders, TrendingUp, Sparkles, Activity } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'
import { useNutritionStore } from '@/stores/nutritionStore'
import { useAuthStore } from '@/stores/authStore'

export function WhatIfSimulator() {
  const { whatIfModalOpen, setModalOpen, dailyCalories, targetMacros } = useNutritionStore()
  const { profile } = useAuthStore()

  const [calSurplus, setCalSurplus] = useState(300) // +300 kcal/day
  const [proteinTarget, setProteinTarget] = useState(190) // 190g/day
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState(4)

  if (!whatIfModalOpen) return null

  const currentWeight = profile?.weight || 78.0

  // Calculate 12-week weight & muscle trajectory projection
  const weeklyCalorieSurplus = calSurplus * 7
  const weeklyWeightGainKg = (weeklyCalorieSurplus / 7700) // ~7700 kcal per kg of mass

  // Higher protein & workout frequency yields higher muscle ratio vs fat ratio
  const muscleRatio = Math.min(0.75, 0.4 + (proteinTarget / 250) * 0.2 + (workoutsPerWeek / 7) * 0.2)

  const trajectoryData = Array.from({ length: 13 }, (_, week) => {
    const totalGain = weeklyWeightGainKg * week
    const muscleGain = totalGain * muscleRatio
    const fatGain = totalGain * (1 - muscleRatio)
    return {
      week: `W${week}`,
      weight: parseFloat((currentWeight + totalGain).toFixed(1)),
      muscle: parseFloat((muscleGain).toFixed(1)),
      fat: parseFloat((fatGain).toFixed(1)),
    }
  })

  const projectedWeightWeek12 = trajectoryData[12].weight
  const projectedMuscleGain = trajectoryData[12].muscle

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          className="relative w-full max-w-3xl rounded-3xl p-6 space-y-5 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(12,18,34,0.98) 0%, rgba(8,12,24,0.98) 100%)',
            border: '1px solid rgba(168,85,247,0.3)',
            boxShadow: '0 0 50px rgba(168,85,247,0.1)',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center border border-purple-500/30">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  What-If Nutrition Simulator
                </h2>
                <p className="text-slate-400 text-xs">Simulate dietary adjustments and project 12-week body composition outcomes</p>
              </div>
            </div>

            <button
              onClick={() => setModalOpen('whatif', false)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Calorie Delta */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Daily Calorie Delta</span>
                <span className="text-[#00F0FF] font-bold tabular-nums">
                  {calSurplus > 0 ? `+${calSurplus}` : calSurplus} kcal
                </span>
              </div>
              <input
                type="range"
                min="-500"
                max="800"
                step="50"
                value={calSurplus}
                onChange={(e) => setCalSurplus(Number(e.target.value))}
                className="w-full accent-[#00F0FF]"
              />
              <p className="text-[10px] text-slate-500">Target: {dailyCalories + calSurplus} kcal/day</p>
            </div>

            {/* Protein Target */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Daily Protein Intake</span>
                <span className="text-amber-400 font-bold tabular-nums">{proteinTarget}g/day</span>
              </div>
              <input
                type="range"
                min="120"
                max="260"
                step="5"
                value={proteinTarget}
                onChange={(e) => setProteinTarget(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
              <p className="text-[10px] text-slate-500">{(proteinTarget / currentWeight).toFixed(1)}g per kg bodyweight</p>
            </div>

            {/* Workout Frequency */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Training Frequency</span>
                <span className="text-purple-400 font-bold tabular-nums">{workoutsPerWeek} days/week</span>
              </div>
              <input
                type="range"
                min="2"
                max="6"
                step="1"
                value={workoutsPerWeek}
                onChange={(e) => setWorkoutsPerWeek(Number(e.target.value))}
                className="w-full accent-purple-400"
              />
              <p className="text-[10px] text-slate-500">Hypertrophy stimulus rating: {Math.round(muscleRatio * 100)}%</p>
            </div>
          </div>

          {/* 12-Week Trajectory Chart */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white font-bold flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                Projected 12-Week Trajectory (Estimates based on recent data)
              </span>
              <div className="flex items-center gap-3">
                <span className="text-purple-300 font-bold">
                  Weight: {currentWeight}kg ➔ {projectedWeightWeek12}kg
                </span>
                <span className="text-emerald-400 font-bold">
                  (+{projectedMuscleGain}kg muscle)
                </span>
              </div>
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trajectoryData}>
                  <defs>
                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="week" stroke="#475569" fontSize={10} />
                  <YAxis domain={['auto', 'auto']} stroke="#475569" fontSize={10} />
                  <Tooltip
                    contentStyle={{ background: '#0b0f19', borderColor: '#a855f7', borderRadius: 12, fontSize: 11 }}
                  />
                  <Area type="monotone" dataKey="weight" stroke="#a855f7" fillOpacity={1} fill="url(#colorWeight)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
