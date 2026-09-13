'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Camera, Plus, Sparkles } from 'lucide-react'
import { ScanTargetVisualSVG } from './DashboardVisuals'

interface RecommendedActionCardProps {
  onOpenQuickLog?: () => void
}

export function RecommendedActionCard({ onOpenQuickLog }: RecommendedActionCardProps) {
  return (
    <div
      className="p-5 rounded-2xl relative overflow-hidden flex flex-col h-full"
      style={{
        background: 'rgba(11, 17, 31, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/25 flex items-center justify-center">
            <Camera className="w-4.5 h-4.5 text-rose-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">Food Scanner</h3>
            <p className="text-[11px] text-rose-400 font-semibold mt-0.5">AI meal recognition</p>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/25">
          Smart Vision
        </span>
      </div>

      {/* Scanner Banner */}
      <div className="relative rounded-2xl overflow-hidden min-h-[180px] flex flex-col justify-between p-4 group border border-white/[0.08] flex-1">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/dashboard-macro-bowl.jpg"
            alt="Healthy Gourmet Macro Bowl"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.65] saturate-[1.1]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-dark-950/20" />
        </div>

        {/* Scanner Crosshair */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-60 group-hover:opacity-100 transition-opacity">
          <ScanTargetVisualSVG />
        </div>

        {/* Top Tag */}
        <div className="relative z-20 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dark-900/80 backdrop-blur-md border border-emerald-500/25 text-[10px] font-bold text-emerald-300">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            98.4% Accuracy
          </span>
        </div>

        {/* Bottom Details */}
        <div className="relative z-20 space-y-3 mt-auto pt-4">
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight leading-snug">
              Snap your next meal
            </h4>
            <p className="text-[11px] text-slate-200/80 font-medium mt-1">
              AI detects ingredients, calories, protein & fats in seconds.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard/scan" className="flex-1">
              <button className="w-full py-2.5 px-3 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg hover:scale-[1.02] transition-all duration-200">
                <Camera className="w-3.5 h-3.5 text-rose-500" />
                <span>Open Scanner</span>
              </button>
            </Link>

            {onOpenQuickLog && (
              <button
                onClick={onOpenQuickLog}
                className="py-2.5 px-3 rounded-xl bg-dark-900/80 hover:bg-dark-900 text-white font-bold text-xs border border-white/15 backdrop-blur-md hover:border-white/30 transition-all duration-200 flex items-center gap-1"
                title="Quick manual entry"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-400" />
                <span>Log</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
