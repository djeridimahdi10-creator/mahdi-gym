'use client'

import React from 'react'

interface RichAIChatContentProps {
  content: string
}

/**
 * Parses inline markdown elements such as **bold**, *italic*, and `code`
 */
function parseInline(text: string): React.ReactNode[] {
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.substring(lastIndex, match.index))
    }

    const token = match[0]
    const key = `${match.index}-${token}`

    if (token.startsWith('**') && token.endsWith('**')) {
      nodes.push(
        <strong key={key} className="font-bold text-white tracking-wide">
          {token.slice(2, -2)}
        </strong>
      )
    } else if (token.startsWith('*') && token.endsWith('*')) {
      nodes.push(
        <em key={key} className="italic text-primary-300">
          {token.slice(1, -1)}
        </em>
      )
    } else if (token.startsWith('`') && token.endsWith('`')) {
      nodes.push(
        <code
          key={key}
          className="px-1.5 py-0.5 text-primary-400 text-xs font-mono"
          style={{
            background: 'rgba(52, 211, 153, 0.08)',
            border: '1px solid rgba(52, 211, 153, 0.15)',
            clipPath: 'polygon(3px 0%, calc(100% - 3px) 0%, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0% calc(100% - 3px), 0% 3px)',
          }}
        >
          {token.slice(1, -1)}
        </code>
      )
    }

    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    nodes.push(text.substring(lastIndex))
  }

  return nodes.length > 0 ? nodes : [text]
}

/**
 * HUD-styled block-level markdown renderer for AI nutrition/workout advice.
 * Uses angular shapes, neon accents, and terminal typography.
 */
export function RichAIChatContent({ content }: RichAIChatContentProps) {
  if (!content) return null

  // Normalize newlines
  const lines = content.replace(/\r\n/g, '\n').split('\n')
  const blocks: React.ReactNode[] = []

  let currentListItems: { type: 'bullet' | 'number'; number?: string; text: string }[] = []

  const flushList = (keyPrefix: number) => {
    if (currentListItems.length === 0) return

    const listKey = `list-${keyPrefix}`
    blocks.push(
      <ul key={listKey} className="space-y-1.5 my-2.5 pl-0.5">
        {currentListItems.map((item, idx) => (
          <li key={`${listKey}-${idx}`} className="flex items-start gap-2.5 text-dark-200 leading-relaxed text-[14.5px]">
            {item.type === 'bullet' ? (
              <span
                className="w-1.5 h-1.5 mt-2 flex-shrink-0"
                style={{
                  background: 'rgba(52, 211, 153, 0.9)',
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  filter: 'drop-shadow(0 0 4px rgba(52, 211, 153, 0.6))',
                }}
              />
            ) : (
              <span
                className="flex-shrink-0 min-w-[20px] h-5 text-[10px] font-bold flex items-center justify-center mt-0.5 uppercase tracking-wider"
                style={{
                  background: 'rgba(168, 85, 247, 0.1)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  color: '#c084fc',
                  clipPath: 'polygon(3px 0%, calc(100% - 3px) 0%, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0% calc(100% - 3px), 0% 3px)',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {item.number || idx + 1}
              </span>
            )}
            <span className="flex-1">{parseInline(item.text)}</span>
          </li>
        ))}
      </ul>
    )
    currentListItems = []
  }

  lines.forEach((line, index) => {
    const trimmed = line.trim()

    // Empty line
    if (!trimmed) {
      flushList(index)
      return
    }

    // Horizontal Rule
    if (trimmed === '---' || trimmed === '***') {
      flushList(index)
      blocks.push(
        <hr
          key={`hr-${index}`}
          className="my-3"
          style={{
            border: 'none',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(52, 211, 153, 0.2) 50%, transparent 100%)',
          }}
        />
      )
      return
    }

    // H3 Headers
    if (trimmed.startsWith('### ')) {
      flushList(index)
      blocks.push(
        <h3
          key={`h3-${index}`}
          className="text-base font-bold text-primary-400 mt-3.5 mb-1.5 flex items-center gap-2 uppercase tracking-wide"
          style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.05em' }}
        >
          <span
            className="w-1.5 h-4 flex-shrink-0"
            style={{
              background: 'rgba(52, 211, 153, 0.7)',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              filter: 'drop-shadow(0 0 4px rgba(52, 211, 153, 0.5))',
            }}
          />
          <span>{parseInline(trimmed.slice(4))}</span>
        </h3>
      )
      return
    }

    // H2 Headers
    if (trimmed.startsWith('## ')) {
      flushList(index)
      blocks.push(
        <h2
          key={`h2-${index}`}
          className="text-lg font-bold text-white mt-4 mb-2 flex items-center gap-2 pb-1 uppercase tracking-wide"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '0.04em',
            borderBottom: '1px solid rgba(168, 85, 247, 0.15)',
          }}
        >
          <span
            className="w-2 h-4.5 flex-shrink-0"
            style={{
              background: 'rgba(168, 85, 247, 0.7)',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              filter: 'drop-shadow(0 0 4px rgba(168, 85, 247, 0.5))',
            }}
          />
          <span>{parseInline(trimmed.slice(3))}</span>
        </h2>
      )
      return
    }

    // H1 Headers
    if (trimmed.startsWith('# ')) {
      flushList(index)
      blocks.push(
        <h1
          key={`h1-${index}`}
          className="text-xl font-extrabold text-white mt-4 mb-2 uppercase tracking-wide"
          style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.04em' }}
        >
          {parseInline(trimmed.slice(2))}
        </h1>
      )
      return
    }

    // Bullet List Items: '-', '*', or '•'
    const bulletMatch = trimmed.match(/^[-*•]\s+(.*)$/)
    if (bulletMatch) {
      currentListItems.push({ type: 'bullet', text: bulletMatch[1] })
      return
    }

    // Numbered List Items: '1.', '2.', etc.
    const numberMatch = trimmed.match(/^(\d+)[.)]\s+(.*)$/)
    if (numberMatch) {
      currentListItems.push({
        type: 'number',
        number: numberMatch[1],
        text: numberMatch[2],
      })
      return
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      flushList(index)
      blocks.push(
        <blockquote
          key={`quote-${index}`}
          className="pl-3.5 py-1.5 my-2 text-dark-300 text-[14px] italic"
          style={{
            borderLeft: '2px solid rgba(52, 211, 153, 0.4)',
            background: 'rgba(52, 211, 153, 0.03)',
            clipPath: 'polygon(0% 0%, 100% 0%, calc(100% - 4px) 4px, calc(100% - 4px) calc(100% - 4px), 0% 100%)',
          }}
        >
          {parseInline(trimmed.slice(2))}
        </blockquote>
      )
      return
    }

    // Normal paragraph line
    flushList(index)
    blocks.push(
      <p
        key={`p-${index}`}
        className="text-dark-200 text-[14.5px] leading-relaxed my-1.5"
      >
        {parseInline(trimmed)}
      </p>
    )
  })

  // Flush any trailing list
  flushList(lines.length)

  return <div className="space-y-1">{blocks}</div>
}
