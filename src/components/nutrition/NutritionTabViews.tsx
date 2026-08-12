'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles, MessageSquare, ChartLine, Salad, Activity, BrainCircuit, Camera, Mic, RefreshCw,
  UtensilsCrossed, Globe, ShoppingBasket, Sliders, CalendarDays, Dumbbell, Zap, Droplets, Flame,
  CheckCircle2, ChevronRight,
} from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { TodayAIBriefing } from './TodayAIBriefing'
import { TodayNutritionCore } from './TodayNutritionCore'
import { AdaptiveDailyTarget } from './AdaptiveDailyTarget'
import { NutritionScoreCard } from './NutritionScoreCard'
import { MealTimeline } from './MealTimeline'
import { HydrationIntelligence } from './HydrationIntelligence'
import { DailyMissionsCard } from './DailyMissionsCard'
import { NextMealRecommendation } from './NextMealRecommendation'
import { AICoachInsights } from './AICoachInsights'
import { SatietyTracker } from './SatietyTracker'
import { WorkoutNutritionBridge } from './WorkoutNutritionBridge'
import { AlgerianFoodHub } from './AlgerianFoodHub'
import { WeeklyAIReview } from './WeeklyAIReview'
import { GoalForecastCard } from './GoalForecastCard'
import { NutritionProgress } from './NutritionProgress'
import { SectionHeading } from './SectionHeading'
import { FeatureCard } from './FeatureCard'
import { NUTRITION_TABS, NutritionTabId } from './nutritionTabs'

/* ── Shared entrance choreography ── */
const gridContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

const gridItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ══════════════════════════════════════════════════════════════
   1. OVERVIEW — "How am I doing today?"
   ══════════════════════════════════════════════════════════════ */
