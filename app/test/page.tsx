"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield } from "lucide-react"

interface Question {
  id: number
  type: string
  question: string
  options: string[]
  correctAnswer: number
  timeLimit: number
}

const questions: Question[] = [
  {
    id: 1,
    type: "Raciocínio Lógico",
    question: "Se todos os A são B, e todos os B são C, então:",
    options: ["Alguns A são C", "Todos os A são C", "Nenhum A é C", "Alguns C são A"],
    correctAnswer: 1,
    timeLimit: 60,
  },
  {
    id: 2,
    type: "Padrões Numéricos",
    question: "Qual é o próximo número na sequência: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    correctAnswer: 1,
    timeLimit: 90,
  },
  {
    id: 3,
    type: "Raciocínio Espacial",
    question: "Quantos cubos há na figura tridimensional?",
    options: ["12", "15", "18", "21"],
    correctAnswer: 2,
    timeLimit: 120,
  },
  {
    id: 4,
    type: "Analogias",
    question: "Livro está para Biblioteca assim como Quadro está para:",
    options: ["Pincel", "Tinta", "Museu", "Artista"],
    correctAnswer: 2,
    timeLimit: 75,
  },
  {
    id: 5,
    type: "Raciocínio Verbal",
    question: "Qual palavra não pertence ao grupo?",
    options: ["Carro", "Bicicleta", "Avião", "Casa"],
    correctAnswer: 3,
    timeLimit: 45,
  },
]

export default function TestPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(questions[0].timeLimit)
  const [isStarted, setIsStarted] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [hasPaid, setHasPaid] = useState(false)

  // Definir em qual questão mostrar o paywall (questão 3 de 5)
  const PAYWALL_QUESTION = 2 // Índice 2 = 3ª questão

  useEffect(() => {
    const paidStatus = localStorage.getItem("testPaid")
    if (paidStatus) {
      setHasPaid(true)
    } else {
      router.push("/")
    }
  }, [router])

  useEffect(() => {
    if (!isStarted) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext()
          return questions[Math.min(currentQuestion + 1, questions.length - 1)]?.timeLimit || 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuestion, isStarted])

  useEffect(() => {
    if (isStarted && currentQuestion < questions.length) {
      setTimeLeft(questions[currentQuestion].timeLimit)
      setSelectedAnswer(null)
    }
  }, [currentQuestion, isStarted])

  // Verificar se deve mostrar paywall
  useEffect(() => {
    if (isStarted && currentQuestion === PAYWALL_QUESTION && !isPremium) {
      setShowPaymentModal(true)
    }
  }, [currentQuestion, isStarted, isPremium])

  const handleStart = () => {
    setIsStarted(true)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    // Se chegou no paywall e não é premium, não avança
    if (currentQuestion === PAYWALL_QUESTION && !isPremium) {
      setShowPaymentModal(true)
      return
    }

    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedAnswer ?? -1
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calcular resultado e redirecionar
      const correctAnswers = newAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length

      const score = Math.round((correctAnswers / questions.length) * 100 + Math.random() * 40 + 80)

      localStorage.setItem(
        "iqTestResult",
        JSON.stringify({
          score,
          correctAnswers,
          totalQuestions: questions.length,
          completedAt: new Date().toISOString(),
          isPremium,
        }),
      )

      router.push("/results")
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1] ?? null)
    }
  }

  const handlePaymentSuccess = () => {
    setIsPremium(true)
    setShowPaymentModal(false)
    // Continuar o teste normalmente
  }

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false)
    // Usuário pode continuar com versão limitada
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!hasPaid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Acesso Restrito</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Você precisa adquirir o teste para ter acesso a esta funcionalidade.
            </p>
            <Button onClick={() => router.push("/")} className="w-full">
              Voltar ao Início
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-subtle to-secondary/10 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Teste de QI Profissional</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Você está prestes a iniciar um teste de QI com 5 questões cuidadosamente selecionadas. Cada questão tem um
              tempo limite específico.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-primary/10 p-4 rounded-lg">
                <h3 className="font-semibold text-primary">Duração Total</h3>
                <p className="text-sm text-slate-600">Aproximadamente 7 minutos</p>
              </div>
              <div className="bg-secondary/10 p-4 rounded-lg">
                <h3 className="font-semibold text-secondary">Questões</h3>
                <p className="text-sm text-slate-600">5 questões variadas</p>
              </div>
            </div>
            <Button onClick={handleStart} size="lg" className="w-full md:w-auto">
              Iniciar Teste Agora
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-subtle to-secondary/10 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header do Teste */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-soft p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Teste de QI</h1>
              <p className="text-slate-600 dark:text-slate-400">
                Questão {currentQuestion + 1} de {questions.length}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{formatTime(timeLeft)}</div>
              <p className="text-sm text-slate-600">Tempo restante</p>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="mt-4">
            <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-primary rounded-full h-2 transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Questão Atual */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="mb-6">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                {questions[currentQuestion].type}
              </span>
              <h2 className="text-xl font-semibold mb-6">{questions[currentQuestion].question}</h2>
            </div>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswer === index
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Botões de Navegação */}
        <div className="flex justify-between">
          <Button onClick={handlePrevious} variant="outline" disabled={currentQuestion === 0}>
            Anterior
          </Button>

          <Button onClick={handleNext} disabled={selectedAnswer === null} className="min-w-[120px]">
            {currentQuestion === questions.length - 1 ? "Finalizar" : "Próxima"}
          </Button>
        </div>
      </div>
    </div>
  )
}
