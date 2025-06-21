"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { AssetLoader } from "@/lib/asset-loader"

interface SafeImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fallbackText?: string
}

export function SafeImage({
  src,
  alt,
  width = 400,
  height = 300,
  className = "",
  fallbackText = "Image",
}: SafeImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(AssetLoader.getPlaceholderUrl(width, height, fallbackText))
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    AssetLoader.getSafeImageUrl(src, fallbackText).then((safeUrl) => {
      setImageSrc(safeUrl)
      setIsLoading(false)
    })
  }, [src, fallbackText])

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-500 text-sm">Loading...</div>
        </div>
      )}
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
        onError={() => {
          setImageSrc(AssetLoader.getPlaceholderUrl(width, height, "Error loading image"))
        }}
      />
    </div>
  )
}
