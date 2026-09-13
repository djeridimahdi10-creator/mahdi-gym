'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui'
import {
  Camera, Upload, Flame, Scan, Sparkles, RotateCcw,
  CheckCircle2, Target, Eye, ArrowRight, Plus, Zap, Clock,
  Key, AlertCircle, RefreshCw, ChevronRight, ShieldCheck,
  Dumbbell, Heart, PieChart, Info
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

/**
 * Resizes and compresses an image (from file or data URL) to max 1200x1200px
 * to ensure fast upload and prevent payload limit errors.
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

  // Save API key
  const handleSaveApiKey = (key: string) => {
    setCustomApiKey(key)
    if (key.trim()) {
      localStorage.setItem('nutrisaas_openai_key', key.trim())
    } else {
      localStorage.removeItem('nutrisaas_openai_key')
    }
    setShowKeyModal(false)
  }

  // Handle file select
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
      // fallback to direct FileReader
      const reader = new FileReader()
      reader.onload = (ev) => {
        setImage(ev.target?.result as string)
        setResults(null)
        setAddedToLog(false)
      }
      reader.readAsDataURL(file)
    }
  }

  // Drag & drop handlers
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

  // Camera management
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

  // Quick sample loader
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
      // If CORS blocks canvas export of remote unsplash, pass URL directly
      setImage(sampleUrl)
      await runAIAnalysis(sampleUrl)
    }
  }

  // AI Analysis Execution
  const runAIAnalysis = async (imageDataUrl: string) => {
    setLoading(true)
    setScanError(null)
    setLoadingStep(1) // Preprocessing image

    // Progress animation steps
    const step2Timer = setTimeout(() => setLoadingStep(2), 700) // Querying vision AI
    const step3Timer = setTimeout(() => setLoadingStep(3), 1600) // Calculating macros

    try {
      let finalResult: ScanResult | null = null

      // Tier 1: If user provided a custom OpenAI key, prioritize server route with that key
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

      // Tier 2: Try browser Puter.js GPT-4o-mini Vision (Free, no server key required)
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

      // Tier 3: Call server /api/scan endpoint
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
        // Initialize portion multipliers
        const initMult: Record<number, number> = {}
        finalResult.foods.forEach((_, idx) => {
          initMult[idx] = 1.0
        })
        setPortionMultipliers(initMult)
        setResults(finalResult)

        // Add to local history
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

  // Trigger scan on current image
  const analyzeFood = () => {
    if (!image) return
    runAIAnalysis(image)
  }

  // Portion multiplier toggle (0.8x small, 1.0x regular, 1.3x large)
  const handlePortionChange = (index: number, mult: number) => {
    setPortionMultipliers((prev) => ({
      ...prev,
      [index]: mult,
    }))
  }

  // Dynamically calculated calories & macros based on active portion multipliers
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

  // Add to Nutrition Daily Store
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

  // Reset scanner
  const reset = () => {
    stopCamera()
    setImage(null)
    setResults(null)
    setAddedToLog(false)
    setPortionMultipliers({})
    setScanError(null)
  }

  // Percentage of user's daily calorie goal
  const calorieTargetPct = dailyCalories > 0
    ? Math.min(100, Math.round((totals.calories / dailyCalories) * 100))
    : 0

  return (
    <div className="w-full space-y-6 pb-20 md:pb-10 animate-fade-in">

      {/* ── Page Header ── */}
      <div
        className="relative rounded-3xl overflow-hidden p-5 sm:p-7"
        style={{
          background: 'linear-gradient(135deg, rgba(8,14,28,0.98) 0%, rgba(14,6,22,0.95) 100%)',
          border: '1px solid rgba(244,63,94,0.18)',
          boxShadow: '0 0 50px rgba(244,63,94,0.06)',
        }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.09) 0%, transparent 70%)', transform: 'translate(20%,-30%)' }} />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-13 h-13 rounded-2xl flex items-center justify-center animate-pulse-glow-energy"
              style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.22), rgba(251,146,60,0.18))', border: '1px solid rgba(244,63,94,0.35)' }}
            >
              <Scan className="w-7 h-7 text-coral-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  Neural AI Vision
                </span>
                <span className="text-[10px] text-slate-500">GPT-4o-mini Vision Engine</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                AI Food & Calorie Scanner
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                Upload or snap any meal. Neural vision instantly detects ingredients, portions, and computes calories.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setShowKeyModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              title="Configure AI API Key"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>{customApiKey ? 'Custom Key Active' : 'AI Engine: Puter Free'}</span>
            </button>
            <Badge variant="coral" size="md" glow>
              Vision v3.8
            </Badge>
          </div>
        </div>
      </div>

      {/* ── API Key Modal ── */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div
            className="w-full max-w-md rounded-3xl p-6 space-y-4"
            style={{ background: 'linear-gradient(135deg, #0e1526 0%, #080d1a 100%)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                  <Key className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">AI Vision Engine Settings</h3>
              </div>
              <button onClick={() => setShowKeyModal(false)} className="text-slate-400 hover:text-white text-sm">✕</button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              By default, NutriSaaS uses <strong className="text-white">Puter.js GPT-4o-mini</strong> which is 100% free with no API key needed. If you prefer to use your own personal OpenAI API key, enter it below.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">OpenAI API Key (optional)</label>
              <input
                type="password"
                placeholder="sk-..."
                defaultValue={customApiKey}
                id="custom-key-input"
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  const input = document.getElementById('custom-key-input') as HTMLInputElement
                  handleSaveApiKey(input?.value || '')
                }}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-400 text-white transition-all shadow-lg shadow-rose-500/20"
              >
                Save Settings
              </button>
              {customApiKey && (
                <button
                  onClick={() => handleSaveApiKey('')}
                  className="px-3 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-white/5 border border-white/10"
                >
                  Clear Key
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Quick Sample Meal Chips ── */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-coral-400" />
            Quick Test: Click a sample meal to test the AI scanner instantly
          </p>
          <span className="text-[10px] text-slate-500 hidden sm:inline">1-Click Scan Demo</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {SAMPLE_FOODS.map((sample) => (
            <button
              key={sample.name}
              onClick={() => handleLoadSample(sample.url)}
              disabled={loading}
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-coral-500/40 text-left transition-all hover:scale-[1.02] disabled:opacity-50 group"
            >
              <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">{sample.emoji}</span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate group-hover:text-coral-300 transition-colors">
                  {sample.name}
                </p>
                <p className="text-[10px] text-slate-500 truncate">{sample.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Error Banner if any ── */}
      {scanError && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 animate-fade-in">
          <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <p className="font-bold text-rose-300">Scan Notice</p>
            <p className="text-slate-300 mt-0.5">{scanError}</p>
          </div>
          <button onClick={() => setScanError(null)} className="text-slate-400 hover:text-white text-xs">✕</button>
        </div>
      )}

      {/* ── Main 2-Column Grid ── */}
      <div className="grid lg:grid-cols-12 gap-6">

        {/* ── Left Column: Scanner Viewport (5 cols) ── */}
        <div className="lg:col-span-5 space-y-4">

          {/* Viewport Card */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`rounded-3xl overflow-hidden relative aspect-square max-h-[360px] sm:max-h-[420px] mx-auto w-full transition-all duration-300 ${dragActive ? 'scale-[1.01] ring-2 ring-coral-400 ring-offset-2 ring-offset-black' : ''
              }`}
            style={{
              background: '#030712',
              border: `1px solid ${dragActive
                  ? 'rgba(244,63,94,0.8)'
                  : cameraActive || image
                    ? 'rgba(244,63,94,0.35)'
                    : 'rgba(255,255,255,0.08)'
                }`,
              boxShadow: cameraActive || image
                ? '0 0 60px rgba(244,63,94,0.12), 0 20px 40px rgba(0,0,0,0.6)'
                : '0 20px 40px rgba(0,0,0,0.5)',
            }}
          >
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.75) 100%)' }} />

            {/* Hidden canvas for snapshot / compression */}
            <canvas ref={canvasRef} className="hidden" />

            {/* 1. Camera Active View */}
            {cameraActive ? (
              <>
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline />
                {/* HUD Reticle Corners */}
                <div className="absolute inset-6 z-20 pointer-events-none">
                  {[
                    'top-0 left-0 border-t-2 border-l-2 rounded-tl-lg',
                    'top-0 right-0 border-t-2 border-r-2 rounded-tr-lg',
                    'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg',
                    'bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg',
                  ].map((cls, i) => (
                    <div key={i} className={`absolute w-8 h-8 border-coral-400 ${cls}`} style={{ filter: 'drop-shadow(0 0 8px rgba(244,63,94,0.9))' }} />
                  ))}
                  {/* Laser Scan Line */}
                  <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-coral-400 to-transparent animate-scan-line" style={{ boxShadow: '0 0 16px rgba(244,63,94,0.9)' }} />
                </div>

                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-black/80 border border-coral-400/50 text-coral-300 flex items-center gap-2 px-3 py-1 rounded-xl text-[10px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-coral-400 animate-ping" />
                    LIVE CAMERA
                  </div>
                </div>

                <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-4 z-20">
                  <button
                    onClick={stopCamera}
                    className="px-4 py-2 rounded-xl bg-black/80 text-slate-300 text-xs font-semibold hover:text-white border border-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={capturePhoto}
                    className="w-16 h-16 rounded-full bg-white hover:scale-110 active:scale-95 transition-all duration-200"
                    style={{ border: '4px solid rgba(244,63,94,0.85)', boxShadow: '0 0 30px rgba(244,63,94,0.6)' }}
                    aria-label="Capture photo"
                  />
                </div>
              </>
            ) : image ? (
              /* 2. Image Loaded View */
              <div className="relative w-full h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="Target meal" className="w-full h-full object-cover" />

                {/* Laser scan animation while loading */}
                {loading && (
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-scan-line" style={{ boxShadow: '0 0 18px rgba(52,211,153,0.9)' }} />
                  </div>
                )}

                {/* Target HUD Bounding box */}
                <div className="absolute inset-0 z-15 pointer-events-none p-8">
                  <div
                    className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-dashed rounded-2xl flex items-start p-2 transition-all"
                    style={{
                      borderColor: loading ? 'rgba(52,211,153,0.7)' : 'rgba(244,63,94,0.7)',
                      boxShadow: loading ? '0 0 25px rgba(52,211,153,0.25)' : '0 0 20px rgba(244,63,94,0.2)',
                    }}
                  >
                    <span
                      className="text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1"
                      style={{
                        background: loading ? 'rgba(16,185,129,0.85)' : 'rgba(244,63,94,0.85)',
                        color: 'white',
                      }}
                    >
                      <Target className="w-2.5 h-2.5" /> {loading ? 'Analyzing Food' : 'Target Acquired'}
                    </span>
                  </div>
                </div>

                <div className="absolute top-4 left-4 z-20">
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-black/85 text-[10px] font-bold text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                    <CheckCircle2 className="w-3.5 h-3.5" /> IMAGE LOADED
                  </div>
                </div>
              </div>
            ) : (
              /* 3. Empty State / Dropzone */
              <div
                onClick={() => fileInputRef.current?.click()}
                className="h-full flex flex-col items-center justify-center text-center p-8 relative z-10 cursor-pointer group"
              >
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105"
                  style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.25)' }}
                >
                  <Upload className="w-10 h-10 text-coral-400 group-hover:text-coral-300 transition-colors" />
                </div>
                <p className="text-base font-bold text-white mb-1.5">Drop Food Photo Here</p>
                <p className="text-xs text-slate-500 max-w-[240px] leading-relaxed mb-4">
                  Drag and drop an image or click to browse. Supports JPG, PNG, WEBP, HEIC.
                </p>
                <span className="text-[11px] font-bold text-coral-400 px-3 py-1 rounded-full bg-coral-500/10 border border-coral-500/20">
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
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40"
                style={{
                  background: 'linear-gradient(135deg, rgba(52,211,153,0.18), rgba(16,185,129,0.12))',
                  border: '1px solid rgba(52,211,153,0.35)',
                  color: '#34d399',
                  boxShadow: '0 0 20px rgba(52,211,153,0.08)',
                }}
              >
                <Camera className="w-4 h-4" /> Live Camera
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={cameraActive || loading}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40"
                style={{
                  background: 'linear-gradient(135deg, rgba(251,146,60,0.18), rgba(249,115,22,0.12))',
                  border: '1px solid rgba(251,146,60,0.35)',
                  color: '#fb923c',
                  boxShadow: '0 0 20px rgba(251,146,60,0.08)',
                }}
              >
                <Upload className="w-4 h-4" /> Upload Picture
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />

            {/* Analyze CTA */}
            <button
              onClick={analyzeFood}
              disabled={!image || loading || cameraActive}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-sm sm:text-base transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              style={{
                background: loading
                  ? 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(147,51,234,0.25))'
                  : 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)',
                color: 'white',
                border: '1px solid rgba(244,63,94,0.5)',
                boxShadow: image && !loading
                  ? '0 0 35px rgba(244,63,94,0.45), 0 8px 20px rgba(0,0,0,0.4)'
                  : 'none',
              }}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>
                    {loadingStep === 1
                      ? 'Preprocessing Food Photo…'
                      : loadingStep === 2
                        ? 'Analyzing with GPT-4o-mini Vision…'
                        : 'Calculating Calories & Macros…'}
                  </span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Scan Food & Calculate Calories</span>
                </>
              )}
            </button>

            {image && !loading && (
              <button
                onClick={reset}
                className="w-full py-2.5 rounded-2xl text-xs font-semibold text-slate-400 hover:text-white flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset & Clear Image
              </button>
            )}
          </div>
        </div>

        {/* ── Right Column: Nutrition Results Panel (7 cols) ── */}
        <div className="lg:col-span-7">
          <div
            className="rounded-3xl min-h-[460px] flex flex-col overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(8,14,28,0.98) 0%, rgba(12,20,38,0.96) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.55)',
            }}
          >
            {/* State 1: Loading skeleton with radar */}
            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-6">
                <div className="relative w-28 h-28">
                  <div className="absolute inset-0 rounded-full border-2 border-coral-400/20" />
                  <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-coral-400 animate-spin" />
                  <div
                    className="absolute inset-3 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.3)' }}
                  >
                    <Eye className="w-10 h-10 text-coral-400 animate-breathe" />
                  </div>
                </div>

                <div className="space-y-1.5 max-w-sm">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {loadingStep === 1
                      ? 'Extracting Image Features…'
                      : loadingStep === 2
                        ? 'Neural AI Identifying Ingredients…'
                        : 'Computing Calorie Density & Macros…'}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Analyzing plate portions against comprehensive nutrition databases to calculate exact macronutrients.
                  </p>
                </div>

                <div className="w-full max-w-md space-y-3 px-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="skeleton-shimmer h-14 rounded-2xl"
                      style={{ animationDelay: `${i * 0.18}s` }}
                    />
                  ))}
                </div>
              </div>
            ) : results ? (
              /* State 2: Scan Results Detailed Display */
              <div className="flex-1 flex flex-col">

                {/* Hero Calories Banner */}
                <div className="p-6 bg-gradient-to-r from-rose-500/10 via-amber-500/5 to-transparent border-b border-white/[0.08]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-coral-400 uppercase tracking-wider">
                        Total Energy Content
                      </span>
                      {results.provider && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                          {results.provider}
                        </span>
                      )}
                    </div>
                    <Badge variant="coral" size="sm" glow>
                      AI Verified
                    </Badge>
                  </div>

                  <div className="flex items-baseline justify-between flex-wrap gap-4">
                    <div className="flex items-baseline gap-3">
                      <span
                        className="text-5xl sm:text-6xl font-black tracking-tight"
                        style={{
                          fontFamily: 'Space Grotesk, sans-serif',
                          background: 'linear-gradient(135deg, #fb923c, #f43f5e)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {totals.calories}
                      </span>
                      <div>
                        <p className="text-base text-slate-300 font-bold">kcal</p>
                        <p className="text-[11px] text-slate-500">estimated total</p>
                      </div>
                    </div>

                    {dailyCalories > 0 && (
                      <div className="text-right">
                        <div className="flex items-center gap-1.5 justify-end text-xs font-bold text-emerald-400">
                          <Flame className="w-4 h-4 text-coral-400" />
                          <span>{calorieTargetPct}% of daily budget</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0.5">Target: {dailyCalories} kcal</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Macro Breakdown Pills */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 p-5 border-b border-white/[0.08] bg-black/20">
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Protein</p>
                    <p className="text-xl font-extrabold text-white mt-0.5">{totals.protein}g</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">{totals.protein * 4} kcal</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                    <p className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">Carbs</p>
                    <p className="text-xl font-extrabold text-white mt-0.5">{totals.carbs}g</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">{totals.carbs * 4} kcal</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                    <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Fat</p>
                    <p className="text-xl font-extrabold text-white mt-0.5">{totals.fat}g</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">{totals.fat * 9} kcal</p>
                  </div>

                  <div className="hidden sm:block p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                    <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Fiber</p>
                    <p className="text-xl font-extrabold text-white mt-0.5">{totals.fiber || 5}g</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">Digestive</p>
                  </div>
                </div>

                {/* Detected Ingredients List */}
                <div className="p-5 flex-1 space-y-3 overflow-y-auto max-h-[320px]">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Identified Ingredients & Portions ({results.foods.length})
                    </p>
                    <span className="text-[10px] text-slate-500">Adjust Portion: S / M / L</span>
                  </div>

                  {results.foods.map((food, i) => {
                    const mult = portionMultipliers[i] ?? 1.0
                    const itemCal = Math.round(food.calories * mult)
                    const itemProtein = Math.round((food.protein || 0) * mult)
                    const itemCarbs = Math.round((food.carbs || 0) * mult)
                    const itemFat = Math.round((food.fat || 0) * mult)
                    const confPct = Math.round((food.confidence || 0.9) * 100)

                    return (
                      <div
                        key={i}
                        className="p-3.5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.04] border border-white/[0.07] transition-all space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 flex-shrink-0 mt-0.5">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white capitalize">{food.name}</p>
                              <p className="text-xs text-slate-400 mt-0.5">
                                Estimated: <span className="text-slate-300 font-semibold">{food.portion}</span>
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] text-emerald-400 font-semibold">{itemProtein}g P</span>
                                <span className="text-[10px] text-slate-600">·</span>
                                <span className="text-[10px] text-sky-400 font-semibold">{itemCarbs}g C</span>
                                <span className="text-[10px] text-slate-600">·</span>
                                <span className="text-[10px] text-amber-400 font-semibold">{itemFat}g F</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <p className="text-lg font-extrabold text-coral-400">{itemCal}</p>
                            <p className="text-[9px] text-slate-500 -mt-0.5">kcal</p>
                            <span className="text-[9px] font-semibold text-slate-500">{confPct}% match</span>
                          </div>
                        </div>

                        {/* Portion adjustment buttons */}
                        <div className="flex items-center justify-between pt-1 border-t border-white/[0.04]">
                          <span className="text-[10px] text-slate-500">Portion Scale:</span>
                          <div className="flex items-center gap-1.5">
                            {[
                              { label: 'Small (0.8x)', val: 0.8 },
                              { label: 'Regular (1.0x)', val: 1.0 },
                              { label: 'Large (1.3x)', val: 1.3 },
                            ].map((p) => (
                              <button
                                key={p.val}
                                onClick={() => handlePortionChange(i, p.val)}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${mult === p.val
                                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                                  }`}
                              >
                                {p.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Bottom Action Footer */}
                <div className="p-5 border-t border-white/[0.08] bg-black/30 space-y-2.5">
                  <button
                    onClick={handleAddToLog}
                    disabled={addedToLog}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    style={
                      addedToLog
                        ? {
                          background: 'rgba(52,211,153,0.15)',
                          border: '1px solid rgba(52,211,153,0.4)',
                          color: '#34d399',
                        }
                        : {
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          color: 'white',
                          boxShadow: '0 0 25px rgba(16,185,129,0.35)',
                        }
                    }
                  >
                    {addedToLog ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span>Added to Today&apos;s Nutrition Log!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        <span>Log This Meal ({totals.calories} kcal)</span>
                      </>
                    )}
                  </button>

                  {addedToLog && (
                    <div className="flex items-center justify-between text-xs px-2 pt-1">
                      <span className="text-slate-400">Meal logged to your daily dashboard</span>
                      <Link
                        href="/dashboard/nutrition"
                        className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                      >
                        View in Nutrition Hub <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* State 3: Empty Instructions & Scan History */
              <div className="flex-1 flex flex-col justify-between">
                <div className="p-8 text-center space-y-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <Scan className="w-8 h-8 text-slate-500" />
                  </div>

                  <div className="space-y-1.5 max-w-sm mx-auto">
                    <h3 className="text-base font-bold text-white">Ready for Food Recognition</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Take or upload a photo then click &ldquo;Scan Food & Calculate Calories&rdquo; to see a complete calorie and macro breakdown.
                    </p>
                  </div>

                  {/* 3 Step Guide */}
                  <div className="space-y-2 text-left max-w-md mx-auto">
                    {[
                      { num: '01', title: 'Snap or upload photo', desc: 'Capture your plate from above in good lighting' },
                      { num: '02', title: 'Neural Vision identification', desc: 'AI segments each food ingredient and estimates grams' },
                      { num: '03', title: 'Instant calories & logging', desc: 'Review macros, adjust portions, and log in one click' },
                    ].map((step) => (
                      <div
                        key={step.num}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                      >
                        <span className="text-xs font-black text-rose-400 w-6 flex-shrink-0">{step.num}</span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white">{step.title}</p>
                          <p className="text-[10px] text-slate-500">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scan History Drawer */}
                <div className="p-5 border-t border-white/[0.06] bg-black/20">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                    Recent Meal Scans
                  </p>
                  <div className="space-y-2">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg">{item.emoji}</span>
                          <div>
                            <p className="font-bold text-white text-xs">{item.name}</p>
                            <p className="text-[10px] text-slate-500 flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" /> {item.time} · {item.protein} protein
                            </p>
                          </div>
                        </div>
                        <span className="font-extrabold text-coral-400 text-xs">{item.cal} kcal</span>
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

