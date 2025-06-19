"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ChevronRight, ChevronLeft, Shield, Trophy, Lock, Crown, Play } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface Question {
  id: number
  type: string
  question: string
  options: string[]
  correctAnswer: number
  timeLimit: number
  difficulty: "Básico" | "Intermediário" | "Avançado" | "Expert"
}

// SISTEMA DE CONTROLE DE ACESSO RIGOROSO
const PLAN_ACCESS = {
  basic: [1], // Apenas teste básico
  intermediate: [1, 2], // Básico + Intermediário
  advanced: [1, 2, 3], // Básico + Intermediário + Avançado
  premium: [1, 2, 3, 6], // Todos os testes
}

// Banco de questões REAL e INTERATIVO
const questionBank = {
  1: [
    // Básico - Padrões Visuais
    {
      id: 1,
      type: "Padrões Visuais",
      question: "Qual forma completa a sequência: ○ △ ○ △ ?",
      options: ["○", "△", "□", "◇"],
      correctAnswer: 0,
      timeLimit: 45,
      difficulty: "Básico" as const,
    },
    {
      id: 2,
      type: "Padrões Visuais",
      question: "Na sequência de cores: Azul, Vermelho, Azul, Vermelho, qual vem a seguir?",
      options: ["Verde", "Azul", "Amarelo", "Vermelho"],
      correctAnswer: 1,
      timeLimit: 30,
      difficulty: "Básico" as const,
    },
    {
      id: 3,
      type: "Lógica Simples",
      question: "Se A = 1, B = 2, C = 3, quanto vale D?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
      timeLimit: 30,
      difficulty: "Básico" as const,
    },
    {
      id: 4,
      type: "Matemática Básica",
      question: "Qual é o resultado de 15 + 27?",
      options: ["41", "42", "43", "44"],
      correctAnswer: 1,
      timeLimit: 45,
      difficulty: "Básico" as const,
    },
    {
      id: 5,
      type: "Sequências",
      question: "Complete a sequência: 2, 4, 6, 8, ?",
      options: ["9", "10", "11", "12"],
      correctAnswer: 1,
      timeLimit: 30,
      difficulty: "Básico" as const,
    },
  ],
  2: [
    // Intermediário - Quebra-cabeças Lógicos
    {
      id: 1,
      type: "Raciocínio Lógico",
      question: "Se todos os A são B, e alguns B são C, então:",
      options: ["Todos os A são C", "Alguns A podem ser C", "Nenhum A é C", "Todos os C são A"],
      correctAnswer: 1,
      timeLimit: 90,
      difficulty: "Intermediário" as const,
    },
    {
      id: 2,
      type: "Raciocínio Lógico",
      question:
        "Em uma sala há 5 pessoas. Se cada pessoa cumprimenta todas as outras uma vez, quantos cumprimentos acontecem?",
      options: ["10", "15", "20", "25"],
      correctAnswer: 0,
      timeLimit: 120,
      difficulty: "Intermediário" as const,
    },
    {
      id: 3,
      type: "Padrões Numéricos",
      question: "Qual é o próximo número na sequência: 1, 4, 9, 16, ?",
      options: ["20", "25", "30", "36"],
      correctAnswer: 1,
      timeLimit: 90,
      difficulty: "Intermediário" as const,
    },
    {
      id: 4,
      type: "Analogias",
      question: "Carro está para Estrada assim como Barco está para:",
      options: ["Porto", "Água", "Vela", "Âncora"],
      correctAnswer: 1,
      timeLimit: 75,
      difficulty: "Intermediário" as const,
    },
    {
      id: 5,
      type: "Lógica Verbal",
      question: "Se 'CASA' é para 'ACAS', então 'BOLA' é para:",
      options: ["ALOB", "LOBA", "OLAB", "BALO"],
      correctAnswer: 0,
      timeLimit: 90,
      difficulty: "Intermediário" as const,
    },
  ],
  3: [
    // Avançado - Raciocínio Abstrato
    {
      id: 1,
      type: "Raciocínio Abstrato",
      question:
        "Na matriz 3x3, qual elemento falta na posição inferior direita se o padrão é rotação de 90° no sentido horário?",
      options: ["↑", "→", "↓", "←"],
      correctAnswer: 2,
      timeLimit: 180,
      difficulty: "Avançado" as const,
    },
    {
      id: 2,
      type: "Matemática Avançada",
      question: "Se x² - 5x + 6 = 0, quais são os valores de x?",
      options: ["2 e 3", "1 e 6", "2 e 4", "1 e 5"],
      correctAnswer: 0,
      timeLimit: 150,
      difficulty: "Avançado" as const,
    },
    {
      id: 3,
      type: "Lógica Complexa",
      question:
        "Em um grupo de 100 pessoas, 60 falam inglês, 40 falam francês e 20 falam ambos. Quantas não falam nenhum dos dois?",
      options: ["20", "30", "40", "50"],
      correctAnswer: 0,
      timeLimit: 180,
      difficulty: "Avançado" as const,
    },
    {
      id: 4,
      type: "Sequências Complexas",
      question: "Qual é o próximo termo na sequência: 2, 6, 12, 20, 30, ?",
      options: ["40", "42", "44", "46"],
      correctAnswer: 1,
      timeLimit: 120,
      difficulty: "Avançado" as const,
    },
    {
      id: 5,
      type: "Raciocínio Espacial",
      question: "Quantos cubos pequenos são necessários para formar um cubo 4x4x4?",
      options: ["48", "56", "64", "72"],
      correctAnswer: 2,
      timeLimit: 150,
      difficulty: "Avançado" as const,
    },
  ],
  6: [
    // Expert - Teste Completo
    {
      id: 1,
      type: "Raciocínio Complexo",
      question: "Se f(x) = 2x + 1 e g(x) = x², qual é o valor de f(g(3))?",
      options: ["19", "18", "17", "20"],
      correctAnswer: 0,
      timeLimit: 240,
      difficulty: "Expert" as const,
    },
    {
      id: 2,
      type: "Lógica Proposicional",
      question: "Se P → Q é falso e Q → R é verdadeiro, qual das seguintes é necessariamente verdadeira?",
      options: ["P é verdadeiro", "Q é falso", "R é verdadeiro", "P → R é falso"],
      correctAnswer: 1,
      timeLimit: 300,
      difficulty: "Expert" as const,
    },
    {
      id: 3,
      type: "Combinatória",
      question: "De quantas maneiras diferentes 5 pessoas podem se sentar em uma mesa redonda?",
      options: ["24", "60", "120", "240"],
      correctAnswer: 0,
      timeLimit: 180,
      difficulty: "Expert" as const,
    },
    {
      id: 4,
      type: "Teoria dos Números",
      question: "Qual é o menor número primo maior que 100?",
      options: ["101", "103", "107", "109"],
      correctAnswer: 0,
      timeLimit: 120,
      difficulty: "Expert" as const,
    },
    {
      id: 5,
      type: "Geometria Analítica",
      question: "Qual é a distância entre os pontos (3, 4) e (7, 1)?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 0,
      timeLimit: 150,
      difficulty: "Expert" as const,
    },
  ],
}

