'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlgerianFoodHub, FeatureCard } from '@/components/nutrition'
import { useNutritionStore } from '@/stores/nutritionStore'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
}

export function SmartFoodPanel() {
  const setModalOpen = useNutritionStore((s) => s.setModalOpen)
  const [showAlgerian, setShowAlgerian] = useState(false)

  const features = [
    {
      emoji: '📸',
      title: 'Scan Food',
      description: 'Take a picture of your meal and let the AI analyze the portion and macros instantly.',
      actionLabel: 'Open Scanner',
      accent: '#f43f5e',
      onClick: () => setModalOpen('scanner', true),
    },
    {
      emoji: '🎤',
      title: 'Voice Log',
      description: 'Tell the AI what you ate with your voice — no typing, no guessing portions.',
      actionLabel: 'Start Voice Log',
      accent: '#a855f7',
      onClick: () => setModalOpen('voice', true),
    },
    {
      emoji: '🔄',
      title: 'Smart Food Swap',
      description: 'Find a healthier or more suitable alternative for any item in your meals.',
      actionLabel: 'Find Swaps',
      accent: '#10b981',
      onClick: () => setModalOpen('swap', true, 0),
    },
    {
      emoji: '🇩🇿',
      title: 'Algerian Food AI',
      description: 'Understand local Algerian dishes — authentic recipes mapped to exact nutritional macros.',
      actionLabel: showAlgerian ? 'Hide Library' : 'Open Library',
      accent: '#34d399',
      onClick: () => setShowAlgerian(!showAlgerian),
    },
    {
      emoji: '🍽️',
      title: 'Restaurant Mode',
      description: '"I\'m eating outside" — search menu items and get AI fit scores for your remaining macros.',
      actionLabel: 'Browse Menus',
      accent: '#fbbf24',
      onClick: () => setModalOpen('restaurant', true),
    },
  ]

  return (
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      <motion.div variants={sectionVariants}>
        <div>
          <div className="mb-7">
            <h2 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              🍴 Smart Food
            </h2>
            <p className="text-slate-400 text-sm mt-1.5 max-w-xl leading-relaxed">
              Intelligent ways to log and understand food — from scanning to Algerian cuisine intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>

          {showAlgerian && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6"
            >
              <AlgerianFoodHub />
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}