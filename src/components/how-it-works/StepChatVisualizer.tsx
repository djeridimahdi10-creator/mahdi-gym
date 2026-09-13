'use client'

import React, { useState } from 'react'
import { MessageSquare, Bot, User, Send, Copy, Check, RotateCcw } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface PresetPrompt {
  lang: string
  flag: string
  question: string
  answer: string
}

const presets: PresetPrompt[] = [
  {
    lang: 'Algerian Darija',
    flag: '🇩🇿',
    question: 'Wach nakol mlih ba3d l\'entrainement bach nzid f muscle?',
    answer:
      'Saha khouya! Mor l\'entrainement b 30-45 minutes, khassak wajba fiha protein b reach w carbs sahlin f el hadm: 200g djedj m3a ruz basmati wla batata mghliya. W ida ma3andeksh waqt, dir shake whey protein m3a mouza (banana) w shwaya tmar Deglet Nour! 🍗🍌💪',
  },
  {
    lang: 'Algerian Darija',
    flag: '🇩🇿',
    question: 'A\'tini badil l\'escalope b haja rkhisa w fiha protein',
    answer:
      '3andek bzf les options rkhissa w bnina: El bayd (3-4 baydat fihom ~24g protein), canned sardine wla tuna b el ma, el loubia (beans) m3a ruz, wla el lham el marhi ta3 dinde. Kamel fihom protein 3ali w rkhiss f el souk! 🥚🐟',
  },
  {
    lang: 'Français',
    flag: '🇫🇷',
    question: 'Comment optimiser mes macros si je m\'entraîne le matin à jeun ?',
    answer:
      'Si tu t\'entraînes à jeun, hydrate-toi bien avec des électrolytes au réveil. Prends ton premier repas riche en glucides complexes et protéines rapides (ex: omelette 3 œufs + flocons d\'avoine) dans l\'heure qui suit ta séance pour stopper le catabolisme musculaire ! 🍳⚡',
  },
  {
    lang: 'English',
    flag: '🇬🇧',
    question: 'How should I take creatine monohydrate for maximum muscle fullness?',
    answer:
      'Take 5g of pure creatine monohydrate daily, consistently. No loading phase needed. Take it with your post-workout meal or a carb source (like orange juice or rice) to enhance cellular uptake, and drink at least 3L of water daily! 💧💥',
  },
]

