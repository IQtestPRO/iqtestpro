// components/question-type-modal.tsx
"use client"

import type React from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { X, Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface QuestionType {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  example: string
  tip: string
}

interface QuestionTypeModalProps {
  isOpen: boolean
  onClose: () => void
  questionType: QuestionType
  onStartTest: () => void
}

export function QuestionTypeModal({ isOpen, onClose, questionType, onStartTest }: QuestionTypeModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="p-6 md:p-8 bg-card text-foreground rounded-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Detalhes do Teste</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {questionType.icon} {questionType.title}
            </h3>
            <p className="text-sm text-muted-foreground">{questionType.description}</p>
            <div className="mt-4">
              <Badge variant="secondary">ID: {questionType.id}</Badge>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Exemplo e Dica</h3>
            <div className="mb-4">
              <p className="text-sm font-medium">Exemplo:</p>
              <div className="p-3 rounded-md bg-secondary text-secondary-foreground">{questionType.example}</div>
            </div>
            <div>
              <p className="text-sm font-medium">Dica:</p>
              <div className="p-3 rounded-md bg-secondary text-secondary-foreground">{questionType.tip}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
          <Button variant="outline" onClick={onClose} className="flex-1" disablePaymentModal={true}>
            <X className="w-4 h-4 mr-2" />
            Fechar Detalhes
          </Button>
          <Button
            onClick={() => {
              onClose() // Fecha este modal primeiro
              setTimeout(() => onStartTest(), 50) // Chama onStartTest para abrir o modal de pagamento específico
            }}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-opacity text-white"
            disablePaymentModal={true} // CORRETO: Este botão aciona onStartTest que tem sua própria lógica de modal
          >
            <Play className="w-4 h-4 mr-2" />
            Começar Teste ({questionType.title})
          </Button>
        </div>
      </div>
    </Modal>
  )
}
