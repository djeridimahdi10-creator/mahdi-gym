'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/stores/authStore'
import { useNutritionStore } from '@/stores/nutritionStore'
import {
  TodayAIBriefing,
  TodayNutritionCore,
  AdaptiveDailyTarget,
  NutritionScoreCard,
  DailyMissionsCard,
  MealTimeline,
  NutritionHero,
  NextMealRecommendation,
  HydrationIntelligence,
  SatietyTracker,
  CoachHub,
  AlgerianFoodHub,
  WorkoutNutritionBridge,
  WeeklyAIReview,
  NutritionProgress,
  GoalForecastCard,
  HubSection,
  HubCards,
  SmartMealReplacerModal,
  AdvancedFoodScannerModal,
  VoiceFoodLoggerModal,
  SmartFoodSwapsModal,
  ProgressDiagnosticModal,
  RestaurantModeModal,
  AIGroceryListModal,
  WhatIfSimulator,
  AskMyDataDrawer,
  QuickActionBar,
  FoodLibraryLogger,
  FoodLibraryModal,
} from '@/components/nutrition'
import {
  ChefHat,
  Home,
  Salad,
  Sparkles,
  Dumbbell,
  Globe,
  BarChart3,
  Wrench,
  Camera,
  Mic,
  UtensilsCrossed,
  Store,
  ShoppingCart,
  Sliders,
  RefreshCw,
  Activity,
  HeartPulse,
  Compass,
  ShoppingBag,
  Camera as CameraScan,
  MessageSquareText,
  Navigation,
  BookOpen,
  Search,
} from 'lucide-react'