export function StepChatVisualizer() {
  const [messages, setMessages] = useState<
    { sender: 'user' | 'ai'; text: string; langTag?: string }[]
  >([
    {
      sender: 'user',
      text: presets[0].question,
      langTag: presets[0].flag,
    },
    {
      sender: 'ai',
      text: presets[0].answer,
    },
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const handleSelectPreset = (p: PresetPrompt) => {
    setIsTyping(true)
    setMessages([
      { sender: 'user', text: p.question, langTag: p.flag },
    ])

    setTimeout(() => {
      setMessages([
        { sender: 'user', text: p.question, langTag: p.flag },
        { sender: 'ai', text: p.answer },
      ])
      setIsTyping(false)
    }, 600)
  }

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!inputText.trim() || isTyping) return

    const userQ = inputText.trim()
    setInputText('')
    setIsTyping(true)

    setMessages((prev) => [...prev, { sender: 'user', text: userQ }])

    setTimeout(() => {
      const lower = userQ.toLowerCase()
      let aiReply =
        '3la slamtek! 3la hssab el biometrics w el plan dialk, had el soal mlih bezzaf. Khallik daymen taba3 el macros dialk w ma tnsach techrob el ma mlih (~3 litrat f el nhar)! 💪🎯'
      if (lower.includes('protein') || lower.includes('djedj') || lower.includes('meat')) {
        aiReply =
          'Protein howa el asas! Visi 1.8g ila 2.2g per kg. Dir djedj, bayd, thon, wla lentilles bach t3amer el quota dialk bla ma tzid fats bezzaf! 🍗'
      } else if (lower.includes('fat') || lower.includes('loss') || lower.includes('weight') || lower.includes('regime')) {
        aiReply =
          'F fat loss, el ahem howa calorie deficit khfif (-400 kcal) m3a gym w cardio 15 min. Matnehyich carbs kamel bach tabqa 3andek taqa! 🔥'
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: aiReply }])
      setIsTyping(false)
    }, 700)
  }

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 1500)
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-ai-400/20 border border-ai-400/30 flex items-center justify-center text-ai-300 shadow-sm">
            <MessageSquare className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              Multilingual 24/7 AI Coach
              <Badge variant="primary" size="sm" dot>
                Online
              </Badge>
            </h4>
            <p className="text-xs text-dark-400">Native Algerian Darija, French & English guidance</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="xs"
          onClick={() => handleSelectPreset(presets[0])}
          className="text-xs text-dark-400 hover:text-white border border-white/5"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </Button>
      </div>

      {/* Preset Suggested Questions using shadcn Card */}
      <div>
        <div className="text-[11px] font-semibold text-dark-400 uppercase tracking-wider mb-2">
          Tap a Sample Question to Ask Coach AI
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {presets.map((p, idx) => (
            <Card
              key={idx}
              variant="hover"
              onClick={() => handleSelectPreset(p)}
              className="p-2.5 border-white/5 bg-dark-900/60 hover:bg-dark-900 hover:border-ai-400/30 text-left transition-all text-xs flex items-start gap-2 cursor-pointer group"
            >
              <span className="text-base flex-shrink-0">{p.flag}</span>
              <span className="text-dark-300 group-hover:text-white line-clamp-2 leading-snug">
                {p.question}
              </span>
            </Card>
          ))}
        </div>
      </div>

      {/* Chat Messages Stream Viewport using shadcn Card */}
      <Card variant="static" className="bg-dark-950/90 border-ai-400/25 p-4 space-y-3 min-h-[220px] max-h-[300px] overflow-y-auto flex flex-col justify-end shadow-inner">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2.5 ${
              msg.sender === 'user' ? 'justify-end items-end' : 'justify-start items-start'
            }`}
          >
            {msg.sender === 'ai' && (
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-ai-500 to-purple-700 flex items-center justify-center text-white text-xs flex-shrink-0 shadow-md">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[85%] relative group ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-dark-950 font-semibold rounded-br-none shadow-md'
                  : 'bg-dark-900 border border-white/10 text-dark-100 rounded-bl-none shadow-md'
              }`}
            >
              {msg.text}

              {msg.sender === 'ai' && (
                <div className="pt-2 mt-1 border-t border-white/5 flex items-center justify-between text-[10px] text-dark-400">
                  <span className="text-ai-300 font-semibold">NutriSaaS Coach AI</span>
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleCopy(msg.text, i)}
                      className="hover:text-white flex items-center gap-1 p-0.5 cursor-pointer"
                      title="Copy response"
                    >
                      {copiedIdx === i ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-xl bg-primary-500/20 border border-primary-400/40 flex items-center justify-center text-primary-300 text-xs flex-shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {/* AI Typing Dots Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-ai-300 pl-2">
            <div className="w-6 h-6 rounded-lg bg-ai-500/20 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-ai-400" />
            </div>
            <div className="bg-dark-900 px-3 py-2 rounded-xl border border-white/10 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-ai-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-ai-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-1.5 h-1.5 bg-ai-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </Card>

      {/* Interactive Custom Query Input Bar using shadcn Button */}
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask anything in Algerian Darija, French or English..."
          className="flex-1 bg-dark-900/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-dark-500 focus:outline-none focus:border-ai-400 transition-colors"
        />
        <Button
          type="submit"
          variant="ai"
          size="sm"
          disabled={!inputText.trim() || isTyping}
          className="text-xs"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </Button>
      </form>
    </div>
  )
}
