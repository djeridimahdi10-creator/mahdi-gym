'use client'

import { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { TrendingUp, CheckCircle2, ChevronDown } from 'lucide-react'

const weeklyData = [
  { day: 'Mon', cal: 1820, protein: 140, weight: 84.2 },
  { day: 'Tue', cal: 2100, protein: 165, weight: 84.0 },
  { day: 'Wed', cal: 1950, protein: 150, weight: 83.8 },
  { day: 'Thu', cal: 2350, protein: 180, weight: 83.9 },
  { day: 'Fri', cal: 1780, protein: 135, weight: 83.6 },
  { day: 'Sat', cal: 2050, protein: 160, weight: 83.5 },
  { day: 'Sun', cal: 1520, protein: 105, weight: 83.4 },
]

export function WeeklyProgressChart() {
  const [metric, setMetric] = useState<'cal' | 'protein' | 'weight'>('cal')

  const metricConfigs = {
    cal: { label: 'Calories', color: '#f97316', unit: 'kcal' },
    protein: { label: 'Protein', color: '#a855f7', unit: 'g' },
    weight: { label: 'Weight', color: '#10b981', unit: 'kg' },
  }

  const activeConfig = metricConfigs[metric]

  return (
    <div
      className="p-6 rounded-2xl flex flex-col justify-between h-full space-y-4"
      style={{
        background: 'rgba(11, 17, 31, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-white tracking-wide">Weekly Progress</h3>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Time Selector Dropdown */}
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300"
            style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <span>7 Days</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {/* Metric Selector Pills */}
          <div
            className="flex items-center p-0.5 rounded-lg"
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {(['cal', 'protein', 'weight'] as const).map((m) => {
              const cfg = metricConfigs[m]
              const isActive = metric === m
              return (
                <button
                  key={m}
                  onClick={() => setMetric(m)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                  style={
                    isActive
                      ? {
                          background: cfg.color,
                          boxShadow: `0 2px 12px ${cfg.color}60`,
                        }
                      : {}
                  }
                >
                  {cfg.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Area Chart Container */}
      <div className="h-56 sm:h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeklyData} margin={{ top: 12, right: 12, bottom: 0, left: -22 }}>
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={activeConfig.color} stopOpacity={0.4} />
                <stop offset="100%" stopColor={activeConfig.color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: 'rgba(11, 17, 31, 0.95)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '12px',
                fontSize: '12px',
                color: '#fff',
                boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
              }}
              formatter={(val) => [`${val ?? 0} ${activeConfig.unit}`, activeConfig.label]}
            />
            <Area
              type="monotone"
              dataKey={metric}
              stroke={activeConfig.color}
              strokeWidth={3}
              fill="url(#chartGrad)"
              dot={{ fill: activeConfig.color, r: 4, strokeWidth: 0 }}
              activeDot={{ fill: '#fff', r: 6, stroke: activeConfig.color, strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Consistency Banner */}
      <div
        className="p-3.5 rounded-xl flex items-center gap-3"
        style={{
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.18)',
        }}
      >
        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <p className="text-xs sm:text-sm text-slate-300">
          <strong className="text-white font-semibold">Great consistency!</strong> You hit your target on 5 out of 7 days this week.
        </p>
      </div>
    </div>
  )
}
