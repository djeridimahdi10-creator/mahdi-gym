'use client'

import { motion } from 'framer-motion'
import { Sparkles, RefreshCw, Zap, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react'

interface AICoachInsightsProps {
  tips: string[]
  onRegenerate: () => void
  loading: boolean
}

export function AICoachInsights({ tips, onRegenerate, loading }: AICoachInsightsProps) {
  // Generate structured, actionable advice cards from tips
  const actionableAdvice = [
    {
      type: 'warning',
      badge: 'Protein Target Alert',
      message: 'You are 87g short of your protein daily goal.',
      action: 'Add Greek Yogurt (+20g)',
      color: '#FFB300',
      bg: 'rgba(255,179,0,0.06)',
      border: 'rgba(255,179,0,0.15)',
    },
    {
      type: 'info',
      badge: 'Timing Optimization',
      message: 'Consume your post-workout meal within 45 min for optimal hypertrophy.',
      action: 'Log Whey Shake (+25g)',
      color: '#A855F7',
      bg: 'rgba(168,85,247,0.06)',
      border: 'rgba(168,85,247,0.15)',
    },
    {
      type: 'success',
      badge: 'Calorie Budget',
      message: '620 kcal remaining today. Perfect buffer for dinner.',
      action: 'View Dinner Plan',
      color: '#10b981',
      bg: 'rgba(16,185,129,0.06)',
      border: 'rgba(16,185,129,0.15)',
    },
  ]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center glow-ring-ai"
            style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.25)' }}
          >
            <Sparkles className="w-4 h-4 text-ai-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-white font-semibold text-sm">AI Nutrition Coach</h2>
              <span className="badge-live" style={{ background: 'rgba(168,85,247,0.1)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.2)' }}>Smart Advisor</span>
            </div>
            <p className="text-slate-500 text-[11px]">Real-time recommendations for your goals</p>
          </div>
        </div>

        <motion.button
          onClick={onRegenerate}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all disabled:opacity-50"
          style={{ background: 'rgba(168,85,247,0.12)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.22)' }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'AI Thinking...' : 'Regenerate'}</span>
        </motion.button>
      </div>

      {/* Actionable Advice Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {actionableAdvice.map((item, index) => (
          <motion.div
            key={item.badge}
            className="rounded-2xl p-4 flex flex-col justify-between space-y-3"
            style={{ background: item.bg, border: `1px solid ${item.border}` }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                {item.type === 'warning' ? (
                  <ShieldAlert className="w-3.5 h-3.5" style={{ color: item.color }} />
                ) : item.type === 'success' ? (
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: item.color }} />
                ) : (
                  <Zap className="w-3.5 h-3.5" style={{ color: item.color }} />
                )}
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: item.color }}>
                  {item.badge}
                </span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">{item.message}</p>
            </div>

            <button
              className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline self-start pt-1"
              style={{ color: item.color }}
            >
              <span>{item.action}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Additional AI Tips Accordion / List */}
      {tips && tips.length > 0 && (
        <div
          className="rounded-2xl p-4 space-y-2.5"
          style={{ background: 'rgba(17,23,36,0.90)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Key AI Coach Guidelines</p>
          <div className="space-y-2">
            {tips.slice(0, 3).map((tip, i) => (
              <div key={i} className="flex gap-2.5 items-start text-xs text-slate-300 leading-relaxed">
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5" style={{ background: 'rgba(168,85,247,0.2)', color: '#c084fc' }}>
                  {i + 1}
                </span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
