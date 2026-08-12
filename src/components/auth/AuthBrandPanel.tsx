'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Zap, Camera, MessageCircle, Bot, Target, ShieldCheck, Cpu } from 'lucide-react'

const featureCallouts = [
  {
    icon: Camera,
    badge: 'v2.4',
    title: 'AI FOOD SCANNER',
    description: 'Instant macro estimation',
  },
  {
    icon: MessageCircle,
    badge: 'LIVE',
    title: 'DARIJA COACHING',
    description: 'Natural AI advice',
  },
  {
    icon: Target,
    badge: 'AUTO',
    title: 'PERSONALIZED PLANS',
    description: 'Adaptive nutrition',
  },
]

export function AuthBrandPanel() {
  return (
    <div className="relative flex flex-col justify-between w-full max-w-lg mx-auto h-full py-4 select-none">
      {/* Brand header */}
      <div className="relative z-20 animate-slide-down flex items-center justify-between mb-6 lg:mb-8">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="w-11 h-11 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 group-hover:shadow-emerald-400/40">
            <Zap className="w-6 h-6 text-dark-950 fill-dark-950" />
          </div>
          <span className="font-display font-extrabold text-2xl text-white tracking-tight">NutriSaaS</span>
        </Link>

        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-dark-900/80 border border-emerald-400/30 text-xs text-dark-300 backdrop-blur-xl shadow-lg shadow-emerald-500/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-300">
            AI Engine v4.2 Active
          </span>
        </div>
      </div>

      {/* Center visual story */}
      <div className="relative z-20 my-auto py-2 flex flex-col items-start w-full">
        {/* Headline */}
        <div className="mb-6 animate-slide-up">
          <h1 className="font-display text-4xl xl:text-5xl font-extrabold text-white leading-[1.08] tracking-tight">
            Your health,
            <br />
            <span className="bg-gradient-to-r from-amber-200 via-gold-300 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(251,191,36,0.4)]">
              powered by AI.
            </span>
          </h1>
          <p className="mt-3 text-dark-300 text-sm xl:text-base leading-relaxed max-w-md">
            Scan your food, follow smart plans, and chat with your AI coach — all powered by real-time neural vision.
          </p>
        </div>

        {/* Main Food Asset & Futuristic Overlays */}
        <div className="relative w-full max-w-[360px] xl:max-w-[380px] mx-auto my-4 animate-scale-in">
          {/* Main Salmon Bowl Container */}
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_50px_rgba(52,211,153,0.08)] bg-dark-900/60 group">
            <Image
              src="/images/salmon-bowl.png"
              alt="Grilled Salmon & Avocado Bowl"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            {/* Subtle radial dark vignetting overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-transparent to-dark-950/40 pointer-events-none" />

            {/* NEON HUD SCANNER OVERLAY [ ] */}
            <div className="absolute inset-6 border border-emerald-400/40 rounded-2xl pointer-events-none backdrop-blur-[1px]">
              {/* HUD Corner Brackets */}
              <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-emerald-300 shadow-[0_0_12px_#34d399]" />
              <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-emerald-300 shadow-[0_0_12px_#34d399]" />
              <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-emerald-300 shadow-[0_0_12px_#34d399]" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-emerald-300 shadow-[0_0_12px_#34d399]" />

              {/* Top HUD Metadata Bar */}
              <div className="absolute top-2 left-2.5 right-2.5 flex items-center justify-between text-[9px] font-mono text-emerald-300/80 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-emerald-400" /> SCAN // 99.4%
                </span>
                <span>#4092-SALMON</span>
              </div>

              {/* Scanning laser HUD line */}
              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-scan-line shadow-[0_0_15px_#34d399]" />

              {/* Food Tag Pin 1: Salmon */}
              <div className="absolute top-[28%] left-[8%] flex items-center gap-1.5 group-hover:scale-105 transition-transform pointer-events-auto">
                <div className="relative flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping absolute opacity-75" />
                  <span className="w-2 h-2 rounded-full bg-emerald-300 border border-white shadow-[0_0_10px_#34d399]" />
                </div>
                <div className="w-5 h-[1px] bg-gradient-to-r from-emerald-400 to-emerald-400/40" />
                <div className="px-2.5 py-0.5 rounded-xl bg-dark-950/90 border border-emerald-400/50 backdrop-blur-md text-[10px] font-bold text-emerald-200 shadow-lg shadow-emerald-500/25 whitespace-nowrap">
                  Salmon: <span className="text-white">40g Protein</span>
                </div>
              </div>

              {/* Food Tag Pin 2: Avocado */}
              <div className="absolute bottom-[28%] right-[8%] flex items-center gap-1.5 group-hover:scale-105 transition-transform flex-row-reverse pointer-events-auto">
                <div className="relative flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping absolute opacity-75" />
                  <span className="w-2 h-2 rounded-full bg-amber-300 border border-white shadow-[0_0_10px_#fbbf24]" />
                </div>
                <div className="w-5 h-[1px] bg-gradient-to-l from-amber-400 to-amber-400/40" />
                <div className="px-2.5 py-0.5 rounded-xl bg-dark-950/90 border border-amber-400/50 backdrop-blur-md text-[10px] font-bold text-amber-200 shadow-lg shadow-amber-500/25 whitespace-nowrap">
                  Avocado: <span className="text-white">22g Fat</span>
                </div>
              </div>
            </div>
          </div>

          {/* FLOATING AI CHIP (Top Right of Food) */}
          <div className="absolute -top-3 -right-2 z-30 animate-float-slow">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-900/90 border border-emerald-400/40 backdrop-blur-xl shadow-xl shadow-emerald-500/25 text-xs font-semibold text-white">
              <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-tr from-emerald-400 to-purple-500 flex items-center justify-center shadow-inner">
                <Bot className="w-3 h-3 text-white" />
              </div>
              <span className="tracking-wider text-[10px] uppercase font-mono font-bold text-emerald-300">AI COACH</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

          {/* FLOATING UI CARD (Scaled Down 30% to w-52, Floating Half-Off Bottom Right) */}
          <div className="absolute -bottom-8 -right-6 z-30 w-52 p-3.5 rounded-2xl bg-dark-950/92 border border-white/15 backdrop-blur-2xl shadow-[0_20px_45px_rgba(0,0,0,0.85)] animate-float-reverse">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-dark-300">Balanced Progress</span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-[8px] font-bold text-emerald-300">
                +12% ON TRACK
              </span>
            </div>

            {/* Circular Multi-layered Donut Chart */}
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center my-0.5">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Outer Ring: Teal */}
                <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />
                <circle cx="50" cy="50" r="40" stroke="#34d399" strokeWidth="8" fill="none" strokeDasharray="251" strokeDashoffset="60" strokeLinecap="round" className="drop-shadow-[0_0_8px_#34d399]" />
                
                {/* Middle Ring: Purple */}
                <circle cx="50" cy="50" r="30" stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="none" />
                <circle cx="50" cy="50" r="30" stroke="#c084fc" strokeWidth="6" fill="none" strokeDasharray="188" strokeDashoffset="50" strokeLinecap="round" className="drop-shadow-[0_0_8px_#c084fc]" />
                
                {/* Inner Ring: Gold */}
                <circle cx="50" cy="50" r="20" stroke="rgba(255,255,255,0.06)" strokeWidth="5" fill="none" />
                <circle cx="50" cy="50" r="20" stroke="#fbbf24" strokeWidth="5" fill="none" strokeDasharray="125" strokeDashoffset="35" strokeLinecap="round" className="drop-shadow-[0_0_8px_#fbbf24]" />
              </svg>
              {/* Central Stat */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-extrabold text-white tracking-tight leading-tight">3,314</span>
                <span className="text-[8px] font-semibold uppercase text-emerald-400 tracking-widest">kcal</span>
              </div>
            </div>

            {/* Macro breakdown pills */}
            <div className="grid grid-cols-3 gap-1 mt-1.5 text-center">
              <div className="bg-white/[0.04] p-1 rounded-lg border border-white/5">
                <p className="text-[10px] font-bold text-emerald-300">145g</p>
                <p className="text-[7.5px] text-dark-400 uppercase font-semibold">Protein</p>
              </div>
              <div className="bg-white/[0.04] p-1 rounded-lg border border-white/5">
                <p className="text-[10px] font-bold text-amber-300">210g</p>
                <p className="text-[7.5px] text-dark-400 uppercase font-semibold">Carbs</p>
              </div>
              <div className="bg-white/[0.04] p-1 rounded-lg border border-white/5">
                <p className="text-[10px] font-bold text-purple-300">62g</p>
                <p className="text-[7.5px] text-dark-400 uppercase font-semibold">Fat</p>
              </div>
            </div>

            {/* Mini Trend Line with SVG Fill */}
            <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between">
              <span className="text-[8.5px] text-dark-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" /> Optimal
              </span>
              <svg className="w-16 h-3.5" viewBox="0 0 80 16" fill="none">
                <defs>
                  <linearGradient id="trend-grad-mini" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 12 L15 10 L30 14 L45 5 L60 8 L80 2 L80 16 L0 16 Z" fill="url(#trend-grad-mini)" />
                <path d="M0 12 L15 10 L30 14 L45 5 L60 8 L80 2" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Callouts (Bottom) */}
      <div className="relative z-20 animate-slide-up stagger-3 pt-4 mt-6 border-t border-white/10">
        <div className="grid grid-cols-3 gap-3">
          {featureCallouts.map(({ icon: Icon, badge, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-1 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-emerald-400/30 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-emerald-300 group-hover:text-amber-300 group-hover:border-amber-400/40 transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[8.5px] font-mono font-bold text-emerald-400/80 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  {badge}
                </span>
              </div>
              <p className="text-[10px] font-bold text-white tracking-wider uppercase">{title}</p>
              <p className="text-[9px] text-dark-400 leading-snug">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
