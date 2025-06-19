"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { CreditCard, Shield, Lock, CheckCircle, Star, Zap, ShoppingCart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TestData {
  id: number
  title: string
  price: number
  originalPrice?: number
  features: string[]
  difficulty: string
  questions: number
  timeLimit: number
  description: string
  type?: string // Adicionado para suportar diferentes tipos de dados
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [testData, setTestData] = useState<TestData | null>(null)
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

  useEffect(() => {
    // Tentar carregar dados do teste primeiro
    let savedData = localStorage.getItem("selectedTestForPayment")
    if (savedData) {
      setTestData(JSON.parse(savedData))
    } else {
      // Se não há dados de teste, tentar carregar dados de recurso
      savedData = localStorage.getItem("selectedFeatureForPayment")
      if (savedData) {
        setTestData(JSON.parse(savedData))
      } else {
        // Se não há dados, redirecionar de volta
        router.push("/")
      }
    }
  }, [router])

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
    if (!testData) return

    setIsProcessing(true)

    // Simular processamento
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Salvar dados de compra
    localStorage.setItem("testPaid", "true")
    localStorage.setItem("paymentMethod", selectedPaymentMethod)
    localStorage.setItem("paymentDate", new Date().toISOString())
    localStorage.setItem(
      "purchasedTest",
      JSON.stringify({
        ...testData,
        paymentMethod: selectedPaymentMethod,
        purchaseDate: new Date().toISOString(),
        paymentConfirmed: true,
      }),
    )

    setIsProcessing(false)

    // Redirecionar baseado no tipo
    if (testData.type === "feature") {
      router.push("/dashboard") // ou página específica do recurso
    } else {
      router.push(`/test/${testData.id}`)
    }
  }

  if (!testData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  const discountPercentage = testData.originalPrice
    ? Math.round(100 - (testData.price / testData.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-2 sm:p-4 lg:p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header responsivo */}
        <div className="flex items-center justify-between mb-4 sm:mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Voltar</span>
          </Button>
          <h1 className="text-lg sm:text-2xl font-bold text-center flex-1">Finalizar Compra</h1>
          <div className="w-20"></div> {/* Spacer para centralizar o título */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          {/* Resumo do Produto - Mobile First */}
          <div className="order-1 lg:order-2">
            <Card className="sticky top-4">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
                  Resumo da Compra
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-base sm:text-lg mb-2">{testData.title}</h3>
                  <p className="text-sm text-slate-600 mb-3">{testData.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl sm:text-3xl font-bold text-blue-600">
                        R$ {testData.price.toFixed(2)}
                      </span>
                      {testData.originalPrice && (
                        <span className="text-sm sm:text-base text-slate-500 line-through">
                          R$ {testData.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {discountPercentage > 0 && (
                      <Badge className="bg-red-500 text-white text-xs sm:text-sm">{discountPercentage}% OFF</Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm mb-4">
                    <div>
                      <div className="font-semibold">{testData.questions}</div>
                      <div className="text-slate-500">Questões</div>
                    </div>
                    <div>
                      <div className="font-semibold">{testData.timeLimit}min</div>
                      <div className="text-slate-500">Duração</div>
                    </div>
                    <div>
                      <div className="font-semibold">{testData.difficulty}</div>
                      <div className="text-slate-500">Nível</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Incluído:</h4>
                  {testData.features.map((feature, index) => (
                    <div key={index} className="flex items-start text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulário de Pagamento - Mobile First */}
          <div className="order-2 lg:order-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Dados de Pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Métodos de Pagamento */}
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-3">Forma de Pagamento</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                      variant={selectedPaymentMethod === "credit" ? "default" : "outline"}
                      onClick={() => setSelectedPaymentMethod("credit")}
                      className="w-full justify-start py-4 sm:py-6"
                    >
                      <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                      <span className="text-sm sm:text-base">Cartão de Crédito</span>
                    </Button>
                    <Button
                      variant={selectedPaymentMethod === "pix" ? "default" : "outline"}
                      onClick={() => setSelectedPaymentMethod("pix")}
                      className="w-full justify-start py-4 sm:py-6"
                    >
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                      <span className="text-sm sm:text-base">PIX</span>
                    </Button>
                  </div>
                </div>

                {/* Formulário de Cartão */}
                {selectedPaymentMethod === "credit" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Número do Cartão</label>
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                        maxLength={19}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Validade</label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                          className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                          maxLength={4}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Nome no Cartão</label>
                      <input
                        type="text"
                        placeholder="COMO ESCRITO NO CARTÃO"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange("cardName", e.target.value)}
                        className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">CPF</label>
                        <input
                          type="text"
                          placeholder="000.000.000-00"
                          value={formData.cpf}
                          onChange={(e) => handleInputChange("cpf", e.target.value)}
                          className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                          maxLength={14}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">E-mail</label>
                        <input
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Seção PIX */}
                {selectedPaymentMethod === "pix" && (
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold mb-2">Pagamento via PIX</h4>
                    <p className="text-sm text-slate-600 mb-4">
                      Ao confirmar, um código PIX será gerado para pagamento instantâneo.
                    </p>
                    <div className="text-xs text-green-600 font-medium">
                      ✅ Aprovação Imediata • ✅ 100% Seguro • ✅ Sem Taxas
                    </div>
                  </div>
                )}

                {/* Botão de Pagamento */}
                <Button
                  size="lg"
                  className="w-full text-base sm:text-lg py-4 sm:py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Processando...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                      Pagar R$ {testData.price.toFixed(2)} e Começar
                    </>
                  )}
                </Button>

                {/* Segurança */}
                <div className="flex items-center justify-center space-x-4 text-xs text-slate-500 pt-4 border-t">
                  <div className="flex items-center">
                    <Shield className="w-3 h-3 mr-1 text-green-500" />
                    SSL 256-bit
                  </div>
                  <div className="flex items-center">
                    <Lock className="w-3 h-3 mr-1 text-green-500" />
                    Dados Seguros
                  </div>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 mr-1 text-yellow-400" />
                    Garantia 7 dias
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
