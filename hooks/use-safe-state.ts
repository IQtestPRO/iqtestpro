"use client"

import { useState, useCallback, useRef, useEffect } from "react"

// Hook para prevenir atualizações de estado em componentes desmontados
export function useSafeState<T>(initialState: T | (() => T)) {
  const [state, setState] = useState(initialState)
  const mountedRef = useRef(true)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  const setSafeState = useCallback((value: T | ((prevState: T) => T)) => {
    if (mountedRef.current) {
      setState(value)
    }
  }, [])

  return [state, setSafeState] as const
}
