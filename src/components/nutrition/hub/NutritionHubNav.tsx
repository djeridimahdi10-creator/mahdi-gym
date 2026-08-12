'use client'

import { motion } from 'framer-motion'
import { Home, Salad, Sparkles, Dumbbell, Globe, BarChart3, Wrench, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const TABS: { id: string; label: string; hint: string; icon: LucideIcon }[] = [
  { id: 'overview', label: 'Overview', hint: 'How am I today?', icon: Home },
  { id: 'nutrition', label: 'My Nutrition', hint: 'Meals & macros', icon: Salad },
  { id: 'aicoach', label: 'AI Coach', hint: 'Ask & analyze', icon: Sparkles },
  { id: 'training', label: 'Training', hint: 'Fuel & recovery', icon: Dumbbell },
  { id: 'smartfood', label: 'Smart Food', hint: 'Scanner & DZ dishes', icon: Globe },
  { id: 'progress', label: 'Progress', hint: 'Trends & scores', icon: BarChart3 },
  { id: 'tools', label: 'Tools', hint: 'Simulator & lists', icon: Wrench },
]

export function NutritionHubNav({
  active,
  onChange,
}: {
  active: string
  onChange: (tab: string) => void
}) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-2.5"
      aria-label="Nutrition Hub categories"
    >
      {TABS.map((tab) => {
        const isActive = active === tab.id
        const Icon = tab.icon
        return (
          <motion.button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              'relative flex items-center gap-2.5 px-3.5 py-3 rounded-2xl text-left transition-colors overflow-hidden',
              isActive ? 'text-white' : 'text-slate-400 hover:text-slate-100 bg-white/[0.02] border border-white/10 hover:bg-white/[0.05]'
            )}
            style={isActive ? { background: 'linear-gradient(135deg, rgba(0,240,255,0.13), rgba(168,85,247,0.10))' } : undefined}
            aria-current={isActive ? 'page' : undefined}
          >
            {isActive && (
              <motion.div
                layoutId="hub-active-pill"
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ border: '1px solid rgba(0,240,255,0.35)', boxShadow: '0 0 28px rgba(0,240,255,0.10)' }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}

            <div
              className="relative z-10 w-10 h-10 shrink-0 rounded-xl flex items-center justify-center"
              style={{
                background: isActive ? 'rgba(0,240,255,0.16)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${isActive ? 'rgba(0,240,255,0.35)' : 'rgba(255,255,255,0.09)'}`,
              }}
            >
              <Icon className="w-5 h-5" style={{ color: isActive ? '#00F0FF' : '#94a3b8' }} />
            </div>

            <div className="relative z-10 min-w-0">
              <p className="text-[15px] font-bold leading-tight truncate">{tab.label}</p>
              <p className="text-[10.5px] text-slate-500 leading-tight truncate hidden sm:block">{tab.hint}</p>
            </div>
          </motion.button>
        )
      })}
    </motion.nav>
  )
}