import { create } from 'zustand'
import { Meal, MealFood } from '@/components/nutrition'
import { ALGERIAN_FOODS, AlgerianFoodItem } from '@/lib/algerianFoods'

export interface SatietyLog {
  mealIndex: number
  rating: number // 1 (starving) to 5 (extremely full)
  timestamp: string
}

export interface GroceryItem {
  id: string
  name: string
  category: 'Protein' | 'Carbs' | 'Vegetables' | 'Healthy Fats' | 'Algerian Staples'
  quantity: string
  checked: boolean
}

export interface NutritionState {
  // Goals & Base Targets
  dailyCalories: number
  targetMacros: { protein: number; carbs: number; fat: number }
  waterTarget: number // liters
  goalMode: 'cut' | 'maintain' | 'bulk'

  // Preferences
  foodBudget: 'low' | 'medium' | 'flexible'
  algerianFoodPreferred: boolean

  // Workout Split Sync
  todayWorkout: { name: string; isHeavy: number; caloriesBonus: number; proteinBonus: number }

  // Daily Logged Data
  meals: Meal[]
  waterConsumed: number // liters
  satietyLogs: SatietyLog[]

  // Grocery List State
  groceryList: GroceryItem[]

  // Modals & Drawers State
  scannerModalOpen: boolean
  voiceModalOpen: boolean
  replaceMealIndex: number | null
  swapMealIndex: number | null
  restaurantModalOpen: boolean
  groceryModalOpen: boolean
  whatIfModalOpen: boolean
  diagnosticModalOpen: boolean
  askDataDrawerOpen: boolean
  foodLibraryModalOpen: boolean

  // Actions
  setGoalMode: (mode: 'cut' | 'maintain' | 'bulk') => void
  setCustomTargets: (targets: { calories?: number; protein?: number; carbs?: number; fat?: number; waterTarget?: number }) => void
  toggleMealEaten: (index: number) => void
  addMealFood: (mealIndex: number, food: MealFood) => void
  addNewMeal: (meal: Meal) => void
  replaceMeal: (mealIndex: number, newMeal: Meal) => void
  updateWater: (delta: number) => void
  logSatiety: (mealIndex: number, rating: number) => void
  setFoodBudget: (budget: 'low' | 'medium' | 'flexible') => void
  setAlgerianPreferred: (preferred: boolean) => void
  setModalOpen: (modal: string, open: boolean, extraIndex?: number | null) => void
  toggleGroceryItem: (id: string) => void
  addGroceryItem: (item: Omit<GroceryItem, 'id' | 'checked'>) => void
  generateGroceryList: () => void
}

const INITIAL_MEALS: Meal[] = [
  {
    type: 'breakfast',
    time: '7:30 AM',
    totalCalories: 620,
    eaten: true,
    foods: [
      { name: 'Greek Yogurt (Full Fat)', portion: '200g', calories: 190, protein: 18, carbs: 8, fat: 10 },
      { name: 'Oats with Almonds', portion: '80g', calories: 295, protein: 11, carbs: 48, fat: 7 },
      { name: 'Mixed Berries', portion: '150g', calories: 85, protein: 1, carbs: 18, fat: 0 },
      { name: 'Whey Protein Shake', portion: '30g scoop', calories: 120, protein: 24, carbs: 3, fat: 1 },
    ],
  },
  {
    type: 'lunch',
    time: '12:30 PM',
    totalCalories: 780,
    eaten: true,
    foods: [
      { name: 'Grilled Salmon Fillet', portion: '200g', calories: 370, protein: 39, carbs: 0, fat: 22 },
      { name: 'Brown Rice', portion: '150g cooked', calories: 165, protein: 4, carbs: 35, fat: 1 },
      { name: 'Steamed Broccoli', portion: '200g', calories: 70, protein: 5, carbs: 12, fat: 1 },
      { name: 'Olive Oil Dressing', portion: '15ml', calories: 120, protein: 0, carbs: 0, fat: 14 },
    ],
  },
  {
    type: 'snack',
    time: '3:30 PM',
    totalCalories: 340,
    eaten: false,
    foods: [
      { name: 'Cottage Cheese', portion: '150g', calories: 165, protein: 18, carbs: 5, fat: 7 },
      { name: 'Banana', portion: '1 medium', calories: 89, protein: 1, carbs: 23, fat: 0 },
      { name: 'Walnuts', portion: '30g', calories: 196, protein: 4, carbs: 4, fat: 19 },
    ],
  },
  {
    type: 'dinner',
    time: '7:00 PM',
    totalCalories: 850,
    eaten: false,
    foods: [
      { name: 'Chicken Breast (Grilled)', portion: '250g', calories: 415, protein: 54, carbs: 0, fat: 9 },
      { name: 'Sweet Potato Mash', portion: '200g', calories: 172, protein: 3, carbs: 40, fat: 0 },
      { name: 'Asparagus & Herbs', portion: '150g', calories: 34, protein: 3, carbs: 6, fat: 0 },
      { name: 'Olive Oil drizzle', portion: '10ml', calories: 88, protein: 0, carbs: 0, fat: 10 },
    ],
  },
]

