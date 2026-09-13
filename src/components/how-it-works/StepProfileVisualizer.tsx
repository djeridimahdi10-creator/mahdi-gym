'use client'

import React, { useState, useMemo } from 'react'
import { User, Flame, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

type GoalType = 'loss' | 'muscle' | 'maint'
type ActivityLevel = 'sedentary' | 'moderate' | 'active'

export function StepProfileVisualizer() {
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [goal, setGoal] = useState<GoalType>('muscle')
  const [weight, setWeight] = useState<number>(78)
  const [height, setHeight] = useState<number>(180)
  const [age, setAge] = useState<number>(26)
  const [activity, setActivity] = useState<ActivityLevel>('moderate')

  // Mifflin-St Jeor Formula calculation
  const calculations = useMemo(() => {
    // BMR
    const bmr =
      gender === 'male'
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161

    // Activity multiplier
    const actMultiplier =
      activity === 'sedentary' ? 1.2 : activity === 'moderate' ? 1.55 : 1.75
    const tdee = Math.round(bmr * actMultiplier)

    // Goal delta
    const delta = goal === 'muscle' ? 350 : goal === 'loss' ? -450 : 0
    const targetCalories = Math.max(1400, Math.round(tdee + delta))

    // Macro distributions (grams)
    const proteinGrams = Math.round(weight * (goal === 'muscle' ? 2.2 : goal === 'loss' ? 2.0 : 1.8))
    const fatsCalories = targetCalories * 0.25
    const fatsGrams = Math.round(fatsCalories / 9)
    const carbsCalories = Math.max(0, targetCalories - (proteinGrams * 4 + fatsCalories))
    const carbsGrams = Math.round(carbsCalories / 4)

    // Percentages
    const proteinPct = Math.round(((proteinGrams * 4) / targetCalories) * 100)
    const carbsPct = Math.round(((carbsGrams * 4) / targetCalories) * 100)
    const fatsPct = Math.max(0, 100 - (proteinPct + carbsPct))

    return {
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      proteinGrams,
      carbsGrams,
      fatsGrams,
      proteinPct,
      carbsPct,
      fatsPct,
    }
  }, [gender, goal, weight, height, age, activity])

  // Quick preset handler
  const applyPreset = (presetGoal: GoalType, pWeight: number, pHeight: number, pActivity: ActivityLevel) => {
    setGoal(presetGoal)
    setWeight(pWeight)
    setHeight(pHeight)
    setActivity(pActivity)
  }

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary-500/20 border border-primary-400/30 flex items-center justify-center text-primary-300 shadow-sm">
            <User className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              Biometrics & Metabolic Calculator
            </h4>
            <p className="text-xs text-dark-400">Mifflin-St Jeor Algorithm + Adaptive Macro Engine</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="xs"
          onClick={() => {
            setGender('male')
            setGoal('muscle')
            setWeight(78)
            setHeight(180)
            setAge(26)
            setActivity('moderate')
          }}
          className="text-xs text-dark-400 hover:text-white border border-white/5"
          title="Reset to default"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </Button>
      </div>

      {/* Quick Presets Pills using shadcn Button */}
      <div>
        <div className="text-[11px] font-semibold text-dark-400 uppercase tracking-wider mb-2">
          One-Click Sample Personas
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            size="xs"
            onClick={() => applyPreset('loss', 88, 175, 'sedentary')}
            className="text-xs"
          >
            🔥 Fat Loss Cut (88kg)
          </Button>
          <Button
            variant="secondary"
            size="xs"
            onClick={() => applyPreset('muscle', 74, 182, 'active')}
            className="text-xs"
          >
            💪 Lean Bulk (74kg)
          </Button>
          <Button
            variant="secondary"
            size="xs"
            onClick={() => applyPreset('maint', 68, 168, 'moderate')}
            className="text-xs"
          >
            ⚡ Recomp & Tone (68kg)
          </Button>
        </div>
      </div>

      {/* Goal Selector */}
      <div>
        <label className="text-[11px] font-semibold text-dark-300 mb-2 block uppercase tracking-wider">
          1. Select Primary Objective
        </label>
        <div className="grid grid-cols-3 gap-2">
          {([
            { id: 'muscle', label: 'Muscle Gain', sub: '+350 kcal surplus', icon: '💪' },
            { id: 'loss', label: 'Fat Loss', sub: '-450 kcal deficit', icon: '🔥' },
            { id: 'maint', label: 'Maintain', sub: 'Balanced TDEE', icon: '⚡' },
          ] as const).map((item) => (
            <Card
              key={item.id}
              variant="hover"
              onClick={() => setGoal(item.id)}
              className={`p-3 text-xs font-medium transition-all flex flex-col items-center gap-1 cursor-pointer text-center ${
                goal === item.id
                  ? 'bg-primary-500/20 border-primary-400 text-white shadow-lg shadow-primary-500/15 scale-[1.02]'
                  : 'bg-dark-900/60 border-white/5 text-dark-400 hover:border-white/20 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-bold text-white">{item.label}</span>
              <span className="text-[10px] text-dark-400">{item.sub}</span>
            </Card>
          ))}
        </div>
      </div>

      {/* Gender & Activity Level Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Gender Toggle */}
        <Card variant="static" className="p-3">
          <label className="text-[11px] font-semibold text-dark-400 uppercase tracking-wider block mb-2">
            Biological Gender
          </label>
          <div className="grid grid-cols-2 gap-1.5 bg-dark-950 p-1 rounded-lg border border-white/5">
            <Button
              variant={gender === 'male' ? 'primary' : 'ghost'}
              size="xs"
              onClick={() => setGender('male')}
              className="text-xs"
            >
              Male (+5 BMR)
            </Button>
            <Button
              variant={gender === 'female' ? 'primary' : 'ghost'}
              size="xs"
              onClick={() => setGender('female')}
              className="text-xs"
            >
              Female (-161 BMR)
            </Button>
          </div>
        </Card>

        {/* Activity Selector */}
        <Card variant="static" className="p-3">
          <label className="text-[11px] font-semibold text-dark-400 uppercase tracking-wider block mb-2">
            Daily Activity Level
          </label>
          <div className="grid grid-cols-3 gap-1 bg-dark-950 p-1 rounded-lg border border-white/5 text-[11px]">
            {([
              { id: 'sedentary', label: 'Desk Job', factor: '1.2x' },
              { id: 'moderate', label: '3-4x Gym', factor: '1.55x' },
              { id: 'active', label: 'Athletic', factor: '1.75x' },
            ] as const).map((a) => (
              <Button
                key={a.id}
                variant={activity === a.id ? 'primary' : 'ghost'}
                size="xs"
                onClick={() => setActivity(a.id)}
                className="h-auto py-1 px-1 flex flex-col text-center"
              >
                <div className="text-[11px] font-semibold">{a.label}</div>
                <div className="text-[9px] text-dark-400 font-mono">{a.factor}</div>
              </Button>
            ))}
          </div>
        </Card>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Weight */}
        <Card variant="static" className="p-3.5 space-y-2">
          <div className="flex justify-between items-baseline text-xs">
            <span className="text-dark-400 font-medium">Body Weight</span>
            <span className="text-primary-300 font-bold font-mono text-sm">{weight} kg</span>
          </div>
          <input
            type="range"
            min="45"
            max="135"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full accent-primary-400 h-1.5 bg-dark-800 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-dark-500">
            <span>45kg</span>
            <span>135kg</span>
          </div>
        </Card>

        {/* Height */}
        <Card variant="static" className="p-3.5 space-y-2">
          <div className="flex justify-between items-baseline text-xs">
            <span className="text-dark-400 font-medium">Height</span>
            <span className="text-primary-300 font-bold font-mono text-sm">{height} cm</span>
          </div>
          <input
            type="range"
            min="145"
            max="215"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full accent-primary-400 h-1.5 bg-dark-800 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-dark-500">
            <span>145cm</span>
            <span>215cm</span>
          </div>
        </Card>

        {/* Age */}
        <Card variant="static" className="p-3.5 space-y-2">
          <div className="flex justify-between items-baseline text-xs">
            <span className="text-dark-400 font-medium">Age</span>
            <span className="text-primary-300 font-bold font-mono text-sm">{age} yrs</span>
          </div>
          <input
            type="range"
            min="16"
            max="75"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full accent-primary-400 h-1.5 bg-dark-800 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-dark-500">
            <span>16y</span>
            <span>75y</span>
          </div>
        </Card>
      </div>

      {/* Calculated Metabolic Card using shadcn Card */}
      <Card variant="premium" className="p-5 relative overflow-hidden space-y-4">
        <div className="absolute top-0 right-0 w-44 h-44 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top summary row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-primary-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary-400" />
              Target Daily Calorie Intake
            </div>
            <div className="text-3xl font-display font-extrabold text-white flex items-baseline gap-2 mt-0.5">
              {calculations.targetCalories.toLocaleString()}
              <span className="text-xs text-dark-400 font-normal">kcal / day</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right text-xs">
              <div className="text-dark-400">Basal (BMR): <span className="text-white font-mono font-semibold">{calculations.bmr} kcal</span></div>
              <div className="text-dark-400">Maintenance (TDEE): <span className="text-primary-300 font-mono font-semibold">{calculations.tdee} kcal</span></div>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/30 border border-primary-400/40 flex items-center justify-center text-primary-300 shadow-md">
              <Flame className="w-6 h-6 text-primary-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Macro split distribution bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-semibold">
            <span className="text-primary-300">Protein: {calculations.proteinPct}%</span>
            <span className="text-energy-300">Carbs: {calculations.carbsPct}%</span>
            <span className="text-coral-400">Fats: {calculations.fatsPct}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-dark-800 overflow-hidden flex shadow-inner">
            <div
              className="bg-primary-400 transition-all duration-500 h-full"
              style={{ width: `${calculations.proteinPct}%` }}
              title="Protein"
            />
            <div
              className="bg-energy-400 transition-all duration-500 h-full"
              style={{ width: `${calculations.carbsPct}%` }}
              title="Carbohydrates"
            />
            <div
              className="bg-coral-400 transition-all duration-500 h-full"
              style={{ width: `${calculations.fatsPct}%` }}
              title="Fats"
            />
          </div>
        </div>

        {/* Macro Pill Cards */}
        <div className="grid grid-cols-3 gap-2">
          <Card variant="static" className="p-2.5 text-center border-primary-500/20">
            <div className="text-[10px] text-dark-400 uppercase font-semibold">Protein</div>
            <div className="text-base font-bold text-primary-300 font-mono">{calculations.proteinGrams}g</div>
            <div className="text-[10px] text-dark-500">{calculations.proteinGrams * 4} kcal</div>
          </Card>
          <Card variant="static" className="p-2.5 text-center border-energy-500/20">
            <div className="text-[10px] text-dark-400 uppercase font-semibold">Carbs</div>
            <div className="text-base font-bold text-energy-300 font-mono">{calculations.carbsGrams}g</div>
            <div className="text-[10px] text-dark-500">{calculations.carbsGrams * 4} kcal</div>
          </Card>
          <Card variant="static" className="p-2.5 text-center border-coral-500/20">
            <div className="text-[10px] text-dark-400 uppercase font-semibold">Fats</div>
            <div className="text-base font-bold text-coral-400 font-mono">{calculations.fatsGrams}g</div>
            <div className="text-[10px] text-dark-500">{calculations.fatsGrams * 9} kcal</div>
          </Card>
        </div>

        {/* Live Feedback Notification */}
        <div className="pt-1 flex items-center gap-2 text-xs text-dark-300 bg-white/[0.02] p-2 rounded-lg border border-white/5">
          <CheckCircle2 className="w-4 h-4 text-primary-400 flex-shrink-0" />
          <span>
            Profile calibrated! Ready to feed these exact targets into <strong>Step 02: AI Meal Planner</strong>.
          </span>
        </div>
      </Card>
    </div>
  )
}
