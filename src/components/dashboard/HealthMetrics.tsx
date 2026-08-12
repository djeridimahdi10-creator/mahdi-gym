'use client'

import { Flame, Zap, Droplets, Heart } from 'lucide-react'

interface MetricRingCardProps {
  value: number
  max: number
  color: string
  label: string
  valueText: string
  targetText: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
}

function MetricRingCard({
  value,
  max,
  color,
  label,
  valueText,
  targetText,
  icon: Icon,
}: MetricRingCardProps) {
  const size = 72
  const strokeWidth = 5.5
  const r = (size - strokeWidth * 2) / 2
  const circ = 2 * Math.PI * r
  const pct = Math.min(1, Math.max(0, value / max))
  const offset = circ * (1 - pct)
  const cx = size / 2

  return (
    <div
      className="p-3.5 sm:p-5 rounded-2xl flex flex-col items-center justify-center gap-2.5 sm:gap-3 text-center h-full relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: 'rgba(11, 17, 31, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      {/* Soft color halo */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}12 0%, transparent 70%)` }}
      />

      {/* Circular Progress Ring */}
      <div className="relative flex-shrink-0">
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={cx}
            cy={cx}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={cx}
            cy={cx}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circ}`}
            strokeDashoffset={offset}
            style={{
              filter: `drop-shadow(0 0 8px ${color}80)`,
              transition: 'stroke-dashoffset 1.2s ease-in-out',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-5 h-5 sm:w-[22px] sm:h-[22px]" style={{ color }} />
        </div>
      </div>

      {/* Metric Data Text */}
      <div className="relative min-w-0 w-full">
        <span className="block text-lg sm:text-[22px] font-black text-white tracking-tight leading-none">
          {valueText}
        </span>
        {targetText ? (
          <span className="block text-[9.5px] sm:text-[11px] text-slate-400 font-medium mt-1 truncate">
            {targetText}
          </span>
        ) : (
          <span className="block text-[9.5px] sm:text-[11px] text-slate-500 font-medium mt-1 truncate">
            Optimal
          </span>
        )}
        <p
          className="text-[9.5px] sm:text-[11px] font-bold mt-1 tracking-[0.08em] uppercase"
          style={{ color }}
        >
          {label}
        </p>
      </div>
    </div>
  )
}

export function HealthMetrics() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4 h-full">
      {/* Calories */}
      <MetricRingCard
        value={1520}
        max={2200}
        color="#f97316"
        label="Calories"
        valueText="1520"
        targetText="/ 2200 kcal"
        icon={Flame}
      />

      {/* Protein */}
      <MetricRingCard
        value={98}
        max={185}
        color="#a855f7"
        label="Protein"
        valueText="98g"
        targetText="/ 185g protein"
        icon={Zap}
      />

      {/* Hydration */}
      <MetricRingCard
        value={2.5}
        max={3.0}
        color="#00d4ff"
        label="Hydration"
        valueText="2.5L"
        targetText="/ 3L water"
        icon={Droplets}
      />

      {/* Health Score */}
      <MetricRingCard
        value={83}
        max={100}
        color="#10b981"
        label="Health Score"
        valueText="83%"
        targetText=""
        icon={Heart}
      />
    </div>
  )
}
