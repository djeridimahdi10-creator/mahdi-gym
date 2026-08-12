'use client'

import { motion } from 'framer-motion'
import { Dumbbell, Zap, Flame, Plus, Info, Clock3, Moon, UtensilsCrossed } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { useNutritionData } from './useNutritionData'
import { SectionBlock, HubCard, AnimatedNumber, MetaChip, STAGGER_CONTAINER, STAGGER } from './HubShared'

function FuelCard({
  icon: Icon,
  tag,
  title,
  kcal,
  protein,
  carbs,
  fat,
  timing,
  note,
  accent,
  onLog,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  tag: string
  title: string
  kcal: number
  protein: number
  carbs: number
  fat: number
  timing: string
  note: string
  accent: string
  onLog: () => void
}) {
  return (
    <motion.div
      variants={STAGGER}
      className="rounded-3xl p-6 sm:p-8 flex flex-col gap-6"
      style={{ background: 'rgba(17,23,36,0.92)', border: `1px solid ${accent}28` }}
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${accent}14`, border: `1px solid ${accent}35` }}>
            <Icon className="w-5 h-5" style={{ color: accent }} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
              {tag}
            </p>
            <h3 className="text-lg font-bold text-white mt-0.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {title}
            </h3>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-300 bg-white/5 border border-white/10">
          <Clock3 className="w-3.5 h-3.5" style={{ color: accent }} />
          {timing}
        </span>
      </div>

      <div className="rounded-2xl p-5 flex items-end justify-between gap-4 flex-wrap" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Suggested intake</p>
          <p className="flex items-baseline gap-1.5 mt-0.5">
            <AnimatedNumber value={kcal} className="text-4xl font-extrabold text-white tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }} />
            <span className="text-base text-slate-500 font-semibold">kcal</span>
          </p>
        </div>
        <div className="flex gap-2.5">
          {[
            { l: `P ${protein}g`, c: '#FFB300' },
            { l: `C ${carbs}g`, c: '#A855F7' },
            { l: `F ${fat}g`, c: '#FF5C8D' },
          ].map((m) => (
            <span key={m.l} className="px-3.5 py-2 rounded-xl text-sm font-bold tabular-nums" style={{ background: `${m.c}12`, color: m.c, border: `1px solid ${m.c}25` }}>
              {m.l}
            </span>
          ))}
        </div>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed">{note}</p>

      <motion.button
        onClick={onLog}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="w-full py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
        style={{ background: `${accent}16`, color: accent, border: `1px solid ${accent}38` }}
      >
        <Plus className="w-4 h-4" />
        <span>Log {title.split('(')[0].trim()} →</span>
      </motion.button>
    </motion.div>
  )
}

export function HubTraining() {
  const { addMealFood } = useNutritionStore()
  const d = useNutritionData()

  const workout = d.todayWorkout

  return (
    <motion.section variants={STAGGER_CONTAINER} initial="hidden" animate="show" className="space-y-10">
      <SectionBlock
        badge="🏋️"
        title="Training & Nutrition"
        subtitle="Your workout and today's nutrition are one connected system."
        right={
          workout ? (
            <MetaChip color="#A855F7">
              <Dumbbell className="w-3.5 h-3.5" />
              Synced with Iron Command
            </MetaChip>
          ) : undefined
        }
      />

      {workout ? (
        <>
          {/* ── Workout hero ── */}
          <motion.div
            variants={STAGGER}
            className="relative rounded-3xl overflow-hidden p-8 sm:p-10"
            style={{
              background: 'linear-gradient(135deg, rgba(124,92,252,0.10) 0%, rgba(17,23,36,0.96) 100%)',
              border: '1px solid rgba(124,92,252,0.3)',
              boxShadow: '0 0 45px rgba(124,92,252,0.06)',
            }}
          >
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
              <div className="space-y-4 min-w-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-purple-500/15 border border-purple-500/35">
                    <Dumbbell className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-purple-300">Today&apos;s Workout</p>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {workout.name}
                    </h2>
                  </div>
                </div>
                <p className="text-base text-slate-300 leading-relaxed max-w-xl">
                  {workout.isHeavy >= 1 ? 'Heavy session detected' : 'Standard session'} — your targets have been adapted to
                  refuel glycogen and support recovery.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <MetaChip color="#FFB300">+{workout.caloriesBonus} kcal bonus</MetaChip>
                  <MetaChip color="#c084fc">+{workout.proteinBonus}g protein bonus</MetaChip>
                  <MetaChip color="#00F0FF">Heavy intensity</MetaChip>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5 xl:w-80">
                <div className="rounded-2xl p-5 bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Calories</p>
                  <p className="text-2xl font-extrabold text-white tabular-nums mt-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {d.targets.calories.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">base {d.baseTargets.calories.toLocaleString()}</p>
                </div>
                <div className="rounded-2xl p-5 bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Protein</p>
                  <p className="text-2xl font-extrabold text-amber-400 tabular-nums mt-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {d.targets.protein}g
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">base {d.baseTargets.protein}g</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Pre / Post fuel ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FuelCard
              icon={Zap}
              tag="Pre-Workout Fuel"
              title="Banana & Whey Shake"
              kcal={320}
              protein={24}
              carbs={48}
              fat={3}
              timing="60 min before"
              accent="#FFB300"
              note="Quick-digesting carbs to top off muscle glycogen reserves so you train harder."
              onLog={() =>
                addMealFood(2, {
                  name: '⚡ Pre-Workout Fuel (Banana & Whey Shake)',
                  portion: '1 shake + 1 banana',
                  calories: 320,
                  protein: 24,
                  carbs: 48,
                  fat: 3,
                })
              }
            />
            <FuelCard
              icon={Flame}
              tag="Post-Workout Recovery"
              title="Hypertrophy Meal (Chicken & Rice)"
              kcal={520}
              protein={42}
              carbs={70}
              fat={8}
              timing="within 45 min"
              accent="#A855F7"
              note="High-leucine protein plus fast carbs to kick off muscle protein synthesis."
              onLog={() =>
                addMealFood(3, {
                  name: '🏋️ Hypertrophy Recovery Meal (Chicken & Rice)',
                  portion: '1 full meal',
                  calories: 520,
                  protein: 42,
                  carbs: 70,
                  fat: 8,
                })
              }
            />
          </div>

          {/* ── Why timing matters ── */}
          <section className="space-y-5">
            <SectionBlock badge="⏱️" title="Why Timing Matters" subtitle="Three simple rules that make training nutrition effective." />
            <motion.div variants={STAGGER_CONTAINER} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon: Zap, title: 'Glycogen top-off', desc: 'Carbs 60 minutes before training raise energy and delay fatigue.', color: '#FFB300' },
                { icon: Flame, title: 'Anabolic window', desc: 'Protein within 45 minutes post-workout maximizes muscle protein synthesis.', color: '#A855F7' },
                { icon: Moon, title: 'Overnight recovery', desc: 'Your elevated targets (incl. bonus carbs) replenish stores before tomorrow.', color: '#00F0FF' },
              ].map((c) => (
                <motion.div key={c.title} variants={STAGGER} className="rounded-3xl p-6 sm:p-7 flex flex-col gap-4" style={{ background: 'rgba(17,23,36,0.9)', border: `1px solid ${c.color}22` }}>
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: `${c.color}14`, border: `1px solid ${c.color}30` }}>
                    <c.icon className="w-5 h-5" style={{ color: c.color }} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{c.title}</h3>
                    <p className="text-sm text-slate-400 mt-1 leading-relaxed">{c.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </>
      ) : (
        <HubCard className="p-10 flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 rounded-3xl flex items-center justify-center bg-white/5 border border-white/10">
            <UtensilsCrossed className="w-7 h-7 text-slate-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Rest day</h2>
            <p className="text-sm text-slate-400 mt-1">No workout scheduled today — your base targets apply.</p>
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            Log a workout in the gym section to unlock pre/post nutrition guidance.
          </p>
        </HubCard>
      )}
    </motion.section>
  )
}