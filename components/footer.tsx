"use client"

import Link from "next/link"
import { Brain, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

const footerLinks = {
  tests: [
    { name: "Teste Básico", href: "/test/1" },
    { name: "Teste Intermediário", href: "/test/2" },
    { name: "Teste Avançado", href: "/test/3" },
    { name: "Teste Expert", href: "/test/4" },
  ],
  company: [
    { name: "Sobre Nós", href: "/about" },
    { name: "Como Funciona", href: "/how-it-works" },
    { name: "Metodologia", href: "/methodology" },
    { name: "Certificações", href: "/certifications" },
  ],
  support: [
    { name: "FAQ", href: "/faq" },
    { name: "Contato", href: "/contact" },
    { name: "Suporte Técnico", href: "/support" },
    { name: "Política de Privacidade", href: "/privacy" },
  ],
  resources: [
    { name: "Ranking Global", href: "/ranking" },
    { name: "Resultados", href: "/results" },
    { name: "Blog", href: "/blog" },
    { name: "Pesquisas", href: "/research" },
  ],
}

const socialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "LinkedIn", href: "#", icon: Linkedin },
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto max-w-screen-xl px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-2xl font-bold mb-4">Fique por dentro das novidades</h3>
            <p className="text-slate-400 mb-6">
              Receba dicas exclusivas sobre desenvolvimento cognitivo e seja o primeiro a saber sobre novos testes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button variant="premium" disablePaymentModal={true}>
                Inscrever-se
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto max-w-screen-xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-display text-xl font-bold">IQ</span>
                <span className="font-display text-xl font-bold text-primary">Test Pro</span>
              </div>
            </Link>
            <p className="text-slate-400 mb-6 max-w-sm">
              Plataforma líder em avaliação cognitiva, oferecendo testes de QI cientificamente validados com análises
              profissionais detalhadas.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-slate-400">
                <Mail className="w-4 h-4" />
                <span>contato@iqtestpro.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-slate-400">
                <Phone className="w-4 h-4" />
                <span>+55 (11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </div>

          {/* Tests */}
          <div>
            <h4 className="font-semibold text-white mb-4">Testes</h4>
            <ul className="space-y-3">
              {footerLinks.tests.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Suporte</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center space-x-6 mt-12 pt-8 border-t border-slate-800">
          {socialLinks.map((social) => {
            const Icon = social.icon
            return (
              <Link
                key={social.name}
                href={social.href}
                className="flex items-center justify-center w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                aria-label={social.name}
              >
                <Icon className="w-5 h-5 text-slate-400 hover:text-white" />
              </Link>
            )
          })}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 pt-8 border-t border-slate-800 text-sm text-slate-400">
          <div className="mb-4 md:mb-0">© 2024 IQ Test Pro. Todos os direitos reservados.</div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacidade
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Termos de Uso
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
