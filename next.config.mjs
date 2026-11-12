/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      // Redirecionamento 301 de subdomínios legados para as rotas internas no domínio principal
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'trabalhista.advdourado.com.br' }],
        destination: 'https://advdourado.com.br/trabalhista',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'consumidor.advdourado.com.br' }],
        destination: 'https://advdourado.com.br/consumidor',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'educacional.advdourado.com.br' }],
        destination: 'https://advdourado.com.br/educacional',
        permanent: true,
      },
      // Redirecionamentos 301 de rotas internas antigas (/areas/*) para os 6 eixos na raiz
      {
        source: '/areas/trabalhista',
        destination: '/trabalhista',
        permanent: true,
      },
      {
        source: '/areas/educacional',
        destination: '/educacional',
        permanent: true,
      },
      {
        source: '/areas/familia',
        destination: '/familia',
        permanent: true,
      },
      {
        source: '/areas/consumidor',
        destination: '/consumidor',
        permanent: true,
      },
      {
        source: '/areas/imoveis-inventario',
        destination: '/imobiliario',
        permanent: true,
      },
      {
        source: '/areas/imobiliario',
        destination: '/imobiliario',
        permanent: true,
      },
      {
        source: '/areas/planos-saude',
        destination: '/saude',
        permanent: true,
      },
      {
        source: '/areas/saude',
        destination: '/saude',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, s-maxage=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, s-maxage=31536000, immutable',
          },
        ],
      },
      {
        source: '/llms.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
