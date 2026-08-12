'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Activity, Sparkles, AlertCircle, CheckCircle2, ShieldAlert, ArrowRight, RefreshCw } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'

export function ProgressDiagnosticModal() {
  const { diagnosticModalOpen, setModalOpen } = useNutritionStore()
  const [analyzing, setAnalyzing] = useState(false)
  const [diagnosticsRun, setDiagnosticsRun] = useState(true)

  if (!diagnosticModalOpen) return null

  const handleRunDiagnostic = () => {
    setAnalyzing(true)
    setTimeout(() => {
      setAnalyzing(false)
      setDiagnosticsRun(true)
    }, 1200)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          className="relative w-full max-w-2xl rounded-3xl p-6 space-y-5 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(12,18,34,0.98) 0%, rgba(8,12,24,0.98) 100%)',
            border: '1px solid rgba(0,240,255,0.3)',
            boxShadow: '0 0 50px rgba(0,240,255,0.1)',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#00F0FF]/15 text-[#00F0FF] flex items-center justify-center border border-[#00F0FF]/30">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Progress Diagnostic AI
                </h2>
                <p className="text-slate-400 text-xs">&quot;Why am I not progressing?&quot; Holistic AI Root Cause Analysis</p>
              </div>
            </div>

            <button
              onClick={() => setModalOpen('diagnostic', false)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {analyzing ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="w-10 h-10 text-[#00F0FF] animate-spin" />
              <p className="text-white text-sm font-bold">Analyzing Nutrition, Weight Trajectory & Workout Log Correlation...</p>
              <p className="text-slate-500 text-xs">Evaluating 30-day macronutrient balance and hydration pacing</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
              {/* 1. What I Found */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <div className="flex items-center gap-2 text-[#00F0FF] font-bold text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>1. What I Found</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Your calorie intake is strictly aligned on weekdays (averaging 2,820 kcal/day), but weekend logging shows an unrecorded surplus of ~450 kcal on Saturdays and a protein deficit (-35g) on Sundays.
                </p>
              </div>

              {/* 2. Why It May Be Happening */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <AlertCircle className="w-4 h-4" />
                  <span>2. Why It May Be Happening</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Untracked weekend dining out causes hidden fats/oils to spike your weekly maintenance calories, offsetting your weekday deficit/surplus trajectory.
                </p>
              </div>

              {/* 3. What to Change */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>3. Tactical Changes Recommended</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Use <strong>Restaurant Mode</strong> on weekend meals to accurately estimate eating out.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Add a high-protein shake on Sunday afternoons to maintain 185g target.</span>
                  </li>
                </ul>
              </div>

              {/* Disclaimer */}
              <p className="text-[10px] text-slate-500 italic text-center">
                * Note: Recommendations are strictly fitness and nutrition-based data projections, not medical advice.
              </p>

              <button
                onClick={handleRunDiagnostic}
                className="w-full py-3 rounded-2xl text-xs font-bold bg-[#00F0FF] hover:bg-[#00F0FF]/90 text-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#00F0FF]/20"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Re-Run Live Diagnostic</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
