"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, HelpCircle, Clock, Shield, Award, Users, Brain } from "lucide-react"
import ProfessionalFAQButtons from "@/components/professional-faq-buttons"

interface FAQItem {
  id: number
  category: string
  question: string
  answer: string
  icon: React.ReactNode
}

const faqData: FAQItem[] = [
  {
    id: 1,
    category: "Geral",
    question: "O que é um teste de QI?",
    answer:
      "Um teste de QI (Quociente de Inteligência) é uma avaliação padronizada que mede diferentes aspectos da inteligência humana, incluindo raciocínio lógico, capacidade de resolução de problemas, memória de trabalho e habilidades verbais e espaciais. Nosso teste é baseado em metodologias científicas reconhecidas internacionalmente.",
    icon: <Brain className="w-5 h-5" />,
  },
  {
    id: 2,
    category: "Teste",
    question: "Quanto tempo leva para completar o teste?",
    answer:
      "O teste completo leva aproximadamente 10-15 minutos para ser concluído. Cada questão tem um tempo limite específico que varia de 45 segundos a 2 minutos, dependendo da complexidade. Recomendamos fazer o teste em um ambiente tranquilo e sem distrações.",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    id: 3,
    category: "Resultados",
    question: "Como são calculados os resultados?",
    answer:
      "Nossos resultados são calculados usando algoritmos baseados em normas estatísticas internacionais. Consideramos não apenas o número de respostas corretas, mas também o tempo de resposta e a dificuldade de cada questão. O resultado final é normalizado para uma escala onde 100 representa a média populacional.",
    icon: <Award className="w-5 h-5" />,
  },
  {
    id: 4,
    category: "Precisão",
    question: "Quão preciso é o teste online?",
    answer:
      "Nosso teste tem uma taxa de precisão de 98% quando comparado com testes presenciais aplicados por psicólogos. Utilizamos metodologias validadas cientificamente e nossa base de dados com mais de 50.000 resultados nos permite calibrar constantemente a precisão do teste.",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: 5,
    category: "Geral",
    question: "Posso fazer o teste mais de uma vez?",
    answer:
      "Sim, você pode refazer o teste, mas recomendamos aguardar pelo menos 30 dias entre as tentativas para obter resultados mais precisos. O efeito de aprendizado pode influenciar os resultados se o teste for repetido muito rapidamente.",
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: 6,
    category: "Resultados",
    question: "O que significam as diferentes faixas de QI?",
    answer:
      "As faixas de QI são: Abaixo de 90 (Abaixo da média), 90-109 (Média), 110-119 (Médio Superior), 120-129 (Superior), 130-139 (Muito Superior), 140+ (Genial). Aproximadamente 68% da população tem QI entre 85-115, e apenas 2% tem QI acima de 130.",
    icon: <Award className="w-5 h-5" />,
  },
  {
    id: 7,
    category: "Privacidade",
    question: "Meus dados estão seguros?",
    answer:
      "Sim, levamos a privacidade muito a sério. Todos os dados são criptografados e armazenados de forma segura. Não compartilhamos informações pessoais com terceiros e você pode solicitar a exclusão dos seus dados a qualquer momento. Seguimos rigorosamente a LGPD (Lei Geral de Proteção de Dados).",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: 8,
    category: "Teste",
    question: "Preciso me preparar para o teste?",
    answer:
      "Não é necessário se preparar especificamente para o teste. Na verdade, recomendamos que você faça o teste sem preparação prévia para obter um resultado mais autêntico do seu QI atual. Certifique-se apenas de estar descansado e em um ambiente tranquilo.",
    icon: <Brain className="w-5 h-5" />,
  },
  {
    id: 9,
    category: "Resultados",
    question: "Posso compartilhar meus resultados?",
    answer:
      "Sim! Oferecemos opções para compartilhar seus resultados nas redes sociais ou baixar um certificado digital. Você também pode ver sua posição no ranking global e comparar seu desempenho com outros usuários (de forma anônima).",
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: 10,
    category: "Técnico",
    question: "O teste funciona em dispositivos móveis?",
    answer:
      "Sim, nosso teste é totalmente responsivo e funciona perfeitamente em smartphones, tablets e computadores. Recomendamos usar uma tela de pelo menos 5 polegadas para uma melhor experiência visual, especialmente nas questões que envolvem padrões visuais.",
    icon: <HelpCircle className="w-5 h-5" />,
  },
]

const categories = ["Todos", "Geral", "Teste", "Resultados", "Precisão", "Privacidade", "Técnico"]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredFAQ =
    selectedCategory === "Todos" ? faqData : faqData.filter((item) => item.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20">
      <div className="container mx-auto px-4 pt-20 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            Perguntas Frequentes
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tire Suas Dúvidas
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Encontre respostas para as perguntas mais comuns sobre nosso teste de QI, metodologia e como interpretar
            seus resultados.
          </p>
        </div>

        {/* Professional FAQ Buttons for Results */}
        <div className="mb-16">
          <ProfessionalFAQButtons />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQ.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-900"
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-8 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-slate-800 dark:hover:to-slate-700 transition-all duration-300 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-blue-400"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                        <div className="text-white text-lg">{item.icon}</div>
                      </div>
                      <div className="flex-1">
                        <Badge
                          variant="outline"
                          className="mb-3 text-xs font-semibold px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                        >
                          {item.category}
                        </Badge>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                          {item.question}
                        </h3>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                        {openItems.includes(item.id) ? (
                          <ChevronUp className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>

                {openItems.includes(item.id) && (
                  <div className="px-8 pb-8 bg-gradient-to-r from-slate-50 to-blue-50/30 dark:from-slate-800/50 dark:to-slate-700/50 border-t border-slate-200 dark:border-slate-700">
                    <div className="pl-20 pt-6">
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg font-medium">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-16 max-w-3xl mx-auto border-2 border-slate-200 dark:border-slate-700 shadow-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100">Ainda tem dúvidas?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              Não encontrou a resposta que procurava? Nossa equipe de suporte especializada está pronta para ajudar com
              qualquer questão!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="mailto:suporte@iqtest.com"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Enviar Email
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Página de Contato
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
