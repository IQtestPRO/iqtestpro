"use client"

import { useEffect } from "react"

export function PerformanceOptimizer() {
  useEffect(() => {
    // Lazy loading para imagens
    const images = document.querySelectorAll("img[data-src]")
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.src || ""
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((img) => imageObserver.observe(img))

    // Preload de recursos críticos
    const criticalResources = ["/fonts/inter.woff2", "/images/hero-bg.webp"]

    criticalResources.forEach((resource) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.href = resource
      link.as = resource.includes(".woff") ? "font" : "image"
      if (resource.includes(".woff")) {
        link.crossOrigin = "anonymous"
      }
      document.head.appendChild(link)
    })

    // Service Worker para cache
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(console.error)
    }

    return () => {
      images.forEach((img) => imageObserver.unobserve(img))
    }
  }, [])

  return null
}