const DEFAULT_GROCERY_ITEMS: GroceryItem[] = [
  { id: '1', name: 'Boneless Chicken Breast', category: 'Protein', quantity: '1.5 kg', checked: false },
  { id: '2', name: 'Fresh Salmon Fillets', category: 'Protein', quantity: '600g', checked: true },
  { id: '3', name: 'Whey Protein Isolate', category: 'Protein', quantity: '1 tub (1kg)', checked: false },
  { id: '4', name: 'Brown Jasmine Rice', category: 'Carbs', quantity: '2 kg', checked: false },
  { id: '5', name: 'Sweet Potatoes', category: 'Carbs', quantity: '1.5 kg', checked: true },
  { id: '6', name: 'Organic Rolled Oats', category: 'Carbs', quantity: '1 kg', checked: false },
  { id: '7', name: 'Broccoli & Asparagus', category: 'Vegetables', quantity: '1 kg', checked: false },
  { id: '8', name: 'Chorba Green Wheat Frik', category: 'Algerian Staples', quantity: '500g', checked: false },
  { id: '9', name: 'Artisanal Couscous Semolina', category: 'Algerian Staples', quantity: '1 kg', checked: true },
  { id: '10', name: 'Extra Virgin Olive Oil', category: 'Healthy Fats', quantity: '1 Liter', checked: false },
]

