'use client'

import { useState } from 'react'
import {
  DashboardHeader,
  QuickControlBar,
  InteractiveQuickLogger,
  HealthMetrics,
  StreakCard,
  TodaysPlan,
  AICoachPanel,
  WeeklyProgressChart,
  NutrientBreakdown,
  RecommendedActionCard,
  LoggedMealsRow,
  HydrationCard,
  NutritionGuideModal,
} from '@/components/dashboard'

export default function DashboardPage() {
  const [guideOpen, setGuideOpen] = useState(false)
  const [quickLogOpen, setQuickLogOpen] = useState(false)

  return (
    <div className="space-y-6 lg:space-y-8 w-full pb-12 animate-fade-in">
      {/* Modals */}
      <NutritionGuideModal isOpen={guideOpen} onClose={() => setGuideOpen(false)} />
      <InteractiveQuickLogger isOpen={quickLogOpen} onClose={() => setQuickLogOpen(false)} />

      {/* Header Section */}
      <DashboardHeader onOpenGuide={() => setGuideOpen(true)} />

      {/* Quick Controls */}
      <QuickControlBar onOpenQuickLog={() => setQuickLogOpen(true)} />

      {/* Section: Today's Overview */}
      <section className="space-y-3.5 sm:space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Today&apos;s Overview</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          <div className="lg:col-span-8 h-full">
            <HealthMetrics />
          </div>
          <div className="lg:col-span-4 h-full">
            <StreakCard />
          </div>
        </div>
      </section>

      {/* Section: Nutrition */}
      <section className="space-y-3.5 sm:space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Nutrition</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          <div className="lg:col-span-8 h-full">
            <TodaysPlan onOpenQuickLog={() => setQuickLogOpen(true)} />
          </div>
          <div className="lg:col-span-4 h-full">
            <HydrationCard />
          </div>
        </div>
      </section>

      {/* Section: Insights */}
      <section className="space-y-3.5 sm:space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Insights</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          <div className="h-full">
            <WeeklyProgressChart />
          </div>
          <div className="h-full">
            <NutrientBreakdown />
          </div>
          <div className="md:col-span-2 lg:col-span-1 h-full">
            <AICoachPanel />
          </div>
        </div>
      </section>

      {/* Section: Food Log */}
      <section className="space-y-3.5 sm:space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Food Log</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          <div className="lg:col-span-8 h-full">
            <LoggedMealsRow onOpenQuickLog={() => setQuickLogOpen(true)} />
          </div>
          <div className="lg:col-span-4 h-full">
            <RecommendedActionCard onOpenQuickLog={() => setQuickLogOpen(true)} />
          </div>
        </div>
      </section>
    </div>
  )
}
