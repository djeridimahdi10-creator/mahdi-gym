'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui'
import { Zap, Menu, X, ArrowRight, LayoutDashboard, Globe } from 'lucide-react'

interface NavbarProps {
  activeSection?: string
  lang?: 'EN' | 'DZ'
  onLangChange?: (lang: 'EN' | 'DZ') => void
  showLangToggle?: boolean
}

export function Navbar({
  activeSection: externalActiveSection,
  lang: externalLang,
  onLangChange,
  showLangToggle = true,
}: NavbarProps = {}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [internalLang, setInternalLang] = useState<'EN' | 'DZ'>('EN')
  const [internalActiveSection, setInternalActiveSection] = useState('')
  const { user } = useAuthStore()
  const pathname = usePathname()

  const currentLang = externalLang ?? internalLang
  const handleLangToggle = (newLang: 'EN' | 'DZ') => {
    if (onLangChange) {
      onLangChange(newLang)
    } else {
      setInternalLang(newLang)
    }
  }

  // Scroll listener for glass elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Section spy if externalActiveSection is not provided
  useEffect(() => {
    if (externalActiveSection !== undefined || pathname !== '/') return
    const ids = ['features', 'how-it-works', 'faq']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setInternalActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [externalActiveSection, pathname])

  const activeSection = externalActiveSection ?? internalActiveSection

  const navLinks = [
    { href: '/#features', id: 'features', label: 'Features' },
    { href: '/how-it-works', id: 'how-it-works', label: 'How It Works' },
    { href: '/#faq', id: 'faq', label: 'FAQ' },
  ]

  return (
    <header className="fixed top-3.5 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-6xl transition-all duration-300">
      <div
        className={`rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-500 ${
          scrolled ? 'glass-dock-scrolled' : 'glass-dock'
        }`}
      >
        <div className="flex items-center justify-between gap-4 sm:gap-8">
          
          {/* ── Brand Logo ── */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-400 via-primary-500 to-teal-600 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.35)] group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300">
              <div className="absolute inset-[1px] rounded-[11px] sm:rounded-[15px] bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
              <Zap className="w-5 h-5 text-dark-950 fill-dark-950 stroke-[2.2] group-hover:rotate-6 transition-transform duration-300" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight leading-none group-hover:text-primary-300 transition-colors">
                NutriSaaS<span className="text-primary-400">AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.15)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AI 2.0
              </span>
            </div>
          </Link>

          {/* ── Desktop Navigation Links ── */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(0,0,0,0.4)]">
            {navLinks.map((link) => {
              const isSectionActive = pathname === '/' && activeSection === link.id
              const isPathActive = pathname === link.href
              const isActive = isSectionActive || isPathActive

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-emerald-500/15 border border-emerald-400/35 shadow-[0_0_15px_rgba(52,211,153,0.2)]'
                      : 'text-dark-300 hover:text-white hover:bg-white/[0.06] border border-transparent'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-0.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* ── Desktop Actions (Language & Auth) ── */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {/* Language Switcher */}
            {showLangToggle && (
              <div className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10 shadow-inner">
                <button
                  type="button"
                  onClick={() => handleLangToggle('DZ')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    currentLang === 'DZ'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-dark-950 font-extrabold shadow-[0_0_12px_rgba(52,211,153,0.3)]'
                      : 'text-dark-400 hover:text-white'
                  }`}
                >
                  <span className="text-[11px]">🇩🇿</span> DZ
                </button>
                <button
                  type="button"
                  onClick={() => handleLangToggle('EN')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    currentLang === 'EN'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-dark-950 font-extrabold shadow-[0_0_12px_rgba(52,211,153,0.3)]'
                      : 'text-dark-400 hover:text-white'
                  }`}
                >
                  <span className="text-[11px]">🇬🇧</span> EN
                </button>
              </div>
            )}

            {/* Auth Buttons */}
            {user ? (
              <Link href="/dashboard">
                <Button
                  variant="primary"
                  size="sm"
                  glow
                  className="rounded-full gap-2 px-5 text-xs font-bold shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-xs font-bold text-dark-300 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/[0.06]"
                >
                  Sign In
                </Link>
                <Link href="/signup">
                  <Button
                    variant="primary"
                    size="sm"
                    glow
                    className="rounded-full text-xs font-extrabold px-5 py-2 text-dark-950 bg-gradient-to-r from-emerald-400 via-primary-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(52,211,153,0.5)] border-none transition-all duration-300"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* ── Mobile Menu Toggle Button ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.05] border border-white/10 text-dark-300 hover:text-white hover:bg-white/[0.09] transition-all cursor-pointer shadow-sm active:scale-95"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden mt-3 overflow-hidden glass-dock-scrolled rounded-3xl p-5 shadow-2xl space-y-4"
          >
            {/* Mobile Language Switcher */}
            {showLangToggle && (
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold text-dark-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-primary-400" />
                  Language
                </span>
                <div className="flex items-center p-1 rounded-full bg-white/[0.05] border border-white/10">
                  <button
                    type="button"
                    onClick={() => handleLangToggle('DZ')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      currentLang === 'DZ'
                        ? 'bg-primary-400 text-dark-950 font-extrabold shadow-sm'
                        : 'text-dark-300'
                    }`}
                  >
                    🇩🇿 DZ
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLangToggle('EN')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      currentLang === 'EN'
                        ? 'bg-primary-400 text-dark-950 font-extrabold shadow-sm'
                        : 'text-dark-300'
                    }`}
                  >
                    🇬🇧 EN
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-dark-200 hover:text-white hover:bg-white/[0.06] rounded-xl transition-all"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-dark-500" />
                </Link>
              ))}
            </div>

            {/* Mobile CTA Area */}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              {user ? (
                <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" className="w-full justify-center text-sm py-3 rounded-xl" glow>
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Open Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" className="w-full justify-center text-sm py-2.5 rounded-xl border border-white/10">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setMobileOpen(false)}>
                    <Button
                      variant="primary"
                      className="w-full justify-center bg-gradient-to-r from-emerald-400 to-teal-400 text-dark-950 font-extrabold text-sm py-3 rounded-xl shadow-lg shadow-emerald-500/20"
                    >
                      Get Started Free
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
