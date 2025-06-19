export const DOMAIN_CONFIG = {
  // Replace with your actual custom domain
  PRODUCTION_URL: "https://iqtestpro.online",
  DEVELOPMENT_URL: "http://localhost:3000",
  STAGING_URL: "https://staging.iqtestpro.online", // Optional staging domain
}

export function getDomainUrl(): string {
  if (process.env.NODE_ENV === "production") {
    return DOMAIN_CONFIG.PRODUCTION_URL
  }

  if (process.env.NODE_ENV === "development") {
    return DOMAIN_CONFIG.DEVELOPMENT_URL
  }

  return DOMAIN_CONFIG.STAGING_URL
}

export function getAbsoluteUrl(path = ""): string {
  const baseUrl = getDomainUrl()
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}

// Utility for generating structured data with correct domain
export function generateStructuredData(data: any) {
  return {
    ...data,
    "@context": "https://schema.org",
    url: getDomainUrl(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getDomainUrl(),
    },
  }
}
