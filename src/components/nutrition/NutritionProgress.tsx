'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Activity, CheckCircle2, Lock, ChevronDown, Sparkles } from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from 'recharts'

interface NutritionProgressProps {
  targetCalories: number
}

const WEEKLY_LOG = [
  { day: 'Mon', pct: 97, meals: 5, logged: true },
  { day: 'Tue', pct: 88, meals: 4, logged: true },
  { day: 'Wed', pct: 102, meals: 5, logged: true },
  { day: 'Thu', pct: 74, meals: 3, logged: false },
  { day: 'Fri', pct: 0,  meals: 0, logged: false },
  { day: 'Sat', pct: 0,  meals: 0, logged: false },
  { day: 'Sun', pct: 0,  meals: 0, logged: false },
]

const CALORIE_TIMELINE = [
  { time: '7:30', cumulative: 620,  meal: 'Breakfast' },
  { time: '10:00', cumulative: 620, meal: '' },
  { time: '12:30', cumulative: 1400, meal: 'Lunch' },
  { time: '14:00', cumulative: 1400, meal: '' },
  { time: '15:30', cumulative: 1740, meal: 'Snack' },
  { time: '17:00', cumulative: 1740, meal: '' },
  { time: '19:00', cumulative: 2590, meal: 'Dinner' },
  { time: '21:00', cumulative: 2850, meal: 'Eve Snack' },
]

const MICRO_RADAR = [
  { nutrient: 'Vit D', value: 88 },
  { nutrient: 'Zinc', value: 92 },
  { nutrient: 'Iron', value: 76 },
  { nutrient: 'Omega-3', value: 95 },
  { nutrient: 'Fiber', value: 82 },
  { nutrient: 'Calcium', value: 70 },
]

export function NutritionProgress({ targetCalories }: NutritionProgressProps) {
  const [showMicros, setShowMicros] = useState(false)

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)' }}
          >
            <TrendingUp className="w-4 h-4 text-[#10b981]" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-sm">Nutrition Progress</h2>
            <p className="text-slate-500 text-[11px]">Adherence & intake velocity</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Weekly Adherence (7 day strip) */}
        <motion.div
          className="lg:col-span-6 rounded-2xl p-5"
          style={{ background: 'rgba(17,23,36,0.90)', border: '1px solid rgba(255,255,255,0.08)' }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-xs flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-[#10b981]" />
              Weekly Adherence
            </h3>
            <span className="text-slate-500 text-[10px]">3 / 7 days completed</span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {WEEKLY_LOG.map((d, i) => {
              const isToday = i === 3
              const color = d.pct >= 95 ? '#10b981' : d.pct >= 75 ? '#FFB300' : d.pct > 0 ? '#FF5C8D' : '#1e293b'
              return (
                <div key={d.day} className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-full rounded-xl flex flex-col items-center py-2.5 gap-0.5 transition-all cursor-pointer hover:scale-105 relative"
                    style={{
                      background: d.pct > 0 ? `${color}15` : 'rgba(255,255,255,0.02)',
                      border: isToday ? `2px solid ${color}50` : `1px solid ${d.pct > 0 ? color + '25' : 'rgba(255,255,255,0.06)'}`,
                      boxShadow: isToday ? `0 0 16px ${color}20` : 'none',
                    }}
                  >
                    {isToday && (
                      <span className="absolute -top-2 text-[8px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: color, color: '#0B0F19' }}>NOW</span>
                    )}
                    <span className="text-[10px] font-bold" style={{ color: d.pct > 0 ? color : '#334155' }}>{d.day}</span>
                    {d.pct > 0 ? (
                      <>
                        <span className="text-white text-xs font-bold">{d.pct}%</span>
                        <span className="text-slate-500 text-[9px]">{d.meals}m</span>
                        {d.pct >= 95 && <CheckCircle2 className="w-3 h-3" style={{ color }} />}
                      </>
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-700 mt-1" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Calorie Timeline Chart */}
        <motion.div
          className="lg:col-span-6 rounded-2xl p-5"
          style={{ background: 'rgba(17,23,36,0.90)', border: '1px solid rgba(255,255,255,0.08)' }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold text-xs flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#00F0FF]" />
              Calorie Intake Curve
            </h3>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[9px] text-slate-400">
                <span className="w-4 border-t border-[#00F0FF] border-solid" /> Intake
              </span>
              <span className="flex items-center gap-1 text-[9px] text-slate-400">
                <span className="w-4 border-t border-[#FFB300] border-dashed" /> Target
              </span>
            </div>
          </div>

          <div style={{ height: '140px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CALORIE_TIMELINE} margin={{ top: 4, right: 10, bottom: 0, left: -25 }}>
                <defs>
                  <linearGradient id="progCalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00F0FF" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#00F0FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="time" tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} domain={[0, targetCalories + 200]} />
                <Tooltip
                  contentStyle={{ background: 'rgba(13,18,30,0.95)', border: '1px solid rgba(0,240,255,0.15)', borderRadius: '10px', fontSize: '11px', color: '#e2e8f0', padding: '6px 10px' }}
                  cursor={{ stroke: 'rgba(0,240,255,0.15)', strokeWidth: 1 }}
                  formatter={(val: unknown) => [`${val} kcal`, 'Calories']}
                />
                <Area type="monotone" dataKey={() => targetCalories} stroke="#FFB300" strokeDasharray="5 3" strokeWidth={1.5} fill="none" dot={false} activeDot={false} />
                <Area type="monotone" dataKey="cumulative" stroke="#00F0FF" strokeWidth={2} fill="url(#progCalGrad)"
                  dot={{ fill: '#00F0FF', r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: '#00F0FF', strokeWidth: 2, stroke: 'rgba(0,240,255,0.3)' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Collapsible Micronutrients Toggle */}
      <div className="pt-1">
        <button
          onClick={() => setShowMicros(!showMicros)}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors py-1"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFB300]" />
          <span>{showMicros ? 'Hide Micronutrient Radar' : 'Show Micronutrient Breakdown (Vit D, Iron, Zinc)'}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showMicros ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {showMicros && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-3"
            >
              <div
                className="rounded-2xl p-5 grid grid-cols-1 md:grid-cols-12 gap-5 items-center"
                style={{ background: 'rgba(17,23,36,0.90)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="md:col-span-5 h-[180px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={180}>
                    <RadarChart data={MICRO_RADAR}>
                      <PolarGrid stroke="rgba(255,255,255,0.07)" />
                      <PolarAngleAxis dataKey="nutrient" tick={{ fill: '#64748b', fontSize: 10 }} />
                      <Radar dataKey="value" stroke="#FFB300" fill="#FFB300" fillOpacity={0.14} strokeWidth={1.5} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="md:col-span-7 space-y-2">
                  {MICRO_RADAR.map((n) => (
                    <div key={n.nutrient} className="flex items-center gap-3">
                      <span className="text-slate-400 text-xs w-20 flex-shrink-0">{n.nutrient}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-white/8">
                        <div className="h-full rounded-full" style={{ width: `${n.value}%`, background: n.value >= 90 ? '#10b981' : n.value >= 70 ? '#FFB300' : '#FF5C8D' }} />
                      </div>
                      <span className="text-xs font-bold text-slate-300 w-10 text-right">{n.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
