'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { ChevronRight, BarChart3 } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'

export function NutrientBreakdown() {
  const { targetMacros, meals, dailyCalories } = useNutritionStore()

  const eatenMeals = meals.filter((m) => m.eaten)
  const consumedProtein = eatenMeals.reduce((acc, m) => acc + m.foods.reduce((fAcc, f) => fAcc + (f.protein || 0), 0), 0)
  const consumedCarbs = eatenMeals.reduce((acc, m) => acc + m.foods.reduce((fAcc, f) => fAcc + (f.carbs || 0), 0), 0)
  const consumedFat = eatenMeals.reduce((acc, m) => acc + m.foods.reduce((fAcc, f) => fAcc + (f.fat || 0), 0), 0)

  const [viewMode, setViewMode] = useState<'consumed' | 'target'>('target')

  const data = viewMode === 'target'
    ? [
        { name: 'Carbs', value: targetMacros.carbs, grams: `${targetMacros.carbs}g`, color: '#f97316' },
        { name: 'Protein', value: targetMacros.protein, grams: `${targetMacros.protein}g`, color: '#a855f7' },
        { name: 'Fat', value: targetMacros.fat, grams: `${targetMacros.fat}g`, color: '#00d4ff' },
      ]
    : [
        { name: 'Carbs', value: consumedCarbs || 1, grams: `${consumedCarbs}g`, color: '#f97316' },
        { name: 'Protein', value: consumedProtein || 1, grams: `${consumedProtein}g`, color: '#a855f7' },
        { name: 'Fat', value: consumedFat || 1, grams: `${consumedFat}g`, color: '#00d4ff' },
      ]

  const totalCals = viewMode === 'target'
    ? dailyCalories
    : eatenMeals.reduce((acc, m) => acc + m.totalCalories, 0)

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
          <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center">
            <BarChart3 className="w-4.5 h-4.5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">Macro Split</h3>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Nutrient distribution</p>
          </div>
        </div>

        {/* Toggle */}
        <div className="flex items-center bg-white/[0.04] p-0.5 rounded-lg border border-white/[0.06]">
          <button
            onClick={() => setViewMode('target')}
            className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all duration-200 ${
              viewMode === 'target'
                ? 'bg-purple-500 text-white shadow-[0_0_8px_rgba(168,85,247,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Target
          </button>
          <button
            onClick={() => setViewMode('consumed')}
            className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all duration-200 ${
              viewMode === 'consumed'
                ? 'bg-emerald-500 text-white shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Logged
          </button>
        </div>
      </div>

      {/* Donut + Legend */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 flex-1">
        {/* Donut */}
        <div className="relative w-36 h-36 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={44}
                outerRadius={64}
                paddingAngle={4}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-xl font-black text-white leading-none tracking-tight">
              {totalCals}
            </span>
            <span className="text-[10px] text-slate-400 font-bold mt-0.5">kcal</span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-2 flex-1 w-full min-w-0">
          {data.map((item) => (
            <div
              key={item.name}
              className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: item.color }}
                />
                <span className="text-slate-200 font-semibold truncate">{item.name}</span>
              </div>
              <span className="text-white font-black">{item.grams}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Link href="/dashboard/nutrition" className="block mt-3">
        <button
          className="w-full py-2 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.08]"
          style={{ background: 'rgba(15, 23, 42, 0.6)' }}
        >
          <span>View Full Breakdown</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </Link>
    </div>
  )
}
