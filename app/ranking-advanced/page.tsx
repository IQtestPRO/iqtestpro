"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Crown,
  Medal,
  Star,
  Target,
  Brain,
  TrendingUp,
  Users,
  Calendar,
  Gift,
  Shield,
  CheckCircle,
  Clock,
  BarChart3,
  Download,
  Eye,
} from "lucide-react"

interface RankingUser {
  id: string
  name: string
  avatar: string
  finalScore: number
  rank: number
  category: string
  ageGroup: string
  region: string
  badges: string[]
  achievements: number
  totalPoints: number
  monthlyPoints: number
  isVerified: boolean
  verificationLevel: string
  testsCompleted: number
  avgScore: number
  consistency: number
  timeEfficiency: number
  fraudRisk: "Low" | "Medium" | "High"
  eligibleForRewards: boolean
}

const mockRankingData: RankingUser[] = [
  {
    id: "1",
    name: "Ana Silva",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ana",
    finalScore: 1847.5,
    rank: 1,
    category: "Adulto",
    ageGroup: "25-34",
    region: "São Paulo",
    badges: ["Gênio", "Consistente", "Relâmpago"],
    achievements: 15,
    totalPoints: 12500,
    monthlyPoints: 3200,
    isVerified: true,
    verificationLevel: "Premium",
    testsCompleted: 47,
    avgScore: 156.8,
    consistency: 94.2,
    timeEfficiency: 87.5,
    fraudRisk: "Low",
    eligibleForRewards: true,
  },
  {
    id: "2",
    name: "Carlos Mendes",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos",
    finalScore: 1823.1,
    rank: 2,
    category: "Adulto Jovem",
    ageGroup: "18-24",
    region: "Rio de Janeiro",
    badges: ["Participativo", "Consistente"],
    achievements: 12,
    totalPoints: 9800,
    monthlyPoints: 2850,
    isVerified: true,
    verificationLevel: "Document",
    testsCompleted: 38,
    avgScore: 152.3,
    consistency: 91.7,
    timeEfficiency: 82.1,
    fraudRisk: "Low",
    eligibleForRewards: true,
  },
  {
    id: "3",
    name: "Marina Costa",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marina",
    finalScore: 1798.7,
    rank: 3,
    category: "Jovem",
    ageGroup: "13-17",
    region: "Minas Gerais",
    badges: ["Gênio", "Relâmpago"],
    achievements: 18,
    totalPoints: 15200,
    monthlyPoints: 4100,
    isVerified: true,
    verificationLevel: "Phone",
    testsCompleted: 52,
    avgScore: 159.2,
    consistency: 88.9,
    timeEfficiency: 91.3,
    fraudRisk: "Low",
    eligibleForRewards: true,
  },
]

