import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  const body = await req.json()

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: 'diovaniheringer25@gmail.com, heraldoheringer@msn.com, danielheringers@gmail.com',
    subject: 'Nova Solicitação de Orçamento',
    text: `
      Nome: ${body.name}
      Telefone: ${body.phone}
      Email: ${body.email || 'Não informado'}
      Tipo de Terreno: ${body.terrainType}
      Tipo de Serviço: ${body.serviceType}
      Localização: ${body.location}
      Tamanho: ${body.size || 'Não informado'}
      Descrição: ${body.description}
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Failed to send email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}

