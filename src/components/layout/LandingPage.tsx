'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useInView, animate } from 'framer-motion'
import { Button } from '@/components/ui'
import {
  Zap, Apple, Dumbbell, Camera, MessageCircle, ArrowRight, Menu, X,
  Check, ScanLine, TrendingUp, Star, ArrowUp,
  Send, ShieldCheck, HeartPulse, BadgeCheck, Play, User, Cpu,
} from 'lucide-react'

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
    <div className="flex items-center justify-center gap-4 mb-8">
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-primary-400/60" />
      <span className="inline-flex items-baseline gap-2.5 text-[11px] font-bold tracking-[0.3em] uppercase">
        <span className="text-primary-300">{index}</span>
        <span className="text-dark-400">{label}</span>
      </span>
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-primary-400/60" />
    </div>
  )
}

const features = [
  {
    icon: Camera,
    title: 'AI Food Scanner',
    description: 'Snap a photo of your meal and instantly get detailed calorie and macronutrient estimations in seconds.',
    iconBg: 'bg-primary-500/15',
    iconColor: 'text-primary-300',
    visual: (
      <div className="relative w-full h-44 rounded-2xl bg-gradient-to-br from-dark-900/90 via-dark-900/60 to-dark-800/80 border border-primary-400/20 overflow-hidden flex items-center justify-center flex-shrink-0">
        <div className="absolute inset-0 hero-grid-overlay opacity-50" />
        <div className="relative flex items-center justify-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary-500/20 via-energy-400/15 to-dark-800 border border-primary-400/30 flex items-center justify-center text-5xl shadow-[0_0_60px_rgba(52,211,153,0.2)]">
            🥗
          </div>
        </div>
        <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-primary-500/20 border border-primary-400/30 flex items-center justify-center animate-breathe backdrop-blur-md">
          <Camera className="w-5 h-5 text-primary-300" />
        </div>
        <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-dark-950/90 border border-primary-400/30 text-[11px] font-bold text-primary-300 flex items-center gap-1.5 shadow-lg">
          <ScanLine className="w-3.5 h-3.5 animate-pulse" /> SCANNING…
        </div>
        <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-dark-950/90 border border-white/15 text-[11px] font-bold text-white shadow-lg">
          480 kcal · 45g Prot
        </div>
      </div>
    ),
  },
  {
    icon: MessageCircle,
    title: 'Darija Coaching',
    description: 'Speak directly with your AI coach in authentic Algerian Darija for personalized motivation and guidance.',
    iconBg: 'bg-ai-400/15',
    iconColor: 'text-ai-300',
    visual: (
      <div className="relative w-full h-44 rounded-2xl bg-gradient-to-br from-dark-900/90 via-dark-900/60 to-dark-800/80 border border-ai-400/20 overflow-hidden flex items-center justify-center flex-shrink-0">
        <div className="absolute inset-0 hero-grid-overlay opacity-50" />
        <div className="relative flex items-center justify-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-ai-500/20 via-primary-500/10 to-dark-800 border border-ai-400/30 flex items-center justify-center text-5xl shadow-[0_0_60px_rgba(168,85,247,0.2)]">
            🗣️
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-1.5 h-10">
          {[0.4, 0.9, 0.5, 1, 0.6, 0.85, 0.45, 0.75, 0.55, 0.95, 0.5, 0.8].map((h, i) => (
            <div
              key={i}
              className="w-1.5 rounded-full bg-gradient-to-t from-ai-400/40 to-ai-300 animate-breathe"
              style={{ height: `${h * 100}%`, animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </div>
        <span className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-dark-950/90 border border-ai-400/35 text-[11px] font-bold text-ai-300 shadow-lg">
          صلّي على النبي 😉
        </span>
      </div>
    ),
  },
  {
    icon: Apple,
    title: 'Personalized Nutrition',
    description: 'AI-generated meal plans tailored precisely to your metabolic metrics, dietary preferences, and targets.',
    iconBg: 'bg-primary-500/15',
    iconColor: 'text-primary-300',
    visual: (
      <div className="relative w-full h-44 rounded-2xl bg-gradient-to-br from-dark-900/90 via-dark-900/60 to-dark-800/80 border border-primary-400/20 overflow-hidden flex items-center justify-center flex-shrink-0">
        <div className="absolute inset-0 hero-grid-overlay opacity-50" />
        <div className="relative flex items-center justify-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary-500/20 via-energy-400/15 to-dark-800 border border-primary-400/30 flex items-center justify-center text-5xl shadow-[0_0_60px_rgba(52,211,153,0.2)]">
            🍽️
          </div>
        </div>
        <div className="absolute top-4 left-4 w-14 h-14">
          <div className="w-14 h-14 rounded-full shadow-lg" style={{ background: 'conic-gradient(var(--color-primary-400) 0 45%, var(--color-ai-400) 45% 70%, var(--color-energy-400) 70% 100%)' }}>
            <div className="w-5 h-5 bg-dark-900 rounded-full m-auto mt-4" />
          </div>
        </div>
        <div className="absolute top-4 right-4 flex items-end gap-1.5 h-12">
          {[0.5, 0.85, 0.65, 1, 0.4].map((h, i) => (
            <div key={i} className="w-2.5 rounded-full bg-gradient-to-t from-primary-400/40 to-primary-300" style={{ height: `${h * 100}%` }} />
          ))}
        </div>
        <span className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-dark-950/90 border border-white/15 text-[11px] font-bold text-white shadow-lg">
          Plan tailored for you
        </span>
      </div>
    ),
  },
  {
    icon: Dumbbell,
    title: 'Gym & Fitness Routines',
    description: 'Explore an expansive library of workouts complete with HD video guidance and progressive overload tracking.',
    iconBg: 'bg-energy-400/15',
    iconColor: 'text-energy-300',
    visual: (
      <div className="relative w-full h-44 rounded-2xl bg-gradient-to-br from-dark-900/90 via-dark-900/60 to-dark-800/80 border border-energy-400/20 overflow-hidden flex items-center justify-center flex-shrink-0">
        <div className="absolute inset-0 hero-grid-overlay opacity-50" />
        <div className="relative flex items-center justify-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-energy-400/20 via-primary-500/10 to-dark-800 border border-energy-400/30 flex items-center justify-center text-5xl shadow-[0_0_60px_rgba(251,146,60,0.2)]">
            🏋️
          </div>
        </div>
        <div className="absolute left-4 top-8 space-y-2.5">
          {[
            { label: 'Chest', pct: 82 },
            { label: 'Back', pct: 64 },
          ].map((b) => (
            <div key={b.label} className="w-28">
              <div className="flex justify-between text-[10px] font-bold text-dark-400 mb-1">
                <span>{b.label}</span>
                <span className="text-energy-300">{b.pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-energy-400 to-primary-400" style={{ width: `${b.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-950/90 border border-energy-400/30 text-[11px] font-bold text-energy-300 shadow-lg">
          <TrendingUp className="w-3.5 h-3.5" /> +8% this week
        </div>
      </div>
    ),
  },
]

function DonutChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="50" r="38" fill="none" stroke="rgb(16 185 129 / 0.2)" strokeWidth="10" />
      <circle
        cx="50" cy="50" r="38" fill="none"
        stroke="rgb(16 185 129)" strokeWidth="10"
        strokeDasharray="80 160" strokeDashoffset="0" strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <circle
        cx="50" cy="50" r="38" fill="none"
        stroke="rgb(251 191 36)" strokeWidth="10"
        strokeDasharray="50 190" strokeDashoffset="-80" strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <circle
        cx="50" cy="50" r="38" fill="none"
        stroke="rgb(139 92 246)" strokeWidth="10"
        strokeDasharray="40 200" strokeDashoffset="-130" strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <circle cx="50" cy="50" r="26" fill="rgb(10 12 15)" />
    </svg>
  )
}

function PhoneMockup() {
  const [imgOk, setImgOk] = useState(true)

  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[480px] lg:max-w-[560px] overflow-visible">
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] rounded-full bg-primary-500/8 blur-[100px]" />
        <div className="absolute w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] rounded-full border border-primary-400/10 animate-spin-slow" />
      </div>

      {/* 3D Scene */}
      <div
        className="relative z-10"
        style={{ transform: 'perspective(1500px) rotateY(-6deg) rotateX(2deg)' }}
      >
        {/* Phone Frame */}
        <motion.div
          className="relative z-20 mx-auto w-[220px] sm:w-[264px] lg:w-[276px]"
          animate={{ rotate: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'center bottom' }}
        >
          <div className="bg-dark-950 rounded-[40px] p-3 sm:p-3.5 border-[3px] border-dark-700/60 shadow-[0_30px_90px_rgba(0,0,0,0.9)] relative">
            <div className="absolute inset-0 rounded-[40px] pointer-events-none glass-reflection" />
            <div className="w-16 h-3 bg-dark-900 rounded-b-xl mx-auto mb-2" />
            <div className="bg-dark-900 rounded-[26px] p-3.5 border border-white/10 space-y-3">
              {/* Screen Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-primary-500/20 flex items-center justify-center">
                    <Camera className="w-3 h-3 text-primary-300" />
                  </div>
                  <span className="text-[10px] font-bold text-white">Food Scanning</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-ping-dot" />
                  <span className="text-[7px] font-bold text-primary-300 uppercase tracking-wider">AI</span>
                </div>
              </div>

              {/* Camera Viewfinder */}
              <div className="relative rounded-xl overflow-hidden border border-primary-400/30 h-40">
                {imgOk ? (
                  <Image
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                    alt="Salad bowl being scanned"
                    fill
                    unoptimized
                    sizes="220px"
                    onError={() => setImgOk(false)}
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-dark-800 via-dark-900 to-dark-950 flex items-center justify-center">
                    <span className="text-4xl">🥗</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-dark-950/25" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-dark-950/30" />
                <div className="scan-corners" />
                <div className="absolute left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-primary-400 to-transparent animate-scan-line shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-dark-950/85 border border-primary-400/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral-400 animate-pulse" />
                  <span className="text-[7px] font-extrabold text-white uppercase tracking-wider">Live</span>
                </div>
                <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-dark-950/85 border border-white/15">
                  <span className="text-[7px] font-bold text-white">📷 4K</span>
                </div>
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg bg-dark-950/90 border border-primary-400/40">
                  <span className="text-[8px] font-bold text-primary-300">Analyzing ingredients…</span>
                </div>
              </div>

              {/* Scanner Button */}
              <div className="flex justify-center pt-0.5">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-400 text-[10px] font-extrabold text-dark-950 shadow-lg shadow-primary-400/30">
                  <ScanLine className="w-3.5 h-3.5" /> Food Scanner
                </div>
              </div>

              {/* Macros */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { v: '480', l: 'Kcal', c: 'text-white' },
                  { v: '45g', l: 'Protein', c: 'text-primary-300' },
                  { v: '12g', l: 'Fiber', c: 'text-energy-400' },
                ].map((s) => (
                  <div key={s.l} className="bg-dark-950/80 p-2 rounded-lg border border-white/5 text-center">
                    <span className={`text-xs font-extrabold block ${s.c}`}>{s.v}</span>
                    <span className="text-[7px] text-dark-400 font-semibold uppercase tracking-wide">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Card — floating right */}
        <motion.div
          className="absolute -right-3 sm:-right-6 top-12 w-40 sm:w-44 bg-dark-900/95 backdrop-blur-xl rounded-2xl p-3.5 border border-white/10 shadow-2xl z-10"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-white">Diet Details</span>
            <TrendingUp className="w-3 h-3 text-primary-300" />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <DonutChart className="w-12 h-12" />
            <div className="space-y-1.5">
              {[
                { color: 'bg-primary-400', label: 'Protein' },
                { color: 'bg-energy-400', label: 'Carbs' },
                { color: 'bg-ai-400', label: 'Fats' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-[8px] text-dark-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-1 h-8">
            {[40, 65, 50, 80, 55, 70, 45].map((h, i) => (
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
          className="absolute -left-3 sm:-left-9 bottom-14 w-32 sm:w-36 bg-dark-900/95 backdrop-blur-xl rounded-2xl p-3 border border-white/10 shadow-2xl z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <span className="text-[9px] font-bold text-white block mb-2">Goals Attained</span>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full border-[3px] border-primary-400 flex items-center justify-center flex-shrink-0">
              <span className="text-[8px] font-extrabold text-primary-300">87%</span>
            </div>
            <div>
              <span className="text-sm font-extrabold text-white block leading-none">28</span>
              <span className="text-[8px] text-dark-400">Active</span>
            </div>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`flex-1 h-1 rounded-full ${i <= 4 ? 'bg-primary-400' : 'bg-dark-700'}`} />
            ))}
          </div>
        </motion.div>

        {/* Donut Ring — floating */}
        <motion.div
          className="absolute -left-6 sm:-left-12 top-2 w-16 h-16 sm:w-20 sm:h-20 z-10"
          animate={{ rotate: [0, 360], y: [0, -8, 0] }}
          transition={{ rotate: { duration: 24, repeat: Infinity, ease: 'linear' }, y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' } }}
        >
          <DonutChart className="w-full h-full drop-shadow-lg" />
        </motion.div>

        {/* Glowing Arc — top right */}
        <motion.div
          className="absolute -top-7 -right-3 sm:-right-9 w-20 h-20 sm:w-24 sm:h-24 z-10"
          animate={{ rotate: [0, 18, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M 20 80 A 50 50 0 0 1 80 20" fill="none" stroke="url(#arcGrad)" strokeWidth="3.5" strokeLinecap="round" />
            <defs>
              <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(16 185 129)" />
                <stop offset="100%" stopColor="rgb(139 92 246)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* AI Coach chip — top left */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: [0, -7, 0], scale: 1 }}
          transition={{ opacity: { delay: 0.9, duration: 0.5 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }, scale: { delay: 0.9, duration: 0.5 } }}
          className="absolute -left-2 sm:-left-6 top-16 z-30"
        >
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-dark-900/95 backdrop-blur-xl border border-white/15 shadow-2xl">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-ai-500/70 to-ai-400/40 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-white">AI Coach</span>
              <span className="text-[8px] font-bold text-primary-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" /> Online
              </span>
            </div>
          </div>
        </motion.div>

        {/* Scan complete toast — bottom right */}
        <motion.div
          initial={{ opacity: 0, x: 16, scale: 0.9 }}
          animate={{ opacity: 1, x: [0, 6, 0], scale: 1 }}
          transition={{ opacity: { delay: 1.1, duration: 0.5 }, x: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }, scale: { delay: 1.1, duration: 0.5 } }}
          className="absolute -right-1 sm:-right-7 bottom-24 z-30"
        >
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-dark-900/95 backdrop-blur-xl border border-primary-400/30 shadow-2xl shadow-primary-500/10">
            <div className="w-7 h-7 rounded-lg bg-primary-500/25 border border-primary-400/30 flex items-center justify-center flex-shrink-0">
              <Check className="w-3.5 h-3.5 text-primary-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-white block leading-none">Scan complete</span>
              <span className="text-[8px] text-dark-400 font-medium">480 kcal logged</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [lang, setLang] = useState<'EN' | 'DZ'>('EN')
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const ids = ['features', 'how-it-works', 'pricing']
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
      setScrolled(y > 20)
      setShowBackToTop(y > 600)
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
        className="fixed top-0 left-0 h-[2px] z-[100] transition-all duration-100"
        style={{
          width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, var(--color-primary-400), var(--color-ai-400), var(--color-energy-400))',
          boxShadow: '0 0 12px rgba(52,211,153,0.6)',
        }}
      />

      {/* Film Grain */}
      <div className="noise-overlay" />

      {/* Ambient Lighting & Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[800px] bg-hero-pattern opacity-70 blur-[50px]" />
        <div className="absolute inset-0 hero-grid-overlay opacity-40" />
        <div className="absolute top-28 left-[8%] w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[140px] animate-float-slow" />
        <div className="absolute top-[38%] right-[4%] w-[700px] h-[700px] bg-ai-500/10 rounded-full blur-[160px] animate-float-reverse" />
      </div>

      {/* ═══════════════════════════════════
          FLOATING GLASS NAVBAR
          ═══════════════════════════════════ */}
      <header className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl transition-all duration-300">
        <div className={`rounded-2xl sm:rounded-full transition-all duration-500 border shadow-2xl px-4 sm:px-6 py-3 ${scrolled
            ? 'bg-dark-950/90 backdrop-blur-2xl border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
            : 'bg-dark-900/70 backdrop-blur-xl border-white/10 shadow-[0_12px_35px_rgba(0,0,0,0.5)]'
          }`}
        >
          <div className="flex items-center justify-between gap-4 sm:gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:scale-105 transition-transform">
                <Zap className="w-4 h-4 text-dark-950 fill-dark-950 stroke-[2.5]" />
              </div>
              <span className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight leading-none group-hover:text-primary-300 transition-colors flex items-center gap-1.5">
                NutriSaaS<span className="text-primary-400">AI</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
              </span>
            </Link>

            {/* Desktop Nav Pills */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/[0.08]">
              {[
                { href: '#features', label: 'Features' },
                { href: '#how-it-works', label: 'How It Works' },
                { href: '#pricing', label: 'Pricing' },
              ].map((item) => {
                const active = activeSection === item.href.slice(1)
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-200 ${active
                        ? 'bg-primary-400/20 text-primary-300 font-bold border border-primary-400/30'
                        : 'text-dark-300 hover:text-white hover:bg-white/[0.06]'
                      }`}
                  >
                    {item.label}
                  </a>
                )
              })}
            </nav>

            {/* Desktop Right */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              {/* Language Switcher */}
              <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.05] border border-white/10 text-xs">
                <span className="text-xs pl-1.5">🇩🇿</span>
                <button
                  onClick={() => setLang('DZ')}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold transition-all cursor-pointer ${lang === 'DZ' ? 'bg-primary-400 text-dark-950 shadow-md' : 'text-dark-400 hover:text-white'
                    }`}
                >
                  DZ
                </button>
                <button
                  onClick={() => setLang('EN')}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold transition-all cursor-pointer ${lang === 'EN' ? 'bg-primary-400 text-dark-950 shadow-md' : 'text-dark-400 hover:text-white'
                    }`}
                >
                  EN
                </button>
              </div>

              <Link href="/login" className="text-xs font-bold text-dark-300 hover:text-white transition-colors px-1">
                Login
              </Link>

              <Link href="/signup">
                <Button
                  variant="primary"
                  size="sm"
                  className="rounded-full text-xs font-extrabold bg-gradient-to-r from-primary-400 to-primary-500 hover:brightness-110 text-dark-950 px-5 py-2 shadow-lg shadow-primary-400/25 border-none transition-all cursor-pointer"
                >
                  Sign Up Free
                </Button>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.06] border border-white/10 text-dark-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="lg:hidden mt-2 overflow-hidden bg-dark-950/95 backdrop-blur-3xl border border-white/15 rounded-3xl p-6 shadow-2xl space-y-1"
            >
              {['Features', 'How It Works', 'Pricing'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3.5 text-sm font-bold text-dark-200 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors"
                >
                  {item}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full justify-center text-sm py-3 rounded-xl border border-white/10">Login</Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" className="w-full justify-center bg-primary-400 text-dark-950 font-bold text-sm py-3 rounded-xl">Sign Up Free</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ═══════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════ */}
      <section className="relative pt-32 sm:pt-40 lg:pt-52 pb-20 lg:pb-32 overflow-hidden z-10">
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/15 border border-primary-400/30 text-primary-300 text-xs sm:text-sm font-bold tracking-widest mb-7 uppercase">
                <Zap className="w-3.5 h-3.5" />
                Next-Gen AI Health &amp; Nutrition
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.08] mb-7 text-balance">
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
              <p className="text-base sm:text-xl lg:text-[1.25rem] text-dark-300 font-normal leading-[1.75] max-w-xl mx-auto lg:mx-0 mb-10 text-pretty">
                Personalized nutrition plans, AI-powered food scanning, and gym workouts — all in one app. Speak to your coach in Algerian Darija.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12">
                <Link href="/signup">
                  <Button
                    variant="primary"
                    size="lg"
                    className="px-9 py-4 text-base sm:text-lg font-extrabold rounded-2xl bg-primary-400 hover:bg-primary-300 text-dark-950 shadow-[0_0_35px_rgba(52,211,153,0.35)] hover:shadow-[0_0_45px_rgba(52,211,153,0.5)] transition-all duration-300 group"
                  >
                    Start For Free
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
                  </Button>
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-3 text-base sm:text-lg font-bold text-dark-200 hover:text-white transition-colors duration-300 group"
                >
                  <span className="w-11 h-11 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center group-hover:border-primary-400/50 group-hover:bg-primary-500/10 transition-all duration-300">
                    <Play className="w-4 h-4 text-primary-300 ml-0.5" />
                  </span>
                  See How It Works
                </a>
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
                  <span className="text-xs sm:text-sm text-dark-400 font-medium">
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
                    <div className="text-[10px] sm:text-xs font-bold text-dark-400 tracking-widest mt-1 uppercase">{stat.label}</div>
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
      <section className="py-12 lg:py-16 relative z-10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-dark-500 uppercase mb-8">
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
                        className="text-dark-600 hover:text-dark-300 transition-colors duration-300 cursor-default whitespace-nowrap select-none"
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
      <section id="features" className="py-24 lg:py-36 relative z-10 scroll-mt-24">
        <div className="container-custom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
          >
            <SectionEyebrow index="01" label="Features" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight text-balance">
              Everything You Need
            </h2>
            <p className="text-dark-300 text-base lg:text-lg mt-5 leading-[1.75] text-pretty">
              Powerful features engineered to help you conquer your fitness and nutrition goals effortlessly
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
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="glass-card p-6 lg:p-8 rounded-3xl border border-white/10 hover:border-primary-400/40 transition-all duration-300 group flex flex-col spotlight-card"
                onMouseMove={(e) => {
                  const el = e.currentTarget
                  const r = el.getBoundingClientRect()
                  el.style.setProperty('--spot-x', `${e.clientX - r.left}px`)
                  el.style.setProperty('--spot-y', `${e.clientY - r.top}px`)
                }}
              >
                <div className="spotlight-glow" />
                <div className="relative z-10 flex flex-col h-full">
                  {/* Visual */}
                  <div className="flex-shrink-0">
                    {feature.visual}
                  </div>
                  {/* Icon + Title */}
                  <div className="flex items-center gap-3 mt-7 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${feature.iconBg} group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug text-balance min-w-0">{feature.title}</h3>
                  </div>
                  {/* Description */}
                  <p className="text-sm text-dark-300 leading-[1.75] text-pretty flex-1">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      {/* ═══════════════════════════════════
          HOW IT WORKS
          ═══════════════════════════════════ */}
      <section id="how-it-works" className="py-24 lg:py-36 relative z-10 bg-dark-900/25 scroll-mt-24">
        <div className="container-custom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
          >
            <SectionEyebrow index="02" label="How it works" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight mb-5 text-balance">
              How It Works
            </h2>
            <p className="text-dark-300 text-base lg:text-lg leading-[1.75] text-pretty max-w-2xl mx-auto">
              Get started on your personalized health journey in 4 simple steps
            </p>
          </motion.div>

          {/* Timeline Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative items-stretch">
            {/* Connector Line */}
            <div className="hidden lg:block absolute top-[68px] left-[12.5%] right-[12.5%] h-[2px] z-0 pointer-events-none">
              <div className="w-full h-full bg-gradient-to-r from-primary-400/30 via-primary-400/15 to-primary-400/30" />
              <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary-400 shadow-[0_0_12px_rgba(52,211,153,0.9)] animate-travel-dot" />
            </div>

            {[
              { step: '01', icon: User, title: 'Create Profile', description: 'Enter your body metrics, food preferences, and fitness targets.' },
              { step: '02', icon: Cpu, title: 'Get AI Plan', description: 'Our intelligent engine formulates a bespoke nutrition schedule.' },
              { step: '03', icon: ScanLine, title: 'Track & Scan', description: 'Log your daily meals, scan food photos, and complete workouts.' },
              { step: '04', icon: MessageCircle, title: 'Chat & Adjust', description: 'Talk directly to your AI coach in Darija whenever you need guidance.' },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
                className="relative text-center glass-card-static p-7 sm:p-8 rounded-3xl border border-white/10 hover:border-primary-400/20 transition-all duration-300 flex flex-col items-center justify-start h-full z-10"
              >
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.25 }}
                  className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 relative flex-shrink-0"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400/20 to-primary-500/5 border border-primary-400/25" />
                  <div className="absolute inset-[4px] rounded-full bg-dark-950" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <step.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary-300" strokeWidth={1.75} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-dark-900 border border-primary-400/40 flex items-center justify-center shadow-lg">
                    <span className="text-[9px] font-extrabold text-primary-300">{step.step}</span>
                  </div>
                </motion.div>
                <p className="text-[10px] font-bold tracking-[0.25em] text-dark-500 uppercase mb-3">Step {step.step}</p>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 text-balance">{step.title}</h3>
                <p className="text-sm text-dark-300 leading-[1.75] max-w-[240px] mx-auto text-pretty">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      {/* ═══════════════════════════════════
          PRICING
          ═══════════════════════════════════ */}
      <section id="pricing" className="py-24 lg:py-36 relative z-10 scroll-mt-24">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
          >
            <SectionEyebrow index="03" label="Pricing" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight mb-5 text-balance">
              Choose the Plan That Transforms You
            </h2>
            <p className="text-dark-300 text-base lg:text-lg leading-[1.75] text-pretty">
              Simple, transparent pricing with no lock-in commitments. Cancel anytime.
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-16 sm:mb-20">
            <div className="relative flex w-full max-w-[280px] sm:max-w-[340px] p-1.5 rounded-full bg-dark-900/90 border border-white/15 backdrop-blur-xl shadow-2xl z-20">
              <div className="relative flex-1">
                {billing === 'monthly' && (
                  <motion.div
                    layoutId="activeBillingTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-300 rounded-full shadow-lg shadow-primary-400/25 z-0"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <button
                  type="button"
                  onClick={() => setBilling('monthly')}
                  className={`relative z-10 flex items-center justify-center w-full py-2.5 rounded-full text-sm font-extrabold transition-all duration-300 cursor-pointer select-none ${billing === 'monthly' ? 'text-dark-950' : 'text-dark-300 hover:text-white'
                    }`}
                >
                  Monthly
                </button>
              </div>
              <div className="relative flex-1">
                {billing === 'annual' && (
                  <motion.div
                    layoutId="activeBillingTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-300 rounded-full shadow-lg shadow-primary-400/25 z-0"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <button
                  type="button"
                  onClick={() => setBilling('annual')}
                  className={`relative z-10 flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-sm font-extrabold transition-all duration-300 cursor-pointer select-none ${billing === 'annual' ? 'text-dark-950' : 'text-dark-300 hover:text-white'
                    }`}
                >
                  <span>Annual</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider whitespace-nowrap flex-shrink-0 ${billing === 'annual'
                        ? 'bg-dark-950/20 text-dark-950'
                        : 'bg-primary-500/20 text-primary-300 border border-primary-400/30'
                      }`}
                  >
                    −20%
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-6 sm:pt-8">
            {[
              {
                name: 'Essential Health',
                tagline: 'Start your journey for free',
                price: { monthly: '0', annual: '0' },
                priceSuffix: 'Always Free',
                cta: 'Sign Up For Free',
                accent: 'from-dark-700/80 to-dark-800/60',
                border: 'border-white/10 hover:border-white/20',
                glow: '',
                icon: '🌊',
                popular: false,
                features: [
                  'Core Food Logging & Macronutrient Tracking',
                  'Access to Basic Recipe Library',
                  'Limited AI Food Scanning (5 scans/day)',
                  'Daily Wellness Check-in',
                  'Access to Community Forum',
                ],
              },
              {
                name: 'Pro & Powered',
                tagline: 'Everything you need to hit your goals',
                price: { monthly: '9.99', annual: '7.99' },
                priceSuffix: '/month',
                cta: 'Get Pro Access',
                accent: 'from-primary-500/20 via-primary-400/8 to-energy-300/8',
                border: 'border-primary-400/50',
                glow: 'shadow-[0_0_60px_rgba(52,211,153,0.15)]',
                icon: '⚡',
                popular: true,
                features: [
                  'All Essential Features, PLUS:',
                  'Unlimited AI Food Scanning',
                  'Full Workout Routine & Plan Library',
                  'Detailed Wellness & Fitness Analytics',
                  'Priority Community Support',
                  'Exclusive Health Articles & Guides',
                ],
              },
              {
                name: 'Premier Coaching',
                tagline: '1-on-1 coaching in Algerian Darija',
                price: { monthly: '24.99', annual: '19.99' },
                priceSuffix: '/month',
                cta: 'Go Premier',
                accent: 'from-ai-500/20 via-primary-500/8 to-dark-800/60',
                border: 'border-ai-400/35 hover:border-ai-400/55',
                glow: 'shadow-[0_0_60px_rgba(168,85,247,0.12)]',
                icon: '👑',
                popular: false,
                features: [
                  'All Pro Features, PLUS:',
                  'Personal Coaching in Algerian Darija',
                  'Customized Deep-Dive Nutrition & Fitness Plans',
                  'One-on-One Goal Setting & Progress Reviews',
                  'Direct Messaging to Your Coach',
                  'Access to Exclusive Coach-Led Groups',
                ],
              },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="relative flex spotlight-card h-full"
                onMouseMove={(e) => {
                  const el = e.currentTarget
                  const r = el.getBoundingClientRect()
                  el.style.setProperty('--spot-x', `${e.clientX - r.left}px`)
                  el.style.setProperty('--spot-y', `${e.clientY - r.top}px`)
                }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                    <div className="px-5 py-1.5 bg-gradient-to-r from-primary-400 to-primary-300 rounded-full text-[11px] font-black text-dark-950 shadow-xl shadow-primary-400/40 uppercase tracking-widest border border-primary-300 whitespace-nowrap">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={`glass-card w-full flex flex-col justify-between border bg-gradient-to-b ${plan.accent} ${plan.border} ${plan.glow} ${plan.popular ? 'border-primary-400/55' : ''}`}
                  style={{ padding: plan.popular ? '3.5rem 2.25rem 2.25rem' : '2.25rem' }}
                >
                  <div className="spotlight-glow" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-8">
                      <div className="flex items-center gap-3.5 mb-4">
                        <div className={`w-12 h-12 rounded-2xl bg-dark-950/80 border border-white/15 flex items-center justify-center text-2xl flex-shrink-0 ${plan.popular ? 'shadow-[0_0_20px_rgba(52,211,153,0.25)]' : ''}`}>
                          {plan.icon}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug text-balance">{plan.name}</h3>
                      </div>
                      <p className="text-sm text-dark-400 mb-6 leading-[1.7] text-pretty">{plan.tagline}</p>
                      <div className="flex items-baseline gap-2">
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={`${plan.name}-${billing}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="text-4xl sm:text-5xl font-black text-white tracking-tight"
                          >
                            ${plan.price[billing]}
                          </motion.span>
                        </AnimatePresence>
                        <span className="text-dark-400 text-sm font-semibold">{plan.priceSuffix}</span>
                      </div>
                      {plan.popular && (
                        <p className="text-xs font-bold text-primary-300 mt-3">
                          {billing === 'annual' ? 'Billed annually — cancel anytime' : 'Save 20% with annual billing'}
                        </p>
                      )}
                    </div>

                    <ul className="space-y-3.5 mb-10 flex-1">
                      {plan.features.map((feature, fi) => (
                        <li
                          key={feature}
                          className={`flex items-start gap-3 text-sm leading-[1.7] ${feature.endsWith(':') ? 'font-extrabold text-white' : 'text-dark-300'}`}
                        >
                          {!feature.endsWith(':') && (
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.popular ? 'bg-primary-400/20' : 'bg-white/5'}`}>
                              <Check className={`w-3 h-3 ${plan.popular ? 'text-primary-300' : 'text-dark-400'}`} />
                            </div>
                          )}
                          <span className={fi === 0 && feature.endsWith(':') ? 'text-dark-400 text-xs tracking-wider uppercase' : 'text-pretty'}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href="/signup" className="block mt-auto">
                      <Button
                        variant={plan.popular ? 'primary' : 'ghost'}
                        className={`w-full justify-center rounded-xl text-sm font-extrabold py-3.5 transition-all duration-300 ${plan.popular
                          ? 'bg-primary-400 hover:bg-primary-300 text-dark-950 shadow-xl shadow-primary-400/20'
                          : 'border border-white/15 hover:bg-white/10 hover:text-white hover:border-white/25'
                          }`}
                      >
                        {plan.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      {/* ═══════════════════════════════════
          FINAL CTA
          ═══════════════════════════════════ */}
      <section className="py-24 lg:py-36 relative z-10 overflow-hidden">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="relative glass-card p-10 sm:p-16 lg:p-24 rounded-[40px] text-center overflow-hidden border border-white/15 animate-gradient-border"
          >
            {/* Ambient glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[560px] h-[280px] bg-primary-400/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-28 -right-20 w-[300px] h-[300px] bg-ai-500/18 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 via-primary-400/10 to-energy-400/15 border border-primary-400/40 flex items-center justify-center mx-auto mb-8 animate-pulse-glow shadow-xl">
                <HeartPulse className="w-7 h-7 text-primary-300" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight mb-6 text-balance">
                Ready to <span className="text-gradient-hero">Transform</span> Your Health?
              </h2>
              <p className="text-base sm:text-lg text-dark-300 leading-[1.75] max-w-xl mx-auto mb-10 text-pretty">
                Join thousands who already eat better, train smarter, and feel stronger. Start free today — no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup">
                  <Button
                    variant="primary"
                    size="lg"
                    className="px-9 py-4 text-base font-extrabold rounded-2xl bg-primary-400 hover:bg-primary-300 text-dark-950 shadow-[0_0_35px_rgba(52,211,153,0.35)] hover:shadow-[0_0_45px_rgba(52,211,153,0.5)] transition-all duration-300 group"
                  >
                    Start For Free
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="px-9 py-4 text-base font-bold rounded-2xl border border-white/15 hover:bg-white/10 hover:text-white hover:border-white/25 transition-all duration-300"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-12 text-xs sm:text-sm text-dark-400 font-medium">
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary-400" /> 14-day money-back guarantee</span>
                <span className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-primary-400" /> No credit card required</span>
                <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary-400" /> Set up in 2 minutes</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FOOTER
          ═══════════════════════════════════ */}
      <footer className="pt-20 pb-12 border-t border-white/[0.07] relative z-10">
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
              <p className="text-sm text-dark-400 leading-[1.75] mb-7">
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
              <div className="flex items-center gap-2 text-xs text-dark-500 font-semibold">
                <span className="text-base">🇩🇿</span>
                <span>Made with love in Algeria</span>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-xs font-extrabold text-white uppercase tracking-widest mb-6">Product</h4>
              <ul className="space-y-3.5">
                {['Features', 'How It Works', 'Pricing'].map((item) => (
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
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-400 text-dark-950 flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.35)] hover:scale-110 hover:-translate-y-1 transition-all cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
