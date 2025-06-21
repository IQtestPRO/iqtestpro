import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "p-6 pt-0",
        // Enhanced spacing for IQ test content
        "space-y-4",
        // Better typography for test questions
        "text-base leading-relaxed",
        // Improved readability
        "text-slate-700 dark:text-slate-300",
        // Support for interactive content
        "relative",
        // Better mobile experience
        "px-4 sm:px-6",
        // Animation support for test transitions
        "transition-all duration-300 ease-in-out",
        // Enhanced focus states for accessibility
        "focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:ring-offset-2",
        // Support for test result displays
        "[&_.test-result]:bg-gradient-to-r [&_.test-result]:from-blue-50 [&_.test-result]:to-indigo-50",
        "[&_.test-result]:dark:from-blue-950/30 [&_.test-result]:dark:to-indigo-950/30",
        "[&_.test-result]:p-4 [&_.test-result]:rounded-lg [&_.test-result]:border",
        "[&_.test-result]:border-blue-200 [&_.test-result]:dark:border-blue-800",
        // Support for question types
        "[&_.question-spatial]:border-l-4 [&_.question-spatial]:border-blue-500 [&_.question-spatial]:pl-4",
        "[&_.question-logical]:border-l-4 [&_.question-logical]:border-purple-500 [&_.question-logical]:pl-4",
        "[&_.question-abstract]:border-l-4 [&_.question-abstract]:border-amber-500 [&_.question-abstract]:pl-4",
        "[&_.question-numerical]:border-l-4 [&_.question-numerical]:border-green-500 [&_.question-numerical]:pl-4",
        "[&_.question-verbal]:border-l-4 [&_.question-verbal]:border-red-500 [&_.question-verbal]:pl-4",
        "[&_.question-memory]:border-l-4 [&_.question-memory]:border-cyan-500 [&_.question-memory]:pl-4",
        // Enhanced option styling for multiple choice
        "[&_.option-grid]:grid [&_.option-grid]:grid-cols-1 [&_.option-grid]:sm:grid-cols-2",
        "[&_.option-grid]:gap-3 [&_.option-grid]:mt-4",
        "[&_.option-item]:p-3 [&_.option-item]:rounded-lg [&_.option-item]:border-2",
        "[&_.option-item]:border-slate-200 [&_.option-item]:dark:border-slate-700",
        "[&_.option-item]:hover:border-blue-300 [&_.option-item]:hover:bg-blue-50",
        "[&_.option-item]:dark:hover:border-blue-600 [&_.option-item]:dark:hover:bg-blue-950/30",
        "[&_.option-item]:cursor-pointer [&_.option-item]:transition-all [&_.option-item]:duration-200",
        "[&_.option-item.selected]:border-blue-500 [&_.option-item.selected]:bg-blue-100",
        "[&_.option-item.selected]:dark:border-blue-400 [&_.option-item.selected]:dark:bg-blue-900/40",
        // Progress indicators
        "[&_.progress-bar]:w-full [&_.progress-bar]:h-2 [&_.progress-bar]:bg-slate-200",
        "[&_.progress-bar]:dark:bg-slate-700 [&_.progress-bar]:rounded-full [&_.progress-bar]:overflow-hidden",
        "[&_.progress-fill]:h-full [&_.progress-fill]:bg-gradient-to-r",
        "[&_.progress-fill]:from-blue-500 [&_.progress-fill]:to-purple-500",
        "[&_.progress-fill]:transition-all [&_.progress-fill]:duration-500 [&_.progress-fill]:ease-out",
        // Timer styling
        "[&_.timer]:inline-flex [&_.timer]:items-center [&_.timer]:gap-2",
        "[&_.timer]:px-3 [&_.timer]:py-1 [&_.timer]:rounded-full",
        "[&_.timer]:bg-orange-100 [&_.timer]:dark:bg-orange-900/30",
        "[&_.timer]:text-orange-700 [&_.timer]:dark:text-orange-300",
        "[&_.timer]:font-medium [&_.timer]:text-sm",
        // Score display
        "[&_.score-display]:text-center [&_.score-display]:p-6",
        "[&_.score-display]:bg-gradient-to-br [&_.score-display]:from-emerald-50 [&_.score-display]:to-blue-50",
        "[&_.score-display]:dark:from-emerald-950/30 [&_.score-display]:dark:to-blue-950/30",
        "[&_.score-display]:rounded-xl [&_.score-display]:border",
        "[&_.score-display]:border-emerald-200 [&_.score-display]:dark:border-emerald-800",
        // Category breakdown styling
        "[&_.category-breakdown]:grid [&_.category-breakdown]:grid-cols-1",
        "[&_.category-breakdown]:sm:grid-cols-2 [&_.category-breakdown]:lg:grid-cols-3",
        "[&_.category-breakdown]:gap-4 [&_.category-breakdown]:mt-6",
        "[&_.category-item]:p-4 [&_.category-item]:rounded-lg",
        "[&_.category-item]:bg-slate-50 [&_.category-item]:dark:bg-slate-800/50",
        "[&_.category-item]:border [&_.category-item]:border-slate-200",
        "[&_.category-item]:dark:border-slate-700",
        // Enhanced visual hierarchy
        "[&_h1]:text-2xl [&_h1]:sm:text-3xl [&_h1]:font-bold [&_h1]:mb-4",
        "[&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-semibold [&_h2]:mb-3",
        "[&_h3]:text-lg [&_h3]:sm:text-xl [&_h3]:font-medium [&_h3]:mb-2",
        // Better button spacing
        "[&_.button-group]:flex [&_.button-group]:flex-col [&_.button-group]:sm:flex-row",
        "[&_.button-group]:gap-3 [&_.button-group]:mt-6",
        "[&_.button-group_.primary]:flex-1",
        className,
      )}
      {...props}
    />
  ),
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
