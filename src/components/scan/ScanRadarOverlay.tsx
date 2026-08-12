'use client'

import React from 'react'

interface ScanRadarOverlayProps {
  isScanning: boolean
}

export function ScanRadarOverlay({ isScanning }: ScanRadarOverlayProps) {
  if (!isScanning) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl">
      {/* Laser Scanning Bar */}
      <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent shadow-[0_0_15px_rgba(52,211,153,1)] animate-scan-line" />

      {/* Rotating Target Reticle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full border border-primary-400/30 border-dashed animate-spin-slow flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border border-energy-300/40 animate-pulse" />
        </div>
      </div>

      {/* Bounding Target Corners */}
      <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-primary-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
      <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-primary-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
      <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-primary-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
      <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-primary-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />

      {/* HUD Telemetry Overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-dark-950/80 border border-primary-400/40 rounded-full flex items-center gap-2 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-primary-400 animate-ping" />
        <span className="text-[11px] font-mono text-primary-300 tracking-wider uppercase font-bold">
          AI VISION RECOGNITION ACTIVE
        </span>
      </div>

      {/* Scanning Target Bounding Box Simulation */}
      <div className="absolute top-1/3 left-1/4 w-36 h-28 border border-energy-300/60 rounded-xl bg-energy-300/5 flex flex-col justify-between p-1.5 animate-pulse">
        <span className="text-[9px] font-mono text-energy-300 bg-dark-900/80 px-1 py-0.5 rounded w-max">
          TARGET #1 [88% CONFIDENCE]
        </span>
        <div className="text-right">
          <span className="text-[9px] font-mono text-energy-200">SCANNING MACROS...</span>
        </div>
      </div>
    </div>
  )
}
