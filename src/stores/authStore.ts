import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/types'
import type { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  profile: Profile | null
  loading: boolean
  setUser: (user: User | null) => void
  setProfile: (profile: Profile | null) => void
  fetchProfile: () => Promise<void>
  loginAsDemo: () => void
  signOut: () => Promise<void>
}

const mockDemoProfile: Profile = {
  id: 'demo-user-id-123',
  full_name: 'Mahdi Djeridi',
  gender: 'male',
  age: 26,
  weight: 78,
  height: 180,
  activity_level: 'active',
  goal: 'gain',
  avatar_url: '',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  loading: true,

  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),

  loginAsDemo: () => {
    if (typeof document !== 'undefined') {
      document.cookie = 'demo_session=true; path=/; max-age=86400'
    }
    const mockUser = {
      id: 'demo-user-id-123',
      email: 'mahdi@nutrisaas.ai',
      user_metadata: { full_name: 'Mahdi Djeridi' },
    } as unknown as User

    set({ user: mockUser, profile: mockDemoProfile, loading: false })
  },

  fetchProfile: async () => {
    // Keep existing demo session if present
    if (get().user?.id === 'demo-user-id-123') {
      set({ loading: false })
      return
    }

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        set({ user, profile: data || mockDemoProfile, loading: false })
      } else {
        // Fallback to demo profile if user is in demo mode
        const hasDemoCookie = typeof document !== 'undefined' && document.cookie.includes('demo_session=true')
        if (hasDemoCookie) {
          get().loginAsDemo()
        } else {
          set({ loading: false })
        }
      }
    } catch {
      set({ loading: false })
    }
  },

  signOut: async () => {
    if (typeof document !== 'undefined') {
      document.cookie = 'demo_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch {
      // Ignore errors for offline/demo
    }
    set({ user: null, profile: null })
  },
}))
