import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AxisPageTemplate } from '@/components/axis-page-template'
import { getAreaById, siteConfig } from '@/lib/site-config'

const areaData = getAreaById('consumidor')!

export const metadata: Metadata = {
  title: areaData.seoTitle,
  description: areaData.seoDescription,
  alternates: {
    canonical: `${siteConfig.contact.siteUrl}/consumidor`,
  },
  openGraph: {
    title: areaData.seoTitle,
    description: areaData.seoDescription,
    url: `${siteConfig.contact.siteUrl}/consumidor`,
    siteName: siteConfig.brand.legalName,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function ConsumidorPage() {
  if (!areaData) notFound()
  return <AxisPageTemplate areaData={areaData} />
}

