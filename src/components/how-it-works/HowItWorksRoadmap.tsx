'use client'

import React from 'react'
import { InteractiveStepCard } from './InteractiveStepCard'
import {
  ProfileScannerSVG,
  AINutritionPlanSVG,
  FoodScannerSVG,
  WorkoutTrackerSVG,
  DarijaCoachSVG,
} from './AnimatedSVGIllustrations'
import { StepProfileVisualizer } from './StepProfileVisualizer'
import { StepPlanVisualizer } from './StepPlanVisualizer'
import { StepTrackingVisualizer } from './StepTrackingVisualizer'
import { StepScanVisualizer } from './StepScanVisualizer'
import { StepWorkoutVisualizer } from './StepWorkoutVisualizer'
import { StepChatVisualizer } from './StepChatVisualizer'
import { Sparkles } from 'lucide-react'

const stepsData = [
  {
    stepNumber: '01',
    title: 'Calibrate Your Biometrics & Set Precision Targets',
    subtitle: 'Step 01 — Biometric Metabolic Calibration',
    description:
      'Enter your gender, age, height, weight, daily activity level, and target fitness goal (Muscle Gain, Fat Loss, or Lean Maintenance). Our adaptive metabolic engine uses the validated Mifflin-St Jeor equation to calculate your exact Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), and gram-precise macronutrient targets.',
    tag: 'Metabolic Engine',
    tagColor: 'emerald' as const,
    keyHighlights: [
      'Clinically validated Mifflin-St Jeor BMR & TDEE calculation',
      'Gram-accurate macronutrient splits tailored to your body weight',
      'Dynamic deficit and surplus targeting based on training experience',
    ],
    svgComponent: <ProfileScannerSVG />,
    visualizerComponent: <StepProfileVisualizer />,
    isReversed: false,
  },
  {
    stepNumber: '02',
    title: 'AI Crafts Your Custom Daily Meal Plan & Groceries',
    subtitle: 'Step 02 — Intelligent Recipe Architecture',
    description:
      'No more guesswork or dry chicken and broccoli. NutriSaaS builds structured daily meal plans with instant 1-click recipe swapping, complete cooking instructions, and automated grocery lists. Includes specialized support for authentic Algerian and Mediterranean cuisine.',
    tag: 'AI Recipe Engine',
    tagColor: 'indigo' as const,
    keyHighlights: [
      'Authentic Algerian culinary adaptations with lean protein optimization',
      '1-click meal swap button to instantly re-roll any dish with valid macros',
      'Automated grocery shopping checklist with exact ingredient weights',
    ],
    svgComponent: <AINutritionPlanSVG />,
    visualizerComponent: <StepPlanVisualizer />,
    isReversed: true,
  },
  {
    stepNumber: '03',
    title: 'Track Daily Intake with Calorie Rings & Hydration',
    subtitle: 'Step 03 — Real-Time Energy Balance',
    description:
      'Stay accountable effortlessly. Watch your daily calorie and macro progress rings close in real-time as you log meals. Monitor daily hydration with glass tracking and receive intelligent reminders if you fall short on protein.',
    tag: 'Calorie Rings',
    tagColor: 'emerald' as const,
    keyHighlights: [
      'Fluid SVG circular progress ring with remaining calorie countdown',
      'Real-time protein, carbohydrate, and dietary fat balance gauges',
      'Integrated daily water hydration tracker with 250ml glass logger',
    ],
    svgComponent: <AINutritionPlanSVG />,
    visualizerComponent: <StepTrackingVisualizer />,
    isReversed: false,
  },
  {
    stepNumber: '04',
    title: 'Snap Any Plate with AI Vision Camera Scanner',
    subtitle: 'Step 04 — Computer Vision AI',
    description:
      'Eat out or cook at home without searching through massive confusing databases. Take a photo of your dish — our computer vision neural network recognizes individual food items, estimates portion weight, and computes complete nutritional facts within 2 seconds.',
    tag: 'Camera Vision AI',
    tagColor: 'coral' as const,
    keyHighlights: [
      '99.4% recognition accuracy across global and Maghrebi traditional dishes',
      'Interactive portion weight scaling slider (100g to 550g) with live recalculation',
      'Instant breakdown of calories, protein, carbs, fats, fiber, and sodium',
    ],
    svgComponent: <FoodScannerSVG />,
    visualizerComponent: <StepScanVisualizer />,
    isReversed: true,
  },
  {
    stepNumber: '05',
    title: 'Train Smarter with Adaptive Gym Overload Programs',
    subtitle: 'Step 05 — Progressive Gym Tracker',
    description:
      'Maximize muscular hypertrophy and functional strength. Access custom Push/Pull/Legs training routines with interactive set loggers, rep adjustments, rest timers, and algorithmic weight progression recommendations based on your RPE performance.',
    tag: 'Gym Tracker',
    tagColor: 'amber' as const,
    keyHighlights: [
      'Push, Pull, and Leg training splits with targeted muscle group demonstration',
      'Weight adjustment buttons (+2.5kg / -2.5kg) and set completion checkboxes',
      'Hypertrophy overload algorithm that auto-adjusts your working load weekly',
    ],
    svgComponent: <WorkoutTrackerSVG />,
    visualizerComponent: <StepWorkoutVisualizer />,
    isReversed: false,
  },
  {
    stepNumber: '06',
    title: 'Chat 24/7 with Your AI Coach in Native Algerian Darija',
    subtitle: 'Step 06 — Multilingual AI Coach',
    description:
      'Fitness advice that understands your cultural context. Have questions about Algerian restaurant foods, Ramadan fasting strategies, supplement timing, or injury recovery? Speak directly with Coach AI in Algerian Darija, French, or English anytime.',
    tag: 'Darija AI Coach',
    tagColor: 'indigo' as const,
    keyHighlights: [
      'Native Algerian Darija (🇩🇿), French (🇫🇷), and English (🇬🇧) natural language NLP',
      'Culturally attuned nutritional advice understanding local Algerian ingredients',
      'Instant answers with text copy and realistic 24/7 conversational memory',
    ],
    svgComponent: <DarijaCoachSVG />,
    visualizerComponent: <StepChatVisualizer />,
    isReversed: true,
  },
]

export function HowItWorksRoadmap() {
  return (
    <section className="relative py-24 bg-dark-950 overflow-hidden">
      {/* Central Visual Connecting Line for Desktop */}
      <div className="absolute top-20 bottom-20 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary-500/0 via-primary-500/30 to-primary-500/0 hidden lg:block pointer-events-none" />

      <div className="container-custom relative space-y-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-400/25 text-xs font-bold text-primary-300 tracking-wider uppercase shadow-[0_0_15px_rgba(52,211,153,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-primary-400" />
            <span>The 6 Foundation Pillars</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            Detailed Step-by-Step Architecture
          </h2>

          <p className="text-dark-300 text-base sm:text-lg leading-relaxed">
            Explore every stage of your health journey. Toggle between the live interactive playground and the graphic architecture diagram on each card.
          </p>
        </div>

        {/* Step Cards List */}
        <div className="space-y-16 lg:space-y-20">
          {stepsData.map((step) => (
            <div key={step.stepNumber} className="relative">
              {/* Central Glowing Node on Timeline for Desktop */}
              <div className="hidden lg:flex absolute top-12 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-dark-900 border-2 border-primary-400 items-center justify-center z-10 shadow-[0_0_20px_rgba(16,185,129,0.35)]">
                <div className="w-3 h-3 rounded-full bg-primary-400 animate-pulse" />
              </div>

              <InteractiveStepCard {...step} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
