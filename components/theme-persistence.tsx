"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function ThemePersistence() {
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    const applyBackgroundColor = () => {
      const currentTheme = resolvedTheme || theme || "dark"
      const isDark = currentTheme === "dark"

      // Apply background color to html and body
      const backgroundColor = isDark ? "hsl(222.2, 84%, 4.9%)" : "hsl(0, 0%, 100%)"
      document.documentElement.style.backgroundColor = backgroundColor
      document.body.style.backgroundColor = backgroundColor

      // Ensure class is applied
      document.documentElement.classList.toggle("dark", isDark)
      document.documentElement.setAttribute("data-theme", currentTheme)
    }

    // Apply immediately
    applyBackgroundColor()

    // Apply on theme change
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          applyBackgroundColor()
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [theme, resolvedTheme])

  // Handle page navigation
  useEffect(() => {
    const handleRouteChange = () => {
      setTimeout(() => {
        const currentTheme = resolvedTheme || theme
        const isDark = currentTheme === "dark"
        const backgroundColor = isDark ? "hsl(222.2, 84%, 4.9%)" : "hsl(0, 0%, 100%)"

        document.documentElement.style.backgroundColor = backgroundColor
        document.body.style.backgroundColor = backgroundColor
      }, 100)
    }

    // Listen for navigation events
    window.addEventListener("popstate", handleRouteChange)

    return () => window.removeEventListener("popstate", handleRouteChange)
  }, [theme, resolvedTheme])

  return null
}
