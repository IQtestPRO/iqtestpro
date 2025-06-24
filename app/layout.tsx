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
import { PerformanceOptimizer } from "@/lib/performance-optimizer"

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

// Initialize performance monitoring
if (typeof window !== "undefined") {
  PerformanceOptimizer.monitorBundleSize()
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/data/sample-products.json" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/data/sample-posts.json" as="fetch" crossOrigin="anonymous" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />

        {/* Critical CSS inline */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .page-transition { transition: opacity 0.3s ease-in-out; }
            .theme-transition * { transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease; }
            .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; transform: translateY(20px); }
            @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
          `,
          }}
        />
      </head>
      <body className={`font-sans bg-background text-foreground antialiased page-transition theme-transition relative`}>
        <DynamicBackground />
        <NeuralBackground />
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
              </div>
            }
          >
            <ThemeProvider>
              <ThemePersistence />
              <AuthProvider>
                <PaymentProvider>
                  <div className="flex flex-col min-h-screen relative z-10 bg-background/80 backdrop-blur-sm">
                    <Navigation />
                    <main className="flex-grow relative z-10">{children}</main>
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
