'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Trophy,
  Flame,
  Clock,
  Dumbbell,
  ChevronRight,
  ChevronLeft,
  X,
  Plus,
  Minus,
  Sparkles,
  Zap,
} from 'lucide-react'
import type { MuscleGroup } from '@/types'

export interface LiveExercise {
  id: string
  name: string
  group: MuscleGroup
  icon: string
  sets: { setNum: number; weight: number; reps: number; completed: boolean }[]
  targetReps: string
  restSeconds: number
  tip: string
}

interface LiveWorkoutModalProps {
  isOpen: boolean
  onClose: () => void
  workoutName: string
  exercises: LiveExercise[]
  onFinishWorkout: (summary: {
    totalVolumeKg: number
    totalSetsCompleted: number
    durationSec: number
    kcalBurned: number
  }) => void
}

// Play a pleasant Web Audio synthesizer chime for set completion
function playChime(freq = 587.33) {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15)
    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.3)
  } catch {
    // AudioContext blocked or not supported, ignore silently
  }
}

export function LiveWorkoutModal({
  isOpen,
  onClose,
  workoutName,
  exercises: initialExercises,
  onFinishWorkout,
}: LiveWorkoutModalProps) {
  const [exercises, setExercises] = useState<LiveExercise[]>(initialExercises)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [elapsedSec, setElapsedSec] = useState(0)
  const [timerRunning, setTimerRunning] = useState(true)

  // Rest Timer State
  const [restRemaining, setRestRemaining] = useState<number | null>(null)
  const [restTotal, setRestTotal] = useState(60)

  // Workout Completion Modal
  const [workoutFinished, setWorkoutFinished] = useState(false)

  // Reset or initialize on open
  useEffect(() => {
    if (isOpen) {
      setExercises(initialExercises)
      setCurrentIdx(0)
      setElapsedSec(0)
      setTimerRunning(true)
      setRestRemaining(null)
      setWorkoutFinished(false)
    }
  }, [isOpen, initialExercises])

  // Elapsed Session Timer
  useEffect(() => {
    if (!isOpen || !timerRunning || workoutFinished) return
    const interval = setInterval(() => {
      setElapsedSec((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isOpen, timerRunning, workoutFinished])

  // Rest Timer Countdown
  useEffect(() => {
    if (restRemaining === null || restRemaining <= 0) return
    const interval = setInterval(() => {
      setRestRemaining((prev) => {
        if (prev === null || prev <= 1) {
          playChime(880)
          return null
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [restRemaining])

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const currentEx = exercises[currentIdx] || exercises[0]

  // Update Weight/Reps for a set
  const updateSet = (setIndex: number, field: 'weight' | 'reps', delta: number) => {
    setExercises((prev) =>
      prev.map((ex, i) => {
        if (i !== currentIdx) return ex
        const newSets = [...ex.sets]
        const currentVal = newSets[setIndex][field]
        const nextVal = Math.max(field === 'weight' ? 0 : 1, currentVal + delta)
        newSets[setIndex] = { ...newSets[setIndex], [field]: nextVal }
        return { ...ex, sets: newSets }
      })
    )
  }

  // Toggle Set Complete
  const toggleComplete = (setIndex: number) => {
    setExercises((prev) =>
      prev.map((ex, i) => {
        if (i !== currentIdx) return ex
        const newSets = [...ex.sets]
        const wasCompleted = newSets[setIndex].completed
        newSets[setIndex] = { ...newSets[setIndex], completed: !wasCompleted }

        // If newly completed, trigger chime and rest timer
        if (!wasCompleted) {
          playChime(659.25)
          setRestTotal(ex.restSeconds || 60)
          setRestRemaining(ex.restSeconds || 60)
        }
        return { ...ex, sets: newSets }
      })
    )
  }

  // Calculate Metrics
  const totalSets = useMemo(
    () => exercises.reduce((sum, ex) => sum + ex.sets.length, 0),
    [exercises]
  )
  const completedSets = useMemo(
    () =>
      exercises.reduce(
        (sum, ex) => sum + ex.sets.filter((s) => s.completed).length,
        0
      ),
    [exercises]
  )
  const totalVolumeKg = useMemo(
    () =>
      exercises.reduce(
        (sum, ex) =>
          sum +
          ex.sets
            .filter((s) => s.completed)
            .reduce((sSum, s) => sSum + s.weight * s.reps, 0),
        0
      ),
    [exercises]
  )
  const estCalories = Math.round((elapsedSec / 60) * 8.5)

  const progressPercent = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0

  const handleFinish = () => {
    setWorkoutFinished(true)
    playChime(880)
  }

  const handleFinalSubmit = () => {
    onFinishWorkout({
      totalVolumeKg,
      totalSetsCompleted: completedSets,
      durationSec: elapsedSec,
      kcalBurned: estCalories,
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (confirm('Are you sure you want to pause and exit the live session?')) {
              onClose()
            }
          }}
        />

        {/* Modal Window */}
        <motion.div
          className="relative w-full max-w-3xl rounded-3xl overflow-hidden z-10 flex flex-col my-auto"
          style={{
            background: 'linear-gradient(135deg, rgba(10,17,32,0.98) 0%, rgba(15,23,42,0.96) 100%)',
            border: '1px solid rgba(0,240,255,0.25)',
            boxShadow: '0 25px 80px rgba(0,0,0,0.8), 0 0 50px rgba(0,240,255,0.1)',
            maxHeight: '92vh',
          }}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {!workoutFinished ? (
            <>
              {/* Header HUD */}
              <div
                className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between gap-4"
                style={{ background: 'rgba(0,240,255,0.03)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center glow-ring"
                    style={{ background: 'rgba(0,240,255,0.12)', border: '1px solid rgba(0,240,255,0.3)' }}
                  >
                    <Dumbbell className="w-5 h-5 text-[#00F0FF]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live Tracker
                      </span>
                      <span className="text-xs text-slate-400 font-medium truncate max-w-[150px] sm:max-w-none">
                        {workoutName}
                      </span>
                    </div>
                    <p className="text-white text-sm font-bold mt-0.5">
                      Exercise {currentIdx + 1} of {exercises.length}
                    </p>
                  </div>
                </div>

                {/* Live Elapsed Timer */}
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: timerRunning ? '#00F0FF' : '#94a3b8',
                    }}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatTime(elapsedSec)}</span>
                    <button
                      onClick={() => setTimerRunning(!timerRunning)}
                      className="p-1 hover:text-white transition-colors cursor-pointer"
                      title={timerRunning ? 'Pause timer' : 'Resume timer'}
                    >
                      {timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm('Exit live workout? Progress is saved in this session.')) {
                        onClose()
                      }
                    }}
                    className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress Line */}
              <div className="w-full bg-white/5 h-1.5 relative overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00F0FF] to-emerald-400"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
                {/* Active Exercise Spotlight Card */}
                <div
                  className="rounded-2xl p-5 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,240,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                    border: '1px solid rgba(0,240,255,0.2)',
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <span className="text-3xl">{currentEx?.icon}</span>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          {currentEx?.name}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">
                            {currentEx?.group}
                          </span>
                          <span className="text-xs text-slate-400">
                            Target: {currentEx?.targetReps} reps per set
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Exercise Switcher Arrows */}
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                        disabled={currentIdx === 0}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-slate-300 transition-colors cursor-pointer"
                        title="Previous exercise"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCurrentIdx((prev) => Math.min(exercises.length - 1, prev + 1))}
                        disabled={currentIdx === exercises.length - 1}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-slate-300 transition-colors cursor-pointer"
                        title="Next exercise"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Form Coaching Tip */}
                  {currentEx?.tip && (
                    <div className="mt-3.5 px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[11px] text-cyan-200 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{currentEx.tip}</span>
                    </div>
                  )}
                </div>

                {/* Rest Timer Banner (shows dynamically when counting down) */}
                <AnimatePresence>
                  {restRemaining !== null && (
                    <motion.div
                      className="rounded-2xl p-4 flex items-center justify-between gap-4"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,179,0,0.12) 0%, rgba(20,15,5,0.7) 100%)',
                        border: '1px solid rgba(255,179,0,0.3)',
                        boxShadow: '0 0 30px rgba(255,179,0,0.12)',
                      }}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 flex items-center justify-center">
                          <svg className="w-10 h-10 transform -rotate-90">
                            <circle
                              cx="20"
                              cy="20"
                              r="16"
                              stroke="rgba(255,179,0,0.2)"
                              strokeWidth="3"
                              fill="none"
                            />
                            <circle
                              cx="20"
                              cy="20"
                              r="16"
                              stroke="#FFB300"
                              strokeWidth="3"
                              fill="none"
                              strokeDasharray={100}
                              strokeDashoffset={100 - (restRemaining / restTotal) * 100}
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="absolute text-xs font-mono font-bold text-[#FFB300]">
                            {restRemaining}
                          </span>
                        </div>
                        <div>
                          <p className="text-white text-xs font-bold">Resting Period</p>
                          <p className="text-amber-200/70 text-[11px]">Breathe & hydrate before your next set</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setRestRemaining(null)}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/30 transition-colors cursor-pointer"
                      >
                        Skip Rest
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sets Table */}
                <div className="space-y-2.5">
                  <div className="grid grid-cols-12 text-[11px] font-bold text-slate-400 px-3 uppercase tracking-wider">
                    <span className="col-span-2">Set</span>
                    <span className="col-span-4 text-center">Weight (kg)</span>
                    <span className="col-span-3 text-center">Reps</span>
                    <span className="col-span-3 text-right">Log Set</span>
                  </div>

                  {currentEx?.sets.map((s, idx) => (
                    <motion.div
                      key={s.setNum}
                      className="grid grid-cols-12 items-center p-3 rounded-2xl transition-all"
                      style={{
                        background: s.completed
                          ? 'rgba(16,185,129,0.1)'
                          : 'rgba(255,255,255,0.03)',
                        border: s.completed
                          ? '1px solid rgba(16,185,129,0.3)'
                          : '1px solid rgba(255,255,255,0.06)',
                      }}
                      whileHover={{ scale: 1.01 }}
                    >
                      {/* Set Number */}
                      <div className="col-span-2 flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">#{s.setNum}</span>
                        {s.completed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>

                      {/* Weight Stepper */}
                      <div className="col-span-4 flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => updateSet(idx, 'weight', -2.5)}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-12 text-center text-sm font-bold text-white tabular-nums">
                          {s.weight}
                        </span>
                        <button
                          onClick={() => updateSet(idx, 'weight', 2.5)}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Reps Stepper */}
                      <div className="col-span-3 flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => updateSet(idx, 'reps', -1)}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-white tabular-nums">
                          {s.reps}
                        </span>
                        <button
                          onClick={() => updateSet(idx, 'reps', 1)}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Complete Checkbox */}
                      <div className="col-span-3 flex justify-end">
                        <button
                          onClick={() => toggleComplete(idx)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          style={
                            s.completed
                              ? {
                                  background: 'linear-gradient(135deg, #10b981, #059669)',
                                  color: '#ffffff',
                                  boxShadow: '0 0 15px rgba(16,185,129,0.4)',
                                }
                              : {
                                  background: 'rgba(0,240,255,0.12)',
                                  color: '#00F0FF',
                                  border: '1px solid rgba(0,240,255,0.25)',
                                }
                          }
                        >
                          {s.completed ? (
                            <>Done</>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" /> Log
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer Controls */}
              <div
                className="p-4 sm:p-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
                style={{ background: 'rgba(0,0,0,0.3)' }}
              >
                {/* Live Stats Summary */}
                <div className="flex items-center gap-5 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Dumbbell className="w-4 h-4 text-cyan-400" />
                    <strong className="text-white tabular-nums">{totalVolumeKg.toLocaleString()}</strong> kg volume
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-[#FF5C8D]" />
                    <strong className="text-white tabular-nums">{estCalories}</strong> kcal
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-[#FFB300]" />
                    <strong className="text-white tabular-nums">
                      {completedSets}/{totalSets}
                    </strong> sets
                  </span>
                </div>

                {/* Primary Finish CTA */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {currentIdx < exercises.length - 1 ? (
                    <button
                      onClick={() => setCurrentIdx((prev) => prev + 1)}
                      className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Next Exercise</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : null}

                  <motion.button
                    onClick={handleFinish}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: '#ffffff',
                      boxShadow: '0 0 25px rgba(16,185,129,0.35)',
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Trophy className="w-4 h-4" />
                    <span>Finish Workout</span>
                  </motion.button>
                </div>
              </div>
            </>
          ) : (
            /* Celebration Completion Modal */
            <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-6">
              <motion.div
                className="w-24 h-24 rounded-3xl flex items-center justify-center glow-ring"
                style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(0,240,255,0.2))',
                  border: '1px solid rgba(16,185,129,0.4)',
                  boxShadow: '0 0 50px rgba(16,185,129,0.3)',
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.6, type: 'spring' }}
              >
                <Trophy className="w-12 h-12 text-emerald-400" />
              </motion.div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Mission Accomplished
                </span>
                <h2
                  className="text-3xl sm:text-4xl font-black text-white mt-1"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Workout Crushed! 🔥
                </h2>
                <p className="text-slate-400 text-sm mt-1 max-w-md">
                  Incredible effort! You adhered to progressive overload and completed all planned hypertrophy sets.
                </p>
              </div>

              {/* Summary Bento */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg">
                <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                  <Clock className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <p className="text-xl font-black text-white tabular-nums">{formatTime(elapsedSec)}</p>
                  <p className="text-[10px] text-slate-500 font-semibold">Total Time</p>
                </div>
                <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                  <Dumbbell className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <p className="text-xl font-black text-white tabular-nums">{totalVolumeKg.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-500 font-semibold">Kg Lifted</p>
                </div>
                <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                  <Flame className="w-4 h-4 text-[#FF5C8D] mx-auto mb-1" />
                  <p className="text-xl font-black text-white tabular-nums">{estCalories}</p>
                  <p className="text-[10px] text-slate-500 font-semibold">Kcal Burned</p>
                </div>
                <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#FFB300] mx-auto mb-1" />
                  <p className="text-xl font-black text-white tabular-nums">{completedSets}</p>
                  <p className="text-[10px] text-slate-500 font-semibold">Sets Done</p>
                </div>
              </div>

              {/* Final Submit Button */}
              <motion.button
                onClick={handleFinalSubmit}
                className="w-full max-w-sm py-4 rounded-2xl font-black text-sm transition-all cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #00F0FF 0%, #0070F3 100%)',
                  color: '#040d1a',
                  boxShadow: '0 0 30px rgba(0,240,255,0.4)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Log Session to History
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
