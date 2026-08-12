'use client'

import React, { useState } from 'react'
import { Camera, Scan, Sparkles } from 'lucide-react'

const scanSamples = [
  {
    id: 'couscous',
    name: 'Couscous with Grilled Chicken',
    emoji: '🍲',
    kcal: 560,
    protein: '45g',
    carbs: '62g',
    fats: '12g',
    confidence: '98.8%',
  },
  {
    id: 'salad',
    name: 'Avocado & Salmon Bowl',
    emoji: '🥗',
    kcal: 480,
    protein: '38g',
    carbs: '22g',
    fats: '26g',
    confidence: '99.2%',
  },
  {
    id: 'shake',
    name: 'Berry Protein Smoothie Bowl',
    emoji: '🫐',
    kcal: 340,
    protein: '28g',
    carbs: '42g',
    fats: '6g',
    confidence: '97.5%',
  },
]

export function StepScanVisualizer() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [isScanning, setIsScanning] = useState(false)

  const handleSelectSample = (idx: number) => {
    setIsScanning(true)
    setSelectedIdx(idx)
    setTimeout(() => {
      setIsScanning(false)
    }, 600)
  }

  const sample = scanSamples[selectedIdx]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-coral-400/20 flex items-center justify-center text-coral-400">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">AI Vision Food Scanner</h4>
            <p className="text-xs text-dark-400">Instant meal identification & macro breakdown</p>
          </div>
        </div>

        <div className="px-3 py-1 rounded-full bg-coral-400/10 border border-coral-400/20 text-xs font-semibold text-coral-400 flex items-center gap-1.5">
          <Scan className="w-3 h-3 animate-pulse" />
          Live AI Camera Demo
        </div>
      </div>

      {/* Food Sample Selector Tabs */}
      <div>
        <label className="text-xs font-medium text-dark-400 mb-2 block uppercase tracking-wider">Tap a Meal to Scan</label>
        <div className="grid grid-cols-3 gap-2">
          {scanSamples.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleSelectSample(idx)}
              className={`p-2.5 rounded-xl border text-xs transition-all flex items-center gap-2 ${
                selectedIdx === idx
                  ? 'bg-coral-400/20 border-coral-400 text-white shadow-lg shadow-coral-400/10'
                  : 'bg-dark-800/40 border-white/5 text-dark-400 hover:border-white/20 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="truncate font-medium">{item.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Camera Scanning Viewport Frame */}
      <div className="relative rounded-2xl bg-dark-950/80 border border-coral-400/30 overflow-hidden p-6 aspect-[16/9] flex flex-col items-center justify-center">
        {/* Scanning Laser Line */}
        {isScanning && (
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-coral-400 to-transparent top-0 animate-bounce" />
        )}

        {/* Food Visual */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-2">
          <div className="text-6xl animate-pulse">{sample.emoji}</div>
          <div className="text-sm font-semibold text-white">{sample.name}</div>
        </div>

        {/* Object Detection Target Box */}
        <div className="absolute inset-4 sm:inset-8 border-2 border-dashed border-coral-400/40 rounded-xl pointer-events-none flex items-start justify-between p-2">
          <div className="bg-coral-400/20 px-2 py-0.5 rounded text-[10px] text-coral-300 font-mono font-bold flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            {sample.confidence} match
          </div>
          <div className="w-2 h-2 rounded-full bg-coral-400 animate-ping" />
        </div>
      </div>

      {/* Instant Result Box */}
      <div className="bg-dark-800/50 p-4 rounded-xl border border-white/5 flex items-center justify-between">
        <div>
          <div className="text-xs text-dark-400">Detected Macros</div>
          <div className="text-sm font-bold text-white mt-0.5">
            🔥 {sample.kcal} kcal
          </div>
        </div>
        <div className="flex gap-3 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-primary-500/10 border border-primary-400/20 text-primary-300 font-semibold">
            {sample.protein} Protein
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-energy-300/10 border border-energy-300/20 text-energy-300 font-semibold">
            {sample.carbs} Carbs
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-coral-400/10 border border-coral-400/20 text-coral-300 font-semibold">
            {sample.fats} Fat
          </span>
        </div>
      </div>
    </div>
  )
}
