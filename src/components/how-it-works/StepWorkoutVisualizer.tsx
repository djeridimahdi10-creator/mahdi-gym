'use client'

import React, { useState } from 'react'
import { Dumbbell, CheckCircle2, Award, Plus, Minus, Timer, RotateCcw } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface WorkoutSet {
  setNumber: number
  weight: number
  reps: number
  done: boolean
}

interface Exercise {
  id: string
  title: string
  target: string
  primaryMuscle: string
  emoji: string
  restSeconds: number
  initialSets: WorkoutSet[]
}

const workoutSplits: { id: string; name: string; tag: string; exercises: Exercise[] }[] = [
  {
    id: 'push',
    name: 'Push Day A',
    tag: 'Chest / Delts / Triceps',
    exercises: [
      {
        id: 'bench',
        title: 'Barbell Flat Bench Press',
        target: 'Pectoralis Major, Anterior Deltoids & Triceps',
        primaryMuscle: 'Chest',
        emoji: '🏋️',
        restSeconds: 90,
        initialSets: [
          { setNumber: 1, weight: 80, reps: 10, done: true },
          { setNumber: 2, weight: 85, reps: 8, done: true },
          { setNumber: 3, weight: 90, reps: 6, done: false },
        ],
      },
      {
        id: 'incline-db',
        title: 'Incline Dumbbell Press',
        target: 'Upper Chest Clavicular Head',
        primaryMuscle: 'Upper Chest',
        emoji: '💪',
        restSeconds: 75,
        initialSets: [
          { setNumber: 1, weight: 30, reps: 12, done: true },
          { setNumber: 2, weight: 32, reps: 10, done: false },
          { setNumber: 3, weight: 34, reps: 8, done: false },
        ],
      },
    ],
  },
  {
    id: 'pull',
    name: 'Pull Day B',
    tag: 'Back / Lats / Biceps',
    exercises: [
      {
        id: 'lat-pulldown',
        title: 'Neutral-Grip Lat Pulldown',
        target: 'Latissimus Dorsi, Teres Major & Biceps',
        primaryMuscle: 'Lats',
        emoji: '🧗',
        restSeconds: 90,
        initialSets: [
          { setNumber: 1, weight: 65, reps: 12, done: true },
          { setNumber: 2, weight: 70, reps: 10, done: true },
          { setNumber: 3, weight: 75, reps: 8, done: false },
        ],
      },
      {
        id: 'barbell-curl',
        title: 'EZ-Bar Bicep Preacher Curl',
        target: 'Biceps Brachii Short & Long Head',
        primaryMuscle: 'Biceps',
        emoji: '💥',
        restSeconds: 60,
        initialSets: [
          { setNumber: 1, weight: 35, reps: 12, done: true },
          { setNumber: 2, weight: 37.5, reps: 10, done: false },
          { setNumber: 3, weight: 40, reps: 8, done: false },
        ],
      },
    ],
  },
  {
    id: 'legs',
    name: 'Leg Day C',
    tag: 'Quads / Hamstrings / Core',
    exercises: [
      {
        id: 'squat',
        title: 'Barbell Olympic Back Squat',
        target: 'Quadriceps, Gluteus Maximus & Core Stability',
        primaryMuscle: 'Quads & Glutes',
        emoji: '🦵',
        restSeconds: 120,
        initialSets: [
          { setNumber: 1, weight: 100, reps: 10, done: true },
          { setNumber: 2, weight: 110, reps: 8, done: true },
          { setNumber: 3, weight: 120, reps: 6, done: false },
        ],
      },
    ],
  },
]

