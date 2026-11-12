import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AxisPageTemplate } from '@/components/axis-page-template'
import { getAreaById, siteConfig } from '@/lib/site-config'

type Props = {
  params: Promise<{ area: string }>
}

export async function generateStaticParams() {
  const slugs = new Set<string>()
  for (const area of siteConfig.areas) {
    slugs.add(area.id)
    for (const legacy of area.legacySlugs ?? []) {
      slugs.add(legacy)
    }
  }
  return Array.from(slugs).map((area) => ({ area }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params
  const areaData = getAreaById(area)

  if (!areaData) {
    return {
      title: siteConfig.seo.title,
      description: siteConfig.seo.description,
    }
  }

  return {
    title: areaData.seoTitle,
    description: areaData.seoDescription,
    alternates: {
      canonical: `${siteConfig.contact.siteUrl}${areaData.route}`,
    },
    openGraph: {
      title: areaData.seoTitle,
      description: areaData.seoDescription,
      url: `${siteConfig.contact.siteUrl}${areaData.route}`,
      type: 'website',
    },
  }
}

export default async function AreaPage({ params }: Props) {
  const { area } = await params
  const areaData = getAreaById(area)

  if (!areaData) {
    notFound()
    return null
  }

  return <AxisPageTemplate areaData={areaData} />
}
