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
  BarChart3,
  Layers,
  Network,
  Cpu,
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

const sampleQuestionsData: PreviewQuestion[] = [
  {
    id: 1,
    title: "Raciocínio Espacial",
    subtitle: "Padrões Visuais",
    category: "Análise Visual",
    icon: <Eye className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white" />,
    backgroundPattern: (
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-1 sm:gap-1.5 md:gap-2 h-full p-2 sm:p-3 md:p-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-full ${i % 3 === 0 ? "bg-white" : "bg-transparent border border-white"}`}
            />
          ))}
        </div>
      </div>
    ),
    description: "Identifique sequências e complete matrizes visuais com padrões geométricos avançados.",
    difficulty: "Básico",
    difficultyLevel: 1,
    timeEstimate: "15 min",
    gradientClasses: {
      bg: "from-blue-600 via-blue-500 to-cyan-500",
      text: "text-blue-600",
      badgeBg: "bg-blue-50 dark:bg-blue-950/50",
      badgeText: "text-blue-700 dark:text-blue-300",
      accent: "from-blue-500 to-cyan-400",
    },
    price: 9.9,
    originalPrice: 24.9,
    questions: 15,
    timeLimit: 15,
    features: [
      "15 questões de padrões visuais",
      "Feedback detalhado por questão",
      "Certificado digital personalizado",
      "Comparação com outros usuários",
    ],
    mainBenefits: ["15 questões especializadas", "Feedback detalhado"],
    extraBenefits: 2,
  },
  {
    id: 2,
    title: "Raciocínio Lógico",
    subtitle: "Quebra-cabeças Lógicos",
    category: "Análise Dedutiva",
    icon: <Brain className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white" />,
    backgroundPattern: (
      <div className="absolute inset-0 opacity-10">
        <div className="flex items-center justify-center h-full">
          <Network className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-32 xl:h-32 text-white" />
        </div>
      </div>
    ),
    description: "Resolva problemas lógicos complexos usando raciocínio dedutivo e indutivo avançado.",
    difficulty: "Intermediário",
    difficultyLevel: 2,
    timeEstimate: "25 min",
    gradientClasses: {
      bg: "from-purple-600 via-violet-500 to-indigo-500",
      text: "text-purple-600",
      badgeBg: "bg-purple-50 dark:bg-purple-950/50",
      badgeText: "text-purple-700 dark:text-purple-300",
      accent: "from-purple-500 to-indigo-400",
    },
    price: 19.9,
    originalPrice: 34.9,
    questions: 20,
    timeLimit: 25,
    features: [
      "20 questões de lógica avançada",
      "Análise de performance detalhada",
      "Dicas personalizadas de melhoria",
      "Certificado premium validado",
      "Acesso ao ranking global",
    ],
    mainBenefits: ["20 questões avançadas", "Análise de performance"],
    extraBenefits: 3,
  },
  {
    id: 3,
    title: "Inteligência Fluida",
    subtitle: "Raciocínio Abstrato",
    category: "Cognição Avançada",
    icon: <Puzzle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white" />,
    backgroundPattern: (
      <div className="absolute inset-0 opacity-10">
        <div className="flex items-center justify-center h-full">
          <Layers className="w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:w-20 xl:w-28 xl:h-28 text-white transform rotate-12" />
          <Cpu className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 text-white transform -rotate-12 -ml-3 sm:-ml-4 md:-ml-5 lg:-ml-6 xl:-ml-8" />
        </div>
      </div>
    ),
    description: "Navegue por desafios abstratos complexos que testam sua capacidade de raciocínio puro.",
    difficulty: "Avançado",
    difficultyLevel: 3,
    timeEstimate: "35 min",
    gradientClasses: {
      bg: "from-amber-600 via-orange-500 to-red-500",
      text: "text-amber-600",
      badgeBg: "bg-amber-50 dark:bg-amber-950/50",
      badgeText: "text-amber-700 dark:text-amber-300",
      accent: "from-amber-500 to-red-400",
    },
    price: 29.9,
    originalPrice: 79.9,
    questions: 25,
    timeLimit: 35,
    features: [
      "25 questões de alta complexidade",
      "Relatório psicométrico completo",
      "Análise de pontos fortes e fracos",
      "Certificado profissional reconhecido",
      "Consultoria personalizada (15min)",
      "Acesso vitalício aos resultados",
    ],
    mainBenefits: ["25 questões complexas", "Relatório psicométrico"],
    extraBenefits: 4,
  },
  {
    id: 4,
    title: "Avaliação Completa",
    subtitle: "Teste Expert",
    category: "Análise Multidimensional",
    icon: <Crown className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white" />,
    backgroundPattern: (
      <div className="absolute inset-0 opacity-10">
        <div className="flex items-center justify-center h-full">
          <BarChart3 className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 text-white transform rotate-6" />
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 text-white transform -rotate-12 ml-2 sm:ml-3 md:ml-4" />
        </div>
      </div>
    ),
    description: "Avaliação completa de todas as dimensões da inteligência com análise profissional detalhada.",
    difficulty: "Expert",
    difficultyLevel: 4,
    timeEstimate: "60 min",
    gradientClasses: {
      bg: "from-emerald-600 via-teal-500 to-cyan-600",
      text: "text-emerald-600",
      badgeBg: "bg-emerald-50 dark:bg-emerald-950/50",
      badgeText: "text-emerald-700 dark:text-emerald-300",
      accent: "from-emerald-500 to-cyan-400",
    },
    price: 49.9,
    originalPrice: 99.9,
    questions: 50,
    timeLimit: 60,
    features: [
      "50 questões multidisciplinares",
      "Relatório psicométrico completo",
      "Análise de 8 tipos de inteligência",
      "Certificado profissional reconhecido",
      "Consultoria personalizada (30min)",
      "Plano de desenvolvimento cognitivo",
    ],
    mainBenefits: ["50 questões multidisciplinares", "Relatório completo"],
    extraBenefits: 4,
  },
]

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
  const [showGoToPremiumPopup, setShowGoToPremiumPopup] = useState(false)
  const [showPremiumLockPopup, setShowPremiumLockPopup] = useState(false)
  const [lockedActionMessage, setLockedActionMessage] = useState<string | null>(null)
  const paymentContext = usePayment()
  const { openPaymentModal } = paymentContext || { openPaymentModal: () => {} }
  const [premiumAccess, setPremiumAccess] = useState(checkPremiumAccess())

  const isUserPremium = () => {
    return false // Mock: user is NOT premium
  }

  const handleBonusActionClick = (actionName: string, featureName: string) => {
    if (isUserPremium()) {
      console.log(`User is premium. Performing action: ${actionName}`)
      alert(`Ação "${featureName}" executada (simulação para premium).`)
    } else {
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
        // Salvar dados da missão selecionada no localStorage para usar no checkout
        const missionData = {
          id: question.id,
          title: question.title,
          subtitle: question.subtitle,
          price: question.price,
          originalPrice: question.originalPrice,
          questions: question.questions,
          timeLimit: question.timeLimit,
          features: question.features,
          difficulty: question.difficulty,
          category: question.category,
          description: question.description,
          specializedMode: true,
          detailedFeedback: true,
          comprehensiveAssessment: true,
        }

        localStorage.setItem("selectedMission", JSON.stringify(missionData))

        // Configurar redirecionamento pós-pagamento para o quiz específico
        const postPaymentConfig = {
          redirectTo: `/quiz/${question.id}`,
          missionId: question.id,
          questions: question.questions,
          timeLimit: question.timeLimit,
          autoStart: true,
        }

        localStorage.setItem("postPaymentRedirect", JSON.stringify(postPaymentConfig))

        // Redirecionar sempre para a página de checkout
        router.push(
          `/checkout?missionId=${question.id}&questions=${question.questions}&timeLimit=${question.timeLimit}&redirect=quiz`,
        )
      } catch (error) {
        console.error("Error starting mission:", error)
        // Fallback para página de checkout mesmo em caso de erro
        router.push(`/checkout?missionId=${question.id}&redirect=quiz`)
      }
    },
    [router],
  )

  const handleActualPurchase = useCallback(
    (paymentMethod: string, paymentData: any) => {
      try {
        setShowPaymentModal(false)

        if (selectedLevelForPayment) {
          const purchaseData = {
            ...selectedLevelForPayment,
            paymentMethod,
            paymentData,
            purchaseDate: new Date().toISOString(),
            paymentConfirmed: true,
            quizAccess: true,
            specializedQuestions: true,
            detailedFeedback: true,
            comprehensiveAssessment: true,
          }

          localStorage.setItem("purchasedTest", JSON.stringify(purchaseData))
          localStorage.setItem("testPaid", "true")
          localStorage.setItem("allQuizzesUnlocked", "true")
          localStorage.setItem("premiumAccess", "true")

          localStorage.setItem(
            "selectedQuizConfig",
            JSON.stringify({
              id: selectedLevelForPayment.id,
              title: selectedLevelForPayment.title,
              questions: selectedLevelForPayment.questions,
              timeLimit: selectedLevelForPayment.timeLimit,
              features: selectedLevelForPayment.features,
              difficulty: selectedLevelForPayment.difficulty,
              specializedMode: true,
              detailedFeedback: true,
              comprehensiveAssessment: true,
              purchaseConfirmed: true,
            }),
          )

          setTimeout(() => {
            alert(
              `✅ Pagamento confirmado! Redirecionando para seu quiz de ${selectedLevelForPayment.questions} questões especializadas...`,
            )
          }, 500)

          setTimeout(() => {
            router.push(`/quiz/${selectedLevelForPayment.id}`)
          }, 1500)
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
      <Star
        key={i}
        className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 ${
          i < level ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ))
  }

  const getDifficultyIcon = (difficulty: PreviewQuestion["difficulty"]) => {
    const iconClass = "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 mr-1 sm:mr-1.5"
    switch (difficulty) {
      case "Básico":
        return <Target className={iconClass} />
      case "Intermediário":
        return <Zap className={iconClass} />
      case "Avançado":
        return <Trophy className={iconClass} />
      case "Expert":
        return <Crown className={iconClass} />
      default:
        return <Target className={iconClass} />
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
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950/30">
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-6 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-80 sm:h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl sm:rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950/30">
      <div className="container mx-auto max-w-3xl px-1 sm:px-2 md:px-3 lg:px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12">
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg sm:rounded-xl md:rounded-2xl mb-3 sm:mb-4 md:mb-6">
            <Brain className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white" />
          </div>
          <h2 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent px-2">
            Avaliação Cognitiva Científica
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed px-4">
            Testes psicométricos validados cientificamente para medir diferentes aspectos da inteligência humana com
            precisão profissional.
          </p>
        </div>

        {/* Premium Plans Button */}
        <div className="text-center mb-3 sm:mb-4 md:mb-6">
          <Button
            onClick={() => setShowPremiumPlansModal(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 lg:px-8 lg:py-3 text-xs sm:text-sm md:text-base rounded-md sm:rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-h-[36px] sm:min-h-[40px] md:min-h-[44px]"
          >
            <Crown className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2" />
            <span className="hidden sm:inline">Ver Todas as Avaliações</span>
            <span className="sm:hidden">Avaliações</span>
          </Button>
        </div>

        {/* Enhanced Gaming-style cards grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {sampleQuestionsData.map((question, index) => (
            <div
              key={question.id}
              className="group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl hover:shadow-[0_0_50px_rgba(59,130,246,0.3)] transition-all duration-700 transform hover:-translate-y-1 sm:hover:-translate-y-2 md:hover:-translate-y-4 hover:scale-[1.01] sm:hover:scale-[1.02] border border-slate-700/50 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Badge de Conquista Gaming */}
              <div className="absolute top-1 left-1 sm:top-2 sm:left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-1.5 py-0.5 sm:px-2 sm:py-0.5 md:px-3 md:py-1 rounded-full text-xs font-bold animate-pulse">
                  {question.id === 1 && (
                    <>
                      <span className="hidden sm:inline">🏆 MISSÃO INICIANTE</span>
                      <span className="sm:hidden">🏆 INICIANTE</span>
                    </>
                  )}
                  {question.id === 2 && (
                    <>
                      <span className="hidden sm:inline">⚡ DESAFIO POWER-UP</span>
                      <span className="sm:hidden">⚡ POWER-UP</span>
                    </>
                  )}
                  {question.id === 3 && (
                    <>
                      <span className="hidden sm:inline">🎯 MISSÃO ELITE</span>
                      <span className="sm:hidden">🎯 ELITE</span>
                    </>
                  )}
                  {question.id === 4 && (
                    <>
                      <span className="hidden sm:inline">👑 RAID LENDÁRIO</span>
                      <span className="sm:hidden">👑 LENDÁRIO</span>
                    </>
                  )}
                </div>
              </div>

              {/* Badge de XP Gaming */}
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 z-25 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-4 md:py-2 rounded-md sm:rounded-lg md:rounded-xl shadow-lg">
                  <div className="text-center">
                    <div className="text-xs sm:text-sm md:text-lg font-black">
                      {question.id === 1 && "+500 XP"}
                      {question.id === 2 && "+750 XP"}
                      {question.id === 3 && "+1200 XP"}
                      {question.id === 4 && "+2000 XP"}
                    </div>
                    <div className="text-xs opacity-90 hidden md:block">Pontos de Inteligência</div>
                  </div>
                </div>
              </div>

              {/* Efeito de brilho estilo gaming */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Brilho da borda animado */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur-sm transition-all duration-500" />

              {/* Header com gradiente gaming e padrão de fundo */}
              <div
                className={`relative h-16 sm:h-18 md:h-20 lg:h-24 bg-gradient-to-br ${question.gradientClasses.bg} overflow-hidden`}
              >
                {/* Padrão de grade gaming */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-6 sm:grid-cols-7 md:grid-cols-8 gap-0.5 sm:gap-1 h-full p-1.5 sm:p-2 md:p-4">
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
                      className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-white/40 rounded-full animate-float"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 2) * 20}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${3 + i * 0.5}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Badge de preço aprimorado */}
                <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 md:top-3 md:right-3 lg:top-4 lg:right-4 z-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-md sm:rounded-lg md:rounded-xl blur-sm opacity-75" />
                    <div className="relative bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-md sm:rounded-lg md:rounded-xl px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 shadow-lg border border-emerald-400/50">
                      {question.originalPrice && (
                        <>
                          <div className="text-xs text-white/80 line-through font-bold">
                            R$ {question.originalPrice.toFixed(2)}
                          </div>
                          <div className="text-xs text-yellow-300 font-bold hidden sm:block">
                            ECONOMIZE R$ {(question.originalPrice - question.price).toFixed(2)}
                          </div>
                        </>
                      )}
                      <div className="text-xs sm:text-sm md:text-base lg:text-lg font-black text-white drop-shadow-lg">
                        R$ {question.price.toFixed(2)}
                      </div>
                      <div className="text-xs text-white/90 font-bold hidden sm:block">DESBLOQUEIE AGORA</div>
                      <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-yellow-400 rounded-full animate-ping" />
                    </div>
                  </div>
                </div>

                {/* Ícone principal estilo gaming */}
                <div className="absolute bottom-1.5 left-2 sm:bottom-2 sm:left-3 md:bottom-4 md:left-6 z-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/30 rounded-lg sm:rounded-xl md:rounded-2xl blur-md" />
                    <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl border border-white/40 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <div className="relative">
                        {question.icon}
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Indicador de dificuldade */}
                <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 md:top-4 md:left-4 z-20">
                  <div className="flex items-center space-x-0.5 sm:space-x-1 bg-black/40 backdrop-blur-sm rounded-md sm:rounded-lg md:rounded-xl px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-4 md:py-2 border border-white/20 group-hover:bg-black/60 transition-colors duration-300">
                    <div className="flex space-x-0.5">{getDifficultyStars(question.difficultyLevel)}</div>
                    <span className="text-white font-bold text-xs sm:text-sm ml-1">
                      <span className="hidden sm:inline">NÍVEL </span>
                      {question.difficultyLevel}
                    </span>
                  </div>
                </div>

                {/* Badge de nível */}
                <div className="absolute bottom-1.5 right-2 sm:bottom-2 sm:right-3 md:bottom-4 md:right-6 z-20">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-md sm:rounded-lg px-1.5 py-0.5 sm:px-2 sm:py-0.5 md:px-3 md:py-1 shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <span className="text-black font-black text-xs uppercase tracking-wider">
                      {question.difficulty === "Básico" && "NOVATO"}
                      {question.difficulty === "Intermediário" && "PRO"}
                      {question.difficulty === "Avançado" && "ELITE"}
                      {question.difficulty === "Expert" && "LENDA"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-2 sm:p-2.5 md:p-3 lg:p-4 space-y-1.5 sm:space-y-2 md:space-y-2.5 lg:space-y-3 relative z-10">
                {/* Título */}
                <div>
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2 md:mb-3">
                    <div
                      className={`inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-0.5 md:px-3 md:py-1 rounded-full text-xs font-bold uppercase tracking-wider ${question.gradientClasses.badgeBg} ${question.gradientClasses.badgeText} border border-current/20`}
                    >
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-current rounded-full mr-1 sm:mr-2 animate-pulse" />
                      <span className="hidden sm:inline">{question.category}</span>
                      <span className="sm:hidden">{question.category.split(" ")[0]}</span>
                    </div>
                    <div className="text-emerald-400 font-bold text-xs sm:text-sm animate-bounce">
                      <span className="hidden sm:inline">+{question.extraBenefits} RECOMPENSAS</span>
                      <span className="sm:hidden">+{question.extraBenefits}</span>
                    </div>
                  </div>

                  <h3 className="font-black text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-0.5 sm:mb-1 md:mb-2 tracking-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    {question.title}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm md:text-base lg:text-lg font-bold ${question.gradientClasses.text} bg-gradient-to-r ${question.gradientClasses.accent} bg-clip-text text-transparent`}
                  >
                    {question.subtitle}
                  </p>
                </div>

                {/* Descrição */}
                <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                    {question.id === 1 &&
                      "Domine padrões visuais e desbloqueie sua inteligência espacial! Perfeito para iniciantes."}
                    {question.id === 2 &&
                      "Conquiste quebra-cabeças lógicos complexos e torne-se um campeão do raciocínio!"}
                    {question.id === 3 &&
                      "Libere sua inteligência pura e enfrente desafios abstratos como um profissional!"}
                    {question.id === 4 &&
                      "Complete o raid de inteligência definitivo! Enfrente todas as dimensões cognitivas."}
                  </p>

                  {/* Preview de benefícios gaming */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg p-1.5 sm:p-2 md:p-3 border border-slate-600/30">
                    <p className="text-xs text-cyan-400 font-black mb-1 sm:mb-2 uppercase tracking-wider">
                      🎮 RECOMPENSAS:
                    </p>
                    <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs text-slate-300">
                      <div className="flex items-center">
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-400 rounded-full mr-1 sm:mr-2"></div>
                        <span className="hidden sm:inline">Relatório de Inteligência</span>
                        <span className="sm:hidden">Relatório</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-400 rounded-full mr-1 sm:mr-2"></div>
                        <span className="hidden sm:inline">Badge de Conquista</span>
                        <span className="sm:hidden">Badge</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-400 rounded-full mr-1 sm:mr-2"></div>
                        <span className="hidden sm:inline">Análise de Habilidades</span>
                        <span className="sm:hidden">Análise</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-yellow-400 rounded-full mr-1 sm:mr-2"></div>
                        <span className="hidden sm:inline">Suporte 24/7</span>
                        <span className="sm:hidden">Suporte</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grade de estatísticas */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-3 py-1.5 sm:py-2 md:py-2.5 border-t border-b border-slate-700/50">
                  <div className="text-center group/stat">
                    <div className="flex items-center justify-center mb-1 sm:mb-2 p-1 sm:p-2 rounded-lg bg-slate-800/50 group-hover/stat:bg-slate-700/50 transition-colors">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-cyan-400" />
                    </div>
                    <div className="text-xs sm:text-sm md:text-lg font-black text-white">{question.timeEstimate}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-bold hidden md:block">
                      TEMPO DA MISSÃO
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-bold md:hidden">TEMPO</div>
                  </div>
                  <div className="text-center group/stat">
                    <div className="flex items-center justify-center mb-1 sm:mb-2 p-1 sm:p-2 rounded-lg bg-slate-800/50 group-hover/stat:bg-slate-700/50 transition-colors">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-400" />
                    </div>
                    <div className="text-xs sm:text-sm md:text-lg font-black text-white">{question.questions}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-bold hidden md:block">
                      DESAFIOS
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-bold md:hidden">QUEST</div>
                  </div>
                  <div className="text-center group/stat">
                    <div className="flex items-center justify-center mb-1 sm:mb-2 p-1 sm:p-2 rounded-lg bg-slate-800/50 group-hover/stat:bg-slate-700/50 transition-colors">
                      {getDifficultyIcon(question.difficulty)}
                    </div>
                    <div className="text-xs sm:text-sm md:text-lg font-black text-white">
                      {question.difficulty === "Básico" && "NOVATO"}
                      {question.difficulty === "Intermediário" && "PRO"}
                      {question.difficulty === "Avançado" && "ELITE"}
                      {question.difficulty === "Expert" && "LENDA"}
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">RANK</div>
                  </div>
                </div>

                {/* Benefícios */}
                <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
                  <p className="text-xs text-cyan-400 font-black uppercase tracking-widest">🏆 LOOT GARANTIDO:</p>
                  {question.mainBenefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center group/benefit">
                      <div className="relative mr-1.5 sm:mr-2 md:mr-3">
                        <CheckCircle
                          className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${question.gradientClasses.text} group-hover/benefit:scale-110 transition-transform`}
                        />
                        <div className="absolute inset-0 bg-current rounded-full opacity-20 animate-ping" />
                      </div>
                      <span className="text-slate-200 text-xs sm:text-sm font-medium">{benefit}</span>
                    </div>
                  ))}

                  {/* Sistema de Saldo de Bônus Compacto */}
                  {question.extraBenefits > 0 && (
                    <div className="relative overflow-hidden">
                      {/* Bonus Balance Display Compacto */}
                      <div className="flex items-center justify-between p-1.5 sm:p-2 md:p-4 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 rounded-lg border border-yellow-500/30 group-hover:border-yellow-400/50 transition-colors duration-300 mb-1.5 sm:mb-2 md:mb-3">
                        <div className="flex items-center">
                          <div className="relative">
                            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-yellow-400 mr-1.5 sm:mr-2 md:mr-3 animate-spin" />
                            <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-red-500 rounded-full animate-pulse" />
                          </div>
                          <div>
                            <span className="text-yellow-300 font-bold block text-xs sm:text-sm">
                              🎁 +{question.extraBenefits} CRÉDITOS BÔNUS!
                            </span>
                            <span className="text-yellow-200/80 text-xs hidden md:block">
                              Valor de R$ {(question.extraBenefits * 25).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-yellow-300 font-black text-xs sm:text-sm md:text-lg">
                            {question.extraBenefits * 100} PTS
                          </div>
                          <div className="text-yellow-200/70 text-xs hidden sm:block">Saldo</div>
                        </div>
                      </div>

                      {/* Bonus Redemption Options Compacto */}
                      <div className="grid grid-cols-3 gap-1 sm:gap-2">
                        <button
                          onClick={() => handleBonusActionClick("resgatar", "Resgatar Bônus")}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-xs font-bold py-1 sm:py-1.5 md:py-2 px-1.5 sm:px-2 md:px-3 rounded-md sm:rounded-lg transition-all duration-300 hover:scale-105 min-h-[28px] sm:min-h-[32px] md:min-h-[36px]"
                        >
                          RESGATAR
                        </button>
                        <button
                          onClick={() => handleBonusActionClick("transferir", "Transferir Bônus")}
                          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold py-1 sm:py-1.5 md:py-2 px-1.5 sm:px-2 md:px-3 rounded-md sm:rounded-lg transition-all duration-300 hover:scale-105 min-h-[28px] sm:min-h-[32px] md:min-h-[36px]"
                        >
                          TRANSFERIR
                        </button>
                        <button
                          onClick={() => handleBonusActionClick("trocar", "Trocar Bônus")}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold py-1 sm:py-1.5 md:py-2 px-1.5 sm:px-2 md:px-3 rounded-md sm:rounded-lg transition-all duration-300 hover:scale-105 min-h-[28px] sm:min-h-[32px] md:min-h-[36px]"
                        >
                          TROCAR
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Botões de ação */}
                <div className="flex flex-col sm:flex-row space-y-1.5 sm:space-y-0 sm:space-x-2 md:space-x-3 pt-2 sm:pt-2.5 md:pt-3 relative justify-center">
                  <div className="relative flex-1">
                    <Button
                      variant="outline"
                      className="w-full bg-slate-800/50 border-slate-600 hover:border-slate-500 text-slate-200 hover:text-white font-bold uppercase tracking-wider text-xs sm:text-sm backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300 group-hover:scale-105 min-h-[32px] sm:min-h-[36px] md:min-h-[44px] touch-manipulation"
                      onClick={() => setActiveDetailPopup(activeDetailPopup === question.id ? null : question.id)}
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden md:inline">PREVIEW DA MISSÃO</span>
                      <span className="md:hidden">PREVIEW</span>
                    </Button>

                    {/* Popup positioning for mobile */}
                    {activeDetailPopup === question.id && (
                      <div className="absolute bottom-full left-0 right-0 mb-2 z-50 animate-fade-in-up">
                        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg sm:rounded-xl shadow-2xl border border-slate-600/50 p-2.5 sm:p-3 md:p-4 backdrop-blur-sm max-h-80 overflow-y-auto mx-2 sm:mx-0">
                          <div className="flex items-center space-x-1.5 sm:space-x-2 mb-2 sm:mb-3">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                            <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">
                              {getPersuasiveDetails(question.id).badge}
                            </span>
                            <div className="ml-auto bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg text-xs font-bold">
                              {getPersuasiveDetails(question.id).stats} Taxa de Vitória
                            </div>
                          </div>

                          <h4 className="font-black text-white text-xs sm:text-sm mb-2 sm:mb-3">
                            🎯 Por Que Escolher Esta Missão?
                          </h4>

                          <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3">
                            {getPersuasiveDetails(question.id).reasons.map((reason, idx) => (
                              <p key={idx} className="text-xs text-slate-300 flex items-start">
                                <span className="text-emerald-400 mr-1 sm:mr-2 flex-shrink-0">⚡</span>
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

                          <div className="pt-2 sm:pt-3 border-t border-slate-600/50">
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
                    <div className="absolute top-1 right-1 sm:top-2 sm:right-2 z-30">
                      <div className="bg-green-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-bold flex items-center">
                        <CheckCircle className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 mr-0.5 sm:mr-1" />
                        <span className="hidden sm:inline">DESBLOQUEADO</span>
                        <span className="sm:hidden">OK</span>
                      </div>
                    </div>
                  )}
                  <Button
                    className={`flex-1 relative overflow-hidden bg-gradient-to-r ${question.gradientClasses.accent} hover:scale-105 transition-all duration-300 text-white font-black uppercase tracking-wider text-xs sm:text-sm shadow-2xl hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] group-hover:animate-pulse min-h-[32px] sm:min-h-[36px] md:min-h-[44px] touch-manipulation`}
                    onClick={() => handleStartTestClick(question)}
                  >
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative flex items-center justify-center">
                      <span className="hidden md:inline">INICIAR MISSÃO</span>
                      <span className="md:hidden">INICIAR</span>
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ml-1 sm:ml-2 animate-bounce" />
                    </span>
                  </Button>
                </div>

                {/* Indicadores de confiança gaming */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-1.5 sm:pt-2 md:pt-2.5 border-t border-slate-700/30">
                  <div className="flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-4 text-xs text-slate-400">
                    <div className="flex items-center">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                      <span className="hidden sm:inline">Pagamento Seguro</span>
                      <span className="sm:hidden">Seguro</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full mr-1 animate-pulse"></div>
                      <span className="hidden sm:inline">Garantia de 7 Dias</span>
                      <span className="sm:hidden">Garantia</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-purple-400 rounded-full mr-1 animate-pulse"></div>
                      <span className="hidden md:inline">Suporte da Guilda 24/7</span>
                      <span className="md:hidden">Suporte 24/7</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Destaque inferior estilo gaming */}
              <div
                className={`h-1 sm:h-1.5 md:h-2 bg-gradient-to-r ${question.gradientClasses.accent} opacity-60 group-hover:opacity-100 transition-opacity duration-300 relative overflow-hidden`}
              >
                <div className="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </div>
          ))}
        </div>

        {/* Credibility section */}
        <div className="mt-6 sm:mt-8 md:mt-12 text-center">
          <div className="bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6 lg:px-8 lg:py-8 border border-slate-200/50 dark:border-slate-700/50 flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-6">
            {/* Credibility items */}
            <div className="flex flex-col space-y-2 sm:space-y-3 md:space-y-4 lg:flex-row lg:space-y-0 lg:items-center lg:justify-center lg:space-x-4 xl:space-x-6">
              <div className="flex items-center space-x-1.5 sm:space-x-2 justify-center lg:justify-start">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                  Validação Científica
                </span>
              </div>
              <div className="flex items-center space-x-1.5 sm:space-x-2 justify-center lg:justify-start">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                  Precisão Psicométrica
                </span>
              </div>
              <div className="flex items-center space-x-1.5 sm:space-x-2 justify-center lg:justify-start">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-purple-500 rounded-full"></div>
                <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                  Certificação Profissional
                </span>
              </div>
            </div>
            {/* Premium button */}
            <Button
              onClick={() => setShowGoToPremiumPopup(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-md sm:rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm md:text-base min-h-[36px] sm:min-h-[40px] md:min-h-[44px]"
            >
              <Gift className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2" />
              <span className="hidden sm:inline">Explore Nossos Planos Premium</span>
              <span className="sm:hidden">Planos Premium</span>
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-3 md:p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-3 sm:p-4 md:p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg md:text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                  <Crown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-1.5 sm:mr-2 text-purple-600" />
                  Planos Premium
                </h2>
                <button
                  onClick={() => setShowPremiumPlansModal(false)}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] md:min-w-[44px] md:min-h-[44px] flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-4 md:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {sampleQuestionsData.map((plan) => (
                  <div
                    key={plan.id}
                    className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-slate-200 dark:border-slate-600 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="text-center mb-3 sm:mb-4">
                      <div
                        className={`inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${plan.gradientClasses.bg} mb-2 sm:mb-3`}
                      >
                        {plan.icon}
                      </div>
                      <h3 className="font-bold text-sm sm:text-base md:text-lg text-slate-900 dark:text-white">
                        {plan.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">{plan.subtitle}</p>
                    </div>

                    <div className="text-center mb-3 sm:mb-4">
                      {plan.originalPrice && (
                        <div className="text-xs sm:text-sm text-slate-500 line-through">
                          R$ {plan.originalPrice.toFixed(2)}
                        </div>
                      )}
                      <div className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 dark:text-white">
                        R$ {plan.price.toFixed(2)}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">Pagamento único</div>
                    </div>

                    <div className="space-y-1 sm:space-y-1.5 md:space-y-2 mb-3 sm:mb-4 md:mb-6">
                      <div className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-emerald-500 mr-1 sm:mr-1.5 md:mr-2 flex-shrink-0" />
                        {plan.questions} questões
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-emerald-500 mr-1 sm:mr-1.5 md:mr-2 flex-shrink-0" />
                        {plan.timeLimit} minutos
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-emerald-500 mr-1 sm:mr-1.5 md:mr-2 flex-shrink-0" />
                        Relatório detalhado
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-emerald-500 mr-1 sm:mr-1.5 md:mr-2 flex-shrink-0" />
                        Certificado digital
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        setShowPremiumPlansModal(false)
                        handleStartTestClick(plan)
                      }}
                      className={`w-full bg-gradient-to-r ${plan.gradientClasses.accent} text-white font-bold py-1.5 sm:py-2 md:py-2 px-2 sm:px-3 md:px-4 rounded-md sm:rounded-lg hover:scale-105 transition-all duration-300 text-xs sm:text-sm min-h-[32px] sm:min-h-[36px] md:min-h-[44px]`}
                    >
                      Escolher Plano
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-4 sm:mt-6 md:mt-8 text-center">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-2 sm:mb-3 md:mb-4">
                  Todos os planos incluem garantia de 7 dias e suporte 24/7
                </p>
                <div className="flex items-center justify-center space-x-3 sm:space-x-4 md:space-x-6 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mr-1"></div>
                    Pagamento Seguro
                  </div>
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full mr-1"></div>
                    SSL Criptografado
                  </div>
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full mr-1"></div>
                    Suporte Premium
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Go To Premium Popup */}
      {showGoToPremiumPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center p-3 sm:p-4 animate-fade-in-up">
          <div className="bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 opacity-100">
            <div className="p-3 sm:p-4 md:p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center">
                  <Gift className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-1.5 sm:mr-2 md:mr-3 text-yellow-500" />
                  Acesso Premium Exclusivo
                </h2>
                <button
                  onClick={() => setShowGoToPremiumPopup(false)}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] md:min-w-[44px] md:min-h-[44px] flex items-center justify-center"
                  aria-label="Fechar popup"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-5">
              <p className="text-slate-600 dark:text-slate-300 text-center text-xs sm:text-sm md:text-base leading-relaxed">
                Descubra todos os benefícios e recursos avançados disponíveis em nossos planos premium. Eleve sua
                experiência e desbloqueie seu potencial máximo!
              </p>
              <Button
                onClick={() => {
                  router.push("/premium")
                  setShowGoToPremiumPopup(false)
                }}
                className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white font-bold py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 rounded-md sm:rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm md:text-base min-h-[36px] sm:min-h-[40px] md:min-h-[44px]"
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2" />
                Ver Planos Premium Agora
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Premium Lock Popup for Bonus Actions */}
      {showPremiumLockPopup && lockedActionMessage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[70] flex items-center justify-center p-3 sm:p-4 animate-fade-in-up">
          <div className="bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 opacity-100">
            <div className="p-3 sm:p-4 md:p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-1.5 sm:mr-2 md:mr-3 text-amber-500" />
                  Acesso Restrito
                </h2>
                <button
                  onClick={() => setShowPremiumLockPopup(false)}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] md:min-w-[44px] md:min-h-[44px] flex items-center justify-center"
                  aria-label="Fechar popup"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-5">
              <p className="text-slate-600 dark:text-slate-300 text-center text-xs sm:text-sm md:text-base leading-relaxed">
                {lockedActionMessage}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-center text-xs sm:text-sm">
                Faça upgrade para um plano Premium para desbloquear esta e muitas outras vantagens exclusivas!
              </p>
              <Button
                onClick={() => {
                  router.push("/premium")
                  setShowPremiumLockPopup(false)
                }}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:from-purple-700 hover:via-pink-600 hover:to-red-600 text-white font-bold py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 rounded-md sm:rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm md:text-base min-h-[36px] sm:min-h-[40px] md:min-h-[44px]"
              >
                <Crown className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2" />
                Ver Planos Premium
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
