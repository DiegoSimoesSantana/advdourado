'use client'

import { useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import { Scale } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

type SafePortraitImageProps = Omit<ImageProps, 'onError'> & {
  fallbackLabel?: string
}

export function SafePortraitImage({
  alt,
  className = '',
  fallbackLabel = 'Dra. Bruna Dourado',
  ...props
}: SafePortraitImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#121212] via-[#1a1815] to-[#0a0a0a] p-6 text-center text-[#faf9f6] ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-[#c5a880]/40 bg-[#c5a880]/10 font-serif text-2xl font-bold text-[#c5a880]">
          BD
        </div>
        <Scale className="mb-2 h-5 w-5 text-[#c5a880]/80" />
        <p className="font-serif text-lg font-semibold text-[#faf9f6]">{fallbackLabel}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.22em] text-[#c5a880]">{siteConfig.brand.oab}</p>
      </div>
    )
  }

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  )
}

