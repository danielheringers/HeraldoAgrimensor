import { Clock, MapPinned, ShieldCheck, Users } from "lucide-react"

const stats = [
  { value: "+11.000", label: "Clientes atendidos" },
  { value: "+71.000 ha", label: "Área mapeada" },
  { value: "+20.000", label: "Projetos concluídos" },
  { value: "15 anos", label: "Experiência" },
]

const differentiators = [
  {
    icon: ShieldCheck,
    title: "Conformidade e precisão",
    description: "Processos alinhados às normas técnicas e documentação completa.",
  },
  {
    icon: Clock,
    title: "Prazos confiáveis",
    description: "Cronograma definido desde o início e acompanhamento contínuo.",
  },
  {
    icon: MapPinned,
    title: "Cobertura regional",
    description: "Atendimento em Manhuaçu e municípios vizinhos.",
  },
  {
    icon: Users,
    title: "Atendimento próximo",
    description: "Equipe acessível, comunicação clara e suporte pós-entrega.",
  },
]

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="section-padding scroll-mt-24 bg-gradient-to-b from-white to-sand"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">
              Diferenciais
            </span>
            <h2 className="mt-4 text-4xl font-semibold text-balance text-ink font-display">
              Resultados que trazem segurança para seu patrimônio
            </h2>
            <p className="mt-4 text-base text-ink/70">
              Nossa experiência combina tecnologia, metodologia e atendimento humanizado para entregar
              projetos sólidos, confiáveis e prontos para aprovação.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {differentiators.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1 text-sm text-ink/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl bg-white/80 p-6 text-center shadow-sm"
              >
                <p className="text-2xl font-semibold text-ink">{stat.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ink/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
