'use client'

import { motion } from 'framer-motion'
import { Camera, Mic, RefreshCcw, UtensilsCrossed, Globe2, Search } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { SectionBlock, FeatureLaunchCard, STAGGER_CONTAINER } from './HubShared'
import { AlgerianFoodHub } from '@/components/nutrition'
import type { HubNavigate } from './HubShared'

export function HubSmartFood({ onNavigate }: { onNavigate: HubNavigate }) {
  const { setModalOpen } = useNutritionStore()

  return (
    <motion.section variants={STAGGER_CONTAINER} initial="hidden" animate="show" className="space-y-10">
      <SectionBlock
        badge="🍴"
        title="Smart Food"
        subtitle="Capture and understand food faster — from photos and voice to Algerian dishes and restaurants."
      />

      <motion.div variants={STAGGER_CONTAINER} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <FeatureLaunchCard
          icon={Camera}
          title="Scan Food"
          description="Take a picture of your meal — the AI identifies it and logs the macros."
          actionLabel="Open Scanner"
          accent="#f43f5e"
          onAction={() => setModalOpen('scanner', true)}
        />
        <FeatureLaunchCard
          icon={Mic}
          title="Voice Log"
          description="Tell the AI what you ate — it converts speech into a structured meal log."
          actionLabel="Start Voice Log"
          accent="#A855F7"
          onAction={() => setModalOpen('voice', true)}
        />
        <FeatureLaunchCard
          icon={RefreshCcw}
          title="Smart Food Swap"
          description="Find a healthier or more suitable alternative for any meal or ingredient."
          actionLabel="Swap a Meal"
          accent="#10b981"
          onAction={() => setModalOpen('swap', true, 2)}
        />
        <FeatureLaunchCard
          icon={UtensilsCrossed}
          title="Restaurant Mode"
          description="(&quot;I&apos;m eating outside&quot;) — pick the best menu choice for your remaining macros."
          actionLabel="Find My Choice"
          accent="#fbbf24"
          onAction={() => setModalOpen('restaurant', true)}
        />
        <FeatureLaunchCard
          icon={Globe2}
          title="Algerian Food AI"
          description="Understand local Algerian dishes with an authentic, macro-mapped database."
          actionLabel="Browse Dishes"
          accent="#10b981"
          onAction={() => onNavigate('smartfood', 'algerian-hub')}
        />
        <FeatureLaunchCard
          icon={Search}
          title="Food Search"
          description="Find any dish by name or ingredient across the full macro database."
          actionLabel="Search Foods"
          accent="#00F0FF"
          onAction={() => onNavigate('smartfood', 'algerian-hub')}
        />
      </motion.div>

      {/* Algerian food intelligence */}
      <section id="algerian-hub" className="scroll-mt-6 space-y-5">
        <SectionBlock
          badge="🇩🇿"
          title="Algerian Food Intelligence"
          subtitle="Traditional dishes mapped to exact nutritional macros — filter, search and log."
        />
        <AlgerianFoodHub />
      </section>
    </motion.section>
  )
}