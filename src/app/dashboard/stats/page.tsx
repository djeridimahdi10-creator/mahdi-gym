'use client'

import { useState, useEffect, useRef } from 'react'
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ReferenceLine,
  Legend,
} from 'recharts'
import {
  Flame,
  TrendingUp,
  Target,
  Activity,
  BarChart3,
  Zap,
  Trophy,
  Star,
  Award,
  Dumbbell,
  Moon,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  Sparkles,
  CheckCircle2,
  Calendar,
} from 'lucide-react'

/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */
const WEEKLY = [
  { day: 'Mon', calories: 1850, target: 2200, protein: 140, carbs: 195, fat: 58, workout: true,  sleep: 7.2, hydration: 2.8 },
  { day: 'Tue', calories: 2100, target: 2200, protein: 165, carbs: 220, fat: 72, workout: true,  sleep: 6.8, hydration: 3.1 },
  { day: 'Wed', calories: 1950, target: 2200, protein: 150, carbs: 205, fat: 64, workout: false, sleep: 8.1, hydration: 2.5 },
  { day: 'Thu', calories: 2200, target: 2200, protein: 170, carbs: 240, fat: 75, workout: true,  sleep: 7.5, hydration: 3.4 },
  { day: 'Fri', calories: 1800, target: 2200, protein: 135, carbs: 185, fat: 55, workout: true,  sleep: 6.5, hydration: 2.2 },
  { day: 'Sat', calories: 2050, target: 2200, protein: 155, carbs: 215, fat: 68, workout: true,  sleep: 9.0, hydration: 3.0 },
  { day: 'Sun', calories: 1520, target: 2200, protein: 98,  carbs: 142, fat: 41, workout: false, sleep: 7.8, hydration: 1.8 },
]

const MONTHLY_CALORIES = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  val: Math.floor(1700 + Math.random() * 800),
  workout: Math.random() > 0.35,
}))

const WEIGHT_TREND = [
  { week: 'W1',  weight: 84.2, fat: 18.2, muscle: 68.1 },
  { week: 'W2',  weight: 83.8, fat: 17.8, muscle: 68.3 },
  { week: 'W3',  weight: 83.5, fat: 17.5, muscle: 68.5 },
  { week: 'W4',  weight: 83.1, fat: 17.1, muscle: 68.8 },
  { week: 'W5',  weight: 82.9, fat: 16.8, muscle: 69.0 },
  { week: 'W6',  weight: 82.6, fat: 16.4, muscle: 69.3 },
  { week: 'W7',  weight: 82.3, fat: 16.1, muscle: 69.6 },
  { week: 'W8',  weight: 82.0, fat: 15.9, muscle: 69.8 },
]

const RADAR_DATA = [
  { cat: 'Nutrition',  score: 87 },
  { cat: 'Training',   score: 92 },
  { cat: 'Sleep',      score: 71 },
  { cat: 'Hydration',  score: 65 },
  { cat: 'Recovery',   score: 78 },
  { cat: 'Adherence',  score: 83 },
]

const ACHIEVEMENTS = [
  { id: 1, title: '7-Day Streak',      desc: 'Logged every meal for 7 days',   icon: '🔥', color: '#FF5C8D', unlocked: true  },
  { id: 2, title: 'Protein King',      desc: 'Hit protein goal 5 days in a row', icon: '💪', color: '#FFB300', unlocked: true  },
  { id: 3, title: 'Hydration Hero',    desc: '3L+ water for 3 consecutive days', icon: '💧', color: '#00F0FF', unlocked: true  },
  { id: 4, title: 'Iron Lifter',       desc: 'Deadlift 160kg personal record',   icon: '🏋️', color: '#A855F7', unlocked: true  },
  { id: 5, title: 'Sleep Master',      desc: '8h+ sleep for 5 nights',           icon: '🌙', color: '#60a5fa', unlocked: false },
  { id: 6, title: 'Century Club',      desc: 'Log 100 consecutive meals',        icon: '🏆', color: '#FFB300', unlocked: false },
]

const PR_LOG = [
  { date: 'Jul 28', lift: 'Deadlift',    weight: 160, prev: 150, delta: +10 },
  { date: 'Jul 24', lift: 'Bench Press', weight: 100, prev: 95,  delta: +5  },
  { date: 'Jul 19', lift: 'Squat',       weight: 120, prev: 112, delta: +8  },
  { date: 'Jul 14', lift: 'OHP',         weight: 70,  prev: 67,  delta: +3  },
  { date: 'Jul 8',  lift: 'Deadlift',    weight: 150, prev: 145, delta: +5  },
]

