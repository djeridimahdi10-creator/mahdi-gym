'use client'

import React from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export function HowItWorksHero() {
  const scrollToSteps = () => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById('visual-steps')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-dark-950">
      {/* Soft Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-emerald-500/15 via-ai-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-16 right-12 w-80 h-80 bg-energy-400/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="container-custom relative z-10 text-center space-y-7 max-w-4xl mx-auto">
        {/* Top Eyebrow Badge */}
        <div className="flex justify-center">
          <Badge variant="primary" size="md" glow className="gap-2 px-4 py-1.5 font-medium">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span>Visual 4-Step Guide • Simple & Fast</span>
          </Badge>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.08]">
          Eat Better. Train Smarter. <br />
          <span className="text-gradient-hero">In 4 Visual Steps.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-dark-200 max-w-2xl mx-auto leading-relaxed font-normal">
          No calorie math or complicated spreadsheets. See how AI calculates your body targets, creates your meals, scans your plates, and coaches you 24/7.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 pt-3">
          <Link href="/signup">
            <Button
              variant="default"
              size="lg"
              className="rounded-full shadow-[0_0_30px_rgba(16,185,129,0.35)] px-8 font-semibold tracking-wide"
            >
              <span>Start Free 7-Day Trial</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="lg"
            onClick={scrollToSteps}
            className="rounded-full border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] text-white px-7 font-medium"
          >
            <span>See Visual Steps</span>
            <ArrowDown className="w-4 h-4 ml-2 text-primary-400" />
          </Button>
        </div>
      </div>
    </section>
  )
}
