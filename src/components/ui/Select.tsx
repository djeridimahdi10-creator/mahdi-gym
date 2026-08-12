'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string; description?: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div className="w-full group">
        {label && (
          <label className="block text-sm font-medium text-dark-300 mb-2 transition-colors group-focus-within:text-primary-300">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              'w-full px-4 py-3.5 rounded-2xl text-white text-sm appearance-none',
              'bg-dark-800/60 border border-white/10',
              'transition-all duration-300',
              'focus:outline-none focus:border-primary-400/50',
              'focus:shadow-[0_0_0_3px_rgba(52,211,153,0.1),0_0_20px_rgba(52,211,153,0.05)]',
              'focus:bg-dark-800/80',
              'hover:border-white/15',
              'pr-10',
              error && 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]',
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 pointer-events-none transition-colors group-focus-within:text-primary-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && (
          <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
            {error}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
