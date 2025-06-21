// Analytics System - Comprehensive tracking and UTM parameter handling
// This system provides scalable analytics tracking across the entire application

export interface UTMParameters {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

export interface UserSession {
  sessionId: string
  userId?: string
  startTime: number
  lastActivity: number
  pageViews: number
  utmParams: UTMParameters
  referrer: string
  userAgent: string
  device: "mobile" | "tablet" | "desktop"
  country?: string
}

export interface AnalyticsEvent {
  eventId: string
  sessionId: string
  userId?: string
  eventType: "page_view" | "click" | "form_submission" | "test_start" | "test_complete" | "payment" | "custom"
  eventName: string
  timestamp: number
  page: string
  properties: Record<string, any>
  utmParams: UTMParameters
}

export interface PageViewEvent extends AnalyticsEvent {
  eventType: "page_view"
  properties: {
    title: string
    url: string
    referrer: string
    loadTime?: number
    scrollDepth?: number
  }
}

export interface ClickEvent extends AnalyticsEvent {
  eventType: "click"
  properties: {
    elementType: string
    elementText: string
    elementId?: string
    elementClass?: string
    position: { x: number; y: number }
  }
}

export interface FormSubmissionEvent extends AnalyticsEvent {
  eventType: "form_submission"
  properties: {
    formId: string
    formName: string
    fields: string[]
    success: boolean
    errorMessage?: string
  }
}

class AnalyticsSystem {
  private session: UserSession | null = null
  private events: AnalyticsEvent[] = []
  private isInitialized = false
  private batchSize = 10
  private flushInterval = 30000 // 30 seconds

  constructor() {
    if (typeof window !== "undefined") {
      this.initialize()
    }
  }

  private initialize() {
    if (this.isInitialized) return

    this.session = this.createOrRestoreSession()
    this.setupEventListeners()
    this.startPeriodicFlush()
    this.isInitialized = true

    console.log("Analytics System initialized", this.session)
  }

  private createOrRestoreSession(): UserSession {
    const existingSession = this.getStoredSession()
    const now = Date.now()

    // Check if session is still valid (less than 30 minutes old)
    if (existingSession && now - existingSession.lastActivity < 30 * 60 * 1000) {
      existingSession.lastActivity = now
      existingSession.pageViews += 1
      this.storeSession(existingSession)
      return existingSession
    }

    // Create new session
    const newSession: UserSession = {
      sessionId: this.generateId(),
      startTime: now,
      lastActivity: now,
      pageViews: 1,
      utmParams: this.parseUTMParameters(),
      referrer: document.referrer || "direct",
      userAgent: navigator.userAgent,
      device: this.detectDevice(),
    }

    this.storeSession(newSession)
    return newSession
  }

  private parseUTMParameters(): UTMParameters {
    const urlParams = new URLSearchParams(window.location.search)
    const utmParams: UTMParameters = {}

    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
    utmKeys.forEach((key) => {
      const value = urlParams.get(key)
      if (value) {
        utmParams[key as keyof UTMParameters] = value
      }
    })

    // Store UTM parameters in localStorage for session persistence
    if (Object.keys(utmParams).length > 0) {
      localStorage.setItem("utm_params", JSON.stringify(utmParams))
    } else {
      // Try to get stored UTM parameters
      const stored = localStorage.getItem("utm_params")
      if (stored) {
        return JSON.parse(stored)
      }
    }

    return utmParams
  }

  private detectDevice(): "mobile" | "tablet" | "desktop" {
    const width = window.innerWidth
    if (width < 768) return "mobile"
    if (width < 1024) return "tablet"
    return "desktop"
  }

  private setupEventListeners() {
    // Track clicks
    document.addEventListener("click", this.handleClick.bind(this), true)

    // Track form submissions
    document.addEventListener("submit", this.handleFormSubmission.bind(this), true)

    // Track page visibility changes
    document.addEventListener("visibilitychange", this.handleVisibilityChange.bind(this))

    // Track scroll depth
    let maxScrollDepth = 0
    window.addEventListener("scroll", () => {
      const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth
        this.updatePageViewScrollDepth(scrollDepth)
      }
    })

    // Track page unload
    window.addEventListener("beforeunload", () => {
      this.flush()
    })
  }

  private handleClick(event: Event) {
    const target = event.target as HTMLElement
    if (!target) return

    const clickEvent: ClickEvent = {
      eventId: this.generateId(),
      sessionId: this.session!.sessionId,
      userId: this.getCurrentUserId(),
      eventType: "click",
      eventName: "element_click",
      timestamp: Date.now(),
      page: window.location.pathname,
      properties: {
        elementType: target.tagName.toLowerCase(),
        elementText: target.textContent?.slice(0, 100) || "",
        elementId: target.id || undefined,
        elementClass: target.className || undefined,
        position: {
          x: (event as MouseEvent).clientX,
          y: (event as MouseEvent).clientY,
        },
      },
      utmParams: this.session!.utmParams,
    }

    this.trackEvent(clickEvent)
  }

