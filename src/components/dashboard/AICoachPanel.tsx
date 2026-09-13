'use client'

import Link from 'next/link'
import { Bot, MessageSquare, ArrowRight } from 'lucide-react'

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
      className="p-5 rounded-2xl flex flex-col justify-between h-full"
      style={{
        background: 'rgba(11, 17, 31, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center">
            <Bot className="w-4.5 h-4.5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">AI Coach</h3>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Personalized insights</p>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/12 border border-purple-500/25 text-purple-300">
          24/7
        </span>
      </div>

      {/* Recommendations */}
      <div className="space-y-2.5 flex-1">
        {recommendations.map((item) => (
          <div
            key={item.title}
            className="p-3 rounded-xl transition-all duration-200 hover:bg-white/[0.04] flex items-start gap-3"
            style={{
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.04)',
            }}
          >
            <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center text-lg flex-shrink-0">
              {item.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
                  style={{
                    background: `${item.badgeColor}12`,
                    color: item.badgeColor,
                    border: `1px solid ${item.badgeColor}25`,
                  }}
                >
                  {item.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link href="/dashboard/chat" className="block mt-3">
        <button
          className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] text-white"
          style={{
            background: 'linear-gradient(90deg, rgba(139,92,246,0.3) 0%, rgba(99,102,241,0.2) 100%)',
            border: '1px solid rgba(139,92,246,0.35)',
          }}
        >
          <MessageSquare className="w-4 h-4 text-purple-300" />
          <span>Chat with AI Coach</span>
          <ArrowRight className="w-3.5 h-3.5 text-purple-300/60" />
        </button>
      </Link>
    </div>
  )
}
