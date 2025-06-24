"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation" // Usar useRouter diretamente, o missionId virá via props
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ChevronRight, ChevronLeft, Trophy, Play, Target, Zap, Crown } from "lucide-react"
import { OptimizedBackground } from "@/components/optimized-background"
import { MISSION_QUESTIONS } from "@/lib/mission-questions" // Importar as questões da missão
import type { QuizQuestion } from "@/types/quiz" // Importar o tipo QuizQuestion

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

interface MissionQuizPageProps {
  missionId: number
}

// Dados de exemplo para as missões (pode ser movido para um arquivo de dados se houver mais)
const MISSION_METADATA: Record<number, MissionData> = {
  1: {
    id: 1,
    title: "Missão 1: Raciocínio Espacial",
    subtitle: "Desafie sua percepção e manipulação de formas e espaços.",
    questions: 15,
    timeLimit: 15, // minutos
    difficulty: "Básico",
    category: "Raciocínio Espacial",
    description: "Teste sua capacidade de visualizar e manipular objetos em 2D e 3D.",
  },
  2: {
    id: 2,
    title: "Missão 2: Raciocínio Lógico",
    subtitle: "Aprimore sua habilidade de dedução e resolução de problemas.",
    questions: 20,
    timeLimit: 20, // minutos
    difficulty: "Intermediário",
    category: "Raciocínio Lógico",
    description: "Avalie sua capacidade de identificar padrões, sequências e relações lógicas.",
  },
  3: {
    id: 3,
    title: "Missão 3: Inteligência Fluida",
    subtitle: "Explore sua capacidade de resolver problemas novos e abstratos.",
    questions: 25,
    timeLimit: 25, // minutos
    difficulty: "Avançado",
    category: "Inteligência Fluida",
    description: "Desafios que exigem raciocínio abstrato e adaptabilidade a novas situações.",
  },
  4: {
    id: 4,
    title: "Missão 4: Avaliação Completa",
    subtitle: "Um teste abrangente para medir seu QI em diversas áreas.",
    questions: 50,
    timeLimit: 50, // minutos
    difficulty: "Expert",
    category: "Multidisciplinar",
    description: "O teste definitivo para uma avaliação completa de suas habilidades cognitivas.",
  },
}

export default function MissionQuizPage({ missionId }: MissionQuizPageProps) {
  const router = useRouter()

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
    // Verificar se o usuário tem acesso (simulando o testPaid)
    const testPaid = localStorage.getItem("testPaid")
    // const selectedMission = localStorage.getItem("selectedMission") // Não é mais necessário, missionId vem via prop

    if (!testPaid || testPaid !== "true") {
      router.push("/premium") // Redirecionar se não tiver pago
      return
    }

    const mission = MISSION_METADATA[missionId]
    if (!mission) {
      router.push("/") // Redirecionar se a missão não existir
      return
    }

    setMissionData(mission)

    // Carregar questões da missão
    const missionQuestions = MISSION_QUESTIONS[missionId] || []
    const selectedQuestions = missionQuestions.slice(0, mission.questions)
    setQuestions(selectedQuestions)
    setUserAnswers(new Array(selectedQuestions.length).fill(null))
    setTimeLeft(mission.timeLimit * 60) // converter para segundos

    setIsLoading(false)
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
      setSelectedAnswer(null) // Reset selected answer for next question
    } else {
      handleFinishQuiz()
    }
  }

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setSelectedAnswer(userAnswers[currentIndex - 1]) // Load previous answer
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
    router.push(`/mission/${missionId}/results`)
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
                    value={selectedAnswer !== null ? String(selectedAnswer) : ""} // Ensure input reflects selectedAnswer
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