  private handleFormSubmission(event: Event) {
    const form = event.target as HTMLFormElement
    if (!form) return

    const formData = new FormData(form)
    const fields = Array.from(formData.keys())

    const formEvent: FormSubmissionEvent = {
      eventId: this.generateId(),
      sessionId: this.session!.sessionId,
      userId: this.getCurrentUserId(),
      eventType: "form_submission",
      eventName: "form_submit",
      timestamp: Date.now(),
      page: window.location.pathname,
      properties: {
        formId: form.id || "unknown",
        formName: form.name || form.id || "unknown",
        fields: fields,
        success: true, // Will be updated if there's an error
      },
      utmParams: this.session!.utmParams,
    }

    this.trackEvent(formEvent)
  }

  private handleVisibilityChange() {
    if (document.hidden) {
      this.flush()
    } else {
      this.updateSessionActivity()
    }
  }

  private updatePageViewScrollDepth(scrollDepth: number) {
    // Update the last page view event with scroll depth
    const lastPageView = this.events.filter((e) => e.eventType === "page_view").pop() as PageViewEvent

    if (lastPageView) {
      lastPageView.properties.scrollDepth = scrollDepth
    }
  }

  // Public methods for tracking specific events

  public trackPageView(title: string, url: string) {
    if (!this.session) return

    const pageViewEvent: PageViewEvent = {
      eventId: this.generateId(),
      sessionId: this.session.sessionId,
      userId: this.getCurrentUserId(),
      eventType: "page_view",
      eventName: "page_view",
      timestamp: Date.now(),
      page: url,
      properties: {
        title,
        url,
        referrer: document.referrer,
        loadTime: performance.now(),
      },
      utmParams: this.session.utmParams,
    }

    this.trackEvent(pageViewEvent)
    this.updateSessionActivity()
  }

  public trackCustomEvent(eventName: string, properties: Record<string, any> = {}) {
    if (!this.session) return

    const customEvent: AnalyticsEvent = {
      eventId: this.generateId(),
      sessionId: this.session.sessionId,
      userId: this.getCurrentUserId(),
      eventType: "custom",
      eventName,
      timestamp: Date.now(),
      page: window.location.pathname,
      properties,
      utmParams: this.session.utmParams,
    }

    this.trackEvent(customEvent)
  }

  public trackTestStart(testType: string, testLevel?: string) {
    this.trackCustomEvent("test_start", {
      testType,
      testLevel,
      timestamp: Date.now(),
    })
  }

  public trackTestComplete(testType: string, score: number, duration: number) {
    this.trackCustomEvent("test_complete", {
      testType,
      score,
      duration,
      timestamp: Date.now(),
    })
  }

  public trackPayment(amount: number, currency: string, paymentMethod: string, success: boolean) {
    this.trackCustomEvent("payment", {
      amount,
      currency,
      paymentMethod,
      success,
      timestamp: Date.now(),
    })
  }

  private trackEvent(event: AnalyticsEvent) {
    this.events.push(event)

    // Auto-flush if batch size is reached
    if (this.events.length >= this.batchSize) {
      this.flush()
    }
  }

  private updateSessionActivity() {
    if (this.session) {
      this.session.lastActivity = Date.now()
      this.storeSession(this.session)
    }
  }

  private flush() {
    if (this.events.length === 0) return

    // In a real application, you would send this data to your analytics service
    console.log("Flushing analytics events:", this.events)

    // Store events locally for debugging/development
    const storedEvents = JSON.parse(localStorage.getItem("analytics_events") || "[]")
    storedEvents.push(...this.events)
    localStorage.setItem("analytics_events", JSON.stringify(storedEvents.slice(-1000))) // Keep last 1000 events

    // Clear events after flushing
    this.events = []
  }

  private startPeriodicFlush() {
    setInterval(() => {
      this.flush()
    }, this.flushInterval)
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  private getCurrentUserId(): string | undefined {
    // Try to get user ID from localStorage or context
    const user = localStorage.getItem("currentUser")
    if (user) {
      try {
        return JSON.parse(user).id
      } catch {
        return undefined
      }
    }
    return undefined
  }

  private getStoredSession(): UserSession | null {
    const stored = localStorage.getItem("analytics_session")
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return null
      }
    }
    return null
  }

  private storeSession(session: UserSession) {
    localStorage.setItem("analytics_session", JSON.stringify(session))
  }

  // Public getters for debugging and reporting
  public getSession(): UserSession | null {
    return this.session
  }

  public getEvents(): AnalyticsEvent[] {
    return [...this.events]
  }

  public getStoredEvents(): AnalyticsEvent[] {
    const stored = localStorage.getItem("analytics_events")
    return stored ? JSON.parse(stored) : []
  }

  public clearData() {
    localStorage.removeItem("analytics_session")
    localStorage.removeItem("analytics_events")
    localStorage.removeItem("utm_params")
    this.events = []
    this.session = null
  }
}

// Export singleton instance
export const analyticsSystem = new AnalyticsSystem()

// Export utility functions
export const trackPageView = (title: string, url: string) => analyticsSystem.trackPageView(title, url)
export const trackCustomEvent = (eventName: string, properties?: Record<string, any>) =>
  analyticsSystem.trackCustomEvent(eventName, properties)
export const trackTestStart = (testType: string, testLevel?: string) =>
  analyticsSystem.trackTestStart(testType, testLevel)
export const trackTestComplete = (testType: string, score: number, duration: number) =>
  analyticsSystem.trackTestComplete(testType, score, duration)
export const trackPayment = (amount: number, currency: string, paymentMethod: string, success: boolean) =>
  analyticsSystem.trackPayment(amount, currency, paymentMethod, success)
