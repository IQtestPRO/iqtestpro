"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, QrCode, Clock, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PaymentFormPixProps {
  onSubmit?: (data: any) => void
  isLoading?: boolean
  planName?: string
  planPrice?: string
}

export function PaymentFormPix({
  onSubmit,
  isLoading = false,
  planName = "Premium",
  planPrice = "R$ 29,90",
}: PaymentFormPixProps) {
  const [formData, setFormData] = useState({
    email: "",
    cpf: "",
  })
  const [pixGenerated, setPixGenerated] = useState(false)
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutos
  const { toast } = useToast()

  // Simular código PIX
  const pixCode =
    "00020126580014BR.GOV.BCB.PIX013636c4b8c4-4c4c-4c4c-4c4c-4c4c4c4c4c4c5204000053039865802BR5925TESTE DE PAGAMENTO PIX6009SAO PAULO62070503***6304"

  useEffect(() => {
    if (pixGenerated && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [pixGenerated, timeLeft])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPixGenerated(true)
    onSubmit?.(formData)
  }

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode)
    toast({
      title: "Código PIX copiado!",
      description: "Cole no seu app de pagamentos",
    })
  }

  const formatCPF = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (pixGenerated) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <QrCode className="h-5 w-5" />
            PIX Gerado
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {planName} - {planPrice}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <QrCode className="h-32 w-32 mx-auto mb-4 text-gray-600" />
            <p className="text-sm text-muted-foreground">Escaneie o QR Code com seu app de pagamentos</p>
          </div>

          <div className="space-y-2">
            <Label>Código PIX Copia e Cola</Label>
            <div className="flex gap-2">
              <Input value={pixCode} readOnly className="text-xs" />
              <Button type="button" variant="outline" size="sm" onClick={copyPixCode}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>Expira em: {formatTime(timeLeft)}</span>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Após o pagamento, o acesso será liberado automaticamente</p>
          </div>

          <Button className="w-full" variant="outline">
            <CheckCircle className="h-4 w-4 mr-2" />
            Verificar Pagamento
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <QrCode className="h-5 w-5" />
          Pagamento via PIX
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

          <div className="bg-blue-50 p-4 rounded-lg text-sm">
            <h4 className="font-semibold mb-2">Como funciona:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Clique em "Gerar PIX"</li>
              <li>• Escaneie o QR Code ou copie o código</li>
              <li>• Pague no seu app de banco</li>
              <li>• Acesso liberado automaticamente</li>
            </ul>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Gerando PIX..." : "Gerar PIX"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
