'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui'
import {
  Camera, Upload, Flame, Scan, Sparkles, RotateCcw,
  CheckCircle2, Target, Eye, ArrowRight, Plus, Zap, Clock,
  Key, AlertCircle, RefreshCw, ChevronRight, ShieldCheck,
  Dumbbell, Heart, PieChart, Info, Terminal, Wifi, Shield, Cpu
} from 'lucide-react'
import { analyzeFoodImage } from '@/lib/puter-ai'
import { useNutritionStore } from '@/stores/nutritionStore'

export interface DetectedFood {
  name: string
  calories: number
  portion: string
  confidence: number
  protein?: number
  carbs?: number
  fat?: number
  fiber?: number
  portionMultiplier?: number
}

export interface ScanResult {
  foods: DetectedFood[]
  totalCalories: number
  totalProtein?: number
  totalCarbs?: number
  totalFat?: number
  provider?: string
  warning?: string
}

interface ScanHistoryItem {
  id: string
  emoji: string
  name: string
  cal: number
  time: string
  protein: string
  foods: DetectedFood[]
}

const SAMPLE_FOODS = [
  {
    name: 'Salmon Quinoa Bowl',
    emoji: '🥗',
    desc: 'Grilled salmon, quinoa, edamame & avocado',
    url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Artisan Margherita Pizza',
    emoji: '🍕',
    desc: 'Thin crust, fresh mozzarella, basil & tomato',
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Chicken Rice & Greens',
    emoji: '🍗',
    desc: 'Grilled chicken breast, jasmine rice & broccoli',
    url: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Avocado Poached Egg Toast',
    emoji: '🥑',
    desc: 'Sourdough, smashed avocado, eggs & chili flakes',
    url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80',
  },
]

/* ── HUD clip-path constants ── */
const HUD_CLIP = 'polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px)'
const HUD_CLIP_SM = 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)'
const HUD_CLIP_XS = 'polygon(4px 0%, calc(100% - 4px) 0%, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0% calc(100% - 4px), 0% 4px)'
const HUD_HEX = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
const HUD_DIAMOND = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'

const FONT_HUD: React.CSSProperties = { fontFamily: "'Space Grotesk', sans-serif" }

/**
 * Resizes and compresses an image (from file or data URL) to max 1200x1200px
 */
async function compressImageToDataUrl(source: File | string, maxDimension = 1200, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      let width = img.width
      let height = img.height

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width)
          width = maxDimension
        } else {
          width = Math.round((width * maxDimension) / height)
          height = maxDimension
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        resolve(img.src)
        return
      }

      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }

    img.onerror = (err) => reject(err)

    if (typeof source === 'string') {
      img.src = source
    } else {
      const reader = new FileReader()
      reader.onload = (e) => {
        img.src = e.target?.result as string
      }
      reader.onerror = (e) => reject(e)
      reader.readAsDataURL(source)
    }
  })
}

