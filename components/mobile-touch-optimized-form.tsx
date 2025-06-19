"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Eye, EyeOff, AlertCircle } from "lucide-react"

interface TouchOptimizedInputProps {
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  label?: string
  error?: string
  required?: boolean
  maxLength?: number
  inputMode?: "text" | "numeric" | "email" | "tel"
  autoComplete?: string
}

export function TouchOptimizedInput({
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  error,
  required = false,
  maxLength,
  inputMode = "text",
  autoComplete,
}: TouchOptimizedInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isPasswordType = type === "password"
  const inputType = isPasswordType ? (showPassword ? "text" : "password") : type

  // Prevent zoom on iOS by ensuring font-size is at least 16px
  const inputStyles = {
    fontSize: "16px",
    WebkitAppearance: "none" as const,
    MozAppearance: "none" as const,
    appearance: "none" as const,
  }

  return (
    <div className="mobile-form-group">
      {label && (
        <label className="mobile-form-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          ref={inputRef}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          inputMode={inputMode}
          autoComplete={autoComplete}
          maxLength={maxLength}
          style={inputStyles}
          className={`
            mobile-touch-input
            ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}
            ${isFocused ? "ring-4 ring-blue-100" : ""}
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center mt-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

// Mobile-optimized form container
export function MobileTouchForm({
  children,
  onSubmit,
  className = "",
}: {
  children: React.ReactNode
  onSubmit?: (e: React.FormEvent) => void
  className?: string
}) {
  return (
    <form onSubmit={onSubmit} className={`mobile-touch-form ${className}`} noValidate>
      {children}
    </form>
  )
}
