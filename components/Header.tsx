'use client'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useCallback } from 'react'

export default function Header() {
  const scrollToContact = useCallback(() => {
    const contactForm = document.getElementById('contact')
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link href="/" className="text-2xl font-bold text-[#308a51] font-libre">
          Heraldo Agrimensor
        </Link>
        <Button 
          variant="default" 
          className="bg-[#308a51] hover:bg-[#388E3B] text-white flex items-center gap-2"
          onClick={scrollToContact}
        >
          Solicitar Orçamento
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}

