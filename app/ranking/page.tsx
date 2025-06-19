"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Crown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UserRanking {
  id: string
  name: string
  email: string
  score: number
}

const RankingPage = () => {
  const [ranking, setRanking] = useState<UserRanking[]>([])
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        // Simulate fetching ranking data from localStorage
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
        const rankingData = registeredUsers
          .map((user: any) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            score: user.testResults?.length ? Math.max(...user.testResults.map((r: any) => r.score || 0)) : 0,
          }))
          .sort((a: any, b: any) => b.score - a.score)
          .slice(0, 10) // Top 10 users

        setRanking(rankingData)
      } catch (error) {
        console.error("Could not fetch ranking:", error)
      }
    }

    fetchRanking()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    router.push("/login")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">🏆 Ranking de QI</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">Veja como você se compara com outros usuários</p>
          </div>

          <div className="mb-8 text-center">
            <Button
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={() => router.push("/premium")}
            >
              <Crown className="w-5 h-5 mr-2" />
              Começar Teste Premium
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600">
              <h2 className="text-xl font-semibold text-white">Top 10 Usuários</h2>
            </div>

            {ranking.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhum resultado encontrado. Seja o primeiro a fazer um teste!
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Posição
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Nome
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Pontuação
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {ranking.map((rankUser, index) => (
                      <tr
                        key={rankUser.id}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                          rankUser.id === user.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span
                              className={`text-sm font-medium ${
                                index === 0
                                  ? "text-yellow-600"
                                  : index === 1
                                    ? "text-gray-500"
                                    : index === 2
                                      ? "text-orange-600"
                                      : "text-gray-900 dark:text-white"
                              }`}
                            >
                              {index + 1}
                              {index === 0 && " 🥇"}
                              {index === 1 && " 🥈"}
                              {index === 2 && " 🥉"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`text-sm font-medium ${
                              rankUser.id === user.id
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-gray-900 dark:text-white"
                            }`}
                          >
                            {rankUser.name}
                            {rankUser.id === user.id && " (Você)"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{rankUser.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            {rankUser.score} pontos
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {user && (
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Seu Desempenho</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {user.testResults?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Testes Realizados</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {user.testResults?.length ? Math.max(...user.testResults.map((r: any) => r.score || 0)) : 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Melhor Pontuação</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    #{ranking.findIndex((r) => r.id === user.id) + 1 || "N/A"}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Sua Posição</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RankingPage
