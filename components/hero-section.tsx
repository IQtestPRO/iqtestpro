"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Zap,
  Award,
  Users,
  TrendingUp,
  Shield,
  Star,
  ChevronRight,
  Play,
  Sparkles,
  Target,
  BarChart3,
} from "lucide-react"

export default function HeroSection() {
  const [currentStat, setCurrentStat] = useState(0)

  const stats = [
    { number: "50K+", label: "Testes Realizados", icon: <Users className="w-5 h-5" /> },
    { number: "98%", label: "Precisão Científica", icon: <Target className="w-5 h-5" /> },
    { number: "4.9/5", label: "Avaliação Média", icon: <Star className="w-5 h-5" /> },
    { number: "24h", label: "Suporte Técnico", icon: <Shield className="w-5 h-5" /> },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [stats.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Background Pattern - Updated to remove GIF dependency */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div
              key={i}
              className="border border-white/20 animate-pulse"
              style={{ animationDelay: `${i * 0.01}s` }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Conteúdo Principal */}
            <div className="text-center lg:text-left space-y-8">
              {/* Badge de Credibilidade */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-white">Validação Científica Certificada</span>
                <Badge className="bg-emerald-500/20 text-emerald-300 text-xs">ISO 9001</Badge>
              </div>

              {/* Título Principal */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                    Avaliação
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 bg-clip-text text-transparent">
                    Cognitiva
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent">
                    Científica
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-blue-100 max-w-2xl leading-relaxed">
                  Descubra seu potencial intelectual com testes psicométricos validados cientificamente.
                  <span className="text-cyan-300 font-semibold"> Precisão profissional, resultados confiáveis.</span>
                </p>
              </div>

              {/* Estatísticas Rotativas */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                      {stats[currentStat].icon}
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">{stats[currentStat].number}</div>
                      <div className="text-blue-200 text-sm">{stats[currentStat].label}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {stats.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentStat ? "bg-cyan-400" : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Começar Avaliação
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl font-semibold"
                  disablePaymentModal={true}
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Ver Demonstração
                </Button>
              </div>

              {/* Indicadores de Qualidade */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-blue-100">Certificação Profissional</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm text-blue-100">Resultados Instantâneos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-blue-100">Análise Detalhada</span>
                </div>
              </div>
            </div>

            {/* Visualização Interativa */}
            <div className="relative">
              <div className="relative z-10">
                {/* Card Principal */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <div className="text-center space-y-6">
                    {/* Ícone Central Animado */}
                    <div className="relative mx-auto w-24 h-24">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl animate-pulse"></div>
                      <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-cyan-500 to-blue-700 rounded-2xl">
                        <Brain className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2">
                        <Sparkles className="w-6 h-6 text-yellow-400 animate-bounce" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Teste Gratuito</h3>
                      <p className="text-blue-200 text-sm">Experimente nossa avaliação básica</p>
                    </div>

                    {/* Métricas de Preview */}
                    <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-white/20">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-300">15</div>
                        <div className="text-xs text-blue-200">Questões</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-300">10</div>
                        <div className="text-xs text-blue-200">Minutos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-300">Free</div>
                        <div className="text-xs text-blue-200">Custo</div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white font-semibold py-3 rounded-xl">
                      Iniciar Teste Gratuito
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>

                {/* Cards Flutuantes */}
                <div className="absolute -top-4 -left-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-4 shadow-xl animate-float">
                  <div className="text-white text-center">
                    <div className="text-lg font-bold">98%</div>
                    <div className="text-xs opacity-90">Precisão</div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-4 -right-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-4 shadow-xl animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="text-white text-center">
                    <div className="text-lg font-bold">24/7</div>
                    <div className="text-xs opacity-90">Suporte</div>
                  </div>
                </div>
              </div>

              {/* Elementos Decorativos */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
