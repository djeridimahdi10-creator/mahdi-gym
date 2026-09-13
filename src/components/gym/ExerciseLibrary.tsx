'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Dumbbell, Clock, Flame, Plus, Check, Search, RotateCcw, Sparkles } from 'lucide-react'
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
  tip?: string
}

export const EXERCISE_CATALOG: ExerciseItem[] = [
  { id: '1', name: 'Barbell Bench Press', group: 'chest', diff: 'intermediate', mins: 15, kcal: 140, sets: 4, reps: '8–10', pr: '100kg', icon: '🏋️', trend: 5, tip: 'Keep shoulder blades squeezed together & feet planted' },
  { id: '2', name: 'Incline Dumbbell Press', group: 'chest', diff: 'beginner', mins: 12, kcal: 95, sets: 3, reps: '10–12', pr: '32kg', icon: '💪', trend: 2, tip: 'Set bench to 30 degrees to target upper clavicular head' },
  { id: '3', name: 'Cable Chest Flyes', group: 'chest', diff: 'beginner', mins: 10, kcal: 80, sets: 3, reps: '12–15', pr: '25kg', icon: '⚡', trend: 1, tip: 'Squeeze pecs at peak contraction for 1 second' },
  { id: '4', name: 'Conventional Deadlift', group: 'back', diff: 'advanced', mins: 20, kcal: 210, sets: 5, reps: '5', pr: '160kg', icon: '⚡', trend: 10, tip: 'Hinge at the hips, keep lats engaged and bar close to shins' },
  { id: '5', name: 'Weighted Lat Pull-Down', group: 'back', diff: 'intermediate', mins: 14, kcal: 110, sets: 4, reps: '8–10', pr: '80kg', icon: '🎯', trend: 0, tip: 'Pull with elbows down and back, not wrists' },
  { id: '6', name: 'Barbell Bent-Over Row', group: 'back', diff: 'intermediate', mins: 15, kcal: 130, sets: 4, reps: '8', pr: '90kg', icon: '🔥', trend: 4, tip: 'Maintain a neutral spine and pull to lower ribcage' },
  { id: '7', name: 'Seated Military Press', group: 'shoulders', diff: 'intermediate', mins: 15, kcal: 125, sets: 4, reps: '8', pr: '70kg', icon: '🔥', trend: 3, tip: 'Lock core and press overhead without arching lower back' },
  { id: '8', name: 'Dumbbell Lateral Raises', group: 'shoulders', diff: 'beginner', mins: 10, kcal: 70, sets: 4, reps: '12–15', pr: '16kg', icon: '🏋️', trend: 2, tip: 'Lead with elbows and avoid swinging torso' },
  { id: '9', name: 'Incline Bicep Curls', group: 'biceps', diff: 'beginner', mins: 10, kcal: 75, sets: 3, reps: '12', pr: '18kg', icon: '💪', trend: 1, tip: 'Deep bicep stretch at the bottom of each repetition' },
  { id: '10', name: 'Tricep Rope Pushdown', group: 'triceps', diff: 'intermediate', mins: 12, kcal: 90, sets: 3, reps: '12–15', pr: '35kg', icon: '🏆', trend: 4, tip: 'Flare the rope apart at the bottom contraction' },
  { id: '11', name: 'Barbell Back Squats', group: 'legs', diff: 'intermediate', mins: 22, kcal: 230, sets: 5, reps: '6', pr: '120kg', icon: '🦵', trend: 8, tip: 'Hit parallel depth, drive knees outward inline with toes' },
  { id: '12', name: 'Romanian Deadlifts', group: 'legs', diff: 'intermediate', mins: 16, kcal: 160, sets: 4, reps: '8–10', pr: '110kg', icon: '🦵', trend: 5, tip: 'Feel maximum hamstring stretch with slight knee bend' },
  { id: '13', name: 'Hanging Leg Raises', group: 'core', diff: 'intermediate', mins: 10, kcal: 65, sets: 3, reps: '15', pr: 'BW', icon: '⭕', trend: 0, tip: 'Curl pelvis up towards ribs rather than swinging legs' },
  { id: '14', name: 'Cable Woodchoppers', group: 'core', diff: 'beginner', mins: 10, kcal: 70, sets: 3, reps: '12', pr: '20kg', icon: '🎯', trend: 2, tip: 'Rotate through thoracic spine and brace obliques' },
]