export function OverviewTab({ onNavigate }: { onNavigate: (tab: NutritionTabId) => void }) {
  const {
    meals, dailyCalories, targetMacros, waterConsumed, waterTarget, updateWater, todayWorkout, setModalOpen,
  } = useNutritionStore()

  const totals = useMemo(() => {
    const eaten = meals.filter((m) => m.eaten)
    const calories = eaten.reduce((acc, m) => acc + m.totalCalories, 0)
    const protein = eaten.reduce(
      (acc, m) => acc + m.foods.reduce((sum, f) => sum + (f.protein || Math.round((f.calories * 0.28) / 4)), 0),
      0
    )
    const carbs = eaten.reduce(
      (acc, m) => acc + m.foods.reduce((sum, f) => sum + (f.carbs || Math.round((f.calories * 0.42) / 4)), 0),
      0
    )
    const fat = eaten.reduce(
      (acc, m) => acc + m.foods.reduce((sum, f) => sum + (f.fat || Math.round((f.calories * 0.3) / 9)), 0),
      0
    )
    return { calories, protein, carbs, fat, mealsLogged: eaten.length, totalMeals: meals.length }
  }, [meals])

  const bonusCal = todayWorkout ? todayWorkout.caloriesBonus : 0
  const bonusProt = todayWorkout ? todayWorkout.proteinBonus : 0
  const adaptedCalories = dailyCalories + bonusCal
  const adaptedProtein = targetMacros.protein + bonusProt

  const quickActions = [
    { id: 'askdata', label: 'Ask AI', icon: Sparkles, color: '#00F0FF', emoji: '🔮' },
    { id: 'scanner', label: 'Scan Food', icon: Camera, color: '#f43f5e', emoji: '📸' },
    { id: 'voice', label: 'Voice Log', icon: Mic, color: '#a855f7', emoji: '🎤' },
    { id: 'whatif', label: 'Simulator', icon: Sliders, color: '#c084fc', emoji: '🔮' },
    { id: 'diagnostic', label: 'Diagnostic', icon: Activity, color: '#3b82f6', emoji: '🩺' },
    { id: 'grocery', label: 'Grocery List', icon: ShoppingBasket, color: '#10b981', emoji: '🛒' },
  ]

  return (
    <div className="space-y-12 lg:space-y-16">
      {/* Today's AI Briefing — the first thing you read */}
      <TodayAIBriefing />

      {/* Interactive 3D Nutrition Core + the four essential indicators */}
      <div className="space-y-6">
        <SectionHeading
          emoji="🏠"
          title="Today&apos;s Nutrition"
          subtitle="A live snapshot of where you stand right now — nothing more, nothing hidden."
        />
        <TodayNutritionCore
          calories={{ current: totals.calories, target: adaptedCalories, unit: 'kcal' }}
          protein={{ current: totals.protein, target: adaptedProtein, unit: 'g' }}
          carbs={{ current: totals.carbs, target: targetMacros.carbs, unit: 'g' }}
          fat={{ current: totals.fat, target: targetMacros.fat, unit: 'g' }}
          water={{ current: waterConsumed, target: waterTarget, unit: 'L' }}
          onWaterChange={updateWater}
          mealsLogged={totals.mealsLogged}
          totalMeals={totals.totalMeals}
        />
      </div>

      {/* Adaptive Daily Targets — four large cards */}
      <div className="space-y-6">
        <SectionHeading
          emoji="⚡"
          title="Adaptive Daily Targets"
          subtitle="Your targets adapt automatically based on today&apos;s activity and workout. No guesswork."
        />
        <AdaptiveDailyTarget />
      </div>

      {/* Nutrition Intelligence score */}
      <div className="space-y-6">
        <SectionHeading
          emoji="🧠"
          title="Nutrition Intelligence"
          subtitle="Your daily score across five quality pillars, with the weakest area automatically flagged."
        />
        <NutritionScoreCard />
      </div>

      {/* Quick actions */}
      <div className="space-y-6">
        <SectionHeading
          emoji="⚡"
          title="Quick Actions"
          subtitle="Jump straight into the tools you use most."
        />
        <motion.div
          variants={gridContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {quickActions.map((act) => {
            const Icon = act.icon
            return (
              <motion.div key={act.id} variants={gridItem}>
                <button
                  onClick={() => setModalOpen(act.id, true)}
                  className="w-full flex items-center gap-4 p-5 rounded-2xl text-left transition-all hover:-translate-y-0.5 cursor-pointer"
                  style={{ background: 'rgba(17,23,36,0.9)', border: `1px solid ${act.color}28` }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${act.color}14`, border: `1px solid ${act.color}30` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: act.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">{act.label}</p>
                    <p className="text-xs text-slate-500">One tap to launch</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              </motion.div>
            )
          })}
          <motion.div variants={gridItem}>
            <button
              onClick={() => onNavigate('nutrition')}
              className="w-full flex items-center gap-4 p-5 rounded-2xl text-left transition-all hover:-translate-y-0.5 cursor-pointer"
              style={{ background: 'rgba(17,23,36,0.9)', border: '1px solid rgba(168,85,247,0.28)' }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(168,85,247,0.14)', border: '1px solid rgba(168,85,247,0.3)' }}
              >
                <Salad className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">Plan My Meals</p>
                <p className="text-xs text-slate-500">Log, swap &amp; complete today&apos;s plan</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   2. MY NUTRITION — meals, macros, hydration, recommendations
   ══════════════════════════════════════════════════════════════ */
export function MyNutritionTab() {
  const { meals, toggleMealEaten } = useNutritionStore()
  const eatenCount = meals.filter((m) => m.eaten).length

  return (
    <div className="space-y-12 lg:space-y-16">
      {/* Today's Meals — one large card per meal */}
      <div className="space-y-6">
        <SectionHeading
          emoji="🍽️"
          title="Today&apos;s Meals"
          subtitle="Each meal gets its own card. Expand it to see ingredients, or log it to update your intake live."
          right={
            <span
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-emerald-400"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}
            >
              <CheckCircle2 className="w-4 h-4" />
              {eatenCount} / {meals.length} eaten
            </span>
          }
        />
        <MealTimeline meals={meals} onToggleMeal={toggleMealEaten} />
      </div>

      {/* Hydration + daily missions */}
      <div className="space-y-6">
        <SectionHeading
          emoji="💧"
          title="Hydration & Daily Missions"
          subtitle="Stay on pace with water and complete your four daily consistency missions."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HydrationIntelligence />
          <DailyMissionsCard />
        </div>
      </div>

      {/* AI meal recommendation — the "eat next" engine */}
      <div className="space-y-6">
        <SectionHeading
          emoji="🍴"
          title="What Should I Eat Next?"
          subtitle="The AI picks the highest-value meal for your remaining macro budget."
        />
        <NextMealRecommendation />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   3. AI COACH — briefing, ask, analyze, diagnose
   ══════════════════════════════════════════════════════════════ */
export function AICoachTab({ onNavigate }: { onNavigate: (tab: NutritionTabId) => void }) {
  const { setModalOpen } = useNutritionStore()

  const features = [
    {
      icon: Sparkles,
      title: 'AI Daily Briefing',
      description: 'Your personalized morning read: what is going well, what needs attention today.',
      actionLabel: 'Open Briefing',
      accent: '#00F0FF',
      onClick: () => onNavigate('overview'),
    },
    {
      icon: MessageSquare,
      title: 'Ask My Data',
      description: 'Ask questions about your nutrition, meals, workouts, and progress — in plain language.',
      actionLabel: 'Ask AI',
      accent: '#c084fc',
      badge: 'Active',
      onClick: () => setModalOpen('askdata', true),
    },
    {
      icon: ChartLine,
      title: 'Analyze My Progress',
      description: 'Weekly adherence, calorie curves, score trends, and where your goal is heading.',
      actionLabel: 'Open Analytics',
      accent: '#10b981',
      onClick: () => onNavigate('progress'),
    },
    {
      icon: Salad,
      title: 'AI Meal Recommendations',
      description: 'Smart meal picks matched to your remaining calories, protein, and budget.',
      actionLabel: 'See Recommendation',
      accent: '#FFB300',
      onClick: () => onNavigate('nutrition'),
    },
    {
      icon: Activity,
      title: 'AI Diagnostics',
      description: '“Why am I not progressing?” — a deep audit of nutrition, adherence, and training.',
      actionLabel: 'Run Diagnostic',
      accent: '#3b82f6',
      onClick: () => setModalOpen('diagnostic', true),
    },
    {
      icon: BrainCircuit,
      title: 'Habit Intelligence',
      description: 'Patterns discovered from your data — like how meal timing affects your satiety.',
      actionLabel: 'Discover Patterns',
      accent: '#FF5C8D',
      onClick: () => scrollToId('habit-intelligence'),
    },
  ]

  return (
    <div className="space-y-12 lg:space-y-16">
      <div className="space-y-6">
        <SectionHeading
          emoji="🤖"
          title="AI Coach"
          subtitle="Your 24/7 nutrition brain. Pick a capability — everything lives one tap away."
        />
        <motion.div
          variants={gridContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={gridItem} className="h-full">
              <FeatureCard
                icon={f.icon}
                title={f.title}
                description={f.description}
                actionLabel={f.actionLabel}
                accent={f.accent}
                badge={f.badge}
                onClick={f.onClick}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Live recommendations */}
      <div className="space-y-6">
        <SectionHeading
          emoji="⚡"
          title="Live Coach Recommendations"
          subtitle="Real-time, actionable guidance based on your current intake and training load."
        />
        <AICoachInsights tips={[]} onRegenerate={() => {}} loading={false} />
      </div>

      {/* Habit intelligence */}
      <div id="habit-intelligence" className="space-y-6 scroll-mt-24">
        <SectionHeading
          emoji="🧠"
          title="Habit Intelligence"
          subtitle="AI patterns discovered from your meal logs — correlate food choices with how hungry you feel."
        />
        <SatietyTracker />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   4. TRAINING & RECOVERY — workout ↔ nutrition
   ══════════════════════════════════════════════════════════════ */
export function TrainingTab() {
  const { todayWorkout } = useNutritionStore()

  return (
    <div className="space-y-12 lg:space-y-16">
      <div className="space-y-6">
        <SectionHeading
          emoji="🏋️"
          title="Training & Recovery"
          subtitle="Fuel today&apos;s session — before, during, and after. Synced with Iron Command Gym."
        />

        {todayWorkout ? (
          <div
            className="relative overflow-hidden rounded-3xl p-7 sm:p-9"
            style={{
              background: 'linear-gradient(135deg, rgba(124,92,252,0.12) 0%, rgba(17,23,36,0.95) 55%, rgba(0,240,255,0.05) 100%)',
              border: '1px solid rgba(124,92,252,0.3)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center border border-purple-500/30 flex-shrink-0">
                  <Dumbbell className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-purple-400">Today&apos;s Workout</p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {todayWorkout.name}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    {todayWorkout.isHeavy ? 'Heavy session — recovery nutrition matters today.' : 'Standard session.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold text-amber-400"
                  style={{ background: 'rgba(255,179,0,0.1)', border: '1px solid rgba(255,179,0,0.3)' }}
                >
                  <Zap className="w-4 h-4" /> +{todayWorkout.caloriesBonus} kcal bonus
                </span>
                <span
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold text-purple-300"
                  style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.3)' }}
                >
                  <Flame className="w-4 h-4" /> +{todayWorkout.proteinBonus}g protein bonus
                </span>
                <span
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold text-emerald-400"
                  style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}
                >
                  <CheckCircle2 className="w-4 h-4" /> Synced with Iron Command
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="rounded-3xl p-8 text-center"
            style={{ background: 'rgba(17,23,36,0.92)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <p className="text-2xl font-bold text-white">Rest Day 🧘</p>
            <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
              No workout detected today. Your baseline targets stand as-is — keep hydration high and protein steady to support recovery.
            </p>
          </div>
        )}

        <WorkoutNutritionBridge />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   5. SMART FOOD — scanner, voice, swaps, Algerian food
   ══════════════════════════════════════════════════════════════ */
export function SmartFoodTab() {
  const { setModalOpen } = useNutritionStore()

  const features = [
    {
      icon: Camera,
      emoji: '📸',
      title: 'Scan Food',
      description: 'Snap a picture of your meal and let the AI detect the dishes and estimate macros.',
      actionLabel: 'Open Scanner',
      accent: '#f43f5e',
      onClick: () => setModalOpen('scanner', true),
    },
    {
      icon: Mic,
      emoji: '🎤',
      title: 'Voice Log',
      description: 'Tell the AI what you ate — in English or with Algerian dish names. Hands-free logging.',
      actionLabel: 'Start Voice Log',
      accent: '#a855f7',
      onClick: () => setModalOpen('voice', true),
    },
    {
      icon: RefreshCw,
      emoji: '🔄',
      title: 'Smart Food Swap',
      description: 'Find a healthier or more suitable alternative that fits your remaining macros.',
      actionLabel: 'Swap a Meal',
      accent: '#10b981',
      onClick: () => setModalOpen('swap', true, 2),
    },
    {
      icon: UtensilsCrossed,
      emoji: '🍽️',
      title: 'Restaurant Mode',
      description: 'Eating outside? Match menu items to your remaining targets and get a fit score.',
      actionLabel: 'Open Restaurant Mode',
      accent: '#FFB300',
      onClick: () => setModalOpen('restaurant', true),
    },
    {
      icon: Globe,
      emoji: '🇩🇿',
      title: 'Algerian Food AI',
      description: 'Understand local Algerian dishes — exact macros for Couscous, Rechta, Chorba and more.',
      actionLabel: 'Explore the Kitchen',
      accent: '#10b981',
      badge: 'DZ',
      onClick: () => scrollToId('algerian-hub'),
    },
  ]

  return (
    <div className="space-y-12 lg:space-y-16">
      <div className="space-y-6">
        <SectionHeading
          emoji="🍴"
          title="Smart Food"
          subtitle="Point, speak, swap or explore — effortless food intelligence, one capability at a time."
        />
        <motion.div
          variants={gridContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={gridItem} className="h-full">
              <FeatureCard
                icon={f.icon}
                emoji={f.emoji}
                title={f.title}
                description={f.description}
                actionLabel={f.actionLabel}
                accent={f.accent}
                badge={f.badge}
                onClick={f.onClick}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Algerian Food Intelligence */}
      <div id="algerian-hub" className="space-y-6 scroll-mt-24">
        <SectionHeading
          emoji="🇩🇿"
          title="Algerian Food Intelligence"
          subtitle="Traditional Algerian dishes mapped to exact nutritional macros — search, browse, and log in one tap."
        />
        <AlgerianFoodHub />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   6. PROGRESS — trends, score, forecast, weekly AI review
   ══════════════════════════════════════════════════════════════ */
export function ProgressTab() {
  const { dailyCalories, todayWorkout } = useNutritionStore()
  const adaptedCalories = dailyCalories + (todayWorkout ? todayWorkout.caloriesBonus : 0)

  return (
    <div className="space-y-12 lg:space-y-16">
      <div className="space-y-6">
        <SectionHeading
          emoji="📊"
          title="Progress & Insights"
          subtitle="How you&apos;ve done, where you&apos;re headed, and what the AI learned from your week."
        />
        <WeeklyAIReview />
      </div>

      <div className="space-y-6">
        <SectionHeading
          emoji="🎯"
          title="Goal Forecast"
          subtitle="Your estimated weight trajectory based on current adherence and energy balance."
        />
        <GoalForecastCard />
      </div>

      <div className="space-y-6">
        <SectionHeading
          emoji="📈"
          title="Weekly Nutrition Analytics"
          subtitle="Adherence by day, your calorie intake curve, and an expandable micronutrient radar."
        />
        <NutritionProgress targetCalories={adaptedCalories} />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   7. TOOLS — secondary power-user utilities
   ══════════════════════════════════════════════════════════════ */
export function ToolsTab({ onNavigate }: { onNavigate: (tab: NutritionTabId) => void }) {
  const { setModalOpen } = useNutritionStore()

  const features = [
    {
      icon: ShoppingBasket,
      emoji: '🛒',
      title: 'AI Grocery List',
      description: 'Auto-grouped shopping list into Protein, Carbs, Veggies & Algerian Staples.',
      actionLabel: 'Generate List',
      accent: '#10b981',
      onClick: () => setModalOpen('grocery', true),
    },
    {
      icon: Sliders,
      emoji: '🔀',
      title: 'What-If Simulator',
      description: 'Simulate calorie surplus or deficit and project 12-week body composition changes.',
      actionLabel: 'Open Simulator',
      accent: '#a855f7',
      onClick: () => setModalOpen('whatif', true),
    },
    {
      icon: RefreshCw,
      emoji: '🔁',
      title: 'Meal Replacement',
      description: 'Swap any planned meal for a balanced alternative that fits your macro targets.',
      actionLabel: 'Replace a Meal',
      accent: '#00F0FF',
      onClick: () => setModalOpen('replace', true, 2),
    },
    {
      icon: CalendarDays,
      emoji: '📅',
      title: 'Meal Planner',
      description: 'Review and complete today&apos;s full meal plan — log, expand and adjust.',
      actionLabel: 'Open My Meal Plan',
      accent: '#FFB300',
      onClick: () => onNavigate('nutrition'),
    },
  ]

  return (
    <div className="space-y-12 lg:space-y-16">
      <div className="space-y-6">
        <SectionHeading
          emoji="🛠️"
          title="Nutrition Tools"
          subtitle="Power-user utilities, kept out of the main flow. Every tool is also one tap away in the floating bar."
        />
        <motion.div
          variants={gridContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={gridItem} className="h-full">
              <FeatureCard
                icon={f.icon}
                emoji={f.emoji}
                title={f.title}
                description={f.description}
                actionLabel={f.actionLabel}
                accent={f.accent}
                onClick={f.onClick}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div
        className="flex items-start gap-4 p-6 rounded-3xl"
        style={{ background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.18)' }}
      >
        <Droplets className="w-5 h-5 text-[#00F0FF] flex-shrink-0 mt-0.5" />
        <div className="text-sm text-slate-300 leading-relaxed">
          <strong className="text-white">Pro tip:</strong> keep the main experience focused — the floating action bar at the bottom
          gives you instant access to every tool from anywhere in the Nutrition Hub.
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   VIEW REGISTRY
   ══════════════════════════════════════════════════════════════ */
export type NutritionTabProps = { onNavigate: (tab: NutritionTabId) => void }

export const NUTRITION_VIEWS: Record<
  NutritionTabId,
  React.ComponentType<{ onNavigate: (tab: NutritionTabId) => void }>
> = {
  overview: OverviewTab,
  nutrition: MyNutritionTab,
  ai: AICoachTab,
  training: TrainingTab,
  smartfood: SmartFoodTab,
  progress: ProgressTab,
  tools: ToolsTab,
}

export { NUTRITION_TABS }