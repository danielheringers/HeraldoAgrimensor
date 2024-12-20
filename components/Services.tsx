import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Ruler, Globe, Hammer, Map, FileCheck } from 'lucide-react'

const services = [
  {
    icon: <MapPin className="h-8 w-8 text-[#308a51]" />,
    title: "Levantamento Topográfico Planialtimétrico",
    description: "Medição e representação detalhada das características do terreno, incluindo relevo e detalhes planimétricos. Essencial para projetos de construção e planejamento."
  },
  {
    icon: <Globe className="h-8 w-8 text-[#308a51]" />,
    title: "Georreferenciamento de Imóveis",
    description: "Determinação precisa dos limites de propriedades usando coordenadas geográficas, conforme normas do INCRA/SIGEF. Necessário para regularização fundiária."
  },
  {
    icon: <Hammer className="h-8 w-8 text-[#308a51]" />,
    title: "Locação de Obras",
    description: "Transferência das dimensões e posições de projetos para o terreno. Fundamental para construções, estradas e outras obras de infraestrutura."
  },
  {
    icon: <Map className="h-8 w-8 text-[#308a51]" />,
    title: "Loteamentos e Demarcações de Terra",
    description: "Divisão de áreas em lotes menores, definindo ruas, quadras e espaços públicos. Importante para desenvolvimento urbano e rural ordenado."
  },
  {
    icon: <FileCheck className="h-8 w-8 text-[#308a51]" />,
    title: "Regularização Fundiária",
    description: "Processo de legalização de propriedades, garantindo conformidade com normas legais. Assegura segurança jurídica e acesso a financiamentos."
  },
  {
    icon: <Ruler className="h-8 w-8 text-[#308a51]" />,
    title: "Demarcação de Terras",
    description: "Definição precisa de limites e divisas de propriedades, essencial para evitar conflitos e garantir o uso correto do solo."
  }
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-[#F5F7FA] to-[#E8F5E9]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Nossos Serviços</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#308a51]">
                  {service.icon}
                  <span className="text-xl">{service.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

