"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Crown,
  Gift,
  Shield,
  CheckCircle,
  Mail,
  MapPin,
  User,
  CreditCard,
  Camera,
  FileText,
  Award,
  Sparkles,
} from "lucide-react"

interface FormData {
  fullName: string
  email: string
  phone: string
  cpf: string
  address: string
  city: string
  state: string
  zipCode: string
  birthDate: string
  idDocument: File | null
  selfieWithId: File | null
  bankAccount: string
  bankAgency: string
  bankName: string
}

export default function FinalRewardsPage() {
  const router = useRouter()
  const [step, setStep] = useState<"verification" | "form" | "confirmation">("verification")
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    cpf: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    birthDate: "",
    idDocument: null,
    selfieWithId: null,
    bankAccount: "",
    bankAgency: "",
    bankName: "",
  })
  const [verificationLevel, setVerificationLevel] = useState<"basic" | "advanced" | "premium">("basic")

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileUpload = (field: "idDocument" | "selfieWithId", file: File) => {
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }))
  }

  const validateForm = (): boolean => {
    const required = ["fullName", "email", "phone", "cpf", "address", "city", "state", "zipCode", "birthDate"]

    return (
      required.every((field) => formData[field as keyof FormData]) &&
      formData.idDocument !== null &&
      formData.selfieWithId !== null
    )
  }

  const submitForm = () => {
    if (validateForm()) {
      setStep("confirmation")
      // Aqui seria enviado para o backend
      console.log("Form submitted:", formData)
    }
  }

  if (step === "verification") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4">
        <div className="container mx-auto max-w-4xl pt-20">
          {/* Header de Conquista */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full mb-6 animate-pulse">
              <Crown className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              🎉 VOCÊ CONQUISTOU O IMPOSSÍVEL! 🎉
            </h1>

            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xl px-6 py-3 mb-4">
              <Sparkles className="w-5 h-5 mr-2" />
              ELITE COGNITIVA - TOP 1%
              <Sparkles className="w-5 h-5 ml-2" />
            </Badge>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Parabéns! Você é uma das raríssimas pessoas que conseguiu passar na qualificação extrema. Agora você tem
              direito às recompensas mais exclusivas da plataforma.
            </p>
          </div>

          {/* Recompensas Disponíveis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardContent className="p-6 text-center">
                <Gift className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-yellow-700 mb-2">Prêmio Principal</h3>
                <div className="text-3xl font-bold text-yellow-600 mb-2">R$ 50.000</div>
                <p className="text-sm text-yellow-700">Em dinheiro ou produtos equivalentes</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-indigo-50">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-purple-700 mb-2">Certificado Elite</h3>
                <div className="text-lg font-bold text-purple-600 mb-2">Reconhecimento</div>
                <p className="text-sm text-purple-700">Certificado oficial de Elite Cognitiva</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardContent className="p-6 text-center">
                <Crown className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-blue-700 mb-2">Status VIP</h3>
                <div className="text-lg font-bold text-blue-600 mb-2">Vitalício</div>
                <p className="text-sm text-blue-700">Acesso exclusivo e benefícios especiais</p>
              </CardContent>
            </Card>
          </div>

          {/* Níveis de Verificação */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-3">
                <Shield className="w-8 h-8 text-blue-500" />
                Verificação de Identidade Obrigatória
              </h2>

              <p className="text-center text-slate-600 mb-8">
                Para garantir a segurança e legitimidade das recompensas, precisamos verificar sua identidade. Escolha o
                nível de verificação:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                  className={`cursor-pointer transition-all ${
                    verificationLevel === "basic"
                      ? "border-2 border-blue-500 bg-blue-50"
                      : "border border-slate-200 hover:border-slate-300"
                  }`}
                  onClick={() => setVerificationLevel("basic")}
                >
                  <CardContent className="p-6 text-center">
                    <Mail className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Básica</h3>
                    <p className="text-sm text-slate-600 mb-3">Email + Telefone + CPF</p>
                    <Badge className="bg-green-100 text-green-700">Até R$ 10.000</Badge>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all ${
                    verificationLevel === "advanced"
                      ? "border-2 border-blue-500 bg-blue-50"
                      : "border border-slate-200 hover:border-slate-300"
                  }`}
                  onClick={() => setVerificationLevel("advanced")}
                >
                  <CardContent className="p-6 text-center">
                    <FileText className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Avançada</h3>
                    <p className="text-sm text-slate-600 mb-3">+ Documento com foto</p>
                    <Badge className="bg-orange-100 text-orange-700">Até R$ 30.000</Badge>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all ${
                    verificationLevel === "premium"
                      ? "border-2 border-blue-500 bg-blue-50"
                      : "border border-slate-200 hover:border-slate-300"
                  }`}
                  onClick={() => setVerificationLevel("premium")}
                >
                  <CardContent className="p-6 text-center">
                    <Camera className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Premium</h3>
                    <p className="text-sm text-slate-600 mb-3">+ Selfie com documento</p>
                    <Badge className="bg-purple-100 text-purple-700">Valor Total</Badge>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-8">
                <Button
                  onClick={() => setStep("form")}
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Prosseguir com Verificação{" "}
                  {verificationLevel === "basic" ? "Básica" : verificationLevel === "advanced" ? "Avançada" : "Premium"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Garantias de Segurança */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Garantias de Segurança
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Dados protegidos com criptografia SSL</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Conformidade com LGPD</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Documentos excluídos após verificação</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Processo auditado e certificado</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === "form") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <div className="container mx-auto max-w-4xl pt-20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Formulário de Verificação</h1>
            <Badge
              className={`text-lg px-4 py-2 ${
                verificationLevel === "basic"
                  ? "bg-green-100 text-green-700"
                  : verificationLevel === "advanced"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-purple-100 text-purple-700"
              }`}
            >
              Verificação{" "}
              {verificationLevel === "basic" ? "Básica" : verificationLevel === "advanced" ? "Avançada" : "Premium"}
            </Badge>
          </div>

          <Card>
            <CardContent className="p-8">
              <form className="space-y-6">
                {/* Dados Pessoais */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Dados Pessoais
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome Completo *</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-slate-300 rounded-lg"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CPF *</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-slate-300 rounded-lg"
                        value={formData.cpf}
                        onChange={(e) => handleInputChange("cpf", e.target.value)}
                        placeholder="000.000.000-00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        className="w-full p-3 border border-slate-300 rounded-lg"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Telefone *</label>
                      <input
                        type="tel"
                        className="w-full p-3 border border-slate-300 rounded-lg"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Data de Nascimento *</label>
                      <input
                        type="date"
                        className="w-full p-3 border border-slate-300 rounded-lg"
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange("birthDate", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Endereço
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Endereço Completo *</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-slate-300 rounded-lg"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Rua, número, complemento"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Cidade *</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-slate-300 rounded-lg"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Sua cidade"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Estado *</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-slate-300 rounded-lg"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        placeholder="SP"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CEP *</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-slate-300 rounded-lg"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        placeholder="00000-000"
                      />
                    </div>
                  </div>
                </div>

                {/* Documentos */}
                {(verificationLevel === "advanced" || verificationLevel === "premium") && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Documentos
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Documento com Foto *</label>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          className="w-full p-3 border border-slate-300 rounded-lg"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload("idDocument", e.target.files[0])}
                        />
                        <p className="text-xs text-slate-500 mt-1">RG, CNH ou Passaporte</p>
                      </div>

                      {verificationLevel === "premium" && (
                        <div>
                          <label className="block text-sm font-medium mb-2">Selfie com Documento *</label>
                          <input
                            type="file"
                            accept="image/*"
                            className="w-full p-3 border border-slate-300 rounded-lg"
                            onChange={(e) => e.target.files?.[0] && handleFileUpload("selfieWithId", e.target.files[0])}
                          />
                          <p className="text-xs text-slate-500 mt-1">Foto sua segurando o documento</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Dados Bancários */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Dados Bancários (Opcional)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Banco</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-slate-300 rounded-lg"
                        value={formData.bankName}
                        onChange={(e) => handleInputChange("bankName", e.target.value)}
                        placeholder="Nome do banco"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Agência</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-slate-300 rounded-lg"
                        value={formData.bankAgency}
                        onChange={(e) => handleInputChange("bankAgency", e.target.value)}
                        placeholder="0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Conta</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-slate-300 rounded-lg"
                        value={formData.bankAccount}
                        onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                        placeholder="00000-0"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center pt-6">
                  <Button type="button" variant="outline" onClick={() => setStep("verification")}>
                    Voltar
                  </Button>
                  <Button
                    type="button"
                    onClick={submitForm}
                    disabled={!validateForm()}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    Enviar Verificação
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === "confirmation") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border-2 border-green-500">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-green-600 mb-4">Verificação Enviada!</h1>
              <p className="text-lg text-slate-600 mb-4">Seus dados foram enviados com sucesso para verificação.</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-green-800 mb-4">Próximos Passos:</h3>
              <div className="space-y-3 text-left text-green-700">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <span>Nossa equipe analisará seus documentos (até 48h)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <span>Você receberá um email de confirmação</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <span>Sua recompensa será processada e enviada</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 text-sm">
                <strong>Importante:</strong> Mantenha seu email e telefone atualizados. Entraremos em contato através
                destes canais para confirmar a entrega da sua recompensa.
              </p>
            </div>

            <Button
              onClick={() => router.push("/")}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              Voltar ao Início
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
