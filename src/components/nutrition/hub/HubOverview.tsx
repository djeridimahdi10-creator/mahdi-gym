'use client'

import { motion } from 'framer-motion'
import { Zap, Activity, Droplets, UtensilsCrossed, Camera, Mic, Sparkles, ArrowRight, Info, Flame, Minus, Plus } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { NutritionOrb } from '@/components/nutrition'
import { useNutritionData } from './useNutritionData'
import { AIBriefingHero } from './AIBriefingHero'
import { SectionBlock, HubCard, BigProgressBar, AnimatedNumber, MetaChip, HUB_CARD_BASE, STAGGER_CONTAINER, STAGGER, type HubNavigate } from './HubShared'

/* ── Single big metric row: label + large number + full-width bar ── */
function OverviewMetric({
  icon: Icon,
  label,
  current,
  target,
  unit,
  color,
  hint,
  actions,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  label: string
  current: number
  target: number
  unit: string
  color: string
  hint: string
  actions?: React.ReactNode
}) {
  const pct = Math.min(100, Math.round((current / (target || 1)) * 100))

  return (
    <div className="space-y-2.5">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: `${color}14`, border: `1px solid ${color}30` }}
          >
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{label}</p>
            <div className="flex items-baseline gap-1.5">
              <AnimatedNumber value={current} className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }} />
              <span className="text-base font-semibold text-slate-500">
                / {target} {unit}
              </span>
            </div>
          </div>
        </div>
        {actions ?? (
          <span
            className="px-3 py-1.5 rounded-full text-xs font-bold tabular-nums"
            style={{ background: `${color}12`, color, border: `1px solid ${color}30` }}
          >
            {pct}%
          </span>
        )}
      </div>
      <BigProgressBar value={pct} color={color} height={14} />
      <p className="text-xs text-slate-500">{hint}</p>
    </div>
  )
}

