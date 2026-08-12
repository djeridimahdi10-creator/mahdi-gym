'use client'

import { motion } from 'framer-motion'
import { Home, Salad, Bot, Dumbbell, UtensilsCrossed, TrendingUp, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type HubTabId = 'overview' | 'nutrition' | 'coach' | 'training' | 'smartfood' | 'progress' | 'tools'

interface HubTabDef {
  id: HubTabId
  label: string
  icon: LucideIcon
}

export const HUB_TABS: HubTabDef[] = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'nutrition', label: 'My Nutrition', icon: Salad },
  { id: 'coach', label: 'AI Coach', icon: Bot },
  { id: 'training', label: 'Training & Recovery', icon: Dumbbell },
  { id: 'smartfood', label: 'Smart Food', icon: UtensilsCrossed },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
  { id: 'tools', label: 'Tools', icon: Wrench },
]

interface NutritionHubTabsProps {
  active: HubTabId
  onChange: (tab: HubTabId) => void
}

export function NutritionHubTabs({ active, onChange }: NutritionHubTabsProps) {
  return (
    <motion.nav
      className="sticky top-3 z-30 rounded-3xl px-3 py-2.5"
      style={{
        background: 'rgba(6,11,24,0.82)',
        border: '1px solid rgba(0,240,255,0.14)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
    >
      <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {HUB_TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="relative flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-colors"
              style={{ color: isActive ? '#ffffff' : '#94a3b8' }}
            >
              {isActive && (
                <motion.span
                  layoutId="hub-tab-pill"
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,240,255,0.16), rgba(168,85,247,0.14))',
                    border: '1px solid rgba(0,240,255,0.3)',
                    boxShadow: '0 0 24px rgba(0,240,255,0.08)',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <Icon
                className={`relative z-10 w-[18px] h-[18px] ${isActive ? 'text-[#00F0FF]' : ''}`}
                strokeWidth={isActive ? 2.4 : 2}
              />
              <span className="relative z-10">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </motion.nav>
  )
}