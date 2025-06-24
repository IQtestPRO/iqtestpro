"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
)
CardFooter.displayName = "CardFooter"

const handleStartTest = (testData: any) => {
  const router = useRouter()

  try {
    // Salvar dados da missão selecionada no localStorage para usar no checkout
    const missionData = {
      id: testData.id || 1,
      title: testData.title || "Teste de QI",
      subtitle: testData.subtitle || "Avaliação Cognitiva",
      price: testData.price || 9.9,
      originalPrice: testData.originalPrice || 24.9,
      questions: testData.questions || 15,
      timeLimit: testData.timeLimit || 15,
      features: testData.features || [
        "Questões especializadas",
        "Feedback detalhado",
        "Certificado digital",
        "Análise completa",
      ],
      difficulty: testData.difficulty || "Básico",
      category: testData.category || "Avaliação Geral",
      description: testData.description || "Teste de inteligência completo",
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
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, handleStartTest }
