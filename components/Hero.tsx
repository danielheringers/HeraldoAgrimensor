'use client'

import Image_One from "@/assets/Flux_Dev_A_meticulously_detailed_land_surveyor_every_aspect_ex_0.jpeg"
import Image_Two from "@/assets/Flux_Dev_A_meticulously_detailed_land_surveyor_every_aspect_ex_3.jpeg"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"


const images = [
  {
    src: Image_One,
    alt: "Agrimensor examinando mapa"
  },
  {
    src: Image_Two,
    alt: "Profissional de agrimensura trabalhando"
  }
]

export default function Hero() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)

  const scrollToContact = useCallback(() => {
    const contactForm = document.getElementById('contact')
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, 5000)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })

    return () => {
      clearInterval(interval)
      api.destroy()
    }
  }, [api])

  return (
    <section className="relative bg-[#263238] text-white">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[600px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover brightness-50"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto text-center z-10">
          <h1 className="text-5xl font-bold mb-4">Agrimensura e Georreferenciamento</h1>
          <span className="hidden">em Manhuaçu e Região</span>
          <p className="text-xl mb-8">Serviços de topografia, medição e demarcação de terras com tecnologia de ponta</p>
          <Button size="lg" className="bg-[#308a51] hover:bg-[#388E3B] text-white" onClick={scrollToContact}>
            Solicite um Orçamento Grátis
          </Button>
          <div className="flex justify-center gap-2 mt-8">
            {images.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  current === index ? "bg-[#28CB8B]" : "bg-white/50"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

