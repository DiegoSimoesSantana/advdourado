import React from 'react'

type BrandEmblemProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function BrandEmblem({ size = 'md', className = '' }: BrandEmblemProps) {
  const dimensions = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  }[size]

  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center rounded-xl shadow-sm ${dimensions} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="bdBgGrad" x1="0" y1="0" x2="180" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#161616" />
            <stop offset="100%" stopColor="#090909" />
          </linearGradient>
          <linearGradient id="bdGoldGrad" x1="30" y1="20" x2="150" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#DFC69E" />
            <stop offset="50%" stopColor="#C5A880" />
            <stop offset="100%" stopColor="#9A7C56" />
          </linearGradient>
        </defs>
        <rect width="180" height="180" rx="38" fill="url(#bdBgGrad)" />
        <rect
          x="8"
          y="8"
          width="164"
          height="164"
          rx="31"
          stroke="url(#bdGoldGrad)"
          strokeWidth="3"
          strokeOpacity="0.75"
        />
        {/* Balança Superior */}
        <path d="M90 25V49" stroke="url(#bdGoldGrad)" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="90" cy="24" r="4.5" fill="url(#bdGoldGrad)" />
        <path d="M56 35H124" stroke="url(#bdGoldGrad)" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M56 35L48 48H64L56 35Z"
          stroke="url(#bdGoldGrad)"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="#C5A880"
          fillOpacity="0.2"
        />
        <path
          d="M124 35L116 48H132L124 35Z"
          stroke="url(#bdGoldGrad)"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="#C5A880"
          fillOpacity="0.2"
        />
        <path d="M76 49H104" stroke="url(#bdGoldGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Monograma BD */}
        <text
          x="90"
          y="126"
          textAnchor="middle"
          fill="url(#bdGoldGrad)"
          fontFamily="Georgia, 'Playfair Display', serif"
          fontWeight="700"
          fontSize="68"
          letterSpacing="-2"
        >
          BD
        </text>
        <path d="M52 142H128" stroke="url(#bdGoldGrad)" strokeWidth="1.5" strokeOpacity="0.55" />
        <text
          x="90"
          y="157"
          textAnchor="middle"
          fill="#C5A880"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize="11"
          letterSpacing="3.5"
        >
          71507
        </text>
      </svg>
    </div>
  )
}

