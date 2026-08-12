'use client'

import Link from 'next/link'
import { useMemo, useRef, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { useUIStore } from '@/stores/uiStore'
import { Avatar } from '@/components/ui'
import {
  Activity,
  LayoutDashboard,
  Apple,
  Dumbbell,
  TrendingUp,
  UtensilsCrossed,
  Droplets,
  Bot,
  FileBarChart2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Search,
  Command,
  Flame,
  Crown,
  X,
} from 'lucide-react'

type NavItem = {
  href: string
  label: string
  icon: typeof LayoutDashboard
  section: string
  badge?: string
}

const SECTIONS = ['Overview', 'Tracking', 'Fitness', 'Intelligence', 'System'] as const

const navItems: NavItem[] = [
  { href: '/dashboard',                 label: 'Dashboard', icon: LayoutDashboard, section: 'Overview' },
  { href: '/dashboard/nutrition',       label: 'Nutrition', icon: Apple,           section: 'Tracking' },
  { href: '/dashboard/scan',            label: 'Meals',     icon: UtensilsCrossed, section: 'Tracking' },
  { href: '/dashboard/stats#hydration', label: 'Hydration', icon: Droplets,        section: 'Tracking' },
  { href: '/dashboard/gym',             label: 'Workouts',  icon: Dumbbell,        section: 'Fitness' },
  { href: '/dashboard/stats',           label: 'Progress',  icon: TrendingUp,      section: 'Fitness' },
  { href: '/dashboard/chat',            label: 'AI Coach',  icon: Bot,             section: 'Intelligence', badge: 'PRO' },
  { href: '/dashboard/puter-ai',        label: 'Reports',   icon: FileBarChart2,   section: 'Intelligence' },
  { href: '/dashboard/settings',        label: 'Settings',  icon: Settings,        section: 'System' },
]

const DAY_MS = 86_400_000

function useDemoStreak() {
  const today = new Date()
  const start = new Date('2026-07-28T00:00:00')
  return Math.floor((today.getTime() - start.getTime()) / DAY_MS) + 1
}

export function Sidebar() {
  const pathname = usePathname()
  const { profile, signOut } = useAuthStore()
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useUIStore()
  const [query, setQuery] = useState('')
  const [mounted, setMounted] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  const streak = useDemoStreak()
  const userName = profile?.full_name?.split(' ')[0] || 'Mahdi'
  const userInitial = userName.charAt(0).toUpperCase()

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (!sidebarOpen) setSidebarOpen(true)
        requestAnimationFrame(() => searchRef.current?.focus())
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sidebarOpen, setSidebarOpen])

  const isActive = (href: string) => {
    const base = href.split('#')[0]
    return base === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(base)
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return navItems
    return navItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q)
    )
  }, [query])

  const groups = useMemo(() => {
    return SECTIONS.map((section) => ({
      section,
      items: filtered.filter((item) => item.section === section),
    })).filter((group) => group.items.length > 0)
  }, [filtered])

  const open = sidebarOpen

  const labelStyle = {
    opacity: open ? 1 : 0,
    maxWidth: open ? '170px' : '0px',
    transition: 'opacity 180ms ease, max-width 320ms ease',
    whiteSpace: 'nowrap' as const,
  }

  const closeOnMobile = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) setSidebarOpen(false)
  }

  return (
    <>
      <aside
        className={[
          'fixed left-0 top-0 h-full z-50 flex flex-col',
          'transition-[width,transform] duration-300 ease-in-out',
          open ? 'w-[264px] translate-x-0' : '-translate-x-full md:translate-x-0 md:w-[76px]',
        ].join(' ')}
        style={{
          background:
            'linear-gradient(178deg, rgba(10,16,32,0.96) 0%, rgba(7,11,24,0.97) 55%, rgba(5,9,18,0.98) 100%)',
          backdropFilter: 'blur(24px) saturate(160%)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          boxShadow:
            '10px 0 50px rgba(0,0,0,0.6), inset -1px 0 0 rgba(255,255,255,0.03)',
        }}
      >
        {/* ── Ambient orbs ── */}
        <div className="absolute -top-24 -right-16 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)' }} />
        <div className="absolute bottom-24 -left-16 w-56 h-56 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)' }} />

        {/* ── Top accent line ── */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.55) 30%, rgba(139,92,246,0.4) 60%, rgba(6,182,212,0.25) 80%, transparent 100%)',
          }}
        />

        {/* ═══════════ BRAND ═══════════ */}
        <div className="relative px-4 pt-5 pb-4 flex items-center justify-between flex-shrink-0">
          <Link
            href="/dashboard"
            onClick={closeOnMobile}
            className="flex items-center gap-3 group flex-1 min-w-0"
            style={{ overflow: 'hidden' }}
          >
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform duration-300"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #0d9488 55%, #6366f1 130%)',
                boxShadow: '0 0 24px rgba(16,185,129,0.45), inset 0 1px 0 rgba(255,255,255,0.25)',
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1/2"
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 100%)' }}
              />
              <Activity className="w-5 h-5 text-white relative z-10" strokeWidth={2.5} />
            </div>

            <div className="flex-1 min-w-0 overflow-hidden" style={labelStyle}>
              <span
                className="block text-[17px] font-black text-white leading-none tracking-tight"
                style={{ fontFamily: "'Space Grotesk','Inter',sans-serif" }}
              >
                HealthAI
              </span>
              <span className="block text-[10px] font-semibold text-slate-400 mt-[3px] tracking-[0.08em] uppercase">
                Nutri·Coach
              </span>
            </div>
          </Link>

          <button
            onClick={toggleSidebar}
            aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
            className={[
              'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center',
              'text-slate-500 hover:text-white hover:bg-white/[0.08]',
              'transition-all duration-200 border border-transparent hover:border-white/10',
              !open ? 'mx-auto' : '',
            ].join(' ')}
          >
            {open ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>

        {/* ═══════════ SEARCH ═══════════ */}
        {open ? (
          <div className="relative px-4 pb-3 flex-shrink-0">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors duration-200" />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search menu…"
                className="w-full pl-9 pr-16 py-2 rounded-xl text-[12.5px] font-medium text-slate-200 placeholder:text-slate-500 outline-none transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.background = 'rgba(16,185,129,0.06)'
                  e.currentTarget.style.borderColor = 'rgba(16,185,129,0.35)'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(16,185,129,0.08)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
              {query ? (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-slate-500 pointer-events-none">
                  <Command className="w-3 h-3" />
                  <span className="text-[10px] font-bold">K</span>
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="px-3 pb-3 flex-shrink-0">
            <button
              onClick={() => {
                setSidebarOpen(true)
                requestAnimationFrame(() => searchRef.current?.focus())
              }}
              aria-label="Search"
              className="w-full h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-emerald-400 hover:bg-white/[0.05] transition-all duration-200 border border-transparent hover:border-white/[0.07]"
            >
              <Search className="w-[17px] h-[17px]" />
            </button>
          </div>
        )}

        {/* ═══════════ NAV ═══════════ */}
        <nav className="flex-1 px-3 pb-2 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
          <div className="space-y-4">
            {groups.map((group, gi) => (
              <div key={group.section} className={gi === 0 ? 'pt-0.5' : ''}>
                <div
                  className="px-2 pb-1.5"
                  style={{
                    opacity: open ? 1 : 0,
                    maxHeight: open ? '24px' : '0px',
                    overflow: 'hidden',
                    transition: 'opacity 180ms ease, max-height 260ms ease',
                  }}
                >
                  <p className="flex items-center gap-1.5 text-[9.5px] font-extrabold uppercase tracking-[0.2em] text-slate-500">
                    {group.section}
                  </p>
                </div>

                <div className="space-y-[3px]">
                  {group.items.map((item, ii) => (
                    <NavRow
                      key={item.href}
                      item={item}
                      active={isActive(item.href)}
                      open={open}
                      index={gi * 10 + ii}
                      mounted={mounted}
                      onNavigate={closeOnMobile}
                    />
                  ))}
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div
                className="flex flex-col items-center gap-2 py-8 text-center animate-fade-in"
                style={{ opacity: open ? 1 : 0, transition: 'opacity 180ms ease' }}
              >
                <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <Search className="w-4 h-4 text-slate-500" />
                </span>
                <p className="text-[11px] font-semibold text-slate-500">No matches for “{query}”</p>
              </div>
            )}
          </div>
        </nav>

        {/* ═══════════ BOTTOM ═══════════ */}
        <div className="relative flex-shrink-0 px-3 pb-3.5 pt-3 space-y-2 border-t border-white/[0.05]">
          {/* ── Daily goal card ── */}
          <div
            className="rounded-2xl px-3.5 py-3 relative overflow-hidden"
            style={{
              opacity: open ? 1 : 0,
              maxHeight: open ? '200px' : '0px',
              transition: 'opacity 200ms ease, max-height 300ms ease',
              background: 'linear-gradient(145deg, rgba(16,185,129,0.09) 0%, rgba(8,15,30,0.6) 55%, rgba(8,15,30,0.7) 100%)',
              border: '1px solid rgba(16,185,129,0.16)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            <div
              className="absolute -top-5 -right-5 w-24 h-24 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.16) 0%, transparent 70%)' }}
            />

            <div className="relative z-10 flex items-center justify-between mb-2">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-emerald-300/90">
                Daily Goal
              </p>
              <span className="flex items-center gap-1 text-[11px] font-extrabold text-amber-300" style={{ textShadow: '0 0 12px rgba(251,191,36,0.4)' }}>
                <Flame className="w-3 h-3 fill-amber-300/60" />
                {streak}
              </span>
            </div>

            <div className="relative z-10 h-[5px] rounded-full overflow-hidden mb-2.5" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: '72%',
                  background: 'linear-gradient(90deg, #059669, #34d399)',
                  boxShadow: '0 0 12px rgba(52,211,153,0.6)',
                }}
              />
            </div>

            <div className="relative z-10 flex items-center justify-between text-[10px] font-semibold text-slate-400">
              <span>1,850 / 2,400 kcal</span>
              <span className="text-emerald-300 font-bold">72%</span>
            </div>
          </div>

          {/* ── Profile ── */}
          <div
            className={[
              'rounded-2xl flex items-center transition-all duration-300',
              open ? 'gap-3 px-3 py-2.5' : 'justify-center px-0 py-2',
            ].join(' ')}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            <div className="relative flex-shrink-0">
              {profile?.avatar_url ? (
                <Avatar src={profile.avatar_url} fallback={userInitial} size="sm" />
              ) : (
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    border: '1.5px solid rgba(52,211,153,0.4)',
                    boxShadow: '0 0 14px rgba(16,185,129,0.3)',
                  }}
                >
                  {userInitial}
                </div>
              )}
              <span
                className="absolute -bottom-0.5 -right-0.5 w-[10px] h-[10px] rounded-full border-2 border-[#080d1a]"
                style={{ background: '#34d399', boxShadow: '0 0 8px #34d399' }}
              />
            </div>

            <div className="flex-1 min-w-0 overflow-hidden" style={labelStyle}>
              <p className="text-[12.5px] font-bold text-white truncate leading-tight whitespace-nowrap">{userName}</p>
              <p className="flex items-center gap-1 text-[10px] font-bold mt-[2px] whitespace-nowrap text-emerald-300/90">
                <Crown className="w-3 h-3 text-amber-300" />
                Premium Plan
              </p>
            </div>

            {open && (
              <button
                onClick={signOut}
                title="Sign out"
                aria-label="Sign out"
                className="flex-shrink-0 p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/15 transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* ── Collapse toggle ── */}
          <button
            onClick={toggleSidebar}
            className={[
              'w-full flex items-center rounded-xl py-2.5',
              'text-slate-500 hover:text-slate-200 hover:bg-white/[0.04]',
              'transition-all duration-200 group',
              open ? 'gap-2.5 px-3.5' : 'justify-center px-0',
            ].join(' ')}
          >
            <span className="flex-shrink-0 flex items-center justify-center" style={{ width: '20px', height: '20px' }}>
              {open ? (
                <ChevronLeft className="w-4 h-4 group-hover:text-emerald-400 transition-colors" />
              ) : (
                <ChevronRight className="w-4 h-4 text-emerald-400 transition-colors" />
              )}
            </span>
            <span
              className="text-[11.5px] font-semibold whitespace-nowrap overflow-hidden"
              style={{ opacity: open ? 1 : 0, maxWidth: open ? '120px' : '0px', transition: 'opacity 180ms ease, max-width 300ms ease' }}
            >
              Collapse
            </span>
          </button>
        </div>
      </aside>

      {/* ═══════════ MOBILE BACKDROP ═══════════ */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* ═══════════ MOBILE DOCK ═══════════ */}
      <nav
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden"
        style={{
          background: 'rgba(7,11,22,0.88)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          boxShadow: '0 16px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center justify-around px-2.5 py-2">
          {[
            { href: '/dashboard',           label: 'Home',     icon: LayoutDashboard },
            { href: '/dashboard/nutrition', label: 'Nutrition', icon: Apple           },
            { href: '/dashboard/scan',      label: 'Meals',    icon: UtensilsCrossed },
            { href: '/dashboard/gym',       label: 'Workouts', icon: Dumbbell        },
            { href: '/dashboard/chat',      label: 'AI',       icon: Bot             },
          ].map((item) => {
            const active = isActive(item.href)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  'flex flex-col items-center gap-[3px] py-1.5 px-3 rounded-2xl transition-all duration-200',
                  active ? 'text-emerald-300' : 'text-slate-500',
                ].join(' ')}
              >
                <span
                  className="relative flex items-center justify-center"
                  style={
                    active
                      ? {
                          background: 'rgba(16,185,129,0.12)',
                          boxShadow: '0 0 16px rgba(16,185,129,0.25)',
                          borderRadius: '12px',
                          padding: '3px 10px',
                        }
                      : undefined
                  }
                >
                  <Icon className="w-[18px] h-[18px]" strokeWidth={active ? 2.3 : 1.8} />
                </span>
                <span className={`text-[9px] font-semibold ${active ? 'text-emerald-300' : 'text-slate-500'}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}

/* ─────────────────────────────────────────────────────────────
   NavRow – single nav link with collapsed tooltip
───────────────────────────────────────────────────────────── */
function NavRow({
  item,
  active,
  open,
  index,
  mounted,
  onNavigate,
}: {
  item: NavItem
  active: boolean
  open: boolean
  index: number
  mounted: boolean
  onNavigate: () => void
}) {
  const Icon = item.icon

  return (
    <Link
      key={item.href}
      href={item.href}
      onClick={onNavigate}
      title={undefined}
      className={[
        'relative flex items-center rounded-xl group/item',
        'transition-all duration-200 ease-out overflow-visible',
        open ? 'gap-3 px-3.5 py-2.5' : 'justify-center px-0 py-2.5 mx-1',
        active
          ? 'text-white border'
          : 'text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06]',
      ].join(' ')}
      style={{
        animation: mounted ? `fade-in 0.4s ease ${Math.min(index * 0.025, 0.3)}s backwards` : undefined,
        background: active
          ? 'linear-gradient(100deg, rgba(16,185,129,0.17) 0%, rgba(16,185,129,0.06) 65%, transparent 100%)'
          : undefined,
        borderColor: active ? 'rgba(16,185,129,0.32)' : undefined,
        boxShadow: active
          ? '0 4px 22px rgba(16,185,129,0.12), inset 0 1px 0 rgba(255,255,255,0.05)'
          : undefined,
      }}
    >
      {active && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
          style={{
            background: 'linear-gradient(180deg, #34d399, #10b981)',
            boxShadow: '0 0 10px rgba(52,211,153,0.7)',
          }}
        />
      )}

      <span className="flex-shrink-0 flex items-center justify-center" style={{ width: '20px', height: '20px', position: 'relative', zIndex: 1 }}>
        <Icon
          className={[
            'transition-all duration-200',
            active ? 'text-emerald-300' : 'text-slate-400 group-hover:text-slate-200 group-hover:scale-110',
          ].join(' ')}
          style={{
            width: '18px',
            height: '18px',
            filter: active ? 'drop-shadow(0 0 6px rgba(52,211,153,0.65))' : undefined,
            strokeWidth: active ? 2.2 : 1.8,
          }}
        />
      </span>

      <span
        className={[
          'text-[13px] font-semibold tracking-wide leading-none whitespace-nowrap overflow-hidden',
          active ? 'text-white font-bold' : 'text-slate-300 group-hover:text-white',
        ].join(' ')}
        style={{
          opacity: open ? 1 : 0,
          maxWidth: open ? '160px' : '0px',
          transition: 'opacity 180ms ease, max-width 320ms ease',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {item.label}
      </span>

      {item.badge && (
        <span
          className="relative z-10 flex-shrink-0 px-1.5 py-[3px] rounded-md text-[8.5px] font-extrabold tracking-[0.08em]"
          style={{
            opacity: open ? 1 : 0,
            maxWidth: open ? '40px' : '0px',
            transition: 'opacity 180ms ease, max-width 320ms ease',
            background: 'linear-gradient(135deg, rgba(168,85,247,0.25), rgba(99,102,241,0.2))',
            border: '1px solid rgba(168,85,247,0.4)',
            color: '#d8b4fe',
            boxShadow: '0 0 12px rgba(168,85,247,0.25)',
          }}
        >
          {item.badge}
        </span>
      )}

      {!active && (
        <span
          className="absolute inset-0 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: 'linear-gradient(100deg, rgba(16,185,129,0.04) 0%, rgba(6,182,212,0.02) 100%)',
          }}
        />
      )}

      {!open && (
        <span
          className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-slate-200 whitespace-nowrap pointer-events-none z-[60] opacity-0 invisible translate-x-[-6px] transition-all duration-200 ease-out group-hover/item:opacity-100 group-hover/item:visible group-hover/item:translate-x-0"
          style={{
            background: 'rgba(13,20,38,0.96)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.6), 0 0 20px rgba(16,185,129,0.08)',
            transitionDelay: '120ms',
          }}
        >
          <span
            className="absolute -left-[4px] top-1/2 -translate-y-1/2 w-2 h-2 rotate-45"
            style={{ background: 'rgba(13,20,38,0.96)', borderLeft: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
          />
          {item.label}
          {item.badge && (
            <span
              className="ml-2 px-1 py-[1px] rounded text-[8px] font-extrabold align-middle"
              style={{ background: 'rgba(168,85,247,0.25)', color: '#d8b4fe', border: '1px solid rgba(168,85,247,0.4)' }}
            >
              {item.badge}
            </span>
          )}
        </span>
      )}
    </Link>
  )
}
