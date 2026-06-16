'use client'

import { useEffect } from 'react'
import { sendGTMEvent } from '@/lib/gtm'

type AreaSectionTrackerProps = {
  areaId: string
  areaTitle: string
  sectionIds: string[]
}

export function AreaSectionTracker({ areaId, areaTitle, sectionIds }: AreaSectionTrackerProps) {
  useEffect(() => {
    const seen = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue

          const id = (entry.target as HTMLElement).id
          if (!id || seen.has(id)) continue
          seen.add(id)

          sendGTMEvent('area_section_view', {
            area_id: areaId,
            area_title: areaTitle,
            section_id: id,
            page_path: window.location.pathname,
          })
        }
      },
      { threshold: 0.45 },
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [areaId, areaTitle, sectionIds])

  return null
}
