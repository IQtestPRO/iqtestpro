"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock, Users, Star, Zap, Trophy, Target, Sparkles, Crown, Gem } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProfessionalTestLevels() {
  const router = useRouter()
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  const plans = [
    {
      id: "basic",
      name: "Teste Básico",
      subtitle: "Perfeito para começar",
      price: "GRATUITO",
      originalPrice: null,
      icon: Brain,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      darkBgColor: "from-blue-900/20 to-cyan-900/20",
      features: [
        "30 questões científicas",
        "Resultado básico de QI",
        "Comparação com média",
        "Certificado simples",
        "Suporte por email",
      ],
      popular: false,
      cta: "Começar Grátis",
      description: "Ideal para quem quer conhecer seu QI básico",
    },
    {
      id: "premium",
      name: "Teste Premium",
      subtitle: "Mais completo e preciso",
      price: "R$ 19,90",
      originalPrice: "R$ 39,90",
      icon: Star,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      darkBgColor: "from-purple-900/20 to-pink-900/20",
      features: [
        "60 questões avançadas",
        "Análise detalhada de QI",
        "Relatório completo PDF",
        "Comparação internacional",
        "Certificado premium",
        "Análise de habilidades",
        "Suporte prioritário",
      ],
      popular: true,
      cta: "Escolher Premium",
      description: "Análise completa com relatório detalhado",
    },
    {
      id: "professional",
      name: "Teste Profissional",
      subtitle: "Máxima precisão científica",
      price: "R$ 49,90",
      originalPrice: "R$ 99,90",
      icon: Crown,
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50",
      darkBgColor: "from-yellow-900/20 to-orange-900/20",
      features: [
        "120 questões especializadas",
        "QI com precisão científica",
        "Relatório psicológico completo",
        "Análise de 8 tipos de inteligência",
        "Certificado profissional",
        "Recomendações personalizadas",
        "Consultoria individual",
        "Suporte VIP 24/7",
      ],
      popular: false,
      cta: "Escolher Profissional",
      description: "Para quem busca máxima precisão e análise completa",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            ESCOLHA SEU PLANO
          </Badge>

          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Planos Personalizados
            </span>
          </h2>

          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Escolha o plano ideal para descobrir seu QI com a precisão que você precisa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const IconComponent = plan.icon
            return (
              <Card
                key={plan.id}
                className={`relative overflow-hidden transition-all duration-500 hover:scale-105 cursor-pointer group ${
                  plan.popular ? "ring-4 ring-purple-500/50 shadow-2xl shadow-purple-500/25" : "hover:shadow-2xl"
                } ${hoveredPlan === plan.id ? "transform scale-105" : ""}`}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 font-bold shadow-lg">
                      <Trophy className="w-4 h-4 mr-1" />
                      MAIS POPULAR
                    </Badge>
                  </div>
                )}

                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.bgColor} dark:${plan.darkBgColor} opacity-50`}
                />

                {/* Animated Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <CardHeader className="relative z-10 text-center pb-4">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{plan.subtitle}</p>

                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {plan.originalPrice && (
                        <span className="text-lg text-slate-400 line-through">{plan.originalPrice}</span>
                      )}
                      <span
                        className={`text-3xl font-black bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}
                      >
                        {plan.price}
                      </span>
                    </div>
                    {plan.originalPrice && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      >
                        50% OFF
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-slate-500 dark:text-slate-400">{plan.description}</p>
                </CardHeader>

                <CardContent className="relative z-10">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center flex-shrink-0`}
                        >
                          <Zap className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => router.push(plan.id === "basic" ? "/test" : "/premium")}
                    className={`w-full py-3 font-bold rounded-xl transition-all duration-300 ${
                      plan.popular
                        ? `bg-gradient-to-r ${plan.color} hover:shadow-lg hover:shadow-purple-500/25 text-white`
                        : `bg-gradient-to-r ${plan.color} hover:shadow-lg text-white`
                    } group-hover:scale-105`}
                  >
                    {plan.cta}
                    <Target className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-20">
                  <Gem className={`w-6 h-6 text-gradient-to-r ${plan.color}`} />
                </div>
              </Card>
            )
          })}
        </div>

        {/* Trust Section */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span>Resultado em 15 minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              <span>+2.5M pessoas testadas</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span>Certificado oficial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
