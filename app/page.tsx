import { HeroSection } from '@/components/hero-section'
import { ServicesSection } from '@/components/services-section'
import { AboutSection } from '@/components/about-section'
import { ContactFooterSection } from '@/components/contact-footer-section'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { FeaturedArticlesSection } from '@/components/featured-articles-section'

export default function Home() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-background">
      {/* Bloco 1: Hero Principal com Foto 1 da Dra. Bruna */}
      <HeroSection />

      {/* Bloco 2: 6 Especialidades com Cards Enxutos ("Explorar Área") */}
      <ServicesSection />

      {/* Bloco 3: Sobre a Advogada e o Escritório com Foto 2 da Dra. Bruna */}
      <AboutSection />

      {/* Bloco 4: 3 Artigos em Destaque com Capas Editoriais Temáticas */}
      <FeaturedArticlesSection />

      <ContactFooterSection />
      <WhatsAppButton />
    </main>
  )
}
