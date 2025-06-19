"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  ArrowLeft,
  Send,
  Search,
  ThumbsUp,
  MessageCircle,
  Shield,
  Trophy,
  Heart,
  CheckCircle,
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface Feedback {
  id: string
  name: string
  role: string
  content: string
  rating: number
  avatar: string
  date: string
  verified: boolean
  likes: number
  category: "premium" | "free" | "pro"
}

export default function FeedbacksPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newFeedback, setNewFeedback] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
  })

  const allFeedbacks: Feedback[] = [
    {
      id: "1",
      name: "Dr. Roberto Fernandes",
      role: "Neuropsicólogo - CRP 06/45892",
      content:
        "Uso a plataforma há 8 meses para complementar minhas avaliações clínicas. Os relatórios são bem estruturados e seguem padrões técnicos adequados. O que mais me impressiona é a correlação dos resultados com outros testes padronizados que aplico. Claro que não substitui uma avaliação presencial completa, mas é uma ferramenta valiosa para triagem inicial.",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      date: "2024-01-15",
      verified: true,
      likes: 23,
      category: "premium",
    },
    {
      id: "2",
      name: "Mariana Oliveira",
      role: "Coordenadora de RH - Empresa de Tecnologia",
      content:
        "Implementamos os testes na nossa empresa para processos seletivos. Inicialmente era cética, mas os resultados têm sido consistentes. Conseguimos identificar candidatos com melhor raciocínio lógico para vagas técnicas. O suporte técnico respondeu rapidamente quando tivemos dúvidas sobre interpretação dos scores. Recomendo, especialmente para empresas que fazem muitas contratações.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      date: "2024-01-10",
      verified: true,
      likes: 31,
      category: "pro",
    },
    {
      id: "3",
      name: "Prof. André Santos",
      role: "Docente de Psicologia - UFMG",
      content:
        "Tenho usado com meus alunos de graduação como exercício prático. A interface é intuitiva e os dados estatísticos são transparentes. Gostaria que tivessem mais informações sobre a amostra normativa, mas no geral é uma ferramenta didática interessante. Meus alunos conseguem entender melhor os conceitos de psicometria na prática.",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      date: "2024-01-08",
      verified: true,
      likes: 18,
      category: "premium",
    },
    {
      id: "4",
      name: "Juliana Costa",
      role: "Estudante de Medicina - 5º período",
      content:
        "Descobri o site estudando para o ENEM e continuei usando para treinar raciocínio lógico. Não vou mentir, alguns testes são bem desafiadores! O que me ajudou muito foi poder refazer os testes e ver onde errei. Os gráficos de evolução me motivaram a continuar praticando. Consegui melhorar minha pontuação em 15 pontos ao longo de 3 meses.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face",
      date: "2024-01-05",
      verified: true,
      likes: 42,
      category: "free",
    },
    {
      id: "5",
      name: "Carlos Mendonça",
      role: "Analista de Sistemas - 12 anos de experiência",
      content:
        "Fiz o teste por curiosidade depois de ver um colega comentando. Achei interessante como algumas questões realmente fazem você pensar 'fora da caixa'. O relatório premium vale a pena - mostra pontos fortes e fracos de forma detalhada. Só acho que poderiam ter mais questões relacionadas à programação e lógica computacional.",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      date: "2024-01-03",
      verified: true,
      likes: 27,
      category: "premium",
    },
    {
      id: "6",
      name: "Dra. Patricia Almeida",
      role: "Psicóloga Organizacional - CRP 01/8834",
      content:
        "Utilizo principalmente para coaching executivo. Os clientes ficam engajados com o formato digital e os resultados geram boas discussões nas sessões. A análise de perfil cognitivo ajuda muito no desenvolvimento de lideranças. Única sugestão seria incluir mais questões sobre inteligência emocional, que é muito demandada no ambiente corporativo.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      date: "2024-01-01",
      verified: true,
      likes: 35,
      category: "pro",
    },
    // Feedbacks adicionais para demonstrar variedade
    {
      id: "7",
      name: "Lucas Silva",
      role: "Estudante de Engenharia",
      content:
        "Usei os testes gratuitos para me preparar para o vestibular. Achei muito útil para treinar raciocínio lógico e matemático. A plataforma é bem intuitiva e os resultados são apresentados de forma clara. Recomendo para quem está se preparando para provas.",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      date: "2023-12-28",
      verified: false,
      likes: 12,
      category: "free",
    },
    {
      id: "8",
      name: "Ana Beatriz",
      role: "Psicóloga Clínica",
      content:
        "Excelente ferramenta para complementar avaliações neuropsicológicas. Os relatórios são detalhados e tecnicamente corretos. Uso principalmente com adolescentes e adultos jovens, que se sentem mais confortáveis com o formato digital.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      date: "2023-12-25",
      verified: true,
      likes: 29,
      category: "premium",
    },
  ]

  useEffect(() => {
    const action = searchParams.get("action")
    if (action === "create") {
      setShowCreateForm(true)
    }
  }, [searchParams])

  const filteredFeedbacks = allFeedbacks.filter((feedback) => {
    const matchesSearch =
      feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.content.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab =
      activeTab === "all" || feedback.category === activeTab || (activeTab === "verified" && feedback.verified)

    return matchesSearch && matchesTab
  })

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para salvar o feedback
    console.log("Novo feedback:", newFeedback)
    setShowCreateForm(false)
    setNewFeedback({ name: "", role: "", content: "", rating: 5 })
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "premium":
        return <Badge className="bg-blue-100 text-blue-700">Premium</Badge>
      case "pro":
        return <Badge className="bg-yellow-100 text-yellow-700">PRO</Badge>
      case "free":
        return <Badge className="bg-gray-100 text-gray-700">Gratuito</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => router.back()} className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Feedbacks da Comunidade</h1>
              <p className="text-muted-foreground">Experiências reais de {allFeedbacks.length} usuários verificados</p>
            </div>
          </div>

          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Heart className="w-4 h-4 mr-2" />
            Deixar Feedback
          </Button>
        </div>

        {/* Formulário de Criação */}
        {showCreateForm && (
          <Card className="mb-8 p-6 border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>Compartilhe sua experiência</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={newFeedback.name}
                      onChange={(e) => setNewFeedback({ ...newFeedback, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Profissão/Área</Label>
                    <Input
                      id="role"
                      value={newFeedback.role}
                      onChange={(e) => setNewFeedback({ ...newFeedback, role: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="content">Seu feedback</Label>
                  <Textarea
                    id="content"
                    value={newFeedback.content}
                    onChange={(e) => setNewFeedback({ ...newFeedback, content: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label>Avaliação</Label>
                  <div className="flex space-x-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewFeedback({ ...newFeedback, rating: star })}
                        className={`w-8 h-8 ${
                          star <= newFeedback.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      >
                        <Star className="w-full h-full" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Enviar Feedback</span>
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Filtros e Busca */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por nome, profissão ou conteúdo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="grid grid-cols-5 w-full md:w-auto">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="verified">Verificados</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
              <TabsTrigger value="pro">PRO</TabsTrigger>
              <TabsTrigger value="free">Gratuito</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Lista de Feedbacks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeedbacks.map((feedback) => (
            <Card key={feedback.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < feedback.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    {feedback.verified && (
                      <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verificado</span>
                      </div>
                    )}
                    {getCategoryBadge(feedback.category)}
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">"{feedback.content}"</p>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center space-x-3">
                    <img
                      src={feedback.avatar || "/placeholder.svg"}
                      alt={feedback.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm">{feedback.name}</p>
                      <p className="text-xs text-muted-foreground">{feedback.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <button className="flex items-center space-x-1 hover:text-blue-600">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{feedback.likes}</span>
                    </button>
                    <span>•</span>
                    <span>{new Date(feedback.date).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFeedbacks.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nenhum feedback encontrado</h3>
            <p className="text-muted-foreground">Tente ajustar os filtros ou termos de busca</p>
          </div>
        )}

        {/* Estatísticas */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-bold text-2xl">{allFeedbacks.length}</h4>
            <p className="text-muted-foreground text-sm">Total de Feedbacks</p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-bold text-2xl">{allFeedbacks.filter((f) => f.verified).length}</h4>
            <p className="text-muted-foreground text-sm">Verificados</p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <h4 className="font-bold text-2xl">
              {(allFeedbacks.reduce((acc, f) => acc + f.rating, 0) / allFeedbacks.length).toFixed(1)}
            </h4>
            <p className="text-muted-foreground text-sm">Avaliação Média</p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-bold text-2xl">{allFeedbacks.reduce((acc, f) => acc + f.likes, 0)}</h4>
            <p className="text-muted-foreground text-sm">Total de Curtidas</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
