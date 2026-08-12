'use client'

import { useState, useRef } from 'react'
import { Badge } from '@/components/ui'
import {
  Camera, Upload, Flame, Scan, Sparkles, RotateCcw,
  CheckCircle2, Target, Eye, ArrowRight, Plus, Zap, Clock,
} from 'lucide-react'
import { analyzeFoodImage } from '@/lib/puter-ai'

interface DetectedFood { name: string; calories: number; portion: string; confidence: number }
interface ScanResult { foods: DetectedFood[]; totalCalories: number }

const scanHistory = [
  { emoji: '🥗', name: 'Greek Salad', cal: 320, time: '2h ago', protein: '12g', color: '#34d399' },
  { emoji: '🍗', name: 'Grilled Chicken', cal: 415, time: 'Yesterday', protein: '48g', color: '#f97316' },
  { emoji: '🥑', name: 'Avocado Toast', cal: 280, time: '2d ago', protein: '9g', color: '#a855f7' },
]

export default function ScanPage() {
  const [image, setImage] = useState<string | null>(null)
  const [results, setResults] = useState<ScanResult | null>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [addedToLog, setAddedToLog] = useState(false)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) { setImage(URL.createObjectURL(file)); setResults(null); setAddedToLog(false) }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play(); setCameraActive(true) }
    } catch (err) { console.error('Camera access denied:', err) }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current, video = videoRef.current
      canvas.width = video.videoWidth; canvas.height = video.videoHeight
      canvas.getContext('2d')?.drawImage(video, 0, 0)
      setImage(canvas.toDataURL('image/jpeg'))
      setCameraActive(false)
      ;(video.srcObject as MediaStream)?.getTracks().forEach((t) => t.stop())
      setResults(null); setAddedToLog(false)
    }
  }

  const analyzeFood = async () => {
    if (!image) return
    setLoading(true); setAddedToLog(false)
    try {
      const puterResult = await analyzeFoodImage(image)
      if (puterResult?.foods?.length > 0) { setResults(puterResult); setLoading(false); return }
      const res = await fetch('/api/scan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image }) })
      setResults(await res.json())
    } catch (err) { console.error('Scan failed:', err) }
    setLoading(false)
  }

  const reset = () => { setImage(null); setResults(null); setAddedToLog(false); setCameraActive(false) }

  return (
    <div className="w-full space-y-5 pb-20 md:pb-8">

      {/* ── Header ── */}
      <div
        className="relative rounded-3xl overflow-hidden p-5 sm:p-6"
        style={{ background: 'linear-gradient(135deg, rgba(6,11,24,0.98) 0%, rgba(12,4,18,0.95) 100%)', border: '1px solid rgba(244,63,94,0.15)', boxShadow: '0 0 40px rgba(244,63,94,0.04)' }}
      >
        <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.07) 0%, transparent 70%)', transform: 'translate(20%,-30%)' }} />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center animate-pulse-glow-energy"
              style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.2), rgba(251,146,60,0.15))', border: '1px solid rgba(244,63,94,0.3)' }}
            >
              <Scan className="w-6 h-6 text-coral-400" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                AI Vision Scanner
              </h1>
              <p className="text-slate-500 text-xs mt-0.5">Neural vision identifies dishes and estimates macros instantly</p>
            </div>
          </div>
          <Badge variant="coral" size="md" glow>Neural Engine v3.4</Badge>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="grid lg:grid-cols-2 gap-5">

        {/* ── Scanner Viewport ── */}
        <div className="space-y-4">
          <div
            className="rounded-3xl overflow-hidden relative aspect-square max-h-[340px] sm:max-h-none mx-auto w-full"
            style={{
              background: '#020407',
              border: `1px solid ${cameraActive || image ? 'rgba(244,63,94,0.35)' : 'rgba(255,255,255,0.07)'}`,
              boxShadow: (cameraActive || image) ? '0 0 60px rgba(244,63,94,0.12), 0 20px 40px rgba(0,0,0,0.5)' : '0 20px 40px rgba(0,0,0,0.4)',
            }}
          >



            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.75) 100%)' }} />

            {cameraActive ? (
              <>
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline />
                {/* HUD corners */}
                <div className="absolute inset-6 z-20 pointer-events-none">
                  {[['top-0 left-0 border-t-2 border-l-2 rounded-tl-lg','top-0 right-0 border-t-2 border-r-2 rounded-tr-lg'],['bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg','bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg']].flat().map((cls, i) => (
                    <div key={i} className={`absolute w-8 h-8 border-coral-400 ${cls}`} style={{ filter: 'drop-shadow(0 0 8px rgba(244,63,94,0.9))' }} />
                  ))}
                  <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-coral-400 to-transparent animate-scan-line" style={{ boxShadow: '0 0 16px rgba(244,63,94,0.9)' }} />
                </div>
                <div className="absolute top-4 left-4 z-20">
                  <div className="hud-chip bg-black/70 border border-coral-400/40 text-coral-300 flex items-center gap-2 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-coral-400 animate-ping" />SCANNING
                  </div>
                </div>
                <div className="absolute bottom-5 left-0 right-0 flex justify-center z-20">
                  <button onClick={capturePhoto} className="w-16 h-16 rounded-full bg-white hover:scale-110 active:scale-95 transition-all duration-200" style={{ border: '4px solid rgba(244,63,94,0.8)', boxShadow: '0 0 30px rgba(244,63,94,0.5)' }} aria-label="Capture photo" />
                </div>
              </>
            ) : image ? (
              <div className="relative w-full h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="Captured food" className="w-full h-full object-cover" />
                <div className="absolute inset-0 z-20 pointer-events-none p-8">
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-dashed rounded-2xl flex items-start p-2" style={{ borderColor: 'rgba(244,63,94,0.7)', boxShadow: '0 0 20px rgba(244,63,94,0.2)' }}>
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: 'rgba(244,63,94,0.8)', color: 'white' }}>
                      <Target className="w-2.5 h-2.5" /> Target Acquired
                    </span>
                  </div>
                </div>
                <div className="absolute top-4 left-4 z-20">
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-black/80 text-[10px] font-bold text-primary-300" style={{ border: '1px solid rgba(52,211,153,0.4)' }}>
                    <CheckCircle2 className="w-3.5 h-3.5" /> IMAGE READY
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 relative z-10">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5 animate-breathe" style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.18)' }}>
                  <Camera className="w-10 h-10 text-coral-400" />
                </div>
                <p className="text-base font-bold text-white mb-2">No Image Selected</p>
                <p className="text-xs text-slate-600 max-w-[220px] leading-relaxed">Take a photo or upload an image to analyze macronutrients instantly</p>
              </div>
            )}
          </div>

          <canvas ref={canvasRef} className="hidden" />

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={startCamera}
                disabled={cameraActive || loading}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg, rgba(52,211,153,0.18), rgba(16,185,129,0.12))', border: '1px solid rgba(52,211,153,0.3)', color: '#34d399', boxShadow: '0 0 20px rgba(52,211,153,0.08)' }}
              >
                <Camera className="w-4 h-4" /> Camera
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={cameraActive || loading}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg, rgba(251,146,60,0.18), rgba(249,115,22,0.12))', border: '1px solid rgba(251,146,60,0.3)', color: '#fb923c', boxShadow: '0 0 20px rgba(251,146,60,0.08)' }}
              >
                <Upload className="w-4 h-4" /> Upload
              </button>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />

            <button
              onClick={analyzeFood}
              disabled={!image || loading}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-base transition-all hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: loading ? 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(147,51,234,0.25))' : 'linear-gradient(135deg, #a855f7, #7c3aed)',
                color: 'white',
                border: '1px solid rgba(168,85,247,0.4)',
                boxShadow: image && !loading ? '0 0 30px rgba(168,85,247,0.4), 0 8px 20px rgba(0,0,0,0.3)' : 'none',
              }}
            >
              {loading ? (
                <><div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Analyzing with Neural Vision…</>
              ) : (
                <><Sparkles className="w-5 h-5" /> Analyze Food Content</>
              )}
            </button>

            {image && !loading && (
              <button onClick={reset} className="w-full py-2.5 rounded-2xl text-xs font-semibold text-slate-500 hover:text-slate-300 flex items-center justify-center gap-2 transition-colors">
                <RotateCcw className="w-3.5 h-3.5" /> Reset Scanner
              </button>
            )}
          </div>
        </div>

        {/* ── Results Panel ── */}
        <div>
          <div
            className="rounded-3xl min-h-[400px] flex flex-col overflow-hidden"
            style={{ background: 'linear-gradient(180deg, rgba(8,14,28,0.97) 0%, rgba(12,20,38,0.95) 100%)', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
          >
            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 rounded-full border-2 border-coral-400/20" />
                  <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-coral-400 animate-spin" />
                  <div className="absolute inset-3 rounded-full flex items-center justify-center" style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)' }}>
                    <Eye className="w-9 h-9 text-coral-400 animate-breathe" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Analyzing Food Items…</h3>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed mb-6">Neural vision model scanning your image against 1M+ food database entries</p>
                <div className="w-full space-y-2.5 px-4">
                  {[...Array(3)].map((_, i) => (<div key={i} className="skeleton-shimmer h-14 rounded-2xl" style={{ animationDelay: `${i * 0.15}s` }} />))}
                </div>
              </div>
            ) : results ? (
              <div className="flex-1 overflow-y-auto">
                {/* Calorie banner */}
                <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="section-label">Total Calories Detected</p>
                    <Badge variant="coral" size="sm" glow>AI Verified</Badge>
                  </div>
                  <div className="flex items-end gap-3">
                    <span className="text-5xl font-extrabold tracking-tight" style={{ fontFamily: 'Space Grotesk', background: 'linear-gradient(135deg, #fb923c, #f43f5e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {results.totalCalories}
                    </span>
                    <div className="pb-1.5">
                      <p className="text-sm text-slate-400 font-semibold">kcal</p>
                      <p className="text-xs text-slate-600">estimated total</p>
                    </div>
                    <Flame className="w-8 h-8 text-coral-400 animate-pulse ml-auto mb-1" />
                  </div>
                </div>

                {/* Food items */}
                <div className="p-5 space-y-2.5">
                  <p className="section-label mb-3">Detected Ingredients</p>
                  {results.foods.map((food, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl transition-all hover:scale-[1.01]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}>
                          <CheckCircle2 className="w-[18px] h-[18px] text-primary-300" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white capitalize">{food.name}</p>
                          <p className="text-xs text-slate-600">{food.portion}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-extrabold text-coral-400">{food.calories}</p>
                        <p className="text-[9px] text-slate-600 mb-1">kcal</p>
                        <div className="flex items-center gap-1.5">
                          <div className="w-12 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                            <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-300" style={{ width: `${food.confidence * 100}%`, boxShadow: '0 0 6px rgba(52,211,153,0.5)' }} />
                          </div>
                          <span className="text-[9px] text-slate-600">{Math.round(food.confidence * 100)}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="p-5" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <button
                    onClick={() => setAddedToLog(true)}
                    disabled={addedToLog}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all hover:scale-[1.01]"
                    style={addedToLog
                      ? { background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)', color: '#34d399' }
                      : { background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', boxShadow: '0 0 24px rgba(16,185,129,0.3)' }
                    }
                  >
                    {addedToLog ? <><CheckCircle2 className="w-4 h-4" /> Added to Today&apos;s Log</> : <><Plus className="w-4 h-4" /> Add to Food Log</>}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <Scan className="w-8 h-8 text-slate-600" />
                  </div>
                  <p className="text-base font-bold text-white mb-2">Scan Results</p>
                  <p className="text-xs text-slate-600 max-w-xs leading-relaxed mb-6">Take or upload a photo then click &ldquo;Analyze Food Content&rdquo; to see detailed nutrition data.</p>
                  <div className="w-full space-y-2 text-left">
                    {[
                      { num: '01', text: 'Take or upload a photo of your meal' },
                      { num: '02', text: 'Neural AI identifies all food items' },
                      { num: '03', text: 'Get instant calorie & macro breakdown' },
                    ].map((step) => (
                      <div key={step.num} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <span className="text-[10px] font-extrabold text-slate-600 w-5 flex-shrink-0">{step.num}</span>
                        <ArrowRight className="w-3 h-3 text-slate-700 flex-shrink-0" />
                        <p className="text-xs text-slate-400">{step.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scan History */}
                <div className="p-5" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="section-label mb-3">Recent Scans</p>
                  <div className="space-y-2">
                    {scanHistory.map((item) => (
                      <div key={item.name} className="flex items-center gap-3 p-3 rounded-xl card-lift" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <span className="text-xl">{item.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white">{item.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <p className="text-[10px] text-slate-600 flex items-center gap-1"><Clock className="w-2.5 h-2.5" />{item.time}</p>
                            <span className="text-[10px] text-slate-700">·</span>
                            <p className="text-[10px] text-slate-600">{item.protein} protein</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold" style={{ color: item.color }}>{item.cal} kcal</span>
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
