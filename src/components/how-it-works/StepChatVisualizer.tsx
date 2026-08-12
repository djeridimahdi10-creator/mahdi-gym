'use client'

import React, { useState } from 'react'
import { MessageSquare, Sparkles, Bot, User } from 'lucide-react'

const presetPrompts = [
  {
    question: 'Wach mlih nakol bzzed el protein?',
    answer:
      'Saha! Yah, 2g protein per kg mliha bezzaf bach tbni el muscle w tzyd f taqa dialk. Dir djedj, bayd, wla couscous b el lham! 🍗🎯',
    lang: '🇩🇿 Darija',
  },
  {
    question: 'A\'tini wajba sahla b djedj w ruz',
    answer:
      'Wajba sahla f 15 minutes: 200g djedj mashwi + 150g ruz basmati + shwaya ziyt zitoun. Fiha ~650 kcal w 52g protein! 🍚💪',
    lang: '🇩🇿 Darija',
  },
  {
    question: 'How do I reach my daily 2,400 kcal target?',
    answer:
      'Add a healthy snack like Greek yogurt with honey and almond butter around 4 PM! That easily adds 320 high-quality calories. 🍯',
    lang: '🇬🇧 English',
  },
]

export function StepChatVisualizer() {
  const [activePromptIdx, setActivePromptIdx] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  const handleSelectPrompt = (idx: number) => {
    setIsTyping(true)
    setActivePromptIdx(idx)
    setTimeout(() => {
      setIsTyping(false)
    }, 700)
  }

  const current = presetPrompts[activePromptIdx]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-ai-400/20 flex items-center justify-center text-ai-300">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">AI Coach (Darija & English)</h4>
            <p className="text-xs text-dark-400">24/7 Conversational AI support in your native dialect</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-ai-400/10 border border-ai-400/20 text-xs font-semibold text-ai-300 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 animate-pulse" />
          {current.lang}
        </span>
      </div>

      {/* Suggested Quick Prompts */}
      <div>
        <label className="text-xs font-medium text-dark-400 mb-2 block uppercase tracking-wider">Tap a Question to Ask</label>
        <div className="space-y-2">
          {presetPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPrompt(idx)}
              className={`w-full p-2.5 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${
                activePromptIdx === idx
                  ? 'bg-ai-400/20 border-ai-400 text-white font-medium'
                  : 'bg-dark-800/40 border-white/5 text-dark-400 hover:border-white/20 hover:text-white'
              }`}
            >
              <span className="truncate">{p.question}</span>
              <span className="text-[10px] text-ai-300 flex-shrink-0 ml-2 font-semibold">{p.lang}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Simulation Stream Container */}
      <div className="bg-dark-950/80 p-4 rounded-2xl border border-ai-400/30 space-y-3 min-h-[160px] flex flex-col justify-end">
        {/* User Message */}
        <div className="flex gap-2.5 items-end justify-end">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-3 rounded-2xl rounded-br-none text-xs max-w-[80%] shadow-lg">
            {current.question}
          </div>
          <div className="w-7 h-7 rounded-full bg-primary-500/20 border border-primary-400/30 flex items-center justify-center text-primary-300 text-xs flex-shrink-0">
            <User className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* AI Response */}
        <div className="flex gap-2.5 items-start">
          <div className="w-7 h-7 rounded-full bg-ai-500/20 border border-ai-400/30 flex items-center justify-center text-ai-300 text-xs flex-shrink-0">
            <Bot className="w-3.5 h-3.5" />
          </div>

          {isTyping ? (
            <div className="bg-dark-800 p-3 rounded-2xl rounded-bl-none text-xs text-dark-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-ai-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-ai-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-1.5 h-1.5 bg-ai-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          ) : (
            <div className="bg-dark-800/90 border border-white/5 text-dark-200 p-3 rounded-2xl rounded-bl-none text-xs leading-relaxed max-w-[85%] shadow-lg">
              {current.answer}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
