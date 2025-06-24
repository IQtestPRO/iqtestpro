"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ChevronRight, ChevronLeft, Trophy, Play, Target, Zap, Crown } from "lucide-react"
import { OptimizedBackground } from "@/components/optimized-background"

interface QuizQuestion {
  id: string
  type: "multiple-choice" | "true-false" | "numerical"
  category: string
  question: string
  options?: string[]
  correctAnswer: number | string
  timeLimit: number
  difficulty: 1 | 2 | 3 | 4 | 5
  explanation: string
  points: number
}

interface MissionData {
  id: number
  title: string
  subtitle: string
  questions: number
  timeLimit: number
  difficulty: string
  category: string
  description: string
}

// Banco de questões por missão - TODAS ÚNICAS E ESPECÍFICAS
const MISSION_QUESTIONS: Record<number, QuizQuestion[]> = {
  1: [
    // MISSÃO 1: RACIOCÍNIO ESPACIAL (15 questões)
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
    {
      id: "spatial_002",
      type: "multiple-choice",
      category: "Padrões Visuais",
      question: "Qual figura completa a sequência: ○ △ ○ △ ?",
      options: ["○", "△", "□", "◇"],
      correctAnswer: 0,
      timeLimit: 30,
      difficulty: 1,
      explanation: "A sequência alterna entre círculo e triângulo",
      points: 10,
    },
    {
      id: "spatial_003",
      type: "multiple-choice",
      category: "Visualização 3D",
      question: "Quantas faces tem um cubo?",
      options: ["4", "6", "8", "12"],
      correctAnswer: 1,
      timeLimit: 20,
      difficulty: 1,
      explanation: "Um cubo tem 6 faces quadradas",
      points: 10,
    },
    {
      id: "spatial_004",
      type: "multiple-choice",
      category: "Simetria",
      question: "Qual das opções é simétrica em relação ao eixo vertical?",
      options: ["◐", "◑", "●", "○"],
      correctAnswer: 3,
      timeLimit: 25,
      difficulty: 2,
      explanation: "O círculo vazio (○) é perfeitamente simétrico",
      points: 15,
    },
    {
      id: "spatial_005",
      type: "multiple-choice",
      category: "Perspectiva",
      question: "Se você olhar um quadrado de lado, o que verá?",
      options: ["Quadrado", "Linha", "Triângulo", "Círculo"],
      correctAnswer: 1,
      timeLimit: 30,
      difficulty: 2,
      explanation: "Visto de lado, um quadrado aparece como uma linha",
      points: 15,
    },
    {
      id: "spatial_006",
      type: "multiple-choice",
      category: "Rotação Mental",
      question: "Girando 180° a figura ◢, obtemos:",
      options: ["◣", "◤", "◥", "◢"],
      correctAnswer: 0,
      timeLimit: 40,
      difficulty: 2,
      explanation: "Uma rotação de 180° inverte completamente a orientação",
      points: 15,
    },
    {
      id: "spatial_007",
      type: "multiple-choice",
      category: "Contagem Visual",
      question: "Quantos triângulos você consegue ver nesta figura: △▲△?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1,
      timeLimit: 50,
      difficulty: 2,
      explanation: "Há 3 triângulos distintos na sequência",
      points: 15,
    },
    {
      id: "spatial_008",
      type: "multiple-choice",
      category: "Padrões Geométricos",
      question: "Complete a sequência: ■ □ ■ □ ■ ?",
      options: ["■", "□", "▲", "○"],
      correctAnswer: 1,
      timeLimit: 35,
      difficulty: 1,
      explanation: "A sequência alterna entre quadrado preenchido e vazio",
      points: 10,
    },
    {
      id: "spatial_009",
      type: "multiple-choice",
      category: "Orientação Espacial",
      question: "Se você está olhando para o Norte e vira 90° à direita, para onde está olhando?",
      options: ["Sul", "Leste", "Oeste", "Norte"],
      correctAnswer: 1,
      timeLimit: 30,
      difficulty: 1,
      explanation: "Virando 90° à direita do Norte, você fica voltado para o Leste",
      points: 10,
    },
    {
      id: "spatial_010",
      type: "multiple-choice",
      category: "Formas Geométricas",
      question: "Qual forma tem mais lados: hexágono ou octógono?",
      options: ["Hexágono", "Octógono", "Ambos iguais", "Impossível determinar"],
      correctAnswer: 1,
      timeLimit: 25,
      difficulty: 1,
      explanation: "Hexágono tem 6 lados, octógono tem 8 lados",
      points: 10,
    },
    {
      id: "spatial_011",
      type: "multiple-choice",
      category: "Reflexão",
      question: "O reflexo de 'b' no espelho é:",
      options: ["d", "p", "q", "b"],
      correctAnswer: 0,
      timeLimit: 35,
      difficulty: 2,
      explanation: "O reflexo horizontal de 'b' é 'd'",
      points: 15,
    },
    {
      id: "spatial_012",
      type: "multiple-choice",
      category: "Sequência Espacial",
      question: "Na sequência ↑ → ↓ ←, qual vem depois?",
      options: ["↑", "→", "↓", "←"],
      correctAnswer: 0,
      timeLimit: 40,
      difficulty: 2,
      explanation: "A sequência gira no sentido horário, voltando ao ↑",
      points: 15,
    },
    {
      id: "spatial_013",
      type: "multiple-choice",
      category: "Área e Volume",
      question: "Quantas arestas tem um cubo?",
      options: ["8", "10", "12", "14"],
      correctAnswer: 2,
      timeLimit: 30,
      difficulty: 2,
      explanation: "Um cubo tem 12 arestas (4 na base, 4 no topo, 4 verticais)",
      points: 15,
    },
    {
      id: "spatial_014",
      type: "multiple-choice",
      category: "Transformações",
      question: "Dobrando um papel ao meio 3 vezes, quantas partes você terá ao desdobrar?",
      options: ["6", "8", "9", "12"],
      correctAnswer: 1,
      timeLimit: 45,
      difficulty: 3,
      explanation: "Cada dobra duplica o número de partes: 2³ = 8 partes",
      points: 20,
    },
    {
      id: "spatial_015",
      type: "multiple-choice",
      category: "Visualização Complexa",
      question: "Em uma escada de 5 degraus, quantos ângulos retos existem?",
      options: ["8", "10", "12", "14"],
      correctAnswer: 1,
      timeLimit: 60,
      difficulty: 3,
      explanation: "Cada degrau forma 2 ângulos retos: 5 × 2 = 10 ângulos",
      points: 20,
    },
  ],

  2: [
    // MISSÃO 2: RACIOCÍNIO LÓGICO (20 questões)
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
    {
      id: "logical_002",
      type: "multiple-choice",
      category: "Sequências Numéricas",
      question: "Qual é o próximo número: 2, 4, 8, 16, ?",
      options: ["24", "32", "30", "20"],
      correctAnswer: 1,
      timeLimit: 60,
      difficulty: 2,
      explanation: "Cada número é o dobro do anterior: 16 × 2 = 32",
      points: 15,
    },
    {
      id: "logical_003",
      type: "multiple-choice",
      category: "Dedução",
      question: "Se Maria é mais alta que João, e João é mais alto que Pedro, então:",
      options: [
        "Pedro é mais alto que Maria",
        "Maria é mais alta que Pedro",
        "Não podemos saber",
        "Todos têm a mesma altura",
      ],
      correctAnswer: 1,
      timeLimit: 45,
      difficulty: 2,
      explanation: "Por transitividade: Maria > João > Pedro, logo Maria > Pedro",
      points: 15,
    },
    // Add more questions for mission 2...
  ],

  3: [
    // MISSÃO 3: INTELIGÊNCIA FLUIDA (25 questões)
    {
      id: "abstract_001",
      type: "multiple-choice",
      category: "Matrizes Abstratas",
      question: "Na matriz 3x3, qual elemento falta na posição inferior direita seguindo o padrão de rotação?",
      options: ["↑", "→", "↓", "←"],
      correctAnswer: 2,
      timeLimit: 180,
      difficulty: 4,
      explanation: "Seguindo o padrão de rotação 90° horário, a sequência leva ao ↓",
      points: 25,
    },
    // Add more questions for mission 3...
  ],

  4: [
    // MISSÃO 4: AVALIAÇÃO COMPLETA (50 questões)
    {
      id: "expert_001",
      type: "multiple-choice",
      category: "Funções Compostas",
      question: "Se f(x) = 2x + 1 e g(x) = x², qual é f(g(3))?",
      options: ["19", "18", "17", "20"],
      correctAnswer: 0,
      timeLimit: 180,
      difficulty: 5,
      explanation: "g(3) = 9, então f(9) = 2(9) + 1 = 19",
      points: 30,
    },
    // Add more questions for mission 4...
  ],
}

