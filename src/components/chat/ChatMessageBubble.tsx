'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, User, Copy, Check, ThumbsUp, Sparkles } from 'lucide-react'
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
      {/* ── AI Avatar (Left) ── */}
      {isAI && (
        <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shadow-md relative"
            style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.25), rgba(124,58,237,0.2))',
              border: '1px solid rgba(168,85,247,0.4)',
              boxShadow: '0 0 16px rgba(168,85,247,0.15)',
            }}
          >
            <Bot className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-purple-300" />
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0c1222]"
              title="Online"
            />
          </div>
        </div>
      )}

      {/* ── Message Content Column ── */}
      <div className={`flex flex-col max-w-[88%] sm:max-w-[80%] md:max-w-[75%] ${isAI ? 'items-start' : 'items-end'}`}>
        {/* Sender Name & Timestamp Header */}
        <div className={`flex items-center gap-2 mb-1.5 px-1 text-xs ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
          <span className={`font-semibold flex items-center gap-1.5 ${isAI ? 'text-purple-300' : 'text-emerald-400'}`}>
            {isAI ? (
              <>
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>NutriCoach AI</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-medium">
                  Assistant
                </span>
              </>
            ) : (
              <span>You</span>
            )}
          </span>

          {timeString && (
            <span className="text-[11px] text-slate-500">{timeString}</span>
          )}
        </div>

        {/* ── Bubble ── */}
        <div
          className={`relative group transition-all duration-200 ${
            isAI
              ? 'rounded-2xl rounded-tl-sm px-4 sm:px-5 py-3.5 sm:py-4'
              : 'rounded-2xl rounded-tr-sm px-4 sm:px-5 py-3 sm:py-3.5'
          }`}
          style={
            isAI
              ? {
                  background: '#151f32',
                  border: '1px solid rgba(71, 85, 105, 0.45)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                  color: '#f1f5f9',
                }
              : {
                  background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
                  border: '1px solid rgba(52, 211, 153, 0.4)',
                  boxShadow: '0 4px 18px rgba(5, 150, 105, 0.25)',
                  color: '#ffffff',
                }
          }
        >
          {isAI ? (
            /* Rich Formatted Markdown Content for AI */
            <RichAIChatContent content={message.content} />
          ) : (
            /* Crisp plain text for User */
            <p className="whitespace-pre-wrap leading-relaxed text-[14.5px] font-medium text-white select-text">
              {message.content}
            </p>
          )}

          {/* AI Action Footer (Copy, Helpful) */}
          {isAI && (
            <div className="mt-3 pt-2.5 border-t border-slate-700/50 flex items-center justify-between gap-3 text-xs text-slate-400">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                NutriCoach Intelligence
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={copyText}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-[11px]"
                  title="Copy response"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied</span>
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
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors text-[11px] ${
                    liked
                      ? 'text-emerald-400 bg-emerald-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                  title="Helpful response"
                >
                  <ThumbsUp className={`w-3 h-3 ${liked ? 'fill-emerald-400' : ''}`} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── User Avatar (Right) ── */}
      {!isAI && (
        <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shadow-md"
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(5,150,105,0.2))',
              border: '1px solid rgba(16,185,129,0.4)',
              boxShadow: '0 0 16px rgba(16,185,129,0.15)',
            }}
          >
            <User className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-300" />
          </div>
        </div>
      )}
    </motion.div>
  )
}
