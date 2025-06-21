// Tracking Utilities - Helper functions for consistent tracking across the application
// Provides standardized tracking methods and data formatting

import { trackCustomEvent } from "./analytics-system"
import { trackConversion } from "./utm-handler"

export interface TrackingConfig {
  enableConsoleLogging: boolean
  enableLocalStorage: boolean
  batchSize: number
  flushInterval: number
}

export const defaultTrackingConfig: TrackingConfig = {
  enableConsoleLogging: process.env.NODE_ENV === "development",
  enableLocalStorage: true,
  batchSize: 10,
  flushInterval: 30000,
}

/**
 * Enhanced button click tracking with context
 */
export function trackButtonClick(buttonText: string, buttonId?: string, context?: Record<string, any>) {
  trackCustomEvent("button_click", {
    buttonText,
    buttonId,
    page: window.location.pathname,
    timestamp: Date.now(),
    ...context,
  })
}

/**
 * Enhanced form tracking with validation
 */
export function trackFormInteraction(
  action: "start" | "complete" | "abandon" | "error",
  formName: string,
  additionalData?: Record<string, any>,
) {
  trackCustomEvent(`form_${action}`, {
    formName,
    page: window.location.pathname,
    timestamp: Date.now(),
    ...additionalData,
  })
}

/**
 * E-commerce tracking for payments and purchases
 */
export function trackEcommerce(
  action: "purchase" | "add_to_cart" | "checkout_start" | "payment_info",
  data: {
    transactionId?: string
    value: number
    currency: string
    items?: Array<{
      itemId: string
      itemName: string
      category: string
      price: number
      quantity: number
    }>
  },
) {
  trackCustomEvent(`ecommerce_${action}`, {
    ...data,
    timestamp: Date.now(),
  })

  // Track conversion for attribution
  if (action === "purchase") {
    trackConversion("purchase", data.value)
  }
}

/**
 * User engagement tracking
 */
export function trackEngagement(
  engagementType: "scroll_depth" | "time_on_page" | "video_play" | "download" | "share",
  value: number | string,
  context?: Record<string, any>,
) {
  trackCustomEvent("user_engagement", {
    engagementType,
    value,
    page: window.location.pathname,
    timestamp: Date.now(),
    ...context,
  })
}

/**
 * Error tracking
 */
export function trackError(
  errorType: "javascript" | "network" | "validation" | "payment",
  errorMessage: string,
  errorStack?: string,
  context?: Record<string, any>,
) {
  trackCustomEvent("error", {
    errorType,
    errorMessage,
    errorStack,
    page: window.location.pathname,
    userAgent: navigator.userAgent,
    timestamp: Date.now(),
    ...context,
  })
}

/**
 * Performance tracking
 */
export function trackPerformance(metricName: string, value: number, unit: "ms" | "bytes" | "count" = "ms") {
  trackCustomEvent("performance", {
    metricName,
    value,
    unit,
    page: window.location.pathname,
    timestamp: Date.now(),
  })
}

/**
 * A/B test tracking
 */
export function trackABTest(testName: string, variant: string, action: "view" | "convert") {
  trackCustomEvent("ab_test", {
    testName,
    variant,
    action,
    timestamp: Date.now(),
  })
}

/**
 * Search tracking
 */
export function trackSearch(query: string, resultsCount: number, filters?: Record<string, any>) {
  trackCustomEvent("search", {
    query,
    resultsCount,
    filters,
    timestamp: Date.now(),
  })
}

/**
 * Social sharing tracking
 */
export function trackSocialShare(platform: string, contentType: string, contentId?: string) {
  trackCustomEvent("social_share", {
    platform,
    contentType,
    contentId,
    page: window.location.pathname,
    timestamp: Date.now(),
  })
}

/**
 * Quiz/Test specific tracking
 */
export function trackQuizEvent(
  action: "start" | "question_answered" | "complete" | "abandon",
  quizType: string,
  data?: Record<string, any>,
) {
  trackCustomEvent(`quiz_${action}`, {
    quizType,
    timestamp: Date.now(),
    ...data,
  })

  // Track conversion for quiz completion
  if (action === "complete") {
    trackConversion("quiz_complete")
  }
}

/**
 * Navigation tracking
 */
export function trackNavigation(from: string, to: string, method: "click" | "browser" | "redirect" = "click") {
  trackCustomEvent("navigation", {
    from,
    to,
    method,
    timestamp: Date.now(),
  })
}

/**
 * Modal/Dialog tracking
 */
export function trackModal(action: "open" | "close" | "interact", modalName: string, duration?: number) {
  trackCustomEvent(`modal_${action}`, {
    modalName,
    duration,
    timestamp: Date.now(),
  })
}

/**
 * Video tracking
 */
export function trackVideo(
  action: "play" | "pause" | "complete" | "seek",
  videoId: string,
  currentTime: number,
  duration?: number,
) {
  trackCustomEvent(`video_${action}`, {
    videoId,
    currentTime,
    duration,
    timestamp: Date.now(),
  })
}

/**
 * File download tracking
 */
export function trackDownload(fileName: string, fileType: string, fileSize?: number) {
  trackCustomEvent("download", {
    fileName,
    fileType,
    fileSize,
    timestamp: Date.now(),
  })
}

/**
 * Custom conversion tracking with attribution
 */
export function trackCustomConversion(conversionName: string, value?: number, properties?: Record<string, any>) {
  trackCustomEvent("conversion", {
    conversionName,
    value,
    timestamp: Date.now(),
    ...properties,
  })

  trackConversion(conversionName, value)
}

/**
 * Batch event tracking for multiple events
 */
export function trackBatchEvents(
  events: Array<{
    eventName: string
    properties?: Record<string, any>
  }>,
) {
  events.forEach((event) => {
    trackCustomEvent(event.eventName, {
      ...event.properties,
      batchTracking: true,
      timestamp: Date.now(),
    })
  })
}

/**
 * Debug function to view all tracking data
 */
export function getTrackingDebugInfo() {
  if (typeof window === "undefined") return null

  return {
    session: JSON.parse(localStorage.getItem("analytics_session") || "null"),
    events: JSON.parse(localStorage.getItem("analytics_events") || "[]"),
    attribution: JSON.parse(localStorage.getItem("campaign_attribution") || "null"),
    conversions: JSON.parse(localStorage.getItem("conversions") || "[]"),
    utmParams: JSON.parse(localStorage.getItem("utm_params") || "{}"),
  }
}

/**
 * Clear all tracking data (for GDPR compliance)
 */
export function clearAllTrackingData() {
  if (typeof window === "undefined") return

  localStorage.removeItem("analytics_session")
  localStorage.removeItem("analytics_events")
  localStorage.removeItem("campaign_attribution")
  localStorage.removeItem("conversions")
  localStorage.removeItem("utm_params")

  console.log("All tracking data cleared")
}
