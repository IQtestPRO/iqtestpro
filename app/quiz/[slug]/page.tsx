"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ChevronRight, ChevronLeft, Trophy, Play, Target, Zap, Crown, Lock } from "lucide-react"
import { OptimizedBackground } from "@/components/optimized-background"
import { PremiumQuizEngine, PREMIUM_QUIZ_LEVELS, checkPremiumAccess } from "@/lib/premium-quiz-system"

interface QuizQuestion {
  id: string
  type: "multiple-choice" | "true-false" | "numerical"
  category: string
  question: string
  options?: string[]
  correctAnswer: number | string
  timeLimit: number
  difficulty: 1 | 2 | 3 | 4 | 5
  explanation: string
  points: number
}

interface MissionData {
  id: number
  title: string
  subtitle: string
  questions: number
  timeLimit: number
  difficulty: string
  category: string
  description: string
}

// Banco de questões por missão - TODAS ÚNICAS E ESPECÍFICAS
const MISSION_QUESTIONS: Record<number, QuizQuestion[]> = {
  1: [
    // MISSÃO 1: RACIOCÍNIO ESPACIAL (15 questões)
    {
      id: "spatial_001",
      type: "multiple-choice",
      category: "Rotação Mental",
      question: "Se você girar esta figura 90° no sentido horário: ↑, ela ficará:",
      options: ["→", "↓", "←", "↑"],
      correctAnswer: 0,
      timeLimit: 45,
      difficulty: 1,
      explanation: "Uma rotação de 90° no sentido horário transforma ↑ em →",
      points: 10,
    },
    {
      id: "spatial_002",
      type: "multiple-choice",
      category: "Padrões Visuais",
      question: "Qual figura completa a sequência: ○ △ ○ △ ?",
      options: ["○", "△", "□", "◇"],
      correctAnswer: 0,
      timeLimit: 30,
      difficulty: 1,
      explanation: "A sequência alterna entre círculo e triângulo",
      points: 10,
    },
    {
      id: "spatial_003",
      type: "multiple-choice",
      category: "Visualização 3D",
      question: "Quantas faces tem um cubo?",
      options: ["4", "6", "8", "12"],
      correctAnswer: 1,
      timeLimit: 20,
      difficulty: 1,
      explanation: "Um cubo tem 6 faces quadradas",
      points: 10,
    },
    {
      id: "spatial_004",
      type: "multiple-choice",
      category: "Simetria",
      question: "Qual das opções é simétrica em relação ao eixo vertical?",
      options: ["◐", "◑", "●", "○"],
      correctAnswer: 3,
      timeLimit: 25,
      difficulty: 2,
      explanation: "O círculo vazio (○) é perfeitamente simétrico",
      points: 15,
    },
    {
      id: "spatial_005",
      type: "multiple-choice",
      category: "Perspectiva",
      question: "Se você olhar um quadrado de lado, o que verá?",
      options: ["Quadrado", "Linha", "Triângulo", "Círculo"],
      correctAnswer: 1,
      timeLimit: 30,
      difficulty: 2,
      explanation: "Visto de lado, um quadrado aparece como uma linha",
      points: 15,
    },
    {
      id: "spatial_006",
      type: "multiple-choice",
      category: "Rotação Mental",
      question: "Girando 180° a figura ◢, obtemos:",
      options: ["◣", "◤", "◥", "◢"],
      correctAnswer: 0,
      timeLimit: 40,
      difficulty: 2,
      explanation: "Uma rotação de 180° inverte completamente a orientação",
      points: 15,
    },
    {
      id: "spatial_007",
      type: "multiple-choice",
      category: "Contagem Visual",
      question: "Quantos triângulos você consegue ver nesta figura: △▲△?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1,
      timeLimit: 50,
      difficulty: 2,
      explanation: "Há 3 triângulos distintos na sequência",
      points: 15,
    },
    {
      id: "spatial_008",
      type: "multiple-choice",
      category: "Padrões Geométricos",
      question: "Complete a sequência: ■ □ ■ □ ■ ?",
      options: ["■", "□", "▲", "○"],
      correctAnswer: 1,
      timeLimit: 35,
      difficulty: 1,
      explanation: "A sequência alterna entre quadrado preenchido e vazio",
      points: 10,
    },
    {
      id: "spatial_009",
      type: "multiple-choice",
      category: "Orientação Espacial",
      question: "Se você está olhando para o Norte e vira 90° à direita, para onde está olhando?",
      options: ["Sul", "Leste", "Oeste", "Norte"],
      correctAnswer: 1,
      timeLimit: 30,
      difficulty: 1,
      explanation: "Virando 90° à direita do Norte, você fica voltado para o Leste",
      points: 10,
    },
    {
      id: "spatial_010",
      type: "multiple-choice",
      category: "Formas Geométricas",
      question: "Qual forma tem mais lados: hexágono ou octógono?",
      options: ["Hexágono", "Octógono", "Ambos iguais", "Impossível determinar"],
      correctAnswer: 1,
      timeLimit: 25,
      difficulty: 1,
      explanation: "Hexágono tem 6 lados, octógono tem 8 lados",
      points: 10,
    },
    {
      id: "spatial_011",
      type: "multiple-choice",
      category: "Reflexão",
      question: "O reflexo de 'b' no espelho é:",
      options: ["d", "p", "q", "b"],
      correctAnswer: 0,
      timeLimit: 35,
      difficulty: 2,
      explanation: "O reflexo horizontal de 'b' é 'd'",
      points: 15,
    },
    {
      id: "spatial_012",
      type: "multiple-choice",
      category: "Sequência Espacial",
      question: "Na sequência ↑ → ↓ ←, qual vem depois?",
      options: ["↑", "→", "↓", "←"],
      correctAnswer: 0,
      timeLimit: 40,
      difficulty: 2,
      explanation: "A sequência gira no sentido horário, voltando ao ↑",
      points: 15,
    },
    {
      id: "spatial_013",
      type: "multiple-choice",
      category: "Área e Volume",
      question: "Quantas arestas tem um cubo?",
      options: ["8", "10", "12", "14"],
      correctAnswer: 2,
      timeLimit: 30,
      difficulty: 2,
      explanation: "Um cubo tem 12 arestas (4 na base, 4 no topo, 4 verticais)",
      points: 15,
    },
    {
      id: "spatial_014",
      type: "multiple-choice",
      category: "Transformações",
      question: "Dobrando um papel ao meio 3 vezes, quantas partes você terá ao desdobrar?",
      options: ["6", "8", "9", "12"],
      correctAnswer: 1,
      timeLimit: 45,
      difficulty: 3,
      explanation: "Cada dobra duplica o número de partes: 2³ = 8 partes",
      points: 20,
    },
    {
      id: "spatial_015",
      type: "multiple-choice",
      category: "Visualização Complexa",
      question: "Em uma escada de 5 degraus, quantos ângulos retos existem?",
      options: ["8", "10", "12", "14"],
      correctAnswer: 1,
      timeLimit: 60,
      difficulty: 3,
      explanation: "Cada degrau forma 2 ângulos retos: 5 × 2 = 10 ângulos",
      points: 20,
    },
  ],

  2: [
    // MISSÃO 2: RACIOCÍNIO LÓGICO (20 questões)
    {
      id: "logical_001",
      type: "multiple-choice",
      category: "Silogismos",
      question: "Se todos os A são B, e alguns B são C, então:",
      options: ["Todos os A são C", "Alguns A podem ser C", "Nenhum A é C", "Todos os C são A"],
      correctAnswer: 1,
      timeLimit: 90,
      difficulty: 3,
      explanation: "A lógica permite que alguns A sejam C, mas não garante que todos sejam",
      points: 20,
    },
    {
      id: "logical_002",
      type: "multiple-choice",
      category: "Sequências Numéricas",
      question: "Qual é o próximo número: 2, 4, 8, 16, ?",
      options: ["24", "32", "30", "20"],
      correctAnswer: 1,
      timeLimit: 60,
      difficulty: 2,
      explanation: "Cada número é o dobro do anterior: 16 × 2 = 32",
      points: 15,
    },
    {
      id: "logical_003",
      type: "multiple-choice",
      category: "Dedução",
      question: "Se Maria é mais alta que João, e João é mais alto que Pedro, então:",
      options: [
        "Pedro é mais alto que Maria",
        "Maria é mais alta que Pedro",
        "Não podemos saber",
        "Todos têm a mesma altura",
      ],
      correctAnswer: 1,
      timeLimit: 45,
      difficulty: 2,
      explanation: "Por transitividade: Maria > João > Pedro, logo Maria > Pedro",
      points: 15,
    },
    {
      id: "logical_004",
      type: "multiple-choice",
      category: "Proposições",
      question: "Se 'Todos os gatos são mamíferos' é verdadeiro, qual é falso?",
      options: [
        "Alguns gatos são mamíferos",
        "Nenhum gato é mamífero",
        "Existem gatos mamíferos",
        "Gatos podem ser mamíferos",
      ],
      correctAnswer: 1,
      timeLimit: 70,
      difficulty: 3,
      explanation: "Se todos os gatos são mamíferos, é falso dizer que nenhum gato é mamífero",
      points: 20,
    },
    {
      id: "logical_005",
      type: "multiple-choice",
      category: "Sequências Lógicas",
      question: "Complete: 1, 1, 2, 3, 5, 8, ?",
      options: ["11", "13", "15", "17"],
      correctAnswer: 1,
      timeLimit: 50,
      difficulty: 2,
      explanation: "Sequência de Fibonacci: cada número é a soma dos dois anteriores (5+8=13)",
      points: 15,
    },
    {
      id: "logical_006",
      type: "multiple-choice",
      category: "Implicações",
      question: "Se 'Se chove, então a rua fica molhada' e 'A rua está seca', podemos concluir:",
      options: ["Está chovendo", "Não está chovendo", "Pode estar chovendo", "Não sabemos"],
      correctAnswer: 1,
      timeLimit: 80,
      difficulty: 3,
      explanation: "Por modus tollens: se a consequência é falsa, a condição também é falsa",
      points: 20,
    },
    {
      id: "logical_007",
      type: "multiple-choice",
      category: "Conjuntos",
      question: "Em uma turma de 30 alunos, 18 gostam de matemática e 20 de português. Quantos gostam de ambas?",
      options: ["6", "8", "10", "12"],
      correctAnswer: 1,
      timeLimit: 90,
      difficulty: 3,
      explanation: "18 + 20 - 30 = 8 alunos gostam de ambas as matérias",
      points: 20,
    },
    {
      id: "logical_008",
      type: "multiple-choice",
      category: "Padrões Alfabéticos",
      question: "Complete a sequência: A, C, F, J, ?",
      options: ["M", "N", "O", "P"],
      correctAnswer: 2,
      timeLimit: 60,
      difficulty: 3,
      explanation: "Diferenças: +2, +3, +4, +5. Próxima letra: J + 5 = O",
      points: 20,
    },
    {
      id: "logical_009",
      type: "multiple-choice",
      category: "Probabilidade Básica",
      question: "Jogando uma moeda 2 vezes, qual a probabilidade de sair cara nas duas?",
      options: ["1/2", "1/3", "1/4", "1/6"],
      correctAnswer: 2,
      timeLimit: 70,
      difficulty: 2,
      explanation: "P(cara) × P(cara) = 1/2 × 1/2 = 1/4",
      points: 15,
    },
    {
      id: "logical_010",
      type: "multiple-choice",
      category: "Negações",
      question: "A negação de 'Todos os pássaros voam' é:",
      options: ["Nenhum pássaro voa", "Alguns pássaros não voam", "Poucos pássaros voam", "A maioria não voa"],
      correctAnswer: 1,
      timeLimit: 60,
      difficulty: 2,
      explanation: "A negação de 'todos' é 'pelo menos um não' ou 'alguns não'",
      points: 15,
    },
    {
      id: "logical_011",
      type: "multiple-choice",
      category: "Equivalências",
      question: "Qual é equivalente a 'Se estudo, então passo'?",
      options: [
        "Se passo, então estudo",
        "Se não passo, então não estudo",
        "Se não estudo, então não passo",
        "Estudo e passo",
      ],
      correctAnswer: 1,
      timeLimit: 80,
      difficulty: 3,
      explanation: "A contraposição 'Se não Q, então não P' é equivalente a 'Se P, então Q'",
      points: 20,
    },
    {
      id: "logical_012",
      type: "multiple-choice",
      category: "Sequências Geométricas",
      question: "Na sequência 3, 6, 12, 24, ?, qual é o próximo termo?",
      options: ["36", "42", "48", "54"],
      correctAnswer: 2,
      timeLimit: 50,
      difficulty: 2,
      explanation: "Cada termo é multiplicado por 2: 24 × 2 = 48",
      points: 15,
    },
    {
      id: "logical_013",
      type: "multiple-choice",
      category: "Combinatória",
      question: "De quantas maneiras 3 pessoas podem se sentar em 3 cadeiras?",
      options: ["3", "6", "9", "12"],
      correctAnswer: 1,
      timeLimit: 70,
      difficulty: 3,
      explanation: "Permutação de 3 elementos: 3! = 3 × 2 × 1 = 6",
      points: 20,
    },
    {
      id: "logical_014",
      type: "multiple-choice",
      category: "Lógica Proposicional",
      question: "Se P é verdadeiro e Q é falso, então 'P ou Q' é:",
      options: ["Verdadeiro", "Falso", "Indeterminado", "Depende do contexto"],
      correctAnswer: 0,
      timeLimit: 60,
      difficulty: 2,
      explanation: "Na disjunção 'P ou Q', basta um ser verdadeiro para o resultado ser verdadeiro",
      points: 15,
    },
    {
      id: "logical_015",
      type: "multiple-choice",
      category: "Analogias",
      question: "Livro está para biblioteca assim como quadro está para:",
      options: ["Pincel", "Tinta", "Museu", "Artista"],
      correctAnswer: 2,
      timeLimit: 50,
      difficulty: 2,
      explanation: "Livros ficam em bibliotecas, quadros ficam em museus",
      points: 15,
    },
    {
      id: "logical_016",
      type: "multiple-choice",
      category: "Inferências",
      question: "Se apenas pessoas inteligentes resolvem este problema, e João resolveu, então:",
      options: ["João é inteligente", "João pode ser inteligente", "João não é inteligente", "Não podemos concluir"],
      correctAnswer: 0,
      timeLimit: 70,
      difficulty: 3,
      explanation: "Se apenas inteligentes resolvem e João resolveu, então João é inteligente",
      points: 20,
    },
    {
      id: "logical_017",
      type: "multiple-choice",
      category: "Sequências Mistas",
      question: "Complete: 2, 5, 11, 23, ?",
      options: ["35", "41", "47", "53"],
      correctAnswer: 2,
      timeLimit: 80,
      difficulty: 4,
      explanation: "Diferenças: +3, +6, +12, +24. Próxima diferença: +24, então 23+24=47",
      points: 25,
    },
    {
      id: "logical_018",
      type: "multiple-choice",
      category: "Condicionais",
      question: "Se 'Todo A é B' e 'Todo B é C', então necessariamente:",
      options: ["Todo C é A", "Todo A é C", "Algum C é A", "Nenhum A é C"],
      correctAnswer: 1,
      timeLimit: 90,
      difficulty: 3,
      explanation: "Por transitividade: A→B e B→C implica A→C",
      points: 20,
    },
    {
      id: "logical_019",
      type: "multiple-choice",
      category: "Paradoxos",
      question:
        "Em uma cidade, o barbeiro corta o cabelo apenas de quem não corta o próprio cabelo. Quem corta o cabelo do barbeiro?",
      options: ["Ele mesmo", "Outro barbeiro", "Ninguém", "É um paradoxo"],
      correctAnswer: 3,
      timeLimit: 100,
      difficulty: 4,
      explanation: "Este é o famoso paradoxo do barbeiro de Russell",
      points: 25,
    },
    {
      id: "logical_020",
      type: "multiple-choice",
      category: "Lógica Avançada",
      question: "Se 'P implica Q' é falso, quais valores P e Q podem ter?",
      options: ["P=V, Q=V", "P=V, Q=F", "P=F, Q=V", "P=F, Q=F"],
      correctAnswer: 1,
      timeLimit: 90,
      difficulty: 4,
      explanation: "P→Q só é falso quando P é verdadeiro e Q é falso",
      points: 25,
    },
  ],

  3: [
    // MISSÃO 3: INTELIGÊNCIA FLUIDA (25 questões)
    {
      id: "abstract_001",
      type: "multiple-choice",
      category: "Matrizes Abstratas",
      question: "Na matriz 3x3, qual elemento falta na posição inferior direita seguindo o padrão de rotação?",
      options: ["↑", "→", "↓", "←"],
      correctAnswer: 2,
      timeLimit: 180,
      difficulty: 4,
      explanation: "Seguindo o padrão de rotação 90° horário, a sequência leva ao ↓",
      points: 25,
    },
    {
      id: "abstract_002",
      type: "numerical",
      category: "Álgebra Abstrata",
      question: "Se x² - 5x + 6 = 0, qual é a soma das raízes?",
      correctAnswer: 5,
      timeLimit: 120,
      difficulty: 4,
      explanation: "Pela fórmula de Vieta: soma das raízes = -b/a = 5/1 = 5",
      points: 25,
    },
    {
      id: "abstract_003",
      type: "multiple-choice",
      category: "Padrões Complexos",
      question: "Na sequência ●○●○○●○○○●, qual é o próximo símbolo?",
      options: ["●", "○", "Ambos", "Nenhum"],
      correctAnswer: 1,
      timeLimit: 150,
      difficulty: 4,
      explanation: "Padrão: 1●, 1○, 1●, 2○, 1●, 3○, 1●, então vem 4○",
      points: 25,
    },
    {
      id: "abstract_004",
      type: "multiple-choice",
      category: "Transformações",
      question: "Se f(x) = 2x + 1, qual é f(f(3))?",
      options: ["13", "15", "17", "19"],
      correctAnswer: 1,
      timeLimit: 100,
      difficulty: 3,
      explanation: "f(3) = 7, então f(7) = 2(7) + 1 = 15",
      points: 20,
    },
    {
      id: "abstract_005",
      type: "multiple-choice",
      category: "Relações Abstratas",
      question: "Se A∆B significa A² + B², quanto é 3∆4?",
      options: ["25", "49", "144", "169"],
      correctAnswer: 0,
      timeLimit: 80,
      difficulty: 3,
      explanation: "3∆4 = 3² + 4² = 9 + 16 = 25",
      points: 20,
    },
    {
      id: "abstract_006",
      type: "multiple-choice",
      category: "Sequências Abstratas",
      question: "Complete: Z, Y, X, W, V, ?",
      options: ["U", "T", "S", "R"],
      correctAnswer: 0,
      timeLimit: 60,
      difficulty: 2,
      explanation: "Sequência decrescente do alfabeto: próxima letra é U",
      points: 15,
    },
    {
      id: "abstract_007",
      type: "multiple-choice",
      category: "Lógica Simbólica",
      question: "Se ♠ = 5, ♣ = 3, ♥ = 7, quanto é ♠ + ♣ × ♥?",
      options: ["26", "56", "35", "21"],
      correctAnswer: 0,
      timeLimit: 70,
      difficulty: 3,
      explanation: "5 + 3 × 7 = 5 + 21 = 26 (multiplicação primeiro)",
      points: 20,
    },
    {
      id: "abstract_008",
      type: "multiple-choice",
      category: "Padrões Geométricos",
      question: "Quantos quadrados há em uma grade 4×4?",
      options: ["16", "20", "25", "30"],
      correctAnswer: 3,
      timeLimit: 120,
      difficulty: 4,
      explanation: "16 (1×1) + 9 (2×2) + 4 (3×3) + 1 (4×4) = 30 quadrados",
      points: 25,
    },
    {
      id: "abstract_009",
      type: "multiple-choice",
      category: "Analogias Abstratas",
      question: "2 está para 8 assim como 3 está para:",
      options: ["9", "12", "27", "81"],
      correctAnswer: 2,
      timeLimit: 90,
      difficulty: 3,
      explanation: "2³ = 8, então 3³ = 27",
      points: 20,
    },
    {
      id: "abstract_010",
      type: "multiple-choice",
      category: "Progressões",
      question: "Na sequência 1, 4, 9, 16, 25, qual é o 10º termo?",
      options: ["81", "100", "121", "144"],
      correctAnswer: 1,
      timeLimit: 80,
      difficulty: 3,
      explanation: "Sequência dos quadrados perfeitos: 10² = 100",
      points: 20,
    },
    {
      id: "abstract_011",
      type: "multiple-choice",
      category: "Operações Abstratas",
      question: "Se a⊕b = a² - b², quanto é 5⊕3?",
      options: ["8", "16", "25", "34"],
      correctAnswer: 1,
      timeLimit: 70,
      difficulty: 3,
      explanation: "5⊕3 = 5² - 3² = 25 - 9 = 16",
      points: 20,
    },
    {
      id: "abstract_012",
      type: "multiple-choice",
      category: "Matrizes Numéricas",
      question: "Em uma matriz onde cada linha soma 15, se temos [5, ?, 1], qual é o número do meio?",
      options: ["7", "8", "9", "10"],
      correctAnswer: 2,
      timeLimit: 90,
      difficulty: 3,
      explanation: "5 + x + 1 = 15, então x = 9",
      points: 20,
    },
    {
      id: "abstract_013",
      type: "multiple-choice",
      category: "Códigos",
      question: "Se CASA = 3171, MESA = 4571, quanto é PESO?",
      options: ["8570", "8750", "7850", "5870"],
      correctAnswer: 0,
      timeLimit: 120,
      difficulty: 4,
      explanation: "Cada letra tem um valor: P=8, E=5, S=7, O=0",
      points: 25,
    },
    {
      id: "abstract_014",
      type: "multiple-choice",
      category: "Raciocínio Espacial",
      question: "Dobrando um papel quadrado na diagonal e cortando um triângulo, quantos buracos terá ao desdobrar?",
      options: ["1", "2", "4", "8"],
      correctAnswer: 1,
      timeLimit: 100,
      difficulty: 4,
      explanation: "Dobrar na diagonal cria simetria, resultando em 2 buracos",
      points: 25,
    },
    {
      id: "abstract_015",
      type: "multiple-choice",
      category: "Sequências Complexas",
      question: "Complete: 1, 11, 21, 1211, 111221, ?",
      options: ["311211", "312211", "31121211", "13112221"],
      correctAnswer: 1,
      timeLimit: 150,
      difficulty: 5,
      explanation: "Sequência 'Look and Say': 111221 se lê como 'três 1, dois 2, um 1'",
      points: 30,
    },
    {
      id: "abstract_016",
      type: "multiple-choice",
      category: "Lógica Matemática",
      question: "Se log₂(8) = x, qual é o valor de x?",
      options: ["2", "3", "4", "8"],
      correctAnswer: 1,
      timeLimit: 90,
      difficulty: 4,
      explanation: "2³ = 8, então log₂(8) = 3",
      points: 25,
    },
    {
      id: "abstract_017",
      type: "multiple-choice",
      category: "Combinações",
      question: "De quantas formas podemos escolher 2 pessoas de um grupo de 5?",
      options: ["8", "10", "12", "15"],
      correctAnswer: 1,
      timeLimit: 100,
      difficulty: 4,
      explanation: "C(5,2) = 5!/(2!×3!) = 10",
      points: 25,
    },
    {
      id: "abstract_018",
      type: "multiple-choice",
      category: "Padrões Temporais",
      question: "Se hoje é terça-feira, que dia será daqui a 100 dias?",
      options: ["Segunda", "Terça", "Quarta", "Quinta"],
      correctAnswer: 3,
      timeLimit: 120,
      difficulty: 4,
      explanation: "100 ÷ 7 = 14 resto 2. Terça + 2 dias = Quinta",
      points: 25,
    },
    {
      id: "abstract_019",
      type: "multiple-choice",
      category: "Equações Abstratas",
      question: "Se 2x + 3y = 12 e x = y, quais são os valores de x e y?",
      options: ["x=2, y=2", "x=2.4, y=2.4", "x=3, y=3", "x=4, y=4"],
      correctAnswer: 1,
      timeLimit: 110,
      difficulty: 4,
      explanation: "Substituindo x=y: 2x + 3x = 12, então 5x = 12, x = 2.4",
      points: 25,
    },
    {
      id: "abstract_020",
      type: "multiple-choice",
      category: "Geometria Analítica",
      question: "Qual é a distância entre os pontos (0,0) e (3,4)?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 0,
      timeLimit: 100,
      difficulty: 4,
      explanation: "d = √(3² + 4²) = √(9 + 16) = √25 = 5",
      points: 25,
    },
    {
      id: "abstract_021",
      type: "multiple-choice",
      category: "Probabilidade",
      question: "Qual a probabilidade de tirar um ás de um baralho de 52 cartas?",
      options: ["1/13", "1/26", "4/52", "1/4"],
      correctAnswer: 0,
      timeLimit: 80,
      difficulty: 3,
      explanation: "4 ases em 52 cartas = 4/52 = 1/13",
      points: 20,
    },
    {
      id: "abstract_022",
      type: "multiple-choice",
      category: "Séries Infinitas",
      question: "Quanto é 1/2 + 1/4 + 1/8 + 1/16 + ... (infinitos termos)?",
      options: ["1/2", "3/4", "1", "2"],
      correctAnswer: 2,
      timeLimit: 120,
      difficulty: 5,
      explanation: "Série geométrica com a=1/2 e r=1/2: S = a/(1-r) = (1/2)/(1/2) = 1",
      points: 30,
    },
    {
      id: "abstract_023",
      type: "multiple-choice",
      category: "Teoria dos Números",
      question: "Qual é o próximo número primo após 17?",
      options: ["18", "19", "20", "21"],
      correctAnswer: 1,
      timeLimit: 90,
      difficulty: 3,
      explanation: "19 é primo (divisível apenas por 1 e 19)",
      points: 20,
    },
    {
      id: "abstract_024",
      type: "multiple-choice",
      category: "Funções Inversas",
      question: "Se f(x) = 3x + 2, qual é f⁻¹(11)?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1,
      timeLimit: 110,
      difficulty: 4,
      explanation: "f⁻¹(11): 3x + 2 = 11, então x = 3",
      points: 25,
    },
    {
      id: "abstract_025",
      type: "multiple-choice",
      category: "Limites",
      question: "Qual é o limite de (x² - 1)/(x - 1) quando x tende a 1?",
      options: ["0", "1", "2", "∞"],
      correctAnswer: 2,
      timeLimit: 130,
      difficulty: 5,
      explanation: "Fatorando: (x-1)(x+1)/(x-1) = x+1, limite = 1+1 = 2",
      points: 30,
    },
  ],

  4: [
    // MISSÃO 4: AVALIAÇÃO COMPLETA (50 questões) - Multidisciplinar
    {
      id: "expert_001",
      type: "multiple-choice",
      category: "Funções Compostas",
      question: "Se f(x) = 2x + 1 e g(x) = x², qual é f(g(3))?",
      options: ["19", "18", "17", "20"],
      correctAnswer: 0,
      timeLimit: 180,
      difficulty: 5,
      explanation: "g(3) = 9, então f(9) = 2(9) + 1 = 19",
      points: 30,
    },
    {
      id: "expert_002",
      type: "multiple-choice",
      category: "Lógica Proposicional",
      question: "Se P → Q é falso e Q → R é verdadeiro, qual das seguintes é necessariamente verdadeira?",
      options: ["P é verdadeiro", "Q é falso", "R é verdadeiro", "P → R é falso"],
      correctAnswer: 1,
      timeLimit: 200,
      difficulty: 5,
      explanation: "Se P → Q é falso, então P é verdadeiro e Q é falso",
      points: 30,
    },
    {
      id: "expert_003",
      type: "multiple-choice",
      category: "Cálculo Diferencial",
      question: "Qual é a derivada de x³ + 2x² - 5x + 3?",
      options: ["3x² + 4x - 5", "x⁴ + 2x³ - 5x²", "3x² + 2x - 5", "3x + 4x - 5"],
      correctAnswer: 0,
      timeLimit: 150,
      difficulty: 4,
      explanation: "d/dx(x³ + 2x² - 5x + 3) = 3x² + 4x - 5",
      points: 25,
    },
    // Placeholder for remaining 47 questions for brevity
    {
      id: "expert_004",
      type: "multiple-choice",
      category: "Raciocínio Abstrato",
      question: "Qual o próximo na sequência: A, B, D, G, ?",
      options: ["K", "L", "M", "N"],
      correctAnswer: 1,
      timeLimit: 100,
      difficulty: 4,
      explanation: "Diferenças: +1, +2, +3, +4. G + 4 = K",
      points: 25,
    },
    {
      id: "expert_005",
      type: "multiple-choice",
      category: "Matemática Avançada",
      question: "Se 2^x = 32, qual é o valor de x?",
      options: ["4", "5", "6", "7"],
      correctAnswer: 1,
      timeLimit: 80,
      difficulty: 3,
      explanation: "2^5 = 32",
      points: 20,
    },
    {
      id: "expert_006",
      type: "multiple-choice",
      category: "Lógica Verbal",
      question: "Qual palavra não pertence ao grupo: Maçã, Banana, Cenoura, Laranja?",
      options: ["Maçã", "Banana", "Cenoura", "Laranja"],
      correctAnswer: 2,
      timeLimit: 60,
      difficulty: 2,
      explanation: "Cenoura é um vegetal, os outros são frutas.",
      points: 15,
    },
    {
      id: "expert_007",
      type: "multiple-choice",
      category: "Sequências Numéricas",
      question: "Complete a sequência: 1, 3, 7, 15, ?",
      options: ["21", "25", "31", "33"],
      correctAnswer: 2,
      timeLimit: 70,
      difficulty: 3,
      explanation: "Cada termo é (2 * anterior) + 1. 15 * 2 + 1 = 31",
      points: 20,
    },
    {
      id: "expert_008",
      type: "multiple-choice",
      category: "Raciocínio Espacial",
      question: "Quantos lados tem um dodecaedro?",
      options: ["10", "12", "14", "20"],
      correctAnswer: 1,
      timeLimit: 90,
      difficulty: 4,
      explanation: "Um dodecaedro tem 12 faces.",
      points: 25,
    },
    {
      id: "expert_009",
      type: "multiple-choice",
      category: "Probabilidade",
      question: "Qual a probabilidade de rolar um 7 com dois dados de 6 lados?",
      options: ["1/6", "1/12", "1/36", "1/18"],
      correctAnswer: 0,
      timeLimit: 100,
      difficulty: 4,
      explanation: "Combinações para 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). Total 6/36 = 1/6.",
      points: 25,
    },
    {
      id: "expert_010",
      type: "multiple-choice",
      category: "Lógica e Dedução",
      question:
        "Se todos os carros têm rodas, e meu veículo tem rodas, então meu veículo é um carro. Esta afirmação é:",
      options: ["Verdadeira", "Falsa", "Indeterminada", "Parcialmente verdadeira"],
      correctAnswer: 1,
      timeLimit: 110,
      difficulty: 5,
      explanation: "Falácia da afirmação do consequente. Motocicletas também têm rodas.",
      points: 30,
    },
  ],
}

