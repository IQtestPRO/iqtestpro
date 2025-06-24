"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Crown, TrendingUp, TrendingDown, Minus, Trophy, Medal, Award, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OptimizedBackground } from "@/components/optimized-background"

interface UserRanking {
  id: string
  name: string
  email: string
  score: number
  previousRank: number
  currentRank: number
  trend: "up" | "down" | "stable"
  country: string
  avatar: string
  testsCompleted: number
  lastActive: string
  badge?: string
}

// Simulated user data generator
const generateSimulatedUsers = (): UserRanking[] => {
  const firstNames = [
    "Ana",
    "Bruno",
    "Carlos",
    "Diana",
    "Eduardo",
    "Fernanda",
    "Gabriel",
    "Helena",
    "Igor",
    "Julia",
    "Lucas",
    "Maria",
    "Nicolas",
    "Olivia",
    "Pedro",
    "Rafaela",
    "Samuel",
    "Tatiana",
    "Victor",
    "Yasmin",
    "Alexandre",
    "Beatriz",
    "Caio",
    "Daniela",
    "Enzo",
    "Fabiana",
    "Gustavo",
    "Isabela",
    "João",
    "Larissa",
    "Mateus",
    "Natalia",
  ]

  const lastNames = [
    "Silva",
    "Santos",
    "Oliveira",
    "Souza",
    "Rodrigues",
    "Ferreira",
    "Alves",
    "Pereira",
    "Lima",
    "Gomes",
    "Costa",
    "Ribeiro",
    "Martins",
    "Carvalho",
    "Almeida",
    "Lopes",
    "Soares",
    "Fernandes",
    "Vieira",
    "Barbosa",
    "Rocha",
    "Dias",
    "Monteiro",
    "Cardoso",
  ]

  const countries = [
    "🇧🇷 Brasil",
    "🇺🇸 EUA",
    "🇬🇧 Reino Unido",
    "🇩🇪 Alemanha",
    "🇫🇷 França",
    "🇯🇵 Japão",
    "🇨🇦 Canadá",
    "🇦🇺 Austrália",
  ]

  const badges = ["🧠 Gênio", "⚡ Relâmpago", "🎯 Preciso", "🔥 Consistente", "💎 Elite", "🏆 Campeão"]

  const users: UserRanking[] = []

  for (let i = 0; i < 50; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const baseScore = Math.floor(Math.random() * 60) + 120 // Scores between 120-180
    const variation = Math.floor(Math.random() * 10) - 5 // -5 to +5 variation
    const score = Math.max(85, Math.min(200, baseScore + variation))

    const previousRank = i + 1 + Math.floor(Math.random() * 6) - 3 // Some rank variation
    const currentRank = i + 1

    let trend: "up" | "down" | "stable" = "stable"
    if (previousRank > currentRank) trend = "up"
    else if (previousRank < currentRank) trend = "down"

    users.push({
      id: `user_${i + 1}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
      score,
      previousRank: Math.max(1, previousRank),
      currentRank,
      trend,
      country: countries[Math.floor(Math.random() * countries.length)],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}`,
      testsCompleted: Math.floor(Math.random() * 25) + 5,
      lastActive: `${Math.floor(Math.random() * 24)}h atrás`,
      badge: Math.random() > 0.7 ? badges[Math.floor(Math.random() * badges.length)] : undefined,
    })
  }

  return users
    .sort((a, b) => b.score - a.score)
    .map((user, index) => ({
      ...user,
      currentRank: index + 1,
    }))
}

