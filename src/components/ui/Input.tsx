'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: React.ReactNode
  rightElement?: React.ReactNode
  isValid?: boolean
  containerClassName?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      icon,
      rightElement,
      isValid,
      className,
      containerClassName,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('w-full group flex flex-col', containerClassName)}>
        {label && (
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-extrabold tracking-widest text-dark-300 uppercase transition-colors duration-200 group-focus-within:text-emerald-400 flex items-center gap-1.5">
              <span>{label}</span>
              {required && <span className="text-emerald-400 text-xs font-mono">*</span>}
            </label>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>
        )}

        <div className="relative flex items-center w-full">
          {/* Left Icon */}
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10 flex items-center justify-center text-dark-400 group-focus-within:text-emerald-400 group-focus-within:scale-110 transition-all duration-300">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            disabled={disabled}
            style={{
              paddingLeft: icon ? '44px' : '16px',
              paddingRight: rightElement || isValid ? '44px' : '16px',
              ...props.style,
            }}
            className={cn(
              'w-full h-12 text-sm font-medium text-white tracking-wide',
              'bg-dark-950/70 border border-white/10 hover:border-white/20',
              'rounded-2xl transition-all duration-300 backdrop-blur-md',
              'placeholder:text-dark-500/70 selection:bg-emerald-500/30 selection:text-emerald-200',
              'focus:outline-none focus:border-emerald-400/80 focus:bg-dark-900/90',
              'focus:ring-4 focus:ring-emerald-500/15 focus:shadow-[0_0_25px_rgba(52,211,153,0.18)]',
              /* Error styling */
              error && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20 focus:shadow-[0_0_25px_rgba(239,68,68,0.2)]',
              /* Disabled styling */
              disabled && 'opacity-50 cursor-not-allowed bg-dark-900/40 hover:border-white/10',
              className
            )}
            {...props}
          />

          {/* Right Element or Valid Indicator */}
          {(rightElement || isValid) && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center text-dark-400 hover:text-white transition-colors duration-200">
              {rightElement ? (
                rightElement
              ) : isValid ? (
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 animate-pop-in">
                  <svg className="w-3 h-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5 font-medium animate-slide-down">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
            {error}
          </p>
        )}

        {/* Helper hint */}
        {!error && hint && (
          <p className="mt-1.5 text-[11px] text-dark-400 flex items-center gap-1 font-normal">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'


