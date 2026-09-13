'use client'

import React from 'react'
import { Cpu, ShieldCheck, Database, Layers, Sparkles, Lock, Zap } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const pipelineSteps = [
  {
    icon: Database,
    title: '1. Raw User Biometrics & Vision Input',
    desc: 'Inputs such as height, weight, activity metrics, and dish photos are tokenized securely.',
    badge: 'Input Layer',
    badgeVariant: 'primary' as const,
  },
  {
    icon: Cpu,
    title: '2. Neural Vision & Metabolic Reasoning',
    desc: 'Deep learning models identify ingredients, estimate density & portions, while Mifflin-St Jeor formulas calculate metabolic demands.',
    badge: 'Processing Core',
    badgeVariant: 'ai' as const,
  },
  {
    icon: Layers,
    title: '3. Nutrition Compendium Cross-Referencing',
    desc: 'Matches ingredients with over 450,000 verified foods from the USDA, Algerian local foods database, and European databases.',
    badge: 'Knowledge Base',
    badgeVariant: 'energy' as const,
  },
  {
    icon: Sparkles,
    title: '4. Dynamic Hyper-Personalized Output',
    desc: 'Instant meal generation, live progressive overload weights, macro progress rings, and multilingual Coach AI responses.',
    badge: 'Delivery Layer',
    badgeVariant: 'success' as const,
  },
]

export function TechArchitectureSection() {
  return (
    <section className="py-24 bg-dark-950/80 relative border-t border-b border-white/5 overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-ai-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container-custom relative space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex justify-center">
            <Badge variant="ai" size="md" glow className="gap-2">
              <Cpu className="w-3.5 h-3.5 text-ai-400" />
              <span>Behind The Scenes</span>
            </Badge>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            How The NutriSaaS AI Pipeline Operates
          </h2>

          <p className="text-dark-300 text-base sm:text-lg leading-relaxed">
            NutriSaaS combines advanced computer vision, clinical metabolic calculations, and large language models into a low-latency, unified pipeline.
          </p>
        </div>

        {/* Pipeline Cards Grid using shadcn Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pipelineSteps.map((step, idx) => {
            const IconComponent = step.icon
            return (
              <Card
                key={idx}
                variant="hover"
                className="p-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-dark-950 border border-white/10 flex items-center justify-center text-white shadow-inner">
                      <IconComponent className="w-5 h-5 text-primary-400" />
                    </div>
                    <Badge variant={step.badgeVariant} size="sm">
                      {step.badge}
                    </Badge>
                  </div>

                  <CardTitle className="text-base font-bold text-white leading-snug">
                    {step.title}
                  </CardTitle>

                  <CardDescription className="text-xs text-dark-300 leading-relaxed">
                    {step.desc}
                  </CardDescription>
                </div>

                <div className="pt-6 flex items-center gap-2 text-[11px] text-dark-500 font-mono">
                  <span>Latency: &lt; 250ms</span>
                  <span>•</span>
                  <span>99.9% Uptime</span>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Security & Privacy Badges Strip using shadcn Card */}
        <Card variant="static" className="p-6 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Enterprise-Grade Privacy & Local Security
              </h4>
              <p className="text-xs text-dark-400 mt-0.5 max-w-xl">
                Your biometrics, gym logs, and photos are encrypted in-transit and at-rest. We never sell or share your private health data with third-party advertisers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" size="md" className="gap-1.5 py-1.5 px-3">
              <Lock className="w-3.5 h-3.5 text-primary-400" /> 256-bit AES Encryption
            </Badge>
            <Badge variant="outline" size="md" className="gap-1.5 py-1.5 px-3">
              <Zap className="w-3.5 h-3.5 text-energy-400" /> Edge Optimized
            </Badge>
          </div>
        </Card>
      </div>
    </section>
  )
}
