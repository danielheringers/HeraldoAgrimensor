import { CheckCircle, MapPinned, Waypoints } from "lucide-react"

const steps = [
  {
    title: "Diagnóstico e visita técnica",
    description:
      "Entendemos seu objetivo, avaliamos documentação e definimos o escopo com clareza.",
    icon: MapPinned,
  },
  {
    title: "Levantamento e processamento",
    description:
      "Coleta em campo com equipamentos modernos e processamento cuidadoso dos dados.",
    icon: Waypoints,
  },
  {
    title: "Entrega e suporte",
    description:
      "Relatórios, plantas e memorial descritivo prontos para aprovação e uso imediato.",
    icon: CheckCircle,
  },
]

export default function Process() {
  return (
    <section id="process" className="section-padding scroll-mt-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">
            Processo
          </span>
          <h2 className="mt-4 text-4xl font-semibold text-balance text-ink font-display">
            Transparência em cada etapa
          </h2>
          <p className="mt-4 text-base text-ink/70">
            Você acompanha todo o fluxo de trabalho, com prazos claros e comunicação direta.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-3xl border border-sand/70 bg-sand/60 px-6 py-8 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-glow">
                <step.icon className="h-6 w-6" />
              </div>
              <div className="mt-6 flex items-center gap-3">
                <span className="text-sm font-semibold text-brand-600">0{index + 1}</span>
                <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
              </div>
              <p className="mt-3 text-sm text-ink/70">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
