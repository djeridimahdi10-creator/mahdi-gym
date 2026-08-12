'use client'

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

export interface HubCategory {
  id: string
  label: string
  icon: LucideIcon
  accent: string
}

interface HubCategoryNavProps {
  categories: HubCategory[]
  active: string
  onChange: (id: string) => void
}

export function HubCategoryNav({ categories, active, onChange }: HubCategoryNavProps) {
  return (
    <nav className="w-full overflow-x-auto pb-1 -mb-1">
      <div className="flex items-center gap-2 min-w-max">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = active === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={`relative flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
                isActive ? 'text-white' : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="hub-category-pill"
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${cat.accent}17, rgba(255,255,255,0.03) 60%)`,
                    border: `1px solid ${cat.accent}45`,
                    boxShadow: `0 0 28px ${cat.accent}0f`,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <Icon
                className="relative z-10 w-5 h-5"
                style={isActive ? { color: cat.accent } : { color: '#64748b' }}
              />
              <span className="relative z-10">{cat.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}