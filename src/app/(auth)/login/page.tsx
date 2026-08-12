'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/stores/authStore'
import { Input } from '@/components/ui'
import { AuthBrandPanel } from '@/components/auth/AuthBrandPanel'
import {
  Zap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  LockKeyhole,
  Loader2,
  AlertCircle,
  Check,
} from 'lucide-react'

// Social Login Brand SVGs
function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#EA4335"
        d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
      />
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
      />
      <path
        fill="#FBBC05"
        d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-1.9z"
      />
      <path
        fill="#34A853"
        d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
      />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.68-.83 1.14-1.98.99-3.14-.99.04-2.18.66-2.88 1.48-.63.73-1.18 1.91-1.03 3.04 1.11.09 2.23-.55 2.92-1.38z" />
    </svg>
  )
}

function MicrosoftIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 23 23">
      <path fill="#f35325" d="M1 1h10v10H1z" />
      <path fill="#81bc06" d="M12 1h10v10H12z" />
      <path fill="#05a6f0" d="M1 12h10v10H1z" />
      <path fill="#ffba08" d="M12 12h10v10H12z" />
    </svg>
  )
}

const socialButtons = [
  { key: 'google', label: 'Google', icon: <GoogleIcon />, hover: 'hover:border-red-400/40 hover:shadow-[0_0_20px_rgba(234,67,53,0.15)]' },
  { key: 'apple', label: 'Apple', icon: <AppleIcon />, hover: 'hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]' },
  { key: 'microsoft', label: 'Microsoft', icon: <MicrosoftIcon />, hover: 'hover:border-blue-400/40 hover:shadow-[0_0_20px_rgba(5,166,240,0.15)]' },
]

