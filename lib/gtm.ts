type TrackingPayload = Record<string, string | number | boolean | null | undefined>

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

export function sendGTMEvent(event: string, payload: TrackingPayload = {}) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event,
    ...payload,
  })

  if (typeof window.gtag === 'function') {
    window.gtag('event', event, payload)
  }

  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', event, payload)
  }
}
