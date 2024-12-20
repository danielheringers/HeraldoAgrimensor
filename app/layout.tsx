import { Nunito, Libre_Baskerville } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
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
  title: 'Heraldo Heringer - Serviços de Agrimensura',
  description: 'Serviços profissionais de agrimensura para suas necessidades de medição e demarcação de terras.',
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
        <Toaster />
      </body>
    </html>
  )
}

