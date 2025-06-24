"use client"

import { useState, useEffect } from "react"
import { PerformanceOptimizer } from "@/lib/performance-optimizer"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  lazy?: boolean
  fallback?: string
  onLoad?: () => void
  onError?: () => void
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  lazy = true,
  fallback = "/placeholder.svg?height=300&width=400&text=Image",
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [optimizedSrc, setOptimizedSrc] = useState<string>(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(!lazy || priority)

  // Optimize image source
  useEffect(() => {
    if (isInView) {
      PerformanceOptimizer.optimizeImage(src, width, height)
        .then(setOptimizedSrc)
        .catch(() => setOptimizedSrc(src))
    }
  }, [src, width, height, isInView])

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isInView) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: "50px" },
    )

    const element = document.getElementById(`img-${src}`)
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [lazy, priority, isInView, src])

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    setOptimizedSrc(fallback)
    onError?.()
  }

  return (
    <div id={`img-${src}`} className={cn("relative overflow-hidden", className)} style={{ width, height }}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}

      {isInView && (
        <img
          src={optimizedSrc || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100",
            hasError && "opacity-50",
          )}
        />
      )}
    </div>
  )
}
