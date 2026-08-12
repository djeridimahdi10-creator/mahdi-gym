'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquareText, Activity, Utensils, BrainCircuit, Lightbulb, CalendarRange, ChevronDown, ShieldCheck } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { AIBriefingHero } from './AIBriefingHero'
import { SectionBlock, FeatureLaunchCard, MetaChip, STAGGER_CONTAINER } from './HubShared'
import { AICoachInsights } from '@/components/nutrition'
import type { HubNavigate } from './HubShared'

export function HubAICoach({ onNavigate }: { onNavigate: HubNavigate }) {
  const { setModalOpen } = useNutritionStore()
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <motion.section variants={STAGGER_CONTAINER} initial="hidden" animate="show" className="space-y-10">
      {/* ── AI Daily Briefing ── */}
      <AIBriefingHero />

      {/* ── Feature grid ── */}
      <section className="space-y-5">
        <SectionBlock
          badge="🤖"
          title="AI Coach"
          subtitle="Pick a capability — each one answers a different question about your data."
        />
        <motion.div variants={STAGGER_CONTAINER} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          <FeatureLaunchCard
            icon={MessageSquareText}
            title="Ask My Data"
            description="Ask questions about your nutrition, meals, workouts and progress."
            actionLabel="Ask AI"
            accent="#00F0FF"
            onAction={() => setModalOpen('askdata', true)}
          />
          <FeatureLaunchCard
            icon={Activity}
            title="Analyze My Progress"
            description="Deep algorithmic audit of your adherence and training intensity."
            actionLabel="Run Analysis"
            accent="#3b82f6"
            onAction={() => setModalOpen('diagnostic', true)}
          />
          <FeatureLaunchCard
            icon={Utensils}
            title="AI Meal Recommendations"
            description="Let AI choose your next meal from remaining macros and taste."
            actionLabel="See Suggestion"
            accent="#10b981"
            onAction={() => onNavigate('nutrition')}
          />
          <FeatureLaunchCard
            icon={BrainCircuit}
            title="AI Diagnostics"
            description="&quot;Why am I not progressing?&quot; — run the full diagnostic audit."
            actionLabel="Run Diagnostic"
            accent="#A855F7"
            onAction={() => setModalOpen('diagnostic', true)}
          />
          <FeatureLaunchCard
            icon={Lightbulb}
            title="Habit Intelligence"
            description="Patterns discovered from your satiety logs and eating routine."
            actionLabel="View Habits"
            accent="#FFB300"
            onAction={() => onNavigate('nutrition')}
          />
          <FeatureLaunchCard
            icon={CalendarRange}
            title="Weekly AI Review"
            description="Seven-day evaluation with a grade and next-week strategy."
            actionLabel="See Review"
            accent="#f43f5e"
            onAction={() => onNavigate('progress')}
          />
        </motion.div>
      </section>

      {/* ── Live advice ── */}
      <section className="space-y-5">
        <SectionBlock
          badge="⚡"
          title="Live Advice"
          subtitle="Real-time tactical recommendations for the rest of your day."
          right={
            <MetaChip color="#10b981">
              <ShieldCheck className="w-3.5 h-3.5" />
              Always on track
            </MetaChip>
          }
        />
        <AICoachInsights tips={[]} onRegenerate={() => {}} loading={false} />
      </section>

      {/* ── Advanced diagnostics (collapsible) ── */}
      <section className="space-y-4">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full rounded-3xl p-6 flex items-center justify-between gap-4 text-left transition-colors hover:border-white/15"
          style={{ background: 'rgba(17,23,36,0.85)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10">
              <BrainCircuit className="w-5 h-5 text-slate-300" />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Advanced Insights
              </p>
              <p className="text-sm text-slate-400 mt-0.5">
                Deep-dive diagnostics for power users — hidden here to keep your daily view simple.
              </p>
            </div>
          </div>
          <motion.span animate={{ rotate: showAdvanced ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="w-5 h-5 text-slate-400" />
          </motion.span>
        </button>

        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div
                className="rounded-3xl p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,240,255,0.08) 0%, rgba(17,23,36,0.95) 100%)',
                  border: '1px solid rgba(0,240,255,0.25)',
                }}
              >
                <div>
                  <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    &quot;Why Am I Not Progressing?&quot; Diagnostic
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Deep algorithmic audit across nutrition, weight history, macro adherence and workout intensity.
                  </p>
                </div>
                <motion.button
                  onClick={() => setModalOpen('diagnostic', true)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 rounded-2xl text-sm font-bold text-black flex-shrink-0 bg-[#00F0FF] hover:bg-[#00F0FF]/90 shadow-lg shadow-[#00F0FF]/20"
                >
                  Run Diagnostic Audit →
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.section>
  )
}