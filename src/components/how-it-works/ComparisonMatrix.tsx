'use client'

import React from 'react'
import { Check, X, Sparkles, Zap } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface ComparisonRow {
  feature: string
  detail: string
  nutri: boolean | string
  generic: boolean | string
  trainer: boolean | string
}

const comparisonRows: ComparisonRow[] = [
  {
    feature: 'Personalized Daily Meal Plans',
    detail: 'Auto-calculated to match your exact body numbers & fitness goal',
    nutri: true,
    generic: false,
    trainer: 'Manual PDF once a week',
  },
  {
    feature: '1-Click Meal Swaps',
    detail: 'Swap any dish in seconds while keeping your calories perfectly balanced',
    nutri: true,
    generic: false,
    trainer: 'Must text and wait for response',
  },
  {
    feature: 'Photo Plate Food Scanner',
    detail: 'Snap a picture of your dish to detect food and log macros in 2 seconds',
    nutri: true,
    generic: 'Tedious manual barcode typing',
    trainer: false,
  },
  {
    feature: 'Authentic Algerian Food Database',
    detail: 'Accurate nutrition for Couscous, Rechta, Chorba, Shakshuka, Chtitha & more',
    nutri: true,
    generic: 'Missing or inaccurate crowd-sourced data',
    trainer: 'Varies',
  },
  {
    feature: '24/7 AI Coach in Algerian Darija (🇩🇿)',
    detail: 'Instant advice in your dialect on local groceries, workouts & recovery',
    nutri: true,
    generic: false,
    trainer: 'Only during gym hours',
  },
  {
    feature: 'Adaptive Gym & Home Workouts',
    detail: 'Progressive overload suggestions tailored to your strength & available equipment',
    nutri: true,
    generic: 'Locked behind separate paywall',
    trainer: true,
  },
  {
    feature: 'Smart Grocery Shopping List',
    detail: 'Organized ingredient checklist auto-generated from your weekly meal plan',
    nutri: true,
    generic: false,
    trainer: false,
  },
  {
    feature: 'Average Monthly Cost',
    detail: 'Compare the total investment required to get real results',
    nutri: 'Affordable (~$12/mo)',
    generic: 'Freemium ($19/mo with ads)',
    trainer: '$150 – $350 / month',
  },
]

export function ComparisonMatrix() {
  return (
    <section className="py-24 bg-dark-950 relative overflow-hidden">
      <div className="container-custom space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex justify-center">
            <Badge variant="energy" size="md" glow className="gap-2 px-4 py-1.5 font-medium tracking-wide">
              <Sparkles className="w-4 h-4 text-energy-400" />
              <span>Honest Comparison</span>
            </Badge>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            Why NutriSaaS is Built Different <br />
            <span className="text-gradient-hero">Than Generic Apps & Trainers</span>
          </h2>

          <p className="text-dark-200 text-base sm:text-lg leading-relaxed font-normal">
            See how NutriSaaS replaces restrictive diets, clunky US-only calorie apps, and expensive private trainers with one effortless, all-in-one platform.
          </p>
        </div>

        {/* Comparison Table wrapped in shadcn Card */}
        <Card variant="premium" className="p-0 overflow-hidden shadow-2xl border-white/10 bg-dark-900/80">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="border-b border-white/10 bg-dark-950/80">
                  <th className="p-5 sm:p-6 text-sm font-bold text-dark-200 w-2/5 uppercase tracking-wider">
                    Core Capability
                  </th>
                  <th className="p-5 sm:p-6 text-sm font-bold text-primary-300 bg-primary-500/15 border-l border-r border-primary-500/25 w-1/5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4 text-primary-400 fill-primary-400" />
                      <span className="font-extrabold text-white text-base">NutriSaaS AI</span>
                    </div>
                  </th>
                  <th className="p-5 sm:p-6 text-xs sm:text-sm font-bold text-dark-300 w-1/5 text-center uppercase tracking-wider">
                    Generic Trackers
                  </th>
                  <th className="p-5 sm:p-6 text-xs sm:text-sm font-bold text-dark-300 w-1/5 text-center uppercase tracking-wider">
                    Personal Trainer
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-xs sm:text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-white/[0.03] transition-colors"
                  >
                    {/* Feature name & detail */}
                    <td className="p-4 sm:p-5">
                      <div className="font-bold text-white text-sm leading-snug">{row.feature}</div>
                      <div className="text-[11px] sm:text-xs text-dark-300 mt-0.5 leading-relaxed font-normal">
                        {row.detail}
                      </div>
                    </td>

                    {/* NutriSaaS Column */}
                    <td className="p-4 sm:p-5 bg-primary-500/[0.06] border-l border-r border-primary-500/20 text-center font-bold text-primary-300">
                      {row.nutri === true ? (
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      ) : (
                        <span className="text-white font-bold bg-primary-500/20 px-3 py-1 rounded-full border border-primary-400/30 text-xs">
                          {row.nutri}
                        </span>
                      )}
                    </td>

                    {/* Generic Trackers Column */}
                    <td className="p-4 sm:p-5 text-center text-dark-300">
                      {row.generic === false ? (
                        <div className="w-6 h-6 rounded-full bg-dark-800 text-dark-500 flex items-center justify-center mx-auto">
                          <X className="w-3.5 h-3.5" />
                        </div>
                      ) : row.generic === true ? (
                        <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                      ) : (
                        <span className="text-dark-300 text-xs leading-tight block">{row.generic}</span>
                      )}
                    </td>

                    {/* Personal Trainer Column */}
                    <td className="p-4 sm:p-5 text-center text-dark-300">
                      {row.trainer === false ? (
                        <div className="w-6 h-6 rounded-full bg-dark-800 text-dark-500 flex items-center justify-center mx-auto">
                          <X className="w-3.5 h-3.5" />
                        </div>
                      ) : row.trainer === true ? (
                        <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                      ) : (
                        <span className="text-dark-300 text-xs leading-tight block">{row.trainer}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>
  )
}
