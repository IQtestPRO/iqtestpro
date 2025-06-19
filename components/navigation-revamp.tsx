"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Brain, Home, Trophy, HelpCircle, Menu, X, UserCircle, Sun, Moon, Crown } from "lucide-react"
import { useTheme } from "next-themes"
import { UserProfileButton } from "./user-profile-button"
import { MobileUserMenu } from "./mobile-user-menu"
import { useAuth } from "@/contexts/auth-context"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Início", icon: Home },
    { href: "/test", label: "Fazer Teste", icon: Brain },
    { href: "/ranking", label: "Ranking", icon: Trophy },
    { href: "/premium", label: "Premium", icon: Crown },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
  ]

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  const handleThemeToggle = () => {
    try {
      const currentTheme = resolvedTheme || theme || "dark"
      const newTheme = currentTheme === "dark" ? "light" : "dark"
      setTheme(newTheme)

      setTimeout(() => {
        const isDark = newTheme === "dark"
        document.documentElement.classList.toggle("dark", isDark)
        document.documentElement.setAttribute("data-theme", newTheme)
        document.body.style.backgroundColor = isDark ? "hsl(222.2, 84%, 4.9%)" : "hsl(0, 0%, 100%)"
      }, 10)
    } catch (error) {
      console.error("Error toggling theme:", error)
      setTheme(theme === "dark" ? "light" : "dark")
    }
  }

  const currentTheme = mounted ? resolvedTheme || theme || "dark" : "dark"
  const isDark = currentTheme === "dark"

  const ThemeButton = ({ className = "", showTooltip = true }) => {
    if (!mounted) {
      return (
        <Button
          variant="ghost"
          size="icon"
          disabled
          className={`relative overflow-hidden opacity-50 ${className}`}
          aria-label="Loading theme toggle"
        >
          <Sun className="h-5 w-5 text-muted-foreground" />
        </Button>
      )
    }

    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleThemeToggle}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        className={`relative overflow-hidden group hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 rounded-full ${className}`}
      >
        <div className="relative w-5 h-5">
          <Sun
            className={`absolute h-5 w-5 transition-all duration-500 ease-in-out text-amber-500 group-hover:text-amber-600 ${
              isDark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <Moon
            className={`absolute h-5 w-5 transition-all duration-500 ease-in-out text-blue-400 dark:text-blue-300 group-hover:text-blue-500 dark:group-hover:text-blue-200 ${
              isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
            }`}
          />
        </div>

        <div
          className={`absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full ${
            isDark
              ? "bg-gradient-to-r from-blue-400/20 to-purple-400/20"
              : "bg-gradient-to-r from-amber-400/20 to-orange-400/20"
          }`}
        />

        {showTooltip && (
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-popover border border-border text-popover-foreground text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            {isDark ? "Modo claro" : "Modo escuro"}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-popover border-l border-t border-border rotate-45"></div>
          </div>
        )}
      </Button>
    )
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/40 shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-primary to-blue-400 dark:from-primary dark:to-blue-600 rounded-lg flex items-center justify-center shadow-soft group-hover:shadow-medium transition-all duration-300 group-hover:scale-110">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-400 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </div>
          <span className="font-display text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            IQ Test <span className="text-primary">Pro</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Button
                key={item.href}
                variant="ghost"
                onClick={() => handleNavigation(item.href)}
                className="relative px-3 py-2 text-xs sm:text-sm md:px-4 text-muted-foreground hover:text-primary transition-all duration-200 rounded-lg hover:bg-primary/5 group"
              >
                <span className="flex items-center space-x-2">
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                </span>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
              </Button>
            )
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <ThemeButton />

          {user ? (
            <UserProfileButton />
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => handleNavigation("/login")} className="group">
                <UserCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Login
              </Button>

              <Button
                variant="default"
                size="sm"
                onClick={() => handleNavigation("/test")}
                className="group bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
              >
                <Brain className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Começar Teste
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <ThemeButton showTooltip={false} />

          {user ? (
            <MobileUserMenu />
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle mobile menu"
              className="relative overflow-hidden group min-w-[48px] min-h-[48px] touch-manipulation active:scale-95 transition-transform"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute w-6 h-6 transition-all duration-300 ${
                    isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  }`}
                />
                <X
                  className={`absolute w-6 h-6 transition-all duration-300 ${
                    isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                  }`}
                />
              </div>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Navigation - Only show if user is not logged in */}
      {!user && (
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="border-t border-border/40 bg-background/98 backdrop-blur-md">
            <nav className="container flex flex-col space-y-1 py-4 px-4 max-w-screen-sm mx-auto">
              {navItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <Button
                    key={item.href}
                    variant="ghost"
                    onClick={() => handleNavigation(item.href)}
                    className="flex items-center space-x-4 py-4 px-4 text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200 group text-left w-full justify-start min-h-[56px] touch-manipulation active:scale-98"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-left text-lg">{item.label}</span>
                  </Button>
                )
              })}

              <div className="border-t border-border/40 pt-4 mt-4 space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start group min-h-[56px] text-base touch-manipulation active:scale-98"
                  onClick={() => handleNavigation("/login")}
                >
                  <UserCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-200" />
                  Login
                </Button>

                <Button
                  variant="default"
                  className="w-full justify-start group bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 min-h-[56px] text-base touch-manipulation active:scale-98"
                  onClick={() => handleNavigation("/test")}
                >
                  <Brain className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-200" />
                  Começar Teste
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
