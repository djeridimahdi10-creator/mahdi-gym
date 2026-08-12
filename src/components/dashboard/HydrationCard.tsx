'use client'

import { useState } from 'react'
import { Droplets } from 'lucide-react'

export function HydrationCard() {
  const [waterLitres, setWaterLitres] = useState(2.5)
  const targetLitres = 3.0
  const totalGlasses = 6
  const glassVolume = targetLitres / totalGlasses // 0.5L per glass

  const filledGlasses = Math.min(totalGlasses, Math.floor(waterLitres / glassVolume))
  const partialRatio = (waterLitres % glassVolume) / glassVolume

  const handleGlassClick = (index: number) => {
    const newAmount = +( (index + 1) * glassVolume ).toFixed(1)
    setWaterLitres(newAmount)
  }

  return (
    <div
      className="p-6 rounded-2xl flex flex-col justify-between h-full space-y-4"
      style={{
        background: 'rgba(11, 17, 31, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Droplets className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-white tracking-wide">Hydration</h3>
        </div>
        <span className="text-sm sm:text-base font-black text-cyan-400">
          {waterLitres.toFixed(1)}L <span className="text-slate-400 font-normal text-xs sm:text-sm">/ {targetLitres}L</span>
        </span>
      </div>

      {/* Water Glasses Row */}
      <div className="flex items-center justify-between gap-2.5 py-2 flex-1">
        {Array.from({ length: totalGlasses }).map((_, i) => {
          const isFilled = i < filledGlasses
          const isPartial = i === filledGlasses && partialRatio > 0

          return (
            <button
              key={i}
              onClick={() => handleGlassClick(i)}
              className="flex-1 h-14 sm:h-16 rounded-xl relative overflow-hidden transition-all duration-200 hover:scale-105 group border"
              style={{
                background: 'rgba(15, 23, 42, 0.7)',
                borderColor: isFilled || isPartial ? 'rgba(0, 212, 255, 0.5)' : 'rgba(255,255,255,0.08)',
                boxShadow: isFilled ? '0 0 16px rgba(0, 212, 255, 0.25)' : 'none',
              }}
              title={`Glass ${i + 1} (${( (i + 1) * glassVolume ).toFixed(1)}L)`}
            >
              {/* Liquid fill animation */}
              <div
                className="absolute bottom-0 left-0 right-0 transition-all duration-500"
                style={{
                  height: isFilled ? '100%' : isPartial ? `${partialRatio * 100}%` : '0%',
                  background: 'linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)',
                }}
              />

              {/* Glass rim overlay indicator */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <Droplets
                  className={`w-4 h-4 transition-colors ${
                    isFilled || isPartial ? 'text-white' : 'text-slate-600 group-hover:text-slate-400'
                  }`}
                />
              </div>
            </button>
          )
        })}
      </div>

      {/* Bottom Tip & Action */}
      <div className="flex items-center justify-between text-xs pt-1">
        <p className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
          <span className="text-cyan-400">💧</span> Great job! Keep drinking water.
        </p>
        <button
          onClick={() => setWaterLitres((prev) => +(Math.min(4.0, prev + 0.25)).toFixed(2))}
          className="px-3 py-1.5 rounded-lg text-xs font-bold text-cyan-300 hover:text-white transition-all"
          style={{
            background: 'rgba(0, 212, 255, 0.12)',
            border: '1px solid rgba(0, 212, 255, 0.25)',
          }}
        >
          + Add 250ml
        </button>
      </div>
    </div>
  )
}
