'use client'

import React from 'react'
import type { MuscleGroup } from '@/types'

interface MuscleHeatmapProps {
  selectedGroup: MuscleGroup | 'all'
  onSelectGroup: (group: MuscleGroup) => void
  hoveredGroup?: MuscleGroup | null
  onHoverGroup?: (group: MuscleGroup | null) => void
}

export function MuscleHeatmap({
  selectedGroup,
  onSelectGroup,
  hoveredGroup,
  onHoverGroup,
}: MuscleHeatmapProps) {
  const getMuscleFill = (group: MuscleGroup) => {
    const isSelected = selectedGroup === group
    const isHovered = hoveredGroup === group

    if (isSelected) return 'fill-primary-400 opacity-95 filter drop-shadow-[0_0_15px_rgba(52,211,153,0.9)] stroke-primary-300'
    if (isHovered) return 'fill-energy-300 opacity-85 filter drop-shadow-[0_0_12px_rgba(251,146,60,0.8)] stroke-energy-200'
    return 'fill-dark-700/80 stroke-white/10 hover:fill-primary-400/50 transition-all duration-300 cursor-pointer'
  }

  return (
    <div className="relative p-6 glass-card-static border border-white/10 flex flex-col items-center justify-center overflow-hidden group">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 via-transparent to-energy-300/10 pointer-events-none opacity-60" />

      {/* Header Info */}
      <div className="w-full flex items-center justify-between mb-4 relative z-10">
        <div>
          <h4 className="text-xs font-display font-bold text-white tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-ping" />
            2D Muscle Target Heatmap
          </h4>
          <p className="text-xs text-dark-400 mt-0.5">Click muscle group to isolate exercises</p>
        </div>
        <div>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-primary-500/20 border border-primary-400/30 text-primary-300 uppercase tracking-wider shadow-[0_0_10px_rgba(52,211,153,0.2)]">
            {selectedGroup === 'all' ? 'Full Body' : selectedGroup}
          </span>
        </div>
      </div>

      {/* Interactive SVG Skeleton Silhouette */}
      <div className="relative w-full max-w-[280px] h-[340px] flex items-center justify-center py-2 relative z-10">
        <svg
          viewBox="0 0 200 400"
          className="w-full h-full drop-shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Skeleton Alignment Frame */}
          <g opacity="0.25" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3">
            <circle cx="100" cy="50" r="24" fill="none" />
            <line x1="100" y1="74" x2="100" y2="220" />
            <line x1="60" y1="95" x2="140" y2="95" />
            <line x1="75" y1="210" x2="125" y2="210" />
          </g>

          {/* HEAD */}
          <circle
            cx="100"
            cy="45"
            r="20"
            className="fill-dark-800 stroke-dark-500"
            strokeWidth="1.5"
          />

          {/* CHEST */}
          <path
            d="M72 90 C72 82 128 82 128 90 L124 130 C110 135 90 135 76 130 Z"
            className={`transition-all duration-300 ${getMuscleFill('chest')}`}
            onClick={() => onSelectGroup('chest')}
            onMouseEnter={() => onHoverGroup?.('chest')}
            onMouseLeave={() => onHoverGroup?.(null)}
          >
            <title>Chest</title>
          </path>

          {/* ABS / CORE */}
          <path
            d="M78 134 C90 137 110 137 122 134 L120 185 C108 190 92 190 80 185 Z"
            className={`transition-all duration-300 ${getMuscleFill('core')}`}
            onClick={() => onSelectGroup('core')}
            onMouseEnter={() => onHoverGroup?.('core')}
            onMouseLeave={() => onHoverGroup?.(null)}
          >
            <title>Core / Abs</title>
          </path>

          {/* SHOULDERS */}
          <path
            d="M52 90 C50 82 66 82 70 92 L66 112 C58 110 52 100 52 90 Z"
            className={`transition-all duration-300 ${getMuscleFill('shoulders')}`}
            onClick={() => onSelectGroup('shoulders')}
            onMouseEnter={() => onHoverGroup?.('shoulders')}
            onMouseLeave={() => onHoverGroup?.(null)}
          >
            <title>Left Shoulder</title>
          </path>
          <path
            d="M148 90 C150 82 134 82 130 92 L134 112 C142 110 148 100 148 90 Z"
            className={`transition-all duration-300 ${getMuscleFill('shoulders')}`}
            onClick={() => onSelectGroup('shoulders')}
            onMouseEnter={() => onHoverGroup?.('shoulders')}
            onMouseLeave={() => onHoverGroup?.(null)}
          >
            <title>Right Shoulder</title>
          </path>

          {/* BICEPS */}
          <path
            d="M50 114 C56 114 64 116 64 140 C56 142 50 130 50 114 Z"
            className={`transition-all duration-300 ${getMuscleFill('biceps')}`}
            onClick={() => onSelectGroup('biceps')}
            onMouseEnter={() => onHoverGroup?.('biceps')}
            onMouseLeave={() => onHoverGroup?.(null)}
          >
            <title>Left Bicep</title>
          </path>
          <path
            d="M150 114 C144 114 136 116 136 140 C144 142 150 130 150 114 Z"
            className={`transition-all duration-300 ${getMuscleFill('biceps')}`}
            onClick={() => onSelectGroup('biceps')}
            onMouseEnter={() => onHoverGroup?.('biceps')}
            onMouseLeave={() => onHoverGroup?.(null)}
          >
            <title>Right Bicep</title>
          </path>

          {/* TRICEPS */}
          <path
            d="M44 100 C48 95 54 105 52 125 C46 122 42 110 44 100 Z"
            className={`transition-all duration-300 ${getMuscleFill('triceps')}`}
            onClick={() => onSelectGroup('triceps')}
            onMouseEnter={() => onHoverGroup?.('triceps')}
            onMouseLeave={() => onHoverGroup?.(null)}
          >
            <title>Left Tricep</title>
          </path>
          <path
            d="M156 100 C152 95 146 105 148 125 C154 122 158 110 156 100 Z"
            className={`transition-all duration-300 ${getMuscleFill('triceps')}`}
            onClick={() => onSelectGroup('triceps')}
            onMouseEnter={() => onHoverGroup?.('triceps')}
            onMouseLeave={() => onHoverGroup?.(null)}
          >
            <title>Right Tricep</title>
          </path>

          {/* LEGS / QUADS */}
          <path
            d="M74 190 C88 190 96 195 96 270 C84 275 72 250 74 190 Z"
            className={`transition-all duration-300 ${getMuscleFill('legs')}`}
            onClick={() => onSelectGroup('legs')}
            onMouseEnter={() => onHoverGroup?.('legs')}
            onMouseLeave={() => onHoverGroup?.(null)}
          >
            <title>Left Leg</title>
          </path>
          <path
            d="M126 190 C112 190 104 195 104 270 C116 275 128 250 126 190 Z"
            className={`transition-all duration-300 ${getMuscleFill('legs')}`}
            onClick={() => onSelectGroup('legs')}
            onMouseEnter={() => onHoverGroup?.('legs')}
            onMouseLeave={() => onHoverGroup?.(null)}
          >
            <title>Right Leg</title>
          </path>

          {/* CALVES */}
          <path
            d="M76 278 C88 278 92 290 90 350 C80 352 74 320 76 278 Z"
            className={`transition-all duration-300 ${getMuscleFill('legs')}`}
            onClick={() => onSelectGroup('legs')}
            onMouseEnter={() => onHoverGroup?.('legs')}
            onMouseLeave={() => onHoverGroup?.(null)}
          >
            <title>Left Calf</title>
          </path>
          <path
            d="M124 278 C112 278 108 290 110 350 C120 352 126 320 124 278 Z"
            className={`transition-all duration-300 ${getMuscleFill('legs')}`}
            onClick={() => onSelectGroup('legs')}
            onMouseEnter={() => onHoverGroup?.('legs')}
            onMouseLeave={() => onHoverGroup?.(null)}
          >
            <title>Right Calf</title>
          </path>
        </svg>
      </div>

      {/* Quick Select Muscle Pills */}
      <div className="w-full flex flex-wrap justify-center gap-1.5 mt-3 relative z-10">
        {[
          { key: 'all', label: 'All' },
          { key: 'chest', label: 'Chest' },
          { key: 'back', label: 'Back' },
          { key: 'shoulders', label: 'Shoulders' },
          { key: 'biceps', label: 'Biceps' },
          { key: 'triceps', label: 'Triceps' },
          { key: 'legs', label: 'Legs' },
          { key: 'core', label: 'Core' },
        ].map((m) => (
          <button
            key={m.key}
            onClick={() => onSelectGroup(m.key as MuscleGroup)}
            className={`px-3 py-1 text-xs font-semibold rounded-xl transition-all duration-300 ${
              selectedGroup === m.key
                ? 'bg-primary-500 text-white shadow-[0_0_15px_rgba(52,211,153,0.5)] scale-105'
                : 'bg-dark-800/90 border border-white/[0.06] text-dark-400 hover:text-white hover:border-white/20'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  )
}
