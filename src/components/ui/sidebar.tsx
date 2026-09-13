'use client'

import * as React from 'react'
import { PanelLeft } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const SIDEBAR_COOKIE_NAME = 'sidebar_state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = '16.5rem' // 264px
const SIDEBAR_WIDTH_MOBILE = '18rem'
const SIDEBAR_WIDTH_ICON = '4.75rem' // 76px
const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

type SidebarContext = {
  state: 'expanded' | 'collapsed'
  open: boolean
  setOpen: (open: boolean | ((value: boolean) => boolean)) => void
  openMobile: boolean
  setOpenMobile: (open: boolean | ((value: boolean) => boolean)) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }
  return context
}

export const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = React.useState(false)
    const [openMobile, setOpenMobile] = React.useState(false)

    // Internal state for open
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = openProp !== undefined ? openProp : _open

    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === 'function' ? value(open) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }

        // Set cookie
        if (typeof document !== 'undefined') {
          document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
        }
      },
      [setOpenProp, open]
    )

    // Handle mobile and tablet media queries
    React.useEffect(() => {
      const checkDevice = () => {
        const width = window.innerWidth
        setIsMobile(width < 768)
        // On tablet portrait (768px to 1023px), collapse to icon rail by default to give maximum space to dashboard cards
        if (width >= 768 && width < 1024) {
          if (typeof document !== 'undefined' && !document.cookie.includes(`${SIDEBAR_COOKIE_NAME}=`)) {
            _setOpen(false)
          }
        }
      }
      checkDevice()
      window.addEventListener('resize', checkDevice)
      return () => window.removeEventListener('resize', checkDevice)
    }, [])

    const toggleSidebar = React.useCallback(() => {
      return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
    }, [isMobile, setOpen, setOpenMobile])

    // Keyboard shortcut (Cmd+B or Ctrl+B)
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }, [toggleSidebar])

    const state = open ? 'expanded' : 'collapsed'

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            'group/sidebar-wrapper flex min-h-screen w-full font-sans text-slate-100 relative',
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = 'SidebarProvider'

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    side?: 'left' | 'right'
    variant?: 'sidebar' | 'floating' | 'inset'
    collapsible?: 'offcanvas' | 'icon' | 'none'
  }
>(
  (
    {
      side = 'left',
      variant = 'sidebar',
      collapsible = 'icon',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === 'none') {
      return (
        <div
          className={cn(
            'flex h-full w-[264px] flex-col bg-dark-900/90 border-r border-white/5 text-slate-100',
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      )
    }

    if (isMobile) {
      return (
        <>
          {openMobile && (
            <div
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setOpenMobile(false)}
            />
          )}
          <div
            ref={ref}
            data-mobile="true"
            data-state={openMobile ? 'open' : 'closed'}
            className={cn(
              'fixed inset-y-0 left-0 z-50 flex h-full w-[288px] max-w-[85vw] flex-col',
              'transition-transform duration-300 ease-in-out',
              openMobile ? 'translate-x-0' : '-translate-x-full',
              className
            )}
            style={{
              background: 'linear-gradient(178deg, rgba(10,16,32,0.98) 0%, rgba(7,11,24,0.99) 100%)',
              boxShadow: '16px 0 60px rgba(0,0,0,0.8), inset -1px 0 0 rgba(255,255,255,0.06)',
            }}
            {...props}
          >
            {children}
          </div>
        </>
      )
    }

    return (
      <aside
        ref={ref}
        data-state={state}
        data-collapsible={state === 'collapsed' ? collapsible : ''}
        className={cn(
          // sticky — participates in normal flex document flow (no padding-left compensation needed)
          'sticky top-0 h-screen z-40 hidden md:flex flex-col flex-shrink-0 overflow-hidden',
          'transition-[width] duration-300 ease-in-out',
          state === 'expanded' ? 'w-[264px]' : 'w-[76px]',
          className
        )}
        style={{
          background: 'linear-gradient(178deg, rgba(8,13,28,0.99) 0%, rgba(6,10,22,0.99) 55%, rgba(5,8,18,1) 100%)',
          backdropFilter: 'blur(24px) saturate(160%)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)',
          borderRight: '1px solid rgba(255,255,255,0.09)',
          boxShadow: '4px 0 24px rgba(0,0,0,0.45)',
        }}
        {...props}
      >
        {children}
      </aside>
    )
  }
)
Sidebar.displayName = 'Sidebar'

export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      ref={ref}
      data-sidebar="trigger"
      aria-label="Toggle Sidebar"
      title="Toggle Sidebar (Ctrl+B)"
      className={cn(
        'inline-flex items-center justify-center rounded-xl p-2 text-slate-400',
        'hover:text-white hover:bg-white/[0.08] active:scale-95 transition-all duration-200',
        'border border-transparent hover:border-white/10 focus:outline-none',
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  )
})
SidebarTrigger.displayName = 'SidebarTrigger'

