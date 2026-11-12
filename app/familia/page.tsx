import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AxisPageTemplate } from '@/components/axis-page-template'
import { getAreaById, siteConfig } from '@/lib/site-config'

const areaData = getAreaById('familia')!

export const metadata: Metadata = {
  title: areaData.seoTitle,
  description: areaData.seoDescription,
  alternates: {
    canonical: `${siteConfig.contact.siteUrl}/familia`,
  },
  openGraph: {
    title: areaData.seoTitle,
    description: areaData.seoDescription,
    url: `${siteConfig.contact.siteUrl}/familia`,
    siteName: siteConfig.brand.legalName,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function FamiliaPage() {
  if (!areaData) notFound()
  return <AxisPageTemplate areaData={areaData} />
}

