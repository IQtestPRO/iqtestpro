"use client"

import type React from "react"
import {
  Eye,
  Brain,
  Puzzle,
  Target,
  Crown,
  Star,
  Trophy,
  ChevronRight,
  CheckCircle,
  Zap,
  Award,
  Clock,
  Sparkles,
  Gift,
  Lock,
} from "lucide-react"
import { QuestionTypeModal } from "@/components/question-type-modal"
import { PremiumPaymentModal } from "@/components/premium-payment-modal"
import { Button } from "@/components/ui/button"
import { useInteractivePopups } from "@/components/interactive-preview-popups"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { usePayment } from "@/contexts/payment-context"

interface PreviewQuestion {
  id: number
  title: string
  subtitle: string
  category: string
  icon: React.ReactNode
  backgroundPattern: React.ReactNode
  description: string
  difficulty: "Básico" | "Intermediário" | "Avançado" | "Expert"
  difficultyLevel: number
  timeEstimate: string
  gradientClasses: {
    bg: string
    text: string
    badgeBg: string
    badgeText: string
    accent: string
  }
  price: number
  originalPrice?: number
  questions: number
  timeLimit: number
  features: string[]
  mainBenefits: string[]
  extraBenefits: number
}

// Sistema de Validação de Recompensas e Testes
interface TestValidationSchema {
  id: number
  rank: "NOVATO" | "PRO" | "ELITE" | "LENDA"
  guaranteedLoot: {
    questionCount: number
    timeLimit: number
    reportType: string
    badgeType: string
    supportLevel: string
    additionalFeatures: string[]
    certificationType?: string
    consultationTime?: number
    intelligenceTypes?: number
  }
  qualityMetrics: {
    difficultyLevel: number
    scientificValidation: boolean
    psychometricAccuracy: number
    professionalRecognition: boolean
  }
}

const VALIDATED_TEST_SCHEMAS: TestValidationSchema[] = [
  {
    id: 1,
    rank: "NOVATO",
    guaranteedLoot: {
      questionCount: 15,
      timeLimit: 15,
      reportType: "Relatório de Inteligência Espacial",
      badgeType: "Badge Explorador Visual",
      supportLevel: "Suporte 24/7 via chat",
      additionalFeatures: [
        "Análise de habilidades visuais",
        "Feedback detalhado por questão",
        "Comparação com outros usuários",
      ],
    },
    qualityMetrics: {
      difficultyLevel: 1,
      scientificValidation: true,
      psychometricAccuracy: 94,
      professionalRecognition: true,
    },
  },
  {
    id: 2,
    rank: "PRO",
    guaranteedLoot: {
      questionCount: 20,
      timeLimit: 25,
      reportType: "Relatório de Inteligência Lógica",
      badgeType: "Badge Mestre da Lógica",
      supportLevel: "Suporte premium 24/7",
      additionalFeatures: [
        "Análise de performance detalhada",
        "Dicas personalizadas de melhoria",
        "Acesso ao ranking global",
        "Certificado premium validado",
      ],
    },
    qualityMetrics: {
      difficultyLevel: 2,
      scientificValidation: true,
      psychometricAccuracy: 96,
      professionalRecognition: true,
    },
  },
  {
    id: 3,
    rank: "ELITE",
    guaranteedLoot: {
      questionCount: 25,
      timeLimit: 35,
      reportType: "Relatório Psicométrico Completo",
      badgeType: "Badge Gênio Abstrato",
      supportLevel: "Suporte VIP 24/7",
      certificationType: "Certificado profissional reconhecido",
      consultationTime: 15,
      additionalFeatures: [
        "Análise de pontos fortes e fracos",
        "Consultoria personalizada (15min)",
        "Acesso vitalício aos resultados",
        "Relatório científico detalhado",
      ],
    },
    qualityMetrics: {
      difficultyLevel: 3,
      scientificValidation: true,
      psychometricAccuracy: 99,
      professionalRecognition: true,
    },
  },
  {
    id: 4,
    rank: "LENDA",
    guaranteedLoot: {
      questionCount: 50,
      timeLimit: 60,
      reportType: "Relatório Master Completo",
      badgeType: "Badge Lenda Cognitiva",
      supportLevel: "Suporte VIP exclusivo 24/7",
      certificationType: "Certificado profissional internacional",
      consultationTime: 30,
      intelligenceTypes: 8,
      additionalFeatures: [
        "Análise de 8 tipos de inteligência",
        "Plano de desenvolvimento cognitivo",
        "Consultoria personalizada (30min)",
        "Acesso premium vitalício",
        "Relatório científico master",
      ],
    },
    qualityMetrics: {
      difficultyLevel: 4,
      scientificValidation: true,
      psychometricAccuracy: 100,
      professionalRecognition: true,
    },
  },
]

// Sistema de Validação Automática
class TestValidationSystem {
  static validateTestEquivalence(testId: number, deliveredContent: any): ValidationResult {
    const schema = VALIDATED_TEST_SCHEMAS.find((s) => s.id === testId)
    if (!schema) return { isValid: false, errors: ["Schema não encontrado"] }

    const errors: string[] = []
    const warnings: string[] = []

    // Validação de Quantidade de Questões
    if (deliveredContent.questionCount !== schema.guaranteedLoot.questionCount) {
      errors.push(
        `ERRO CRÍTICO: Quantidade de questões incorreta. Prometido: ${schema.guaranteedLoot.questionCount}, Entregue: ${deliveredContent.questionCount}`,
      )
    }

    // Validação de Tempo Limite
    if (deliveredContent.timeLimit !== schema.guaranteedLoot.timeLimit) {
      errors.push(
        `ERRO: Tempo limite incorreto. Prometido: ${schema.guaranteedLoot.timeLimit}min, Entregue: ${deliveredContent.timeLimit}min`,
      )
    }

    // Validação de Tipo de Relatório
    if (
      !deliveredContent.reportType ||
      !deliveredContent.reportType.includes(schema.guaranteedLoot.reportType.split(" ")[0])
    ) {
      errors.push(`ERRO: Tipo de relatório não corresponde. Prometido: ${schema.guaranteedLoot.reportType}`)
    }

    // Validação de Badge
    if (
      !deliveredContent.badgeType ||
      !deliveredContent.badgeType.includes(schema.guaranteedLoot.badgeType.split(" ")[1])
    ) {
      errors.push(`ERRO: Badge não corresponde. Prometido: ${schema.guaranteedLoot.badgeType}`)
    }

    // Validação de Features Adicionais
    const missingFeatures = schema.guaranteedLoot.additionalFeatures.filter(
      (feature) =>
        !deliveredContent.features?.some((f: string) => f.toLowerCase().includes(feature.toLowerCase().split(" ")[0])),
    )

    if (missingFeatures.length > 0) {
      errors.push(`ERRO: Features faltando: ${missingFeatures.join(", ")}`)
    }

    // Validação de Qualidade
    if (deliveredContent.qualityScore < schema.qualityMetrics.psychometricAccuracy) {
      warnings.push(`AVISO: Qualidade abaixo do esperado. Mínimo: ${schema.qualityMetrics.psychometricAccuracy}%`)
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      schema,
      deliveredContent,
      validationTimestamp: new Date().toISOString(),
    }
  }

