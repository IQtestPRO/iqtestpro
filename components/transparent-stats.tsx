"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Globe, Award, Brain, Star, Target, Zap, Trophy, CheckCircle, Sparkles } from "lucide-react"

export default function TransparentStats() {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({
    users: 0,
    countries: 0,
    accuracy: 0,
    satisfaction: 0,
  })

  useEffect(() => {
    setIsVisible(true)

    // Animated counters
    const targets = {
      users: 2500000,
      countries: 195,
      accuracy: 98,
      satisfaction: 97,
    }

    const duration = 2000
    const steps = 60
    const stepTime = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setCounters({
        users: Math.floor(targets.users * progress),
        countries: Math.floor(targets.countries * progress),
        accuracy: Math.floor(targets.accuracy * progress),
        satisfaction: Math.floor(targets.satisfaction * progress),
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setCounters(targets)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [])

  const stats = [
    {
      icon: Users,
      label: "Pessoas Testadas",
      value: counters.users.toLocaleString(),
      suffix: "+",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/10 to-cyan-500/10",
      description: "Usuários ao redor do mundo",
    },
    {
      icon: Globe,
      label: "Países Atendidos",
      value: counters.countries,
      suffix: "",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-500/10 to-emerald-500/10",
      description: "Presença global",
    },
    {
      icon: Award,
      label: "Precisão Científica",
      value: counters.accuracy,
      suffix: "%",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/10 to-pink-500/10",
      description: "Validação científica",
    },
    {
      icon: Star,
      label: "Satisfação",
      value: counters.satisfaction,
      suffix: "%",
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-500/10 to-orange-500/10",
      description: "Usuários satisfeitos",
    },
  ]

  const features = [
    {
      icon: Brain,
      title: "Cientificamente Validado",
      description: "Baseado em pesquisas psicométricas reconhecidas mundialmente",
      color: "text-blue-500",
    },
    {
      icon: Zap,
      title: "Resultado Instantâneo",
      description: "Receba seu QI e análise completa em segundos após finalizar",
      color: "text-purple-500",
    },
    {
      icon: Trophy,
      title: "Certificado Oficial",
      description: "Documento válido para uso acadêmico e profissional",
      color: "text-yellow-500",
    },
    {
      icon: Target,
      title: "Precisão Máxima",
      description: "Algoritmos avançados garantem a maior precisão possível",
      color: "text-green-500",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            TRANSPARÊNCIA TOTAL
          </Badge>

          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Números que Comprovam
            </span>
            <br />
            <span className="text-slate-800 dark:text-white">Nossa Excelência</span>
          </h2>

          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Dados reais e transparentes sobre nossa plataforma de testes de QI
          </p>
        </div>

        {/* Stats Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card
                key={index}
                className="relative overflow-hidden group hover:scale-105 transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-50`} />
                <CardContent className="relative z-10 p-8 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <div
                    className={`text-4xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.value}
                    {stat.suffix}
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{stat.label}</h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">Por que Somos a Escolha #1?</h3>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Características que nos tornam únicos no mercado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card
                  key={index}
                  className="group hover:scale-105 transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-0 shadow-lg hover:shadow-xl"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className={`w-6 h-6 ${feature.color}`} />
                      </div>

                      <div className="flex-1">
                        <h4 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">{feature.title}</h4>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 backdrop-blur-lg border border-blue-200/20 dark:border-blue-800/20">
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">SSL Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">LGPD Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">ISO 27001</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">Dados Protegidos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
