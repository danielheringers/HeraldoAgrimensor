import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"
import { Libre_Baskerville, Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({ 
  subsets: ['latin'],
  variable: '--font-nunito',
})

const libreBaskerville = Libre_Baskerville({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-libre',
})

export const metadata = {
  title: 'Heraldo Heringer - Agrimensura em Manhuaçu | Georreferenciamento e Topografia',
  description: 'Serviços profissionais de agrimensura, georreferenciamento e topografia em Manhuaçu e região. Medição e demarcação de terras com precisão e qualidade.',
  keywords: 'Agrimensura, georreferenciamento, topografia, Manhuaçu, medição de terras, demarcação de terras, loteamentos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.variable} ${libreBaskerville.variable} font-nunito`}>
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}

