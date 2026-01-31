'use client'

import Image_Three from "@/assets/3.jpeg"
import Image_Four from "@/assets/4.jpeg"
import Image_Five from "@/assets/5.jpeg"
import Image_One from "@/assets/Flux_Dev_A_meticulously_detailed_land_surveyor_every_aspect_ex_0.jpeg"
import Image_Two from "@/assets/Flux_Dev_A_meticulously_detailed_land_surveyor_every_aspect_ex_3.jpeg"
import { Button } from "@/components/ui/button"
import type { CarouselApi } from "@/components/ui/carousel"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"

const images = [
  {
    src: Image_One,
    alt: "Agrimensor analisando mapa em campo",
  },
  {
    src: Image_Two,
    alt: "Profissional de agrimensura trabalhando com equipamentos",
  },
  {
    src: Image_Three,
    alt: "Georreferenciamento de terrenos em Manhuaçu",
  },
  {
    src: Image_Four,
    alt: "Medição de terrenos em Manhuaçu",
  },
  {
    src: Image_Five,
    alt: "Equipamentos de agrimensura em operação",
  },
]

const highlights = [
  { value: "15+", label: "Anos de experiência" },
  { value: "+20k", label: "Projetos entregues" },
  { value: "+70k", label: "Hectares mapeados" },
]

export default function Hero() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const scrollToContact = useCallback(() => {
    const contactForm = document.getElementById("contact")
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const scrollToServices = useCallback(() => {
    const servicesSection = document.getElementById("services")
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, 6000)

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on("select", onSelect)
    onSelect()

    return () => {
      clearInterval(interval)
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <section id="hero" className="relative overflow-hidden bg-ink text-white">
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
            <CarouselItem key={image.alt}>
              <div className="relative h-[540px] w-full md:h-[650px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-70" />
      <div className="pointer-events-none absolute -left-40 top-20 h-72 w-72 animate-pulse-soft rounded-full bg-brand-500/25 blur-3xl" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Agrimensura • Georreferenciamento • Topografia
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-balance font-display md:text-6xl">
              Precisão técnica e confiança para seu projeto em Manhuaçu e região
            </h1>
            <p className="mt-4 text-base text-white/80 md:text-lg">
              Levantamentos, demarcações e regularização fundiária com tecnologia de ponta,
              prazos claros e atendimento próximo.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="bg-brand-600 hover:bg-brand-700 text-white shadow-glow"
                onClick={scrollToContact}
              >
                Solicitar orçamento
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="border border-white/50 bg-white/5 text-white hover:bg-white/15 hover:text-white"
                onClick={scrollToServices}
              >
                Ver serviços
              </Button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 text-left sm:grid-cols-3">
            {highlights.map((highlight) => (
              <div
                key={highlight.label}
                className="pointer-events-auto rounded-2xl border border-white/15 bg-ink/60 px-6 py-5 text-white shadow-lg backdrop-blur"
              >
                <p className="text-2xl font-semibold text-white">{highlight.value}</p>
                <p className="mt-1 text-sm text-white/80">{highlight.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  current === index ? "bg-brand-300" : "bg-white/40"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
