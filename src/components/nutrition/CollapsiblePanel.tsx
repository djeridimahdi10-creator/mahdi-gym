'use client'

import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface CollapsiblePanelProps {
  label: string
  hint?: string
  accent?: string
  defaultOpen?: boolean
  children: ReactNode
}

/** Collapsible advanced section — keeps power-tools accessible without clutter. */
export function CollapsiblePanel({ label, hint, accent = '#00F0FF', defaultOpen = false, children }: CollapsiblePanelProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 sm:px-8 py-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div>
          <span className="text-base sm:text-lg font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {label}
          </span>
          {hint && <p className="text-slate-400 text-sm mt-0.5">{hint}</p>}
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${accent}12`, border: `1px solid ${accent}25`, color: accent }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-8 pb-8">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}