"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Copy, ExternalLink } from "lucide-react"

export function DomainVerification() {
  const [domainStatus, setDomainStatus] = useState<"checking" | "connected" | "pending">("checking")
  const [sslStatus, setSslStatus] = useState<"checking" | "active" | "pending">("checking")

  const DOMAIN = "iqtestpro.online"
  const VERCEL_DNS = "cname.vercel-dns.com"

  useEffect(() => {
    // Check domain status
    const checkDomain = async () => {
      try {
        const response = await fetch(`https://${DOMAIN}`, { mode: "no-cors" })
        setDomainStatus("connected")
        setSslStatus("active")
      } catch {
        setDomainStatus("pending")
        setSslStatus("pending")
      }
    }

    checkDomain()
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const openVercelDashboard = () => {
    window.open("https://vercel.com/dashboard", "_blank")
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Configuração do Domínio</h1>
        <p className="text-muted-foreground">Configure seu domínio iqtestpro.online</p>
      </div>

      {/* Status Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {domainStatus === "connected" ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              )}
              Status do Domínio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {domainStatus === "connected" ? "Conectado com sucesso!" : "Aguardando configuração DNS"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {sslStatus === "active" ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              )}
              Certificado SSL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{sslStatus === "active" ? "SSL ativo e seguro" : "Aguardando ativação SSL"}</p>
          </CardContent>
        </Card>
      </div>

      {/* Configuration Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Passos para Configuração</CardTitle>
          <CardDescription>Siga estes passos para conectar seu domínio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Vercel Dashboard */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                1
              </span>
              Acesse o Dashboard da Vercel
            </h3>
            <Button onClick={openVercelDashboard} className="w-full" variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Abrir Dashboard Vercel
            </Button>
          </div>

          {/* Step 2: Add Domain */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                2
              </span>
              Adicionar Domínio no Vercel
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
              <p className="text-sm">
                1. Vá em <strong>Settings → Domains</strong>
              </p>
              <p className="text-sm">
                2. Digite: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">iqtestpro.online</code>
              </p>
              <p className="text-sm">
                3. Clique em <strong>Add</strong>
              </p>
            </div>
          </div>

          {/* Step 3: DNS Configuration */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                3
              </span>
              Configurar DNS
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Adicione este registro CNAME:</p>
                <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-900 rounded border">
                  <div className="flex-1 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Tipo:</span> CNAME
                    </div>
                    <div>
                      <span className="font-medium">Nome:</span> www
                    </div>
                    <div>
                      <span className="font-medium">Valor:</span> cname.vercel-dns.com
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(VERCEL_DNS)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Para domínio raiz (opcional):</p>
                <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-900 rounded border">
                  <div className="flex-1 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Tipo:</span> A
                    </div>
                    <div>
                      <span className="font-medium">Nome:</span> @
                    </div>
                    <div>
                      <span className="font-medium">Valor:</span> 76.76.19.61
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard("76.76.19.61")}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Wait */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                4
              </span>
              Aguardar Propagação
            </h3>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <p className="text-sm">
                ⏱️ A propagação DNS pode levar de 5 minutos a 48 horas. O SSL será ativado automaticamente após a
                conexão.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Links Úteis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="https://vercel.com/docs/projects/domains" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Documentação Vercel Domains
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="https://vercel.com/help" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Suporte Vercel
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