/* ── Adaptive target card ── */
function TargetCard({
  label,
  value,
  unit,
  color,
  base,
  bonus,
  bonusLabel,
}: {
  label: string
  value: number
  unit: string
  color: string
  base: number
  bonus?: number
  bonusLabel?: string
}) {
  return (
    <motion.div
      variants={STAGGER}
      className="rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-4"
      style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}26` }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-bold text-slate-300">{label}</span>
        {bonus ? (
          <span
            className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold"
            style={{ background: `${color}16`, color, border: `1px solid ${color}35` }}
          >
            +{bonus} {unit} {bonusLabel ?? 'workout'}
          </span>
        ) : (
          <span
            className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold"
            style={{ background: `${color}10`, color, border: `1px solid ${color}25` }}
          >
            Standard
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <AnimatedNumber value={value} className="text-4xl sm:text-5xl font-extrabold tabular-nums" style={{ color, fontFamily: 'Space Grotesk, sans-serif' }} />
        <span className="text-sm font-semibold text-slate-500">{unit}/day</span>
      </div>

      <p className="text-xs text-slate-500">
        Base: {base.toLocaleString()} {unit} <span className="text-slate-600">·</span> adjusted for today&apos;s training
      </p>
    </motion.div>
  )
}

export function HubOverview({ onNavigate }: { onNavigate: HubNavigate }) {
  const { updateWater, setModalOpen } = useNutritionStore()
  const d = useNutritionData()

  return (
    <motion.section variants={STAGGER_CONTAINER} initial="hidden" animate="show" className="space-y-10">
      {/* ── 1. AI Briefing ── */}
      <AIBriefingHero />

      {/* ── 2. Today's Nutrition: 3D core + the four essential metrics ── */}
      <section className="space-y-5">
        <SectionBlock
          badge="🏠"
          title="Today's Nutrition"
          subtitle="The essentials — calories, protein, hydration and meals."
          right={
            <MetaChip color="#10b981">
              <ArrowRight className="w-3.5 h-3.5" />
              <button onClick={() => onNavigate('nutrition')} className="hover:underline">
                Manage meals
              </button>
            </MetaChip>
          }
        />

        <HubCard className="p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* 3D nutrition core */}
            <div className="lg:col-span-5 flex flex-col items-center gap-4">
              <NutritionOrb
                calories={{ current: d.intake.calories, target: d.targets.calories }}
                protein={{ current: d.intake.protein, target: d.targets.protein }}
                carbs={{ current: d.intake.carbs, target: d.targets.carbs }}
                fat={{ current: d.intake.fat, target: d.targets.fat }}
              />
              <div className="text-center space-y-1">
                <p className="text-xl sm:text-2xl font-extrabold text-white tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  <AnimatedNumber value={d.intake.calories} /> <span className="text-slate-500 text-base">/ {d.targets.calories.toLocaleString()} kcal</span>
                </p>
                <p className="text-sm text-slate-400">
                  <span className="font-bold text-[#00F0FF]">{d.remaining.calories.toLocaleString()} kcal</span> remaining today
                </p>
              </div>
            </div>

            {/* Essential metrics */}
            <div className="lg:col-span-7 space-y-7">
              <OverviewMetric
                icon={Zap}
                label="Protein"
                current={d.intake.protein}
                target={d.targets.protein}
                unit="g"
                color="#FFB300"
                hint={d.remaining.protein > 0 ? `${d.remaining.protein}g left to hit your target` : 'Protein target completed 🎉'}
              />

              <OverviewMetric
                icon={Droplets}
                label="Hydration"
                current={Math.round(d.waterConsumed * 10) / 10}
                target={d.waterTarget}
                unit="L"
                color="#38bdf8"
                hint={d.waterConsumed < d.waterTarget ? `${((d.waterTarget - d.waterConsumed) * 1000).toFixed(0)}ml to go — spread it across the day` : 'Hydration completed 💧'}
                actions={
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => updateWater(-0.25)}
                      disabled={d.waterConsumed <= 0}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 disabled:opacity-30"
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold tabular-nums" style={{ background: '#38bdf812', color: '#38bdf8', border: '1px solid #38bdf830' }}>
                      {Math.round(d.waterPct)}%
                    </span>
                    <motion.button
                      onClick={() => updateWater(0.25)}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>
                }
              />

              <OverviewMetric
                icon={UtensilsCrossed}
                label="Meals"
                current={d.mealsLogged}
                target={d.totalMeals}
                unit="logged"
                color="#A855F7"
                hint={d.mealsLogged < d.totalMeals ? `${d.totalMeals - d.mealsLogged} meal${d.totalMeals - d.mealsLogged > 1 ? 's' : ''} left to log` : 'All meals logged 🎉'}
                actions={
                  <div className="flex items-center gap-1.5">
                    {d.meals.map((m, i) => (
                      <span
                        key={i}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm"
                        style={{
                          background: m.eaten ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.04)',
                          border: m.eaten ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(255,255,255,0.1)',
                          filter: m.eaten ? 'none' : 'grayscale(1) opacity(0.55)',
                        }}
                      >
                        {m.type === 'breakfast' ? '🌅' : m.type === 'lunch' ? '☀️' : m.type === 'snack' ? '🍎' : '🌙'}
                      </span>
                    ))}
                  </div>
                }
              />
            </div>
          </div>
        </HubCard>
      </section>

      {/* ── 3. Adaptive Daily Targets ── */}
      <section className="space-y-5">
        <SectionBlock
          badge="⚡"
          title="Adaptive Daily Targets"
          subtitle="Your targets automatically adapt based on today's activity and workout."
          right={
            <MetaChip color="#00F0FF">
              <Info className="w-3.5 h-3.5" />
              {d.todayWorkout ? `${d.todayWorkout.name} detected` : 'Rest day'}
            </MetaChip>
          }
        />

        <motion.div variants={STAGGER_CONTAINER} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <TargetCard label="Calories" value={d.targets.calories} unit="kcal" color="#00F0FF" base={d.baseTargets.calories} bonus={d.todayWorkout?.caloriesBonus || 0} />
          <TargetCard label="Protein" value={d.targets.protein} unit="g" color="#FFB300" base={d.baseTargets.protein} bonus={d.todayWorkout?.proteinBonus || 0} bonusLabel="extra" />
          <TargetCard label="Carbohydrates" value={d.targets.carbs} unit="g" color="#A855F7" base={d.baseTargets.carbs} bonus={d.todayWorkout ? Math.round((d.todayWorkout.caloriesBonus * 0.5) / 4) : 0} bonusLabel="glycogen" />
          <TargetCard label="Fats" value={d.targets.fat} unit="g" color="#FF5C8D" base={d.baseTargets.fat} bonus={d.todayWorkout ? Math.round((d.todayWorkout.caloriesBonus * 0.2) / 9) : 0} bonusLabel="recovery" />
        </motion.div>
      </section>

      {/* ── 4. Quick Actions ── */}
      <section className="space-y-5">
        <SectionBlock badge="🚀" title="Quick Actions" subtitle="The most common things you do every day." />

        <motion.div variants={STAGGER_CONTAINER} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Camera, label: 'Scan a meal', desc: 'Take a photo and let AI log it', color: '#f43f5e', action: () => setModalOpen('scanner', true) },
            { icon: Mic, label: 'Voice log', desc: 'Tell the AI what you ate', color: '#A855F7', action: () => setModalOpen('voice', true) },
            { icon: Sparkles, label: 'Ask My Data', desc: 'Questions about your nutrition', color: '#00F0FF', action: () => setModalOpen('askdata', true) },
            { icon: Flame, label: 'See today\'s meals', desc: 'Log, edit and mark meals eaten', color: '#10b981', action: () => onNavigate('nutrition') },
          ].map((q) => (
            <motion.button
              key={q.label}
              variants={STAGGER}
              onClick={q.action}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-3xl p-6 flex flex-col items-start gap-4 text-left transition-shadow hover:shadow-xl"
              style={{ ...HUB_CARD_BASE, border: `1px solid ${q.color}26` }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${q.color}14`, border: `1px solid ${q.color}35` }}>
                <q.icon className="w-5 h-5" style={{ color: q.color }} />
              </div>
              <div>
                <p className="text-base font-bold text-white">{q.label}</p>
                <p className="text-sm text-slate-400 mt-0.5">{q.desc}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </section>
    </motion.section>
  )
}