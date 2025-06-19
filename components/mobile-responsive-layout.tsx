"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useDeviceDetection } from "./device-detector"

interface ResponsiveLayoutProps {
  children: React.ReactNode
  className?: string
}

export function MobileResponsiveLayout({ children, className = "" }: ResponsiveLayoutProps) {
  const device = useDeviceDetection()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={className}>{children}</div>
  }

  const getResponsiveClasses = () => {
    const baseClasses = "w-full transition-all duration-300"

    switch (device.type) {
      case "mobile":
        return `${baseClasses} px-4 py-2 text-sm`
      case "tablet":
        return `${baseClasses} px-6 py-3 text-base`
      default:
        return `${baseClasses} px-8 py-4 text-base`
    }
  }

  const getContainerClasses = () => {
    if (device.type === "mobile") {
      return "container mx-auto max-w-full px-4"
    }
    if (device.type === "tablet") {
      return "container mx-auto max-w-4xl px-6"
    }
    return "container mx-auto max-w-7xl px-8"
  }

  return <div className={`${getContainerClasses()} ${getResponsiveClasses()} ${className}`}>{children}</div>
}
