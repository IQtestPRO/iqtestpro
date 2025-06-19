"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge as LucideBadge } from "@/components/ui/badge"
import {
  Crown,
  Star,
  Diamond,
  Zap,
  Shield,
  Trophy,
  Target,
  Brain,
  CheckCircle,
  X,
  Award,
  Sparkles,
  Rocket,
  Heart,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

interface PlanFeature {
  name: string
  free: boolean | string
  premium: boolean | string
  pro: boolean | string
}

interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
  avatar: string
}

interface PremiumBadge {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  rarity: "common" | "rare" | "epic" | "legendary"
  points: number
}

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState<"premium" | "pro">("premium")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { user } = useAuth()

  const plans = {
    free: {
      name: "Gratuito",
      price: { monthly: 0, yearly: 0 },
      description: "Perfeito para começar",
      icon: <Target className="w-8 h-8" />,
      color: "from-gray-400 to-gray-600",
      popular: false,
    },
    premium: {
      name: "Premium",
      price: { monthly: 19.9, yearly: 199 },
      description: "Para entusiastas do conhecimento",
      icon: <Crown className="w-8 h-8" />,
      color: "from-blue-500 to-purple-600",
      popular: true,
      savings: "2 meses grátis",
    },
    pro: {
      name: "PRO",
      price: { monthly: 39.9, yearly: 399 },
      description: "Para profissionais e especialistas",
      icon: <Diamond className="w-8 h-8" />,
      color: "from-yellow-400 to-orange-500",
      popular: false,
      savings: "2 meses grátis",
    },
  }

  const features: PlanFeature[] = [
    { name: "Testes básicos de QI", free: "3 por mês", premium: true, pro: true },
    { name: "Testes ilimitados", free: false, premium: true, pro: true },
    { name: "Relatórios detalhados", free: "Básico", premium: "Completo", pro: "Avançado + IA" },
    { name: "Histórico completo", free: "30 dias", premium: "Ilimitado", pro: "Ilimitado" },
    { name: "Sem anúncios", free: false, premium: true, pro: true },
    { name: "Análise personalizada", free: false, premium: "Básica", pro: "Avançada com IA" },
    { name: "Certificados oficiais", free: false, premium: "Digitais", pro: "Digitais + Físicos" },
    { name: "Suporte prioritário", free: false, premium: "Email", pro: "Chat + Telefone" },
    { name: "Acesso antecipado", free: false, premium: false, pro: true },
    { name: "Coaching personalizado", free: false, premium: false, pro: true },
    { name: "API para desenvolvedores", free: false, premium: false, pro: true },
  ]

  const badges: PremiumBadge[] = [
    {
      id: "first-test",
      name: "Primeiro Passo",
      description: "Complete seu primeiro teste",
      icon: <Target className="w-6 h-6" />,
      rarity: "common",
      points: 100,
    },
    {
      id: "speed-demon",
      name: "Velocista Mental",
      description: "Complete um teste em menos de 5 minutos",
      icon: <Zap className="w-6 h-6" />,
      rarity: "rare",
      points: 500,
    },
    {
      id: "perfectionist",
      name: "Perfeccionista",
      description: "Alcance 100% de acerto",
      icon: <Star className="w-6 h-6" />,
      rarity: "epic",
      points: 1000,
    },
    {
      id: "genius",
      name: "Gênio Certificado",
      description: "QI acima de 140",
      icon: <Brain className="w-6 h-6" />,
      rarity: "legendary",
      points: 2000,
    },
    {
      id: "consistent",
      name: "Consistência",
      description: "7 dias consecutivos de testes",
      icon: <Trophy className="w-6 h-6" />,
      rarity: "rare",
      points: 750,
    },
    {
      id: "challenger",
      name: "Desafiador",
      description: "Complete 10 desafios semanais",
      icon: <Award className="w-6 h-6" />,
      rarity: "epic",
      points: 1500,
    },
  ]

  const testimonials: Testimonial[] = [
    {
      name: "Dr. Roberto Fernandes",
      role: "Neuropsicólogo - CRP 06/45892",
      content:
        "Uso a plataforma há 8 meses para complementar minhas avaliações clínicas. Os relatórios são bem estruturados e seguem padrões técnicos adequados. O que mais me impressiona é a correlação dos resultados com outros testes padronizados que aplico. Claro que não substitui uma avaliação presencial completa, mas é uma ferramenta valiosa para triagem inicial.",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face&auto=format",
    },
    {
      name: "Mariana Oliveira",
      role: "Coordenadora de RH - Empresa de Tecnologia",
      content:
        "Implementamos os testes na nossa empresa para processos seletivos. Inicialmente era cética, mas os resultados têm sido consistentes. Conseguimos identificar candidatos com melhor raciocínio lógico para vagas técnicas. O suporte técnico respondeu rapidamente quando tivemos dúvidas sobre interpretação dos scores. Recomendo, especialmente para empresas que fazem muitas contratações.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face&auto=format",
    },
    {
      name: "Prof. André Santos",
      role: "Docente de Psicologia - UFMG",
      content:
        "Tenho usado com meus alunos de graduação como exercício prático. A interface é intuitiva e os dados estatísticos são transparentes. Gostaria que tivessem mais informações sobre a amostra normativa, mas no geral é uma ferramenta didática interessante. Meus alunos conseguem entender melhor os conceitos de psicometria na prática.",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-15602500970b93528c311a?w=150&h=150&fit=crop&crop=face&auto=format",
    },
    {
      name: "Juliana Costa",
      role: "Estudante de Medicina - 5º período",
      content:
        "Descobri o site estudando para o ENEM e continuei usando para treinar raciocínio lógico. Não vou mentir, alguns testes são bem desafiadores! O que me ajudou muito foi poder refazer os testes e ver onde errei. Os gráficos de evolução me motivaram a continuar praticando. Consegui melhorar minha pontuação em 15 pontos ao longo de 3 meses.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
    },
    {
      name: "Carlos Mendonça",
      role: "Analista de Sistemas - 12 anos de experiência",
      content:
        "Fiz o teste por curiosidade depois de ver um colega comentando. Achei interessante como algumas questões realmente fazem você pensar 'fora da caixa'. O relatório premium vale a pena - mostra pontos fortes e fracos de forma detalhada. Só acho que poderiam ter mais questões relacionadas à programação e lógica computacional.",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
    },
    {
      name: "Dra. Patricia Almeida",
      role: "Psicóloga Organizacional - CRP 01/8834",
      content:
        "Utilizo principalmente para coaching executivo. Os clientes ficam engajados com o formato digital e os resultados geram boas discussões nas sessões. A análise de perfil cognitivo ajuda muito no desenvolvimento de lideranças. Única sugestão seria incluir mais questões sobre inteligência emocional, que é muito demandada no ambiente corporativo.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face&auto=format",
    },
  ]

  const faqItems = [
    {
      question: "Posso cancelar minha assinatura a qualquer momento?",
      answer:
        "Sim! Você pode cancelar sua assinatura a qualquer momento através do seu painel de controle. Não há taxas de cancelamento.",
    },
    {
      question: "Os certificados são reconhecidos oficialmente?",
      answer:
        "Nossos certificados seguem padrões internacionais de psicometria e são aceitos por muitas instituições educacionais e empresas.",
    },
    {
      question: "Como funciona o período de teste gratuito?",
      answer:
        "Você tem 7 dias para experimentar todos os recursos premium gratuitamente. Se não gostar, cancele antes do fim do período sem cobrança.",
    },
    {
      question: "Posso fazer upgrade ou downgrade do meu plano?",
      answer:
        "Sim! Você pode alterar seu plano a qualquer momento. As mudanças são aplicadas no próximo ciclo de cobrança.",
    },
    {
      question: "Os dados dos meus testes ficam salvos para sempre?",
      answer: "Com Premium e PRO, sim! Mantemos seu histórico completo enquanto sua conta estiver ativa.",
    },
  ]

  const handleUpgrade = async (plan: "premium" | "pro") => {
    setIsProcessing(true)

    // Simular processamento
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirecionar para página de pagamento com dados do plano
    const planData = {
      plan,
      billingCycle,
      price: plans[plan].price[billingCycle],
      features: features.filter((f) => f[plan] === true || typeof f[plan] === "string"),
    }

    localStorage.setItem("selectedPremiumPlan", JSON.stringify(planData))
    router.push("/payment")

    setIsProcessing(false)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "from-gray-400 to-gray-600"
      case "rare":
        return "from-blue-400 to-blue-600"
      case "epic":
        return "from-purple-400 to-purple-600"
      case "legendary":
        return "from-yellow-400 to-orange-500"
      default:
        return "from-gray-400 to-gray-600"
    }
  }

  const renderFeatureValue = (value: boolean | string) => {
    if (value === true) {
      return <CheckCircle className="w-5 h-5 text-green-500" />
    } else if (value === false) {
      return <X className="w-5 h-5 text-red-400" />
    } else {
      return <span className="text-sm text-muted-foreground">{value}</span>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>

        {/* Elementos decorativos */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-yellow-400/20 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-400/15 rounded-full blur-md animate-pulse"></div>

        <div className="container relative mx-auto px-4 py-20 text-center z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-semibold">Desbloqueie seu potencial</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Desbloqueie todo seu
                <br />
                <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                  potencial intelectual!
                </span>
              </h1>

              <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed">
                Acesse recursos exclusivos, análises avançadas e certificações oficiais
                <br />
                para maximizar seu desenvolvimento cognitivo
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => {
                  const plansSection =
                    document.querySelector('[data-section="plans"]') || document.querySelector("section")
                  if (plansSection) {
                    plansSection.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                }}
              >
                <Crown className="w-6 h-6 mr-2" />
                Começar Teste
              </Button>

              <div className="flex items-center space-x-2 text-sm opacity-80">
                <Shield className="w-4 h-4" />
                <span>7 dias grátis • Cancele quando quiser</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Comparação de Planos */}
        <section className="mb-20" data-section="plans">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Escolha seu plano ideal</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Todos os planos incluem acesso aos nossos testes de QI cientificamente validados
            </p>

            {/* Toggle de cobrança */}
            <div className="inline-flex items-center space-x-4 p-1 bg-muted rounded-full">
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === "monthly"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Mensal
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === "yearly"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setBillingCycle("yearly")}
              >
                Anual
                <LucideBadge className="ml-2 bg-green-100 text-green-700 text-xs">-17%</LucideBadge>
              </button>
            </div>
          </div>

          {/* Cards de Preços */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Object.entries(plans).map(([key, plan]) => (
              <Card
                key={key}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  plan.popular ? "ring-2 ring-blue-500 scale-105 shadow-xl" : "hover:scale-105"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                    <Star className="w-4 h-4 inline mr-1" />
                    Mais Popular
                  </div>
                )}

                <CardHeader className={`text-center ${plan.popular ? "pt-12" : "pt-6"}`}>
                  <div
                    className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}
                  >
                    {plan.icon}
                  </div>

                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>

                  <div className="mt-6">
                    <div className="text-4xl font-bold">
                      R$ {plan.price[billingCycle].toFixed(2)}
                      {plan.price[billingCycle] > 0 && (
                        <span className="text-lg text-muted-foreground font-normal">
                          /{billingCycle === "monthly" ? "mês" : "ano"}
                        </span>
                      )}
                    </div>

                    {billingCycle === "yearly" && plan.savings && plan.price[billingCycle] > 0 && (
                      <div className="text-sm text-green-600 font-medium mt-1">{plan.savings}</div>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3 mb-8">
                    {features.slice(0, 6).map((feature, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{feature.name}</span>
                        {renderFeatureValue(feature[key as keyof PlanFeature])}
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        : key === "free"
                          ? "variant-outline"
                          : ""
                    }`}
                    onClick={() => key !== "free" && handleUpgrade(key as "premium" | "pro")}
                    disabled={isProcessing || key === "free"}
                  >
                    {key === "free" ? (
                      "Plano Atual"
                    ) : isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processando...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-4 h-4 mr-2" />
                        Começar {billingCycle === "yearly" ? "Teste" : "Agora"}
                      </>
                    )}
                  </Button>

                  {key !== "free" && (
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      {billingCycle === "yearly" ? "7 dias grátis, depois " : ""}
                      R$ {plan.price[billingCycle].toFixed(2)}/{billingCycle === "monthly" ? "mês" : "ano"}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <section className="text-center">
          <Card className="p-12 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg">
                <Rocket className="w-10 h-10" />
              </div>

              <h3 className="text-3xl font-bold mb-4">Pronto para começar?</h3>
              <p className="text-muted-foreground mb-8 text-lg">
                Junte-se a milhares de pessoas que já descobriram seu verdadeiro potencial intelectual
              </p>

              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => handleUpgrade("premium")}
                  disabled={isProcessing}
                >
                  <Crown className="w-6 h-6 mr-2" />
                  Começar Teste
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>7 dias grátis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Cancele quando quiser</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-blue-500" />
                  <span>Garantia 30 dias</span>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
