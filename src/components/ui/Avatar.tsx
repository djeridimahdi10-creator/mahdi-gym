'use client'

import { cn } from '@/lib/utils'

interface AvatarProps {
  src?: string | null
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  ring?: boolean
  status?: 'online' | 'away' | 'offline'
  className?: string
}

export function Avatar({ src, alt, fallback, size = 'md', ring = false, status, className }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-xl',
  }

  const statusSizes = {
    sm: 'w-2.5 h-2.5 border-[1.5px]',
    md: 'w-3 h-3 border-2',
    lg: 'w-4 h-4 border-2',
    xl: 'w-5 h-5 border-[3px]',
  }

  const statusColors = {
    online: 'bg-green-400',
    away: 'bg-yellow-400',
    offline: 'bg-dark-500',
  }

  const ringStyle = ring
    ? 'ring-2 ring-primary-400/40 ring-offset-2 ring-offset-dark-900'
    : ''

  const content = src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt || 'Avatar'}
      className={cn(
        'rounded-full object-cover',
        sizes[size],
        ringStyle,
        'transition-transform duration-300 hover:scale-105',
        className
      )}
    />
  ) : (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-semibold text-white',
        'bg-gradient-to-br from-primary-500 to-primary-400',
        sizes[size],
        ringStyle,
        'transition-transform duration-300 hover:scale-105',
        className
      )}
    >
      {fallback || '?'}
    </div>
  )

  if (status) {
    return (
      <div className="relative inline-flex">
        {content}
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-dark-900',
            statusSizes[size],
            statusColors[status],
          )}
        />
      </div>
    )
  }

  return content
}
