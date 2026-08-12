'use client'

import { useMemo } from 'react'
import { useNutritionStore } from '@/stores/nutritionStore'

/** Single source of truth for today's intake + adaptive targets. */
export function useTodayIntake() {
  const meals = useNutritionStore((s) => s.meals)
  const dailyCalories = useNutritionStore((s) => s.dailyCalories)
  const targetMacros = useNutritionStore((s) => s.targetMacros)
  const waterConsumed = useNutritionStore((s) => s.waterConsumed)
  const waterTarget = useNutritionStore((s) => s.waterTarget)
  const todayWorkout = useNutritionStore((s) => s.todayWorkout)

  return useMemo(() => {
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

    const bonusCal = todayWorkout ? todayWorkout.caloriesBonus : 0
    const bonusProt = todayWorkout ? todayWorkout.proteinBonus : 0

    const adaptedCalories = dailyCalories + bonusCal
    const adaptedProtein = targetMacros.protein + bonusProt
    const adaptedCarbs = targetMacros.carbs + Math.round((bonusCal * 0.5) / 4)
    const adaptedFat = targetMacros.fat + Math.round((bonusCal * 0.2) / 9)

    return {
      meals,
      mealsLogged: eaten.length,
      totalMeals: meals.length,
      calories,
      protein,
      carbs,
      fat,
      water: { current: waterConsumed, target: waterTarget },
      targets: {
        calories: adaptedCalories,
        protein: adaptedProtein,
        carbs: adaptedCarbs,
        fat: adaptedFat,
        baseCalories: dailyCalories,
      },
      bonus: { calories: bonusCal, protein: bonusProt },
      todayWorkout,
    }
  }, [meals, dailyCalories, targetMacros, waterConsumed, waterTarget, todayWorkout])
}