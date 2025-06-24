"use client"

import type React from "react"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Copyright, Info, BookOpen, FileText } from "lucide-react"
import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import Image from "next/image"

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
        { label: "Termos de Serviço", href: "/terms" },
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
      <footer className="border-t border-slate-700/50 bg-slate-900/90 backdrop-blur-xl">
        <div className="container mx-auto max-w-screen-2xl px-4 py-8 sm:py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {/* Logo e Descrição */}
            <div className="col-span-1 md:col-span-2 xl:col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-4 group">
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl group-hover:shadow-purple-500/30 transition-all duration-300">
                  <Image
                    src="/logo-brain.png"
                    alt="IQ Test Pro Logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-bold text-2xl text-white group-hover:text-blue-300 transition-colors duration-300">
                  IQ Test{" "}
                  <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                    Pro
                  </span>
                </span>
              </Link>
              <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                Descubra seu potencial intelectual com nossa plataforma de testes de QI validada cientificamente.
                Resultados precisos, análises detalhadas e uma experiência premium.
              </p>
            </div>

            {/* Links Rápidos */}
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-white mb-3 sm:mb-4 flex items-center text-base">
                  {section.icon}
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={section.title === "Legal" ? link.href : "/faq"}
                        className="text-xs sm:text-sm text-slate-400 hover:text-blue-300 transition-colors duration-200 group relative overflow-hidden inline-block"
                      >
                        <span className="relative z-10">{link.label}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-slate-700/50 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-[0.7rem] sm:text-xs text-slate-500 flex items-center">
              <Copyright className="w-3.5 h-3.5 mr-1.5" />
              {currentYear} IQ Test Pro. Todos os direitos reservados.
            </p>
            <div className="flex space-x-3 mt-4 md:mt-0">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-slate-400 hover:text-blue-300 transition-colors duration-200 p-1.5 rounded-md hover:bg-white/10"
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
            <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-slate-700/20">
              <Button variant="outline" onClick={closeModal}>
                Fechar
              </Button>
              <Link href="/faq">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500">
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
