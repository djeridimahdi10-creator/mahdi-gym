'use client'

import { motion } from 'framer-motion'
import { Dumbbell, Flame, Clock, Trophy, Play, CheckCircle2 } from 'lucide-react'
import { GymOrb } from './GymOrb'
import type { MuscleGroup } from '@/types'

interface TodaySession {
  day: string
  label: string
  color: string
  done: boolean
  muscles: string[]
}

interface GymHeroProps {
  todaySession: TodaySession
  selectedGroup: MuscleGroup | 'all'
  onSelectGroup: (g: MuscleGroup | 'all') => void
  sessionStarted: boolean
  onStartSession: () => void
}

export function GymHero({
  todaySession,
  selectedGroup,
  onSelectGroup,
  sessionStarted,
  onStartSession,
}: GymHeroProps) {
  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden p-5 sm:p-7"
      style={{
        background: 'linear-gradient(135deg, rgba(0,240,255,0.06) 0%, rgba(17,23,36,0.96) 50%, rgba(124,92,252,0.06) 100%)',
        border: '1px solid rgba(0,240,255,0.12)',
        boxShadow: '0 0 60px rgba(0,240,255,0.04), 0 24px 48px rgba(0,0,0,0.5)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {/* Ambient glowing circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-20 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,92,252,0.06) 0%, transparent 70%)' }} />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left column: Session Details & Hero Stats */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2">
            <span
              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(0,240,255,0.1)', color: '#00F0FF', border: '1px solid rgba(0,240,255,0.2)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
              Today&apos;s Training
            </span>
            <span className="text-slate-500 text-xs font-semibold">{todaySession.day} Split</span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {todaySession.label}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              4 hypertrophy exercises · <span style={{ color: todaySession.color }}>~55 min</span> · Est. 450 kcal burned
            </p>
          </div>

          {/* Quick stats row */}
          <div className="grid grid-cols-3 gap-3 pt-1">
            <div className="rounded-2xl p-3.5" style={{ background: 'rgba(255,92,141,0.06)', border: '1px solid rgba(255,92,141,0.15)' }}>
              <div className="flex items-center gap-1.5 mb-1">
                <Flame className="w-4 h-4 text-[#FF5C8D]" />
                <span className="text-xs text-slate-400">Burn Target</span>
              </div>
              <span className="text-xl font-bold text-white tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>450</span>
              <span className="text-[11px] text-slate-500 ml-1">kcal</span>
            </div>

            <div className="rounded-2xl p-3.5" style={{ background: 'rgba(255,179,0,0.06)', border: '1px solid rgba(255,179,0,0.15)' }}>
              <div className="flex items-center gap-1.5 mb-1">
                <Clock className="w-4 h-4 text-[#FFB300]" />
                <span className="text-xs text-slate-400">Est Duration</span>
              </div>
              <span className="text-xl font-bold text-white tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>55</span>
              <span className="text-[11px] text-slate-500 ml-1">min</span>
            </div>

            <div className="rounded-2xl p-3.5" style={{ background: 'rgba(124,92,252,0.06)', border: '1px solid rgba(124,92,252,0.15)' }}>
              <div className="flex items-center gap-1.5 mb-1">
                <Trophy className="w-4 h-4 text-[#7C5CFC]" />
                <span className="text-xs text-slate-400">Gym Streak</span>
              </div>
              <span className="text-xl font-bold text-white tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>4</span>
              <span className="text-[11px] text-slate-500 ml-1">days</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <motion.button
              onClick={onStartSession}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm transition-all"
              style={{
                background: sessionStarted
                  ? 'rgba(16,185,129,0.15)'
                  : 'linear-gradient(135deg, #00F0FF, #0066FF)',
                color: sessionStarted ? '#10b981' : '#0B0F19',
                border: sessionStarted ? '1px solid rgba(16,185,129,0.3)' : 'none',
                boxShadow: sessionStarted ? '0 0 20px rgba(16,185,129,0.2)' : '0 0 30px rgba(0,240,255,0.35), 0 8px 24px rgba(0,0,0,0.3)',
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {sessionStarted ? (
                <><CheckCircle2 className="w-4 h-4" /> Session Active</>
              ) : (
                <><Play className="w-4 h-4 fill-current" /> Begin Workout Session</>
              )}
            </motion.button>
          </div>
        </div>

        {/* Right column: 3D Gym Visualization */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <GymOrb selectedGroup={selectedGroup} onSelectGroup={onSelectGroup} />
        </div>
      </div>
    </motion.div>
  )
}
