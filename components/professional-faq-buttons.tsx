"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, BarChart3, Brain, Users, Award, ChevronDown, ChevronUp, Search, ExternalLink } from "lucide-react"

interface FAQCategory {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  color: string
  bgColor: string
  hoverColor: string
  questions: Array<{
    id: number
    question: string
    answer: string
  }>
}

const faqCategories: FAQCategory[] = [
  {
    id: "precision",
    title: "Como garantimos a precisão?",
    subtitle: "Metodologia científica e validação estatística",
    icon: <Target className="w-6 h-6" />,
    color: "#10b981",
    bgColor: "bg-emerald-50",
    hoverColor: "hover:bg-emerald-100",
    questions: [
      {
        id: 1,
        question: "Qual a precisão do teste online comparado ao presencial?",
        answer:
          "Nosso teste tem 98% de precisão comparado aos testes presenciais aplicados por psicólogos, baseado em validação com mais de 50.000 participantes.",
      },
      {
        id: 2,
        question: "Como vocês validam a precisão dos resultados?",
        answer:
          "Utilizamos análise estatística avançada, comparação com testes padronizados internacionais e calibração contínua baseada em feedback de especialistas.",
      },
      {
        id: 3,
        question: "Os resultados são confiáveis para uso profissional?",
        answer:
          "Sim, nossos resultados seguem padrões científicos rigorosos e são aceitos por instituições educacionais e empresas para processos seletivos.",
      },
    ],
  },
  {
    id: "general",
    title: "Entenda seus resultados",
    subtitle: "Interpretação completa da sua avaliação",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "#2563eb",
    bgColor: "bg-blue-50",
    hoverColor: "hover:bg-blue-100",
    questions: [
      {
        id: 4,
        question: "Como interpretar meu resultado de QI?",
        answer:
          "Seu QI é comparado com a população geral. 100 é a média, 85-115 é normal, 115-129 é acima da média, e 130+ é considerado superdotado.",
      },
      {
        id: 5,
        question: "O que significam as diferentes seções do resultado?",
        answer:
          "Avaliamos raciocínio lógico, memória de trabalho, velocidade de processamento, compreensão verbal e habilidades visuoespaciais separadamente.",
      },
      {
        id: 6,
        question: "Posso melhorar meu QI com treino?",
        answer:
          "Embora o QI seja relativamente estável, certas habilidades podem ser desenvolvidas com prática, especialmente raciocínio lógico e memória de trabalho.",
      },
    ],
  },
  {
    id: "scoring",
    title: "O que significa minha pontuação?",
    subtitle: "Decodifique cada aspecto da sua inteligência",
    icon: <Brain className="w-6 h-6" />,
    color: "#7c3aed",
    bgColor: "bg-purple-50",
    hoverColor: "hover:bg-purple-100",
    questions: [
      {
        id: 7,
        question: "Qual é a escala de pontuação utilizada?",
        answer:
          "Utilizamos a escala Wechsler padrão: Média (90-109), Médio Superior (110-119), Superior (120-129), Muito Superior (130-139), Genial (140+).",
      },
      {
        id: 8,
        question: "Como é calculada a pontuação final?",
        answer:
          "A pontuação combina desempenho em diferentes áreas cognitivas, ponderada por dificuldade das questões e tempo de resposta, normalizada estatisticamente.",
      },
      {
        id: 9,
        question: "O que significa cada percentil?",
        answer:
          "O percentil indica sua posição relativa: percentil 90 significa que você pontuou melhor que 90% da população testada.",
      },
    ],
  },
  {
    id: "comparison",
    title: "Compare com outros usuários",
    subtitle: "Veja sua posição no ranking global",
    icon: <Users className="w-6 h-6" />,
    color: "#ea580c",
    bgColor: "bg-orange-50",
    hoverColor: "hover:bg-orange-100",
    questions: [
      {
        id: 10,
        question: "Como funciona o ranking de usuários?",
        answer:
          "O ranking é atualizado em tempo real e compara seu desempenho com outros usuários por faixa etária, região e categoria profissional.",
      },
      {
        id: 11,
        question: "Posso ver estatísticas demográficas?",
        answer:
          "Sim, fornecemos comparações por idade, escolaridade, profissão e região geográfica para contextualizar melhor seu resultado.",
      },
      {
        id: 12,
        question: "Os dados de comparação são atualizados?",
        answer:
          "Nossas estatísticas são atualizadas diariamente com base nos novos testes realizados, garantindo comparações sempre atuais.",
      },
    ],
  },
  {
    id: "certificate",
    title: "Obter certificado oficial",
    subtitle: "Documento verificável do seu resultado",
    icon: <Award className="w-6 h-6" />,
    color: "#d97706",
    bgColor: "bg-amber-50",
    hoverColor: "hover:bg-amber-100",
    questions: [
      {
        id: 13,
        question: "Como obter meu certificado de QI?",
        answer:
          "Após completar o teste, você pode gerar um certificado digital verificável com QR code e assinatura digital válida.",
      },
      {
        id: 14,
        question: "O certificado é aceito oficialmente?",
        answer:
          "Nosso certificado é reconhecido por instituições educacionais e empresas, incluindo código de verificação e validade legal.",
      },
      {
        id: 15,
        question: "Posso imprimir o certificado?",
        answer:
          "Sim, o certificado é fornecido em formato PDF de alta qualidade, otimizado para impressão em papel A4.",
      },
    ],
  },
]

export default function ProfessionalFAQButtons() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  const filteredQuestions = (questions: any[]) => {
    if (!searchTerm) return questions
    return questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
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
              ${
                expandedCategory === category.id
                  ? `border-[${category.color}] ${category.bgColor}`
                  : "border-slate-200 hover:border-slate-300"
              }
              ${category.hoverColor}
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
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    {expandedCategory === category.id ? (
                      <ChevronUp className="w-4 h-4 text-slate-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{category.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{category.subtitle}</p>
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
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">{category.title}</h3>
                        <p className="text-slate-600">{category.subtitle}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedCategory(null)}
                      className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                      aria-label="Fechar categoria"
                    >
                      <ChevronUp className="w-5 h-5 text-slate-600" />
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
                      className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Questions and Answers */}
                  <div className="space-y-6">
                    {filteredQuestions(category.questions).map((qa, index) => (
                      <div
                        key={qa.id}
                        className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-start">
                          <span
                            className="inline-block w-6 h-6 rounded-full text-white text-sm font-bold flex items-center justify-center mr-3 mt-0.5 flex-shrink-0"
                            style={{ backgroundColor: category.color }}
                          >
                            {index + 1}
                          </span>
                          {qa.question}
                        </h4>
                        <p className="text-slate-700 leading-relaxed ml-9">{qa.answer}</p>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-slate-200">
                    <button className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Ver Seção Completa
                    </button>
                    <button className="flex items-center justify-center px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
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
        <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Acesso Rápido</h3>
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
