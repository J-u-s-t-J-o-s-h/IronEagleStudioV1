/** @type {import('next').NextConfig} */
const extraAllowedDevOrigins =
  typeof process.env.NEXT_DEV_ALLOWED_HOSTS === 'string'
    ? process.env.NEXT_DEV_ALLOWED_HOSTS.split(/[\s,]+/)
        .map((s) => s.trim())
        .filter(Boolean)
    : []

const isProd = process.env.NODE_ENV === 'production'

const scriptSrc = isProd
  ? [
      "script-src",
      "'self'",
      "'unsafe-inline'",
      "https://elfsightcdn.com",
      "https://*.elfsightcdn.com",
      "https://elfsight.com",
      "https://*.elfsight.com",
      "https://static.elfsight.com",
      "https://apps.elfsight.com",
      "https://c.elfsight.com",
      "https://va.vercel-scripts.com",
      "https://vercel.live",
    ].join(' ')
  : [
      "script-src",
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      "https://elfsightcdn.com",
      "https://*.elfsightcdn.com",
      "https://elfsight.com",
      "https://*.elfsight.com",
      "https://static.elfsight.com",
      "https://apps.elfsight.com",
      "https://c.elfsight.com",
      "https://va.vercel-scripts.com",
      "https://vercel.live",
    ].join(' ')

const connectSrc = isProd
  ? [
      "connect-src",
      "'self'",
      "https://elfsightcdn.com",
      "https://*.elfsightcdn.com",
      "https://elfsight.com",
      "https://*.elfsight.com",
      "https://static.elfsight.com",
      "https://apps.elfsight.com",
      "https://c.elfsight.com",
      "wss://*.elfsight.com",
      "https://va.vercel-scripts.com",
      "https://vercel.live",
    ].join(' ')
  : [
      "connect-src",
      "'self'",
      "ws:",
      "wss:",
      "http:",
      "https:",
      "https://elfsightcdn.com",
      "https://*.elfsightcdn.com",
      "https://elfsight.com",
      "https://*.elfsight.com",
      "https://static.elfsight.com",
      "https://apps.elfsight.com",
      "https://c.elfsight.com",
      "wss://*.elfsight.com",
      "https://va.vercel-scripts.com",
      "https://vercel.live",
    ].join(' ')

const styleSrc = [
  "style-src",
  "'self'",
  "'unsafe-inline'",
  "https://fonts.googleapis.com",
  "https://elfsight.com",
  "https://*.elfsight.com",
  "https://static.elfsight.com",
  "https://apps.elfsight.com",
  "https://c.elfsight.com",
].join(' ')

const cspDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  scriptSrc,
  connectSrc,
  styleSrc,
  "img-src 'self' data: blob: https: https://elfsight.com https://*.elfsight.com https://elfsightcdn.com https://*.elfsightcdn.com",
  "font-src 'self' data: https://fonts.gstatic.com https://elfsight.com https://*.elfsight.com https://elfsightcdn.com https://*.elfsightcdn.com https://vercel.live",
  "frame-src 'self' https://elfsight.com https://*.elfsight.com https://vercel.live",
  "worker-src 'self' blob: https://elfsight.com https://*.elfsight.com",
  "child-src 'self' blob: https://elfsight.com https://*.elfsight.com",
  ...(isProd ? ['upgrade-insecure-requests'] : []),
].join('; ')

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: !isProd,
    formats: ['image/avif', 'image/webp'],
  },
  allowedDevOrigins: [
    '192.168.3.138',
    '192.168.1.250',
    ...extraAllowedDevOrigins,
  ],
  async headers() {
    if (!isProd) {
      return []
    }

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspDirectives,
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
}

export default nextConfig