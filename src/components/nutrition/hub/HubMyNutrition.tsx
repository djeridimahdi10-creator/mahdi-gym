'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ChevronDown, Check, Plus, RefreshCw, Apple, ListChecks } from 'lucide-react'
import type { Meal } from '@/components/nutrition'
import { useNutritionStore } from '@/stores/nutritionStore'
import { useNutritionData } from './useNutritionData'
import { SectionBlock, HubCard, BigProgressBar, AnimatedNumber, MetaChip, STAGGER_CONTAINER, STAGGER } from './HubShared'
import { NextMealRecommendation, HydrationIntelligence, SatietyTracker, DailyMissionsCard } from '@/components/nutrition'

/* ── Meal presentation ── */
const MEAL_META: Record<string, { color: string; emoji: string; label: string }> = {
  breakfast: { color: '#FFB300', emoji: '🌅', label: 'Breakfast' },
  lunch: { color: '#00F0FF', emoji: '☀️', label: 'Lunch' },
  snack: { color: '#10b981', emoji: '🍎', label: 'Snack' },
  dinner: { color: '#A855F7', emoji: '🌙', label: 'Dinner' },
}

function MealCardLarge({ meal, index, onToggle }: { meal: Meal; index: number; onToggle: () => void }) {
  const { setModalOpen } = useNutritionStore()
  const [expanded, setExpanded] = useState(false)
  const eaten = !!meal.eaten
  const meta = MEAL_META[meal.type] || { color: '#64748b', emoji: '🍽️', label: meal.type }

  const proteinEst = Math.round((meal.totalCalories * 0.28) / 4)
  const carbsEst = Math.round((meal.totalCalories * 0.42) / 4)
  const fatEst = Math.round((meal.totalCalories * 0.3) / 9)

  return (
    <motion.div
      variants={STAGGER}
      layout
      className="rounded-3xl p-6 sm:p-7 flex flex-col gap-5"
      style={{
        ...(eaten
          ? { background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.25)' }
          : { background: 'rgba(17,23,36,0.92)', border: '1px solid rgba(255,255,255,0.08)' }),
        boxShadow: '0 10px 32px rgba(0,0,0,0.3)',
      }}
    >
      {/* Top: identity + status */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: eaten ? 'rgba(16,185,129,0.12)' : `${meta.color}12`, border: `1px solid ${eaten ? 'rgba(16,185,129,0.3)' : `${meta.color}30`}` }}
          >
            {meta.emoji}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {meta.label}
            </h3>
            <p className="text-sm text-slate-400 flex items-center gap-1.5 mt-0.5">
              <Clock className="w-3.5 h-3.5" style={{ color: meta.color }} />
              {meal.time} · {meal.foods.length} items
            </p>
          </div>
        </div>

        {eaten ? (
          <motion.span
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-400 bg-emerald-500/12 border border-emerald-500/30"
          >
            <Check className="w-3.5 h-3.5" /> Logged & Eaten
          </motion.span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-400 bg-white/5 border border-white/10">
            Not logged yet
          </span>
        )}
      </div>

      {/* Big numbers: calories + macros */}
      <div className="rounded-2xl p-5 flex items-end justify-between gap-4 flex-wrap" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Calories</p>
          <p className="flex items-baseline gap-1.5 mt-0.5">
            <AnimatedNumber value={meal.totalCalories} className="text-4xl font-extrabold text-white tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }} />
            <span className="text-base text-slate-500 font-semibold">kcal</span>
          </p>
        </div>
        <div className="flex gap-2.5">
          {[
            { l: `P ${proteinEst}g`, c: '#FFB300' },
            { l: `C ${carbsEst}g`, c: '#A855F7' },
            { l: `F ${fatEst}g`, c: '#FF5C8D' },
          ].map((m) => (
            <span key={m.l} className="px-3.5 py-2 rounded-xl text-sm font-bold tabular-nums" style={{ background: `${m.c}12`, color: m.c, border: `1px solid ${m.c}25` }}>
              {m.l}
            </span>
          ))}
        </div>
      </div>

      {/* Foods toggle */}
      <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors self-start">
        <ListChecks className="w-4 h-4" style={{ color: meta.color }} />
        <span>{expanded ? 'Hide ingredients' : `View ingredients (${meal.foods.length})`}</span>
        <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-2 pt-1">
              {meal.foods.map((food, j) => (
                <div key={j} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${meta.color}10` }}>
                    <Apple className="w-4 h-4" style={{ color: meta.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">{food.name}</p>
                    <p className="text-xs text-slate-500">{food.portion}</p>
                  </div>
                  <span className="text-sm font-bold tabular-nums" style={{ color: meta.color }}>
                    {food.calories} <span className="text-slate-600 text-xs font-semibold">kcal</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 pt-1 mt-auto">
        <motion.button
          onClick={onToggle}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className={`flex-1 sm:flex-none px-6 py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
            eaten ? 'text-slate-300 bg-white/5 border border-white/12 hover:bg-white/10' : 'text-black bg-emerald-500 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20'
          }`}
        >
          {eaten ? <><Check className="w-4 h-4" /> Mark as not eaten</> : <><Plus className="w-4 h-4" /> Log Meal</>}
        </motion.button>

        <motion.button
          onClick={() => setModalOpen('replace', true, index)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="px-5 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/30 hover:bg-[#00F0FF]/20 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Replace
        </motion.button>
      </div>
    </motion.div>
  )
}

export function HubMyNutrition() {
  const { toggleMealEaten } = useNutritionStore()
  const d = useNutritionData()

  return (
    <motion.section variants={STAGGER_CONTAINER} initial="hidden" animate="show" className="space-y-10">
      {/* ── Today's Meals ── */}
      <section className="space-y-5">
        <SectionBlock
          badge="🍽️"
          title="Today's Meals"
          subtitle="Tap 'Log Meal' after each meal — your totals update live."
          right={
            <MetaChip color="#A855F7">
              {d.mealsLogged} / {d.totalMeals} logged
            </MetaChip>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {d.meals.map((meal, i) => (
            <MealCardLarge key={`${meal.type}-${i}`} meal={meal} index={i} onToggle={() => toggleMealEaten(i)} />
          ))}
        </div>
      </section>

      {/* ── Macro intake ── */}
      <section className="space-y-5">
        <SectionBlock
          badge="🎯"
          title="Macro Intake"
          subtitle="How well you're tracking against today's adaptive targets."
        />
        <motion.div variants={STAGGER_CONTAINER} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { label: 'Protein', current: d.intake.protein, target: d.targets.protein, color: '#FFB300', hint: 'muscle repair & growth' },
            { label: 'Carbohydrates', current: d.intake.carbs, target: d.targets.carbs, color: '#A855F7', hint: 'energy & glycogen' },
            { label: 'Fats', current: d.intake.fat, target: d.targets.fat, color: '#FF5C8D', hint: 'hormones & recovery' },
          ].map((m) => {
            const pct = Math.min(100, Math.round((m.current / (m.target || 1)) * 100))
            return (
              <motion.div key={m.label} variants={STAGGER} className="rounded-3xl p-6 sm:p-7 space-y-4" style={{ background: 'rgba(17,23,36,0.92)', border: `1px solid ${m.color}26` }}>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-base font-bold text-slate-200">{m.label}</p>
                  <span className="px-3 py-1 rounded-full text-xs font-bold tabular-nums" style={{ background: `${m.color}14`, color: m.color, border: `1px solid ${m.color}30` }}>
                    {pct}%
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <AnimatedNumber value={m.current} className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }} />
                  <span className="text-lg text-slate-500 font-semibold">/ {m.target}g</span>
                </div>
                <BigProgressBar value={pct} color={m.color} height={14} />
                <p className="text-xs text-slate-500">{m.hint}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* ── AI meal recommendation ── */}
      <NextMealRecommendation />

      {/* ── Hydration + satiety ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HydrationIntelligence />
        <SatietyTracker />
      </div>

      {/* ── Daily missions ── */}
      <section className="space-y-5">
        <SectionBlock badge="✅" title="Today's Missions" subtitle="Small consistency goals that compound into big results." />
        <DailyMissionsCard />
      </section>
    </motion.section>
  )
}