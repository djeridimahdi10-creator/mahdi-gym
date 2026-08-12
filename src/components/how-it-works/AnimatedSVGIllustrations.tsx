'use client'

import React from 'react'

export function ProfileScannerSVG() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-2xl">
      <defs>
        <linearGradient id="profileGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id="scanLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#34D399" stopOpacity="0" />
          <stop offset="50%" stopColor="#34D399" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Outer Card Background */}
      <rect x="20" y="20" width="360" height="260" rx="24" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
      <rect x="20" y="20" width="360" height="260" rx="24" fill="url(#profileGlow)" />

      {/* Grid Pattern overlay */}
      <g opacity="0.15">
        <line x1="20" y1="80" x2="380" y2="80" stroke="#34D399" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="20" y1="140" x2="380" y2="140" stroke="#34D399" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="20" y1="200" x2="380" y2="200" stroke="#34D399" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="120" y1="20" x2="120" y2="280" stroke="#34D399" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="200" y1="20" x2="200" y2="280" stroke="#34D399" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="280" y1="20" x2="280" y2="280" stroke="#34D399" strokeWidth="1" strokeDasharray="4 4" />
      </g>

      {/* Avatar Silhouette */}
      <g transform="translate(140, 50)">
        <circle cx="60" cy="50" r="38" fill="#10B981" opacity="0.15" />
        <circle cx="60" cy="50" r="30" fill="#1E293B" stroke="url(#accentGrad)" strokeWidth="3" />
        <path d="M 60 32 A 18 18 0 1 0 60 68 A 18 18 0 1 0 60 32 Z" fill="#34D399" opacity="0.8" />
        <path d="M 30 130 C 30 95, 90 95, 90 130" fill="none" stroke="url(#accentGrad)" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Biometric Rings around head */}
      <circle cx="200" cy="100" r="55" fill="none" stroke="#34D399" strokeWidth="1.5" strokeDasharray="6 8" opacity="0.5" />
      <circle cx="200" cy="100" r="68" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4 12" opacity="0.4" />

      {/* Interactive Scan Line */}
      <rect x="35" y="70" width="330" height="3" fill="url(#scanLineGrad)">
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,140; 0,0" dur="4s" repeatCount="indefinite" />
      </rect>

      {/* Metric Overlay Cards */}
      <g transform="translate(35, 180)">
        <rect x="0" y="0" width="90" height="60" rx="12" fill="#1E293B" fillOpacity="0.9" stroke="#334155" strokeWidth="1" />
        <text x="12" y="24" fill="#94A3B8" fontSize="10" fontFamily="sans-serif" fontWeight="bold">HEIGHT</text>
        <text x="12" y="46" fill="#34D399" fontSize="16" fontFamily="sans-serif" fontWeight="bold">182 cm</text>
      </g>

      <g transform="translate(155, 180)">
        <rect x="0" y="0" width="90" height="60" rx="12" fill="#1E293B" fillOpacity="0.9" stroke="#334155" strokeWidth="1" />
        <text x="12" y="24" fill="#94A3B8" fontSize="10" fontFamily="sans-serif" fontWeight="bold">WEIGHT</text>
        <text x="12" y="46" fill="#F59E0B" fontSize="16" fontFamily="sans-serif" fontWeight="bold">78.5 kg</text>
      </g>

      <g transform="translate(275, 180)">
        <rect x="0" y="0" width="90" height="60" rx="12" fill="#1E293B" fillOpacity="0.9" stroke="#334155" strokeWidth="1" />
        <text x="12" y="24" fill="#94A3B8" fontSize="10" fontFamily="sans-serif" fontWeight="bold">GOAL</text>
        <text x="12" y="46" fill="#A855F7" fontSize="14" fontFamily="sans-serif" fontWeight="bold">Muscle</text>
      </g>

      {/* Floating Status Badge */}
      <g transform="translate(130, 20)">
        <rect x="0" y="0" width="140" height="28" rx="14" fill="#10B981" fillOpacity="0.2" stroke="#34D399" strokeWidth="1" />
        <circle cx="16" cy="14" r="4" fill="#34D399" />
        <text x="28" y="18" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Biometrics Scanned</text>
      </g>
    </svg>
  )
}

