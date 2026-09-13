'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useInView, animate } from 'framer-motion'
import { Button } from '@/components/ui'
import { Navbar } from '@/components/layout/Navbar'
import {
  Zap, Apple, Dumbbell, Camera, MessageCircle, ArrowRight, Menu, X,
  Check, ScanLine, TrendingUp, Star, ArrowUp,
  Send, ShieldCheck, HeartPulse, BadgeCheck, Play, User, Cpu,
  Sparkles, Activity
} from 'lucide-react'
import {
  FeatureFoodScanVisual,
  FeatureDarijaCoachVisual,
  FeatureMealPlanVisual,
  FeatureWorkoutVisual,
  StepProfileMiniSVG,
  StepStrategyMiniSVG,
  StepScanMiniSVG,
  StepCoachMiniSVG,
} from '@/components/layout/LandingVisualGraphics'

const socialIcons = [
  {
    label: 'Instagram',
    path: 'M12 2.2c3.2 0 3.6 0 4.9.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.3.06-1.7.07-4.9.07s-3.6-.01-4.9-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.11 15.62 2.1 15.24 2.1 12s.01-3.58.07-4.85C2.32 3.92 3.84 2.38 7.1 2.23 8.4 2.18 8.8 2.2 12 2.2zm0 3.68a6.12 6.12 0 1 0 0 12.24 6.12 6.12 0 0 0 0-12.24zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.85a1.43 1.43 0 1 0 0 2.86 1.43 1.43 0 0 0 0-2.86z',
  },
  {
    label: 'X',
    path: 'M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41z',
  },
  {
    label: 'LinkedIn',
    path: 'M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z',
  },
  {
    label: 'YouTube',
    path: 'M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z',
  },
]

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView || !ref.current) return
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, value, suffix])

  return <span ref={ref}>0{suffix}</span>
}

function SectionEyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center justify-center gap-3.5 mb-6">
      <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-primary-400/70" />
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-400/25 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase shadow-[0_0_15px_rgba(52,211,153,0.1)]">
        <span className="text-primary-300 font-extrabold">{index}</span>
        <span className="text-dark-200 font-semibold">{label}</span>
      </span>
      <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-primary-400/70" />
    </div>
  )
}

function DonutChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="10" />
      <circle
        cx="50" cy="50" r="38" fill="none"
        stroke="#10b981" strokeWidth="10"
        strokeDasharray="80 160" strokeDashoffset="0" strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <circle
        cx="50" cy="50" r="38" fill="none"
        stroke="#fb923c" strokeWidth="10"
        strokeDasharray="50 190" strokeDashoffset="-80" strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <circle
        cx="50" cy="50" r="38" fill="none"
        stroke="#a855f7" strokeWidth="10"
        strokeDasharray="40 200" strokeDashoffset="-130" strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <circle cx="50" cy="50" r="26" fill="#040812" />
    </svg>
  )
}

