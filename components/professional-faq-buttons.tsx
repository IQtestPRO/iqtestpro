"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronDown,
  ChevronUp,
  Search,
  ExternalLink,
  Brain,
  BarChart3,
  Award,
  Users,
  Target,
  TrendingUp,
} from "lucide-react"

const faqCategories = [
  {
    id: "interpretation",
    title: "Interpretação de Resultados",
    subtitle: "Como entender sua pontuação de QI",
    icon: <Brain className="w-6 h-6" />,
    color: "#3B82F6",
    bgColor: "bg-blue-50",
    hoverColor: "hover:bg-blue-50",
    questions: [
      {
        id: 1,
        question: "O que significa minha pontuação de QI?",
        answer:
          "Sua pontuação de QI representa sua capacidade cognitiva em relação à população geral. Uma pontuação de 100 é considerada média, com 68% da população pontuando entre 85-115.",
      },
      {
        id: 2,
        question: "Como meu QI se compara com outros?",
        answer:
          "Fornecemos comparações detalhadas com diferentes grupos demográficos, incluindo idade, educação e região geográfica para contextualizar seus resultados.",
      },
    ],
  },
  {
    id: "accuracy",
    title: "Precisão e Confiabilidade",
    subtitle: "Validação científica dos resultados",
    icon: <Target className="w-6 h-6" />,
    color: "#10B981",
    bgColor: "bg-green-50",
    hoverColor: "hover:bg-green-50",
    questions: [
      {
        id: 3,
        question: "Quão preciso é este teste?",
        answer:
          "Nosso teste possui 95% de precisão, validado por psicólogos e baseado em metodologias científicas reconhecidas internacionalmente.",
      },
      {
        id: 4,
        question: "O teste é reconhecido profissionalmente?",
        answer:
          "Sim, nosso teste segue padrões internacionais e é aceito por instituições educacionais e profissionais em todo o mundo.",
      },
    ],
  },
  {
    id: "categories",
    title: "Categorias Cognitivas",
    subtitle: "Análise detalhada por habilidade",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "#8B5CF6",
    bgColor: "bg-purple-50",
    hoverColor: "hover:bg-purple-50",
    questions: [
      {
        id: 5,
        question: "Quais habilidades são avaliadas?",
        answer:
          "Avaliamos raciocínio lógico, memória de trabalho, velocidade de processamento, compreensão verbal e inteligência espacial.",
      },
      {
        id: 6,
        question: "Como interpretar cada categoria?",
        answer:
          "Cada categoria recebe uma pontuação individual com explicações detalhadas sobre seus pontos fortes e áreas de melhoria.",
      },
    ],
  },
  {
    id: "comparison",
    title: "Comparações e Rankings",
    subtitle: "Posicionamento global e regional",
    icon: <Users className="w-6 h-6" />,
    color: "#F59E0B",
    bgColor: "bg-amber-50",
    hoverColor: "hover:bg-amber-50",
    questions: [
      {
        id: 7,
        question: "Como funciona o ranking global?",
        answer:
          "Comparamos seus resultados com milhões de usuários worldwide, fornecendo percentis precisos e posicionamento detalhado.",
      },
      {
        id: 8,
        question: "Posso ver comparações por país?",
        answer:
          "Sim, oferecemos comparações específicas por país, região e grupo demográfico para análise mais precisa.",
      },
    ],
  },
  {
    id: "improvement",
    title: "Desenvolvimento Cognitivo",
    subtitle: "Como melhorar suas habilidades",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "#EF4444",
    bgColor: "bg-red-50",
    hoverColor: "hover:bg-red-50",
    questions: [
      {
        id: 9,
        question: "Posso melhorar meu QI?",
        answer:
          "Sim! Fornecemos exercícios personalizados e recomendações específicas baseadas em suas áreas de menor desempenho.",
      },
      {
        id: 10,
        question: "Quanto tempo leva para ver melhorias?",
        answer:
          "Com prática consistente, melhorias podem ser observadas em 2-3 meses, com ganhos significativos em 6 meses.",
      },
    ],
  },
  {
    id: "certificates",
    title: "Certificados e Validação",
    subtitle: "Documentação oficial dos resultados",
    icon: <Award className="w-6 h-6" />,
    color: "#06B6D4",
    bgColor: "bg-cyan-50",
    hoverColor: "hover:bg-cyan-50",
    questions: [
      {
        id: 11,
        question: "Como obter meu certificado?",
        answer:
          "Certificados oficiais são gerados automaticamente após completar o teste, com validação digital e QR code para verificação.",
      },
      {
        id: 12,
        question: "O certificado é aceito internacionalmente?",
        answer:
          "Sim, nossos certificados seguem padrões internacionais e são aceitos por universidades e empregadores globalmente.",
      },
    ],
  },
]

