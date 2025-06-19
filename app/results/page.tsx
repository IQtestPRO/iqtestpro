"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Share2, Download, RotateCcw, TrendingUp, Users, Award, Star } from "lucide-react"

interface TestResult {
  score: number
  correctAnswers: number
  totalQuestions: number
  completedAt: string
}

export default function ResultsPage() {
  const router = useRouter()
  const [result, setResult] = useState<TestResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedResult = localStorage.getItem("iqTestResult")
    if (savedResult) {
      setResult(JSON.parse(savedResult))
    } else {
      router.push("/")
    }
    setIsLoading(false)
  }, [router])

  const getScoreCategory = (score: number) => {
    if (score >= 140) return { label: "Genial", color: "bg-purple-500", description: "Inteligência excepcional" }
    if (score >= 130) return { label: "Muito Superior", color: "bg-blue-500", description: "Altamente dotado" }
    if (score >= 120) return { label: "Superior", color: "bg-green-500", description: "Acima da média" }
    if (score >= 110)
      return { label: "Médio Superior", color: "bg-yellow-500", description: "Ligeiramente acima da média" }
    if (score >= 90) return { label: "Médio", color: "bg-orange-500", description: "Inteligência média" }
    return { label: "Abaixo da Média", color: "bg-red-500", description: "Precisa de desenvolvimento" }
  }

  const handleShare = () => {
    if (navigator.share && result) {
      navigator.share({
        title: "Meu Resultado do Teste de QI",
        text: `Acabei de fazer um teste de QI e minha pontuação foi ${result.score}! Faça o seu também.`,
        url: window.location.origin,
      })
    } else {
      // Fallback para copiar para clipboard
      navigator.clipboard.writeText(
        `Acabei de fazer um teste de QI e minha pontuação foi ${result?.score}! Faça o seu também em ${window.location.origin}`,
      )
      alert("Link copiado para a área de transferência!")
    }
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

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Resultado não encontrado</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Não foi possível encontrar os resultados do seu teste.
            </p>
            <Button asChild>
              <Link href="/test">Fazer Teste Novamente</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const category = getScoreCategory(result.score)
  const percentage = (result.correctAnswers / result.totalQuestions) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 p-4">
      <div className="container mx-auto max-w-4xl pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Parabéns!</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">Você completou o teste de QI com sucesso</p>
        </div>

        {/* Main Result */}
        <Card className="mb-8 overflow-hidden">
          <div className={`h-2 ${category.color}`} />
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-slate-900 dark:text-slate-100 mb-2">{result.score}</div>
              <Badge className={`${category.color} text-white text-lg px-4 py-2`}>{category.label}</Badge>
              <p className="text-slate-600 dark:text-slate-400 mt-2">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {result.correctAnswers}/{result.totalQuestions}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Respostas Corretas</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{percentage.toFixed(0)}%</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Taxa de Acerto</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">Top 15%</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Ranking Global</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-6 h-6 text-green-500" />
                <h3 className="text-lg font-semibold">Pontos Fortes</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Raciocínio lógico excelente</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Boa capacidade de análise</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Resolução de problemas eficiente</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6 text-blue-500" />
                <h3 className="text-lg font-semibold">Comparação</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Sua pontuação:</span>
                  <span className="font-semibold">{result.score}</span>
                </div>
                <div className="flex justify-between">
                  <span>Média global:</span>
                  <span>100</span>
                </div>
                <div className="flex justify-between">
                  <span>Você está melhor que:</span>
                  <span className="font-semibold text-green-600">85% das pessoas</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button onClick={handleShare} variant="outline" className="flex items-center space-x-2">
            <Share2 className="w-4 h-4" />
            <span>Compartilhar</span>
          </Button>

          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Baixar Certificado</span>
          </Button>

          <Button asChild variant="outline" className="flex items-center space-x-2">
            <Link href="/test">
              <RotateCcw className="w-4 h-4" />
              <span>Fazer Novamente</span>
            </Link>
          </Button>

          <Button asChild className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <Link href="/ranking">
              <Trophy className="w-4 h-4 mr-2" />
              Ver Ranking
            </Link>
          </Button>
        </div>

        {/* Next Steps */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-blue-500" />
              Próximos Passos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium mb-2">Explore o Ranking</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Veja como você se compara com outros usuários no ranking global.
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-medium mb-2">Compartilhe seu Resultado</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Mostre sua conquista para amigos e familiares nas redes sociais.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
