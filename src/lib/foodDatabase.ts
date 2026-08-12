export interface FoodItem {
  id: string
  name: string
  nameAr?: string
  category: 'carbs' | 'protein' | 'fat' | 'veg_fruit' | 'algerian'
  caloriesPer100g: number
  proteinPer100g: number
  carbsPer100g: number
  fatPer100g: number
  fiberPer100g?: number
  defaultGrams: number
  servingUnit: string
  emoji: string
}

export const FOOD_DATABASE: FoodItem[] = [
  // ── CARBS ──
  {
    id: 'white-rice',
    name: 'White Rice (Cooked)',
    nameAr: 'أرز أبيض مطبوخ',
    category: 'carbs',
    caloriesPer100g: 130,
    proteinPer100g: 2.7,
    carbsPer100g: 28.2,
    fatPer100g: 0.3,
    defaultGrams: 150,
    servingUnit: 'g',
    emoji: '🍚',
  },
  {
    id: 'brown-rice',
    name: 'Brown Rice (Cooked)',
    nameAr: 'أرز بني مطبوخ',
    category: 'carbs',
    caloriesPer100g: 111,
    proteinPer100g: 2.6,
    carbsPer100g: 23.0,
    fatPer100g: 0.9,
    defaultGrams: 150,
    servingUnit: 'g',
    emoji: '🌾',
  },
  {
    id: 'basmati-rice',
    name: 'Basmati Rice (Cooked)',
    nameAr: 'أرز بسمتي مطبوخ',
    category: 'carbs',
    caloriesPer100g: 121,
    proteinPer100g: 3.5,
    carbsPer100g: 25.0,
    fatPer100g: 0.4,
    defaultGrams: 150,
    servingUnit: 'g',
    emoji: '🍚',
  },
  {
    id: 'rolled-oats',
    name: 'Rolled Oats (Raw/Dry)',
    nameAr: 'شوفان كامل',
    category: 'carbs',
    caloriesPer100g: 389,
    proteinPer100g: 16.9,
    carbsPer100g: 66.3,
    fatPer100g: 6.9,
    defaultGrams: 80,
    servingUnit: 'g',
    emoji: '🥣',
  },
  {
    id: 'sweet-potato',
    name: 'Sweet Potato (Baked)',
    nameAr: 'بطاطا حلوة مقتورة',
    category: 'carbs',
    caloriesPer100g: 90,
    proteinPer100g: 2.0,
    carbsPer100g: 20.7,
    fatPer100g: 0.15,
    defaultGrams: 200,
    servingUnit: 'g',
    emoji: '🍠',
  },
  {
    id: 'white-potato',
    name: 'Boiled Potato',
    nameAr: 'بطاطس مسلوقة',
    category: 'carbs',
    caloriesPer100g: 87,
    proteinPer100g: 1.9,
    carbsPer100g: 20.1,
    fatPer100g: 0.1,
    defaultGrams: 200,
    servingUnit: 'g',
    emoji: '🥔',
  },
  {
    id: 'pasta-whole-wheat',
    name: 'Whole Wheat Pasta (Cooked)',
    nameAr: 'معكرونة القمح الكامل',
    category: 'carbs',
    caloriesPer100g: 124,
    proteinPer100g: 5.3,
    carbsPer100g: 26.5,
    fatPer100g: 0.5,
    defaultGrams: 150,
    servingUnit: 'g',
    emoji: '🍝',
  },
  {
    id: 'couscous-semolina',
    name: 'Couscous Semolina (Cooked)',
    nameAr: 'كسكسي مسلوق',
    category: 'carbs',
    caloriesPer100g: 112,
    proteinPer100g: 3.8,
    carbsPer100g: 23.2,
    fatPer100g: 0.2,
    defaultGrams: 180,
    servingUnit: 'g',
    emoji: '🍲',
  },
  {
    id: 'quinoa-cooked',
    name: 'Quinoa (Cooked)',
    nameAr: 'كينوا مطبوخة',
    category: 'carbs',
    caloriesPer100g: 120,
    proteinPer100g: 4.4,
    carbsPer100g: 21.3,
    fatPer100g: 1.9,
    defaultGrams: 150,
    servingUnit: 'g',
    emoji: '🌱',
  },

  // ── PROTEIN ──
  {
    id: 'chicken-breast',
    name: 'Chicken Breast (Grilled)',
    nameAr: 'صدر دجاج مشوي',
    category: 'protein',
    caloriesPer100g: 165,
    proteinPer100g: 31.0,
    carbsPer100g: 0.0,
    fatPer100g: 3.6,
    defaultGrams: 150,
    servingUnit: 'g',
    emoji: '🍗',
  },
  {
    id: 'beef-steak',
    name: 'Lean Beef Tenderloin',
    nameAr: 'لحم بقر مشوي',
    category: 'protein',
    caloriesPer100g: 217,
    proteinPer100g: 26.1,
    carbsPer100g: 0.0,
    fatPer100g: 11.8,
    defaultGrams: 180,
    servingUnit: 'g',
    emoji: '🥩',
  },
  {
    id: 'salmon-fillet',
    name: 'Fresh Salmon Fillet (Grilled)',
    nameAr: 'سمك سلمون مشوي',
    category: 'protein',
    caloriesPer100g: 206,
    proteinPer100g: 22.1,
    carbsPer100g: 0.0,
    fatPer100g: 12.3,
    defaultGrams: 180,
    servingUnit: 'g',
    emoji: '🐟',
  },
  {
    id: 'canned-tuna',
    name: 'Tuna in Water',
    nameAr: 'تونة بالطبيعي',
    category: 'protein',
    caloriesPer100g: 116,
    proteinPer100g: 26.0,
    carbsPer100g: 0.0,
    fatPer100g: 1.0,
    defaultGrams: 120,
    servingUnit: 'g',
    emoji: '🐟',
  },
  {
    id: 'whole-eggs',
    name: 'Whole Whole Eggs (Boiled/Fried)',
    nameAr: 'بيض كامل',
    category: 'protein',
    caloriesPer100g: 143,
    proteinPer100g: 12.6,
    carbsPer100g: 0.7,
    fatPer100g: 9.5,
    defaultGrams: 100,
    servingUnit: 'g (~2 eggs)',
    emoji: '🍳',
  },
  {
    id: 'egg-whites',
    name: 'Egg Whites',
    nameAr: 'بياض البيض',
    category: 'protein',
    caloriesPer100g: 52,
    proteinPer100g: 11.0,
    carbsPer100g: 0.7,
    fatPer100g: 0.2,
    defaultGrams: 150,
    servingUnit: 'g',
    emoji: '🥚',
  },
  {
    id: 'whey-protein',
    name: 'Whey Protein Isolate Powder',
    nameAr: 'واي بروتين',
    category: 'protein',
    caloriesPer100g: 370,
    proteinPer100g: 80.0,
    carbsPer100g: 4.0,
    fatPer100g: 2.0,
    defaultGrams: 30,
    servingUnit: 'g (1 scoop)',
    emoji: '🥤',
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt (Non-Fat)',
    nameAr: 'زبادي يوناني بدون دسم',
    category: 'protein',
    caloriesPer100g: 59,
    proteinPer100g: 10.2,
    carbsPer100g: 3.6,
    fatPer100g: 0.4,
    defaultGrams: 200,
    servingUnit: 'g',
    emoji: '🥛',
  },
  {
    id: 'cottage-cheese',
    name: 'Cottage Cheese',
    nameAr: 'جبن كوتيج / قريش',
    category: 'protein',
    caloriesPer100g: 98,
    proteinPer100g: 11.1,
    carbsPer100g: 3.4,
    fatPer100g: 4.3,
    defaultGrams: 150,
    servingUnit: 'g',
    emoji: '🧀',
  },

  // ── HEALTHY FATS ──
  {
    id: 'olive-oil',
    name: 'Extra Virgin Olive Oil',
    nameAr: 'زيت زيتون بكر',
    category: 'fat',
    caloriesPer100g: 884,
    proteinPer100g: 0.0,
    carbsPer100g: 0.0,
    fatPer100g: 100.0,
    defaultGrams: 14,
    servingUnit: 'g (1 tbsp)',
    emoji: '🫒',
  },
  {
    id: 'almonds-raw',
    name: 'Raw Almonds',
    nameAr: 'لوز نيء',
    category: 'fat',
    caloriesPer100g: 579,
    proteinPer100g: 21.2,
    carbsPer100g: 21.6,
    fatPer100g: 49.9,
    defaultGrams: 30,
    servingUnit: 'g',
    emoji: '🥜',
  },
  {
    id: 'peanut-butter',
    name: 'Natural Peanut Butter',
    nameAr: 'زبدة الفول السوداني',
    category: 'fat',
    caloriesPer100g: 588,
    proteinPer100g: 25.0,
    carbsPer100g: 20.0,
    fatPer100g: 50.0,
    defaultGrams: 32,
    servingUnit: 'g (2 tbsp)',
    emoji: '🥜',
  },
  {
    id: 'fresh-avocado',
    name: 'Fresh Avocado',
    nameAr: 'أفوكادو طازج',
    category: 'fat',
    caloriesPer100g: 160,
    proteinPer100g: 2.0,
    carbsPer100g: 8.5,
    fatPer100g: 14.7,
    defaultGrams: 100,
    servingUnit: 'g (~half avocado)',
    emoji: '🥑',
  },

  // ── VEGETABLES & FRUITS ──
  {
    id: 'steamed-broccoli',
    name: 'Steamed Broccoli',
    nameAr: 'بروكلي مبخر',
    category: 'veg_fruit',
    caloriesPer100g: 35,
    proteinPer100g: 2.4,
    carbsPer100g: 7.2,
    fatPer100g: 0.4,
    defaultGrams: 150,
    servingUnit: 'g',
    emoji: '🥦',
  },
  {
    id: 'fresh-banana',
    name: 'Fresh Banana',
    nameAr: 'موز طازج',
    category: 'veg_fruit',
    caloriesPer100g: 89,
    proteinPer100g: 1.1,
    carbsPer100g: 22.8,
    fatPer100g: 0.3,
    defaultGrams: 120,
    servingUnit: 'g (1 medium)',
    emoji: '🍌',
  },
  {
    id: 'fresh-apple',
    name: 'Fresh Red/Green Apple',
    nameAr: 'تفاح طازج',
    category: 'veg_fruit',
    caloriesPer100g: 52,
    proteinPer100g: 0.3,
    carbsPer100g: 13.8,
    fatPer100g: 0.2,
    defaultGrams: 150,
    servingUnit: 'g (1 medium)',
    emoji: '🍎',
  },

  // ── ALGERIAN DISHES ──
  {
    id: 'chorba-frik-dish',
    name: 'Chorba Frik (Green Wheat Soup)',
    nameAr: 'شوربة فريك باللحم',
    category: 'algerian',
    caloriesPer100g: 93,
    proteinPer100g: 7.3,
    carbsPer100g: 11.3,
    fatPer100g: 2.3,
    defaultGrams: 300,
    servingUnit: 'g (1 bowl)',
    emoji: '🥣',
  },
  {
    id: 'couscous-poulet-dish',
    name: 'Couscous with Chicken & Vegetables',
    nameAr: 'كسكس بالدجاج والخضار',
    category: 'algerian',
    caloriesPer100g: 165,
    proteinPer100g: 10.8,
    carbsPer100g: 21.7,
    fatPer100g: 4.0,
    defaultGrams: 350,
    servingUnit: 'g (1 plate)',
    emoji: '🍲',
  },
  {
    id: 'rechta-poulet-dish',
    name: 'Rechta with Chicken & Turnips',
    nameAr: 'رشتة بالدجاج واللفت',
    category: 'algerian',
    caloriesPer100g: 163,
    proteinPer100g: 11.0,
    carbsPer100g: 21.5,
    fatPer100g: 3.9,
    defaultGrams: 380,
    servingUnit: 'g (1 plate)',
    emoji: '🍜',
  },
  {
    id: 'garantita-dish',
    name: 'Garantita (Chickpea Bake)',
    nameAr: 'قرنطيطة / كرانطيطة',
    category: 'algerian',
    caloriesPer100g: 160,
    proteinPer100g: 8.0,
    carbsPer100g: 21.0,
    fatPer100g: 5.0,
    defaultGrams: 200,
    servingUnit: 'g (1 portion)',
    emoji: '🧆',
  },
  {
    id: 'mahjouba-dish',
    name: 'Mahjouba (Spicy Crepe)',
    nameAr: 'محجوبة بسكرية',
    category: 'algerian',
    caloriesPer100g: 195,
    proteinPer100g: 5.5,
    carbsPer100g: 29.0,
    fatPer100g: 7.0,
    defaultGrams: 200,
    servingUnit: 'g (2 pieces)',
    emoji: '🥞',
  },
  {
    id: 'tajine-zitoun-dish',
    name: 'Tajine Zitoun (Chicken & Olives)',
    nameAr: 'طاجين الزيتون',
    category: 'algerian',
    caloriesPer100g: 153,
    proteinPer100g: 12.8,
    carbsPer100g: 5.6,
    fatPer100g: 8.7,
    defaultGrams: 320,
    servingUnit: 'g (1 portion)',
    emoji: '🫒',
  },
]

export const DYNAMIC_FOOD_CACHE: FoodItem[] = []

export function getCombinedFoodDatabase(): FoodItem[] {
  return [...DYNAMIC_FOOD_CACHE, ...FOOD_DATABASE]
}

export async function fetchFoodWithAI(query: string): Promise<FoodItem> {
  const trimmed = query.trim()
  if (!trimmed) {
    throw new Error('Query is empty')
  }

  // Check if already in cache or database
  const existing = getCombinedFoodDatabase().find(
    (item) => item.name.toLowerCase() === trimmed.toLowerCase() || (item.nameAr && item.nameAr.toLowerCase() === trimmed.toLowerCase())
  )
  if (existing) {
    return existing
  }

  const res = await fetch('/api/nutrition/ai-lookup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: trimmed }),
  })

  if (!res.ok) {
    throw new Error('Failed to analyze food with AI')
  }

  const data = await res.json()
  const item: FoodItem = data.item

  // Prepend to DYNAMIC_FOOD_CACHE if not present
  if (!DYNAMIC_FOOD_CACHE.some((cached) => cached.id === item.id)) {
    DYNAMIC_FOOD_CACHE.unshift(item)
  }

  return item
}