export default function InteractiveTestPage() {
  const router = useRouter()
  const params = useParams()
  const { user } = useAuth()
  const testId = Number.parseInt(params.id as string)

  // ESTADOS DO QUIZ INTERATIVO
  const [hasAccess, setHasAccess] = useState(false)
  const [userPlan, setUserPlan] = useState<string | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isStarted, setIsStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  // VALIDAÇÃO RIGOROSA DE ACESSO
  useEffect(() => {
    const validateAccess = () => {
      // Verificar se usuário está logado
      if (!user) {
        router.push("/login")
        return
      }

      // Verificar plano do usuário
      const purchasedTest = localStorage.getItem("purchasedTest")
      const testPaid = localStorage.getItem("testPaid")

      if (!purchasedTest && !testPaid) {
        // SEM PAGAMENTO - REDIRECIONAR PARA PLANOS
        router.push("/premium")
        return
      }

      try {
        let plan = "basic" // default

        if (testPaid === "true") {
          plan = localStorage.getItem("purchasedLevel") || "basic"
        } else if (purchasedTest) {
          const testData = JSON.parse(purchasedTest)
          plan = testData.level || "basic"
        }

        setUserPlan(plan)

        // Verificar se o plano dá acesso ao teste solicitado
        const allowedTests = PLAN_ACCESS[plan as keyof typeof PLAN_ACCESS] || []

        if (!allowedTests.includes(testId)) {
          // ACESSO NEGADO - REDIRECIONAR PARA UPGRADE
          router.push(`/premium?upgrade=${testId}`)
          return
        }

        // ACESSO LIBERADO
        setHasAccess(true)
        const testQuestions = questionBank[testId as keyof typeof questionBank] || []
        setQuestions(testQuestions)
        setTimeLeft(testQuestions[0]?.timeLimit || 60)
      } catch (error) {
        console.error("Erro na validação de acesso:", error)
        router.push("/premium")
      }

      setIsLoading(false)
    }

    validateAccess()
  }, [testId, user, router])

  // CRONÔMETRO FUNCIONAL
  useEffect(() => {
    if (!isStarted || questions.length === 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext() // Auto-avançar quando tempo acabar
          return questions[Math.min(currentQuestion + 1, questions.length - 1)]?.timeLimit || 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuestion, isStarted, questions])

  // ATUALIZAR CRONÔMETRO AO MUDAR DE QUESTÃO
  useEffect(() => {
    if (isStarted && currentQuestion < questions.length) {
      setTimeLeft(questions[currentQuestion].timeLimit)
      setSelectedAnswer(null)
    }
  }, [currentQuestion, isStarted, questions])

  const handleStart = () => {
    setIsStarted(true)
  }

  // SISTEMA DE SELEÇÃO INTERATIVO
  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  // NAVEGAÇÃO ENTRE QUESTÕES
  const handleNext = () => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedAnswer ?? -1
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // CALCULAR RESULTADO FINAL
      calculateResults(newAnswers)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1] ?? null)
    }
  }

  // SISTEMA DE PONTUAÇÃO EM TEMPO REAL
  const calculateResults = (finalAnswers: number[]) => {
    const correctAnswers = finalAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length

    const finalScore = Math.round((correctAnswers / questions.length) * 100)
    const iqEstimate = Math.round(finalScore * 1.5 + 70) // Fórmula simplificada

    setScore(iqEstimate)
    setShowResults(true)

    // Salvar resultado
    const result = {
      score: iqEstimate,
      correctAnswers,
      totalQuestions: questions.length,
      completedAt: new Date().toISOString(),
      testLevel: questions[0]?.difficulty,
      testId,
      isPremium: true,
    }

    localStorage.setItem("lastTestResult", JSON.stringify(result))

    // Redirecionar para página de resultados após 3 segundos
    setTimeout(() => {
      router.push("/results/premium")
    }, 3000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // TELA DE CARREGAMENTO
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Validando acesso ao teste...</p>
        </div>
      </div>
    )
  }

  // TELA DE ACESSO NEGADO
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Lock className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Acesso Restrito</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Este teste requer um plano premium. Faça upgrade para acessar.
            </p>
            <Button onClick={() => router.push("/premium")} className="w-full">
              <Crown className="w-4 h-4 mr-2" />
              Ver Planos Premium
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // TELA DE RESULTADOS
  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-8 text-center">
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Parabéns!</h1>
            <p className="text-xl mb-6">Seu QI estimado é:</p>
            <div className="text-6xl font-bold text-blue-600 mb-6">{score}</div>
            <p className="text-slate-600 mb-8">
              Você acertou {answers.filter((answer, index) => answer === questions[index].correctAnswer).length} de{" "}
              {questions.length} questões
            </p>
            <div className="animate-pulse">
              <p className="text-sm text-slate-500">Redirecionando para resultados detalhados...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // TELA INICIAL DO TESTE
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-8">
            {/* Badge Premium */}
            <div className="text-center mb-6">
              <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 text-lg">
                <Trophy className="w-5 h-5 mr-2" />
                TESTE PREMIUM DESBLOQUEADO
              </Badge>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">Teste de QI - Nível {questions[0]?.difficulty}</h1>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Badge variant="outline" className="px-3 py-1">
                  {questions[0]?.difficulty}
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  {questions.length} questões
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  ~{Math.round(questions.reduce((acc, q) => acc + q.timeLimit, 0) / 60)} minutos
                </Badge>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg mb-8">
              <h3 className="font-semibold mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-500" />
                Seu Teste Premium Inclui:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Cronômetro por questão</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Pontuação em tempo real</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Navegação entre questões</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Resultado detalhado</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleStart}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-xl py-6"
            >
              <Play className="w-6 h-6 mr-2" />
              Iniciar Teste Interativo
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // INTERFACE PRINCIPAL DO TESTE INTERATIVO
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 p-4">
      <div className="container mx-auto max-w-4xl pt-20">
        {/* Header Premium */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                <Trophy className="w-4 h-4 mr-1" />
                PREMIUM
              </Badge>
              <h1 className="text-2xl font-bold">Teste Interativo de QI</h1>
            </div>
            <div className="flex items-center space-x-2 text-lg font-semibold">
              <Clock className="w-5 h-5" />
              <span className={timeLeft <= 10 ? "text-red-500" : "text-slate-600 dark:text-slate-400"}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* BARRA DE PROGRESSO FUNCIONAL */}
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-slate-500 mt-2">
            Questão {currentQuestion + 1} de {questions.length} • Nível {question.difficulty}
          </p>
        </div>

        {/* QUESTÃO INTERATIVA */}
        <Card className="mb-8 border-2 border-blue-200 dark:border-blue-800">
          <CardContent className="p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="px-3 py-1">
                  {question.type}
                </Badge>
                <Badge
                  className={`px-3 py-1 ${
                    question.difficulty === "Básico"
                      ? "bg-green-100 text-green-700"
                      : question.difficulty === "Intermediário"
                        ? "bg-blue-100 text-blue-700"
                        : question.difficulty === "Avançado"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                  }`}
                >
                  {question.difficulty}
                </Badge>
              </div>
              <h2 className="text-xl font-semibold mb-6">{question.question}</h2>
            </div>

            {/* OPÇÕES INTERATIVAS */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md transform scale-[1.02]"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <span className="font-medium mr-3 text-blue-600">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* NAVEGAÇÃO INTERATIVA */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0} className="px-6">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>

          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6"
          >
            {currentQuestion === questions.length - 1 ? "Finalizar Teste" : "Próxima"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
