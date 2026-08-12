import { NextResponse } from 'next/server'
import { openai, NUTRITION_SYSTEM_PROMPT, isOpenAIConfigured } from '@/lib/openai'

function getFallbackPlan(weight: number, goal: string) {
  const w = Number(weight) || 75
  const dailyCalories = goal === 'lose' ? 1800 : goal === 'gain' ? 2600 : 2200
  const protein = Math.round(w * (goal === 'gain' ? 2.2 : 2.0))
  const fat = Math.round((dailyCalories * 0.25) / 9)
  const carbs = Math.round((dailyCalories - (protein * 4 + fat * 9)) / 4)

  return {
    dailyCalories,
    macros: { protein, carbs, fat },
    meals: [
      {
        type: 'breakfast',
        time: '7:30 AM',
        foods: [
          { name: 'Oatmeal with Almond Butter & Banana', portion: '1 bowl (80g oats)', calories: 380, protein: 12, carbs: 54, fat: 12 },
          { name: 'Greek Yogurt (0% Fat)', portion: '200g', calories: 120, protein: 20, carbs: 8, fat: 0 },
          { name: 'Fresh Espresso or Black Coffee', portion: '1 cup', calories: 5, protein: 0, carbs: 1, fat: 0 },
        ],
        totalCalories: 505,
      },
      {
        type: 'lunch',
        time: '12:30 PM',
        foods: [
          { name: 'Grilled Herb Chicken Breast', portion: '220g', calories: 360, protein: 48, carbs: 0, fat: 8 },
          { name: 'Brown Jasmine Rice', portion: '1.5 cups cooked', calories: 240, protein: 5, carbs: 50, fat: 2 },
          { name: 'Roasted Mediterranean Vegetables', portion: '150g', calories: 85, protein: 2, carbs: 12, fat: 4 },
        ],
        totalCalories: 685,
      },
      {
        type: 'snack',
        time: '4:00 PM',
        foods: [
          { name: 'Whey Isolate Shake', portion: '1.5 scoops with water', calories: 160, protein: 35, carbs: 3, fat: 1 },
          { name: 'Handful of Mixed Almonds', portion: '25g', calories: 140, protein: 5, carbs: 5, fat: 12 },
        ],
        totalCalories: 300,
      },
      {
        type: 'dinner',
        time: '7:30 PM',
        foods: [
          { name: 'Pan-Seared Salmon Fillet', portion: '200g', calories: 410, protein: 40, carbs: 0, fat: 24 },
          { name: 'Baked Sweet Potato', portion: '1 medium (150g)', calories: 130, protein: 2, carbs: 30, fat: 0 },
          { name: 'Steamed Asparagus with Lemon Juice', portion: '100g', calories: 35, protein: 3, carbs: 4, fat: 0 },
        ],
        totalCalories: 575,
      },
    ],
    tips: [
      'Drink at least 3 to 3.5 Liters of water throughout the day for maximum muscle hydration.',
      'Consume your post-workout meal within 45 minutes for optimal glycogen resynthesis.',
      'Prioritize 7-8 hours of sleep per night to regulate leptin and ghrelin appetite hormones.',
      'Keep sodium and electrolytes balanced when training intensely.',
    ],
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { gender, age, weight, height, activity_level, goal } = body

    if (!gender || !age || !weight || !height || !activity_level || !goal) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!isOpenAIConfigured()) {
      return NextResponse.json({ plan: getFallbackPlan(Number(weight), goal) })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: NUTRITION_SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Generate a personalized nutrition plan for:
- Gender: ${gender}
- Age: ${age} years
- Weight: ${weight} kg
- Height: ${height} cm
- Activity Level: ${activity_level}
- Goal: ${goal}

Please provide the plan in JSON format as specified.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    const content = completion.choices[0].message.content || ''

    let plan
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        plan = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch {
      plan = getFallbackPlan(Number(weight), goal)
    }

    return NextResponse.json({ plan })
  } catch (error) {
    console.error('Nutrition API error fallback:', error)
    let fallbackWeight = 75
    let fallbackGoal = 'maintain'
    try {
      const body = await request.clone().json()
      fallbackWeight = Number(body?.weight) || 75
      fallbackGoal = body?.goal || 'maintain'
    } catch {
      // ignore
    }
    return NextResponse.json({ plan: getFallbackPlan(fallbackWeight, fallbackGoal) })
  }
}