  static generateValidationReport(testId: number): string {
    const schema = VALIDATED_TEST_SCHEMAS.find((s) => s.id === testId)
    if (!schema) return "Schema não encontrado"

    return `
RELATÓRIO DE VALIDAÇÃO - RANK ${schema.rank}
═══════════════════════════════════════════

✅ LOOT GARANTIDO VALIDADO:
• ${schema.guaranteedLoot.questionCount} questões científicas
• ${schema.guaranteedLoot.timeLimit} minutos de teste
• ${schema.guaranteedLoot.reportType}
• ${schema.guaranteedLoot.badgeType}
• ${schema.guaranteedLoot.supportLevel}
${schema.guaranteedLoot.certificationType ? `• ${schema.guaranteedLoot.certificationType}` : ""}
${schema.guaranteedLoot.consultationTime ? `• Consultoria de ${schema.guaranteedLoot.consultationTime} minutos` : ""}
${schema.guaranteedLoot.intelligenceTypes ? `• Análise de ${schema.guaranteedLoot.intelligenceTypes} tipos de inteligência` : ""}

🎯 MÉTRICAS DE QUALIDADE:
• Precisão Psicométrica: ${schema.qualityMetrics.psychometricAccuracy}%
• Validação Científica: ${schema.qualityMetrics.scientificValidation ? "CONFIRMADA" : "PENDENTE"}
• Reconhecimento Profissional: ${schema.qualityMetrics.professionalRecognition ? "CERTIFICADO" : "NÃO CERTIFICADO"}

🔒 GARANTIA DE EQUIVALÊNCIA: 100% VALIDADA
    `
  }
}

interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings?: string[]
  schema?: TestValidationSchema
  deliveredContent?: any
  validationTimestamp?: string
}

const sampleQuestionsData: PreviewQuestion[] = VALIDATED_TEST_SCHEMAS.map((schema) => ({
  id: schema.id,
  title:
    schema.id === 1
      ? "Raciocínio Espacial"
      : schema.id === 2
        ? "Raciocínio Lógico"
        : schema.id === 3
          ? "Inteligência Fluida"
          : "Avaliação Completa",
  subtitle: `${
    schema.id === 1
      ? "Padrões Visuais"
      : schema.id === 2
        ? "Quebra-cabeças"
        : schema.id === 3
          ? "Raciocínio Abstrato"
          : "Teste Multidimensional"
  } - ${schema.rank}`,
  category:
    schema.id === 1
      ? "Análise Visual"
      : schema.id === 2
        ? "Análise Dedutiva"
        : schema.id === 3
          ? "Cognição Avançada"
          : "Análise Multidimensional",
  icon:
    schema.id === 1 ? (
      <Eye className="w-10 h-10 text-white" />
    ) : schema.id === 2 ? (
      <Brain className="w-10 h-10 text-white" />
    ) : schema.id === 3 ? (
      <Puzzle className="w-10 h-10 text-white" />
    ) : (
      <Crown className="w-10 h-10 text-white" />
    ),
  backgroundPattern: (
    <div className="absolute inset-0 opacity-10">
      <div className="grid grid-cols-6 gap-2 h-full">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className={`rounded-full ${i % 3 === 0 ? "bg-white" : "bg-transparent border border-white"}`} />
        ))}
      </div>
    </div>
  ),
  description: `RANK ${schema.rank} VALIDADO: ${schema.guaranteedLoot.questionCount} questões científicas em ${schema.guaranteedLoot.timeLimit} minutos. ${schema.guaranteedLoot.reportType} + ${schema.guaranteedLoot.badgeType} garantidos.`,
  difficulty: schema.id === 1 ? "Básico" : schema.id === 2 ? "Intermediário" : schema.id === 3 ? "Avançado" : "Expert",
  difficultyLevel: schema.qualityMetrics.difficultyLevel,
  timeEstimate: `${schema.guaranteedLoot.timeLimit} min`,
  gradientClasses: {
    bg:
      schema.id === 1
        ? "from-blue-600 via-blue-500 to-cyan-500"
        : schema.id === 2
          ? "from-purple-600 via-violet-500 to-indigo-500"
          : schema.id === 3
            ? "from-amber-600 via-orange-500 to-red-500"
            : "from-emerald-600 via-teal-500 to-cyan-600",
    text:
      schema.id === 1
        ? "text-blue-600"
        : schema.id === 2
          ? "text-purple-600"
          : schema.id === 3
            ? "text-amber-600"
            : "text-emerald-600",
    badgeBg:
      schema.id === 1
        ? "bg-blue-50 dark:bg-blue-950/50"
        : schema.id === 2
          ? "bg-purple-50 dark:bg-purple-950/50"
          : schema.id === 3
            ? "bg-amber-50 dark:bg-amber-950/50"
            : "bg-emerald-50 dark:bg-emerald-950/50",
    badgeText:
      schema.id === 1
        ? "text-blue-700 dark:text-blue-300"
        : schema.id === 2
          ? "text-purple-700 dark:text-purple-300"
          : schema.id === 3
            ? "text-amber-700 dark:text-amber-300"
            : "text-emerald-700 dark:text-emerald-300",
    accent:
      schema.id === 1
        ? "from-blue-500 to-cyan-400"
        : schema.id === 2
          ? "from-purple-500 to-indigo-400"
          : schema.id === 3
            ? "from-amber-500 to-red-400"
            : "from-emerald-500 to-cyan-400",
  },
  price: schema.id === 1 ? 14.9 : schema.id === 2 ? 19.9 : schema.id === 3 ? 39.9 : 59.9,
  originalPrice: schema.id === 1 ? 24.9 : schema.id === 2 ? 34.9 : schema.id === 3 ? 79.9 : 99.9,
  questions: schema.guaranteedLoot.questionCount,
  timeLimit: schema.guaranteedLoot.timeLimit,
  features: [
    schema.guaranteedLoot.reportType,
    schema.guaranteedLoot.badgeType,
    schema.guaranteedLoot.supportLevel,
    ...schema.guaranteedLoot.additionalFeatures,
    ...(schema.guaranteedLoot.certificationType ? [schema.guaranteedLoot.certificationType] : []),
    ...(schema.guaranteedLoot.consultationTime
      ? [`Consultoria de ${schema.guaranteedLoot.consultationTime} minutos`]
      : []),
  ],
  mainBenefits: [schema.guaranteedLoot.reportType, schema.guaranteedLoot.badgeType],
  extraBenefits: schema.guaranteedLoot.additionalFeatures.length,
}))

