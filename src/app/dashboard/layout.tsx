'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { useUIStore } from '@/stores/uiStore'
import { Sidebar, MobileHeader } from '@/components/layout'
import { Zap } from 'lucide-react'

// These must match the width values in Sidebar.tsx
const SIDEBAR_OPEN_W  = 264  // px — matches 'w-[264px]' in Sidebar
const SIDEBAR_MINI_W  =  76  // px — matches 'md:w-[76px]' in Sidebar

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, loading, fetchProfile } = useAuthStore()
  const { sidebarOpen } = useUIStore()

  // Track whether we're on a desktop viewport so we can decide whether to
  // apply the left-padding offset. On mobile the sidebar is off-canvas.
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #060b18 0%, #040812 100%)' }}
      >
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[140px] animate-pulse"
          style={{ background: 'rgba(16,185,129,0.08)' }}
        />
        <div className="relative text-center animate-scale-in">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-breathe"
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              boxShadow: '0 0 50px rgba(16,185,129,0.4)',
            }}
          >
            <Zap className="w-10 h-10 text-white fill-white" />
          </div>
          <p className="text-slate-400 text-sm font-semibold tracking-wide">Initializing HealthAI…</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  // On desktop: pad the main content left by the current sidebar width so it
  // never goes underneath the fixed sidebar.  The transition duration matches
  // the sidebar's own CSS transition so they move together.
  // On mobile: the sidebar flies in as an overlay, so no padding is needed.
  const contentPaddingLeft = isDesktop
    ? sidebarOpen ? SIDEBAR_OPEN_W : SIDEBAR_MINI_W
    : 0

  return (
    <div
      className="min-h-screen text-slate-100 relative overflow-x-hidden font-sans"
      style={{ background: 'linear-gradient(180deg, #060b18 0%, #040812 100%)' }}
    >
      {/* ── Ambient background depth ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute top-0 left-1/3 w-[1000px] h-[700px] rounded-full blur-[220px]"
          style={{ background: 'rgba(139,92,246,0.03)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[900px] h-[600px] rounded-full blur-[200px]"
          style={{ background: 'rgba(16,185,129,0.03)' }}
        />
      </div>

      {/* ── Fixed sidebar (handles its own mobile backdrop & dock) ── */}
      <Sidebar />

      {/*
        ── Main content area ──
        padding-left tracks the sidebar width exactly.
        transition matches sidebar's own 300ms ease-in-out width transition.
      */}
      <main
        data-dashboard-main
        className="relative z-10 min-h-screen pb-28 md:pb-12"
        style={{
          paddingLeft: `${contentPaddingLeft}px`,
          transition: 'padding-left 300ms ease-in-out',
        }}
      >
        {/* Mobile Header Bar */}
        <MobileHeader />

        {/*
          Inner content container:
          – full width within the padded area
          – capped at 1400px so ultra-wide screens don't look sparse
          – centered with mx-auto
          – generous horizontal padding for breathing room
        */}
        <div className="w-full px-3.5 sm:px-6 lg:px-8 xl:px-10 py-4 sm:py-6 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