export default function ScanPage() {
  const [image, setImage] = useState<string | null>(null)
  const [results, setResults] = useState<ScanResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const [customApiKey, setCustomApiKey] = useState('')
  const [showKeyModal, setShowKeyModal] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const [addedToLog, setAddedToLog] = useState(false)
  const [portionMultipliers, setPortionMultipliers] = useState<Record<number, number>>({})
  const [history, setHistory] = useState<ScanHistoryItem[]>([])
  const [scanError, setScanError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { dailyCalories, addNewMeal } = useNutritionStore()

  // Load saved API key & scan history
  useEffect(() => {
    try {
      const savedKey = localStorage.getItem('nutrisaas_openai_key')
      if (savedKey) setCustomApiKey(savedKey)

      const savedHistory = localStorage.getItem('nutrisaas_scan_history')
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory))
      } else {
        setHistory([
          { id: '1', emoji: '🥗', name: 'Greek Salad Bowl', cal: 340, time: 'Today, 12:45 PM', protein: '14g', foods: [] },
          { id: '2', emoji: '🍗', name: 'Grilled Chicken & Rice', cal: 480, time: 'Yesterday', protein: '46g', foods: [] },
          { id: '3', emoji: '🥑', name: 'Avocado Toast & Egg', cal: 290, time: '2 days ago', protein: '11g', foods: [] },
        ])
      }
    } catch {
      // ignore
    }
  }, [])

  const handleSaveApiKey = (key: string) => {
    setCustomApiKey(key)
    if (key.trim()) {
      localStorage.setItem('nutrisaas_openai_key', key.trim())
    } else {
      localStorage.removeItem('nutrisaas_openai_key')
    }
    setShowKeyModal(false)
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setScanError(null)

    try {
      const compressed = await compressImageToDataUrl(file)
      setImage(compressed)
      setResults(null)
      setAddedToLog(false)
      setPortionMultipliers({})
    } catch (err) {
      console.error('Image compression failed:', err)
      const reader = new FileReader()
      reader.onload = (ev) => {
        setImage(ev.target?.result as string)
        setResults(null)
        setAddedToLog(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    setScanError(null)

    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      try {
        const compressed = await compressImageToDataUrl(file)
        setImage(compressed)
        setResults(null)
        setAddedToLog(false)
        setPortionMultipliers({})
      } catch (err) {
        console.error('Drop error:', err)
      }
    }
  }

  const startCamera = async () => {
    try {
      setScanError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setCameraActive(true)
      }
    } catch (err) {
      console.error('Camera access denied:', err)
      setScanError('Unable to access camera. Please check camera permissions or upload an image.')
    }
  }

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setCameraActive(false)
  }, [])

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth || 640
      canvas.height = video.videoHeight || 480
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
        setImage(dataUrl)
        stopCamera()
        setResults(null)
        setAddedToLog(false)
        setPortionMultipliers({})
      }
    }
  }

  const handleLoadSample = async (sampleUrl: string) => {
    setLoading(true)
    setScanError(null)
    setResults(null)
    setAddedToLog(false)
    setPortionMultipliers({})

    try {
      const compressed = await compressImageToDataUrl(sampleUrl)
      setImage(compressed)
      await runAIAnalysis(compressed)
    } catch {
      setImage(sampleUrl)
      await runAIAnalysis(sampleUrl)
    }
  }

  const runAIAnalysis = async (imageDataUrl: string) => {
    setLoading(true)
    setScanError(null)
    setLoadingStep(1)

    const step2Timer = setTimeout(() => setLoadingStep(2), 700)
    const step3Timer = setTimeout(() => setLoadingStep(3), 1600)

    try {
      let finalResult: ScanResult | null = null

      if (customApiKey && customApiKey.startsWith('sk-')) {
        try {
          const res = await fetch('/api/scan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: imageDataUrl, apiKey: customApiKey }),
          })
          if (res.ok) {
            const data = await res.json()
            if (data?.foods && data.foods.length > 0) {
              finalResult = { ...data, provider: 'OpenAI (Custom Key)' }
            }
          }
        } catch (apiErr) {
          console.warn('Custom API scan failed, falling back:', apiErr)
        }
      }

      if (!finalResult) {
        try {
          const puterResult = await analyzeFoodImage(imageDataUrl)
          if (puterResult && puterResult.foods && puterResult.foods.length > 0) {
            finalResult = {
              foods: puterResult.foods,
              totalCalories: puterResult.totalCalories,
              provider: 'Puter.js GPT-4o-mini',
            }
          }
        } catch (puterErr) {
          console.warn('Puter.js vision failed, falling back to server route:', puterErr)
        }
      }

      if (!finalResult) {
        const res = await fetch('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: imageDataUrl }),
        })
        if (res.ok) {
          const data = await res.json()
          if (data?.foods && data.foods.length > 0) {
            finalResult = data
          }
        }
      }

      clearTimeout(step2Timer)
      clearTimeout(step3Timer)

      if (finalResult && finalResult.foods && finalResult.foods.length > 0) {
        const initMult: Record<number, number> = {}
        finalResult.foods.forEach((_, idx) => {
          initMult[idx] = 1.0
        })
        setPortionMultipliers(initMult)
        setResults(finalResult)

        const primaryFood = finalResult.foods[0]
        const newHistoryItem: ScanHistoryItem = {
          id: Date.now().toString(),
          emoji: '🍽️',
          name: primaryFood?.name || 'Scanned Meal',
          cal: finalResult.totalCalories,
          time: 'Just now',
          protein: `${finalResult.foods.reduce((sum, f) => sum + (f.protein || 0), 0)}g`,
          foods: finalResult.foods,
        }
        setHistory((prev) => {
          const updated = [newHistoryItem, ...prev.slice(0, 4)]
          localStorage.setItem('nutrisaas_scan_history', JSON.stringify(updated))
          return updated
        })
      } else {
        setScanError('Unable to recognize food items in this photo. Please try a clearer angle or another photo.')
      }
    } catch (err: any) {
      console.error('Scan error:', err)
      setScanError(err?.message || 'Error processing food photo. Please try again.')
    } finally {
      setLoading(false)
      setLoadingStep(0)
    }
  }

  const analyzeFood = () => {
    if (!image) return
    runAIAnalysis(image)
  }

  const handlePortionChange = (index: number, mult: number) => {
    setPortionMultipliers((prev) => ({
      ...prev,
      [index]: mult,
    }))
  }

  const calculatedTotals = () => {
    if (!results?.foods) return { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }

    return results.foods.reduce(
      (acc, food, idx) => {
        const mult = portionMultipliers[idx] ?? 1.0
        return {
          calories: acc.calories + Math.round((food.calories || 0) * mult),
          protein: acc.protein + Math.round((food.protein || 0) * mult),
          carbs: acc.carbs + Math.round((food.carbs || 0) * mult),
          fat: acc.fat + Math.round((food.fat || 0) * mult),
          fiber: acc.fiber + Math.round((food.fiber || 0) * mult),
        }
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
    )
  }

  const totals = calculatedTotals()

  const handleAddToLog = () => {
    if (!results?.foods) return

    const mealFoods = results.foods.map((food, idx) => {
      const mult = portionMultipliers[idx] ?? 1.0
      return {
        name: food.name,
        portion: `${food.portion} (${mult === 0.8 ? 'Small' : mult === 1.3 ? 'Large' : 'Regular'})`,
        calories: Math.round(food.calories * mult),
        protein: Math.round((food.protein || 0) * mult),
        carbs: Math.round((food.carbs || 0) * mult),
        fat: Math.round((food.fat || 0) * mult),
      }
    })

    const now = new Date()
    const hours = now.getHours()
    let mealType = 'snack'
    if (hours >= 5 && hours < 11) mealType = 'breakfast'
    else if (hours >= 11 && hours < 16) mealType = 'lunch'
    else if (hours >= 16 && hours < 22) mealType = 'dinner'

    addNewMeal({
      type: mealType,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      totalCalories: totals.calories,
      eaten: true,
      foods: mealFoods,
    })

    setAddedToLog(true)
  }

  const reset = () => {
    stopCamera()
    setImage(null)
    setResults(null)
    setAddedToLog(false)
    setPortionMultipliers({})
    setScanError(null)
  }

  const calorieTargetPct = dailyCalories > 0
    ? Math.min(100, Math.round((totals.calories / dailyCalories) * 100))
    : 0

  return (
    <div className="w-full space-y-5 pb-20 md:pb-10 animate-fade-in">

      {/* ── Page Header — HUD Terminal ── */}
      <div
        className="relative overflow-hidden p-5 sm:p-7"
        style={{
          background: 'linear-gradient(135deg, rgba(4, 8, 18, 0.95) 0%, rgba(8, 12, 24, 0.92) 100%)',
          border: '1px solid rgba(244, 63, 94, 0.15)',
          clipPath: HUD_CLIP,
          boxShadow: '0 0 2px rgba(244, 63, 94, 0.3), 0 20px 50px -10px rgba(0, 0, 0, 0.7)',
        }}
      >
        {/* Corner brackets */}
        <div className="hud-corner hud-corner-tl" style={{ '--bracket-color': 'rgba(244, 63, 94, 0.6)' } as React.CSSProperties} />
        <div className="hud-corner hud-corner-tr" style={{ '--bracket-color': 'rgba(244, 63, 94, 0.6)' } as React.CSSProperties} />

        {/* Scanning beam */}
        <div className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(244, 63, 94, 0.4) 50%, transparent 100%)' }} />

        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20 hud-grid-bg" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Hexagonal icon */}
            <div className="w-12 h-12 flex items-center justify-center relative flex-shrink-0" style={{ clipPath: HUD_HEX }}>
              <div className="absolute inset-0" style={{ clipPath: 'inherit', background: 'linear-gradient(135deg, rgba(244,63,94,0.3), rgba(251,146,60,0.2))' }} />
              <div className="absolute inset-[2px]" style={{ clipPath: HUD_HEX, background: 'rgba(4, 8, 18, 0.85)' }} />
              <Scan className="w-6 h-6 text-coral-400 relative z-10" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[8px] font-extrabold px-2 py-0.5 uppercase tracking-[0.2em] text-coral-300" style={{ ...FONT_HUD, background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)', clipPath: HUD_CLIP_XS }}>
                  Neural Vision
                </span>
                <span className="text-[9px] uppercase tracking-[0.15em]" style={{ ...FONT_HUD, color: 'rgba(100,116,139,0.5)' }}>GPT-4o-mini Engine</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide uppercase" style={{ ...FONT_HUD, letterSpacing: '0.06em' }}>
                AI Food <span className="text-coral-400">&</span> Calorie Scanner
              </h1>
              <p className="text-dark-500 text-[10px] sm:text-xs mt-0.5 uppercase tracking-wider" style={FONT_HUD}>
                Upload or snap meals → Neural vision identifies ingredients & computes macros
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setShowKeyModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
              style={{ ...FONT_HUD, background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)', clipPath: HUD_CLIP_XS, color: 'rgba(251,191,36,0.7)' }}
              title="Configure AI API Key"
            >
              <Key className="w-3.5 h-3.5" />
              <span>{customApiKey ? 'Custom Key' : 'Puter Free'}</span>
            </button>
            <span className="text-[8px] font-extrabold px-2.5 py-1 uppercase tracking-[0.2em]" style={{ ...FONT_HUD, background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)', clipPath: HUD_CLIP_XS, color: 'rgba(244,63,94,0.7)' }}>
              v3.8
            </span>
          </div>
        </div>
      </div>

      {/* ── API Key Modal ── */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md p-6 space-y-4" style={{ background: 'linear-gradient(135deg, rgba(4,8,18,0.98) 0%, rgba(8,12,24,0.96) 100%)', border: '1px solid rgba(251,191,36,0.15)', clipPath: HUD_CLIP }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center" style={{ clipPath: HUD_HEX, background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.25)' }}>
                  <Key className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider" style={FONT_HUD}>Vision Engine Config</h3>
              </div>
              <button onClick={() => setShowKeyModal(false)} className="text-dark-500 hover:text-white text-sm cursor-pointer">✕</button>
            </div>

            <p className="text-[10px] leading-relaxed uppercase tracking-wider" style={{ ...FONT_HUD, color: 'rgba(100,116,139,0.6)' }}>
              Default: <strong className="text-white">Puter.js GPT-4o-mini</strong> — 100% free, no key needed. Optional: enter your OpenAI API key below.
            </p>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider" style={{ ...FONT_HUD, color: 'rgba(100,116,139,0.5)' }}>OpenAI API Key (optional)</label>
              <input
                type="password"
                placeholder="sk-..."
                defaultValue={customApiKey}
                id="custom-key-input"
                className="w-full px-3.5 py-2.5 text-xs text-white focus:outline-none bg-transparent"
                style={{ border: '1px solid rgba(251,191,36,0.15)', clipPath: HUD_CLIP_SM, background: 'rgba(4,8,18,0.6)' }}
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  const input = document.getElementById('custom-key-input') as HTMLInputElement
                  handleSaveApiKey(input?.value || '')
                }}
                className="hud-cta-btn flex-1 py-2.5 text-[10px] font-bold uppercase tracking-wider cursor-pointer text-center"
                style={{ ...FONT_HUD, borderColor: 'rgba(251,191,36,0.35)', color: 'rgba(251,191,36,1)' }}
              >
                Save Config
              </button>
              {customApiKey && (
                <button
                  onClick={() => handleSaveApiKey('')}
                  className="px-3 py-2.5 text-[10px] font-bold text-dark-500 hover:text-white transition-colors cursor-pointer uppercase tracking-wider"
                  style={{ ...FONT_HUD, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', clipPath: HUD_CLIP_XS }}
                >
                  Purge
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Quick Sample Meals ── */}
      <div className="p-4" style={{ background: 'rgba(4,8,18,0.6)', border: '1px solid rgba(52,211,153,0.08)', clipPath: HUD_CLIP_SM }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] flex items-center gap-1.5" style={{ ...FONT_HUD, color: 'rgba(52,211,153,0.5)' }}>
            <Sparkles className="w-3.5 h-3.5 text-coral-400" />
            Quick Test: 1-click sample scan
          </p>
          <span className="text-[8px] uppercase tracking-[0.2em] hidden sm:inline" style={{ ...FONT_HUD, color: 'rgba(100,116,139,0.4)' }}>Demo Mode</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {SAMPLE_FOODS.map((sample) => (
            <button
              key={sample.name}
              onClick={() => handleLoadSample(sample.url)}
              disabled={loading}
              className="flex items-center gap-2.5 p-2.5 text-left transition-all hover:scale-[1.02] disabled:opacity-50 group cursor-pointer"
              style={{ background: 'rgba(8,15,30,0.5)', border: '1px solid rgba(52,211,153,0.06)', clipPath: HUD_CLIP_XS }}
            >
              <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">{sample.emoji}</span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-white truncate group-hover:text-primary-300 transition-colors uppercase tracking-wider" style={FONT_HUD}>
                  {sample.name}
                </p>
                <p className="text-[9px] text-dark-600 truncate" style={FONT_HUD}>{sample.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Error Banner ── */}
      {scanError && (
        <div className="p-4 flex items-start gap-3 animate-fade-in" style={{ background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.2)', clipPath: HUD_CLIP_SM }}>
          <AlertCircle className="w-5 h-5 text-coral-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <p className="font-bold text-coral-300 uppercase tracking-wider text-[10px]" style={FONT_HUD}>Scan Error</p>
            <p className="text-dark-400 mt-0.5" style={FONT_HUD}>{scanError}</p>
          </div>
          <button onClick={() => setScanError(null)} className="text-dark-500 hover:text-white text-xs cursor-pointer">✕</button>
        </div>
      )}

      {/* ── Main 2-Column Grid ── */}
      <div className="grid lg:grid-cols-12 gap-5">

        {/* ── Left Column: Scanner Viewport (5 cols) ── */}
        <div className="lg:col-span-5 space-y-4">

          {/* Viewport Card */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`overflow-hidden relative aspect-square max-h-[360px] sm:max-h-[420px] mx-auto w-full transition-all duration-300 ${dragActive ? 'scale-[1.01]' : ''}`}
            style={{
              background: '#030712',
              border: `1px solid ${dragActive ? 'rgba(244,63,94,0.6)' : cameraActive || image ? 'rgba(244,63,94,0.25)' : 'rgba(52,211,153,0.08)'}`,
              clipPath: HUD_CLIP,
              boxShadow: cameraActive || image
                ? '0 0 2px rgba(244,63,94,0.4), 0 20px 40px rgba(0,0,0,0.6)'
                : '0 0 1px rgba(52,211,153,0.2), 0 20px 40px rgba(0,0,0,0.5)',
            }}
          >
            {/* Corner brackets */}
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.75) 100%)' }} />

            <canvas ref={canvasRef} className="hidden" />

            {/* 1. Camera Active */}
            {cameraActive ? (
              <>
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline />
                {/* HUD Reticle */}
                <div className="absolute inset-6 z-20 pointer-events-none">
                  {[
                    'top-0 left-0 border-t-2 border-l-2',
                    'top-0 right-0 border-t-2 border-r-2',
                    'bottom-0 left-0 border-b-2 border-l-2',
                    'bottom-0 right-0 border-b-2 border-r-2',
                  ].map((cls, i) => (
                    <div key={i} className={`absolute w-8 h-8 border-coral-400 ${cls}`} style={{ filter: 'drop-shadow(0 0 8px rgba(244,63,94,0.9))' }} />
                  ))}
                  <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-coral-400 to-transparent animate-scan-line" style={{ boxShadow: '0 0 16px rgba(244,63,94,0.9)' }} />
                </div>

                <div className="absolute top-4 left-4 z-20">
                  <div className="flex items-center gap-2 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em]" style={{ ...FONT_HUD, background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(244,63,94,0.4)', clipPath: HUD_CLIP_XS, color: 'rgba(244,63,94,0.9)' }}>
                    <span className="w-2 h-2 bg-coral-400 animate-ping" style={{ clipPath: HUD_DIAMOND }} />
                    Live Feed
                  </div>
                </div>

                <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-4 z-20">
                  <button onClick={stopCamera} className="px-4 py-2 text-xs font-bold text-dark-400 hover:text-white transition-colors cursor-pointer uppercase tracking-wider" style={{ ...FONT_HUD, background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', clipPath: HUD_CLIP_XS }}>
                    Abort
                  </button>
                  <button
                    onClick={capturePhoto}
                    className="w-16 h-16 bg-white hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                    style={{ clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)', border: '4px solid rgba(244,63,94,0.85)', boxShadow: '0 0 30px rgba(244,63,94,0.6)' }}
                    aria-label="Capture photo"
                  />
                </div>
              </>
            ) : image ? (
              /* 2. Image Loaded */
              <div className="relative w-full h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="Target meal" className="w-full h-full object-cover" />

                {loading && (
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-scan-line" style={{ boxShadow: '0 0 18px rgba(52,211,153,0.9)' }} />
                  </div>
                )}

                {/* Target bounding box */}
                <div className="absolute inset-0 z-15 pointer-events-none p-8">
                  <div
                    className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-dashed flex items-start p-2 transition-all"
                    style={{
                      borderColor: loading ? 'rgba(52,211,153,0.7)' : 'rgba(244,63,94,0.7)',
                      boxShadow: loading ? '0 0 25px rgba(52,211,153,0.25)' : '0 0 20px rgba(244,63,94,0.2)',
                    }}
                  >
                    <span className="text-[8px] font-extrabold px-2 py-0.5 flex items-center gap-1 uppercase tracking-[0.15em]" style={{ ...FONT_HUD, background: loading ? 'rgba(16,185,129,0.85)' : 'rgba(244,63,94,0.85)', color: 'white', clipPath: HUD_CLIP_XS }}>
                      <Target className="w-2.5 h-2.5" /> {loading ? 'Analyzing' : 'Acquired'}
                    </span>
                  </div>
                </div>

                <div className="absolute top-4 left-4 z-20">
                  <div className="flex items-center gap-2 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em]" style={{ ...FONT_HUD, background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(52,211,153,0.3)', clipPath: HUD_CLIP_XS, color: 'rgba(52,211,153,0.8)' }}>
                    <CheckCircle2 className="w-3.5 h-3.5" /> Image Loaded
                  </div>
                </div>
              </div>
            ) : (
              /* 3. Empty Dropzone */
              <div
                onClick={() => fileInputRef.current?.click()}
                className="h-full flex flex-col items-center justify-center text-center p-8 relative z-10 cursor-pointer group"
              >
                <div className="w-20 h-20 flex items-center justify-center mb-4 transition-transform group-hover:scale-105" style={{ clipPath: HUD_HEX, background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)' }}>
                  <Upload className="w-10 h-10 text-coral-400 group-hover:text-coral-300 transition-colors" />
                </div>
                <p className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider" style={FONT_HUD}>Drop Food Photo</p>
                <p className="text-[10px] max-w-[240px] leading-relaxed mb-4 uppercase tracking-wider" style={{ ...FONT_HUD, color: 'rgba(100,116,139,0.5)' }}>
                  Drag & drop or click to browse. JPG, PNG, WEBP, HEIC.
                </p>
                <span className="text-[10px] font-bold px-3 py-1 uppercase tracking-[0.15em] cursor-pointer" style={{ ...FONT_HUD, background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)', clipPath: HUD_CLIP_XS, color: 'rgba(244,63,94,0.8)' }}>
                  Browse Files
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={startCamera}
                disabled={cameraActive || loading}
                className="flex items-center justify-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 cursor-pointer uppercase tracking-wider"
                style={{ ...FONT_HUD, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', clipPath: HUD_CLIP_SM, color: 'rgba(52,211,153,0.8)' }}
              >
                <Camera className="w-4 h-4" /> Camera
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={cameraActive || loading}
                className="flex items-center justify-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 cursor-pointer uppercase tracking-wider"
                style={{ ...FONT_HUD, background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.2)', clipPath: HUD_CLIP_SM, color: 'rgba(251,146,60,0.8)' }}
              >
                <Upload className="w-4 h-4" /> Upload
              </button>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />

            {/* Analyze CTA */}
            <button
              onClick={analyzeFood}
              disabled={!image || loading || cameraActive}
              className="hud-cta-btn w-full flex items-center justify-center gap-2.5 py-4 font-bold text-xs sm:text-sm transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer uppercase tracking-wider"
              style={{
                ...FONT_HUD,
                borderColor: loading ? 'rgba(168,85,247,0.3)' : 'rgba(244,63,94,0.4)',
                color: loading ? 'rgba(168,85,247,0.9)' : 'rgba(244,63,94,1)',
                background: loading ? 'rgba(168,85,247,0.1)' : 'rgba(244,63,94,0.12)',
                boxShadow: image && !loading ? '0 0 25px rgba(244,63,94,0.15)' : 'none',
              }}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>
                    {loadingStep === 1 ? 'Preprocessing…' : loadingStep === 2 ? 'GPT-4o Vision Scan…' : 'Computing Macros…'}
                  </span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Scan & Compute</span>
                </>
              )}
            </button>

            {image && !loading && (
              <button onClick={reset} className="w-full py-2.5 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer" style={{ ...FONT_HUD, color: 'rgba(100,116,139,0.5)' }}>
                <RotateCcw className="w-3.5 h-3.5" /> Reset Scanner
              </button>
            )}
          </div>
        </div>

        {/* ── Right Column: Results Panel (7 cols) ── */}
        <div className="lg:col-span-7">
          <div
            className="min-h-[460px] flex flex-col overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(4,8,18,0.95) 0%, rgba(8,14,28,0.93) 100%)',
              border: '1px solid rgba(52,211,153,0.08)',
              clipPath: HUD_CLIP,
              boxShadow: '0 0 1px rgba(52,211,153,0.2), 0 20px 40px rgba(0,0,0,0.55)',
            }}
          >
            {/* Corner brackets */}
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />

            {/* State 1: Loading */}
            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-6">
                <div className="relative w-28 h-28">
                  <div className="absolute inset-0 border-2 border-coral-400/20" style={{ clipPath: HUD_HEX }} />
                  <div className="absolute inset-0 border-2 border-transparent border-t-coral-400 animate-spin" style={{ clipPath: 'circle(50%)' }} />
                  <div className="absolute inset-3 flex items-center justify-center" style={{ clipPath: HUD_HEX, background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)' }}>
                    <Eye className="w-10 h-10 text-coral-400 animate-breathe" />
                  </div>
                </div>

                <div className="space-y-1.5 max-w-sm">
                  <h3 className="text-base font-bold text-white tracking-wide uppercase" style={FONT_HUD}>
                    {loadingStep === 1 ? 'Extracting Features…' : loadingStep === 2 ? 'Neural AI Scan…' : 'Computing Macros…'}
                  </h3>
                  <p className="text-[10px] leading-relaxed uppercase tracking-wider" style={{ ...FONT_HUD, color: 'rgba(100,116,139,0.5)' }}>
                    Analyzing plate portions against nutrition databases for exact macronutrient computation.
                  </p>
                </div>

                <div className="w-full max-w-md space-y-3 px-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="skeleton-shimmer h-14" style={{ animationDelay: `${i * 0.18}s`, clipPath: HUD_CLIP_SM }} />
                  ))}
                </div>
              </div>
            ) : results ? (
              /* State 2: Results */
              <div className="flex-1 flex flex-col">

                {/* Calories Banner */}
                <div className="p-5 sm:p-6" style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.06) 0%, rgba(251,146,60,0.03) 100%)', borderBottom: '1px solid rgba(52,211,153,0.08)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-extrabold uppercase tracking-[0.2em]" style={{ ...FONT_HUD, color: 'rgba(244,63,94,0.7)' }}>Total Energy</span>
                      {results.provider && (
                        <span className="text-[8px] px-2 py-0.5 uppercase tracking-[0.15em]" style={{ ...FONT_HUD, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', clipPath: HUD_CLIP_XS, color: 'rgba(100,116,139,0.5)' }}>
                          {results.provider}
                        </span>
                      )}
                    </div>
                    <span className="text-[8px] font-extrabold px-2.5 py-0.5 uppercase tracking-[0.2em]" style={{ ...FONT_HUD, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.15)', clipPath: HUD_CLIP_XS, color: 'rgba(52,211,153,0.7)' }}>
                      AI Verified
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between flex-wrap gap-4">
                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl sm:text-6xl font-black tracking-tight" style={{ ...FONT_HUD, background: 'linear-gradient(135deg, #fb923c, #f43f5e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {totals.calories}
                      </span>
                      <div>
                        <p className="text-sm text-dark-300 font-bold uppercase tracking-wider" style={FONT_HUD}>kcal</p>
                        <p className="text-[9px] uppercase tracking-wider" style={{ ...FONT_HUD, color: 'rgba(100,116,139,0.4)' }}>estimated</p>
                      </div>
                    </div>

                    {dailyCalories > 0 && (
                      <div className="text-right">
                        <div className="flex items-center gap-1.5 justify-end text-[10px] font-bold uppercase tracking-wider" style={{ ...FONT_HUD, color: 'rgba(52,211,153,0.8)' }}>
                          <Flame className="w-4 h-4 text-coral-400" />
                          <span>{calorieTargetPct}% of daily budget</span>
                        </div>
                        <p className="text-[9px] mt-0.5 uppercase tracking-wider" style={{ ...FONT_HUD, color: 'rgba(100,116,139,0.4)' }}>Target: {dailyCalories} kcal</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Macro Pills */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 p-5" style={{ borderBottom: '1px solid rgba(52,211,153,0.06)', background: 'rgba(0,0,0,0.15)' }}>
                  {[
                    { label: 'Protein', value: `${totals.protein}g`, sub: `${totals.protein * 4} kcal`, color: 'rgba(52,211,153,0.8)' },
                    { label: 'Carbs', value: `${totals.carbs}g`, sub: `${totals.carbs * 4} kcal`, color: 'rgba(56,189,248,0.8)' },
                    { label: 'Fat', value: `${totals.fat}g`, sub: `${totals.fat * 9} kcal`, color: 'rgba(251,191,36,0.8)' },
                    { label: 'Fiber', value: `${totals.fiber || 5}g`, sub: 'Digestive', color: 'rgba(168,85,247,0.8)', hideMobile: true },
                  ].map((m) => (
                    <div key={m.label} className={`p-3 text-center ${m.hideMobile ? 'hidden sm:block' : ''}`} style={{ background: 'rgba(8,15,30,0.5)', border: `1px solid ${m.color.replace('0.8', '0.12')}`, clipPath: HUD_CLIP_XS }}>
                      <p className="text-[8px] font-extrabold uppercase tracking-[0.2em]" style={{ ...FONT_HUD, color: m.color }}>{m.label}</p>
                      <p className="text-xl font-extrabold text-white mt-0.5" style={FONT_HUD}>{m.value}</p>
                      <p className="text-[8px] mt-0.5 uppercase tracking-wider" style={{ ...FONT_HUD, color: 'rgba(100,116,139,0.4)' }}>{m.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Detected Ingredients */}
                <div className="p-5 flex-1 space-y-3 overflow-y-auto max-h-[320px]">
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ ...FONT_HUD, color: 'rgba(100,116,139,0.6)' }}>
                      Detected Items ({results.foods.length})
                    </p>
                    <span className="text-[8px] uppercase tracking-[0.15em]" style={{ ...FONT_HUD, color: 'rgba(100,116,139,0.4)' }}>Portion: S / M / L</span>
                  </div>

                  {results.foods.map((food, i) => {
                    const mult = portionMultipliers[i] ?? 1.0
                    const itemCal = Math.round(food.calories * mult)
                    const itemProtein = Math.round((food.protein || 0) * mult)
                    const itemCarbs = Math.round((food.carbs || 0) * mult)
                    const itemFat = Math.round((food.fat || 0) * mult)
                    const confPct = Math.round((food.confidence || 0.9) * 100)

                    return (
                      <div key={i} className="p-3.5 transition-all space-y-2.5" style={{ background: 'rgba(8,15,30,0.4)', border: '1px solid rgba(52,211,153,0.06)', clipPath: HUD_CLIP_SM }}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ clipPath: HUD_HEX, background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.15)' }}>
                              <CheckCircle2 className="w-4 h-4 text-primary-400" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white capitalize uppercase tracking-wider" style={FONT_HUD}>{food.name}</p>
                              <p className="text-[10px] mt-0.5 uppercase tracking-wider" style={{ ...FONT_HUD, color: 'rgba(100,116,139,0.5)' }}>
                                Est: <span className="text-dark-300 font-semibold">{food.portion}</span>
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[9px] font-semibold" style={{ ...FONT_HUD, color: 'rgba(52,211,153,0.8)' }}>{itemProtein}g P</span>
                                <span className="text-[9px]" style={{ color: 'rgba(100,116,139,0.3)' }}>·</span>
                                <span className="text-[9px] font-semibold" style={{ ...FONT_HUD, color: 'rgba(56,189,248,0.8)' }}>{itemCarbs}g C</span>
                                <span className="text-[9px]" style={{ color: 'rgba(100,116,139,0.3)' }}>·</span>
                                <span className="text-[9px] font-semibold" style={{ ...FONT_HUD, color: 'rgba(251,191,36,0.8)' }}>{itemFat}g F</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <p className="text-lg font-extrabold text-coral-400" style={FONT_HUD}>{itemCal}</p>
                            <p className="text-[8px] -mt-0.5 uppercase tracking-wider" style={{ ...FONT_HUD, color: 'rgba(100,116,139,0.4)' }}>kcal</p>
                            <span className="text-[8px] font-semibold uppercase tracking-wider" style={{ ...FONT_HUD, color: 'rgba(100,116,139,0.4)' }}>{confPct}% match</span>
                          </div>
                        </div>

                        {/* Portion buttons */}
                        <div className="flex items-center justify-between pt-1 gap-2" style={{ borderTop: '1px solid rgba(52,211,153,0.04)' }}>
                          <span className="text-[9px] flex-shrink-0 uppercase tracking-wider" style={{ ...FONT_HUD, color: 'rgba(100,116,139,0.4)' }}>Portion:</span>
                          <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-end">
                            {[
                              { label: 'Small (0.8x)', short: '0.8x S', val: 0.8 },
                              { label: 'Regular (1.0x)', short: '1.0x M', val: 1.0 },
                              { label: 'Large (1.3x)', short: '1.3x L', val: 1.3 },
                            ].map((p) => (
                              <button
                                key={p.val}
                                onClick={() => handlePortionChange(i, p.val)}
                                className="px-2 sm:px-2.5 py-1 text-[9px] font-bold transition-all cursor-pointer uppercase tracking-wider"
                                style={{
                                  ...FONT_HUD,
                                  clipPath: HUD_CLIP_XS,
                                  ...(mult === p.val
                                    ? { background: 'rgba(244,63,94,0.2)', color: 'rgba(244,63,94,1)', border: '1px solid rgba(244,63,94,0.3)' }
                                    : { background: 'rgba(255,255,255,0.03)', color: 'rgba(100,116,139,0.5)', border: '1px solid rgba(255,255,255,0.05)' }),
                                }}
                              >
                                <span className="sm:hidden">{p.short}</span>
                                <span className="hidden sm:inline">{p.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Bottom CTA */}
                <div className="p-5 space-y-2.5" style={{ borderTop: '1px solid rgba(52,211,153,0.06)', background: 'rgba(0,0,0,0.2)' }}>
                  <button
                    onClick={handleAddToLog}
                    disabled={addedToLog}
                    className="hud-cta-btn w-full flex items-center justify-center gap-2 py-4 font-bold text-xs sm:text-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer uppercase tracking-wider"
                    style={{
                      ...FONT_HUD,
                      ...(addedToLog
                        ? { background: 'rgba(52,211,153,0.08)', borderColor: 'rgba(52,211,153,0.3)', color: 'rgba(52,211,153,0.8)' }
                        : { background: 'rgba(52,211,153,0.12)', borderColor: 'rgba(52,211,153,0.4)', color: 'rgba(52,211,153,1)', boxShadow: '0 0 25px rgba(16,185,129,0.15)' }),
                    }}
                  >
                    {addedToLog ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Logged to Daily Nutrition</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Log Meal ({totals.calories} kcal)</span>
                      </>
                    )}
                  </button>

                  {addedToLog && (
                    <div className="flex items-center justify-between text-[10px] px-2 pt-1 uppercase tracking-wider" style={FONT_HUD}>
                      <span style={{ color: 'rgba(100,116,139,0.4)' }}>Meal logged to daily dashboard</span>
                      <Link href="/dashboard/nutrition" className="font-bold flex items-center gap-1 hover:text-primary-300 transition-colors" style={{ color: 'rgba(52,211,153,0.7)' }}>
                        View Nutrition <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* State 3: Empty Instructions & History */
              <div className="flex-1 flex flex-col justify-between">
                <div className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 flex items-center justify-center mx-auto" style={{ clipPath: HUD_HEX, background: 'rgba(52,211,153,0.04)', border: '1px solid rgba(52,211,153,0.08)' }}>
                    <Scan className="w-8 h-8 text-dark-600" />
                  </div>

                  <div className="space-y-1.5 max-w-sm mx-auto">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider" style={FONT_HUD}>
                      Awaiting <span className="text-primary-400">Input</span>
                    </h3>
                    <p className="text-[10px] leading-relaxed uppercase tracking-wider" style={{ ...FONT_HUD, color: 'rgba(100,116,139,0.5)' }}>
                      Capture or upload a photo → tap &ldquo;Scan & Compute&rdquo; for full macro breakdown.
                    </p>
                  </div>

                  {/* 3 Step Guide */}
                  <div className="space-y-2 text-left max-w-md mx-auto">
                    {[
                      { num: '01', title: 'Capture or upload photo', desc: 'Overhead angle, good lighting recommended' },
                      { num: '02', title: 'Neural vision identification', desc: 'AI segments ingredients, estimates grams' },
                      { num: '03', title: 'Instant calorie logging', desc: 'Review macros, adjust portions, log in 1-click' },
                    ].map((step) => (
                      <div key={step.num} className="flex items-center gap-3 p-3" style={{ background: 'rgba(8,15,30,0.4)', border: '1px solid rgba(52,211,153,0.05)', clipPath: HUD_CLIP_XS }}>
                        <span className="text-[10px] font-extrabold w-6 flex-shrink-0 uppercase" style={{ ...FONT_HUD, color: 'rgba(244,63,94,0.7)' }}>{step.num}</span>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-white uppercase tracking-wider" style={FONT_HUD}>{step.title}</p>
                          <p className="text-[9px] uppercase tracking-wider" style={{ ...FONT_HUD, color: 'rgba(100,116,139,0.4)' }}>{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scan History */}
                <div className="p-5" style={{ borderTop: '1px solid rgba(52,211,153,0.06)', background: 'rgba(0,0,0,0.15)' }}>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-2.5" style={{ ...FONT_HUD, color: 'rgba(100,116,139,0.5)' }}>
                    Recent Scans
                  </p>
                  <div className="space-y-2">
                    {history.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2.5 text-xs" style={{ background: 'rgba(8,15,30,0.3)', border: '1px solid rgba(52,211,153,0.04)', clipPath: HUD_CLIP_XS }}>
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg">{item.emoji}</span>
                          <div>
                            <p className="font-bold text-white text-[10px] uppercase tracking-wider" style={FONT_HUD}>{item.name}</p>
                            <p className="text-[9px] flex items-center gap-1 uppercase tracking-wider" style={{ ...FONT_HUD, color: 'rgba(100,116,139,0.4)' }}>
                              <Clock className="w-2.5 h-2.5" /> {item.time} · {item.protein} protein
                            </p>
                          </div>
                        </div>
                        <span className="font-extrabold text-coral-400 text-[10px] uppercase tracking-wider" style={FONT_HUD}>{item.cal} kcal</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
