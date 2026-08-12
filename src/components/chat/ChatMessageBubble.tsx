'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, User, Copy, Check } from 'lucide-react'
import type { ChatMessage } from '@/types'

interface ChatMessageBubbleProps {
  message: ChatMessage
  index: number
}

export function ChatMessageBubble({ message, index }: ChatMessageBubbleProps) {
  const [copied, setCopied] = useState(false)
  const isAI = message.role === 'assistant'

  const copyText = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className={`flex items-start gap-3 ${isAI ? '' : 'flex-row-reverse'}`}
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${isAI ? 'glow-ring-ai' : 'glow-ring'}`}
        style={isAI
          ? { background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)' }
          : { background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }
        }
      >
        {isAI ? <Bot className="w-4 h-4 text-purple-400" /> : <User className="w-4 h-4 text-emerald-400" />}
      </div>

      {/* Bubble Content */}
      <div className={`max-w-[82%] sm:max-w-[78%] group relative ${isAI ? '' : 'items-end flex flex-col'}`}>
        <div
          className="px-4 py-3 rounded-2xl text-sm leading-relaxed"
          style={isAI
            ? { background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.15)', color: '#e2e8f0', borderTopLeftRadius: '4px' }
            : { background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.1))', border: '1px solid rgba(16,185,129,0.2)', color: '#fff', borderTopRightRadius: '4px' }
          }
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>

        {isAI && (
          <button
            onClick={copyText}
            className="mt-1 flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-300 transition-colors opacity-0 group-hover:opacity-100"
          >
            {copied ? <><Check className="w-3 h-3 text-emerald-400" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
          </button>
        )}
      </div>
    </motion.div>
  )
}
