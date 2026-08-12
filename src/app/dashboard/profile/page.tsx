'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/stores/authStore'
import { Input, Select } from '@/components/ui'
import { ACTIVITY_LEVELS, GOALS } from '@/types'
import { calculateCalories } from '@/lib/utils'
import {
  User, Target, ArrowRight, Check, Sparkles, Flame, ChevronRight,
  Scale, Ruler, Calendar, Shield, Zap, Activity,
} from 'lucide-react'

const GENDER_OPTIONS = [
  { value: 'male', label: '👨 Male', color: '#38bdf8' },
  { value: 'female', label: '👩 Female', color: '#f43f5e' },
]

const GOAL_ICONS: Record<string, string> = {
  lose: '🔥',
  gain: '💪',
  maintain: '⚖️',
}

const GOAL_COLORS: Record<string, string> = {
  lose: '#f43f5e',
  gain: '#34d399',
  maintain: '#38bdf8',
}

const ACTIVITY_EMOJIS: Record<string, string> = {
  sedentary: '🪑',
  light: '🚶',
  moderate: '🏃',
  active: '⚡',
  very_active: '🏋️',
}

export default function ProfilePage() {
  const router = useRouter()
  const { profile } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    full_name: profile?.full_name || '',
    gender: profile?.gender || '',
    age: profile?.age?.toString() || '',
    weight: profile?.weight?.toString() || '',
    height: profile?.height?.toString() || '',
    activity_level: profile?.activity_level || '',
    goal: profile?.goal || '',
  })

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }))

  const canStep1 = form.full_name && form.gender && form.age
  const canStep2 = form.weight && form.height && form.activity_level
  const canSubmit = canStep2 && form.goal

  const estCalories = form.weight && form.height && form.age && form.gender && form.activity_level && form.goal
    ? calculateCalories(form.gender, +form.age, +form.weight, +form.height, form.activity_level, form.goal)
    : null

  const handleSubmit = async () => {
    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      full_name: form.full_name,
      gender: form.gender as 'male' | 'female',
      age: parseInt(form.age),
      weight: parseFloat(form.weight),
      height: parseFloat(form.height),
      activity_level: form.activity_level as 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active',
      goal: form.goal as 'lose' | 'gain' | 'maintain',
      updated_at: new Date().toISOString(),
    })
    if (!error) {
      await useAuthStore.getState().fetchProfile()
      setSaved(true)
      setTimeout(() => router.push('/dashboard'), 1200)
    }
    setLoading(false)
  }

  const steps = [
    { title: 'Personal Info', icon: User, color: '#34d399' },
    { title: 'Biometrics', icon: Target, color: '#f97316' },
    { title: 'Fitness Goal', icon: Flame, color: '#a855f7' },
  ]

  return (
    <div className="w-full space-y-6 pb-12">

      {/* ── Page Header ── */}
      <div className="relative rounded-3xl overflow-hidden p-6" style={{ background: 'linear-gradient(135deg, rgba(6,11,24,0.98) 0%, rgba(10,20,40,0.95) 100%)', border: '1px solid rgba(52,211,153,0.12)' }}>
        <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)', transform: 'translate(20%,-30%)' }} />
        <div className="relative flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center glow-ring" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(5,150,105,0.15))', border: '1px solid rgba(16,185,129,0.3)' }}>
            <Sparkles className="w-7 h-7 text-primary-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {profile?.full_name ? 'Update Health Identity' : 'Set Up Your Health Profile'}
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">Personalize your AI coaching and daily calorie targets</p>
          </div>
        </div>
      </div>

      {/* ── Step Indicator ── */}
      <div className="flex items-center gap-0 px-2">
        {steps.map((s, i) => {
          const num = i + 1
          const isActive = step >= num
          const isCurrent = step === num
          const isDone = step > num
          const Icon = s.icon
          return (
            <div key={i} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${isCurrent ? 'scale-110' : ''}`}
                  style={isActive
                    ? { background: `linear-gradient(135deg, ${s.color}33, ${s.color}18)`, border: `1px solid ${s.color}50`, boxShadow: isCurrent ? `0 0 20px ${s.color}40` : 'none', color: s.color }
                    : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: '#475569' }
                  }
                >
                  {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <p className="text-[10px] font-semibold" style={{ color: isActive ? s.color : '#475569' }}>{s.title}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-px mx-2 mb-4" style={{ background: step > num + 1 ? '#34d399' : 'rgba(255,255,255,0.08)' }} />
              )}
            </div>
          )
        })}
      </div>

      {/* ── Step 1: Personal Info ── */}
      {step === 1 && (
        <div className="card-obsidian p-6 space-y-5 animate-slide-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.2)' }}>
              <User className="w-4 h-4 text-primary-400" />
            </div>
            <h2 className="text-base font-bold text-white">Personal Information</h2>
          </div>

          <div className="space-y-1">
            <label className="section-label">Full Name</label>
            <input
              className="glass-input"
              placeholder="e.g. Mahdi Djeridi"
              value={form.full_name}
              onChange={(e) => update('full_name', e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="section-label">Gender</label>
            <div className="grid grid-cols-2 gap-3">
              {GENDER_OPTIONS.map((g) => (
                <button
                  key={g.value}
                  onClick={() => update('gender', g.value)}
                  className="py-3 rounded-2xl font-semibold text-sm transition-all hover:scale-[1.02]"
                  style={form.gender === g.value
                    ? { background: `${g.color}18`, border: `2px solid ${g.color}45`, color: g.color, boxShadow: `0 0 16px ${g.color}20` }
                    : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }
                  }
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="section-label">Age</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input
                className="glass-input pl-10"
                type="number"
                placeholder="e.g. 25"
                value={form.age}
                onChange={(e) => update('age', e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!canStep1}
            className="w-full btn-obsidian-primary disabled:opacity-40"
          >
            Continue — Biometrics
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── Step 2: Biometrics ── */}
      {step === 2 && (
        <div className="card-obsidian p-6 space-y-5 animate-slide-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.2)' }}>
              <Scale className="w-4 h-4 text-orange-400" />
            </div>
            <h2 className="text-base font-bold text-white">Body Measurements</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="section-label">Weight (kg)</label>
              <div className="relative">
                <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input className="glass-input pl-10" type="number" placeholder="e.g. 80" value={form.weight} onChange={(e) => update('weight', e.target.value)} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="section-label">Height (cm)</label>
              <div className="relative">
                <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input className="glass-input pl-10" type="number" placeholder="e.g. 178" value={form.height} onChange={(e) => update('height', e.target.value)} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="section-label">Activity Level</label>
            <div className="space-y-2">
              {ACTIVITY_LEVELS.map((level) => (
                <button
                  key={level.value}
                  onClick={() => update('activity_level', level.value)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left"
                  style={form.activity_level === level.value
                    ? { background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)', boxShadow: '0 0 12px rgba(249,115,22,0.1)' }
                    : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }
                  }
                >
                  <span className="text-xl">{ACTIVITY_EMOJIS[level.value] || '🏃'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white">{level.label}</p>
                  </div>
                  {form.activity_level === level.value && <Check className="w-4 h-4 text-orange-400" />}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl text-sm font-semibold text-slate-400 transition-all" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              ← Back
            </button>
            <button onClick={() => setStep(3)} disabled={!canStep2} className="flex-[2] btn-obsidian-primary disabled:opacity-40">
              Continue — Fitness Goal <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Fitness Goal ── */}
      {step === 3 && (
        <div className="card-obsidian p-6 space-y-5 animate-slide-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.2)' }}>
              <Flame className="w-4 h-4 text-purple-400" />
            </div>
            <h2 className="text-base font-bold text-white">Fitness Goal</h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {GOALS.map((g) => {
              const color = GOAL_COLORS[g.value] || '#34d399'
              const emoji = GOAL_ICONS[g.value] || '🎯'
              return (
                <button
                  key={g.value}
                  onClick={() => update('goal', g.value)}
                  className="flex flex-col items-center gap-2 py-4 rounded-2xl transition-all hover:scale-[1.02]"
                  style={form.goal === g.value
                    ? { background: `${color}15`, border: `2px solid ${color}45`, boxShadow: `0 0 20px ${color}20` }
                    : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }
                  }
                >
                  <span className="text-2xl">{emoji}</span>
                  <p className="text-xs font-bold" style={{ color: form.goal === g.value ? color : '#94a3b8' }}>{g.label}</p>
                </button>
              )
            })}
          </div>

          {/* Calorie estimate preview */}
          {estCalories && (
            <div
              className="p-4 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.03))', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.15)' }}>
                  <Zap className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">AI Estimated Daily Target</p>
                  <p className="text-2xl font-extrabold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {estCalories} <span className="text-sm font-normal text-slate-500">kcal/day</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl text-sm font-semibold text-slate-400 transition-all" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit || loading}
              className="flex-[2] btn-obsidian-primary disabled:opacity-40"
            >
              {loading ? (
                <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Saving…</>
              ) : saved ? (
                <><Check className="w-4 h-4" /> Saved! Redirecting…</>
              ) : (
                <><Shield className="w-4 h-4" /> Save Health Identity</>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