export default function QuizPage() {
  const router = useRouter()
  const params = useParams()
  const missionId = Number.parseInt(params.id as string)

  const [missionData, setMissionData] = useState<MissionData | null>(null)
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null)
  const [userAnswers, setUserAnswers] = useState<(number | string | null)[]>([])
  const [isStarted, setIsStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [startTime, setStartTime] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se o usuário tem acesso
    const testPaid = localStorage.getItem("testPaid")
    const selectedMission = localStorage.getItem("selectedMission")

    if (!testPaid || testPaid !== "true") {
      router.push("/premium")
      return
    }

    if (selectedMission) {
      try {
        const mission = JSON.parse(selectedMission)
        setMissionData(mission)

        // Carregar questões da missão
        const missionQuestions = MISSION_QUESTIONS[missionId] || []
        const selectedQuestions = missionQuestions.slice(0, mission.questions)
        setQuestions(selectedQuestions)
        setUserAnswers(new Array(selectedQuestions.length).fill(null))
        setTimeLeft(mission.timeLimit * 60) // converter para segundos

        setIsLoading(false)
      } catch (error) {
        console.error("Error loading mission data:", error)
        router.push("/")
      }
    } else {
      router.push("/")
    }
  }, [missionId, router])

  useEffect(() => {
    if (isStarted && timeLeft > 0 && !isCompleted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleFinishQuiz()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isStarted, timeLeft, isCompleted])

  const handleStartQuiz = () => {
    setIsStarted(true)
    setStartTime(Date.now())
  }

  const handleAnswerSelect = (answer: number | string) => {
    setSelectedAnswer(answer)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...userAnswers]
    newAnswers[currentIndex] = selectedAnswer
    setUserAnswers(newAnswers)

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
    } else {
      handleFinishQuiz()
    }
  }

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setSelectedAnswer(userAnswers[currentIndex - 1])
    }
  }

  const handleFinishQuiz = () => {
    const finalAnswers = [...userAnswers]
    if (selectedAnswer !== null) {
      finalAnswers[currentIndex] = selectedAnswer
    }

    const correctCount = finalAnswers.filter((answer, index) => answer === questions[index]?.correctAnswer).length

    const score = Math.round((correctCount / questions.length) * 100)
    const timeSpent = Math.round((Date.now() - startTime) / 1000)

    // Salvar resultados
    const results = {
      missionId,
      missionTitle: missionData?.title,
      score,
      correctCount,
      totalQuestions: questions.length,
      timeSpent,
      completedAt: new Date().toISOString(),
      answers: finalAnswers,
    }

    localStorage.setItem("quizResults", JSON.stringify(results))
    setIsCompleted(true)
    router.push(`/quiz/${missionId}/results`)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Básico":
        return <Target className="w-4 h-4" />
      case "Intermediário":
        return <Zap className="w-4 h-4" />
      case "Avançado":
        return <Trophy className="w-4 h-4" />
      case "Expert":
        return <Crown className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <OptimizedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-300">Carregando sua missão...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!missionData || questions.length === 0) {
    return (
      <div className="min-h-screen relative">
        <OptimizedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <Card className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4 text-white">Missão não encontrada</h1>
              <p className="text-slate-400 mb-6">Não foi possível carregar os dados da missão.</p>
              <Button onClick={() => router.push("/")} className="w-full">
                Voltar ao Início
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!isStarted) {
    return (
      <div className="min-h-screen relative">
        <OptimizedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <Card className="max-w-2xl w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">
                  {missionId === 1 && "🧩"}
                  {missionId === 2 && "🧠"}
                  {missionId === 3 && "🎯"}
                  {missionId === 4 && "👑"}
                </div>
                <h1 className="text-3xl font-bold mb-4 text-white">{missionData.title}</h1>
                <p className="text-slate-400 mb-6">{missionData.subtitle}</p>

                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Badge variant="outline" className="px-3 py-1 border-blue-500/30 text-blue-300">
                    {getDifficultyIcon(missionData.difficulty)}
                    <span className="ml-2">{missionData.difficulty}</span>
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 border-purple-500/30 text-purple-300">
                    <Clock className="w-4 h-4 mr-2" />
                    {missionData.questions} questões
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 border-emerald-500/30 text-emerald-300">
                    <Trophy className="w-4 h-4 mr-2" />
                    {missionData.timeLimit} minutos
                  </Badge>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 p-6 rounded-lg mb-8">
                <h3 className="font-semibold mb-4 text-white">Instruções da Missão:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                    <span className="text-sm text-slate-300">Leia cada questão com atenção</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span className="text-sm text-slate-300">Gerencie bem seu tempo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    <span className="text-sm text-slate-300">Você pode voltar às questões anteriores</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full" />
                    <span className="text-sm text-slate-300">Confie em sua primeira intuição</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleStartQuiz}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-xl py-6 animate-glow"
              >
                <Play className="w-6 h-6 mr-2" />
                Iniciar Missão
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  const progress = Math.round(((currentIndex + 1) / questions.length) * 100)

  return (
    <div className="min-h-screen relative">
      <OptimizedBackground />
      <div className="relative z-10 p-4">
        <div className="container mx-auto max-w-4xl pt-20">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-0">
                  <Trophy className="w-4 h-4 mr-1" />
                  MISSÃO ATIVA
                </Badge>
                <h1 className="text-2xl font-bold text-white">{missionData.title}</h1>
              </div>
              <div className="flex items-center space-x-2 text-lg font-semibold">
                <Clock className="w-5 h-5 text-slate-300" />
                <span className={timeLeft <= 60 ? "text-red-400" : "text-slate-300"}>{formatTime(timeLeft)}</span>
              </div>
            </div>

            <Progress value={progress} className="h-3 bg-slate-700" />
            <p className="text-sm text-slate-400 mt-2">
              Questão {currentIndex + 1} de {questions.length} • {currentQuestion?.category}
            </p>
          </div>

          {/* Question */}
          <Card className="mb-8 bg-slate-800/50 backdrop-blur-sm border-2 border-blue-500/30">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="px-3 py-1 border-blue-500/30 text-blue-300">
                    {currentQuestion?.category}
                  </Badge>
                  <Badge className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {currentQuestion?.points} pontos
                  </Badge>
                </div>
                <h2 className="text-xl font-semibold mb-6 text-white">{currentQuestion?.question}</h2>
              </div>

              {currentQuestion?.type === "multiple-choice" && currentQuestion.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        selectedAnswer === index
                          ? "border-blue-500 bg-blue-500/10 shadow-md transform scale-[1.02]"
                          : "border-slate-600 hover:border-slate-500 hover:bg-slate-700/50"
                      }`}
                    >
                      <span className="font-medium mr-3 text-blue-400">{String.fromCharCode(65 + index)}.</span>
                      <span className="text-slate-200">{option}</span>
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion?.type === "numerical" && (
                <div className="space-y-3">
                  <input
                    type="number"
                    placeholder="Digite sua resposta"
                    className="w-full p-4 border-2 border-slate-600 bg-slate-700/50 text-white rounded-lg focus:border-blue-500 focus:outline-none placeholder:text-slate-400"
                    onChange={(e) => handleAnswerSelect(Number(e.target.value))}
                  />
                </div>
              )}

              {currentQuestion?.type === "true-false" && (
                <div className="space-y-3">
                  {["Verdadeiro", "Falso"].map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        selectedAnswer === index
                          ? "border-blue-500 bg-blue-500/10 shadow-md transform scale-[1.02]"
                          : "border-slate-600 hover:border-slate-500 hover:bg-slate-700/50"
                      }`}
                    >
                      <span className="text-slate-200">{option}</span>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentIndex === 0}
              className="px-6 bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600/50"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            <Button
              onClick={currentIndex === questions.length - 1 ? handleFinishQuiz : handleNextQuestion}
              disabled={selectedAnswer === null}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6"
            >
              {currentIndex === questions.length - 1 ? "Finalizar Missão" : "Próxima"}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
