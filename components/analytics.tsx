"use client"

import { useEffect } from "react"
import { usePageTracking } from "@/hooks/use-analytics"
import UTMHandler from "@/lib/utm-handler"

export function Analytics() {
  // Automatic page tracking
  usePageTracking()

  useEffect(() => {
    // Initialize UTM tracking on mount
    const utmData = UTMHandler.parseCurrentUTM()
    if (utmData) {
      UTMHandler.updateAttribution(utmData)
      console.log("UTM parameters detected and stored:", utmData)
    }

    // Track initial page load
    if (typeof window !== "undefined") {
      const loadTime = performance.now()
      console.log(`Page loaded in ${loadTime.toFixed(2)}ms`)
    }
  }, [])

  return null
}

export default Analytics
