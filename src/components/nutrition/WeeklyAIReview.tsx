'use client'

import { motion } from 'framer-motion'
import { Calendar, Sparkles, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react'

export function WeeklyAIReview() {
  const weeklyStats = [
    { label: 'Nutrition Score', value: '89/100', color: '#10b981' },
    { label: 'Calorie Adherence', value: '94%', color: '#00F0FF' },
    { label: 'Protein Adherence', value: '91%', color: '#FFB300' },
    { label: 'Hydration Target', value: '76%', color: '#3b82f6' },
    { label: 'Meal Consistency', value: '88%', color: '#a855f7' },
  ]

  return (
    <div
      className="rounded-3xl p-6 sm:p-8 space-y-6"
      style={{
        background: 'rgba(17,23,36,0.95)',
        border: '1px solid rgba(0,240,255,0.18)',
        boxShadow: '0 4px 25px rgba(0,0,0,0.25)',
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#00F0FF]/15 text-[#00F0FF] flex items-center justify-center border border-[#00F0FF]/30">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Weekly AI Review
            </h2>
            <p className="text-slate-400 text-sm">7-Day holistic intake evaluation & tactical adjustment</p>
          </div>
        </div>

        <span className="text-sm font-bold px-4 py-1.5 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/25">
          Grade: A-
        </span>
      </div>

      {/* 5 Key Metric Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {weeklyStats.map((stat) => (
          <div key={stat.label} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] space-y-1.5">
            <p className="text-xs text-slate-400 font-semibold uppercase truncate">{stat.label}</p>
            <p className="text-xl sm:text-2xl font-bold tabular-nums" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* AI Summary Breakdown */}
      <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-3">
        <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>AI Synthesis Takeaways</span>
        </div>

        <div className="space-y-2.5 text-sm text-slate-300 leading-relaxed">
          <div className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>You performed best on high-intensity training days, hitting 100% of protein targets post-workout.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Protein intake improved by +12% compared to last week due to consistent egg & Greek yogurt breakfasts.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-400 font-bold">⚠️</span>
            <span>Hydration on rest days dropped to 76% (average 2.4L vs 3.5L goal).</span>
          </div>
        </div>
      </div>

      {/* Next Week Plan */}
      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm">
        <div>
          <span className="text-slate-400 font-semibold uppercase text-xs block">Next Week AI Strategy</span>
          <p className="text-white font-medium mt-1">
            Prioritize 3.5L hydration reminders on rest days and maintain high-protein breakfasts.
          </p>
        </div>

        <button className="px-5 py-2.5 rounded-xl bg-[#00F0FF]/15 text-[#00F0FF] hover:bg-[#00F0FF]/25 border border-[#00F0FF]/30 font-bold flex items-center gap-1.5 self-start sm:self-auto transition-all">
          <span>Apply Strategy</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
