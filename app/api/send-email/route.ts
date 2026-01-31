import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"

export const runtime = "nodejs"

const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/

const requestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().refine((value) => phoneRegex.test(value), {
    message: "Telefone inválido",
  }),
  email: z
    .string()
    .trim()
    .email()
    .optional()
    .or(z.literal("")),
  terrainType: z.string().trim().min(1).max(60),
  serviceType: z.string().trim().min(1).max(80),
  location: z.string().trim().min(3).max(200),
  size: z.string().trim().max(80).optional().or(z.literal("")),
  description: z.string().trim().min(3).max(1000),
})

const fallbackRecipients = [
  "diovaniheringer25@gmail.com",
  "heraldoheringer@msn.com",
  "danielheringers@gmail.com",
]

const getRecipients = () => {
  const envValue = process.env.SMTP_TO
  if (!envValue) return fallbackRecipients
  return envValue
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
}

const getRequiredEnv = () => {
  const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"]
  return required.filter((key) => !process.env[key])
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;",
    }
    return map[character] ?? character
  })

export async function POST(req: Request) {
  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 })
  }

  const parsed = requestSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Dados inválidos",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    )
  }

  const missingEnv = getRequiredEnv()
  if (missingEnv.length > 0) {
    console.error("Missing SMTP env vars:", missingEnv)
    return NextResponse.json(
      { error: "Configuração de e-mail incompleta" },
      { status: 500 }
    )
  }

  const values = {
    ...parsed.data,
    email: parsed.data.email?.trim() || undefined,
    size: parsed.data.size?.trim() || undefined,
  }

  const safeValues = {
    ...values,
    name: escapeHtml(values.name),
    phone: escapeHtml(values.phone),
    email: values.email ? escapeHtml(values.email) : undefined,
    terrainType: escapeHtml(values.terrainType),
    serviceType: escapeHtml(values.serviceType),
    location: escapeHtml(values.location),
    size: values.size ? escapeHtml(values.size) : undefined,
    description: escapeHtml(values.description),
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: getRecipients(),
    replyTo: values.email || undefined,
    subject: "Nova solicitação de orçamento",
    text: `
Nome: ${safeValues.name}
Telefone: ${safeValues.phone}
Email: ${safeValues.email || "Não informado"}
Tipo de Terreno: ${safeValues.terrainType}
Tipo de Serviço: ${safeValues.serviceType}
Localização: ${safeValues.location}
Tamanho: ${safeValues.size || "Não informado"}
Descrição: ${safeValues.description}
    `.trim(),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
        <h2 style="color: #1f7a4a; margin: 0 0 16px;">Nova solicitação de orçamento</h2>
        <p><strong>Nome:</strong> ${safeValues.name}</p>
        <p><strong>Telefone:</strong> ${safeValues.phone}</p>
        <p><strong>Email:</strong> ${safeValues.email || "Não informado"}</p>
        <p><strong>Tipo de terreno:</strong> ${safeValues.terrainType}</p>
        <p><strong>Tipo de serviço:</strong> ${safeValues.serviceType}</p>
        <p><strong>Localização:</strong> ${safeValues.location}</p>
        <p><strong>Tamanho:</strong> ${safeValues.size || "Não informado"}</p>
        <p><strong>Descrição:</strong> ${safeValues.description}</p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ message: "Email enviado" }, { status: 200 })
  } catch (error) {
    console.error("Failed to send email:", error)
    return NextResponse.json({ error: "Falha ao enviar e-mail" }, { status: 500 })
  }
}

