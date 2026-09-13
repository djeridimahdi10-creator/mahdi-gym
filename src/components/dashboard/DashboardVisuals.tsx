'use client'

import React from 'react'

/* ─────────────────────────────────────────────────────────────
   1. METABOLIC CALORIE GAUGE SVG
   Radial bio-metabolic gauge with glowing arc, tick notches,
   flame core, and dynamic consumed/remaining metrics
───────────────────────────────────────────────────────────── */
interface MetabolicCalorieGaugeSVGProps {
  consumed: number
  target: number
  activeBurn?: number
  size?: number
}

export function MetabolicCalorieGaugeSVG({
  consumed,
  target,
  activeBurn = 420,
  size = 200,
}: MetabolicCalorieGaugeSVGProps) {
  const strokeWidth = 12
  const r = (size - strokeWidth * 2) / 2
  const cx = size / 2
  const cy = size / 2
  const circ = 2 * Math.PI * r

  // Calculate arc from -220deg to 40deg (260 degree arc)
  const arcLength = circ * 0.76
  const pct = Math.min(1, Math.max(0, consumed / (target || 1)))
  const strokeDashoffset = arcLength * (1 - pct)

  const remaining = Math.max(0, target - consumed)

  return (
    <div className="relative flex flex-col items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        <defs>
          <linearGradient id="calorieArcGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="45%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          <filter id="calorieGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(249, 115, 22, 0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Ambient Center Glow */}
        <circle cx={cx} cy={cy} r={r * 0.85} fill="url(#centerGlow)" />

        {/* Outer Tick Marks */}
        {Array.from({ length: 28 }).map((_, i) => {
          const angle = -215 + (i / 27) * 250
          const rad = (angle * Math.PI) / 180
          const innerR = r + 10
          const outerR = r + (i % 4 === 0 ? 16 : 13)
          const x1 = cx + innerR * Math.cos(rad)
          const y1 = cy + innerR * Math.sin(rad)
          const x2 = cx + outerR * Math.cos(rad)
          const y2 = cy + outerR * Math.sin(rad)
          const isPassed = (i / 27) <= pct

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isPassed ? '#34d399' : 'rgba(255,255,255,0.12)'}
              strokeWidth={i % 4 === 0 ? 2 : 1.2}
              strokeLinecap="round"
              className="transition-colors duration-500"
            />
          )
        })}

        {/* Track Arc Background */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circ}`}
          transform={`rotate(132 ${cx} ${cy})`}
        />

        {/* Active Progress Arc */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="url(#calorieArcGrad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circ}`}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(132 ${cx} ${cy})`}
          filter="url(#calorieGlow)"
          style={{
            transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </svg>

      {/* Central Metrics Inside Ring */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none pt-1">
        <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-emerald-400/90 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          Metabolic Fuel
        </span>
        <div className="flex items-baseline gap-0.5 mt-0.5">
          <span className="text-3xl font-black text-white tracking-tight leading-none" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {consumed.toLocaleString()}
          </span>
          <span className="text-[11px] font-semibold text-slate-400">kcal</span>
        </div>
        <p className="text-[11px] font-medium text-slate-400 mt-1">
          <span className="text-amber-300 font-bold">{remaining > 0 ? remaining : 0}</span> kcal remaining
        </p>
        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-[10px] font-extrabold text-orange-300">
          <span>🔥 Burned: {activeBurn} kcal</span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   2. HYDRATION LIQUID WAVE SVG
   Fluid animated SVG wave with water bubbles & percentage
───────────────────────────────────────────────────────────── */
interface HydrationWaveSVGProps {
  currentLiters: number
  targetLiters: number
  className?: string
}

export function HydrationWaveSVG({
  currentLiters,
  targetLiters,
  className = '',
}: HydrationWaveSVGProps) {
  const percentage = Math.min(100, Math.round((currentLiters / (targetLiters || 1)) * 100))

  return (
    <div className={`relative w-24 h-36 rounded-2xl overflow-hidden border border-cyan-500/30 bg-dark-900/90 p-1 flex flex-col justify-end shadow-[0_0_24px_rgba(6,182,212,0.15)] ${className}`}>
      {/* Container Background Grid & Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-transparent to-cyan-900/30 pointer-events-none" />

      {/* Measurement Ticks */}
      <div className="absolute left-2 top-3 bottom-3 flex flex-col justify-between z-20 pointer-events-none opacity-40">
        <span className="w-2.5 h-0.5 bg-cyan-300" />
        <span className="w-1.5 h-0.5 bg-cyan-300" />
        <span className="w-2.5 h-0.5 bg-cyan-300" />
        <span className="w-1.5 h-0.5 bg-cyan-300" />
        <span className="w-2.5 h-0.5 bg-cyan-300" />
      </div>

      {/* Liquid Body with Transition Height */}
      <div
        className="w-full relative transition-all duration-700 ease-out"
        style={{ height: `${Math.max(8, percentage)}%` }}
      >
        {/* Animated Wave Surface */}
        <div className="absolute -top-3 left-0 right-0 h-4 overflow-hidden">
          <svg
            viewBox="0 0 120 20"
            preserveAspectRatio="none"
            className="w-[200%] h-full animate-[wave_4s_linear_infinite]"
          >
            <path
              d="M 0 10 Q 30 0 60 10 T 120 10 T 180 10 T 240 10 V 20 H 0 Z"
              fill="rgba(6, 182, 212, 0.85)"
            />
          </svg>
        </div>

        {/* Liquid Fill */}
        <div
          className="w-full h-full rounded-b-xl"
          style={{
            background: 'linear-gradient(180deg, rgba(6,182,212,0.85) 0%, rgba(2,132,199,0.95) 100%)',
            boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.3)',
          }}
        />

        {/* Shimmering Bubbles */}
        <span className="absolute bottom-2 left-4 w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDuration: '2.2s' }} />
        <span className="absolute bottom-6 right-5 w-1 h-1 rounded-full bg-white/40 animate-ping" style={{ animationDuration: '3s' }} />
      </div>

      {/* Foreground Percentage Tag */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        <span className="text-xl font-black text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {percentage}%
        </span>
        <span className="text-[10px] font-bold text-cyan-200 tracking-wider">
          {currentLiters.toFixed(1)}L
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   3. MACRO BALANCE TRI-RING SVG
   Concentric neon rings: Protein, Carbs, Fat
───────────────────────────────────────────────────────────── */
interface MacroBalanceTriRingProps {
  protein: { current: number; target: number }
  carbs: { current: number; target: number }
  fat: { current: number; target: number }
  size?: number
}

export function MacroBalanceTriRingSVG({
  protein,
  carbs,
  fat,
  size = 140,
}: MacroBalanceTriRingProps) {
  const center = size / 2
  const stroke = 6

  const rings = [
    {
      r: (size / 2) - 10,
      pct: Math.min(1, protein.current / (protein.target || 1)),
      color: '#a855f7',
      label: 'Protein',
    },
    {
      r: (size / 2) - 22,
      pct: Math.min(1, carbs.current / (carbs.target || 1)),
      color: '#f97316',
      label: 'Carbs',
    },
    {
      r: (size / 2) - 34,
      pct: Math.min(1, fat.current / (fat.target || 1)),
      color: '#00d4ff',
      label: 'Fat',
    },
  ]

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        {rings.map((ring, idx) => {
          const circ = 2 * Math.PI * ring.r
          const offset = circ * (1 - ring.pct)
          return (
            <g key={idx}>
              {/* Background track */}
              <circle
                cx={center}
                cy={center}
                r={ring.r}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={stroke}
              />
              {/* Filled arc */}
              <circle
                cx={center}
                cy={center}
                r={ring.r}
                fill="none"
                stroke={ring.color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${circ}`}
                strokeDashoffset={offset}
                style={{
                  transition: 'stroke-dashoffset 1s ease',
                  filter: `drop-shadow(0 0 4px ${ring.color}60)`,
                }}
              />
            </g>
          )
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xs font-black text-white leading-none">MACROS</span>
        <span className="text-[9px] font-bold text-emerald-400 mt-0.5">Synced</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   4. MEAL CATEGORY BADGE SVGs
   Vector representations of Breakfast, Lunch, Snack, Dinner
