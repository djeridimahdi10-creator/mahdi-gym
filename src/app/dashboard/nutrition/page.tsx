'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/stores/authStore'
import { useNutritionStore } from '@/stores/nutritionStore'
import {
  MealTimeline,
  SmartMealReplacerModal,
  AdvancedFoodScannerModal,
  VoiceFoodLoggerModal,
  SmartFoodSwapsModal,
  ProgressDiagnosticModal,
  RestaurantModeModal,
  AIGroceryListModal,
  WhatIfSimulator,
  AskMyDataDrawer,
  FoodLibraryModal,
} from '@/components/nutrition'
import {
  Flame,
  Droplets,
  UtensilsCrossed,
  Zap,
  Search,
  Camera,
  Sparkles,
  BarChart3,
  TrendingUp,
  ArrowRight,
  Plus,
  Minus,
  ChevronDown,
  ScanLine,
  ShoppingCart,
  BrainCircuit,
  SlidersHorizontal,
} from 'lucide-react'

/* ────────────────────────────────────────────
   SVG Circular Progress Ring
   ──────────────────────────────────────────── */
function ProgressRing({
  percent,
  color,
  size = 140,
  strokeWidth = 11,
}: {
  percent: number
  color: string
  size?: number
  strokeWidth?: number
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(percent, 100) / 100) * circumference

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ filter: `drop-shadow(0 0 8px ${color}60)` }}
      />
    </svg>
  )
}

/* ────────────────────────────────────────────
   Progress Bar (linear)
   ──────────────────────────────────────────── */
function ProgressBar({
  percent,
  color,
  delay = 0,
}: {
  percent: number
  color: string
  delay?: number
}) {
  return (
    <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}aa)`, boxShadow: `0 0 12px ${color}40` }}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(percent, 100)}%` }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

/* ────────────────────────────────────────────
   Section Wrapper
   ──────────────────────────────────────────── */
function Section({
  title,
  subtitle,
  children,
  delay = 0,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  delay?: number
}) {
  return (
    <motion.section
      className="space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div>
        <h2 className="nutrition-section-title">{title}</h2>
        {subtitle && (
          <p className="text-slate-400 text-sm mt-1.5 leading-relaxed max-w-xl">{subtitle}</p>
        )}
      </div>
      {children}
    </motion.section>
  )
}

/* ────────────────────────────────────────────
   Tool Card — Large illustrated feature card
   ──────────────────────────────────────────── */
