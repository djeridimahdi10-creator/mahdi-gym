'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mic, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'

interface ParsedEntry {
  name: string
  portion: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

export function VoiceFoodLoggerModal() {
  const { voiceModalOpen, setModalOpen, addMealFood } = useNutritionStore()
  const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [parsing, setParsing] = useState(false)
  const [parsedEntries, setParsedEntries] = useState<ParsedEntry[] | null>(null)

  if (!voiceModalOpen) return null

  const sampleInputs = [
    'I ate two boiled eggs, whole grain toast and black coffee',
    'I ate rechta with chicken and turnips',
    'I had 200g grilled salmon with brown rice and steamed broccoli',
    'Chorba frik soup with lemon and a quarter kesra bread',
  ]

  const handleSimulateSpeech = (text: string) => {
    setTranscript(text)
    processTextToNutrition(text)
  }

  const processTextToNutrition = (text: string) => {
    setParsing(true)
    setParsedEntries(null)

    setTimeout(() => {
      const lower = text.toLowerCase()
      let results: ParsedEntry[] = []

      if (lower.includes('rechta')) {
        results = [
          { name: 'Rechta Noodles & Chicken', portion: '1 plate (350g)', calories: 620, protein: 42, carbs: 82, fat: 15 },
        ]
      } else if (lower.includes('chorba') || lower.includes('kesra')) {
        results = [
          { name: 'Chorba Frik Soup', portion: '1 bowl (300ml)', calories: 280, protein: 22, carbs: 34, fat: 7 },
          { name: 'Kesra Semolina Bread', portion: '1 quarter (80g)', calories: 220, protein: 6, carbs: 42, fat: 3 },
        ]
      } else if (lower.includes('salmon')) {
        results = [
          { name: 'Grilled Salmon Fillet', portion: '200g', calories: 370, protein: 39, carbs: 0, fat: 22 },
          { name: 'Brown Rice', portion: '150g', calories: 165, protein: 4, carbs: 35, fat: 1 },
          { name: 'Steamed Broccoli', portion: '100g', calories: 35, protein: 3, carbs: 6, fat: 0 },
        ]
      } else {
        results = [
          { name: 'Boiled Eggs (Large)', portion: '2 eggs (100g)', calories: 140, protein: 12, carbs: 1, fat: 10 },
          { name: 'Whole Grain Toast', portion: '2 slices (60g)', calories: 160, protein: 6, carbs: 28, fat: 2 },
          { name: 'Black Coffee', portion: '1 cup', calories: 5, protein: 0, carbs: 1, fat: 0 },
        ]
      }

      setParsedEntries(results)
      setParsing(false)
    }, 1000)
  }

  const handleConfirmSave = () => {
    if (!parsedEntries) return
    parsedEntries.forEach((entry) => {
      addMealFood(2, entry)
    })
    setModalOpen('voice', false)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          className="relative w-full max-w-xl rounded-3xl p-6 space-y-5 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(12,18,34,0.98) 0%, rgba(8,12,24,0.98) 100%)',
            border: '1px solid rgba(168,85,247,0.3)',
            boxShadow: '0 0 50px rgba(168,85,247,0.1)',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center border border-purple-500/30">
                <Mic className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Voice Food Logging
                </h2>
                <p className="text-slate-400 text-xs">Speak naturally in English or Algerian local dish names</p>
              </div>
            </div>

            <button
              onClick={() => setModalOpen('voice', false)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Voice Mic Button */}
          <div className="flex flex-col items-center justify-center py-6 space-y-3 bg-purple-500/5 rounded-3xl border border-purple-500/15">
            <motion.button
              onClick={() => handleSimulateSpeech('I ate two boiled eggs, whole grain toast and black coffee')}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all shadow-lg ${
                isListening
                  ? 'bg-red-500 shadow-red-500/40 animate-pulse'
                  : 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/30'
              }`}
              whileTap={{ scale: 0.9 }}
            >
              <Mic className="w-7 h-7" />
            </motion.button>
            <p className="text-xs text-purple-300 font-semibold">Tap microphone or select sample below</p>
          </div>

          {/* Preset Prompts */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Quick Test Samples</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sampleInputs.map((sample, i) => (
                <button
                  key={i}
                  onClick={() => handleSimulateSpeech(sample)}
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-purple-500/40 text-left text-xs text-slate-300 transition-all truncate"
                >
                  💬 &quot;{sample}&quot;
                </button>
              ))}
            </div>
          </div>

          {/* Transcript & Structured Output */}
          {transcript && (
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <div className="text-xs">
                <span className="text-slate-400">Heard: </span>
                <span className="text-white font-medium italic">&quot;{transcript}&quot;</span>
              </div>

              {parsing ? (
                <div className="flex items-center gap-2 text-purple-400 text-xs font-bold py-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AI Parsing Natural Language to Macro Data...</span>
                </div>
              ) : (
                parsedEntries && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Structured Entries</p>
                    {parsedEntries.map((e, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs flex justify-between">
                        <div>
                          <span className="text-white font-bold">{e.name}</span>
                          <span className="text-slate-400 text-[11px] block">{e.portion}</span>
                        </div>
                        <span className="text-purple-300 font-bold">{e.calories} kcal • {e.protein}g P</span>
                      </div>
                    ))}

                    <button
                      onClick={handleConfirmSave}
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center gap-2 transition-all mt-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm & Save to Timeline</span>
                    </button>
                  </div>
                )
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
