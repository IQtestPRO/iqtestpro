"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function DynamicBackground() {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const currentTheme = theme === "system" ? systemTheme : theme
  const isDark = currentTheme === "dark"

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      {/* Base gradient background */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isDark
            ? "bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950"
            : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
        }`}
      />

      {/* Neural network pattern */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? "opacity-20" : "opacity-10"}`}
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, ${isDark ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.2)"} 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${isDark ? "rgba(147, 51, 234, 0.3)" : "rgba(147, 51, 234, 0.2)"} 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, ${isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.15)"} 0%, transparent 50%)
          `,
        }}
      />

      {/* Geometric brain pattern */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? "opacity-15" : "opacity-8"}`}
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 40%, ${isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)"} 50%, transparent 60%),
            linear-gradient(-45deg, transparent 40%, ${isDark ? "rgba(147, 51, 234, 0.1)" : "rgba(147, 51, 234, 0.05)"} 50%, transparent 60%)
          `,
          backgroundSize: "60px 60px, 60px 60px",
          backgroundPosition: "0 0, 30px 30px",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full transition-colors duration-1000 ${
              isDark ? "bg-blue-400/30" : "bg-blue-600/20"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle grid overlay for IQ test aesthetic */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? "opacity-5" : "opacity-3"}`}
        style={{
          backgroundImage: `
            linear-gradient(${isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)"} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)"} 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Animated synapses */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={`synapse-${i}`}
            className={`absolute transition-colors duration-1000 ${
              isDark
                ? "bg-gradient-to-r from-cyan-400/20 to-purple-400/20"
                : "bg-gradient-to-r from-cyan-600/10 to-purple-600/10"
            }`}
            style={{
              width: "2px",
              height: `${50 + Math.random() * 100}px`,
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              borderRadius: "1px",
            }}
          />
        ))}
      </div>
    </div>
  )
}