const SLEEP_DATA = [
  { day: 'Mon', hours: 7.2 },
  { day: 'Tue', hours: 6.8 },
  { day: 'Wed', hours: 8.1 },
  { day: 'Thu', hours: 7.5 },
  { day: 'Fri', hours: 6.5 },
  { day: 'Sat', hours: 9.0 },
  { day: 'Sun', hours: 7.8 },
]

/* ═══════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════ */
function Counter({ target, suffix = '', duration = 1200 }: { target: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0)
  const ref = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const steps = 40
    const inc = target / steps
    let current = 0
    ref.current = setInterval(() => {
      current += inc
      if (current >= target) { setVal(target); clearInterval(ref.current!) }
      else setVal(Math.round(current))
    }, duration / steps)
    return () => clearInterval(ref.current!)
  }, [target, duration])

  return <>{val.toLocaleString()}{suffix}</>
}

/* ═══════════════════════════════════════
   SHARED GLASS CARD
═══════════════════════════════════════ */
function Glass({ children, className = '', style = {} }: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 shadow-2xl shadow-black/40 ${className}`}
      style={{ background: 'rgba(17,23,36,0.90)', backdropFilter: 'blur(20px)', ...style }}
    >
      {children}
    </div>
  )
}

function Dots() {
  return (
    <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/8 text-slate-600 hover:text-slate-400 transition-colors flex-shrink-0">
      <MoreHorizontal className="w-4 h-4" />
    </button>
  )
}

/* ═══════════════════════════════════════
   KPI TICKER STRIP
═══════════════════════════════════════ */
function KPIStrip() {
  const kpis = [
    { label: 'Avg Daily Calories',  value: 1924,  suffix: '',   unit: 'kcal/day', delta: +3.2,  color: '#00F0FF', icon: Flame,    bg: 'rgba(0,240,255,0.07)',   border: 'rgba(0,240,255,0.15)' },
    { label: 'Weekly Protein',      value: 1013,  suffix: 'g',  unit: 'this week', delta: +8.4, color: '#FFB300', icon: Zap,     bg: 'rgba(255,179,0,0.07)',   border: 'rgba(255,179,0,0.15)' },
    { label: 'Training Sessions',   value: 5,     suffix: '',   unit: '/ 7 days',  delta: 0,    color: '#A855F7', icon: Dumbbell,bg: 'rgba(168,85,247,0.07)',  border: 'rgba(168,85,247,0.15)' },
    { label: 'Health Score',        value: 92,    suffix: '%',  unit: 'overall',   delta: +2.1, color: '#10b981', icon: Activity, bg: 'rgba(16,185,129,0.07)', border: 'rgba(16,185,129,0.15)' },
    { label: 'Current Streak',      value: 7,     suffix: '',   unit: 'days',      delta: +7,   color: '#FF5C8D', icon: Star,    bg: 'rgba(255,92,141,0.07)', border: 'rgba(255,92,141,0.15)' },
    { label: 'Body Fat',            value: 15.9,  suffix: '%',  unit: '↓ trend',   delta: -2.3, color: '#60a5fa', icon: Target,  bg: 'rgba(96,165,250,0.07)', border: 'rgba(96,165,250,0.15)' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {kpis.map(({ label, value, suffix, unit, delta, color, icon: Icon, bg, border }) => (
        <div
          key={label}
          className="rounded-2xl p-4 flex flex-col gap-2 group cursor-pointer transition-all duration-300 hover:scale-[1.03]"
          style={{ background: bg, border: `1px solid ${border}`, boxShadow: `0 4px 20px ${color}08` }}
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            {delta !== 0 && (
              <span className="flex items-center gap-0.5 text-[10px] font-bold" style={{ color: delta > 0 ? '#10b981' : '#FF5C8D' }}>
                {delta > 0 ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {Math.abs(delta)}
              </span>
            )}
          </div>
          <div>
            <p className="text-white text-xl font-bold leading-none">
              <Counter target={typeof value === 'number' ? value : parseFloat(value as unknown as string)} suffix={suffix} />
            </p>
            <p className="text-slate-500 text-[10px] mt-1 leading-tight">{label}</p>
            <p className="text-[10px] mt-0.5" style={{ color }}>{unit}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════
   MAIN COMBO CHART
═══════════════════════════════════════ */
function MainComboChart() {
  const [mode, setMode] = useState<'calories' | 'macros' | 'biometrics'>('calories')

  return (
    <Glass className="p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <h2 className="text-white font-semibold text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#00F0FF]" />
            Weekly Performance Overview
          </h2>
          <p className="text-slate-500 text-[11px] mt-0.5">7-day breakdown with goal benchmarks</p>
        </div>
        <div className="flex gap-1 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(17,23,36,0.8)' }}>
          {(['calories', 'macros', 'biometrics'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="px-3 py-1.5 text-[11px] font-semibold capitalize transition-all"
              style={mode === m
                ? { background: 'rgba(0,240,255,0.15)', color: '#00F0FF' }
                : { color: '#64748b' }
              }
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div style={{ height: '260px' }}>
        <ResponsiveContainer width="100%" height="100%">
          {mode === 'calories' ? (
            <ComposedChart data={WEEKLY} margin={{ top: 8, right: 16, bottom: 0, left: -15 }}>
              <defs>
                <linearGradient id="calBarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00F0FF" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#0044BB" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} domain={[1000, 2600]} />
              <Tooltip
                contentStyle={{ background: 'rgba(13,18,30,0.96)', border: '1px solid rgba(0,240,255,0.18)', borderRadius: '12px', fontSize: '12px', color: '#e2e8f0', padding: '8px 12px' }}
                cursor={{ fill: 'rgba(0,240,255,0.04)' }}
              />
              <ReferenceLine y={2200} stroke="#FFB300" strokeDasharray="6 3" strokeWidth={1.5} label={{ value: 'Target 2200', position: 'insideTopRight', fill: '#FFB300', fontSize: 10 }} />
              <Bar dataKey="calories" fill="url(#calBarGrad)" radius={[6, 6, 0, 0]} maxBarSize={48} name="Calories" />
              <Line type="monotone" dataKey="protein" stroke="#FFB300" strokeWidth={2} dot={{ fill: '#FFB300', r: 3, strokeWidth: 0 }} name="Protein (g)" yAxisId={0} />
            </ComposedChart>
          ) : mode === 'macros' ? (
            <ComposedChart data={WEEKLY} margin={{ top: 8, right: 16, bottom: 0, left: -15 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(13,18,30,0.96)', border: '1px solid rgba(255,179,0,0.18)', borderRadius: '12px', fontSize: '12px', color: '#e2e8f0', padding: '8px 12px' }} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#64748b' }} />
              <Bar dataKey="protein" fill="#FFB300" radius={[4, 4, 0, 0]} maxBarSize={20} name="Protein (g)" />
              <Bar dataKey="carbs" fill="#A855F7" radius={[4, 4, 0, 0]} maxBarSize={20} name="Carbs (g)" />
              <Bar dataKey="fat" fill="#FF5C8D" radius={[4, 4, 0, 0]} maxBarSize={20} name="Fat (g)" />
            </ComposedChart>
          ) : (
            <ComposedChart data={WEEKLY} margin={{ top: 8, right: 16, bottom: 0, left: -15 }}>
              <defs>
                <linearGradient id="sleepGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A855F7" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#A855F7" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="hydGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(13,18,30,0.96)', border: '1px solid rgba(168,85,247,0.18)', borderRadius: '12px', fontSize: '12px', color: '#e2e8f0', padding: '8px 12px' }} cursor={{ stroke: 'rgba(168,85,247,0.15)', strokeWidth: 1 }} />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#64748b' }} />
              <Area type="monotone" dataKey="sleep" stroke="#A855F7" strokeWidth={2} fill="url(#sleepGrad)" name="Sleep (h)" />
              <Area type="monotone" dataKey="hydration" stroke="#60a5fa" strokeWidth={2} fill="url(#hydGrad)" name="Water (L)" />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>
    </Glass>
  )
}

/* ═══════════════════════════════════════
   MONTHLY HEATMAP
═══════════════════════════════════════ */
function MonthlyHeatmap() {
  const maxVal = Math.max(...MONTHLY_CALORIES.map((d) => d.val))

  const getColor = (val: number) => {
    const pct = val / maxVal
    if (pct > 0.92) return '#00F0FF'
    if (pct > 0.78) return '#0080CC'
    if (pct > 0.62) return '#0044AA'
    if (pct > 0.45) return '#002277'
    return '#111827'
  }

  const getOpacity = (val: number) => {
    const pct = val / maxVal
    return 0.3 + pct * 0.7
  }

  const weeks = []
  for (let i = 0; i < MONTHLY_CALORIES.length; i += 7) {
    weeks.push(MONTHLY_CALORIES.slice(i, i + 7))
  }

  return (
    <Glass className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-white font-semibold text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#00F0FF]" />
            Monthly Calorie Heatmap
          </h2>
          <p className="text-slate-500 text-[11px] mt-0.5">July 2026 · 30 days</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <span>Low</span>
          <div className="flex gap-1">
            {['#111827', '#002277', '#0044AA', '#0080CC', '#00F0FF'].map((c) => (
              <div key={c} className="w-3 h-3 rounded-sm" style={{ background: c }} />
            ))}
          </div>
          <span>High</span>
        </div>
      </div>

      {/* Day labels */}
      <div className="flex gap-1.5 mb-1 pl-7">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
          <div key={d} className="flex-1 text-center text-[9px] text-slate-600 font-medium">{d}</div>
        ))}
      </div>

      <div className="space-y-1.5">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex items-center gap-1.5">
            <span className="text-[9px] text-slate-700 w-6 text-right flex-shrink-0">W{wi + 1}</span>
            {week.map((d) => (
              <div
                key={d.day}
                className="flex-1 rounded-md transition-all hover:scale-125 cursor-pointer relative group"
                style={{
                  height: '28px',
                  background: getColor(d.val),
                  opacity: getOpacity(d.val),
                  border: d.workout ? '1px solid rgba(255,179,0,0.4)' : '1px solid transparent',
                  boxShadow: d.workout ? '0 0 6px rgba(255,179,0,0.2)' : 'none',
                }}
                title={`Day ${d.day}: ${d.val} kcal${d.workout ? ' 🏋️' : ''}`}
              >
                {d.workout && (
                  <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full" style={{ background: '#FFB300', boxShadow: '0 0 4px rgba(255,179,0,0.8)' }} />
                )}
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded-lg text-[9px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-10" style={{ background: 'rgba(13,18,30,0.95)', border: '1px solid rgba(0,240,255,0.2)', color: '#e2e8f0' }}>
                  {d.val} kcal{d.workout ? ' 🏋️' : ''}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm border border-[#FFB300]/50" style={{ background: 'rgba(255,179,0,0.1)' }} />
          Workout day
        </span>
        <span className="text-slate-600">Avg: 1,924 kcal/day</span>
      </div>
    </Glass>
  )
}

/* ═══════════════════════════════════════
   BODY COMPOSITION TRACKER
═══════════════════════════════════════ */
function BodyCompositionChart() {
  const latest = WEIGHT_TREND[WEIGHT_TREND.length - 1]
  const first = WEIGHT_TREND[0]
  const fatLost = +(first.fat - latest.fat).toFixed(1)
  const muscleGained = +(latest.muscle - first.muscle).toFixed(1)

  return (
    <Glass className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-white font-semibold text-sm flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#A855F7]" />
            Body Composition Trend
          </h2>
          <p className="text-slate-500 text-[11px] mt-0.5">8-week recomposition progress</p>
        </div>
        <Dots />
      </div>

      {/* Quick delta badges */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: 'Weight',  val: `${latest.weight}kg`, delta: `−${+(first.weight - latest.weight).toFixed(1)}kg`, color: '#00F0FF' },
          { label: 'Fat %',   val: `${latest.fat}%`,     delta: `−${fatLost}%`,                                     color: '#FF5C8D' },
          { label: 'Muscle',  val: `${latest.muscle}kg`, delta: `+${muscleGained}kg`,                               color: '#10b981' },
        ].map(({ label, val, delta, color }) => (
          <div key={label} className="rounded-xl p-3 text-center" style={{ background: `${color}0D`, border: `1px solid ${color}20` }}>
            <p className="text-white font-bold text-base">{val}</p>
            <p className="text-[10px] mt-0.5" style={{ color }}>{delta}</p>
            <p className="text-slate-500 text-[9px]">{label}</p>
          </div>
        ))}
      </div>

      <div style={{ height: '170px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={WEIGHT_TREND} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00F0FF" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#00F0FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="week" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} domain={[60, 90]} />
            <Tooltip contentStyle={{ background: 'rgba(13,18,30,0.96)', border: '1px solid rgba(168,85,247,0.18)', borderRadius: '10px', fontSize: '11px', color: '#e2e8f0', padding: '6px 10px' }} />
            <Area type="monotone" dataKey="weight" stroke="#00F0FF" strokeWidth={2} fill="url(#weightGrad)" name="Weight (kg)" />
            <Line type="monotone" dataKey="muscle" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 3, strokeWidth: 0 }} name="Muscle (kg)" />
            <Line type="monotone" dataKey="fat" stroke="#FF5C8D" strokeWidth={2} strokeDasharray="4 2" dot={{ fill: '#FF5C8D', r: 3, strokeWidth: 0 }} name="Fat %" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Glass>
  )
}

/* ═══════════════════════════════════════
   PERFORMANCE RADAR
═══════════════════════════════════════ */
function PerformanceRadar() {
  const overall = Math.round(RADAR_DATA.reduce((a, b) => a + b.score, 0) / RADAR_DATA.length)

  return (
    <Glass className="p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FFB300]" />
          Health Score Radar
        </h2>
        <div
          className="text-[11px] font-bold px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(0,240,255,0.1)', color: '#00F0FF', border: '1px solid rgba(0,240,255,0.2)' }}
        >
          {overall}% Overall
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center" style={{ minHeight: '200px' }}>
        <ResponsiveContainer width="100%" height={210}>
          <RadarChart data={RADAR_DATA}>
            <PolarGrid stroke="rgba(255,255,255,0.07)" />
            <PolarAngleAxis dataKey="cat" tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'Inter' }} />
            <Radar dataKey="score" stroke="#00F0FF" fill="#00F0FF" fillOpacity={0.12} strokeWidth={2}
              dot={{ fill: '#00F0FF', r: 3, strokeWidth: 0 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Score bars */}
      <div className="space-y-2 mt-2">
        {RADAR_DATA.map(({ cat, score }) => {
          const color = score >= 85 ? '#10b981' : score >= 70 ? '#FFB300' : '#FF5C8D'
          return (
            <div key={cat} className="flex items-center gap-2">
              <span className="text-slate-400 text-[10px] w-16 flex-shrink-0">{cat}</span>
              <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, background: color, boxShadow: `0 0 6px ${color}60` }} />
              </div>
              <span className="text-[10px] font-bold w-8 text-right" style={{ color }}>{score}</span>
            </div>
          )
        })}
      </div>
    </Glass>
  )
}

/* ═══════════════════════════════════════
   ACHIEVEMENTS BOARD
═══════════════════════════════════════ */
function AchievementsBoard() {
  return (
    <Glass className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-sm flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#FFB300]" />
          Achievements
        </h2>
        <span className="text-[10px] text-slate-500">4 / 6 unlocked</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {ACHIEVEMENTS.map((a) => (
          <div
            key={a.id}
            className={`rounded-xl p-3 flex flex-col gap-2 transition-all duration-300 ${a.unlocked ? 'hover:scale-[1.03] cursor-pointer' : 'opacity-40 grayscale'}`}
            style={{
              background: a.unlocked ? `${a.color}0D` : 'rgba(255,255,255,0.03)',
              border: a.unlocked ? `1px solid ${a.color}25` : '1px solid rgba(255,255,255,0.06)',
              boxShadow: a.unlocked ? `0 0 20px ${a.color}10` : 'none',
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{a.icon}</span>
              {a.unlocked
                ? <CheckCircle2 className="w-4 h-4" style={{ color: a.color }} />
                : <div className="w-4 h-4 rounded-full bg-slate-700 flex items-center justify-center"><span className="text-[8px] text-slate-500">🔒</span></div>
              }
            </div>
            <div>
              <p className="text-white text-[11px] font-bold">{a.title}</p>
              <p className="text-slate-500 text-[9px] leading-tight mt-0.5">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Glass>
  )
}

/* ═══════════════════════════════════════
   PR TIMELINE
═══════════════════════════════════════ */
function PRTimeline() {
  return (
    <Glass className="p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-sm flex items-center gap-2">
          <Award className="w-4 h-4 text-[#FF5C8D]" />
          Personal Records
        </h2>
        <Dots />
      </div>

      <div className="flex-1 space-y-2.5 overflow-y-auto min-h-0">
        {PR_LOG.map((pr, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/[0.02] cursor-pointer group"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {/* Timeline dot */}
            <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FFB300', boxShadow: '0 0 6px rgba(255,179,0,0.6)' }} />
              {i < PR_LOG.length - 1 && <div className="w-px h-5 bg-white/10" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-white text-xs font-semibold">{pr.lift}</p>
                <span className="text-[9px] text-slate-600">{pr.date}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-white text-sm font-bold">{pr.weight}kg</span>
                <span className="text-slate-600 text-[10px]">prev: {pr.prev}kg</span>
              </div>
            </div>

            <span className="flex items-center gap-0.5 text-xs font-bold flex-shrink-0" style={{ color: '#10b981' }}>
              <TrendingUp className="w-3 h-3" />
              +{pr.delta}kg
            </span>
          </div>
        ))}
      </div>
    </Glass>
  )
}

/* ═══════════════════════════════════════
   SLEEP CHART
═══════════════════════════════════════ */
function SleepPanel() {
  const avg = +(SLEEP_DATA.reduce((a, b) => a + b.hours, 0) / SLEEP_DATA.length).toFixed(1)

  return (
    <Glass className="p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-white font-semibold text-sm flex items-center gap-2">
            <Moon className="w-4 h-4 text-[#A855F7]" />
            Sleep Quality
          </h2>
          <p className="text-slate-500 text-[11px] mt-0.5">Avg <span className="text-[#A855F7] font-bold">{avg}h</span> this week</p>
        </div>
        <div className="text-right">
          <p className="text-white text-xl font-bold">{SLEEP_DATA[SLEEP_DATA.length - 1].hours}h</p>
          <p className="text-slate-600 text-[10px]">Last night</p>
        </div>
      </div>

      <div style={{ height: '110px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={SLEEP_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -30 }}>
            <defs>
              <linearGradient id="sleepAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A855F7" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#A855F7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} domain={[4, 11]} />
            <Tooltip contentStyle={{ background: 'rgba(13,18,30,0.96)', border: '1px solid rgba(168,85,247,0.18)', borderRadius: '10px', fontSize: '11px', color: '#e2e8f0', padding: '5px 9px' }} cursor={{ stroke: 'rgba(168,85,247,0.15)', strokeWidth: 1 }} />
            <ReferenceLine y={8} stroke="#A855F7" strokeDasharray="4 2" strokeOpacity={0.4} label={{ value: '8h goal', fill: '#A855F7', fontSize: 9, position: 'insideTopRight' }} />
            <Area type="monotone" dataKey="hours" stroke="#A855F7" strokeWidth={2} fill="url(#sleepAreaGrad)" dot={{ fill: '#A855F7', r: 3, strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Sleep quality pills */}
      <div className="flex gap-2 mt-3">
        {[
          { label: 'Deep', val: '42%', color: '#A855F7' },
          { label: 'REM',  val: '28%', color: '#7C5CFC' },
          { label: 'Light',val: '30%', color: '#60a5fa' },
        ].map(({ label, val, color }) => (
          <div key={label} className="flex-1 rounded-lg p-2 text-center" style={{ background: `${color}0D`, border: `1px solid ${color}20` }}>
            <p className="text-[11px] font-bold" style={{ color }}>{val}</p>
            <p className="text-slate-600 text-[9px]">{label}</p>
          </div>
        ))}
      </div>
    </Glass>
  )
}

/* ═══════════════════════════════════════
   MACRO VELOCITY RINGS
═══════════════════════════════════════ */
function MacroVelocity() {
  const targets = { protein: 1295, carbs: 2170, fat: 574, calories: 15400 }
  const consumed = { protein: 1013, carbs: 1402, fat: 433, calories: 13468 }

  const items = [
    { label: 'Protein',  c: consumed.protein, t: targets.protein, unit: 'g',    color: '#FFB300', r: 52, sw: 8 },
    { label: 'Carbs',    c: consumed.carbs,   t: targets.carbs,   unit: 'g',    color: '#A855F7', r: 40, sw: 8 },
    { label: 'Fat',      c: consumed.fat,     t: targets.fat,     unit: 'g',    color: '#FF5C8D', r: 28, sw: 8 },
  ]

  const SIZE = 140
  const CX = SIZE / 2

  return (
    <Glass className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-sm flex items-center gap-2">
          <Target className="w-4 h-4 text-[#FFB300]" />
          Macro Velocity
        </h2>
        <span className="text-slate-500 text-[11px]">Weekly progress</span>
      </div>

      <div className="flex items-center gap-6">
        {/* SVG rings */}
        <div className="flex-shrink-0">
          <svg width={SIZE} height={SIZE}>
            {items.map((m) => {
              const circ = 2 * Math.PI * m.r
              const dash = Math.min(m.c / m.t, 1) * circ
              return (
                <g key={m.label}>
                  <circle cx={CX} cy={CX} r={m.r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={m.sw} />
                  <circle
                    cx={CX} cy={CX} r={m.r}
                    fill="none"
                    stroke={m.color}
                    strokeWidth={m.sw}
                    strokeLinecap="round"
                    strokeDasharray={`${dash} ${circ}`}
                    strokeDashoffset={circ * 0.25}
                    style={{ filter: `drop-shadow(0 0 4px ${m.color}80)`, transition: 'stroke-dasharray 1s ease' }}
                  />
                </g>
              )
            })}
            <text x={CX} y={CX - 6} textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="Inter">Week</text>
            <text x={CX} y={CX + 8} textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="Inter">
              {Math.round((consumed.protein / targets.protein) * 100)}%
            </text>
          </svg>
        </div>

        {/* Labels */}
        <div className="flex-1 space-y-3">
          {items.map((m) => {
            const pct = Math.round((m.c / m.t) * 100)
            return (
              <div key={m.label}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: m.color, boxShadow: `0 0 4px ${m.color}` }} />
                    <span className="text-slate-300 text-xs">{m.label}</span>
                  </div>
                  <span className="text-[11px] font-bold" style={{ color: m.color }}>{pct}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: m.color, boxShadow: `0 0 6px ${m.color}60` }} />
                  </div>
                  <span className="text-slate-600 text-[10px]">{m.c}/{m.t}{m.unit}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Glass>
  )
}

/* ═══════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════ */
export default function StatsPage() {
  return (
    <div className="space-y-5 pb-12 w-full">

      {/* PAGE HERO */}
      <div
        className="relative rounded-3xl overflow-hidden p-5 sm:p-6"
        style={{
          background: 'linear-gradient(135deg, rgba(6,11,24,0.98) 0%, rgba(4,8,20,0.97) 100%)',
          border: '1px solid rgba(0,240,255,0.12)',
          boxShadow: '0 0 50px rgba(0,240,255,0.03)',
        }}
      >
        <div className="absolute top-0 right-0 w-56 h-56 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)', transform: 'translate(25%,-35%)' }} />
        <div className="absolute bottom-0 left-1/4 w-40 h-40 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 70%)' }} />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(0,240,255,0.18), rgba(168,85,247,0.15))', border: '1px solid rgba(0,240,255,0.25)', boxShadow: '0 0 24px rgba(0,240,255,0.12)' }}
            >
              <BarChart3 className="w-6 h-6 text-[#00F0FF]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="badge-live" style={{ background: 'rgba(0,240,255,0.08)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.2)' }}>Performance Observatory</span>
                <span className="text-[10px] text-slate-700">8-week data</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Deep Analytics & Insights
              </h1>
              <p className="text-slate-500 text-xs mt-0.5">
                Hypertrophy Goal · <span className="text-primary-400 font-semibold">8-week streak</span> · Live tracking
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.18)' }}>
              <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-[#10b981] text-xs font-semibold">Live Data</span>
            </div>
            <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(17,23,36,0.8)' }}>
              {['Week', 'Month', '3M', '1Y'].map((p) => (
                <button
                  key={p}
                  className="px-3 py-2 text-[11px] font-semibold transition-all"
                  style={p === 'Week' ? { background: 'rgba(0,240,255,0.15)', color: '#00F0FF' } : { color: '#64748b' }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* KPI STRIP */}
      <KPIStrip />

      {/* ROW 2: Main chart (wide) */}
      <MainComboChart />

      {/* ROW 3: 3-column grid */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8">
          <MonthlyHeatmap />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <PerformanceRadar />
        </div>
      </div>

      {/* ROW 4: body comp + PR + sleep */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-5">
          <BodyCompositionChart />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <SleepPanel />
        </div>
        <div className="col-span-12 lg:col-span-3" style={{ minHeight: '320px' }}>
          <PRTimeline />
        </div>
      </div>

      {/* ROW 5: achievements + macro velocity */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8">
          <AchievementsBoard />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <MacroVelocity />
        </div>
      </div>
    </div>
  )
}
