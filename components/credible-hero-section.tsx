"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, CheckCircle, BookOpen, Verified } from "lucide-react"

export default function CredibleHeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo Principal - Mais Sóbrio */}
          <div className="space-y-8">
            {/* Badge de Credibilidade */}
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2">
              <Verified className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Baseado em Metodologia Científica</span>
            </div>

            {/* Título Profissional */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
                Avaliação Cognitiva
                <br />
                <span className="text-blue-600">Cientificamente Validada</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Descubra suas habilidades cognitivas através de uma avaliação psicométrica desenvolvida com base em
                pesquisas acadêmicas reconhecidas.
              </p>
            </div>

            {/* Estatísticas Realistas */}
            <div className="grid grid-cols-3 gap-6 py-6 border-t border-b border-slate-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">15 min</div>
                <div className="text-sm text-slate-600">Duração média</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">40</div>
                <div className="text-sm text-slate-600">Questões</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">2.5K+</div>
                <div className="text-sm text-slate-600">Avaliações realizadas</div>
              </div>
            </div>

            {/* Botão Principal Profissional */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Brain className="w-5 h-5 mr-2" />
                Iniciar Avaliação Gratuita
              </Button>
              <p className="text-sm text-slate-500">
                ✓ Sem cadastro inicial • ✓ Resultados imediatos • ✓ Baseado em pesquisa científica
              </p>
            </div>
          </div>

          {/* Card de Credibilidade */}
          <div className="space-y-6">
            <Card className="border-2 border-blue-100 bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Metodologia Científica</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Nossa avaliação é baseada em princípios psicométricos estabelecidos e validados pela comunidade
                      científica.
                    </p>
                  </div>

                  {/* Indicadores de Qualidade */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-slate-700">Baseado em pesquisa acadêmica</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-slate-700">Resultados estatisticamente válidos</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-slate-700">Interpretação profissional</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Credenciais Acadêmicas */}
            <Card className="bg-slate-50 border border-slate-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-slate-900 mb-3">Fundamentação Científica</h4>
                <div className="space-y-2 text-sm text-slate-600">
                  <p>• Baseado em teorias de inteligência de Cattell-Horn-Carroll</p>
                  <p>• Normas estatísticas de população brasileira</p>
                  <p>• Validação psicométrica contínua</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
