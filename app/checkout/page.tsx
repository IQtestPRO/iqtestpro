"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PaymentFormCredit } from "@/components/payment-form-credit"
import { PaymentFormPix } from "@/components/payment-form-pix"
import { PaymentFormWallet } from "@/components/payment-form-wallet"
import { Clock, Trophy, CheckCircle, CreditCard, Zap, Shield, ArrowLeft, Lock } from "lucide-react"

type PaymentMethod = "credit" | "pix" | "paypal" | "apple" | "google"

export default function CheckoutPage() {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("pix")
  const [isProcessing, setIsProcessing] = useState(false)
  const [formValid, setFormValid] = useState(false)

  // Simular dados do produto (normalmente viria de props ou context)
  const product = {
    name: "Padrões Visuais",
    originalPrice: 19.9,
    price: 9.9,
    duration: "15 minutos",
    questions: "15 questões",
    level: "Básico",
    features: [
      "15 questões de padrões visuais",
      "Feedback detalhado",
      "Certificado digital",
      "Comparação com outros usuários",
    ],
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simular processamento de pagamento
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirecionar para página de sucesso
    router.push("/checkout/success")
  }

  const paymentMethods = [
    {
      id: "credit" as PaymentMethod,
      name: "Cartão de Crédito",
      description: "Visa, Mastercard, Elo",
      icon: CreditCard,
      badge: "Mais usado",
      badgeColor: "bg-green-100 text-green-700",
    },
    {
      id: "pix" as PaymentMethod,
      name: "PIX",
      description: "Pagamento instantâneo",
      icon: Zap,
      badge: null,
      badgeColor: "",
    },
    {
      id: "paypal" as PaymentMethod,
      name: "PayPal",
      description: "Pagamento seguro",
      icon: Shield,
      badge: null,
      badgeColor: "",
    },
  ]

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case "credit":
        return <PaymentFormCredit onValidChange={setFormValid} />
      case "pix":
        return <PaymentFormPix onValidChange={setFormValid} />
      case "paypal":
      case "apple":
      case "google":
        return <PaymentFormWallet method={selectedMethod} onValidChange={setFormValid} />
      default:
        return null
    }
  }

  // Auto-validar PIX (não precisa de formulário)
  useEffect(() => {
    if (selectedMethod === "pix") {
      setFormValid(true)
    }
  }, [selectedMethod])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header Mobile */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Voltar</span>
          </Button>
          <h1 className="font-semibold text-lg">Finalizar Compra</h1>
          <div className="w-16" /> {/* Spacer */}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Resumo do Produto */}
          <div className="space-y-6">
            <Card className="shadow-soft border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  >
                    {product.level}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {product.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    {product.questions}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground line-through">
                    R$ {product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold">Incluído:</h4>
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Métodos de Pagamento */}
            <Card className="shadow-soft border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Escolha a forma de pagamento:</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  const isSelected = selectedMethod === method.id

                  return (
                    <div
                      key={method.id}
                      className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            isSelected ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-700"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{method.name}</span>
                            {method.badge && <Badge className={method.badgeColor}>{method.badge}</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 ${
                            isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          {isSelected && <div className="w-full h-full rounded-full bg-white scale-50" />}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Selo de Segurança */}
            <div className="flex items-center justify-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <Lock className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="font-medium text-green-700 dark:text-green-300">Pagamento 100% Seguro</span>
            </div>
          </div>

          {/* Formulário de Pagamento */}
          <div className="space-y-6">{renderPaymentForm()}</div>
        </div>

        {/* Botão de Finalizar - SEMPRE VISÍVEL NO MOBILE */}
        <div className="sticky bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 p-4 mt-6 -mx-4">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">Total a pagar:</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">R$ {product.price.toFixed(2)}</p>
              </div>

              <Button
                onClick={handlePayment}
                disabled={!formValid || isProcessing}
                className="w-full sm:w-auto min-w-[200px] h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processando...
                  </div>
                ) : (
                  `Finalizar Pagamento - R$ ${product.price.toFixed(2)}`
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
