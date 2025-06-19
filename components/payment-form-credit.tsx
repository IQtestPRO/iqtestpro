"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Lock } from "lucide-react"

interface PaymentFormCreditProps {
  onSubmit?: (data: any) => void
  isLoading?: boolean
  planName?: string
  planPrice?: string
}

export function PaymentFormCredit({
  onSubmit,
  isLoading = false,
  planName = "Premium",
  planPrice = "R$ 29,90",
}: PaymentFormCreditProps) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    email: "",
    cpf: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim()
  }

  const formatExpiryDate = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2")
  }

  const formatCPF = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <CreditCard className="h-5 w-5" />
          Pagamento com Cartão
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

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Número do Cartão</Label>
            <Input
              id="cardNumber"
              placeholder="0000 0000 0000 0000"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
              maxLength={19}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardName">Nome no Cartão</Label>
            <Input
              id="cardName"
              placeholder="Nome como está no cartão"
              value={formData.cardName}
              onChange={(e) => handleInputChange("cardName", e.target.value.toUpperCase())}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Validade</Label>
              <Input
                id="expiryDate"
                placeholder="MM/AA"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                maxLength={5}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                maxLength={4}
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3 w-3" />
            <span>Seus dados estão protegidos com criptografia SSL</span>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processando..." : `Pagar ${planPrice}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
