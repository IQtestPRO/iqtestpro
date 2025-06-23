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
  title: "IQ Test Pro - Teste de QI Científico Online",
  description: "Teste de QI profissional e científico online. Avalie sua inteligência com precisão científica.",
  generator: "IQ Test Pro",
  keywords: "teste de qi, iq test, inteligência, teste científico, avaliação cognitiva",
  authors: [{ name: "IQ Test Pro" }],
  creator: "IQ Test Pro",
  publisher: "IQ Test Pro",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/logo-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "IQ Test Pro - Teste de QI Científico",
    description: "Avalie sua inteligência com nosso teste científico profissional",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/logo-32x32.png",
        width: 32,
        height: 32,
        alt: "IQ Test Pro Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IQ Test Pro - Teste de QI Científico",
    description: "Avalie sua inteligência com precisão científica",
    images: ["/logo-32x32.png"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#3b82f6",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/logo-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`font-sans bg-background text-foreground antialiased page-transition theme-transition`}>
        {/* Background layers - lowest z-index */}
        <DynamicBackground />
        <NeuralBackground />

        <ErrorBoundary>
          <Suspense fallback={null}>
            <ThemeProvider>
              <ThemePersistence />
              <AuthProvider>
                <PaymentProvider>
                  {/* Main content wrapper with proper z-index */}
                  <div className="relative z-10 flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-grow relative z-10">{children}</main>
                    <FooterRevamp />
                  </div>

                  {/* Modal and overlay components - highest z-index */}
                  <div className="relative z-50">
                    <MobileOptimizedPayment />
                    <PremiumUnlockNotification />
                    <Toaster />
                  </div>

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
