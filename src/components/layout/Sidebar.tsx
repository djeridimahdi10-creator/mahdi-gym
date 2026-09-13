'use client'

import React, { useMemo, useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Apple,
  Dumbbell,
  TrendingUp,
  Bot,
  Settings,
  LogOut,
  Search,
  Command,
  Flame,
  Crown,
  Camera,
  User,
  X,
  ChevronRight,
  Zap,
  Salad,
  Brain,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useNutritionStore } from '@/stores/nutritionStore'
import {
  useSidebar,
  Sidebar as ShadcnSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarRail,
  Avatar,
} from '@/components/ui'

/* ─────────────────────────────────────────────────────────────
   Nav item type + config — each item carries colour theming
───────────────────────────────────────────────────────────── */
type NavItem = {
  href: string
  label: string
  icon: typeof LayoutDashboard
  section: string
  badge?: string
  description?: string
  /* 3-D icon chip colours */
  iconBg: string       // gradient stops
  iconGlow: string     // box-shadow glow colour
  iconColor: string    // stroke colour
}

const navItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    section: 'Overview',
    description: 'Your daily hub',
    iconBg: 'linear-gradient(135deg,#10b981,#059669)',
    iconGlow: 'rgba(16,185,129,0.55)',
    iconColor: '#fff',
  },
  {
    href: '/dashboard/nutrition',
    label: 'Nutrition',
    icon: Salad,
    section: 'Health',
    description: 'Meals & macros',
    iconBg: 'linear-gradient(135deg,#34d399,#10b981)',
    iconGlow: 'rgba(52,211,153,0.55)',
    iconColor: '#fff',
  },
  {
    href: '/dashboard/scan',
    label: 'Food Scanner',
    icon: Camera,
    section: 'Health',
    description: 'AI meal recognition',
    iconBg: 'linear-gradient(135deg,#06b6d4,#0891b2)',
    iconGlow: 'rgba(6,182,212,0.55)',
    iconColor: '#fff',
  },
  {
    href: '/dashboard/gym',
    label: 'Workouts',
    icon: Dumbbell,
    section: 'Fitness',
    description: 'Training sessions',
    iconBg: 'linear-gradient(135deg,#f97316,#ea580c)',
    iconGlow: 'rgba(249,115,22,0.55)',
    iconColor: '#fff',
  },
  {
    href: '/dashboard/stats',
    label: 'Progress',
    icon: TrendingUp,
    section: 'Fitness',
    description: 'Charts & insights',
    iconBg: 'linear-gradient(135deg,#fb923c,#f97316)',
    iconGlow: 'rgba(251,146,60,0.55)',
    iconColor: '#fff',
  },
  {
    href: '/dashboard/chat',
    label: 'AI Coach',
    icon: Brain,
    section: 'Intelligence',
    badge: 'PRO',
    description: 'Chat with AI',
    iconBg: 'linear-gradient(135deg,#a855f7,#7c3aed)',
    iconGlow: 'rgba(168,85,247,0.55)',
    iconColor: '#fff',
  },
  {
    href: '/dashboard/profile',
    label: 'Profile',
    icon: User,
    section: 'Account',
    description: 'Personal settings',
    iconBg: 'linear-gradient(135deg,#60a5fa,#3b82f6)',
    iconGlow: 'rgba(96,165,250,0.55)',
    iconColor: '#fff',
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: Settings,
    section: 'Account',
    description: 'Preferences',
    iconBg: 'linear-gradient(135deg,#94a3b8,#64748b)',
    iconGlow: 'rgba(148,163,184,0.45)',
    iconColor: '#fff',
  },
]

const SECTION_ORDER = ['Overview', 'Health', 'Fitness', 'Intelligence', 'Account'] as const

