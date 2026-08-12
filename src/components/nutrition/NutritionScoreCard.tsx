'use client'

import { motion } from 'framer-motion'
import { Award, Droplets, CheckCircle2, ArrowRight } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { AnimatedNumber, BigProgressBar } from './hub/HubShared'

/* Nutrition Intelligence Score — large presentation used in the
   Progress tab. Same deterministic algorithm as before, much bigger. */

function ScoreRing({ score }: { score: number }) {
  const radius = 78
  const strokeWidth = 14
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative w-56 h-56 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r={radius} stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} fill="transparent" />
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          stroke="url(#scoreGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="transparent"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#00F0FF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center text-center">
        <AnimatedNumber value={score} className="text-6xl font-extrabold text-white tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }} />
        <span className="text-sm font-bold text-slate-500 mt-0.5">/ 100</span>
        <span
          className="mt-2 px-3 py-1 rounded-full text-xs font-bold"
          style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)' }}
        >
          {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs focus'}
        </span>
      </div>
    </div>
  )
}

function MetricRow({ label, value, max, color, note }: { label: string; value: number; max: number; color: string; note: string }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-bold text-slate-300">{label}</span>
        <span className="text-sm font-bold tabular-nums" style={{ color }}>
          {value} <span className="text-slate-500 font-semibold">/ {max}</span>
        </span>
      </div>
      <BigProgressBar value={pct} color={color} height={10} />
      <p className="text-xs text-slate-500">{note}</p>
    </div>
  )
}

export function NutritionScoreCard() {
  const { waterConsumed, waterTarget, meals, targetMacros, updateWater } = useNutritionStore()

  // Calculate score deterministically (unchanged algorithm)
  const eatenMeals = meals.filter((m) => m.eaten)
  const eatenCal = eatenMeals.reduce((acc, m) => acc + m.totalCalories, 0)
  const eatenProt = eatenMeals.reduce((acc, m) => acc + m.foods.reduce((sum, f) => sum + (f.protein || 20), 0), 0)

  const calScore = Math.min(25, Math.round((eatenCal / 2850) * 25))
  const protScore = Math.min(25, Math.round((eatenProt / targetMacros.protein) * 25))
  const hydroScore = Math.min(20, Math.round((waterConsumed / waterTarget) * 20))
  const fiberScore = 12 // estimated
  const qualityScore = 15 // clean whole foods

  const totalScore = Math.min(100, calScore + protScore + hydroScore + fiberScore + qualityScore)
  const isHydrationWeak = waterConsumed < waterTarget * 0.7

  return (
    <div
      className="rounded-3xl p-7 sm:p-10"
      style={{
        background: 'linear-gradient(135deg, rgba(16,185,129,0.07) 0%, rgba(17,23,36,0.95) 100%)',
        border: '1px solid rgba(16,185,129,0.22)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
      }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Nutrition Intelligence Score
          </h2>
          <p className="text-sm text-slate-400">Dynamic multi-metric algorithm calculation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Score ring */}
        <div className="lg:col-span-4 flex justify-center">
          <ScoreRing score={totalScore} />
        </div>

        {/* Metric breakdown */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
          <MetricRow label="Calories" value={calScore} max={25} color="#00F0FF" note="Calorie budget adherence" />
          <MetricRow label="Protein" value={protScore} max={25} color="#FFB300" note="Protein target adherence" />
          <MetricRow label="Hydration" value={hydroScore} max={20} color="#38bdf8" note="Water target progress" />
          <MetricRow label="Fiber" value={fiberScore} max={15} color="#A855F7" note="Estimated fiber coverage" />
          <MetricRow label="Food Quality" value={qualityScore} max={15} color="#10b981" note="Whole-food cleanliness" />
        </div>
      </div>

      {/* Weakest area callout */}
      {isHydrationWeak ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-5 sm:p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-amber-500/15 border border-amber-500/30 shrink-0">
              <Droplets className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-base font-bold text-amber-400">Weakest area: Hydration 💧</p>
              <p className="text-sm text-slate-300 mt-0.5">
                You&apos;re currently {Math.max(0, Math.round((waterTarget - waterConsumed) * 1000))}ml behind your daily pace.
              </p>
            </div>
          </div>
          <motion.button
            onClick={() => updateWater(0.5)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-2xl text-sm font-bold bg-amber-500 text-black hover:bg-amber-400 flex items-center gap-2 flex-shrink-0 transition-colors shadow-lg shadow-amber-500/20"
          >
            <span>Fix It (+500ml)</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      ) : (
        <div className="mt-8 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-3 text-sm text-emerald-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>All core metric pillars are balanced and operating at high efficiency today!</span>
        </div>
      )}
    </div>
  )
}