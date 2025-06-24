"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useTestCheckout } from "@/hooks/use-test-checkout"
import { Play, ChevronRight } from "lucide-react"

interface StartTestButtonProps {
  testData?: {
    id?: number
    title?: string
    subtitle?: string
    price?: number
    originalPrice?: number
    questions?: number
    timeLimit?: number
    features?: string[]
    difficulty?: string
    category?: string
    description?: string
  }
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  children?: React.ReactNode
  showIcon?: boolean
  iconType?: "play" | "arrow"
}

export function StartTestButton({
  testData,
  variant = "default",
  size = "default",
  className = "",
  children,
  showIcon = true,
  iconType = "play",
}: StartTestButtonProps) {
  const { startTest } = useTestCheckout()

  const handleClick = () => {
    startTest(testData)
  }

  const Icon = iconType === "play" ? Play : ChevronRight

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={`bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${className}`}
    >
      {showIcon && <Icon className="w-4 h-4 mr-2" />}
      {children || "Começar Teste"}
    </Button>
  )
}
