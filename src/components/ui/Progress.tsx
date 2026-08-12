'use client'

import { cn } from '@/lib/utils'

interface ProgressProps {
  value: number
  max?: number
  color?: 'primary' | 'energy' | 'coral' | 'ai'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  label?: string
  animated?: boolean
  className?: string
}

export function Progress({
  value,
  max = 100,
  color = 'primary',
  size = 'md',
  showLabel = false,
  label,
  animated = true,
  className,
}: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100)

  const colors = {
    primary: {
      bar: 'from-primary-500 to-primary-300',
      glow: 'shadow-[0_0_12px_rgba(52,211,153,0.4)]',
    },
    energy: {
      bar: 'from-energy-400 to-energy-300',
      glow: 'shadow-[0_0_12px_rgba(251,146,60,0.4)]',
    },
    coral: {
      bar: 'from-coral-400 to-energy-300',
      glow: 'shadow-[0_0_12px_rgba(244,63,94,0.4)]',
    },
    ai: {
      bar: 'from-ai-500 to-ai-300',
      glow: 'shadow-[0_0_12px_rgba(168,85,247,0.4)]',
    },
  }

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  }

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-dark-400">{label}</span>
          <span className="text-xs font-medium text-dark-300">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className={cn(
        'w-full rounded-full overflow-hidden relative',
        'bg-dark-800/80',
        sizes[size]
      )}>
        <div
          className={cn(
            'h-full rounded-full bg-gradient-to-r relative',
            colors[color].bar,
            animated && 'transition-all duration-700 ease-out',
          )}
          style={{ width: `${percentage}%` }}
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                animation: animated ? 'shimmer 2.5s infinite' : 'none',
              }}
            />
          </div>
          {/* Glow dot at end */}
          {percentage > 5 && (
            <div
              className={cn(
                'absolute right-0 top-1/2 -translate-y-1/2 rounded-full',
                size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4',
                'bg-white/80',
                colors[color].glow,
              )}
            />
          )}
        </div>
      </div>
    </div>
  )
}
