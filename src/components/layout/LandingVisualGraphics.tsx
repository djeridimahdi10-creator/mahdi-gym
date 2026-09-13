'use client'

import React from 'react'

/* ─────────────────────────────────────────────────────────────
   FEATURE 1: AI FOOD & MACRO SCANNER VISUAL (SVG)
   ───────────────────────────────────────────────────────────── */
export function FeatureFoodScanVisual() {
  return (
    <div className="w-full h-48 sm:h-52 relative rounded-2xl overflow-hidden bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950 border border-primary-500/20 flex items-center justify-center p-3 group-hover:border-primary-400/40 transition-colors shadow-inner">
      <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="scanBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
            <stop offset="50%" stopColor="#34D399" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="dishGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient plate glow */}
        <ellipse cx="160" cy="100" rx="90" ry="60" fill="url(#dishGlow)" />

        {/* Outer Plate */}
        <ellipse cx="160" cy="100" rx="75" ry="48" fill="#1E293B" stroke="#334155" strokeWidth="2" />
        <ellipse cx="160" cy="98" rx="65" ry="40" fill="#0F172A" />

        {/* Food Emojis / Graphics */}
        <g transform="translate(130, 75)">
          <circle cx="20" cy="20" r="14" fill="#059669" fillOpacity="0.3" />
          <text x="8" y="27" fontSize="22">🥗</text>
        </g>
        <g transform="translate(160, 72)">
          <circle cx="16" cy="16" r="12" fill="#D97706" fillOpacity="0.3" />
          <text x="6" y="22" fontSize="18">🍗</text>
        </g>

        {/* Laser Scanning Line with animation */}
        <rect x="50" y="50" width="220" height="3" fill="url(#scanBeam)" rx="1.5">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,95; 0,0"
            dur="2.8s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Target Bounding Box */}
        <g stroke="#34D399" strokeWidth="1.5" strokeDasharray="3 3">
          <rect x="100" y="58" width="120" height="82" rx="8" />
        </g>

        {/* Viewfinder Corners */}
        <g stroke="#10B981" strokeWidth="2.5" strokeLinecap="round">
          <path d="M 60 50 L 75 50 M 60 50 L 60 65" />
          <path d="M 260 50 L 245 50 M 260 50 L 260 65" />
          <path d="M 60 150 L 75 150 M 60 150 L 60 135" />
          <path d="M 260 150 L 245 150 M 260 150 L 260 135" />
        </g>

        {/* Top Floating Match Badge */}
        <g transform="translate(105, 14)">
          <rect x="0" y="0" width="110" height="22" rx="11" fill="#0F172A" stroke="#10B981" strokeWidth="1" />
          <circle cx="12" cy="11" r="3.5" fill="#34D399" />
          <text x="22" y="15" fill="#FFFFFF" fontSize="9.5" fontFamily="sans-serif" fontWeight="bold">99.4% AI Match</text>
        </g>

        {/* Bottom Floating Macro Pill */}
        <g transform="translate(60, 158)">
          <rect x="0" y="0" width="200" height="28" rx="14" fill="#0F172A" stroke="#334155" strokeWidth="1" />
          <text x="14" y="18" fill="#FFFFFF" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
            🔥 480 kcal
          </text>
          <text x="88" y="18" fill="#34D399" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
            • 45g Prot
          </text>
          <text x="148" y="18" fill="#F59E0B" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
            • 32g Carb
          </text>
        </g>
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FEATURE 2: DARIJA AI COACH VISUAL (SVG)
   ───────────────────────────────────────────────────────────── */
export function FeatureDarijaCoachVisual() {
  return (
    <div className="w-full h-48 sm:h-52 relative rounded-2xl overflow-hidden bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950 border border-ai-500/20 flex items-center justify-center p-3 group-hover:border-ai-400/40 transition-colors shadow-inner">
      <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="darijaUser" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="darijaAi" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4338CA" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>

        {/* Top Coach Header Bar */}
        <g transform="translate(20, 16)">
          <rect x="0" y="0" width="280" height="28" rx="14" fill="#1E1B4B" fillOpacity="0.6" stroke="#4338CA" strokeWidth="1" />
          <circle cx="16" cy="14" r="9" fill="#6366F1" />
          <text x="12" y="18" fontSize="11">🤖</text>
          <text x="32" y="18" fill="#FFFFFF" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
            Coach AI • 🇩🇿 Algerian Darija
          </text>
          <circle cx="258" cy="14" r="3.5" fill="#34D399" />
          <text x="232" y="17" fill="#34D399" fontSize="8" fontFamily="sans-serif" fontWeight="bold">ONLINE</text>
        </g>

        {/* User Question Bubble (Right aligned) */}
        <g transform="translate(100, 58)">
          <rect x="0" y="0" width="195" height="34" rx="14" fill="url(#darijaUser)" />
          <text x="12" y="21" fill="#FFFFFF" fontSize="10.5" fontFamily="sans-serif" fontWeight="600">
            Wach nakol mlih mor l&apos;gym?
          </text>
        </g>

        {/* Coach Answer Bubble (Left aligned) */}
        <g transform="translate(25, 102)">
          <rect x="0" y="0" width="265" height="52" rx="14" fill="url(#darijaAi)" />
          <text x="14" y="21" fill="#FFFFFF" fontSize="10.5" fontFamily="sans-serif" fontWeight="600">
            Saha khouya! Khassak 35g protein:
          </text>
          <text x="14" y="38" fill="#C7D2FE" fontSize="9.5" fontFamily="sans-serif">
            🍗 200g escalope m3a ruz wla 4 baydat!
          </text>
        </g>

        {/* Audio Wave / Voice Indicator */}
        <g transform="translate(25, 164)">
          <rect x="0" y="0" width="115" height="22" rx="11" fill="#1E293B" stroke="#334155" strokeWidth="1" />
          <text x="10" y="15" fontSize="11">🎙️</text>
          <g transform="translate(30, 6)" fill="#A5B4FC">
            <rect x="0" y="3" width="2" height="6" rx="1" />
            <rect x="6" y="1" width="2" height="10" rx="1" />
            <rect x="12" y="0" width="2" height="12" rx="1" />
            <rect x="18" y="2" width="2" height="8" rx="1" />
            <rect x="24" y="4" width="2" height="4" rx="1" />
            <rect x="30" y="1" width="2" height="10" rx="1" />
            <rect x="36" y="3" width="2" height="6" rx="1" />
          </g>
          <text x="75" y="15" fill="#A5B4FC" fontSize="8" fontFamily="sans-serif" fontWeight="bold">Voice AI</text>
        </g>

        {/* Dialect Tag */}
        <g transform="translate(195, 164)">
          <rect x="0" y="0" width="95" height="22" rx="11" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1" />
          <text x="10" y="15" fill="#E0E7FF" fontSize="8.5" fontFamily="sans-serif" fontWeight="bold">Native Darija</text>
        </g>
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FEATURE 3: PERSONALIZED NUTRITION PLANS (SVG)
   ───────────────────────────────────────────────────────────── */
export function FeatureMealPlanVisual() {
  return (
    <div className="w-full h-48 sm:h-52 relative rounded-2xl overflow-hidden bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950 border border-emerald-500/20 flex items-center justify-center p-3 group-hover:border-emerald-400/40 transition-colors shadow-inner">
      <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Top Targets Banner */}
        <g transform="translate(20, 16)">
          <rect x="0" y="0" width="280" height="34" rx="12" fill="#064E3B" fillOpacity="0.4" stroke="#059669" strokeWidth="1" />
          <text x="14" y="22" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
            Daily Target: 2,450 kcal
          </text>
          <text x="180" y="22" fill="#34D399" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
            165g Protein
          </text>
        </g>

        {/* 3 Meal Cards Grid */}
        {/* Breakfast Card */}
        <g transform="translate(20, 60)">
          <rect x="0" y="0" width="85" height="95" rx="12" fill="#1E293B" stroke="#334155" strokeWidth="1" />
          <rect x="8" y="8" width="69" height="32" rx="8" fill="#312E81" fillOpacity="0.3" />
          <text x="18" y="30" fontSize="18">🍳</text>
          <text x="8" y="56" fill="#FFFFFF" fontSize="9.5" fontFamily="sans-serif" fontWeight="bold">Shakshuka</text>
          <text x="8" y="72" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">420 kcal</text>
          <text x="8" y="84" fill="#34D399" fontSize="8" fontFamily="sans-serif" fontWeight="bold">32g Prot</text>
        </g>

        {/* Lunch Card (Highlighted with Algerian Couscous) */}
        <g transform="translate(115, 56)">
          <rect x="0" y="0" width="90" height="103" rx="12" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
          <rect x="0" y="0" width="90" height="103" rx="12" fill="#10B981" fillOpacity="0.08" />
          <rect x="8" y="8" width="74" height="34" rx="8" fill="#065F46" fillOpacity="0.4" />
          <text x="18" y="32" fontSize="20">🍲</text>
          <text x="8" y="58" fill="#FFFFFF" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Couscous</text>
          <text x="8" y="74" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">680 kcal</text>
          <text x="8" y="88" fill="#34D399" fontSize="8.5" fontFamily="sans-serif" fontWeight="bold">54g Prot</text>
        </g>

        {/* Dinner Card */}
        <g transform="translate(215, 60)">
          <rect x="0" y="0" width="85" height="95" rx="12" fill="#1E293B" stroke="#334155" strokeWidth="1" />
          <rect x="8" y="8" width="69" height="32" rx="8" fill="#D97706" fillOpacity="0.2" />
          <text x="18" y="30" fontSize="18">🥩</text>
          <text x="8" y="56" fill="#FFFFFF" fontSize="9.5" fontFamily="sans-serif" fontWeight="bold">Salmon</text>
          <text x="8" y="72" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">590 kcal</text>
          <text x="8" y="84" fill="#34D399" fontSize="8" fontFamily="sans-serif" fontWeight="bold">48g Prot</text>
        </g>

        {/* 1-Click Swap Action Pill */}
        <g transform="translate(90, 168)">
          <rect x="0" y="0" width="140" height="22" rx="11" fill="#047857" fillOpacity="0.4" stroke="#34D399" strokeWidth="1" />
          <text x="12" y="15" fill="#34D399" fontSize="9" fontFamily="sans-serif" fontWeight="bold">
            🔄 1-Click Recipe Swaps
          </text>
        </g>
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FEATURE 4: WORKOUTS & PROGRESSIVE OVERLOAD (SVG)
   ───────────────────────────────────────────────────────────── */
export function FeatureWorkoutVisual() {
  return (
    <div className="w-full h-48 sm:h-52 relative rounded-2xl overflow-hidden bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950 border border-energy-500/20 flex items-center justify-center p-3 group-hover:border-energy-400/40 transition-colors shadow-inner">
      <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="barGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
          <linearGradient id="barGradActive" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>

        {/* Top Header */}
        <g transform="translate(20, 14)">
          <rect x="0" y="0" width="280" height="32" rx="12" fill="#7C2D12" fillOpacity="0.3" stroke="#EA580C" strokeWidth="1" />
          <text x="14" y="21" fill="#FFFFFF" fontSize="10.5" fontFamily="sans-serif" fontWeight="bold">
            Progressive Overload Tracker
          </text>
          <text x="210" y="21" fill="#F97316" fontSize="9.5" fontFamily="sans-serif" fontWeight="bold">
            +8.5% Growth
          </text>
        </g>

        {/* Bench / Exercise Tag */}
        <g transform="translate(25, 54)">
          <text x="0" y="14" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
            Dumbbell Bench Press
          </text>
          <text x="0" y="28" fill="#94A3B8" fontSize="9" fontFamily="sans-serif">
            Week 4 • Hypertrophy Phase
          </text>
        </g>

        {/* Weekly Volume Bars */}
        <g transform="translate(30, 95)">
          {/* Day 1 */}
          <rect x="0" y="25" width="22" height="35" rx="4" fill="#334155" />
          <text x="4" y="70" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">M</text>

          {/* Day 2 */}
          <rect x="36" y="15" width="22" height="45" rx="4" fill="url(#barGrad)" opacity="0.8" />
          <text x="41" y="70" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">T</text>

          {/* Day 3 */}
          <rect x="72" y="8" width="22" height="52" rx="4" fill="url(#barGrad)" />
          <text x="76" y="70" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">W</text>

          {/* Day 4 */}
          <rect x="108" y="20" width="22" height="40" rx="4" fill="#334155" />
          <text x="113" y="70" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">T</text>

          {/* Day 5 (Peak Active) */}
          <rect x="144" y="0" width="22" height="60" rx="4" fill="url(#barGradActive)" />
          <text x="150" y="70" fill="#34D399" fontSize="8" fontFamily="sans-serif" fontWeight="bold">F</text>
        </g>

        {/* Dumbbell Icon on Right */}
        <g transform="translate(225, 75)">
          <rect x="0" y="0" width="70" height="70" rx="14" fill="#1E293B" stroke="#475569" strokeWidth="1" />
          <text x="18" y="44" fontSize="28">🏋️</text>
        </g>

        {/* Bottom Tag */}
        <g transform="translate(90, 172)">
          <rect x="0" y="0" width="140" height="20" rx="10" fill="#7C2D12" fillOpacity="0.4" stroke="#F97316" strokeWidth="1" />
          <text x="14" y="14" fill="#FED7AA" fontSize="8.5" fontFamily="sans-serif" fontWeight="bold">
            🔥 Muscle Recovery Engine
          </text>
        </g>
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   HOW IT WORKS STEP 1 MINI SVG: PROFILE & BIOMETRICS
   ───────────────────────────────────────────────────────────── */
export function StepProfileMiniSVG() {
  return (
    <div className="w-full h-36 relative rounded-2xl overflow-hidden bg-dark-950/80 border border-primary-500/20 flex items-center justify-center p-2 group-hover:border-primary-400/40 transition-colors shadow-inner">
      <svg viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Radar concentric rings */}
        <circle cx="120" cy="55" r="45" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
        <circle cx="120" cy="55" r="30" stroke="#34D399" strokeWidth="1.2" opacity="0.5" />
        <circle cx="120" cy="55" r="18" fill="#10B981" fillOpacity="0.15" />

        {/* User silhouette */}
        <circle cx="120" cy="48" r="8" fill="#34D399" />
        <path d="M 108 68 C 108 60 132 60 132 68" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />

        {/* Biometrics tags */}
        <g transform="translate(18, 25)">
          <rect x="0" y="0" width="54" height="22" rx="6" fill="#1E293B" stroke="#334155" strokeWidth="1" />
          <text x="6" y="15" fill="#34D399" fontSize="9" fontFamily="sans-serif" fontWeight="bold">78.5 kg</text>
        </g>
        <g transform="translate(168, 25)">
          <rect x="0" y="0" width="54" height="22" rx="6" fill="#1E293B" stroke="#334155" strokeWidth="1" />
          <text x="8" y="15" fill="#F59E0B" fontSize="9" fontFamily="sans-serif" fontWeight="bold">182 cm</text>
        </g>
        <g transform="translate(75, 92)">
          <rect x="0" y="0" width="90" height="20" rx="10" fill="#064E3B" fillOpacity="0.5" stroke="#059669" strokeWidth="1" />
          <text x="10" y="14" fill="#34D399" fontSize="8.5" fontFamily="sans-serif" fontWeight="bold">🎯 Goal: Lean Gains</text>
        </g>
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   HOW IT WORKS STEP 2 MINI SVG: AI STRATEGY & MEALS
   ───────────────────────────────────────────────────────────── */
export function StepStrategyMiniSVG() {
  return (
    <div className="w-full h-36 relative rounded-2xl overflow-hidden bg-dark-950/80 border border-ai-500/20 flex items-center justify-center p-2 group-hover:border-ai-400/40 transition-colors shadow-inner">
      <svg viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Calorie Dial */}
        <g transform="translate(30, 25)">
          <circle cx="35" cy="35" r="30" stroke="#334155" strokeWidth="6" fill="none" />
          <circle cx="35" cy="35" r="30" stroke="#818CF8" strokeWidth="6" strokeDasharray="120 180" strokeLinecap="round" fill="none" transform="rotate(-90 35 35)" />
          <text x="20" y="35" fill="#FFFFFF" fontSize="10" fontFamily="sans-serif" fontWeight="bold">2,450</text>
          <text x="24" y="46" fill="#818CF8" fontSize="7" fontFamily="sans-serif">kcal</text>
        </g>

        {/* Meal cards */}
        <g transform="translate(115, 18)">
          <rect x="0" y="0" width="105" height="34" rx="8" fill="#1E293B" stroke="#334155" strokeWidth="1" />
          <text x="8" y="22" fontSize="13">🍲</text>
          <text x="28" y="16" fill="#FFFFFF" fontSize="8.5" fontFamily="sans-serif" fontWeight="bold">Couscous Bowl</text>
          <text x="28" y="27" fill="#34D399" fontSize="7.5" fontFamily="sans-serif">54g Protein</text>
        </g>
        <g transform="translate(115, 60)">
          <rect x="0" y="0" width="105" height="34" rx="8" fill="#1E293B" stroke="#334155" strokeWidth="1" />
          <text x="8" y="22" fontSize="13">🍳</text>
          <text x="28" y="16" fill="#FFFFFF" fontSize="8.5" fontFamily="sans-serif" fontWeight="bold">Eggs Shakshuka</text>
          <text x="28" y="27" fill="#F59E0B" fontSize="7.5" fontFamily="sans-serif">32g Protein</text>
        </g>
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   HOW IT WORKS STEP 3 MINI SVG: TRACK & SCAN
   ───────────────────────────────────────────────────────────── */
export function StepScanMiniSVG() {
  return (
    <div className="w-full h-36 relative rounded-2xl overflow-hidden bg-dark-950/80 border border-coral-500/20 flex items-center justify-center p-2 group-hover:border-coral-400/40 transition-colors shadow-inner">
      <svg viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Smartphone Camera Frame */}
        <rect x="50" y="10" width="140" height="98" rx="14" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
        
        {/* Viewfinder brackets */}
        <path d="M 68 28 L 78 28 M 68 28 L 68 38" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
        <path d="M 172 28 L 162 28 M 172 28 L 172 38" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
        <path d="M 68 90 L 78 90 M 68 90 L 68 80" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
        <path d="M 172 90 L 162 90 M 172 90 L 172 80" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />

        {/* Food icon in center */}
        <text x="105" y="66" fontSize="28">🥑</text>

        {/* Scan line */}
        <line x1="65" y1="58" x2="175" y2="58" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="3 2" />

        {/* Floating Scan Tag */}
        <g transform="translate(75, 78)">
          <rect x="0" y="0" width="90" height="18" rx="9" fill="#F43F5E" fillOpacity="0.2" stroke="#F43F5E" strokeWidth="1" />
          <text x="8" y="12" fill="#FFFFFF" fontSize="7.5" fontFamily="sans-serif" fontWeight="bold">📷 2s AI Plate Scan</text>
        </g>
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   HOW IT WORKS STEP 4 MINI SVG: CHAT & DARIJA
   ───────────────────────────────────────────────────────────── */
export function StepCoachMiniSVG() {
  return (
    <div className="w-full h-36 relative rounded-2xl overflow-hidden bg-dark-950/80 border border-energy-500/20 flex items-center justify-center p-2 group-hover:border-energy-400/40 transition-colors shadow-inner">
      <svg viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* User chat bubble */}
        <g transform="translate(60, 15)">
          <rect x="0" y="0" width="160" height="28" rx="10" fill="#059669" />
          <text x="10" y="18" fill="#FFFFFF" fontSize="8.5" fontFamily="sans-serif" fontWeight="600">
            A&apos;tini protein rkhiss f l&apos;marché?
          </text>
        </g>

        {/* Coach chat bubble */}
        <g transform="translate(20, 52)">
          <rect x="0" y="0" width="195" height="38" rx="10" fill="#4338CA" />
          <text x="10" y="16" fill="#FFFFFF" fontSize="8.5" fontFamily="sans-serif" fontWeight="bold">
            Coach AI (🇩🇿):
          </text>
          <text x="10" y="29" fill="#C7D2FE" fontSize="8" fontFamily="sans-serif">
            🥚 4 baydat + sardine b el ma!
          </text>
        </g>

        {/* 24/7 status */}
        <g transform="translate(75, 96)">
          <rect x="0" y="0" width="90" height="18" rx="9" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1" />
          <circle cx="10" cy="9" r="3" fill="#34D399" />
          <text x="18" y="13" fill="#A5B4FC" fontSize="7.5" fontFamily="sans-serif" fontWeight="bold">Online 24/7 Voice</text>
        </g>
      </svg>
    </div>
  )
}

