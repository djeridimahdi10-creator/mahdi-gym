'use client'

import { motion } from 'framer-motion'
import { Sparkles, Droplets, Zap, ArrowRight, MessageSquareText } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useNutritionStore } from '@/stores/nutritionStore'
import { useNutritionData } from './useNutritionData'
import { MetaChip } from './HubShared'

/* The hero AI briefing — large, calm, and clearly the most important card
   on the Overview. One greeting, one status, one opportunity, one action. */

export function AIBriefingHero() {
  const { profile } = useAuthStore()
  const { updateWater, addMealFood, setModalOpen } = useNutritionStore()
  const d = useNutritionData()

  const userGoal = profile?.goal || 'gain'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const userName = profile?.full_name ? profile.full_name.split(' ')[0] : 'Athlete'

  const waterGap = Math.max(0, d.waterTarget - d.waterConsumed)
  const protGap = Math.max(0, d.targets.protein - d.intake.protein)
  const isWaterOpportunity = protGap <= 0 || waterGap / d.waterTarget >= protGap / d.targets.protein

  const opportunity = isWaterOpportunity
    ? {
        icon: <Droplets className="w-6 h-6" />,
        accent: '#38bdf8',
        label: 'Hydration',
        detail: `You're ${Math.max(0, Math.round(waterGap * 1000))}ml behind your daily target.`,
        recommendation: 'Drink 500ml before your next meal — it also helps the rest of your macros absorb better.',
        cta: 'Take Action',
        doAction: () => updateWater(0.5),
      }
    : {
        icon: <Zap className="w-6 h-6" />,
        accent: '#FFB300',
        label: 'Protein',
        detail: `You're ${protGap}g short of your protein target today.`,
        recommendation: 'Add a high-protein snack now — Greek yogurt (+20g) is the fastest fix before training.',
        cta: 'Take Action',
        doAction: () =>
          addMealFood(2, {
            name: 'Greek Yogurt w/ Berries (+20g protein)',
            portion: '200g',
            calories: 190,
            protein: 20,
            carbs: 8,
            fat: 10,
          }),
      }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-[28px] overflow-hidden p-8 sm:p-10"
      style={{
        background: 'linear-gradient(135deg, rgba(6,11,24,0.98) 0%, rgba(17,23,36,0.96) 55%, rgba(168,85,247,0.06) 100%)',
        border: '1px solid rgba(168,85,247,0.25)',
        boxShadow: '0 0 50px rgba(168,85,247,0.05)',
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00F0FF] via-[#a855f7] to-[#10b981]" />

      <div className="flex flex-col xl:flex-row gap-10">
        {/* ── Main message ── */}
        <div className="flex-1 min-w-0 space-y-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <MetaChip color="#c084fc" bg="rgba(168,85,247,0.10)">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Today&apos;s AI Briefing
            </MetaChip>
            {d.todayWorkout && <MetaChip color="#00F0FF">{d.todayWorkout.name}</MetaChip>}
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live · Brain Active
            </span>
          </div>

          <div>
            <h1
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {greeting}, {userName} 👋
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mt-2 leading-relaxed">
              You&apos;re currently <span className="text-emerald-400 font-bold">on track (+4.2% consistency)</span> for
              your <span className="text-white font-semibold capitalize">{userGoal}</span> goal.
            </p>
          </div>

          {/* Opportunity focus */}
          <div
            className="rounded-2xl p-5 sm:p-6 space-y-3"
            style={{ background: `${opportunity.accent}0d`, border: `1px solid ${opportunity.accent}30` }}
          >
            <div className="flex items-center gap-2.5">
              <span style={{ color: opportunity.accent }}>{opportunity.icon}</span>
              <p className="text-sm font-bold text-white uppercase tracking-wide" style={{ color: opportunity.accent }}>
                Biggest opportunity today: {opportunity.label}
              </p>
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {opportunity.detail}
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              <span className="text-slate-200 font-semibold">AI recommendation — </span>
              {opportunity.recommendation}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <motion.button
              onClick={opportunity.doAction}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3.5 rounded-2xl text-sm font-bold text-black flex items-center gap-2 shadow-lg"
              style={{ background: opportunity.accent, boxShadow: `0 8px 30px ${opportunity.accent}40` }}
            >
              <span>{opportunity.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => setModalOpen('askdata', true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3.5 rounded-2xl text-sm font-bold text-purple-300 flex items-center gap-2 bg-purple-500/12 hover:bg-purple-500/20 border border-purple-500/30 transition-colors"
            >
              <MessageSquareText className="w-4 h-4" />
              <span>Ask AI</span>
            </motion.button>
          </div>
        </div>

        {/* ── Right rail: the four essential numbers, kept minimal ── */}
        <div className="xl:w-72 flex flex-col justify-center gap-3">
          {[
            { label: 'Calories Target', value: `${d.targets.calories.toLocaleString()} kcal`, color: '#00F0FF' },
            { label: 'Protein Target', value: `${d.targets.protein}g`, color: '#FFB300' },
            { label: 'Water', value: `${d.waterConsumed.toFixed(1)}L / ${d.waterTarget}L`, color: '#38bdf8' },
            { label: 'Meal Schedule', value: `${d.mealsLogged} / ${d.totalMeals} meals`, color: '#c084fc' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl px-5 py-4 flex items-center justify-between gap-4"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{s.label}</span>
              <span className="text-base font-bold tabular-nums" style={{ color: s.color }}>
                {s.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}