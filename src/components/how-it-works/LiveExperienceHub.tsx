'use client'

import React, { useState } from 'react'
import {
  User,
  Cpu,
  Flame,
  Camera,
  Dumbbell,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StepProfileVisualizer } from './StepProfileVisualizer'
import { StepPlanVisualizer } from './StepPlanVisualizer'
import { StepTrackingVisualizer } from './StepTrackingVisualizer'
import { StepScanVisualizer } from './StepScanVisualizer'
import { StepWorkoutVisualizer } from './StepWorkoutVisualizer'
import { StepChatVisualizer } from './StepChatVisualizer'

const hubSteps = [
  {
    id: 'profile',
    stepNum: '01',
    title: 'Biometrics & Calorie Profiler',
    shortTitle: 'Biometrics',
    icon: User,
    badge: 'Mifflin-St Jeor',
    tagColor: 'from-emerald-500 to-teal-500',
    badgeVariant: 'primary' as const,
    description:
      'Enter your height, weight, activity, and goals. The metabolic engine calculates your exact BMR, TDEE, and optimal macro split.',
    component: <StepProfileVisualizer />,
  },
  {
    id: 'plan',
    stepNum: '02',
    title: 'AI Meal Generation & Recipe Swaps',
    shortTitle: 'AI Meal Plan',
    icon: Cpu,
    badge: 'Recipe AI',
    tagColor: 'from-ai-500 to-purple-500',
    badgeVariant: 'ai' as const,
    description:
      'Automated daily meal plan calibrated to your target calories with 1-click meal alternatives and grocery list generation.',
    component: <StepPlanVisualizer />,
  },
  {
    id: 'track',
    stepNum: '03',
    title: 'Daily Calorie Rings & Macro Tracking',
    shortTitle: 'Calorie Ring',
    icon: Flame,
    badge: 'Live Ring',
    tagColor: 'from-coral-500 to-rose-500',
    badgeVariant: 'coral' as const,
    description:
      'Track breakfast, lunch, and dinner in real-time with dynamic energy countdown, macro balance, and hydration logger.',
    component: <StepTrackingVisualizer />,
  },
  {
    id: 'scan',
    stepNum: '04',
    title: 'Vision AI Camera Food Scanner',
    shortTitle: 'Scan Food',
    icon: Camera,
    badge: '99.4% Accuracy',
    tagColor: 'from-coral-500 to-amber-500',
    badgeVariant: 'energy' as const,
    description:
      'Point camera at any dish. Computer vision detects ingredients, scales portions from 100g to 500g, and calculates instant nutrition.',
    component: <StepScanVisualizer />,
  },
  {
    id: 'workout',
    stepNum: '05',
    title: 'Smart Gym Split & Progressive Overload',
    shortTitle: 'Gym Tracker',
    icon: Dumbbell,
    badge: 'Hypertrophy AI',
    tagColor: 'from-energy-500 to-amber-500',
    badgeVariant: 'energy' as const,
    description:
      'Push/Pull/Legs splits with weight increment adjusters, set checkboxes, volume tracking, and rest timers.',
    component: <StepWorkoutVisualizer />,
  },
  {
    id: 'coach',
    stepNum: '06',
    title: 'Multilingual AI Coach (Algerian Darija)',
    shortTitle: 'AI Coach',
    icon: MessageSquare,
    badge: '24/7 Darija & EN',
    tagColor: 'from-ai-500 to-teal-500',
    badgeVariant: 'ai' as const,
    description:
      'Ask any nutritional or fitness question in Algerian Darija, French or English for instant, culture-aware guidance.',
    component: <StepChatVisualizer />,
  },
]

export function LiveExperienceHub() {
  const [activeStepIdx, setActiveStepIdx] = useState(0)

  const currentStep = hubSteps[activeStepIdx]

  const handleNext = () => {
    setActiveStepIdx((prev) => (prev + 1) % hubSteps.length)
  }

  const handlePrev = () => {
    setActiveStepIdx((prev) => (prev === 0 ? hubSteps.length - 1 : prev - 1))
  }

  return (
    <section id="experience-hub" className="py-20 bg-dark-950 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-emerald-500/10 via-ai-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="container-custom">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <Badge variant="primary" size="md" glow className="gap-2">
            <Sparkles className="w-3.5 h-3.5 text-primary-400" />
            <span>Interactive Platform Sandbox</span>
          </Badge>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            Test Drive NutriSaaS Live <br />
            <span className="text-gradient-hero">Without Leaving This Page</span>
          </h2>

          <p className="text-dark-300 text-base sm:text-lg leading-relaxed">
            Click through the 6 modules below. Adjust sliders, test food scanning, re-roll meal plans, and chat with Coach AI in Algerian Darija.
          </p>
        </div>

        {/* The Sandbox Cockpit Terminal using shadcn Card */}
        <Card variant="premium" className="p-0 overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.8)]">
          {/* Terminal Window Top Bar */}
          <div className="bg-dark-950/90 px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            {/* Left side: Window dots & title */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-400/30" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400/30" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/30" />
              </div>
              <span className="text-xs font-mono text-dark-400 hidden sm:inline">
                nutrisaas-engine // live-sandbox v2.4
              </span>
            </div>

            {/* Middle: Step Progress Pill */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">
                Step {currentStep.stepNum} of 06:
              </span>
              <span className="text-xs text-primary-300 font-semibold">
                {currentStep.shortTitle}
              </span>
            </div>

            {/* Right side: Prev / Next buttons using shadcn Button */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={handlePrev}
                className="text-xs border border-white/10"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev</span>
              </Button>
              <Button
                variant="primary"
                size="xs"
                onClick={handleNext}
                className="text-xs"
              >
                <span className="hidden sm:inline">Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Module Selector Navigation Tabs */}
          <div className="bg-dark-950/60 p-2.5 border-b border-white/5 overflow-x-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 min-w-[620px] lg:min-w-0">
              {hubSteps.map((step, idx) => {
                const IconComponent = step.icon
                const isActive = activeStepIdx === idx
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStepIdx(idx)}
                    className={`p-3 rounded-2xl border text-left transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-white/[0.08] to-white/[0.04] border-primary-400/50 text-white shadow-lg'
                        : 'bg-dark-900/40 border-white/5 text-dark-400 hover:border-white/15 hover:text-white'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all flex-shrink-0 ${
                        isActive
                          ? `bg-gradient-to-br ${step.tagColor} text-dark-950 shadow-md`
                          : 'bg-dark-800 text-dark-400'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] font-mono text-dark-500 uppercase">{step.stepNum}</div>
                      <div className="text-xs font-bold text-white truncate">{step.shortTitle}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Sandbox Main Viewport Area */}
          <CardContent className="p-6 sm:p-8 lg:p-10 pt-6 sm:pt-8 lg:pt-10">
            {/* Step Storyline Banner */}
            <div className="mb-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={currentStep.badgeVariant} size="sm">
                    {currentStep.badge}
                  </Badge>
                  <span className="text-xs text-dark-400 font-mono">Step {currentStep.stepNum}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                  {currentStep.title}
                </h3>
                <p className="text-xs sm:text-sm text-dark-300 mt-1 max-w-2xl leading-relaxed">
                  {currentStep.description}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleNext}
                  className="text-xs font-bold gap-2"
                >
                  <span>Continue Flow</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Active Visualizer Component Rendering */}
            <Card variant="static" className="bg-dark-950/70 p-5 sm:p-7 shadow-2xl">
              {currentStep.component}
            </Card>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
