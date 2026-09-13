import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { HowItWorksHero } from '@/components/how-it-works/HowItWorksHero'
import { SimpleVisualWorkflow } from '@/components/how-it-works/SimpleVisualWorkflow'
import { SimpleComparison } from '@/components/how-it-works/SimpleComparison'
import { Button } from '@/components/ui/Button'
import { Zap, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How It Works | NutriSaaS — AI Nutrition & Gym Coach',
  description:
    'See how NutriSaaS makes nutrition and fitness simple in 4 visual steps. AI body targets, custom Algerian meal plans, photo food scanning, and 24/7 Darija coaching.',
}

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-dark-950 overflow-x-hidden text-dark-100 selection:bg-primary-500/30">
      {/* Header Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HowItWorksHero />

      {/* 4 Simple Visual Steps with Animated SVGs */}
      <SimpleVisualWorkflow />

      {/* 3-Pillar Visual Comparison */}
      <SimpleComparison />

      {/* Premium Conversion CTA Section */}
      <section className="py-24 relative bg-dark-950 overflow-hidden border-t border-white/5">
        {/* Ambient Gradient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-primary-500/15 via-ai-500/15 to-energy-500/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="container-custom relative max-w-4xl mx-auto">
          <div className="rounded-3xl p-8 sm:p-14 lg:p-16 text-center overflow-hidden shadow-2xl relative border border-white/10 bg-gradient-to-b from-dark-900/90 to-dark-950/90 space-y-7">
            {/* Top Icon with Aura */}
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-400 via-primary-500 to-teal-500 flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(16,185,129,0.4)]">
              <Zap className="w-8 h-8 text-dark-950 fill-dark-950" />
            </div>

            {/* Headline */}
            <div className="space-y-4 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
                Ready to Make Fitness <br />
                <span className="text-gradient-hero">Simple & Stress-Free?</span>
              </h2>

              <p className="text-dark-200 text-base sm:text-lg leading-relaxed font-normal">
                Start your free 7-day trial. Get your custom targets, meal plan, and 24/7 Darija coach in under 60 seconds.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
              <Link href="/signup">
                <Button
                  variant="default"
                  size="lg"
                  className="rounded-full shadow-[0_0_35px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(52,211,153,0.6)] px-8 font-semibold tracking-wide"
                >
                  <span>Start Free 7-Day Trial</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="lg"
                  className="rounded-full border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] text-white px-7 font-medium"
                >
                  Sign In to Account
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-5 flex flex-wrap justify-center items-center gap-6 text-xs text-dark-200 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>Setup in 60 seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>Cancel anytime with 1 click</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-dark-950">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-dark-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 via-primary-500 to-teal-600 flex items-center justify-center text-dark-950 font-bold shadow-md shadow-emerald-500/20">
              <Zap className="w-4 h-4 fill-dark-950" />
            </div>
            <span className="font-display font-extrabold text-white text-base tracking-tight">
              NutriSaaS<span className="text-primary-400">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/how-it-works" className="text-primary-300 font-bold">
              How It Works
            </Link>
            <Link href="/signup" className="hover:text-white transition-colors">
              Start Free
            </Link>
            <Link href="/login" className="hover:text-white transition-colors">
              Sign In
            </Link>
          </div>

          <p className="text-dark-400">
            &copy; {new Date().getFullYear()} NutriSaaS AI. Precision Nutrition & Adaptive Fitness.
          </p>
        </div>
      </footer>
    </main>
  )
}
