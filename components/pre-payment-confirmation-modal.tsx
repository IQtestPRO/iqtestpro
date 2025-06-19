"use client"

import React from "react"

import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { ShoppingCart, CreditCard, X } from "lucide-react"

interface PrePaymentConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  testDetails: {
    title: string
    price: number
    icon: React.ReactNode
    gradientBg: string
  }
}

export function PrePaymentConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  testDetails,
}: PrePaymentConfirmationModalProps) {
  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="p-6 md:p-8 bg-card text-foreground rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div
              className={`flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${testDetails.gradientBg} shadow-md`}
            >
              {/* Clone o ícone para poder aplicar classes de cor se necessário, ou use um ícone genérico */}
              {React.isValidElement(testDetails.icon) ? (
                React.cloneElement(testDetails.icon as React.ReactElement<any>, { className: "w-6 h-6 text-white" })
              ) : (
                <ShoppingCart className="w-6 h-6 text-white" />
              )}
            </div>
            <h2 className="text-xl md:text-2xl font-display font-semibold">Confirmar Seleção</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:bg-muted">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="mb-6 space-y-3">
          <p className="text-muted-foreground">Você está prestes a adquirir o seguinte teste:</p>
          <div className="bg-muted/50 dark:bg-muted/20 p-4 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-1">{testDetails.title}</h3>
            <p className={`text-2xl font-bold text-primary`}>R$ {testDetails.price.toFixed(2)}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Ao clicar em "Prosseguir para Pagamento", você será direcionado para nossa plataforma segura para finalizar
            a compra.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className={`flex-1 bg-gradient-to-r ${testDetails.gradientBg} hover:opacity-90 transition-opacity text-white`}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Prosseguir para Pagamento
          </Button>
        </div>
      </div>
    </Modal>
  )
}
