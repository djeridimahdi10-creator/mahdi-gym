/**
 * Puter.js AI Service
 *
 * Free, unlimited access to GPT models via Puter.js (User-Pays model).
 * No API key required. Works entirely in the browser.
 * https://developer.puter.com/tutorials/free-unlimited-openai-api/
 */

// ─── Type augmentation for window.puter ────────────────────────────────────
declare global {
  interface Window {
    puter?: PuterInstance
  }
}

export interface PuterChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string | PuterContentPart[]
}

export interface PuterContentPart {
  type: 'text' | 'image_url'
  text?: string
  image_url?: { url: string }
}

export interface PuterChatOptions {
  model?: string
  stream?: boolean
  temperature?: number
  max_tokens?: number
  tools?: PuterTool[]
}

export interface PuterTool {
  type: 'function' | 'web_search'
  function?: {
    name: string
    description: string
    parameters: Record<string, unknown>
  }
}

export interface PuterStreamChunk {
  text?: string
  reasoning?: string
}

export interface PuterInstance {
  ai: {
    chat(
      prompt: string | PuterChatMessage[],
      optionsOrImageUrl?: string | PuterChatOptions,
      options?: PuterChatOptions
    ): Promise<string | AsyncIterable<PuterStreamChunk>>
    txt2img(
      prompt: string,
      options?: { model?: string; width?: number; height?: number }
    ): Promise<HTMLImageElement>
    txt2speech(
      text: string,
      options?: { provider?: string; model?: string; voice?: string }
    ): Promise<HTMLAudioElement>
  }
}

// ─── Supported Models ────────────────────────────────────────────────────────

export const PUTER_MODELS = {
  // GPT 5.6 family (latest)
  GPT_5_6_SOL: 'gpt-5.6-sol',
  GPT_5_6_SOL_PRO: 'gpt-5.6-sol-pro',
  GPT_5_6_TERRA: 'gpt-5.6-terra',
  GPT_5_6_TERRA_PRO: 'gpt-5.6-terra-pro',
  GPT_5_6_LUNA: 'gpt-5.6-luna',
  GPT_5_6_LUNA_PRO: 'gpt-5.6-luna-pro',
  // GPT 5.5
  GPT_5_5: 'gpt-5.5',
  GPT_5_5_PRO: 'gpt-5.5-pro',
  // GPT 5.4 family
  GPT_5_4: 'gpt-5.4',
  GPT_5_4_PRO: 'gpt-5.4-pro',
  GPT_5_4_MINI: 'gpt-5.4-mini',
  GPT_5_4_NANO: 'gpt-5.4-nano',
  // GPT 5.3
  GPT_5_3_CHAT: 'gpt-5.3-chat',
  GPT_5_3_CODEX: 'openai/gpt-5.3-codex',
  // GPT 5.2
  GPT_5_2: 'gpt-5.2',
  GPT_5_2_CHAT: 'gpt-5.2-chat',
  GPT_5_2_PRO: 'gpt-5.2-pro',
  // GPT 5.x classic
  GPT_5: 'gpt-5',
  GPT_5_MINI: 'gpt-5-mini',
  GPT_5_NANO: 'gpt-5-nano',
  // GPT 4.x
  GPT_4_1: 'gpt-4.1',
  GPT_4_1_MINI: 'gpt-4.1-mini',
  GPT_4_1_NANO: 'gpt-4.1-nano',
  GPT_4O: 'gpt-4o',
  GPT_4O_MINI: 'gpt-4o-mini',
  // Reasoning models
  O1: 'o1',
  O1_MINI: 'o1-mini',
  O1_PRO: 'o1-pro',
  O3: 'o3',
  O3_MINI: 'o3-mini',
  O4_MINI: 'o4-mini',
  // OSS
  GPT_OSS_120B: 'openai/gpt-oss-120b',
} as const

export const PUTER_IMAGE_MODELS = {
  GPT_IMAGE_2: 'gpt-image-2',
  GPT_IMAGE_1_5: 'gpt-image-1.5',
  GPT_IMAGE_1_MINI: 'gpt-image-1-mini',
  GPT_IMAGE_1: 'gpt-image-1',
} as const

export const PUTER_TTS_MODELS = {
  GPT_4O_MINI_TTS: 'gpt-4o-mini-tts',
  TTS_1: 'tts-1',
  TTS_1_HD: 'tts-1-hd',
} as const

// ─── Puter.js Loader ────────────────────────────────────────────────────────

let _puterReady: Promise<PuterInstance> | null = null

