"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
            <h1 className="text-4xl font-bold mb-4 text-white">Missão Concluída!</h1>
            <p className="text-xl text-slate-300 mb-6">{results.missionTitle}</p>

            <div
              className={`inline-flex items-center px-6 py-3 rounded-full ${performance.bgColor} border border-current/30`}
            >
              <Trophy className={`w-5 h-5 mr-2 ${performance.color}`} />
              <span className={`font-bold text-lg ${performance.color}`}>{performance.level}</span>
            </div>
          </div>

          {/* Estatísticas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-black text-blue-400 mb-2">{results.score}%</div>
                <p className="text-slate-300 font-medium">Pontuação Final</p>
                <Progress value={results.score} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-black text-emerald-400 mb-2">{iqEstimate}</div>
                <p className="text-slate-300 font-medium">QI Estimado</p>
                <div className="flex justify-center mt-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(iqEstimate / 30) ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-black text-purple-400 mb-2">{formatTime(results.timeSpent)}</div>
                <p className="text-slate-300 font-medium">Tempo Total</p>
                <div className="flex items-center justify-center mt-3 text-slate-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">Eficiência Excelente</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Análise Detalhada */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Desempenho por Questão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Questões Corretas</span>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                      <span className="text-emerald-400 font-bold">{results.correctCount}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Questões Incorretas</span>
                    <div className="flex items-center">
                      <XCircle className="w-4 h-4 text-red-400 mr-2" />
                      <span className="text-red-400 font-bold">{results.totalQuestions - results.correctCount}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Total de Questões</span>
                    <div className="flex items-center">
                      <Brain className="w-4 h-4 text-blue-400 mr-2" />
                      <span className="text-blue-400 font-bold">{results.totalQuestions}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Conquistas Desbloqueadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.score >= 80 && (
                    <div className="flex items-center">
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        🏆 Mestre da Missão
                      </Badge>
                    </div>
                  )}
                  {results.timeSpent < results.totalQuestions * 60 && (
                    <div className="flex items-center">
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">⚡ Velocidade da Luz</Badge>
                    </div>
                  )}
                  {results.correctCount === results.totalQuestions && (
                    <div className="flex items-center">
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                        💎 Perfeição Absoluta
                      </Badge>
                    </div>
                  )}
                  {results.score >= 60 && (
                    <div className="flex items-center">
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        🎯 Missão Cumprida
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ações */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Button
              onClick={handleDownloadCertificate}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Certificado
            </Button>

            <Button
              onClick={handleShareResults}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>

            <Button
              onClick={handleRetakeQuiz}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Refazer
            </Button>

            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
            >
              <Home className="w-4 h-4 mr-2" />
              Início
            </Button>
          </div>

          {/* Recomendações */}
          <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-white">Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-200">Recomendações:</h4>
                  <ul className="space-y-1 text-sm text-slate-300">
                    {results.score >= 80 ? (
                      <>
                        <li>• Experimente uma missão de nível superior</li>
                        <li>• Compartilhe seus resultados com amigos</li>
                        <li>• Explore outras áreas de inteligência</li>
                      </>
                    ) : (
                      <>
                        <li>• Pratique mais exercícios similares</li>
                        <li>• Revise os conceitos fundamentais</li>
                        <li>• Tente novamente quando se sentir preparado</li>
                      </>
                    )}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-200">Outras Missões:</h4>
                  <div className="space-y-2">
                    {[1, 2, 3, 4]
                      .filter((id) => id !== results.missionId)
                      .map((id) => (
                        <Button
                          key={id}
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/quiz/${id}`)}
                          className="w-full justify-start text-slate-300 hover:text-white"
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
