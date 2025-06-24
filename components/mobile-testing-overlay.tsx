"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Smartphone, Tablet, RotateCcw } from "lucide-react"

interface DeviceInfo {
  name: string
  width: number
  height: number
  category: "phone" | "tablet" | "desktop"
  icon: typeof Smartphone
}

const testDevices: DeviceInfo[] = [
  // Smartphones
  { name: "iPhone SE", width: 375, height: 667, category: "phone", icon: Smartphone },
  { name: "iPhone 12/13/14", width: 390, height: 844, category: "phone", icon: Smartphone },
  { name: "iPhone 14 Pro Max", width: 430, height: 932, category: "phone", icon: Smartphone },
  { name: "Samsung Galaxy S21", width: 360, height: 800, category: "phone", icon: Smartphone },
  { name: "Samsung Galaxy Note", width: 412, height: 915, category: "phone", icon: Smartphone },
  { name: "Google Pixel 6", width: 393, height: 851, category: "phone", icon: Smartphone },

  // Tablets
  { name: "iPad Mini", width: 768, height: 1024, category: "tablet", icon: Tablet },
  { name: "iPad Air", width: 820, height: 1180, category: "tablet", icon: Tablet },
  { name: 'iPad Pro 11"', width: 834, height: 1194, category: "tablet", icon: Tablet },
  { name: 'iPad Pro 12.9"', width: 1024, height: 1366, category: "tablet", icon: Tablet },
  { name: "Samsung Galaxy Tab", width: 800, height: 1280, category: "tablet", icon: Tablet },
  { name: "Surface Pro", width: 912, height: 1368, category: "tablet", icon: Tablet },
]

export function MobileTestingOverlay() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentDevice, setCurrentDevice] = useState<DeviceInfo | null>(null)
  const [isLandscape, setIsLandscape] = useState(false)
  const [deviceInfo, setDeviceInfo] = useState<{
    width: number
    height: number
    userAgent: string
    pixelRatio: number
  } | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDeviceInfo({
        width: window.innerWidth,
        height: window.innerHeight,
        userAgent: navigator.userAgent,
        pixelRatio: window.devicePixelRatio || 1,
      })
    }
  }, [])

  const toggleOrientation = () => {
    setIsLandscape(!isLandscape)
  }

  const getDeviceDimensions = (device: DeviceInfo) => {
    if (isLandscape) {
      return { width: device.height, height: device.width }
    }
    return { width: device.width, height: device.height }
  }

  const checkOverlapIssues = () => {
    const issues: string[] = []

    // Check for elements that might be hidden behind backgrounds
    const elementsToCheck = ["button", "img", '[role="button"]', ".subscription-plan", ".payment-form", "nav", "footer"]

    elementsToCheck.forEach((selector) => {
      const elements = document.querySelectorAll(selector)
      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect()
        const computedStyle = window.getComputedStyle(element)

        // Check if element is potentially hidden
        if (
          computedStyle.visibility === "hidden" ||
          computedStyle.display === "none" ||
          computedStyle.opacity === "0" ||
          rect.width === 0 ||
          rect.height === 0
        ) {
          issues.push(`${selector}[${index}]: Element appears to be hidden`)
        }

        // Check z-index issues
        const zIndex = Number.parseInt(computedStyle.zIndex) || 0
        if (zIndex < 0) {
          issues.push(`${selector}[${index}]: Negative z-index detected (${zIndex})`)
        }
      })
    })

    return issues
  }

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700"
        size="sm"
      >
        <Smartphone className="w-4 h-4 mr-2" />
        Test Mobile
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Mobile & Tablet Testing Dashboard</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Device Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Current Device</CardTitle>
              </CardHeader>
              <CardContent>
                {deviceInfo && (
                  <div className="space-y-2 text-sm">
                    <div>
                      Screen: {deviceInfo.width} × {deviceInfo.height}px
                    </div>
                    <div>Pixel Ratio: {deviceInfo.pixelRatio}x</div>
                    <div className="text-xs text-muted-foreground">
                      {deviceInfo.userAgent.includes("Mobile") ? "Mobile Device" : "Desktop/Tablet"}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Overlap Check</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => {
                    const issues = checkOverlapIssues()
                    if (issues.length === 0) {
                      alert("✅ No overlap issues detected!")
                    } else {
                      alert(`⚠️ Found ${issues.length} potential issues:\n\n${issues.join("\n")}`)
                    }
                  }}
                  size="sm"
                  className="w-full"
                >
                  Check for Issues
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Device Testing Grid */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Test on Different Devices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {testDevices.map((device) => {
                const Icon = device.icon
                const dimensions = getDeviceDimensions(device)
                const isActive = currentDevice?.name === device.name

                return (
                  <Card
                    key={device.name}
                    className={`cursor-pointer transition-colors ${
                      isActive ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setCurrentDevice(device)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span className="font-medium text-sm">{device.name}</span>
                        </div>
                        <Badge variant={device.category === "phone" ? "default" : "secondary"}>{device.category}</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {dimensions.width} × {dimensions.height}px
                        {isLandscape && " (Landscape)"}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Current Test Device */}
          {currentDevice && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm">
                  Testing: {currentDevice.name}
                  {isLandscape ? " (Landscape)" : " (Portrait)"}
                </CardTitle>
                <Button variant="outline" size="sm" onClick={toggleOrientation}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Rotate
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm">
                    Simulated viewport: {getDeviceDimensions(currentDevice).width} ×{" "}
                    {getDeviceDimensions(currentDevice).height}px
                  </div>

                  {/* Testing Checklist */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Testing Checklist:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        Navigation menu visible
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        Hero section images visible
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        Buttons clickable
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        Subscription plans visible
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        Forms accessible
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        Footer content visible
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        No content behind background
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        Touch targets adequate
                      </label>
                    </div>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg text-sm">
                    <strong>Note:</strong> Use browser dev tools to simulate the exact viewport size. Press F12 → Toggle
                    device toolbar → Set custom dimensions to {getDeviceDimensions(currentDevice).width} ×{" "}
                    {getDeviceDimensions(currentDevice).height}px
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Test Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Testing Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium">1. Browser DevTools Testing:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Press F12 to open DevTools</li>
                  <li>Click the device toggle button (📱)</li>
                  <li>Select different devices from the dropdown</li>
                  <li>Test both portrait and landscape orientations</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">2. Physical Device Testing:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Open the website on your smartphone/tablet</li>
                  <li>Scroll through all sections</li>
                  <li>Try rotating the device</li>
                  <li>Test touch interactions</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">3. What to Look For:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>All content is visible (not hidden behind backgrounds)</li>
                  <li>Buttons and links are clickable</li>
                  <li>Images load and display correctly</li>
                  <li>Text is readable and properly sized</li>
                  <li>No horizontal scrolling on mobile</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
