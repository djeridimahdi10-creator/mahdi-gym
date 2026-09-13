'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Sparkles, Check, ArrowRight, Eye } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface InteractiveStepCardProps {
  stepNumber: string
  title: string
  subtitle: string
  description: string
  tag: string
  tagColor: 'emerald' | 'indigo' | 'coral' | 'amber'
  svgComponent: React.ReactNode
  visualizerComponent: React.ReactNode
  keyHighlights: string[]
  isReversed?: boolean
}

export function InteractiveStepCard({
  stepNumber,
  title,
  subtitle,
  description,
  tag,
  tagColor,
  svgComponent,
  visualizerComponent,
  keyHighlights,
  isReversed = false,
}: InteractiveStepCardProps) {
  const [activeTab, setActiveTab] = useState<'interactive' | 'overview'>('interactive')

  const colorStyles = {
    emerald: {
      tagVariant: 'primary' as const,
      glow: 'hover:shadow-[0_0_50px_rgba(16,185,129,0.18)]',
      borderHover: 'hover:border-primary-500/40',
      badgeBg: 'from-emerald-400 to-teal-500 text-dark-950',
    },
    indigo: {
      tagVariant: 'ai' as const,
      glow: 'hover:shadow-[0_0_50px_rgba(168,85,247,0.18)]',
      borderHover: 'hover:border-ai-400/40',
      badgeBg: 'from-ai-400 to-purple-600 text-white',
    },
    coral: {
      tagVariant: 'coral' as const,
      glow: 'hover:shadow-[0_0_50px_rgba(244,63,94,0.18)]',
      borderHover: 'hover:border-coral-400/40',
      badgeBg: 'from-coral-400 to-rose-600 text-white',
    },
    amber: {
      tagVariant: 'energy' as const,
      glow: 'hover:shadow-[0_0_50px_rgba(245,158,11,0.18)]',
      borderHover: 'hover:border-energy-300/40',
      badgeBg: 'from-energy-400 to-amber-600 text-dark-950',
    },
  }[tagColor]

  return (
    <Card
      id={`step-${stepNumber}`}
      variant="hover"
      className={`group relative p-6 sm:p-8 lg:p-10 transition-all duration-500 ${colorStyles.glow} ${colorStyles.borderHover}`}
    >
      {/* Background subtle gradient mesh */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

      {/* Step Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <span
            className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${colorStyles.badgeBg} flex items-center justify-center font-display font-extrabold text-base shadow-lg`}
          >
            {stepNumber}
          </span>
          <div>
            <div className="text-[10px] font-mono text-dark-400 uppercase tracking-widest">{subtitle}</div>
            <div className="mt-0.5">
              <Badge variant={colorStyles.tagVariant} size="sm">
                {tag}
              </Badge>
            </div>
          </div>
        </div>

        {/* Tab Switcher using shadcn Button components */}
        <div className="bg-dark-950/90 p-1 rounded-xl border border-white/10 flex items-center gap-1">
          <Button
            type="button"
            variant={activeTab === 'interactive' ? 'secondary' : 'ghost'}
            size="xs"
            onClick={() => setActiveTab('interactive')}
            className="text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary-400" />
            <span>Interactive Demo</span>
          </Button>
          <Button
            type="button"
            variant={activeTab === 'overview' ? 'secondary' : 'ghost'}
            size="xs"
            onClick={() => setActiveTab('overview')}
            className="text-xs"
          >
            <Eye className="w-3.5 h-3.5 text-ai-400" />
            <span>Graphic View</span>
          </Button>
        </div>
      </div>

      {/* Grid Layout (5 cols text, 7 cols visualizer) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Storytelling Column */}
        <div
          className={`space-y-5 ${
            isReversed ? 'lg:col-span-5 lg:order-2' : 'lg:col-span-5 lg:order-1'
          }`}
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h3>

          <p className="text-dark-300 text-sm sm:text-base leading-relaxed">
            {description}
          </p>

          {/* Key Feature Highlights Checklist */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Core Capabilities
            </div>
            {keyHighlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-dark-200">
                <div className="w-4 h-4 rounded-full bg-primary-500/20 border border-primary-400/30 flex items-center justify-center text-primary-300 flex-shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          {/* Action link using shadcn Button */}
          <div className="pt-2">
            <Link href="/signup">
              <Button variant="outline" size="sm" className="gap-2 text-xs font-bold text-primary-300 hover:text-white">
                <span>Try this step in your free trial</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Visualizer / Illustration Column */}
        <div
          className={`${
            isReversed ? 'lg:col-span-7 lg:order-1' : 'lg:col-span-7 lg:order-2'
          }`}
        >
          <Card
            variant="static"
            className="bg-dark-950/95 border-white/10 p-5 sm:p-7 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />

            {activeTab === 'interactive' ? (
              <div className="animate-fade-in">{visualizerComponent}</div>
            ) : (
              <div className="animate-fade-in py-6 flex items-center justify-center">
                {svgComponent}
              </div>
            )}
          </Card>
        </div>
      </div>
    </Card>
  )
}
