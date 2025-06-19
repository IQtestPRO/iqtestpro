"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Trophy, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PremiumUnlockNotification() {
  const [showNotification, setShowNotification] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handlePremiumUnlocked = (event: CustomEvent) => {
      setShowNotification(true)
      setTimeout(() => setIsVisible(true), 100)

      // Auto-hide após 10 segundos
      setTimeout(() => {
        handleClose()
      }, 10000)
    }

    window.addEventListener("premiumUnlocked", handlePremiumUnlocked as EventListener)

    return () => {
      window.removeEventListener("premiumUnlocked", handlePremiumUnlocked as EventListener)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => setShowNotification(false), 300)
  }

  if (!showNotification) return null

  return (
    <div
      className={`fixed top-4 right-4 z-[100] transform transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-2xl p-6 max-w-sm border border-green-400/30">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-white/20 rounded-full p-2 mr-3">
              <Trophy className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg">🎉 Parabéns!</h3>
              <p className="text-green-100 text-sm">Pagamento confirmado</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-white/80 hover:text-white hover:bg-white/10 p-1"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-200 mr-2 flex-shrink-0" />
            <span className="text-sm">Todos os quizzes desbloqueados</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-200 mr-2 flex-shrink-0" />
            <span className="text-sm">Acesso vitalício garantido</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-200 mr-2 flex-shrink-0" />
            <span className="text-sm">Certificados digitais inclusos</span>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-3 mb-4">
          <div className="flex items-center mb-2">
            <Sparkles className="w-4 h-4 text-yellow-300 mr-2" />
            <span className="font-semibold text-sm">Quizzes Disponíveis:</span>
          </div>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <div>• Raciocínio Espacial</div>
            <div>• Raciocínio Lógico</div>
            <div>• Inteligência Fluida</div>
            <div>• Avaliação Completa</div>
          </div>
        </div>

        <Button onClick={handleClose} className="w-full bg-white text-green-600 hover:bg-green-50 font-semibold">
          Começar Agora!
        </Button>
      </div>
    </div>
  )
}
