export interface Profile {
  id: string
  full_name: string | null
  gender: 'male' | 'female' | null
  age: number | null
  weight: number | null
  height: number | null
  activity_level: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active' | null
  goal: 'lose' | 'gain' | 'maintain' | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface NutritionPlan {
  id: string
  user_id: string
  plan_data: MealPlanData
  calories_target: number
  protein_target: number
  carbs_target: number
  fat_target: number
  start_date: string
  end_date: string
  status: string
  created_at: string
}

export interface MealPlanData {
  dailyCalories: number
  macros: {
    protein: number
    carbs: number
    fat: number
  }
  meals: Meal[]
  tips: string[]
}

export interface Food {
  name: string
  portion: string
  calories: number
  protein?: number
  carbs?: number
  fat?: number
}

export interface Meal {
  id?: string
  user_id?: string
  plan_id?: string
  type?: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  meal_type?: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  time?: string
  foods: Food[]
  totalCalories?: number
  total_calories?: number
  total_protein?: number
  total_carbs?: number
  total_fat?: number
  image_url?: string
  logged_at?: string
  completed?: boolean
}

export interface FoodScan {
  id: string
  user_id: string
  image_url: string
  detected_foods: DetectedFood[]
  total_calories: number
  confidence: number
  scanned_at: string
}

export interface DetectedFood {
  name: string
  confidence: number
  calories: number
  portion: string
}

export interface ChatMessage {
  id?: string
  role: 'user' | 'assistant'
  content: string
  language?: string
  created_at?: string
}

export interface Workout {
  id: string
  name: string
  muscle_group: string
  description: string
  video_url: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration_minutes: number
  calories_burned: number
}

export interface WorkoutLog {
  id: string
  user_id: string
  workout_id: string
  sets: number
  reps: number
  weight: number | null
  duration_minutes: number
  logged_at: string
}

export interface DailyStats {
  calories: number
  protein: number
  carbs: number
  fat: number
  water: number
  caloriesGoal: number
  proteinGoal: number
  carbsGoal: number
  fatGoal: number
}

export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'legs'
  | 'core'
  | 'glutes'
  | 'full_body'

export const MUSCLE_GROUPS: { value: MuscleGroup; label: string; icon: string }[] = [
  { value: 'chest', label: 'Chest', icon: '💪' },
  { value: 'back', label: 'Back', icon: '🔙' },
  { value: 'shoulders', label: 'Shoulders', icon: '🏋️' },
  { value: 'biceps', label: 'Biceps', icon: '💪' },
  { value: 'triceps', label: 'Triceps', icon: '💪' },
  { value: 'legs', label: 'Legs', icon: '🦵' },
  { value: 'core', label: 'Core', icon: '🎯' },
  { value: 'glutes', label: 'Glutes', icon: '🍑' },
  { value: 'full_body', label: 'Full Body', icon: '🏃' },
]

export const ACTIVITY_LEVELS = [
  { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise' },
  { value: 'light', label: 'Light', description: '1-3 days/week' },
  { value: 'moderate', label: 'Moderate', description: '3-5 days/week' },
  { value: 'active', label: 'Active', description: '6-7 days/week' },
  { value: 'very_active', label: 'Very Active', description: 'Twice a day' },
]

export const GOALS = [
  { value: 'lose', label: 'Lose Weight', icon: '📉', color: 'energy' },
  { value: 'gain', label: 'Gain Muscle', icon: '📈', color: 'primary' },
  { value: 'maintain', label: 'Maintain', icon: '⚖️', color: 'coral' },
]
