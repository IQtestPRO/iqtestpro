import type { MetadataRoute } from "next"
import { getDomainUrl } from "@/lib/domain-utils"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getDomainUrl()

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/_next/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
