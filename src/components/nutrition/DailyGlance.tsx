'use client'

import { motion } from 'framer-motion'
import { Zap, Droplets, UtensilsCrossed, Minus, Plus } from 'lucide-react'
import { NutritionOrb } from './NutritionOrb'
import { SectionHeading } from './SectionHeading'

interface GlanceData {
  current: number
  target: number
}

interface DailyGlanceProps {
  calories: GlanceData
  protein: GlanceData
  carbs: GlanceData
  fat: GlanceData
  water: { current: number; target: number }
  onWaterChange?: (delta: number) => void
  mealsLogged: number
  totalMeals: number
}

function AnimatedNumber({ value }: { value: number }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0.4, y: -3 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {value.toLocaleString()}
    </motion.span>
  )
}

interface TileProps {
  icon: React.ReactNode
  label: string
  color: string
  children: React.ReactNode
}

function GlanceTile({ icon, label, color, children }: TileProps) {
  return (
    <motion.div
      className="rounded-3xl p-6 sm:p-7"
      style={{ background: `${color}0a`, border: `1px solid ${color}26` }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}16`, border: `1px solid ${color}33` }}
        >
          {icon}
        </div>
        <span className="text-base font-bold text-slate-200 uppercase tracking-wide">{label}</span>
      </div>
      {children}
    </motion.div>
  )
}

export function DailyGlance({
  calories,
  protein,
  carbs,
  fat,
  water,
  onWaterChange,
  mealsLogged,
  totalMeals,
}: DailyGlanceProps) {
  const proteinPct = Math.min(100, Math.round((protein.current / (protein.target || 1)) * 100))
  const waterPct = Math.min(100, Math.round((water.current / (water.target || 1)) * 100))
  const mealPct = Math.min(100, Math.round((mealsLogged / (totalMeals || 1)) * 100))

  return (
    <section className="space-y-8">
      <SectionHeading
        icon={<span className="text-2xl leading-none">📊</span>}
        title="Today at a Glance"
        subtitle="How are you doing today? Just the essentials — calories, protein, hydration and your meal plan."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* 3D Nutrition Core */}
        <motion.div
          className="lg:col-span-5 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(0,240,255,0.04) 0%, rgba(17,23,36,0.94) 50%, rgba(16,185,129,0.04) 100%)',
            border: '1px solid rgba(0,240,255,0.16)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.28)',
          }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center mb-5">
            <h3 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Interactive Nutrition Core
            </h3>
            <p className="text-slate-400 text-sm mt-1.5">
              Calories · Protein · Carbs · Fats — live progress
            </p>
          </div>

          <div className="pointer-events-none lg:pointer-events-auto">
            <NutritionOrb calories={calories} protein={protein} carbs={carbs} fat={fat} />
          </div>

          <p className="mt-5 text-xs text-slate-500 italic text-center max-w-xs">
            3D rendering of your daily energy state — rotates in real time with your logged intake.
          </p>
        </motion.div>

        {/* Large stat tiles */}
        <div className="lg:col-span-7 space-y-6">
          <GlanceTile icon={<Zap className="w-5 h-5 text-[#FFB300]" />} label="Protein" color="#FFB300">
            <div className="flex items-baseline gap-2.5 mb-4">
              <span className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                <AnimatedNumber value={protein.current} />
              </span>
              <span className="text-2xl font-bold text-slate-500">/ {protein.target}g</span>
              <span className="ml-auto text-sm font-extrabold px-3 py-1 rounded-full" style={{ background: '#FFB3001a', color: '#FFB300', border: '1px solid #FFB30040' }}>
                {proteinPct}%
              </span>
            </div>
            <div className="h-3.5 rounded-full bg-white/[0.06] overflow-hidden border border-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #FFB300, #fde047)', boxShadow: '0 0 14px #FFB30050' }}
                initial={{ width: 0 }}
                animate={{ width: `${proteinPct}%` }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              />
            </div>
          </GlanceTile>

          <GlanceTile icon={<Droplets className="w-5 h-5 text-blue-400" />} label="Hydration" color="#3b82f6">
            <div className="flex items-baseline gap-2.5 mb-4">
              <span className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                <AnimatedNumber value={Math.round(water.current * 10) / 10} />
              </span>
              <span className="text-2xl font-bold text-slate-500">L / {water.target}L</span>
              <span className="ml-auto text-sm font-extrabold px-3 py-1 rounded-full" style={{ background: '#3b82f61a', color: '#60a5fa', border: '1px solid #3b82f640' }}>
                {waterPct}%
              </span>
            </div>
            <div className="h-3.5 rounded-full bg-white/[0.06] overflow-hidden border border-white/10 mb-4">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #3b82f6, #00F0FF)', boxShadow: '0 0 14px #00F0FF50' }}
                initial={{ width: 0 }}
                animate={{ width: `${waterPct}%` }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              />
            </div>
            {onWaterChange && (
              <div className="flex items-center gap-2.5">
                <motion.button
                  onClick={() => onWaterChange(-0.25)}
                  disabled={water.current <= 0}
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 disabled:opacity-30 flex items-center justify-center"
                  whileTap={{ scale: 0.9 }}
                  title="Remove 250ml"
                >
                  <Minus className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={() => onWaterChange(0.25)}
                  className="w-11 h-11 rounded-xl bg-blue-500/20 border border-blue-500/35 text-blue-300 hover:bg-blue-500/30 flex items-center justify-center"
                  whileTap={{ scale: 0.9 }}
                  title="Add 250ml"
                >
                  <Plus className="w-5 h-5" />
                </motion.button>
                <span className="text-sm text-slate-400 font-medium">
                  +250 ml per tap
                </span>
              </div>
            )}
          </GlanceTile>

          <GlanceTile icon={<UtensilsCrossed className="w-5 h-5 text-[#00F0FF]" />} label="Meals" color="#00F0FF">
            <div className="flex items-baseline gap-2.5 mb-4">
              <span className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                <AnimatedNumber value={mealsLogged} />
              </span>
              <span className="text-2xl font-bold text-slate-500">/ {totalMeals} meals planned</span>
              <span className="ml-auto text-sm font-extrabold px-3 py-1 rounded-full" style={{ background: '#00F0FF1a', color: '#00F0FF', border: '1px solid #00F0FF40' }}>
                {mealPct}%
              </span>
            </div>
            <div className="h-3.5 rounded-full bg-white/[0.06] overflow-hidden border border-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #00F0FF, #10b981)', boxShadow: '0 0 14px #00F0FF50' }}
                initial={{ width: 0 }}
                animate={{ width: `${mealPct}%` }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              />
            </div>
          </GlanceTile>
        </div>
      </div>
    </section>
  )
}