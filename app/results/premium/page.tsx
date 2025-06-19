"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Share2, Download, RotateCcw, TrendingUp, Crown, Shield, CheckCircle, Brain } from "lucide-react"

interface PremiumTestResult {
  score: number
  correctAnswers: number
  totalQuestions: number
  completedAt: string
  testLevel: string
  testTitle: string
  isPremium: boolean
}

export default function PremiumResultsPage() {
  const router = useRouter()
  const [result, setResult] = useState<PremiumTestResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedResult = localStorage.getItem("premiumTestResult")
    if (savedResult) {
      setResult(JSON.parse(savedResult))
    } else {
      router.push("/")
    }
    setIsLoading(false)
  }, [router])

  const getScoreCategory = (score: number) => {
    if (score >= 160)
      return {
        label: "Genial Excepcional",
        color: "bg-purple-500",
        description: "Inteligência extraordinária - Top 0.1%",
        percentile: "99.9%",
      }
    if (score >= 145)
      return {
        label: "Genial",
        color: "bg-indigo-500",
        description: "Inteligência excepcional - Top 1%",
        percentile: "99%",
      }
    if (score >= 130)
      return {
        label: "Muito Superior",
        color: "bg-blue-500",
        description: "Altamente dotado - Top 5%",
        percentile: "95%",
      }
    if (score >= 120)
      return {
        label: "Superior",
        color: "bg-green-500",
        description: "Acima da média - Top 15%",
        percentile: "85%",
      }
    if (score >= 110)
      return {
        label: "Médio Superior",
        color: "bg-yellow-500",
        description: "Ligeiramente acima da média - Top 25%",
        percentile: "75%",
      }
    return {
      label: "Médio",
      color: "bg-orange-500",
      description: "Inteligência média",
      percentile: "50%",
    }
  }

  const handleShare = () => {
    if (navigator.share && result) {
      navigator.share({
        title: "Meu Resultado Premium do Teste de QI",
        text: `Acabei de completar o teste ${result.testTitle} e minha pontuação foi ${result.score}! 🧠✨`,
        url: window.location.origin,
      })
    } else {
      navigator.clipboard.writeText(
        `Acabei de completar o teste ${result?.testTitle} e minha pontuação foi ${result?.score}! Faça o seu também em ${window.location.origin}`,
      )
      alert("Link copiado para a área de transferência!")
    }
  }

  const generateCertificate = () => {
    alert("Certificado premium será gerado e enviado por email em até 24 horas!")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Processando seus resultados premium...</p>
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
              Não foi possível encontrar os resultados do seu teste premium.
            </p>
            <Button asChild>
              <Link href="/">Voltar ao Início</Link>
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
      <div className="container mx-auto max-w-5xl pt-20">
        {/* Premium Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full mb-4 shadow-lg">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-2 text-lg mb-4">
            <Trophy className="w-5 h-5 mr-2" />
            RESULTADO PREMIUM
          </Badge>
          <h1 className="text-4xl font-bold mb-2">Parabéns!</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Você completou o <strong>{result.testTitle}</strong> com excelência
          </p>
        </div>

        {/* Main Result Card */}
        <Card className="mb-8 overflow-hidden border-2 border-yellow-200 dark:border-yellow-800">
          <div className={`h-3 ${category.color}`} />
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="text-7xl font-bold text-slate-900 dark:text-slate-100 mb-4">{result.score}</div>
              <Badge className={`${category.color} text-white text-xl px-6 py-3 mb-3`}>{category.label}</Badge>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-2">{category.description}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Você está no percentil {category.percentile} da população
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {result.correctAnswers}/{result.totalQuestions}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Respostas Corretas</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{percentage.toFixed(0)}%</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Taxa de Acerto</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{result.testLevel}</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Nível Completado</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">Top 5%</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Ranking Global</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Premium Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Detailed Analysis */}
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Brain className="w-6 h-6 text-blue-500" />
                <h3 className="text-xl font-semibold">Análise Cognitiva Detalhada</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Pontos Fortes</h4>
                  <ul className="space-y-1 text-sm text-green-700 dark:text-green-400">
                    <li>• Raciocínio lógico excepcional</li>
                    <li>• Excelente capacidade de análise</li>
                    <li>• Processamento rápido de informações</li>
                    <li>• Resolução eficiente de problemas complexos</li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Recomendações</h4>
                  <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-400">
                    <li>• Continue desafiando-se com problemas complexos</li>
                    <li>• Explore áreas de matemática avançada</li>
                    <li>• Considere carreiras em análise e estratégia</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Premium Benefits */}
          <Card className="border-2 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="w-6 h-6 text-purple-500" />
                <h3 className="text-xl font-semibold">Benefícios Premium Incluídos</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Relatório psicométrico completo</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Certificado profissional reconhecido</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Análise comparativa detalhada</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Plano de desenvolvimento personalizado</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Acesso vitalício aos resultados</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Suporte prioritário</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Chart */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-semibold">Comparação Populacional</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">{result.score}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Sua Pontuação</div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${category.color}`}
                    style={{ width: `${Math.min((result.score / 160) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="text-2xl font-bold text-slate-600 dark:text-slate-400 mb-1">100</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Média Global</div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="h-2 rounded-full bg-slate-400" style={{ width: "62.5%" }} />
                </div>
              </div>

              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">+{result.score - 100}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Pontos Acima da Média</div>
                <div className="text-xs text-green-600 mt-1">
                  {(((result.score - 100) / 100) * 100).toFixed(0)}% superior
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Button onClick={handleShare} variant="outline" className="flex items-center justify-center space-x-2">
            <Share2 className="w-4 h-4" />
            <span>Compartilhar</span>
          </Button>

          <Button
            onClick={generateCertificate}
            variant="outline"
            className="flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Certificado</span>
          </Button>

          <Button asChild variant="outline" className="flex items-center justify-center space-x-2">
            <Link href="/">
              <RotateCcw className="w-4 h-4" />
              <span>Novo Teste</span>
            </Link>
          </Button>

          <Button asChild className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <Link href="/ranking" className="flex items-center justify-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span>Ver Ranking</span>
            </Link>
          </Button>
        </div>

        {/* Premium Support */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-6 text-center">
            <Crown className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4">Suporte Premium Ativado</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Como cliente premium, você tem acesso a consultoria personalizada e suporte prioritário.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700">
                Agendar Consultoria
              </Button>
              <Button variant="outline">Contatar Suporte Premium</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
