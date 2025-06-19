"use client"

import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Crown, Lock, CreditCard, Zap, CheckCircle, X, Trophy, Shield, Eye, EyeOff, AlertCircle } from "lucide-react"

interface MidTestPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onPaymentSuccess: () => void
  currentQuestion: number
  totalQuestions: number
  testType: string
}

interface PaymentData {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string
  email: string
  paymentMethod: "credit-card" | "pix"
}

export function MidTestPaymentModal({
  isOpen,
  onClose,
  onPaymentSuccess,
  currentQuestion,
  totalQuestions,
  testType,
}: MidTestPaymentModalProps) {
  const [selectedPayment, setSelectedPayment] = useState<"credit-card" | "pix">("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showCvv, setShowCvv] = useState(false)
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    email: "",
    paymentMethod: "credit-card",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

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

  const handleInputChange = (field: keyof PaymentData, value: string) => {
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
    }

    setPaymentData((prev) => ({
      ...prev,
      [field]: formattedValue,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (selectedPayment === "credit-card") {
      if (!paymentData.cardNumber || paymentData.cardNumber.replace(/\s/g, "").length < 16) {
        newErrors.cardNumber = "Número do cartão inválido"
      }
      if (!paymentData.expiryDate || !/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
        newErrors.expiryDate = "Data inválida (MM/AA)"
      }
      if (!paymentData.cvv || paymentData.cvv.length < 3) {
        newErrors.cvv = "CVV inválido"
      }
      if (!paymentData.cardName || paymentData.cardName.length < 3) {
        newErrors.cardName = "Nome obrigatório"
      }
    }

    if (!paymentData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paymentData.email)) {
      newErrors.email = "Email inválido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePayment = async () => {
    if (!validateForm()) return

    setIsProcessing(true)

    // Simular processamento de pagamento
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    onPaymentSuccess()
  }

  const remainingQuestions = totalQuestions - currentQuestion
  const progress = (currentQuestion / totalQuestions) * 100

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="max-h-[90vh] overflow-y-auto">
        {/* Header com Urgência */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Desbloqueie Seu Potencial Completo</h2>
                <p className="text-amber-100">Continue seu teste e descubra seu QI real</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Progresso */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso do Teste</span>
              <span>
                {currentQuestion} de {totalQuestions} questões
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-amber-100">
              Você está indo muito bem! Restam apenas {remainingQuestions} questões para descobrir seu QI completo.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Benefícios Premium */}
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Crown className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="text-lg font-bold text-foreground">Upgrade para Premium</h3>
                  <p className="text-muted-foreground">Desbloqueie todas as funcionalidades</p>
                </div>
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  <Trophy className="w-4 h-4 mr-1" />
                  Oferta Especial
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Continue seu teste atual</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Relatório detalhado de QI</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Análise de pontos fortes</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Comparação global</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Certificado oficial</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Acesso a todos os testes</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 p-4 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Preço especial durante o teste</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-primary">R$ 19,90</span>
                      <span className="text-sm text-muted-foreground line-through">R$ 39,90</span>
                      <Badge variant="destructive" className="text-xs">
                        50% OFF
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Oferta válida por</p>
                    <p className="text-sm font-bold text-orange-600">Tempo limitado</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Métodos de Pagamento */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span>Pagamento 100% Seguro</span>
            </h3>

            {/* Seleção de Método */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedPayment("credit-card")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedPayment === "credit-card"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <CreditCard className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Cartão de Crédito</p>
                <p className="text-xs text-muted-foreground">Visa, Master, Elo</p>
              </button>

              <button
                onClick={() => setSelectedPayment("pix")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedPayment === "pix" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
              >
                <Zap className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">PIX</p>
                <p className="text-xs text-muted-foreground">Instantâneo</p>
              </button>
            </div>

            {/* Formulário de Pagamento */}
            {selectedPayment === "credit-card" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Número do Cartão *</label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      value={paymentData.cardNumber}
                      onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                      className={`w-full p-3 border rounded-lg ${
                        errors.cardNumber ? "border-red-500" : "border-border"
                      } focus:outline-none focus:ring-2 focus:ring-primary/50`}
                      maxLength={19}
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Validade *</label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      value={paymentData.expiryDate}
                      onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                      className={`w-full p-3 border rounded-lg ${
                        errors.expiryDate ? "border-red-500" : "border-border"
                      } focus:outline-none focus:ring-2 focus:ring-primary/50`}
                      maxLength={5}
                    />
                    {errors.expiryDate && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.expiryDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">CVV *</label>
                    <div className="relative">
                      <input
                        type={showCvv ? "text" : "password"}
                        placeholder="000"
                        value={paymentData.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                        className={`w-full p-3 border rounded-lg pr-10 ${
                          errors.cvv ? "border-red-500" : "border-border"
                        } focus:outline-none focus:ring-2 focus:ring-primary/50`}
                        maxLength={4}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCvv(!showCvv)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.cvv && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.cvv}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Nome no Cartão *</label>
                    <input
                      type="text"
                      placeholder="Nome como está no cartão"
                      value={paymentData.cardName}
                      onChange={(e) => handleInputChange("cardName", e.target.value.toUpperCase())}
                      className={`w-full p-3 border rounded-lg ${
                        errors.cardName ? "border-red-500" : "border-border"
                      } focus:outline-none focus:ring-2 focus:ring-primary/50`}
                    />
                    {errors.cardName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.cardName}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {selectedPayment === "pix" && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-center">
                  <Zap className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2">Pagamento via PIX</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Após clicar em "Finalizar", você receberá o código PIX para pagamento instantâneo.
                  </p>
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email para recibo *</label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={paymentData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full p-3 border rounded-lg ${
                  errors.email ? "border-red-500" : "border-border"
                } focus:outline-none focus:ring-2 focus:ring-primary/50`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1" disabled={isProcessing}>
              Continuar Grátis (Limitado)
            </Button>
            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="flex-1 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Processando...
                </>
              ) : (
                <>
                  <Crown className="w-4 h-4 mr-2" />
                  Desbloquear Premium - R$ 19,90
                </>
              )}
            </Button>
          </div>

          {/* Garantia */}
          <div className="text-center text-xs text-muted-foreground">
            <Shield className="w-4 h-4 inline mr-1" />
            Pagamento seguro com criptografia SSL • Garantia de 7 dias
          </div>
        </div>
      </div>
    </Modal>
  )
}
