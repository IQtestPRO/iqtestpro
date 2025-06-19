"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ExtremeQuizEngine, type ExtremeQuestion } from "@/lib/extreme-quiz-questions" // Supondo que este arquivo exista e esteja correto
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Clock, Zap, ShieldAlert, Brain } from "lucide-react"
// Supondo que você tenha um modal de pagamento global ou específico
// import { usePayment } from "@/contexts/payment-context"; // Se usar o global
import { PremiumPaymentModal } from "@/components/premium-payment-modal" // Ou um específico

const TIME_PER_QUESTION = 30 // segundos
const PAYWALL_QUESTION_INDEX = 9 // Mostrar paywall após a 9ª questão (índice 8)

export default function ExtremeQualificationPage() {
  const router = useRouter()
  // const { openPaymentModal, isPaymentModalOpen } = usePayment(); // Se usar o contexto global

  const [phase, setPhase] = useState<"warning" | "quiz" | "failed" | "passed" | "paywall">("warning")
  const [questions, setQuestions] = useState<ExtremeQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false) // Simular; idealmente viria do backend/auth
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioCorrectRef = useRef<HTMLAudioElement | null>(null)
  const audioIncorrectRef = useRef<HTMLAudioElement | null>(null)
  const audioCountdownRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Carregar áudios no cliente
    if (typeof window !== "undefined") {
      audioCorrectRef.current = new Audio("/sounds/correct-answer.mp3") // Adicione seus arquivos de som na pasta public/sounds
      audioIncorrectRef.current = new Audio("/sounds/incorrect-answer.mp3")
      audioCountdownRef.current = new Audio("/sounds/countdown-tick.mp3")
    }
  }, [])

  const loadQuestions = useCallback(() => {
    const newQuestions = ExtremeQuizEngine.getQuestions(20) // Carregar 20 questões
    setQuestions(newQuestions)
    setUserAnswers(new Array(newQuestions.length).fill(null))
    setCurrentQuestionIndex(0)
    setScore(0)
    setPhase("quiz")
    setTimeLeft(TIME_PER_QUESTION)
    setShowFeedback(false)
  }, [])

  const startQuiz = () => {
    setPhase("quiz")
    loadQuestions()
  }

  // Timer Logic
  useEffect(() => {
    if (phase === "quiz" && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1)
        if (timeLeft <= 6 && timeLeft > 1 && audioCountdownRef.current) {
          audioCountdownRef.current.play().catch((e) => console.warn("Audio play failed:", e))
        }
      }, 1000)
    } else if (phase === "quiz" && timeLeft === 0) {
      handleTimeUp()
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [phase, timeLeft])

  const handleAnswerSelection = (answerIndex: number) => {
    if (showFeedback) return // Não permitir mudar resposta após feedback
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return
    if (timerRef.current) clearTimeout(timerRef.current)

    const currentQ = questions[currentQuestionIndex]
    const correct = ExtremeQuizEngine.checkAnswer(currentQ.id, selectedAnswer)

    setIsAnswerCorrect(correct)
    if (correct) {
      setScore((prevScore) => prevScore + 1)
      audioCorrectRef.current?.play().catch((e) => console.warn("Audio play failed:", e))
    } else {
      audioIncorrectRef.current?.play().catch((e) => console.warn("Audio play failed:", e))
    }

    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = selectedAnswer
    setUserAnswers(newAnswers)

    setShowFeedback(true)

    setTimeout(() => {
      handleNextQuestion()
    }, 2000) // Mostrar feedback por 2 segundos
  }

  const handleNextQuestion = () => {
    setShowFeedback(false)
    setSelectedAnswer(null)

    if (currentQuestionIndex === PAYWALL_QUESTION_INDEX && !isPremiumUnlocked) {
      setPhase("paywall")
      setShowPremiumModal(true)
      return
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
      setTimeLeft(TIME_PER_QUESTION)
    } else {
      // Quiz finalizado
      const passThreshold = questions.length * 0.6 // Ex: 60% para passar
      if (score >= passThreshold) {
        setPhase("passed")
      } else {
        setPhase("failed")
      }
    }
  }

  const handleTimeUp = () => {
    setIsAnswerCorrect(false) // Considerar resposta errada se o tempo acabar
    setShowFeedback(true)
    audioIncorrectRef.current?.play().catch((e) => console.warn("Audio play failed:", e))

    setTimeout(() => {
      handleNextQuestion()
    }, 2000)
  }

  const handlePaymentSuccess = () => {
    setIsPremiumUnlocked(true)
    setShowPremiumModal(false)
    setPhase("quiz") // Voltar ao quiz
    // Pode ser necessário re-iniciar o timer ou ir para a próxima questão
    // Se parou no meio de uma questão, pode ser melhor continuar de onde parou
    // ou recarregar a questão atual com tempo cheio.
    // Por simplicidade, vamos para a próxima questão.
    handleNextQuestion()
  }

  const handleClosePremiumModal = () => {
    setShowPremiumModal(false)
    // O usuário pode ter fechado o modal sem pagar. Decidir o que fazer.
    // Poderia redirecionar para a home ou mostrar uma mensagem.
    router.push("/")
  }

  if (phase === "warning") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
        <Card className="w-full max-w-lg bg-gray-800 border-gray-700 shadow-2xl">
          <CardHeader className="text-center">
            <ShieldAlert className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
            <CardTitle className="text-3xl font-bold text-yellow-400">
              Atenção: Teste de Qualificação Extrema!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-lg">
            <p>
              Você está prestes a iniciar um teste de QI de alta dificuldade, projetado para desafiar os limites da sua
              capacidade cognitiva.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Questões complexas e tempo limitado.</li>
              <li>Requer concentração máxima e raciocínio rápido.</li>
              <li>Apenas para aqueles que buscam um desafio real.</li>
            </ul>
            <p className="font-semibold text-yellow-500">
              Este teste não é para os fracos de coração. Prossiga com cautela!
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={startQuiz}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold text-xl py-3"
            >
              <Zap className="mr-2" /> Entendi, Começar o Desafio!
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (phase === "quiz" && questions.length > 0) {
    const currentQ = questions[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <Card className="w-full max-w-2xl bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <CardTitle className="text-2xl text-blue-400">
                Questão {currentQuestionIndex + 1} de {questions.length}
              </CardTitle>
              <div className="flex items-center text-xl font-semibold bg-red-600 px-3 py-1 rounded">
                <Clock className="mr-2 h-6 w-6" /> {timeLeft}s
              </div>
            </div>
            <Progress value={progress} className="w-full [&>div]:bg-blue-500" />
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-xl min-h-[60px]">{currentQ.questionText}</p>
            {currentQ.image && (
              <img
                src={currentQ.image || "/placeholder.svg"}
                alt="Questão visual"
                className="mx-auto rounded-md max-h-64 border border-gray-600"
              />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleAnswerSelection(index)}
                  className={`p-4 h-auto text-left justify-start text-lg whitespace-normal break-words
                    ${selectedAnswer === index ? "bg-blue-600 border-blue-500 ring-2 ring-blue-400" : "border-gray-600 hover:bg-gray-700"}
                    ${showFeedback && ExtremeQuizEngine.checkAnswer(currentQ.id, index) ? "bg-green-700 border-green-600" : ""}
                    ${showFeedback && selectedAnswer === index && !ExtremeQuizEngine.checkAnswer(currentQ.id, index) ? "bg-red-700 border-red-600" : ""}
                  `}
                  disabled={showFeedback}
                >
                  {option}
                </Button>
              ))}
            </div>
            {showFeedback && (
              <div
                className={`mt-4 p-3 rounded-md text-center font-semibold text-lg flex items-center justify-center
                ${isAnswerCorrect ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
              >
                {isAnswerCorrect ? <CheckCircle className="mr-2" /> : <XCircle className="mr-2" />}
                {isAnswerCorrect ? "Resposta Correta!" : "Resposta Incorreta."}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null || showFeedback}
              className="w-full bg-blue-500 hover:bg-blue-600 text-xl py-3"
            >
              <Zap className="mr-2" /> Confirmar Resposta
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (phase === "paywall") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <Card className="w-full max-w-lg bg-gray-800 border-gray-700 text-center">
          <CardHeader>
            <Brain className="w-16 h-16 mx-auto text-purple-400 mb-4" />
            <CardTitle className="text-3xl font-bold text-purple-400">Desbloqueie o Teste Completo!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-lg">
            <p>Você demonstrou grande potencial até aqui!</p>
            <p>
              Para continuar e acessar as questões mais desafiadoras e seu relatório completo, desbloqueie a versão
              premium.
            </p>
            {/* Aqui você pode adicionar o PremiumPaymentModal ou um botão para abri-lo */}
            {/* <Button onClick={() => openPaymentModal({ id: 'extreme', name: 'Teste Extremo', price: 49.90 })}> */}
            <Button
              onClick={() => setShowPremiumModal(true)}
              className="w-full bg-purple-500 hover:bg-purple-600 text-xl py-3 mt-4"
            >
              Desbloquear Agora
            </Button>
            <Button variant="link" onClick={() => router.push("/")} className="text-gray-400 hover:text-gray-200 mt-2">
              Voltar para a Home
            </Button>
          </CardContent>
        </Card>
        {showPremiumModal && (
          <PremiumPaymentModal
            isOpen={showPremiumModal}
            onClose={handleClosePremiumModal}
            onPaymentSuccess={handlePaymentSuccess}
            testLevel={{
              id: "extreme-premium",
              name: "Qualificação Extrema - Premium",
              price: 49.9,
              originalPrice: 79.9,
              features: ["Acesso completo", "Relatório detalhado", "Certificado"],
            }}
          />
        )}
      </div>
    )
  }

  if (phase === "passed" || phase === "failed") {
    const resultIcon =
      phase === "passed" ? (
        <CheckCircle className="w-20 h-20 mx-auto text-green-400 mb-6" />
      ) : (
        <XCircle className="w-20 h-20 mx-auto text-red-400 mb-6" />
      )
    const resultTitle = phase === "passed" ? "Parabéns! Você Passou!" : "Não Foi Desta Vez..."
    const resultColor = phase === "passed" ? "text-green-400" : "text-red-400"

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <Card className="w-full max-w-md bg-gray-800 border-gray-700 text-center">
          <CardHeader>
            {resultIcon}
            <CardTitle className={`text-4xl font-bold ${resultColor}`}>{resultTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xl">
            <p>
              Você acertou <span className="font-bold text-blue-400">{score}</span> de{" "}
              <span className="font-bold text-blue-400">{questions.length}</span> questões.
            </p>
            {phase === "passed" && <p>Você demonstrou um excelente nível de raciocínio! Continue se desafiando.</p>}
            {phase === "failed" && (
              <p>Não desanime! Cada tentativa é um aprendizado. Tente novamente ou explore outros testes.</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Button
              onClick={() => router.push("/results/extreme")}
              className="w-full bg-blue-500 hover:bg-blue-600 text-lg py-3"
            >
              Ver Resultados Detalhados (se aplicável)
            </Button>
            <Button
              onClick={startQuiz}
              variant="outline"
              className="w-full border-gray-600 hover:bg-gray-700 text-lg py-3"
            >
              Tentar Novamente
            </Button>
            <Button onClick={() => router.push("/")} variant="link" className="text-gray-400 hover:text-gray-200">
              Voltar para a Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">Carregando o desafio...</div>
  )
}