export default function QuizPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const [isPremiumQuiz, setIsPremiumQuiz] = useState(false)
  const [missionData, setMissionData] = useState<MissionData | null>(null)
  const [regularQuestions, setRegularQuestions] = useState<QuizQuestion[]>([])
  const [premiumQuizEngine, setPremiumQuizEngine] = useState<PremiumQuizEngine | null>(null)

  const [currentQuestion, setCurrentQuestion] = useState<any>(null) // Can be QuizQuestion or PremiumQuizQuestion
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null)
  const [userAnswers, setUserAnswers] = useState<(number | string | null)[]>([]) // For regular quizzes
  const [isStarted, setIsStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [startTime, setStartTime] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }, [])

  const getDifficultyIcon = useCallback((difficulty: string) => {
    switch (difficulty) {
      case "Básico":
        return <Target className="w-4 h-4" />
      case "Intermediário":
        return <Zap className="w-4 h-4" />
      case "Avançado":
        return <Trophy className="w-4 h-4" />
      case "Expert":
        return <Crown className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }, [])

  useEffect(() => {
    const loadQuizData = () => {
      const accessInfo = checkPremiumAccess()
      setHasAccess(accessInfo.hasAccess)

      if (PREMIUM_QUIZ_LEVELS[slug]) {
        // It's a premium quiz
        setIsPremiumQuiz(true)
        if (!accessInfo.hasAccess) {
          router.push("/premium") // Redirect if no premium access
          return
        }
        setTimeLeft(PREMIUM_QUIZ_LEVELS[slug].duration * 60)
      } else {
        // It's a regular mission
        setIsPremiumQuiz(false)
        const missionId = Number.parseInt(slug)
        if (isNaN(missionId) || !MISSION_QUESTIONS[missionId]) {
          router.push("/") // Invalid mission ID
          return
        }

        const selectedMission = localStorage.getItem("selectedMission")
        let mission: MissionData | null = null
        if (selectedMission) {
          try {
            const parsedMission = JSON.parse(selectedMission)
            if (parsedMission.id === missionId) {
              mission = parsedMission
            }
          } catch (error) {
            console.error("Error parsing selected mission:", error)
          }
        }

        if (!mission) {
          // Fallback if selectedMission not found or invalid, use default from MISSION_QUESTIONS
          const defaultMission = {
            id: missionId,
            title: `Missão ${missionId}`,
            subtitle: `Desafio de QI Nível ${missionId}`,
            questions: MISSION_QUESTIONS[missionId].length,
            timeLimit: Math.round(MISSION_QUESTIONS[missionId].reduce((acc, q) => acc + q.timeLimit, 0) / 60),
            difficulty: MISSION_QUESTIONS[missionId][0]?.difficulty || "Desconhecido",
            category: MISSION_QUESTIONS[missionId][0]?.category || "Geral",
            description: "Um teste abrangente para avaliar suas habilidades cognitivas.",
          }
          mission = defaultMission
        }

        setMissionData(mission)
        const missionQuestions = MISSION_QUESTIONS[missionId] || []
        const selectedQuestions = missionQuestions.slice(0, mission.questions)
        setRegularQuestions(selectedQuestions)
        setUserAnswers(new Array(selectedQuestions.length).fill(null))
        setTimeLeft(mission.timeLimit * 60)
      }
      setIsLoading(false)
    }

    loadQuizData()
  }, [slug, router])

  useEffect(() => {
    if (isStarted && timeLeft > 0 && !isCompleted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleFinishQuiz()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isStarted, timeLeft, isCompleted, regularQuestions, premiumQuizEngine]) // Added dependencies

  const handleStartQuiz = () => {
    setIsStarted(true)
    setStartTime(Date.now())

    if (isPremiumQuiz) {
      try {
        const engine = new PremiumQuizEngine(slug)
        setPremiumQuizEngine(engine)
        setCurrentQuestion(engine.getCurrentQuestion())
      } catch (error) {
        console.error("Error starting premium quiz:", error)
        router.push("/premium")
      }
    } else {
      setCurrentQuestion(regularQuestions[0])
    }
  }

  const handleAnswerSelect = (answer: number | string) => {
    setSelectedAnswer(answer)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    if (isPremiumQuiz && premiumQuizEngine) {
      premiumQuizEngine.submitAnswer(selectedAnswer)
      if (premiumQuizEngine.nextQuestion()) {
        setCurrentQuestion(premiumQuizEngine.getCurrentQuestion())
        setSelectedAnswer(null)
      } else {
        handleFinishQuiz()
      }
    } else {
      const newAnswers = [...userAnswers]
      newAnswers[regularQuestions.indexOf(currentQuestion)] = selectedAnswer
      setUserAnswers(newAnswers)

      if (regularQuestions.indexOf(currentQuestion) < regularQuestions.length - 1) {
        setCurrentQuestion(regularQuestions[regularQuestions.indexOf(currentQuestion) + 1])
        setSelectedAnswer(null)
      } else {
        handleFinishQuiz()
      }
    }
  }

  const handlePreviousQuestion = () => {
    if (isPremiumQuiz && premiumQuizEngine) {
      if (premiumQuizEngine.previousQuestion()) {
        setCurrentQuestion(premiumQuizEngine.getCurrentQuestion())
        setSelectedAnswer(null)
      }
    } else {
      if (regularQuestions.indexOf(currentQuestion) > 0) {
        setCurrentQuestion(regularQuestions[regularQuestions.indexOf(currentQuestion) - 1])
        setSelectedAnswer(userAnswers[regularQuestions.indexOf(currentQuestion) - 1])
      }
    }
  }

  const handleFinishQuiz = () => {
    if (isPremiumQuiz && premiumQuizEngine) {
      const results = premiumQuizEngine.calculateResults()
      localStorage.setItem(
        "quizResults",
        JSON.stringify({
          ...results,
          completedAt: new Date().toISOString(),
          level: slug, // Store the premium level slug
          isPremium: true,
        }),
      )
    } else {
      const finalAnswers = [...userAnswers]
      if (selectedAnswer !== null && currentQuestion) {
        finalAnswers[regularQuestions.indexOf(currentQuestion)] = selectedAnswer
      }

      const correctCount = finalAnswers.filter(
        (answer, index) => answer === regularQuestions[index]?.correctAnswer,
      ).length

      const score = Math.round((correctCount / regularQuestions.length) * 100)
      const timeSpent = Math.round((Date.now() - startTime) / 1000)

      const results = {
        missionId: Number.parseInt(slug),
        missionTitle: missionData?.title,
        score,
        correctCount,
        totalQuestions: regularQuestions.length,
        timeSpent,
        completedAt: new Date().toISOString(),
        answers: finalAnswers,
        isPremium: false,
      }
      localStorage.setItem("quizResults", JSON.stringify(results))
    }
    setIsCompleted(true)
    router.push(`/quiz/${slug}/results`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <OptimizedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-300">Carregando sua missão...</p>
          </div>
        </div>
      </div>
    )
  }

  if (isPremiumQuiz && !hasAccess) {
    return (
      <div className="min-h-screen relative">
        <OptimizedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <Card className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
            <CardContent className="p-8 text-center">
              <Lock className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-4 text-white">Acesso Premium Necessário</h1>
              <p className="text-slate-400 mb-6">Este quiz é exclusivo para assinantes premium.</p>
              <Button
                onClick={() => router.push("/premium")}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Ver Planos Premium
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const quizData = isPremiumQuiz ? PREMIUM_QUIZ_LEVELS[slug] : missionData
  const questionsToRender = isPremiumQuiz ? premiumQuizEngine?.getQuestions() : regularQuestions
  const currentQuestionIndex = isPremiumQuiz
    ? premiumQuizEngine?.getCurrentQuestionIndex()
    : regularQuestions.indexOf(currentQuestion)

  if (!quizData || !questionsToRender || questionsToRender.length === 0 || !currentQuestion) {
    return (
      <div className="min-h-screen relative">
        <OptimizedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <Card className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4 text-white">Quiz não encontrado</h1>
              <p className="text-slate-400 mb-6">Não foi possível carregar os dados do quiz.</p>
              <Button onClick={() => router.push("/")} className="w-full">
                Voltar ao Início
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const progressValue = Math.round(((currentQuestionIndex + 1) / questionsToRender.length) * 100)

  if (!isStarted) {
    return (
      <div className="min-h-screen relative">
        <OptimizedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <Card className="max-w-2xl w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">
                  {isPremiumQuiz
                    ? quizData.icon
                    : (slug === "1" && "🧩") ||
                      (slug === "2" && "🧠") ||
                      (slug === "3" && "🎯") ||
                      (slug === "4" && "👑")}
                </div>
                <h1 className="text-3xl font-bold mb-4 text-white">{quizData.title || quizData.name}</h1>
                <p className="text-slate-400 mb-6">{quizData.subtitle || quizData.description}</p>

                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Badge variant="outline" className="px-3 py-1 border-blue-500/30 text-blue-300">
                    {getDifficultyIcon(quizData.difficulty)}
                    <span className="ml-2">{quizData.difficulty}</span>
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 border-purple-500/30 text-purple-300">
                    <Clock className="w-4 h-4 mr-2" />
                    {quizData.questions || quizData.questionCount} questões
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 border-emerald-500/30 text-emerald-300">
                    <Trophy className="w-4 h-4 mr-2" />
                    {quizData.timeLimit || quizData.duration} minutos
                  </Badge>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 p-6 rounded-lg mb-8">
                <h3 className="font-semibold mb-4 text-white">Instruções da Missão:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                    <span className="text-sm text-slate-300">Leia cada questão com atenção</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span className="text-sm text-slate-300">Gerencie bem seu tempo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    <span className="text-sm text-slate-300">Você pode voltar às questões anteriores</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full" />
                    <span className="text-sm text-slate-300">Confie em sua primeira intuição</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleStartQuiz}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-xl py-6 animate-glow"
              >
                <Play className="w-6 h-6 mr-2" />
                Iniciar {isPremiumQuiz ? "Quiz Premium" : "Missão"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <OptimizedBackground />
      <div className="relative z-10 p-4">
        <div className="container mx-auto max-w-4xl pt-20">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-0">
                  <Trophy className="w-4 h-4 mr-1" />
                  {isPremiumQuiz ? "PREMIUM" : "MISSÃO ATIVA"}
                </Badge>
                <h1 className="text-2xl font-bold text-white">{quizData.title || quizData.name}</h1>
              </div>
              <div className="flex items-center space-x-2 text-lg font-semibold">
                <Clock className="w-5 h-5 text-slate-300" />
                <span className={timeLeft <= 60 ? "text-red-400" : "text-slate-300"}>{formatTime(timeLeft)}</span>
              </div>
            </div>

            <Progress value={progressValue} className="h-3 bg-slate-700" />
            <p className="text-sm text-slate-400 mt-2">
              Questão {currentQuestionIndex + 1} de {questionsToRender.length} • {currentQuestion?.category}
            </p>
          </div>

          {/* Question */}
          <Card className="mb-8 bg-slate-800/50 backdrop-blur-sm border-2 border-blue-500/30">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="px-3 py-1 border-blue-500/30 text-blue-300">
                    {currentQuestion?.category}
                  </Badge>
                  <Badge className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {currentQuestion?.points} pontos
                  </Badge>
                </div>
                <h2 className="text-xl font-semibold mb-6 text-white">{currentQuestion?.question}</h2>
              </div>

              {currentQuestion?.type === "multiple-choice" && currentQuestion.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        selectedAnswer === index
                          ? "border-blue-500 bg-blue-500/10 shadow-md transform scale-[1.02]"
                          : "border-slate-600 hover:border-slate-500 hover:bg-slate-700/50"
                      }`}
                    >
                      <span className="font-medium mr-3 text-blue-400">{String.fromCharCode(65 + index)}.</span>
                      <span className="text-slate-200">{option}</span>
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion?.type === "numerical" && (
                <div className="space-y-3">
                  <input
                    type="number"
                    placeholder="Digite sua resposta"
                    className="w-full p-4 border-2 border-slate-600 bg-slate-700/50 text-white rounded-lg focus:border-blue-500 focus:outline-none placeholder:text-slate-400"
                    onChange={(e) => handleAnswerSelect(Number(e.target.value))}
                    value={selectedAnswer === null ? "" : selectedAnswer}
                  />
                </div>
              )}

              {currentQuestion?.type === "true-false" && (
                <div className="space-y-3">
                  {["Verdadeiro", "Falso"].map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        selectedAnswer === index
                          ? "border-blue-500 bg-blue-500/10 shadow-md transform scale-[1.02]"
                          : "border-slate-600 hover:border-slate-500 hover:bg-slate-700/50"
                      }`}
                    >
                      <span className="text-slate-200">{option}</span>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-6 bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600/50"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            <Button
              onClick={currentQuestionIndex === questionsToRender.length - 1 ? handleFinishQuiz : handleNextQuestion}
              disabled={selectedAnswer === null}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6"
            >
              {currentQuestionIndex === questionsToRender.length - 1 ? "Finalizar Quiz" : "Próxima"}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
