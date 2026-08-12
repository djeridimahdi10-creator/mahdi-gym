'use client'

import { motion } from 'framer-motion'
import { Home, Salad, Bot, Dumbbell, Globe2, BarChart3, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type HubTabId = 'overview' | 'nutrition' | 'coach' | 'training' | 'food' | 'progress' | 'tools'

export const HUB_TABS: { id: HubTabId; emoji: string; label: string; icon: LucideIcon }[] = [
  { id: 'overview', emoji: '🏠', label: 'Overview', icon: Home },
  { id: 'nutrition', emoji: '🥗', label: 'My Nutrition', icon: Salad },
  { id: 'coach', emoji: '🤖', label: 'AI Coach', icon: Bot },
  { id: 'training', emoji: '🏋️', label: 'Training', icon: Dumbbell },
  { id: 'food', emoji: '🍴', label: 'Smart Food', icon: Globe2 },
  { id: 'progress', emoji: '📊', label: 'Progress', icon: BarChart3 },
  { id: 'tools', emoji: '🛠️', label: 'Tools', icon: Wrench },
]

interface NutritionHubNavProps {
  active: HubTabId
  onChange: (tab: HubTabId) => void
  badges?: Partial<Record<HubTabId, string>>
}

/**
 * Category navigation for the Nutrition Hub. Every major feature family
 * gets its own tab so only one category of information is on screen at a time.
 */
export function NutritionHubNav({ active, onChange, badges }: NutritionHubNavProps) {
  return (
    <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 -mb-1 scrollbar-thin">
      {HUB_TABS.map((tab) => {
        const Icon = tab.icon
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
              isActive ? 'text-white' : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.06]'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="hub-tab-pill"
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,240,255,0.16), rgba(168,85,247,0.14))',
                  border: '1px solid rgba(0,240,255,0.35)',
                  boxShadow: '0 0 24px rgba(0,240,255,0.08)',
                }}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="text-lg leading-none relative z-10">{tab.emoji}</span>
            <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-[#00F0FF]' : 'text-slate-500'}`} />
            <span className="relative z-10">{tab.label}</span>
            {badges?.[tab.id] && (
              <span
                className={`relative z-10 text-[11px] font-bold px-2 py-0.5 rounded-md ${
                  isActive ? 'bg-[#00F0FF]/20 text-[#00F0FF]' : 'bg-white/5 text-slate-500'
                }`}
              >
                {badges[tab.id]}
              </span>
            )}
          </button>
        )
      })}
    </nav>
  )
}