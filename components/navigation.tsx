"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain, Menu, X, ChevronDown, Star, Trophy, Users, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Início", href: "/" },
  { name: "Sobre", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Ranking", href: "/ranking" },
  { name: "Contato", href: "/contact" },
]

const testTypes = [
  {
    name: "Teste Básico",
    href: "/test/1",
    description: "Padrões visuais e raciocínio espacial",
    icon: <Star className="w-4 h-4" />,
    price: "R$ 14,90",
  },
  {
    name: "Teste Intermediário",
    href: "/test/2",
    description: "Quebra-cabeças lógicos avançados",
    icon: <Trophy className="w-4 h-4" />,
    price: "R$ 19,90",
  },
  {
    name: "Teste Avançado",
    href: "/test/3",
    description: "Raciocínio abstrato complexo",
    icon: <Users className="w-4 h-4" />,
    price: "R$ 39,90",
  },
  {
    name: "Teste Expert",
    href: "/test/4",
    description: "Avaliação completa multidimensional",
    icon: <FileText className="w-4 h-4" />,
    price: "R$ 59,90",
  },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isTestsOpen, setIsTestsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-border" : "bg-transparent",
      )}
    >
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-lg group-hover:scale-105 transition-transform">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-xl font-bold text-foreground">IQ</span>
              <span className="font-display text-xl font-bold text-primary">Test Pro</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* Tests Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onMouseEnter={() => setIsTestsOpen(true)}
                onMouseLeave={() => setIsTestsOpen(false)}
              >
                <span>Testes</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isTestsOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-border p-4 space-y-3"
                  onMouseEnter={() => setIsTestsOpen(true)}
                  onMouseLeave={() => setIsTestsOpen(false)}
                >
                  {testTypes.map((test) => (
                    <Link
                      key={test.name}
                      href={test.href}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary-subtle transition-colors group"
                    >
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        {test.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-foreground">{test.name}</div>
                        <div className="text-xs text-muted-foreground">{test.description}</div>
                      </div>
                      <div className="text-sm font-semibold text-primary">{test.price}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="premium" size="sm" disablePaymentModal={false}>
              Começar Teste
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border bg-white/95 backdrop-blur-md">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Tests Section */}
              <div className="px-3 py-2">
                <div className="text-sm font-semibold text-foreground mb-2">Testes Disponíveis</div>
                <div className="space-y-2 pl-4">
                  {testTypes.map((test) => (
                    <Link
                      key={test.name}
                      href={test.href}
                      className="flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{test.name}</span>
                      <span className="text-primary font-medium">{test.price}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="px-3 pt-4">
                <Button variant="premium" className="w-full" disablePaymentModal={false}>
                  Começar Teste
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
