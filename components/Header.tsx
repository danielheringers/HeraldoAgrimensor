'use client'

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ArrowRight, Menu } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToContact = useCallback(() => {
    const contactForm = document.getElementById('contact')
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }, [])

  const navigationLinks = [
    { href: 'services', label: 'Serviços' },
    { href: 'benefits', label: 'Benefícios' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4 flex justify-between items-center py-4 sm:px-0">
        <Link href="/" className="text-lg font-bold text-[#308a51] font-libre md:text-2xl">
          Heraldo Agrimensura
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navigationLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-gray-600 hover:text-[#308a51] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <Button 
            variant="default" 
            className="bg-[#308a51] hover:bg-[#388E3B] text-white flex items-center gap-2"
            onClick={scrollToContact}
          >
            Solicitar Orçamento
            <ArrowRight className="h-4 w-4" />
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="text-left text-[#308a51] font-libre">
                Heraldo Agrimensura
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              {navigationLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-lg text-gray-600 hover:text-[#308a51] transition-colors py-2"
                >
                  {link.label}
                </button>
              ))}
              <Button 
                variant="default" 
                className="bg-[#308a51] hover:bg-[#388E3B] text-white w-full mt-4"
                onClick={scrollToContact}
              >
                Solicitar Orçamento
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

