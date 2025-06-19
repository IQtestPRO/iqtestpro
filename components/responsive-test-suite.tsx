"use client"

import { useState } from "react"
import { useDeviceDetection } from "./device-detector"

const testDevices = [
  { name: "iPhone SE", width: 375, height: 667 },
  { name: "iPhone 12", width: 390, height: 844 },
  { name: "iPhone 12 Pro Max", width: 428, height: 926 },
  { name: "Galaxy S21", width: 360, height: 800 },
  { name: "iPad", width: 768, height: 1024 },
  { name: "iPad Pro", width: 1024, height: 1366 },
  { name: "Desktop HD", width: 1920, height: 1080 },
  { name: "Desktop 4K", width: 3840, height: 2160 },
]

export function ResponsiveTestSuite() {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)
  const device = useDeviceDetection()

  if (process.env.NODE_ENV !== "development") return null

  const applyDeviceSize = (width: number, height: number) => {
    const iframe = document.querySelector("#responsive-test-frame") as HTMLIFrameElement
    if (iframe) {
      iframe.style.width = `${width}px`
      iframe.style.height = `${height}px`
    }
  }

  return (
    <div className="fixed top-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <h3 className="font-bold mb-3">Responsive Test Suite</h3>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Current Device:</p>
        <div className="text-xs bg-gray-100 p-2 rounded">
          {device.viewport.width} × {device.viewport.height} ({device.type})
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Test Devices:</p>
        {testDevices.map((testDevice) => (
          <button
            key={testDevice.name}
            onClick={() => {
              setSelectedDevice(testDevice.name)
              applyDeviceSize(testDevice.width, testDevice.height)
            }}
            className={`w-full text-left px-3 py-2 text-xs rounded transition-colors ${
              selectedDevice === testDevice.name ? "bg-blue-100 text-blue-800" : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            {testDevice.name}
            <span className="text-gray-500 ml-2">
              {testDevice.width} × {testDevice.height}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          setSelectedDevice(null)
          const iframe = document.querySelector("#responsive-test-frame") as HTMLIFrameElement
          if (iframe) {
            iframe.style.width = "100%"
            iframe.style.height = "100vh"
          }
        }}
        className="w-full mt-3 px-3 py-2 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
      >
        Reset to Full Size
      </button>
    </div>
  )
}