const RankingPage = () => {
  const [ranking, setRanking] = useState<UserRanking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()

  // Generate initial ranking and set up periodic updates
  useEffect(() => {
    const updateRanking = () => {
      const simulatedUsers = generateSimulatedUsers()
      setRanking(simulatedUsers)
      setLastUpdate(new Date())
      setIsLoading(false)
    }

    // Initial load
    updateRanking()

    // Update every 30 seconds for dynamic feel
    const interval = setInterval(updateRanking, 30000)

    return () => clearInterval(interval)
  }, [])

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen relative">
        <OptimizedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-300">Carregando ranking...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    router.push("/login")
    return null
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-emerald-400" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-400" />
      default:
        return <Minus className="w-4 h-4 text-slate-400" />
    }
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />
    if (rank === 2) return <Medal className="w-6 h-6 text-slate-300" />
    if (rank === 3) return <Award className="w-6 h-6 text-orange-400" />
    return <Star className="w-5 h-5 text-slate-400" />
  }

  return (
    <div className="min-h-screen relative">
      <OptimizedBackground />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <Trophy className="w-12 h-12 text-yellow-400" />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Ranking Global de QI
                </span>
              </h1>
              <p className="text-xl text-slate-300 mb-2">Competição mundial de inteligência em tempo real</p>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                Última atualização: {lastUpdate.toLocaleTimeString("pt-BR")}
              </div>
            </div>

            {/* CTA Button */}
            <div className="mb-8 text-center">
              <Button
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold px-10 py-5 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg animate-glow"
                onClick={() => router.push("/premium")}
              >
                <Crown className="w-6 h-6 mr-3" />
                Entrar na Competição
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 shadow-lg text-center hover:bg-slate-800/70 transition-all duration-300">
                <div className="text-2xl font-bold text-blue-400">50</div>
                <div className="text-sm text-slate-400">Participantes Ativos</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 shadow-lg text-center hover:bg-slate-800/70 transition-all duration-300">
                <div className="text-2xl font-bold text-emerald-400">{ranking[0]?.score || 0}</div>
                <div className="text-sm text-slate-400">Maior Pontuação</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 shadow-lg text-center hover:bg-slate-800/70 transition-all duration-300">
                <div className="text-2xl font-bold text-purple-400">
                  {Math.round(ranking.reduce((sum, user) => sum + user.score, 0) / ranking.length) || 0}
                </div>
                <div className="text-sm text-slate-400">Média Global</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 shadow-lg text-center hover:bg-slate-800/70 transition-all duration-300">
                <div className="text-2xl font-bold text-orange-400">8</div>
                <div className="text-sm text-slate-400">Países</div>
              </div>
            </div>

            {/* Ranking Table */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border-b border-slate-700/50">
                <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  Top 20 Mundial
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/30">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Posição
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Usuário
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        País
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Pontuação
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Tendência
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Testes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {ranking.slice(0, 20).map((rankUser, index) => (
                      <tr
                        key={rankUser.id}
                        className={`hover:bg-slate-700/30 transition-all duration-200 ${
                          index < 3 ? "bg-gradient-to-r from-yellow-500/5 via-orange-500/5 to-red-500/5" : ""
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getRankIcon(rankUser.currentRank)}
                            <span
                              className={`text-lg font-bold ${
                                index === 0
                                  ? "text-yellow-400"
                                  : index === 1
                                    ? "text-slate-300"
                                    : index === 2
                                      ? "text-orange-400"
                                      : "text-white"
                              }`}
                            >
                              #{rankUser.currentRank}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <img
                              src={rankUser.avatar || "/placeholder.svg"}
                              alt={rankUser.name}
                              className="w-10 h-10 rounded-full border-2 border-slate-600"
                            />
                            <div>
                              <div className="text-sm font-medium text-white flex items-center gap-2">
                                {rankUser.name}
                                {rankUser.badge && (
                                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/30">
                                    {rankUser.badge}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-slate-400">Ativo {rankUser.lastActive}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-slate-300">{rankUser.country}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-lg font-bold text-white">{rankUser.score}</div>
                          <div className="text-xs text-slate-400">QI Score</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            {getTrendIcon(rankUser.trend)}
                            <span
                              className={`text-xs font-medium ${
                                rankUser.trend === "up"
                                  ? "text-emerald-400"
                                  : rankUser.trend === "down"
                                    ? "text-red-400"
                                    : "text-slate-400"
                              }`}
                            >
                              {rankUser.trend === "up"
                                ? `+${rankUser.previousRank - rankUser.currentRank}`
                                : rankUser.trend === "down"
                                  ? `-${rankUser.currentRank - rankUser.previousRank}`
                                  : "0"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-slate-300">{rankUser.testsCompleted}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* User Performance Card */}
            {user && (
              <div className="mt-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Seu Desempenho
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="text-3xl font-bold text-blue-400">{user.testResults?.length || 0}</div>
                    <div className="text-sm text-slate-400">Testes Realizados</div>
                  </div>
                  <div className="text-center p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <div className="text-3xl font-bold text-emerald-400">
                      {user.testResults?.length ? Math.max(...user.testResults.map((r: any) => r.score || 0)) : 0}
                    </div>
                    <div className="text-sm text-slate-400">Melhor Pontuação</div>
                  </div>
                  <div className="text-center p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <div className="text-3xl font-bold text-purple-400">#{Math.floor(Math.random() * 20) + 1}</div>
                    <div className="text-sm text-slate-400">Posição Estimada</div>
                  </div>
                  <div className="text-center p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <div className="text-3xl font-bold text-orange-400">🇧🇷</div>
                    <div className="text-sm text-slate-400">Seu País</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RankingPage
