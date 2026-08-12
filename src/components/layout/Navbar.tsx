'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui'
import { Zap, Menu, X, Sparkles, ArrowRight } from 'lucide-react'

const navLinks = [
  { href: '/#features',    label: 'Features' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/#pricing',     label: 'Pricing' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-2'
          : 'py-4 bg-transparent'
      }`}
      style={
        scrolled
          ? {
              background: 'rgba(4,8,18,0.92)',
              backdropFilter: 'blur(28px) saturate(200%)',
              WebkitBackdropFilter: 'blur(28px) saturate(200%)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
            }
          : {}
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div
              className={`rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
                scrolled ? 'w-9 h-9' : 'w-10 h-10'
              }`}
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                boxShadow: '0 0 20px rgba(16,185,129,0.4)',
              }}
            >
              <Zap className={`text-white fill-white transition-all duration-300 ${scrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
            </div>
            <span
              className="font-bold text-lg text-white tracking-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              NutriSaaS
            </span>
            {/* Beta badge */}
            <span
              className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-widest uppercase"
              style={{
                background: 'rgba(52,211,153,0.1)',
                border: '1px solid rgba(52,211,153,0.2)',
                color: '#34d399',
              }}
            >
              <Sparkles className="w-2.5 h-2.5" />
              AI Beta
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors duration-250 group rounded-xl"
              >
                {link.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-primary-400 to-primary-300 rounded-full transition-all duration-300 group-hover:w-3/4" />
              </Link>
            ))}
          </nav>

          {/* ── Auth CTA ── */}
          <div className="hidden md:flex items-center gap-2.5">
            {user ? (
              <Link href="/dashboard">
                <Button variant="primary" size="sm" glow className="gap-2">
                  Dashboard <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm" glow className="gap-2">
                    Get Started <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 hover:bg-white/[0.07]"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5">
              <Menu className={`w-5 h-5 absolute inset-0 text-slate-400 transition-all duration-300 ${mobileOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
              <X    className={`w-5 h-5 absolute inset-0 text-slate-400 transition-all duration-300 ${mobileOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          background: 'rgba(4,8,18,0.98)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
        }}
      >
        <div className="px-4 py-5 space-y-1.5 border-t border-white/[0.05]">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-300 hover:text-white rounded-2xl hover:bg-white/[0.05] transition-all duration-200 animate-slide-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {link.label}
              <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
            </Link>
          ))}

          <div className="pt-3 border-t border-white/[0.05] space-y-2">
            {user ? (
              <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                <Button variant="primary" className="w-full" glow>Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full">Sign In</Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" className="w-full" glow>Get Started Free</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
