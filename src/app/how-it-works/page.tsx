import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { HowItWorksHero } from '@/components/how-it-works/HowItWorksHero'
import { HowItWorksRoadmap } from '@/components/how-it-works/HowItWorksRoadmap'
import { Button } from '@/components/ui'
import { Zap, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How It Works | NutriSaaS — AI Nutrition & Gym Coach',
  description:
    'Discover how NutriSaaS works. From AI biometrics setup and personalized meal plans to food scanning, gym workout routines, and 24/7 Darija AI coaching.',
}

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-dark-950 overflow-hidden text-dark-100">
      {/* Header Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HowItWorksHero />

      {/* Interactive 6-Step Roadmap */}
      <HowItWorksRoadmap />

      {/* Bottom CTA Banner */}
      <section className="py-24 relative bg-dark-950 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-primary-950/60 via-dark-900 to-dark-950 border border-primary-500/30 p-10 sm:p-16 text-center overflow-hidden shadow-2xl">
            {/* Ambient Background Lights */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-ai-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative space-y-6 max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-400 flex items-center justify-center mx-auto shadow-xl shadow-primary-500/20">
                <Zap className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
                Ready to Experience NutriSaaS?
              </h2>

              <p className="text-dark-300 text-base sm:text-lg leading-relaxed">
                Join thousands of users transforming their fitness, diet, and wellness journey with AI-driven precision.
              </p>

              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Link href="/signup">
                  <Button variant="primary" size="lg" className="px-10 text-base shadow-2xl shadow-primary-500/20">
                    Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="ghost" size="lg" className="px-8 text-base">
                    Log In to Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-dark-500 space-y-4">
          <div className="flex justify-center items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-primary-500 to-primary-400 flex items-center justify-center text-white font-bold">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="font-display font-bold text-white text-base">NutriSaaS</span>
          </div>
          <p>&copy; {new Date().getFullYear()} NutriSaaS. AI-Powered Nutrition & Fitness SaaS Platform.</p>
        </div>
      </footer>
    </main>
  )
}
