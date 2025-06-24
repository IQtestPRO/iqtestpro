"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function OptimizedBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="fixed inset-0 z-0 bg-slate-900" />
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Dark gradient background - consistent throughout */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

      {/* Secondary gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20" />

      {/* Animated gradient orbs for visual interest */}
      <div className="absolute inset-0">
        {/* Large primary orb */}
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 animate-float will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)",
            animationDuration: "20s",
            filter: "blur(40px)",
          }}
        />

        {/* Medium secondary orb */}
        <div
          className="absolute top-2/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-25 animate-float-delayed will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(147, 51, 234, 0.1) 40%, transparent 70%)",
            animationDuration: "25s",
            filter: "blur(30px)",
          }}
        />

        {/* Small accent orb */}
        <div
          className="absolute top-1/2 right-1/3 w-[250px] h-[250px] rounded-full opacity-30 animate-float-slow will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(16, 185, 129, 0.1) 40%, transparent 70%)",
            animationDuration: "30s",
            filter: "blur(25px)",
          }}
        />

        {/* Additional accent orbs for more depth */}
        <div
          className="absolute top-1/6 right-1/6 w-[180px] h-[180px] rounded-full opacity-20 animate-float will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(236, 72, 153, 0.1) 40%, transparent 70%)",
            animationDuration: "35s",
            animationDelay: "-10s",
            filter: "blur(20px)",
          }}
        />

        <div
          className="absolute bottom-1/6 left-1/6 w-[300px] h-[300px] rounded-full opacity-15 animate-float-delayed will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, rgba(245, 158, 11, 0.1) 40%, transparent 70%)",
            animationDuration: "28s",
            animationDelay: "-15s",
            filter: "blur(35px)",
          }}
        />
      </div>

      {/* Subtle animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            animationDuration: "4s",
          }}
        />
      </div>

      {/* Neural network-like connecting lines */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="rgb(147, 51, 234)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Animated connecting lines */}
          <path
            d="M100,200 Q400,100 800,300 T1200,200"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ animationDuration: "3s" }}
          />
          <path
            d="M200,400 Q600,200 1000,500 T1400,400"
            stroke="url(#lineGradient)"
            strokeWidth="1.5"
            fill="none"
            className="animate-pulse"
            style={{ animationDuration: "4s", animationDelay: "-1s" }}
          />
          <path
            d="M0,600 Q300,400 700,700 T1100,600"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
            style={{ animationDuration: "5s", animationDelay: "-2s" }}
          />
        </svg>
      </div>

      {/* Subtle noise texture for depth */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial gradient overlay for focus */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(15, 23, 42, 0.3) 70%, rgba(15, 23, 42, 0.6) 100%)",
        }}
      />
    </div>
  )
}
