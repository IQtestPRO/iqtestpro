"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Clock,
  Target,
  Brain,
  Star,
  CheckCircle,
  XCircle,
  Award,
  Download,
  Share2,
  RotateCcw,
  Home,
} from "lucide-react"
import { OptimizedBackground } from "@/components/optimized-background"

interface QuizResults {
  missionId: number
  missionTitle: string
  score: number
  correctCount: number
  totalQuestions: number
  timeSpent: number
  completedAt: string
  answers: (number | string | null)[]
}

export default function QuizResultsPage() {
  const router = useRouter()
  const params = useParams()
  const missionId = Number.parseInt(params.id as string)

  const [results, setResults] = useState<QuizResults | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedResults = localStorage.getItem("quizResults")

    if (savedResults) {
      try {
        const parsedResults = JSON.parse(savedResults)
        if (parsedResults.missionId === missionId) {
          setResults(parsedResults)
        } else {
          router.push("/")
        }
      } catch (error) {
        console.error("Error loading results:", error)
        router.push("/")
      }
    } else {
      router.push("/")
    }

    setIsLoading(false)
  }, [missionId, router])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { level: "Excepcional", color: "text-emerald-400", bgColor: "bg-emerald-500/20" }
    if (score >= 80) return { level: "Excelente", color: "text-blue-400", bgColor: "bg-blue-500/20" }
    if (score >= 70) return { level: "Bom", color: "text-purple-400", bgColor: "bg-purple-500/20" }
    if (score >= 60) return { level: "Regular", color: "text-yellow-400", bgColor: "bg-yellow-500/20" }
    return { level: "Precisa Melhorar", color: "text-red-400", bgColor: "bg-red-500/20" }
  }

  const getIQEstimate = (score: number, missionId: number) => {
    const baseIQ = 100
    const levelMultipliers = {
      1: 0.8, // Básico
      2: 1.0, // Intermediário
      3: 1.3, // Avançado
      4: 1.6, // Expert
    }

    const multiplier = levelMultipliers[missionId as keyof typeof levelMultipliers] || 1.0
    const iqEstimate = baseIQ + (score - 50) * multiplier * 0.6

    return Math.max(70, Math.min(200, Math.round(iqEstimate)))
  }

  const handleDownloadCertificate = () => {
    // Simular download do certificado
    alert("Certificado será enviado para seu email em alguns minutos!")
  }

  const handleShareResults = () => {
    if (navigator.share && results) {
      navigator.share({
        title: `Meus Resultados - ${results.missionTitle}`,
        text: `Acabei de completar a missão "${results.missionTitle}" com ${results.score}% de acerto!`,
        url: window.location.href,
      })
    } else {
      // Fallback para copiar para clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado para a área de transferência!")
    }
  }

  const handleRetakeQuiz = () => {
    // Limpar resultados anteriores
    localStorage.removeItem("quizResults")
    router.push(`/quiz/${missionId}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <OptimizedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-300">Calculando seus resultados...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="min-h-screen relative">
        <OptimizedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <Card className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4 text-white">Resultados não encontrados</h1>
              <p className="text-slate-400 mb-6">Não foi possível carregar seus resultados.</p>
              <Button onClick={() => router.push("/")} className="w-full">
                Voltar ao Início
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const performance = getPerformanceLevel(results.score)
  const iqEstimate = getIQEstimate(results.score, results.missionId)

  return (
    <div className="min-h-screen relative">
      <OptimizedBackground />
      <div className="relative z-10 p-4">
        <div className="container mx-auto max-w-4xl pt-20">
          {/* Header de Celebração */}
          <div className="text-center mb-8">
            <div className="text-8xl mb-4 animate-bounce">
              {results.score >= 80 ? "🏆" : results.score >= 60 ? "🎯" : "💪"}
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Missão Concluída!
            </h1>
            <p className="text-xl text-purple-200 mb-6">{results.missionTitle}</p>

            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 backdrop-blur-sm border border-purple-400/50">
              <Trophy className="w-5 h-5 mr-2 text-cyan-400" />
              <span className="font-bold text-lg text-cyan-300">{performance.level}</span>
            </div>
          </div>

          {/* Estatísticas Principais - Como Popups */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-900/80 to-blue-900/80 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 text-center shadow-2xl hover:shadow-purple-500/25">
                <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {results.score}%
                </div>
                <p className="text-purple-200 font-medium">Pontuação Final</p>
                <Progress value={results.score} className="mt-3 h-2 bg-purple-900/50" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-900/80 to-cyan-900/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 text-center shadow-2xl hover:shadow-blue-500/25">
                <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
                  {iqEstimate}
                </div>
                <p className="text-blue-200 font-medium">QI Estimado</p>
                <div className="flex justify-center mt-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(iqEstimate / 30) ? "text-cyan-400 fill-cyan-400" : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 text-center shadow-2xl hover:shadow-indigo-500/25">
                <div className="text-4xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {formatTime(results.timeSpent)}
                </div>
                <p className="text-indigo-200 font-medium">Tempo Total</p>
                <div className="flex items-center justify-center mt-3 text-indigo-300">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">Eficiência Excelente</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>

          {/* Análise Detalhada - Como Popups */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="group cursor-pointer transform hover:scale-102 transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-900/70 to-blue-900/70 backdrop-blur-xl border border-purple-400/30 rounded-2xl shadow-2xl hover:shadow-purple-500/20 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent flex items-center mb-4">
                    <Target className="w-5 h-5 mr-2 text-cyan-400" />
                    Desempenho por Questão
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-400/30">
                      <span className="text-purple-200">Questões Corretas</span>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                        <span className="text-emerald-300 font-bold">{results.correctCount}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30">
                      <span className="text-purple-200">Questões Incorretas</span>
                      <div className="flex items-center">
                        <XCircle className="w-4 h-4 text-red-400 mr-2" />
                        <span className="text-red-300 font-bold">{results.totalQuestions - results.correctCount}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30">
                      <span className="text-purple-200">Total de Questões</span>
                      <div className="flex items-center">
                        <Brain className="w-4 h-4 text-cyan-400 mr-2" />
                        <span className="text-cyan-300 font-bold">{results.totalQuestions}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            <div className="group cursor-pointer transform hover:scale-102 transition-all duration-300">
              <div className="bg-gradient-to-br from-indigo-900/70 to-purple-900/70 backdrop-blur-xl border border-indigo-400/30 rounded-2xl shadow-2xl hover:shadow-indigo-500/20 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent flex items-center mb-4">
                    <Award className="w-5 h-5 mr-2 text-yellow-400" />
                    Conquistas Desbloqueadas
                  </h3>
                  <div className="space-y-3">
                    {results.score >= 80 && (
                      <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30">
                        <span className="text-yellow-300 font-semibold">🏆 Mestre da Missão</span>
                      </div>
                    )}
                    {results.timeSpent < results.totalQuestions * 60 && (
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30">
                        <span className="text-blue-300 font-semibold">⚡ Velocidade da Luz</span>
                      </div>
                    )}
                    {results.correctCount === results.totalQuestions && (
                      <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30">
                        <span className="text-emerald-300 font-semibold">💎 Perfeição Absoluta</span>
                      </div>
                    )}
                    {results.score >= 60 && (
                      <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                        <span className="text-purple-300 font-semibold">🎯 Missão Cumprida</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>

          {/* Ações - Como Botões Popup */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Button
              onClick={handleDownloadCertificate}
              className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border-0 shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Download className="w-4 h-4 mr-2 relative z-10" />
              <span className="relative z-10">Certificado</span>
            </Button>

            <Button
              onClick={handleShareResults}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Share2 className="w-4 h-4 mr-2 relative z-10" />
              <span className="relative z-10">Compartilhar</span>
            </Button>

            <Button
              onClick={handleRetakeQuiz}
              className="group relative overflow-hidden bg-gradient-to-r from-indigo-600/80 to-purple-600/80 hover:from-indigo-500 hover:to-purple-500 border border-indigo-400/30 shadow-lg hover:shadow-indigo-500/25 transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <RotateCcw className="w-4 h-4 mr-2 relative z-10" />
              <span className="relative z-10">Refazer</span>
            </Button>

            <Button
              onClick={() => router.push("/")}
              className="group relative overflow-hidden bg-gradient-to-r from-slate-600/80 to-gray-600/80 hover:from-slate-500 hover:to-gray-500 border border-slate-400/30 shadow-lg hover:shadow-slate-500/25 transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-400/20 to-gray-400/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Home className="w-4 h-4 mr-2 relative z-10" />
              <span className="relative z-10">Início</span>
            </Button>
          </div>

          {/* Recomendações - Como Popup */}
          <div className="group cursor-pointer transform hover:scale-102 transition-all duration-300">
            <div className="bg-gradient-to-br from-slate-900/80 to-purple-900/80 backdrop-blur-xl border border-purple-400/30 rounded-2xl shadow-2xl hover:shadow-purple-500/20 overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent mb-6">
                  Próximos Passos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-purple-200 text-lg">Recomendações:</h4>
                    <div className="space-y-2">
                      {results.score >= 80 ? (
                        <>
                          <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30">
                            <span className="text-purple-200">• Experimente uma missão de nível superior</span>
                          </div>
                          <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30">
                            <span className="text-blue-200">• Compartilhe seus resultados com amigos</span>
                          </div>
                          <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30">
                            <span className="text-indigo-200">• Explore outras áreas de inteligência</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30">
                            <span className="text-orange-200">• Pratique mais exercícios similares</span>
                          </div>
                          <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30">
                            <span className="text-yellow-200">• Revise os conceitos fundamentais</span>
                          </div>
                          <div className="p-3 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30">
                            <span className="text-green-200">• Tente novamente quando se sentir preparado</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-purple-200 text-lg">Outras Missões:</h4>
                    <div className="space-y-2">
                      {[1, 2, 3, 4]
                        .filter((id) => id !== results.missionId)
                        .map((id) => (
                          <Button
                            key={id}
                            onClick={() => router.push(`/quiz/${id}`)}
                            className="w-full justify-start bg-gradient-to-r from-purple-600/30 to-blue-600/30 hover:from-purple-500/40 hover:to-blue-500/40 border border-purple-400/30 text-purple-200 hover:text-white transform hover:scale-105 transition-all duration-300"
                          >
                            {id === 1 && "🧩 Raciocínio Espacial"}
                            {id === 2 && "🧠 Raciocínio Lógico"}
                            {id === 3 && "🎯 Inteligência Fluida"}
                            {id === 4 && "👑 Avaliação Completa"}
                          </Button>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
