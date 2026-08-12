import { NextResponse } from 'next/server'
import { openai, isOpenAIConfigured } from '@/lib/openai'

const defaultScanFallback = {
  foods: [
    {
      name: 'Grilled Salmon Bowl',
      calories: 450,
      portion: '1 bowl (300g)',
      confidence: 0.95,
      protein: 38,
      carbs: 42,
      fat: 16,
    },
    {
      name: 'Steamed Quinoa & Vegetables',
      calories: 180,
      portion: '1 cup',
      confidence: 0.91,
      protein: 6,
      carbs: 32,
      fat: 3,
    },
    {
      name: 'Avocado Slice',
      calories: 80,
      portion: '1/2 medium',
      confidence: 0.88,
      protein: 1,
      carbs: 4,
      fat: 7,
    },
  ],
  totalCalories: 710,
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { image } = body

    if (!image) {
      return NextResponse.json(
        { error: 'Image is required' },
        { status: 400 }
      )
    }

    if (!isOpenAIConfigured()) {
      return NextResponse.json(defaultScanFallback)
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a food recognition AI. Analyze the food in the image and return a JSON response with:
{
  "foods": [
    {
      "name": "food name",
      "calories": estimated_calories,
      "portion": "estimated portion size",
      "confidence": 0.0_to_1.0,
      "protein": grams,
      "carbs": grams,
      "fat": grams
    }
  ],
  "totalCalories": total_calories
}

Be accurate with calorie estimates. Return ONLY the JSON, no other text.`,
        },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: image.startsWith('data:') ? image : `data:image/jpeg;base64,${image}`,
              },
            },
            {
              type: 'text',
              text: 'Analyze this food image. Identify all food items and estimate their calories. Return the JSON response.',
            },
          ],
        },
      ],
      max_tokens: 1000,
    })

    const content = completion.choices[0].message.content || ''

    let result
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found')
      }
    } catch {
      result = defaultScanFallback
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Scan API error fallback:', error)
    return NextResponse.json(defaultScanFallback)
  }
}
