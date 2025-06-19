"use client"

import { useEffect, useState } from "react"
import { X, CreditCard, Shield, Lock, CheckCircle, Star, Zap, Award, ShoppingCart, Trophy } from "lucide-react"
import { usePayment } from "@/contexts/payment-context"
import { useRouter } from "next/navigation" // Correto para App Router
import { Button } from "@/components/ui/button" // Usar o Button do shadcn
import { DebugHelper } from "@/utils/debug-helper"

export function EnhancedPaymentModal() {
  const { isPaymentModalOpen, closePaymentModal, buttonText, source, selectedLevel } = usePayment()
  const router = useRouter()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"credit" | "pix" | null>("credit") // Default para cartão
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    cpf: "",
    email: "",
  })

  // Adicionar listener para ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePaymentModal()
      }
    }

    if (isPaymentModalOpen) {
      document.addEventListener("keydown", handleEsc)
    }

    return () => {
      document.removeEventListener("keydown", handleEsc)
    }
  }, [isPaymentModalOpen, closePaymentModal])

  useEffect(() => {
    if (isPaymentModalOpen) {
      document.body.style.overflow = "hidden"
      DebugHelper.log("info", "EnhancedPaymentModal opened", { source, buttonText, selectedLevel })
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isPaymentModalOpen, source, buttonText, selectedLevel])

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(" ") : v
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const formatCPF = (value: string) => {
    const v = value.replace(/\D/g, "")
    if (v.length <= 11) {
      return v
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    }
    return value.substring(0, 14)
  }

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value
    switch (field) {
      case "cardNumber":
        formattedValue = formatCardNumber(value)
        break
      case "expiryDate":
        formattedValue = formatExpiryDate(value)
        break
      case "cvv":
        formattedValue = value.replace(/\D/g, "").substring(0, 4)
        break
      case "cpf":
        formattedValue = formatCPF(value)
        break
      case "cardName":
        formattedValue = value.toUpperCase()
        break
    }
    setFormData((prev) => ({ ...prev, [field]: formattedValue }))
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    DebugHelper.log("info", "Iniciando processamento de pagamento", {
      method: selectedPaymentMethod,
      level: selectedLevel,
    })

    await new Promise((resolve) => setTimeout(resolve, 2500)) // Simular processamento

    // Desbloquear TODOS os quizzes após qualquer pagamento
    localStorage.setItem("testPaid", "true")
    localStorage.setItem("allQuizzesUnlocked", "true")
    localStorage.setItem("paymentMethod", selectedPaymentMethod || "credit")
    localStorage.setItem("paymentDate", new Date().toISOString())
    localStorage.setItem("unlockedAt", new Date().toISOString())

    // Salvar dados do nível específico comprado
    if (selectedLevel) {
      localStorage.setItem("purchasedLevelId", String(selectedLevel.id))
      localStorage.setItem(
        "purchasedTest",
        JSON.stringify({
          ...selectedLevel,
          paymentMethod: selectedPaymentMethod,
          purchaseDate: new Date().toISOString(),
          paymentConfirmed: true,
        }),
      )
    }

    DebugHelper.log("success", "Pagamento processado - Todos os quizzes desbloqueados", {
      levelId: selectedLevel?.id,
      allUnlocked: true,
    })

    setIsProcessing(false)
    closePaymentModal()

    // Mostrar mensagem de sucesso
    alert("🎉 Pagamento confirmado! Todos os quizzes premium foram desbloqueados para você!")

    // Redirecionar para o quiz específico ou página inicial
    if (selectedLevel?.id) {
      router.push(`/quiz/${selectedLevel.id}`)
    } else {
      // Recarregar a página para atualizar o status dos botões
      window.location.reload()
    }
  }

  if (!isPaymentModalOpen) return null

  const displayPrice = selectedLevel?.price || 19.9 // Preço padrão se nenhum nível selecionado
  const displayOriginalPrice = selectedLevel?.originalPrice || 67.9

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-fade-in"
      aria-labelledby="payment-modal-title"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closePaymentModal()
        }
      }}
    >
      <div
        className="bg-card text-card-foreground rounded-t-3xl sm:rounded-xl shadow-2xl w-full max-w-lg max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="w-7 h-7 text-primary" />
            <div>
              <h2 id="payment-modal-title" className="text-xl font-semibold font-display">
                {selectedLevel ? `Adquirir: ${selectedLevel.title}` : "Finalizar Compra"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {selectedLevel ? `Acesso completo ao teste ${selectedLevel.title}` : "Acesso ao Teste de QI Pro"}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              closePaymentModal()
            }}
            aria-label="Fechar modal"
            type="button"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Body Scrollable */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {/* Seção de Preços */}
          <div className="bg-primary-subtle/50 dark:bg-primary-subtle/20 p-5 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold text-primary">R$ {displayPrice.toFixed(2)}</span>
                {displayOriginalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    R$ {displayOriginalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="bg-destructive text-destructive-foreground text-xs font-semibold px-2.5 py-1 rounded-full animate-subtle-pulse">
                {(100 - (displayPrice / displayOriginalPrice) * 100).toFixed(0)}% OFF
              </div>
            </div>
            <p className="text-xs text-center text-muted-foreground mb-4">Oferta por tempo limitado!</p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" /> Teste completo validado
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" /> Relatório psicométrico detalhado
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" /> Certificado digital oficial
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" /> Acesso vitalício aos resultados
              </div>
            </div>
          </div>

          {/* Adicionar informação sobre desbloqueio total: */}
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-500/30 mb-4">
            <div className="flex items-center mb-2">
              <Trophy className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-green-300 font-bold text-sm">OFERTA ESPECIAL</span>
            </div>
            <p className="text-green-200 text-xs">
              🎯 Comprando qualquer plano, você desbloqueia TODOS os 4 quizzes premium!
            </p>
            <p className="text-green-200/80 text-xs mt-1">
              ✅ Raciocínio Espacial • ✅ Lógico • ✅ Abstrato • ✅ Completo
            </p>
          </div>

          {/* Métodos de Pagamento */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Forma de Pagamento</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant={selectedPaymentMethod === "credit" ? "default" : "outline"}
                onClick={() => setSelectedPaymentMethod("credit")}
                className="w-full justify-start py-6 text-base min-h-[56px] touch-manipulation"
              >
                <CreditCard className="w-5 h-5 mr-3" /> Cartão de Crédito
              </Button>
              <Button
                variant={selectedPaymentMethod === "pix" ? "default" : "outline"}
                onClick={() => setSelectedPaymentMethod("pix")}
                className="w-full justify-start py-6 text-base min-h-[56px] touch-manipulation"
              >
                <Zap className="w-5 h-5 mr-3" /> PIX
              </Button>
            </div>
          </div>

          {/* Formulário de Cartão */}
          {selectedPaymentMethod === "credit" && (
            <div className="space-y-4 animate-fade-in-up">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1" htmlFor="cardNumber">
                  Número do Cartão
                </label>
                <input
                  id="cardNumber"
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                  className="w-full input min-h-[48px] text-base touch-manipulation"
                  maxLength={19}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1" htmlFor="expiryDate">
                    Validade (MM/AA)
                  </label>
                  <input
                    id="expiryDate"
                    type="text"
                    placeholder="MM/AA"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                    className="w-full input"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1" htmlFor="cvv">
                    CVV
                  </label>
                  <input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    className="w-full input"
                    maxLength={4}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1" htmlFor="cardName">
                  Nome no Cartão
                </label>
                <input
                  id="cardName"
                  type="text"
                  placeholder="COMO ESCRITO NO CARTÃO"
                  value={formData.cardName}
                  onChange={(e) => handleInputChange("cardName", e.target.value)}
                  className="w-full input"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1" htmlFor="cpf">
                    CPF
                  </label>
                  <input
                    id="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => handleInputChange("cpf", e.target.value)}
                    className="w-full input"
                    maxLength={14}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1" htmlFor="email">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full input"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Seção PIX */}
          {selectedPaymentMethod === "pix" && (
            <div className="text-center p-6 bg-primary-subtle/30 dark:bg-primary-subtle/10 rounded-lg animate-fade-in-up">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Pagamento via PIX</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Ao confirmar, um código PIX será gerado. Seu acesso será liberado automaticamente após a confirmação do
                pagamento.
              </p>
              <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                ✅ Aprovação Imediata • ✅ 100% Seguro • ✅ Sem Taxas Extras
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border space-y-4">
          <Button
            size="lg"
            className="w-full text-lg py-7"
            onClick={handlePayment}
            disabled={!selectedPaymentMethod || isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Processando...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 mr-3" />
                Pagar R$ {displayPrice.toFixed(2)} e Desbloquear Todos
              </>
            )}
          </Button>
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Shield className="w-3.5 h-3.5 mr-1.5 text-green-500" /> SSL 256-bit
            </div>
            <div className="flex items-center">
              <Lock className="w-3.5 h-3.5 mr-1.5 text-green-500" /> Dados Criptografados
            </div>
            <div className="flex items-center">
              <Star className="w-3.5 h-3.5 mr-1.5 text-yellow-400" /> Garantia de 7 dias
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