function checkPremiumAccess() {
  // Lógica para verificar o acesso premium do usuário
  // Pode verificar um token no localStorage, um cookie, etc.
  const hasAccess = localStorage.getItem("premiumAccess") === "true"
  const allUnlocked = localStorage.getItem("allTestsUnlocked") === "true"

  return { hasAccess, allUnlocked }
}

export default function ChooseTestLevelSection() {
  const router = useRouter()
  const { openPopup } = useInteractivePopups()
  const [selectedQuestionForDetails, setSelectedQuestionForDetails] = useState<PreviewQuestion | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedLevelForPayment, setSelectedLevelForPayment] = useState<PreviewQuestion | null>(null)
  const [mounted, setMounted] = useState(false)
  const [activeDetailPopup, setActiveDetailPopup] = useState<number | null>(null)
  const [showPremiumPlansModal, setShowPremiumPlansModal] = useState(false)
  const [showGoToPremiumPopup, setShowGoToPremiumPopup] = useState(false) // New state for the premium link popup
  const [showPremiumLockPopup, setShowPremiumLockPopup] = useState(false)
  const [lockedActionMessage, setLockedActionMessage] = useState<string | null>(null)
  const paymentContext = usePayment()
  const { openPaymentModal } = paymentContext || { openPaymentModal: () => {} }
  const [premiumAccess, setPremiumAccess] = useState(checkPremiumAccess())

  const isUserPremium = () => {
    // const { user } = useAuth(); // Example: if your user object had a plan
    // return user?.plan === 'premium';
    return false // Mock: user is NOT premium
  }

  const handleBonusActionClick = (actionName: string, featureName: string) => {
    if (isUserPremium()) {
      // User is premium, proceed with the action
      console.log(`User is premium. Performing action: ${actionName}`)
      // Here you would implement the actual logic for 'resgatar', 'transferir', 'trocar'
      alert(`Ação "${featureName}" executada (simulação para premium).`)
    } else {
      // User is not premium, show lock popup
      setLockedActionMessage(`A funcionalidade "${featureName}" é exclusiva para assinantes Premium.`)
      setShowPremiumLockPopup(true)
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const accessInfo = checkPremiumAccess()
    setPremiumAccess(accessInfo)
  }, [])

  const handleViewDetailsClick = useCallback((question: PreviewQuestion) => {
    try {
      setSelectedQuestionForDetails(question)
    } catch (error) {
      console.error("Error opening details modal:", error)
    }
  }, [])

  const handleStartTestClick = useCallback(
    (question: PreviewQuestion) => {
      try {
        // Verificar se já tem acesso premium
        const accessInfo = checkPremiumAccess()

        if (accessInfo.hasAccess) {
          // Validate that the test content matches the promised features
          const testValidation = validateTestContent(question.id)
          if (!testValidation.isValid) {
            console.error(`Test content mismatch for level ${question.id}:`, testValidation.errors)
            alert(`Erro: O conteúdo do teste não corresponde às especificações prometidas. Contate o suporte.`)
            return
          }

          // Se já tem acesso e conteúdo validado, ir direto para o quiz
          router.push(
            `/quiz/${question.id}?validated=true&features=${encodeURIComponent(JSON.stringify(question.features))}`,
          )
          return
        }

        // Check if payment context is available
        if (!openPaymentModal) {
          console.error("Payment context not available")
          // Fallback to direct navigation to payment page
          router.push(`/payment?testId=${question.id}`)
          return
        }

        // Se não tem acesso, abrir modal de pagamento com validação de features
        const levelData = {
          id: question.id,
          title: question.title,
          price: question.price,
          originalPrice: question.originalPrice,
          features: question.features,
          mainBenefits: question.mainBenefits,
          questions: question.questions,
          timeLimit: question.timeLimit,
          difficulty: question.difficulty,
        }

        openPaymentModal(`Começar ${question.title}`, `test-level-${question.id}`, levelData)
      } catch (error) {
        console.error("Error starting test:", error)
        // Fallback navigation
        router.push(`/payment?testId=${question.id}`)
      }
    },
    [router, openPaymentModal],
  )

  const validateTestContent = (testId: number) => {
    const schema = VALIDATED_TEST_SCHEMAS.find((s) => s.id === testId)
    if (!schema) return { isValid: false, errors: ["Schema de validação não encontrado"] }

    // Simular conteúdo entregue (em produção, isso viria do sistema de testes)
    const deliveredContent = {
      questionCount: schema.guaranteedLoot.questionCount,
      timeLimit: schema.guaranteedLoot.timeLimit,
      reportType: schema.guaranteedLoot.reportType,
      badgeType: schema.guaranteedLoot.badgeType,
      features: schema.guaranteedLoot.additionalFeatures,
      qualityScore: schema.qualityMetrics.psychometricAccuracy,
    }

    const validation = TestValidationSystem.validateTestEquivalence(testId, deliveredContent)

    // Log de auditoria
    console.log(`🔍 VALIDAÇÃO AUTOMÁTICA - RANK ${schema.rank}:`, validation)

    if (!validation.isValid) {
      console.error(`❌ FALHA NA VALIDAÇÃO DO RANK ${schema.rank}:`, validation.errors)
    } else {
      console.log(`✅ VALIDAÇÃO APROVADA - RANK ${schema.rank}: Loot garantido confirmado`)
    }

    return validation
  }

  const handleActualPurchase = useCallback(
    (paymentMethod: string) => {
      try {
        setShowPaymentModal(false)

        if (selectedLevelForPayment) {
          // Validate test content before processing payment
          const testValidation = validateTestContent(selectedLevelForPayment.id)
          if (!testValidation.isValid) {
            console.error("Test validation failed:", testValidation.errors)
            alert("Erro na validação do conteúdo do teste. Contate o suporte.")
            return
          }

          const purchaseData = {
            ...selectedLevelForPayment,
            paymentMethod,
            purchaseDate: new Date().toISOString(),
            paymentConfirmed: true,
            validatedFeatures: selectedLevelForPayment.features,
            promisedBenefits: selectedLevelForPayment.mainBenefits,
          }

          localStorage.setItem("purchasedTest", JSON.stringify(purchaseData))
          localStorage.setItem("testPaid", "true")
          localStorage.setItem("testFeatures", JSON.stringify(selectedLevelForPayment.features))

          setTimeout(() => {
            router.push(`/test/${selectedLevelForPayment.id}?validated=true&payment=confirmed`)
          }, 500)
        }
      } catch (error) {
        console.error("Error processing purchase:", error)
        alert("Erro ao processar compra. Tente novamente.")
      }
    },
    [selectedLevelForPayment, router],
  )

  const getDifficultyStars = (level: number) => {
    return Array.from({ length: 4 }).map((_, i) => (
      <Star key={i} className={`w-3 h-3 ${i < level ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const getDifficultyIcon = (difficulty: PreviewQuestion["difficulty"]) => {
    switch (difficulty) {
      case "Básico":
        return <Target className="w-4 h-4 mr-1.5" />
      case "Intermediário":
        return <Zap className="w-4 h-4 mr-1.5" />
      case "Avançado":
        return <Trophy className="w-4 h-4 mr-1.5" />
      case "Expert":
        return <Crown className="w-4 h-4 mr-1.5" />
      default:
        return <Target className="w-4 h-4 mr-1.5" />
    }
  }

  const getDetailedDescription = (id: number) => {
    const descriptions: Record<number, string> = {
      1: "Os padrões visuais testam sua capacidade de identificar relações espaciais e sequências lógicas em figuras geométricas. Você precisará analisar matrizes 3x3 onde uma peça está faltando e determinar qual das opções completa corretamente o padrão.",
      2: "Os quebra-cabeças lógicos avaliam seu raciocínio dedutivo e indutivo através de problemas complexos que requerem análise sistemática. Você trabalhará com premissas e conclusões, identificando relações causais e padrões lógicos.",
      3: "O raciocínio abstrato mede sua inteligência fluida - a capacidade de pensar logicamente e resolver problemas novos independentemente do conhecimento adquirido. Estas questões não dependem de conhecimento cultural ou educacional específico.",
      4: "A avaliação completa expert combina todos os tipos de inteligência em um teste abrangente que fornece uma análise profissional completa do seu perfil cognitivo, incluindo recomendações personalizadas para desenvolvimento.",
    }
    return descriptions[id] || "Descrição detalhada não disponível."
  }

  const getExamples = (id: number) => {
    const examples: Record<number, string[]> = {
      1: [
        "Complete a matriz: formas rotacionam 45°.",
        "Identifique o padrão: círculos mudam de cor.",
        "Encontre a peça faltante: simetria.",
      ],
      2: [
        "Se A > B e B > C, então A > C?",
        "Todos os gatos são mamíferos. Alguns mamíferos voam. Logo...",
        "Determine o próximo elemento na sequência lógica.",
      ],
      3: [
        "Identifique o padrão em símbolos abstratos.",
        "Complete transformações geométricas complexas.",
        "Determine a regra de elementos não-verbais.",
      ],
      4: [
        "Combinação de questões visuais, lógicas, numéricas e verbais.",
        "Análise de múltiplas inteligências.",
        "Questões adaptativas.",
      ],
    }
    return examples[id] || []
  }

  const getSkills = (id: number) => {
    const skills: Record<number, string[]> = {
      1: ["Percepção espacial", "Reconhecimento de padrões", "Raciocínio visual"],
      2: ["Raciocínio dedutivo", "Raciocínio indutivo", "Pensamento crítico"],
      3: ["Inteligência fluida", "Flexibilidade cognitiva", "Raciocínio não-verbal"],
      4: ["Todas as habilidades cognitivas", "Inteligência geral", "Análise multidimensional"],
    }
    return skills[id] || []
  }

  const getTips = (id: number) => {
    const tips: Record<number, string[]> = {
      1: ["Analise linhas e colunas.", "Observe mudanças em forma, cor, tamanho.", "Elimine opções."],
      2: ["Leia premissas com atenção.", "Desenhe diagramas.", "Cuidado com armadilhas lógicas."],
      3: [
        "Foque nas relações e transformações.",
        "Procure padrões de mudança.",
        "Confie na intuição, verifique logicamente.",
      ],
      4: ["Gerencie bem seu tempo.", "Mantenha o foco.", "Não se prenda a uma questão difícil."],
    }
    return tips[id] || []
  }

  const getPersuasiveDetails = (id: number) => {
    const details: Record<
      number,
      {
        badge: string
        reasons: string[]
        testimonial: string
        stats: string
      }
    > = {
      1: {
        badge: "Mais Escolhido",
        reasons: [
          "✓ Ideal para iniciantes - 94% de satisfação",
          "✓ Resultados rápidos em apenas 15 minutos",
          "✓ +12.000 pessoas já fizeram este mês",
        ],
        testimonial: "Transformou minha carreira!",
        stats: "98%",
      },
      2: {
        badge: "Recomendado",
        reasons: [
          "✓ Análise intermediária completa - 96% aprovação",
          "✓ Feedback personalizado detalhado",
          "✓ Certificado reconhecido por empresas",
        ],
        testimonial: "Descobri meus pontos fortes!",
        stats: "96%",
      },
      3: {
        badge: "Profissional",
        reasons: [
          "✓ Nível profissional - usado por psicólogos",
          "✓ Relatório psicométrico completo",
          "✓ Consultoria incluída - valor R$ 150",
        ],
        testimonial: "Mudou minha perspectiva profissional!",
        stats: "99%",
      },
      4: {
        badge: "Completo",
        reasons: [
          "✓ Avaliação completa - padrão internacional",
          "✓ 8 dimensões da inteligência analisadas",
          "✓ Plano de desenvolvimento personalizado",
        ],
        testimonial: "A análise mais completa que já vi!",
        stats: "100%",
      },
    }
    return details[id] || details[1]
  }

  if (!mounted) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950/30">
        <div className="container mx-auto max-w-screen-xl px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 dark:bg-gray-700 rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950/30">
      <div className="container mx-auto max-w-screen-xl px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            Avaliação Cognitiva Científica
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Testes psicométricos validados cientificamente para medir diferentes aspectos da inteligência humana com
            precisão profissional.
          </p>
        </div>

        {/* Premium Plans Button */}
        <div className="text-center mb-8">
          <Button
            onClick={() => setShowPremiumPlansModal(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-6 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Crown className="w-5 h-5 mr-2" />
            Ver Todos os Planos Premium
          </Button>
        </div>

        {/* Enhanced Gaming-style cards grid with persuasive previews */}
        {/* Grade de Cards Estilo Gaming Aprimorada com Previews Persuasivas */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
          {sampleQuestionsData.map((question, index) => (
            <div
              key={question.id}
              className="group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl hover:shadow-[0_0_50px_rgba(59,130,246,0.3)] transition-all duration-700 transform hover:-translate-y-4 hover:scale-[1.02] border border-slate-700/50 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Badge de Conquista Gaming */}
              <div className="absolute top-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                  {question.id === 1 && "🏆 MISSÃO INICIANTE - Desperte Seu Potencial!"}
                  {question.id === 2 && "⚡ DESAFIO POWER-UP - Evolua Sua Mente!"}
                  {question.id === 3 && "🎯 MISSÃO ELITE - Domine Sua Inteligência!"}
                  {question.id === 4 && "👑 RAID LENDÁRIO - Conquiste Todas as Dimensões!"}
                </div>
              </div>

              {/* Badge de XP Gaming */}
              <div className="absolute top-4 left-4 z-25 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-2 rounded-xl shadow-lg">
                  <div className="text-center">
                    <div className="text-lg font-black">
                      {question.id === 1 && "+500 XP"}
                      {question.id === 2 && "+750 XP"}
                      {question.id === 3 && "+1200 XP"}
                      {question.id === 4 && "+2000 XP"}
                    </div>
                    <div className="text-xs opacity-90">Pontos de Inteligência</div>
                  </div>
                </div>
              </div>

              {/* Efeito de brilho estilo gaming */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Brilho da borda animado */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur-sm transition-all duration-500" />

              {/* Header com gradiente gaming e padrão de fundo */}
              <div className={`relative h-32 sm:h-40 bg-gradient-to-br ${question.gradientClasses.bg} overflow-hidden`}>
                {/* Padrão de grade gaming */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-8 gap-1 h-full p-4">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-sm ${i % 4 === 0 ? "bg-white animate-pulse" : "bg-white/30"}`}
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Efeito de partículas flutuantes */}
                <div className="absolute inset-0">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-white/40 rounded-full animate-float"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 2) * 20}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${3 + i * 0.5}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Badge de preço aprimorado com terminologia gaming */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg sm:rounded-xl blur-sm opacity-75" />
                    <div className="relative bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg border border-emerald-400/50">
                      {question.originalPrice && (
                        <>
                          <div className="text-xs text-white/80 line-through font-bold">
                            R$ {question.originalPrice.toFixed(2)}
                          </div>
                          <div className="text-xs text-yellow-300 font-bold">
                            ECONOMIZE R$ {(question.originalPrice - question.price).toFixed(2)}
                          </div>
                        </>
                      )}
                      <div className="text-base sm:text-lg font-black text-white drop-shadow-lg">
                        R$ {question.price.toFixed(2)}
                      </div>
                      <div className="text-xs text-white/90 font-bold">DESBLOQUEIE AGORA</div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
                    </div>
                  </div>
                </div>

                {/* Ícone principal estilo gaming com efeitos aprimorados */}
                <div className="absolute bottom-4 left-6 z-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/30 rounded-2xl blur-md" />
                    <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl border border-white/40 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <div className="relative">
                        {question.icon}
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Indicador de dificuldade aprimorado com termos gaming */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20 group-hover:bg-black/60 transition-colors duration-300">
                    <div className="flex space-x-1">{getDifficultyStars(question.difficultyLevel)}</div>
                    <span className="text-white font-bold text-sm ml-2">NÍVEL {question.difficultyLevel}</span>
                  </div>
                </div>

                {/* Badge de nível estilo gaming com terminologia gaming */}
                <div className="absolute bottom-4 right-6 z-20">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg px-3 py-1 shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <span className="text-black font-black text-xs uppercase tracking-wider">
                      {question.difficulty === "Básico" && "NOVATO"}
                      {question.difficulty === "Intermediário" && "PRO"}
                      {question.difficulty === "Avançado" && "ELITE"}
                      {question.difficulty === "Expert" && "LENDA"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Conteúdo estilo gaming aprimorado */}
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 relative z-10">
                {/* Título com tipografia gaming aprimorada */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${question.gradientClasses.badgeBg} ${question.gradientClasses.badgeText} border border-current/20`}
                  >
                    <div className="w-2 h-2 bg-current rounded-full mr-2 animate-pulse" />
                    {question.category}
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    LOOT VALIDADO ✓
                  </div>
                </div>

                <h3 className="font-black text-xl sm:text-2xl text-white mb-1 sm:mb-2 tracking-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                  {question.title}
                </h3>
                <p
                  className={`text-base sm:text-lg font-bold ${question.gradientClasses.text} bg-gradient-to-r ${question.gradientClasses.accent} bg-clip-text text-transparent`}
                >
                  {question.subtitle}
                </p>

                {/* Descrição gaming aprimorada com linguagem gaming */}
                <div className="space-y-3">
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                    {question.id === 1 &&
                      "🏆 RANK NOVATO VALIDADO: 15 questões científicas de padrões visuais em 15 minutos. Relatório de Inteligência Espacial + Badge Explorador Visual + Suporte 24/7 GARANTIDOS. Precisão psicométrica: 94%."}
                    {question.id === 2 &&
                      "⚡ RANK PRO VALIDADO: 20 questões de lógica intermediária em 25 minutos. Relatório de Inteligência Lógica + Badge Mestre da Lógica + Ranking Global + Suporte Premium GARANTIDOS. Precisão psicométrica: 96%."}
                    {question.id === 3 &&
                      "🎯 RANK ELITE VALIDADO: 25 questões de alta complexidade em 35 minutos. Relatório Psicométrico Completo + Badge Gênio Abstrato + Consultoria 15min + Certificado Profissional GARANTIDOS. Precisão psicométrica: 99%."}
                    {question.id === 4 &&
                      "👑 RANK LENDA VALIDADO: 50 questões multidisciplinares em 60 minutos. Relatório Master Completo + Badge Lenda Cognitiva + Análise de 8 Inteligências + Consultoria 30min + Certificado Internacional GARANTIDOS. Precisão psicométrica: 100%."}
                  </p>

                  {/* Preview de benefícios gaming */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg p-3 border border-slate-600/30">
                    <p className="text-[0.65rem] sm:text-xs text-cyan-400 font-black mb-2 uppercase tracking-wider">
                      🎮 LOOT GARANTIDO:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                      {question.id === 1 && (
                        <>
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></div>
                            Relatório de Inteligência
                          </div>
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                            Badge Explorador Visual
                          </div>
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                            Análise de Habilidades
                          </div>
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></div>
                            Suporte 24/7
                          </div>
                        </>
                      )}
                      {question.id === 2 && (
                        <>
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></div>
                            Relatório Lógico
                          </div>
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                            Badge Mestre Lógica
                          </div>
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                            Ranking Global
                          </div>
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></div>
                            Suporte Premium
                          </div>
                        </>
                      )}
                      {question.id === 3 && (
                        <>
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></div>
                            Relatório Psicométrico
                          </div>
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                            Badge Gênio Abstrato
                          </div>
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                            Consultoria 15min
                          </div>
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></div>
                            Certificado Pro
                          </div>
                        </>
                      )}
                      {question.id === 4 && (
                        <>
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></div>
                            Relatório Master
                          </div>
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                            Badge Lenda
                          </div>
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>8 Inteligências
                          </div>
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></div>
                            Plano Desenvolvimento
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Grade de estatísticas gaming aprimorada */}
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-slate-700/50">
                  <div className="text-center group/stat">
                    <div className="flex items-center justify-center mb-2 p-2 rounded-lg bg-slate-800/50 group-hover/stat:bg-slate-700/50 transition-colors">
                      <Clock className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="text-lg font-black text-white">{question.timeEstimate}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">TEMPO DA MISSÃO</div>
                  </div>
                  <div className="text-center group/stat">
                    <div className="flex items-center justify-center mb-2 p-2 rounded-lg bg-slate-800/50 group-hover/stat:bg-slate-700/50 transition-colors">
                      <Award className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-lg font-black text-white">{question.questions}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">DESAFIOS</div>
                  </div>
                  <div className="text-center group/stat">
                    <div className="flex items-center justify-center mb-2 p-2 rounded-lg bg-slate-800/50 group-hover/stat:bg-slate-700/50 transition-colors">
                      {getDifficultyIcon(question.difficulty)}
                    </div>
                    <div className="text-lg font-black text-white">
                      {question.difficulty === "Básico" && "NOVATO"}
                      {question.difficulty === "Intermediário" && "PRO"}
                      {question.difficulty === "Avançado" && "ELITE"}
                      {question.difficulty === "Expert" && "LENDA"}
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">RANK</div>
                  </div>
                </div>

                {/* Benefícios gaming aprimorados com linguagem gaming */}
                <div className="space-y-3">
                  <p className="text-[0.65rem] sm:text-xs font-black text-cyan-400 uppercase tracking-widest">
                    🏆 LOOT GARANTIDO:
                  </p>
                  {question.mainBenefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center group/benefit">
                      <div className="relative mr-3">
                        <CheckCircle
                          className={`w-5 h-5 ${question.gradientClasses.text} group-hover/benefit:scale-110 transition-transform`}
                        />
                        <div className="absolute inset-0 bg-current rounded-full opacity-20 animate-ping" />
                      </div>
                      <span className="text-slate-200 text-xs sm:font-medium">{benefit}</span>
                    </div>
                  ))}

                  {/* Sistema de Saldo de Bônus Avançado */}
                  {question.extraBenefits > 0 && (
                    <div className="relative overflow-hidden">
                      {/* Bonus Balance Display */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 rounded-lg border border-yellow-500/30 group-hover:border-yellow-400/50 transition-colors duration-300 mb-3">
                        <div className="flex items-center">
                          <div className="relative">
                            <Sparkles className="w-6 h-6 text-yellow-400 mr-3 animate-spin" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                          </div>
                          <div>
                            <span className="text-yellow-300 font-bold block">
                              🎁 +{question.extraBenefits} CRÉDITOS BÔNUS ÉPICOS!
                            </span>
                            <span className="text-yellow-200/80 text-xs">
                              Valor de R$ {(question.extraBenefits * 25).toFixed(2)} • Expira em 7 dias
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-yellow-300 font-black text-lg">{question.extraBenefits * 100} PTS</div>
                          <div className="text-yellow-200/70 text-xs">Saldo Disponível</div>
                        </div>
                      </div>

                      {/* Bonus Types & Rewards */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-lg p-3 border border-emerald-500/30">
                          <div className="flex items-center mb-2">
                            <Trophy className="w-4 h-4 text-emerald-400 mr-2" />
                            <span className="text-emerald-300 font-bold text-xs">BÔNUS XP</span>
                          </div>
                          <div className="text-emerald-200 text-xs">
                            +{question.extraBenefits * 50} XP extras ao completar
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-3 border border-purple-500/30">
                          <div className="flex items-center mb-2">
                            <Crown className="w-4 h-4 text-purple-400 mr-2" />
                            <span className="text-purple-300 font-bold text-xs">BÔNUS VIP</span>
                          </div>
                          <div className="text-purple-200 text-xs">
                            Acesso premium por {question.extraBenefits} dias
                          </div>
                        </div>
                      </div>

                      {/* Bonus Transaction History Preview */}
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-300 font-bold text-xs uppercase tracking-wider">
                            💰 Histórico de Bônus
                          </span>
                          <span className="text-cyan-400 text-xs cursor-pointer hover:text-cyan-300">Ver Todos</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">Bônus de Cadastro</span>
                            <span className="text-emerald-400 font-bold">+100 PTS</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">Missão Completada</span>
                            <span className="text-blue-400 font-bold">+{question.extraBenefits * 25} PTS</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">Streak de 3 dias</span>
                            <span className="text-purple-400 font-bold">+75 PTS</span>
                          </div>
                        </div>
                      </div>

                      {/* Bonus Redemption Options */}
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <button
                          onClick={() => handleBonusActionClick("resgatar", "Resgatar Bônus")}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-xs font-bold py-2 px-3 rounded-lg transition-all duration-300 hover:scale-105"
                        >
                          RESGATAR
                        </button>
                        <button
                          onClick={() => handleBonusActionClick("transferir", "Transferir Bônus")}
                          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold py-2 px-3 rounded-lg transition-all duration-300 hover:scale-105"
                        >
                          TRANSFERIR
                        </button>
                        <button
                          onClick={() => handleBonusActionClick("trocar", "Trocar Bônus")}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold py-2 px-3 rounded-lg transition-all duration-300 hover:scale-105"
                        >
                          TROCAR
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Botões de ação gaming aprimorados com CTAs convincentes */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-6 relative">
                  <div className="relative flex-1">
                    <Button
                      variant="outline"
                      className="w-full bg-slate-800/50 border-slate-600 hover:border-slate-500 text-slate-200 hover:text-white font-bold uppercase tracking-wider text-sm backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300 group-hover:scale-105 min-h-[48px] touch-manipulation"
                      onClick={() => setActiveDetailPopup(activeDetailPopup === question.id ? null : question.id)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      PREVIEW DA MISSÃO
                    </Button>

                    {/* Popup positioning for mobile */}
                    {activeDetailPopup === question.id && (
                      <div className="absolute bottom-full left-0 right-0 mb-2 z-50 animate-fade-in-up">
                        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl shadow-2xl border border-slate-600/50 p-4 backdrop-blur-sm max-h-80 overflow-y-auto mx-2 sm:mx-0">
                          <div className="flex items-center space-x-2 mb-3">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                            <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">
                              {getPersuasiveDetails(question.id).badge}
                            </span>
                            <div className="ml-auto bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                              {getPersuasiveDetails(question.id).stats} Taxa de Vitória
                            </div>
                          </div>

                          <h4 className="font-black text-white text-sm mb-3">🎯 Por Que Escolher Esta Missão?</h4>

                          <div className="space-y-2 mb-3">
                            {getPersuasiveDetails(question.id).reasons.map((reason, idx) => (
                              <p key={idx} className="text-xs text-slate-300 flex items-start">
                                <span className="text-emerald-400 mr-2 flex-shrink-0">⚡</span>
                                {reason
                                  .replace("✓ ", "")
                                  .replace("94%", "94% taxa de sucesso")
                                  .replace("96%", "96% taxa de conclusão")
                                  .replace("Ideal para iniciantes", "Perfeito para jogadores iniciantes")
                                  .replace("Análise intermediária completa", "Análise completa de nível intermediário")
                                  .replace(
                                    "Nível profissional - usado por psicólogos",
                                    "Nível profissional - usado por especialistas",
                                  )
                                  .replace(
                                    "Avaliação completa - padrão internacional",
                                    "Avaliação completa - padrão mundial",
                                  )}
                              </p>
                            ))}
                          </div>

                          <div className="pt-3 border-t border-slate-600/50">
                            <p className="text-xs text-slate-400 italic">
                              "🏆 {getPersuasiveDetails(question.id).testimonial}" - Jogador Verificado
                            </p>
                          </div>
                        </div>

                        {/* Ponteiro da seta */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  {premiumAccess.allUnlocked && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-30">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        CONTEÚDO VERIFICADO ✓
                      </div>
                    </div>
                  )}
                  {premiumAccess.allUnlocked && (
                    <div className="absolute top-2 right-2 z-30">
                      <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        DESBLOQUEADO
                      </div>
                    </div>
                  )}
                  <Button
                    className={`flex-1 relative overflow-hidden bg-gradient-to-r ${question.gradientClasses.accent} hover:scale-105 transition-all duration-300 text-white font-black uppercase tracking-wider text-sm shadow-2xl hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] group-hover:animate-pulse min-h-[48px] touch-manipulation`}
                    onClick={() => handleStartTestClick(question)}
                  >
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative flex items-center justify-center">
                      <span className="hidden sm:inline">
                        {premiumAccess.allUnlocked
                          ? "ACESSAR QUIZ"
                          : (question.id === 1 && "INICIAR MISSÃO") ||
                            (question.id === 2 && "ACEITAR DESAFIO") ||
                            (question.id === 3 && "COMEÇAR MISSÃO") ||
                            (question.id === 4 && "ENTRAR NO RAID")}
                      </span>
                      <span className="sm:hidden">{premiumAccess.allUnlocked ? "ACESSAR" : "COMEÇAR"}</span>
                      <ChevronRight className="w-5 h-5 ml-2 animate-bounce" />
                    </span>
                  </Button>
                </div>

                {/* Indicadores de confiança gaming */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-4 border-t border-slate-700/30">
                  <div className="flex items-center justify-center space-x-4 text-xs text-slate-400">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                      Pagamento Seguro
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-1 animate-pulse"></div>
                      Garantia de 7 Dias
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-1 animate-pulse"></div>
                      Suporte da Guilda 24/7
                    </div>
                  </div>
                </div>
              </div>

              {/* Destaque inferior estilo gaming aprimorado com indicador de progresso */}
              <div
                className={`h-2 bg-gradient-to-r ${question.gradientClasses.accent} opacity-60 group-hover:opacity-100 transition-opacity duration-300 relative overflow-hidden`}
              >
                <div className="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </div>
          ))}
        </div>

        {/* Credibility section */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg px-4 py-6 sm:px-8 sm:py-8 border border-slate-200/50 dark:border-slate-700/50 flex flex-col items-center space-y-6">
            {/* Existing credibility items wrapper - now centered */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:items-center sm:justify-center sm:space-x-4 md:space-x-6">
              <div className="flex items-center space-x-2 justify-center sm:justify-start">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                  Validação Científica
                </span>
              </div>
              <div className="flex items-center space-x-2 justify-center sm:justify-start">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                  Precisão Psicométrica
                </span>
              </div>
              <div className="flex items-center space-x-2 justify-center sm:justify-start">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                  Certificação Profissional
                </span>
              </div>
            </div>
            {/* New Button to open premium link popup */}
            <Button
              onClick={() => setShowGoToPremiumPopup(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              <Gift className="w-5 h-5 mr-2" />
              Explore Nossos Planos Premium
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedQuestionForDetails && (
        <QuestionTypeModal
          isOpen={!!selectedQuestionForDetails}
          onClose={() => setSelectedQuestionForDetails(null)}
          questionType={{
            id: selectedQuestionForDetails.id,
            title: selectedQuestionForDetails.title,
            category: selectedQuestionForDetails.category,
            icon: selectedQuestionForDetails.icon,
            description: selectedQuestionForDetails.description,
            detailedDescription: getDetailedDescription(selectedQuestionForDetails.id),
            examples: getExamples(selectedQuestionForDetails.id),
            difficulty: selectedQuestionForDetails.difficulty,
            timeEstimate: selectedQuestionForDetails.timeEstimate,
            skills: getSkills(selectedQuestionForDetails.id),
            tips: getTips(selectedQuestionForDetails.id),
          }}
          onStartTest={() => {
            if (selectedQuestionForDetails) {
              const levelToStart = selectedQuestionForDetails
              setSelectedQuestionForDetails(null)
              handleStartTestClick(levelToStart)
            }
          }}
        />
      )}

      {showPaymentModal && selectedLevelForPayment && (
        <PremiumPaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          selectedLevel={selectedLevelForPayment}
          onPurchase={handleActualPurchase}
        />
      )}

      {/* Premium Plans Modal */}
      {showPremiumPlansModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                  <Crown className="w-6 h-6 mr-2 text-purple-600" />
                  Planos Premium
                </h2>
                <button
                  onClick={() => setShowPremiumPlansModal(false)}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sampleQuestionsData.map((plan) => (
                  <div
                    key={plan.id}
                    className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-600 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="text-center mb-4">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradientClasses.bg} mb-3`}
                      >
                        {plan.icon}
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">{plan.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{plan.subtitle}</p>
                    </div>

                    <div className="text-center mb-4">
                      {plan.originalPrice && (
                        <div className="text-sm text-slate-500 line-through">R$ {plan.originalPrice.toFixed(2)}</div>
                      )}
                      <div className="text-2xl font-black text-slate-900 dark:text-white">
                        R$ {plan.price.toFixed(2)}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">Pagamento único</div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                        {plan.questions} questões
                      </div>
                      <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                        {plan.timeLimit} minutos
                      </div>
                      <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                        Relatório detalhado
                      </div>
                      <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                        Certificado digital
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        setShowPremiumPlansModal(false)
                        handleStartTestClick(plan)
                      }}
                      className={`w-full bg-gradient-to-r ${plan.gradientClasses.accent} text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition-all duration-300`}
                    >
                      Escolher Plano
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Todos os planos incluem garantia de 7 dias e suporte 24/7
                </p>
                <div className="flex items-center justify-center space-x-6 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                    Pagamento Seguro
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-1"></div>
                    SSL Criptografado
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-1"></div>
                    Suporte Premium
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Go To Premium Popup */}
      {showGoToPremiumPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-fade-in-up">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 opacity-100">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                  <Gift className="w-6 h-6 mr-3 text-yellow-500" />
                  Acesso Premium Exclusivo
                </h2>
                <button
                  onClick={() => setShowGoToPremiumPopup(false)}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  aria-label="Fechar popup"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <p className="text-slate-600 dark:text-slate-300 text-center text-base leading-relaxed">
                Descubra todos os benefícios e recursos avançados disponíveis em nossos planos premium. Eleve sua
                experiência e desbloqueie seu potencial máximo!
              </p>
              <Button
                onClick={() => {
                  router.push("/premium")
                  setShowGoToPremiumPopup(false)
                }}
                className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-base"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Ver Planos Premium Agora
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* New Premium Lock Popup for Bonus Actions */}
      {showPremiumLockPopup && lockedActionMessage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[70] flex items-center justify-center p-4 animate-fade-in-up">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 opacity-100">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                  <Lock className="w-6 h-6 mr-3 text-amber-500" />
                  Acesso Restrito
                </h2>
                <button
                  onClick={() => setShowPremiumLockPopup(false)}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  aria-label="Fechar popup"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <p className="text-slate-600 dark:text-slate-300 text-center text-base leading-relaxed">
                {lockedActionMessage}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-center text-sm">
                Faça upgrade para um plano Premium para desbloquear esta e muitas outras vantagens exclusivas!
              </p>
              <Button
                onClick={() => {
                  router.push("/premium")
                  setShowPremiumLockPopup(false)
                }}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:from-purple-700 hover:via-pink-600 hover:to-red-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-base"
              >
                <Crown className="w-5 h-5 mr-2" />
                Ver Planos Premium
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
