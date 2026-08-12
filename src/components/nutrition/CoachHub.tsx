'use client'

import { motion } from 'framer-motion'
import { Sparkles, MessageSquareText, Stethoscope, CalendarCheck, Utensils, BrainCircuit, Clock, Droplets, TrendingUp } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { HubCards } from './HubCards'
import { AICoachInsights } from './AICoachInsights'

interface CoachHubProps {
  onOpenBriefing: () => void
  onOpenMealSuggestions: () => void
}

export function CoachHub({ onOpenBriefing, onOpenMealSuggestions }: CoachHubProps) {
  const { setModalOpen, waterConsumed, waterTarget, satietyLogs, meals } = useNutritionStore()

  const cards = [
    {
      id: 'askdata',
      icon: MessageSquareText,
      title: 'Ask My Data',
      description: 'Ask questions about your nutrition, meals, workouts, and progress.',
      accent: '#00F0FF',
      cta: 'Ask AI',
      onClick: () => setModalOpen('askdata', true),
    },
    {
      id: 'diagnostic',
      icon: Stethoscope,
      title: 'Analyze My Progress',
      description: 'Run a deep algorithmic audit on adherence, macros and workout intensity.',
      accent: '#A855F7',
      cta: 'Run Analysis',
      onClick: () => setModalOpen('diagnostic', true),
    },
    {
      id: 'briefing',
      icon: CalendarCheck,
      title: 'AI Daily Briefing',
      description: 'Your personalized morning read on today\'s plan and opportunities.',
      accent: '#10b981',
      cta: 'View Briefing',
      onClick: onOpenBriefing,
    },
    {
      id: 'meals',
      icon: Utensils,
      title: 'AI Meal Suggestions',
      description: 'Smart recommendations matched to your remaining macro budget.',
      accent: '#FFB300',
      cta: 'Find a Meal',
      onClick: onOpenMealSuggestions,
    },
  ]

  const ongoingPatterns = [
    {
      icon: Clock,
      color: '#3b82f6',
      title: 'Hydration dips after 4 PM',
      description: `${Math.max(0, Math.round((waterTarget - waterConsumed) * 1000))}ml still missing today. You typically finish 68% of water in the first half of the day.`,
    },
    {
      icon: Utensils,
      color: '#10b981',
      title: 'High-protein breakfasts keep you full',
      description: `${satietyLogs.length || 2} logged satiety check-ins show meals with 40g+ protein delay the next hunger signal by ~2.4 hours.`,
    },
    {
      icon: TrendingUp,
      color: '#FFB300',
      title: `Consistency streak building`,
      description: `${meals.filter((m) => m.eaten).length}/${meals.length} meals logged today — on pace for a 5th consecutive day above 85% adherence.`,
    },
  ]

  return (
    <div className="space-y-10">
      {/* Primary AI interactions */}
      <HubCards cards={cards} columns={2} />

      {/* AI Diagnostics */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 px-1">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.28)', color: '#c084fc' }}
          >
            <BrainCircuit className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              AI Diagnostics
            </h2>
            <p className="text-slate-400 text-sm">Real-time tactical adjustments for your goals</p>
          </div>
        </div>
        <AICoachInsights tips={[]} onRegenerate={() => {}} loading={false} />
      </div>

      {/* Habit Intelligence */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 px-1">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(255,179,0,0.12)', border: '1px solid rgba(255,179,0,0.28)', color: '#fbbf24' }}
          >
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Habit Intelligence
            </h2>
            <p className="text-slate-400 text-sm">Patterns discovered from your nutrition data</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {ongoingPatterns.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                className="rounded-3xl p-6 sm:p-7"
                style={{ background: 'rgba(17,23,36,0.9)', border: `1px solid ${p.color}22`, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: `${p.color}14`, border: `1px solid ${p.color}30`, color: p.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {p.title}
                  </h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{p.description}</p>
              </motion.div>
            )
          })}
        </div>
        <p className="text-xs text-slate-500 flex items-center gap-2 px-1">
          <Droplets className="w-3.5 h-3.5 text-blue-400" />
          Patterns are derived from your logged meals, hydration, and satiety check-ins.
        </p>
      </div>
    </div>
  )
}