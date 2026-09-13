'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { MuscleGroup } from '@/types'
import {
  GymHero,
  ExerciseLibrary,
  StrengthAnalytics,
  LiveWorkoutModal,
  TodayRoutineView,
} from '@/components/gym'
import type { LiveExercise } from '@/components/gym/LiveWorkoutModal'
import { Dumbbell, Calendar, BookOpen, Trophy, Sparkles, CheckCircle2 } from 'lucide-react'

const WEEK_SPLIT = [
  { day: 'Mon', label: 'Chest & Triceps Power', color: '#FF5C8D', done: true, muscles: ['chest', 'triceps'], kcal: 460, mins: 50 },
  { day: 'Tue', label: 'Back & Bicep Pull', color: '#00F0FF', done: true, muscles: ['back', 'biceps'], kcal: 480, mins: 55 },
  { day: 'Wed', label: 'Active Rest & Recovery', color: '#475569', done: true, muscles: [], kcal: 180, mins: 30 },
  { day: 'Thu', label: 'Shoulders & Arms Focus', color: '#FFB300', done: false, muscles: ['shoulders', 'biceps', 'triceps'], kcal: 440, mins: 45 },
  { day: 'Fri', label: 'Legs & Glutes Hypertrophy', color: '#7C5CFC', done: false, muscles: ['legs', 'glutes'], kcal: 540, mins: 60 },
  { day: 'Sat', label: 'Core & Functional Cardio', color: '#10b981', done: false, muscles: ['core'], kcal: 380, mins: 40 },
  { day: 'Sun', label: 'Full Body Conditioning', color: '#f97316', done: false, muscles: ['full_body'], kcal: 500, mins: 55 },
]

const DEFAULT_TODAY_EXERCISES: LiveExercise[] = [
  {
    id: '7',
    name: 'Seated Military Press',
    group: 'shoulders',
    icon: '🔥',
    targetReps: '8–10',
    restSeconds: 90,
    tip: 'Lock core tight and press vertically without hyper-extending lumbar spine',
    sets: [
      { setNum: 1, weight: 60, reps: 10, completed: false },
      { setNum: 2, weight: 65, reps: 8, completed: false },
      { setNum: 3, weight: 65, reps: 8, completed: false },
      { setNum: 4, weight: 70, reps: 6, completed: false },
    ],
  },
  {
    id: '8',
    name: 'Dumbbell Lateral Raises',
    group: 'shoulders',
    icon: '🏋️',
    targetReps: '12–15',
    restSeconds: 60,
    tip: 'Lead slightly with elbows; control the descent for 2 seconds',
    sets: [
      { setNum: 1, weight: 14, reps: 15, completed: false },
      { setNum: 2, weight: 16, reps: 12, completed: false },
      { setNum: 3, weight: 16, reps: 12, completed: false },
    ],
  },
  {
    id: '9',
    name: 'Incline Bicep Curls',
    group: 'biceps',
    icon: '💪',
    targetReps: '10–12',
    restSeconds: 60,
    tip: 'Allow deep stretch at the bottom without swinging shoulders',
    sets: [
      { setNum: 1, weight: 16, reps: 12, completed: false },
      { setNum: 2, weight: 18, reps: 10, completed: false },
      { setNum: 3, weight: 18, reps: 10, completed: false },
    ],
  },
  {
    id: '10',
    name: 'Tricep Rope Pushdown',
    group: 'triceps',
    icon: '🏆',
    targetReps: '12–15',
    restSeconds: 60,
    tip: 'Flare the rope apart aggressively at the bottom contraction',
    sets: [
      { setNum: 1, weight: 30, reps: 15, completed: false },
      { setNum: 2, weight: 35, reps: 12, completed: false },
      { setNum: 3, weight: 35, reps: 12, completed: false },
    ],
  },
]

