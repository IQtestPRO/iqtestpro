"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Target,
  Zap,
  Star,
  Trophy,
  ArrowRight,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Award,
  Eye,
  Puzzle,
  Crown,
  Lock,
  Layers,
  Network,
  Cpu,
  Gift,
  BarChart3,
  DollarSign,
  Clock,
  Users,
  Percent,
} from "lucide-react"
import { useRouter } from "next/navigation"
import type React from "react"
import { QuestionTypeModal } from "@/components/question-type-modal"
import { PremiumPaymentModal } from "@/components/premium-payment-modal"
import { useInteractivePopups } from "@/components/interactive-preview-popups"
import { useEffect, useCallback } from "react"
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
    icon: <Eye className="w-10 h-10 text-white" />,
    backgroundPattern: (
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-6 gap-2 h-full">
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
    icon: <Brain className="w-10 h-10 text-white" />,
    backgroundPattern: (
      <div className="absolute inset-0 opacity-10">
        <div className="flex items-center justify-center h-full">
          <Network className="w-32 h-32 text-white" />
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
    icon: <Puzzle className="w-10 h-10 text-white" />,
    backgroundPattern: (
      <div className="absolute inset-0 opacity-10">
        <div className="flex items-center justify-center h-full">
          <Layers className="w-28 h-28 text-white transform rotate-12" />
          <Cpu className="w-20 h-20 text-white transform -rotate-12 -ml-8" />
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
    subtitle: "Assinatura Expert",
    category: "Análise Multidimensional",
    icon: <Crown className="w-10 h-10 text-white" />,
    backgroundPattern: (
      <div className="absolute inset-0 opacity-10">
        <div className="flex items-center justify-center h-full">
          <BarChart3 className="w-24 h-24 text-white transform rotate-6" />
          <Sparkles className="w-16 h-16 text-white transform -rotate-12 ml-4" />
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
  // Only run on client side
  if (typeof window === "undefined") {
    return { hasAccess: false, allUnlocked: false }
  }

  try {
    // Lógica para verificar o acesso premium do usuário
    // Pode verificar um token no localStorage, um cookie, etc.
    const hasAccess = localStorage.getItem("premiumAccess") === "true"
    const allUnlocked = localStorage.getItem("allTestsUnlocked") === "true"

    return { hasAccess, allUnlocked }
  } catch (error) {
    console.error("Error checking premium access:", error)
    return { hasAccess: false, allUnlocked: false }
  }
}

export default function ChooseTestLevelSection() {
  const router = useRouter()
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
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

  const subscriptionLevels = [
    {
      id: "beginner",
      name: "Iniciante",
      subtitle: "Primeira assinatura de QI",
      difficulty: "Fácil",
      duration: "10-15 min",
      questions: 30,
      accuracy: 85,
      price: 14.9,
      originalPrice: 29.9,
      monthlyPrice: 4.97,
      icon: Brain,
      color: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      darkBgGradient: "from-green-900/20 to-emerald-900/20",
      description: "Para quem nunca teve uma assinatura de QI",
      features: ["Questões básicas de lógica", "Explicações detalhadas", "Resultado imediato", "Dicas de melhoria"],
      targetAudience: "Estudantes e curiosos",
      averageScore: "95-115",
      route: "/test/beginner",
      badge: "INICIANTE",
      badgeColor: "from-green-400 to-emerald-500",
      savings: "50% OFF",
    },
    {
      id: "intermediate",
      name: "Intermediário",
      subtitle: "Assinatura padrão completa",
      difficulty: "Médio",
      duration: "15-20 min",
      questions: 45,
      accuracy: 92,
      price: 24.9,
      originalPrice: 49.9,
      monthlyPrice: 8.3,
      icon: Target,
      color: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      darkBgGradient: "from-blue-900/20 to-cyan-900/20",
      description: "Assinatura completa com precisão científica",
      features: [
        "Questões variadas e balanceadas",
        "Análise de múltiplas habilidades",
        "Comparação com população",
        "Certificado digital",
      ],
      targetAudience: "Profissionais e acadêmicos",
      averageScore: "85-130",
      route: "/test/intermediate",
      popular: true,
      badge: "MAIS ESCOLHIDO",
      badgeColor: "from-yellow-400 to-orange-500",
      savings: "50% OFF",
    },
    {
      id: "advanced",
      name: "Avançado",
      subtitle: "Máximo desafio mental",
      difficulty: "Difícil",
      duration: "25-30 min",
      questions: 60,
      accuracy: 98,
      price: 39.9,
      originalPrice: 79.9,
      monthlyPrice: 13.3,
      icon: Trophy,
      color: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      darkBgGradient: "from-purple-900/20 to-pink-900/20",
      description: "Para mentes excepcionais que buscam precisão máxima",
      features: [
        "Questões de alta complexidade",
        "Análise psicométrica completa",
        "Relatório detalhado PDF",
        "Consultoria personalizada",
      ],
      targetAudience: "Superdotados e especialistas",
      averageScore: "100-160+",
      route: "/test/advanced",
      badge: "PREMIUM",
      badgeColor: "from-purple-400 to-pink-500",
      savings: "50% OFF",
    },
  ]

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
    // Only check access after component mounts (client-side)
    if (typeof window !== "undefined") {
      const accessInfo = checkPremiumAccess()
      setPremiumAccess(accessInfo)
    }
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
        // Only proceed if we're on the client side
        if (typeof window === "undefined") {
          return
        }

        // Verificar se já tem acesso premium
        const accessInfo = checkPremiumAccess()

        if (accessInfo.hasAccess) {
          // Se já tem acesso, ir direto para o quiz especializado
          // Store quiz configuration for specialized experience
          localStorage.setItem(
            "selectedQuizConfig",
            JSON.stringify({
              id: question.id,
              title: question.title,
              questions: question.questions,
              timeLimit: question.timeLimit,
              features: question.features,
              difficulty: question.difficulty,
              specializedMode: true,
              detailedFeedback: true,
              comprehensiveAssessment: true,
            }),
          )

          router.push(`/quiz/${question.id}`)
          return
        }

        // Check if payment context is available
        if (!openPaymentModal) {
          console.error("Payment context not available")
          // Fallback with quiz promise parameters
          router.push(
            `/payment?testId=${question.id}&questions=${question.questions}&feedback=detailed&assessment=comprehensive`,
          )
          return
        }

        // Se não tem acesso, abrir modal de pagamento com quiz promises
        const levelData = {
          id: question.id,
          title: question.title,
          price: question.price,
          originalPrice: question.originalPrice,
          questions: question.questions,
          timeLimit: question.timeLimit,
          features: question.features,
          specializedQuestions: true,
          detailedFeedback: true,
          comprehensiveAssessment: true,
          postPaymentRedirect: `/quiz/${question.id}`,
        }

        openPaymentModal(`Começar ${question.title}`, `test-level-${question.id}`, levelData)
      } catch (error) {
        console.error("Error starting test:", error)
        // Enhanced fallback with quiz specifications
        router.push(`/payment?testId=${question.id}&questions=${question.questions}&specialized=true&feedback=detailed`)
      }
    },
    [router, openPaymentModal],
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

          // Store purchase data and unlock access
          localStorage.setItem("purchasedTest", JSON.stringify(purchaseData))
          localStorage.setItem("testPaid", "true")
          localStorage.setItem("allQuizzesUnlocked", "true")
          localStorage.setItem("premiumAccess", "true")

          // Store quiz configuration for specialized experience
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

          // Show success notification
          setTimeout(() => {
            alert(
              `✅ Pagamento confirmado! Redirecionando para seu quiz de ${selectedLevelForPayment.questions} questões especializadas...`,
            )
          }, 500)

          // Redirect to specialized quiz
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
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 mb-6 text-sm font-bold">
            <Sparkles className="w-4 h-4 mr-2" />
            ESCOLHA SEU NÍVEL
          </Badge>

          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white text-center">
            Qual é a Sua
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block">
              Assinatura Ideal?
            </span>
          </h2>

          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Escolha o nível de dificuldade que melhor se adapta ao seu perfil e experiência
          </p>
        </div>

        {/* Ideal Subscription Highlight Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 mb-6 text-lg font-bold rounded-full shadow-lg">
              <Star className="w-5 h-5 mr-2" />
              ASSINATURA IDEAL
            </Badge>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Recomendação Personalizada</h3>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Baseado em milhares de usuários, esta é a assinatura mais equilibrada e completa
            </p>
          </div>

          {/* Featured Subscription Card */}
          <div className="max-w-4xl mx-auto">
            <Card className="relative overflow-hidden bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg border-2 border-yellow-400/50 shadow-2xl shadow-yellow-500/25 transform hover:scale-105 transition-all duration-500">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 opacity-50"></div>

              {/* Featured Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 font-bold shadow-lg flex items-center justify-center text-lg">
                  <Star className="w-5 h-5 mr-2" />
                  MAIS ESCOLHIDO
                </Badge>
              </div>

              <div className="relative z-10 p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Left Side - Info */}
                  <div className="text-center lg:text-left">
                    <div className="flex justify-center lg:justify-start mb-6">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl">
                        <Target className="w-12 h-12 text-white" />
                      </div>
                    </div>

                    <h4 className="text-3xl md:text-4xl font-bold text-white mb-4">Assinatura Intermediária</h4>
                    <p className="text-xl text-blue-200 mb-6">Assinatura padrão completa com precisão científica</p>

                    {/* Key Features */}
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center justify-center lg:justify-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                        <span className="text-white font-medium">45 questões variadas e balanceadas</span>
                      </div>
                      <div className="flex items-center justify-center lg:justify-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                        <span className="text-white font-medium">Análise de múltiplas habilidades</span>
                      </div>
                      <div className="flex items-center justify-center lg:justify-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                        <span className="text-white font-medium">Certificado digital reconhecido</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">92%</div>
                        <div className="text-sm text-blue-200">Precisão</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">15-20</div>
                        <div className="text-sm text-blue-200">Minutos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">78%</div>
                        <div className="text-sm text-blue-200">Escolhem</div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Pricing */}
                  <div className="text-center">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                      {/* Pricing */}
                      <div className="mb-6">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Badge className="bg-red-500 text-white px-3 py-1 text-sm font-bold">
                            <Percent className="w-3 h-3 mr-1" />
                            50% OFF
                          </Badge>
                        </div>
                        <div className="text-lg text-blue-200 line-through mb-1">De R$ 49,90</div>
                        <div className="text-5xl font-black text-white mb-2">
                          R$ 24<span className="text-2xl">,90</span>
                        </div>
                        <div className="text-blue-200 mb-4">ou 3x de R$ 8,30 sem juros</div>
                      </div>

                      {/* Value Props */}
                      <div className="space-y-3 mb-8">
                        <div className="flex items-center justify-center gap-2 text-sm text-green-400">
                          <DollarSign className="w-4 h-4" />
                          <span>Melhor custo-benefício</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm text-blue-300">
                          <Users className="w-4 h-4" />
                          <span>Escolhido por 78% dos usuários</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm text-purple-300">
                          <Clock className="w-4 h-4" />
                          <span>Acesso imediato após pagamento</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button
                        onClick={() => router.push("/test/intermediate")}
                        className="w-full py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        <Star className="w-5 h-5 mr-2" />
                        Começar Assinatura Ideal
                      </Button>

                      <p className="text-xs text-blue-300 mt-3">⚡ Ativação instantânea • 🔒 Pagamento seguro</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* All Subscription Plans */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Todas as Assinaturas Disponíveis</h3>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Compare todos os planos e escolha o que melhor se adapta ao seu perfil
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {subscriptionLevels.map((level, index) => {
              const IconComponent = level.icon
              const isSelected = selectedLevel === level.id

              return (
                <Card
                  key={level.id}
                  className={`relative overflow-hidden transition-all duration-500 cursor-pointer group hover:scale-105 ${
                    level.popular
                      ? "ring-4 ring-blue-400/50 shadow-2xl shadow-blue-500/25"
                      : "hover:shadow-2xl hover:shadow-white/10"
                  } ${
                    isSelected ? "ring-4 ring-purple-400/50 scale-105" : ""
                  } bg-white/10 backdrop-blur-lg border-white/20`}
                  onClick={() => setSelectedLevel(level.id)}
                >
                  {/* Badge */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <Badge
                      className={`bg-gradient-to-r ${level.badgeColor} text-black px-4 py-2 font-bold shadow-lg flex items-center justify-center`}
                    >
                      {level.popular ? (
                        <Star className="w-4 h-4 mr-1" />
                      ) : level.id === "advanced" ? (
                        <Trophy className="w-4 h-4 mr-1" />
                      ) : (
                        <Target className="w-4 h-4 mr-1" />
                      )}
                      {level.badge}
                    </Badge>
                  </div>

                  {/* Animated Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  />

                  <CardHeader className="relative z-10 text-center pb-6 pt-8">
                    <div
                      className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${level.color} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>

                    <CardTitle className="text-2xl font-bold mb-2 text-white text-center">{level.name}</CardTitle>
                    <p className="text-blue-200 mb-4 text-center">{level.subtitle}</p>

                    {/* Pricing Section */}
                    <div className="bg-white/5 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Badge className="bg-red-500 text-white px-2 py-1 text-xs font-bold">{level.savings}</Badge>
                      </div>
                      <div className="text-sm text-blue-300 line-through mb-1">
                        De R$ {level.originalPrice?.toFixed(2)}
                      </div>
                      <div className="text-3xl font-black text-white mb-1">R$ {level.price.toFixed(2)}</div>
                      <div className="text-xs text-blue-200">ou 3x de R$ {level.monthlyPrice.toFixed(2)}</div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{level.questions}</div>
                        <div className="text-xs text-blue-200">Questões</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{level.duration}</div>
                        <div className="text-xs text-blue-200">Duração</div>
                      </div>
                    </div>

                    {/* Accuracy */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-blue-200">Precisão</span>
                        <span className="text-sm font-bold text-white">{level.accuracy}%</span>
                      </div>
                      <Progress value={level.accuracy} className="h-2 bg-white/20" />
                    </div>

                    <div className="flex justify-center">
                      <Badge
                        variant="outline"
                        className={`border-2 ${level.difficulty === "Fácil" ? "border-green-400 text-green-400" : level.difficulty === "Médio" ? "border-blue-400 text-blue-400" : "border-purple-400 text-purple-400"} bg-transparent`}
                      >
                        {level.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10 space-y-6">
                    <p className="text-blue-100 text-center text-sm leading-relaxed">{level.description}</p>

                    {/* Features */}
                    <ul className="space-y-3">
                      {level.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-sm text-blue-100">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Additional Info */}
                    <div className="bg-white/5 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-blue-200">Público-alvo:</span>
                        <span className="text-xs text-white font-medium">{level.targetAudience}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-blue-200">QI médio:</span>
                        <span className="text-xs text-white font-medium">{level.averageScore}</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => router.push(level.route)}
                      className={`w-full py-3 font-bold rounded-xl transition-all duration-300 bg-gradient-to-r ${level.color} hover:shadow-lg text-white group-hover:scale-105`}
                    >
                      Começar Assinatura {level.name}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>

                  {/* Decorative Corner */}
                  <div className="absolute top-4 right-4 opacity-30">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-4xl mx-auto border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">Não sabe qual escolher?</h3>
            <p className="text-blue-200 mb-6 text-center">
              Comece com a assinatura Intermediária - é a mais equilibrada e usada por 78% dos nossos usuários
            </p>
            <div className="flex justify-center">
              <Button
                onClick={() => router.push("/test/intermediate")}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 font-bold rounded-full"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Começar Assinatura Recomendada
              </Button>
            </div>
          </div>
        </div>
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
