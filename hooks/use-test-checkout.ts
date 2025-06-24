"use client"

import { useRouter } from "next/navigation"
import { useCallback } from "react"

interface TestData {
  id?: number
  title?: string
  subtitle?: string
  price?: number
  originalPrice?: number
  questions?: number
  timeLimit?: number
  features?: string[]
  difficulty?: string
  category?: string
  description?: string
}

export function useTestCheckout() {
  const router = useRouter()

  const startTest = useCallback(
    (testData: TestData = {}) => {
      try {
        // Dados padrão para diferentes tipos de teste
        const defaultTests = {
          1: {
            id: 1,
            title: "Raciocínio Espacial",
            subtitle: "Padrões Visuais",
            price: 9.9,
            originalPrice: 24.9,
            questions: 15,
            timeLimit: 15,
            difficulty: "Básico",
            category: "Análise Visual",
            description: "Identifique sequências e complete matrizes visuais com padrões geométricos avançados.",
          },
          2: {
            id: 2,
            title: "Raciocínio Lógico",
            subtitle: "Quebra-cabeças Lógicos",
            price: 19.9,
            originalPrice: 34.9,
            questions: 20,
            timeLimit: 25,
            difficulty: "Intermediário",
            category: "Análise Dedutiva",
            description: "Resolva problemas lógicos complexos usando raciocínio dedutivo e indutivo avançado.",
          },
          3: {
            id: 3,
            title: "Inteligência Fluida",
            subtitle: "Raciocínio Abstrato",
            price: 29.9,
            originalPrice: 79.9,
            questions: 25,
            timeLimit: 35,
            difficulty: "Avançado",
            category: "Cognição Avançada",
            description: "Navegue por desafios abstratos complexos que testam sua capacidade de raciocínio puro.",
          },
          4: {
            id: 4,
            title: "Avaliação Completa",
            subtitle: "Teste Expert",
            price: 49.9,
            originalPrice: 99.9,
            questions: 50,
            timeLimit: 60,
            difficulty: "Expert",
            category: "Análise Multidimensional",
            description: "Avaliação completa de todas as dimensões da inteligência com análise profissional detalhada.",
          },
        }

        // Usar dados fornecidos ou padrão baseado no ID
        const testId = testData.id || 1
        const defaultTest = defaultTests[testId as keyof typeof defaultTests] || defaultTests[1]

        const missionData = {
          ...defaultTest,
          ...testData,
          features: testData.features || [
            "Questões especializadas",
            "Feedback detalhado por questão",
            "Certificado digital personalizado",
            "Análise completa de performance",
          ],
          specializedMode: true,
          detailedFeedback: true,
          comprehensiveAssessment: true,
        }

        localStorage.setItem("selectedMission", JSON.stringify(missionData))

        // Configurar redirecionamento pós-pagamento para o quiz específico
        const postPaymentConfig = {
          redirectTo: `/quiz/${missionData.id}`,
          missionId: missionData.id,
          questions: missionData.questions,
          timeLimit: missionData.timeLimit,
          autoStart: true,
        }

        localStorage.setItem("postPaymentRedirect", JSON.stringify(postPaymentConfig))

        // Redirecionar sempre para a página de checkout
        router.push(
          `/checkout?missionId=${missionData.id}&questions=${missionData.questions}&timeLimit=${missionData.timeLimit}&redirect=quiz`,
        )
      } catch (error) {
        console.error("Error starting test:", error)
        // Fallback para página de checkout mesmo em caso de erro
        router.push(`/checkout?redirect=quiz`)
      }
    },
    [router],
  )

  return { startTest }
}