type TabId = 'overview' | 'nutrition' | 'coach' | 'training' | 'food' | 'progress' | 'tools'

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'nutrition', label: 'My Nutrition', icon: Salad },
  { id: 'coach', label: 'AI Coach', icon: Sparkles },
  { id: 'training', label: 'Training & Recovery', icon: Dumbbell },
  { id: 'food', label: 'Smart Food', icon: Globe },
  { id: 'progress', label: 'Progress', icon: BarChart3 },
  { id: 'tools', label: 'Tools', icon: Wrench },
]

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

  const [activeTab, setActiveTab] = useState<TabId>('overview')

  // Unified Intake Computations
  const intakeTotals = useMemo(() => {
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

    return {
      calories,
      protein,
      carbs,
      fat,
      mealsLogged: eaten.length,
      totalMeals: meals.length,
    }
  }, [meals])

  const adaptedCalories = dailyCalories + (todayWorkout ? todayWorkout.caloriesBonus : 0)
  const adaptedProtein = targetMacros.protein + (todayWorkout ? todayWorkout.proteinBonus : 0)

  const quickActions = [
    { id: 'searchfood', label: 'Search Food', icon: Search, color: '#00F0FF', onClick: () => setModalOpen('foodlibrary', true) },
    { id: 'scanner', label: 'Scan Food', icon: CameraScan, color: '#f43f5e', onClick: () => setModalOpen('scanner', true) },
    { id: 'voice', label: 'Voice Log', icon: Mic, color: '#a855f7', onClick: () => setModalOpen('voice', true) },
    { id: 'askdata', label: 'Ask My Data', icon: MessageSquareText, color: '#3b82f6', onClick: () => setModalOpen('askdata', true) },
    { id: 'restaurant', label: 'Eating Out', icon: Store, color: '#fbbf24', onClick: () => setModalOpen('restaurant', true) },
    { id: 'grocery', label: 'Grocery List', icon: ShoppingCart, color: '#10b981', onClick: () => setModalOpen('grocery', true) },
    { id: 'whatif', label: 'Simulator', icon: Sliders, color: '#c084fc', onClick: () => setModalOpen('whatif', true) },
  ]

  return (
    <motion.div
      className="w-full space-y-8 pb-28"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── Header ── */}
      <div
        className="relative rounded-3xl overflow-hidden p-6 sm:p-8"
        style={{
          background: 'linear-gradient(135deg, rgba(6,11,24,0.98) 0%, rgba(8,4,24,0.96) 100%)',
          border: '1px solid rgba(0,240,255,0.18)',
          boxShadow: '0 0 35px rgba(0,240,255,0.03)',
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center glow-ring flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(168,85,247,0.18))', border: '1px solid rgba(0,240,255,0.3)' }}
            >
              <ChefHat className="w-7 h-7 text-[#00F0FF]" />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Nutrition Hub
                </h1>
                <span className="badge-live inline-flex items-center gap-1.5" style={{ background: 'rgba(0,240,255,0.08)', color: '#00F0FF', border: '1px solid rgba(0,240,255,0.25)' }}>
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  Brain Active v2026
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-1.5">
                Goal: <span className="text-white font-bold capitalize">{profile?.goal || 'Muscle Gain'}</span> · Target:{' '}
                <span className="text-[#00F0FF] font-bold tabular-nums">{adaptedCalories} kcal</span> ·{' '}
                <span className="text-emerald-400 font-semibold">{intakeTotals.mealsLogged}/{intakeTotals.totalMeals} Meals Eaten</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setModalOpen('foodlibrary', true)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#00F0FF]/15 text-[#00F0FF] hover:bg-[#00F0FF]/25 border border-[#00F0FF]/30 transition-all shadow-lg shadow-[#00F0FF]/10"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Search Food</span>
            </button>
            <button
              onClick={() => setModalOpen('askdata', true)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-purple-500/15 text-purple-300 hover:bg-purple-500/25 border border-purple-500/30 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Ask AI</span>
            </button>
            <button
              onClick={() => setModalOpen('scanner', true)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 border border-rose-500/30 transition-all"
            >
              <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Scan Food</span>
            </button>
          </div>
        </div>

        {/* ── Category Navigation ── */}
        <nav
          className="flex items-center gap-1.5 mt-6 pt-5 border-t border-white/5 overflow-x-auto pb-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          aria-label="Nutrition categories"
        >

          {TABS.map((tab) => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                  active ? 'text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: 'rgba(0,240,255,0.12)', border: '1px solid rgba(0,240,255,0.28)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon className={`w-[18px] h-[18px] relative z-10 ${active ? 'text-[#00F0FF]' : ''}`} />
                <span className="relative z-10">{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* ── Tab Content ── */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {/* ── 1. OVERVIEW ── */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <TodayAIBriefing />

              <HubSection
                icon={<HeartPulse className="w-7 h-7" />}
                title="How am I doing today?"
                subtitle="The four numbers that matter most — calories, protein, hydration, and meals."
              >
                <TodayNutritionCore
                  calories={{ current: intakeTotals.calories, target: adaptedCalories, unit: 'kcal' }}
                  protein={{ current: intakeTotals.protein, target: adaptedProtein, unit: 'g' }}
                  carbs={{ current: intakeTotals.carbs, target: targetMacros.carbs, unit: 'g' }}
                  fat={{ current: intakeTotals.fat, target: targetMacros.fat, unit: 'g' }}
                  water={{ current: waterConsumed, target: waterTarget, unit: 'L' }}
                  onWaterChange={updateWater}
                  mealsLogged={intakeTotals.mealsLogged}
                  totalMeals={intakeTotals.totalMeals}
                />
              </HubSection>

              <HubSection
                icon={<Sliders className="w-7 h-7" />}
                title="Adaptive Daily Targets"
                subtitle="Your targets automatically adapt based on today's activity and workout."
              >
                <AdaptiveDailyTarget />
              </HubSection>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                <NutritionScoreCard />
                <DailyMissionsCard />
              </div>

              <HubSection
                icon={<Navigation className="w-7 h-7" />}
                title="Quick Actions"
                subtitle="The most used tools, one tap away."
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
                  {quickActions.map((action, i) => {
                    const Icon = action.icon
                    return (
                      <motion.button
                        key={action.id}
                        onClick={action.onClick}
                        className="rounded-2xl p-5 flex flex-col items-center gap-3 text-center transition-all hover:scale-[1.03]"
                        style={{ background: 'rgba(17,23,36,0.9)', border: `1px solid ${action.color}25` }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                      >
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center"
                          style={{ background: `${action.color}14`, border: `1px solid ${action.color}30`, color: action.color }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-semibold text-slate-200">{action.label}</span>
                      </motion.button>
                    )
                  })}
                </div>
              </HubSection>
            </motion.div>
          )}

          {/* ── 2. MY NUTRITION ── */}
          {activeTab === 'nutrition' && (
            <motion.div
              key="nutrition"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <HubSection
                icon={<BookOpen className="w-7 h-7 text-[#00F0FF]" />}
                title="Food Library & Calorie Search"
                subtitle="Search any food item (rice, chicken, salmon, oats, couscous...), select portion quantity (e.g. 100g, 150g), calculate exact calories and add it directly to Breakfast, Lunch, Snack, or Dinner."
              >
                <FoodLibraryLogger />
              </HubSection>

              <HubSection
                icon={<UtensilsCrossed className="w-7 h-7" />}
                title="Today's Meals"
                subtitle="Tap 'Log Meal' each time you eat — your intake updates live."
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                  <div className="lg:col-span-8">
                    <MealTimeline meals={meals} onToggleMeal={toggleMealEaten} />
                  </div>
                  <div className="lg:col-span-4 space-y-6">
                    <HydrationIntelligence />
                    <SatietyTracker />
                  </div>
                </div>
              </HubSection>

              <HubSection
                icon={<Activity className="w-7 h-7" />}
                title="Macros & Daily Budget"
                subtitle="Your consumed nutrients against today's adapted targets."
              >
                <NutritionHero
                  calories={{ current: intakeTotals.calories, target: adaptedCalories }}
                  protein={{ current: intakeTotals.protein, target: adaptedProtein }}
                  carbs={{ current: intakeTotals.carbs, target: targetMacros.carbs }}
                  fat={{ current: intakeTotals.fat, target: targetMacros.fat }}
                  water={{ current: waterConsumed, target: waterTarget }}
                  onWaterChange={updateWater}
                  mealsLogged={intakeTotals.mealsLogged}
                  totalMeals={intakeTotals.totalMeals}
                />
              </HubSection>

              <HubSection
                icon={<Sparkles className="w-7 h-7" />}
                title="What Should I Eat Next?"
                subtitle="AI matches your next meal to your remaining macro budget."
              >
                <NextMealRecommendation />
              </HubSection>
            </motion.div>
          )}

          {/* ── 3. AI COACH ── */}
          {activeTab === 'coach' && (
            <motion.div
              key="coach"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
            >
              <HubSection
                icon={<Sparkles className="w-7 h-7" />}
                title="Your AI Coach"
                subtitle="Ask, analyze, and let the intelligence guide your decisions."
              >
                <CoachHub
                  onOpenBriefing={() => setActiveTab('overview')}
                  onOpenMealSuggestions={() => setActiveTab('nutrition')}
                />
              </HubSection>
            </motion.div>
          )}

          {/* ── 4. TRAINING & RECOVERY ── */}
          {activeTab === 'training' && (
            <motion.div
              key="training"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <HubSection
                icon={<Dumbbell className="w-7 h-7" />}
                title="Training & Nutrition"
                subtitle="Fuel your session and recover like an athlete — synced with Iron Command."
              >
                {todayWorkout ? (
                  <WorkoutNutritionBridge />
                ) : (
                  <div
                    className="rounded-3xl p-10 text-center"
                    style={{ background: 'rgba(17,23,36,0.92)', border: '1px dashed rgba(255,255,255,0.12)' }}
                  >
                    <Dumbbell className="w-10 h-10 text-slate-500 mx-auto mb-4" />
                    <h3 className="text-white text-xl font-bold">No workout scheduled today</h3>
                    <p className="text-slate-400 text-sm mt-2">Your pre and post-workout nutrition plan will appear here on training days.</p>
                  </div>
                )}
              </HubSection>
            </motion.div>
          )}

          {/* ── 5. SMART FOOD ── */}
          {activeTab === 'food' && (
            <motion.div
              key="food"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <HubSection
                icon={<Globe className="w-7 h-7" />}
                title="Food Intelligence"
                subtitle="Understand what you eat — wherever you are."
              >
                <HubCards
                  columns={2}
                  cards={[
                    {
                      id: 'scanner',
                      icon: CameraScan,
                      title: 'Scan Food',
                      description: 'Take a picture of your meal and let AI analyze it instantly.',
                      accent: '#f43f5e',
                      cta: 'Scan Now',
                      onClick: () => setModalOpen('scanner', true),
                    },
                    {
                      id: 'voice',
                      icon: Mic,
                      title: 'Voice Log',
                      description: 'Tell the AI what you ate — no typing required.',
                      accent: '#a855f7',
                      cta: 'Start Voice Log',
                      onClick: () => setModalOpen('voice', true),
                    },
                    {
                      id: 'swap',
                      icon: RefreshCw,
                      title: 'Smart Food Swap',
                      description: 'Find healthier or more suitable alternatives for any meal.',
                      accent: '#10b981',
                      cta: 'Swap a Meal',
                      onClick: () => setModalOpen('swap', true, 2),
                    },
                    {
                      id: 'restaurant',
                      icon: Store,
                      title: 'Restaurant Mode',
                      description: 'Find the best choice when eating outside — "I\'m eating out".',
                      accent: '#fbbf24',
                      cta: 'Find Best Choice',
                      onClick: () => setModalOpen('restaurant', true),
                    },
                  ]}
                />
              </HubSection>

              <HubSection
                icon={<Compass className="w-7 h-7" />}
                title="Algerian Food AI"
                subtitle="Traditional Algerian dishes mapped to exact nutritional macros."
              >
                <AlgerianFoodHub />
              </HubSection>
            </motion.div>
          )}

          {/* ── 6. PROGRESS ── */}
          {activeTab === 'progress' && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <HubSection
                icon={<BarChart3 className="w-7 h-7" />}
                title="Weekly Analytics & Insights"
                subtitle="How your week went, graded by the AI."
              >
                <WeeklyAIReview />
              </HubSection>

              <HubSection
                icon={<Activity className="w-7 h-7" />}
                title="Trends & Charts"
                subtitle="Adherence, intake curve, and micronutrient balance."
              >
                <NutritionProgress targetCalories={adaptedCalories} />
              </HubSection>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                <GoalForecastCard />
                <NutritionScoreCard />
              </div>
            </motion.div>
          )}

          {/* ── 7. TOOLS ── */}
          {activeTab === 'tools' && (
            <motion.div
              key="tools"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
            >
              <HubSection
                icon={<Wrench className="w-7 h-7" />}
                title="Nutrition Tools"
                subtitle="Everything else — powerful utilities for power users."
              >
                <HubCards
                  cards={[
                    {
                      id: 'grocery',
                      icon: ShoppingBag,
                      title: 'AI Grocery List',
                      description: 'Auto-group shopping items into Protein, Carbs, Veggies & Algerian Staples.',
                      accent: '#10b981',
                      cta: 'Open Grocery List',
                      onClick: () => setModalOpen('grocery', true),
                    },
                    {
                      id: 'simulator',
                      icon: Sliders,
                      title: 'What-If Simulator',
                      description: 'Simulate calorie surplus/deficit and project 12-week body composition changes.',
                      accent: '#a855f7',
                      cta: 'Open Simulator',
                      onClick: () => setModalOpen('whatif', true),
                    },
                    {
                      id: 'replacer',
                      icon: RefreshCw,
                      title: 'Meal Replacement',
                      description: 'Replace any planned meal with a smarter AI-selected option.',
                      accent: '#00F0FF',
                      cta: 'Replace a Meal',
                      onClick: () => setModalOpen('replace', true, 2),
                    },
                    {
                      id: 'scanner',
                      icon: CameraScan,
                      title: 'Food Scanner',
                      description: 'Advanced photo-based food analysis with precise macro extraction.',
                      accent: '#f43f5e',
                      cta: 'Open Scanner',
                      onClick: () => setModalOpen('scanner', true),
                    },
                    {
                      id: 'voice',
                      icon: Mic,
                      title: 'Voice Logging',
                      description: 'Hands-free meal logging powered by speech recognition.',
                      accent: '#c084fc',
                      cta: 'Open Voice Log',
                      onClick: () => setModalOpen('voice', true),
                    },
                    {
                      id: 'restaurant',
                      icon: Store,
                      title: 'Restaurant Mode',
                      description: 'Search menu items and get AI fit scores for remaining target macros.',
                      accent: '#fbbf24',
                      cta: 'Open Restaurant Mode',
                      onClick: () => setModalOpen('restaurant', true),
                    },
                    {
                      id: 'diagnostic',
                      icon: Activity,
                      title: 'Progress Diagnostic',
                      description: 'Why am I not progressing? Deep algorithmic audit of your data.',
                      accent: '#3b82f6',
                      cta: 'Run Diagnostic',
                      onClick: () => setModalOpen('diagnostic', true),
                    },
                    {
                      id: 'askdata',
                      icon: MessageSquareText,
                      title: 'Ask My Data',
                      description: 'Open-ended questions about your nutrition history and plans.',
                      accent: '#f59e0b',
                      cta: 'Ask AI',
                      onClick: () => setModalOpen('askdata', true),
                    },
                  ]}
                />
              </HubSection>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Interactive Modals & Drawers ── */}
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

      {/* ── Quick Action Bar (Sticky) ── */}
      <QuickActionBar />
    </motion.div>
  )
}