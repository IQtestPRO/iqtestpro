"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { BarChart3, FileText, Users, Brain, Download, Award, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const router = useRouter()
  const [purchasedFeature, setPurchasedFeature] = useState<any>(null)

  useEffect(() => {
    // Verificar se há compra confirmada
    const purchasedData = localStorage.getItem("purchasedTest")
    if (purchasedData) {
      const data = JSON.parse(purchasedData)
      if (data.type === "feature") {
        setPurchasedFeature(data)
      } else {
        router.push("/")
      }
    } else {
      router.push("/")
    }
  }, [router])

  if (!purchasedFeature) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Carregando seu dashboard...</p>
        </div>
      </div>
    )
  }

  const getFeatureIcon = (featureId: string) => {
    switch (featureId) {
      case "dashboard":
        return <BarChart3 className="w-8 h-8 text-blue-600" />
      case "reports":
        return <FileText className="w-8 h-8 text-green-600" />
      case "comparison":
        return <Users className="w-8 h-8 text-purple-600" />
      case "analysis":
        return <Brain className="w-8 h-8 text-orange-600" />
      default:
        return <BarChart3 className="w-8 h-8 text-blue-600" />
    }
  }

  const getFeatureContent = (featureId: string) => {
    switch (featureId) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">QI Atual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">127</div>
                  <div className="text-sm text-green-600">+12 pontos este mês</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Percentil Global</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">96%</div>
                  <div className="text-sm text-purple-600">Top 4% mundial</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Testes Realizados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">12</div>
                  <div className="text-sm text-gray-600">Última semana</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Evolução do QI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Gráfico de evolução interativo</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "reports":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="w-5 h-5 mr-2" />
                  Seus Relatórios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Relatório Completo de QI</h4>
                      <p className="text-sm text-gray-600">Gerado em {new Date().toLocaleDateString()}</p>
                    </div>
                    <Button>
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "comparison":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Comparação Global</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-4xl font-bold text-purple-600 mb-2">96%</div>
                    <div className="text-sm text-purple-600">Percentil Global</div>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-4xl font-bold text-blue-600 mb-2">#15</div>
                    <div className="text-sm text-blue-600">Ranking Brasil</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "analysis":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Habilidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { skill: "Raciocínio Lógico", score: 95, color: "bg-green-500" },
                    { skill: "Raciocínio Verbal", score: 92, color: "bg-blue-500" },
                    { skill: "Raciocínio Espacial", score: 88, color: "bg-orange-500" },
                    { skill: "Memória de Trabalho", score: 85, color: "bg-teal-500" },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{item.skill}</span>
                        <span className="font-bold">{item.score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`${item.color} h-3 rounded-full transition-all duration-1000`}
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return <div>Conteúdo em desenvolvimento...</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="flex items-center text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Início
          </Button>
          <h1 className="text-2xl font-bold text-center flex-1">{purchasedFeature.title}</h1>
          <div className="w-20"></div>
        </div>

        {/* Conteúdo Principal */}
        <div className="space-y-8">
          {/* Header do Recurso */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                {getFeatureIcon(purchasedFeature.id)}
                <div>
                  <CardTitle className="text-2xl">{purchasedFeature.title}</CardTitle>
                  <p className="text-gray-600">{purchasedFeature.description}</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Conteúdo Específico do Recurso */}
          {getFeatureContent(purchasedFeature.id)}

          {/* Recursos Adicionais */}
          <Card>
            <CardHeader>
              <CardTitle>Recursos Inclusos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {purchasedFeature.features?.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
