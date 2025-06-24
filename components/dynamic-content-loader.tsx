"use client"

import { useJSONData } from "@/hooks/use-json-data"
import { OptimizedImage } from "./optimized-image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, RefreshCw } from "lucide-react"

interface ContentItem {
  id: string
  title: string
  description: string
  image?: string
  price?: number
  category?: string
  featured?: boolean
  metadata?: Record<string, any>
}

interface DynamicContentLoaderProps {
  endpoint: string
  type: "products" | "posts" | "profiles" | "plans"
  limit?: number
  className?: string
  fallbackData?: ContentItem[]
}

export function DynamicContentLoader({
  endpoint,
  type,
  limit = 10,
  className,
  fallbackData = [],
}: DynamicContentLoaderProps) {
  const { data, loading, error, refetch } = useJSONData<ContentItem[]>({
    endpoint,
    cacheDuration: 300000, // 5 minutes
    retryAttempts: 3,
    fallbackData,
    autoFetch: true,
  })

  const items = data?.slice(0, limit) || []

  if (loading) {
    return (
      <div className={className}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: Math.min(limit, 3) }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`${className} flex flex-col items-center justify-center p-8 text-center`}>
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Failed to Load Content</h3>
        <p className="text-muted-foreground mb-4 max-w-md">{error}</p>
        <Button onClick={refetch} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className={`${className} flex flex-col items-center justify-center p-8 text-center`}>
        <p className="text-muted-foreground">No content available</p>
        {fallbackData.length > 0 && (
          <Button onClick={refetch} variant="outline" className="mt-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reload
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {item.image && (
              <div className="relative h-48">
                <OptimizedImage
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
                {item.featured && (
                  <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">Featured</Badge>
                )}
              </div>
            )}

            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                {item.price && (
                  <Badge variant="secondary" className="ml-2 shrink-0">
                    ${item.price}
                  </Badge>
                )}
              </div>
              {item.category && (
                <Badge variant="outline" className="w-fit">
                  {item.category}
                </Badge>
              )}
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground line-clamp-3 mb-4">{item.description}</p>

              <Button className="w-full">
                {type === "products" && "View Product"}
                {type === "posts" && "Read More"}
                {type === "profiles" && "View Profile"}
                {type === "plans" && "Select Plan"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