───────────────────────────────────────────────────────────── */
export function MealBadgeSVG({ type }: { type: 'breakfast' | 'lunch' | 'snack' | 'dinner' }) {
  if (type === 'breakfast') {
    return (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="bfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        {/* Morning Sun */}
        <circle cx="20" cy="14" r="7" fill="url(#bfGrad)" opacity="0.9" />
        <path d="M 12 28 Q 20 23 28 28 L 26 32 Q 20 34 14 32 Z" fill="#e2e8f0" />
        <line x1="8" y1="14" x2="10" y2="14" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <line x1="30" y1="14" x2="32" y2="14" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="3" x2="20" y2="5" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === 'lunch') {
    return (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="lunchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        {/* Salad bowl & leaf */}
        <ellipse cx="20" cy="24" rx="13" ry="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
        <path d="M 10 24 Q 20 33 30 24 Z" fill="url(#lunchGrad)" opacity="0.8" />
        <path d="M 18 11 Q 23 8 25 15 Q 20 17 18 11 Z" fill="#10b981" />
        <circle cx="21" cy="20" r="3" fill="#f43f5e" />
      </svg>
    )
  }

  if (type === 'snack') {
    return (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="snackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
        </defs>
        {/* Apple Energy */}
        <path
          d="M 20 16 C 16 11 11 15 12 22 C 13 28 17 31 20 31 C 23 31 27 28 28 22 C 29 15 24 11 20 16 Z"
          fill="url(#snackGrad)"
        />
        <path d="M 20 16 Q 22 9 24 8" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
        <path d="M 22 10 Q 25 10 26 12" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }

  // Dinner
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="dinnerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      {/* Moon & Plate */}
      <circle cx="20" cy="22" r="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
      <path
        d="M 22 8 A 7 7 0 1 1 15 15 A 6 6 0 0 0 22 8 Z"
        fill="url(#dinnerGrad)"
        filter="drop-shadow(0 0 4px #a855f7)"
      />
      <circle cx="20" cy="22" r="6" fill="#a855f7" opacity="0.3" />
      <line x1="17" y1="22" x2="23" y2="22" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────
   5. SCAN TARGET VISUAL SVG
   Food scanner viewfinder HUD
───────────────────────────────────────────────────────────── */
export function ScanTargetVisualSVG() {
  return (
    <svg viewBox="0 0 140 100" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="hudBeam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
          <stop offset="50%" stopColor="#34d399" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Target Corners */}
      <path d="M 15 25 L 15 15 L 25 15" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 125 25 L 125 15 L 115 15" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 15 75 L 15 85 L 25 85" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 125 75 L 125 85 L 115 85" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />

      {/* Center crosshair */}
      <circle cx="70" cy="50" r="16" stroke="rgba(52,211,153,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="70" cy="50" r="2.5" fill="#34d399" />

      {/* Laser line */}
      <rect x="20" y="48" width="100" height="2" fill="url(#hudBeam)">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,-22; 0,22; 0,-22"
          dur="2.4s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  )
}
