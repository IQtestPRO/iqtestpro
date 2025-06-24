"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Clock, Target, Share2, Download, RotateCcw } from "lucide-react"
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

export default function MissionResultsPage() {
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
        console.error("Error parsing results:", error)
        router.push("/")
      }
    } else {
      router.push("/")
    }
    setIsLoading(false)
  }, [missionId, router])

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { level: "Excepcional", color: "text-emerald-400", icon: "🏆" }
    if (score >= 80) return { level: "Excelente", color: "text-blue-400", icon: "⭐" }
    if (score >= 70) return { level: "Bom", color: "text-yellow-400", icon: "👍" }
    if (score >= 60) return { level: "Regular", color: "text-orange-400", icon: "📈" }
    return { level: "Precisa Melhorar", color: "text-red-400", icon: "📚" }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleShare = () => {
    if (navigator.share && results) {
      navigator.share({
        title: "Meus Resultados do Teste de QI",
        text: `Acabei de completar a ${results.missionTitle} e obtive ${results.score}% de acertos!`,
        url: window.location.href,
      })
    } else {
      // Fallback para navegadores que não suportam Web Share API
      navigator.clipboard.writeText(
        `Acabei de completar a ${results?.missionTitle} e obtive ${results?.score}% de acertos! ${window.location.href}`,
      )
      alert("Link copiado para a área de transferência!")
    }
  }

  const handleDownloadCertificate = () => {
    // Implementar download do certificado
    alert("Funcionalidade de download do certificado em desenvolvimento!")
  }

  const handleRetryMission = () => {
    router.push(`/mission/${missionId}`)
  }

  const handleNewMission = () => {
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <OptimizedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-300">Carregando resultados...</p>
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
              <p className="text-slate-400 mb-6">Não foi possível carregar os resultados da missão.</p>
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

  return (
    <div className="min-h-screen relative">
      <OptimizedBackground />
      <div className="relative z-10 p-4">
        <div className="container mx-auto max-w-4xl pt-20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">{performance.icon}</div>
            <h1 className="text-4xl font-bold mb-4 text-white">Missão Concluída!</h1>
            <p className="text-xl text-slate-400">{results.missionTitle}</p>
          </div>

          {/* Main Results Card */}
          <Card className="mb-8 bg-slate-800/50 backdrop-blur-sm border-2 border-blue-500/30">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* Score */}
                <div className="text-center">
                  <div className="text-6xl font-bold text-blue-400 mb-2">{results.score}%</div>
                  <p className="text-slate-400">Pontuação Final</p>
                  <Badge className={`mt-2 ${performance.color} bg-transparent border-current`}>
                    {performance.level}
                  </Badge>
                </div>

                {/* Accuracy */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">
                    {results.correctCount}/{results.totalQuestions}
                  </div>
                  <p className="text-slate-400">Questões Corretas</p>
                  <div className="mt-2 flex justify-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(results.score / 20) ? "text-yellow-400 fill-yellow-400" : "text-slate-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Time */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">{formatTime(results.timeSpent)}</div>
                  <p className="text-slate-400">Tempo Gasto</p>
                  <Badge variant="outline" className="mt-2 border-purple-500/30 text-purple-300">
                    <Clock className="w-4 h-4 mr-1" />
                    Eficiente
                  </Badge>
                </div>
              </div>

              {/* Performance Analysis */}
              <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 p-6 rounded-lg mb-6">
                <h3 className="font-semibold mb-4 text-white flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Análise de Performance
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-300 mb-2">Pontos Fortes:</p>
                    <ul className="text-sm text-emerald-400 space-y-1">
                      {results.score >= 80 && <li>• Excelente raciocínio lógico</li>}
                      {results.score >= 70 && <li>• Boa capacidade de análise</li>}
                      {results.timeSpent < 300 && <li>• Rapidez na tomada de decisões</li>}
                      <li>• Persistência e foco</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-slate-300 mb-2">Áreas para Desenvolvimento:</p>
                    <ul className="text-sm text-blue-400 space-y-1">
                      {results.score < 80 && <li>• Prática com questões similares</li>}
                      {results.timeSpent > 600 && <li>• Gerenciamento de tempo</li>}
                      <li>• Revisão de conceitos fundamentais</li>
                      <li>• Técnicas de resolução de problemas</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600/50"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>

                <Button
                  onClick={handleDownloadCertificate}
                  variant="outline"
                  className="bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600/50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Certificado
                </Button>

                <Button
                  onClick={handleRetryMission}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Tentar Novamente
                </Button>

                <Button
                  onClick={handleNewMission}
                  className="bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Nova Missão
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 text-white">Próximos Passos Recomendados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-400 mb-2">Missões Similares</h4>
                  <p className="text-sm text-slate-300">
                    Continue praticando com missões do mesmo nível para consolidar seu aprendizado.
                  </p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-400 mb-2">Próximo Nível</h4>
                  <p className="text-sm text-slate-300">
                    {results.score >= 80
                      ? "Você está pronto para desafios mais avançados!"
                      : "Pratique mais um pouco antes de avançar para o próximo nível."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
