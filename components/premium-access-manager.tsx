"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { checkPremiumAccess } from "@/lib/premium-quiz-system"

interface PremiumAccessManagerProps {
  children: React.ReactNode
}

export function PremiumAccessManager({ children }: PremiumAccessManagerProps) {
  const [accessInfo, setAccessInfo] = useState({
    hasAccess: false,
    purchasedLevels: [],
    allUnlocked: false,
  })

  useEffect(() => {
    const checkAccess = () => {
      const info = checkPremiumAccess()
      setAccessInfo(info)
    }

    checkAccess()

    // Verificar mudanças no localStorage
    const handleStorageChange = () => {
      checkAccess()
    }

    window.addEventListener("storage", handleStorageChange)

    // Verificar periodicamente para mudanças na mesma aba
    const interval = setInterval(checkAccess, 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  // Disponibilizar informações de acesso globalmente
  useEffect(() => {
    ;(window as any).premiumAccess = accessInfo
  }, [accessInfo])

  return <>{children}</>
}
