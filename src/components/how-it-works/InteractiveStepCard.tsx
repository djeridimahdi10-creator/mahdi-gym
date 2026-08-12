'use client'

import React, { useState } from 'react'
import { Sparkles } from 'lucide-react'

interface InteractiveStepCardProps {
  stepNumber: string
  title: string
  subtitle: string
  description: string
  tag: string
  tagColor: 'emerald' | 'indigo' | 'coral' | 'amber'
  svgComponent: React.ReactNode
  visualizerComponent: React.ReactNode
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
  isReversed = false,
}: InteractiveStepCardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'interactive'>('interactive')

  const colorStyles = {
    emerald: {
      tagBg: 'bg-primary-500/10 border-primary-400/20 text-primary-300',
      glow: 'group-hover:shadow-[0_0_50px_rgba(16,185,129,0.15)]',
      borderHover: 'group-hover:border-primary-500/40',
      badgeBg: 'from-primary-500 to-primary-400',
    },
    indigo: {
      tagBg: 'bg-ai-400/10 border-ai-400/20 text-ai-300',
      glow: 'group-hover:shadow-[0_0_50px_rgba(99,102,241,0.15)]',
      borderHover: 'group-hover:border-ai-400/40',
      badgeBg: 'from-ai-500 to-ai-400',
    },
    coral: {
      tagBg: 'bg-coral-400/10 border-coral-400/20 text-coral-300',
      glow: 'group-hover:shadow-[0_0_50px_rgba(244,63,94,0.15)]',
      borderHover: 'group-hover:border-coral-400/40',
      badgeBg: 'from-coral-500 to-coral-400',
    },
    amber: {
      tagBg: 'bg-energy-400/10 border-energy-300/20 text-energy-300',
      glow: 'group-hover:shadow-[0_0_50px_rgba(245,158,11,0.15)]',
      borderHover: 'group-hover:border-energy-300/40',
      badgeBg: 'from-energy-500 to-energy-400',
    },
  }[tagColor]

  return (
    <div
      id={`step-${stepNumber}`}
      className={`group relative rounded-3xl bg-dark-900/60 backdrop-blur-xl border border-white/10 p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:-translate-y-1.5 ${colorStyles.glow} ${colorStyles.borderHover}`}
    >
      {/* Background Subtle Gradient Mesh */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

      {/* Step Header info */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <span className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${colorStyles.badgeBg} flex items-center justify-center text-white font-display font-bold text-sm shadow-lg`}>
            {stepNumber}
          </span>
          <span className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider ${colorStyles.tagBg}`}>
            {tag}
          </span>
        </div>

        {/* Tab Toggle: Visual illustration vs Live Demo */}
        <div className="bg-dark-950/80 p-1 rounded-xl border border-white/10 flex items-center gap-1">
          <button
            onClick={() => setActiveTab('interactive')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'interactive'
                ? 'bg-white/10 text-white shadow'
                : 'text-dark-400 hover:text-white'
            }`}
          >
            ⚡ Try Demo
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-white/10 text-white shadow'
                : 'text-dark-400 hover:text-white'
            }`}
          >
            🖼️ Graphic View
          </button>
        </div>
      </div>

      {/* Grid Layout (Reversible on alternating steps) */}
      <div className={`grid lg:grid-cols-12 gap-8 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
        {/* Left Side: Text Storytelling (Spans 5 cols) */}
        <div className={`lg:col-span-5 space-y-4 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="text-xs font-bold uppercase tracking-wider text-dark-400">{subtitle}</div>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
            {title}
          </h3>
          <p className="text-dark-300 text-sm sm:text-base leading-relaxed">
            {description}
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs text-dark-400">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span>Interactive real-time preview powered by NutriSaaS Engine</span>
          </div>
        </div>

        {/* Right Side: Visualizer or SVG Illustration (Spans 7 cols) */}
        <div className={`lg:col-span-7 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="bg-dark-950/90 rounded-2xl border border-white/10 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />

            {activeTab === 'interactive' ? (
              <div className="animate-fade-in">{visualizerComponent}</div>
            ) : (
              <div className="animate-fade-in">{svgComponent}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
