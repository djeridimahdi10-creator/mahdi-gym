'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/stores/authStore'
import {
  User, Sliders, Bell, Globe, Shield, Zap, Bot, Check, Save, Lock,
  Download, Trash2, Moon, Sun, Activity, Heart, ChevronRight, Sparkles,
} from 'lucide-react'

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full flex-shrink-0 transition-all duration-300 ${enabled ? 'shadow-glow-primary' : ''}`}
      style={{ background: enabled ? '#10b981' : 'rgba(255,255,255,0.1)' }}
    >
      <span
        className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300"
        style={{ left: enabled ? 'calc(100% - 20px)' : '4px', boxShadow: enabled ? '0 0 8px rgba(16,185,129,0.7)' : 'none' }}
      />
    </button>
  )
}

function SettingsSection({ title, icon: Icon, iconColor, children }: {
  title: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; iconColor: string; children: React.ReactNode;
}) {
  return (
    <div className="card-obsidian p-5 sm:p-6 space-y-4 animate-fade-in">
      <div className="flex items-center gap-3 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${iconColor}18`, border: `1px solid ${iconColor}28` }}>
          <Icon className="w-4 h-4" style={{ color: iconColor }} />
        </div>
        <h3 className="text-sm font-bold text-white">{title}</h3>
      </div>
      {children}
    </div>
  )
}