export const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        'absolute inset-y-0 -right-2 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-emerald-500/40 group-data-[side=left]/sidebar-wrapper:-right-2 md:block',
        className
      )}
      {...props}
    />
  )
})
SidebarRail.displayName = 'SidebarRail'

export const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'main'>
>(({ className, style, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        // flex-1 + min-w-0: takes all remaining space beside the sticky sidebar without overflow
        'relative flex min-h-screen flex-1 flex-col min-w-0',
        className
      )}
      style={style}
      {...props}
    />
  )
})
SidebarInset.displayName = 'SidebarInset'

export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn('flex flex-col gap-2 p-3 sm:p-4 flex-shrink-0', className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = 'SidebarHeader'

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn('flex flex-col gap-2 p-3 flex-shrink-0 border-t border-white/[0.06]', className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = 'SidebarFooter'

export const SidebarSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="separator"
      className={cn('mx-3 my-2 h-px bg-white/[0.06]', className)}
      {...props}
    />
  )
})
SidebarSeparator.displayName = 'SidebarSeparator'

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-3 pb-2',
        className
      )}
      style={{ scrollbarWidth: 'none' }}
      {...props}
    />
  )
})
SidebarContent.displayName = 'SidebarContent'

export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn('relative flex w-full min-w-0 flex-col py-1', className)}
      {...props}
    />
  )
})
SidebarGroup.displayName = 'SidebarGroup'

export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  const { state } = useSidebar()
  return (
    <div
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        'px-2.5 pb-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-500 transition-all duration-200',
        state === 'collapsed' && 'opacity-0 h-0 overflow-hidden pb-0',
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = 'SidebarGroupLabel'

export const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group-content"
      className={cn('w-full space-y-1', className)}
      {...props}
    />
  )
})
SidebarGroupContent.displayName = 'SidebarGroupContent'

export const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      data-sidebar="menu"
      className={cn('flex w-full min-w-0 flex-col gap-1 list-none m-0 p-0', className)}
      {...props}
    />
  )
})
SidebarMenu.displayName = 'SidebarMenu'

export const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => {
  return (
    <li
      ref={ref}
      data-sidebar="menu-item"
      className={cn('group/menu-item relative list-none', className)}
      {...props}
    />
  )
})
SidebarMenuItem.displayName = 'SidebarMenuItem'

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & {
    isActive?: boolean
    tooltip?: string
  }
>(({ className, isActive, tooltip, children, ...props }, ref) => {
  const { state } = useSidebar()

  return (
    <button
      ref={ref}
      data-sidebar="menu-button"
      data-active={isActive}
      className={cn(
        'group relative flex w-full items-center rounded-xl transition-all duration-200 text-left outline-none overflow-hidden',
        state === 'expanded' ? 'gap-3 px-3.5 py-2.5' : 'justify-center p-2.5',
        isActive
          // Refined active: subtle solid bg + left accent pill glow, no border
          ? 'bg-emerald-500/[0.12] text-white font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
          : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.05]',
        className
      )}
      {...props}
    >
      {/* Left accent pill for active state */}
      {isActive && (
        <span
          className="absolute left-0 inset-y-[6px] w-[3px] rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]"
        />
      )}
      {children}
      {/* Tooltip on collapsed icon */}
      {state === 'collapsed' && tooltip && (
        <span
          className={cn(
            'pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3.5 z-50',
            'rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-200 whitespace-nowrap shadow-2xl',
            'opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150',
            'translate-x-[-6px] group-hover:translate-x-0'
          )}
          style={{
            background: 'rgba(13, 20, 38, 0.96)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.7), 0 0 20px rgba(16,185,129,0.1)',
          }}
        >
          {tooltip}
        </span>
      )}
    </button>
  )
})
SidebarMenuButton.displayName = 'SidebarMenuButton'

export const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  const { state } = useSidebar()
  if (state === 'collapsed') return null

  return (
    <div
      ref={ref}
      data-sidebar="menu-badge"
      className={cn(
        'ml-auto flex items-center justify-center rounded-md px-1.5 py-0.5 text-[9px] font-extrabold tracking-wider',
        'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.2)]',
        className
      )}
      {...props}
    />
  )
})
SidebarMenuBadge.displayName = 'SidebarMenuBadge'
