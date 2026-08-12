'use client'

import { motion } from 'framer-motion'
import { Trophy, TrendingUp, Zap, Activity } from 'lucide-react'
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from 'recharts'

const PERSONAL_RECORDS = [
  { label: 'Bench Press', value: '100 kg', trend: '+5kg',  color: '#FF5C8D', icon: '🏋️' },
  { label: 'Deadlift',    value: '160 kg', trend: '+10kg', color: '#00F0FF', icon: '⚡' },
  { label: 'Squat',       value: '120 kg', trend: '+8kg',  color: '#7C5CFC', icon: '🦵' },
  { label: 'OHP',         value: '70 kg',  trend: '+3kg',  color: '#FFB300', icon: '🔥' },
]

const RADAR_DATA = [
  { muscle: 'Chest',     value: 78 },
  { muscle: 'Back',      value: 85 },
  { muscle: 'Shoulders', value: 62 },
  { muscle: 'Arms',      value: 71 },
  { muscle: 'Legs',      value: 58 },
  { muscle: 'Core',      value: 66 },
]

const VOLUME_DATA = [
  { day: 'Mon', vol: 8400 },
  { day: 'Tue', vol: 6200 },
  { day: 'Wed', vol: 0 },
  { day: 'Thu', vol: 5100 },
  { day: 'Fri', vol: 9800 },
  { day: 'Sat', vol: 4300 },
  { day: 'Sun', vol: 7600 },
]

export function StrengthAnalytics() {
  return (
    <div id="strength-analytics-section" className="space-y-4">
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(255,179,0,0.08)', border: '1px solid rgba(255,179,0,0.15)' }}
        >
          <Trophy className="w-4 h-4 text-[#FFB300]" />
        </div>
        <div>
          <h2 className="text-white font-semibold text-sm">Strength Analytics & Records</h2>
          <p className="text-slate-500 text-[11px]">1RM benchmarks, muscle symmetry & tonnage</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Personal Records Grid */}
        <div className="lg:col-span-4 rounded-2xl p-5 space-y-3" style={{ background: 'rgba(17,23,36,0.90)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-white font-semibold text-xs flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5 text-[#FFB300]" />
              Personal Best (1RM)
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {PERSONAL_RECORDS.map((pr, index) => (
              <motion.div
                key={pr.label}
                className="rounded-xl p-3 cursor-pointer transition-all hover:scale-105"
                style={{ background: `${pr.color}0D`, border: `1px solid ${pr.color}22` }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="text-lg mb-1">{pr.icon}</div>
                <p className="text-white font-bold text-base leading-none tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{pr.value}</p>
                <p className="text-slate-400 text-[10px] mt-0.5">{pr.label}</p>
                <span className="inline-flex items-center gap-0.5 text-[9px] font-bold mt-1" style={{ color: '#10b981' }}>
                  <TrendingUp className="w-2.5 h-2.5" /> {pr.trend}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Charts: Radar + Volume Bar */}
        <div className="lg:col-span-8 rounded-2xl p-5 space-y-3" style={{ background: 'rgba(17,23,36,0.90)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-white font-semibold text-xs flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#7C5CFC]" />
              Muscle Symmetry & Volume Progress
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Radar chart */}
            <div>
              <p className="text-slate-400 text-[10px] mb-2 flex items-center gap-1">
                <Activity className="w-3 h-3 text-[#00F0FF]" /> Muscle Balance Index
              </p>
              <ResponsiveContainer width="100%" height={160}>
                <RadarChart data={RADAR_DATA}>
                  <PolarGrid stroke="rgba(255,255,255,0.07)" />
                  <PolarAngleAxis dataKey="muscle" tick={{ fill: '#475569', fontSize: 9 }} />
                  <Radar dataKey="value" stroke="#00F0FF" fill="#00F0FF" fillOpacity={0.14} strokeWidth={1.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Volume bar chart */}
            <div>
              <p className="text-slate-400 text-[10px] mb-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-[#7C5CFC]" /> Weekly Volume (kg)
              </p>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={VOLUME_DATA} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                  <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: 'rgba(13,18,30,0.95)', border: '1px solid rgba(0,240,255,0.15)', borderRadius: '8px', fontSize: '11px', color: '#e2e8f0' }}
                    cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                  />
                  <Bar dataKey="vol" radius={[4, 4, 0, 0]}>
                    {VOLUME_DATA.map((entry, i) => (
                      <Cell key={i} fill={entry.vol === 0 ? '#1e293b' : i === 4 ? '#00F0FF' : '#7C5CFC'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
