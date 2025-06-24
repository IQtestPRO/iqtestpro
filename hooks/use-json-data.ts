"use client"

import { useState, useEffect, useCallback } from "react"
import { JSONDataManager, type DataConfig } from "@/lib/json-data-manager"

export interface UseJSONDataOptions extends DataConfig {
  autoFetch?: boolean
  dependencies?: any[]
}

export function useJSONData<T = any>(options: UseJSONDataOptions) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await JSONDataManager.fetchData<T>(options)
      setData(result)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch data"
      setError(errorMessage)
      console.error("JSON data fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [options])

  const refetch = useCallback(() => {
    JSONDataManager.clearCache(options.endpoint)
    return fetchData()
  }, [fetchData, options.endpoint])

  useEffect(() => {
    if (options.autoFetch !== false) {
      fetchData()
    }
  }, [fetchData, ...(options.dependencies || [])])

  return {
    data,
    loading,
    error,
    refetch,
    fetchData,
  }
}
