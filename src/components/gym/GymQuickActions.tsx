'use client'

import { motion } from 'framer-motion'
import { Play, Plus, Sparkles, Trophy, ArrowUpRight } from 'lucide-react'

interface GymQuickActionsProps {
  onStartSession: () => void
  onGenerateWorkout: () => void
  loadingAI?: boolean
}

export function GymQuickActions({ onStartSession, onGenerateWorkout, loadingAI }: GymQuickActionsProps) {
  const actions = [
    {
      title: 'Start Today’s Session',
      desc: 'Launch live workout mode with timer & rest tracking',
      icon: Play,
      color: '#00F0FF',
      bg: 'rgba(0,240,255,0.08)',
      border: 'rgba(0,240,255,0.18)',
      onClick: onStartSession,
    },
    {
      title: 'Log Custom Exercise',
      desc: 'Record set weights, reps, and RPE manually',
      icon: Plus,
      color: '#10b981',
      bg: 'rgba(16,185,129,0.08)',
      border: 'rgba(16,185,129,0.18)',
      onClick: () => {
        const el = document.getElementById('exercise-library-section')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      },
    },
    {
      title: 'AI Workout Generator',
      desc: 'Auto-generate hyper-targeted split for hypertrophy',
      icon: Sparkles,
      color: '#a855f7',
      bg: 'rgba(168,85,247,0.08)',
      border: 'rgba(168,85,247,0.18)',
      onClick: onGenerateWorkout,
      loading: loadingAI,
    },
    {
      title: 'Personal Records',
      desc: 'View max 1RM benchmarks & progress curves',
      icon: Trophy,
      color: '#FFB300',
      bg: 'rgba(255,179,0,0.08)',
      border: 'rgba(255,179,0,0.18)',
      onClick: () => {
        const el = document.getElementById('strength-analytics-section')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      },
    },
  ]

  return (
    <div className="space-y-3">
      <h2 className="text-white font-semibold text-sm">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((act) => {
          const Icon = act.icon
          return (
            <motion.button
              key={act.title}
              onClick={act.onClick}
              className="text-left w-full rounded-2xl p-4 flex flex-col justify-between space-y-3 group cursor-pointer transition-all"
              style={{ background: act.bg, border: `1px solid ${act.border}` }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${act.color}18`, border: `1px solid ${act.color}30` }}
                >
                  <Icon className={`w-5 h-5 ${act.loading ? 'animate-spin' : ''}`} style={{ color: act.color }} />
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: act.color }} />
              </div>

              <div>
                <h3 className="text-white font-bold text-sm mb-0.5 group-hover:text-primary-300 transition-colors">
                  {act.title}
                </h3>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {act.desc}
                </p>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
