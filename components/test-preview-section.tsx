"use client"

import type React from "react"

import { useState } from "react"
import { Eye, Brain, Puzzle, Target, Layers, Crown, Star, Trophy } from "lucide-react"
import { QuestionTypeModal } from "@/components/question-type-modal"
import { PremiumPaymentModal } from "@/components/premium-payment-modal"

interface PreviewQuestion {
  id: number
  title: string
  category: string
  icon: React.ReactNode
  description: string
  difficulty: "Básico" | "Intermediário" | "Avançado" | "Expert"
  timeEstimate: string
  gradient: string
  price: number
  originalPrice?: number
  questions: number
  timeLimit: number
  features: string[]
}

const sampleQuestions: PreviewQuestion[] = [
  {
    id: 1,
    title: "Padrões Visuais",
    category: "Raciocínio Espacial",
    icon: <Eye className="w-8 h-8 text-white" />,
    description: "Identifique sequências e complete matrizes visuais com padrões geométricos.",
    difficulty: "Básico",
    timeEstimate: "15 minutos",
    gradient: "from-green-500 to-green-600",
    price: 9.9,
    originalPrice: 19.9,
    questions: 15,
    timeLimit: 15,
    features: [
      "15 questões de padrões visuais",
      "Feedback detalhado",
      "Certificado digital",
      "Comparação com outros usuários",
    ],
  },
  {
    id: 2,
    title: "Quebra-cabeças Lógicos",
    category: "Raciocínio Lógico",
    icon: <Brain className="w-8 h-8 text-white" />,
    description: "Resolva problemas lógicos complexos usando raciocínio dedutivo e indutivo.",
    difficulty: "Intermediário",
    timeEstimate: "25 minutos",
    gradient: "from-blue-500 to-blue-600",
    price: 14.9,
    originalPrice: 24.9,
    questions: 20,
    timeLimit: 25,
    features: [
      "20 questões de lógica avançada",
      "Análise de performance detalhada",
      "Dicas personalizadas",
      "Certificado premium",
      "Acesso ao ranking global",
    ],
  },
  {
    id: 3,
    title: "Raciocínio Abstrato",
    category: "Inteligência Fluida",
    icon: <Puzzle className="w-8 h-8 text-white" />,
    description: "Navegue por desafios abstratos complexos que testam sua capacidade de raciocínio puro.",
    difficulty: "Avançado",
    timeEstimate: "35 minutos",
    gradient: "from-orange-500 to-orange-600",
    price: 19.9,
    originalPrice: 34.9,
    questions: 25,
    timeLimit: 35,
    features: [
      "25 questões de alta complexidade",
      "Relatório psicométrico completo",
      "Análise de pontos fortes e fracos",
      "Certificado profissional",
      "Consultoria personalizada (15min)",
      "Acesso vitalício aos resultados",
    ],
  },
  {
    id: 4,
    title: "Raciocínio Numérico",
    category: "Inteligência Quantitativa",
    icon: <Target className="w-8 h-8 text-white" />,
    description: "Resolva sequências matemáticas e problemas de padrões numéricos.",
    difficulty: "Intermediário",
    timeEstimate: "20 minutos",
    gradient: "from-purple-500 to-purple-600",
    price: 12.9,
    originalPrice: 22.9,
    questions: 18,
    timeLimit: 20,
    features: [
      "18 questões matemáticas",
      "Explicações passo a passo",
      "Gráficos de performance",
      "Certificado digital",
      "Comparação setorial",
    ],
  },
  {
    id: 5,
    title: "Raciocínio Verbal",
    category: "Inteligência Linguística",
    icon: <Layers className="w-8 h-8 text-white" />,
    description: "Analise relações entre palavras e resolva problemas lógicos baseados em linguagem.",
    difficulty: "Básico",
    timeEstimate: "12 minutos",
    gradient: "from-emerald-500 to-emerald-600",
    price: 8.9,
    questions: 12,
    timeLimit: 12,
    features: ["12 questões verbais", "Análise de vocabulário", "Feedback imediato", "Certificado básico"],
  },
  {
    id: 6,
    title: "Teste Completo Expert",
    category: "Avaliação Completa",
    icon: <Crown className="w-8 h-8 text-white" />,
    description: "Avaliação completa de todas as dimensões da inteligência com análise profissional.",
    difficulty: "Expert",
    timeEstimate: "60 minutos",
    gradient: "from-red-500 to-red-600",
    price: 39.9,
    originalPrice: 79.9,
    questions: 50,
    timeLimit: 60,
    features: [
      "50 questões multidisciplinares",
      "Relatório psicométrico completo",
      "Análise de 8 tipos de inteligência",
      "Certificado profissional reconhecido",
      "Consultoria personalizada (30min)",
      "Plano de desenvolvimento cognitivo",
      "Acesso vitalício + atualizações",
      "Suporte prioritário",
    ],
  },
]

