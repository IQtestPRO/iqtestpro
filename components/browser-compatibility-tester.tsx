"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertTriangle, Monitor } from "lucide-react"

interface BrowserInfo {
  name: string
  version: string
  engine: string
  isSupported: boolean
}

interface TestResult {
  test: string
  status: "pass" | "fail" | "warning"
  message: string
  element?: HTMLElement | null
}

export function BrowserCompatibilityTester() {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    detectBrowser()
  }, [])

  const detectBrowser = () => {
    const userAgent = navigator.userAgent
    let browserName = "Unknown"
    let browserVersion = "Unknown"
    let browserEngine = "Unknown"
    const isSupported = true

    // Detect Brave Browser
    if ((navigator as any).brave && (navigator as any).brave.isBrave) {
      browserName = "Brave"
      browserEngine = "Chromium/Blink"
    }
    // Detect Edge
    else if (userAgent.includes("Edg/")) {
      browserName = "Microsoft Edge"
      const match = userAgent.match(/Edg\/([0-9.]+)/)
      browserVersion = match ? match[1] : "Unknown"
      browserEngine = "Chromium/Blink"
    }
    // Detect Chrome
    else if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
      browserName = "Google Chrome"
      const match = userAgent.match(/Chrome\/([0-9.]+)/)
      browserVersion = match ? match[1] : "Unknown"
      browserEngine = "Chromium/Blink"
    }
    // Detect Firefox
    else if (userAgent.includes("Firefox")) {
      browserName = "Mozilla Firefox"
      const match = userAgent.match(/Firefox\/([0-9.]+)/)
      browserVersion = match ? match[1] : "Unknown"
      browserEngine = "Gecko"
    }
    // Detect Safari
    else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
      browserName = "Safari"
      const match = userAgent.match(/Version\/([0-9.]+)/)
      browserVersion = match ? match[1] : "Unknown"
      browserEngine = "WebKit"
    }

    setBrowserInfo({
      name: browserName,
      version: browserVersion,
      engine: browserEngine,
      isSupported,
    })
  }

  const runCompatibilityTests = async () => {
    setIsRunning(true)
    const results: TestResult[] = []

    // Test 1: Z-Index Stacking
    const testZIndex = () => {
      const mainContent = document.querySelector('[class*="z-10"]')
      const backgrounds = document.querySelectorAll('[class*="-z-"]')

      if (mainContent && backgrounds.length > 0) {
        const mainZIndex = window.getComputedStyle(mainContent).zIndex
        const isProperlyStacked = Number.parseInt(mainZIndex) > 0

        results.push({
          test: "Z-Index Stacking",
          status: isProperlyStacked ? "pass" : "fail",
          message: isProperlyStacked
            ? `Content properly stacked (z-index: ${mainZIndex})`
            : `Content stacking issue detected (z-index: ${mainZIndex})`,
          element: mainContent as HTMLElement,
        })
      } else {
        results.push({
          test: "Z-Index Stacking",
          status: "warning",
          message: "Could not find main content or background elements",
        })
      }
    }

    // Test 2: Background Visibility
    const testBackgroundVisibility = () => {
      const dynamicBg = document.querySelector('[class*="dynamic-background"]')
      const neuralBg = document.querySelector('[class*="neural-background"]')

      let bgVisible = false
      if (dynamicBg || neuralBg) {
        const element = dynamicBg || neuralBg
        const styles = window.getComputedStyle(element as Element)
        const isVisible = styles.display !== "none" && styles.visibility !== "hidden"
        bgVisible = isVisible
      }

      results.push({
        test: "Background Visibility",
        status: bgVisible ? "pass" : "warning",
        message: bgVisible
          ? "Background elements are visible and rendering"
          : "Background elements may not be rendering properly",
      })
    }

    // Test 3: Content Accessibility
    const testContentAccessibility = () => {
      const buttons = document.querySelectorAll("button")
      const links = document.querySelectorAll("a")
      const forms = document.querySelectorAll("form")

      let accessibleElements = 0
      const totalElements = buttons.length + links.length + forms.length

      // Test buttons
      buttons.forEach((button) => {
        const styles = window.getComputedStyle(button)
        if (styles.pointerEvents !== "none" && styles.display !== "none") {
          accessibleElements++
        }
      })

      // Test links
      links.forEach((link) => {
        const styles = window.getComputedStyle(link)
        if (styles.pointerEvents !== "none" && styles.display !== "none") {
          accessibleElements++
        }
      })

      // Test forms
      forms.forEach((form) => {
        const styles = window.getComputedStyle(form)
        if (styles.pointerEvents !== "none" && styles.display !== "none") {
          accessibleElements++
        }
      })

      const accessibilityRatio = totalElements > 0 ? accessibleElements / totalElements : 0

      results.push({
        test: "Content Accessibility",
        status: accessibilityRatio > 0.9 ? "pass" : accessibilityRatio > 0.7 ? "warning" : "fail",
        message: `${accessibleElements}/${totalElements} interactive elements are accessible (${Math.round(accessibilityRatio * 100)}%)`,
      })
    }

    // Test 4: Viewport Rendering
    const testViewportRendering = () => {
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio || 1,
      }

      const isDesktop = viewport.width >= 1024
      const hasProperDPR = viewport.devicePixelRatio >= 1

      results.push({
        test: "Viewport Rendering",
        status: isDesktop && hasProperDPR ? "pass" : "warning",
        message: `Desktop: ${isDesktop ? "Yes" : "No"} (${viewport.width}x${viewport.height}), DPR: ${viewport.devicePixelRatio}`,
      })
    }

    // Test 5: CSS Transform Support
    const testCSSTransforms = () => {
      const testElement = document.createElement("div")
      testElement.style.transform = "translateZ(0)"
      document.body.appendChild(testElement)

      const styles = window.getComputedStyle(testElement)
      const supportsTransforms = styles.transform !== "none"

      document.body.removeChild(testElement)

      results.push({
        test: "CSS Transform Support",
        status: supportsTransforms ? "pass" : "fail",
        message: supportsTransforms
          ? "CSS transforms are supported and working"
          : "CSS transforms may not be working properly",
      })
    }

    // Test 6: Backdrop Filter Support
    const testBackdropFilter = () => {
      const testElement = document.createElement("div")
      testElement.style.backdropFilter = "blur(10px)"
      document.body.appendChild(testElement)

      const styles = window.getComputedStyle(testElement)
      const supportsBackdropFilter = styles.backdropFilter !== "none"

      document.body.removeChild(testElement)

      results.push({
        test: "Backdrop Filter Support",
        status: supportsBackdropFilter ? "pass" : "warning",
        message: supportsBackdropFilter
          ? "Backdrop filters are supported"
          : "Backdrop filters not supported - fallback styling active",
      })
    }

    // Run all tests with delays for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))
    testZIndex()

    await new Promise((resolve) => setTimeout(resolve, 300))
    testBackgroundVisibility()

    await new Promise((resolve) => setTimeout(resolve, 300))
    testContentAccessibility()

    await new Promise((resolve) => setTimeout(resolve, 300))
    testViewportRendering()

    await new Promise((resolve) => setTimeout(resolve, 300))
    testCSSTransforms()

    await new Promise((resolve) => setTimeout(resolve, 300))
    testBackdropFilter()

    setTestResults(results)
    setIsRunning(false)
  }

  const getBrowserSpecificAdvice = () => {
    if (!browserInfo) return null

    const advice = {
      Brave: {
        color: "orange",
        tips: [
          "Brave blocks trackers by default - ensure analytics work correctly",
          "Shield settings may affect CSS animations",
          "Test with shields up and down",
          "Verify payment forms work with Brave's privacy features",
        ],
      },
      "Microsoft Edge": {
        color: "blue",
        tips: [
          "Edge uses Chromium engine - should behave like Chrome",
          "Test with Enhanced Security mode enabled",
          "Verify compatibility with Windows high contrast mode",
          "Check SmartScreen doesn't block any resources",
        ],
      },
    }

    return advice[browserInfo.name as keyof typeof advice]
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "fail":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700"
        size="sm"
      >
        <Monitor className="h-4 w-4 mr-2" />
        Test Browser
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Browser Compatibility Test - Desktop
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => setIsVisible(false)}>
              Close
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Browser Information */}
          {browserInfo && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Browser</h3>
                <Badge
                  variant={
                    browserInfo.name.includes("Brave") || browserInfo.name.includes("Edge") ? "default" : "secondary"
                  }
                >
                  {browserInfo.name}
                </Badge>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Version</h3>
                <p className="text-sm text-muted-foreground">{browserInfo.version}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Engine</h3>
                <p className="text-sm text-muted-foreground">{browserInfo.engine}</p>
              </div>
            </div>
          )}

          {/* Test Controls */}
          <div className="flex gap-2">
            <Button onClick={runCompatibilityTests} disabled={isRunning} className="flex-1">
              {isRunning ? "Running Tests..." : "Run Compatibility Tests"}
            </Button>
          </div>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Test Results</h3>
              {testResults.map((result, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  {getStatusIcon(result.status)}
                  <div className="flex-1">
                    <div className="font-medium">{result.test}</div>
                    <div className="text-sm text-muted-foreground">{result.message}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Browser-Specific Advice */}
          {getBrowserSpecificAdvice() && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="font-semibold mb-2">{browserInfo?.name} Specific Testing Tips:</div>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {getBrowserSpecificAdvice()?.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Manual Testing Checklist */}
          <div className="space-y-3">
            <h3 className="font-semibold">Manual Testing Checklist for {browserInfo?.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium">Visual Elements</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>□ All images load correctly</li>
                  <li>□ Buttons are visible and clickable</li>
                  <li>□ Subscription plans display properly</li>
                  <li>□ Navigation menu works</li>
                  <li>□ Footer content is accessible</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Interactive Elements</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>□ Forms submit correctly</li>
                  <li>□ Payment modals open</li>
                  <li>□ Links navigate properly</li>
                  <li>□ Animations play smoothly</li>
                  <li>□ No content is hidden behind backgrounds</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Performance Tips */}
          <Alert>
            <Monitor className="h-4 w-4" />
            <AlertDescription>
              <div className="font-semibold mb-2">Performance Testing:</div>
              <p className="text-sm">
                Open Developer Tools (F12) → Performance tab → Record while navigating the site. Look for layout shifts,
                long tasks, or rendering issues specific to {browserInfo?.name}.
              </p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