const ProfessionalFAQButtons: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
    setSearchTerm("")
  }

  const filteredQuestions = (questions: any[]) => {
    if (!searchTerm) return questions
    return questions.filter(
      (qa) =>
        qa.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        qa.answer.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 py-12 sm:py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950/30 rounded-2xl">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2">FAQ Resultados</Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Entenda Completamente Seus Resultados
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Explore cada aspecto da sua avaliação de QI com explicações detalhadas e comparações profissionais
        </p>
      </div>

      {/* FAQ Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {faqCategories.map((category) => (
          <Card
            key={category.id}
            className={`
  cursor-pointer transition-all duration-300 border-2 shadow-lg hover:shadow-xl
  bg-white dark:bg-slate-800
  ${
    expandedCategory === category.id
      ? `border-[${category.color}] ${category.bgColor} dark:${category.bgColor.replace("bg-", "dark:bg-")}`
      : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
  }
  ${category.hoverColor} dark:hover:bg-slate-700
`}
            onClick={() => toggleCategory(category.id)}
            role="button"
            tabIndex={0}
            aria-expanded={expandedCategory === category.id}
            aria-label={`${category.title} - ${category.subtitle}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                toggleCategory(category.id)
              }
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                  style={{ backgroundColor: category.color }}
                >
                  <div className="text-white">{category.icon}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {category.questions.length} perguntas
                  </Badge>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                    {expandedCategory === category.id ? (
                      <ChevronUp className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    )}
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 leading-tight">
                {category.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{category.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Expanded Category Content */}
      {expandedCategory && (
        <Card className="border-2 shadow-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900/80">
          <CardContent className="p-8">
            {(() => {
              const category = faqCategories.find((c) => c.id === expandedCategory)
              if (!category) return null

              return (
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: category.color }}
                      >
                        <div className="text-white text-xl">{category.icon}</div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">{category.title}</h3>
                        <p className="text-slate-600 dark:text-slate-300">{category.subtitle}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedCategory(null)}
                      className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center transition-colors"
                      aria-label="Fechar categoria"
                    >
                      <ChevronUp className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </button>
                  </div>

                  {/* Search within category */}
                  <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder={`Buscar em ${category.title.toLowerCase()}...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Questions and Answers */}
                  <div className="space-y-6">
                    {filteredQuestions(category.questions).map((qa, index) => (
                      <div
                        key={qa.id}
                        className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-start">
                          <span
                            className="inline-block w-6 h-6 rounded-full text-white text-sm font-bold flex items-center justify-center mr-3 mt-0.5 flex-shrink-0"
                            style={{ backgroundColor: category.color }}
                          >
                            {index + 1}
                          </span>
                          {qa.question}
                        </h4>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed ml-9">{qa.answer}</p>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-slate-200">
                    <button className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Ver Seção Completa
                    </button>
                    <button className="flex items-center justify-center px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                      Fazer Teste Agora
                    </button>
                  </div>
                </div>
              )
            })()}
          </CardContent>
        </Card>
      )}

      {/* Quick Access Links */}
      <div className="mt-12 p-8 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/50 rounded-2xl border border-slate-200 dark:border-slate-700/50">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 text-center">Acesso Rápido</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Fazer Teste", href: "/test", color: "bg-blue-500" },
            { label: "Ver Ranking", href: "/ranking", color: "bg-green-500" },
            { label: "Meus Resultados", href: "/results", color: "bg-purple-500" },
            { label: "Certificados", href: "/certificates", color: "bg-orange-500" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`${link.color} text-white px-4 py-3 rounded-xl text-center font-semibold hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl transform hover:scale-105`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfessionalFAQButtons
