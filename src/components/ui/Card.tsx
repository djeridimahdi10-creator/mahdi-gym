'use client'

import { cn } from '@/lib/utils'

interface CardProps {
  variant?: 'default' | 'hover' | 'static' | 'premium' | 'inset'
  className?: string
  style?: React.CSSProperties
  onClick?: React.MouseEventHandler<HTMLDivElement>
  children: React.ReactNode
}

export function Card({ variant = 'default', className, style, onClick, children }: CardProps) {
  const variants = {
    default: 'glass-card',
    hover: 'glass-card',
    static: 'glass-card-static',
    premium: 'card-premium',
    inset: 'card-inset',
  }

  return (
    <div className={cn(variants[variant], 'p-6 sm:p-7 lg:p-8', className)} style={style} onClick={onClick}>
      {children}
    </div>
  )
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('mb-5', className)}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <h3 className={cn('text-lg font-bold text-white leading-snug tracking-tight', className)} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
      {children}
    </h3>
  )
}

export function CardDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <p className={cn('text-xs leading-relaxed text-dark-400 mt-1', className)}>
      {children}
    </p>
  )
}

export function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  )
}
