'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { Sidebar, MobileHeader } from '@/components/layout'
import { SidebarProvider, SidebarInset } from '@/components/ui'
import { Zap } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, loading, fetchProfile } = useAuthStore()

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
          <p className="text-slate-400 text-sm font-semibold tracking-wide">Initializing NutriCoach...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <>
      {/* Ambient background depth — fixed layer, completely outside the flex shell so it
          never interferes with sidebar stacking context */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #060b18 0%, #040812 100%)' }}
      >
        <div
          className="absolute top-0 left-1/3 w-[1000px] h-[700px] rounded-full blur-[220px]"
          style={{ background: 'rgba(139,92,246,0.02)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[900px] h-[600px] rounded-full blur-[200px]"
          style={{ background: 'rgba(16,185,129,0.02)' }}
        />
      </div>

      {/* SidebarProvider is the outermost flex shell:
          flex min-h-screen w-full — sidebar + main sit side-by-side in normal flow */}
      <SidebarProvider
        defaultOpen={true}
        className="relative z-10 text-slate-100 font-sans"
      >
        {/* Sidebar — sticky in-flow column */}
        <Sidebar />

        {/* Main content — flex-1, min-w-0 prevents content from overflowing */}
        <SidebarInset
          data-dashboard-main
          className="min-h-screen pb-24 md:pb-8"
        >
          <MobileHeader />

          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-5 sm:py-6 lg:py-8">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
