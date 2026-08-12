'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface FeatureCardItem {
  id: string
  icon: LucideIcon
  title: string
  description: string
  color: string
  actionLabel: string
  action: () => void
}

export function FeatureCardGrid({ items }: { items: FeatureCardItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, i) => {
        const Icon = item.icon
        return (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={item.action}
            className="group relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-6 text-left cursor-pointer transition-colors duration-300"
            style={{
              background: 'rgba(17,23,36,0.92)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${item.color}45`)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                  style={{ background: `${item.color}14`, border: `1px solid ${item.color}35` }}
                >
                  <Icon className="w-7 h-7" style={{ color: item.color }} />
                </div>
                <ArrowRight className="w-5 h-5 text-slate-600 transition-all duration-300 group-hover:translate-x-1" />
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {item.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mt-2">{item.description}</p>
            </div>

            <span
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-300 w-fit"
              style={{
                background: `${item.color}15`,
                border: `1px solid ${item.color}40`,
                color: item.color,
              }}
            >
              {item.actionLabel}
              <ArrowRight className="w-4 h-4" />
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}