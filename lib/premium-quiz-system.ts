"use client"

// lib/premium-quiz-system.ts

import { useRouter } from "next/router"

export interface QuizQuestion {
  id: string
  type: "multiple-choice" | "true-false" | "numerical" | "spatial"
  category: string
  question: string
  options?: string[]
  correctAnswer: number | string
  timeLimit: number
  difficulty: 1 | 2 | 3 | 4 | 5
  explanation: string
  points: number
}

export interface QuizLevel {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  duration: number
  questionCount: number
  difficulty: "Básico" | "Intermediário" | "Avançado" | "Expert"
  icon: string
  gradient: string
  questions: QuizQuestion[]
}

// Sistema de questões específicas para cada nível
export const PREMIUM_QUIZ_LEVELS: Record<string, QuizLevel> = {
  spatial: {
    id: "spatial",
    name: "Raciocínio Espacial",
    description: "Teste sua capacidade de visualização e manipulação mental de objetos no espaço",
    price: 14.9,
    originalPrice: 24.9,
    duration: 15,
    questionCount: 15,
    difficulty: "Básico",
    icon: "🧩",
    gradient: "from-blue-600 to-cyan-500",
    questions: [
      {
        id: "spatial_001",
        type: "multiple-choice",
        category: "Rotação Mental",
        question: "Se você girar esta figura 90° no sentido horário: ↑, ela ficará:",
        options: ["→", "↓", "←", "↑"],
        correctAnswer: 0,
        timeLimit: 45,
        difficulty: 1,
        explanation: "Uma rotação de 90° no sentido horário transforma ↑ em →",
        points: 10,
      },
      // Add more questions...
    ],
  },

  logical: {
    id: "logical",
    name: "Raciocínio Lógico",
    description: "Desenvolva seu pensamento crítico e habilidades de resolução de problemas",
    price: 19.9,
    originalPrice: 34.9,
    duration: 25,
    questionCount: 20,
    difficulty: "Intermediário",
    icon: "🧠",
    gradient: "from-purple-600 to-indigo-500",
    questions: [
      {
        id: "logical_001",
        type: "multiple-choice",
        category: "Silogismos",
        question: "Se todos os A são B, e alguns B são C, então:",
        options: ["Todos os A são C", "Alguns A podem ser C", "Nenhum A é C", "Todos os C são A"],
        correctAnswer: 1,
        timeLimit: 90,
        difficulty: 3,
        explanation: "A lógica permite que alguns A sejam C, mas não garante que todos sejam",
        points: 20,
      },
      // Add more questions...
    ],
  },

  abstract: {
    id: "abstract",
    name: "Inteligência Fluida",
    description: "Teste sua capacidade de raciocínio abstrato e resolução de problemas novos",
    price: 39.9,
    originalPrice: 79.9,
    duration: 35,
    questionCount: 25,
    difficulty: "Avançado",
    icon: "🎯",
    gradient: "from-amber-600 to-red-500",
    questions: [
      {
        id: "abstract_001",
        type: "multiple-choice",
        category: "Matrizes",
        question: "Na matriz 3x3, qual elemento falta na posição inferior direita?",
        options: ["↑", "→", "↓", "←"],
        correctAnswer: 2,
        timeLimit: 180,
        difficulty: 4,
        explanation: "Seguindo o padrão de rotação 90° horário",
        points: 25,
      },
      // Add more questions...
    ],
  },

  expert: {
    id: "expert",
    name: "Avaliação Completa",
    description: "Teste multidimensional completo de todas as áreas da inteligência",
    price: 59.9,
    originalPrice: 99.9,
    duration: 60,
    questionCount: 50,
    difficulty: "Expert",
    icon: "👑",
    gradient: "from-emerald-600 to-cyan-600",
    questions: [
      {
        id: "expert_001",
        type: "multiple-choice",
        category: "Funções",
        question: "Se f(x) = 2x + 1 e g(x) = x², qual é f(g(3))?",
        options: ["19", "18", "17", "20"],
        correctAnswer: 0,
        timeLimit: 180,
        difficulty: 5,
        explanation: "g(3) = 9, então f(9) = 2(9) + 1 = 19",
        points: 30,
      },
      // Add more questions...
    ],
  },
}

export class PremiumQuizEngine {
  private quizId: string
  private questions: QuizQuestion[]
  private currentIndex = 0
  private answers: (number | string | null)[] = []
  private startTime = Date.now()
  private timeSpent = 0

  constructor(quizId: string) {
    this.quizId = quizId
    const quizLevel = PREMIUM_QUIZ_LEVELS[quizId]
    if (!quizLevel) {
      throw new Error(`Quiz level ${quizId} not found`)
    }
    this.questions = this.shuffleQuestions(quizLevel.questions)
    this.answers = new Array(this.questions.length).fill(null)
  }

  private shuffleQuestions(questions: QuizQuestion[]): QuizQuestion[] {
    const shuffled = [...questions]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  getCurrentQuestion(): QuizQuestion | null {
    return this.questions[this.currentIndex] || null
  }

  submitAnswer(answer: number | string): void {
    this.answers[this.currentIndex] = answer
  }

  nextQuestion(): boolean {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++
      return true
    }
    return false
  }

