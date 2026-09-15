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
  Terminal,
  Wifi,
  Shield,
  Cpu,
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
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingText])

  // Focus textarea on initial load without triggering window scroll
  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true })
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
      className="w-full h-full flex-1 flex flex-col min-h-0 max-h-full"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* ── Outer Chat Card — HUD Terminal ── */}
      <div
        className="flex-1 flex flex-col overflow-hidden min-h-0 relative h-full"
        style={{
          background: 'linear-gradient(180deg, rgba(4, 8, 18, 0.95) 0%, rgba(6, 11, 24, 0.98) 100%)',
          border: '1px solid rgba(52, 211, 153, 0.12)',
          clipPath: 'polygon(16px 0%, calc(100% - 16px) 0%, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0% calc(100% - 16px), 0% 16px)',
          boxShadow: '0 0 2px rgba(52, 211, 153, 0.3), 0 20px 60px -10px rgba(0, 0, 0, 0.8)',
        }}
      >
        {/* Scanning beam across the top */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(52, 211, 153, 0.5) 50%, transparent 100%)',
          }}
        />

        {/* Subtle scrolling grid texture */}
        <div className="absolute inset-0 hud-grid-bg pointer-events-none opacity-30 z-0" />

        {/* Corner brackets */}
        <div className="hud-corner hud-corner-tl" />
        <div className="hud-corner hud-corner-tr" />
        <div className="hud-corner hud-corner-bl" />
        <div className="hud-corner hud-corner-br" />

        {/* ── Chat Header — HUD Terminal Bar ── */}
        <div
          className="flex-shrink-0 px-4 sm:px-7 py-2.5 sm:py-3.5 flex items-center justify-between relative z-10 gap-2 min-w-0"
          style={{
            borderBottom: '1px solid rgba(52, 211, 153, 0.1)',
            background: 'rgba(4, 8, 18, 0.9)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Coach Identity (Left) */}
          <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
            {/* Hexagonal Avatar */}
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center relative flex-shrink-0"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  clipPath: 'inherit',
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(52, 211, 153, 0.3))',
                }}
              />
              <div
                className="absolute inset-[2px]"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  background: 'rgba(4, 8, 18, 0.85)',
                }}
              />
              <Bot className="w-4.5 h-4.5 text-purple-300 relative z-10" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1
                  className="text-sm sm:text-base font-bold text-white tracking-wide truncate uppercase"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.08em' }}
                >
                  NutriCoach<span className="text-primary-400">.AI</span>
                </h1>
                <span
                  className="px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-[0.2em] flex-shrink-0"
                  style={{
                    background: 'rgba(168, 85, 247, 0.12)',
                    color: '#c084fc',
                    border: '1px solid rgba(168, 85, 247, 0.25)',
                    clipPath: 'polygon(4px 0%, calc(100% - 4px) 0%, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0% calc(100% - 4px), 0% 4px)',
                  }}
                >
                  Pro
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="hud-status-dot" />
                <p
                  className="text-[10px] hidden sm:block truncate uppercase tracking-[0.15em]"
                  style={{ color: 'rgba(52, 211, 153, 0.5)', fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  SYS.ACTIVE // Nutrition · Macros · Workout
                </p>
              </div>
            </div>
          </div>

          {/* Header Controls (Right) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Status Pill */}
            <div
              className="hidden md:flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold flex-shrink-0 uppercase tracking-[0.12em]"
              style={{
                background: 'rgba(52, 211, 153, 0.06)',
                border: '1px solid rgba(52, 211, 153, 0.15)',
                clipPath: 'polygon(4px 0%, calc(100% - 4px) 0%, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0% calc(100% - 4px), 0% 4px)',
                color: 'rgba(52, 211, 153, 0.7)',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              <Wifi className="w-3 h-3" />
              <span>Online · GPT-4o</span>
            </div>

            {/* Clear Chat */}
            {!isEmpty && (
              <div className="relative">
                {showClearConfirm ? (
                  <div
                    className="flex items-center gap-1.5 p-1 animate-scale-in"
                    style={{
                      background: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid rgba(239, 68, 68, 0.25)',
                      clipPath: 'polygon(4px 0%, calc(100% - 4px) 0%, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0% calc(100% - 4px), 0% 4px)',
                    }}
                  >
                    <span className="text-[10px] font-bold text-red-400 px-1.5 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Purge?
                    </span>
                    <button
                      onClick={handleClear}
                      className="px-2 py-0.5 text-[10px] font-bold bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors border border-red-500/30 cursor-pointer"
                      style={{ clipPath: 'polygon(3px 0%, calc(100% - 3px) 0%, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0% calc(100% - 3px), 0% 3px)' }}
                    >
                      Y
                    </button>
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="px-2 py-0.5 text-[10px] font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      N
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      clipPath: 'polygon(4px 0%, calc(100% - 4px) 0%, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0% calc(100% - 4px), 0% 4px)',
                      color: '#64748b',
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                    title="Clear chat history"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span className="hidden sm:inline">Purge</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Messages Scroll Area ── */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-3.5 sm:px-6 py-3 sm:py-5 space-y-2 min-h-0 relative z-10"
          style={{ scrollbarWidth: 'thin' }}
        >
          {isEmpty ? (
            /* ── HUD Empty State ── */
            <div className="flex flex-col items-center justify-center min-h-full py-2 sm:py-4 text-center w-full">
              {/* AI Terminal Icon */}
              <motion.div
                className="relative flex items-center justify-center mb-4 sm:mb-5"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center relative"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      clipPath: 'inherit',
                      background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.2), rgba(168, 85, 247, 0.15))',
                      border: '1px solid rgba(52, 211, 153, 0.3)',
                    }}
                  />
                  <div
                    className="absolute inset-[2px]"
                    style={{
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      background: 'rgba(4, 8, 18, 0.9)',
                    }}
                  />
                  <Cpu className="w-7 h-7 sm:w-8 sm:h-8 text-primary-400 relative z-10" />
                </div>
                <div
                  className="absolute -bottom-1 -right-1 w-6 h-6 flex items-center justify-center z-20"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))',
                  }}
                >
                  <Zap className="w-3 h-3 text-white fill-white" />
                </div>
              </motion.div>

              {/* Terminal text */}
              <div className="space-y-2 mb-4 sm:mb-5 max-w-2xl mx-auto px-2">
                <h2
                  className="text-xl sm:text-2xl font-bold text-white tracking-wide uppercase"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}
                >
                  Initialize <span className="text-primary-400">Session</span>
                </h2>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary-400/40" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-dark-500" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    NutriCoach v2.0 Terminal
                  </span>
                  <div className="h-px w-10 bg-gradient-to-l from-transparent to-primary-400/40" />
                </div>
                <p className="text-dark-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Query personalized meal protocols, macro targets, workout splits, or fast recovery algorithms.
                </p>
              </div>

              {/* Suggestion Cards */}
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
                        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center animate-pulse relative"
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        }}
                      >
                        <div
                          className="absolute inset-0"
                          style={{
                            clipPath: 'inherit',
                            background: 'linear-gradient(135deg, rgba(168,85,247,0.4), rgba(124,58,237,0.3))',
                          }}
                        />
                        <div
                          className="absolute inset-[2px]"
                          style={{
                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                            background: 'rgba(4, 8, 18, 0.85)',
                          }}
                        />
                        <Bot className="w-4 h-4 text-purple-300 relative z-10" />
                      </div>
                    </div>

                    {/* AI Bubble */}
                    <div className="flex flex-col max-w-[88%] sm:max-w-[80%] md:max-w-[75%] items-start">
                      <div className="flex items-center gap-2 mb-1.5 px-1 text-xs text-purple-300 font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        <Terminal className="w-3 h-3 text-purple-400" />
                        <span className="uppercase tracking-wider text-[10px]">NutriCoach.AI</span>
                        <span className="text-[9px] text-primary-400/70 animate-pulse font-mono">
                          {streamingText ? '▋ STREAMING' : '◉ PROCESSING'}
                        </span>
                      </div>

                      <div
                        className="px-4 sm:px-5 py-3.5 sm:py-4 text-[14.5px] leading-relaxed"
                        style={{
                          background: 'rgba(8, 15, 30, 0.8)',
                          border: '1px solid rgba(168, 85, 247, 0.15)',
                          clipPath: 'polygon(0% 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, 8px 100%, 0% calc(100% - 8px))',
                          color: '#f1f5f9',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        {streamingText ? (
                          <div>
                            <RichAIChatContent content={streamingText} />
                            <span
                              className="inline-block w-2 h-4 ml-1 align-middle animate-pulse"
                              style={{
                                background: 'rgba(52, 211, 153, 0.8)',
                                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                                filter: 'drop-shadow(0 0 4px rgba(52, 211, 153, 0.6))',
                              }}
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-2.5 py-1 text-slate-300">
                            <span className="text-[10px] font-bold text-dark-400 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                              Compiling response
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-primary-400 animate-bounce" style={{ animationDelay: '0ms', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                              <span className="w-1.5 h-1.5 bg-primary-400 animate-bounce" style={{ animationDelay: '150ms', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                              <span className="w-1.5 h-1.5 bg-primary-400 animate-bounce" style={{ animationDelay: '300ms', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          )}
        </div>

        {/* ── Input Area — HUD Terminal Input ── */}
        <div
          className="flex-shrink-0 p-2 sm:p-3.5 relative z-10"
          style={{
            borderTop: '1px solid rgba(52, 211, 153, 0.1)',
            background: 'rgba(4, 8, 18, 0.95)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="max-w-4xl mx-auto w-full space-y-2">
            {/* Quick Topic Chips */}
            {!isEmpty && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.2em] flex-shrink-0"
                  style={{ color: 'rgba(52, 211, 153, 0.4)', fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Quick:
                </span>
                {QUICK_TOPICS.map((topic) => {
                  const Icon = topic.icon
                  return (
                    <button
                      key={topic.label}
                      onClick={() => sendMessage(topic.prompt)}
                      className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold text-dark-400 hover:text-primary-300 transition-all flex-shrink-0 cursor-pointer uppercase tracking-wider"
                      style={{
                        background: 'rgba(52, 211, 153, 0.04)',
                        border: '1px solid rgba(52, 211, 153, 0.08)',
                        clipPath: 'polygon(4px 0%, calc(100% - 4px) 0%, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0% calc(100% - 4px), 0% 4px)',
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      <Icon className="w-3 h-3 text-primary-400/50" />
                      <span>{topic.label}</span>
                    </button>
                  )
                })}
              </div>
            )}

            {/* Input Bar */}
            <div
              className="flex items-end gap-2 p-1.5 sm:p-2 transition-all duration-200"
              style={{
                background: 'rgba(8, 15, 30, 0.6)',
                border: `1px solid ${input.trim() ? 'rgba(52, 211, 153, 0.3)' : 'rgba(52, 211, 153, 0.08)'}`,
                clipPath: 'polygon(10px 0%, calc(100% - 10px) 0%, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px), 0% 10px)',
                boxShadow: input.trim()
                  ? '0 0 20px rgba(52, 211, 153, 0.08), inset 0 0 30px rgba(52, 211, 153, 0.02)'
                  : '0 4px 14px rgba(0, 0, 0, 0.2)',
              }}
            >
              {/* Terminal prompt indicator */}
              <div className="flex items-center gap-1 pl-2 pb-2 flex-shrink-0">
                <span className="text-primary-400/50 text-xs font-mono">❯</span>
              </div>

              <textarea
                ref={inputRef}
                value={input}
                onChange={autoResize}
                onKeyDown={handleKeyDown}
                placeholder="Enter query — nutrition, workout splits, recovery protocols…"
                rows={1}
                className="w-full resize-none py-1.5 px-1 sm:py-2 sm:px-2 text-sm sm:text-[14.5px] leading-relaxed text-white placeholder:text-dark-600 outline-none bg-transparent"
                style={{
                  maxHeight: '140px',
                  scrollbarWidth: 'none',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              />

              <motion.button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 transition-all duration-150 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                style={{
                  background: input.trim()
                    ? 'rgba(52, 211, 153, 0.15)'
                    : 'rgba(255, 255, 255, 0.03)',
                  border: input.trim()
                    ? '1px solid rgba(52, 211, 153, 0.4)'
                    : '1px solid rgba(255, 255, 255, 0.05)',
                  clipPath: 'polygon(4px 0%, calc(100% - 4px) 0%, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0% calc(100% - 4px), 0% 4px)',
                  boxShadow: input.trim() ? '0 0 12px rgba(52, 211, 153, 0.15)' : 'none',
                }}
                whileHover={input.trim() ? { scale: 1.05 } : {}}
                whileTap={input.trim() ? { scale: 0.95 } : {}}
                title="Send message"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-primary-400/30 border-t-primary-400 animate-spin" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                ) : (
                  <Send className={`w-4 h-4 ${input.trim() ? 'text-primary-300' : 'text-dark-600'}`} />
                )}
              </motion.button>
            </div>

            {/* Micro terminal footer */}
            <div className="flex items-center justify-between px-2 text-[9px] uppercase tracking-[0.15em]" style={{ color: 'rgba(100, 116, 139, 0.5)', fontFamily: "'Space Grotesk', sans-serif" }}>
              <span className="flex items-center gap-1.5">
                <CornerDownLeft className="w-3 h-3 text-dark-600" />
                <span>Enter to transmit · Shift+Enter for newline</span>
              </span>

              <span className="hidden sm:flex items-center gap-1.5">
                <Shield className="w-3 h-3" />
                <span>Encrypted · Unlimited AI Coach</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
