import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AxisPageTemplate } from '@/components/axis-page-template'
import { getAreaById, siteConfig } from '@/lib/site-config'

const areaData = getAreaById('imobiliario')!

export const metadata: Metadata = {
  title: areaData.seoTitle,
  description: areaData.seoDescription,
  alternates: {
    canonical: `${siteConfig.contact.siteUrl}/imobiliario`,
  },
  openGraph: {
    title: areaData.seoTitle,
    description: areaData.seoDescription,
    url: `${siteConfig.contact.siteUrl}/imobiliario`,
    siteName: siteConfig.brand.legalName,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function ImobiliarioPage() {
  if (!areaData) notFound()
  return <AxisPageTemplate areaData={areaData} />
}