export function loadPuter(): Promise<PuterInstance> {
  if (_puterReady) return _puterReady

  _puterReady = new Promise<PuterInstance>((resolve, reject) => {
    // Already loaded via CDN script tag (next/script in layout)
    if (typeof window !== 'undefined' && window.puter) {
      resolve(window.puter)
      return
    }

    // Dynamic load as fallback
    const script = document.createElement('script')
    script.src = 'https://js.puter.com/v2/'
    script.async = true
    script.onload = () => {
      if (window.puter) {
        resolve(window.puter)
      } else {
        reject(new Error('Puter.js loaded but window.puter not found'))
      }
    }
    script.onerror = () => reject(new Error('Failed to load Puter.js from CDN'))
    document.head.appendChild(script)
  })

  return _puterReady
}

// ─── Tool 1: Text Chat (single response) ────────────────────────────────────

export interface ChatOptions {
  model?: string
  temperature?: number
  maxTokens?: number
  systemPrompt?: string
}

/**
 * Helper to extract prompt text cleanly
 */
export function extractPromptText(
  messages: Array<{ role: string; content: string }> | string
): string {
  if (typeof messages === 'string') return messages
  if (Array.isArray(messages) && messages.length > 0) {
    const lastUser = messages.filter((m) => m.role === 'user').pop()
    if (lastUser?.content) return lastUser.content
    return messages[messages.length - 1].content || ''
  }
  return ''
}

/**
 * Send a chat message and get a complete response with multi-tier fallback.
 */
export async function puterChat(
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> | string,
  options: ChatOptions = {}
): Promise<string> {
  const prompt = extractPromptText(messages)

  // 1. Try Puter.js
  try {
    const puter = await loadPuter()
    const opts: Record<string, unknown> = {}
    if (options.model) opts.model = options.model
    if (options.temperature) opts.temperature = options.temperature

    const response = (await puter.ai.chat(prompt, opts)) as any
    let text = ''
    if (typeof response === 'string') text = response
    else if (response?.text) text = response.text
    else if (response?.message?.content) text = response.message.content
    else if (typeof response === 'object' && response !== null) text = JSON.stringify(response)

    if (text) return text
  } catch (err) {
    console.warn('Puter.js chat error:', err)
  }

  // 2. Fallback to API route
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt }),
    })
    const data = await res.json()
    return data.reply || "I'm here to help with your nutrition and workout goals!"
  } catch {
    return "I'm here to help with your nutrition and workout goals! Ask me about meal plans or macros."
  }
}

// ─── Tool 2: Streaming Chat ──────────────────────────────────────────────────

/**
 * Stream a chat response token by token with multi-tier fallback.
 */
export async function puterChatStream(
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> | string,
  onChunk: (text: string) => void,
  options: ChatOptions = {}
): Promise<string> {
  const prompt = extractPromptText(messages)

  // 1. Try Puter streaming
  try {
    const puter = await loadPuter()
    const opts: Record<string, unknown> = { stream: true }
    if (options.model) opts.model = options.model

    const response = (await puter.ai.chat(prompt, opts)) as any
    let fullText = ''

    if (response && typeof response[Symbol.asyncIterator] === 'function') {
      for await (const chunk of response) {
        let text = ''
        if (typeof chunk === 'string') {
          text = chunk
        } else if (chunk && typeof chunk === 'object') {
          text = chunk.text ?? chunk.reasoning ?? ''
        }
        if (text) {
          onChunk(text)
          fullText += text
        }
      }
      if (fullText) return fullText
    } else if (typeof response === 'string') {
      onChunk(response)
      return response
    } else if (response?.text) {
      onChunk(response.text)
      return response.text
    }
  } catch (err) {
    console.warn('Puter streaming failed, trying non-streaming fallback:', err)
  }

  // 2. Try Puter non-streaming
  try {
    const text = await puterChat(prompt, options)
    if (text) {
      onChunk(text)
      return text
    }
  } catch (err) {
    console.warn('Puter non-streaming fallback failed:', err)
  }

  // 3. Ultimate Fallback via server API
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt }),
    })
    const data = await res.json()
    const reply = data.reply || "I'm here to help with your health and fitness goals!"
    onChunk(reply)
    return reply
  } catch {
    const fallback = "I'm here to help with your health and fitness goals! Ask me anything."
    onChunk(fallback)
    return fallback
  }
}

// ─── Tool 3: Image Analysis (Vision) ────────────────────────────────────────

/**
 * Analyze an image URL or base64 data URL.
 * Returns the AI's textual analysis.
 */