export default function AdvancedRankingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("monthly")
  const [showDetails, setShowDetails] = useState<string | null>(null)
  const [rankingData, setRankingData] = useState<RankingUser[]>(mockRankingData)

  const categories = ["all", "Jovem", "Adulto Jovem", "Adulto", "Sênior"]
  const timeframes = [
    { value: "monthly", label: "Mensal" },
    { value: "quarterly", label: "Trimestral" },
    { value: "yearly", label: "Anual" },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Trophy className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />
      default:
        return (
          <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-slate-500">#{rank}</span>
        )
    }
  }

  const getBadgeIcon = (badge: string) => {
    const icons = {
      Gênio: "🧠",
      Consistente: "🎯",
      Relâmpago: "⚡",
      Participativo: "🏃‍♂️",
    }
    return icons[badge] || "🏆"
  }

  const getVerificationIcon = (level: string) => {
    const icons = {
      Basic: "📧",
      Email: "📧",
      Phone: "📱",
      Document: "📄",
      Premium: "👑",
    }
    return icons[level] || "📧"
  }

  const filteredData = rankingData.filter((user) => selectedCategory === "all" || user.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 p-4">
      <div className="container mx-auto max-w-7xl pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🏆 Ranking Avançado</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Sistema de ranking inteligente com algoritmo anti-fraude, múltiplos fatores de avaliação e recompensas
            mensais
          </p>
        </div>

        {/* Filtros e Controles */}
        <div className="flex flex-wrap gap-4 mb-8 justify-between items-center">
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg bg-white"
            >
              {timeframes.map((tf) => (
                <option key={tf.value} value={tf.value}>
                  {tf.label}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="all">Todas as Categorias</option>
              {categories.slice(1).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Estatísticas
            </Button>
          </div>
        </div>

        <Tabs defaultValue="ranking" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ranking">Ranking</TabsTrigger>
            <TabsTrigger value="rewards">Recompensas</TabsTrigger>
            <TabsTrigger value="transparency">Transparência</TabsTrigger>
            <TabsTrigger value="achievements">Conquistas</TabsTrigger>
          </TabsList>

          {/* Tab: Ranking */}
          <TabsContent value="ranking" className="space-y-6">
            {/* Top 3 Destacado */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {filteredData.slice(0, 3).map((user, index) => (
                <Card
                  key={user.id}
                  className={`relative overflow-hidden ${
                    index === 0
                      ? "ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50"
                      : index === 1
                        ? "ring-2 ring-gray-400 bg-gradient-to-br from-gray-50 to-slate-50"
                        : "ring-2 ring-amber-400 bg-gradient-to-br from-amber-50 to-yellow-50"
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="absolute top-4 right-4">{getRankIcon(user.rank)}</div>

                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                    />

                    <h3 className="font-bold text-lg mb-2">{user.name}</h3>

                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {user.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {user.region}
                      </Badge>
                      {user.isVerified && (
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          {getVerificationIcon(user.verificationLevel)} Verificado
                        </Badge>
                      )}
                    </div>

                    <div className="text-3xl font-bold text-blue-600 mb-2">{user.finalScore.toFixed(1)}</div>

                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {user.badges.map((badge, idx) => (
                        <span key={idx} className="text-lg" title={badge}>
                          {getBadgeIcon(badge)}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                      <div>
                        <div className="font-medium">{user.testsCompleted}</div>
                        <div>Testes</div>
                      </div>
                      <div>
                        <div className="font-medium">{user.monthlyPoints}</div>
                        <div>Pontos</div>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="mt-4 w-full" onClick={() => setShowDetails(user.id)}>
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalhes
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Lista Completa */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                      <tr>
                        <th className="text-left p-4 font-semibold">Posição</th>
                        <th className="text-left p-4 font-semibold">Usuário</th>
                        <th className="text-left p-4 font-semibold">Score Final</th>
                        <th className="text-left p-4 font-semibold">Categoria</th>
                        <th className="text-left p-4 font-semibold">Badges</th>
                        <th className="text-left p-4 font-semibold">Pontos</th>
                        <th className="text-left p-4 font-semibold">Status</th>
                        <th className="text-left p-4 font-semibold">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((user, index) => (
                        <tr
                          key={user.id}
                          className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {getRankIcon(user.rank)}
                              <span className="font-bold">#{user.rank}</span>
                            </div>
                          </td>

                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={user.avatar || "/placeholder.svg"}
                                alt={user.name}
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-slate-500">{user.region}</div>
                              </div>
                            </div>
                          </td>

                          <td className="p-4">
                            <div className="font-bold text-lg text-blue-600">{user.finalScore.toFixed(1)}</div>
                            <div className="text-xs text-slate-500">Avg: {user.avgScore.toFixed(1)}</div>
                          </td>

                          <td className="p-4">
                            <Badge variant="outline" className="text-xs">
                              {user.category}
                            </Badge>
                            <div className="text-xs text-slate-500 mt-1">{user.ageGroup}</div>
                          </td>

                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {user.badges.slice(0, 3).map((badge, idx) => (
                                <span key={idx} className="text-sm" title={badge}>
                                  {getBadgeIcon(badge)}
                                </span>
                              ))}
                              {user.badges.length > 3 && (
                                <span className="text-xs text-slate-500">+{user.badges.length - 3}</span>
                              )}
                            </div>
                          </td>

                          <td className="p-4">
                            <div className="font-medium">{user.monthlyPoints.toLocaleString()}</div>
                            <div className="text-xs text-slate-500">Total: {user.totalPoints.toLocaleString()}</div>
                          </td>

                          <td className="p-4">
                            <div className="flex flex-col gap-1">
                              {user.isVerified && (
                                <Badge className="bg-green-100 text-green-700 text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verificado
                                </Badge>
                              )}
                              {user.eligibleForRewards && (
                                <Badge className="bg-blue-100 text-blue-700 text-xs">
                                  <Gift className="w-3 h-3 mr-1" />
                                  Elegível
                                </Badge>
                              )}
                              <Badge
                                className={`text-xs ${
                                  user.fraudRisk === "Low"
                                    ? "bg-green-100 text-green-700"
                                    : user.fraudRisk === "Medium"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                }`}
                              >
                                <Shield className="w-3 h-3 mr-1" />
                                {user.fraudRisk}
                              </Badge>
                            </div>
                          </td>

                          <td className="p-4">
                            <Button variant="outline" size="sm" onClick={() => setShowDetails(user.id)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Recompensas */}
          <TabsContent value="rewards" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Prêmios Mensais */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Gift className="w-6 h-6 mr-2 text-orange-500" />
                    Prêmios Mensais - Top 10
                  </h3>

                  <div className="space-y-3">
                    {[
                      { pos: 1, prize: "MacBook Pro M3", value: "R$ 15.000" },
                      { pos: 2, prize: "iPad Pro + Apple Pencil", value: "R$ 8.000" },
                      { pos: 3, prize: "AirPods Pro + Gift Card", value: "R$ 3.500" },
                      { pos: "4-5", prize: "Gift Card Amazon", value: "R$ 1.000-1.500" },
                      { pos: "6-10", prize: "Gift Card Diversos", value: "R$ 200-750" },
                    ].map((reward, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {reward.pos}
                          </div>
                          <div>
                            <div className="font-medium">{reward.prize}</div>
                            <div className="text-sm text-slate-600">{reward.value}</div>
                          </div>
                        </div>
                        <Trophy className="w-5 h-5 text-orange-500" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Próxima Distribuição:</h4>
                    <div className="text-sm text-slate-600">
                      📅 1º de cada mês
                      <br />🎯 Baseado no ranking do mês anterior
                      <br />📧 Notificação por email e SMS
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recompensas por Categoria */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Star className="w-6 h-6 mr-2 text-purple-500" />
                    Recompensas por Categoria
                  </h3>

                  <div className="space-y-4">
                    {[
                      { category: "Jovem (13-17)", bonus: "+20%", special: "Bolsa de Estudos" },
                      { category: "Adulto Jovem (18-24)", bonus: "+10%", special: "Curso Online Premium" },
                      { category: "Adulto (25-54)", bonus: "Base", special: "Certificação Profissional" },
                      { category: "Sênior (55+)", bonus: "+30%", special: "Experiência Cultural" },
                    ].map((cat, idx) => (
                      <div key={idx} className="p-3 border border-purple-200 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{cat.category}</span>
                          <Badge className="bg-purple-100 text-purple-700">{cat.bonus}</Badge>
                        </div>
                        <div className="text-sm text-slate-600">🎁 Prêmio especial: {cat.special}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Sistema de Pontos:</h4>
                    <div className="text-sm text-slate-600">
                      • 100 pontos = R$ 1 em recompensas
                      <br />• Pontos não expiram
                      <br />• Conversão automática mensal
                      <br />• Bônus por categoria aplicado
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Critérios de Elegibilidade */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
                  Critérios de Elegibilidade
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      title: "Testes Mínimos",
                      requirement: "5 testes/mês",
                      icon: <Target className="w-5 h-5" />,
                      color: "blue",
                    },
                    {
                      title: "Perfil Verificado",
                      requirement: "Email + Telefone",
                      icon: <Shield className="w-5 h-5" />,
                      color: "green",
                    },
                    {
                      title: "Fair Play",
                      requirement: "Sem fraudes",
                      icon: <CheckCircle className="w-5 h-5" />,
                      color: "purple",
                    },
                    {
                      title: "Participação",
                      requirement: "80% desafios",
                      icon: <TrendingUp className="w-5 h-5" />,
                      color: "orange",
                    },
                  ].map((criteria, idx) => (
                    <div
                      key={idx}
                      className={`p-4 border-2 border-${criteria.color}-200 bg-${criteria.color}-50 rounded-lg text-center`}
                    >
                      <div className={`text-${criteria.color}-500 mb-2 flex justify-center`}>{criteria.icon}</div>
                      <div className="font-semibold text-sm">{criteria.title}</div>
                      <div className="text-xs text-slate-600 mt-1">{criteria.requirement}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Transparência */}
          <TabsContent value="transparency" className="space-y-6">
            {/* Algoritmo de Ranking */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Brain className="w-6 h-6 mr-2 text-blue-500" />
                  Como Funciona o Algoritmo de Ranking
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { factor: "Score Base", weight: "40%", description: "Pontuação média ponderada por dificuldade" },
                    {
                      factor: "Eficiência de Tempo",
                      weight: "20%",
                      description: "Velocidade de resolução vs. tempo ótimo",
                    },
                    { factor: "Consistência", weight: "15%", description: "Baixo desvio padrão nos resultados" },
                    { factor: "Participação", weight: "10%", description: "Frequência e regularidade nos testes" },
                    { factor: "Verificação", weight: "10%", description: "Nível de verificação da identidade" },
                    { factor: "Anti-Fraude", weight: "5%", description: "Penalização por comportamento suspeito" },
                  ].map((factor, idx) => (
                    <div key={idx} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm">{factor.factor}</span>
                        <Badge variant="outline">{factor.weight}</Badge>
                      </div>
                      <p className="text-xs text-slate-600">{factor.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Fórmula Simplificada:</h4>
                  <code className="text-sm bg-white p-2 rounded border block">
                    Score Final = (Base×0.4) + (Tempo×0.2) + (Consistência×0.15) + (Participação×0.1) +
                    (Verificação×0.1) - (Fraude×0.05)
                  </code>
                </div>
              </CardContent>
            </Card>

            {/* Sistema Anti-Fraude */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-red-500" />
                  Sistema de Detecção Anti-Fraude
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Indicadores Monitorados:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-orange-500" />
                        Tempo suspeito (&lt;10s por questão)
                      </li>
                      <li className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        Múltiplos IPs por sessão
                      </li>
                      <li className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        Scores perfeitos excessivos
                      </li>
                      <li className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-purple-500" />
                        Padrões de resposta anômalos
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Ações Automáticas:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                        Revisão manual (risco médio)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        Suspensão temporária (risco alto)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Verificação adicional requerida
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Aprovação automática (risco baixo)
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calendário de Recompensas */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-green-500" />
                  Calendário de Distribuição de Recompensas
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      period: "Todo 1º do mês",
                      event: "Distribuição de Prêmios Mensais",
                      description: "Top 10 do ranking do mês anterior",
                    },
                    {
                      period: "Todo 15 do mês",
                      event: "Conversão de Pontos",
                      description: "Pontos convertidos em recompensas",
                    },
                    {
                      period: "Último dia do mês",
                      event: "Fechamento do Ranking",
                      description: "Cálculo final das posições",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 border border-green-200 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800 mb-2">{item.period}</div>
                      <div className="font-medium text-sm mb-1">{item.event}</div>
                      <div className="text-xs text-slate-600">{item.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Conquistas */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Primeiro Passo",
                  description: "Complete seu primeiro teste",
                  icon: "🎯",
                  rarity: "Common",
                  points: 100,
                  progress: 100,
                },
                {
                  name: "Maratonista Mental",
                  description: "Complete 50 testes",
                  icon: "🏃‍♂️",
                  rarity: "Epic",
                  points: 1000,
                  progress: 76,
                },
                {
                  name: "Perfeição",
                  description: "Alcance um score perfeito",
                  icon: "⭐",
                  rarity: "Legendary",
                  points: 2000,
                  progress: 0,
                },
                {
                  name: "Velocista",
                  description: "Complete um teste em menos de 5 minutos",
                  icon: "⚡",
                  rarity: "Rare",
                  points: 500,
                  progress: 45,
                },
                {
                  name: "Consistente",
                  description: "Mantenha 90%+ de consistência por 30 dias",
                  icon: "🎯",
                  rarity: "Epic",
                  points: 750,
                  progress: 23,
                },
                {
                  name: "Gênio Verificado",
                  description: "Score 160+ com verificação premium",
                  icon: "🧠",
                  rarity: "Legendary",
                  points: 3000,
                  progress: 67,
                },
              ].map((achievement, idx) => (
                <Card
                  key={idx}
                  className={`relative overflow-hidden ${
                    achievement.progress === 100
                      ? "ring-2 ring-green-400 bg-gradient-to-br from-green-50 to-emerald-50"
                      : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{achievement.icon}</div>
                      <h3 className="font-bold">{achievement.name}</h3>
                      <p className="text-sm text-slate-600 mb-2">{achievement.description}</p>
                      <Badge
                        className={`text-xs ${
                          achievement.rarity === "Common"
                            ? "bg-gray-100 text-gray-700"
                            : achievement.rarity === "Rare"
                              ? "bg-blue-100 text-blue-700"
                              : achievement.rarity === "Epic"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {achievement.rarity}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            achievement.progress === 100 ? "bg-green-500" : "bg-blue-500"
                          }`}
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                      <div className="text-center text-sm font-medium text-blue-600">{achievement.points} pontos</div>
                    </div>

                    {achievement.progress === 100 && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Modal de Detalhes do Usuário */}
        {showDetails && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold">Detalhes do Usuário</h3>
                  <Button variant="outline" size="sm" onClick={() => setShowDetails(null)}>
                    ✕
                  </Button>
                </div>

                {/* Conteúdo do modal seria implementado aqui */}
                <div className="text-center py-8">
                  <p className="text-slate-600">Detalhes completos do usuário seriam exibidos aqui</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
