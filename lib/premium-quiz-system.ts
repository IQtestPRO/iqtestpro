"use client"

// lib/premium-quiz-system.ts

import { useRouter } from "next/router"

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
