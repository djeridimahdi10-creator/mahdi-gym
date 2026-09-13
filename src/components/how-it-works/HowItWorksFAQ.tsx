'use client'

import React, { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'Can I still eat Algerian foods like Couscous and bread while losing weight?',
    answer:
      'Yes, 100%! You never have to starve or give up local food. NutriSaaS calculates healthy portions of Couscous, Chorba, Shakshuka, and Chtitha with high-protein ratios so you make steady progress while eating with family.',
  },
  {
    question: 'How does the photo plate scanner work?',
    answer:
      'Simply point your phone camera at your plate. Our AI recognizes the ingredients (like chicken, rice, vegetables, and sauce) and calculates the calories and protein in under 2 seconds. No manual typing required.',
  },
  {
    question: 'What if I do not like a suggested meal?',
    answer:
      'Every meal has a 1-click "Swap" button. If you do not feel like eating what is recommended, tap swap and the AI instantly generates a delicious alternative with the exact same calories and protein.',
  },
  {
    question: 'How does Coach AI understand Algerian Darija (🇩🇿)?',
    answer:
      'Coach AI speaks fluent Algerian Darija (both Latin Arabizi numbers like 3, 7, 9 and Arabic letters), as well as French and English. You can ask practical questions like "Wach nakol mor l\'gym?" and get instant answers.',
  },
]

export function HowItWorksFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-dark-950 relative overflow-hidden border-t border-white/5">
      <div className="container-custom max-w-3xl space-y-12 mx-auto">
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Badge variant="ai" size="md" glow className="gap-2 px-4 py-1.5 font-medium">
              <HelpCircle className="w-4 h-4 text-ai-400" />
              <span>Got Questions?</span>
            </Badge>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Minimal FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-dark-900/60 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                >
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {faq.question}
                  </h3>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-primary-500/20 text-primary-300 rotate-180'
                        : 'bg-dark-800 text-dark-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-dark-200 leading-relaxed border-t border-white/5 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
