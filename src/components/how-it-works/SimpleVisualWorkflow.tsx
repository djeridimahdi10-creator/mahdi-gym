'use client'

import React from 'react'
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import {
  ProfileScannerSVG,
  AINutritionPlanSVG,
  FoodScannerSVG,
  DarijaCoachSVG,
} from '@/components/how-it-works/AnimatedSVGIllustrations'

interface StepItem {
  number: string
  pillColor: string
  badgeText: string
  title: string
  description: string
  bullets: string[]
  visual: React.ReactNode
  reverse?: boolean
}

const steps: StepItem[] = [
  {
    number: '01',
    pillColor: 'text-primary-300 border-primary-500/30 bg-primary-500/10',
    badgeText: 'Step 01 • Body Targets',
    title: 'Calculate Your Exact Body Numbers',
    description:
      'Answer a few quick questions about your weight, activity, and goals. Our smart algorithm calculates the exact daily calories and protein you need to burn fat or build lean muscle.',
    bullets: [
      'Tailored to your body and metabolism, not generic formulas',
      'Clear daily targets for calories, protein, carbs, and healthy fats',
    ],
    visual: <ProfileScannerSVG />,
    reverse: false,
  },
  {
    number: '02',
    pillColor: 'text-ai-300 border-ai-500/30 bg-ai-500/10',
    badgeText: 'Step 02 • Smart Nutrition',
    title: 'Get Meals You Actually Enjoy',
    description:
      'Receive delicious breakfast, lunch, and dinner suggestions with authentic Algerian dishes (Couscous, Shakshuka, Chtitha) and international healthy recipes. Do not like a meal? Swap it in 1 click.',
    bullets: [
      'Every meal automatically hits your calculated targets',
      '1-click recipe swaps so you never have to eat boring food',
    ],
    visual: <AINutritionPlanSVG />,
    reverse: true,
  },
  {
    number: '03',
    pillColor: 'text-coral-300 border-coral-500/30 bg-coral-500/10',
    badgeText: 'Step 03 • Photo Scanner',
    title: 'Snap a Photo of Your Plate',
    description:
      'No more tedious typing, manual searching, or barcode hunting. Just point your smartphone camera at your plate to recognize ingredients and log calories in under 2 seconds.',
    bullets: [
      'Instant recognition for homemade dishes and restaurants',
      'Verified database for Algerian and Mediterranean foods',
    ],
    visual: <FoodScannerSVG />,
    reverse: false,
  },
  {
    number: '04',
    pillColor: 'text-energy-300 border-energy-500/30 bg-energy-500/10',
    badgeText: 'Step 04 • Darija AI Coach',
    title: 'Ask Your 24/7 Coach in Algerian Darija',
    description:
      'Chat naturally in Algerian Darija (🇩🇿), French, or English. Get instant advice on budget protein in local markets, gym recovery, and dining out with zero judgment.',
    bullets: [
      'Speaks fluent Algerian Darija and understands local life',
      'Available 24/7 on your phone for instant gym and diet guidance',
    ],
    visual: <DarijaCoachSVG />,
    reverse: true,
  },
]

export function SimpleVisualWorkflow() {
  return (
    <section id="visual-steps" className="py-20 bg-dark-950 relative overflow-hidden scroll-mt-24">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-b from-primary-500/5 via-ai-500/5 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="container-custom relative space-y-24 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="flex justify-center">
            <Badge variant="primary" size="md" glow className="gap-2 px-4 py-1.5 font-medium">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span>4 Simple Visual Steps</span>
            </Badge>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            How NutriSaaS Works <br />
            <span className="text-gradient-hero">In Real Life</span>
          </h2>

          <p className="text-dark-200 text-base sm:text-lg leading-relaxed font-normal">
            No complicated steps. Follow this simple daily loop to reach your fitness goals with zero stress.
          </p>
        </div>

        {/* 4 Alternating Visual Story Blocks */}
        <div className="space-y-28">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                step.reverse ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Text Side (5 cols) */}
              <div
                className={`lg:col-span-5 space-y-5 ${
                  step.reverse ? 'lg:col-start-8' : ''
                }`}
              >
                {/* Step indicator pill */}
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${step.pillColor}`}
                  >
                    STEP {step.number}
                  </span>
                  <span className="text-xs text-dark-300 font-semibold tracking-wide">
                    {step.badgeText}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight leading-snug">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-dark-200 text-sm sm:text-base leading-relaxed font-normal">
                  {step.description}
                </p>

                {/* Checkmark Bullets */}
                <div className="space-y-2.5 pt-2">
                  {step.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-dark-100">
                      <CheckCircle2 className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual SVG Side (7 cols) */}
              <div
                className={`lg:col-span-7 ${
                  step.reverse ? 'lg:col-start-1' : ''
                }`}
              >
                <div className="relative group transition-transform duration-500 hover:scale-[1.01]">
                  {/* Subtle decorative glow under SVG */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/10 via-ai-500/10 to-transparent rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Render the Animated SVG */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-dark-900/60 p-2 sm:p-4">
                    {step.visual}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
