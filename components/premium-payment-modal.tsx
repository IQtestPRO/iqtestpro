"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  CreditCard,
  Shield,
  Trophy,
  Star,
  Zap,
  Crown,
  Target,
  Eye,
  EyeOff,
  Lock,
  AlertCircle,
  CheckCircle,
  Smartphone,
  Award,
  Verified,
  TrendingUp,
} from "lucide-react"

interface PricingModalProps {
  isOpen: boolean
  onClose: () => void
  selectedLevel: {
    id: number
    title: string
    difficulty: "Básico" | "Intermediário" | "Avançado" | "Expert"
    price: number
    originalPrice?: number
    questions: number
    timeLimit: number
    features: string[]
    icon: React.ReactNode
    gradient: string
  } | null
  onPurchase: (paymentMethod: string, paymentData: any) => void
}

interface PaymentData {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string
  email: string
  cpf: string
}

interface FormErrors {
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  cardName?: string
  email?: string
  cpf?: string
}

export function PremiumPaymentModal({ isOpen, onClose, selectedLevel, onPurchase }: PricingModalProps) {
  const [selectedPayment, setSelectedPayment] = useState<string>("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showCvv, setShowCvv] = useState(false)
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    email: "",
    cpf: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isFormValid, setIsFormValid] = useState(false)

  // Função de validação usando useCallback para evitar problemas de inicialização
  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {}
    let isValid = true

    if (selectedPayment === "credit-card") {
      if (!paymentData.cardNumber || paymentData.cardNumber.replace(/\s/g, "").length < 16) {
        newErrors.cardNumber = "Número do cartão inválido"
        isValid = false
      }

      if (!paymentData.expiryDate || !/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
        newErrors.expiryDate = "Data de validade inválida (MM/AA)"
        isValid = false
      }

      if (!paymentData.cvv || paymentData.cvv.length < 3) {
        newErrors.cvv = "CVV inválido"
        isValid = false
      }

      if (!paymentData.cardName || paymentData.cardName.length < 3) {
        newErrors.cardName = "Nome no cartão é obrigatório"
        isValid = false
      }
    }

    if (!paymentData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paymentData.email)) {
      newErrors.email = "Email inválido"
      isValid = false
    }

    if (!paymentData.cpf || paymentData.cpf.replace(/\D/g, "").length !== 11) {
      newErrors.cpf = "CPF inválido"
      isValid = false
    }

    setErrors(newErrors)
    setIsFormValid(isValid)
  }, [paymentData, selectedPayment])

  // Validação em tempo real
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      validateForm()
    }, 300) // Debounce de 300ms

    return () => clearTimeout(timeoutId)
  }, [paymentData, selectedPayment])

  // Verificações de segurança
  if (!selectedLevel || typeof selectedLevel.price !== "number") {
    return null
  }

  // Valores padrão para evitar erros
  const safeLevel = {
    ...selectedLevel,
    price: selectedLevel.price || 0,
    originalPrice: selectedLevel.originalPrice || undefined,
    questions: selectedLevel.questions || 0,
    timeLimit: selectedLevel.timeLimit || 0,
    features: selectedLevel.features || [],
    title: selectedLevel.title || "Teste Premium",
    difficulty: selectedLevel.difficulty || ("Básico" as const),
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
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
    return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
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
      case "cpf":
        formattedValue = formatCPF(value)
        break
    }

    setPaymentData((prev) => ({
      ...prev,
      [field]: formattedValue,
    }))
  }

  const handlePurchase = async () => {
    if (!isFormValid) return

    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsProcessing(false)
    onPurchase(selectedPayment, paymentData)
  }

  const paymentMethods = [
    {
      id: "credit-card",
      name: "Cartão de Crédito",
      icon: <CreditCard className="w-5 h-5" />,
      description: "Visa, Mastercard, Elo",
      popular: true,
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: "pix",
      name: "PIX",
      icon: <Zap className="w-5 h-5" />,
      description: "Pagamento instantâneo",
      popular: false,
      color: "from-blue-500 to-indigo-600",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Básico":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "Intermediário":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Avançado":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "Expert":
        return "bg-purple-50 text-purple-700 border-purple-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Básico":
        return <Target className="w-4 h-4" />
      case "Intermediário":
        return <Star className="w-4 h-4" />
      case "Avançado":
        return <Trophy className="w-4 h-4" />
      case "Expert":
        return <Crown className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="premium-payment-modal">
        {/* Trust Header */}
        <div className="trust-header">
          <div className="trust-badges">
            <div className="trust-badge">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>SSL Seguro</span>
            </div>
            <div className="trust-badge">
              <Verified className="w-4 h-4 text-blue-600" />
              <span>Certificado</span>
            </div>
            <div className="trust-badge">
              <Award className="w-4 h-4 text-purple-600" />
              <span>Confiável</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="payment-header">
          <div className="header-icon">
            <div className={`icon-container bg-gradient-to-br ${safeLevel.gradient}`}>{safeLevel.icon}</div>
            <div className="premium-badge">
              <Crown className="w-4 h-4" />
              <span>Premium</span>
            </div>
          </div>
          <h2 className="payment-title">Finalizar Compra Segura</h2>
          <p className="payment-subtitle">
            Teste Premium: <strong>{safeLevel.title}</strong>
          </p>
        </div>

        {/* Package Summary */}
        <Card className="package-summary-premium">
          <CardContent className="package-content">
            <div className="package-header">
              <div className="package-info">
                <h3 className="package-title">{safeLevel.title}</h3>
                <Badge className={`package-badge ${getDifficultyColor(safeLevel.difficulty)}`}>
                  {getDifficultyIcon(safeLevel.difficulty)}
                  <span className="ml-1">{safeLevel.difficulty}</span>
                </Badge>
              </div>
              <div className="package-price">
                {safeLevel.originalPrice && (
                  <div className="original-price">R$ {safeLevel.originalPrice.toFixed(2)}</div>
                )}
                <div className="current-price">R$ {safeLevel.price.toFixed(2)}</div>
                <div className="price-label">Pagamento único</div>
              </div>
            </div>

            <div className="package-features">
              <div className="feature-item">
                <CheckCircle className="feature-icon text-emerald-500" />
                <span>{safeLevel.questions} questões premium</span>
              </div>
              <div className="feature-item">
                <CheckCircle className="feature-icon text-emerald-500" />
                <span>{safeLevel.timeLimit} minutos de teste</span>
              </div>
              <div className="feature-item">
                <CheckCircle className="feature-icon text-emerald-500" />
                <span>Relatório detalhado</span>
              </div>
              <div className="feature-item">
                <CheckCircle className="feature-icon text-emerald-500" />
                <span>Certificado oficial</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <div className="payment-methods-premium">
          <h3 className="section-title">
            <Lock className="w-5 h-5 text-emerald-600" />
            Escolha sua forma de pagamento
          </h3>
          <div className="payment-options">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`payment-option-premium ${selectedPayment === method.id ? "selected" : ""}`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <div className="payment-option-content">
                  <div className={`payment-option-icon bg-gradient-to-br ${method.color}`}>{method.icon}</div>
                  <div className="payment-option-info">
                    <div className="payment-option-name">
                      {method.name}
                      {method.popular && (
                        <Badge className="popular-badge-premium">
                          <TrendingUp className="w-3 h-3" />
                          Mais usado
                        </Badge>
                      )}
                    </div>
                    <div className="payment-option-description">{method.description}</div>
                  </div>
                </div>
                <div className={`payment-radio-premium ${selectedPayment === method.id ? "checked" : ""}`}>
                  {selectedPayment === method.id && <div className="radio-dot-premium" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Form */}
        {selectedPayment === "credit-card" && (
          <div className="payment-form-premium">
            <h3 className="section-title">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              Dados do cartão
            </h3>

            <div className="form-grid-premium">
              <div className="form-group-premium full-width">
                <label htmlFor="cardNumber" className="form-label-premium">
                  Número do Cartão *
                </label>
                <div className="input-wrapper-premium">
                  <input
                    id="cardNumber"
                    type="text"
                    className={`form-input-premium ${errors.cardNumber ? "error" : ""}`}
                    placeholder="0000 0000 0000 0000"
                    value={paymentData.cardNumber}
                    onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                    maxLength={19}
                  />
                  <CreditCard className="input-icon-premium" />
                </div>
                {errors.cardNumber && (
                  <span className="error-message-premium">
                    <AlertCircle className="error-icon-premium" />
                    {errors.cardNumber}
                  </span>
                )}
              </div>

              <div className="form-group-premium">
                <label htmlFor="expiryDate" className="form-label-premium">
                  Validade *
                </label>
                <input
                  id="expiryDate"
                  type="text"
                  className={`form-input-premium ${errors.expiryDate ? "error" : ""}`}
                  placeholder="MM/AA"
                  value={paymentData.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                  maxLength={5}
                />
                {errors.expiryDate && (
                  <span className="error-message-premium">
                    <AlertCircle className="error-icon-premium" />
                    {errors.expiryDate}
                  </span>
                )}
              </div>

              <div className="form-group-premium">
                <label htmlFor="cvv" className="form-label-premium">
                  CVV *
                </label>
                <div className="input-wrapper-premium">
                  <input
                    id="cvv"
                    type={showCvv ? "text" : "password"}
                    className={`form-input-premium ${errors.cvv ? "error" : ""}`}
                    placeholder="000"
                    value={paymentData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    maxLength={4}
                  />
                  <button
                    type="button"
                    className="input-toggle-premium"
                    onClick={() => setShowCvv(!showCvv)}
                    aria-label={showCvv ? "Ocultar CVV" : "Mostrar CVV"}
                  >
                    {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.cvv && (
                  <span className="error-message-premium">
                    <AlertCircle className="error-icon-premium" />
                    {errors.cvv}
                  </span>
                )}
              </div>

              <div className="form-group-premium full-width">
                <label htmlFor="cardName" className="form-label-premium">
                  Nome no Cartão *
                </label>
                <input
                  id="cardName"
                  type="text"
                  className={`form-input-premium ${errors.cardName ? "error" : ""}`}
                  placeholder="Nome como está no cartão"
                  value={paymentData.cardName}
                  onChange={(e) => handleInputChange("cardName", e.target.value.toUpperCase())}
                />
                {errors.cardName && (
                  <span className="error-message-premium">
                    <AlertCircle className="error-icon-premium" />
                    {errors.cardName}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Personal Data */}
        <div className="personal-data-premium">
          <h3 className="section-title">
            <Smartphone className="w-5 h-5 text-emerald-600" />
            Dados pessoais
          </h3>

          <div className="form-grid-premium">
            <div className="form-group-premium full-width">
              <label htmlFor="email" className="form-label-premium">
                Email *
              </label>
              <input
                id="email"
                type="email"
                className={`form-input-premium ${errors.email ? "error" : ""}`}
                placeholder="seu@email.com"
                value={paymentData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              {errors.email && (
                <span className="error-message-premium">
                  <AlertCircle className="error-icon-premium" />
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group-premium full-width">
              <label htmlFor="cpf" className="form-label-premium">
                CPF *
              </label>
              <input
                id="cpf"
                type="text"
                className={`form-input-premium ${errors.cpf ? "error" : ""}`}
                placeholder="000.000.000-00"
                value={paymentData.cpf}
                onChange={(e) => handleInputChange("cpf", e.target.value)}
                maxLength={14}
              />
              {errors.cpf && (
                <span className="error-message-premium">
                  <AlertCircle className="error-icon-premium" />
                  {errors.cpf}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="security-notice-premium">
          <div className="security-content-premium">
            <div className="security-icon-premium">
              <Shield className="w-6 h-6" />
            </div>
            <div className="security-text-premium">
              <h4 className="security-title-premium">Pagamento 100% Seguro</h4>
              <p className="security-description-premium">
                Seus dados são protegidos com criptografia SSL de 256 bits. Processamento seguro garantido.
              </p>
              <div className="security-features">
                <span className="security-feature">
                  <CheckCircle className="w-4 h-4" />
                  Dados criptografados
                </span>
                <span className="security-feature">
                  <CheckCircle className="w-4 h-4" />
                  PCI Compliant
                </span>
                <span className="security-feature">
                  <CheckCircle className="w-4 h-4" />
                  Monitoramento 24/7
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons-premium">
          <Button variant="outline" onClick={onClose} className="cancel-button-premium" disabled={isProcessing}>
            Cancelar
          </Button>
          <Button onClick={handlePurchase} disabled={isProcessing || !isFormValid} className="purchase-button-premium">
            {isProcessing ? (
              <>
                <div className="loading-spinner-premium" />
                Processando pagamento...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 mr-2" />
                Finalizar Compra - R$ {safeLevel.price.toFixed(2)}
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
