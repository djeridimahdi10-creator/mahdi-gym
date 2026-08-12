'use client'

import React from 'react'

interface MacroRingsProps {
  calories: { current: number; target: number }
  protein: { current: number; target: number }
  carbs: { current: number; target: number }
  fat: { current: number; target: number }
  size?: number
}

export function MacroRings({
  calories,
  protein,
  carbs,
  fat,
  size = 220,
}: MacroRingsProps) {
  const center = size / 2
  const strokeWidth = 10
  const gap = 4

  const rCalories = center - strokeWidth
  const rProtein = rCalories - strokeWidth - gap
  const rCarbs = rProtein - strokeWidth - gap
  const rFat = rCarbs - strokeWidth - gap

  const getCircumference = (r: number) => 2 * Math.PI * r
  const getOffset = (r: number, current: number, target: number) => {
    const pct = Math.min(current / (target || 1), 1)
    const c = getCircumference(r)
    return c - pct * c
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="ring-calories" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <linearGradient id="ring-protein" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#fed7aa" />
          </linearGradient>
          <linearGradient id="ring-carbs" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fde047" />
          </linearGradient>
          <linearGradient id="ring-fat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>
        </defs>

        {/* CALORIES RING */}
        <circle
          cx={center}
          cy={center}
          r={rCalories}
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={center}
          cy={center}
          r={rCalories}
          stroke="url(#ring-calories)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={getCircumference(rCalories)}
          strokeDashoffset={getOffset(rCalories, calories.current, calories.target)}
          className="transition-all duration-1000 ease-out"
        />

        {/* PROTEIN RING */}
        <circle
          cx={center}
          cy={center}
          r={rProtein}
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={center}
          cy={center}
          r={rProtein}
          stroke="url(#ring-protein)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={getCircumference(rProtein)}
          strokeDashoffset={getOffset(rProtein, protein.current, protein.target)}
          className="transition-all duration-1000 ease-out"
        />

        {/* CARBS RING */}
        <circle
          cx={center}
          cy={center}
          r={rCarbs}
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={center}
          cy={center}
          r={rCarbs}
          stroke="url(#ring-carbs)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={getCircumference(rCarbs)}
          strokeDashoffset={getOffset(rCarbs, carbs.current, carbs.target)}
          className="transition-all duration-1000 ease-out"
        />

        {/* FAT RING */}
        <circle
          cx={center}
          cy={center}
          r={rFat}
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={center}
          cy={center}
          r={rFat}
          stroke="url(#ring-fat)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={getCircumference(rFat)}
          strokeDashoffset={getOffset(rFat, fat.current, fat.target)}
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* CENTER METRIC TEXT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <span className="text-2xl font-display font-bold text-white tracking-tight">
          {calories.current}
        </span>
        <span className="text-[11px] font-medium text-dark-400 uppercase tracking-wider">
          / {calories.target} kcal
        </span>
      </div>
    </div>
  )
}
