'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Search } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'
import { FoodLibraryLogger } from './FoodLibraryLogger'

export function FoodLibraryModal() {
  const { foodLibraryModalOpen, setModalOpen } = useNutritionStore()

  if (!foodLibraryModalOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setModalOpen('foodlibrary', false)}
        />

        {/* Modal Window */}
        <motion.div
          className="relative w-full max-w-5xl rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl z-10 my-auto"
          style={{
            background: 'linear-gradient(135deg, rgba(6,11,24,0.98) 0%, rgba(12,18,36,0.96) 100%)',
            border: '1px solid rgba(0,240,255,0.3)',
            boxShadow: '0 0 60px rgba(0,240,255,0.1)',
          }}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-[#00F0FF]"
                style={{ background: 'rgba(0,240,255,0.15)', border: '1px solid rgba(0,240,255,0.3)' }}
              >
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Food Library &amp; Calorie Logger
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm">Search any food item, pick portion quantity &amp; add to your day.</p>
              </div>
            </div>

            <button
              onClick={() => setModalOpen('foodlibrary', false)}
              className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content: FoodLibraryLogger */}
          <FoodLibraryLogger isModal onFoodAdded={() => {}} />
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