export async function puterAnalyzeImage(
  imageUrl: string,
  prompt: string,
  options: ChatOptions = {}
): Promise<string> {
  const puter = await loadPuter()

  const messages: PuterChatMessage[] = [
    {
      role: 'user',
      content: [
        {
          type: 'image_url',
          image_url: {
            url: imageUrl.startsWith('data:')
              ? imageUrl
              : `data:image/jpeg;base64,${imageUrl}`,
          },
        },
        { type: 'text', text: prompt },
      ],
    },
  ]

  const opts: PuterChatOptions = {
    model: options.model ?? PUTER_MODELS.GPT_4O_MINI,
    max_tokens: options.maxTokens ?? 1000,
  }

  const result = await puter.ai.chat(messages, opts)
  return typeof result === 'string' ? result : ''
}

// ─── Tool 4: Image Generation ────────────────────────────────────────────────

/**
 * Generate an image from a text prompt.
 * Returns an HTMLImageElement you can append to the DOM or convert to a URL.
 */
export async function puterGenerateImage(
  prompt: string,
  model: string = PUTER_IMAGE_MODELS.GPT_IMAGE_2
): Promise<HTMLImageElement> {
  const puter = await loadPuter()
  return puter.ai.txt2img(prompt, { model })
}

/**
 * Generate an image and return its src URL.
 */
export async function puterGenerateImageUrl(
  prompt: string,
  model: string = PUTER_IMAGE_MODELS.GPT_IMAGE_2
): Promise<string> {
  const img = await puterGenerateImage(prompt, model)
  return img.src
}

// ─── Tool 5: Text-to-Speech ──────────────────────────────────────────────────

/**
 * Convert text to speech using OpenAI TTS via Puter.
 * Returns an HTMLAudioElement ready to play.
 */
export async function puterTextToSpeech(
  text: string,
  options: { model?: string; voice?: string } = {}
): Promise<HTMLAudioElement> {
  const puter = await loadPuter()
  return puter.ai.txt2speech(text, {
    provider: 'openai',
    model: options.model ?? PUTER_TTS_MODELS.GPT_4O_MINI_TTS,
    voice: options.voice,
  })
}

// ─── Tool 6: Function / Tool Calling ────────────────────────────────────────

export interface ToolDefinition {
  name: string
  description: string
  parameters: {
    type: 'object'
    properties: Record<string, { type: string; description?: string; enum?: string[] }>
    required?: string[]
  }
}

export interface ToolCallResult {
  toolName: string
  args: Record<string, unknown>
  rawResponse: unknown
}

/**
 * Use GPT tool/function calling.
 * Returns the tool name + parsed arguments when the AI decides to call a tool.
 */
export async function puterToolCall(
  prompt: string,
  tools: ToolDefinition[],
  options: ChatOptions = {}
): Promise<ToolCallResult | string> {
  const puter = await loadPuter()

  const puterTools: PuterTool[] = tools.map((t) => ({
    type: 'function',
    function: {
      name: t.name,
      description: t.description,
      parameters: t.parameters,
    },
  }))

  const opts: PuterChatOptions = {
    model: options.model ?? PUTER_MODELS.GPT_5_6_TERRA,
    tools: puterTools,
  }

  const response = await puter.ai.chat(prompt, opts) as unknown as {
    message?: { tool_calls?: Array<{ function: { name: string; arguments: string } }> }
  }

  if (response?.message?.tool_calls && response.message.tool_calls.length > 0) {
    const call = response.message.tool_calls[0]
    return {
      toolName: call.function.name,
      args: JSON.parse(call.function.arguments),
      rawResponse: response,
    }
  }

  return typeof response === 'string' ? response : ''
}

// ─── Tool 7: Web Search ──────────────────────────────────────────────────────

/**
 * Ask a question with live web search context.
 * Uses the built-in web_search tool to retrieve up-to-date info.
 */
export async function puterWebSearch(
  query: string,
  options: ChatOptions = {}
): Promise<string> {
  const puter = await loadPuter()

  const opts: PuterChatOptions = {
    model: options.model ?? PUTER_MODELS.GPT_5_3_CHAT,
    tools: [{ type: 'web_search' }],
  }

  const result = await puter.ai.chat(query, opts)
  return typeof result === 'string' ? result : ''
}

// ─── Tool 8: JSON-structured chat ────────────────────────────────────────────

/**
 * Chat and parse the response as JSON.
 * Falls back to null if parsing fails.
 */
export async function puterChatJSON<T>(
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
  options: ChatOptions = {}
): Promise<T | null> {
  const text = await puterChat(messages, {
    ...options,
    model: options.model ?? PUTER_MODELS.GPT_5_6_TERRA,
  })

  try {
    const match = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/)
    if (match) return JSON.parse(match[0]) as T
  } catch {
    // fall through
  }
  return null
}

