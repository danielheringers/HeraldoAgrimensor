import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileCheck, Globe, Hammer, Map, MapPin, Ruler } from "lucide-react"

const services = [
  {
    icon: MapPin,
    title: "Levantamento topográfico planialtimétrico",
    description:
      "Medição e representação detalhada do terreno com precisão centimétrica para projetos urbanos e rurais.",
  },
  {
    icon: Globe,
    title: "Georreferenciamento de imóveis rurais",
    description:
      "Delimitação conforme INCRA/SIGEF para regularização fundiária e certificação do imóvel.",
  },
  {
    icon: Hammer,
    title: "Locação de obras",
    description:
      "Transferência de projetos para o terreno com controle de níveis, alinhamentos e eixos.",
  },
  {
    icon: Map,
    title: "Loteamentos e desmembramentos",
    description:
      "Estudos, divisão de áreas e apoio técnico para desenvolvimento urbano ou rural ordenado.",
  },
  {
    icon: FileCheck,
    title: "Regularização fundiária",
    description:
      "Documentação e suporte técnico para garantir segurança jurídica e acesso a financiamentos.",
  },
  {
    icon: Ruler,
    title: "Demarcação de terras",
    description:
      "Definição precisa de limites e divisas para evitar conflitos e proteger o patrimônio.",
  },
]

export default function Services() {
  return (
    <section id="services" className="section-padding scroll-mt-24 relative overflow-hidden bg-sand">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-15 [background-size:22px_22px]" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">
            Serviços
          </span>
          <h2 className="mt-4 text-4xl font-semibold text-balance text-ink font-display">
            Soluções completas em agrimensura e topografia
          </h2>
          <p className="mt-4 text-base text-ink/70">
            Atendimento técnico e consultivo para todas as etapas do seu projeto, da análise inicial à
            entrega final.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group border-white/50 bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg font-semibold text-ink">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-ink/70">
                {service.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
