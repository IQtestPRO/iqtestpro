// JSON data management with caching and error handling
export interface DataConfig {
  endpoint: string
  cacheDuration?: number
  retryAttempts?: number
  fallbackData?: any
}

export class JSONDataManager {
  private static cache = new Map<string, { data: any; timestamp: number; duration: number }>()
  private static loadingPromises = new Map<string, Promise<any>>()

  // Fetch JSON data with caching and error handling
  static async fetchData<T = any>(config: DataConfig): Promise<T | null> {
    const { endpoint, cacheDuration = 300000, retryAttempts = 3, fallbackData = null } = config

    // Check cache first
    const cached = this.getCachedData(endpoint, cacheDuration)
    if (cached) {
      return cached
    }

    // Check if already loading
    if (this.loadingPromises.has(endpoint)) {
      return this.loadingPromises.get(endpoint)!
    }

    // Create loading promise
    const loadingPromise = this.loadDataWithRetry<T>(endpoint, retryAttempts, fallbackData)
    this.loadingPromises.set(endpoint, loadingPromise)

    try {
      const data = await loadingPromise

      // Cache successful result
      if (data !== null) {
        this.cache.set(endpoint, {
          data,
          timestamp: Date.now(),
          duration: cacheDuration,
        })
      }

      return data
    } finally {
      this.loadingPromises.delete(endpoint)
    }
  }

  // Load data with retry logic
  private static async loadDataWithRetry<T>(
    endpoint: string,
    retryAttempts: number,
    fallbackData: any,
  ): Promise<T | null> {
    let lastError: Error | null = null

    for (let attempt = 1; attempt <= retryAttempts; attempt++) {
      try {
        // Ensure we're fetching from the correct path
        const url = endpoint.startsWith("/") ? endpoint : `/${endpoint}`

        const response = await fetch(url, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          // Add timeout
          signal: AbortSignal.timeout(10000),
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        // Check if response is actually JSON
        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          // Try to parse anyway, but log warning
          console.warn(`Expected JSON but got content-type: ${contentType}`)
        }

        const text = await response.text()

        // Check if response looks like HTML (common error case)
        if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
          throw new Error(`Received HTML instead of JSON from ${url}. Check if the file exists and is accessible.`)
        }

        let data: T
        try {
          data = JSON.parse(text)
        } catch (parseError) {
          throw new Error(
            `Invalid JSON format: ${parseError instanceof Error ? parseError.message : "Unknown parsing error"}`,
          )
        }

        // Validate JSON structure
        if (!this.validateJSONStructure(data)) {
          throw new Error("Invalid JSON structure - expected object or array")
        }

        return data
      } catch (error) {
        lastError = error as Error
        console.warn(`Attempt ${attempt}/${retryAttempts} failed for ${endpoint}:`, error)

        // Wait before retry (exponential backoff)
        if (attempt < retryAttempts) {
          await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000))
        }
      }
    }

    // All attempts failed, return fallback data
    console.error(`Failed to load data from ${endpoint} after ${retryAttempts} attempts:`, lastError)
    return fallbackData
  }

  // Get cached data if still valid
  private static getCachedData(endpoint: string, cacheDuration: number): any | null {
    const cached = this.cache.get(endpoint)
    if (!cached) return null

    const isExpired = Date.now() - cached.timestamp > cached.duration
    if (isExpired) {
      this.cache.delete(endpoint)
      return null
    }

    return cached.data
  }

  // Basic JSON structure validation
  private static validateJSONStructure(data: any): boolean {
    try {
      // Basic validation - ensure it's an object or array
      return data !== null && (typeof data === "object" || Array.isArray(data))
    } catch {
      return false
    }
  }

  // Clear cache
  static clearCache(endpoint?: string): void {
    if (endpoint) {
      this.cache.delete(endpoint)
    } else {
      this.cache.clear()
    }
  }

  // Preload data
  static async preloadData(configs: DataConfig[]): Promise<void> {
    const promises = configs.map((config) => this.fetchData(config))
    await Promise.allSettled(promises)
  }
}