export default function LoginPage() {
  const router = useRouter()
  const { loginAsDemo } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [capsLock, setCapsLock] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
        setLoading(false)
        return
      }

      router.push('/dashboard')
    } catch {
      setError('Failed to connect to authentication server. Try Instant Demo Access below!')
    }

    setLoading(false)
  }

  const handleDemoLogin = () => {
    loginAsDemo()
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-dark-950 text-white relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background ambient glowing radial mesh gradients */}
      <div className="absolute top-1/4 left-10 w-[600px] h-[600px] bg-emerald-500/12 rounded-full blur-[180px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-10 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[180px] pointer-events-none animate-float-slow" />
      <div className="absolute inset-0 hero-grid-overlay opacity-25 pointer-events-none" />

      {/* Central Global Wrapper */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-10 lg:py-16 min-h-screen flex items-center justify-center relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center w-full">

          {/* Left Column: Visual Storytelling Panel */}
          <div className="hidden lg:block w-full">
            <AuthBrandPanel />
          </div>

          {/* Right Column: Centered Sign-In Form */}
          <div className="w-full max-w-md mx-auto">
            {/* Mobile Header Brand (lg:hidden) */}
            <Link
              href="/"
              className="lg:hidden inline-flex items-center gap-2.5 mb-8 group animate-slide-down"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25 transition-transform duration-300 group-hover:scale-105">
                <Zap className="w-5 h-5 text-dark-950 fill-dark-950" />
              </div>
              <span className="font-display font-bold text-lg text-white tracking-tight">NutriSaaS</span>
            </Link>

            {/* Form Card Header */}
            <div className="mb-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/25 text-[11px] font-bold uppercase tracking-widest text-emerald-300 mb-4 shadow-[0_0_20px_rgba(52,211,153,0.15)] backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>✦ WELCOME BACK</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                Sign in to continue
              </h2>
              <p className="text-dark-400 text-sm sm:text-base leading-relaxed">
                Enter your details to access your nutrition dashboard.
              </p>
            </div>

            {/* ── Form Card ── */}
            <div className="relative rounded-3xl overflow-hidden animate-slide-up stagger-1" style={{
              background: 'linear-gradient(165deg, rgba(13,20,36,0.95) 0%, rgba(8,13,26,0.97) 60%, rgba(6,10,20,0.98) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(28px) saturate(180%)',
              WebkitBackdropFilter: 'blur(28px) saturate(180%)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.75), 0 0 60px rgba(16,185,129,0.07), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}>
              {/* Top gradient hairline */}
              <div className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none" style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(52,211,153,0.7) 30%, rgba(139,92,246,0.5) 65%, transparent 100%)',
              }} />

              {/* Corner glows */}
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 70%)' }} />
              <div className="absolute -bottom-20 -left-16 w-56 h-56 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)' }} />

              <div className="relative p-8 sm:p-10">
                {/* Social Login Row */}
                <div className="mb-6">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-dark-400 text-center mb-3.5">
                    Sign in with
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {socialButtons.map((btn) => (
                      <button
                        key={btn.key}
                        type="button"
                        onClick={handleDemoLogin}
                        disabled={loading}
                        title={`Sign in with ${btn.label}`}
                        aria-label={`Sign in with ${btn.label}`}
                        className={`h-12 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-all duration-300 flex items-center justify-center group cursor-pointer hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${btn.hover}`}
                      >
                        <span className="transition-transform duration-300 group-hover:scale-110">
                          {btn.icon}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Social Divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px bg-white/[0.08]" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-dark-500">
                    or email
                  </span>
                  <div className="flex-1 h-px bg-white/[0.08]" />
                </div>

                {/* Email & Password Form */}
                <form onSubmit={handleLogin} noValidate>
                  {error && (
                    <div className="mb-5 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3 animate-pop-in" role="alert">
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span className="flex-1">{error}</span>
                    </div>
                  )}

                  <div className="space-y-5">
                    <Input
                      label="Email Address"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      icon={<Mail className="w-4 h-4" />}
                      isValid={/\S+@\S+\.\S+/.test(email)}
                      autoFocus
                      required
                    />

                    <div>
                      <Input
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => setCapsLock(e.getModifierState('CapsLock'))}
                        onKeyUp={(e) => setCapsLock(e.getModifierState('CapsLock'))}
                        icon={<Lock className="w-4 h-4" />}
                        rightElement={
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="focus:outline-none p-1.5 rounded-xl text-dark-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            title={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        }
                        required
                      />
                      {/* Caps Lock hint */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${capsLock && password ? 'max-h-6 mt-2 opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-300/90">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                          Caps Lock is on — your password will be typed in capitals
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Form Options: Remember Me & Forgot Password */}
                  <div className="mt-6 mb-6 flex items-center justify-between">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                      <span
                        className={`relative w-[18px] h-[18px] rounded-[6px] border transition-all duration-200 flex items-center justify-center ${
                          remember
                            ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.4)]'
                            : 'bg-white/[0.04] border-white/15 group-hover:border-white/35'
                        }`}
                      >
                        <Check
                          className="w-3 h-3 text-dark-950 stroke-[3.5] transition-all duration-200"
                          style={{ opacity: remember ? 1 : 0, transform: remember ? 'scale(1)' : 'scale(0.5)' }}
                        />
                      </span>
                      <span className="text-xs font-medium text-dark-300 group-hover:text-white transition-colors">
                        Remember me
                      </span>
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="sr-only"
                      />
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs font-semibold text-emerald-300 hover:text-emerald-200 transition-colors underline-offset-4 hover:underline decoration-emerald-400/40"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Primary CTA Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="relative overflow-hidden group w-full h-12 rounded-2xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-600 hover:from-emerald-300 hover:to-emerald-500 text-dark-950 font-extrabold text-sm shadow-[0_8px_30px_rgba(16,185,129,0.35)] hover:shadow-[0_12px_45px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-wait disabled:hover:translate-y-0"
                  >
                    {/* Shimmer overlay */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                    <span className="relative z-10 flex items-center gap-2">
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin stroke-[2.5]" />
                          Signing in…
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                  </button>
                </form>

                {/* Secondary Action Divider */}
                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-white/[0.08]" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-dark-500">or</span>
                  <div className="flex-1 h-px bg-white/[0.08]" />
                </div>

                {/* Secondary Ghost Button: Demo Access */}
                <button
                  onClick={handleDemoLogin}
                  type="button"
                  disabled={loading}
                  className="w-full h-12 px-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-400/40 transition-all duration-300 flex items-center justify-center gap-2.5 text-sm font-semibold text-dark-200 hover:text-white group cursor-pointer hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Sparkles className="w-4 h-4 text-emerald-300 animate-breathe" />
                  Try Instant Demo Access
                </button>
              </div>
            </div>

            {/* Footer Link */}
            <p className="text-center text-sm text-dark-400 mt-8 animate-slide-up stagger-2">
              New to NutriSaaS?{' '}
              <Link
                href="/signup"
                className="text-emerald-300 hover:text-emerald-200 font-semibold transition-colors underline underline-offset-4 decoration-emerald-400/40"
              >
                Create an account
              </Link>
            </p>

            {/* Security & Trust Badges */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-4 text-[11px] text-dark-500 font-medium">
              <span className="flex items-center gap-1">
                <LockKeyhole className="w-3 h-3 text-emerald-400/80" /> 256-Bit SSL
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400/80" /> Privacy Guard
              </span>
              <span>•</span>
              <span>SOC2 Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}