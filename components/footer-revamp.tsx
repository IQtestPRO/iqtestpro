"use client"

import type React from "react"

import Link from "next/link"
import { Brain, Facebook, Twitter, Instagram, Linkedin, Copyright, Info, BookOpen, FileText } from "lucide-react"
import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState<PopupContentType | null>(null)

  const openModalWithContent = (data: PopupContentType) => {
    setModalData(data)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalData(null)
  }

  const footerLinks = [
    {
      title: "Plataforma",
      icon: <Info className="w-4 h-4 mr-2" />,
      links: [
        {
          label: "Sobre Nós",
          href: "/faq",
        },
        {
          label: "Como Funciona",
          href: "/faq",
        },
        {
          label: "Planos Premium",
          href: "/faq",
        },
        {
          label: "FAQ",
          href: "/faq",
        },
      ],
    },
    {
      title: "Recursos",
      icon: <BookOpen className="w-4 h-4 mr-2" />,
      links: [
        {
          label: "Blog",
          href: "/faq",
        },
        {
          label: "Estudos Científicos",
          href: "/faq",
        },
        {
          label: "Glossário de QI",
          href: "/faq",
        },
        {
          label: "Ferramentas de Estudo",
          href: "/faq",
        },
      ],
    },
    {
      title: "Legal",
      icon: <FileText className="w-4 h-4 mr-2" />,
      links: [
        { label: "Termos de Serviço", href: "/terms" }, // Sem popup para links legais
        { label: "Política de Privacidade", href: "/privacy" },
        { label: "Política de Cookies", href: "/cookies" },
        { label: "Contato", href: "/contact" },
      ],
    },
  ]

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
  ]

  type PopupContentType = {
    title: string
    content: React.ReactNode
  }

  return (
    <>
      <footer className="border-t border-border/40 bg-background">
        <div className="container mx-auto max-w-screen-2xl px-4 py-8 sm:py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {/* Logo e Descrição */}
            <div className="col-span-1 md:col-span-2 xl:col-span-2">
              <Link href="/" className="flex items-center space-x-2.5 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-primary to-blue-400 dark:from-primary dark:to-blue-600 rounded-lg flex items-center justify-center shadow-soft">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="font-display text-2xl font-bold text-foreground">
                  IQ Test <span className="text-primary">Pro</span>
                </span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
                Descubra seu potencial intelectual com nossa plataforma de testes de QI validada cientificamente.
                Resultados precisos, análises detalhadas e uma experiência premium.
              </p>
            </div>

            {/* Links Rápidos */}
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="font-display font-semibold text-foreground mb-3 sm:mb-4 flex items-center text-base">
                  {section.icon}
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={section.title === "Legal" ? link.href : "/faq"}
                        className="text-xs sm:text-sm text-muted-foreground hover:text-primary smooth-hover group relative overflow-hidden inline-block"
                      >
                        <span className="relative z-10">{link.label}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-[0.7rem] sm:text-xs text-muted-foreground flex items-center">
              <Copyright className="w-3.5 h-3.5 mr-1.5" />
              {currentYear} IQ Test Pro. Todos os direitos reservados.
            </p>
            <div className="flex space-x-3 mt-4 md:mt-0">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary smooth-hover p-1.5 rounded-md hover:bg-secondary"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
      {modalData && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={modalData.title}
          size="xl"
          className="max-h-[90vh] overflow-y-auto"
        >
          <div className="p-1">
            {modalData.content}
            <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-border/20">
              <Button variant="outline" onClick={closeModal}>
                Fechar
              </Button>
              <Link href="/faq">
                <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                  Ver FAQ Completa
                </Button>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
