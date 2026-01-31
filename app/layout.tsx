import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import { Manrope, Playfair_Display } from "next/font/google"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
})

export const metadata: Metadata = {
  title: {
    default: "Heraldo Agrimensura | Georreferenciamento e Topografia em Manhuaçu",
    template: "%s | Heraldo Agrimensura",
  },
  description:
    "Serviços profissionais de agrimensura, georreferenciamento e topografia em Manhuaçu e região. Medição e demarcação de terras com precisão, tecnologia e segurança.",
  keywords: [
    "Agrimensura",
    "Georreferenciamento",
    "Topografia",
    "Manhuaçu",
    "Medição de terras",
    "Demarcação de terras",
    "Loteamentos",
  ],
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${manrope.variable} ${playfairDisplay.variable} font-body`}>
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
