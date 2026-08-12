'use client'

import React from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui'

export function HowItWorksHero() {
  const scrollToStep = (stepNum: string) => {
    const el = document.getElementById(`step-${stepNum}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden bg-dark-950">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-primary-500/10 via-ai-400/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-energy-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-400/20 text-xs font-semibold text-primary-300 tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-primary-400" />
          <span>Interactive SaaS Workflow Guide</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.05] max-w-5xl mx-auto">
          How NutriSaaS Powers Your <br />
          <span className="text-gradient-hero">AI Wellness Transformation</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
          From personalized biometrics and meal generation to instant AI food scanning, smart gym tracking, and 24/7 Darija coaching — explore the step-by-step product journey.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
          <Link href="/signup">
            <Button variant="primary" size="lg" className="px-8 shadow-xl shadow-primary-500/20 text-base">
              Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>

          <button
            onClick={() => scrollToStep('01')}
            className="px-6 py-3 rounded-xl bg-dark-800/80 border border-white/10 hover:border-white/20 text-white font-semibold text-sm transition-all flex items-center gap-2 hover:bg-dark-800"
          >
            <Play className="w-4 h-4 text-primary-400" />
            Interactive Workflow
          </button>
        </div>

        {/* Floating Quick Step Nav Pills */}
        <div className="pt-10 max-w-4xl mx-auto">
          <div className="text-xs font-medium text-dark-400 uppercase tracking-widest mb-4">
            Jump Directly To Any Step
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
            {[
              { num: '01', title: 'Onboarding', icon: '👤' },
              { num: '02', title: 'AI Plan', icon: '🤖' },
              { num: '03', title: 'Meal Track', icon: '🔥' },
              { num: '04', title: 'Scan Food', icon: '📷' },
              { num: '05', title: 'Gym Workout', icon: '🏋️' },
              { num: '06', title: 'AI Coach', icon: '💬' },
            ].map((step) => (
              <button
                key={step.num}
                onClick={() => scrollToStep(step.num)}
                className="p-3 rounded-2xl bg-dark-900/80 border border-white/5 hover:border-primary-400/40 hover:bg-dark-800 text-left transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-primary-300">{step.num}</span>
                  <span className="text-base group-hover:scale-110 transition-transform">{step.icon}</span>
                </div>
                <div className="text-xs font-semibold text-white truncate">{step.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
