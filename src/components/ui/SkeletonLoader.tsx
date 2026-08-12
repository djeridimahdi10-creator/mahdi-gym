'use client'

import React from 'react'

export function SkeletonLoader({
  variant = 'card',
  count = 1,
  className = '',
}: {
  variant?: 'card' | 'row' | 'timeline' | 'dashboard'
  count?: number
  className?: string
}) {
  const items = Array.from({ length: count })

  if (variant === 'dashboard') {
    return (
      <div className={`space-y-6 w-full animate-pulse ${className}`}>
        <div className="h-10 w-64 rounded-2xl skeleton-shimmer" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-36 rounded-3xl skeleton-shimmer" />
          ))}
        </div>
        <div className="h-44 rounded-3xl skeleton-shimmer" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 rounded-3xl skeleton-shimmer" />
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'timeline') {
    return (
      <div className={`space-y-4 w-full animate-pulse ${className}`}>
        {items.map((_, i) => (
          <div key={i} className="p-5 rounded-3xl border border-white/5 flex items-center justify-between skeleton-shimmer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10" />
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-white/10" />
                <div className="h-3 w-20 rounded bg-white/5" />
              </div>
            </div>
            <div className="h-8 w-24 rounded-xl bg-white/10" />
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'row') {
    return (
      <div className={`space-y-3 w-full animate-pulse ${className}`}>
        {items.map((_, i) => (
          <div key={i} className="h-16 rounded-2xl skeleton-shimmer" />
        ))}
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse ${className}`}>
      {items.map((_, i) => (
        <div key={i} className="h-48 rounded-3xl skeleton-shimmer" />
      ))}
    </div>
  )
}
