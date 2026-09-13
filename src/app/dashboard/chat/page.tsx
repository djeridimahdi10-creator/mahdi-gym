'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  Bot,
  Trash2,
  Sparkles,
  Zap,
  RotateCcw,
  Utensils,
  Dumbbell,
  HeartPulse,
  CornerDownLeft,
} from 'lucide-react'
import { useChatStore } from '@/stores/chatStore'
import type { ChatMessage } from '@/types'
import { nutritionChatStream } from '@/lib/puter-ai'
import { ChatMessageBubble, ChatSuggestions, RichAIChatContent } from '@/components/chat'

const QUICK_TOPICS = [
  { label: 'High-Protein Meals', prompt: 'Give me 3 easy high-protein meals with 40g+ protein each.', icon: Utensils },
  { label: 'Macro Split', prompt: 'Calculate my target daily macros for clean bulking.', icon: Sparkles },
  { label: 'Push-Pull-Legs Split', prompt: 'Design an optimal 4-day push-pull-legs workout routine.', icon: Dumbbell },
  { label: 'Post-Workout Recovery', prompt: 'What is the fastest way to recover muscle soreness after heavy training?', icon: HeartPulse },
]

export default function ChatPage() {
  const { messages, addMessage, setLoading, loading, clearMessages } = useChatStore()
  const [input, setInput] = useState('')
  const [streamingText, setStreamingText] = useState('')
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingText])

  // Focus textarea on initial load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const sendMessage = async (text?: string) => {
    const content = (text || input).trim()
    if (!content || loading) return

    const now = new Date().toISOString()
    const userMessage: ChatMessage = {
      role: 'user',
      content,
      created_at: now,
    }

    addMessage(userMessage)
    setInput('')
    setLoading(true)
    setStreamingText('')
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
    }

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
      addMessage({
        role: 'assistant',
        content: fullReply || 'I am ready to help! Could you please clarify your goal?',
        created_at: new Date().toISOString(),
      })
    } catch {
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: content, history: messages.slice(-10) }),
        })
        const data = await res.json()
        addMessage({
          role: 'assistant',
          content: data.reply || 'Here is your customized nutrition and training guidance.',
          created_at: new Date().toISOString(),
        })
      } catch {
        addMessage({
          role: 'assistant',
          content:
            'I encountered a temporary connection issue. Please check your network or try again.',
          created_at: new Date().toISOString(),
        })
      }
    } finally {
      setLoading(false)
      setStreamingText('')
    }
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

  const handleClear = () => {
    clearMessages()
    setShowClearConfirm(false)
  }

  const isEmpty = messages.length === 0

  return (
    <motion.div
      className="w-full flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-95px)] min-h-[500px]"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* ── Outer Chat Card ── */}
      <div
        className="flex-1 flex flex-col rounded-2xl sm:rounded-3xl border overflow-hidden min-h-0 relative shadow-2xl"
        style={{
          background: 'linear-gradient(180deg, #0c1322 0%, #080d18 100%)',
          borderColor: 'rgba(51, 65, 85, 0.45)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04)',
        }}
      >
        {/* Ambient Top Glow Line */}
        <div
          className="absolute top-0 left-1/4 right-1/4 h-[1px] opacity-60 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(52, 211, 153, 0.6) 50%, transparent 100%)',
          }}
        />

        {/* ── Chat Header ── */}
        <div
          className="flex-shrink-0 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between border-b relative z-10"
          style={{
            borderColor: 'rgba(51, 65, 85, 0.4)',
            background: 'rgba(12, 19, 34, 0.85)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Coach Identity (Left) */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center relative shadow-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(168, 85, 247, 0.2))',
                border: '1px solid rgba(52, 211, 153, 0.4)',
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.15)',
              }}
            >
              <Bot className="w-5 h-5 text-emerald-400" />
              <span
                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0c1322]"
                style={{ boxShadow: '0 0 8px #34d399' }}
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1
                  className="text-base sm:text-lg font-extrabold text-white tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  NutriCoach AI
                </h1>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#34d399',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                  }}
                >
                  Pro
                </span>
              </div>
              <p className="text-slate-400 text-xs hidden sm:block">
                Personalized nutrition, macros & workout split advisor
              </p>
            </div>
          </div>

          {/* Quick Header Controls (Right) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Status Pill */}
            <div
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#94a3b8',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Ready · GPT-4o</span>
            </div>

            {/* Clear Chat Confirmation / Trigger */}
            {!isEmpty && (
              <div className="relative">
                {showClearConfirm ? (
                  <div
                    className="flex items-center gap-1.5 p-1 rounded-xl animate-scale-in"
                    style={{
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                    }}
                  >
                    <span className="text-[11px] font-semibold text-red-400 px-1.5">Clear all?</span>
                    <button
                      onClick={handleClear}
                      className="px-2 py-0.5 text-[11px] font-bold rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="px-2 py-0.5 text-[11px] font-medium rounded-lg text-slate-300 hover:text-white transition-colors"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-red-400 transition-colors"
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                    title="Clear chat history"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Clear Chat</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Messages Scroll Area ── */}
        <div
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 sm:py-6 space-y-2 min-h-0 relative"
          style={{ scrollbarWidth: 'thin' }}
        >
          {isEmpty ? (
            /* ── Minimalist 2D Empty State (No 3D Canvas) ── */
            <div className="flex flex-col items-center justify-center min-h-full py-6 text-center">
              {/* Clean 2D AI Branding Icon */}
              <motion.div
                className="relative flex items-center justify-center mb-5"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center relative"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(168, 85, 247, 0.2))',
                    border: '1px solid rgba(52, 211, 153, 0.35)',
                    boxShadow: '0 0 35px rgba(16, 185, 129, 0.2)',
                  }}
                >
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
                </div>
                <div
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
                    border: '2px solid #0c1322',
                  }}
                >
                  <Zap className="w-3 h-3 text-white fill-white" />
                </div>
              </motion.div>

              {/* Empty State Text */}
              <div className="space-y-1.5 mb-6 max-w-lg mx-auto">
                <h2
                  className="text-xl sm:text-2xl font-extrabold text-white tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  How can I help you today?
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                  Ask about personalized meal plans, macro targets, workout splits, or fast recovery tips.
                </p>
              </div>

              {/* Interactive 2D Prompt Suggestions */}
              <ChatSuggestions onSelectSuggestion={(text) => sendMessage(text)} />
            </div>
          ) : (
            /* ── Active Conversation Stream ── */
            <div className="max-w-4xl mx-auto w-full space-y-4">
              {messages.map((msg, index) => (
                <ChatMessageBubble key={msg.id || index} message={msg} index={index} />
              ))}

              {/* Streaming Response Indicator / Bubble */}
              <AnimatePresence>
                {(loading || streamingText) && (
                  <motion.div
                    className="w-full flex gap-3 sm:gap-3.5 my-3 justify-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* AI Avatar */}
                    <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
                      <div
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shadow-md animate-pulse"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(124,58,237,0.25))',
                          border: '1px solid rgba(168,85,247,0.45)',
                          boxShadow: '0 0 16px rgba(168,85,247,0.2)',
                        }}
                      >
                        <Bot className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-purple-300" />
                      </div>
                    </div>

                    {/* AI Bubble */}
                    <div className="flex flex-col max-w-[88%] sm:max-w-[80%] md:max-w-[75%] items-start">
                      <div className="flex items-center gap-2 mb-1.5 px-1 text-xs text-purple-300 font-semibold">
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        <span>NutriCoach AI</span>
                        <span className="text-[10px] text-purple-400/80 animate-pulse font-normal">
                          {streamingText ? 'Typing…' : 'Analyzing…'}
                        </span>
                      </div>

                      <div
                        className="rounded-2xl rounded-tl-sm px-4 sm:px-5 py-3.5 sm:py-4 text-[14.5px] leading-relaxed shadow-lg"
                        style={{
                          background: '#151f32',
                          border: '1px solid rgba(71, 85, 105, 0.5)',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                          color: '#f1f5f9',
                        }}
                      >
                        {streamingText ? (
                          <div>
                            <RichAIChatContent content={streamingText} />
                            <span className="inline-block w-2 h-4 ml-1 bg-emerald-400 rounded-xs animate-pulse align-middle" />
                          </div>
                        ) : (
                          <div className="flex items-center gap-2.5 py-1 text-slate-300">
                            <span className="text-xs font-medium text-slate-400">
                              Crafting your personalized guidance
                            </span>
                            <div className="flex items-center gap-1">
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"
                                style={{ animationDelay: '0ms' }}
                              />
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"
                                style={{ animationDelay: '150ms' }}
                              />
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"
                                style={{ animationDelay: '300ms' }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* ── Redesigned Input Area ── */}
        <div
          className="flex-shrink-0 p-3 sm:p-4 border-t relative z-10"
          style={{
            borderColor: 'rgba(51, 65, 85, 0.45)',
            background: 'rgba(10, 16, 29, 0.95)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="max-w-4xl mx-auto w-full space-y-2.5">
            {/* Quick Topic Chips (Visible when chat has messages to easily continue conversation) */}
            {!isEmpty && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
                <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider flex-shrink-0">
                  Quick:
                </span>
                {QUICK_TOPICS.map((topic) => {
                  const Icon = topic.icon
                  return (
                    <button
                      key={topic.label}
                      onClick={() => sendMessage(topic.prompt)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-slate-300 hover:text-white transition-all flex-shrink-0"
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <Icon className="w-3 h-3 text-emerald-400" />
                      <span>{topic.label}</span>
                    </button>
                  )
                })}
              </div>
            )}

            {/* Input Bar */}
            <div
              className="flex items-end gap-2.5 p-2 rounded-2xl transition-all duration-200"
              style={{
                background: 'rgba(21, 31, 50, 0.75)',
                border: '1px solid rgba(71, 85, 105, 0.45)',
                boxShadow: input.trim()
                  ? '0 0 0 2px rgba(16, 185, 129, 0.25), 0 4px 20px rgba(0, 0, 0, 0.3)'
                  : '0 4px 14px rgba(0, 0, 0, 0.2)',
              }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={autoResize}
                onKeyDown={handleKeyDown}
                placeholder="Ask about nutrition, workout splits, or recovery… (e.g., 'What should I eat post-workout?')"
                rows={1}
                className="w-full resize-none py-2 px-3 text-sm sm:text-[14.5px] leading-relaxed text-white placeholder:text-slate-500 outline-none bg-transparent"
                style={{
                  maxHeight: '160px',
                  scrollbarWidth: 'none',
                }}
              />

              <motion.button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: input.trim()
                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: input.trim()
                    ? '1px solid rgba(52, 211, 153, 0.4)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: input.trim() ? '0 4px 14px rgba(16, 185, 129, 0.35)' : 'none',
                }}
                whileHover={input.trim() ? { scale: 1.05 } : {}}
                whileTap={input.trim() ? { scale: 0.95 } : {}}
                title="Send message"
              >
                {loading ? (
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <Send className="w-4 h-4 text-white" />
                )}
              </motion.button>
            </div>

            {/* Micro Instruction Footer */}
            <div className="flex items-center justify-between px-1 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <CornerDownLeft className="w-3 h-3 text-slate-600" />
                <span>Enter to send · Shift+Enter for new line</span>
              </span>

              <span className="text-slate-600 hidden sm:inline">
                Free & Unlimited AI Coach
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
