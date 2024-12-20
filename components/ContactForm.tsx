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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  phone: z.string().min(14, {
    message: "Por favor, insira um número de telefone válido.",
  }),
  email: z.string().email({
    message: "Por favor, insira um e-mail válido.",
  }).optional().or(z.literal('')),
  terrainType: z.string({
    required_error: "Por favor, selecione um tipo de terreno.",
  }),
  serviceType: z.string({
    required_error: "Por favor, selecione um tipo de serviço.",
  }),
  location: z.string().min(1, {
    message: "Por favor, descreva a localização da propriedade.",
  }),
  size: z.string().optional(),
  description: z.string().min(1, {
    message: "Por favor, descreva seu projeto.",
  }),
})

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
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

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    const char: Record<number, string> = { 0: "(", 2: ") ", 7: "-" }
    let formatted = ""
    for (let i = 0; i < numbers.length; i++) {
      formatted += (char[i] || "") + numbers[i]
    }
    return formatted
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        toast({
          title: "Solicitação enviada",
          description: "Entraremos em contato em breve.",
          variant: "default",
        })
        form.reset()
      } else {
        throw new Error('Failed to send email')
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Erro",
        description: "Houve um problema ao enviar sua solicitação. Por favor, tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-[#F5F7FA]">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-4xl font-bold text-center mb-8">Solicite um Orçamento</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome *</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                      placeholder="(00) 00000-0000"
                      onChange={(e) => {
                        const formatted = formatPhoneNumber(e.target.value)
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
                    <Input {...field} type="email" placeholder="Para receber o orçamento por e-mail" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terrainType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Terreno</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de terreno" />
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
                  <FormLabel>Tipo de Serviço</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de serviço" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Levantamento Topográfico">Levantamento Topográfico</SelectItem>
                      <SelectItem value="Georreferenciamento">Georreferenciamento</SelectItem>
                      <SelectItem value="Loteamento">Loteamento</SelectItem>
                      <SelectItem value="Regularização Fundiária">Regularização Fundiária</SelectItem>
                      <SelectItem value="Outros">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização da Propriedade</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Descreva a localização ou insira um link do Google Maps" />
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
                  <FormLabel>Tamanho Aproximado da Propriedade (opcional)</FormLabel>
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
                  <FormLabel>Descrição do Projeto</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Descreva seu projeto ou necessidades específicas" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-[#308a51] hover:bg-[#388E3B] text-white" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  )
}

