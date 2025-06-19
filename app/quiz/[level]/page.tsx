"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ChevronRight, ChevronLeft, Trophy, Lock, Play } from "lucide-react"
import { PremiumQuizEngine, PREMIUM_QUIZ_LEVELS, checkPremiumAccess } from "@/lib/premium-quiz-system"

export default function PremiumQuizPage() {
  const router = useRouter()
  const params = useParams()
  const level = params.level as string

  const [quizEngine, setQuizEngine] = useState<PremiumQuizEngine | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null)
  const [isStarted, setIsStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar acesso premium
    const accessInfo = checkPremiumAccess()

    if (!accessInfo.hasAccess) {
      router.push("/premium")
      return
    }

    if (!PREMIUM_QUIZ_LEVELS[level]) {
      router.push("/premium")
      return
    }

    setHasAccess(true)
    setTimeLeft(PREMIUM_QUIZ_LEVELS[level].duration * 60)
    setIsLoading(false)
  }, [level, router])

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
    try {
      const engine = new PremiumQuizEngine(level)
      setQuizEngine(engine)
      setCurrentQuestion(engine.getCurrentQuestion())
      setIsStarted(true)
    } catch (error) {
      console.error("Error starting quiz:", error)
      router.push("/premium")
    }
  }

  const handleAnswerSelect = (answer: number | string) => {
    setSelectedAnswer(answer)
  }

  const handleNextQuestion = () => {
    if (!quizEngine || selectedAnswer === null) return

    quizEngine.submitAnswer(selectedAnswer)

    if (quizEngine.nextQuestion()) {
      setCurrentQuestion(quizEngine.getCurrentQuestion())
      setSelectedAnswer(null)
    } else {
      handleFinishQuiz()
    }
  }

  const handlePreviousQuestion = () => {
    if (!quizEngine) return

    if (quizEngine.previousQuestion()) {
      setCurrentQuestion(quizEngine.getCurrentQuestion())
      setSelectedAnswer(null)
    }
  }

  const handleFinishQuiz = () => {
    if (!quizEngine) return

    const results = quizEngine.calculateResults()

    // Salvar resultados
    localStorage.setItem(
      "quizResults",
      JSON.stringify({
        ...results,
        completedAt: new Date().toISOString(),
        level: level,
      }),
    )

    setIsCompleted(true)
    router.push(`/quiz/${level}/results`)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Carregando quiz premium...</p>
        </div>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Lock className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Acesso Premium Necessário</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Este quiz é exclusivo para assinantes premium.</p>
            <Button onClick={() => router.push("/premium")} className="w-full">
              Ver Planos Premium
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const quizLevel = PREMIUM_QUIZ_LEVELS[level]

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{quizLevel.icon}</div>
              <h1 className="text-3xl font-bold mb-4">{quizLevel.name}</h1>
              <p className="text-slate-600 dark:text-slate-400 mb-6">{quizLevel.description}</p>

              <div className="flex items-center justify-center space-x-4 mb-6">
                <Badge variant="outline" className="px-3 py-1">
                  {quizLevel.difficulty}
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  {quizLevel.questionCount} questões
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  {quizLevel.duration} minutos
                </Badge>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg mb-8">
              <h3 className="font-semibold mb-4">O que você vai encontrar:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Questões validadas cientificamente</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm">Cronômetro em tempo real</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span className="text-sm">Cálculo preciso de QI</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span className="text-sm">Relatório detalhado</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleStartQuiz}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-xl py-6"
            >
              <Play className="w-6 h-6 mr-2" />
              Iniciar Quiz Premium
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!quizEngine || !currentQuestion) {
    return <div>Carregando...</div>
  }

  const progress = quizEngine.getProgress()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 p-4">
      <div className="container mx-auto max-w-4xl pt-20">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white">
                <Trophy className="w-4 h-4 mr-1" />
                PREMIUM
              </Badge>
              <h1 className="text-2xl font-bold">{quizLevel.name}</h1>
            </div>
            <div className="flex items-center space-x-2 text-lg font-semibold">
              <Clock className="w-5 h-5" />
              <span className={timeLeft <= 60 ? "text-red-500" : "text-slate-600 dark:text-slate-400"}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <Progress value={progress.percentage} className="h-3" />
          <p className="text-sm text-slate-500 mt-2">
            Questão {progress.current} de {progress.total} • {currentQuestion.category}
          </p>
        </div>

        {/* Question */}
        <Card className="mb-8 border-2 border-blue-200 dark:border-blue-800">
          <CardContent className="p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="px-3 py-1">
                  {currentQuestion.category}
                </Badge>
                <Badge className="px-3 py-1 bg-blue-100 text-blue-700">{currentQuestion.points} pontos</Badge>
              </div>
              <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
            </div>

            {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((option: string, index: number) => (
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
            )}

            {currentQuestion.type === "numerical" && (
              <div className="space-y-3">
                <input
                  type="number"
                  placeholder="Digite sua resposta"
                  className="w-full p-4 border-2 border-slate-200 dark:border-slate-700 rounded-lg focus:border-blue-500 focus:outline-none"
                  onChange={(e) => handleAnswerSelect(Number(e.target.value))}
                />
              </div>
            )}

            {currentQuestion.type === "true-false" && (
              <div className="space-y-3">
                {["Verdadeiro", "Falso"].map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      selectedAnswer === index
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md transform scale-[1.02]"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePreviousQuestion} disabled={progress.current === 1} className="px-6">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>

          <Button
            onClick={progress.current === progress.total ? handleFinishQuiz : handleNextQuestion}
            disabled={selectedAnswer === null}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6"
          >
            {progress.current === progress.total ? "Finalizar Quiz" : "Próxima"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
