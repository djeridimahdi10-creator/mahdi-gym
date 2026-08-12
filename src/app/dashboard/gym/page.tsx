'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { MuscleGroup } from '@/types'
import {
  GymHero,
  GymQuickActions,
  ExerciseLibrary,
  SessionQueueTracker,
  StrengthAnalytics,
} from '@/components/gym'
import { Dumbbell } from 'lucide-react'

const WEEK_SPLIT = [
  { day: 'Mon', label: 'Chest & Triceps', color: '#FF5C8D', done: true,  muscles: ['chest', 'triceps'] },
  { day: 'Tue', label: 'Back & Biceps',   color: '#00F0FF', done: true,  muscles: ['back',  'biceps'] },
  { day: 'Wed', label: 'Rest Day',         color: '#475569', done: true,  muscles: [] },
  { day: 'Thu', label: 'Shoulders & Arms', color: '#FFB300', done: false, muscles: ['shoulders', 'biceps', 'triceps'] },
  { day: 'Fri', label: 'Legs & Glutes',   color: '#7C5CFC', done: false, muscles: ['legs', 'glutes'] },
  { day: 'Sat', label: 'Core & Cardio',   color: '#10b981', done: false, muscles: ['core'] },
  { day: 'Sun', label: 'Full Body',        color: '#f97316', done: false, muscles: ['full_body'] },
]

export default function GymPage() {
  const [selectedGroup, setSelectedGroup] = useState<MuscleGroup | 'all'>('all')
  const [activeDay] = useState(3) // Thursday
  const [addedIds, setAddedIds] = useState<string[]>(['1', '5']) // default queued
  const [sessionStarted, setSessionStarted] = useState(false)
  const [loadingAI, setLoadingAI] = useState(false)

  const handleSelectGroup = (g: MuscleGroup | 'all') => {
    setSelectedGroup((prev) => (prev === g ? 'all' : g))
  }

  const handleAddExercise = (id: string) => {
    setAddedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  const handleRemoveExercise = (id: string) => {
    setAddedIds((prev) => prev.filter((i) => i !== id))
  }

  const handleGenerateWorkout = () => {
    setLoadingAI(true)
    setTimeout(() => {
      setAddedIds(['1', '3', '5', '8'])
      setLoadingAI(false)
    }, 1000)
  }

  return (
    <motion.div
      className="w-full space-y-7 pb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── 1. Page Top Header ── */}
      <div
        className="relative rounded-3xl overflow-hidden p-5 sm:p-6"
        style={{
          background: 'linear-gradient(135deg, rgba(6,11,24,0.98) 0%, rgba(12,4,18,0.95) 100%)',
          border: '1px solid rgba(0,240,255,0.12)',
          boxShadow: '0 0 40px rgba(0,240,255,0.03)',
        }}
      >
        <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)', transform: 'translate(20%,-30%)' }} />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center glow-ring"
              style={{ background: 'linear-gradient(135deg, rgba(0,240,255,0.18), rgba(124,92,252,0.15))', border: '1px solid rgba(0,240,255,0.25)' }}
            >
              <Dumbbell className="w-6 h-6 text-[#00F0FF]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="badge-live" style={{ background: 'rgba(0,240,255,0.08)', color: '#00F0FF', border: '1px solid rgba(0,240,255,0.2)' }}>Iron Command</span>
                <span className="text-[10px] text-slate-500 font-mono">v2026.4</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                AI Gym & Workout Studio
              </h1>
              <p className="text-slate-500 text-xs mt-0.5">Hypertrophy Training · Progressive Overload Tracking</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Quick Actions Strip ── */}
      <GymQuickActions
        onStartSession={() => setSessionStarted(!sessionStarted)}
        onGenerateWorkout={handleGenerateWorkout}
        loadingAI={loadingAI}
      />

      {/* ── 3. Gym Hero (3D Dumbbell + Session Overview) ── */}
      <GymHero
        todaySession={WEEK_SPLIT[activeDay]}
        selectedGroup={selectedGroup}
        onSelectGroup={handleSelectGroup}
        sessionStarted={sessionStarted}
        onStartSession={() => setSessionStarted(!sessionStarted)}
      />

      {/* ── 4. Main Grid: Exercise Library + Active Session Queue ── */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8">
          <ExerciseLibrary
            selectedGroup={selectedGroup}
            onSelectGroup={handleSelectGroup}
            addedIds={addedIds}
            onAddExercise={handleAddExercise}
          />
        </div>

        <div className="col-span-12 lg:col-span-4" style={{ minHeight: '380px' }}>
          <SessionQueueTracker
            addedIds={addedIds}
            onRemoveExercise={handleRemoveExercise}
            onStartSession={() => setSessionStarted(!sessionStarted)}
            sessionStarted={sessionStarted}
          />
        </div>
      </div>

      {/* ── 5. Strength Analytics & PR Board ── */}
      <StrengthAnalytics />
    </motion.div>
  )
}