// ─── Nutrition-specific helpers ───────────────────────────────────────────────

import { NUTRITION_SYSTEM_PROMPT, CHAT_SYSTEM_PROMPT } from './openai'

export interface NutritionPlanInput {
  gender: string
  age: number
  weight: number
  height: number
  activity_level: string
  goal: string
}

/**
 * Generate a personalized nutrition plan using Puter.js GPT.
 */
export async function generateNutritionPlan(input: NutritionPlanInput) {
  const messages = [
    { role: 'system' as const, content: NUTRITION_SYSTEM_PROMPT },
    {
      role: 'user' as const,
      content: `Generate a personalized nutrition plan for:
- Gender: ${input.gender}
- Age: ${input.age} years
- Weight: ${input.weight} kg
- Height: ${input.height} cm
- Activity Level: ${input.activity_level}
- Goal: ${input.goal}

Please provide the plan in JSON format as specified.`,
    },
  ]

  return puterChatJSON(messages, {
    model: PUTER_MODELS.GPT_5_6_TERRA,
    temperature: 0.7,
    maxTokens: 2500,
  })
}

/**
 * Analyze a food image and return structured nutrition data.
 */
export async function analyzeFoodImage(imageUrl: string) {
  const systemPrompt = `You are a food recognition AI. Analyze the food in the image and return a JSON response with:
{
  "foods": [
    {
      "name": "food name",
      "calories": estimated_calories,
      "portion": "estimated portion size",
      "confidence": 0.0_to_1.0,
      "protein": grams,
      "carbs": grams,
      "fat": grams
    }
  ],
  "totalCalories": total_calories
}

Be accurate with calorie estimates. Return ONLY the JSON, no other text.`

  const puter = await loadPuter()

  const messages: PuterChatMessage[] = [
    { role: 'system', content: systemPrompt },
    {
      role: 'user',
      content: [
        {
          type: 'image_url',
          image_url: {
            url: imageUrl.startsWith('data:')
              ? imageUrl
              : `data:image/jpeg;base64,${imageUrl}`,
          },
        },
        {
          type: 'text',
          text: 'Analyze this food image. Identify all food items and estimate their calories. Return the JSON response.',
        },
      ],
    },
  ]

  const opts: PuterChatOptions = {
    model: PUTER_MODELS.GPT_4O_MINI,
    max_tokens: 1000,
  }

  let text = ''
  try {
    const result = await puter.ai.chat(messages, opts)
    if (typeof result === 'string') {
      text = result
    } else if (result && typeof result === 'object') {
      // Puter may return { message: { content: string } } or { text: string }
      const resObj = result as { text?: string; message?: { content?: string } }
      text = resObj.text || resObj.message?.content || JSON.stringify(result)
    }
  } catch (chatErr) {
    console.warn('Puter vision chat error, trying alternative model:', chatErr)
    try {
      const fallbackResult = await puter.ai.chat(messages, { model: PUTER_MODELS.GPT_4O })
      text = typeof fallbackResult === 'string' ? fallbackResult : JSON.stringify(fallbackResult)
    } catch {
      return null
    }
  }

  try {
    // Strip markdown fences if present
    const cleanText = text.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim()
    const match = cleanText.match(/\{[\s\S]*\}/)
    if (match) {
      const parsed = JSON.parse(match[0])
      if (parsed && Array.isArray(parsed.foods) && parsed.foods.length > 0) {
        const totalCalories = parsed.totalCalories || parsed.foods.reduce((sum: number, f: { calories?: number }) => sum + (Number(f.calories) || 0), 0)
        return {
          ...parsed,
          totalCalories: Math.round(totalCalories),
        }
      }
    }
  } catch (err) {
    console.warn('Failed to parse Puter food analysis JSON:', err, text)
  }
  return null
}

/**
 * Send a nutrition/fitness chat message using Puter.js with streaming.
 */
export async function nutritionChatStream(
  message: string,
  history: Array<{ role: 'user' | 'assistant'; content: string }>,
  onChunk: (text: string) => void
): Promise<string> {
  const messages = [
    { role: 'system' as const, content: CHAT_SYSTEM_PROMPT },
    ...history.slice(-10),
    { role: 'user' as const, content: message },
  ]

  return puterChatStream(messages, onChunk, {
    model: PUTER_MODELS.GPT_5_4_NANO,
    temperature: 0.7,
    maxTokens: 1500,
  })
}
