"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet } from "lucide-react"

interface PaymentFormWalletProps {
  onSubmit?: (data: any) => void
  isLoading?: boolean
  planName?: string
  planPrice?: string
}

const walletOptions = [
  {
    id: "paypal",
    name: "PayPal",
    icon: "💳",
    description: "Pague com sua conta PayPal",
  },
  {
    id: "mercadopago",
    name: "Mercado Pago",
    icon: "💰",
    description: "Carteira digital Mercado Pago",
  },
  {
    id: "picpay",
    name: "PicPay",
    icon: "📱",
    description: "Pague com PicPay",
  },
  {
    id: "pagseguro",
    name: "PagSeguro",
    icon: "🔒",
    description: "Carteira PagSeguro",
  },
]

export function PaymentFormWallet({
  onSubmit,
  isLoading = false,
  planName = "Premium",
  planPrice = "R$ 29,90",
}: PaymentFormWalletProps) {
  const [formData, setFormData] = useState({
    email: "",
    cpf: "",
    selectedWallet: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleWalletSelect = (walletId: string) => {
    setFormData((prev) => ({ ...prev, selectedWallet: walletId }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.selectedWallet) {
      alert("Selecione uma carteira digital")
      return
    }
    onSubmit?.(formData)
  }

  const formatCPF = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  const selectedWalletData = walletOptions.find((w) => w.id === formData.selectedWallet)

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Wallet className="h-5 w-5" />
          Carteira Digital
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {planName} - {planPrice}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={(e) => handleInputChange("cpf", formatCPF(e.target.value))}
              maxLength={14}
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Escolha sua carteira digital:</Label>
            <div className="grid grid-cols-1 gap-2">
              {walletOptions.map((wallet) => (
                <button
                  key={wallet.id}
                  type="button"
                  onClick={() => handleWalletSelect(wallet.id)}
                  className={`p-3 border rounded-lg text-left transition-all hover:bg-gray-50 ${
                    formData.selectedWallet === wallet.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{wallet.icon}</span>
                    <div>
                      <div className="font-medium">{wallet.name}</div>
                      <div className="text-sm text-muted-foreground">{wallet.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedWalletData && (
            <div className="bg-green-50 p-4 rounded-lg text-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{selectedWalletData.icon}</span>
                <span className="font-semibold">{selectedWalletData.name} selecionado</span>
              </div>
              <p className="text-muted-foreground">
                Você será redirecionado para completar o pagamento na plataforma {selectedWalletData.name}
              </p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading || !formData.selectedWallet}>
            {isLoading ? "Redirecionando..." : `Pagar com ${selectedWalletData?.name || "Carteira Digital"}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
