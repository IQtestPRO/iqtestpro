"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Gift, Crown, Zap, Book, Play, MapPin, Clock, CheckCircle, Package, Truck, Award } from "lucide-react"

interface RewardsDashboardProps {
  userPoints: number
  userRank: number
  userCategory: string
  eligibleRewards: any[]
  earnedRewards: any[]
}

export function RewardsDashboard({
  userPoints,
  userRank,
  userCategory,
  eligibleRewards,
  earnedRewards,
}: RewardsDashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = [
    { id: "all", name: "Todas", icon: <Gift className="w-4 h-4" /> },
    { id: "premium", name: "Premium", icon: <Crown className="w-4 h-4" /> },
    { id: "education", name: "Educação", icon: <Book className="w-4 h-4" /> },
    { id: "entertainment", name: "Entretenimento", icon: <Play className="w-4 h-4" /> },
    { id: "experience", name: "Experiências", icon: <MapPin className="w-4 h-4" /> },
  ]

  const getRewardIcon = (type: string) => {
    switch (type) {
      case "physical":
        return <Package className="w-5 h-5" />
      case "digital":
        return <Zap className="w-5 h-5" />
      case "experience":
        return <MapPin className="w-5 h-5" />
      default:
        return <Gift className="w-5 h-5" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "earned":
        return <Award className="w-4 h-4 text-yellow-500" />
      case "claimed":
        return <CheckCircle className="w-4 h-4 text-blue-500" />
      case "shipped":
        return <Truck className="w-4 h-4 text-orange-500" />
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const filteredRewards =
    selectedCategory === "all" ? eligibleRewards : eligibleRewards.filter((r) => r.category === selectedCategory)

  return (
    <div className="space-y-6">
      {/* Header com Pontos */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-2">Suas Recompensas</h2>
              <p className="text-blue-700">
                Posição #{userRank} • Categoria: {userCategory}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{userPoints.toLocaleString()}</div>
              <div className="text-sm text-blue-700">Pontos Disponíveis</div>
            </div>
          </div>

          {/* Progresso para próximo nível */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-blue-700 mb-2">
              <span>Progresso para próximo prêmio</span>
              <span>75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Filtros de Categoria */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2"
          >
            {category.icon}
            {category.name}
          </Button>
        ))}
      </div>

      {/* Grid de Recompensas Disponíveis */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Recompensas Disponíveis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards.map((reward, index) => (
            <Card key={reward.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-4xl">{getRewardIcon(reward.type)}</div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-sm">{reward.name}</h4>
                  <Badge
                    className={`text-xs ${
                      reward.type === "physical"
                        ? "bg-orange-100 text-orange-700"
                        : reward.type === "digital"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {reward.type === "physical" ? "Físico" : reward.type === "digital" ? "Digital" : "Experiência"}
                  </Badge>
                </div>

                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{reward.description}</p>

                <div className="space-y-2">
                  {reward.pointsCost > 0 ? (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Custo:</span>
                      <span className="text-sm font-bold text-blue-600">{reward.pointsCost.toLocaleString()} pts</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Ranking:</span>
                      <span className="text-sm font-bold text-yellow-600">Top {reward.eligibilityRank}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Valor:</span>
                    <span className="text-sm font-bold text-green-600">R$ {reward.value.toLocaleString()}</span>
                  </div>
                </div>

                <Button className="w-full mt-4" size="sm" disabled={reward.pointsCost > userPoints}>
                  {reward.pointsCost > 0 ? "Resgatar" : "Elegível"}
                </Button>

                {reward.isLimited && (
                  <div className="text-xs text-orange-600 text-center mt-2">
                    ⚡ Limitado: {reward.quantity} disponíveis
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recompensas Conquistadas */}
      {earnedRewards.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Suas Conquistas</h3>
          <div className="space-y-3">
            {earnedRewards.map((earned, index) => (
              <Card key={earned.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg flex items-center justify-center">
                        {getRewardIcon(earned.reward.type)}
                      </div>
                      <div>
                        <h4 className="font-semibold">{earned.reward.name}</h4>
                        <p className="text-sm text-gray-600">
                          Conquistado em {new Date(earned.earnedAt).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge
                        className={`text-xs ${
                          earned.status === "delivered"
                            ? "bg-green-100 text-green-700"
                            : earned.status === "shipped"
                              ? "bg-orange-100 text-orange-700"
                              : earned.status === "claimed"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {getStatusIcon(earned.status)}
                        <span className="ml-1">
                          {earned.status === "earned"
                            ? "Conquistado"
                            : earned.status === "claimed"
                              ? "Resgatado"
                              : earned.status === "shipped"
                                ? "Enviado"
                                : "Entregue"}
                        </span>
                      </Badge>

                      {earned.status === "earned" && (
                        <Button size="sm" variant="outline">
                          Resgatar
                        </Button>
                      )}

                      {earned.trackingCode && (
                        <Button size="sm" variant="outline">
                          Rastrear
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
