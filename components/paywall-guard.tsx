"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Crown, Shield } from "lucide-react"

interface PaywallGuardProps {
  children: React.ReactNode
  requiredPlan?: "basic" | "intermediate" | "advanced" | "premium"
  testId?: number
  redirectTo?: string
}

export function PaywallGuard({ children, requiredPlan = "basic", testId, redirectTo = "/premium" }: PaywallGuardProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const validateAccess = () => {
      // Verificar se usuário está logado
      if (!user) {
        router.push("/login")
        return
      }

      // Verificar pagamento
      const purchasedTest = localStorage.getItem("purchasedTest")
      const testPaid = localStorage.getItem("testPaid")

      if (!purchasedTest && !testPaid) {
        setHasAccess(false)
        setIsLoading(false)
        return
      }

      try {
        let userPlan = "basic"

        if (testPaid === "true") {
          userPlan = localStorage.getItem("purchasedLevel") || "basic"
        } else if (purchasedTest) {
          const testData = JSON.parse(purchasedTest)
          userPlan = testData.level || "basic"
        }

        // Verificar se o plano do usuário atende ao requisito
        const planHierarchy = ["basic", "intermediate", "advanced", "premium"]
        const userPlanIndex = planHierarchy.indexOf(userPlan)
        const requiredPlanIndex = planHierarchy.indexOf(requiredPlan)

        if (userPlanIndex >= requiredPlanIndex) {
          setHasAccess(true)
        } else {
          setHasAccess(false)
        }
      } catch (error) {
        console.error("Erro na validação de acesso:", error)
        setHasAccess(false)
      }

      setIsLoading(false)
    }

    validateAccess()
  }, [user, requiredPlan, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Validando acesso...</p>
        </div>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Lock className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Conteúdo Premium</h1>
            <p className="text-slate-600 mb-6">
              Este conteúdo requer um plano {requiredPlan}. Faça upgrade para acessar.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => router.push(redirectTo)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
              >
                <Crown className="w-4 h-4 mr-2" />
                Ver Planos Premium
              </Button>
              <Button variant="outline" onClick={() => router.push("/")} className="w-full">
                Voltar ao Início
              </Button>
            </div>

            {/* Selo de segurança */}
            <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-slate-500">
              <Shield className="w-4 h-4" />
              <span>Conteúdo protegido</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
