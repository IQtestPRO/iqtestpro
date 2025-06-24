import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation-revamp"
import FooterRevamp from "@/components/footer-revamp"
import { PaymentProvider } from "@/contexts/payment-context"
import { AuthProvider } from "@/contexts/auth-context"
import { MobileOptimizedPayment } from "@/components/mobile-optimized-payment"
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from "@/components/error-boundary"
import Analytics from "@/components/analytics"
import { Suspense } from "react"
import { ThemePersistence } from "@/components/theme-persistence"
import { PremiumUnlockNotification } from "@/components/premium-unlock-notification"
import { OptimizedBackground } from "@/components/optimized-background"

export const metadata: Metadata = {
  title: "IQ Test Pro - Professional Cognitive Assessment",
  description:
    "Discover your intellectual potential with our scientifically validated IQ test. Get detailed analysis and official certification.",
  generator: "v0.dev",
  keywords: "IQ test, cognitive assessment, intelligence quotient, brain training, mental abilities",
  authors: [{ name: "IQ Test Pro Team" }],
  openGraph: {
    title: "IQ Test Pro - Professional Cognitive Assessment",
    description: "Discover your intellectual potential with our scientifically validated IQ test.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        <OptimizedBackground />
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            }
          >
            <ThemeProvider>
              <ThemePersistence />
              <AuthProvider>
                <PaymentProvider>
                  <div className="relative z-10 min-h-screen flex flex-col">
                    <Navigation />
                    <main className="flex-1 relative z-20">{children}</main>
                    <FooterRevamp />
                  </div>
                  <MobileOptimizedPayment />
                  <PremiumUnlockNotification />
                  <Toaster />
                  <Analytics />
                </PaymentProvider>
              </AuthProvider>
            </ThemeProvider>
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  )
}
