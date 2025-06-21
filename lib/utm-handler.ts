// UTM Parameter Handler - Specialized utility for campaign tracking
// Provides advanced UTM parameter management and campaign attribution

export interface CampaignData {
  source: string
  medium: string
  campaign: string
  term?: string
  content?: string
  timestamp: number
  firstTouch: boolean
  attribution: "first-touch" | "last-touch" | "multi-touch"
}

export interface AttributionModel {
  firstTouch: CampaignData | null
  lastTouch: CampaignData | null
  touchPoints: CampaignData[]
}

class UTMHandler {
  private static readonly STORAGE_KEY = "campaign_attribution"
  private static readonly UTM_EXPIRY = 30 * 24 * 60 * 60 * 1000 // 30 days

  /**
   * Parse UTM parameters from current URL
   */
  static parseCurrentUTM(): Partial<CampaignData> | null {
    if (typeof window === "undefined") return null

    const urlParams = new URLSearchParams(window.location.search)
    const utmData: Partial<CampaignData> = {}

    const source = urlParams.get("utm_source")
    const medium = urlParams.get("utm_medium")
    const campaign = urlParams.get("utm_campaign")
    const term = urlParams.get("utm_term")
    const content = urlParams.get("utm_content")

    if (!source && !medium && !campaign) return null

    if (source) utmData.source = source
    if (medium) utmData.medium = medium
    if (campaign) utmData.campaign = campaign
    if (term) utmData.term = term
    if (content) utmData.content = content

    return utmData
  }

  /**
   * Get or create campaign attribution data
   */
  static getAttribution(): AttributionModel {
    const stored = localStorage.getItem(this.STORAGE_KEY)
    let attribution: AttributionModel = {
      firstTouch: null,
      lastTouch: null,
      touchPoints: [],
    }

    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        // Clean expired touch points
        parsed.touchPoints = parsed.touchPoints.filter(
          (tp: CampaignData) => Date.now() - tp.timestamp < this.UTM_EXPIRY,
        )
        attribution = parsed
      } catch (error) {
        console.error("Error parsing stored attribution:", error)
      }
    }

    return attribution
  }

  /**
   * Update attribution with new UTM data
   */
  static updateAttribution(utmData: Partial<CampaignData>): AttributionModel {
    if (!utmData.source || !utmData.medium || !utmData.campaign) {
      return this.getAttribution()
    }

    const attribution = this.getAttribution()
    const now = Date.now()

    const campaignData: CampaignData = {
      source: utmData.source,
      medium: utmData.medium,
      campaign: utmData.campaign,
      term: utmData.term,
      content: utmData.content,
      timestamp: now,
      firstTouch: !attribution.firstTouch,
      attribution: "last-touch",
    }

    // Set first touch if not exists
    if (!attribution.firstTouch) {
      attribution.firstTouch = { ...campaignData, attribution: "first-touch" }
    }

    // Always update last touch
    attribution.lastTouch = campaignData

    // Add to touch points (avoid duplicates within 1 hour)
    const isDuplicate = attribution.touchPoints.some(
      (tp) =>
        tp.source === campaignData.source &&
        tp.medium === campaignData.medium &&
        tp.campaign === campaignData.campaign &&
        now - tp.timestamp < 60 * 60 * 1000, // 1 hour
    )

    if (!isDuplicate) {
      attribution.touchPoints.push(campaignData)
    }

    // Keep only last 50 touch points
    attribution.touchPoints = attribution.touchPoints.sort((a, b) => b.timestamp - a.timestamp).slice(0, 50)

    // Store updated attribution
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(attribution))

    return attribution
  }

  /**
   * Get campaign performance metrics
   */
  static getCampaignMetrics(): Record<string, any> {
    const attribution = this.getAttribution()
    const metrics: Record<string, any> = {
      totalTouchPoints: attribution.touchPoints.length,
      uniqueCampaigns: new Set(attribution.touchPoints.map((tp) => tp.campaign)).size,
      uniqueSources: new Set(attribution.touchPoints.map((tp) => tp.source)).size,
      uniqueMediums: new Set(attribution.touchPoints.map((tp) => tp.medium)).size,
      firstTouchCampaign: attribution.firstTouch?.campaign,
      lastTouchCampaign: attribution.lastTouch?.campaign,
      campaignBreakdown: {},
      sourceBreakdown: {},
      mediumBreakdown: {},
    }

    // Calculate breakdowns
    attribution.touchPoints.forEach((tp) => {
      metrics.campaignBreakdown[tp.campaign] = (metrics.campaignBreakdown[tp.campaign] || 0) + 1
      metrics.sourceBreakdown[tp.source] = (metrics.sourceBreakdown[tp.source] || 0) + 1
      metrics.mediumBreakdown[tp.medium] = (metrics.mediumBreakdown[tp.medium] || 0) + 1
    })

    return metrics
  }

  /**
   * Clear all attribution data
   */
  static clearAttribution(): void {
    localStorage.removeItem(this.STORAGE_KEY)
  }

  /**
   * Get attribution for conversion tracking
   */
  static getConversionAttribution(): {
    firstTouch: CampaignData | null
    lastTouch: CampaignData | null
    assistingTouchPoints: CampaignData[]
  } {
    const attribution = this.getAttribution()

    return {
      firstTouch: attribution.firstTouch,
      lastTouch: attribution.lastTouch,
      assistingTouchPoints: attribution.touchPoints.filter(
        (tp) => tp !== attribution.firstTouch && tp !== attribution.lastTouch,
      ),
    }
  }

  /**
   * Track conversion with attribution
   */
  static trackConversion(conversionType: string, value?: number): void {
    const attribution = this.getConversionAttribution()

    // This would typically be sent to your analytics service
    console.log("Conversion tracked:", {
      type: conversionType,
      value,
      attribution,
      timestamp: Date.now(),
    })

    // Store conversion locally for debugging
    const conversions = JSON.parse(localStorage.getItem("conversions") || "[]")
    conversions.push({
      type: conversionType,
      value,
      attribution,
      timestamp: Date.now(),
    })
    localStorage.setItem("conversions", JSON.stringify(conversions.slice(-100))) // Keep last 100
  }
}

export default UTMHandler

// Utility functions for easy access
export const parseUTM = () => UTMHandler.parseCurrentUTM()
export const getAttribution = () => UTMHandler.getAttribution()
export const updateAttribution = (utmData: Partial<CampaignData>) => UTMHandler.updateAttribution(utmData)
export const getCampaignMetrics = () => UTMHandler.getCampaignMetrics()
export const trackConversion = (type: string, value?: number) => UTMHandler.trackConversion(type, value)
