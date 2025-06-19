"use client"

import { useState, useEffect } from "react"

interface DeviceInfo {
  type: "mobile" | "tablet" | "desktop"
  os: "ios" | "android" | "windows" | "macos" | "linux" | "unknown"
  browser: "chrome" | "firefox" | "safari" | "edge" | "unknown"
  hasNotch: boolean
  hasTouch: boolean
  orientation: "portrait" | "landscape"
  viewport: {
    width: number
    height: number
  }
  pixelRatio: number
  isOnline: boolean
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    type: "desktop",
    os: "unknown",
    browser: "unknown",
    hasNotch: false,
    hasTouch: false,
    orientation: "portrait",
    viewport: { width: 0, height: 0 },
    pixelRatio: 1,
    isOnline: true,
  })

  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      }

      // Detect device type
      let type: DeviceInfo["type"] = "desktop"
      if (viewport.width <= 768) {
        type = "mobile"
      } else if (viewport.width <= 1024) {
        type = "tablet"
      }

      // Detect OS
      let os: DeviceInfo["os"] = "unknown"
      if (/iphone|ipad|ipod/.test(userAgent)) {
        os = "ios"
      } else if (/android/.test(userAgent)) {
        os = "android"
      } else if (/windows/.test(userAgent)) {
        os = "windows"
      } else if (/macintosh|mac os x/.test(userAgent)) {
        os = "macos"
      } else if (/linux/.test(userAgent)) {
        os = "linux"
      }

      // Detect browser
      let browser: DeviceInfo["browser"] = "unknown"
      if (/chrome/.test(userAgent) && !/edge/.test(userAgent)) {
        browser = "chrome"
      } else if (/firefox/.test(userAgent)) {
        browser = "firefox"
      } else if (/safari/.test(userAgent) && !/chrome/.test(userAgent)) {
        browser = "safari"
      } else if (/edge/.test(userAgent)) {
        browser = "edge"
      }

      // Detect notch (iPhone X and newer)
      const hasNotch =
        os === "ios" &&
        ((viewport.width === 375 && viewport.height === 812) || // iPhone X, XS, 11 Pro
          (viewport.width === 414 && viewport.height === 896) || // iPhone XR, 11, XS Max, 11 Pro Max
          (viewport.width === 390 && viewport.height === 844) || // iPhone 12, 12 Pro, 13, 13 Pro
          (viewport.width === 428 && viewport.height === 926)) // iPhone 12 Pro Max, 13 Pro Max

      // Detect touch capability
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0

      // Detect orientation
      const orientation = viewport.width > viewport.height ? "landscape" : "portrait"

      // Get pixel ratio
      const pixelRatio = window.devicePixelRatio || 1

      // Check online status
      const isOnline = navigator.onLine

      setDeviceInfo({
        type,
        os,
        browser,
        hasNotch,
        hasTouch,
        orientation,
        viewport,
        pixelRatio,
        isOnline,
      })
    }

    // Initial detection
    detectDevice()

    // Listen for changes
    const handleResize = () => detectDevice()
    const handleOrientationChange = () => setTimeout(detectDevice, 100)
    const handleOnlineChange = () => detectDevice()

    window.addEventListener("resize", handleResize)
    window.addEventListener("orientationchange", handleOrientationChange)
    window.addEventListener("online", handleOnlineChange)
    window.addEventListener("offline", handleOnlineChange)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", handleOrientationChange)
      window.removeEventListener("online", handleOnlineChange)
      window.removeEventListener("offline", handleOnlineChange)
    }
  }, [])

  return deviceInfo
}

export function DeviceDebugger() {
  const device = useDeviceDetection()

  if (process.env.NODE_ENV !== "development") return null

  return (
    <div className="fixed bottom-4 left-4 bg-black text-white p-3 rounded-lg text-xs font-mono z-50 max-w-xs">
      <div className="grid grid-cols-2 gap-2">
        <div>Type: {device.type}</div>
        <div>OS: {device.os}</div>
        <div>Browser: {device.browser}</div>
        <div>Touch: {device.hasTouch ? "Yes" : "No"}</div>
        <div>Notch: {device.hasNotch ? "Yes" : "No"}</div>
        <div>Orientation: {device.orientation}</div>
        <div>Width: {device.viewport.width}px</div>
        <div>Height: {device.viewport.height}px</div>
        <div>Ratio: {device.pixelRatio}x</div>
        <div>Online: {device.isOnline ? "Yes" : "No"}</div>
      </div>
    </div>
  )
}
