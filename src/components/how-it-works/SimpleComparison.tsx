'use client'

import React from 'react'
import { Check, X, AlertTriangle, Sparkles, Zap, Smartphone, Dumbbell, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export function SimpleComparison() {
  return (
    <section className="py-24 bg-dark-950 relative overflow-hidden border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-primary-500/10 via-ai-500/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="container-custom relative space-y-16 max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="flex justify-center">
            <Badge variant="energy" size="md" glow className="gap-2 px-4 py-1.5 font-medium tracking-wide">
              <Sparkles className="w-4 h-4 text-energy-400" />
              <span>Clear Advantage</span>
            </Badge>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            Why NutriSaaS Beats <br />
            <span className="text-gradient-hero">The Old Way</span>
          </h2>

          <p className="text-dark-200 text-base sm:text-lg leading-relaxed font-normal">
            No more restrictive diets, expensive trainers, or confusing US-only calorie apps.
          </p>
        </div>

        {/* 3 Elevated Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Card 1: Generic Calorie Apps */}
          <div className="p-6 sm:p-7 rounded-3xl bg-dark-900/80 border border-white/10 space-y-6 flex flex-col justify-between hover:border-red-500/30 transition-all duration-300">
            <div className="space-y-5">
              {/* Header Icon & Tag */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  <Smartphone className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-bold text-red-400/90 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 uppercase tracking-wider">
                  Outdated
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-xl font-display font-bold text-white tracking-tight">Generic US Trackers</h3>
                <p className="text-xs text-dark-300 mt-1 leading-relaxed font-normal">
                  Complicated databases and frustrating daily typing.
                </p>
              </div>

              {/* Styled Micro-Cards for Bullet Points */}
              <div className="space-y-2.5 pt-1">
                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/15 text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div className="text-xs leading-relaxed text-dark-200">
                    <strong className="text-white block font-semibold mb-0.5">Manual Ingredient Typing</strong>
                    Manual typing for every single ingredient and meal.
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/15 text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div className="text-xs leading-relaxed text-dark-200">
                    <strong className="text-white block font-semibold mb-0.5">Zero Local Foods</strong>
                    Cannot recognize Couscous, Tajine, or local dishes.
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/15 text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div className="text-xs leading-relaxed text-dark-200">
                    <strong className="text-white block font-semibold mb-0.5">Annoying Paywalls</strong>
                    Aggressive pop-up ads and locked premium features.
                  </div>
                </div>
              </div>
            </div>

            {/* Price Footer */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-dark-400 font-medium">Monthly Cost:</span>
              <div className="text-right">
                <span className="text-red-400 font-mono font-bold text-sm block">$19+/month</span>
                <span className="text-[10px] text-dark-400">Freemium with ads</span>
              </div>
            </div>
          </div>

          {/* Card 2: Private Personal Trainer */}
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-900/80 border border-white/10 space-y-6 flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300">
            <div className="space-y-5">
              {/* Header Icon & Tag */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-bold text-amber-400/90 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 uppercase tracking-wider">
                  High Cost
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-xl font-display font-bold text-white tracking-tight">Private Gym Coach</h3>
                <p className="text-xs text-dark-300 mt-1 leading-relaxed font-normal">
                  Personalized, but extremely expensive and rigid.
                </p>
              </div>

              {/* Styled Micro-Cards for Bullet Points */}
              <div className="space-y-2.5 pt-1">
                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs leading-relaxed text-dark-200">
                    <strong className="text-white block font-semibold mb-0.5">Expensive Monthly Fee</strong>
                    Costs $150 to $350 every month — unaffordable for many.
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs leading-relaxed text-dark-200">
                    <strong className="text-white block font-semibold mb-0.5">Restricted Working Hours</strong>
                    Only available during gym hours (no instant 24/7 answers).
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs leading-relaxed text-dark-200">
                    <strong className="text-white block font-semibold mb-0.5">Rigid Paper Diets</strong>
                    Rigid paper diets with no flexible recipe swaps.
                  </div>
                </div>
              </div>
            </div>

            {/* Price Footer */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-dark-400 font-medium">Monthly Cost:</span>
              <div className="text-right">
                <span className="text-amber-400 font-mono font-bold text-sm block">$150 – $350/mo</span>
                <span className="text-[10px] text-dark-400">High ongoing expense</span>
              </div>
            </div>
          </div>

          {/* Card 3: NutriSaaS AI (Spotlight) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-primary-950/50 via-dark-900/95 to-dark-900 border-2 border-primary-400/60 shadow-[0_0_50px_rgba(16,185,129,0.2)] space-y-6 flex flex-col justify-between relative hover:border-primary-400 transition-all duration-300 transform hover:-translate-y-1">
            {/* Top Floating Highlight Pill */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-dark-950 text-[10px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-dark-950" />
                <span>All-In-One AI Solution</span>
              </span>
            </div>

            <div className="space-y-5">
              {/* Header Icon & Tag */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-dark-950 shadow-md shadow-emerald-500/20">
                  <Zap className="w-6 h-6 fill-dark-950" />
                </div>
                <Badge variant="primary" size="sm" dot className="font-mono text-[10px] font-bold">
                  Online 24/7
                </Badge>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-xl font-display font-extrabold text-white tracking-tight">NutriSaaS AI</h3>
                <p className="text-xs text-primary-200 mt-1 leading-relaxed font-normal">
                  Everything you need to succeed, right in your pocket.
                </p>
              </div>

              {/* Styled Micro-Cards for Bullet Points */}
              <div className="space-y-2.5 pt-1">
                <div className="p-3 rounded-2xl bg-primary-500/10 border border-primary-500/20 hover:border-primary-400/40 transition-colors flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div className="text-xs leading-relaxed text-dark-100">
                    <strong className="text-white block font-bold mb-0.5">Instant Photo Scanner</strong>
                    Snap your plate in 2 seconds to log calories and protein.
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-primary-500/10 border border-primary-500/20 hover:border-primary-400/40 transition-colors flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div className="text-xs leading-relaxed text-dark-100">
                    <strong className="text-white block font-bold mb-0.5">Algerian Food Database</strong>
                    Accurate nutrition for Couscous, Shakshuka, Chtitha & more.
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-primary-500/10 border border-primary-500/20 hover:border-primary-400/40 transition-colors flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div className="text-xs leading-relaxed text-dark-100">
                    <strong className="text-white block font-bold mb-0.5">24/7 Coach in Darija (🇩🇿)</strong>
                    Friendly, instant answers in your native local dialect.
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-primary-500/10 border border-primary-500/20 hover:border-primary-400/40 transition-colors flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div className="text-xs leading-relaxed text-dark-100">
                    <strong className="text-white block font-bold mb-0.5">1-Click Recipe Swaps</strong>
                    Swap any meal in 1 click and keep your calories balanced.
                  </div>
                </div>
              </div>
            </div>

            {/* Price Footer */}
            <div className="pt-4 border-t border-primary-500/20 flex items-center justify-between text-xs">
              <span className="text-primary-300 font-semibold">Monthly Cost:</span>
              <div className="text-right">
                <span className="text-emerald-300 font-mono font-extrabold text-sm bg-primary-500/20 px-3 py-1 rounded-xl border border-primary-400/30 inline-block">
                  Affordable (~$12/mo)
                </span>
                <span className="text-[10px] text-emerald-400/90 block mt-0.5 font-medium">Save 90%+ vs. personal coach</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
