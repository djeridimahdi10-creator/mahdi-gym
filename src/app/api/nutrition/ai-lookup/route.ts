import { NextResponse } from 'next/server'
import { openai, isOpenAIConfigured } from '@/lib/openai'
import { FoodItem } from '@/lib/foodDatabase'

/**
 * Intelligent food science rules for fallback when OpenAI is unconfigured or fails
 */
function generateHeuristicFood(query: string): FoodItem {
  const q = query.toLowerCase().trim()

  let category: FoodItem['category'] = 'carbs'
  let emoji = '🍽️'
  let caloriesPer100g = 150
  let proteinPer100g = 8
  let carbsPer100g = 20
  let fatPer100g = 5
  let defaultGrams = 150
  let servingUnit = 'g (1 portion)'

  // Keyword matching heuristics
  if (q.includes('chicken') || q.includes('djedj') || q.includes('poulet') || q.includes('turkey') || q.includes('steak') || q.includes('beef') || q.includes('meat') || q.includes('lhamb') || q.includes('viande')) {
    category = 'protein'
    emoji = q.includes('chicken') || q.includes('poulet') ? '🍗' : '🥩'
    caloriesPer100g = 190
    proteinPer100g = 26
    carbsPer100g = 1
    fatPer100g = 8
    defaultGrams = 180
    servingUnit = 'g'
  } else if (q.includes('fish') || q.includes('salmon') || q.includes('tuna') || q.includes('shrimp') || q.includes('hout') || q.includes('seafood')) {
    category = 'protein'
    emoji = '🐟'
    caloriesPer100g = 160
    proteinPer100g = 24
    carbsPer100g = 0
    fatPer100g = 7
    defaultGrams = 160
  } else if (q.includes('egg') || q.includes('biyd') || q.includes('oeuf') || q.includes('omelette')) {
    category = 'protein'
    emoji = '🍳'
    caloriesPer100g = 145
    proteinPer100g = 13
    carbsPer100g = 1
    fatPer100g = 10
    defaultGrams = 120
    servingUnit = 'g (~2 eggs)'
  } else if (q.includes('shawarma') || q.includes('chawarma') || q.includes('kebab') || q.includes('tacos') || q.includes('burger') || q.includes('sandwich')) {
    category = 'protein'
    emoji = q.includes('burger') ? '🍔' : q.includes('tacos') ? '🌮' : '🌯'
    caloriesPer100g = 225
    proteinPer100g = 14
    carbsPer100g = 24
    fatPer100g = 9
    defaultGrams = 250
    servingUnit = 'g (1 sandwich)'
  } else if (q.includes('pizza')) {
    category = 'carbs'
    emoji = '🍕'
    caloriesPer100g = 266
    proteinPer100g = 11
    carbsPer100g = 33
    fatPer100g = 10
    defaultGrams = 200
    servingUnit = 'g (2 slices)'
  } else if (q.includes('sushi') || q.includes('roll')) {
    category = 'carbs'
    emoji = '🍱'
    caloriesPer100g = 145
    proteinPer100g = 6
    carbsPer100g = 28
    fatPer100g = 2
    defaultGrams = 180
    servingUnit = 'g (6 pieces)'
  } else if (q.includes('rice') || q.includes('arz') || q.includes('riz') || q.includes('oats') || q.includes('pasta') || q.includes('spaghetti') || q.includes('bread') || q.includes('khobz') || q.includes('noodle')) {
    category = 'carbs'
    emoji = q.includes('rice') || q.includes('riz') ? '🍚' : q.includes('pasta') ? '🍝' : '🍞'
    caloriesPer100g = 135
    proteinPer100g = 4
    carbsPer100g = 28
    fatPer100g = 1
    defaultGrams = 150
  } else if (q.includes('chorba') || q.includes('soup') || q.includes('harira') || q.includes('brik') || q.includes('bourek') || q.includes('couscous') || q.includes('rechta') || q.includes('chakhchoukha') || q.includes('garantita') || q.includes('mahjouba') || q.includes('tajine')) {
    category = 'algerian'
    emoji = q.includes('soup') || q.includes('chorba') ? '🥣' : q.includes('garantita') ? '🧆' : '🍲'
    caloriesPer100g = 160
    proteinPer100g = 9
    carbsPer100g = 21
    fatPer100g = 5
    defaultGrams = 250
    servingUnit = 'g (1 dish)'
  } else if (q.includes('salad') || q.includes('slata') || q.includes('broccoli') || q.includes('apple') || q.includes('banana') || q.includes('fruit') || q.includes('berry') || q.includes('orange')) {
    category = 'veg_fruit'
    emoji = q.includes('banana') ? '🍌' : q.includes('apple') ? '🍎' : '🥗'
    caloriesPer100g = 55
    proteinPer100g = 1.5
    carbsPer100g = 12
    fatPer100g = 0.4
    defaultGrams = 150
  } else if (q.includes('oil') || q.includes('nut') || q.includes('almond') || q.includes('avocado') || q.includes('butter') || q.includes('zayt')) {
    category = 'fat'
    emoji = q.includes('avocado') ? '🥑' : q.includes('oil') ? '🫒' : '🥜'
    caloriesPer100g = 450
    proteinPer100g = 12
    carbsPer100g = 15
    fatPer100g = 40
    defaultGrams = 30
  }

  // Format clean capitalized name
  const formattedName = query
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')

  return {
    id: `ai-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: `${formattedName} (AI Analyzed)`,
    category,
    caloriesPer100g,
    proteinPer100g,
    carbsPer100g,
    fatPer100g,
    fiberPer100g: 2,
    defaultGrams,
    servingUnit,
    emoji,
  }
}

export async function POST(request: Request) {
  try {
    const { query } = await request.json()

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 })
    }

    if (!isOpenAIConfigured()) {
      const fallbackItem = generateHeuristicFood(query)
      return NextResponse.json({ item: fallbackItem, source: 'ai_heuristics' })
    }

    const prompt = `You are a world-class nutritionist and food database indexer.
Analyze the user's food query: "${query}" (could be a dish, packaged food, Algerian dish, or international meal).
Return a valid JSON object representing the nutritional values PER 100 GRAMS with this structure:

{
  "name": "Proper English Name of Food",
  "nameAr": "اسم الطعام بالعربية if applicable",
  "category": "carbs" | "protein" | "fat" | "veg_fruit" | "algerian",
  "caloriesPer100g": number (integer kcal per 100g),
  "proteinPer100g": number (grams of protein per 100g),
  "carbsPer100g": number (grams of carbs per 100g),
  "fatPer100g": number (grams of fat per 100g),
  "fiberPer100g": number (grams of dietary fiber per 100g),
  "defaultGrams": number (typical serving portion in grams, e.g. 150 or 250),
  "servingUnit": "g" or "g (1 portion)" or "g (1 piece)",
  "emoji": "single relevant food emoji"
}

Ensure all values are accurate for 100 grams of prepared/cooked food. Respond ONLY with valid raw JSON.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      max_tokens: 300,
    })

    const rawText = completion.choices[0].message.content || ''
    const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim()
    const parsed = JSON.parse(cleanJson)

    const foodItem: FoodItem = {
      id: `ai-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: parsed.name || query,
      nameAr: parsed.nameAr,
      category: parsed.category || 'carbs',
      caloriesPer100g: Math.round(parsed.caloriesPer100g || 150),
      proteinPer100g: Math.round((parsed.proteinPer100g || 5) * 10) / 10,
      carbsPer100g: Math.round((parsed.carbsPer100g || 20) * 10) / 10,
      fatPer100g: Math.round((parsed.fatPer100g || 4) * 10) / 10,
      fiberPer100g: Math.round((parsed.fiberPer100g || 2) * 10) / 10,
      defaultGrams: parsed.defaultGrams || 150,
      servingUnit: parsed.servingUnit || 'g',
      emoji: parsed.emoji || '✨',
    }

    return NextResponse.json({ item: foodItem, source: 'openai' })
  } catch (err) {
    console.error('AI food lookup error, falling back to heuristics:', err)
    try {
      const { query } = await request.clone().json()
      return NextResponse.json({ item: generateHeuristicFood(query || 'custom food'), source: 'ai_heuristics' })
    } catch {
      return NextResponse.json({ item: generateHeuristicFood('custom food'), source: 'ai_heuristics' })
    }
  }
}