const DIFF_CONFIG = {
  beginner: { label: 'Beginner', color: '#10b981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.25)' },
  intermediate: { label: 'Intermediate', color: '#FFB300', bg: 'rgba(255,179,0,0.12)', border: 'rgba(255,179,0,0.25)' },
  advanced: { label: 'Advanced', color: '#FF5C8D', bg: 'rgba(255,92,141,0.12)', border: 'rgba(255,92,141,0.25)' },
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
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    return EXERCISE_CATALOG.filter((e) => {
      const matchesGroup = selectedGroup === 'all' || e.group === selectedGroup
      const matchesSearch =
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.group.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesGroup && matchesSearch
    })
  }, [selectedGroup, searchQuery])

  return (
    <div id="exercise-library-section" className="space-y-5">
      {/* Search & Muscle Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exercises by name or muscle..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { key: 'all', label: 'All' },
            { key: 'chest', label: 'Chest' },
            { key: 'back', label: 'Back' },
            { key: 'shoulders', label: 'Delts' },
            { key: 'legs', label: 'Legs' },
            { key: 'core', label: 'Core' },
          ].map((m) => (
            <button
              key={m.key}
              onClick={() => onSelectGroup(m.key as MuscleGroup | 'all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${selectedGroup === m.key
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
                }`}
            >
              {m.label}
            </button>
          ))}

          {selectedGroup !== 'all' && (
            <button
              onClick={() => onSelectGroup('all')}
              className="px-2 py-1 text-slate-500 hover:text-slate-300 text-xs flex items-center gap-1 ml-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Grid of 3D Perspective Exercise Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((ex, index) => {
          const isAdded = addedIds.includes(ex.id)
          const diff = DIFF_CONFIG[ex.diff]

          return (
            <motion.div
              key={ex.id}
              className="group relative rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(13,20,38,0.85) 0%, rgba(18,27,48,0.75) 100%)',
                border: isAdded
                  ? '1px solid rgba(16,185,129,0.35)'
                  : '1px solid rgba(255,255,255,0.08)',
                boxShadow: isAdded
                  ? '0 10px 30px rgba(16,185,129,0.08), 0 0 20px rgba(16,185,129,0.06)'
                  : '0 8px 24px rgba(0,0,0,0.4)',
                transformStyle: 'preserve-3d',
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              whileHover={{
                y: -4,
                scale: 1.015,
                borderColor: isAdded ? 'rgba(16,185,129,0.5)' : 'rgba(0,240,255,0.35)',
                boxShadow: isAdded
                  ? '0 16px 36px rgba(16,185,129,0.2)'
                  : '0 16px 36px rgba(0,240,255,0.15), 0 0 30px rgba(0,240,255,0.08)',
              }}
            >
              {/* Top Accent Line */}
              <div
                className="h-1 w-full"
                style={{
                  background: isAdded
                    ? 'linear-gradient(90deg, #10b981, transparent)'
                    : `linear-gradient(90deg, ${diff.color}, transparent)`,
                }}
              />

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Top Row: Icon + Name + Diff */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        {ex.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-sm leading-snug group-hover:text-cyan-300 transition-colors">
                          {ex.name}
                        </h3>
                        <span className="text-slate-400 text-[11px] capitalize font-medium">
                          {ex.group}
                        </span>
                      </div>
                    </div>

                    <span
                      className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: diff.bg, color: diff.color, border: `1px solid ${diff.border}` }}
                    >
                      {diff.label}
                    </span>
                  </div>

                  {/* Sets / Reps / PR 3D Metric Blocks */}
                  <div className="grid grid-cols-3 gap-2 my-3">
                    <div className="rounded-xl p-2 text-center bg-white/[0.02] border border-white/[0.04]">
                      <p className="text-white text-xs font-black tabular-nums">{ex.sets}</p>
                      <p className="text-slate-500 text-[9px] uppercase tracking-wider">Sets</p>
                    </div>
                    <div className="rounded-xl p-2 text-center bg-white/[0.02] border border-white/[0.04]">
                      <p className="text-white text-xs font-black tabular-nums">{ex.reps}</p>
                      <p className="text-slate-500 text-[9px] uppercase tracking-wider">Reps</p>
                    </div>
                    <div className="rounded-xl p-2 text-center bg-white/[0.02] border border-white/[0.04]">
                      <p className="text-white text-xs font-black tabular-nums">{ex.pr}</p>
                      <p className="text-slate-500 text-[9px] uppercase tracking-wider">PR Max</p>
                    </div>
                  </div>

                  {ex.tip && (
                    <p className="text-slate-400 text-[11px] line-clamp-2 leading-relaxed italic">
                      &quot;{ex.tip}&quot;
                    </p>
                  )}
                </div>

                {/* Footer Strip */}
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#FFB300]" /> {ex.mins}m
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                      <Flame className="w-3.5 h-3.5 text-[#FF5C8D]" /> {ex.kcal}
                    </span>
                  </div>

                  <motion.button
                    onClick={() => onAddExercise(ex.id)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    style={
                      isAdded
                        ? {
                          background: 'rgba(16,185,129,0.15)',
                          color: '#10b981',
                          border: '1px solid rgba(16,185,129,0.3)',
                        }
                        : {
                          background: 'rgba(0,240,255,0.12)',
                          color: '#00F0FF',
                          border: '1px solid rgba(0,240,255,0.25)',
                        }
                    }
                    whileTap={{ scale: 0.95 }}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> In Routine
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" /> Add Move
                      </>
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
