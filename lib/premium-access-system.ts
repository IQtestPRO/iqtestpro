"use client"

import { useEffect } from "react"

import { useState } from "react"

export interface PremiumAccessInfo {
  hasAccess: boolean
  purchasedLevels: string[]
  allUnlocked: boolean
  purchaseDate?: string
  paymentMethod?: string
  unlockedAt?: string
}

export function checkPremiumAccess(): PremiumAccessInfo {
  try {
    // Verificar se tem acesso geral
    const testPaid = localStorage.getItem("testPaid")
    const allQuizzesUnlocked = localStorage.getItem("allQuizzesUnlocked")
    const purchasedTest = localStorage.getItem("purchasedTest")
    const paymentDate = localStorage.getItem("paymentDate")
    const paymentMethod = localStorage.getItem("paymentMethod")
    const unlockedAt = localStorage.getItem("unlockedAt")

    // Se qualquer uma das condições for verdadeira, desbloquear tudo
    if (testPaid === "true" || allQuizzesUnlocked === "true") {
      return {
        hasAccess: true,
        purchasedLevels: ["spatial", "logical", "abstract", "expert"],
        allUnlocked: true,
        purchaseDate: paymentDate || undefined,
        paymentMethod: paymentMethod || undefined,
        unlockedAt: unlockedAt || undefined,
      }
    }

    // Verificar se tem teste específico comprado
    if (purchasedTest) {
      try {
        const testData = JSON.parse(purchasedTest)
        if (testData.paymentConfirmed) {
          // Mesmo comprando um teste específico, desbloquear todos
          unlockAllQuizzes()
          return {
            hasAccess: true,
            purchasedLevels: ["spatial", "logical", "abstract", "expert"],
            allUnlocked: true,
            purchaseDate: testData.purchaseDate,
            paymentMethod: testData.paymentMethod,
            unlockedAt: new Date().toISOString(),
          }
        }
      } catch (error) {
        console.error("Error parsing purchased test data:", error)
      }
    }

    return {
      hasAccess: false,
      purchasedLevels: [],
      allUnlocked: false,
    }
  } catch (error) {
    console.error("Error checking premium access:", error)
    return {
      hasAccess: false,
      purchasedLevels: [],
      allUnlocked: false,
    }
  }
}

export function unlockAllQuizzes(): void {
  localStorage.setItem("testPaid", "true")
  localStorage.setItem("allQuizzesUnlocked", "true")
  localStorage.setItem("unlockedAt", new Date().toISOString())

  // Disparar evento customizado para atualizar componentes
  window.dispatchEvent(
    new CustomEvent("premiumUnlocked", {
      detail: { unlockedAt: new Date().toISOString() },
    }),
  )
}

export function resetPremiumAccess(): void {
  localStorage.removeItem("testPaid")
  localStorage.removeItem("allQuizzesUnlocked")
  localStorage.removeItem("purchasedTest")
  localStorage.removeItem("paymentDate")
  localStorage.removeItem("paymentMethod")
  localStorage.removeItem("unlockedAt")
  localStorage.removeItem("purchasedLevelId")

  window.dispatchEvent(new CustomEvent("premiumReset"))
}

// Hook para usar o sistema de acesso premium
export function usePremiumAccess() {
  const [accessInfo, setAccessInfo] = useState<PremiumAccessInfo>(checkPremiumAccess())

  useEffect(() => {
    const handlePremiumUnlocked = () => {
      setAccessInfo(checkPremiumAccess())
    }

    const handlePremiumReset = () => {
      setAccessInfo(checkPremiumAccess())
    }

    window.addEventListener("premiumUnlocked", handlePremiumUnlocked)
    window.addEventListener("premiumReset", handlePremiumReset)

    return () => {
      window.removeEventListener("premiumUnlocked", handlePremiumUnlocked)
      window.removeEventListener("premiumReset", handlePremiumReset)
    }
  }, [])

  return {
    ...accessInfo,
    refresh: () => setAccessInfo(checkPremiumAccess()),
    unlock: unlockAllQuizzes,
    reset: resetPremiumAccess,
  }
}
