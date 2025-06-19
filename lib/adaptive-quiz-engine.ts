// PARTE 5: SISTEMA DE QUIZ ADAPTATIVO POR DIFICULDADE

export interface QuizQuestion {
  id: string
  level: "BASIC" | "INTERMEDIATE" | "ADVANCED" | "EXPERT"
  type: "spatial" | "logical" | "abstract" | "numerical" | "verbal"
  question: string
  options: string[]
  correctAnswer: number
  timeLimit: number
  difficulty: number // 1-10 scale
  explanation: string
  category: string
}

export interface QuizLevel {
  id: string
  name: string
  price: number
  duration: number
  questionCount: number
  expectedAccuracy: number
  timePerQuestion: number
  description: string
}

// Definição dos níveis de dificuldade
export const QUIZ_LEVELS: Record<string, QuizLevel> = {
  BASIC: {
    id: "BASIC",
    name: "Raciocínio Espacial - Padrões Visuais",
    price: 14.9,
    duration: 15,
    questionCount: 15,
    expectedAccuracy: 75,
    timePerQuestion: 60,
    description: "Padrões simples de 2-3 elementos com rotações básicas",
  },
  INTERMEDIATE: {
    id: "INTERMEDIATE",
    name: "Raciocínio Lógico - Quebra-cabeças",
    price: 19.9,
    duration: 25,
    questionCount: 20,
    expectedAccuracy: 65,
    timePerQuestion: 75,
    description: "Múltiplas variáveis e condições lógicas complexas",
  },
  ADVANCED: {
    id: "ADVANCED",
    name: "Inteligência Fluida - Raciocínio Abstrato",
    price: 39.9,
    duration: 35,
    questionCount: 25,
    expectedAccuracy: 50,
    timePerQuestion: 84,
    description: "Raciocínio abstrato de alto nível independente de conhecimento",
  },
  EXPERT: {
    id: "EXPERT",
    name: "Avaliação Completa - Teste Expert",
    price: 59.9,
    duration: 60,
    questionCount: 50,
    expectedAccuracy: 40,
    timePerQuestion: 72,
    description: "Nível de assessments profissionais multidisciplinares",
  },
}

// Banco de questões estratificado por dificuldade
export const QUESTION_BANK: Record<string, QuizQuestion[]> = {
  BASIC: [
    {
      id: "basic_spatial_001",
      level: "BASIC",
      type: "spatial",
      question: "Qual figura completa a sequência: ○ △ ○ △ ?",
      options: ["○", "△", "□", "◇"],
      correctAnswer: 0,
      timeLimit: 45,
      difficulty: 2,
      explanation: "A sequência alterna entre círculo e triângulo, então o próximo deve ser círculo.",
      category: "Sequências Simples",
    },
    {
      id: "basic_spatial_002",
      level: "BASIC",
      type: "spatial",
      question: "Se você girar esta figura 90° no sentido horário: ↑, ela ficará:",
      options: ["→", "↓", "←", "↑"],
      correctAnswer: 0,
      timeLimit: 30,
      difficulty: 1,
      explanation: "Uma rotação de 90° no sentido horário transforma ↑ em →.",
      category: "Rotação Básica",
    },
    {
      id: "basic_spatial_003",
      level: "BASIC",
      type: "spatial",
      question: "Quantos quadrados você vê nesta figura: ■■■",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1,
      timeLimit: 60,
      difficulty: 2,
      explanation: "Há 3 quadrados individuais visíveis na sequência.",
      category: "Contagem Visual",
    },
    // ... mais 12 questões básicas
  ],

  INTERMEDIATE: [
    {
      id: "inter_logical_001",
      level: "INTERMEDIATE",
      type: "logical",
      question: "Se todos os A são B, e alguns B são C, então:",
      options: ["Todos os A são C", "Alguns A podem ser C", "Nenhum A é C", "Todos os C são A"],
      correctAnswer: 1,
      timeLimit: 90,
      difficulty: 5,
      explanation: "A lógica permite que alguns A sejam C, mas não garante que todos sejam.",
      category: "Silogismos",
    },
    {
      id: "inter_logical_002",
      level: "INTERMEDIATE",
      type: "logical",
      question:
        "Em uma sala há 5 pessoas. Se cada pessoa cumprimenta todas as outras uma vez, quantos cumprimentos acontecem?",
      options: ["10", "15", "20", "25"],
      correctAnswer: 0,
      timeLimit: 120,
      difficulty: 6,
      explanation: "Combinação de 5 pessoas tomadas 2 a 2: C(5,2) = 10 cumprimentos.",
      category: "Combinatória Básica",
    },
    // ... mais 18 questões intermediárias
  ],

  ADVANCED: [
    {
      id: "adv_abstract_001",
      level: "ADVANCED",
      type: "abstract",
      question:
        "Na matriz 3x3, qual elemento falta na posição inferior direita se o padrão é rotação de 90° no sentido horário?",
      options: ["↑", "→", "↓", "←"],
      correctAnswer: 2,
      timeLimit: 180,
      difficulty: 8,
      explanation: "Seguindo o padrão de rotação 90° horário, a sequência leva ao ↓.",
      category: "Matrizes Complexas",
    },
    {
      id: "adv_abstract_002",
      level: "ADVANCED",
      type: "abstract",
      question: "Se f(x) = x³ - 6x² + 11x - 6 e f(a) = 0, qual é o valor de a² + a + 1 se a é a menor raiz positiva?",
      options: ["3", "7", "13", "21"],
      correctAnswer: 0,
      timeLimit: 240,
      difficulty: 9,
      explanation: "f(x) = (x-1)(x-2)(x-3). A menor raiz positiva é a=1. Logo a² + a + 1 = 3.",
      category: "Álgebra Avançada",
    },
    // ... mais 23 questões avançadas
  ],

  EXPERT: [
    {
      id: "expert_multi_001",
      level: "EXPERT",
      type: "numerical",
      question: "Se f(x) = 2x + 1 e g(x) = x², qual é o valor de f(g(3))?",
      options: ["19", "18", "17", "20"],
      correctAnswer: 0,
      timeLimit: 180,
      difficulty: 7,
      explanation: "g(3) = 9, então f(9) = 2(9) + 1 = 19.",
      category: "Funções Compostas",
    },
    {
      id: "expert_multi_002",
      level: "EXPERT",
      type: "logical",
      question: "Se P → Q é falso e Q → R é verdadeiro, qual das seguintes é necessariamente verdadeira?",
      options: ["P é verdadeiro", "Q é falso", "R é verdadeiro", "P → R é falso"],
      correctAnswer: 1,
      timeLimit: 300,
      difficulty: 10,
      explanation: "Se P → Q é falso, então P é verdadeiro e Q é falso.",
      category: "Lógica Proposicional",
    },
    // ... mais 48 questões expert
  ],
}

