"use client"

import type React from "react"
import { useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function Modal({ isOpen, onClose, children, title, size = "md" }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      // Prevent zoom issues on mobile
      const viewport = document.querySelector('meta[name="viewport"]')
      if (viewport) {
        viewport.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no")
      }
    } else {
      document.body.style.overflow = "unset"
      // Restore normal viewport
      const viewport = document.querySelector('meta[name="viewport"]')
      if (viewport) {
        viewport.setAttribute("content", "width=device-width, initial-scale=1.0")
      }
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizeClasses = {
    sm: "w-full max-w-md",
    md: "w-full max-w-lg",
    lg: "w-full max-w-2xl",
    xl: "w-full max-w-4xl",
  }

  return (
    <div className="modal-overlay">
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose} />

      {/* Modal Container - Scrollable */}
      <div className="modal-container">
        <div className="modal-wrapper">
          {/* Modal Content */}
          <div className={`modal-content ${sizeClasses[size]}`}>
            {title && (
              <div className="modal-header">
                <h2 className="modal-title">{title}</h2>
                <Button variant="ghost" size="sm" onClick={onClose} className="modal-close-btn">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
