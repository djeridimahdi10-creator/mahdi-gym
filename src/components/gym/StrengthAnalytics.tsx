'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, TrendingUp, Zap, Plus, X, Award, CheckCircle2, Dumbbell } from 'lucide-react'

export interface PersonalRecord {
  id: string
  label: string
  value: string
  trend: string
  color: string
  icon: string
  category: string
  date: string
}

const INITIAL_RECORDS: PersonalRecord[] = [
  { id: '1', label: 'Barbell Bench Press', value: '100 kg', trend: '+5 kg', color: '#00F0FF', icon: '🏋️', category: 'Chest Push', date: 'This week' },
  { id: '2', label: 'Conventional Deadlift', value: '160 kg', trend: '+10 kg', color: '#10b981', icon: '⚡', category: 'Posterior Chain', date: '2 weeks ago' },
  { id: '3', label: 'Barbell Back Squat', value: '120 kg', trend: '+8 kg', color: '#7C5CFC', icon: '🦵', category: 'Quad Hypertrophy', date: 'Last week' },
  { id: '4', label: 'Overhead Press (OHP)', value: '70 kg', trend: '+2.5 kg', color: '#FFB300', icon: '🔥', category: 'Shoulder Power', date: 'Yesterday' },
]

export function StrengthAnalytics() {
  const [records, setRecords] = useState<PersonalRecord[]>(INITIAL_RECORDS)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedLift, setSelectedLift] = useState(records[0]?.id || '1')
  const [newWeight, setNewWeight] = useState('')
  const [savedFeedback, setSavedFeedback] = useState(false)

  const handleUpdatePR = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newWeight) return

    setRecords((prev) =>
      prev.map((r) => {
        if (r.id === selectedLift) {
          return {
            ...r,
            value: `${newWeight} kg`,
            trend: `+${(parseFloat(newWeight) - parseFloat(r.value)).toFixed(1)} kg`,
            date: 'Today',
          }
        }
        return r
      })
    )

    setSavedFeedback(true)
    setTimeout(() => {
      setSavedFeedback(false)
      setModalOpen(false)
      setNewWeight('')
    }, 1200)
  }

  return (
    <div id="strength-analytics-section" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center glow-ring"
            style={{ background: 'rgba(255,179,0,0.12)', border: '1px solid rgba(255,179,0,0.25)' }}
          >
            <Trophy className="w-5 h-5 text-[#FFB300]" />
          </div>
          <div>
            <h2 className="text-white font-bold text-base sm:text-lg flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Personal Records & Benchmarks
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                1RM Max
              </span>
            </h2>
            <p className="text-slate-400 text-xs">Track your peak single-rep strength benchmarks across the big compound lifts</p>
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all self-start sm:self-auto cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, rgba(255,179,0,0.2), rgba(255,92,141,0.2))',
            border: '1px solid rgba(255,179,0,0.3)',
          }}
        >
          <Plus className="w-3.5 h-3.5 text-[#FFB300]" />
          <span>Log New PR</span>
        </button>
      </div>

      {/* 3D Benchmark Trophy Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {records.map((pr, index) => (
          <motion.div
            key={pr.id}
            className="group relative rounded-3xl p-5 flex flex-col justify-between transition-all overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${pr.color}0D 0%, rgba(15,23,42,0.85) 100%)`,
              border: `1px solid ${pr.color}25`,
              boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
              transformStyle: 'preserve-3d',
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            whileHover={{
              y: -5,
              scale: 1.02,
              borderColor: `${pr.color}50`,
              boxShadow: `0 20px 40px ${pr.color}18, 0 0 30px ${pr.color}10`,
            }}
          >
            {/* Ambient Corner Glow */}
            <div
              className="absolute -top-10 -right-10 w-24 h-24 rounded-full pointer-events-none blur-[40px] opacity-40"
              style={{ background: pr.color }}
            />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{pr.icon}</span>
                <span
                  className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' }}
                >
                  <TrendingUp className="w-2.5 h-2.5" /> {pr.trend}
                </span>
              </div>

              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                {pr.category}
              </span>
              <h3 className="text-white font-bold text-sm leading-snug mt-0.5">
                {pr.label}
              </h3>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-baseline justify-between">
              <span
                className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tight"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {pr.value}
              </span>
              <span className="text-slate-500 text-[10px]">{pr.date}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Simplified Weekly Strength Summary Bento */}
      <div
        className="rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-5"
        style={{
          background: 'linear-gradient(135deg, rgba(0,240,255,0.04) 0%, rgba(124,92,252,0.06) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.2)' }}
          >
            <Zap className="w-6 h-6 text-[#00F0FF]" />
          </div>
          <div>
            <h4 className="text-white font-bold text-sm">Hypertrophy Overload Index: 92%</h4>
            <p className="text-slate-400 text-xs mt-0.5">
              You are lifting within the optimal hypertrophic resistance zone across 4 major muscle groups.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 self-stretch md:self-auto justify-around md:justify-end">
          <div className="text-center">
            <p className="text-white font-black text-base tabular-nums">41,200 kg</p>
            <p className="text-slate-500 text-[10px] uppercase font-bold">Week Volume</p>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-emerald-400 font-black text-base tabular-nums">4 Days</p>
            <p className="text-slate-500 text-[10px] uppercase font-bold">Gym Streak</p>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-[#FFB300] font-black text-base tabular-nums">Optimal</p>
            <p className="text-slate-500 text-[10px] uppercase font-bold">Recovery</p>
          </div>
        </div>
      </div>

      {/* Modal: Log New PR */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
            />

            <motion.div
              className="relative w-full max-w-md rounded-3xl p-6 z-10 space-y-5"
              style={{
                background: 'linear-gradient(135deg, #0d1424 0%, #101b33 100%)',
                border: '1px solid rgba(255,179,0,0.3)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(255,179,0,0.15)',
              }}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-[#FFB300]" />
                  <h3 className="text-white font-bold text-base">Record New Personal Best</h3>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 rounded-xl bg-white/5 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {savedFeedback ? (
                <div className="py-8 text-center space-y-2 animate-scale-in">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <p className="text-white font-bold text-base">New PR Recorded! 🚀</p>
                  <p className="text-slate-400 text-xs">Keep up the progressive overload momentum.</p>
                </div>
              ) : (
                <form onSubmit={handleUpdatePR} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                      Select Compound Lift
                    </label>
                    <select
                      value={selectedLift}
                      onChange={(e) => setSelectedLift(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                    >
                      {records.map((r) => (
                        <option key={r.id} value={r.id} className="bg-slate-900 text-white">
                          {r.label} (Current: {r.value})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                      New 1RM Weight (kg)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.5"
                        required
                        placeholder="e.g. 105"
                        value={newWeight}
                        onChange={(e) => setNewWeight(e.target.value)}
                        className="w-full pl-3.5 pr-12 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold focus:outline-none focus:border-amber-400"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">
                        kg
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    style={{
                      background: 'linear-gradient(135deg, #FFB300 0%, #f59e0b 100%)',
                      color: '#000000',
                      boxShadow: '0 0 20px rgba(255,179,0,0.3)',
                    }}
                  >
                    <Trophy className="w-4 h-4" />
                    <span>Save Milestone</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
