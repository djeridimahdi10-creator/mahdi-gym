import { NextResponse } from 'next/server'
import { openai, CHAT_SYSTEM_PROMPT, isOpenAIConfigured } from '@/lib/openai'

function getFallbackReply(message: string): string {
  const lower = message.trim().toLowerCase()

  // Greetings
  if (['hello', 'hi', 'hey', 'salam', 'salut', 'bonjour', 'labas', 'slm'].some(g => lower === g || lower.startsWith(g + ' ') || lower.startsWith(g + '!'))) {
    return "Hello! 👋 I'm your AI Nutrition & Fitness Coach powered by Puter.js. How can I help you today? You can ask me for meal plans, macro calculations, workout advice, or talk to me in English, Arabic, or Algerian Darija!"
  }

  // Question about AI / App identity
  if (lower.includes('what is this') || lower.includes('who are you') || lower.includes('what can you do') || lower.includes('chnou')) {
    return "I am NutriSaaS AI Coach! I can analyze your food photos, calculate your daily macros (protein, carbs, fats), generate custom meal plans, recommend gym routines, and give nutrition advice in English, Arabic, and Algerian Darija. What would you like to work on?"
  }

  // Algerian Darija queries
  if (lower.includes('darija') || lower.includes('khouya') || lower.includes('wazn') || lower.includes('sport') || lower.includes('bghit') || lower.includes('nkel') || lower.includes('remel') || lower.includes('labas') || lower.includes('kifach') || lower.includes('mekla')) {
    if (lower.includes('wazn') || lower.includes('remel') || lower.includes('lose')) {
      return 'Ya khouya bghit t' + "'" + 'naqas fel wazn? Koul protine bzaf (djedj, biyd, hout), khallas el carb fel lil, w shrob 3L ma kol yom!'
    }
    if (lower.includes('gain') || lower.includes('zed') || lower.includes('mass')) {
      return 'Saha khouya! Bech tzed fel mass musculaire: 4 meals fel yom, 2g protine per kg, o f el gym bda b compound movements (Squat, Bench, Deadlift) 4-5 marat fel simana.'
    }
    return 'Labas khouya! Ana NutriSaaS AI Coach dyalek. Kifach naqder n' + "'" + 'aawnek alyom fel mekla wla sport?'
  }

  // Specific topics
  if (lower.includes('protein') || lower.includes('high protein')) {
    return 'For optimal muscle synthesis, target 1.6-2.2g of protein per kg of body weight daily. Great sources include chicken breast, egg whites, Greek yogurt, salmon, and whey protein.'
  }
  if (lower.includes('workout') || lower.includes('gym') || lower.includes('routine') || lower.includes('exercise')) {
    return 'A classic 4-day Upper/Lower split works amazingly: Mon (Upper), Tue (Lower), Thu (Upper), Fri (Lower). Focus on progressive overload by increasing weight or reps each week.'
  }
  if (lower.includes('calorie') || lower.includes('deficit') || lower.includes('lose') || lower.includes('fat')) {
    return 'To lose body fat while preserving lean muscle: calculate your TDEE, maintain a 300-500 kcal daily deficit, prioritize protein, and do strength training 3-4x weekly.'
  }
  if (lower.includes('meal') || lower.includes('diet') || lower.includes('food')) {
    return 'A balanced meal structure consists of 40% protein, 40% complex carbs (oats, brown rice, sweet potato), and 20% healthy fats (avocado, olive oil, almonds). Would you like a personalized daily meal schedule?'
  }

  return "I'm here to help with your nutrition and workout goals! You can ask me to create a meal plan, calculate your macro split, give workout tips, or scan your food intake. What are your health goals right now?"
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, history } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (!isOpenAIConfigured()) {
      return NextResponse.json({ reply: getFallbackReply(message) })
    }

    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: CHAT_SYSTEM_PROMPT },
    ]

    if (history && Array.isArray(history)) {
      history.slice(-10).forEach((msg: { role: string; content: string }) => {
        messages.push({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })
      })
    }

    messages.push({ role: 'user', content: message })

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    })

    const reply = completion.choices[0].message.content || getFallbackReply(message)

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Chat API error fallback:', error)
    // Read request payload safely for fallback reply if needed
    try {
      const body = await request.clone().json()
      return NextResponse.json({ reply: getFallbackReply(body?.message || '') })
    } catch {
      return NextResponse.json({ reply: getFallbackReply('') })
    }
  }
}
