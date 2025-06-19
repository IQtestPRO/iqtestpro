"use client"

import { useEffect } from "react"

interface DomainConfigProps {
  customDomain: string
}

export function DomainConfig({ customDomain }: DomainConfigProps) {
  useEffect(() => {
    // Update any client-side references to the domain
    if (typeof window !== "undefined") {
      // Update canonical links dynamically if needed
      const canonicalLink = document.querySelector('link[rel="canonical"]')
      if (canonicalLink) {
        canonicalLink.setAttribute("href", `${customDomain}${window.location.pathname}`)
      }

      // Update any social sharing URLs
      const ogUrlMeta = document.querySelector('meta[property="og:url"]')
      if (ogUrlMeta) {
        ogUrlMeta.setAttribute("content", `${customDomain}${window.location.pathname}`)
      }
    }
  }, [customDomain])

  return null
}
