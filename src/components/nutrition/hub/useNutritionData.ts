'use client'

import { useMemo } from 'react'
import { useNutritionStore } from '@/stores/nutritionStore'

/* Single source of truth for today's intake & adapted targets.
   Every hub tab reads from this so numbers stay consistent. */

export function useNutritionData() {
  const {
    meals,
    waterConsumed,
    waterTarget,
    dailyCalories,
    targetMacros,
    todayWorkout,
  } = useNutritionStore()

  return useMemo(() => {
    const eatenMeals = meals.filter((m) => m.eaten)
    const calories = eatenMeals.reduce((acc, m) => acc + m.totalCalories, 0)
    const protein = eatenMeals.reduce(
      (acc, m) => acc + m.foods.reduce((sum, f) => sum + (f.protein || Math.round((f.calories * 0.28) / 4)), 0),
      0
    )
    const carbs = eatenMeals.reduce(
      (acc, m) => acc + m.foods.reduce((sum, f) => sum + (f.carbs || Math.round((f.calories * 0.42) / 4)), 0),
      0
    )
    const fat = eatenMeals.reduce(
      (acc, m) => acc + m.foods.reduce((sum, f) => sum + (f.fat || Math.round((f.calories * 0.3) / 9)), 0),
      0
    )

    const bonusCal = todayWorkout ? todayWorkout.caloriesBonus : 0
    const bonusProt = todayWorkout ? todayWorkout.proteinBonus : 0

    const targets = {
      calories: dailyCalories + bonusCal,
      protein: targetMacros.protein + bonusProt,
      carbs: targetMacros.carbs + Math.round((bonusCal * 0.5) / 4),
      fat: targetMacros.fat + Math.round((bonusCal * 0.2) / 9),
    }

    const mealsLogged = eatenMeals.length
    const totalMeals = meals.length

    return {
      meals,
      eatenMeals,
      waterConsumed,
      waterTarget,
      todayWorkout,
      intake: { calories, protein, carbs, fat },
      targets,
      baseTargets: { calories: dailyCalories, protein: targetMacros.protein, carbs: targetMacros.carbs, fat: targetMacros.fat },
      remaining: {
        calories: Math.max(0, targets.calories - calories),
        protein: Math.max(0, targets.protein - protein),
        carbs: Math.max(0, targets.carbs - carbs),
        fat: Math.max(0, targets.fat - fat),
      },
      mealsLogged,
      totalMeals,
      waterPct: Math.min(100, (waterConsumed / (waterTarget || 1)) * 100),
      mealsPct: Math.min(100, (mealsLogged / (totalMeals || 1)) * 100),
      calPct: Math.min(100, (calories / (targets.calories || 1)) * 100),
      protPct: Math.min(100, (protein / (targets.protein || 1)) * 100),
      carbPct: Math.min(100, (carbs / (targets.carbs || 1)) * 100),
      fatPct: Math.min(100, (fat / (targets.fat || 1)) * 100),
    }
  }, [meals, waterConsumed, waterTarget, dailyCalories, targetMacros, todayWorkout])
}