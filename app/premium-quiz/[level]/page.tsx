"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ChevronRight, ChevronLeft, Trophy, Lock, Play } from "lucide-react"
import { PremiumQuizEngine, PREMIUM_QUIZ_LEVELS, checkPremiumAccess } from "@/lib/premium-quiz-system"
import { OptimizedBackground } from "@/components/optimized-background"

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
      "premiumQuizResults",
      JSON.stringify({
        ...results,
        completedAt: new Date().toISOString(),
        level: level,
      }),
    )

    setIsCompleted(true)
    router.push(`/premium-quiz/${level}/results`)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <OptimizedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-300">Carregando quiz premium...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen relative">
        <OptimizedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <Card className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
            <CardContent className="p-8 text-center">
              <Lock className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-4 text-white">Acesso Premium Necessário</h1>
              <p className="text-slate-400 mb-6">Este quiz é exclusivo para assinantes premium.</p>
              <Button
                onClick={() => router.push("/premium")}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Ver Planos Premium
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const quizLevel = PREMIUM_QUIZ_LEVELS[level]

  if (!isStarted) {
    return (
      <div className="min-h-screen relative">
        <OptimizedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <Card className="max-w-2xl w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{quizLevel.icon}</div>
                <h1 className="text-3xl font-bold mb-4 text-white">{quizLevel.name}</h1>
                <p className="text-slate-400 mb-6">{quizLevel.description}</p>

                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Badge variant="outline" className="px-3 py-1 border-blue-500/30 text-blue-300">
                    {quizLevel.difficulty}
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 border-purple-500/30 text-purple-300">
                    {quizLevel.questionCount} questões
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 border-emerald-500/30 text-emerald-300">
                    {quizLevel.duration} minutos
                  </Badge>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 p-6 rounded-lg mb-8">
                <h3 className="font-semibold mb-4 text-white">O que você vai encontrar:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                    <span className="text-sm text-slate-300">Questões validadas cientificamente</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span className="text-sm text-slate-300">Cronômetro em tempo real</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    <span className="text-sm text-slate-300">Cálculo preciso de QI</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full" />
                    <span className="text-sm text-slate-300">Relatório detalhado</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleStartQuiz}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-xl py-6 animate-glow"
              >
                <Play className="w-6 h-6 mr-2" />
                Iniciar Quiz Premium
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!quizEngine || !currentQuestion) {
    return (
      <div className="min-h-screen relative">
        <OptimizedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-300">Carregando...</p>
          </div>
        </div>
      </div>
    )
  }

  const progress = quizEngine.getProgress()

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
                  PREMIUM
                </Badge>
                <h1 className="text-2xl font-bold text-white">{quizLevel.name}</h1>
              </div>
              <div className="flex items-center space-x-2 text-lg font-semibold">
                <Clock className="w-5 h-5 text-slate-300" />
                <span className={timeLeft <= 60 ? "text-red-400" : "text-slate-300"}>{formatTime(timeLeft)}</span>
              </div>
            </div>

            <Progress value={progress.percentage} className="h-3 bg-slate-700" />
            <p className="text-sm text-slate-400 mt-2">
              Questão {progress.current} de {progress.total} • {currentQuestion.category}
            </p>
          </div>

          {/* Question */}
          <Card className="mb-8 bg-slate-800/50 backdrop-blur-sm border-2 border-blue-500/30">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="px-3 py-1 border-blue-500/30 text-blue-300">
                    {currentQuestion.category}
                  </Badge>
                  <Badge className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {currentQuestion.points} pontos
                  </Badge>
                </div>
                <h2 className="text-xl font-semibold mb-6 text-white">{currentQuestion.question}</h2>
              </div>

              {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
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

              {currentQuestion.type === "numerical" && (
                <div className="space-y-3">
                  <input
                    type="number"
                    placeholder="Digite sua resposta"
                    className="w-full p-4 border-2 border-slate-600 bg-slate-700/50 text-white rounded-lg focus:border-blue-500 focus:outline-none placeholder:text-slate-400"
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
              disabled={progress.current === 1}
              className="px-6 bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600/50"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            <Button
              onClick={progress.current === progress.total ? handleFinishQuiz : handleNextQuestion}
              disabled={selectedAnswer === null}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6"
            >
              {progress.current === progress.total ? "Finalizar Quiz" : "Próxima"}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