function ToolCard({
  iconNode,
  title,
  description,
  color,
  onClick,
  delay = 0,
}: {
  iconNode: React.ReactNode
  title: string
  description: string
  color: string
  onClick: () => void
  delay?: number
}) {
  return (
    <motion.button
      onClick={onClick}
      className="nutrition-card nutrition-card-interactive text-left p-6 sm:p-7 flex flex-col gap-3 group"
      style={{ borderColor: `${color}18` }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${color}12`, border: `1px solid ${color}28`, color }}
        >
          {iconNode}
        </div>
        <motion.div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.04)' }}
          whileHover={{ x: 3 }}
        >
          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
        </motion.div>
      </div>
      <h3 className="text-white font-bold text-base tracking-tight">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </motion.button>
  )
}

/* ════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════ */
export default function NutritionPage() {
  const { profile } = useAuthStore()
  const {
    meals,
    toggleMealEaten,
    waterConsumed,
    waterTarget,
    updateWater,
    dailyCalories,
    targetMacros,
    todayWorkout,
    setModalOpen,
  } = useNutritionStore()

  const [showAllTools, setShowAllTools] = useState(false)

  // ── Computed intake totals ──
  const intake = useMemo(() => {
    const eaten = meals.filter((m) => m.eaten)
    const calories = eaten.reduce((acc, m) => acc + m.totalCalories, 0)
    const protein = eaten.reduce(
      (acc, m) =>
        acc + m.foods.reduce((sum, f) => sum + (f.protein || Math.round((f.calories * 0.28) / 4)), 0),
      0
    )
    const carbs = eaten.reduce(
      (acc, m) =>
        acc + m.foods.reduce((sum, f) => sum + (f.carbs || Math.round((f.calories * 0.42) / 4)), 0),
      0
    )
    const fat = eaten.reduce(
      (acc, m) =>
        acc + m.foods.reduce((sum, f) => sum + (f.fat || Math.round((f.calories * 0.30) / 9)), 0),
      0
    )
    return { calories, protein, carbs, fat, mealsLogged: eaten.length, totalMeals: meals.length }
  }, [meals])

  const adaptedCalories = dailyCalories + (todayWorkout ? todayWorkout.caloriesBonus : 0)
  const adaptedProtein = targetMacros.protein + (todayWorkout ? todayWorkout.proteinBonus : 0)
  const adaptedCarbs = targetMacros.carbs
  const adaptedFat = targetMacros.fat

  const calPercent = Math.round((intake.calories / (adaptedCalories || 1)) * 100)
  const protPercent = Math.round((intake.protein / (adaptedProtein || 1)) * 100)
  const carbPercent = Math.round((intake.carbs / (adaptedCarbs || 1)) * 100)
  const fatPercent = Math.round((intake.fat / (adaptedFat || 1)) * 100)
  const waterPercent = Math.round((waterConsumed / (waterTarget || 1)) * 100)
  const mealPercent = Math.round((intake.mealsLogged / (intake.totalMeals || 1)) * 100)

  const remainingCal = Math.max(0, adaptedCalories - intake.calories)

  const userName = profile?.full_name ? profile.full_name.split(' ')[0] : 'Athlete'
  const userGoal = profile?.goal || 'Muscle Gain'

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  // Hydration insight
  const hydrationBehind = waterConsumed < waterTarget * 0.7
  const hydrationGapMl = Math.max(0, Math.round((waterTarget - waterConsumed) * 1000))

  // ── Primary tools (always visible) ──
  const primaryTools = [
    {
      iconNode: <Search className="w-6 h-6" />,
      title: 'Food Library',
      description: 'Browse 500+ foods with instant calorie lookup and one-tap logging.',
      color: '#00F0FF',
      onClick: () => setModalOpen('foodlibrary', true),
    },
    {
      iconNode: <Camera className="w-6 h-6" />,
      title: 'AI Food Scanner',
      description: 'Snap a photo of any meal — AI identifies ingredients and logs calories.',
      color: '#f43f5e',
      onClick: () => setModalOpen('scanner', true),
    },
    {
      iconNode: <Sparkles className="w-6 h-6" />,
      title: 'AI Nutrition Coach',
      description: 'Ask anything about your diet. Get personalized, data-driven advice.',
      color: '#a855f7',
      onClick: () => setModalOpen('askdata', true),
    },
  ]

  // ── Secondary tools (expandable) ──
  const secondaryTools = [
    {
      iconNode: <BarChart3 className="w-6 h-6" />,
      title: 'Progress Diagnostics',
      description: 'Weekly trends, nutrition score, and actionable insights.',
      color: '#3b82f6',
      onClick: () => setModalOpen('diagnostic', true),
    },
    {
      iconNode: <ShoppingCart className="w-6 h-6" />,
      title: 'Smart Grocery List',
      description: 'Auto-generated shopping list from your meal plan.',
      color: '#10b981',
      onClick: () => setModalOpen('grocery', true),
    },
    {
      iconNode: <ScanLine className="w-6 h-6" />,
      title: 'Restaurant Mode',
      description: 'Estimate calories when eating out at restaurants.',
      color: '#fbbf24',
      onClick: () => setModalOpen('restaurant', true),
    },
    {
      iconNode: <BrainCircuit className="w-6 h-6" />,
      title: 'What-If Simulator',
      description: 'See how changes affect your goals before committing.',
      color: '#ec4899',
      onClick: () => setModalOpen('whatif', true),
    },
    {
      iconNode: <SlidersHorizontal className="w-6 h-6" />,
      title: 'Smart Food Swaps',
      description: 'AI-powered alternatives to optimize your macros.',
      color: '#06b6d4',
      onClick: () => setModalOpen('swaps', true),
    },
    {
      iconNode: <Zap className="w-6 h-6" />,
      title: 'Voice Food Logger',
      description: 'Speak your meal — AI logs it automatically.',
      color: '#8b5cf6',
      onClick: () => setModalOpen('voice', true),
    },
  ]

  return (
    <div className="w-full space-y-10 sm:space-y-12 pb-28 md:pb-12">
      {/* ═══════════════════════════════════════
          1. NUTRITION OVERVIEW — Hero + Metrics + Water
          ═══════════════════════════════════════ */}
      <Section
        title={`${greeting}, ${userName}`}
        subtitle={`Goal: ${userGoal} · Target: ${adaptedCalories.toLocaleString()} kcal${todayWorkout ? ` · ${todayWorkout.name}` : ''}`}
        delay={0.05}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {/* ── Hero Card: Calorie Ring + Macros ── */}
          <motion.div
            className="nutrition-card p-6 sm:p-8 lg:col-span-2 flex flex-col sm:flex-row items-center gap-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            style={{ borderColor: 'rgba(0,240,255,0.15)' }}
          >
            {/* Left: Large Calorie Ring */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <div className="relative">
                <ProgressRing percent={calPercent} color="#00F0FF" size={150} strokeWidth={12} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="nutrition-metric text-3xl text-white">{intake.calories.toLocaleString()}</span>
                  <span className="text-[11px] text-slate-500 font-medium mt-0.5">kcal eaten</span>
                </div>
              </div>
              <div className="text-center">
                <span className="text-sm font-semibold" style={{ color: calPercent > 90 ? '#10b981' : '#00F0FF' }}>
                  {remainingCal.toLocaleString()} remaining
                </span>
              </div>
            </div>

            {/* Right: Macro Breakdown */}
            <div className="flex-1 w-full space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-semibold text-white">Protein</span>
                  </div>
                  <span className="text-sm font-bold tabular-nums" style={{ color: '#FFB300' }}>
                    {intake.protein}g / {adaptedProtein}g
                  </span>
                </div>
                <ProgressBar percent={protPercent} color="#FFB300" delay={0.3} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-semibold text-white">Carbs</span>
                  </div>
                  <span className="text-sm font-bold tabular-nums" style={{ color: '#A855F7' }}>
                    {intake.carbs}g / {adaptedCarbs}g
                  </span>
                </div>
                <ProgressBar percent={carbPercent} color="#A855F7" delay={0.4} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-rose-400" />
                    <span className="text-sm font-semibold text-white">Fat</span>
                  </div>
                  <span className="text-sm font-bold tabular-nums" style={{ color: '#FF5C8D' }}>
                    {intake.fat}g / {adaptedFat}g
                  </span>
                </div>
                <ProgressBar percent={fatPercent} color="#FF5C8D" delay={0.5} />
              </div>
              {/* Meals summary */}
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-white">Meals logged</span>
                </div>
                <span className="text-sm font-bold text-emerald-400">
                  {intake.mealsLogged} / {intake.totalMeals}
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Hydration Card ── */}
          <motion.div
            className="nutrition-card p-6 sm:p-7 flex flex-col justify-between gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            style={{ borderColor: 'rgba(59,130,246,0.15)' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)' }}
                >
                  <Droplets className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-white font-semibold">Hydration</span>
              </div>
              <span className="text-blue-400 text-sm font-bold">{waterPercent}%</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="nutrition-metric text-3xl text-white">{waterConsumed.toFixed(1)}</span>
                <span className="text-slate-500 text-sm font-medium">/ {waterTarget}L</span>
              </div>
              <ProgressBar percent={waterPercent} color="#3b82f6" delay={0.35} />
              {hydrationBehind && (
                <p className="text-blue-300/80 text-xs mt-2">
                  {hydrationGapMl}ml behind — drink a glass before your next meal
                </p>
              )}
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() => updateWater(-0.25)}
                  disabled={waterConsumed <= 0}
                  className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl text-xs font-bold text-slate-300 transition-all disabled:opacity-30"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <Minus className="w-3 h-3" />
                  250ml
                </button>
                <button
                  onClick={() => updateWater(0.25)}
                  className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl text-xs font-bold text-blue-300 transition-all hover:bg-blue-500/20"
                  style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)' }}
                >
                  <Plus className="w-3 h-3" />
                  250ml
                </button>
                <button
                  onClick={() => updateWater(0.5)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:brightness-110"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', boxShadow: '0 2px 12px rgba(59,130,246,0.3)' }}
                >
                  + 500ml
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════
          2. TODAY'S MEALS
          ═══════════════════════════════════════ */}
      <Section title="Today's Meals" subtitle="Tap a meal to mark it as eaten. Your progress updates instantly." delay={0.15}>
        <MealTimeline meals={meals} onToggleMeal={toggleMealEaten} />
      </Section>

      {/* ═══════════════════════════════════════
          3. AI INSIGHT — Inline coaching card
          ═══════════════════════════════════════ */}
      <motion.section
        className="nutrition-card overflow-hidden"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        style={{ borderColor: 'rgba(168,85,247,0.18)' }}
      >
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, #a855f7, #00F0FF, #10b981)' }} />
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.25)' }}
          >
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-base">AI Insight</h3>
            <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">
              {hydrationBehind ? (
                <>
                  You&apos;re <span className="text-blue-400 font-semibold">{hydrationGapMl}ml behind</span> on
                  hydration today. Try drinking a full glass of water before your next meal — it
                  supports digestion and helps you feel more satisfied.
                </>
              ) : (
                <>
                  Great consistency! You were <span className="text-amber-400 font-semibold">14g below your protein target</span>{' '}
                  yesterday. Consider adding a high-protein snack this afternoon to stay on track.
                </>
              )}
            </p>
          </div>
          <button
            onClick={() => setModalOpen('askdata', true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-purple-500/20 flex-shrink-0"
            style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.25)', color: '#c084fc' }}
          >
            Ask AI
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════
          4. TOOLS — Primary + Expandable Secondary
          ═══════════════════════════════════════ */}
      <Section title="Tools" subtitle="Your nutrition toolkit — search, scan, coach, and more." delay={0.3}>
        {/* Primary tools */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {primaryTools.map((tool, i) => (
            <ToolCard key={tool.title} {...tool} delay={0.35 + i * 0.05} />
          ))}
        </div>

        {/* Expandable secondary tools */}
        <div className="mt-4">
          <button
            onClick={() => setShowAllTools(!showAllTools)}
            className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <motion.div animate={{ rotate: showAllTools ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
            {showAllTools ? 'Show fewer tools' : `Show ${secondaryTools.length} more tools`}
          </button>

          <AnimatePresence>
            {showAllTools && (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 mt-5"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {secondaryTools.map((tool, i) => (
                  <ToolCard key={tool.title} {...tool} delay={i * 0.04} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Section>

      {/* ═══════════════════════════════════════
          MODALS & DRAWERS
          ═══════════════════════════════════════ */}
      <SmartMealReplacerModal />
      <AdvancedFoodScannerModal />
      <VoiceFoodLoggerModal />
      <SmartFoodSwapsModal />
      <ProgressDiagnosticModal />
      <RestaurantModeModal />
      <AIGroceryListModal />
      <WhatIfSimulator />
      <AskMyDataDrawer />
      <FoodLibraryModal />
    </div>
  )
}
