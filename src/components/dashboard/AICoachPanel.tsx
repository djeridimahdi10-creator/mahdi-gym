'use client'

import Link from 'next/link'
import { Bot, MessageSquare } from 'lucide-react'

export function AICoachPanel() {
  const recommendations = [
    {
      title: 'Add 35g protein at dinner',
      badge: 'Nutrition',
      badgeColor: '#10b981',
      desc: 'Salmon or Greek yogurt closes your daily protein gap for optimal muscle recovery.',
      emoji: '🍣',
    },
    {
      title: 'Eat more leafy greens',
      badge: 'Fiber',
      badgeColor: '#10b981',
      desc: 'You are 5g short of your fiber goal — add spinach to your evening meal.',
      emoji: '🥗',
    },
    {
      title: 'Sleep 30 mins earlier',
      badge: 'Recovery',
      badgeColor: '#a855f7',
      desc: 'Deep sleep allows your muscles to recover and restores full energy for tomorrow.',
      emoji: '🌙',
    },
  ]

  return (
    <div
      className="p-6 rounded-2xl flex flex-col justify-between h-full space-y-4"
      style={{
        background: 'rgba(11, 17, 31, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
            <Bot className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-white tracking-wide">AI Coach</h3>
        </div>
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300">
          24/7
        </span>
      </div>

      {/* Recommendations List */}
      <div className="space-y-3 flex-1 flex flex-col justify-center">
        {recommendations.map((item) => (
          <div
            key={item.title}
            className="p-3.5 sm:p-4 rounded-xl transition-all hover:bg-white/[0.05] flex items-start gap-3.5"
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center text-xl flex-shrink-0">
              {item.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">{item.title}</h4>
                <span
                  className="text-[10px] font-extrabold px-2 py-0.5 rounded flex-shrink-0"
                  style={{
                    background: `${item.badgeColor}15`,
                    color: item.badgeColor,
                    border: `1px solid ${item.badgeColor}30`,
                  }}
                >
                  {item.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-snug">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <Link href="/dashboard/chat" className="block pt-1">
        <button
          className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] text-white"
          style={{
            background: 'linear-gradient(90deg, rgba(139,92,246,0.35) 0%, rgba(99,102,241,0.25) 100%)',
            border: '1px solid rgba(139,92,246,0.45)',
            boxShadow: '0 4px 20px rgba(139,92,246,0.2)',
          }}
        >
          <MessageSquare className="w-4 h-4 text-purple-300" />
          <span>Chat with AI Coach →</span>
        </button>
      </Link>
    </div>
  )
}
