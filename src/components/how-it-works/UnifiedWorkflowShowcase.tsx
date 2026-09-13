'use client'

import React, { useState, useEffect } from 'react'
import {
  User,
  Utensils,
  Camera,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Check,
  Flame,
  Scan,
  RotateCcw,
  Shuffle,
  Bot,
  Send,
  Zap,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

/* ─────────────────────────────────────────────────────────────
   STEP 1: CLEAR & INTUITIVE BODY NUMBERS (BIOMETRICS)
   ───────────────────────────────────────────────────────────── */
function SimpleBiometrics() {
  const [goal, setGoal] = useState<'loss' | 'muscle' | 'maint'>('muscle')
  const [weight, setWeight] = useState<number>(75)

  // Clear, science-backed calculation
  const baseKcal = Math.round(weight * 24 + 500)
  const targetKcal = goal === 'muscle' ? baseKcal + 350 : goal === 'loss' ? baseKcal - 450 : baseKcal
  const protein = Math.round(weight * (goal === 'muscle' ? 2.2 : goal === 'loss' ? 2.0 : 1.8))
  const carbs = Math.round((targetKcal * 0.45) / 4)
  const fats = Math.round((targetKcal * 0.25) / 9)

  return (
    <div className="space-y-6">
      {/* Goal selection */}
      <div>
        <label className="text-xs font-bold text-dark-200 uppercase tracking-wider block mb-3">
          1. Choose Your Primary Fitness Goal
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { id: 'muscle', label: 'Build Muscle', icon: '💪', sub: '+350 kcal surplus' },
            { id: 'loss', label: 'Burn Fat', icon: '🔥', sub: '-450 kcal deficit' },
            { id: 'maint', label: 'Stay Fit', icon: '⚡', sub: 'Balanced maintenance' },
          ].map((item) => (
            <Card
              key={item.id}
              variant="hover"
              onClick={() => setGoal(item.id as any)}
              className={`p-3.5 text-center cursor-pointer transition-all ${
                goal === item.id
                  ? 'bg-primary-500/20 border-primary-400 text-white shadow-lg shadow-primary-500/15 scale-[1.02]'
                  : 'bg-dark-900/80 border-white/10 text-dark-300 hover:text-white hover:border-white/20'
              }`}
            >
              <div className="text-2xl mb-1.5">{item.icon}</div>
              <div className="text-xs sm:text-sm font-bold text-white leading-tight">{item.label}</div>
              <div className="text-[11px] text-dark-300 mt-1 font-medium">{item.sub}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Weight Slider */}
      <Card variant="static" className="p-4 sm:p-5 space-y-3 bg-dark-900/60 border-white/10">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              2. Your Current Body Weight
            </span>
            <span className="text-[11px] text-dark-300">Drag to test different weights</span>
          </div>
          <span className="text-primary-300 font-bold font-mono text-lg bg-primary-500/15 px-3 py-1 rounded-xl border border-primary-400/30">
            {weight} kg
          </span>
        </div>
        <input
          type="range"
          min="50"
          max="120"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="w-full accent-primary-400 h-2.5 bg-dark-800 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-dark-400 font-mono">
          <span>50 kg</span>
          <span>85 kg</span>
          <span>120 kg</span>
        </div>
      </Card>

      {/* Output Card */}
      <Card variant="premium" className="p-5 sm:p-6 relative overflow-hidden space-y-4 bg-gradient-to-br from-dark-900 via-dark-900/90 to-primary-950/40 border-primary-500/30">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-primary-300 font-bold uppercase tracking-wider">
              Your Recommended Daily Intake
            </div>
            <div className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-1">
              {targetKcal.toLocaleString()}{' '}
              <span className="text-sm sm:text-base text-dark-300 font-normal">calories / day</span>
            </div>
            <div className="text-xs text-dark-300 mt-1">
              {goal === 'muscle'
                ? 'High-protein caloric surplus optimized for maximum lean muscle growth.'
                : goal === 'loss'
                ? 'Steady, sustainable deficit designed to burn body fat while protecting muscle.'
                : 'Balanced caloric target to maintain weight, energy, and overall health.'}
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary-500/20 border border-primary-400/30 flex items-center justify-center text-primary-300 flex-shrink-0">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* 3 Macro Cards with Explanations */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          <div className="p-3 rounded-xl bg-dark-950/80 border border-white/10 text-center">
            <div className="text-[11px] text-primary-300 font-bold uppercase tracking-wider">Protein</div>
            <div className="text-base sm:text-lg font-bold text-white font-mono mt-0.5">{protein}g</div>
            <div className="text-[10px] text-dark-300 mt-0.5 leading-tight">Muscle repair</div>
          </div>
          <div className="p-3 rounded-xl bg-dark-950/80 border border-white/10 text-center">
            <div className="text-[11px] text-energy-300 font-bold uppercase tracking-wider">Carbs</div>
            <div className="text-base sm:text-lg font-bold text-white font-mono mt-0.5">{carbs}g</div>
            <div className="text-[10px] text-dark-300 mt-0.5 leading-tight">Clean gym energy</div>
          </div>
          <div className="p-3 rounded-xl bg-dark-950/80 border border-white/10 text-center">
            <div className="text-[11px] text-coral-300 font-bold uppercase tracking-wider">Healthy Fats</div>
            <div className="text-base sm:text-lg font-bold text-white font-mono mt-0.5">{fats}g</div>
            <div className="text-[10px] text-dark-300 mt-0.5 leading-tight">Hormones & health</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   STEP 2: DELICIOUS CUSTOM MEALS & 1-CLICK SWAPS
   ───────────────────────────────────────────────────────────── */
function SimpleMealPlanner() {
  const [mealSet, setMealSet] = useState<number>(0)
  const [isSwapping, setIsSwapping] = useState(false)

  const mealOptions = [
    [
      { slot: 'Breakfast', name: 'Eggs Shakshuka & Toasted Sourdough', desc: '3 whole eggs poached in fresh tomato-pepper sauce', kcal: 440, p: 32, emoji: '🍳' },
      { slot: 'Lunch', name: 'Algerian Couscous & Grilled Chicken', desc: 'Steamed couscous with lean chicken breast & vegetables', kcal: 680, p: 54, emoji: '🍲' },
      { slot: 'Dinner', name: 'Baked Salmon & Sweet Potato Mash', desc: 'Wild salmon fillet with baked potato and olive oil', kcal: 620, p: 48, emoji: '🥩' },
    ],
    [
      { slot: 'Breakfast', name: 'High-Protein Oatmeal & Whey Shake', desc: 'Rolled oats with dark berries, honey & whey protein', kcal: 450, p: 36, emoji: '🥣' },
      { slot: 'Lunch', name: 'Algerian Chicken Chtitha & Rice', desc: 'Slow-simmered tender chicken breast with chickpeas', kcal: 660, p: 58, emoji: '🍗' },
      { slot: 'Dinner', name: 'Grilled Lean Beef Escalope & Fresh Salad', desc: 'Tender marinated steak strips with olive oil salad', kcal: 610, p: 52, emoji: '🥗' },
    ],
  ]

  const meals = mealOptions[mealSet]

  const handleSwap = () => {
    setIsSwapping(true)
    setTimeout(() => {
      setMealSet((prev) => (prev === 0 ? 1 : 0))
      setIsSwapping(false)
    }, 350)
  }

  const totalKcal = meals.reduce((acc, m) => acc + m.kcal, 0)
  const totalProtein = meals.reduce((acc, m) => acc + m.p, 0)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <div className="text-xs text-dark-300 font-semibold uppercase tracking-wider">Your Daily Balanced Menu</div>
          <div className="text-base font-bold text-white font-mono mt-0.5">
            {totalKcal} total kcal • <span className="text-primary-300">{totalProtein}g Total Protein</span>
          </div>
        </div>
        <Button
          variant="ai"
          size="sm"
          onClick={handleSwap}
          loading={isSwapping}
          className="text-xs gap-2 rounded-full px-4"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>{isSwapping ? 'Regenerating...' : 'Swap All Meals (1-Click)'}</span>
        </Button>
      </div>

      <div className="space-y-2.5">
        {meals.map((meal) => (
          <Card
            key={meal.name}
            variant="hover"
            className="p-4 flex items-center justify-between transition-all bg-dark-900/70 border-white/10"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span className="text-2xl p-2.5 rounded-xl bg-dark-950 border border-white/10 flex-shrink-0">
                {meal.emoji}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <Badge variant="primary" size="sm" className="font-semibold text-[10px] tracking-wide">
                    {meal.slot}
                  </Badge>
                  <span className="text-[11px] text-dark-300 font-mono">
                    {meal.kcal} kcal • <strong className="text-primary-300">{meal.p}g Protein</strong>
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white truncate leading-snug">{meal.name}</div>
                <div className="text-[11px] text-dark-300 truncate mt-0.5">{meal.desc}</div>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-primary-500/15 border border-primary-400/30 flex items-center justify-center text-primary-400 flex-shrink-0 ml-3">
              <Check className="w-4 h-4" />
            </div>
          </Card>
        ))}
      </div>

      <div className="p-3 rounded-xl bg-primary-500/10 border border-primary-400/20 text-xs text-dark-200 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-primary-400 flex-shrink-0" />
        <span>Each meal automatically hits your calculated calories, so you never have to count manually.</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   STEP 3: INSTANT PHOTO PLATE SCANNER
   ───────────────────────────────────────────────────────────── */
function SimpleFoodScanner() {
  const dishes = [
    { name: 'Algerian Couscous & Chicken', kcal: 560, protein: '48g', carbs: '64g', fats: '12g', emoji: '🍲', tag: 'Traditional Dish' },
    { name: 'Fresh Salmon & Avocado Bowl', kcal: 490, protein: '38g', carbs: '26g', fats: '22g', emoji: '🥗', tag: 'Healthy Fats' },
    { name: 'Spiced Eggs Shakshuka', kcal: 420, protein: '32g', carbs: '34g', fats: '16g', emoji: '🍳', tag: 'High Protein Breakfast' },
  ]
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [isScanning, setIsScanning] = useState(false)

  const dish = dishes[selectedIdx]

  const handleSelect = (idx: number) => {
    setIsScanning(true)
    setSelectedIdx(idx)
    setTimeout(() => setIsScanning(false), 350)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-bold text-dark-200 uppercase tracking-wider block mb-2">
          Tap any dish below to test the instant AI camera recognition:
        </label>
        <div className="grid grid-cols-3 gap-2">
          {dishes.map((item, idx) => (
            <Button
              key={idx}
              variant={selectedIdx === idx ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleSelect(idx)}
              className={`text-xs h-auto py-2.5 px-2 flex flex-col gap-1 text-center rounded-xl border ${
                selectedIdx === idx ? 'border-primary-400' : 'border-white/10'
              }`}
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="truncate text-xs font-bold">{item.name.split(' ')[0]}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Viewport Frame */}
      <Card variant="static" className="relative bg-dark-950 p-6 flex flex-col items-center justify-center min-h-[160px] border-coral-400/30 overflow-hidden shadow-inner">
        {isScanning && (
          <div className="absolute inset-x-0 h-1 bg-coral-400 top-0 animate-bounce shadow-[0_0_15px_#f43f5e]" />
        )}
        <div className="text-5xl animate-float-slow mb-2">{dish.emoji}</div>
        <div className="text-base font-bold text-white text-center">{dish.name}</div>
        <div className="text-xs text-coral-300 font-mono mt-1 font-medium">
          Instant Recognition • Verified against Algerian & USDA Food DB
        </div>
      </Card>

      {/* Result pill */}
      <Card variant="static" className="p-3.5 border-coral-400/20 bg-dark-900/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-dark-300 font-medium">Energy: </span>
          <span className="text-white font-bold font-mono text-sm">🔥 {dish.kcal} kcal</span>
        </div>
        <div className="flex gap-2 font-mono">
          <Badge variant="primary" size="sm" className="font-bold">{dish.protein} Protein</Badge>
          <Badge variant="energy" size="sm" className="font-bold">{dish.carbs} Carbs</Badge>
          <Badge variant="coral" size="sm" className="font-bold">{dish.fats} Fats</Badge>
        </div>
      </Card>

      <div className="text-[11px] text-dark-300 text-center">
        No barcode or scale needed. Just take a photo of your lunch or dinner, and it logs automatically.
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   STEP 4: 24/7 AI COACH IN ALGERIAN DARIJA
   ───────────────────────────────────────────────────────────── */
function SimpleAICoach() {
  const presets = [
    {
      q: "Wach nakol mlih ba3d l'entrainement? (Post-workout meal)",
      a: "Saha khouya! Mor l'entrainement, l'mohim houwa 30-40g protein bach t'recupéri: 200g escalope djedj m3a ruz basmati wla batata mghliya. W ida ma3andeksh waqt, dir shake whey protein m3a mouza w tmar! 🍗🍌💪",
      topic: 'Post-Workout Fuel',
    },
    {
      q: "A'tini badil l'escalope rkhiss w fih protein mlih (Affordable protein)",
      a: "Kayen bzaf bdayel rkhissa w bnina f l'marché! 3andek el bayd (3-4 baydat ~24g protein), canned sardine wla tuna b el ma, w el loubia m3a ruz. Kamel rkhiss w fihom protein 3ali l'muscle! 🥚🐟",
      topic: 'Budget Friendly Protein',
    },
    {
      q: "Kifech ntiyah l'karch bla ma nakhsar l'muscle? (Fat loss without muscle loss)",
      a: "Sirr f calorie deficit sghir (-400 kcal) m3a protein 3ali (2g l'koll kg f waznak). Kabbel f l'gym b awzan tqila (progressive overload), w maykoun ghir l'khir! 🏋️‍♂️🔥",
      topic: 'Smart Fat Loss',
    },
  ]
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <div className="space-y-4">
      {/* Prompt pills */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-dark-200 uppercase tracking-wider block">
          Tap any question to ask Coach AI in Algerian Darija (🇩🇿):
        </label>
        <div className="space-y-1.5">
          {presets.map((p, idx) => (
            <Button
              key={idx}
              variant={activeIdx === idx ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setActiveIdx(idx)}
              className={`w-full justify-start text-xs h-auto py-2.5 px-3 text-left transition-all rounded-xl border ${
                activeIdx === idx
                  ? 'border-ai-400/50 bg-ai-500/15 text-white font-semibold'
                  : 'border-white/5 text-dark-300 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span className="truncate">💬 {p.q}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Chat Display Card */}
      <Card variant="static" className="bg-dark-950/90 p-4 sm:p-5 space-y-3.5 border-ai-400/30 rounded-2xl shadow-xl">
        <div className="flex items-center gap-2.5 pb-2.5 border-b border-white/10">
          <div className="w-7 h-7 rounded-lg bg-ai-500/20 border border-ai-400/30 flex items-center justify-center text-ai-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Coach AI</span>
            <span className="text-[10px] text-dark-300">Speaks Algerian Darija (🇩🇿), French & English</span>
          </div>
          <Badge variant="primary" size="sm" dot className="ml-auto font-medium text-[10px]">
            Online 24/7
          </Badge>
        </div>

        <div className="text-xs sm:text-sm text-dark-100 leading-relaxed bg-dark-900/90 p-3.5 rounded-xl border border-white/10 shadow-inner">
          {presets[activeIdx].a}
        </div>

        <div className="flex items-center justify-between text-[11px] text-dark-300 pt-1">
          <span>Topic: <strong className="text-white">{presets[activeIdx].topic}</strong></span>
          <span className="text-ai-300">Instant response in seconds</span>
        </div>
      </Card>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT: UNIFIED WORKFLOW SHOWCASE
   ───────────────────────────────────────────────────────────── */
const tourSteps = [
  {
    id: 'biometrics',
    step: '01',
    title: 'Calculate Your Exact Body Numbers',
    subtitle: 'Step 1 • Personalized Targets',
    desc: 'Answer a few simple questions. Our smart algorithm instantly calculates your ideal daily calories and protein split so you reach your goal with zero guesswork.',
    icon: User,
    badge: 'Step 1 • Body Profiler',
    component: <SimpleBiometrics />,
  },
  {
    id: 'plan',
    step: '02',
    title: 'Get a Delicious Daily Meal Plan',
    subtitle: 'Step 2 • Authentic & Flexible Recipes',
    desc: 'Customized breakfasts, lunches, and dinners calibrated to your macros. Packed with real Algerian favorites and healthy recipes, with 1-click meal swaps.',
    icon: Utensils,
    badge: 'Step 2 • AI Meal Generator',
    component: <SimpleMealPlanner />,
  },
  {
    id: 'scan',
    step: '03',
    title: 'Snap a Photo to Track Any Dish',
    subtitle: 'Step 3 • Instant Plate Scanner',
    desc: 'No more searching through confusing databases or typing numbers. Just point your phone camera at your plate to recognize ingredients and log macros in 2 seconds.',
    icon: Camera,
    badge: 'Step 3 • Camera Food Vision',
    component: <SimpleFoodScanner />,
  },
  {
    id: 'coach',
    step: '04',
    title: 'Chat with Your 24/7 Coach in Algerian Darija',
    subtitle: 'Step 4 • Local Dialect Coaching',
    desc: 'Ask anything in natural Algerian Darija (🇩🇿), French, or English. Get real fitness advice tailored to local grocery markets, affordable protein, and gym routines.',
    icon: MessageSquare,
    badge: 'Step 4 • Darija AI Coach',
    component: <SimpleAICoach />,
  },
]

export function UnifiedWorkflowShowcase() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const handleCustomStep = (e: any) => {
      if (typeof e.detail?.stepIndex === 'number' && e.detail.stepIndex >= 0 && e.detail.stepIndex < tourSteps.length) {
        setActiveStep(e.detail.stepIndex)
      }
    }
    window.addEventListener('select-tour-step', handleCustomStep)
    return () => window.removeEventListener('select-tour-step', handleCustomStep)
  }, [])

  const current = tourSteps[activeStep]
  const IconComponent = current.icon

  return (
    <section id="tour-showcase" className="py-20 bg-dark-950 relative overflow-hidden scroll-mt-24">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-emerald-500/10 via-ai-500/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="container-custom relative space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex justify-center">
            <Badge variant="primary" size="md" glow className="gap-2 px-4 py-1.5 font-medium tracking-wide">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span>Interactive 4-Step Tour</span>
            </Badge>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            See Exactly How NutriSaaS Works <br />
            <span className="text-gradient-hero">In 4 Effortless Steps</span>
          </h2>

          <p className="text-dark-200 text-base sm:text-lg leading-relaxed font-normal">
            Test each tool live below. No signup required — see how easy it is to dial in your nutrition, scan everyday food, and get expert coaching.
          </p>
        </div>

        {/* Unified 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 cols): Step Progress Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {tourSteps.map((s, idx) => {
              const StepIcon = s.icon
              const isActive = activeStep === idx
              return (
                <Card
                  key={s.id}
                  variant={isActive ? 'premium' : 'hover'}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 cursor-pointer transition-all duration-300 ${
                    isActive
                      ? 'border-primary-400/60 bg-primary-950/40 shadow-[0_0_30px_rgba(16,185,129,0.18)]'
                      : 'border-white/10 hover:border-white/20 bg-dark-900/50'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all ${
                        isActive
                          ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-dark-950 shadow-md'
                          : 'bg-dark-800 text-dark-300'
                      }`}
                    >
                      <StepIcon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-mono font-bold text-primary-300 uppercase tracking-wider">
                          STEP {s.step}
                        </span>
                        {isActive && (
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        )}
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white truncate leading-snug">{s.title}</h4>
                      <p className="text-xs text-dark-200 mt-1 line-clamp-2 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Right Column (7 cols): The Focused Interactive Canvas */}
          <div className="lg:col-span-7">
            <Card variant="premium" className="p-6 sm:p-8 shadow-2xl relative overflow-hidden bg-dark-900/90 border-white/10">
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <div>
                  <Badge variant="primary" size="sm" className="mb-2 font-semibold">
                    {current.badge}
                  </Badge>
                  <h3 className="text-lg sm:text-2xl font-display font-extrabold text-white tracking-tight">
                    {current.title}
                  </h3>
                </div>
                <div className="text-xs text-primary-300 font-mono font-bold bg-primary-500/10 px-2.5 py-1 rounded-lg border border-primary-400/20">
                  {current.step} / 04
                </div>
              </div>

              {/* Render Active Step Canvas */}
              <div className="animate-fade-in">
                {current.component}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
