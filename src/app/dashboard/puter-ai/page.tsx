'use client'

import { useState } from 'react'
import { Badge, Button } from '@/components/ui'
import {
  Sparkles,
  MessageSquare,
  Image as ImageIcon,
  Eye,
  Volume2,
  Wrench,
  Globe,
  Code2,
  Flame,
  Play,
  Copy,
  Check,
  RefreshCw,
  Zap,
  Bot,
  ExternalLink,
} from 'lucide-react'
import {
  usePuterAI,
  PUTER_MODELS,
  PUTER_IMAGE_MODELS,
  PUTER_TTS_MODELS,
} from '@/hooks/usePuterAI'

type ToolTab =
  | 'text'
  | 'image'
  | 'vision'
  | 'tts'
  | 'tools'
  | 'search'
  | 'codex'
  | 'nutrition'

export default function PuterAIPage() {
  const [activeTab, setActiveTab] = useState<ToolTab>('text')
  const {
    loading,
    error,
    streamingText,
    chatStream,
    generateImageUrl,
    analyzeImage,
    textToSpeech,
    toolCall,
    webSearch,
    createNutritionPlan,
    clearError,
  } = usePuterAI()

  const [copied, setCopied] = useState(false)

  // ── 1. Text Generation State ──
  const [textModel, setTextModel] = useState<string>(PUTER_MODELS.GPT_5_6_SOL)
  const [textPrompt, setTextPrompt] = useState(
    'Write a concise, high-energy motivation speech for fitness and healthy eating.'
  )
  const [textOutput, setTextOutput] = useState('')

  // ── 2. Image Generation State ──
  const [imageModel, setImageModel] = useState<string>(
    PUTER_IMAGE_MODELS.GPT_IMAGE_2
  )
  const [imagePrompt, setImagePrompt] = useState(
    'A ultra-gourmet healthy avocado salmon bowl with macro badges floating in a neon cyber aesthetic'
  )
  const [generatedImgUrl, setGeneratedImgUrl] = useState<string | null>(null)

  // ── 3. Image Analysis (Vision) State ──
  const [visionUrl, setVisionUrl] = useState(
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop'
  )
  const [visionPrompt, setVisionPrompt] = useState(
    'Identify the dish, estimate total calories, and break down protein, carbs, and fat.'
  )
  const [visionOutput, setVisionOutput] = useState('')

  // ── 4. Text-to-Speech State ──
  const [ttsText, setTtsText] = useState(
    'Welcome to NutriSaaS! Powered by Puter.js free and unlimited OpenAI API.'
  )
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  // ── 5. Tool / Function Calling State ──
  const [toolQuery, setToolQuery] = useState('What is 45 multiplied by 18?')
  const [toolResult, setToolResult] = useState<string | null>(null)

  // ── 6. Web Search State ──
  const [searchQuery, setSearchQuery] = useState(
    'What is the User-Pays AI model by Puter?'
  )
  const [searchOutput, setSearchOutput] = useState('')

  // ── 7. Code Generation State ──
  const [codexPrompt, setCodexPrompt] = useState(
    'Write a TypeScript function to calculate total daily energy expenditure (TDEE) using the Mifflin-St Jeor formula.'
  )
  const [codexOutput, setCodexOutput] = useState('')

  // ── 8. Structured Plan Generator State ──
  const [planGoal, setPlanGoal] = useState('gain')
  const [planWeight, setPlanWeight] = useState(75)
  const [planResult, setPlanResult] = useState<Record<string, unknown> | null>(null)

  // ── Copy Helper ──
  const copyText = (val: string) => {
    navigator.clipboard.writeText(val)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // ── Handlers ──
  const handleRunText = async () => {
    setTextOutput('')
    clearError()
    let full = ''
    await chatStream(
      [{ role: 'user', content: textPrompt }],
      (chunk) => {
        full += chunk
        setTextOutput(full)
      },
      { model: textModel }
    )
  }

  const handleRunImage = async () => {
    setGeneratedImgUrl(null)
    clearError()
    const url = await generateImageUrl(imagePrompt, imageModel)
    if (url) setGeneratedImgUrl(url)
  }

  const handleRunVision = async () => {
    setVisionOutput('')
    clearError()
    const result = await analyzeImage(visionUrl, visionPrompt, {
      model: PUTER_MODELS.GPT_5_6_LUNA,
    })
    if (result) setVisionOutput(result)
  }

  const handleRunTTS = async () => {
    setAudioUrl(null)
    clearError()
    const audio = await textToSpeech(ttsText)
    if (audio && audio.src) {
      setAudioUrl(audio.src)
      audio.play().catch(() => {})
    }
  }

  const handleRunTool = async () => {
    setToolResult(null)
    clearError()
    const calcTool = {
      name: 'calculate',
      description: 'Perform basic math operations',
      parameters: {
        type: 'object' as const,
        properties: {
          operation: {
            type: 'string',
            enum: ['add', 'subtract', 'multiply', 'divide'],
          },
          a: { type: 'number' },
          b: { type: 'number' },
        },
        required: ['operation', 'a', 'b'],
      },
    }

    const res = await toolCall(toolQuery, [calcTool])
    if (typeof res === 'object' && res !== null && 'toolName' in res) {
      const args = res.args as { operation: string; a: number; b: number }
      let calcRes = 0
      if (args.operation === 'multiply') calcRes = args.a * args.b
      else if (args.operation === 'add') calcRes = args.a + args.b
      else if (args.operation === 'subtract') calcRes = args.a - args.b
      else if (args.operation === 'divide') calcRes = args.a / args.b

      setToolResult(
        `AI Tool Execution: Called function '${res.toolName}' with arguments (${args.a}, ${args.b}, '${args.operation}') -> Calculated Result = ${calcRes}`
      )
    } else if (typeof res === 'string') {
      setToolResult(res)
    }
  }

  const handleRunSearch = async () => {
    setSearchOutput('')
    clearError()
    const res = await webSearch(searchQuery)
    if (res) setSearchOutput(res)
  }

  const handleRunCodex = async () => {
    setCodexOutput('')
    clearError()
    let full = ''
    await chatStream(
      [{ role: 'user', content: codexPrompt }],
      (chunk) => {
        full += chunk
        setCodexOutput(full)
      },
      { model: PUTER_MODELS.GPT_5_3_CODEX }
    )
  }

  const handleRunPlan = async () => {
    setPlanResult(null)
    clearError()
    const plan = await createNutritionPlan({
      gender: 'male',
      age: 25,
      weight: planWeight,
      height: 180,
      activity_level: 'active',
      goal: planGoal,
    })
    if (plan) setPlanResult(plan as Record<string, unknown>)
  }

  const tabs = [
    { id: 'text', label: 'GPT Models', icon: MessageSquare, badge: '5.6 / 5.5' },
    { id: 'image', label: 'GPT Image', icon: ImageIcon, badge: 'Image Gen' },
    { id: 'vision', label: 'Vision AI', icon: Eye, badge: 'Multimodal' },
    { id: 'tts', label: 'Text-to-Speech', icon: Volume2, badge: 'Audio' },
    { id: 'tools', label: 'Function Calling', icon: Wrench, badge: 'Tools' },
    { id: 'search', label: 'Web Search', icon: Globe, badge: 'Live Web' },
    { id: 'codex', label: 'Codex AI', icon: Code2, badge: 'Code' },
    { id: 'nutrition', label: 'Meal Plan Generator', icon: Flame, badge: 'JSON' },
  ]

  return (
    <div className="w-full space-y-6 pb-20 md:pb-8">
      {/* ── Header ── */}
      <div
        className="relative rounded-3xl overflow-hidden p-5 sm:p-6 animate-slide-up"
        style={{
          background: 'linear-gradient(135deg, rgba(6,4,18,0.98) 0%, rgba(8,14,28,0.96) 100%)',
          border: '1px solid rgba(168,85,247,0.18)',
          boxShadow: '0 0 60px rgba(168,85,247,0.04)',
        }}
      >
        <div className="absolute top-0 right-0 w-56 h-56 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)', transform: 'translate(25%,-35%)' }} />
        <div className="absolute bottom-0 left-1/4 w-40 h-40 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 70%)' }} />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center glow-ring-ai"
              style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(52,211,153,0.2))', border: '1px solid rgba(168,85,247,0.4)', boxShadow: '0 0 30px rgba(168,85,247,0.25)' }}
            >
              <Sparkles className="w-7 h-7 text-ai-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="badge-live" style={{ background: 'rgba(168,85,247,0.1)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.25)' }}>AI Command Bridge</span>
                <Badge variant="ai" size="sm" glow>FREE & UNLIMITED</Badge>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Puter.js OpenAI Suite
              </h1>
              <p className="text-slate-500 text-xs mt-0.5">Zero API Keys · User-Pays Model · Full OpenAI Capability Matrix</p>
            </div>
          </div>

          <a
            href="https://developer.puter.com/tutorials/free-unlimited-openai-api/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ai-300 hover:text-ai-200 transition-all self-start sm:self-auto px-3.5 py-2 rounded-xl"
            style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)' }}
          >
            <span>Puter Docs</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>


      {/* ── Navigation Tabs ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/[0.08]" style={{ scrollbarWidth: 'none' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as ToolTab)
                clearError()
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-ai-600/30 to-primary-600/20 text-white border border-ai-400/40 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-ai-300' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                  isActive ? 'bg-ai-400/20 text-ai-200' : 'bg-white/5 text-slate-500'
                }`}
              >
                {tab.badge}
              </span>
            </button>
          )
        })}
      </div>

      {/* ── Global Error Alert ── */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center justify-between animate-fade-in">
          <span>{error}</span>
          <button onClick={clearError} className="text-xs underline hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* ──────────────── TAB 1: TEXT GENERATION ──────────────── */}
      {activeTab === 'text' && (
        <div className="grid lg:grid-cols-2 gap-6 animate-slide-up">
          <div className="space-y-4 p-5 rounded-2xl bg-dark-800/80 border border-white/10">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-ai-400" />
              Text Generation Setup
            </h2>

            <div>
              <label className="text-xs text-slate-400 font-semibold mb-1.5 block">
                Select Model
              </label>
              <select
                value={textModel}
                onChange={(e) => setTextModel(e.target.value)}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-ai-400"
              >
                <option value={PUTER_MODELS.GPT_5_6_SOL}>GPT-5.6 Sol (Flagship)</option>
                <option value={PUTER_MODELS.GPT_5_6_SOL_PRO}>GPT-5.6 Sol Pro (High Reasoning)</option>
                <option value={PUTER_MODELS.GPT_5_6_TERRA}>GPT-5.6 Terra (Balanced)</option>
                <option value={PUTER_MODELS.GPT_5_6_LUNA}>GPT-5.6 Luna (Ultra Fast & Light)</option>
                <option value={PUTER_MODELS.GPT_5_5}>GPT-5.5</option>
                <option value={PUTER_MODELS.GPT_5_4_NANO}>GPT-5.4 Nano</option>
                <option value={PUTER_MODELS.GPT_OSS_120B}>GPT-OSS 120B (Open Source)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold mb-1.5 block">
                Prompt
              </label>
              <textarea
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
                rows={4}
                className="w-full bg-dark-900 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-ai-400 resize-none"
              />
            </div>

            <Button
              onClick={handleRunText}
              disabled={loading || !textPrompt.trim()}
              className="w-full bg-gradient-to-r from-ai-500 to-purple-600 hover:from-ai-400 hover:to-purple-500 text-white gap-2 font-semibold text-xs py-3"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-white" />}
              Generate Response
            </Button>
          </div>

          <div className="p-5 rounded-2xl bg-dark-800/80 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Output Response</h3>
                {textOutput && (
                  <button
                    onClick={() => copyText(textOutput)}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy
                  </button>
                )}
              </div>
              <div className="bg-dark-950 p-4 rounded-xl border border-white/5 text-slate-200 text-xs leading-relaxed min-h-[180px] whitespace-pre-wrap font-mono">
                {textOutput || streamingText ? (
                  <>
                    {textOutput || streamingText}
                    {loading && <span className="inline-block w-2 h-4 bg-ai-400 ml-1 animate-pulse" />}
                  </>
                ) : (
                  <span className="text-slate-600 italic">Response will appear here in real-time streaming...</span>
                )}
              </div>
            </div>
            <div className="text-[10px] text-slate-500 mt-4 flex items-center gap-2">
              <Zap className="w-3 h-3 text-ai-400" />
              <span>Model: {textModel} · Streaming via puter.ai.chat()</span>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── TAB 2: IMAGE GENERATION ──────────────── */}
      {activeTab === 'image' && (
        <div className="grid lg:grid-cols-2 gap-6 animate-slide-up">
          <div className="space-y-4 p-5 rounded-2xl bg-dark-800/80 border border-white/10">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-ai-400" />
              GPT Image Generator
            </h2>

            <div>
              <label className="text-xs text-slate-400 font-semibold mb-1.5 block">Image Model</label>
              <select
                value={imageModel}
                onChange={(e) => setImageModel(e.target.value)}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-ai-400"
              >
                <option value={PUTER_IMAGE_MODELS.GPT_IMAGE_2}>GPT Image 2 (Highest Quality)</option>
                <option value={PUTER_IMAGE_MODELS.GPT_IMAGE_1_5}>GPT Image 1.5</option>
                <option value={PUTER_IMAGE_MODELS.GPT_IMAGE_1_MINI}>GPT Image 1 Mini (Fast)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold mb-1.5 block">Image Prompt</label>
              <textarea
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                rows={4}
                className="w-full bg-dark-900 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-ai-400 resize-none"
              />
            </div>

            <Button
              onClick={handleRunImage}
              disabled={loading || !imagePrompt.trim()}
              className="w-full bg-gradient-to-r from-ai-500 to-purple-600 hover:from-ai-400 hover:to-purple-500 text-white gap-2 font-semibold text-xs py-3"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Generate Image
            </Button>
          </div>

          <div className="p-5 rounded-2xl bg-dark-800/80 border border-white/10 flex flex-col items-center justify-center min-h-[300px]">
            {loading ? (
              <div className="text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-ai-400 animate-spin mx-auto" />
                <p className="text-xs text-slate-400">Rendering image with {imageModel}...</p>
              </div>
            ) : generatedImgUrl ? (
              <div className="space-y-3 w-full text-center">
                <img
                  src={generatedImgUrl}
                  alt="Generated AI Dish"
                  className="w-full max-h-[350px] object-cover rounded-xl border border-white/10 shadow-2xl"
                />
                <a
                  href={generatedImgUrl}
                  target="_blank"
                  download="puter-ai-image.png"
                  className="inline-block text-xs text-ai-300 hover:underline"
                >
                  Open Full Resolution Image ↗
                </a>
              </div>
            ) : (
              <div className="text-center text-slate-600 text-xs">
                <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <span>Generated image will be displayed here</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ──────────────── TAB 3: VISION & IMAGE ANALYSIS ──────────────── */}
      {activeTab === 'vision' && (
        <div className="grid lg:grid-cols-2 gap-6 animate-slide-up">
          <div className="space-y-4 p-5 rounded-2xl bg-dark-800/80 border border-white/10">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-ai-400" />
              Vision Image Analysis
            </h2>

            <div>
              <label className="text-xs text-slate-400 font-semibold mb-1.5 block">Image URL</label>
              <input
                type="text"
                value={visionUrl}
                onChange={(e) => setVisionUrl(e.target.value)}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-ai-400"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold mb-1.5 block">Analysis Prompt</label>
              <textarea
                value={visionPrompt}
                onChange={(e) => setVisionPrompt(e.target.value)}
                rows={3}
                className="w-full bg-dark-900 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-ai-400 resize-none"
              />
            </div>

            <Button
              onClick={handleRunVision}
              disabled={loading || !visionUrl.trim()}
              className="w-full bg-gradient-to-r from-ai-500 to-purple-600 hover:from-ai-400 hover:to-purple-500 text-white gap-2 font-semibold text-xs py-3"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
              Analyze Image with GPT Vision
            </Button>
          </div>

          <div className="p-5 rounded-2xl bg-dark-800/80 border border-white/10 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Analysis Result</h3>
            <div className="bg-dark-950 p-4 rounded-xl border border-white/5 text-slate-200 text-xs leading-relaxed min-h-[220px] whitespace-pre-wrap font-mono">
              {loading ? (
                <div className="flex items-center gap-2 text-slate-400">
                  <RefreshCw className="w-4 h-4 animate-spin text-ai-400" />
                  <span>Analyzing image content with GPT-5.6 Luna...</span>
                </div>
              ) : visionOutput ? (
                visionOutput
              ) : (
                <span className="text-slate-600 italic">Vision analysis output will appear here...</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── TAB 4: TEXT-TO-SPEECH ──────────────── */}
      {activeTab === 'tts' && (
        <div className="w-full space-y-4 p-6 rounded-2xl bg-dark-800/80 border border-white/10 animate-slide-up">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-ai-400" />
            OpenAI Text-to-Speech (TTS)
          </h2>

          <div>
            <label className="text-xs text-slate-400 font-semibold mb-1.5 block">Text to Speak</label>
            <textarea
              value={ttsText}
              onChange={(e) => setTtsText(e.target.value)}
              rows={4}
              className="w-full bg-dark-900 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-ai-400 resize-none"
            />
          </div>

          <Button
            onClick={handleRunTTS}
            disabled={loading || !ttsText.trim()}
            className="w-full bg-gradient-to-r from-ai-500 to-purple-600 text-white gap-2 font-semibold text-xs py-3"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Volume2 className="w-4 h-4" />}
            Generate & Play Audio
          </Button>

          {audioUrl && (
            <div className="p-4 rounded-xl bg-dark-950 border border-white/10 text-center space-y-2 mt-4">
              <p className="text-xs text-green-400 font-semibold">Audio generated successfully!</p>
              <audio controls src={audioUrl} className="w-full mt-2" />
            </div>
          )}
        </div>
      )}

      {/* ──────────────── TAB 5: FUNCTION / TOOL CALLING ──────────────── */}
      {activeTab === 'tools' && (
        <div className="w-full space-y-4 p-6 rounded-2xl bg-dark-800/80 border border-white/10 animate-slide-up">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-ai-400" />
            GPT Function & Tool Calling
          </h2>

          <p className="text-xs text-slate-400 leading-relaxed">
            The AI automatically decides when to call a registered custom function based on your prompt parameters.
          </p>

          <div>
            <label className="text-xs text-slate-400 font-semibold mb-1.5 block">Prompt for Math Tool</label>
            <input
              type="text"
              value={toolQuery}
              onChange={(e) => setToolQuery(e.target.value)}
              className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-ai-400"
            />
          </div>

          <Button
            onClick={handleRunTool}
            disabled={loading || !toolQuery.trim()}
            className="w-full bg-gradient-to-r from-ai-500 to-purple-600 text-white gap-2 font-semibold text-xs py-3"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wrench className="w-4 h-4" />}
            Execute Function Call
          </Button>

          {toolResult && (
            <div className="p-4 rounded-xl bg-dark-950 border border-ai-500/30 text-xs font-mono text-ai-200 leading-relaxed">
              {toolResult}
            </div>
          )}
        </div>
      )}

      {/* ──────────────── TAB 6: WEB SEARCH ──────────────── */}
      {activeTab === 'search' && (
        <div className="w-full space-y-4 p-6 rounded-2xl bg-dark-800/80 border border-white/10 animate-slide-up">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-ai-400" />
            Live Web Search AI
          </h2>

          <div>
            <label className="text-xs text-slate-400 font-semibold mb-1.5 block">Search Query</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-ai-400"
            />
          </div>

          <Button
            onClick={handleRunSearch}
            disabled={loading || !searchQuery.trim()}
            className="w-full bg-gradient-to-r from-ai-500 to-purple-600 text-white gap-2 font-semibold text-xs py-3"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
            Search Live Web with GPT
          </Button>

          <div className="bg-dark-950 p-4 rounded-xl border border-white/5 text-slate-200 text-xs leading-relaxed min-h-[160px] whitespace-pre-wrap">
            {loading ? (
              <div className="flex items-center gap-2 text-slate-400">
                <RefreshCw className="w-4 h-4 animate-spin text-ai-400" />
                <span>Searching live internet sources via Puter web_search...</span>
              </div>
            ) : searchOutput ? (
              searchOutput
            ) : (
              <span className="text-slate-600 italic">Web search output will appear here...</span>
            )}
          </div>
        </div>
      )}

      {/* ──────────────── TAB 7: CODEX ──────────────── */}
      {activeTab === 'codex' && (
        <div className="w-full space-y-4 p-6 rounded-2xl bg-dark-800/80 border border-white/10 animate-slide-up">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-ai-400" />
            GPT Codex Code Generation
          </h2>

          <div>
            <label className="text-xs text-slate-400 font-semibold mb-1.5 block">Programming Prompt</label>
            <textarea
              value={codexPrompt}
              onChange={(e) => setCodexPrompt(e.target.value)}
              rows={3}
              className="w-full bg-dark-900 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-ai-400 resize-none font-mono"
            />
          </div>

          <Button
            onClick={handleRunCodex}
            disabled={loading || !codexPrompt.trim()}
            className="w-full bg-gradient-to-r from-ai-500 to-purple-600 text-white gap-2 font-semibold text-xs py-3"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Code2 className="w-4 h-4" />}
            Generate Code with Codex
          </Button>

          <div className="bg-dark-950 p-4 rounded-xl border border-white/5 text-emerald-400 text-xs leading-relaxed min-h-[180px] whitespace-pre-wrap font-mono">
            {codexOutput || (
              <span className="text-slate-600 italic">Generated TypeScript / Python code will appear here...</span>
            )}
          </div>
        </div>
      )}

      {/* ──────────────── TAB 8: MEAL PLAN GENERATOR ──────────────── */}
      {activeTab === 'nutrition' && (
        <div className="grid lg:grid-cols-2 gap-6 animate-slide-up">
          <div className="space-y-4 p-5 rounded-2xl bg-dark-800/80 border border-white/10">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-ai-400" />
              JSON Meal Plan Generator
            </h2>

            <div>
              <label className="text-xs text-slate-400 font-semibold mb-1.5 block">Fitness Goal</label>
              <select
                value={planGoal}
                onChange={(e) => setPlanGoal(e.target.value)}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-ai-400"
              >
                <option value="gain">Muscle Gain (+ Caloric Surplus)</option>
                <option value="lose">Fat Loss (- Caloric Deficit)</option>
                <option value="maintain">Maintenance</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold mb-1.5 block">Weight (kg)</label>
              <input
                type="number"
                value={planWeight}
                onChange={(e) => setPlanWeight(Number(e.target.value))}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-ai-400"
              />
            </div>

            <Button
              onClick={handleRunPlan}
              disabled={loading}
              className="w-full bg-gradient-to-r from-ai-500 to-purple-600 text-white gap-2 font-semibold text-xs py-3"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Flame className="w-4 h-4" />}
              Generate Structured JSON Plan
            </Button>
          </div>

          <div className="p-5 rounded-2xl bg-dark-800/80 border border-white/10 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">JSON Response</h3>
            <div className="bg-dark-950 p-4 rounded-xl border border-white/5 text-purple-300 text-xs leading-relaxed min-h-[250px] max-h-[350px] overflow-y-auto whitespace-pre-wrap font-mono">
              {loading ? (
                <div className="flex items-center gap-2 text-slate-400">
                  <RefreshCw className="w-4 h-4 animate-spin text-ai-400" />
                  <span>Calculating macros & generating meal JSON with GPT-5.6...</span>
                </div>
              ) : planResult ? (
                JSON.stringify(planResult, null, 2)
              ) : (
                <span className="text-slate-600 italic">Parsed JSON meal plan output will appear here...</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