export class AdaptiveQuizEngine {
  private level: string
  private questions: QuizQuestion[]
  private currentIndex = 0
  private userAnswers: number[] = []
  private startTime: number = Date.now()

  constructor(level: string) {
    this.level = level
    this.questions = this.selectQuestions(level)
  }

  private selectQuestions(level: string): QuizQuestion[] {
    const levelQuestions = QUESTION_BANK[level] || []
    const targetCount = QUIZ_LEVELS[level]?.questionCount || 20

    // Embaralhar e selecionar questões
    const shuffled = [...levelQuestions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, targetCount)
  }

  getCurrentQuestion(): QuizQuestion | null {
    return this.questions[this.currentIndex] || null
  }

  submitAnswer(answerIndex: number): boolean {
    this.userAnswers[this.currentIndex] = answerIndex
    this.currentIndex++
    return this.currentIndex < this.questions.length
  }

  calculateResults(): {
    score: number
    correctCount: number
    totalQuestions: number
    timeSpent: number
    percentile: number
    iqEstimate: number
    passed: boolean
  } {
    const correctCount = this.userAnswers.filter(
      (answer, index) => answer === this.questions[index].correctAnswer,
    ).length

    const score = (correctCount / this.questions.length) * 100
    const timeSpent = Math.round((Date.now() - this.startTime) / 1000)

    // Cálculo do QI baseado na performance e nível
    const baseIQ = 100
    const levelMultiplier =
      {
        BASIC: 0.8,
        INTERMEDIATE: 1.0,
        ADVANCED: 1.3,
        EXPERT: 1.6,
      }[this.level] || 1.0

    const iqEstimate = Math.round(baseIQ + (score - 50) * levelMultiplier * 0.6)

    // Percentil baseado no QI estimado
    const percentile = this.calculatePercentile(iqEstimate)

    // Critério de aprovação baseado na expectativa do nível
    const expectedAccuracy = QUIZ_LEVELS[this.level]?.expectedAccuracy || 50
    const passed = score >= expectedAccuracy

    return {
      score,
      correctCount,
      totalQuestions: this.questions.length,
      timeSpent,
      percentile,
      iqEstimate,
      passed,
    }
  }

  private calculatePercentile(iq: number): number {
    // Distribuição normal com média 100 e desvio padrão 15
    const mean = 100
    const stdDev = 15
    const z = (iq - mean) / stdDev

    // Aproximação da função de distribuição cumulativa normal
    const percentile = Math.round(this.normalCDF(z) * 100)
    return Math.max(1, Math.min(99, percentile))
  }

  private normalCDF(z: number): number {
    // Aproximação de Abramowitz e Stegun
    const t = 1 / (1 + 0.2316419 * Math.abs(z))
    const d = 0.3989423 * Math.exp((-z * z) / 2)
    let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))

    if (z > 0) prob = 1 - prob
    return prob
  }

  getProgress(): { current: number; total: number; percentage: number } {
    return {
      current: this.currentIndex + 1,
      total: this.questions.length,
      percentage: Math.round(((this.currentIndex + 1) / this.questions.length) * 100),
    }
  }

  getTimeRemaining(): number {
    const levelConfig = QUIZ_LEVELS[this.level]
    if (!levelConfig) return 0

    const totalTime = levelConfig.duration * 60 * 1000 // em ms
    const elapsed = Date.now() - this.startTime
    return Math.max(0, totalTime - elapsed)
  }
}

// Função para verificar acesso pós-pagamento
export function verifyPaymentAccess(level: string): boolean {
  const purchasedTest = localStorage.getItem("purchasedTest")
  if (!purchasedTest) return false

  try {
    const testData = JSON.parse(purchasedTest)
    return testData.level === level && testData.paymentConfirmed === true
  } catch {
    return false
  }
}

// Função para redirecionar após pagamento
export function handlePostPaymentFlow(level: string, paymentData: any) {
  // Salvar dados do pagamento
  localStorage.setItem(
    "purchasedTest",
    JSON.stringify({
      level,
      paymentConfirmed: true,
      purchaseDate: new Date().toISOString(),
      ...paymentData,
    }),
  )

  // Redirecionar para o quiz específico
  window.location.href = `/quiz/${level.toLowerCase()}`
}
