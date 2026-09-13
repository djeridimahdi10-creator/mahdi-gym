'use client'

import React from 'react'
import { Droplets, Plus, Minus, Check } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { HydrationWaveSVG } from './DashboardVisuals'

export function HydrationCard() {
  const { waterConsumed, waterTarget, updateWater, setCustomTargets } = useNutritionStore()

  const totalGlasses = 6
  const glassVolume = +(waterTarget / totalGlasses).toFixed(2)
  const filledGlasses = Math.min(totalGlasses, Math.floor(waterConsumed / glassVolume))

  const handleGlassClick = (index: number) => {
    const targetAmount = +((index + 1) * glassVolume).toFixed(2)
    const diff = targetAmount - waterConsumed
    updateWater(diff)
  }

  const targets = [2.5, 3.0, 3.5, 4.0]

  return (
    <div
      className="p-5 rounded-2xl flex flex-col h-full"
      style={{
        background: 'rgba(11, 17, 31, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center">
            <Droplets className="w-4.5 h-4.5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">Hydration</h3>
            <p className="text-[11px] text-cyan-400 font-semibold mt-0.5">Daily water intake</p>
          </div>
        </div>

        {/* Target Selector */}
        <div className="flex items-center gap-0.5 bg-white/[0.04] p-0.5 rounded-lg border border-white/[0.06]">
          {targets.map((t) => (
            <button
              key={t}
              onClick={() => setCustomTargets({ waterTarget: t })}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all duration-200 ${
                waterTarget === t
                  ? 'bg-cyan-500 text-white shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t}L
            </button>
          ))}
        </div>
      </div>

      {/* Main Body */}
      <div className="flex items-center gap-4 py-1 flex-1">
        {/* Wave Vial */}
        <HydrationWaveSVG currentLiters={waterConsumed} targetLiters={waterTarget} />

        {/* Controls */}
        <div className="flex-1 flex flex-col justify-between h-full gap-2.5">
          <p className="text-xs text-slate-300 font-medium">
            <span className="font-bold text-white">{waterConsumed.toFixed(1)}L</span> of{' '}
            <span className="text-cyan-300 font-bold">{waterTarget}L</span> logged today
          </p>

          {/* Glass Buttons */}
          <div className="grid grid-cols-6 gap-1.5">
            {Array.from({ length: totalGlasses }).map((_, i) => {
              const isFilled = i < filledGlasses
              return (
                <button
                  key={i}
                  onClick={() => handleGlassClick(i)}
                  title={`Glass ${i + 1} (~${Math.round(glassVolume * 1000)}ml)`}
                  className={`h-10 rounded-xl flex flex-col items-center justify-center transition-all duration-200 border relative group hover:scale-105 active:scale-95 ${
                    isFilled
                      ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
                      : 'bg-white/[0.03] border-white/[0.06] text-slate-600 hover:border-cyan-500/30'
                  }`}
                >
                  {isFilled ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <Droplets className="w-3 h-3 group-hover:text-cyan-400 transition-colors" />
                  )}
                  <span className="text-[9px] font-bold mt-0.5">{i + 1}</span>
                </button>
              )
            })}
          </div>

          {/* Quick Modifiers */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateWater(-0.25)}
              disabled={waterConsumed <= 0}
              className="px-2.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-bold text-slate-400 hover:text-white transition-all disabled:opacity-40 flex items-center gap-1 active:scale-95"
            >
              <Minus className="w-3 h-3" />
              <span>250ml</span>
            </button>

            <button
              onClick={() => updateWater(0.25)}
              className="flex-1 py-1.5 rounded-xl text-xs font-bold text-cyan-300 transition-all active:scale-95 flex items-center justify-center gap-1"
              style={{
                background: 'rgba(0, 212, 255, 0.1)',
                border: '1px solid rgba(0, 212, 255, 0.25)',
              }}
            >
              <Plus className="w-3 h-3" />
              <span>+250ml</span>
            </button>

            <button
              onClick={() => updateWater(0.5)}
              className="flex-1 py-1.5 rounded-xl text-xs font-bold text-white transition-all active:scale-95 flex items-center justify-center gap-1"
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
                boxShadow: '0 2px 8px rgba(6,182,212,0.25)',
              }}
            >
              <Plus className="w-3 h-3" />
              <span>+500ml</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
