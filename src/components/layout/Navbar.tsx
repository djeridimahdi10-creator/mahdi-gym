'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui'
import { Zap, Menu, X, ArrowRight, LayoutDashboard, Globe, Terminal, Wifi } from 'lucide-react'

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
        className={`hud-navbar px-5 sm:px-7 py-3 sm:py-3.5 transition-all duration-500 ${
          scrolled ? 'hud-navbar-scrolled' : ''
        }`}
      >
        {/* Scanning beam */}
        <div className="hud-navbar-scan" />

        {/* Corner brackets */}
        <div className="hud-corner hud-corner-tl" />
        <div className="hud-corner hud-corner-tr" />
        <div className="hud-corner hud-corner-bl" />
        <div className="hud-corner hud-corner-br" />

        <div className="flex items-center justify-between gap-4 sm:gap-8 relative z-10">
          
          {/* ── Brand Logo ── */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-primary-500 to-teal-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300" style={{ clipPath: 'inherit' }} />
              <div className="absolute inset-[2px] bg-dark-950/80" style={{ clipPath: 'inherit' }} />
              <Zap className="w-4.5 h-4.5 text-primary-300 fill-primary-400/30 stroke-[2.2] relative z-10 group-hover:text-primary-200 group-hover:drop-shadow-[0_0_6px_rgba(52,211,153,0.6)] transition-all duration-300" />
            </div>
            <div className="flex items-center gap-2.5">
              <span className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight leading-none group-hover:text-primary-300 transition-colors" style={{ fontFamily: "'Space Grotesk', var(--font-sans)" }}>
                Nutri<span className="text-primary-400">SaaS</span><span className="text-dark-500 text-xs font-mono ml-0.5">AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[9px] font-extrabold tracking-[0.2em] uppercase text-primary-300" style={{ clipPath: 'polygon(4px 0%, calc(100% - 4px) 0%, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0% calc(100% - 4px), 0% 4px)', background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.2)' }}>
                <span className="hud-status-dot" />
                v2.0
              </span>
            </div>
          </Link>

          {/* ── Desktop Navigation Links ── */}
          <nav className="hidden md:flex items-center gap-0.5 relative z-10">
            {/* Subtle separator before links */}
            <div className="w-px h-4 bg-gradient-to-b from-transparent via-primary-400/20 to-transparent mr-2" />
            
            {navLinks.map((link) => {
              const isSectionActive = pathname === '/' && activeSection === link.id
              const isPathActive = pathname === link.href
              const isActive = isSectionActive || isPathActive

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hud-nav-link ${isActive ? 'hud-nav-link-active' : ''}`}
                >
                  {link.label}
                </Link>
              )
            })}

            {/* Subtle separator after links */}
            <div className="w-px h-4 bg-gradient-to-b from-transparent via-primary-400/20 to-transparent ml-2" />
          </nav>

          {/* ── Desktop Actions (Language & Auth) ── */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {/* Status indicator */}
            <div className="flex items-center gap-2 mr-1">
              <Wifi className="w-3 h-3 text-primary-400/50" />
              <span className="text-[9px] font-mono font-bold text-dark-500 tracking-wider uppercase">Online</span>
            </div>

            {/* Language Switcher */}
            {showLangToggle && (
              <div className="hud-lang-switch flex items-center p-0.5">
                <button
                  type="button"
                  onClick={() => handleLangToggle('DZ')}
                  className={`px-3 py-1 text-[10px] font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                    currentLang === 'DZ'
                      ? 'hud-lang-btn-active'
                      : 'hud-lang-btn-inactive'
                  }`}
                >
                  <span className="text-[10px]">🇩🇿</span> DZ
                </button>
                <button
                  type="button"
                  onClick={() => handleLangToggle('EN')}
                  className={`px-3 py-1 text-[10px] font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                    currentLang === 'EN'
                      ? 'hud-lang-btn-active'
                      : 'hud-lang-btn-inactive'
                  }`}
                >
                  <span className="text-[10px]">🇬🇧</span> EN
                </button>
              </div>
            )}

            {/* Auth Buttons */}
            {user ? (
              <Link href="/dashboard">
                <button
                  type="button"
                  className="hud-cta-btn px-5 py-2 text-[11px] inline-flex items-center gap-2 cursor-pointer"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10">Dashboard</span>
                  <ArrowRight className="w-3 h-3 relative z-10" />
                </button>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="hud-ghost-btn text-[11px] px-3.5 py-1.5 cursor-pointer"
                >
                  Sign In
                </Link>
                <Link href="/signup">
                  <button
                    type="button"
                    className="hud-cta-btn px-5 py-2 text-[11px] inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Terminal className="w-3 h-3 relative z-10" />
                    <span className="relative z-10">Get Started</span>
                    <ArrowRight className="w-3 h-3 relative z-10" />
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* ── Mobile Menu Toggle Button ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center hud-hamburger transition-all cursor-pointer active:scale-95"
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
            className="md:hidden mt-3 overflow-hidden hud-mobile-menu p-5 shadow-2xl space-y-4"
          >
            {/* System status bar */}
            <div className="flex items-center justify-between pb-3 border-b border-primary-400/10">
              <div className="flex items-center gap-2">
                <div className="hud-status-dot" />
                <span className="text-[9px] font-mono font-bold text-primary-400/60 tracking-[0.2em] uppercase">
                  SYS.NAV // Active
                </span>
              </div>
              {/* Mobile Language Switcher */}
              {showLangToggle && (
                <div className="hud-lang-switch flex items-center p-0.5">
                  <button
                    type="button"
                    onClick={() => handleLangToggle('DZ')}
                    className={`px-2.5 py-0.5 text-[10px] font-bold transition-all cursor-pointer ${
                      currentLang === 'DZ' ? 'hud-lang-btn-active' : 'hud-lang-btn-inactive'
                    }`}
                  >
                    🇩🇿 DZ
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLangToggle('EN')}
                    className={`px-2.5 py-0.5 text-[10px] font-bold transition-all cursor-pointer ${
                      currentLang === 'EN' ? 'hud-lang-btn-active' : 'hud-lang-btn-inactive'
                    }`}
                  >
                    🇬🇧 EN
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-0.5">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="hud-mobile-link flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-mono text-dark-600 font-bold">0{i + 1}</span>
                    <span>{link.label}</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-dark-600 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>

            {/* Mobile CTA Area */}
            <div className="pt-3 border-t border-primary-400/10 flex flex-col gap-2.5">
              {user ? (
                <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                  <button
                    type="button"
                    className="hud-cta-btn w-full px-5 py-3 text-[11px] inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Open Dashboard</span>
                  </button>
                </Link>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    <button
                      type="button"
                      className="w-full py-2.5 text-[11px] hud-ghost-btn border border-primary-400/10 cursor-pointer"
                      style={{ clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)' }}
                    >
                      Sign In
                    </button>
                  </Link>
                  <Link href="/signup" onClick={() => setMobileOpen(false)}>
                    <button
                      type="button"
                      className="hud-cta-btn w-full px-5 py-3 text-[11px] inline-flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Terminal className="w-3.5 h-3.5 relative z-10" />
                      <span className="relative z-10">Initialize Free Account</span>
                      <ArrowRight className="w-3 h-3 relative z-10" />
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Footer terminal line */}
            <div className="pt-2 flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-primary-400/15 to-transparent" />
              <span className="text-[8px] font-mono text-dark-600 tracking-[0.15em] uppercase">NutriSaaS.terminal</span>
              <div className="h-px flex-1 bg-gradient-to-l from-primary-400/15 to-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
