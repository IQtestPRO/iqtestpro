// Performance optimization utilities
export class PerformanceOptimizer {
  private static imageCache = new Map<string, string>()
  private static resourceCache = new Map<string, any>()

  // Image optimization with lazy loading and WebP support
  static async optimizeImage(src: string, width?: number, height?: number): Promise<string> {
    const cacheKey = `${src}-${width}-${height}`

    if (this.imageCache.has(cacheKey)) {
      return this.imageCache.get(cacheKey)!
    }

    try {
      // Check if WebP is supported
      const supportsWebP = await this.checkWebPSupport()

      let optimizedSrc = src

      // Add optimization parameters
      if (width || height) {
        const params = new URLSearchParams()
        if (width) params.append("w", width.toString())
        if (height) params.append("h", height.toString())
        if (supportsWebP) params.append("format", "webp")
        params.append("q", "85") // Quality

        optimizedSrc = `${src}?${params.toString()}`
      }

      this.imageCache.set(cacheKey, optimizedSrc)
      return optimizedSrc
    } catch (error) {
      console.warn("Image optimization failed:", error)
      return src
    }
  }

  // Check WebP support
  private static checkWebPSupport(): Promise<boolean> {
    return new Promise((resolve) => {
      const webP = new Image()
      webP.onload = webP.onerror = () => resolve(webP.height === 2)
      webP.src =
        "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"
    })
  }

  // Resource preloading
  static preloadResource(href: string, as = "fetch"): void {
    if (typeof window === "undefined") return

    const link = document.createElement("link")
    link.rel = "preload"
    link.href = href
    link.as = as
    document.head.appendChild(link)
  }

  // Critical CSS inlining
  static inlineCriticalCSS(css: string): void {
    if (typeof window === "undefined") return

    const style = document.createElement("style")
    style.textContent = css
    document.head.appendChild(style)
  }

  // Bundle size monitoring
  static monitorBundleSize(): void {
    if (typeof window === "undefined" || !("performance" in window)) return

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === "navigation") {
          const navEntry = entry as PerformanceNavigationTiming
          console.log("Page Load Performance:", {
            domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
            loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
            totalTime: navEntry.loadEventEnd - navEntry.fetchStart,
          })
        }
      }
    })

    observer.observe({ entryTypes: ["navigation"] })
  }
}
