import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Services from "@/components/Services"
import Process from "@/components/Process"
import Benefits from "@/components/Benefits"
import ContactForm from "@/components/ContactForm"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Header />
      <Hero />
      <Services />
      <Process />
      <Benefits />
      <ContactForm />
      <Footer />
    </main>
  )
}
