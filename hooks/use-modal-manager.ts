"use client"

import { useState, useCallback, useRef, useEffect } from "react"

// Hook para gerenciar modais de forma segura
export function useModalManager() {
  const [openModals, setOpenModals] = useState<Set<string>>(new Set())
  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map())

  const openModal = useCallback((modalId: string, delay = 0) => {
    // Limpar timeout anterior se existir
    const existingTimeout = timeoutRefs.current.get(modalId)
    if (existingTimeout) {
      clearTimeout(existingTimeout)
    }

    const timeout = setTimeout(() => {
      setOpenModals((prev) => new Set([...prev, modalId]))
      timeoutRefs.current.delete(modalId)
    }, delay)

    timeoutRefs.current.set(modalId, timeout)
  }, [])

  const closeModal = useCallback((modalId: string) => {
    // Limpar timeout se existir
    const existingTimeout = timeoutRefs.current.get(modalId)
    if (existingTimeout) {
      clearTimeout(existingTimeout)
      timeoutRefs.current.delete(modalId)
    }

    setOpenModals((prev) => {
      const newSet = new Set(prev)
      newSet.delete(modalId)
      return newSet
    })
  }, [])

  const isModalOpen = useCallback(
    (modalId: string) => {
      return openModals.has(modalId)
    },
    [openModals],
  )

  const closeAllModals = useCallback(() => {
    // Limpar todos os timeouts
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout))
    timeoutRefs.current.clear()

    setOpenModals(new Set())
  }, [])

  // Cleanup na desmontagem
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout))
      timeoutRefs.current.clear()
    }
  }, [])

  return {
    openModal,
    closeModal,
    isModalOpen,
    closeAllModals,
    hasOpenModals: openModals.size > 0,
  }
}
