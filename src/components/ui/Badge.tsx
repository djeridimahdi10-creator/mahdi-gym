'use client'

import { cn } from '@/lib/utils'

interface BadgeProps {
  variant?: 'default' | 'primary' | 'energy' | 'coral' | 'success' | 'ai' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
  dot?: boolean
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'default', size = 'sm', glow = false, dot = false, children, className }: BadgeProps) {
  const variants = {
    default: 'bg-dark-700/80 text-dark-300 border border-white/[0.07]',
    primary: 'bg-primary-500/15 text-primary-300 border border-primary-400/25',
    energy: 'bg-energy-300/15 text-energy-300 border border-energy-300/25',
    coral: 'bg-coral-400/15 text-coral-400 border border-coral-400/25',
    success: 'bg-green-500/15 text-green-400 border border-green-500/25',
    ai: 'bg-ai-400/15 text-ai-300 border border-ai-400/25',
    outline: 'bg-transparent text-white border border-white/20',
  }

  const glowStyles = {
    default: '',
    primary: 'shadow-[0_0_12px_rgba(52,211,153,0.2)]',
    energy: 'shadow-[0_0_12px_rgba(251,146,60,0.2)]',
    coral: 'shadow-[0_0_12px_rgba(244,63,94,0.2)]',
    success: 'shadow-[0_0_12px_rgba(34,197,94,0.2)]',
    ai: 'shadow-[0_0_12px_rgba(168,85,247,0.2)]',
    outline: '',
  }

  const dotColors = {
    default: 'bg-white/40',
    primary: 'bg-primary-400',
    energy: 'bg-energy-300',
    coral: 'bg-coral-400',
    success: 'bg-green-400',
    ai: 'bg-ai-300',
    outline: 'bg-white/50',
  }

  const sizes = {
    sm: 'px-2.5 py-0.5 text-[10px] gap-1.5',
    md: 'px-3.5 py-1 text-[11px] gap-1.5',
    lg: 'px-4 py-1.5 text-xs gap-2',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-bold tracking-wider uppercase letter-spacing-[0.06em]',
        variants[variant],
        sizes[size],
        glow && glowStyles[variant],
        className
      )}
    >
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColors[variant], glow && 'animate-ping-dot')} />
      )}
      {children}
    </span>
  )
}
