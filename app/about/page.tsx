import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Users, Award, Target, CheckCircle, TrendingUp, Shield, Zap, Globe } from "lucide-react"

export default function AboutPage() {
  const stats = [
    { label: "Testes Realizados", value: "500K+", icon: Target },
    { label: "Usuários Ativos", value: "50K+", icon: Users },
    { label: "Países Atendidos", value: "25+", icon: Globe },
    { label: "Precisão Científica", value: "99.2%", icon: Award },
  ]

  const features = [
    {
      title: "Validação Científica",
      description: "Nossos testes são baseados em pesquisas psicométricas reconhecidas internacionalmente.",
      icon: Shield,
    },
    {
      title: "Análise Profissional",
      description: "Relatórios detalhados com insights sobre suas habilidades cognitivas.",
      icon: TrendingUp,
    },
    {
      title: "Tecnologia Avançada",
      description: "Plataforma moderna com algoritmos adaptativos para máxima precisão.",
      icon: Zap,
    },
    {
      title: "Certificação Oficial",
      description: "Certificados reconhecidos que podem ser usados profissionalmente.",
      icon: Award,
    },
  ]

  const team = [
    {
      name: "Dr. Maria Silva",
      role: "Psicóloga Cognitiva",
      description: "PhD em Psicologia Cognitiva pela USP, especialista em avaliação psicométrica.",
    },
    {
      name: "Prof. João Santos",
      role: "Neurocientista",
      description: "Professor de Neurociências, pesquisador em inteligência artificial e cognição.",
    },
    {
      name: "Ana Costa",
      role: "Desenvolvedora Sênior",
      description: "Especialista em UX/UI e desenvolvimento de plataformas educacionais.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-subtle to-white">
        <div className="container mx-auto max-w-screen-xl px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 bg-white/50">
              Sobre a IQ Test Pro
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Revolucionando a{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Avaliação Cognitiva
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Somos uma plataforma líder em testes de inteligência, combinando rigor científico com tecnologia de ponta
              para oferecer avaliações cognitivas precisas e insights valiosos.
            </p>
            <Button size="lg" variant="premium" disablePaymentModal={false}>
              Começar Teste Agora
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-screen-xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-primary-subtle">
        <div className="container mx-auto max-w-screen-xl px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Nossa Missão</h2>
              <p className="text-lg text-muted-foreground">
                Democratizar o acesso a avaliações cognitivas de qualidade científica
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-soft">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg flex-shrink-0">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">Inteligência para Todos</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Acreditamos que todos merecem acesso a ferramentas de autoconhecimento cognitivo. Nossa plataforma
                    torna os testes de QI acessíveis, precisos e úteis para desenvolvimento pessoal e profissional.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Precisão Científica</h4>
                  <p className="text-sm text-muted-foreground">Metodologias validadas por pesquisas acadêmicas</p>
                </div>
                <div className="text-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Acessibilidade</h4>
                  <p className="text-sm text-muted-foreground">Testes disponíveis 24/7 em qualquer dispositivo</p>
                </div>
                <div className="text-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Insights Valiosos</h4>
                  <p className="text-sm text-muted-foreground">Relatórios detalhados para crescimento pessoal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-screen-xl px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Por Que Escolher a IQ Test Pro?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Combinamos ciência, tecnologia e experiência para oferecer a melhor plataforma de avaliação cognitiva do
              mercado.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-primary-subtle">
        <div className="container mx-auto max-w-screen-xl px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Nossa Equipe</h2>
            <p className="text-lg text-muted-foreground">Especialistas dedicados ao avanço da avaliação cognitiva</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-soft text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-blue-600 text-white">
        <div className="container mx-auto max-w-screen-xl px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Pronto para Descobrir Seu Potencial?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já descobriram suas habilidades cognitivas com nossos testes
            cientificamente validados.
          </p>
          <Button size="lg" variant="secondary" disablePaymentModal={false}>
            Começar Teste Agora
          </Button>
        </div>
      </section>
    </div>
  )
}
