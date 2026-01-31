'use client'

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Mail, MapPin, Phone } from "lucide-react"

const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/

const formSchema = z.object({
  name: z.string().trim().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  phone: z.string().trim().refine((value) => phoneRegex.test(value), {
    message: "Por favor, insira um telefone válido.",
  }),
  email: z
    .string()
    .trim()
    .email({
      message: "Por favor, insira um e-mail válido.",
    })
    .optional()
    .or(z.literal("")),
  terrainType: z.string({
    required_error: "Por favor, selecione um tipo de terreno.",
  }),
  serviceType: z.string({
    required_error: "Por favor, selecione um tipo de serviço.",
  }),
  location: z.string().trim().min(3, {
    message: "Por favor, descreva a localização da propriedade.",
  }),
  size: z.string().trim().optional(),
  description: z.string().trim().min(3, {
    message: "Por favor, descreva seu projeto.",
  }),
})

type FormValues = z.infer<typeof formSchema>

const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11)
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      terrainType: "",
      serviceType: "",
      location: "",
      size: "",
      description: "",
    },
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(data?.error || "Falha ao enviar")
      }

      toast({
        title: "Solicitação enviada",
        description: "Recebemos seus dados e retornaremos em breve.",
      })
      form.reset()
    } catch (error) {
      toast({
        title: "Não foi possível enviar",
        description:
          error instanceof Error
            ? error.message
            : "Houve um problema ao enviar sua solicitação. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-padding scroll-mt-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">
              Orçamento
            </span>
            <h2 className="text-4xl font-semibold text-balance text-ink font-display">
              Solicite uma proposta sob medida
            </h2>
            <p className="text-base text-ink/70">
              Conte-nos sobre sua área e objetivos. Responderemos com rapidez e clareza sobre prazos,
              documentação e próximos passos.
            </p>

            <div className="space-y-4 rounded-3xl bg-sand/70 p-6">
              <div className="flex items-start gap-3 text-sm text-ink/70">
                <MapPin className="mt-1 h-5 w-5 text-brand-600" />
                <span>Rua Coronel Alberto Pinto Coelho, 143 - Manhuaçu, MG</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-ink/70">
                <Phone className="mt-1 h-5 w-5 text-brand-600" />
                <span>(33) 9 9902-5847 • (33) 9 8444-5755</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-ink/70">
                <Mail className="mt-1 h-5 w-5 text-brand-600" />
                <span>heraldoheringer@msn.com</span>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome *</FormLabel>
                      <FormControl>
                        <Input {...field} autoComplete="name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="(00) 00000-0000"
                          onChange={(event) => {
                            const formatted = formatPhoneNumber(event.target.value)
                            field.onChange(formatted)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail (opcional)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          autoComplete="email"
                          placeholder="Para receber o orçamento por e-mail"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="terrainType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de terreno</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Urbano">Urbano</SelectItem>
                            <SelectItem value="Rural">Rural</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de serviço</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Levantamento topográfico">
                              Levantamento topográfico
                            </SelectItem>
                            <SelectItem value="Georreferenciamento">Georreferenciamento</SelectItem>
                            <SelectItem value="Loteamento">Loteamento</SelectItem>
                            <SelectItem value="Regularização fundiária">
                              Regularização fundiária
                            </SelectItem>
                            <SelectItem value="Outros">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localização da propriedade</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={3}
                          placeholder="Descreva a localização ou cole um link do Google Maps"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tamanho aproximado (opcional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Ex: 1000 m², 10 hectares" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição do projeto</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          placeholder="Conte detalhes importantes para avaliarmos seu caso"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-3">
                  <Button
                    type="submit"
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white shadow-glow"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                        Enviando...
                      </span>
                    ) : (
                      "Enviar solicitação"
                    )}
                  </Button>
                  <p className="text-xs text-ink/60">
                    Ao enviar, você concorda em receber contato para orçamento e informações técnicas.
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}
