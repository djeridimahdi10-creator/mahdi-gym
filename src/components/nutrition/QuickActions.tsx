'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Camera, RefreshCw, BarChart3, ArrowRight } from 'lucide-react'

interface QuickActionsProps {
  onGeneratePlan: () => void
  loadingPlan: boolean
}

export function QuickActions({ onGeneratePlan, loadingPlan }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <Link href="/dashboard/scan">
        <motion.div
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all"
          style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', color: '#f43f5e' }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Camera className="w-4 h-4" />
          <span>Scan Food Photo</span>
          <ArrowRight className="w-3 h-3 opacity-60" />
        </motion.div>
      </Link>

      <motion.button
        onClick={onGeneratePlan}
        disabled={loadingPlan}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all disabled:opacity-50"
        style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', color: '#c084fc' }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <RefreshCw className={`w-3.5 h-3.5 ${loadingPlan ? 'animate-spin' : ''}`} />
        <span>{loadingPlan ? 'AI Calculating...' : 'Generate AI Plan'}</span>
      </motion.button>

      <Link href="/dashboard/stats">
        <motion.div
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all"
          style={{ background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.2)', color: '#00F0FF' }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <BarChart3 className="w-4 h-4" />
          <span>View Reports & Stats</span>
          <ArrowRight className="w-3 h-3 opacity-60" />
        </motion.div>
      </Link>
    </div>
  )
}

