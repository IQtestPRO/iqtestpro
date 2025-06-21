export interface QuizQuestion {
  id: string
  type: "multiple-choice" | "pattern" | "logic" | "spatial"
  question: string
  options?: string[]
  correctAnswer: string | number
  timeLimit: number
  difficulty: "easy" | "medium" | "hard" | "extreme"
  cognitiveArea: string
}

export interface QuizResult {
  score: number
  totalQuestions: number
  timeSpent: number
  categoryScores: Record<string, number>
  iqEstimate: number
  level: string
}

export interface UserProgress {
  userId: string
  completedQuizzes: string[]
  scores: QuizResult[]
  premiumAccess: boolean
  createdAt: Date
  updatedAt: Date
}
