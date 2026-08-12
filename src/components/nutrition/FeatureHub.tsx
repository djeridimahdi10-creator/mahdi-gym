'use client'

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'

export interface FeatureItem {
  id: string
  icon: LucideIcon
  title: string
  description: string
  actionLabel: string
  color: string
  onClick: () => void
}

interface FeatureHubProps {
  items: FeatureItem[]
  columns?: 2 | 3 | 4
  size?: 'lg' | 'sm'
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
}

export function FeatureHub({ items, columns = 3, size = 'lg' }: FeatureHubProps) {
  const colClass =
    columns === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : columns === 4
        ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'
        : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={`grid ${colClass} gap-5 sm:gap-6`}
    >
      {items.map((item) => {
        const Icon = item.icon
        return (
          <motion.div
            key={item.id}
            variants={cardVariant}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            onClick={item.onClick}
            className={`group cursor-pointer rounded-3xl flex flex-col justify-between transition-all ${
              size === 'lg' ? 'p-6 sm:p-7' : 'p-5 sm:p-6'
            }`}
            style={{
              background: 'rgba(17,23,36,0.92)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
          >
            <div className="space-y-4">
              <div
                className={`rounded-2xl flex items-center justify-center transition-all group-hover:scale-105 ${
                  size === 'lg' ? 'w-14 h-14' : 'w-12 h-12'
                }`}
                style={{
                  background: `${item.color}14`,
                  border: `1px solid ${item.color}30`,
                  boxShadow: `0 0 20px ${item.color}08`,
                }}
              >
                <Icon className={size === 'lg' ? 'w-7 h-7' : 'w-6 h-6'} style={{ color: item.color }} />
              </div>

              <div>
                <h3 className={`text-white font-bold tracking-tight ${size === 'lg' ? 'text-lg' : 'text-base'}`}>
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mt-2">{item.description}</p>
              </div>
            </div>

            <div
              className="mt-6 inline-flex items-center gap-2 font-bold text-sm transition-all group-hover:gap-3"
              style={{ color: item.color }}
            >
              <span>{item.actionLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}