/* ─────────────────────────────────────────────────────────────
   3-D Icon Chip component
───────────────────────────────────────────────────────────── */
function Icon3D({
  item,
  active,
  size = 32,
}: {
  item: NavItem
  active: boolean
  size?: number
}) {
  const Icon = item.icon
  const iconSize = Math.round(size * 0.5)

  return (
    <span
      className="flex-shrink-0 flex items-center justify-center rounded-xl transition-all duration-300"
      style={{
        width: size,
        height: size,
        background: active ? item.iconBg : 'rgba(255,255,255,0.07)',
        boxShadow: active
          ? `0 4px 14px ${item.iconGlow}, 0 1px 0 rgba(255,255,255,0.18) inset, 0 -1px 0 rgba(0,0,0,0.25) inset`
          : '0 2px 6px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.06) inset',
        border: active
          ? '1px solid rgba(255,255,255,0.18)'
          : '1px solid rgba(255,255,255,0.07)',
        transform: active ? 'translateY(-1px) scale(1.04)' : 'translateY(0) scale(1)',
      }}
    >
      <Icon
        style={{
          width: iconSize,
          height: iconSize,
          color: active ? '#fff' : 'rgba(148,163,184,0.85)',
          filter: active ? `drop-shadow(0 0 4px ${item.iconGlow})` : 'none',
          transition: 'all 0.25s',
        }}
        strokeWidth={active ? 2.3 : 1.8}
      />
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────
   Main Sidebar export
───────────────────────────────────────────────────────────── */
export function Sidebar() {
  const pathname = usePathname()
  const { profile, signOut } = useAuthStore()
  const { dailyCalories, meals } = useNutritionStore()
  const { state, setOpenMobile, setOpen } = useSidebar()
  const [query, setQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  const isExpanded = state === 'expanded'
  const userName = profile?.full_name?.split(' ')[0] || 'Mahdi'
  const userInitial = userName.charAt(0).toUpperCase()

  const consumedCalories = meals
    .filter((m) => m.eaten)
    .reduce((acc, m) => acc + m.totalCalories, 0)
  const caloriePct = Math.min(
    100,
    Math.round((consumedCalories / (dailyCalories || 1)) * 100)
  )

  /* ⌘K shortcut */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(true)
        requestAnimationFrame(() => searchRef.current?.focus())
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setOpen])

  const isActive = (href: string) => {
    const base = href.split('#')[0]
    return base === '/dashboard'
      ? pathname === '/dashboard'
      : pathname.startsWith(base)
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return navItems
    return navItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q)
    )
  }, [query])

  const groups = useMemo(
    () =>
      SECTION_ORDER.map((section) => ({
        section,
        items: filtered.filter((item) => item.section === section),
      })).filter((g) => g.items.length > 0),
    [filtered]
  )

  const closeOnMobile = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setOpenMobile(false)
    }
  }

  return (
    <>
      <ShadcnSidebar collapsible="icon">

        {/* ══════════════════════════════
            HEADER
        ══════════════════════════════ */}
        <SidebarHeader className="px-4 pt-5 pb-3">
          <div className="flex items-center justify-between gap-2">

            {/* ── Brand lockup ── */}
            <Link
              href="/dashboard"
              onClick={closeOnMobile}
              className="flex items-center gap-3 group flex-1 min-w-0 overflow-hidden"
            >
              {/* 3-D Logo chip */}
              <span
                className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg,#10b981 0%,#0d9488 55%,#6366f1 130%)',
                  boxShadow:
                    '0 6px 20px rgba(16,185,129,0.45), 0 1px 0 rgba(255,255,255,0.22) inset, 0 -2px 0 rgba(0,0,0,0.25) inset',
                  border: '1px solid rgba(255,255,255,0.18)',
                }}
              >
                <Zap className="w-5 h-5 text-white fill-white/30" strokeWidth={2.5} />
              </span>

              {isExpanded && (
                <div className="flex-1 min-w-0 overflow-hidden animate-fade-in">
                  <span
                    className="block text-[16px] font-black text-white leading-none tracking-tight"
                    style={{ fontFamily: "'Space Grotesk','Inter',sans-serif" }}
                  >
                    NutriCoach
                  </span>
                  <span
                    className="inline-flex items-center gap-1 mt-1.5 px-1.5 py-0.5 rounded-md text-[9px] font-bold tracking-[0.1em] uppercase"
                    style={{
                      background: 'rgba(16,185,129,0.12)',
                      border: '1px solid rgba(16,185,129,0.28)',
                      color: '#34d399',
                    }}
                  >
                    Health Platform
                  </span>
                </div>
              )}
            </Link>

            {/* ── Prominent collapse / expand toggle ── */}
            <button
              onClick={() => setOpen(!isExpanded)}
              title={isExpanded ? 'Collapse sidebar (Ctrl+B)' : 'Expand sidebar (Ctrl+B)'}
              aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
              className="flex-shrink-0 flex items-center justify-center rounded-xl transition-all duration-200 active:scale-95 group/toggle"
              style={{
                width: 32,
                height: 32,
                background: isExpanded
                  ? 'rgba(255,255,255,0.07)'
                  : 'rgba(16,185,129,0.12)',
                border: isExpanded
                  ? '1px solid rgba(255,255,255,0.10)'
                  : '1px solid rgba(16,185,129,0.30)',
                boxShadow: isExpanded
                  ? '0 2px 8px rgba(0,0,0,0.3)'
                  : '0 2px 12px rgba(16,185,129,0.2)',
              }}
            >
              {isExpanded ? (
                <PanelLeftClose
                  className="w-4 h-4 text-slate-400 group-hover/toggle:text-white transition-colors"
                  strokeWidth={1.8}
                />
              ) : (
                <PanelLeftOpen
                  className="w-4 h-4 text-emerald-400 group-hover/toggle:text-white transition-colors"
                  strokeWidth={1.8}
                />
              )}
            </button>
          </div>

          {/* ── Search bar ── */}
          {isExpanded ? (
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search navigation…"
                className="w-full pl-9 pr-14 py-2 rounded-xl text-xs font-medium text-slate-200 placeholder:text-slate-600 outline-none transition-all duration-200 focus:ring-1 focus:ring-emerald-500/40"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)',
                }}
              />
              {query ? (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              ) : (
                <span
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 pointer-events-none px-1.5 py-0.5 rounded-md text-slate-500 text-[10px] font-bold"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <Command className="w-2.5 h-2.5" />K
                </span>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setOpen(true)
                requestAnimationFrame(() => searchRef.current?.focus())
              }}
              title="Search (Ctrl+K)"
              className="w-full h-9 mt-1 rounded-xl flex items-center justify-center text-slate-500 hover:text-emerald-400 hover:bg-white/[0.05] transition-all"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
        </SidebarHeader>

        {/* ══════════════════════════════
            NAVIGATION
        ══════════════════════════════ */}
        <SidebarContent>
          {groups.map((group) => (
            <SidebarGroup key={group.section}>
              <SidebarGroupLabel>{group.section}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const active = isActive(item.href)

                    return (
                      <SidebarMenuItem key={item.href}>
                        <Link href={item.href} onClick={closeOnMobile} className="block w-full group/link">
                          <SidebarMenuButton
                            isActive={active}
                            tooltip={!isExpanded ? item.label : undefined}
                          >
                            {/* ── 3-D icon chip ── */}
                            <Icon3D item={item} active={active} size={32} />

                            {/* ── Label + description ── */}
                            {isExpanded && (
                              <div className="flex flex-col min-w-0 flex-1">
                                <span
                                  className={`text-[13px] font-semibold truncate leading-tight tracking-[-0.01em] transition-colors ${
                                    active ? 'text-white' : 'text-slate-300 group-hover/link:text-white'
                                  }`}
                                >
                                  {item.label}
                                </span>
                                {item.description && (
                                  <span className="text-[10px] text-slate-600 truncate leading-tight mt-0.5 group-hover/link:text-slate-500 transition-colors">
                                    {item.description}
                                  </span>
                                )}
                              </div>
                            )}

                            {/* PRO badge */}
                            {item.badge && (
                              <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                            )}

                            {/* Active chevron */}
                            {isExpanded && active && (
                              <ChevronRight className="w-3 h-3 text-emerald-400/50 ml-auto flex-shrink-0" />
                            )}
                          </SidebarMenuButton>
                        </Link>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        {/* ══════════════════════════════
            FOOTER
        ══════════════════════════════ */}
        <SidebarFooter className="mt-auto p-4 border-t border-white/[0.08] gap-3">

          {/* ── Daily Calorie Progress ── */}
          {isExpanded ? (
            <div
              className="rounded-2xl p-3.5 relative overflow-hidden"
              style={{
                background: 'rgba(16,185,129,0.07)',
                border: '1px solid rgba(16,185,129,0.16)',
                boxShadow: '0 2px 12px rgba(16,185,129,0.08)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at top left,rgba(16,185,129,0.14),transparent 68%)',
                }}
              />
              <div className="relative flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-400/80">
                  Daily Progress
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-amber-300">
                  <Flame className="w-3 h-3 fill-amber-400/70 stroke-amber-300" />
                  7 Day Streak
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden mb-2.5"
                style={{ background: 'rgba(255,255,255,0.07)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${caloriePct}%`,
                    background: 'linear-gradient(90deg,#10b981,#34d399)',
                    boxShadow: '0 0 8px rgba(52,211,153,0.55)',
                  }}
                />
              </div>
              <div className="relative flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-medium">
                  {consumedCalories.toLocaleString()} /{' '}
                  {dailyCalories.toLocaleString()} kcal
                </span>
                <span className="text-[10px] font-bold text-emerald-400">
                  {caloriePct}%
                </span>
              </div>
            </div>
          ) : (
            <div
              className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center text-amber-300 transition-all hover:-translate-y-0.5"
              style={{
                background: 'rgba(251,191,36,0.08)',
                border: '1px solid rgba(251,191,36,0.2)',
                boxShadow: '0 4px 12px rgba(251,191,36,0.12), 0 1px 0 rgba(255,255,255,0.08) inset',
              }}
              title={`${consumedCalories} / ${dailyCalories} kcal (${caloriePct}%)`}
            >
              <Flame className="w-5 h-5 fill-amber-400/55" />
            </div>
          )}

          {/* ── User profile row ── */}
          <div
            className={`rounded-xl flex items-center transition-all duration-200 ${
              isExpanded ? 'gap-3 p-2.5' : 'justify-center p-2'
            }`}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {/* Avatar + online dot */}
            <div className="relative flex-shrink-0">
              {profile?.avatar_url ? (
                <Avatar src={profile.avatar_url} fallback={userInitial} size="sm" />
              ) : (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg,#10b981 0%,#059669 100%)',
                    border: '1.5px solid rgba(52,211,153,0.35)',
                    boxShadow: '0 0 10px rgba(16,185,129,0.3), 0 1px 0 rgba(255,255,255,0.15) inset',
                  }}
                >
                  {userInitial}
                </div>
              )}
              <span
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                style={{
                  background: '#34d399',
                  borderColor: 'rgba(6,10,22,1)',
                  boxShadow: '0 0 6px rgba(52,211,153,0.8)',
                }}
              />
            </div>

            {/* Name + Pro */}
            {isExpanded && (
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-xs font-bold text-white truncate leading-tight">
                  {userName}
                </p>
                <p className="flex items-center gap-1 mt-0.5">
                  <Crown className="w-2.5 h-2.5 text-amber-400 flex-shrink-0" />
                  <span
                    className="text-[9px] font-extrabold tracking-[0.08em] uppercase"
                    style={{ color: '#fbbf24' }}
                  >
                    Pro Member
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* ── Sign Out — prominent full-width pill (expanded) / red chip (collapsed) ── */}
          {isExpanded ? (
            <button
              onClick={signOut}
              aria-label="Sign out"
              className="w-full flex items-center justify-center gap-2.5 rounded-xl py-2.5 font-semibold text-[13px] transition-all duration-200 active:scale-[0.98] group/logout"
              style={{
                background: 'rgba(244,63,94,0.08)',
                border: '1px solid rgba(244,63,94,0.22)',
                color: 'rgba(251,113,133,0.9)',
                boxShadow: '0 2px 10px rgba(244,63,94,0.08)',
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget
                t.style.background = 'rgba(244,63,94,0.16)'
                t.style.borderColor = 'rgba(244,63,94,0.40)'
                t.style.color = '#fb7185'
                t.style.boxShadow = '0 4px 18px rgba(244,63,94,0.25)'
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget
                t.style.background = 'rgba(244,63,94,0.08)'
                t.style.borderColor = 'rgba(244,63,94,0.22)'
                t.style.color = 'rgba(251,113,133,0.9)'
                t.style.boxShadow = '0 2px 10px rgba(244,63,94,0.08)'
              }}
            >
              <LogOut className="w-4 h-4 transition-transform duration-200 group-hover/logout:-translate-x-0.5" strokeWidth={2} />
              Sign Out
            </button>
          ) : (
            /* Collapsed: visible red icon chip with tooltip */
            <button
              onClick={signOut}
              title="Sign out"
              aria-label="Sign out"
              className="w-10 h-10 mx-auto flex items-center justify-center rounded-xl transition-all duration-200 active:scale-95 hover:-translate-y-0.5"
              style={{
                background: 'rgba(244,63,94,0.10)',
                border: '1px solid rgba(244,63,94,0.28)',
                boxShadow: '0 3px 12px rgba(244,63,94,0.15), 0 1px 0 rgba(255,255,255,0.06) inset',
                color: '#fb7185',
              }}
            >
              <LogOut className="w-4 h-4" strokeWidth={2} />
            </button>
          )}
        </SidebarFooter>

        <SidebarRail />
      </ShadcnSidebar>

      {/* ══════════════════════════════
          MOBILE BOTTOM DOCK
      ══════════════════════════════ */}
      <nav
        className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 md:hidden flex items-center justify-around px-3 py-2.5 rounded-2xl"
        style={{
          background: 'rgba(7,11,24,0.94)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.09)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
          width: 'calc(100% - 24px)',
          maxWidth: '400px',
        }}
      >
        {[
          navItems[0], // Dashboard
          navItems[1], // Nutrition
          navItems[2], // Scan
          navItems[3], // Workouts
          navItems[5], // AI Coach
        ].map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all"
            >
              {/* 3-D mobile dock icon */}
              <Icon3D item={item} active={active} size={36} />
              <span
                className={`text-[9px] font-bold transition-colors ${
                  active ? 'text-white' : 'text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
