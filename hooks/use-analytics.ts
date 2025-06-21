"use client"

import { useEffect, useCallback } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { analyticsSystem, trackPageView, trackCustomEvent } from "@/lib/analytics-system"

// Hook for automatic page view tracking
export function usePageTracking() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
    const title = document.title || "Unknown Page"

    // Small delay to ensure page is fully loaded
    const timer = setTimeout(() => {
      trackPageView(title, url)
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname, searchParams])
}

// Hook for custom event tracking
export function useEventTracking() {
  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    trackCustomEvent(eventName, properties)
  }, [])

  const trackButtonClick = useCallback(
    (buttonName: string, location?: string) => {
      trackEvent("button_click", {
        buttonName,
        location: location || window.location.pathname,
      })
    },
    [trackEvent],
  )

  const trackFormStart = useCallback(
    (formName: string) => {
      trackEvent("form_start", { formName })
    },
    [trackEvent],
  )

  const trackFormComplete = useCallback(
    (formName: string, success: boolean, errorMessage?: string) => {
      trackEvent("form_complete", {
        formName,
        success,
        errorMessage,
      })
    },
    [trackEvent],
  )

  const trackModalOpen = useCallback(
    (modalName: string) => {
      trackEvent("modal_open", { modalName })
    },
    [trackEvent],
  )

  const trackModalClose = useCallback(
    (modalName: string, duration?: number) => {
      trackEvent("modal_close", {
        modalName,
        duration,
      })
    },
    [trackEvent],
  )

  const trackSearch = useCallback(
    (query: string, resultsCount?: number) => {
      trackEvent("search", {
        query,
        resultsCount,
      })
    },
    [trackEvent],
  )

  const trackDownload = useCallback(
    (fileName: string, fileType: string) => {
      trackEvent("download", {
        fileName,
        fileType,
      })
    },
    [trackEvent],
  )

  return {
    trackEvent,
    trackButtonClick,
    trackFormStart,
    trackFormComplete,
    trackModalOpen,
    trackModalClose,
    trackSearch,
    trackDownload,
  }
}

// Hook for UTM parameter access
export function useUTMParams() {
  const session = analyticsSystem.getSession()
  return session?.utmParams || {}
}

// Hook for session information
export function useAnalyticsSession() {
  const session = analyticsSystem.getSession()

  return {
    sessionId: session?.sessionId,
    utmParams: session?.utmParams || {},
    device: session?.device,
    referrer: session?.referrer,
    startTime: session?.startTime,
    pageViews: session?.pageViews,
  }
}