export function AINutritionPlanSVG() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-2xl">
      <defs>
        <linearGradient id="aiBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E1B4B" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="aiSpark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>
      </defs>

      <rect x="20" y="20" width="360" height="260" rx="24" fill="url(#aiBg)" stroke="#312E81" strokeWidth="2" />

      {/* Glowing AI Brain Core Nodes */}
      <g transform="translate(60, 40)">
        <path d="M 40 40 L 140 20 L 240 50 L 180 120 L 70 110 Z" stroke="#818CF8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
        <circle cx="40" cy="40" r="8" fill="#818CF8" opacity="0.8" />
        <circle cx="140" cy="20" r="12" fill="url(#aiSpark)" />
        <circle cx="240" cy="50" r="10" fill="#34D399" />
        <circle cx="180" cy="120" r="9" fill="#F59E0B" />
        <circle cx="70" cy="110" r="11" fill="#C084FC" />
      </g>

      {/* Dynamic Meal Cards Generated */}
      <g transform="translate(45, 140)">
        {/* Card 1 */}
        <rect x="0" y="0" width="95" height="110" rx="16" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
        <rect x="10" y="10" width="75" height="40" rx="10" fill="#312E81" fillOpacity="0.4" />
        <text x="20" y="34" fill="#A5B4FC" fontSize="20">🥣</text>
        <text x="10" y="68" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Oatmeal Bowl</text>
        <text x="10" y="85" fill="#94A3B8" fontSize="9" fontFamily="sans-serif">420 kcal • 24g P</text>
        <rect x="10" y="93" width="75" height="4" rx="2" fill="#334155" />
        <rect x="10" y="93" width="55" height="4" rx="2" fill="#818CF8" />
      </g>

      <g transform="translate(152, 130)">
        {/* Card 2 */}
        <rect x="0" y="0" width="96" height="125" rx="16" fill="#1E293B" stroke="#818CF8" strokeWidth="2" />
        <rect x="0" y="0" width="96" height="125" rx="16" fill="#818CF8" fillOpacity="0.08" />
        <rect x="10" y="10" width="76" height="45" rx="10" fill="#059669" fillOpacity="0.3" />
        <text x="20" y="38" fill="#34D399" fontSize="22">🥗</text>
        <text x="10" y="73" fill="#FFFFFF" fontSize="12" fontFamily="sans-serif" fontWeight="bold">Grilled Salmon</text>
        <text x="10" y="92" fill="#34D399" fontSize="10" fontFamily="sans-serif" fontWeight="bold">650 kcal • 48g P</text>
        <rect x="10" y="102" width="76" height="5" rx="2.5" fill="#334155" />
        <rect x="10" y="102" width="68" height="5" rx="2.5" fill="#34D399" />
      </g>

      <g transform="translate(260, 140)">
        {/* Card 3 */}
        <rect x="0" y="0" width="95" height="110" rx="16" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
        <rect x="10" y="10" width="75" height="40" rx="10" fill="#D97706" fillOpacity="0.3" />
        <text x="20" y="34" fill="#F59E0B" fontSize="20">🍗</text>
        <text x="10" y="68" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Chicken Couscous</text>
        <text x="10" y="85" fill="#94A3B8" fontSize="9" fontFamily="sans-serif">580 kcal • 52g P</text>
        <rect x="10" y="93" width="75" height="4" rx="2" fill="#334155" />
        <rect x="10" y="93" width="60" height="4" rx="2" fill="#F59E0B" />
      </g>

      <g transform="translate(110, 26)">
        <rect x="0" y="0" width="180" height="30" rx="15" fill="#818CF8" fillOpacity="0.25" stroke="#A5B4FC" strokeWidth="1" />
        <text x="18" y="20" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="bold">✨ AI Macro Engine Active</text>
      </g>
    </svg>
  )
}

export function FoodScannerSVG() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-2xl">
      <defs>
        <linearGradient id="scanBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F172A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1E293B" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0" />
          <stop offset="50%" stopColor="#F43F5E" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="20" y="20" width="360" height="260" rx="24" fill="url(#scanBg)" stroke="#334155" strokeWidth="2" />

      {/* Viewfinder Corners */}
      <g stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" opacity="0.9">
        <path d="M 50 70 L 50 50 L 70 50" />
        <path d="M 330 50 L 350 50 L 350 70" />
        <path d="M 50 230 L 50 250 L 70 250" />
        <path d="M 330 250 L 350 250 L 350 230" />
      </g>

      {/* Food Graphic */}
      <g transform="translate(130, 80)">
        <ellipse cx="70" cy="80" rx="65" ry="40" fill="#334155" opacity="0.4" />
        <ellipse cx="70" cy="70" rx="60" ry="36" fill="#1E293B" stroke="#475569" strokeWidth="2" />
        <text x="40" y="80" fontSize="36">🥑</text>
      </g>

      {/* Laser Scan Beam */}
      <rect x="40" y="60" width="320" height="4" fill="url(#laserGrad)">
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,150; 0,0" dur="3s" repeatCount="indefinite" />
      </rect>

      {/* Bounding Box Object Recognition */}
      <rect x="110" y="75" width="160" height="110" rx="12" fill="none" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="190" cy="130" r="4" fill="#FFFFFF" />

      {/* Detection Result Card */}
      <g transform="translate(200, 150)">
        <rect x="0" y="0" width="145" height="75" rx="14" fill="#0F172A" fillOpacity="0.95" stroke="#F43F5E" strokeWidth="1.5" />
        <text x="14" y="24" fill="#FFFFFF" fontSize="12" fontFamily="sans-serif" fontWeight="bold">Avocado Salad</text>
        <text x="14" y="42" fill="#F43F5E" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Confidence: 98.4%</text>
        <text x="14" y="60" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">🔥 340 kcal • 12g P</text>
      </g>

      <g transform="translate(130, 30)">
        <rect x="0" y="0" width="140" height="26" rx="13" fill="#F43F5E" fillOpacity="0.2" stroke="#F43F5E" strokeWidth="1" />
        <text x="16" y="17" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="bold">📷 AI Vision Active</text>
      </g>
    </svg>
  )
}

