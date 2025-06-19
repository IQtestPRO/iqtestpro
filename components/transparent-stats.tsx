"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Clock, Award, BarChart3, CheckCircle } from "lucide-react"

export default function TransparentStats() {
  const stats = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      value: "2.847",
      label: "Avaliações Realizadas",
      description: "Desde o lançamento em 2023",
    },
    {
      icon: <Clock className="w-6 h-6 text-green-600" />,
      value: "18 min",
      label: "Tempo Médio",
      description: "Duração média das avaliações",
    },
    {
      icon: <Award className="w-6 h-6 text-purple-600" />,
      value: "94%",
      label: "Satisfação",
      description: "Usuários satisfeitos com os resultados",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-orange-600" />,
      value: "±5 pts",
      label: "Margem de Erro",
      description: "Precisão estatística padrão",
    },
  ]

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Transparência em Números</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Acreditamos na transparência. Aqui estão nossos dados reais, sem exageros ou inflação de números.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center border-2 border-slate-200 hover:border-slate-300 transition-colors"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="font-semibold text-slate-700 mb-2">{stat.label}</div>
                <div className="text-sm text-slate-500">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Seção de Metodologia */}
        <Card className="bg-white border-2 border-blue-100">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Nossa Metodologia</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Validação Científica</h4>
                      <p className="text-sm text-slate-600">
                        Questões baseadas em teorias psicométricas estabelecidas e validadas em estudos acadêmicos.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Normas Populacionais</h4>
                      <p className="text-sm text-slate-600">
                        Resultados calibrados com base em dados normativos da população brasileira.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Análise Estatística</h4>
                      <p className="text-sm text-slate-600">
                        Interpretação baseada em análises estatísticas rigorosas e intervalos de confiança.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-6">
                <h4 className="font-semibold text-slate-900 mb-4">Limitações e Transparência</h4>
                <div className="space-y-3 text-sm text-slate-600">
                  <p>• Esta avaliação oferece uma estimativa das habilidades cognitivas, não um diagnóstico clínico.</p>
                  <p>• Resultados podem variar devido a fatores como cansaço, estresse ou familiaridade com testes.</p>
                  <p>• Para avaliações clínicas, recomendamos consultar um psicólogo especializado.</p>
                  <p>• Nossos dados são atualizados mensalmente e disponíveis para consulta.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
