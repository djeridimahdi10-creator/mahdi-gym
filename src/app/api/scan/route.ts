import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { openai as defaultOpenai, isOpenAIConfigured } from '@/lib/openai'

export interface DetectedFoodItem {
  name: string
  calories: number
  portion: string
  confidence: number
  protein: number
  carbs: number
  fat: number
  fiber?: number
}

export interface ScanApiResponse {
  foods: DetectedFoodItem[]
  totalCalories: number
  totalProtein?: number
  totalCarbs?: number
  totalFat?: number
  provider?: string
  warning?: string
}

const defaultScanFallback: ScanApiResponse = {
  provider: 'fallback_estimate',
  warning: 'AI API key not configured on server. Showing standard nutritional estimate.',
  foods: [
    {
      name: 'Balanced Meal Bowl',
      calories: 480,
      portion: '1 bowl (350g)',
      confidence: 0.85,
      protein: 34,
      carbs: 48,
      fat: 14,
      fiber: 6,
    },
    {
      name: 'Fresh Garden Greens & Dressing',
      calories: 95,
      portion: '1 side salad',
      confidence: 0.82,
      protein: 2,
      carbs: 6,
      fat: 7,
      fiber: 3,
    },
  ],
  totalCalories: 575,
  totalProtein: 36,
  totalCarbs: 54,
  totalFat: 21,
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { image, apiKey: clientApiKey } = body

    if (!image) {
      return NextResponse.json(
        { error: 'Image is required' },
        { status: 400 }
      )
    }

    // Determine OpenAI client
    let client: OpenAI | null = null

    if (clientApiKey && typeof clientApiKey === 'string' && clientApiKey.startsWith('sk-')) {
      client = new OpenAI({ apiKey: clientApiKey })
    } else if (isOpenAIConfigured()) {
      client = defaultOpenai
    }

    if (!client) {
      return NextResponse.json(
        {
          ...defaultScanFallback,
          warning: 'Server OpenAI API key is not configured. For free AI scanning, ensure Puter.js is loaded in your browser.',
        },
        { status: 200 }
      )
    }

    // Ensure proper base64 or URL structure
    let imageUrl = image
    if (!image.startsWith('http') && !image.startsWith('data:')) {
      imageUrl = `data:image/jpeg;base64,${image}`
    }

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert AI food and nutrition vision analyst.
Analyze the provided food photo with high precision.
Identify each food component on the plate/dish, estimate portion sizes in grams or standard servings, and calculate accurate calories and macronutrients (protein, carbs, fat, fiber).

Return ONLY valid JSON matching this schema:
{
  "foods": [
    {
      "name": "Food item name (descriptive and specific)",
      "calories": number (estimated kcal),
      "portion": "e.g. 150g or 1 cup",
      "confidence": number between 0.65 and 0.99,
      "protein": number (grams),
      "carbs": number (grams),
      "fat": number (grams),
      "fiber": number (grams)
    }
  ],
  "totalCalories": number (sum of all food calories)
}

Do NOT wrap in markdown formatting or backticks. Return ONLY the raw JSON.`,
        },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
                detail: 'low',
              },
            },
            {
              type: 'text',
              text: 'Identify all food items in this photo, calculate their calorie count and macronutrient breakdown, and return the JSON.',
            },
          ],
        },
      ],
      max_tokens: 1000,
      temperature: 0.2,
    })

    const rawContent = completion.choices[0]?.message?.content || ''

    // Clean JSON content
    const cleaned = rawContent
      .replace(/```(?:json)?/gi, '')
      .replace(/```/g, '')
      .trim()

    const match = cleaned.match(/\{[\s\S]*\}/)
    if (!match) {
      throw new Error('AI did not return valid JSON')
    }

    const parsed = JSON.parse(match[0])
    if (!parsed.foods || !Array.isArray(parsed.foods) || parsed.foods.length === 0) {
      throw new Error('No foods array returned in AI analysis')
    }

    // Sanitize and calculate totals
    const sanitizedFoods: DetectedFoodItem[] = parsed.foods.map((f: Record<string, unknown>) => ({
      name: String(f.name || 'Unknown Food Item'),
      calories: Math.max(0, Math.round(Number(f.calories) || 0)),
      portion: String(f.portion || '1 serving'),
      confidence: Math.min(0.99, Math.max(0.5, Number(f.confidence) || 0.9)),
      protein: Math.max(0, Math.round(Number(f.protein) || 0)),
      carbs: Math.max(0, Math.round(Number(f.carbs) || 0)),
      fat: Math.max(0, Math.round(Number(f.fat) || 0)),
      fiber: Math.max(0, Math.round(Number(f.fiber) || 0)),
    }))

    const totalCalories = parsed.totalCalories
      ? Math.round(Number(parsed.totalCalories))
      : sanitizedFoods.reduce((acc, f) => acc + f.calories, 0)

    const totalProtein = sanitizedFoods.reduce((acc, f) => acc + f.protein, 0)
    const totalCarbs = sanitizedFoods.reduce((acc, f) => acc + f.carbs, 0)
    const totalFat = sanitizedFoods.reduce((acc, f) => acc + f.fat, 0)

    return NextResponse.json({
      foods: sanitizedFoods,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      provider: 'openai_gpt4o_mini',
    })
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Vision scan encountered an issue. Using nutritional estimate.'
    console.error('Scan API error:', error)
    return NextResponse.json(
      {
        ...defaultScanFallback,
        warning: errMsg,
      },
      { status: 200 }
    )
  }
}
