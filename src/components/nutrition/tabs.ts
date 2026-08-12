import {
  Home,
  UtensilsCrossed,
  Bot,
  Dumbbell,
  Globe2,
  BarChart3,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

export type NutritionTab =
  | 'overview'
  | 'meals'
  | 'coach'
  | 'training'
  | 'food'
  | 'progress'
  | 'tools'

export type Tone =
  | 'cyan'
  | 'purple'
  | 'emerald'
  | 'amber'
  | 'blue'
  | 'rose'

export interface NutritionTabMeta {
  id: NutritionTab
  label: string
  icon: LucideIcon
  title: string
  description: string
  tone: Tone
}

export const NUTRITION_TABS: NutritionTabMeta[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: Home,
    title: 'Today at a Glance',
    description: 'Your daily status — how you are doing right now, plus your AI briefing and adaptive targets.',
    tone: 'cyan',
  },
  {
    id: 'meals',
    label: 'My Nutrition',
    icon: UtensilsCrossed,
    title: 'Today\u2019s Nutrition',
    description: 'Your meal plan, the next meal AI recommends, hydration and daily missions.',
    tone: 'emerald',
  },
  {
    id: 'coach',
    label: 'AI Coach',
    icon: Bot,
    title: 'AI Coach',
    description: 'Ask My Data, run diagnostics and explore the live intelligence behind your nutrition.',
    tone: 'purple',
  },
  {
    id: 'training',
    label: 'Training & Recovery',
    icon: Dumbbell,
    title: 'Training & Recovery',
    description: 'Fuel your workout the right way — pre-workout energy and post-workout recovery nutrition.',
    tone: 'amber',
  },
  {
    id: 'food',
    label: 'Smart Food',
    icon: Globe2,
    title: 'Smart Food',
    description: 'Scan meals, log by voice, swap foods intelligently and explore the Algerian kitchen.',
    tone: 'rose',
  },
  {
    id: 'progress',
    label: 'Progress',
    icon: BarChart3,
    title: 'Progress & Insights',
    description: 'Weekly trends, your nutrition score, goal forecast and the weekly AI review.',
    tone: 'blue',
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: Wrench,
    title: 'Nutrition Tools',
    description: 'Grocery list, simulator, meal replacement and meal planning utilities.',
    tone: 'emerald',
  },
]

export const TONE_STYLES: Record<Tone, { color: string; bg: string; border: string }> = {
  cyan: { color: '#00F0FF', bg: 'rgba(0,240,255,0.12)', border: 'rgba(0,240,255,0.32)' },
  purple: { color: '#A855F7', bg: 'rgba(168,85,247,0.13)', border: 'rgba(168,85,247,0.32)' },
  emerald: { color: '#10b981', bg: 'rgba(16,185,129,0.13)', border: 'rgba(16,185,129,0.32)' },
  amber: { color: '#FFB300', bg: 'rgba(255,179,0,0.13)', border: 'rgba(255,179,0,0.32)' },
  blue: { color: '#3b82f6', bg: 'rgba(59,130,246,0.13)', border: 'rgba(59,130,246,0.32)' },
  rose: { color: '#f43f5e', bg: 'rgba(244,63,94,0.13)', border: 'rgba(244,63,94,0.32)' },
}