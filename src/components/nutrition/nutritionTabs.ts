import { House, Salad, Bot, Dumbbell, Utensils, ChartLine, Wrench } from 'lucide-react'

export type NutritionTabId = 'overview' | 'nutrition' | 'ai' | 'training' | 'smartfood' | 'progress' | 'tools'

export interface NutritionTabDef {
  id: NutritionTabId
  label: string
  emoji: string
  icon: React.ComponentType<{ className?: string }>
  blurb: string
}

export const NUTRITION_TABS: NutritionTabDef[] = [
  { id: 'overview', label: 'Overview', emoji: '🏠', icon: House, blurb: 'How am I doing today?' },
  { id: 'nutrition', label: 'My Nutrition', emoji: '🥗', icon: Salad, blurb: 'Meals, macros & hydration' },
  { id: 'ai', label: 'AI Coach', emoji: '🤖', icon: Bot, blurb: 'Briefing, Ask My Data & diagnostics' },
  { id: 'training', label: 'Training & Recovery', emoji: '🏋️', icon: Dumbbell, blurb: 'Workout ↔ nutrition fuel plan' },
  { id: 'smartfood', label: 'Smart Food', emoji: '🇩🇿', icon: Utensils, blurb: 'Scanner, voice & Algerian food' },
  { id: 'progress', label: 'Progress', emoji: '📊', icon: ChartLine, blurb: 'Trends, score & goal forecasts' },
  { id: 'tools', label: 'Tools', emoji: '🛠️', icon: Wrench, blurb: 'Grocery, simulator & more' },
]