"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Download,
  Share2,
  RotateCcw,
  Home,
  Star,
  Award,
  TrendingUp,
  Brain,
  Clock,
  Target,
  CheckCircle,
  XCircle,
  Zap,
  Medal,
  Crown,
} from "lucide-react"
import { PREMIUM_QUIZ_LEVELS } from "@/lib/premium-quiz-system"

export default function QuizResultsPage() {
  const router = useRouter()
  const params = useParams()
  const level = params.level as string
  const [results, setResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    const savedResults = localStorage.getItem("quizResults")
    if (savedResults) {
      try {
        const parsedResults = JSON.parse(savedResults)
        if (parsedResults.level === level) {
          setResults(parsedResults)
          // Trigger celebration animation
          setTimeout(() => setShowCelebration(true), 500)
        } else {
          router.push("/premium")
        }
      } catch (error) {
        console.error("Error parsing results:", error)
        router.push("/premium")
      }
    } else {
      router.push("/premium")
    }
    setIsLoading(false)
  }, [level, router])

  const handleDownloadCertificate = () => {
    alert("Certificado será baixado em breve!")
  }

  const handleShareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: `Meu resultado no teste de ${PREMIUM_QUIZ_LEVELS[level]?.name}`,
        text: `Acabei de fazer o teste de QI e obtive ${results.iqEstimate} pontos! 🧠`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(
        `Acabei de fazer o teste de QI e obtive ${results.iqEstimate} pontos! 🧠 ${window.location.href}`,
      )
      alert("Link copiado para a área de transferência!")
    }
  }

  const getIQLevel = (iq: number) => {
    if (iq >= 140) return { level: "Genial", color: "text-purple-400", bg: "bg-purple-500/20", icon: Crown }
    if (iq >= 130) return { level: "Muito Superior", color: "text-blue-400", bg: "bg-blue-500/20", icon: Medal }
    if (iq >= 120) return { level: "Superior", color: "text-emerald-400", bg: "bg-emerald-500/20", icon: Trophy }
    if (iq >= 110) return { level: "Acima da Média", color: "text-green-400", bg: "bg-green-500/20", icon: Star }
    if (iq >= 90) return { level: "Média", color: "text-yellow-400", bg: "bg-yellow-500/20", icon: Target }
    if (iq >= 80) return { level: "Abaixo da Média", color: "text-orange-400", bg: "bg-orange-500/20", icon: Zap }
    return { level: "Baixo", color: "text-red-400", bg: "bg-red-500/20", icon: Brain }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium text-slate-700 dark:text-slate-300">Analisando seus resultados...</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Calculando seu QI e performance</p>
          </div>
        </div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20 flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Resultados não encontrados</h1>
              <p className="text-slate-600 dark:text-slate-400">
                Não foi possível carregar os resultados do seu teste.
              </p>
            </div>
            <Button
              onClick={() => router.push("/premium")}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg"
            >
              Voltar aos Testes
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const quizLevel = PREMIUM_QUIZ_LEVELS[level]
  const iqLevel = getIQLevel(results.iqEstimate)
  const IconComponent = iqLevel.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="container mx-auto max-w-6xl px-4 pt-20 pb-12">
        {/* Celebration Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${showCelebration ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-gentle-bounce">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-subtle-pulse">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Parabéns! 🎉
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium">
              Você completou o teste de{" "}
              <span className="font-bold text-blue-600 dark:text-blue-400">{quizLevel.name}</span>
            </p>
          </div>
        </div>

        {/* Main Results Card */}
        <Card
          className={`mb-8 border-0 shadow-2xl bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50 dark:from-slate-800 dark:via-blue-900/20 dark:to-purple-900/20 overflow-hidden transition-all duration-1000 ${showCelebration ? "animate-scale-in" : "opacity-0"}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
          <CardContent className="relative p-8 md:p-12">
            {/* IQ Score Display */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="text-7xl md:text-8xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  {results.iqEstimate}
                </div>
                <div className="absolute -top-4 -right-4">
                  <IconComponent className={`w-8 h-8 ${iqLevel.color}`} />
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-200">Seu QI Estimado</h2>
                <Badge className={`px-6 py-3 text-lg font-semibold ${iqLevel.bg} ${iqLevel.color} border-0 shadow-lg`}>
                  {iqLevel.level}
                </Badge>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200/50 dark:border-emerald-700/30">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                  {results.correctAnswers}
                </div>
                <div className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Respostas Corretas</div>
              </div>

              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-700/30">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{results.score}%</div>
                <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Pontuação Final</div>
              </div>

              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200/50 dark:border-purple-700/30">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  {results.percentile}º
                </div>
                <div className="text-sm font-medium text-purple-700 dark:text-purple-300">Percentil Global</div>
              </div>
            </div>

            {/* Achievement Banner */}
            <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20 border border-yellow-200/50 dark:border-yellow-700/30">
              <div className="flex items-center justify-center space-x-2 text-lg font-semibold text-slate-700 dark:text-slate-200">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>Você está no top {100 - results.percentile}% da população mundial!</span>
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 transition-all duration-1000 delay-300 ${showCelebration ? "animate-slide-in-left" : "opacity-0"}`}
        >
          {/* Category Breakdown */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Análise por Categoria</h3>
              </div>

              <div className="space-y-4">
                {Object.entries(results.categoryBreakdown).map(([category, stats]: [string, any]) => (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-700 dark:text-slate-300">{category}</span>
                      <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                        {stats.correct}/{stats.total} ({stats.percentage}%)
                      </span>
                    </div>
                    <div className="relative">
                      <Progress value={stats.percentage} className="h-3 bg-slate-200 dark:bg-slate-700" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Stats */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Estatísticas de Performance</h3>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Tempo Total</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {Math.floor(results.timeSpent / 60)}m {results.timeSpent % 60}s
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Tempo por Questão</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400">
                    {Math.round(results.timeSpent / results.totalQuestions)}s
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Eficiência</span>
                  <Badge
                    className={`${results.timeSpent < quizLevel.duration * 60 * 0.8 ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-blue-500/20 text-blue-600 dark:text-blue-400"} border-0`}
                  >
                    {results.timeSpent < quizLevel.duration * 60 * 0.8 ? "Excelente" : "Boa"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card
          className={`mb-8 border-0 shadow-xl bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20 transition-all duration-1000 delay-500 ${showCelebration ? "animate-slide-in-right" : "opacity-0"}`}
        >
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Conquistas Desbloqueadas</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-yellow-200/50 dark:border-yellow-700/30 text-center">
                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Teste Completado</div>
              </div>

              {results.score >= 80 && (
                <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-700/30 text-center">
                  <Star className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Pontuação Excelente</div>
                </div>
              )}

              {results.percentile >= 90 && (
                <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/30 text-center">
                  <Crown className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Top 10% Mundial</div>
                </div>
              )}

              {results.timeSpent < quizLevel.duration * 60 * 0.7 && (
                <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/30 text-center">
                  <Zap className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Velocidade Impressionante
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 transition-all duration-1000 delay-700 ${showCelebration ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <Button
            onClick={handleDownloadCertificate}
            className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border-0 shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Download className="w-4 h-4 mr-2" />
            Certificado
          </Button>

          <Button
            onClick={handleShareResults}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>

          <Button
            onClick={() => router.push(`/quiz/${level}`)}
            variant="outline"
            className="group border-2 border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Refazer
          </Button>

          <Button
            onClick={() => router.push("/premium")}
            variant="outline"
            className="group border-2 border-slate-300 dark:border-slate-600 hover:border-purple-400 dark:hover:border-purple-500 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
          >
            <Home className="w-4 h-4 mr-2" />
            Outros Testes
          </Button>
        </div>

        {/* Next Steps */}
        <Card
          className={`border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm transition-all duration-1000 delay-900 ${showCelebration ? "animate-scale-in" : "opacity-0"}`}
        >
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">Próximos Passos</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-slate-700 dark:text-slate-300 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Explore Outros Testes
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Como você já é premium, todos os outros testes estão desbloqueados para você!
                </p>
                <Button
                  onClick={() => router.push("/premium")}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg"
                >
                  Ver Todos os Testes
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-slate-700 dark:text-slate-300 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-500" />
                  Continue Evoluindo
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Pratique mais para aumentar seu QI e performance cognitiva ainda mais.
                </p>
                <Button
                  onClick={() => router.push("/premium")}
                  variant="outline"
                  className="w-full border-2 border-purple-300 dark:border-purple-600 hover:border-purple-400 dark:hover:border-purple-500 bg-white/80 dark:bg-slate-800/80"
                >
                  Treinar Mais
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
