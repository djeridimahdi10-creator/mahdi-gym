const NUTRITIONIX_BASE = 'https://trackapi.nutritionix.com/v2'

export interface NutritionixFood {
  food_name: string
  serving_qty: number
  serving_unit: string
  serving_weight_grams: number
  nf_calories: number
  nf_protein: number
  nf_total_carbohydrate: number
  nf_total_fat: number
  nf_saturated_fat: number
  nf_sodium: number
  nf_dietary_fiber: number
  nf_sugars: number
}

export interface NutritionixResponse {
  foods: NutritionixFood[]
}

export async function searchNatural(query: string): Promise<NutritionixFood[]> {
  const response = await fetch(`${NUTRITIONIX_BASE}/natural/nutrients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': process.env.NUTRITIONIX_APP_ID!,
      'x-app-key': process.env.NUTRITIONIX_APP_KEY!,
    },
    body: JSON.stringify({ query }),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch nutrition data')
  }

  const data: NutritionixResponse = await response.json()
  return data.foods
}

export async function searchInstant(query: string) {
  const response = await fetch(
    `${NUTRITIONIX_BASE}/search/instant?query=${encodeURIComponent(query)}`,
    {
      headers: {
        'x-app-id': process.env.NUTRITIONIX_APP_ID!,
        'x-app-key': process.env.NUTRITIONIX_APP_KEY!,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Failed to search foods')
  }

  return response.json()
}

export function formatFoodForDisplay(food: NutritionixFood) {
  return {
    name: food.food_name,
    portion: `${food.serving_qty} ${food.serving_unit}`,
    weight: `${food.serving_weight_grams}g`,
    calories: Math.round(food.nf_calories),
    protein: Math.round(food.nf_protein),
    carbs: Math.round(food.nf_total_carbohydrate),
    fat: Math.round(food.nf_total_fat),
    fiber: Math.round(food.nf_dietary_fiber),
    sugar: Math.round(food.nf_sugars),
  }
}
