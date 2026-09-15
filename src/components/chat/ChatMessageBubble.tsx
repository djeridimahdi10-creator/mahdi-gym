'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, User, Copy, Check, ThumbsUp, Terminal, Shield } from 'lucide-react'
import type { ChatMessage } from '@/types'
import { RichAIChatContent } from './RichAIChatContent'

interface ChatMessageBubbleProps {
  message: ChatMessage
  index?: number
}

export function ChatMessageBubble({ message, index = 0 }: ChatMessageBubbleProps) {
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState(false)
  const isAI = message.role === 'assistant'

  const copyText = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Format time if available, or fallback
  const timeString = message.created_at
    ? new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : undefined

  return (
    <motion.div
      className={`w-full flex gap-3 sm:gap-3.5 my-3 ${isAI ? 'justify-start' : 'justify-end'}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.2) }}
    >
      {/* ── AI Avatar (Left) — Hexagonal ── */}
      {isAI && (
        <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center relative"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                clipPath: 'inherit',
                background: 'linear-gradient(135deg, rgba(168,85,247,0.35), rgba(124,58,237,0.25))',
              }}
            />
            <div
              className="absolute inset-[2px]"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                background: 'rgba(4, 8, 18, 0.85)',
              }}
            />
            <Bot className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-purple-300 relative z-10" />
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 border-2 border-[#040812] z-20"
              style={{
                background: '#34d399',
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                filter: 'drop-shadow(0 0 4px rgba(52, 211, 153, 0.6))',
              }}
              title="Online"
            />
          </div>
        </div>
      )}

      {/* ── Message Content Column ── */}
      <div className={`flex flex-col max-w-[88%] sm:max-w-[80%] md:max-w-[75%] ${isAI ? 'items-start' : 'items-end'}`}>
        {/* Sender Name & Timestamp Header */}
        <div className={`flex items-center gap-2 mb-1.5 px-1 text-xs ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
          <span
            className={`font-bold flex items-center gap-1.5 uppercase tracking-wider text-[10px] ${isAI ? 'text-purple-300' : 'text-primary-400'}`}
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {isAI ? (
              <>
                <Terminal className="w-3 h-3 text-purple-400" />
                <span>NutriCoach.AI</span>
                <span
                  className="text-[8px] px-1.5 py-0.5 text-purple-300 font-bold tracking-[0.15em]"
                  style={{
                    background: 'rgba(168, 85, 247, 0.1)',
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                    clipPath: 'polygon(3px 0%, calc(100% - 3px) 0%, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0% calc(100% - 3px), 0% 3px)',
                  }}
                >
                  SYS
                </span>
              </>
            ) : (
              <span>Operator</span>
            )}
          </span>

          {timeString && (
            <span className="text-[10px] text-dark-600 font-mono">{timeString}</span>
          )}
        </div>

        {/* ── Bubble ── */}
        <div
          className={`relative group transition-all duration-200 ${
            isAI
              ? 'px-4 sm:px-5 py-3.5 sm:py-4'
              : 'px-4 sm:px-5 py-3 sm:py-3.5'
          }`}
          style={
            isAI
              ? {
                  background: 'rgba(8, 15, 30, 0.8)',
                  border: '1px solid rgba(168, 85, 247, 0.12)',
                  clipPath: 'polygon(0% 0%, calc(100% - 10px) 0%, 100% 10px, 100% 100%, 10px 100%, 0% calc(100% - 10px))',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                  color: '#f1f5f9',
                }
              : {
                  background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                  clipPath: 'polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)',
                  boxShadow: '0 4px 18px rgba(0, 0, 0, 0.2), 0 0 15px rgba(52, 211, 153, 0.05)',
                  color: '#ffffff',
                }
          }
        >
          {isAI ? (
            /* Rich Formatted Markdown Content for AI */
            <RichAIChatContent content={message.content} />
          ) : (
            /* User message text */
            <p
              className="whitespace-pre-wrap leading-relaxed text-[14.5px] font-medium text-white select-text"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {message.content}
            </p>
          )}

          {/* AI Action Footer */}
          {isAI && (
            <div
              className="mt-3 pt-2.5 flex items-center justify-between gap-3 text-xs"
              style={{ borderTop: '1px solid rgba(168, 85, 247, 0.08)' }}
            >
              <span
                className="text-[9px] flex items-center gap-1.5 uppercase tracking-[0.15em]"
                style={{ color: 'rgba(100, 116, 139, 0.5)', fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <Shield className="w-3 h-3" />
                NutriCoach Intelligence
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={copyText}
                  className="flex items-center gap-1 px-2 py-1 text-[10px] text-dark-500 hover:text-primary-300 transition-colors cursor-pointer uppercase tracking-wider font-bold"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  title="Copy response"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-primary-400" />
                      <span className="text-primary-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-1 px-2 py-1 transition-colors cursor-pointer ${
                    liked
                      ? 'text-primary-400'
                      : 'text-dark-500 hover:text-primary-300'
                  }`}
                  title="Helpful response"
                >
                  <ThumbsUp className={`w-3 h-3 ${liked ? 'fill-primary-400' : ''}`} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── User Avatar (Right) — Hexagonal ── */}
      {!isAI && (
        <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center relative"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                clipPath: 'inherit',
                background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.35), rgba(16, 185, 129, 0.25))',
              }}
            />
            <div
              className="absolute inset-[2px]"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                background: 'rgba(4, 8, 18, 0.85)',
              }}
            />
            <User className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-primary-300 relative z-10" />
          </div>
        </div>
      )}
    </motion.div>
  )
}
