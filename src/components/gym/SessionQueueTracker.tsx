'use client'

import { motion } from 'framer-motion'
import { Star, Plus, Play, Flame, Clock, Trash2, ChevronRight } from 'lucide-react'

interface ExerciseItem {
  id: string
  name: string
  icon: string
  sets: number
  reps: string
  mins: number
  kcal: number
}

const ALL_EXERCISES: ExerciseItem[] = [
  { id: '1',  name: 'Barbell Bench Press',    icon: '🏋️', sets: 4, reps: '8–10', mins: 15, kcal: 140 },
  { id: '2',  name: 'Incline Dumbbell Flyes', icon: '💪', sets: 3, reps: '12',   mins: 12, kcal: 95 },
  { id: '3',  name: 'Conventional Deadlift',  icon: '⚡', sets: 5, reps: '5',    mins: 20, kcal: 210 },
  { id: '4',  name: 'Weighted Lat Pull-Down', icon: '🎯', sets: 4, reps: '10',   mins: 14, kcal: 110 },
  { id: '5',  name: 'Seated Military Press',  icon: '🔥', sets: 4, reps: '8',    mins: 15, kcal: 125 },
  { id: '6',  name: 'Incline Bicep Curls',    icon: '💪', sets: 3, reps: '12',   mins: 10, kcal: 75 },
  { id: '7',  name: 'Tricep Rope Pushdown',   icon: '🏆', sets: 3, reps: '15',   mins: 12, kcal: 90 },
  { id: '8',  name: 'Barbell Back Squats',    icon: '🦵', sets: 5, reps: '6',    mins: 22, kcal: 230 },
  { id: '9',  name: 'Hanging Leg Raises',     icon: '⭕', sets: 3, reps: '15',   mins: 10, kcal: 65 },
]

interface SessionQueueTrackerProps {
  addedIds: string[]
  onRemoveExercise: (id: string) => void
  onStartSession: () => void
  sessionStarted: boolean
}

export function SessionQueueTracker({
  addedIds,
  onRemoveExercise,
  onStartSession,
  sessionStarted,
}: SessionQueueTrackerProps) {
  const added = ALL_EXERCISES.filter((e) => addedIds.includes(e.id))
  const totalKcal = added.reduce((s, e) => s + e.kcal, 0)
  const totalMins = added.reduce((s, e) => s + e.mins, 0)

  return (
    <div
      className="rounded-2xl p-5 flex flex-col justify-between h-full"
      style={{ background: 'rgba(17,23,36,0.90)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-semibold text-sm flex items-center gap-2">
            <Star className="w-4 h-4 text-[#FFB300]" />
            Session Queue
          </h2>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(0,240,255,0.1)', color: '#00F0FF', border: '1px solid rgba(0,240,255,0.2)' }}
          >
            {added.length} queued
          </span>
        </div>

        {/* Aggregate Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="rounded-xl p-2.5 text-center" style={{ background: 'rgba(255,92,141,0.08)', border: '1px solid rgba(255,92,141,0.15)' }}>
            <p className="text-[#FF5C8D] font-bold text-base tabular-nums">{totalKcal}</p>
            <p className="text-slate-500 text-[10px]">Est kcal</p>
          </div>
          <div className="rounded-xl p-2.5 text-center" style={{ background: 'rgba(255,179,0,0.08)', border: '1px solid rgba(255,179,0,0.15)' }}>
            <p className="text-[#FFB300] font-bold text-base tabular-nums">{totalMins}</p>
            <p className="text-slate-500 text-[10px]">Est mins</p>
          </div>
        </div>

        {/* Exercise Queue List */}
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
          {added.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed border-white/10 rounded-xl">
              <Plus className="w-6 h-6 text-slate-600 mb-1" />
              <p className="text-slate-500 text-xs font-semibold">Queue empty</p>
              <p className="text-slate-600 text-[10px] mt-0.5">Add exercises from the library grid</p>
            </div>
          ) : (
            added.map((ex) => (
              <motion.div
                key={ex.id}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 justify-between"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-base flex-shrink-0">{ex.icon}</span>
                  <div className="min-w-0">
                    <p className="text-white text-xs font-semibold truncate">{ex.name}</p>
                    <p className="text-slate-500 text-[10px]">{ex.sets} sets × {ex.reps}</p>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveExercise(ex.id)}
                  className="text-slate-600 hover:text-red-400 transition-colors p-1"
                  title="Remove from queue"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Start Session CTA */}
      {added.length > 0 && (
        <motion.button
          onClick={onStartSession}
          className="mt-4 w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #00F0FF, #0066FF)',
            color: '#0B0F19',
            boxShadow: '0 0 20px rgba(0,240,255,0.25)',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{sessionStarted ? 'Session In Progress' : 'Begin Queued Workout'}</span>
          <Play className="w-3.5 h-3.5 fill-current" />
        </motion.button>
      )}
    </div>
  )
}
