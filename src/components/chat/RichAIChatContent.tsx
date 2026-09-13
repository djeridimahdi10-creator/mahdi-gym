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
        <em key={key} className="italic text-emerald-300">
          {token.slice(1, -1)}
        </em>
      )
    } else if (token.startsWith('`') && token.endsWith('`')) {
      nodes.push(
        <code
          key={key}
          className="px-1.5 py-0.5 rounded bg-slate-800/80 text-emerald-400 text-xs font-mono border border-slate-700/60"
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
 * Clean, lightweight, block-level markdown renderer designed specifically for AI nutrition/workout advice.
 * Handles headings, bullet points, numbered lists, blockquotes, and normal paragraphs.
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
          <li key={`${listKey}-${idx}`} className="flex items-start gap-2.5 text-slate-200 leading-relaxed text-[14.5px]">
            {item.type === 'bullet' ? (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            ) : (
              <span className="flex-shrink-0 min-w-[20px] h-5 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[11px] font-bold flex items-center justify-center mt-0.5">
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
        <hr key={`hr-${index}`} className="my-3 border-t border-slate-700/60" />
      )
      return
    }

    // H1 or H2 or H3 Headers
    if (trimmed.startsWith('### ')) {
      flushList(index)
      blocks.push(
        <h3
          key={`h3-${index}`}
          className="text-base font-bold text-emerald-400 mt-3.5 mb-1.5 flex items-center gap-2"
        >
          <span className="w-1.5 h-4 rounded-full bg-emerald-500" />
          <span>{parseInline(trimmed.slice(4))}</span>
        </h3>
      )
      return
    }

    if (trimmed.startsWith('## ')) {
      flushList(index)
      blocks.push(
        <h2
          key={`h2-${index}`}
          className="text-lg font-bold text-white mt-4 mb-2 flex items-center gap-2 pb-1 border-b border-slate-800"
        >
          <span className="w-2 h-4.5 rounded-full bg-purple-500" />
          <span>{parseInline(trimmed.slice(3))}</span>
        </h2>
      )
      return
    }

    if (trimmed.startsWith('# ')) {
      flushList(index)
      blocks.push(
        <h1
          key={`h1-${index}`}
          className="text-xl font-extrabold text-white mt-4 mb-2"
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
          className="pl-3.5 py-1.5 my-2 border-l-2 border-emerald-500/60 bg-emerald-500/5 rounded-r-lg text-slate-300 text-[14px] italic"
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
        className="text-slate-200 text-[14.5px] leading-relaxed my-1.5"
      >
        {parseInline(trimmed)}
      </p>
    )
  })

  // Flush any trailing list
  flushList(lines.length)

  return <div className="space-y-1">{blocks}</div>
}