export default function TestPreviewSection() {
  const [selectedQuestion, setSelectedQuestion] = useState<PreviewQuestion | null>(null)
  const [showPricing, setShowPricing] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState<PreviewQuestion | null>(null)

  const handleQuestionClick = (question: PreviewQuestion) => {
    setSelectedQuestion(question)
  }

  const handleStartTest = (question: PreviewQuestion) => {
    setSelectedQuestion(null)
    setSelectedLevel(question)
    setShowPricing(true)
  }

  const handlePurchase = (paymentMethod: string) => {
    setShowPricing(false)
    // Redirecionar para o teste pago
    if (selectedLevel) {
      localStorage.setItem(
        "purchasedTest",
        JSON.stringify({
          ...selectedLevel,
          paymentMethod,
          purchaseDate: new Date().toISOString(),
        }),
      )
      window.location.href = `/test/${selectedLevel.id}`
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Básico":
        return <Target className="w-4 h-4" />
      case "Intermediário":
        return <Star className="w-4 h-4" />
      case "Avançado":
        return <Trophy className="w-4 h-4" />
      case "Expert":
        return <Crown className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Básico":
        return "bg-green-100 text-green-700"
      case "Intermediário":
        return "bg-blue-100 text-blue-700"
      case "Avançado":
        return "bg-orange-100 text-orange-700"
      case "Expert":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getDetailedDescription = (id: number) => {
    const descriptions = {
      1: "Os padrões visuais testam sua capacidade de identificar relações espaciais e sequências lógicas em figuras geométricas. Você precisará analisar matrizes 3x3 onde uma peça está faltando e determinar qual das opções completa corretamente o padrão.",
      2: "Os quebra-cabeças lógicos avaliam seu raciocínio dedutivo e indutivo através de problemas complexos que requerem análise sistemática. Você trabalhará com premissas e conclusões, identificando relações causais e padrões lógicos.",
      3: "O raciocínio abstrato mede sua inteligência fluida - a capacidade de pensar logicamente e resolver problemas novos independentemente do conhecimento adquirido. Estas questões não dependem de conhecimento cultural ou educacional específico.",
      4: "O raciocínio numérico avalia sua capacidade de trabalhar com números, identificar padrões matemáticos e resolver problemas quantitativos. Inclui sequências numéricas, progressões aritméticas e geométricas.",
      5: "O raciocínio verbal testa sua capacidade de compreender e manipular conceitos expressos em palavras. Avalia vocabulário, analogias verbais, compreensão de relações semânticas e lógica linguística.",
      6: "A avaliação completa expert combina todos os tipos de inteligência em um teste abrangente que fornece uma análise profissional completa do seu perfil cognitivo, incluindo recomendações personalizadas para desenvolvimento.",
    }
    return descriptions[id] || ""
  }

  const getExamples = (id: number) => {
    const examples = {
      1: [
        "Complete a matriz: uma sequência de formas que rotacionam 45° a cada passo",
        "Identifique o padrão: círculos que mudam de cor seguindo uma progressão específica",
        "Encontre a peça faltante: formas geométricas que se combinam seguindo regras de simetria",
      ],
      2: [
        "Se A > B e B > C, então qual é a relação entre A e C?",
        "Todos os gatos são mamíferos. Alguns mamíferos voam. Logo...",
        "Em uma sequência lógica, determine o próximo elemento baseado nas regras estabelecidas",
      ],
      3: [
        "Identifique o padrão em uma série de símbolos abstratos",
        "Complete uma sequência de transformações geométricas complexas",
        "Determine a regra que governa uma série de elementos não-verbais",
      ],
      4: [
        "Qual é o próximo número: 2, 6, 12, 20, 30, ?",
        "Complete a sequência: 1, 1, 2, 3, 5, 8, ?",
        "Encontre o padrão: 4, 9, 16, 25, ?",
      ],
      5: [
        "Livro está para Biblioteca assim como Quadro está para: ?",
        "Qual palavra não pertence ao grupo: Carro, Bicicleta, Avião, Casa",
        "Complete a analogia: Médico está para Hospital assim como Professor está para: ?",
      ],
      6: [
        "Combinação de questões visuais, lógicas, numéricas e verbais",
        "Análise de múltiplas inteligências simultaneamente",
        "Questões adaptativas baseadas no seu desempenho",
      ],
    }
    return examples[id] || []
  }

  const getSkills = (id: number) => {
    const skills = {
      1: ["Percepção espacial", "Reconhecimento de padrões", "Raciocínio visual", "Análise de formas"],
      2: ["Raciocínio dedutivo", "Raciocínio indutivo", "Análise lógica", "Pensamento crítico"],
      3: ["Inteligência fluida", "Flexibilidade cognitiva", "Raciocínio não-verbal", "Adaptabilidade mental"],
      4: ["Habilidade numérica", "Reconhecimento de sequências", "Cálculo mental", "Raciocínio quantitativo"],
      5: ["Compreensão verbal", "Vocabulário", "Analogias", "Relações semânticas"],
      6: [
        "Todas as habilidades cognitivas",
        "Inteligência geral",
        "Perfil psicométrico completo",
        "Análise multidimensional",
      ],
    }
    return skills[id] || []
  }

  const getTips = (id: number) => {
    const tips = {
      1: [
        "Analise cada linha e coluna separadamente para identificar padrões",
        "Observe mudanças em forma, cor, tamanho e orientação",
        "Elimine opções que claramente não seguem o padrão identificado",
        "Use o processo de eliminação quando não tiver certeza",
      ],
      2: [
        "Leia cuidadosamente todas as premissas antes de tirar conclusões",
        "Desenhe diagramas simples para visualizar relações complexas",
        "Cuidado com armadilhas lógicas e conclusões precipitadas",
        "Teste suas conclusões verificando se são consistentes com todas as premissas",
      ],
      3: [
        "Não se baseie em conhecimento cultural ou educacional específico",
        "Foque nas relações e transformações entre elementos",
        "Procure por padrões de mudança sistemática",
        "Confie na sua intuição, mas verifique logicamente",
      ],
      4: [
        "Procure por diferenças entre números consecutivos",
        "Teste operações matemáticas simples (soma, multiplicação, potências)",
        "Considere progressões aritméticas e geométricas",
        "Verifique se o padrão se mantém consistente em toda a sequência",
      ],
      5: [
        "Identifique a relação específica entre as palavras do exemplo",
        "Considere diferentes tipos de relações: função, localização, categoria",
        "Elimine opções que não mantêm o mesmo tipo de relação",
        "Pense em sinônimos e antônimos quando apropriado",
      ],
      6: [
        "Gerencie bem seu tempo entre as diferentes seções",
        "Mantenha o foco durante toda a avaliação",
        "Não se fixe muito tempo em uma questão difícil",
        "Confie no seu conhecimento e experiência acumulados",
      ],
    }
    return tips[id] || []
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-blue-600 dark:from-slate-100 dark:to-blue-400 bg-clip-text text-transparent mb-6">
            Escolha Seu Nível de Teste
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Selecione o teste que melhor se adequa ao seu nível e objetivos. Cada teste é cuidadosamente calibrado para
            oferecer o desafio ideal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleQuestions.map((question, index) => (
            <div
              key={question.id}
              className="group relative bg-white dark:bg-slate-800 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${question.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative p-8">
                {/* Price Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white dark:bg-slate-800 rounded-full px-3 py-1 shadow-lg">
                    {question.originalPrice && (
                      <span className="text-xs text-slate-500 line-through mr-1">R${question.originalPrice}</span>
                    )}
                    <span className="text-sm font-bold text-blue-600">R${question.price.toFixed(2)}</span>
                  </div>
                </div>

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${question.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  {question.icon}
                </div>

                {/* Category Badge */}
                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${question.gradient} text-white`}
                  >
                    {question.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {question.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{question.description}</p>

                {/* Difficulty & Time */}
                <div className="flex items-center justify-between text-sm mb-6">
                  <span
                    className={`px-3 py-1 rounded-full font-medium flex items-center space-x-1 ${getDifficultyColor(question.difficulty)}`}
                  >
                    {getDifficultyIcon(question.difficulty)}
                    <span>{question.difficulty}</span>
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">{question.timeEstimate}</span>
                </div>

                {/* Features Preview */}
                <div className="space-y-2 mb-6">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Inclui:</div>
                  {question.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      <span className="text-xs text-slate-600 dark:text-slate-400">{feature}</span>
                    </div>
                  ))}
                  {question.features.length > 2 && (
                    <div className="text-xs text-blue-600 dark:text-blue-400">
                      +{question.features.length - 2} mais benefícios
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleQuestionClick(question)}
                    className="w-full px-4 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Eye className="w-4 h-4 inline mr-2" />
                    Ver Detalhes
                  </button>
                  <button
                    onClick={() => handleStartTest(question)}
                    className={`w-full px-4 py-3 text-white font-semibold rounded-lg bg-gradient-to-r ${question.gradient} hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    Começar Teste - R${question.price.toFixed(2)}
                  </button>
                </div>
              </div>

              {/* Bottom Gradient Line */}
              <div
                className={`h-1 bg-gradient-to-r ${question.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {selectedQuestion && (
        <QuestionTypeModal
          isOpen={!!selectedQuestion}
          onClose={() => setSelectedQuestion(null)}
          questionType={{
            id: selectedQuestion.id,
            title: selectedQuestion.title,
            category: selectedQuestion.category,
            icon: selectedQuestion.icon,
            description: selectedQuestion.description,
            detailedDescription: getDetailedDescription(selectedQuestion.id),
            examples: getExamples(selectedQuestion.id),
            difficulty: selectedQuestion.difficulty as any,
            timeEstimate: selectedQuestion.timeEstimate,
            skills: getSkills(selectedQuestion.id),
            tips: getTips(selectedQuestion.id),
          }}
          onStartTest={() => handleStartTest(selectedQuestion)}
        />
      )}

      <PremiumPaymentModal
        isOpen={showPricing}
        onClose={() => setShowPricing(false)}
        selectedLevel={selectedLevel}
        onPurchase={handlePurchase}
      />
    </section>
  )
}
