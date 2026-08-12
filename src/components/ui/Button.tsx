'use client'

import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'energy' | 'ghost' | 'danger' | 'ai' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  loading?: boolean
  glow?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  glow = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = [
    'inline-flex items-center justify-center gap-2 font-semibold rounded-2xl',
    'transition-all duration-300 ease-out',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none',
    'active:scale-[0.97] active:transition-[transform] active:duration-100',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400',
    'cursor-pointer relative overflow-hidden',
  ].join(' ')

  const variants = {
    primary: [
      'bg-gradient-to-r from-primary-500 to-primary-400 text-white',
      'hover:shadow-[0_8px_30px_rgba(16,185,129,0.35),0_0_60px_rgba(52,211,153,0.12)]',
      'hover:-translate-y-1 hover:brightness-110',
      'border border-primary-400/20',
    ].join(' '),
    energy: [
      'bg-gradient-to-r from-energy-400 to-energy-300 text-white',
      'hover:shadow-[0_8px_30px_rgba(249,115,22,0.35),0_0_60px_rgba(251,146,60,0.12)]',
      'hover:-translate-y-1 hover:brightness-110',
      'border border-energy-300/20',
    ].join(' '),
    ghost: [
      'bg-transparent text-dark-300',
      'border border-white/[0.09]',
      'hover:bg-white/[0.06] hover:border-white/[0.18] hover:text-white',
      'hover:-translate-y-0.5',
      'hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]',
    ].join(' '),
    outline: [
      'bg-transparent text-primary-300',
      'border border-primary-400/30',
      'hover:bg-primary-500/10 hover:border-primary-400/50 hover:text-primary-200',
      'hover:-translate-y-0.5',
      'hover:shadow-[0_0_20px_rgba(52,211,153,0.15)]',
    ].join(' '),
    danger: [
      'bg-red-500/10 text-red-400',
      'border border-red-500/20',
      'hover:bg-red-500/20 hover:border-red-500/30',
      'hover:shadow-[0_4px_20px_rgba(239,68,68,0.15)]',
    ].join(' '),
    ai: [
      'bg-gradient-to-r from-ai-500 to-ai-400 text-white',
      'hover:shadow-[0_8px_30px_rgba(168,85,247,0.35),0_0_60px_rgba(168,85,247,0.12)]',
      'hover:-translate-y-1 hover:brightness-110',
      'border border-ai-400/20',
    ].join(' '),
  }

  const glowVariants = {
    primary: 'shadow-[0_0_20px_rgba(52,211,153,0.25)]',
    energy: 'shadow-[0_0_20px_rgba(249,115,22,0.25)]',
    ghost: '',
    outline: '',
    danger: '',
    ai: 'shadow-[0_0_20px_rgba(168,85,247,0.25)]',
  }

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    icon: 'p-2.5 text-sm',
  }

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        glow ? glowVariants[variant] : '',
        'btn-shine',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  )
}
