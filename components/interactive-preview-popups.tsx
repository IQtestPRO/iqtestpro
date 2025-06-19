"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock, Target, Award, X, CheckCircle, Star } from "lucide-react"

export type PopupType = "spatial" | "logical" | "abstract" | "complete" | null

interface PopupData {
  title: string
  subtitle: string
  description: string
  difficulty: string
  duration: string
  questions: number
  features: string[]
  examples: string[]
  tips: string[]
  icon: React.ReactNode
  gradient: string
}

const popupData: Record<Exclude<PopupType, null>, PopupData> = {
  spatial: {
    title: "Raciocínio Espacial",
    subtitle: "Padrões Visuais",
    description: "Teste sua capacidade de visualizar e manipular objetos no espaço tridimensional.",
    difficulty: "Básico",
    duration: "15 min",
    questions: 15,
    features: [
      "15 questões de padrões visuais",
      "Feedback detalhado",
      "Certificado digital",
      "Comparação com outros usuários",
    ],
    examples: [
      "Complete a matriz: formas que rotacionam 45°",
      "Identifique o padrão: círculos que mudam de cor",
      "Encontre a peça faltante: simetria geométrica",
    ],
    tips: [
      "Analise cada linha e coluna separadamente",
      "Observe mudanças em forma, cor e orientação",
      "Use o processo de eliminação",
    ],
    icon: <Target className="w-6 h-6" />,
    gradient: "from-blue-500 to-cyan-500",
  },
  logical: {
    title: "Raciocínio Lógico",
    subtitle: "Quebra-cabeças Lógicos",
    description: "Resolva problemas complexos usando raciocínio dedutivo e indutivo.",
    difficulty: "Intermediário",
    duration: "25 min",
    questions: 20,
    features: [
      "20 questões de lógica avançada",
      "Análise de performance detalhada",
      "Dicas personalizadas",
      "Certificado premium",
    ],
    examples: [
      "Se A > B e B > C, então A > C?",
      "Todos os gatos são mamíferos. Alguns mamíferos voam...",
      "Determine o próximo elemento na sequência lógica",
    ],
    tips: [
      "Leia todas as premissas cuidadosamente",
      "Desenhe diagramas para visualizar",
      "Cuidado com armadilhas lógicas",
    ],
    icon: <Brain className="w-6 h-6" />,
    gradient: "from-purple-500 to-indigo-500",
  },
  abstract: {
    title: "Raciocínio Abstrato",
    subtitle: "Inteligência Fluida",
    description: "Navegue por desafios abstratos que testam sua capacidade de raciocínio puro.",
    difficulty: "Avançado",
    duration: "35 min",
    questions: 25,
    features: [
      "25 questões de alta complexidade",
      "Relatório psicométrico completo",
      "Análise de pontos fortes e fracos",
      "Certificado profissional",
    ],
    examples: [
      "Identifique padrões em símbolos abstratos",
      "Complete transformações geométricas complexas",
      "Determine regras de elementos não-verbais",
    ],
    tips: [
      "Foque nas relações entre elementos",
      "Procure por padrões de mudança",
      "Confie na intuição, mas verifique logicamente",
    ],
    icon: <Award className="w-6 h-6" />,
    gradient: "from-orange-500 to-red-500",
  },
  complete: {
    title: "Teste Completo",
    subtitle: "Avaliação Integral",
    description: "Avaliação completa de todas as dimensões da inteligência.",
    difficulty: "Expert",
    duration: "60 min",
    questions: 50,
    features: [
      "50 questões multidisciplinares",
      "Relatório psicométrico completo",
      "Análise de 8 tipos de inteligência",
      "Certificado profissional reconhecido",
    ],
    examples: [
      "Combinação de questões visuais, lógicas e numéricas",
      "Análise de múltiplas inteligências",
      "Questões adaptativas baseadas no desempenho",
    ],
    tips: [
      "Gerencie bem seu tempo",
      "Mantenha o foco durante toda a avaliação",
      "Não se fixe muito em uma questão difícil",
    ],
    icon: <Star className="w-6 h-6" />,
    gradient: "from-green-500 to-emerald-500",
  },
}

export function useInteractivePopups() {
  const [activePopup, setActivePopup] = useState<PopupType>(null)

  const openPopup = useCallback((type: Exclude<PopupType, null>) => {
    setActivePopup(type)
  }, [])

  const closePopup = useCallback(() => {
    setActivePopup(null)
  }, [])

  return {
    activePopup,
    openPopup,
    closePopup,
  }
}

interface InteractivePreviewPopupProps {
  isOpen: boolean
  onClose: () => void
  type: Exclude<PopupType, null>
  onStartTest: () => void
}

export function InteractivePreviewPopup({ isOpen, onClose, type, onStartTest }: InteractivePreviewPopupProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !type || !popupData[type]) {
    return null
  }

  const data = popupData[type]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Básico":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      case "Intermediário":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
      case "Avançado":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
      case "Expert":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const getDifficultyStars = (difficulty: string) => {
    const levels = { Básico: 2, Intermediário: 3, Avançado: 4, Expert: 5 }
    const level = levels[difficulty as keyof typeof levels] || 2

    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < level ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${data.gradient} text-white`}>{data.icon}</div>
              <div>
                <DialogTitle className="text-2xl font-bold">{data.title}</DialogTitle>
                <p className="text-lg text-muted-foreground">{data.subtitle}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Difficulty and Stats */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-4">
              <Badge className={getDifficultyColor(data.difficulty)}>{data.difficulty}</Badge>
              <div className="flex items-center space-x-1">{getDifficultyStars(data.difficulty)}</div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{data.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4" />
                <span>{data.questions} questões</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Sobre este teste</h3>
            <p className="text-muted-foreground leading-relaxed">{data.description}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-3">O que está incluído</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Examples */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Exemplos de questões</h3>
            <div className="space-y-2">
              {data.examples.map((example, index) => (
                <div key={index} className="p-3 bg-muted rounded-lg">
                  <p className="text-sm">{example}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Dicas para melhor performance</h3>
            <div className="space-y-2">
              {data.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Fechar Preview
            </Button>
            <Button
              onClick={onStartTest}
              className={`flex-1 bg-gradient-to-r ${data.gradient} hover:opacity-90 text-white`}
            >
              Iniciar Teste
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
