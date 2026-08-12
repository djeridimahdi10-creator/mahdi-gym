'use client'

import Link from 'next/link'
import { Menu, Activity, Bell, Search, Sparkles } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useUIStore } from '@/stores/uiStore'
import { Avatar } from '@/components/ui'

export function MobileHeader() {
  const { profile } = useAuthStore()
  const { toggleSidebar, setSidebarOpen } = useUIStore()

  const userName = profile?.full_name?.split(' ')[0] || 'Mahdi'
  const userInitial = userName.charAt(0).toUpperCase()

  return (
    <header
      className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 border-b transition-all"
      style={{
        background: 'rgba(6, 11, 24, 0.94)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderColor: 'rgba(255, 255, 255, 0.07)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Left: Hamburger Menu & Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          aria-label="Open menu"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Menu className="w-5 h-5 text-emerald-400" />
        </button>

        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #0d9488 55%, #6366f1 130%)',
              boxShadow: '0 0 16px rgba(16,185,129,0.4)',
            }}
          >
            <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <span
              className="block text-base font-black text-white leading-none tracking-tight"
              style={{ fontFamily: "'Space Grotesk','Inter',sans-serif" }}
            >
              HealthAI
            </span>
            <span className="block text-[9px] font-semibold text-emerald-400 tracking-[0.08em] uppercase mt-0.5">
              Nutri·Coach
            </span>
          </div>
        </Link>
      </div>

      {/* Right: Search, Notifications & Avatar */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Search"
          className="w-8.5 h-8.5 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Search className="w-4 h-4" />
        </button>

        <Link
          href="/dashboard/profile"
          className="relative flex items-center justify-center p-0.5 rounded-full"
        >
          {profile?.avatar_url ? (
            <Avatar src={profile.avatar_url} fallback={userInitial} size="sm" />
          ) : (
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                border: '1.5px solid rgba(52,211,153,0.4)',
                boxShadow: '0 0 10px rgba(16,185,129,0.3)',
              }}
            >
              {userInitial}
            </div>
          )}
        </Link>
      </div>
    </header>
  )
}