export function WorkoutTrackerSVG() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-2xl">
      <defs>
        <linearGradient id="gymBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="energyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>

      <rect x="20" y="20" width="360" height="260" rx="24" fill="url(#gymBg)" stroke="#334155" strokeWidth="2" />

      {/* Dumbbell Graphic */}
      <g transform="translate(110, 50)">
        <rect x="30" y="42" width="120" height="16" rx="8" fill="#475569" stroke="#94A3B8" strokeWidth="1" />
        <rect x="15" y="20" width="18" height="60" rx="6" fill="#F59E0B" />
        <rect x="0" y="10" width="18" height="80" rx="6" fill="url(#energyGrad)" />
        <rect x="147" y="20" width="18" height="60" rx="6" fill="#F59E0B" />
        <rect x="162" y="10" width="18" height="80" rx="6" fill="url(#energyGrad)" />
      </g>

      {/* Chart */}
      <g transform="translate(45, 165)">
        <rect x="0" y="0" width="310" height="90" rx="16" fill="#1E293B" stroke="#334155" strokeWidth="1" />
        <text x="16" y="26" fill="#FFFFFF" fontSize="12" fontFamily="sans-serif" fontWeight="bold">Weekly Gym Volume</text>
        
        <g transform="translate(20, 38)">
          <rect x="0" y="20" width="22" height="25" rx="4" fill="#334155" />
          <rect x="40" y="10" width="22" height="35" rx="4" fill="#F59E0B" opacity="0.6" />
          <rect x="80" y="5" width="22" height="40" rx="4" fill="#F59E0B" />
          <rect x="120" y="15" width="22" height="30" rx="4" fill="#334155" />
          <rect x="160" y="2" width="22" height="43" rx="4" fill="url(#energyGrad)" />
          <rect x="200" y="18" width="22" height="27" rx="4" fill="#334155" />
          <rect x="240" y="30" width="22" height="15" rx="4" fill="#334155" />
        </g>
      </g>

      <g transform="translate(130, 24)">
        <rect x="0" y="0" width="140" height="26" rx="13" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1" />
        <text x="16" y="17" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="bold">💪 Gym Workouts</text>
      </g>
    </svg>
  )
}

export function DarijaCoachSVG() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-2xl">
      <defs>
        <linearGradient id="chatBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E1B4B" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="userBubble" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id="aiBubble" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4338CA" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>

      <rect x="20" y="20" width="360" height="260" rx="24" fill="url(#chatBg)" stroke="#4338CA" strokeWidth="2" />

      {/* Header bar */}
      <g transform="translate(35, 35)">
        <circle cx="16" cy="16" r="16" fill="#6366F1" />
        <text x="10" y="22" fill="#FFFFFF" fontSize="14">🤖</text>
        <text x="42" y="16" fill="#FFFFFF" fontSize="13" fontFamily="sans-serif" fontWeight="bold">NutriCoach AI</text>
        <text x="42" y="28" fill="#34D399" fontSize="10" fontFamily="sans-serif">Active • Darija & English</text>
      </g>

      {/* User Message */}
      <g transform="translate(125, 85)">
        <rect x="0" y="0" width="230" height="42" rx="16" fill="url(#userBubble)" />
        <text x="14" y="25" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="500">Wach mlih nakol bzzed el protein?</text>
      </g>

      {/* AI Coach Reply */}
      <g transform="translate(35, 140)">
        <rect x="0" y="0" width="265" height="65" rx="16" fill="url(#aiBubble)" />
        <text x="14" y="24" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="600">Saha! Yah, 2g protein/kg mliha bezzaf</text>
        <text x="14" y="44" fill="#E0E7FF" fontSize="10" fontFamily="sans-serif">bach tbni el muscle w tzyd f taqa dialk! 🎯</text>
      </g>

      {/* Typing indicator */}
      <g transform="translate(35, 218)">
        <rect x="0" y="0" width="80" height="32" rx="16" fill="#1E293B" stroke="#475569" strokeWidth="1" />
        <circle cx="24" cy="16" r="4" fill="#6366F1" />
        <circle cx="40" cy="16" r="4" fill="#818CF8" />
        <circle cx="56" cy="16" r="4" fill="#C084FC" />
      </g>

      <g transform="translate(230, 32)">
        <rect x="0" y="0" width="125" height="24" rx="12" fill="#6366F1" fillOpacity="0.3" stroke="#818CF8" strokeWidth="1" />
        <text x="12" y="16" fill="#FFFFFF" fontSize="10" fontFamily="sans-serif" fontWeight="bold">🇩🇿 Darija Support</text>
      </g>
    </svg>
  )
}
