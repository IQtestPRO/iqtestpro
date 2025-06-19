"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, Users, Clock, Target, AlertTriangle, Zap } from "lucide-react"

interface QuizStats {
  todayAttempts: number
  todayPassed: number
  todaySuccessRate: number
  weeklyAttempts: number
  weeklyPassed: number
  weeklySuccessRate: number
  totalAttempts: number
  totalPassed: number
  overallSuccessRate: number
  averageTimePerQuestion: number
  mostFailedQuestion: string
  currentStreak: number
}

export function ExtremeQuizStats() {
  const [stats, setStats] = useState<QuizStats>({
    todayAttempts: 127,
    todayPassed: 1,
    todaySuccessRate: 0.8,
    weeklyAttempts: 892,
    weeklyPassed: 7,
    weeklySuccessRate: 0.8,
    totalAttempts: 15847,
    totalPassed: 158,
    overallSuccessRate: 1.0,
    averageTimePerQuestion: 18.5,
    mostFailedQuestion: "Lógica Proposicional",
    currentStreak: 0,
  })

  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    // Simular atualizações em tempo real
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        todayAttempts: prev.todayAttempts + Math.floor(Math.random() * 3),
        todayPassed: prev.todayPassed + (Math.random() < 0.01 ? 1 : 0),
      }))
    }, 30000) // Atualiza a cada 30 segundos

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header com Status Live */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-red-600">📊 Estatísticas em Tempo Real</h2>
        <Badge className={`${isLive ? "bg-red-500" : "bg-gray-500"} text-white animate-pulse`}>
          <div className="w-2 h-2 bg-white rounded-full mr-2" />
          {isLive ? "AO VIVO" : "OFFLINE"}
        </Badge>
      </div>

      {/* Grid de Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Hoje */}
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 text-center">
            <TrendingDown className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-red-600">{stats.todaySuccessRate.toFixed(1)}%</div>
            <div className="text-sm text-red-700">Taxa Hoje</div>
            <div className="text-xs text-red-600 mt-1">
              {stats.todayPassed}/{stats.todayAttempts} aprovados
            </div>
          </CardContent>
        </Card>

        {/* Esta Semana */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-orange-600">{stats.weeklySuccessRate.toFixed(1)}%</div>
            <div className="text-sm text-orange-700">Taxa Semanal</div>
            <div className="text-xs text-orange-600 mt-1">
              {stats.weeklyPassed}/{stats.weeklyAttempts} aprovados
            </div>
          </CardContent>
        </Card>

        {/* Tempo Médio */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-yellow-600">{stats.averageTimePerQuestion}s</div>
            <div className="text-sm text-yellow-700">Tempo Médio</div>
            <div className="text-xs text-yellow-600 mt-1">por questão</div>
          </CardContent>
        </Card>

        {/* Sequência Atual */}
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4 text-center">
            <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-purple-600">{stats.currentStreak}</div>
            <div className="text-sm text-purple-700">Sequência</div>
            <div className="text-xs text-purple-600 mt-1">falhas consecutivas</div>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas Históricas */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-500" />
            Dados Históricos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-700 mb-2">{stats.totalAttempts.toLocaleString()}</div>
              <div className="text-sm text-slate-600">Total de Tentativas</div>
              <div className="text-xs text-slate-500 mt-1">Desde o lançamento</div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{stats.totalPassed}</div>
              <div className="text-sm text-slate-600">Total Aprovados</div>
              <div className="text-xs text-slate-500 mt-1">Elite cognitiva</div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">{stats.overallSuccessRate.toFixed(1)}%</div>
              <div className="text-sm text-slate-600">Taxa Geral</div>
              <div className="text-xs text-slate-500 mt-1">Extremamente baixa</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Análise de Dificuldade */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-700">
            <AlertTriangle className="w-6 h-6" />
            Análise de Dificuldade
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-red-700">Questão mais difícil:</span>
              <Badge className="bg-red-100 text-red-700">{stats.mostFailedQuestion}</Badge>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-red-700">Taxa de eliminação no 1º erro:</span>
              <span className="font-bold text-red-600">94.2%</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-red-700">Tempo médio antes da falha:</span>
              <span className="font-bold text-red-600">3min 42s</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-red-700">Questão média de eliminação:</span>
              <span className="font-bold text-red-600">6ª questão</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Avisos Finais */}
      <Card className="border-yellow-300 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
            <div>
              <p className="font-semibold text-yellow-800">Lembre-se:</p>
              <p className="text-sm text-yellow-700">
                Estas estatísticas refletem a dificuldade extrema do teste. Apenas pessoas com QI excepcional (percentil
                99+) têm chances reais de sucesso.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
