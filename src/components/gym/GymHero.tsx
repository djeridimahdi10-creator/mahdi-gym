'use client'

import { motion } from 'framer-motion'
import { Flame, Clock, Trophy, Play, Activity, Sparkles, RefreshCw } from 'lucide-react'
import { GymOrb } from './GymOrb'
import type { MuscleGroup } from '@/types'

export interface TodaySession {
  day: string
  label: string
  color: string
  done: boolean
  muscles: string[]
}

interface GymHeroProps {
  todaySession: TodaySession
  selectedGroup: MuscleGroup | 'all'
  onSelectGroup?: (g: MuscleGroup | 'all') => void
  sessionStarted: boolean
  onStartSession: () => void
  onShuffleRoutine?: () => void
  exerciseCount?: number
  totalKcal?: number
  totalMins?: number
}

export function GymHero({
  todaySession,
  selectedGroup,
  onSelectGroup,
  sessionStarted,
  onStartSession,
  onShuffleRoutine,
  exerciseCount = 4,
  totalKcal = 450,
  totalMins = 50,
}: GymHeroProps) {
  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden p-6 sm:p-8"
      style={{
        background: 'linear-gradient(135deg, rgba(8,15,30,0.95) 0%, rgba(13,20,38,0.90) 50%, rgba(20,12,35,0.92) 100%)',
        border: '1px solid rgba(0,240,255,0.18)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,240,255,0.06), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* 3D Ambient Spotlights */}
      <div
        className="absolute -top-32 -left-20 w-96 h-96 rounded-full pointer-events-none blur-[110px]"
        style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-28 -right-20 w-96 h-96 rounded-full pointer-events-none blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(124,92,252,0.14) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 75%)' }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left column: Mission Briefing & Tactical Action */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md"
              style={{
                background: 'rgba(0,240,255,0.12)',
                color: '#00F0FF',
                border: '1px solid rgba(0,240,255,0.3)',
                boxShadow: '0 0 16px rgba(0,240,255,0.15)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
              Today&apos;s Workout Split
            </span>

            <span className="text-slate-400 text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
              {todaySession.day} Routine
            </span>

            {todaySession.muscles.length > 0 && (
              <span className="text-slate-500 text-xs hidden sm:inline-flex items-center gap-1">
                • <span className="capitalize text-slate-300">{todaySession.muscles.join(', ')}</span>
              </span>
            )}
          </div>

          {/* Big Hero Title */}
          <div>
            <h1
              className="text-3xl sm:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-[1.1]"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {todaySession.label}
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
              Targeted hypertrophy routine designed for progressive overload. Follow the live sets and rest intervals for maximum muscle activation.
            </p>
          </div>

          {/* 3D Bento Metrics Row */}
          <div className="grid grid-cols-3 gap-3 pt-1">
            {/* Exercises count */}
            <div
              className="relative rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, rgba(0,240,255,0.08) 0%, rgba(15,23,42,0.6) 100%)',
                border: '1px solid rgba(0,240,255,0.2)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <Activity className="w-4 h-4 text-[#00F0FF]" />
                <span className="text-[11px] font-medium text-slate-400">Exercises</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-white tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {exerciseCount}
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">moves</span>
              </div>
            </div>

            {/* Est Duration */}
            <div
              className="relative rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, rgba(255,179,0,0.08) 0%, rgba(15,23,42,0.6) 100%)',
                border: '1px solid rgba(255,179,0,0.2)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <Clock className="w-4 h-4 text-[#FFB300]" />
                <span className="text-[11px] font-medium text-slate-400">Duration</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-white tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {totalMins}
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">min</span>
              </div>
            </div>

            {/* Est Calories Burn */}
            <div
              className="relative rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, rgba(255,92,141,0.08) 0%, rgba(15,23,42,0.6) 100%)',
                border: '1px solid rgba(255,92,141,0.2)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <Flame className="w-4 h-4 text-[#FF5C8D]" />
                <span className="text-[11px] font-medium text-slate-400">Burn Est</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-white tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {totalKcal}
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">kcal</span>
              </div>
            </div>
          </div>

          {/* Single High-Impact 3D Action Strip */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <motion.button
              onClick={onStartSession}
              className="relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-base cursor-pointer select-none transition-all"
              style={{
                background: sessionStarted
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : 'linear-gradient(135deg, #00F0FF 0%, #0070F3 100%)',
                color: sessionStarted ? '#ffffff' : '#040d1a',
                boxShadow: sessionStarted
                  ? '0 0 35px rgba(16,185,129,0.4), 0 6px 0 #047857'
                  : '0 0 40px rgba(0,240,255,0.4), 0 6px 0 #005bb5',
                transform: 'translateY(0)',
              }}
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98, translateY: 3 }}
            >
              {sessionStarted ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                  <span>Resume Live Workout</span>
                  <Activity className="w-5 h-5" />
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>Start Today&apos;s Workout</span>
                </>
              )}
            </motion.button>

            {onShuffleRoutine && (
              <motion.button
                onClick={onShuffleRoutine}
                className="flex items-center gap-2 px-4 py-4 rounded-2xl font-semibold text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>AI Alternate Routine</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Right column: 3D Holographic Pedestal & Barbell */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          {/* Holographic Pedestal Base */}
          <div
            className="w-full relative rounded-3xl p-3 flex flex-col items-center justify-center"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,240,255,0.05) 0%, rgba(15,23,42,0.4) 70%)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <GymOrb selectedGroup={selectedGroup} onSelectGroup={onSelectGroup} />

            {/* Pedestal Bottom Reflection Line */}
            <div
              className="w-4/5 h-[1px] -mt-2 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.4), transparent)',
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
