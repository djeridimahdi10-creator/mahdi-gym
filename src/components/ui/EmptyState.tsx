'use client'

import React from 'react'
import { Sparkles, LucideIcon } from 'lucide-react'
import { Button } from './Button'

interface EmptyStateProps {
  icon?: LucideIcon
  emoji?: string
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  actionHref?: string
  aiSuggestion?: string
  className?: string
}

export function EmptyState({
  icon: Icon,
  emoji,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  aiSuggestion,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`p-8 sm:p-12 rounded-3xl text-center flex flex-col items-center justify-center relative overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(15,23,42,0.6) 0%, rgba(30,41,59,0.3) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px border rgba(255,255,255,0.07)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-[100px] pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)' }}
      />

      {/* Icon / Emoji badge */}
      <div className="relative mb-5">
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center relative z-10 transition-transform duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(168,85,247,0.1) 100%)',
            border: '1px solid rgba(16,185,129,0.25)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          }}
        >
          {emoji ? (
            <span className="text-3xl sm:text-4xl">{emoji}</span>
          ) : Icon ? (
            <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary-400" />
          ) : (
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-primary-400" />
          )}
        </div>
        <div
          className="absolute inset-0 rounded-3xl blur-md opacity-50 animate-pulse"
          style={{ background: 'rgba(16,185,129,0.3)' }}
        />
      </div>

      {/* Title & Description */}
      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight max-w-md">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed mb-6">
        {description}
      </p>

      {/* AI Suggestion Box */}
      {aiSuggestion && (
        <div
          className="px-4 py-3 rounded-2xl mb-6 max-w-sm text-left flex items-start gap-2.5"
          style={{
            background: 'rgba(168,85,247,0.08)',
            border: '1px solid rgba(168,85,247,0.2)',
          }}
        >
          <Sparkles className="w-4 h-4 text-ai-300 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-ai-300">
              AI Suggestion
            </p>
            <p className="text-xs text-slate-300 mt-0.5 leading-snug">{aiSuggestion}</p>
          </div>
        </div>
      )}

      {/* Action Button */}
      {(actionLabel && (onAction || actionHref)) && (
        <div>
          {onAction ? (
            <Button onClick={onAction} variant="primary" size="md" glow>
              {actionLabel}
            </Button>
          ) : actionHref ? (
            <a href={actionHref}>
              <Button variant="primary" size="md" glow>
                {actionLabel}
              </Button>
            </a>
          ) : null}
        </div>
      )}
    </div>
  )
}