export default function SettingsPage() {
  const { user, profile } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'account' | 'preferences' | 'health' | 'ai' | 'privacy'>('account')
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [language, setLanguage] = useState('English')
  const [theme, setTheme] = useState<'dark' | 'cyber' | 'light'>('dark')
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric')
  const [coachingStyle, setCoachingStyle] = useState('Encouraging')
  const [aiLanguage, setAiLanguage] = useState('English')
  const [goal, setGoal] = useState('Muscle Gain')
  const [activity, setActivity] = useState('Moderate Activity (3-5 days/week)')
  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    workoutAlerts: true,
    aiTips: true,
    streakAlerts: true,
  })

  const handleSave = () => {
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  const tabs = [
    { id: 'account', label: 'Account', icon: User, color: '#34d399', desc: 'Profile & Security' },
    { id: 'preferences', label: 'Preferences', icon: Sliders, color: '#38bdf8', desc: 'Language & Theme' },
    { id: 'health', label: 'Health Goals', icon: Heart, color: '#f43f5e', desc: 'Targets & Units' },
    { id: 'ai', label: 'AI Coach', icon: Bot, color: '#a855f7', desc: 'Tone & Style' },
    { id: 'privacy', label: 'Privacy', icon: Shield, color: '#fbbf24', desc: 'Permissions & Export' },
  ] as const

  return (
    <div className="space-y-5 w-full pb-12">

      {/* ── Page Header ── */}
      <div
        className="relative rounded-3xl overflow-hidden p-6"
        style={{ background: 'linear-gradient(135deg, rgba(6,11,24,0.98) 0%, rgba(10,20,40,0.95) 100%)', border: '1px solid rgba(100,116,139,0.12)' }}
      >
        <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(100,116,139,0.05) 0%, transparent 70%)', transform: 'translate(20%,-30%)' }} />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(100,116,139,0.1)', border: '1px solid rgba(100,116,139,0.2)' }}>
              <Sliders className="w-6 h-6 text-slate-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)', color: '#34d399' }}>System Config</span>
                <span className="text-[10px] text-slate-600">NutriSaaS v2.4</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Application Settings
              </h1>
              <p className="text-slate-500 text-xs mt-0.5">Customize your health assistant, notifications, and AI coaching.</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all self-start sm:self-auto"
            style={savedSuccess
              ? { background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)', color: '#34d399' }
              : { background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', boxShadow: '0 0 20px rgba(16,185,129,0.3)' }
            }
          >
            {savedSuccess ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Settings</>}
          </button>
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* ── Left: Tab Navigation ── */}
        <div className="lg:col-span-3 space-y-3">
          <div className="card-obsidian p-2 flex flex-row overflow-x-auto lg:flex-col gap-1.5 lg:space-y-0.5" style={{ scrollbarWidth: 'none' }}>
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex-shrink-0 lg:w-full flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl transition-all text-left whitespace-nowrap"
                  style={isActive
                    ? { background: `${tab.color}12`, border: `1px solid ${tab.color}28` }
                    : { border: '1px solid transparent' }
                  }
                >
                  <div
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={isActive
                      ? { background: `${tab.color}20`, border: `1px solid ${tab.color}35`, color: tab.color }
                      : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#475569' }
                    }
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold" style={{ color: isActive ? 'white' : '#64748b' }}>{tab.label}</p>
                    <p className="hidden lg:block text-[10px] text-slate-700 truncate mt-0.5">{tab.desc}</p>
                  </div>
                  <ChevronRight className="hidden lg:block w-3.5 h-3.5 flex-shrink-0" style={{ color: isActive ? tab.color : '#1e293b' }} />
                </button>
              )
            })}
          </div>


          {/* Health Identity link */}
          <div className="card-obsidian p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)' }}>
                <User className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Health Identity</p>
                <p className="text-[10px] text-slate-600">Weight, height & TDEE</p>
              </div>
            </div>
            <Link href="/dashboard/profile" className="text-xs font-bold text-primary-400 hover:text-primary-300 transition-colors">
              View →
            </Link>
          </div>
        </div>

        {/* ── Right: Content ── */}
        <div className="lg:col-span-9 space-y-4">

          {/* ACCOUNT */}
          {activeTab === 'account' && (
            <SettingsSection title="Account Information" icon={User} iconColor="#34d399">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="section-label">Full Name</label>
                  <input className="glass-input" type="text" defaultValue={profile?.full_name || 'Mahdi Djeridi'} />
                </div>
                <div className="space-y-1">
                  <label className="section-label">Email Address</label>
                  <input className="glass-input" type="email" defaultValue={user?.email || 'user@example.com'} disabled style={{ opacity: 0.5, cursor: 'not-allowed' }} />
                  <p className="text-[10px] text-slate-600">Contact support to change your email.</p>
                </div>
                <div className="pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="section-label mb-2">Security</p>
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:scale-[1.01]" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Lock className="w-3.5 h-3.5 text-primary-400" />
                    Update Password
                  </button>
                </div>
              </div>
            </SettingsSection>
          )}

          {/* PREFERENCES */}
          {activeTab === 'preferences' && (
            <div className="space-y-4">
              <SettingsSection title="Interface Language" icon={Globe} iconColor="#38bdf8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {['English', 'Français', 'العربية', 'Algerian Darija'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold text-center transition-all"
                      style={language === lang
                        ? { background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.3)', color: '#38bdf8' }
                        : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', color: '#64748b' }
                      }
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </SettingsSection>

              <SettingsSection title="Color Theme" icon={Moon} iconColor="#a855f7">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'dark', label: 'Obsidian Dark', icon: Moon, color: '#10b981' },
                    { id: 'cyber', label: 'Cyber Purple', icon: Sparkles, color: '#a855f7' },
                    { id: 'light', label: 'Pure Light', icon: Sun, color: '#f59e0b' },
                  ].map((t) => {
                    const Icon = t.icon
                    const sel = theme === t.id
                    return (
                      <button key={t.id} onClick={() => setTheme(t.id as 'dark' | 'cyber' | 'light')} className="p-4 rounded-2xl text-left transition-all" style={sel ? { background: `${t.color}12`, border: `1px solid ${t.color}35` } : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                        <Icon className="w-5 h-5 mb-2" style={{ color: t.color }} />
                        <p className="text-xs font-bold text-white">{t.label}</p>
                        {sel && <Check className="w-3.5 h-3.5 mt-1" style={{ color: t.color }} />}
                      </button>
                    )
                  })}
                </div>
              </SettingsSection>

              <SettingsSection title="Notification Reminders" icon={Bell} iconColor="#fbbf24">
                <div className="space-y-3">
                  {Object.entries(notifications).map(([key, enabled]) => {
                    const labels: Record<string, { title: string; desc: string }> = {
                      dailyReminder: { title: 'Daily Meal & Water Reminders', desc: 'Alerts when behind on hydration or logging' },
                      workoutAlerts: { title: 'Workout Consistency Alerts', desc: 'Reminders for your scheduled training sessions' },
                      aiTips: { title: 'AI Coach Smart Tips', desc: 'Daily personalized recommendations' },
                      streakAlerts: { title: 'Streak Protection Alerts', desc: 'Alerts when your streak is at risk' },
                    }
                    const info = labels[key]
                    return (
                      <div key={key} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div>
                          <p className="text-xs font-bold text-white">{info.title}</p>
                          <p className="text-[10px] text-slate-600 mt-0.5">{info.desc}</p>
                        </div>
                        <Toggle enabled={enabled} onToggle={() => setNotifications((p) => ({ ...p, [key]: !enabled }))} />
                      </div>
                    )
                  })}
                </div>
              </SettingsSection>
            </div>
          )}

          {/* HEALTH GOALS */}
          {activeTab === 'health' && (
            <div className="space-y-4">
              <SettingsSection title="Measurement Units" icon={Activity} iconColor="#f43f5e">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'metric', label: '🌍 Metric', desc: 'kg, cm, ml' },
                    { id: 'imperial', label: '🇺🇸 Imperial', desc: 'lbs, in, oz' },
                  ].map((u) => (
                    <button
                      key={u.id}
                      onClick={() => setUnits(u.id as 'metric' | 'imperial')}
                      className="py-3 px-4 rounded-xl text-left transition-all"
                      style={units === u.id
                        ? { background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)' }
                        : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }
                      }
                    >
                      <p className="text-sm font-bold text-white">{u.label}</p>
                      <p className="text-[10px] text-slate-600 mt-0.5">{u.desc}</p>
                    </button>
                  ))}
                </div>
              </SettingsSection>

              <SettingsSection title="Fitness Objective" icon={Heart} iconColor="#f43f5e">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {['Muscle Gain', 'Fat Loss', 'Maintain', 'Endurance'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGoal(g)}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold text-center transition-all"
                      style={goal === g
                        ? { background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }
                        : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', color: '#64748b' }
                      }
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </SettingsSection>
            </div>
          )}

          {/* AI COACH */}
          {activeTab === 'ai' && (
            <div className="space-y-4">
              <SettingsSection title="AI Coaching Style" icon={Bot} iconColor="#a855f7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { style: 'Encouraging', emoji: '🌟', desc: 'Positive, motivating, empathetic' },
                    { style: 'Strict Coach', emoji: '🔥', desc: 'Direct, disciplined, no-excuses' },
                    { style: 'Analytical', emoji: '📊', desc: 'Data-focused, scientific breakdown' },
                    { style: 'Friendly Mentor', emoji: '🤝', desc: 'Casual, conversational guidance' },
                  ].map((s) => (
                    <button
                      key={s.style}
                      onClick={() => setCoachingStyle(s.style)}
                      className="p-3.5 rounded-2xl text-left transition-all"
                      style={coachingStyle === s.style
                        ? { background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.3)', boxShadow: '0 0 16px rgba(168,85,247,0.1)' }
                        : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }
                      }
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{s.emoji}</span>
                        <p className="text-xs font-bold text-white">{s.style}</p>
                        {coachingStyle === s.style && <Check className="w-3.5 h-3.5 text-purple-400 ml-auto" />}
                      </div>
                      <p className="text-[10px] text-slate-600">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </SettingsSection>

              <SettingsSection title="AI Chat Language" icon={Globe} iconColor="#a855f7">
                <div className="grid grid-cols-3 gap-2.5">
                  {['English', 'العربية', 'Darija'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setAiLanguage(lang)}
                      className="py-2.5 rounded-xl text-xs font-bold text-center transition-all"
                      style={aiLanguage === lang
                        ? { background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.3)', color: '#c084fc' }
                        : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', color: '#64748b' }
                      }
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </SettingsSection>
            </div>
          )}

          {/* PRIVACY */}
          {activeTab === 'privacy' && (
            <SettingsSection title="Privacy & Data Controls" icon={Shield} iconColor="#fbbf24">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div>
                    <p className="text-xs font-bold text-white">Export Health Data</p>
                    <p className="text-[10px] text-slate-600 mt-0.5">Download all logs, meals and workouts as JSON/CSV</p>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white transition-all hover:scale-[1.02]" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Download className="w-3.5 h-3.5 text-primary-400" />
                    Export
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.15)' }}>
                  <div>
                    <p className="text-xs font-bold text-red-400">⚠️ Danger Zone: Reset Health Logs</p>
                    <p className="text-[10px] text-slate-600 mt-0.5">Clear all meal entries and AI chat history</p>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
                    <Trash2 className="w-3.5 h-3.5" />
                    Reset
                  </button>
                </div>
              </div>
            </SettingsSection>
          )}
        </div>
      </div>
    </div>
  )
}
