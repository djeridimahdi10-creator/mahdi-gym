'use client'

import React, { useState } from 'react'
import { Dumbbell, Play, CheckCircle2, Award } from 'lucide-react'

const exercises = [
  {
    id: 'bench',
    title: 'Barbell Bench Press',
    target: 'Chest, Triceps & Front Delts',
    sets: [
      { set: 1, weight: '75 kg', reps: 12, done: true },
      { set: 2, weight: '80 kg', reps: 10, done: true },
      { set: 3, weight: '85 kg', reps: 8, done: false },
    ],
    emoji: '🏋️',
  },
  {
    id: 'squat',
    title: 'Barbell Back Squat',
    target: 'Quadriceps, Glutes & Core',
    sets: [
      { set: 1, weight: '100 kg', reps: 10, done: true },
      { set: 2, weight: '110 kg', reps: 8, done: true },
      { set: 3, weight: '120 kg', reps: 6, done: false },
    ],
    emoji: '🦵',
  },
]

export function StepWorkoutVisualizer() {
  const [selectedEx, setSelectedEx] = useState(0)
  const [setsState, setSetsState] = useState(exercises[selectedEx].sets)

  const handleToggleSet = (setIndex: number) => {
    const updated = [...setsState]
    updated[setIndex].done = !updated[setIndex].done
    setSetsState(updated)
  }

  const currentEx = exercises[selectedEx]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-energy-400/20 flex items-center justify-center text-energy-300">
            <Dumbbell className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Smart Gym Workout Engine</h4>
            <p className="text-xs text-dark-400">Targeted programs & video demonstrations</p>
          </div>
        </div>

        <div className="flex gap-1.5">
          {exercises.map((ex, idx) => (
            <button
              key={ex.id}
              onClick={() => {
                setSelectedEx(idx)
                setSetsState(exercises[idx].sets)
              }}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                selectedEx === idx
                  ? 'bg-energy-400/20 border border-energy-300 text-energy-300'
                  : 'bg-dark-800/40 text-dark-400 hover:text-white'
              }`}
            >
              {ex.emoji} {ex.title.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise Card Preview */}
      <div className="bg-dark-800/40 p-4 rounded-2xl border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{currentEx.emoji}</span> {currentEx.title}
            </h5>
            <span className="text-xs text-energy-300 font-medium">Target: {currentEx.target}</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-energy-400/10 border border-energy-300/20 flex items-center justify-center text-energy-300">
            <Play className="w-4 h-4" />
          </div>
        </div>

        {/* Set Tracker Table */}
        <div className="space-y-2">
          <div className="text-xs text-dark-400 uppercase font-medium flex justify-between px-2">
            <span>Set</span>
            <span>Weight</span>
            <span>Reps</span>
            <span>Status</span>
          </div>

          {setsState.map((set, i) => (
            <button
              key={i}
              onClick={() => handleToggleSet(i)}
              className={`w-full p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all ${
                set.done
                  ? 'bg-energy-400/10 border-energy-300/30 text-white'
                  : 'bg-dark-900/60 border-white/5 text-dark-400 hover:border-white/20'
              }`}
            >
              <span className="font-bold">Set {set.set}</span>
              <span>{set.weight}</span>
              <span>{set.reps} reps</span>
              <CheckCircle2 className={`w-4 h-4 ${set.done ? 'text-energy-300' : 'text-dark-600'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Muscle Focus Badge */}
      <div className="bg-gradient-to-r from-energy-400/10 via-dark-800/80 to-transparent p-3 rounded-xl border border-energy-300/20 flex items-center gap-3 text-xs">
        <Award className="w-5 h-5 text-energy-300 flex-shrink-0" />
        <span className="text-dark-300">
          Hypertrophy AI algorithm auto-adjusts weight load based on your last set RPE performance.
        </span>
      </div>
    </div>
  )
}
