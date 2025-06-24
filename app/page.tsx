"use client"
import { Button } from "@/components/ui/button"
import { ChevronRight, Brain, Crown, Lock, Award, Cpu, Sparkles, CheckCircle, Star, Zap } from "lucide-react"
import ChooseTestLevelSection from "@/components/choose-test-level-section"
import { InteractivePreviewPopup, useInteractivePopups } from "@/components/interactive-preview-popups"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

function OptimizedHeroSection() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-pulse text-center">
          <div className="w-32 h-32 bg-slate-700 rounded-full mx-auto mb-8"></div>
          <div className="h-8 bg-slate-700 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-slate-700 rounded w-48 mx-auto"></div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content Container */}
      <div className="container-responsive relative z-30 py-20 text-center">
        {/* Logo and Branding */}
        <div className="mb-12 animate-fade-in-up">
          <div className="relative inline-block group">
            {/* Enhanced glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-emerald-500/30 rounded-full blur-3xl animate-pulse"></div>

            {/* Logo container with glass effect */}
            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-center w-28 h-28 mx-auto mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl animate-pulse shadow-lg shadow-blue-500/25"></div>
                  <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-500 to-purple-700 rounded-2xl">
                    <Brain className="w-14 h-14 text-white drop-shadow-lg" />
                  </div>
                  <div className="absolute -top-3 -right-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  {/* Floating particles */}
                  <div className="absolute -top-2 -left-2 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                  <div
                    className="absolute -bottom-2 -right-2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-sm">
                IQ Test Pro
              </h1>

              <div className="flex items-center justify-center space-x-2 mb-4">
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 backdrop-blur-sm">
                  <Zap className="w-3 h-3 mr-1" />
                  Certificação Científica
                </Badge>
              </div>

              <p className="text-lg md:text-xl text-blue-100 font-medium">Avaliação Cognitiva Profissional</p>
            </div>
          </div>
        </div>

        {/* Enhanced Description */}
        <p
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Descubra seu potencial intelectual com precisão científica.
          <span className="text-blue-300 font-semibold"> Resultados confiáveis em 15 minutos.</span>
        </p>

        {/* Enhanced CTA Section */}
        <div className="animate-fade-in-up space-y-6" style={{ animationDelay: "0.4s" }}>
          <Button
            size="lg"
            className="group relative overflow-hidden px-10 py-7 text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white rounded-2xl shadow-2xl shadow-blue-500/25 hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 border border-white/10"
            onClick={() => router.push("/premium")}
          >
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

            {/* Neural network pattern overlay */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 gap-1 h-full p-2">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-sm ${i % 4 === 0 ? "bg-white/40 animate-pulse" : "bg-white/10"}`}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  />
                ))}
              </div>
            </div>

            <div className="relative flex items-center space-x-3">
              <Crown className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-semibold">Iniciar Avaliação Premium</span>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </div>
          </Button>

          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              {
                icon: CheckCircle,
                text: "Resultados em 15 min",
                color: "from-emerald-500 to-teal-500",
                glow: "shadow-emerald-500/20",
              },
              {
                icon: Award,
                text: "Certificado incluído",
                color: "from-blue-500 to-cyan-500",
                glow: "shadow-blue-500/20",
              },
              {
                icon: Star,
                text: "Análise detalhada",
                color: "from-purple-500 to-pink-500",
                glow: "shadow-purple-500/20",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`group flex items-center justify-center space-x-2 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 ${feature.glow} hover:shadow-lg`}
              >
                <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.color}`}>
                  <feature.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* Enhanced Pricing info */}
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-amber-500/10 backdrop-blur-sm rounded-full border border-amber-400/20 hover:bg-amber-500/20 transition-all duration-300">
            <Lock className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-200">Planos a partir de R$ 9,90</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function OptimizedHowItWorksSection() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const steps = [
    {
      icon: Crown,
      title: "Escolha Seu Plano",
      description: "Selecione o plano que melhor atende suas necessidades de avaliação.",
      color: "from-purple-500 to-pink-500",
      glow: "shadow-purple-500/20",
    },
    {
      icon: Brain,
      title: "Realize o Teste",
      description: "Responda questões cuidadosamente elaboradas por especialistas.",
      color: "from-blue-500 to-cyan-500",
      glow: "shadow-blue-500/20",
    },
    {
      icon: Cpu,
      title: "Análise Precisa",
      description: "Nosso algoritmo avançado analisa suas respostas e padrões.",
      color: "from-emerald-500 to-teal-500",
      glow: "shadow-emerald-500/20",
    },
    {
      icon: Award,
      title: "Resultado Completo",
      description: "Receba seu QI, análise detalhada e certificado oficial.",
      color: "from-amber-500 to-orange-500",
      glow: "shadow-amber-500/20",
    },
  ]

  if (!mounted) {
    return (
      <section className="py-20 bg-slate-900">
        <div className="container-responsive">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-slate-700 rounded w-3/4 mx-auto"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-48 bg-slate-700 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 md:py-32 relative">
      <div className="container-responsive">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Como Funciona Nosso Teste de QI Premium
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Um processo simples, científico e transparente para descobrir seu verdadeiro potencial intelectual.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card
              key={index}
              className={`group relative overflow-hidden border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-fade-in-up ${step.glow} hover:shadow-xl`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg ${step.glow}`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-200 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <Button
            size="lg"
            className="px-8 py-4 text-lg rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            onClick={() => router.push("/premium")}
          >
            <Crown className="w-5 h-5 mr-2" />
            Ver Planos Premium
          </Button>
        </div>
      </div>
    </section>
  )
}

export default function OptimizedLandingPage() {
  const { activePopup, closePopup } = useInteractivePopups()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <>
      <OptimizedHeroSection />
      <OptimizedHowItWorksSection />
      <ChooseTestLevelSection />
      {activePopup && (
        <InteractivePreviewPopup
          isOpen={!!activePopup}
          onClose={closePopup}
          type={activePopup}
          onStartTest={() => {
            closePopup()
            router.push("/premium")
          }}
        />
      )}
    </>
  )
}
