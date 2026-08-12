'use client'

/**
 * usePuterAI — React hook for all Puter.js AI capabilities
 *
 * Provides easy access to:
 *  - chat (with streaming)
 *  - image analysis (vision)
 *  - image generation
 *  - text-to-speech
 *  - function/tool calling
 *  - web search
 *  - JSON-structured completions
 */

import { useState, useCallback, useRef } from 'react'
import {
  loadPuter,
  puterChat,
  puterChatStream,
  puterAnalyzeImage,
  puterGenerateImage,
  puterGenerateImageUrl,
  puterTextToSpeech,
  puterToolCall,
  puterWebSearch,
  puterChatJSON,
  nutritionChatStream,
  analyzeFoodImage,
  generateNutritionPlan,
  PUTER_MODELS,
  PUTER_IMAGE_MODELS,
  PUTER_TTS_MODELS,
  type ChatOptions,
  type ToolDefinition,
  type NutritionPlanInput,
} from '@/lib/puter-ai'

// Re-export constants for consumer convenience
export {
  PUTER_MODELS,
  PUTER_IMAGE_MODELS,
  PUTER_TTS_MODELS,
}

export interface PuterAIState {
  loading: boolean
  error: string | null
  streamingText: string
}

export function usePuterAI() {
  const [state, setState] = useState<PuterAIState>({
    loading: false,
    error: null,
    streamingText: '',
  })

  const abortRef = useRef(false)

  const setLoading = (loading: boolean) =>
    setState((s) => ({ ...s, loading, error: loading ? null : s.error }))
  const setError = (error: string | null) =>
    setState((s) => ({ ...s, error, loading: false }))
  const setStreamingText = (text: string) =>
    setState((s) => ({ ...s, streamingText: text }))

  // ── Core: Preload Puter.js ──────────────────────────────────────────────
  const preload = useCallback(async () => {
    try {
      await loadPuter()
    } catch (e) {
      console.warn('Puter.js preload failed:', e)
    }
  }, [])

  // ── Tool 1: Simple Chat ─────────────────────────────────────────────────
  const chat = useCallback(
    async (
      messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
      options?: ChatOptions
    ): Promise<string | null> => {
      setLoading(true)
      try {
        const result = await puterChat(messages, options)
        setLoading(false)
        return result
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Chat failed')
        return null
      }
    },
    []
  )

  // ── Tool 2: Streaming Chat ──────────────────────────────────────────────
  const chatStream = useCallback(
    async (
      messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
      onChunk?: (text: string) => void,
      options?: ChatOptions
    ): Promise<string | null> => {
      setLoading(true)
      setStreamingText('')
      abortRef.current = false

      let fullText = ''
      try {
        const result = await puterChatStream(
          messages,
          (chunk) => {
            if (abortRef.current) return
            fullText += chunk
            setStreamingText(fullText)
            onChunk?.(chunk)
          },
          options
        )
        setLoading(false)
        setStreamingText('')
        return result
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Stream failed')
        return null
      }
    },
    []
  )

  // ── Tool 3: Image Analysis (Vision) ────────────────────────────────────
  const analyzeImage = useCallback(
    async (
      imageUrl: string,
      prompt: string,
      options?: ChatOptions
    ): Promise<string | null> => {
      setLoading(true)
      try {
        const result = await puterAnalyzeImage(imageUrl, prompt, options)
        setLoading(false)
        return result
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Image analysis failed')
        return null
      }
    },
    []
  )

  // ── Tool 4: Image Generation ────────────────────────────────────────────
  const generateImage = useCallback(
    async (
      prompt: string,
      model?: string
    ): Promise<HTMLImageElement | null> => {
      setLoading(true)
      try {
        const img = await puterGenerateImage(prompt, model)
        setLoading(false)
        return img
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Image generation failed')
        return null
      }
    },
    []
  )

  const generateImageUrl = useCallback(
    async (prompt: string, model?: string): Promise<string | null> => {
      setLoading(true)
      try {
        const url = await puterGenerateImageUrl(prompt, model)
        setLoading(false)
        return url
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Image generation failed')
        return null
      }
    },
    []
  )

  // ── Tool 5: Text-to-Speech ──────────────────────────────────────────────
  const textToSpeech = useCallback(
    async (
      text: string,
      options?: { model?: string; voice?: string }
    ): Promise<HTMLAudioElement | null> => {
      setLoading(true)
      try {
        const audio = await puterTextToSpeech(text, options)
        setLoading(false)
        return audio
      } catch (e) {
        setError(e instanceof Error ? e.message : 'TTS failed')
        return null
      }
    },
    []
  )

  // ── Tool 6: Function/Tool Calling ───────────────────────────────────────
  const toolCall = useCallback(
    async (
      prompt: string,
      tools: ToolDefinition[],
      options?: ChatOptions
    ) => {
      setLoading(true)
      try {
        const result = await puterToolCall(prompt, tools, options)
        setLoading(false)
        return result
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Tool call failed')
        return null
      }
    },
    []
  )

  // ── Tool 7: Web Search ──────────────────────────────────────────────────
  const webSearch = useCallback(
    async (query: string, options?: ChatOptions): Promise<string | null> => {
      setLoading(true)
      try {
        const result = await puterWebSearch(query, options)
        setLoading(false)
        return result
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Web search failed')
        return null
      }
    },
    []
  )

  // ── Tool 8: JSON Chat ───────────────────────────────────────────────────
  const chatJSON = useCallback(
    async <T>(
      messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
      options?: ChatOptions
    ): Promise<T | null> => {
      setLoading(true)
      try {
        const result = await puterChatJSON<T>(messages, options)
        setLoading(false)
        return result
      } catch (e) {
        setError(e instanceof Error ? e.message : 'JSON chat failed')
        return null
      }
    },
    []
  )

  // ── Nutrition-specific helpers ──────────────────────────────────────────

  /**
   * Send a nutrition coach message with real-time streaming.
   */
  const nutritionChat = useCallback(
    async (
      message: string,
      history: Array<{ role: 'user' | 'assistant'; content: string }>,
      onChunk?: (text: string) => void
    ): Promise<string | null> => {
      setLoading(true)
      setStreamingText('')
      abortRef.current = false

      let fullText = ''
      try {
        const result = await nutritionChatStream(message, history, (chunk) => {
          if (abortRef.current) return
          fullText += chunk
          setStreamingText(fullText)
          onChunk?.(chunk)
        })
        setLoading(false)
        setStreamingText('')
        return result
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Nutrition chat failed')
        return null
      }
    },
    []
  )

  /**
   * Analyze a food image for nutrition info.
   */
  const analyzeFood = useCallback(
    async (imageUrl: string) => {
      setLoading(true)
      try {
        const result = await analyzeFoodImage(imageUrl)
        setLoading(false)
        return result
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Food analysis failed')
        return null
      }
    },
    []
  )

  /**
   * Generate a personalized nutrition plan.
   */
  const createNutritionPlan = useCallback(
    async (input: NutritionPlanInput) => {
      setLoading(true)
      try {
        const result = await generateNutritionPlan(input)
        setLoading(false)
        return result
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Plan generation failed')
        return null
      }
    },
    []
  )

  // ── Abort current stream ────────────────────────────────────────────────
  const abort = useCallback(() => {
    abortRef.current = true
    setState((s) => ({ ...s, loading: false, streamingText: '' }))
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return {
    // State
    loading: state.loading,
    error: state.error,
    streamingText: state.streamingText,

    // Core tools
    preload,
    chat,
    chatStream,
    chatJSON,

    // Vision
    analyzeImage,

    // Image generation
    generateImage,
    generateImageUrl,

    // Audio
    textToSpeech,

    // Advanced
    toolCall,
    webSearch,

    // Nutrition-specific
    nutritionChat,
    analyzeFood,
    createNutritionPlan,

    // Control
    abort,
    clearError,
  }
}
