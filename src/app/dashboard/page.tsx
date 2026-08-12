'use client'

import { useState } from 'react'
import {
  DashboardHeader,
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

  return (
    <div className="space-y-6 sm:space-y-7 w-full pb-10">
      {/* Beginner Nutrition Guide Modal */}
      <NutritionGuideModal isOpen={guideOpen} onClose={() => setGuideOpen(false)} />

      {/* Top Header Section */}
      <DashboardHeader onOpenGuide={() => setGuideOpen(true)} />

      {/* ──────────────── ROW 1: Main Health Metrics & 7 Day Streak ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        <div className="lg:col-span-8">
          <HealthMetrics />
        </div>
        <div className="lg:col-span-4">
          <StreakCard />
        </div>
      </div>

      {/* ──────────────── ROW 2: Today's Plan & AI Coach 24/7 ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        <div className="lg:col-span-8">
          <TodaysPlan />
        </div>
        <div className="lg:col-span-4">
          <AICoachPanel />
        </div>
      </div>

      {/* ──────────────── ROW 3: Weekly Progress, Nutrient Breakdown & Recommended Action ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        <div className="lg:col-span-4">
          <WeeklyProgressChart />
        </div>
        <div className="lg:col-span-4">
          <NutrientBreakdown />
        </div>
        <div className="lg:col-span-4">
          <RecommendedActionCard />
        </div>
      </div>

      {/* ──────────────── ROW 4: Today's Logged Meals & Hydration ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        <div className="lg:col-span-8">
          <LoggedMealsRow />
        </div>
        <div className="lg:col-span-4">
          <HydrationCard />
        </div>
      </div>
    </div>
  )
}
