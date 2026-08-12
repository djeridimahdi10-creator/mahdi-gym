'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, SlidersHorizontal, RefreshCcw, CalendarDays, Search, Mic, Camera } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { SectionBlock, FeatureLaunchCard, STAGGER_CONTAINER } from './HubShared'
import type { HubNavigate } from './HubShared'

export function HubTools({ onNavigate }: { onNavigate: HubNavigate }) {
  const { setModalOpen } = useNutritionStore()

  return (
    <motion.section variants={STAGGER_CONTAINER} initial="hidden" animate="show" className="space-y-10">
      <SectionBlock
        badge="🛠️"
        title="Nutrition Tools"
        subtitle="Power-user utilities kept out of your daily view — everything is one click away."
      />

      <motion.div variants={STAGGER_CONTAINER} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <FeatureLaunchCard
          icon={ShoppingCart}
          title="Grocery List"
          description="AI-generated shopping list grouped by protein, carbs, veggies and Algerian staples."
          actionLabel="Generate List"
          accent="#10b981"
          onAction={() => setModalOpen('grocery', true)}
        />
        <FeatureLaunchCard
          icon={SlidersHorizontal}
          title="Nutrition Simulator"
          description="Simulate calorie surplus/deficit and project 12-week body composition changes."
          actionLabel="Open Simulator"
          accent="#A855F7"
          onAction={() => setModalOpen('whatif', true)}
        />
        <FeatureLaunchCard
          icon={RefreshCcw}
          title="Meal Replacement"
          description="Swap any planned meal for a new one while keeping your daily totals intact."
          actionLabel="Replace a Meal"
          accent="#00F0FF"
          onAction={() => setModalOpen('replace', true, 2)}
        />
        <FeatureLaunchCard
          icon={CalendarDays}
          title="Meal Planner"
          description="Let the AI plan the rest of your week around goal, budget and training."
          actionLabel="Plan My Week"
          accent="#3b82f6"
          onAction={() => setModalOpen('askdata', true)}
        />
        <FeatureLaunchCard
          icon={Search}
          title="Food Search"
          description="Search the full macro database — including 40+ authentic Algerian dishes."
          actionLabel="Search Foods"
          accent="#fbbf24"
          onAction={() => onNavigate('smartfood')}
        />
        <FeatureLaunchCard
          icon={Mic}
          title="Voice Logging"
          description="Hands-free meal logging — say what you ate and the AI structures it."
          actionLabel="Start Voice Log"
          accent="#f43f5e"
          onAction={() => setModalOpen('voice', true)}
        />
        <FeatureLaunchCard
          icon={Camera}
          title="Food Scanner"
          description="Photograph any meal and get instant macro analysis with portion estimates."
          actionLabel="Open Scanner"
          accent="#10b981"
          onAction={() => setModalOpen('scanner', true)}
        />
      </motion.div>

      <p className="text-center text-sm text-slate-500 pt-2">
        Advanced features live here so your daily Overview stays focused on what matters most.
      </p>
    </motion.section>
  )
}