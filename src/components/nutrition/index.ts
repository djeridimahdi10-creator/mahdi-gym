// Nutrition Hub public API — explicit, deduplicated barrel.
// Every component is exported exactly once, from its canonical module.

// ── Legacy core ──
export { NutritionHero } from './NutritionHero'
export { MealTimeline } from './MealTimeline'
export type { Meal, MealFood } from './MealTimeline'
export { NutritionProgress } from './NutritionProgress'
export { AICoachInsights } from './AICoachInsights'
export { QuickActions } from './QuickActions'
export { NutritionOrb } from './NutritionOrb'
export { MacroRings } from './MacroRings'

// ── AI Nutrition Operating System components ──
export { TodayAIBriefing } from './TodayAIBriefing'
export { AdaptiveDailyTarget } from './AdaptiveDailyTarget'
export { NextMealRecommendation } from './NextMealRecommendation'
export { SmartMealReplacerModal } from './SmartMealReplacerModal'
export { AdvancedFoodScannerModal } from './AdvancedFoodScannerModal'
export { VoiceFoodLoggerModal } from './VoiceFoodLoggerModal'
export { SmartFoodSwapsModal } from './SmartFoodSwapsModal'
export { NutritionScoreCard } from './NutritionScoreCard'
export { WeeklyAIReview } from './WeeklyAIReview'
export { ProgressDiagnosticModal } from './ProgressDiagnosticModal'
export { WorkoutNutritionBridge } from './WorkoutNutritionBridge'
export { HydrationIntelligence } from './HydrationIntelligence'
export { SatietyTracker } from './SatietyTracker'
export { AlgerianFoodHub } from './AlgerianFoodHub'
export { RestaurantModeModal } from './RestaurantModeModal'
export { AIGroceryListModal } from './AIGroceryListModal'
export { WhatIfSimulator } from './WhatIfSimulator'
export { AskMyDataDrawer } from './AskMyDataDrawer'
export { DailyMissionsCard } from './DailyMissionsCard'
export { GoalForecastCard } from './GoalForecastCard'
export { QuickActionBar } from './QuickActionBar'
export { FoodLibraryLogger } from './FoodLibraryLogger'
export { FoodLibraryModal } from './FoodLibraryModal'

// ── Nutrition Hub v2 — shared building blocks ──
export { HubSection } from './HubSection'
export { HubCards } from './HubCards'
export type { HubCardConfig } from './HubCards'
export { TodayNutritionCore } from './TodayNutritionCore'
export { CoachHub } from './CoachHub'

// ── Shared primitives ──
export { AnimatedNumber } from './AnimatedNumber'
export { CountUp } from './CountUp'
export { CollapsiblePanel } from './CollapsiblePanel'
export { SectionHeader } from './SectionHeader'
export { SectionHeading } from './SectionHeading'
export { SectionIntro } from './SectionIntro'

// ── Category system ──
export { CategoryTabs } from './CategoryTabs'
export type { NutritionCategory } from './CategoryTabs'
export { HubCategoryNav } from './HubCategoryNav'
export type { HubCategory } from './HubCategoryNav'
export { NutritionHubNav } from './NutritionHubNav'
export type { HubTabId } from './NutritionHubNav'
export { NutritionHubTabs } from './NutritionHubTabs'

// ── Tab definitions ──
export { NUTRITION_TABS } from './nutritionTabs'
export type { NutritionTabDef, NutritionTabId } from './nutritionTabs'
export { TONE_STYLES } from './tabs'
export type { NutritionTabMeta, NutritionTab, Tone } from './tabs'

// ── Feature grids ──
export { FeatureCard } from './FeatureCard'
export { FeatureCardGrid } from './FeatureCardGrid'
export type { FeatureCardItem } from './FeatureCardGrid'
export { FeatureHub } from './FeatureHub'
export type { FeatureItem } from './FeatureHub'

// ── Overview experience ──
export { NutritionCore } from './NutritionCore'
export { NutritionCoreCard } from './NutritionCoreCard'
export { NutritionCoreOverview } from './NutritionCoreOverview'
export { DailyGlance } from './DailyGlance'
export { TodaySummary } from './TodaySummary'
export { TodayOverview } from './TodayOverview'
export { MacrosToday } from './MacrosToday'
export { NutritionOverview } from './NutritionOverview'

// ── Tab experiences ──
export { OverviewTab } from './OverviewTab'
export { AICoachTab } from './AICoachTab'
export { MyNutritionTab } from './MyNutritionTab'
export { TrainingTab } from './TrainingTab'
export { SmartFoodTab } from './SmartFoodTab'
export { ProgressTab } from './ProgressTab'
export { ToolsTab } from './ToolsTab'

// ── Hub experiences (feature homes) ──
export { AICoachHub } from './AICoachHub'
export { SmartFoodHub } from './SmartFoodHub'
export { ToolsHub } from './ToolsHub'

// ── Alternate panels ──
export { OverviewPanel } from './OverviewPanel'
export { MyNutritionPanel } from './MyNutritionPanel'
export { AICoachPanel } from './AICoachPanel'
export { SmartFoodPanel } from './SmartFoodPanel'
export { ProgressPanel } from './ProgressPanel'
export { TrainingPanel } from './TrainingPanel'
export { ToolsPanel } from './ToolsPanel'

// ── Composite tab views (canonical NUTRITION_VIEWS) ──
export { NUTRITION_VIEWS } from './NutritionTabViews'
export type { NutritionTabProps } from './NutritionTabViews'