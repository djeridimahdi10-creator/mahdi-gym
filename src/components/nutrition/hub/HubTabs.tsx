'use client'

import { motion } from 'framer-motion'
import { Home, UtensilsCrossed, Bot, Dumbbell, Globe2, BarChart3, Wrench, type LucideIcon } from 'lucide-react'

export type HubTabId = 'overview' | 'nutrition' | 'coach' | 'training' | 'food' | 'progress' | 'tools'

export const HUB_TABS: { id: HubTabId; label: string; icon: LucideIcon; accent: string }[] = [
  { id: 'overview',  label: 'Overview',      icon: Home,             accent: '#00F0FF' },
  { id: 'nutrition', label: 'My Nutrition',  icon: UtensilsCrossed,  accent: '#10b981' },
  { id: 'coach',     label: 'AI Coach',      icon: Bot,              accent: '#a855f7' },
  { id: 'training',  label: 'Training',      icon: Dumbbell,         accent: '#7c5cfc' },
  { id: 'food',      label: 'Smart Food',    icon: Globe2,           accent: '#fbbf24' },
  { id: 'progress',  label: 'Progress',      icon: BarChart3,        accent: '#3b82f6' },
  { id: 'tools',     label: 'Tools',         icon: Wrench,           accent: '#f472b6' },
]

interface HubTabsProps {
  active: HubTabId
  onChange: (tab: HubTabId) => void
}

export function HubTabs({ active, onChange }: HubTabsProps) {
  return (
    <div
      className="sticky top-0 z-30 -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-10 px-4 sm:px-6 lg:px-8 xl:px-10 py-3 backdrop-blur-xl"
      style={{ background: 'rgba(6,11,24,0.78)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="mx-auto max-w-6xl flex items-center gap-1.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {HUB_TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="relative flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-colors flex-shrink-0"
              style={{ color: isActive ? '#ffffff' : '#94a3b8' }}
            >
              {isActive && (
                <motion.div
                  layoutId="hubActiveTab"
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${tab.accent}1a 0%, rgba(255,255,255,0.04) 100%)`,
                    border: `1px solid ${tab.accent}40`,
                    boxShadow: `0 4px 20px ${tab.accent}10`,
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <Icon className="w-[18px] h-[18px] relative z-10" style={{ color: isActive ? tab.accent : '#64748b' }} />
              <span className="relative z-10">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}