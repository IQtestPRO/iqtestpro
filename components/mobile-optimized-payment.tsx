"use client"

import { useState, useEffect, useCallback } from "react"
import { X, CreditCard, Shield, Lock, CheckCircle, Zap } from "lucide-react"
import { usePayment } from "@/contexts/payment-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function MobileOptimizedPayment() {
  const { isPaymentModalOpen, closePaymentModal, selectedLevel } = usePayment()
  const router = useRouter()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"credit" | "pix">("credit")
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    cpf: "",
    email: "",
  })

  // Prevenir zoom em iOS
  useEffect(() => {
    if (isPaymentModalOpen) {
      // Adicionar meta tag para prevenir zoom
      const viewport = document.querySelector('meta[name="viewport"]')
      if (viewport) {
        viewport.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no")
      }

      // Bloquear scroll do body
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.width = "100%"
    } else {
      // Restaurar viewport normal
      const viewport = document.querySelector('meta[name="viewport"]')
      if (viewport) {
        viewport.setAttribute("content", "width=device-width, initial-scale=1, viewport-fit=cover")
      }

      // Restaurar scroll
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
    }

    return () => {
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
    }
  }, [isPaymentModalOpen])

  const formatCardNumber = useCallback((value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(" ") : v
  }, [])

  const formatExpiryDate = useCallback((value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }, [])

  const formatCPF = useCallback((value: string) => {
    const v = value.replace(/\D/g, "")
    if (v.length <= 11) {
      return v
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    }
    return value.substring(0, 14)
  }, [])

  const handleInputChange = useCallback(
    (field: string, value: string) => {
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
    },
    [formatCardNumber, formatExpiryDate, formatCPF],
  )

  const handlePayment = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2500))

    localStorage.setItem("testPaid", "true")
    localStorage.setItem("paymentMethod", selectedPaymentMethod)
    localStorage.setItem("paymentDate", new Date().toISOString())

    setIsProcessing(false)
    closePaymentModal()
    router.push("/test")
  }

  if (!isPaymentModalOpen) return null

  const displayPrice = selectedLevel?.price || 19.9

  return (
    <div className="mobile-payment-overlay">
      <div className="mobile-payment-container">
        {/* Header Mobile */}
        <div className="mobile-payment-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="payment-icon-mobile">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Finalizar Compra</h2>
                <p className="text-sm text-white/80">Pagamento seguro</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closePaymentModal}
              className="text-white hover:bg-white/20 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Body Scrollável */}
        <div className="mobile-payment-body">
          {/* Preço */}
          <div className="mobile-price-section">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-primary mb-1">R$ {displayPrice.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Acesso completo ao teste de QI</div>
            </div>

            <div className="mobile-benefits">
              <div className="benefit-item">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Teste completo validado</span>
              </div>
              <div className="benefit-item">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Relatório detalhado</span>
              </div>
              <div className="benefit-item">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Certificado oficial</span>
              </div>
            </div>
          </div>

          {/* Métodos de Pagamento */}
          <div className="mobile-payment-methods">
            <h3 className="section-title-mobile">Forma de Pagamento</h3>
            <div className="payment-methods-grid-mobile">
              <button
                onClick={() => setSelectedPaymentMethod("credit")}
                className={`payment-method-mobile ${selectedPaymentMethod === "credit" ? "active" : ""}`}
              >
                <CreditCard className="w-6 h-6" />
                <div>
                  <div className="font-medium">Cartão</div>
                  <div className="text-xs text-muted-foreground">Visa, Master</div>
                </div>
              </button>

              <button
                onClick={() => setSelectedPaymentMethod("pix")}
                className={`payment-method-mobile ${selectedPaymentMethod === "pix" ? "active" : ""}`}
              >
                <Zap className="w-6 h-6" />
                <div>
                  <div className="font-medium">PIX</div>
                  <div className="text-xs text-muted-foreground">Instantâneo</div>
                </div>
              </button>
            </div>
          </div>

          {/* Formulário de Cartão */}
          {selectedPaymentMethod === "credit" && (
            <div className="mobile-form-section">
              <div className="mobile-form-group">
                <label className="mobile-form-label">Número do Cartão</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="0000 0000 0000 0000"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                  className="mobile-form-input"
                  maxLength={19}
                />
              </div>

              <div className="mobile-form-row">
                <div className="mobile-form-group">
                  <label className="mobile-form-label">Validade</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/AA"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                    className="mobile-form-input"
                    maxLength={5}
                  />
                </div>
                <div className="mobile-form-group">
                  <label className="mobile-form-label">CVV</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    className="mobile-form-input"
                    maxLength={4}
                  />
                </div>
              </div>

              <div className="mobile-form-group">
                <label className="mobile-form-label">Nome no Cartão</label>
                <input
                  type="text"
                  placeholder="NOME COMPLETO"
                  value={formData.cardName}
                  onChange={(e) => handleInputChange("cardName", e.target.value)}
                  className="mobile-form-input"
                />
              </div>

              <div className="mobile-form-row">
                <div className="mobile-form-group">
                  <label className="mobile-form-label">CPF</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => handleInputChange("cpf", e.target.value)}
                    className="mobile-form-input"
                    maxLength={14}
                  />
                </div>
                <div className="mobile-form-group">
                  <label className="mobile-form-label">E-mail</label>
                  <input
                    type="email"
                    inputMode="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mobile-form-input"
                  />
                </div>
              </div>
            </div>
          )}

          {/* PIX Section */}
          {selectedPaymentMethod === "pix" && (
            <div className="mobile-pix-section">
              <div className="text-center">
                <Zap className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Pagamento via PIX</h4>
                <p className="text-sm text-muted-foreground mb-4">Código PIX será gerado após confirmação</p>
                <div className="pix-benefits">✅ Aprovação imediata • ✅ Sem taxas • ✅ 100% seguro</div>
              </div>
            </div>
          )}

          {/* Segurança */}
          <div className="mobile-security-section">
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-1 text-green-500" />
                SSL Seguro
              </div>
              <div className="flex items-center">
                <Lock className="w-4 h-4 mr-1 text-green-500" />
                Criptografado
              </div>
            </div>
          </div>
        </div>

        {/* Footer Fixo */}
        <div className="mobile-payment-footer">
          <Button onClick={handlePayment} disabled={isProcessing} className="mobile-payment-button" size="lg">
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Processando...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 mr-2" />
                Pagar R$ {displayPrice.toFixed(2)}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
