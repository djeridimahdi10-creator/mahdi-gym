'use client'

import React, { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { TrendingUp, CheckCircle2 } from 'lucide-react'

const DATA_7D = [
  { day: 'Mon', cal: 1820, protein: 140, weight: 84.2, water: 2.8 },
  { day: 'Tue', cal: 2100, protein: 165, weight: 84.0, water: 3.1 },
  { day: 'Wed', cal: 1950, protein: 150, weight: 83.8, water: 2.9 },
  { day: 'Thu', cal: 2350, protein: 180, weight: 83.9, water: 3.4 },
  { day: 'Fri', cal: 1780, protein: 135, weight: 83.6, water: 2.7 },
  { day: 'Sat', cal: 2050, protein: 160, weight: 83.5, water: 3.2 },
  { day: 'Sun', cal: 1950, protein: 170, weight: 83.3, water: 3.0 },
]

const DATA_14D = [
  ...DATA_7D.map((d, i) => ({ ...d, day: `W1-${d.day}` })),
  { day: 'W2-Mon', cal: 1900, protein: 155, weight: 83.2, water: 3.1 },
  { day: 'W2-Tue', cal: 2050, protein: 160, weight: 83.1, water: 3.0 },
  { day: 'W2-Wed', cal: 1980, protein: 150, weight: 83.0, water: 3.2 },
  { day: 'W2-Thu', cal: 2200, protein: 175, weight: 82.9, water: 3.5 },
  { day: 'W2-Fri', cal: 1850, protein: 145, weight: 82.8, water: 2.9 },
  { day: 'W2-Sat', cal: 2150, protein: 165, weight: 82.7, water: 3.3 },
  { day: 'W2-Sun', cal: 2000, protein: 170, weight: 82.6, water: 3.1 },
]

export function WeeklyProgressChart() {
  const [metric, setMetric] = useState<'cal' | 'protein' | 'weight' | 'water'>('cal')
  const [timeRange, setTimeRange] = useState<'7' | '14'>('7')

  const metricConfigs = {
    cal: { label: 'Calories', color: '#f97316', unit: 'kcal' },
    protein: { label: 'Protein', color: '#a855f7', unit: 'g' },
    weight: { label: 'Weight', color: '#10b981', unit: 'kg' },
    water: { label: 'Water', color: '#00d4ff', unit: 'L' },
  }

  const activeConfig = metricConfigs[metric]
  const currentData = timeRange === '7' ? DATA_7D : DATA_14D

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
          <div className="w-9 h-9 rounded-xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center">
            <TrendingUp className="w-4.5 h-4.5 text-orange-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">Progress Trends</h3>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Weekly analytics</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {/* Time Range */}
        <div className="flex items-center p-0.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
          {(['7', '14'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all duration-200 ${
                timeRange === r
                  ? 'bg-slate-800 text-white border border-white/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}D
            </button>
          ))}
        </div>

        {/* Metrics */}
        <div className="flex items-center p-0.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
          {(['cal', 'protein', 'weight', 'water'] as const).map((m) => {
            const cfg = metricConfigs[m]
            const isActive = metric === m
            return (
              <button
                key={m}
                onClick={() => setMetric(m)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all duration-200 ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
                style={
                  isActive
                    ? { background: cfg.color, boxShadow: `0 2px 8px ${cfg.color}40` }
                    : {}
                }
              >
                {cfg.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData} margin={{ top: 10, right: 10, bottom: 0, left: -24 }}>
            <defs>
              <linearGradient id="chartGradDynamic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={activeConfig.color} stopOpacity={0.4} />
                <stop offset="100%" stopColor={activeConfig.color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: 'rgba(11, 17, 31, 0.95)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '10px',
                fontSize: '12px',
                color: '#fff',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              }}
              formatter={(val) => [`${val ?? 0} ${activeConfig.unit}`, activeConfig.label]}
            />
            <Area
              type="monotone"
              dataKey={metric}
              stroke={activeConfig.color}
              strokeWidth={2.5}
              fill="url(#chartGradDynamic)"
              dot={{ fill: activeConfig.color, r: 3, strokeWidth: 0 }}
              activeDot={{ fill: '#fff', r: 4.5, stroke: activeConfig.color, strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Consistency Banner */}
      <div
        className="mt-3 p-2.5 rounded-xl flex items-center gap-2"
        style={{
          background: 'rgba(16, 185, 129, 0.06)',
          border: '1px solid rgba(16, 185, 129, 0.12)',
        }}
      >
        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <p className="text-[11px] text-slate-300">
          <strong className="text-white font-semibold">Streak on track:</strong> Hit target on 6 of 7 days this cycle.
        </p>
      </div>
    </div>
  )
}