function PhoneMockup() {
  const [imgOk, setImgOk] = useState(true)

  return (
    <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[480px] lg:max-w-[560px] overflow-visible">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[360px] h-[360px] sm:w-[520px] sm:h-[520px] rounded-full bg-gradient-to-tr from-primary-500/15 via-ai-500/10 to-energy-500/15 blur-[110px]" />
        <div className="absolute w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] rounded-full border border-primary-400/15 animate-spin-slow" />
      </div>

      {/* 3D Container */}
      <div
        className="relative z-10"
        style={{ transform: 'perspective(1600px) rotateY(-5deg) rotateX(2deg)' }}
      >
        {/* Phone Frame */}
        <motion.div
          className="relative z-20 mx-auto w-[240px] sm:w-[280px] lg:w-[300px]"
          animate={{ rotate: [-1, 1, -1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'center bottom' }}
        >
          <div className="bg-dark-950 rounded-[44px] p-3 sm:p-4 border-[3.5px] border-dark-700/80 shadow-[0_30px_100px_rgba(0,0,0,0.95)] relative">
            <div className="absolute inset-0 rounded-[44px] pointer-events-none glass-reflection" />
            <div className="w-20 h-3.5 bg-dark-900 rounded-b-xl mx-auto mb-2.5" />
            <div className="bg-dark-900 rounded-[30px] p-4 border border-white/10 space-y-3.5">
              {/* Screen Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-primary-500/20 flex items-center justify-center">
                    <Camera className="w-3.5 h-3.5 text-primary-300" />
                  </div>
                  <span className="text-xs font-bold text-white">Smart Vision AI</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-500/15 border border-primary-400/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-ping-dot" />
                  <span className="text-[9px] font-extrabold text-primary-300 uppercase tracking-wider">LIVE</span>
                </div>
              </div>

              {/* Camera Viewfinder */}
              <div className="relative rounded-2xl overflow-hidden border border-primary-400/30 h-44 sm:h-48">
                {imgOk ? (
                  <Image
                    src="/images/salmon-bowl.png"
                    alt="Healthy Salad meal being scanned by AI"
                    fill
                    unoptimized
                    sizes="280px"
                    onError={() => setImgOk(false)}
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-dark-800 via-dark-900 to-dark-950 flex items-center justify-center">
                    <span className="text-4xl">🥗</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-dark-950/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/85 via-transparent to-dark-950/30" />
                <div className="scan-corners" />
                <div className="absolute left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-primary-400 to-transparent animate-scan-line shadow-[0_0_14px_rgba(52,211,153,0.9)]" />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-dark-950/90 border border-primary-400/40 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral-400 animate-pulse" />
                  <span className="text-[8px] font-extrabold text-white uppercase tracking-wider">4K Scanner</span>
                </div>
                <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-dark-950/90 border border-white/15 shadow-md">
                  <span className="text-[8px] font-bold text-primary-300">99.4% Match</span>
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1.5 rounded-lg bg-dark-950/95 border border-primary-400/40 shadow-xl flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-primary-300" />
                  <span className="text-[9px] font-bold text-white">Grilled Chicken Salad</span>
                </div>
              </div>

              {/* Scanner Button */}
              <div className="flex justify-center pt-0.5">
                <div className="btn-shine inline-flex items-center gap-2 px-5 sm:px-6 py-2 rounded-full bg-gradient-to-r from-emerald-400 via-primary-400 to-teal-400 text-xs font-extrabold text-dark-950 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-300/30">
                  <ScanLine className="w-3.5 h-3.5" />
                  <span>Instant Macro Breakdown</span>
                </div>
              </div>

              {/* Macros */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { v: '480', l: 'Calories', c: 'text-white' },
                  { v: '45g', l: 'Protein', c: 'text-primary-300' },
                  { v: '12g', l: 'Fiber', c: 'text-energy-400' },
                ].map((s) => (
                  <div key={s.l} className="bg-dark-950/90 p-2.5 rounded-xl border border-white/5 text-center shadow-inner">
                    <span className={`text-sm font-black block ${s.c}`}>{s.v}</span>
                    <span className="text-[8px] text-dark-400 font-bold uppercase tracking-wider">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Card — floating right */}
        <motion.div
          className="absolute -right-2 sm:-right-8 top-10 w-44 sm:w-52 bg-dark-900/95 backdrop-blur-2xl rounded-2xl p-4 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-primary-300" /> Daily Target
            </span>
            <span className="text-[10px] font-bold text-primary-300 bg-primary-500/10 px-2 py-0.5 rounded-full border border-primary-400/20">
              +12% vs avg
            </span>
          </div>
          <div className="flex items-center gap-3.5 mb-3">
            <DonutChart className="w-12 h-12 flex-shrink-0" />
            <div className="space-y-1">
              {[
                { color: 'bg-primary-400', label: 'Protein (165g)' },
                { color: 'bg-energy-400', label: 'Carbs (210g)' },
                { color: 'bg-ai-400', label: 'Fats (55g)' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-[9px] font-medium text-dark-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-7">
            {[45, 70, 55, 90, 65, 80, 50].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-primary-500/60 to-primary-400/90"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </motion.div>

        {/* Goals Card — floating left bottom */}
        <motion.div
          className="absolute -left-2 sm:-left-10 bottom-10 w-40 sm:w-44 bg-dark-900/95 backdrop-blur-2xl rounded-2xl p-4 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <span className="text-[10px] font-bold text-dark-300 block mb-2 uppercase tracking-wider">Weekly Streak</span>
          <div className="flex items-center gap-3 mb-2.5">
            <div className="w-10 h-10 rounded-full border-[3px] border-primary-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
              <span className="text-[11px] font-black text-primary-300">87%</span>
            </div>
            <div>
              <span className="text-base font-black text-white block leading-none">28 / 32</span>
              <span className="text-[9px] text-dark-400 font-medium">Logged Meals</span>
            </div>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`flex-1 h-1.5 rounded-full ${i <= 4 ? 'bg-primary-400' : 'bg-dark-700'}`} />
            ))}
          </div>
        </motion.div>

        {/* AI Coach chip — top left */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: [0, -7, 0], scale: 1 }}
          transition={{ opacity: { delay: 0.9, duration: 0.5 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }, scale: { delay: 0.9, duration: 0.5 } }}
          className="absolute -left-2 sm:-left-8 top-16 z-30"
        >
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-dark-900/95 backdrop-blur-xl border border-white/15 shadow-2xl">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-ai-500 to-ai-400 flex items-center justify-center flex-shrink-0 shadow-md">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">AI Coach (Darija)</span>
                <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
              </div>
              <span className="text-[10px] text-primary-300 font-medium">صلّي على النبي! راك هايل 💪</span>
            </div>
          </div>
        </motion.div>

        {/* Scan complete toast — bottom right */}
        <motion.div
          initial={{ opacity: 0, x: 16, scale: 0.9 }}
          animate={{ opacity: 1, x: [0, 6, 0], scale: 1 }}
          transition={{ opacity: { delay: 1.1, duration: 0.5 }, x: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }, scale: { delay: 1.1, duration: 0.5 } }}
          className="absolute -right-2 sm:-right-8 bottom-24 z-30"
        >
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-dark-900/95 backdrop-blur-xl border border-primary-400/40 shadow-2xl shadow-primary-500/10">
            <div className="w-8 h-8 rounded-xl bg-primary-500/25 border border-primary-400/30 flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4 text-primary-300" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block leading-none">Meal Logged</span>
              <span className="text-[10px] text-dark-300 font-medium">480 kcal · 45g Prot</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   FAQ SECTION COMPONENT
   ══════════════════════════════════════════════════ */
const faqs = [
  {
    step: 'Q1',
    icon: Camera,
    badge: 'Algerian Dishes',
    title: 'Does AI Recognize Local Algerian Foods?',
    description: 'Yes! NutriSaaS is trained on thousands of authentic meals including Couscous, Rechta, Tajine, Chorba, and Shakshuka, alongside international recipes.',
    gradient: 'from-primary-400/20 to-primary-500/5',
    border: 'border-primary-400/30',
    hoverBorder: 'hover:border-primary-400/40',
    textColor: 'text-primary-300',
    pillBg: 'bg-primary-500/10 border-primary-400/25 text-primary-300',
    pillIcon: ScanLine,
    pillLabel: 'Authentic Maghreb Foods',
  },
  {
    step: 'Q2',
    icon: MessageCircle,
    badge: 'Authentic Dialect',
    title: 'How Does Darija AI Coaching Work?',
    description: 'Our coach naturally understands Algerian Darija via voice or text. Receive culturally adapted nutrition tips, motivation, and healthy recipe swaps.',
    gradient: 'from-ai-400/20 to-ai-500/5',
    border: 'border-ai-400/30',
    hoverBorder: 'hover:border-ai-400/40',
    textColor: 'text-ai-300',
    pillBg: 'bg-ai-500/10 border-ai-400/25 text-ai-300',
    pillIcon: Sparkles,
    pillLabel: '🇩🇿 Local Voice & Text',
  },
  {
    step: 'Q3',
    icon: Zap,
    badge: 'Commitment Free',
    title: 'Can I Cancel Or Switch Plans Anytime?',
    description: 'Absolutely. Zero lock-in commitments or hidden fees. You can upgrade, downgrade, or cancel directly from your settings with one click.',
    gradient: 'from-emerald-400/20 to-teal-500/5',
    border: 'border-emerald-400/30',
    hoverBorder: 'hover:border-emerald-400/40',
    textColor: 'text-emerald-300',
    pillBg: 'bg-emerald-500/10 border-emerald-400/25 text-emerald-300',
    pillIcon: BadgeCheck,
    pillLabel: 'Zero Lock-in Contracts',
  },
  {
    step: 'Q4',
    icon: ShieldCheck,
    badge: 'Security & Privacy',
    title: 'Is My Biometric & Health Data Secure?',
    description: 'Yes. We use industry-standard end-to-end encryption for all profiles, meal photos, and biometrics. Your data is strictly private and never sold.',
    gradient: 'from-energy-400/20 to-energy-500/5',
    border: 'border-energy-400/30',
    hoverBorder: 'hover:border-energy-400/40',
    textColor: 'text-energy-300',
    pillBg: 'bg-energy-500/10 border-energy-400/25 text-energy-300',
    pillIcon: ShieldCheck,
    pillLabel: 'End-to-End Encryption',
  },
]

function FAQSection() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
      {faqs.map((faq, i) => (
        <motion.div
          key={faq.step}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
          whileHover={{ y: -6, transition: { duration: 0.3 } }}
          className={`relative text-center glass-card-static p-8 sm:p-10 rounded-3xl border border-white/[0.08] ${faq.hoverBorder} transition-all duration-300 flex flex-col items-center justify-between h-full z-10 group spotlight-card`}
          onMouseMove={(e) => {
            const el = e.currentTarget
            const r = el.getBoundingClientRect()
            el.style.setProperty('--spot-x', `${e.clientX - r.left}px`)
            el.style.setProperty('--spot-y', `${e.clientY - r.top}px`)
          }}
        >
          <div className="spotlight-glow" />
          <div className="relative z-10 flex flex-col items-center justify-start h-full w-full">
            {/* Concentric Glowing Icon Orb */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.25 }}
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 relative flex-shrink-0"
            >
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${faq.gradient} border ${faq.border}`} />
              <div className="absolute inset-[4px] rounded-full bg-dark-950" />
              <div className="absolute inset-0 flex items-center justify-center">
                <faq.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${faq.textColor}`} strokeWidth={1.75} />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-dark-900 border ${faq.border} flex items-center justify-center shadow-lg`}>
                <span className={`text-[9px] font-extrabold ${faq.textColor}`}>{faq.step}</span>
              </div>
            </motion.div>

            {/* Eyebrow */}
            <p className="text-[10px] font-bold tracking-[0.25em] text-dark-500 uppercase mb-3">
              {faq.badge}
            </p>

            {/* Question (Title) */}
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 text-balance">
              {faq.title}
            </h3>

            {/* Answer (Description) */}
            <p className="text-[0.9375rem] text-dark-300 leading-[1.8] max-w-[260px] mx-auto text-pretty mb-6 flex-1">
              {faq.description}
            </p>

            {/* Micro Pill Badge */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold ${faq.pillBg}`}>
              <faq.pillIcon className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{faq.pillLabel}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

const features = [
  {
    step: '01',
    icon: Camera,
    badge: 'Vision AI',
    title: 'AI Food Scanner',
    description: 'Point your camera at any meal or snack to detect ingredients and calculate macros in under 2 seconds.',
    gradient: 'from-primary-400/20 to-primary-500/5',
    border: 'border-primary-400/30',
    hoverBorder: 'hover:border-primary-400/40',
    textColor: 'text-primary-300',
    pillBg: 'bg-primary-500/10 border-primary-400/25 text-primary-300',
    pillIcon: ScanLine,
    pillLabel: '99.4% Macro Accuracy',
  },
  {
    step: '02',
    icon: MessageCircle,
    badge: 'Authentic Dialect',
    title: 'Darija AI Coach',
    description: 'Speak or text naturally in Algerian Darija. Get tailored motivation and fitness advice adapted to your lifestyle.',
    gradient: 'from-ai-400/20 to-ai-500/5',
    border: 'border-ai-400/30',
    hoverBorder: 'hover:border-ai-400/40',
    textColor: 'text-ai-300',
    pillBg: 'bg-ai-500/10 border-ai-400/25 text-ai-300',
    pillIcon: Sparkles,
    pillLabel: '🇩🇿 Darija Audio & Chat',
  },
  {
    step: '03',
    icon: Apple,
    badge: 'Metabolic Engine',
    title: 'Personalized Plans',
    description: 'Dynamic meal recommendations tailored to your exact metabolic rate with authentic recipes and 1-click swaps.',
    gradient: 'from-emerald-400/20 to-teal-500/5',
    border: 'border-emerald-400/30',
    hoverBorder: 'hover:border-emerald-400/40',
    textColor: 'text-emerald-300',
    pillBg: 'bg-emerald-500/10 border-emerald-400/25 text-emerald-300',
    pillIcon: Activity,
    pillLabel: 'Adaptive Target Engine',
  },
  {
    step: '04',
    icon: Dumbbell,
    badge: 'Fitness & Gym',
    title: 'Workouts & Tracking',
    description: 'Exercise library with progressive overload tracking and smart muscle recovery heatmaps to maximize strength.',
    gradient: 'from-energy-400/20 to-energy-500/5',
    border: 'border-energy-400/30',
    hoverBorder: 'hover:border-energy-400/40',
    textColor: 'text-energy-300',
    pillBg: 'bg-energy-500/10 border-energy-400/25 text-energy-300',
    pillIcon: TrendingUp,
    pillLabel: 'Hypertrophy & Heatmaps',
  },
]

const howItWorksSteps = [
  {
    step: '01',
    icon: User,
    badge: 'Body & Goals',
    title: 'Create Your Profile',
    description: 'Enter your body metrics, target weight, and dietary preferences to set your metabolic baseline.',
    gradient: 'from-primary-400/20 to-primary-500/5',
    border: 'border-primary-400/30',
    hoverBorder: 'hover:border-primary-400/40',
    textColor: 'text-primary-300',
    pillBg: 'bg-primary-500/10 border-primary-400/25 text-primary-300',
    pillIcon: Activity,
    pillLabel: 'Biometric Baseline',
  },
  {
    step: '02',
    icon: Cpu,
    badge: 'AI Strategy',
    title: 'Get Custom Plan',
    description: 'Our AI engine generates your personalized daily calories, protein, and authentic meals in seconds.',
    gradient: 'from-ai-400/20 to-ai-500/5',
    border: 'border-ai-400/30',
    hoverBorder: 'hover:border-ai-400/40',
    textColor: 'text-ai-300',
    pillBg: 'bg-ai-500/10 border-ai-400/25 text-ai-300',
    pillIcon: Sparkles,
    pillLabel: 'Instant Meal Strategy',
  },
  {
    step: '03',
    icon: ScanLine,
    badge: 'Photo Tracking',
    title: 'Track & Scan Food',
    description: 'Point your camera at any plate for 2-second macro breakdown, and follow your guided gym routines.',
    gradient: 'from-emerald-400/20 to-teal-500/5',
    border: 'border-emerald-400/30',
    hoverBorder: 'hover:border-emerald-400/40',
    textColor: 'text-emerald-300',
    pillBg: 'bg-emerald-500/10 border-emerald-400/25 text-emerald-300',
    pillIcon: Camera,
    pillLabel: 'Instant Plate Vision',
  },
  {
    step: '04',
    icon: MessageCircle,
    badge: '24/7 Darija Coach',
    title: 'Chat & Adjust Daily',
    description: 'Speak or text naturally in Algerian Darija whenever you need meal swaps, workout tips, or motivation.',
    gradient: 'from-energy-400/20 to-energy-500/5',
    border: 'border-energy-400/30',
    hoverBorder: 'hover:border-energy-400/40',
    textColor: 'text-energy-300',
    pillBg: 'bg-energy-500/10 border-energy-400/25 text-energy-300',
    pillIcon: MessageCircle,
    pillLabel: '🇩🇿 Darija Voice & Chat',
  },
]

export default function LandingPage() {
  const [progress, setProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [lang, setLang] = useState<'EN' | 'DZ'>('EN')
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const ids = ['features', 'how-it-works', 'faq']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setShowBackToTop(y > 500)
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? Math.min(1, y / scrollable) : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div className="min-h-screen bg-dark-950 text-dark-100 overflow-x-hidden relative selection:bg-primary-500/30 selection:text-white">

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2.5px] z-[100] transition-all duration-100"
        style={{
          width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, var(--color-primary-400), var(--color-ai-400), var(--color-energy-400))',
          boxShadow: '0 0 14px rgba(52,211,153,0.8)',
        }}
      />

      {/* Film Grain */}
      <div className="noise-overlay" />

      {/* Ambient Lighting & Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[800px] bg-hero-pattern opacity-80 blur-[60px]" />
        <div className="absolute inset-0 hero-grid-overlay opacity-35" />
        <div className="absolute top-28 left-[5%] w-[650px] h-[650px] bg-primary-500/10 rounded-full blur-[150px] animate-float-slow" />
        <div className="absolute top-[35%] right-[2%] w-[750px] h-[750px] bg-ai-500/10 rounded-full blur-[170px] animate-float-reverse" />
        <div className="absolute bottom-[20%] left-[10%] w-[600px] h-[600px] bg-energy-500/8 rounded-full blur-[150px]" />
      </div>

      {/* ═══════════════════════════════════
          FLOATING GLASS NAVBAR
          ═══════════════════════════════════ */}
      <Navbar activeSection={activeSection} lang={lang} onLangChange={setLang} />

      {/* ═══════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════ */}
      <section className="relative pt-36 sm:pt-44 lg:pt-52 pb-24 lg:pb-36 overflow-hidden z-10">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 text-center lg:text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-primary-500/15 border border-primary-400/30 text-primary-300 text-xs sm:text-sm font-bold tracking-widest mb-8 uppercase shadow-[0_0_20px_rgba(52,211,153,0.15)]">
                <Sparkles className="w-4 h-4 text-primary-300" />
                Next-Gen AI Health &amp; Nutrition Platform
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.08] mb-8 text-balance">
                Transform Your{' '}
                <br className="hidden sm:inline" />
                <span className="relative inline-block pb-3">
                  <span className="bg-gradient-to-r from-primary-300 via-primary-400 to-energy-400 bg-clip-text text-transparent">
                    Health Journey
                  </span>
                  <svg className="absolute left-0 -bottom-0.5 w-full h-3.5" viewBox="0 0 380 14" fill="none" preserveAspectRatio="none">
                    <path
                      d="M 4 10 C 90 3, 280 3, 376 8"
                      stroke="url(#heroUnderline)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                    <defs>
                      <linearGradient id="heroUnderline" x1="0" y1="0" x2="380" y2="0">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#fb923c" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl lg:text-[1.375rem] text-dark-300 font-normal leading-[1.8] max-w-2xl mx-auto lg:mx-0 mb-12 text-pretty">
                Personalized nutrition plans, AI-powered food scanning, and gym workouts — all in one unified app. Speak directly to your personal coach in Algerian Darija.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12">
                <Link href="/signup" className="group w-full sm:w-auto">
                  <button
                    type="button"
                    className="btn-flagship btn-shine relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 text-base sm:text-lg font-display font-extrabold rounded-2xl cursor-pointer select-none"
                  >
                    <span className="tracking-wide">Start Free Today</span>
                    <div className="w-7 h-7 rounded-xl bg-dark-950/20 flex items-center justify-center group-hover:bg-dark-950/30 group-hover:translate-x-1 transition-all duration-200">
                      <ArrowRight className="w-4 h-4 text-dark-950" />
                    </div>
                  </button>
                </Link>
                <Link
                  href="/how-it-works"
                  className="btn-liquid-glass group w-full sm:w-auto inline-flex items-center justify-center gap-3.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl text-base sm:text-lg font-semibold text-slate-200 hover:text-white cursor-pointer select-none"
                >
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.2)] group-hover:bg-emerald-500/25 group-hover:scale-105 transition-all">
                    <span className="absolute inset-0 rounded-full border border-emerald-400/40 radar-wave pointer-events-none" />
                    <Play className="w-4 h-4 text-emerald-300 fill-emerald-300/30 ml-0.5" />
                  </div>
                  <span className="tracking-tight">See How It Works</span>
                </Link>
              </div>

              {/* Trust Row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 mb-10">
                <div className="flex -space-x-2.5">
                  {[
                    { i: 'YB', c: 'from-primary-500/60 to-primary-400/30' },
                    { i: 'RK', c: 'from-ai-500/60 to-ai-400/30' },
                    { i: 'AD', c: 'from-energy-500/60 to-energy-400/30' },
                    { i: '+', c: 'from-dark-700 to-dark-600' },
                  ].map((a) => (
                    <div
                      key={a.i}
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${a.c} border-2 border-dark-950 flex items-center justify-center text-[11px] font-extrabold text-white shadow-lg`}
                    >
                      {a.i}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="w-4 h-4 text-gold-400 fill-gold-400" />
                    ))}
                  </div>
                  <span className="text-sm text-dark-300 font-medium">
                    <span className="text-white font-bold">4.9/5</span> from 2,300+ members
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center lg:justify-start divide-x divide-white/10">
                {[
                  { value: <Counter value={10} suffix="K+" />, label: 'Active Users' },
                  { value: <Counter value={50} suffix="+" />, label: 'Workouts' },
                  { value: <Counter value={3} />, label: 'Languages' },
                ].map((stat) => (
                  <div key={stat.label} className="px-5 sm:px-8 first:pl-0 last:pr-0">
                    <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">{stat.value}</div>
                    <div className="text-[11px] sm:text-xs font-bold text-dark-400 tracking-wider mt-1.5 uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative flex items-center justify-center lg:justify-end"
            >
              <PhoneMockup />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          TRUSTED BY STRIP
          ═══════════════════════════════════ */}
      <section className="py-14 lg:py-20 relative z-10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <p className="text-xs font-bold tracking-[0.25em] text-dark-400 uppercase mb-8">
              Trusted by health-focused people across Algeria &amp; beyond
            </p>
            <div className="marquee-mask overflow-hidden">
              <div className="animate-marquee flex items-center gap-20 pr-20">
                {[...Array(2)].map((_, dup) => (
                  <div key={dup} className="flex items-center gap-20" aria-hidden={dup === 1}>
                    {[
                      { name: 'MedFood', cls: 'font-serif italic font-semibold text-2xl' },
                      { name: 'ATLASFIT', cls: 'font-display font-extrabold text-xl tracking-tight' },
                      { name: 'zenlife', cls: 'font-sans font-medium text-xl lowercase tracking-[0.3em]' },
                      { name: 'VitaCare', cls: 'font-display font-bold text-2xl' },
                      { name: 'POWER-DZ', cls: 'font-mono font-bold text-lg tracking-widest' },
                      { name: 'NatureCo', cls: 'font-serif font-semibold text-2xl tracking-wide' },
                    ].map((brand) => (
                      <div
                        key={brand.name}
                        className="text-dark-500 hover:text-dark-300 transition-colors duration-300 cursor-default whitespace-nowrap select-none"
                      >
                        <span className={brand.cls}>{brand.name}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      {/* ═══════════════════════════════════
          FEATURES
          ═══════════════════════════════════ */}
      <section id="features" className="py-32 sm:py-40 lg:py-48 relative z-10 scroll-mt-24">
        <div className="container-custom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-20 sm:mb-24 lg:mb-28"
          >
            <SectionEyebrow index="01" label="Features" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight text-balance mb-6">
              Everything You Need
            </h2>
            <p className="text-dark-300 text-base lg:text-lg leading-[1.8] text-pretty max-w-2xl mx-auto text-center">
              Powerful tools engineered to help you conquer your fitness and nutrition goals effortlessly.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className={`relative text-center glass-card-static p-8 sm:p-10 rounded-3xl border border-white/[0.08] ${feature.hoverBorder} transition-all duration-300 flex flex-col items-center justify-between h-full z-10 group spotlight-card`}
                onMouseMove={(e) => {
                  const el = e.currentTarget
                  const r = el.getBoundingClientRect()
                  el.style.setProperty('--spot-x', `${e.clientX - r.left}px`)
                  el.style.setProperty('--spot-y', `${e.clientY - r.top}px`)
                }}
              >
                <div className="spotlight-glow" />
                <div className="relative z-10 flex flex-col items-center justify-start h-full w-full">
                  {/* Concentric Glowing Icon Orb */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.25 }}
                    className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 relative flex-shrink-0"
                  >
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${feature.gradient} border ${feature.border}`} />
                    <div className="absolute inset-[4px] rounded-full bg-dark-950" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <feature.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${feature.textColor}`} strokeWidth={1.75} />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-dark-900 border ${feature.border} flex items-center justify-center shadow-lg`}>
                      <span className={`text-[9px] font-extrabold ${feature.textColor}`}>{feature.step}</span>
                    </div>
                  </motion.div>

                  {/* Eyebrow */}
                  <p className="text-[10px] font-bold tracking-[0.25em] text-dark-500 uppercase mb-3">
                    {feature.badge}
                  </p>

                  {/* Title — Big and simple */}
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white mb-4 text-balance">
                    {feature.title}
                  </h3>

                  {/* Description — Does not touch borders */}
                  <p className="text-[0.9375rem] text-dark-300 leading-[1.8] max-w-[260px] mx-auto text-pretty mb-6 flex-1">
                    {feature.description}
                  </p>

                  {/* Micro Pill Badge */}
                  <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold ${feature.pillBg}`}>
                    <feature.pillIcon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{feature.pillLabel}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider with generous spacing */}
      <div className="relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="container-custom">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </div>
      </div>

      {/* ═══════════════════════════════════
          HOW IT WORKS
          ═══════════════════════════════════ */}
      <section id="how-it-works" className="py-32 sm:py-40 lg:py-48 relative z-10 bg-dark-900/25 scroll-mt-24">
        <div className="container-custom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-20 sm:mb-24 lg:mb-28"
          >
            <SectionEyebrow index="02" label="How It Works" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight mb-6 text-balance">
              How It Works
            </h2>
            <p className="text-dark-300 text-base lg:text-lg leading-[1.8] text-pretty max-w-2xl mx-auto text-center">
              Get started on your personalized health journey in four simple steps.
            </p>
          </motion.div>

          {/* Timeline Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative items-stretch">
            {howItWorksSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className={`relative text-center glass-card-static p-8 sm:p-10 rounded-3xl border border-white/[0.08] ${step.hoverBorder} transition-all duration-300 flex flex-col items-center justify-between h-full z-10 group spotlight-card`}
                onMouseMove={(e) => {
                  const el = e.currentTarget
                  const r = el.getBoundingClientRect()
                  el.style.setProperty('--spot-x', `${e.clientX - r.left}px`)
                  el.style.setProperty('--spot-y', `${e.clientY - r.top}px`)
                }}
              >
                <div className="spotlight-glow" />
                <div className="relative z-10 flex flex-col items-center justify-start h-full w-full">
                  {/* Concentric Glowing Icon Orb */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.25 }}
                    className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 relative flex-shrink-0"
                  >
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} border ${step.border}`} />
                    <div className="absolute inset-[4px] rounded-full bg-dark-950" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <step.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${step.textColor}`} strokeWidth={1.75} />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-dark-900 border ${step.border} flex items-center justify-center shadow-lg`}>
                      <span className={`text-[9px] font-extrabold ${step.textColor}`}>{step.step}</span>
                    </div>
                  </motion.div>

                  {/* Eyebrow */}
                  <p className="text-[10px] font-bold tracking-[0.25em] text-dark-500 uppercase mb-3">
                    {step.badge}
                  </p>

                  {/* Title — Big and simple */}
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white mb-4 text-balance">
                    {step.title}
                  </h3>

                  {/* Description — Does not touch borders */}
                  <p className="text-[0.9375rem] text-dark-300 leading-[1.8] max-w-[260px] mx-auto text-pretty mb-6 flex-1">
                    {step.description}
                  </p>

                  {/* Micro Pill Badge */}
                  <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold ${step.pillBg}`}>
                    <step.pillIcon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{step.pillLabel}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider with generous spacing */}
      <div className="relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="container-custom">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </div>
      </div>

      {/* ═══════════════════════════════════
          FAQ SECTION
          ═══════════════════════════════════ */}
      <section id="faq" className="pt-24 sm:pt-32 pb-16 sm:pb-20 relative z-10 scroll-mt-24">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24"
          >
            <SectionEyebrow index="03" label="FAQ" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight mb-6 text-balance">
              Frequently Asked Questions
            </h2>
            <p className="text-dark-300 text-base lg:text-lg leading-[1.8] text-pretty max-w-2xl mx-auto text-center">
              Everything you need to know about NutriSaaS, our AI features, and localized coaching.
            </p>
          </motion.div>

          <FAQSection />
        </div>
      </section>

      {/* Section Divider above CTA */}
      <div className="relative z-10 py-6 sm:py-10">
        <div className="container-custom">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </div>
      </div>

      {/* ═══════════════════════════════════
          FINAL CTA SECTION
          ═══════════════════════════════════ */}
      <section className="py-20 sm:py-28 lg:py-32 relative z-10">
        <div className="container-custom flex justify-center px-4">
          {/* Centered compact card container */}
          <div className="w-full max-w-[780px] relative group">

            {/* Glowing Backdrop Aura */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-primary-500/25 via-ai-500/15 to-energy-500/25 rounded-[38px] blur-lg opacity-70 group-hover:opacity-100 transition duration-700 pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="relative rounded-2xl sm:rounded-[32px] p-6 sm:p-10 lg:p-12 text-center overflow-hidden border border-white/[0.15] bg-gradient-to-b from-dark-900/95 via-dark-900/90 to-dark-950/98 backdrop-blur-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85),0_0_40px_-10px_rgba(52,211,153,0.18)] spotlight-card"
              onMouseMove={(e) => {
                const el = e.currentTarget
                const r = el.getBoundingClientRect()
                el.style.setProperty('--spot-x', `${e.clientX - r.left}px`)
                el.style.setProperty('--spot-y', `${e.clientY - r.top}px`)
              }}
            >
              <div className="spotlight-glow" />

              {/* Shimmering Top Light Beam */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 sm:w-2/3 h-[2px] bg-gradient-to-r from-transparent via-primary-400 to-transparent shadow-[0_0_15px_rgba(52,211,153,0.8)]" />

              {/* Subtle grid mesh pattern inside card */}
              <div className="absolute inset-0 hero-grid-overlay opacity-15 pointer-events-none" />

              {/* Ambient Radial Color Orbs */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-36 bg-primary-400/20 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-16 left-10 w-60 h-28 bg-ai-500/15 blur-[70px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-16 right-10 w-60 h-28 bg-energy-500/15 blur-[70px] rounded-full pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center">
                {/* Live Eyebrow Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/10 border border-primary-400/35 text-primary-300 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-5 shadow-[0_0_16px_rgba(52,211,153,0.15)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-400" />
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-primary-300" />
                  <span>Start Free Today • No Risk</span>
                </div>

                {/* Main Headline */}
                <h2 className="text-2xl sm:text-4xl lg:text-[2.5rem] font-display font-extrabold text-white tracking-tight leading-[1.15] mb-4 text-balance max-w-2xl">
                  Ready to{' '}
                  <span className="bg-gradient-to-r from-primary-300 via-emerald-400 to-energy-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(52,211,153,0.25)]">
                    Transform
                  </span>{' '}
                  Your Health?
                </h2>

                {/* Subheadline text */}
                <p className="text-sm sm:text-base text-dark-200 font-normal leading-[1.65] max-w-xl mx-auto mb-8 text-pretty">
                  Join thousands of members who eat better, train smarter, and feel stronger. Start free today — no credit card required.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10 w-full max-w-md sm:max-w-none">
                  <Link href="/signup" className="w-full sm:w-auto group/btn">
                    <button
                      type="button"
                      className="btn-flagship btn-shine relative w-full sm:w-auto px-7 sm:px-9 py-3.5 text-sm sm:text-base font-display font-extrabold rounded-xl flex items-center justify-center gap-2.5 cursor-pointer select-none shadow-[0_0_25px_rgba(52,211,153,0.25)] hover:shadow-[0_0_35px_rgba(52,211,153,0.4)] transition-all duration-300"
                    >
                      <span className="tracking-wide">Start Free Today</span>
                      <div className="w-6 h-6 rounded-lg bg-dark-950/20 flex items-center justify-center group-hover/btn:bg-dark-950/30 group-hover/btn:translate-x-1 transition-all duration-200">
                        <ArrowRight className="w-3.5 h-3.5 text-dark-950" />
                      </div>
                    </button>
                  </Link>

                  <Link href="/how-it-works" className="w-full sm:w-auto">
                    <button
                      type="button"
                      className="btn-liquid-glass w-full sm:w-auto px-6 sm:px-7 py-3.5 text-sm sm:text-base font-semibold rounded-xl flex items-center justify-center gap-2.5 text-dark-100 hover:text-white cursor-pointer select-none border border-white/15 hover:border-emerald-400/40 transition-all duration-300"
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center shadow-[0_0_10px_rgba(52,211,153,0.18)]">
                        <Play className="w-3 h-3 text-emerald-300 fill-emerald-300/30 ml-0.5" />
                      </div>
                      <span>Explore How It Works</span>
                    </button>
                  </Link>
                </div>

                {/* 3 Core Highlight Feature Cards (Capsules) */}
                <div className="w-full pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                  {/* Perk 1 */}
                  <motion.div
                    whileHover={{ y: -2, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-primary-400/40 hover:bg-primary-500/[0.06] transition-all duration-300 text-left group/perk cursor-default"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary-500/15 border border-primary-400/30 flex items-center justify-center flex-shrink-0 group-hover/perk:scale-105 group-hover/perk:bg-primary-500/25 transition-all duration-300 shadow-[0_0_12px_rgba(52,211,153,0.15)]">
                      <ShieldCheck className="w-4 h-4 text-primary-300" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white tracking-tight">
                        No credit card required
                      </div>
                      <div className="text-[11px] text-dark-400 font-medium">100% free start • Zero risk</div>
                    </div>
                  </motion.div>

                  {/* Perk 2 */}
                  <motion.div
                    whileHover={{ y: -2, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-ai-400/40 hover:bg-ai-500/[0.06] transition-all duration-300 text-left group/perk cursor-default"
                  >
                    <div className="w-9 h-9 rounded-lg bg-ai-500/15 border border-ai-400/30 flex items-center justify-center flex-shrink-0 group-hover/perk:scale-105 group-hover/perk:bg-ai-500/25 transition-all duration-300 shadow-[0_0_12px_rgba(168,85,247,0.15)]">
                      <Sparkles className="w-4 h-4 text-ai-300" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white tracking-tight">
                        14-day free trial
                      </div>
                      <div className="text-[11px] text-dark-400 font-medium">Full AI feature access</div>
                    </div>
                  </motion.div>

                  {/* Perk 3 */}
                  <motion.div
                    whileHover={{ y: -2, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-energy-400/40 hover:bg-energy-500/[0.06] transition-all duration-300 text-left group/perk cursor-default"
                  >
                    <div className="w-9 h-9 rounded-lg bg-energy-500/15 border border-energy-400/30 flex items-center justify-center flex-shrink-0 group-hover/perk:scale-105 group-hover/perk:bg-energy-500/25 transition-all duration-300 shadow-[0_0_12px_rgba(251,146,60,0.15)]">
                      <Zap className="w-4 h-4 text-energy-300" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white tracking-tight">
                        Instant setup
                      </div>
                      <div className="text-[11px] text-dark-400 font-medium">Ready in 2 minutes</div>
                    </div>
                  </motion.div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FOOTER
          ═══════════════════════════════════ */}
      <footer className="pt-16 sm:pt-20 pb-14 border-t border-white/[0.08] relative z-10">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">
            {/* Brand */}
            <div className="lg:pr-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-primary-500/20 border border-primary-400/40 flex items-center justify-center shadow-md">
                  <Zap className="w-4.5 h-4.5 text-primary-300" />
                </div>
                <span className="text-lg font-extrabold text-white tracking-tight">NutriSaaS</span>
              </div>
              <p className="text-[0.9375rem] text-dark-400 leading-[1.8] mb-7">
                AI-powered nutrition, food scanning, and fitness coaching — in your language.
              </p>
              <div className="flex items-center gap-2 mb-7">
                {socialIcons.map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-dark-400 hover:text-primary-300 hover:border-primary-400/40 hover:bg-primary-500/10 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-dark-400 font-medium">
                <span className="text-base">🇩🇿</span>
                <span>Crafted with pride in Algeria</span>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-xs font-extrabold text-white uppercase tracking-widest mb-6">Product</h4>
              <ul className="space-y-3.5">
                {['Features', 'How It Works', 'FAQ'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-dark-400 hover:text-primary-300 transition-colors duration-300 font-medium">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-extrabold text-white uppercase tracking-widest mb-6">Company</h4>
              <ul className="space-y-3.5">
                {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-dark-400 hover:text-primary-300 transition-colors duration-300 font-medium">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-xs font-extrabold text-white uppercase tracking-widest mb-6">Stay Updated</h4>
              <p className="text-sm text-dark-400 mb-6 leading-[1.7]">Get nutrition tips and product news in your inbox.</p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-2 p-1.5 rounded-xl bg-dark-900/90 border border-white/15 focus-within:border-primary-400/50 transition-colors duration-300"
              >
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="flex-1 min-w-0 bg-transparent px-3 py-2 text-sm text-white placeholder:text-dark-500 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="w-9 h-9 rounded-lg bg-gradient-to-r from-primary-500 to-primary-400 text-dark-950 flex items-center justify-center hover:brightness-110 hover:shadow-[0_0_16px_rgba(52,211,153,0.4)] transition-all cursor-pointer flex-shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              <p className="text-xs text-dark-600 mt-3">No spam. Unsubscribe anytime.</p>
            </div>
          </div>

          <div className="pt-10 border-t border-white/[0.07] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-dark-500 font-medium">
              © 2026 NutriSaaS. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {['Privacy', 'Terms', 'Cookies'].map((item) => (
                <a key={item} href="#" className="text-xs sm:text-sm text-dark-500 hover:text-white transition-colors duration-300">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-2xl glass-dock border border-white/20 text-white flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(16,185,129,0.25)] hover:border-emerald-400/50 hover:bg-emerald-500/20 hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer group"
          >
            <ArrowUp className="w-5 h-5 text-emerald-300 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
