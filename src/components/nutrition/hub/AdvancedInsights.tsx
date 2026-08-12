'use client'

import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, FlaskConical } from 'lucide-react'

interface AdvancedInsightsProps {
  title?: string
  accent?: string
  children: ReactNode
}

export function AdvancedInsights({ title = 'Advanced Insights', accent = '#64748b', children }: AdvancedInsightsProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="rounded-3xl overflow-hidden transition-colors duration-300"
      style={{
        background: 'rgba(17,23,36,0.55)',
        border: `1px solid ${open ? accent + '35' : 'rgba(255,255,255,0.08)'}`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
      >
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center"
            style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}
          >
            <FlaskConical className="w-5 h-5" style={{ color: accent }} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Power-user detail. Click to expand.</p>
          </div>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
          <span
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <ChevronDown className="w-4 h-4 text-slate-300" />
          </span>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-6 space-y-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}