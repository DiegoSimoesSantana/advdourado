import { HeroSection } from '@/components/hero-section'
import { ServicesSection } from '@/components/services-section'
import { AboutSection } from '@/components/about-section'
import { ProcessSection } from '@/components/process-section'
import { FAQSection } from '@/components/faq-section'
import { ContactFooterSection } from '@/components/contact-footer-section'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { FeaturedArticlesSection } from '@/components/featured-articles-section'
import { SocialProofSection } from '@/components/social-proof-section'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <SocialProofSection />
      <FeaturedArticlesSection />
      <ProcessSection />
      <FAQSection />
      <ContactFooterSection />
      <WhatsAppButton />
    </main>
  )
}
