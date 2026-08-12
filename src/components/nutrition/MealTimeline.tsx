'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock, Flame, Check, Plus, ChevronDown, Apple, RefreshCw,
} from 'lucide-react'

export interface MealFood { name: string; portion: string; calories: number; protein?: number; carbs?: number; fat?: number }
export interface Meal { type: string; time: string; foods: MealFood[]; totalCalories: number; eaten?: boolean }

interface MealTimelineProps {
  meals: Meal[]
  onToggleMeal: (index: number) => void
}

const MEAL_META: Record<string, { color: string; emoji: string; label: string }> = {
  breakfast: { color: '#FFB300', emoji: '🌅', label: 'Breakfast' },
  lunch:     { color: '#00F0FF', emoji: '☀️', label: 'Lunch' },
  snack:     { color: '#10b981', emoji: '🍎', label: 'Snack' },
  dinner:    { color: '#A855F7', emoji: '🌙', label: 'Dinner' },
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
}

function MealCard({ meal, index, onToggle }: { meal: Meal; index: number; onToggle: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const eaten = !!meal.eaten

  const meta = MEAL_META[meal.type] || { color: '#64748b', emoji: '🍽️', label: meal.type }

  // Estimated macros per meal if not explicitly provided
  const proteinEst = Math.round(meal.totalCalories * 0.28 / 4)
  const carbsEst = Math.round(meal.totalCalories * 0.42 / 4)
  const fatEst = Math.round(meal.totalCalories * 0.30 / 9)

  return (
    <motion.div
      variants={cardVariant}
      layout
      className="relative"
    >
      {/* Timeline connector line */}
      <div className="absolute left-[26px] top-12 bottom-0 w-px hidden sm:block" style={{ background: 'rgba(255,255,255,0.06)' }} />

      <div className="flex gap-4 sm:gap-6">
        {/* Timeline dot */}
        <div className="flex flex-col items-center flex-shrink-0 hidden sm:flex pt-2">
          <motion.div
            className="w-3.5 h-3.5 rounded-full z-10 cursor-pointer"
            onClick={onToggle}
            style={{
              background: eaten ? '#10b981' : meta.color,
              boxShadow: `0 0 10px ${eaten ? 'rgba(16,185,129,0.55)' : meta.color + '50'}`,
              border: `2.5px solid ${eaten ? 'rgba(16,185,129,0.35)' : meta.color + '35'}`,
            }}
            animate={eaten ? { scale: [1, 1.25, 1] } : {}}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Card */}
        <div
          className="flex-1 rounded-3xl overflow-hidden transition-all duration-300"
          style={{
            background: eaten ? 'rgba(16,185,129,0.04)' : 'rgba(17,23,36,0.92)',
            border: `1px solid ${eaten ? 'rgba(16,185,129,0.26)' : expanded ? meta.color + '2c' : 'rgba(255,255,255,0.09)'}`,
            boxShadow: expanded ? `0 0 30px ${meta.color}0a` : '0 4px 16px rgba(0,0,0,0.25)',
          }}
        >
          {/* Top accent line */}
          <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${eaten ? '#10b981' : meta.color}, transparent)` }} />

          {/* Header */}
          <div className="flex items-center gap-4 p-5 sm:p-6 cursor-pointer" onClick={() => setExpanded(!expanded)}>
            {/* Emoji icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl"
              style={{ background: eaten ? 'rgba(16,185,129,0.12)' : `${meta.color}10`, border: `1px solid ${eaten ? 'rgba(16,185,129,0.28)' : meta.color + '24'}` }}
            >
              {meta.emoji}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-1">
                <h3 className="text-white font-bold text-lg sm:text-xl">{meta.label}</h3>
                {eaten && (
                  <motion.span
                    className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(16,185,129,0.16)', color: '#10b981', border: '1px solid rgba(16,185,129,0.34)' }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <Check className="w-3 h-3" /> Logged &amp; Eaten
                  </motion.span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" style={{ color: meta.color }} /> {meal.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#FF5C8D]" />
                  <span className="text-white font-bold tabular-nums text-base">{meal.totalCalories}</span> kcal
                </span>
                <span className="text-slate-500">{meal.foods.length} items</span>
              </div>
              {/* Macro pills */}
              <div className="flex gap-2 mt-2.5">
                {[
                  { l: `P ${proteinEst}g`, c: '#FFB300' },
                  { l: `C ${carbsEst}g`, c: '#A855F7' },
                  { l: `F ${fatEst}g`, c: '#FF5C8D' },
                ].map(({ l, c }) => (
                  <span key={l} className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ background: `${c}12`, color: c, border: `1px solid ${c}24` }}>{l}</span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-shrink-0">
              <motion.button
                onClick={(e) => { e.stopPropagation(); onToggle() }}
                className="px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all"
                style={eaten
                  ? { background: 'rgba(16,185,129,0.18)', border: '1px solid rgba(16,185,129,0.38)', color: '#10b981' }
                  : { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: '#e2e8f0' }
                }
                whileTap={{ scale: 0.94 }}
                title={eaten ? 'Unmark as eaten' : 'Mark as eaten'}
              >
                {eaten ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{eaten ? 'Eaten' : 'Log Meal'}</span>
              </motion.button>

              <div
                className="hidden sm:flex w-10 h-10 rounded-xl items-center justify-center cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }}
              >
                <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Expandable ingredients */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="px-5 sm:px-6 pb-6 space-y-2 border-t border-white/[0.05] pt-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Ingredients &amp; Portions</p>
                  {meal.foods.map((food, j) => {
                    const calPct = Math.round((food.calories / meal.totalCalories) * 100)
                    return (
                      <motion.div
                        key={j}
                        className="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-white/[0.02] transition-colors"
                        style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.05 }}
                      >
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${meta.color}10`, border: `1px solid ${meta.color}20` }}>
                          <Apple className="w-4 h-4" style={{ color: meta.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">{food.name}</p>
                          <p className="text-slate-500 text-xs mt-0.5">{food.portion}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-1.5 rounded-full hidden sm:block" style={{ background: 'rgba(255,255,255,0.06)' }}>
                            <div className="h-full rounded-full" style={{ width: `${calPct}%`, background: meta.color }} />
                          </div>
                          <span className="text-sm font-bold tabular-nums" style={{ color: meta.color }}>{food.calories}</span>
                          <span className="text-slate-600 text-xs">kcal</span>
                        </div>
                      </motion.div>
                    )
                  })}

                  <button
                    onClick={(e) => { e.stopPropagation(); onToggle() }}
                    className="w-full mt-1 py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
                    style={eaten
                      ? { background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981' }
                      : { background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.28)', color: '#00F0FF' }
                    }
                  >
                    {eaten ? <RefreshCw className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    <span>{eaten ? 'Unmark as eaten' : 'Mark meal as eaten'}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export function MealTimeline({ meals, onToggleMeal }: MealTimelineProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-5"
    >
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.15)' }}
          >
            <Flame className="w-5 h-5 text-[#00F0FF]" />
          </div>
          <h2 className="text-white font-bold text-lg sm:text-xl tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Today&apos;s Meal Plan Timeline
          </h2>
        </div>
        <p className="text-sm text-slate-500 hidden md:block">
          {meals.length} planned meals · Click &apos;Log Meal&apos; to update intake live
        </p>
      </div>

      {/* Meal cards */}
      <div className="space-y-4">
        {meals.map((meal, i) => (
          <MealCard key={`${meal.type}-${i}`} meal={meal} index={i} onToggle={() => onToggleMeal(i)} />
        ))}
      </div>
    </motion.div>
  )
}