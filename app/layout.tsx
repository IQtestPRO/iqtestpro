import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "../styles/mobile-payment-fix.css"
import "../styles/mobile-first-optimized.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation-revamp"
import FooterRevamp from "@/components/footer-revamp"
import { PaymentProvider } from "@/contexts/payment-context"
import { AuthProvider } from "@/contexts/auth-context"
import { MobileOptimizedPayment } from "@/components/mobile-optimized-payment"
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from "@/components/error-boundary"
import NeuralBackground from "@/components/neural-background"
import "../styles/neural-background.css"
import Analytics from "@/components/analytics"
import { Suspense } from "react"
import { ThemePersistence } from "@/components/theme-persistence"
import { DynamicBackground } from "@/components/dynamic-background"
import "../styles/dynamic-background.css"
import { PremiumUnlockNotification } from "@/components/premium-unlock-notification"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans bg-background text-foreground antialiased page-transition theme-transition`}>
        <DynamicBackground />
        <NeuralBackground />
        <ErrorBoundary>
          <Suspense fallback={null}>
            <ThemeProvider>
              <ThemePersistence />
              <AuthProvider>
                <PaymentProvider>
                  <div className="flex flex-col min-h-screen relative">
                    <Navigation />
                    <main className="flex-grow">{children}</main>
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
