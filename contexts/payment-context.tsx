"use client"

import type { ReactNode } from "react"
import { createContext, useContext, useState } from "react"

// Definindo o tipo para o nível selecionado, pode ser expandido conforme necessário
export interface SelectedLevelType {
  id: string | number
  title: string
  price: number
  originalPrice?: number
  // Adicione quaisquer outros campos relevantes do nível aqui
}

interface PaymentContextType {
  isPaymentModalOpen: boolean
  openPaymentModal: (buttonText?: string, source?: string, level?: SelectedLevelType | null) => void
  closePaymentModal: () => void
  buttonText: string
  source: string
  selectedLevel: SelectedLevelType | null // Estado para o nível selecionado
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [buttonText, setButtonText] = useState("Finalizar Compra") // Default mais genérico
  const [source, setSource] = useState("unknown")
  const [selectedLevel, setSelectedLevel] = useState<SelectedLevelType | null>(null) // Inicializa como null

  const openPaymentModal = (
    buttonText = "Finalizar Compra",
    source = "unknown",
    level: SelectedLevelType | null = null, // Parâmetro opcional para o nível
  ) => {
    setButtonText(buttonText)
    setSource(source)
    setSelectedLevel(level) // Define o nível selecionado
    setIsPaymentModalOpen(true)
    document.body.style.overflow = "hidden" // Prevenir scroll do body
  }

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false)
    setButtonText("Finalizar Compra") // Reset para o default
    setSource("unknown")
    setSelectedLevel(null) // Limpa o nível selecionado
    document.body.style.overflow = "auto" // Restaurar scroll do body
  }

  return (
    <PaymentContext.Provider
      value={{
        isPaymentModalOpen,
        openPaymentModal,
        closePaymentModal,
        buttonText,
        source,
        selectedLevel, // Fornece o nível selecionado
      }}
    >
      {children}
    </PaymentContext.Provider>
  )
}

export function usePayment() {
  const context = useContext(PaymentContext)
  if (context === undefined) {
    console.warn("usePayment must be used within a PaymentProvider")
    // Return a default context to prevent crashes
    return {
      isPaymentModalOpen: false,
      openPaymentModal: () => {},
      closePaymentModal: () => {},
      buttonText: "Finalizar Compra",
      source: "unknown",
      selectedLevel: null,
    }
  }
  return context
}
