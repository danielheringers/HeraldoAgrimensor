'use client'

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ArrowRight, Menu } from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

const navigationLinks = [
  { href: "#services", label: "Serviços" },
  { href: "#process", label: "Como funciona" },
  { href: "#benefits", label: "Resultados" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToContact = useCallback(() => {
    const contactForm = document.getElementById("contact")
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }, [])

  const handleNavClick = useCallback((href: string) => {
    const section = document.querySelector(href)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all ${
        isScrolled
          ? "bg-white/90 shadow-sm backdrop-blur"
          : "bg-white/70 backdrop-blur"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-0">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-ink transition-colors hover:text-brand-600 font-display md:text-2xl"
        >
          Heraldo Agrimensura
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="Navegação principal">
          {navigationLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-ink/70 transition-colors hover:text-brand-600"
            >
              {link.label}
            </button>
          ))}
          <Button
            variant="default"
            className="bg-brand-600 hover:bg-brand-700 text-white flex items-center gap-2 shadow-glow"
            onClick={scrollToContact}
          >
            Solicitar orçamento
            <ArrowRight className="h-4 w-4" />
          </Button>
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Abrir menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="text-left text-ink font-display">
                Heraldo Agrimensura
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-4" aria-label="Navegação móvel">
              {navigationLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-base text-ink/70 hover:text-brand-600 transition-colors py-2"
                >
                  {link.label}
                </button>
              ))}
              <Button
                variant="default"
                className="bg-brand-600 hover:bg-brand-700 text-white w-full mt-4"
                onClick={scrollToContact}
              >
                Solicitar orçamento
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
