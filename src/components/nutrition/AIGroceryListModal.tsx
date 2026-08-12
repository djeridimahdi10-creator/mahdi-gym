'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, Check, Plus, RefreshCw, Copy, CheckCircle2 } from 'lucide-react'
import { useNutritionStore } from '@/stores/nutritionStore'

export function AIGroceryListModal() {
  const { groceryModalOpen, setModalOpen, groceryList, toggleGroceryItem, addGroceryItem, generateGroceryList, foodBudget } = useNutritionStore()
  const [newItemName, setNewItemName] = useState('')
  const [newItemCategory, setNewItemCategory] = useState<'Protein' | 'Carbs' | 'Vegetables' | 'Healthy Fats' | 'Algerian Staples'>('Protein')
  const [copied, setCopied] = useState(false)

  if (!groceryModalOpen) return null

  const categories: ('Protein' | 'Carbs' | 'Vegetables' | 'Healthy Fats' | 'Algerian Staples')[] = [
    'Protein',
    'Carbs',
    'Vegetables',
    'Healthy Fats',
    'Algerian Staples',
  ]

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItemName.trim()) return
    addGroceryItem({ name: newItemName, category: newItemCategory, quantity: '1 pack' })
    setNewItemName('')
  }

  const handleCopyText = () => {
    const text = groceryList
      .map((item) => `[${item.checked ? 'X' : ' '}] ${item.name} (${item.quantity}) - ${item.category}`)
      .join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          className="relative w-full max-w-2xl rounded-3xl p-6 space-y-5 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(12,18,34,0.98) 0%, rgba(8,12,24,0.98) 100%)',
            border: '1px solid rgba(0,240,255,0.3)',
            boxShadow: '0 0 50px rgba(0,240,255,0.1)',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#00F0FF]/15 text-[#00F0FF] flex items-center justify-center border border-[#00F0FF]/30">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  AI Weekly Grocery Generator
                </h2>
                <p className="text-slate-400 text-xs">Structured shopping list tailored to your macro goals & budget ({foodBudget})</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold flex items-center gap-1.5 border border-white/10"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy List'}</span>
              </button>

              <button
                onClick={() => setModalOpen('grocery', false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add custom item form */}
          <form onSubmit={handleAddItem} className="flex gap-2">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Add custom ingredient..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#00F0FF]"
            />
            <select
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value as 'Protein' | 'Carbs' | 'Vegetables' | 'Healthy Fats' | 'Algerian Staples')}
              className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#00F0FF]"
            >
              {categories.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-white">
                  {c}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#00F0FF] text-black font-bold text-xs hover:bg-[#00F0FF]/90 transition-all flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </form>

          {/* Categorized Grocery List */}
          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
            {categories.map((cat) => {
              const catItems = groceryList.filter((i) => i.category === cat)
              if (catItems.length === 0) return null

              return (
                <div key={cat} className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00F0FF]">
                    {cat} ({catItems.length})
                  </span>
                  <div className="space-y-1.5">
                    {catItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleGroceryItem(item.id)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          item.checked
                            ? 'bg-emerald-500/10 border-emerald-500/25 opacity-60'
                            : 'bg-white/[0.03] border-white/[0.07] hover:border-[#00F0FF]/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${
                              item.checked ? 'bg-emerald-500 text-black' : 'border border-white/20'
                            }`}
                          >
                            {item.checked && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <span className={`text-xs font-semibold ${item.checked ? 'line-through text-slate-400' : 'text-white'}`}>
                            {item.name}
                          </span>
                        </div>

                        <span className="text-[11px] font-bold text-slate-400">{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          <button
            onClick={() => generateGroceryList()}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 flex items-center justify-center gap-2 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>Regenerate Grocery List with AI</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
