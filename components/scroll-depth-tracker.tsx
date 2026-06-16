'use client'

import { useEffect, useRef } from 'react'
import { sendGTMEvent } from '@/lib/gtm'

const DEPTH_STEPS = [25, 50, 75, 100]

export function ScrollDepthTracker() {
  const fired = useRef<Set<number>>(new Set())

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement
      const scrollTop = window.scrollY || doc.scrollTop
      const viewport = window.innerHeight
      const height = Math.max(doc.scrollHeight - viewport, 1)
      const pct = Math.min(100, Math.round((scrollTop / height) * 100))

      for (const step of DEPTH_STEPS) {
        if (pct >= step && !fired.current.has(step)) {
          fired.current.add(step)
          sendGTMEvent('scroll_depth', {
            depth_percent: step,
            page_path: window.location.pathname,
          })
        }
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return null
}
