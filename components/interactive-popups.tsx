"use client"

import { useState } from "react"
import { X, BarChart3, Globe, Brain, Download, TrendingUp, Award, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PopupProps {
  isOpen: boolean
  onClose: () => void
  type: "dashboard" | "reports" | "comparison" | "analysis"
}

export function InteractivePopup({ isOpen, onClose, type }: PopupProps) {
  if (!isOpen) return null

  const renderDashboardPopup = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <BarChart3 className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Dashboard Personalizado</h3>
        <p className="text-gray-600">Acompanhe sua evolução cognitiva em tempo real</p>
      </div>

      {/* Preview do Dashboard */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">QI Atual</span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-blue-600">127</div>
            <div className="text-xs text-green-600">+5 pontos</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Percentil</span>
              <Award className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-purple-600">96%</div>
            <div className="text-xs text-gray-500">Top 4%</div>
          </div>
        </div>

        {/* Gráfico simulado */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h4 className="font-semibold mb-3">Evolução do QI</h4>
          <div className="h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded flex items-end justify-between px-2">
            {[85, 92, 98, 105, 112, 119, 127].map((value, i) => (
              <div
                key={i}
                className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t w-6"
                style={{ height: `${(value / 140) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">8</div>
          <div className="text-sm text-gray-600">Testes Realizados</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">94%</div>
          <div className="text-sm text-gray-600">Precisão Média</div>
        </div>
      </div>
    </div>
  )

  const renderReportsPopup = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <Download className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Relatórios Profissionais</h3>
        <p className="text-gray-600">Documentos detalhados para uso acadêmico e profissional</p>
      </div>

      {/* Preview do PDF */}
      <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold">RELATÓRIO DE AVALIAÇÃO COGNITIVA</h4>
              <p className="text-sm opacity-90">Instituto de Psicometria Avançada</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">127</div>
              <div className="text-sm">QI Score</div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h5 className="font-semibold mb-2">Resumo Executivo</h5>
            <div className="h-2 bg-gray-200 rounded mb-1"></div>
            <div className="h-2 bg-gray-200 rounded w-3/4 mb-1"></div>
            <div className="h-2 bg-gray-200 rounded w-1/2"></div>
          </div>

          <div>
            <h5 className="font-semibold mb-2">Análise Detalhada</h5>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-16 bg-blue-100 rounded"></div>
              <div className="h-16 bg-green-100 rounded"></div>
              <div className="h-16 bg-purple-100 rounded"></div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded"></div>
              <span className="text-sm font-medium">Certificado Oficial</span>
            </div>
            <Badge className="bg-green-100 text-green-800">Validado</Badge>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Inclui:</h4>
        <ul className="text-sm space-y-1">
          <li>• Análise completa de 8 dimensões cognitivas</li>
          <li>• Comparação com normas populacionais</li>
          <li>• Recomendações personalizadas</li>
          <li>• Certificado de autenticidade</li>
        </ul>
      </div>
    </div>
  )

  const renderComparisonPopup = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <Globe className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Comparação Global</h3>
        <p className="text-gray-600">Veja como você se compara com pessoas do mundo todo</p>
      </div>

      {/* Mapa Mundial Simulado */}
      <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Distribuição Global</h4>
          <Badge className="bg-white/20 text-white">50M+ usuários</Badge>
        </div>

        <div className="relative h-32 bg-white/10 rounded-lg mb-4 flex items-center justify-center">
          <MapPin className="w-8 h-8 text-yellow-400" />
          <span className="ml-2">Sua Posição: Top 4% Mundial</span>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">127</div>
            <div className="text-sm opacity-80">Seu QI</div>
          </div>
          <div>
            <div className="text-2xl font-bold">96%</div>
            <div className="text-sm opacity-80">Percentil</div>
          </div>
          <div>
            <div className="text-2xl font-bold">4%</div>
            <div className="text-sm opacity-80">Acima de você</div>
          </div>
        </div>
      </div>

      {/* Comparação por Países */}
      <div className="space-y-3">
        <h4 className="font-semibold">Ranking por Países</h4>
        {[
          { country: "Singapura", avg: 108, flag: "🇸🇬" },
          { country: "Hong Kong", avg: 106, flag: "🇭🇰" },
          { country: "Coreia do Sul", avg: 105, flag: "🇰🇷" },
          { country: "Brasil", avg: 98, flag: "🇧🇷" },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{item.flag}</span>
              <span className="font-medium">{item.country}</span>
            </div>
            <div className="text-right">
              <div className="font-bold">{item.avg}</div>
              <div className="text-sm text-gray-600">QI Médio</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderAnalysisPopup = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Análise de Habilidades</h3>
        <p className="text-gray-600">Descubra seus pontos fortes e áreas de melhoria</p>
      </div>

      {/* Radar Chart Simulado */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
        <h4 className="font-semibold mb-4 text-center">Perfil Cognitivo Completo</h4>
        <div className="relative w-48 h-48 mx-auto mb-6">
          <div className="absolute inset-0 border-2 border-orange-200 rounded-full"></div>
          <div className="absolute inset-4 border border-orange-300 rounded-full"></div>
          <div className="absolute inset-8 border border-orange-400 rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">127</div>
              <div className="text-sm text-orange-500">QI Geral</div>
            </div>
          </div>
        </div>
      </div>

      {/* Habilidades Detalhadas */}
      <div className="space-y-3">
        {[
          { skill: "Raciocínio Lógico", score: 95, color: "bg-green-500" },
          { skill: "Memória de Trabalho", score: 88, color: "bg-blue-500" },
          { skill: "Velocidade de Processamento", score: 92, color: "bg-purple-500" },
          { skill: "Raciocínio Espacial", score: 85, color: "bg-orange-500" },
          { skill: "Compreensão Verbal", score: 90, color: "bg-teal-500" },
        ].map((item, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">{item.skill}</span>
              <span className="font-bold">{item.score}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${item.color} h-2 rounded-full transition-all duration-1000`}
                style={{ width: `${item.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Recomendações Personalizadas:</h4>
        <ul className="text-sm space-y-1">
          <li>• Pratique exercícios de raciocínio espacial</li>
          <li>• Desenvolva técnicas de memorização</li>
          <li>• Treine velocidade de cálculo mental</li>
        </ul>
      </div>
    </div>
  )

  const getPopupContent = () => {
    switch (type) {
      case "dashboard":
        return renderDashboardPopup()
      case "reports":
        return renderReportsPopup()
      case "comparison":
        return renderComparisonPopup()
      case "analysis":
        return renderAnalysisPopup()
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {getPopupContent()}

          <div className="mt-8 flex space-x-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Fechar
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              Começar Teste Agora
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook para usar os popups
export function useInteractivePopups() {
  const [activePopup, setActivePopup] = useState<"dashboard" | "reports" | "comparison" | "analysis" | null>(null)

  const openPopup = (type: "dashboard" | "reports" | "comparison" | "analysis") => {
    setActivePopup(type)
  }

  const closePopup = () => {
    setActivePopup(null)
  }

  return {
    activePopup,
    openPopup,
    closePopup,
  }
}
