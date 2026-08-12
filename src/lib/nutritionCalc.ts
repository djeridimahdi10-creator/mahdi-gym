import type { Meal } from '@/components/nutrition'

export interface IntakeTotals {
  calories: number
  protein: number
  carbs: number
  fat: number
  mealsLogged: number
  totalMeals: number
}

export function computeIntake(meals: Meal[]): IntakeTotals {
  const eaten = meals.filter((m) => m.eaten)
  const calories = eaten.reduce((acc, m) => acc + m.totalCalories, 0)
  const protein = eaten.reduce(
    (acc, m) => acc + m.foods.reduce((sum, f) => sum + (f.protein || Math.round((f.calories * 0.28) / 4)), 0),
    0
  )
  const carbs = eaten.reduce(
    (acc, m) => acc + m.foods.reduce((sum, f) => sum + (f.carbs || Math.round((f.calories * 0.42) / 4)), 0),
    0
  )
  const fat = eaten.reduce(
    (acc, m) => acc + m.foods.reduce((sum, f) => sum + (f.fat || Math.round((f.calories * 0.3) / 9)), 0),
    0
  )

  return {
    calories,
    protein,
    carbs,
    fat,
    mealsLogged: eaten.length,
    totalMeals: meals.length,
  }
}

export interface AdaptedTargets {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export function computeAdaptedTargets(
  dailyCalories: number,
  targetMacros: { protein: number; carbs: number; fat: number },
  todayWorkout?: { caloriesBonus?: number; proteinBonus?: number } | null
): AdaptedTargets {
  const bonusCal = todayWorkout?.caloriesBonus ?? 0
  const bonusProt = todayWorkout?.proteinBonus ?? 0

  return {
    calories: dailyCalories + bonusCal,
    protein: targetMacros.protein + bonusProt,
    carbs: targetMacros.carbs + Math.round((bonusCal * 0.5) / 4),
    fat: targetMacros.fat + Math.round((bonusCal * 0.2) / 9),
  }
}