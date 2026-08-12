'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, Trash2, Sparkles, Zap } from 'lucide-react'
import { useChatStore } from '@/stores/chatStore'
import type { ChatMessage } from '@/types'
import { nutritionChatStream } from '@/lib/puter-ai'
import { ChatOrb, ChatSuggestions, ChatMessageBubble } from '@/components/chat'

const quickChips = [
  { label: 'Meal plan for hypertrophy', emoji: '🍽️' },
  { label: 'Optimal daily protein formula', emoji: '💪' },
  { label: 'واش ناكل اليوم؟', emoji: '🇩🇿' },
  { label: 'ترينينغ تع رجليين', emoji: '🏋️' },
]

export default function ChatPage() {
  const { messages, addMessage, setLoading, loading, clearMessages } = useChatStore()
  const [input, setInput] = useState('')
  const [streamingText, setStreamingText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingText])

  const sendMessage = async (text?: string) => {
    const content = text || input.trim()
    if (!content || loading) return

    const userMessage: ChatMessage = { role: 'user', content }
    addMessage(userMessage)
    setInput('')
    setLoading(true)
    setStreamingText('')
    if (inputRef.current) inputRef.current.style.height = 'auto'

    try {
      let fullReply = ''
      await nutritionChatStream(
        content,
        messages.slice(-10) as Array<{ role: 'user' | 'assistant'; content: string }>,
        (chunk) => {
          fullReply += chunk
          setStreamingText(fullReply)
        }
      )
      setStreamingText('')
      addMessage({ role: 'assistant', content: fullReply || 'Sorry, I encountered an error.' })
    } catch {
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: content, history: messages.slice(-10) }),
        })
        const data = await res.json()
        addMessage({ role: 'assistant', content: data.reply })
      } catch {
        addMessage({ role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' })
      }
    }
    setLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`
  }

  const isEmpty = messages.length === 0

  return (
    <motion.div
      className="w-full flex flex-col h-[calc(100vh-180px)] md:h-[calc(100vh-120px)] min-h-[440px] max-h-[920px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── Page Header ── */}
      <div className="flex items-center justify-between mb-3 sm:mb-4 flex-shrink-0">
        <div className="flex items-center gap-3 sm:gap-4">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center glow-ring-ai flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(147,51,234,0.15))',
              border: '1px solid rgba(168,85,247,0.3)',
            }}
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              AI Neural Coach Studio
            </h1>
            <p className="text-slate-500 text-[10px] sm:text-xs mt-0.5">Powered by Puter.js · Multilingual · Real-time</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge-live text-[10px] sm:text-xs px-2 py-0.5" style={{ background: 'rgba(168,85,247,0.12)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.25)' }}>
            AI Online
          </span>
          {messages.length > 0 && (
            <motion.button
              onClick={clearMessages}
              className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-red-400 transition-colors"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* ── Main Chat Container ── */}
      <div
        className="flex-1 flex flex-col rounded-3xl overflow-hidden min-h-0 relative"
        style={{
          background: 'linear-gradient(180deg, rgba(6,10,22,0.98) 0%, rgba(8,14,28,0.95) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none rounded-t-3xl z-0" style={{ background: 'linear-gradient(180deg, rgba(168,85,247,0.05) 0%, transparent 100%)' }} />

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto px-3.5 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-5 min-h-0 relative z-10" style={{ scrollbarWidth: 'thin' }}>
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-6 space-y-5">
              {/* 3D Neural Node Orb Visual */}
              <div className="relative flex items-center justify-center">
                <ChatOrb />
                <div
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: '#10b981', boxShadow: '0 0 10px rgba(16,185,129,0.6)', border: '2px solid rgba(6,10,22,1)' }}
                >
                  <Zap className="w-3 h-3 text-white fill-white" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  What can I help you calculate or optimize today?
                </h2>
                <p className="text-slate-400 text-xs mt-1 max-w-md mx-auto leading-relaxed">
                  Ask me about macros, meal planning, hypertrophic training splits, or recovery protocols.
                </p>
              </div>

              {/* Categorized Prompt Suggestions */}
              <ChatSuggestions onSelectSuggestion={(text) => sendMessage(text)} />
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <ChatMessageBubble key={i} message={msg} index={i} />
              ))}

              {/* Real-time Streaming Response Bubble */}
              <AnimatePresence>
                {(loading || streamingText) && (
                  <motion.div
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center glow-ring-ai flex-shrink-0" style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)' }}>
                      <Bot className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="max-w-[80%]">
                      <div className="px-4 py-3 rounded-2xl text-sm leading-relaxed" style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.15)', color: '#e2e8f0', borderTopLeftRadius: '4px' }}>
                        {streamingText ? (
                          <p className="whitespace-pre-wrap">{streamingText}<span className="inline-block w-1.5 h-4 ml-0.5 bg-purple-400 rounded-sm animate-pulse" /></p>
                        ) : (
                          <div className="flex items-center gap-1.5 py-1">
                            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '200ms' }} />
                            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '400ms' }} />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* ── Input Area ── */}
        <div className="flex-shrink-0 p-4 sm:p-5 relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(6,10,22,0.85)' }}>
          {/* Quick prompt chips when messages exist */}
          {!isEmpty && (
            <div className="flex gap-2 flex-wrap mb-3">
              {quickChips.map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => sendMessage(chip.label)}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-100 transition-all disabled:opacity-40"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <span>{chip.emoji}</span>
                  {chip.label}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={autoResize}
                onKeyDown={handleKeyDown}
                placeholder="Ask about nutrition, workouts, or recovery... (Enter to send)"
                rows={1}
                className="w-full resize-none pr-12 py-3 px-4 rounded-2xl text-sm leading-relaxed outline-none transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  maxHeight: '160px',
                  scrollbarWidth: 'none',
                  boxShadow: input ? '0 0 0 2px rgba(168,85,247,0.15)' : 'none',
                  borderColor: input ? 'rgba(168,85,247,0.3)' : 'rgba(255,255,255,0.1)',
                }}
              />
            </div>

            <motion.button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: input.trim() ? 'linear-gradient(135deg, #a855f7, #7c3aed)' : 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(168,85,247,0.3)',
                boxShadow: input.trim() ? '0 0 20px rgba(168,85,247,0.4)' : 'none',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <Send className="w-4 h-4 text-white" />
              )}
            </motion.button>
          </div>
          <p className="text-center text-[10px] text-slate-700 mt-2">Free · Unlimited · Powered by Puter.js AI</p>
        </div>
      </div>
    </motion.div>
  )
}
