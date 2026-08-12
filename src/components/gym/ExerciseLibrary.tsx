'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dumbbell, Clock, Flame, TrendingUp, Plus, Check, RotateCcw } from 'lucide-react'
import type { MuscleGroup } from '@/types'

export interface ExerciseItem {
  id: string
  name: string
  group: MuscleGroup
  diff: 'beginner' | 'intermediate' | 'advanced'
  mins: number
  kcal: number
  sets: number
  reps: string
  pr: string
  icon: string
  trend: number
}

const EXERCISES: ExerciseItem[] = [
  { id: '1',  name: 'Barbell Bench Press',    group: 'chest',     diff: 'intermediate', mins: 15, kcal: 140, sets: 4, reps: '8–10', pr: '100kg', icon: '🏋️', trend: 5 },
  { id: '2',  name: 'Incline Dumbbell Flyes', group: 'chest',     diff: 'beginner',     mins: 12, kcal:  95, sets: 3, reps: '12',   pr:  '24kg', icon: '💪', trend: 2 },
  { id: '3',  name: 'Conventional Deadlift',  group: 'back',      diff: 'advanced',     mins: 20, kcal: 210, sets: 5, reps: '5',    pr: '160kg', icon: '⚡', trend: 10 },
  { id: '4',  name: 'Weighted Lat Pull-Down', group: 'back',      diff: 'intermediate', mins: 14, kcal: 110, sets: 4, reps: '10',   pr:  '80kg', icon: '🎯', trend: 0 },
  { id: '5',  name: 'Seated Military Press',  group: 'shoulders', diff: 'intermediate', mins: 15, kcal: 125, sets: 4, reps: '8',    pr:  '70kg', icon: '🔥', trend: 3 },
  { id: '6',  name: 'Incline Bicep Curls',    group: 'biceps',    diff: 'beginner',     mins: 10, kcal:  75, sets: 3, reps: '12',   pr:  '18kg', icon: '💪', trend: 1 },
  { id: '7',  name: 'Tricep Rope Pushdown',   group: 'triceps',   diff: 'intermediate', mins: 12, kcal:  90, sets: 3, reps: '15',   pr:  '35kg', icon: '🏆', trend: 4 },
  { id: '8',  name: 'Barbell Back Squats',    group: 'legs',      diff: 'intermediate', mins: 22, kcal: 230, sets: 5, reps: '6',    pr: '120kg', icon: '🦵', trend: 8 },
  { id: '9',  name: 'Hanging Leg Raises',     group: 'core',      diff: 'intermediate', mins: 10, kcal:  65, sets: 3, reps: '15',   pr:  'BW',   icon: '⭕', trend: 0 },
]

const DIFF_CONFIG = {
  beginner:     { label: 'Beginner',     color: '#10b981', bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.25)' },
  intermediate: { label: 'Intermediate', color: '#FFB300', bg: 'rgba(255,179,0,0.12)',   border: 'rgba(255,179,0,0.25)' },
  advanced:     { label: 'Advanced',     color: '#FF5C8D', bg: 'rgba(255,92,141,0.12)',  border: 'rgba(255,92,141,0.25)' },
}

interface ExerciseLibraryProps {
  selectedGroup: MuscleGroup | 'all'
  onSelectGroup: (g: MuscleGroup | 'all') => void
  addedIds: string[]
  onAddExercise: (id: string) => void
}

export function ExerciseLibrary({
  selectedGroup,
  onSelectGroup,
  addedIds,
  onAddExercise,
}: ExerciseLibraryProps) {
  const filtered = EXERCISES.filter((e) => selectedGroup === 'all' || e.group === selectedGroup)

  return (
    <div id="exercise-library-section" className="space-y-4">
      {/* Header & Muscle Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.15)' }}
          >
            <Dumbbell className="w-4 h-4 text-[#00F0FF]" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-sm flex items-center gap-2">
              Exercise Library
              <span className="text-[11px] font-normal text-slate-500">({filtered.length} available)</span>
            </h2>
            <p className="text-slate-500 text-[11px]">Filter by muscle group & add to today&apos;s workout</p>
          </div>
        </div>

        {selectedGroup !== 'all' && (
          <button
            onClick={() => onSelectGroup('all')}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Show All
          </button>
        )}
      </div>

      {/* Grid of Exercise Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filtered.map((ex, index) => {
          const isAdded = addedIds.includes(ex.id)
          const diff = DIFF_CONFIG[ex.diff]

          return (
            <motion.div
              key={ex.id}
              className="rounded-2xl overflow-hidden flex flex-col justify-between transition-all"
              style={{
                background: 'rgba(17,23,36,0.90)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              whileHover={{ y: -3, boxShadow: '0 12px 30px rgba(0,0,0,0.4)' }}
            >
              {/* Top Accent Line */}
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${diff.color}, transparent)` }} />

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{ex.icon}</span>
                      <div>
                        <h3 className="text-white font-bold text-sm leading-tight">{ex.name}</h3>
                        <span className="text-slate-500 text-[10px] capitalize">{ex.group}</span>
                      </div>
                    </div>
                    <span
                      className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: diff.bg, color: diff.color, border: `1px solid ${diff.border}` }}
                    >
                      {diff.label}
                    </span>
                  </div>

                  {/* Sets / Reps / PR Grid */}
                  <div className="grid grid-cols-3 gap-2 my-2">
                    <div className="rounded-xl p-2 text-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <p className="text-white text-xs font-bold">{ex.sets}</p>
                      <p className="text-slate-500 text-[9px]">Sets</p>
                    </div>
                    <div className="rounded-xl p-2 text-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <p className="text-white text-xs font-bold">{ex.reps}</p>
                      <p className="text-slate-500 text-[9px]">Reps</p>
                    </div>
                    <div className="rounded-xl p-2 text-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <p className="text-white text-xs font-bold">{ex.pr}</p>
                      <p className="text-slate-500 text-[9px]">PR 1RM</p>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock className="w-3 h-3 text-[#FFB300]" /> {ex.mins}m
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Flame className="w-3 h-3 text-[#FF5C8D]" /> {ex.kcal}
                    </span>
                  </div>

                  <motion.button
                    onClick={() => onAddExercise(ex.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                    style={isAdded
                      ? { background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)' }
                      : { background: 'rgba(0,240,255,0.12)', color: '#00F0FF', border: '1px solid rgba(0,240,255,0.25)' }
                    }
                    whileTap={{ scale: 0.95 }}
                  >
                    {isAdded ? (
                      <><Check className="w-3.5 h-3.5" /> Added</>
                    ) : (
                      <><Plus className="w-3.5 h-3.5" /> Add</>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
