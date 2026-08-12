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

const stepsData = [
  {
    stepNumber: '01',
    title: 'Create Your Profile & Set Biometrics',
    subtitle: 'Step 1 — Onboarding & Calorie Estimation',
    description:
      'Enter your gender, age, height, weight, activity level, and target fitness goal (Muscle Gain, Fat Loss, or Maintenance). Our algorithm instantly calculates your BMR, TDEE, and optimal daily macro split.',
    tag: 'Profile Setup',
    tagColor: 'emerald' as const,
    svgComponent: <ProfileScannerSVG />,
    visualizerComponent: <StepProfileVisualizer />,
    isReversed: false,
  },
  {
    stepNumber: '02',
    title: 'AI Crafts Your Personalized Meal Plan',
    subtitle: 'Step 2 — AI Nutrition Engine',
    description:
      'Our intelligent AI nutrition engine generates a custom daily meal plan aligned with your target calories and macronutrients. Every meal is balanced for taste, convenience, and dietary preferences.',
    tag: 'AI Meal Generation',
    tagColor: 'indigo' as const,
    svgComponent: <AINutritionPlanSVG />,
    visualizerComponent: <StepPlanVisualizer />,
    isReversed: true,
  },
  {
    stepNumber: '03',
    title: 'Track Meals & Monitor Daily Calorie Balance',
    subtitle: 'Step 3 — Seamless Daily Tracking',
    description:
      'Log your meals effortlessly with real-time calorie and macro progress rings. Stay on top of your protein, carbohydrate, and fat targets throughout the day.',
    tag: 'Calorie Ring',
    tagColor: 'emerald' as const,
    svgComponent: <AINutritionPlanSVG />,
    visualizerComponent: <StepTrackingVisualizer />,
    isReversed: false,
  },
  {
    stepNumber: '04',
    title: 'Scan Any Dish with AI Camera Recognition',
    subtitle: 'Step 4 — AI Vision Scanner',
    description:
      'Snap a photo of your dish using your phone or desktop camera. Our computer vision AI identifies food items, estimates portion size, and calculates exact nutritional breakdown in seconds.',
    tag: 'Camera Vision',
    tagColor: 'coral' as const,
    svgComponent: <FoodScannerSVG />,
    visualizerComponent: <StepScanVisualizer />,
    isReversed: true,
  },
  {
    stepNumber: '05',
    title: 'Train Smarter with Targeted Gym Programs',
    subtitle: 'Step 5 — Workout & Exercise Library',
    description:
      'Access customized gym workout programs complete with HD exercise demonstrations, progressive overload logging, and target muscle group heatmaps.',
    tag: 'Gym Tracker',
    tagColor: 'amber' as const,
    svgComponent: <WorkoutTrackerSVG />,
    visualizerComponent: <StepWorkoutVisualizer />,
    isReversed: false,
  },
  {
    stepNumber: '06',
    title: 'Chat 24/7 with Coach AI in Algerian Darija',
    subtitle: 'Step 6 — Multilingual AI Coach',
    description:
      'Have questions about food swaps, workout recovery, or supplements? Speak directly with your dedicated AI Coach in Algerian Darija, Arabic, or English for immediate advice.',
    tag: 'Darija AI Coach',
    tagColor: 'indigo' as const,
    svgComponent: <DarijaCoachSVG />,
    visualizerComponent: <StepChatVisualizer />,
    isReversed: true,
  },
]

export function HowItWorksRoadmap() {
  return (
    <section className="relative py-24 bg-dark-950 overflow-hidden">
      {/* Central Visual Connecting Timeline Line */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary-500/0 via-primary-500/30 to-primary-500/0 hidden lg:block pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            The Complete Product Journey
          </h2>
          <p className="text-dark-400 text-lg">
            Explore every step of NutriSaaS. Try the interactive visualizers below to experience the platform live.
          </p>
        </div>

        {/* Step Cards List */}
        <div className="space-y-16">
          {stepsData.map((step) => (
            <div key={step.stepNumber} className="relative">
              {/* Connector Node Dot on center timeline for desktop */}
              <div className="hidden lg:flex absolute top-12 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-dark-900 border-2 border-primary-400 items-center justify-center z-10 shadow-lg shadow-primary-500/20">
                <div className="w-2.5 h-2.5 rounded-full bg-primary-400 animate-ping" />
              </div>

              <InteractiveStepCard {...step} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
