'use client'

import Link from 'next/link'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Droplet, ChevronDown, ChevronRight } from 'lucide-react'

const nutrientData = [
  { name: 'Carbs', value: 45, grams: '171g', color: '#f97316' },
  { name: 'Protein', value: 25, grams: '98g', color: '#a855f7' },
  { name: 'Fat', value: 25, grams: '42g', color: '#3b82f6' },
  { name: 'Others', value: 5, grams: '20g', color: '#00d4ff' },
]

export function NutrientBreakdown() {
  return (
    <div
      className="p-6 rounded-2xl flex flex-col justify-between h-full space-y-4"
      style={{
        background: 'rgba(11, 17, 31, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Droplet className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-white tracking-wide">Nutrient Breakdown</h3>
        </div>

        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300"
          style={{
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <span>Today</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Donut Chart & Legend Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2 flex-1">
        {/* Donut Chart with Center Text */}
        <div className="relative w-44 h-44 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={nutrientData}
                innerRadius={54}
                outerRadius={74}
                paddingAngle={4}
                dataKey="value"
                strokeWidth={0}
              >
                {nutrientData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black text-white leading-none tracking-tight">1520</span>
            <span className="text-xs text-slate-400 font-semibold mt-1">kcal</span>
          </div>
        </div>

        {/* Legend List */}
        <div className="space-y-3 flex-1 w-full min-w-0">
          {nutrientData.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ background: item.color }}
                />
                <span className="text-slate-200 font-medium truncate">{item.name}</span>
              </div>
              <span className="text-slate-300 font-bold ml-2">
                {item.value}% <span className="text-slate-400 text-xs font-normal">({item.grams})</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Link */}
      <Link href="/dashboard/nutrition" className="block pt-1">
        <button
          className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all text-slate-300 hover:text-white hover:bg-white/[0.06]"
          style={{
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <span>View Full Nutrition Report</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </Link>
    </div>
  )
}
