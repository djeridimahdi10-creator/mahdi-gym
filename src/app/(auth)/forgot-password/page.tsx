'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button, Input } from '@/components/ui'
import { AuthBrandPanel } from '@/components/auth/AuthBrandPanel'
import { Zap, Mail, ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      })

      if (resetError) {
        setError(resetError.message)
        setLoading(false)
        return
      }

      setSent(true)
    } catch {
      setError('Failed to connect to the reset service. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-dark-950 lg:flex relative overflow-hidden">
      {/* Brand side (desktop) */}
      <AuthBrandPanel />

      {/* Ambient background (mobile) */}
      <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none lg:hidden" />

      {/* Form side */}
      <div className="relative flex-1 flex items-center justify-center px-5 sm:px-8 py-10 lg:py-0">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link
            href="/"
            className="lg:hidden inline-flex items-center gap-2.5 mb-8 group animate-slide-down"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 via-primary-400 to-energy-400 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25 transition-transform duration-300 group-hover:scale-105">
              <Zap className="w-5 h-5 text-white fill-white/20" />
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">NutriSaaS</span>
          </Link>

          {/* Header */}
          <div className="mb-8 animate-slide-up">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-primary-300 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Account recovery
            </span>
            <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-1.5">
              Reset your password
            </h1>
            <p className="text-dark-400 text-sm">
              Enter your email and we&apos;ll send you a link to get back in
            </p>
          </div>

          {/* Form card */}
          <div className="glass-card-static p-7 sm:p-9 shadow-2xl border border-white/10 rounded-3xl relative overflow-hidden backdrop-blur-2xl animate-slide-up stagger-1">
            {sent ? (
              <div className="text-center py-4 animate-pop-in">
                <div className="w-16 h-16 rounded-full bg-primary-500/15 border border-primary-400/30 flex items-center justify-center mx-auto mb-5 animate-pulse-glow">
                  <CheckCircle2 className="w-8 h-8 text-primary-300" />
                </div>
                <h2 className="font-display text-xl font-bold text-white mb-2">Check your inbox</h2>
                <p className="text-sm text-dark-400 mb-6 leading-relaxed">
                  We sent a reset link to <span className="text-primary-300 font-semibold">{email}</span>.
                  It expires in 30 minutes.
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-300 hover:text-primary-200 transition-colors duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to sign in
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {error && (
                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3 animate-pop-in">
                    <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0 animate-ping" />
                    {error}
                  </div>
                )}

                <Input
                  label="Email Address"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="w-4 h-4" />}
                  isValid={/\S+@\S+\.\S+/.test(email)}
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full mt-2 py-3.5 text-sm font-semibold shadow-lg shadow-primary-500/20"
                  size="lg"
                  loading={loading}
                  disabled={!email.trim()}
                >
                  Send Reset Link
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </form>
            )}
          </div>

          {/* Back to login */}
          <p className="text-center text-sm text-dark-400 mt-6 animate-slide-up stagger-2">
            Remembered it?{' '}
            <Link href="/login" className="text-primary-300 hover:text-primary-200 font-semibold transition-colors duration-300">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