export function StepWorkoutVisualizer() {
  const [splitIdx, setSplitIdx] = useState(0)
  const [exIdx, setExIdx] = useState(0)
  const [setsState, setSetsState] = useState<WorkoutSet[]>(
    workoutSplits[0].exercises[0].initialSets
  )
  const [activeRest, setActiveRest] = useState(false)
  const [restCount, setRestCount] = useState(90)

  const currentSplit = workoutSplits[splitIdx]
  const currentEx = currentSplit.exercises[exIdx] || currentSplit.exercises[0]

  const handleSelectSplit = (newSplitIdx: number) => {
    setSplitIdx(newSplitIdx)
    setExIdx(0)
    setSetsState(workoutSplits[newSplitIdx].exercises[0].initialSets)
    setActiveRest(false)
  }

  const handleSelectEx = (newExIdx: number) => {
    setExIdx(newExIdx)
    setSetsState(currentSplit.exercises[newExIdx].initialSets)
    setActiveRest(false)
  }

  // Toggle set done
  const handleToggleSet = (index: number) => {
    const updated = [...setsState]
    updated[index].done = !updated[index].done
    setSetsState(updated)

    if (updated[index].done) {
      setActiveRest(true)
      setRestCount(currentEx.restSeconds)
    }
  }

  // Weight adjustment (+ / - 2.5kg)
  const adjustWeight = (index: number, delta: number) => {
    const updated = [...setsState]
    updated[index].weight = Math.max(0, updated[index].weight + delta)
    setSetsState(updated)
  }

  // Rep adjustment (+ / - 1 rep)
  const adjustReps = (index: number, delta: number) => {
    const updated = [...setsState]
    updated[index].reps = Math.max(1, updated[index].reps + delta)
    setSetsState(updated)
  }

  const completedSetsCount = setsState.filter((s) => s.done).length
  const totalVolume = setsState
    .filter((s) => s.done)
    .reduce((acc, s) => acc + s.weight * s.reps, 0)

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-energy-400/20 border border-energy-300/30 flex items-center justify-center text-energy-300 shadow-sm">
            <Dumbbell className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              Adaptive Gym Engine & Progressive Overload
            </h4>
            <p className="text-xs text-dark-400">Volume tracking, RPE adjustment, and video demo log</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="xs"
          onClick={() => {
            setSetsState(currentEx.initialSets)
            setActiveRest(false)
          }}
          className="text-xs text-dark-400 hover:text-white border border-white/5"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </Button>
      </div>

      {/* Split Selector Tabs using shadcn Card */}
      <div>
        <div className="text-[11px] font-semibold text-dark-400 uppercase tracking-wider mb-2">
          Select Training Split
        </div>
        <div className="grid grid-cols-3 gap-2">
          {workoutSplits.map((split, idx) => (
            <Card
              key={split.id}
              variant="hover"
              onClick={() => handleSelectSplit(idx)}
              className={`p-2.5 text-xs transition-all text-left cursor-pointer ${
                splitIdx === idx
                  ? 'bg-energy-400/20 border-energy-300 text-white shadow-lg shadow-energy-400/15'
                  : 'bg-dark-900/60 border-white/5 text-dark-400 hover:border-white/20 hover:text-white'
              }`}
            >
              <div className="font-bold text-white text-xs">{split.name}</div>
              <div className="text-[10px] text-energy-300/80 truncate mt-0.5">{split.tag}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Exercise Pill Tabs using shadcn Button */}
      <div className="flex gap-2">
        {currentSplit.exercises.map((ex, idx) => (
          <Button
            key={ex.id}
            variant={exIdx === idx ? 'secondary' : 'ghost'}
            size="xs"
            onClick={() => handleSelectEx(idx)}
            className="text-xs font-semibold gap-1.5"
          >
            <span>{ex.emoji}</span>
            <span>{ex.title.split(' ')[0]} {ex.title.split(' ')[1]}</span>
          </Button>
        ))}
      </div>

      {/* Exercise Card with interactive set logger */}
      <Card variant="static" className="p-4 sm:p-5 space-y-4">
        {/* Exercise Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h5 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-xl">{currentEx.emoji}</span>
              <span>{currentEx.title}</span>
            </h5>
            <div className="text-xs text-energy-300 font-medium mt-0.5">
              Focus: {currentEx.target}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-dark-950 px-3 py-1.5 rounded-xl border border-white/5 text-right font-mono text-xs">
              <div className="text-[10px] text-dark-400">Total Volume</div>
              <div className="font-bold text-white">{totalVolume.toLocaleString()} kg</div>
            </div>
            <Button
              variant={activeRest ? 'energy' : 'outline'}
              size="xs"
              onClick={() => setActiveRest(!activeRest)}
              className="text-xs"
              title="Rest Timer"
            >
              <Timer className="w-3.5 h-3.5" />
              <span>{activeRest ? `${restCount}s Rest` : 'Rest'}</span>
            </Button>
          </div>
        </div>

        {/* Sets Table */}
        <div className="space-y-2">
          <div className="text-[10px] text-dark-400 uppercase font-semibold grid grid-cols-12 px-3">
            <span className="col-span-2">Set</span>
            <span className="col-span-4 text-center">Load (kg)</span>
            <span className="col-span-4 text-center">Reps</span>
            <span className="col-span-2 text-right">Status</span>
          </div>

          {setsState.map((set, i) => (
            <div
              key={i}
              className={`p-2.5 sm:p-3 rounded-xl border transition-all grid grid-cols-12 items-center ${
                set.done
                  ? 'bg-energy-400/10 border-energy-300/30 text-white'
                  : 'bg-dark-950/70 border-white/5 text-dark-300'
              }`}
            >
              {/* Set # */}
              <div className="col-span-2 font-bold font-mono text-xs text-white">
                Set {set.setNumber}
              </div>

              {/* Weight Adjustment */}
              <div className="col-span-4 flex items-center justify-center gap-1.5">
                <button
                  onClick={() => adjustWeight(i, -2.5)}
                  className="w-5 h-5 rounded bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white flex items-center justify-center text-xs cursor-pointer"
                >
                  <Minus className="w-2.5 h-2.5" />
                </button>
                <span className="font-mono font-bold text-xs text-white w-14 text-center">
                  {set.weight} kg
                </span>
                <button
                  onClick={() => adjustWeight(i, 2.5)}
                  className="w-5 h-5 rounded bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white flex items-center justify-center text-xs cursor-pointer"
                >
                  <Plus className="w-2.5 h-2.5" />
                </button>
              </div>

              {/* Reps Adjustment */}
              <div className="col-span-4 flex items-center justify-center gap-1.5">
                <button
                  onClick={() => adjustReps(i, -1)}
                  className="w-5 h-5 rounded bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white flex items-center justify-center text-xs cursor-pointer"
                >
                  <Minus className="w-2.5 h-2.5" />
                </button>
                <span className="font-mono font-bold text-xs text-white w-12 text-center">
                  {set.reps} reps
                </span>
                <button
                  onClick={() => adjustReps(i, 1)}
                  className="w-5 h-5 rounded bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white flex items-center justify-center text-xs cursor-pointer"
                >
                  <Plus className="w-2.5 h-2.5" />
                </button>
              </div>

              {/* Completion Toggle */}
              <div className="col-span-2 flex justify-end">
                <button
                  onClick={() => handleToggleSet(i)}
                  className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    set.done
                      ? 'bg-energy-400 text-dark-950 font-bold shadow-md shadow-energy-400/20'
                      : 'border border-dark-600 text-dark-500 hover:border-white/30'
                  }`}
                  title={set.done ? 'Mark incomplete' : 'Mark done'}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Set progress bar */}
        <div className="flex items-center justify-between text-xs text-dark-400 pt-1">
          <span>Progress: {completedSetsCount} of {setsState.length} sets completed</span>
          <span className="text-energy-300 font-semibold font-mono">
            {Math.round((completedSetsCount / setsState.length) * 100)}%
          </span>
        </div>
      </Card>

      {/* Hypertrophy Algorithm Callout */}
      <div className="bg-gradient-to-r from-energy-400/10 via-dark-900 to-transparent p-3.5 rounded-xl border border-energy-300/20 flex items-center gap-3 text-xs">
        <Award className="w-5 h-5 text-energy-300 flex-shrink-0" />
        <span className="text-dark-300 leading-relaxed">
          <strong>Hypertrophy Overload Engine:</strong> If all sets are logged at RPE &le; 8, the algorithm automatically bumps next week&apos;s working weight by <strong>+2.5 kg</strong>.
        </span>
      </div>
    </div>
  )
}
