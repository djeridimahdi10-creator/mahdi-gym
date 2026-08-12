'use client'

import Link from 'next/link'
import { Zap, Camera, ChevronRight } from 'lucide-react'

export function RecommendedActionCard() {
  return (
    <div
      className="p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between h-full space-y-4"
      style={{
        background: 'rgba(11, 17, 31, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      {/* Title Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400">
          <Zap className="w-4 h-4 fill-rose-400" />
        </div>
        <h3 className="text-base font-bold text-white tracking-wide">Recommended Action</h3>
      </div>

      {/* Main Gradient Banner */}
      <div
        className="p-6 sm:p-7 rounded-2xl relative overflow-hidden flex flex-col justify-between gap-6 flex-1"
        style={{
          background: 'linear-gradient(135deg, #e11d48 0%, #f97316 100%)',
          boxShadow: '0 10px 36px rgba(225, 29, 72, 0.35)',
        }}
      >
        {/* Decorative Background Glow Circle */}
        <div
          className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)' }}
        />

        {/* Camera Icon & Message */}
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-16 h-16 rounded-full bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-xl">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <div>
            <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Scan your meal
            </h4>
            <p className="text-xs sm:text-sm text-white/95 font-medium mt-1 leading-snug">
              You&apos;re 680 kcal away from your daily goal.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Link href="/dashboard/scan" className="relative z-10 self-end w-full sm:w-auto">
          <button className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xl hover:scale-105 transition-all duration-200">
            <span>Scan Meal Now</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </Link>
      </div>
    </div>
  )
}
