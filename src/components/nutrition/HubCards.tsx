'use client'

import { motion } from 'framer-motion'
import { ArrowRight, LucideIcon } from 'lucide-react'

export interface HubCardConfig {
  id: string
  icon: LucideIcon
  title: string
  description: string
  accent: string
  cta: string
  onClick: () => void
}

interface HubCardsProps {
  cards: HubCardConfig[]
  columns?: 2 | 3
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
}

export function HubCards({ cards, columns = 3 }: HubCardsProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={`grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 ${columns === 3 ? 'xl:grid-cols-3' : 'xl:grid-cols-2'}`}
    >
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <motion.button
            key={card.id}
            variants={cardVariant}
            onClick={card.onClick}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.985 }}
            className="group relative overflow-hidden text-left rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-5 cursor-pointer transition-all duration-300 hover:scale-[1.01]"
            style={{
              background: 'rgba(17,23,36,0.9)',
              border: `1px solid ${card.accent}22`,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(320px 180px at 20% 0%, ${card.accent}14, transparent)` }}
            />

            <div className="relative flex items-start justify-between gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${card.accent}14`, border: `1px solid ${card.accent}30`, color: card.accent }}
              >
                <Icon className="w-7 h-7" />
              </div>
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white/10"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: card.accent }}
              >
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            <div className="relative space-y-2.5">
              <h3 className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {card.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">{card.description}</p>
              <div
                className="inline-flex items-center gap-2 mt-1 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                style={{ background: `${card.accent}12`, color: card.accent, border: `1px solid ${card.accent}35` }}
              >
                {card.cta}
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.button>
        )
      })}
    </motion.div>
  )
}