  previousQuestion(): boolean {
    if (this.currentIndex > 0) {
      this.currentIndex--
      return true
    }
    return false
  }

  calculateResults(): {
    score: number
    iqEstimate: number
    correctAnswers: number
    totalQuestions: number
    timeSpent: number
    categoryBreakdown: Record<string, { correct: number; total: number; percentage: number }>
    percentile: number
    level: string
  } {
    this.timeSpent = Math.round((Date.now() - this.startTime) / 1000)

    let correctAnswers = 0
    let totalPoints = 0
    let earnedPoints = 0
    const categoryStats: Record<string, { correct: number; total: number }> = {}

    this.questions.forEach((question, index) => {
      const userAnswer = this.answers[index]
      const isCorrect = userAnswer === question.correctAnswer

      if (isCorrect) {
        correctAnswers++
        earnedPoints += question.points
      }

      totalPoints += question.points

      if (!categoryStats[question.category]) {
        categoryStats[question.category] = { correct: 0, total: 0 }
      }
      categoryStats[question.category].total++
      if (isCorrect) {
        categoryStats[question.category].correct++
      }
    })

    const score = Math.round((earnedPoints / totalPoints) * 100)
    const iqEstimate = this.calculateIQ(score, this.quizId)
    const percentile = this.calculatePercentile(iqEstimate)

    const categoryBreakdown: Record<string, { correct: number; total: number; percentage: number }> = {}
    Object.entries(categoryStats).forEach(([category, stats]) => {
      categoryBreakdown[category] = {
        ...stats,
        percentage: Math.round((stats.correct / stats.total) * 100),
      }
    })

    return {
      score,
      iqEstimate,
      correctAnswers,
      totalQuestions: this.questions.length,
      timeSpent: this.timeSpent,
      categoryBreakdown,
      percentile,
      level: this.quizId,
    }
  }

  private calculateIQ(score: number, level: string): number {
    const baseIQ = 100
    const levelMultipliers = {
      spatial: 0.8,
      logical: 1.0,
      abstract: 1.3,
      expert: 1.6,
    }

    const multiplier = levelMultipliers[level as keyof typeof levelMultipliers] || 1.0
    const iqEstimate = baseIQ + (score - 50) * multiplier * 0.6

    return Math.max(70, Math.min(200, Math.round(iqEstimate)))
  }

  private calculatePercentile(iq: number): number {
    // Distribuição normal com média 100 e desvio padrão 15
    const mean = 100
    const stdDev = 15
    const z = (iq - mean) / stdDev

    // Aproximação da função de distribuição cumulativa normal
    const percentile = Math.round(this.normalCDF(z) * 100)
    return Math.max(1, Math.min(99, percentile))
  }

  private normalCDF(z: number): number {
    const sign = z >= 0 ? 1 : -1
    z = Math.abs(z)

    const a1 = 0.254829592
    const a2 = -0.284496736
    const a3 = 1.421413741
    const a4 = -1.453152027
    const a5 = 1.061405429
    const p = 0.3275911

    const t = 1.0 / (1.0 + p * z)
    const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-z * z)
    )

    return 0.5 * (1.0 + sign * y)
  }
  \
  getProgress(): { current: number; total: number; percentage: number } {
    return {
      current: this.currentIndex + 1,
      total: this.questions.length,
      percentage: Math.round(((this.currentIndex + 1) / this.questions.length) * 100),
    }
  }
}

// Sistema de verificação de acesso premium
export function checkPremiumAccess() {
  const testPaid = localStorage.getItem("testPaid")
  const allQuizzesUnlocked = localStorage.getItem("allQuizzesUnlocked")

  return {
    hasAccess: testPaid === "true" || allQuizzesUnlocked === "true",
    isPaid: testPaid === "true",
    unlockedAt: localStorage.getItem("unlockedAt"),
  }
}

export function unlockAllQuizzes(): void {
  localStorage.setItem("testPaid", "true")
  localStorage.setItem("allQuizzesUnlocked", "true")
  localStorage.setItem("unlockedAt", new Date().toISOString())
}

export const startPremiumQuiz = (quizId: string) => {
  const router = useRouter()
  router.push(`/premium-quiz/${quizId}`)
}

export const goToPremiumQuizQuestion = (quizId: string, questionId: string) => {
  const router = useRouter()
  router.push(`/premium-quiz/${quizId}/question/${questionId}`)
}

export const goToPremiumQuizResults = (quizId: string) => {
  const router = useRouter()
  router.push(`/premium-quiz/${quizId}/results`)
}

export const usePremiumQuizNavigation = () => {
  const router = useRouter()

  const startQuiz = (quizId: string) => {
    router.push(`/premium-quiz/${quizId}`)
  }

  const goToQuestion = (quizId: string, questionId: string) => {
    router.push(`/premium-quiz/${quizId}/question/${questionId}`)
  }

  const goToResults = (quizId: string) => {
    router.push(`/premium-quiz/${quizId}/results`)
  }

  return { startQuiz, goToQuestion, goToResults }
}
