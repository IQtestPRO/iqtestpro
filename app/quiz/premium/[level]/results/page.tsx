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
import { PREMIUM_QUIZ_LEVELS } from "@/lib/premium-quiz-system"

interface PremiumQuizResults {
  score: number
  iqEstimate: number
  correctAnswers: number
  totalQuestions: number
  timeSpent: number
  categoryBreakdown: Record<string, { correct: number; total: number; percentage: number }>
  percentile: number
  level: string
  completedAt: string
}

export default function PremiumQuizResultsPage() {
  const router = useRouter()
  const params = useParams()
  const level = params.level as string

  const [results, setResults] = useState<PremiumQuizResults | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedResults = localStorage.getItem("quizResults")

    if (savedResults) {
      try {
        const parsedResults = JSON.parse(savedResults)
        if (parsedResults.level === level) {
          setResults(parsedResults)
        } else {
          router.push("/premium")
        }
      } catch (error) {
        console.error("Error loading results:", error)
        router.push("/premium")
      }
    } else {
      router.push("/premium")
    }

    setIsLoading(false)
  }, [level, router])

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

  const handleDownloadCertificate = () => {
    alert("Certificado premium será enviado para seu email em alguns minutos!")
  }

  const handleShareResults = () => {
    if (navigator.share && results) {
      const quizLevel = PREMIUM_QUIZ_LEVELS[level]
      navigator.share({
        title: `Meus Resultados Premium - ${quizLevel?.name}`,
        text: `Acabei de completar o quiz premium "${quizLevel?.name}" com ${results.score}% de acerto e QI estimado de ${results.iqEstimate}!`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado para a área de transferência!")
    }
  }

  const handleRetakeQuiz = () => {
    localStorage.removeItem("quizResults")
    router.push(`/quiz/premium/${level}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <OptimizedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-300">Calculando seus resultados premium...</p>
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
              <p className="text-slate-400 mb-6">Não foi possível carregar seus resultados premium.</p>
              <Button onClick={() => router.push("/premium")} className="w-full">
                Voltar aos Quizzes Premium
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const performance = getPerformanceLevel(results.score)
  const quizLevel = PREMIUM_QUIZ_LEVELS[level]

  return (
    <div className="min-h-screen relative">
      <OptimizedBackground />
      <div className="relative z-10 p-4">
        <div className="container mx-auto max-w-4xl pt-20">
          {/* Header de Celebração Premium */}
          <div className="text-center mb-8">
            <div className="text-8xl mb-4 animate-bounce">
              {results.score >= 90 ? "👑" : results.score >= 80 ? "🏆" : results.score >= 60 ? "🎯" : "💪"}
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Quiz Premium Concluído!
            </h1>
            <p className="text-xl text-purple-200 mb-6">{quizLevel?.name}</p>

            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/30 to-orange-500/30 backdrop-blur-sm border border-yellow-400/50">
              <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
              <span className="font-bold text-lg text-yellow-300">PREMIUM • {performance.level}</span>
            </div>
          </div>

          {/* Estatísticas Principais Premium */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-900/80 to-blue-900/80 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 text-center shadow-2xl hover:shadow-purple-500/25">
                <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {results.score}%
                </div>
                <p className="text-purple-200 font-medium">Pontuação</p>
                <Progress value={results.score} className="mt-3 h-2 bg-purple-900/50" />
              </div>
            </div>

            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-yellow-900/80 to-orange-900/80 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-6 text-center shadow-2xl hover:shadow-yellow-500/25">
                <div className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent mb-2">
                  {results.iqEstimate}
                </div>
                <p className="text-yellow-200 font-medium">QI Estimado</p>
                <div className="flex justify-center mt-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(results.iqEstimate / 30) ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-emerald-900/80 to-teal-900/80 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6 text-center shadow-2xl hover:shadow-emerald-500/25">
                <div className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent mb-2">
                  {results.percentile}º
                </div>
                <p className="text-emerald-200 font-medium">Percentil</p>
                <p className="text-xs text-emerald-300 mt-1">Melhor que {results.percentile}% das pessoas</p>
              </div>
            </div>

            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 text-center shadow-2xl hover:shadow-indigo-500/25">
                <div className="text-4xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {formatTime(results.timeSpent)}
                </div>
                <p className="text-indigo-200 font-medium">Tempo</p>
                <div className="flex items-center justify-center mt-3 text-indigo-300">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-xs">Eficiência Premium</span>
                </div>
              </div>
            </div>
          </div>

          {/* Análise Detalhada Premium */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="group cursor-pointer transform hover:scale-102 transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-900/70 to-blue-900/70 backdrop-blur-xl border border-purple-400/30 rounded-2xl shadow-2xl hover:shadow-purple-500/20 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent flex items-center mb-4">
                    <Target className="w-5 h-5 mr-2 text-cyan-400" />
                    Análise de Desempenho
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-400/30">
                      <span className="text-purple-200">Questões Corretas</span>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                        <span className="text-emerald-300 font-bold">{results.correctAnswers}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30">
                      <span className="text-purple-200">Questões Incorretas</span>
                      <div className="flex items-center">
                        <XCircle className="w-4 h-4 text-red-400 mr-2" />
                        <span className="text-red-300 font-bold">
                          {results.totalQuestions - results.correctAnswers}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30">
                      <span className="text-purple-200">Precisão</span>
                      <div className="flex items-center">
                        <Brain className="w-4 h-4 text-cyan-400 mr-2" />
                        <span className="text-cyan-300 font-bold">
                          {Math.round((results.correctAnswers / results.totalQuestions) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer transform hover:scale-102 transition-all duration-300">
              <div className="bg-gradient-to-br from-indigo-900/70 to-purple-900/70 backdrop-blur-xl border border-indigo-400/30 rounded-2xl shadow-2xl hover:shadow-indigo-500/20 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent flex items-center mb-4">
                    <Award className="w-5 h-5 mr-2 text-yellow-400" />
                    Conquistas Premium
                  </h3>
                  <div className="space-y-3">
                    {results.score >= 90 && (
                      <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30">
                        <span className="text-yellow-300 font-semibold">👑 Gênio Certificado</span>
                      </div>
                    )}
                    {results.score >= 80 && (
                      <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                        <span className="text-purple-300 font-semibold">🏆 Elite Intelectual</span>
                      </div>
                    )}
                    {results.iqEstimate >= 130 && (
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30">
                        <span className="text-blue-300 font-semibold">🧠 QI Superior</span>
                      </div>
                    )}
                    {results.percentile >= 95 && (
                      <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30">
                        <span className="text-emerald-300 font-semibold">⭐ Top 5% Mundial</span>
                      </div>
                    )}
                    <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30">
                      <span className="text-indigo-300 font-semibold">💎 Membro Premium</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown por Categoria */}
          {Object.keys(results.categoryBreakdown).length > 0 && (
            <div className="mb-8">
              <div className="bg-gradient-to-br from-slate-900/80 to-purple-900/80 backdrop-blur-xl border border-purple-400/30 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent mb-6">
                    Análise por Categoria
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(results.categoryBreakdown).map(([category, stats]) => (
                      <div
                        key={category}
                        className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/20"
                      >
                        <h4 className="font-semibold text-purple-200 mb-2">{category}</h4>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-300">
                            {stats.correct}/{stats.total}
                          </span>
                          <span className="text-sm font-bold text-cyan-300">{stats.percentage}%</span>
                        </div>
                        <Progress value={stats.percentage} className="h-2 bg-purple-900/50" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ações Premium */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Button
              onClick={handleDownloadCertificate}
              className="group relative overflow-hidden bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 border-0 shadow-lg hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Download className="w-4 h-4 mr-2 relative z-10" />
              <span className="relative z-10">Certificado Premium</span>
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
              onClick={() => router.push("/premium")}
              className="group relative overflow-hidden bg-gradient-to-r from-slate-600/80 to-gray-600/80 hover:from-slate-500 hover:to-gray-500 border border-slate-400/30 shadow-lg hover:shadow-slate-500/25 transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-400/20 to-gray-400/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Home className="w-4 h-4 mr-2 relative z-10" />
              <span className="relative z-10">Outros Quizzes</span>
            </Button>
          </div>

          {/* Recomendações Premium */}
          <div className="group cursor-pointer transform hover:scale-102 transition-all duration-300">
            <div className="bg-gradient-to-br from-slate-900/80 to-purple-900/80 backdrop-blur-xl border border-purple-400/30 rounded-2xl shadow-2xl hover:shadow-purple-500/20 overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent mb-6">
                  Próximos Desafios Premium
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-purple-200 text-lg">Baseado no seu desempenho:</h4>
                    <div className="space-y-2">
                      {results.score >= 80 ? (
                        <>
                          <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30">
                            <span className="text-purple-200">• Experimente o nível Expert para desafio máximo</span>
                          </div>
                          <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30">
                            <span className="text-blue-200">• Participe de competições premium</span>
                          </div>
                          <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30">
                            <span className="text-indigo-200">• Acesse relatórios detalhados de QI</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30">
                            <span className="text-orange-200">• Pratique mais no seu nível atual</span>
                          </div>
                          <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30">
                            <span className="text-yellow-200">• Revise as explicações detalhadas</span>
                          </div>
                          <div className="p-3 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30">
                            <span className="text-green-200">• Use o modo treino para melhorar</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-purple-200 text-lg">Outros Quizzes Premium:</h4>
                    <div className="space-y-2">
                      {Object.entries(PREMIUM_QUIZ_LEVELS)
                        .filter(([id]) => id !== level)
                        .map(([id, quizLevel]) => (
                          <Button
                            key={id}
                            onClick={() => router.push(`/quiz/premium/${id}`)}
                            className="w-full justify-start bg-gradient-to-r from-purple-600/30 to-blue-600/30 hover:from-purple-500/40 hover:to-blue-500/40 border border-purple-400/30 text-purple-200 hover:text-white transform hover:scale-105 transition-all duration-300"
                          >
                            {quizLevel.icon} {quizLevel.name}
                          </Button>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