export const useNutritionStore = create<NutritionState>((set, get) => ({
  dailyCalories: 2450,
  targetMacros: { protein: 180, carbs: 240, fat: 70 },
  waterTarget: 3.0,
  goalMode: 'maintain',
  foodBudget: 'medium',
  algerianFoodPreferred: true,

  setGoalMode: (mode) => {
    set(() => {
      if (mode === 'cut') {
        return {
          goalMode: 'cut',
          dailyCalories: 1950,
          targetMacros: { protein: 190, carbs: 165, fat: 58 },
          waterTarget: 3.2,
        }
      }
      if (mode === 'bulk') {
        return {
          goalMode: 'bulk',
          dailyCalories: 2950,
          targetMacros: { protein: 200, carbs: 360, fat: 85 },
          waterTarget: 3.5,
        }
      }
      return {
        goalMode: 'maintain',
        dailyCalories: 2450,
        targetMacros: { protein: 180, carbs: 240, fat: 70 },
        waterTarget: 3.0,
      }
    })
  },

  setCustomTargets: (targets) => {
    set((state) => ({
      dailyCalories: targets.calories ?? state.dailyCalories,
      targetMacros: {
        protein: targets.protein ?? state.targetMacros.protein,
        carbs: targets.carbs ?? state.targetMacros.carbs,
        fat: targets.fat ?? state.targetMacros.fat,
      },
      waterTarget: targets.waterTarget ?? state.waterTarget,
    }))
  },

  todayWorkout: {
    name: 'Legs & Glutes 🔥',
    isHeavy: 1,
    caloriesBonus: 180,
    proteinBonus: 15,
  },

  meals: INITIAL_MEALS,
  waterConsumed: 1.75,
  satietyLogs: [
    { mealIndex: 0, rating: 4, timestamp: '8:10 AM' },
    { mealIndex: 1, rating: 5, timestamp: '1:15 PM' },
  ],
  groceryList: DEFAULT_GROCERY_ITEMS,

  // Modals
  scannerModalOpen: false,
  voiceModalOpen: false,
  replaceMealIndex: null,
  swapMealIndex: null,
  restaurantModalOpen: false,
  groceryModalOpen: false,
  whatIfModalOpen: false,
  diagnosticModalOpen: false,
  askDataDrawerOpen: false,
  foodLibraryModalOpen: false,

  toggleMealEaten: (index) => {
    set((state) => {
      const updated = [...state.meals]
      if (updated[index]) {
        updated[index] = { ...updated[index], eaten: !updated[index].eaten }
      }
      return { meals: updated }
    })
  },

  addMealFood: (mealIndex, food) => {
    set((state) => {
      const updated = [...state.meals]
      if (updated[mealIndex]) {
        const existingFoods = [...updated[mealIndex].foods, food]
        const newTotal = existingFoods.reduce((acc, f) => acc + f.calories, 0)
        updated[mealIndex] = {
          ...updated[mealIndex],
          foods: existingFoods,
          totalCalories: newTotal,
          eaten: true,
        }
      }
      return { meals: updated }
    })
  },

  addNewMeal: (meal) => {
    set((state) => ({
      meals: [...state.meals, meal],
    }))
  },

  replaceMeal: (mealIndex, newMeal) => {
    set((state) => {
      const updated = [...state.meals]
      updated[mealIndex] = newMeal
      return { meals: updated }
    })
  },

  updateWater: (delta) => {
    set((state) => ({
      waterConsumed: Math.max(0, Math.min(8, Math.round((state.waterConsumed + delta) * 100) / 100)),
    }))
  },

  logSatiety: (mealIndex, rating) => {
    set((state) => {
      const filtered = state.satietyLogs.filter((l) => l.mealIndex !== mealIndex)
      return {
        satietyLogs: [
          ...filtered,
          { mealIndex, rating, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        ],
      }
    })
  },

  setFoodBudget: (budget) => set({ foodBudget: budget }),
  setAlgerianPreferred: (preferred) => set({ algerianFoodPreferred: preferred }),

  setModalOpen: (modal, open, extraIndex = null) => {
    set((state) => {
      const next: Partial<NutritionState> = {}
      if (modal === 'scanner') next.scannerModalOpen = open
      if (modal === 'voice') next.voiceModalOpen = open
      if (modal === 'restaurant') next.restaurantModalOpen = open
      if (modal === 'grocery') next.groceryModalOpen = open
      if (modal === 'whatif') next.whatIfModalOpen = open
      if (modal === 'diagnostic') next.diagnosticModalOpen = open
      if (modal === 'askdata') next.askDataDrawerOpen = open
      if (modal === 'foodlibrary' || modal === 'searchfood') next.foodLibraryModalOpen = open
      if (modal === 'replace') next.replaceMealIndex = open ? extraIndex : null
      if (modal === 'swap') next.swapMealIndex = open ? extraIndex : null
      return next
    })
  },

  toggleGroceryItem: (id) => {
    set((state) => ({
      groceryList: state.groceryList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    }))
  },

  addGroceryItem: (item) => {
    set((state) => ({
      groceryList: [
        ...state.groceryList,
        { ...item, id: Date.now().toString(), checked: false },
      ],
    }))
  },

  generateGroceryList: () => {
    set({ groceryList: DEFAULT_GROCERY_ITEMS })
  },
}))
