"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Path change analytics tracking
    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`

    // This is where you would normally send analytics data
    // For example with Google Analytics:
    // window.gtag('config', 'GA-MEASUREMENT-ID', { page_path: url })

    console.log(`Page view tracked: ${url}`)
  }, [pathname, searchParams])

  return null
}

export default Analytics
