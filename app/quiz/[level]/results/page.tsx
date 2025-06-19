"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Download, Share2, RotateCcw, Home, Star, Award, TrendingUp, Brain } from "lucide-react"
import { PREMIUM_QUIZ_LEVELS } from "@/lib/premium-quiz-system"

export default function QuizResultsPage() {
  const router = useRouter()
  const params = useParams()
  const level = params.level as string
  const [results, setResults] = useState<any>(null)
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
        console.error("Error parsing results:", error)
        router.push("/premium")
      }
    } else {
      router.push("/premium")
    }
    setIsLoading(false)
  }, [level, router])

  const handleDownloadCertificate = () => {
    // Implementar geração de certificado PDF
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
      // Fallback para navegadores que não suportam Web Share API
      navigator.clipboard.writeText(
        `Acabei de fazer o teste de QI e obtive ${results.iqEstimate} pontos! 🧠 ${window.location.href}`,
      )
      alert("Link copiado para a área de transferência!")
    }
  }

  const getIQLevel = (iq: number) => {
    if (iq >= 140) return { level: "Genial", color: "text-purple-600", bg: "bg-purple-100" }
    if (iq >= 130) return { level: "Muito Superior", color: "text-blue-600", bg: "bg-blue-100" }
    if (iq >= 120) return { level: "Superior", color: "text-green-600", bg: "bg-green-100" }
    if (iq >= 110) return { level: "Acima da Média", color: "text-emerald-600", bg: "bg-emerald-100" }
    if (iq >= 90) return { level: "Média", color: "text-yellow-600", bg: "bg-yellow-100" }
    if (iq >= 80) return { level: "Abaixo da Média", color: "text-orange-600", bg: "bg-orange-100" }
    return { level: "Baixo", color: "text-red-600", bg: "bg-red-100" }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Carregando resultados...</p>
        </div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Resultados não encontrados</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Não foi possível carregar os resultados do seu teste.
            </p>
            <Button onClick={() => router.push("/premium")} className="w-full">
              Voltar aos Testes
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const quizLevel = PREMIUM_QUIZ_LEVELS[level]
  const iqLevel = getIQLevel(results.iqEstimate)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 p-4">
      <div className="container mx-auto max-w-4xl pt-20">
        {/* Header de Sucesso */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Parabéns! 🎉</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">Você completou o teste de {quizLevel.name}</p>
        </div>

        {/* Resultado Principal */}
        <Card className="mb-8 border-2 border-yellow-200 dark:border-yellow-800 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="text-6xl font-black text-blue-600 mb-2">{results.iqEstimate}</div>
              <div className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">Seu QI Estimado</div>
              <Badge className={`px-4 py-2 text-lg ${iqLevel.bg} ${iqLevel.color} border-0`}>{iqLevel.level}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">{results.correctAnswers}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Respostas Corretas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{results.score}%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Pontuação</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{results.percentile}º</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Percentil</div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-slate-600 dark:text-slate-400">
                Você está no top {100 - results.percentile}% da população mundial! 🌟
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Análise por Categoria */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Brain className="w-6 h-6 mr-2 text-blue-600" />
              Análise Detalhada por Categoria
            </h3>

            <div className="space-y-6">
              {Object.entries(results.categoryBreakdown).map(([category, stats]: [string, any]) => (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{category}</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {stats.correct}/{stats.total} ({stats.percentage}%)
                    </span>
                  </div>
                  <Progress value={stats.percentage} className="h-3" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas Adicionais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                <h4 className="text-lg font-semibold">Performance</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Tempo Total:</span>
                  <span className="font-semibold">
                    {Math.floor(results.timeSpent / 60)}m {results.timeSpent % 60}s
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tempo Médio por Questão:</span>
                  <span className="font-semibold">{Math.round(results.timeSpent / results.totalQuestions)}s</span>
                </div>
                <div className="flex justify-between">
                  <span>Eficiência:</span>
                  <span className="font-semibold text-green-600">
                    {results.timeSpent < quizLevel.duration * 60 * 0.8 ? "Excelente" : "Boa"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 mr-2 text-purple-600" />
                <h4 className="text-lg font-semibold">Conquistas</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  <span>Teste {quizLevel.difficulty} Completado</span>
                </div>
                {results.score >= 80 && (
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    <span>Pontuação Excelente (80%+)</span>
                  </div>
                )}
                {results.percentile >= 90 && (
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    <span>Top 10% Mundial</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ações */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button onClick={handleDownloadCertificate} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Baixar Certificado
          </Button>

          <Button onClick={handleShareResults} variant="outline" className="w-full">
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>

          <Button onClick={() => router.push(`/quiz/${level}`)} variant="outline" className="w-full">
            <RotateCcw className="w-4 h-4 mr-2" />
            Refazer Teste
          </Button>

          <Button onClick={() => router.push("/premium")} variant="outline" className="w-full">
            <Home className="w-4 h-4 mr-2" />
            Outros Testes
          </Button>
        </div>

        {/* Próximos Passos */}
        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6">Próximos Passos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Explore Outros Testes</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Como você já é premium, todos os outros testes estão desbloqueados!
                </p>
                <Button onClick={() => router.push("/premium")} size="sm">
                  Ver Todos os Testes
                </Button>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Melhore Seus Resultados</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Pratique mais para aumentar seu QI e performance cognitiva.
                </p>
                <Button onClick={() => router.push("/training")} size="sm" variant="outline">
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
