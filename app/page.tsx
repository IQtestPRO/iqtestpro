"use client"
import { Button } from "@/components/ui/button"
import { ChevronRight, Brain, Crown, Lock, Award, Cpu } from "lucide-react"
import ChooseTestLevelSection from "@/components/choose-test-level-section"
import { InteractivePreviewPopup, useInteractivePopups } from "@/components/interactive-preview-popups"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function HeroSection() {
  const router = useRouter()

  return (
    <section className="relative bg-gradient-to-br from-primary-subtle via-background to-secondary/5 overflow-hidden">
      <div className="absolute inset-0 opacity-20 mix-blend-overlay"></div>
      <div className="container relative mx-auto max-w-screen-xl px-4 py-24 md:py-36 text-center z-10">
        <div className="mb-8 inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full border border-amber-400/30 backdrop-blur-sm">
          <Lock className="w-5 h-5 text-amber-600" />
          <span className="text-sm font-semibold text-amber-800 font-inter">
            Teste Premium - Planos a partir de R$ 14,90
          </span>
        </div>
        <h1 className="font-inter text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 animate-fade-in-up leading-tight tracking-tight">
          Descubra Seu{" "}
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Potencial Intelectual
          </span>
        </h1>
        <p
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed animate-fade-in-up font-inter"
          style={{ animationDelay: "0.2s" }}
        >
          Teste de QI cientificamente validado, com análise detalhada e certificado oficial. Descubra suas habilidades
          cognitivas de forma rápida, precisa e profissional.
        </p>
        <div className="animate-fade-in-up relative" style={{ animationDelay: "0.4s" }}>
          {/* Futuristic glow effect background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

          {/* Main CTA Button with tech styling */}
          <div className="relative z-10 mb-8">
            <Button
              size="default"
              className="group relative overflow-hidden text-base px-8 py-6 sm:text-lg sm:px-12 sm:py-8 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-500 ease-out font-inter font-bold border border-cyan-400/30"
              onClick={() => router.push("/premium")}
            >
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

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

              {/* Button content */}
              <div className="relative flex items-center justify-center space-x-3">
                <div className="relative">
                  <Crown className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-white/30 rounded-full blur-sm animate-ping"></div>
                </div>
                <span className="tracking-wide">Iniciar Avaliação Premium</span>
                <div className="relative">
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Floating particles */}
              <div
                className="absolute top-2 left-4 w-1 h-1 bg-white/60 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="absolute top-4 right-8 w-1.5 h-1.5 bg-cyan-300/80 rounded-full animate-bounce"
                style={{ animationDelay: "0.8s" }}
              ></div>
              <div
                className="absolute bottom-3 left-12 w-1 h-1 bg-purple-300/60 rounded-full animate-bounce"
                style={{ animationDelay: "1.2s" }}
              ></div>
            </Button>
          </div>

          {/* Enhanced feature highlights with tech styling */}
          <div className="relative z-10 bg-gradient-to-r from-slate-900/80 via-blue-900/80 to-purple-900/80 backdrop-blur-sm rounded-2xl border border-cyan-400/20 p-6 shadow-2xl">
            <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div className="group">
                <div className="flex items-center justify-center mb-2">
                  <div className="relative">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                    <div className="absolute inset-0 bg-emerald-400/30 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-emerald-300 font-inter tracking-wide">
                  Resultados em 15 minutos
                </p>
              </div>

              <div className="group">
                <div className="flex items-center justify-center mb-2">
                  <div className="relative">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                      <div
                        className="w-3 h-3 bg-white rounded-full animate-pulse"
                        style={{ animationDelay: "0.3s" }}
                      ></div>
                    </div>
                    <div className="absolute inset-0 bg-blue-400/30 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-blue-300 font-inter tracking-wide">
                  Certificado incluído
                </p>
              </div>

              <div className="group">
                <div className="flex items-center justify-center mb-2">
                  <div className="relative">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                      <div
                        className="w-3 h-3 bg-white rounded-full animate-pulse"
                        style={{ animationDelay: "0.6s" }}
                      ></div>
                    </div>
                    <div className="absolute inset-0 bg-purple-400/30 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-purple-300 font-inter tracking-wide">
                  Análise detalhada
                </p>
              </div>
            </div>

            {/* Tech pattern overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="grid grid-cols-12 gap-1 h-full p-2">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-sm ${i % 6 === 0 ? "bg-cyan-400 animate-pulse" : "bg-white/20"}`}
                    style={{ animationDelay: `${i * 0.02}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Floating tech elements */}
          <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-xl animate-float"></div>
          <div
            className="absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>

          {/* Circuit-like connecting lines */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-blue-400/30 to-transparent transform -translate-x-1/2"></div>
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const steps = [
    {
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-lg"></div>
          <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl">
            <Crown className="w-5 h-5 text-white" />
          </div>
        </div>
      ),
      title: "Escolha Seu Plano",
      description: "Selecione o plano que melhor atende suas necessidades de avaliação.",
    },
    {
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-lg"></div>
          <div className="relative bg-gradient-to-r from-cyan-600 to-blue-600 p-2 rounded-xl">
            <Brain className="w-5 h-5 text-white" />
          </div>
        </div>
      ),
      title: "Realize o Teste",
      description: "Responda questões cuidadosamente elaboradas por especialistas.",
    },
    {
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur-lg"></div>
          <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 p-2 rounded-xl">
            <Cpu className="w-5 h-5 text-white" />
          </div>
        </div>
      ),
      title: "Análise Precisa",
      description: "Nosso algoritmo avançado analisa suas respostas e padrões.",
    },
    {
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl blur-lg"></div>
          <div className="relative bg-gradient-to-r from-amber-600 to-orange-600 p-2 rounded-xl">
            <Award className="w-5 h-5 text-white" />
          </div>
        </div>
      ),
      title: "Resultado Completo",
      description: "Receba seu QI, análise detalhada e certificado oficial.",
    },
  ]

  if (!mounted) {
    return (
      <section className="py-20 md:py-28 bg-card">
        <div className="container mx-auto max-w-screen-xl px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-inter text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 text-foreground tracking-tight">
            Como Funciona Nosso Teste de QI Premium
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-inter">
            Um processo simples, científico e transparente para descobrir seu verdadeiro potencial intelectual.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="relative group animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="bg-gradient-to-br from-primary-subtle to-secondary/10 rounded-3xl p-8 shadow-soft group-hover:shadow-medium transition-all duration-300 ease-out transform group-hover:-translate-y-1">
              <div className="text-center">
                <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-6 sm:mb-10 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 group-hover:shadow-3xl transition-all duration-300 ease-out group-hover:scale-105 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    {/* Animated Brain Icon with Pulsing Effect */}
                    <div className="relative">
                      <Brain className="w-24 h-24 text-white animate-pulse" />
                      {/* Neural Network Animation */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 border-2 border-white/30 rounded-full animate-ping"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-20 h-20 border border-white/20 rounded-full animate-pulse"
                          style={{ animationDelay: "0.5s" }}
                        ></div>
                      </div>
                    </div>
                    {/* Floating Particles */}
                    <div
                      className="absolute top-4 left-4 w-2 h-2 bg-white/60 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="absolute top-8 right-6 w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"
                      style={{ animationDelay: "0.8s" }}
                    ></div>
                    <div
                      className="absolute bottom-6 left-8 w-1 h-1 bg-white/50 rounded-full animate-bounce"
                      style={{ animationDelay: "1.2s" }}
                    ></div>
                    <div
                      className="absolute bottom-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-bounce"
                      style={{ animationDelay: "0.6s" }}
                    ></div>
                    {/* Gradient Overlay for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
                  </div>
                </div>
                <h3 className="font-inter font-bold text-xl sm:text-2xl text-foreground mb-3 sm:mb-4 tracking-tight">
                  Tecnologia Avançada de Avaliação
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed font-inter max-w-md mx-auto">
                  Nossa plataforma utiliza algoritmos de última geração para mapear e analisar suas capacidades
                  cognitivas com precisão científica validada por especialistas.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-700/60 backdrop-blur-sm border border-white/20 dark:border-slate-600/20 hover:from-white/90 hover:to-white/80 dark:hover:from-slate-700/90 dark:hover:to-slate-600/80 transition-all duration-300 ease-out shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="flex-shrink-0 relative group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                  <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
                </div>
                <div className="flex-1">
                  <h4 className="font-inter font-bold text-lg text-foreground mb-2 tracking-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                    {step.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed font-inter group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-16 md:mt-20 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <Button
            size="default"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-6 py-4 text-base sm:px-10 sm:py-7 sm:text-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-out font-inter font-semibold"
            onClick={() => router.push("/premium")}
          >
            <Crown className="w-6 h-6 mr-2.5" />
            Ver Planos Premium
          </Button>
        </div>
      </div>
    </section>
  )
}

export default function LandingPage() {
  const { activePopup, closePopup } = useInteractivePopups()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="h-screen bg-gradient-to-br from-gray-100 to-gray-200"></div>
        </div>
      </div>
    )
  }

  return (
    <>
      <HeroSection />
      <HowItWorksSection />
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