export default function GymPage() {
  const [selectedGroup, setSelectedGroup] = useState<MuscleGroup | 'all'>('all')
  const [activeDayIdx, setActiveDayIdx] = useState(3) // Default Thursday
  const [activeTab, setActiveTab] = useState<'routine' | 'vault' | 'prs'>('routine')
  const [todayExercises, setTodayExercises] = useState<LiveExercise[]>(DEFAULT_TODAY_EXERCISES)
  const [liveModalOpen, setLiveModalOpen] = useState(false)
  const [sessionCompletedNotice, setSessionCompletedNotice] = useState<string | null>(null)

  const activeSplit = WEEK_SPLIT[activeDayIdx]

  const addedIds = useMemo(() => todayExercises.map((e) => e.id), [todayExercises])

  const handleSelectGroup = (g: MuscleGroup | 'all') => {
    setSelectedGroup((prev) => (prev === g ? 'all' : g))
  }

  // Add exercise from vault
  const handleAddExerciseFromVault = (id: string) => {
    if (addedIds.includes(id)) {
      // remove if already present
      setTodayExercises((prev) => prev.filter((e) => e.id !== id))
      return
    }

    const newEx: LiveExercise = {
      id,
      name: id === '1' ? 'Barbell Bench Press' : id === '2' ? 'Incline Dumbbell Press' : 'Compound Exercise',
      group: selectedGroup === 'all' ? 'chest' : selectedGroup,
      icon: '🏋️',
      targetReps: '8–10',
      restSeconds: 75,
      tip: 'Focus on full range of motion & controlled eccentric cadence',
      sets: [
        { setNum: 1, weight: 50, reps: 10, completed: false },
        { setNum: 2, weight: 55, reps: 8, completed: false },
        { setNum: 3, weight: 60, reps: 8, completed: false },
      ],
    }

    setTodayExercises((prev) => [...prev, newEx])
  }

  // Remove exercise from today's routine
  const handleRemoveExercise = (id: string) => {
    setTodayExercises((prev) => prev.filter((e) => e.id !== id))
  }

  // Swap exercise
  const handleSwapExercise = (id: string) => {
    setActiveTab('vault')
  }

  // Shuffle routine with AI alternate
  const handleShuffleRoutine = () => {
    const shuffled = [...todayExercises].reverse()
    setTodayExercises(shuffled)
  }

  // Finish workout handler
  const handleFinishWorkout = (summary: {
    totalVolumeKg: number
    totalSetsCompleted: number
    durationSec: number
    kcalBurned: number
  }) => {
    setSessionCompletedNotice(
      `Great job! Logged ${summary.totalVolumeKg.toLocaleString()} kg lifted and ${summary.kcalBurned} kcal burned.`
    )
    setTimeout(() => {
      setSessionCompletedNotice(null)
    }, 6000)
  }

  return (
    <motion.div
      className="w-full space-y-7 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── 1. Weekly Split Ribbon (Interactive day selector) ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {WEEK_SPLIT.map((item, idx) => {
          const isActive = idx === activeDayIdx
          return (
            <button
              key={item.day}
              onClick={() => setActiveDayIdx(idx)}
              className={`flex-1 min-w-[95px] p-3 rounded-2xl transition-all text-left flex flex-col justify-between cursor-pointer ${isActive
                  ? 'bg-cyan-500/15 border-cyan-400/50 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.06]'
                } border`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold ${isActive ? 'text-cyan-300' : 'text-slate-400'}`}>
                  {item.day}
                </span>
                {item.done ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                )}
              </div>
              <p className="text-[11px] font-semibold text-white truncate leading-tight">
                {item.label}
              </p>
            </button>
          )
        })}
      </div>

      {/* Notice Banner when a session finishes */}
      <AnimatePresence>
        {sessionCompletedNotice && (
          <motion.div
            className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-[0_0_25px_rgba(16,185,129,0.2)]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{sessionCompletedNotice}</span>
            </div>
            <button
              onClick={() => setSessionCompletedNotice(null)}
              className="text-emerald-300/60 hover:text-emerald-300"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 2. 3D Hero Stage (Interactive Barbell + Mission Briefing + 1-Tap CTA) ── */}
      <GymHero
        todaySession={activeSplit}
        selectedGroup={selectedGroup}
        onSelectGroup={handleSelectGroup}
        sessionStarted={liveModalOpen}
        onStartSession={() => setLiveModalOpen(true)}
        onShuffleRoutine={handleShuffleRoutine}
        exerciseCount={todayExercises.length}
        totalKcal={activeSplit.kcal}
        totalMins={activeSplit.mins}
      />

      {/* ── 3. Streamlined Navigation Tabs (Clean, Less Functions, Easy to Understand) ── */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
        <button
          onClick={() => setActiveTab('routine')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'routine'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Today&apos;s Routine ({todayExercises.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('vault')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'vault'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Exercise Vault</span>
        </button>

        <button
          onClick={() => setActiveTab('prs')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'prs'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40 shadow-[0_0_20px_rgba(255,179,0,0.2)]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
        >
          <Trophy className="w-4 h-4" />
          <span>PRs & Benchmarks</span>
        </button>
      </div>

      {/* ── 4. Tab Content Area ── */}
      <div>
        {activeTab === 'routine' && (
          <TodayRoutineView
            exercises={todayExercises}
            onRemoveExercise={handleRemoveExercise}
            onSwapExercise={handleSwapExercise}
            onStartWorkout={() => setLiveModalOpen(true)}
            onGoToVault={() => setActiveTab('vault')}
          />
        )}

        {activeTab === 'vault' && (
          <ExerciseLibrary
            selectedGroup={selectedGroup}
            onSelectGroup={handleSelectGroup}
            addedIds={addedIds}
            onAddExercise={handleAddExerciseFromVault}
          />
        )}

        {activeTab === 'prs' && <StrengthAnalytics />}
      </div>

      {/* ── 5. Live Workout Companion Modal (Active Live Tracking) ── */}
      <LiveWorkoutModal
        isOpen={liveModalOpen}
        onClose={() => setLiveModalOpen(false)}
        workoutName={activeSplit.label}
        exercises={todayExercises}
        onFinishWorkout={handleFinishWorkout}
      />
    </motion.div>
  )
}
