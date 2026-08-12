'use client'

import { motion } from 'framer-motion'
import { Home, Salad, Bot, Dumbbell, Utensils, BarChart3, Wrench, LucideIcon } from 'lucide-react'

export type NutritionCategory = 'overview' | 'nutrition' | 'ai' | 'training' | 'food' | 'progress' | 'tools'

interface CategoryTabsProps {
  active: NutritionCategory
  onChange: (tab: NutritionCategory) => void
  mealsBadge?: string
}

interface TabDef {
  id: NutritionCategory
  label: string
  icon: LucideIcon
  accent: string
  badge?: string
}

export function CategoryTabs({ active, onChange, mealsBadge }: CategoryTabsProps) {
  const tabs: TabDef[] = [
    { id: 'overview', label: 'Overview', icon: Home, accent: '#00F0FF', badge: mealsBadge },
    { id: 'nutrition', label: 'My Nutrition', icon: Salad, accent: '#10b981' },
    { id: 'ai', label: 'AI Coach', icon: Bot, accent: '#a855f7' },
    { id: 'training', label: 'Training', icon: Dumbbell, accent: '#f97316' },
    { id: 'food', label: 'Smart Food', icon: Utensils, accent: '#fbbf24' },
    { id: 'progress', label: 'Progress', icon: BarChart3, accent: '#ec4899' },
    { id: 'tools', label: 'Tools', icon: Wrench, accent: '#3b82f6' },
  ]

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="relative flex flex-shrink-0 items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-bold transition-colors whitespace-nowrap"
            style={{
              color: isActive ? '#ffffff' : '#94a3b8',
              background: isActive ? `${tab.accent}14` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${isActive ? `${tab.accent}45` : 'rgba(255,255,255,0.07)'}`,
            }}
            aria-pressed={isActive}
          >
            <motion.span
              animate={isActive ? { scale: [1, 1.15, 1] } : { scale: 1 }}
              transition={{ duration: 0.35 }}
              className="flex items-center justify-center"
            >
              <Icon className="w-5 h-5" style={{ color: isActive ? tab.accent : '#64748b' }} />
            </motion.span>
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className="text-[11px] font-extrabold px-2 py-0.5 rounded-lg tabular-nums"
                style={{
                  color: isActive ? tab.accent : '#64748b',
                  background: isActive ? `${tab.accent}1f` : 'rgba(255,255,255,0.05)',
                }}
              >
                {tab.badge}
              </span>
            )}
            {isActive && (
              <motion.span
                layoutId="category-glow"
                className="absolute inset-x-4 -bottom-px h-0.5 rounded-full"
                style={{ background: tab.accent, boxShadow: `0 0 12px ${tab.accent}90` }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}