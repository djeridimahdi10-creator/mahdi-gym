'use client'

import { motion } from 'framer-motion'
import { Boxes, Flame, Zap, Droplets, Target } from 'lucide-react'
import { NutritionOrb } from './NutritionOrb'

interface NutritionCoreCardProps {
  calories: { current: number; target: number }
  protein: { current: number; target: number }
  carbs: { current: number; target: number }
  fat: { current: number; target: number }
}

export function NutritionCoreCard({ calories, protein, carbs, fat }: NutritionCoreCardProps) {
  const metrics = [
    { icon: Flame, label: 'Calories', value: `${calories.current.toLocaleString()} / ${calories.target.toLocaleString()}`, color: '#00F0FF' },
    { icon: Zap, label: 'Protein', value: `${protein.current}g / ${protein.target}g`, color: '#FFB300' },
    { icon: Droplets, label: 'Hydration', value: 'Live 3D view', color: '#3b82f6' },
    { icon: Target, label: 'Goal', value: 'On track', color: '#10b981' },
  ]

  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden flex flex-col"
      style={{
        background: 'linear-gradient(160deg, rgba(168,85,247,0.06) 0%, rgba(17,23,36,0.95) 45%, rgba(0,240,255,0.05) 100%)',
        border: '1px solid rgba(168,85,247,0.2)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00F0FF] via-[#a855f7] to-[#10b981]" />

      {/* Header */}
      <div className="flex items-center gap-3 p-6 pb-0">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.14)', border: '1px solid rgba(168,85,247,0.3)' }}>
          <Boxes className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Interactive Nutrition Core
          </h3>
          <p className="text-xs text-slate-400">Your live 3D nutrition snapshot</p>
        </div>
      </div>

      {/* 3D Orb centerpiece */}
      <div className="flex items-center justify-center py-4 flex-1 min-h-[260px]">
        <NutritionOrb calories={calories} protein={protein} carbs={carbs} fat={fat} />
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2.5 p-6 pt-2">
        {metrics.map((m) => {
          const Icon = m.icon
          return (
            <div
              key={m.label}
              className="p-3 rounded-xl flex items-center gap-2.5"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <Icon className="w-4 h-4 flex-shrink-0" style={{ color: m.color }} />
              <div className="min-w-0">
                <p className="text-[11px] text-slate-500 font-semibold uppercase">{m.label}</p>
                <p className="text-xs font-bold text-white truncate tabular-nums">{m.value}</p>
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}