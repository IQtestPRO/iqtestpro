"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock, FileText, Award, Users, BarChart3, Shield, CheckCircle, Star, Target, Crown } from "lucide-react"
import { useRouter } from "next/navigation"

interface TestLevel {
  id: string
  title: string
  subtitle: string
  description: string
  duration: string
  questions: number
  price: number
  originalPrice?: number
  features: string[]
  difficulty: "Básico" | "Intermediário" | "Avançado" | "Expert"
  icon: React.ReactNode
  popular?: boolean
  recommended?: boolean
}

export default function ProfessionalTestLevels() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null)
  const router = useRouter()

  const testLevels: TestLevel[] = [
    {
      id: "spatial",
      title: "Avaliação Básica",
      subtitle: "Introdução à Avaliação Cognitiva",
      description: "Uma avaliação inicial que oferece uma visão geral das suas habilidades cognitivas principais.",
      duration: "15 min",
      questions: 20,
      price: 0,
      features: [
        "20 questões de raciocínio",
        "Resultado básico de QI",
        "Interpretação simples",
        "Válido para uso pessoal",
      ],
      difficulty: "Básico",
      icon: <Target className="w-6 h-6" />,
    },
    {
      id: "logical",
      title: "Avaliação Padrão",
      subtitle: "Análise Cognitiva Completa",
      description: "Avaliação abrangente que mede múltiplas dimensões da inteligência com análise detalhada.",
      duration: "25 min",
      questions: 40,
      price: 29.9,
      originalPrice: 49.9,
      features: [
        "40 questões validadas",
        "Relatório detalhado em PDF",
        "Análise de 5 dimensões cognitivas",
        "Comparação com normas populacionais",
        "Certificado digital",
      ],
      difficulty: "Intermediário",
      icon: <Brain className="w-6 h-6" />,
      popular: true,
    },
    {
      id: "abstract",
      title: "Avaliação Profissional",
      subtitle: "Análise Psicométrica Avançada",
      description: "Avaliação completa com análise psicométrica profissional, ideal para uso acadêmico e corporativo.",
      duration: "45 min",
      questions: 60,
      price: 79.9,
      originalPrice: 129.9,
      features: [
        "60 questões especializadas",
        "Relatório psicométrico completo",
        "Análise de 8 dimensões cognitivas",
        "Perfil de habilidades detalhado",
        "Certificado profissional",
        "Consultoria de 15 minutos",
      ],
      difficulty: "Avançado",
      icon: <Award className="w-6 h-6" />,
      recommended: true,
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Básico":
        return "bg-green-100 text-green-800 border-green-200"
      case "Intermediário":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Avançado":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleStartTest = (testId: string) => {
    // Redirect to premium quiz structure
    router.push(`/quiz/premium/${testId}`)
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header Profissional */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Escolha Sua Avaliação Cognitiva</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Oferecemos diferentes níveis de avaliação para atender suas necessidades específicas, desde uma análise
            básica até uma avaliação psicométrica completa.
          </p>
        </div>

        {/* Cards de Teste */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testLevels.map((test) => (
            <Card
              key={test.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl border-2 ${
                test.popular
                  ? "border-blue-200 shadow-lg scale-105"
                  : test.recommended
                    ? "border-purple-200 shadow-lg"
                    : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* Badge de Destaque */}
              {test.popular && (
                <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center py-2 text-sm font-semibold">
                  <Star className="w-4 h-4 inline mr-1" />
                  Mais Escolhido
                </div>
              )}
              {test.recommended && (
                <div className="absolute top-0 left-0 right-0 bg-purple-600 text-white text-center py-2 text-sm font-semibold">
                  <Crown className="w-4 h-4 inline mr-1" />
                  Recomendado
                </div>
              )}

              <CardHeader className={`text-center ${test.popular || test.recommended ? "pt-12" : "pt-6"}`}>
                {/* Ícone */}
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center">
                  {test.icon}
                </div>

                <CardTitle className="text-xl font-bold text-slate-900">{test.title}</CardTitle>
                <p className="text-slate-600 text-sm">{test.subtitle}</p>

                {/* Badge de Dificuldade */}
                <Badge className={`mt-2 border ${getDifficultyColor(test.difficulty)}`}>{test.difficulty}</Badge>

                {/* Preço */}
                <div className="mt-4">
                  {test.price === 0 ? (
                    <div className="text-3xl font-bold text-slate-900">Gratuito</div>
                  ) : (
                    <div>
                      <div className="text-3xl font-bold text-slate-900">
                        R$ {test.price.toFixed(2).replace(".", ",")}
                      </div>
                      {test.originalPrice && (
                        <div className="text-sm text-slate-500 line-through">
                          R$ {test.originalPrice.toFixed(2).replace(".", ",")}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Descrição */}
                <p className="text-sm text-slate-600 leading-relaxed">{test.description}</p>

                {/* Informações Técnicas */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-slate-100">
                  <div className="text-center">
                    <Clock className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-slate-900">{test.duration}</div>
                    <div className="text-xs text-slate-500">Duração</div>
                  </div>
                  <div className="text-center">
                    <FileText className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-slate-900">{test.questions}</div>
                    <div className="text-xs text-slate-500">Questões</div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {test.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Botão de Ação */}
                <Button
                  className={`w-full ${
                    test.popular
                      ? "bg-blue-600 hover:bg-blue-700"
                      : test.recommended
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "bg-slate-600 hover:bg-slate-700"
                  } text-white font-semibold py-3 rounded-lg transition-colors duration-200`}
                  onClick={() => handleStartTest(test.id)}
                >
                  {test.price === 0 ? "Começar Teste Gratuito" : "Adquirir Avaliação"}
                </Button>

                {test.price > 0 && (
                  <p className="text-xs text-center text-slate-500 mt-2">
                    Pagamento único • Acesso imediato • Garantia de 7 dias
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Seção de Credibilidade */}
        <div className="mt-16 bg-slate-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Por que Confiar em Nossa Avaliação?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Metodologia Científica</h4>
              <p className="text-sm text-slate-600">
                Baseado em pesquisas psicométricas reconhecidas e validadas pela comunidade científica.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Normas Populacionais</h4>
              <p className="text-sm text-slate-600">
                Resultados comparados com dados normativos da população brasileira para maior precisão.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Uso Profissional</h4>
              <p className="text-sm text-slate-600">
                Aceito por instituições educacionais e empresas para processos seletivos e desenvolvimento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
