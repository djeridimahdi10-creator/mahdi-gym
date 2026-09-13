'use client'

import { motion } from 'framer-motion'
import { Dumbbell, Clock, Flame, Play, Plus, Trash2, ArrowUpDown, CheckCircle2, Sparkles } from 'lucide-react'
import type { LiveExercise } from './LiveWorkoutModal'

interface TodayRoutineViewProps {
  exercises: LiveExercise[]
  onRemoveExercise: (id: string) => void
  onSwapExercise: (id: string) => void
  onStartWorkout: () => void
  onGoToVault: () => void
}

export function TodayRoutineView({
  exercises,
  onRemoveExercise,
  onSwapExercise,
  onStartWorkout,
  onGoToVault,
}: TodayRoutineViewProps) {
  const totalSets = exercises.reduce((sum, e) => sum + e.sets.length, 0)
  const estMins = exercises.length * 12

  return (
    <div className="space-y-6">
      {/* Routine Header Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.2)' }}
          >
            <Dumbbell className="w-5 h-5 text-[#00F0FF]" />
          </div>
          <div>
            <h2 className="text-white font-bold text-base flex items-center gap-2">
              Today&apos;s Workout Sequence
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                {exercises.length} Exercises Planned
              </span>
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">
              Follow this sequence for optimal warm-up, compound recruitment, and isolation burnout.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={onGoToVault}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Exercise</span>
          </button>

          <motion.button
            onClick={onStartWorkout}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #00F0FF 0%, #0070F3 100%)',
              color: '#040d1a',
              boxShadow: '0 0 20px rgba(0,240,255,0.3)',
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch Live</span>
          </motion.button>
        </div>
      </div>

      {/* Routine Cards Grid */}
      {exercises.length === 0 ? (
        <div className="py-16 text-center rounded-3xl border border-dashed border-white/10 p-8 space-y-3">
          <Dumbbell className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-white font-bold text-base">No exercises in today&apos;s plan</p>
          <p className="text-slate-400 text-xs max-w-sm mx-auto">
            Add exercises from the Exercise Vault or shuffle with AI to generate a hyper-targeted split.
          </p>
          <button
            onClick={onGoToVault}
            className="px-5 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-bold mt-2 cursor-pointer"
          >
            Browse Exercise Vault
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exercises.map((ex, index) => (
            <motion.div
              key={ex.id}
              className="group relative rounded-3xl p-5 flex flex-col justify-between transition-all overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(13,20,38,0.92) 0%, rgba(18,27,48,0.85) 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                transformStyle: 'preserve-3d',
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{
                y: -4,
                borderColor: 'rgba(0,240,255,0.3)',
                boxShadow: '0 16px 36px rgba(0,0,0,0.5), 0 0 25px rgba(0,240,255,0.08)',
              }}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {ex.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold">
                        MOVE #{index + 1}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10">
                        {ex.group}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-base group-hover:text-cyan-300 transition-colors">
                      {ex.name}
                    </h3>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onSwapExercise(ex.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-white/5 transition-colors cursor-pointer"
                    title="Swap exercise"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveExercise(ex.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                    title="Remove from routine"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Set & Reps Summary Bento */}
              <div className="grid grid-cols-3 gap-2 my-4">
                <div className="rounded-xl p-2.5 bg-white/[0.03] border border-white/[0.04] text-center">
                  <p className="text-white text-sm font-black tabular-nums">{ex.sets.length}</p>
                  <p className="text-slate-500 text-[10px] uppercase font-bold">Total Sets</p>
                </div>
                <div className="rounded-xl p-2.5 bg-white/[0.03] border border-white/[0.04] text-center">
                  <p className="text-white text-sm font-black tabular-nums">{ex.targetReps}</p>
                  <p className="text-slate-500 text-[10px] uppercase font-bold">Target Reps</p>
                </div>
                <div className="rounded-xl p-2.5 bg-white/[0.03] border border-white/[0.04] text-center">
                  <p className="text-white text-sm font-black tabular-nums">{ex.restSeconds}s</p>
                  <p className="text-slate-500 text-[10px] uppercase font-bold">Rest</p>
                </div>
              </div>

              {/* Coaching Tip */}
              {ex.tip && (
                <div className="text-[11px] text-slate-400 bg-white/[0.02] border border-white/[0.04] rounded-xl p-2.5 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span className="truncate">{ex.tip}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
