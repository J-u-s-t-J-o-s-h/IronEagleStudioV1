/** @type {import('next').NextConfig} */
const extraAllowedDevOrigins =
  typeof process.env.NEXT_DEV_ALLOWED_HOSTS === 'string'
    ? process.env.NEXT_DEV_ALLOWED_HOSTS.split(/[\s,]+/)
        .map((s) => s.trim())
        .filter(Boolean)
    : []

const isProd = process.env.NODE_ENV === 'production'
const scriptSrc = isProd
  ? "script-src 'self' 'unsafe-inline' https://elfsightcdn.com https://*.elfsight.com https://va.vercel-scripts.com"
  : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://elfsightcdn.com https://*.elfsight.com https://va.vercel-scripts.com"
const connectSrc = isProd
  ? "connect-src 'self' https://elfsightcdn.com https://*.elfsight.com wss://*.elfsight.com https://va.vercel-scripts.com"
  : "connect-src 'self' ws: wss: http: https: https://elfsightcdn.com https://*.elfsight.com wss://*.elfsight.com https://va.vercel-scripts.com"
const cspDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  scriptSrc,
  connectSrc,
  "style-src 'self' 'unsafe-inline' https://*.elfsight.com",
  "img-src 'self' data: blob: https: https://*.elfsight.com",
  "font-src 'self' data: https://*.elfsight.com https://fonts.gstatic.com",
  "frame-src 'self' https://*.elfsight.com",
  "worker-src 'self' blob: https://*.elfsight.com",
  "child-src 'self' blob: https://*.elfsight.com",
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
  /**
   * Hostnames (no scheme/port) allowed to load dev internals (`/_next/*`, HMR) from this machine.
   * Must match the LAN IP you open in the phone browser (DHCP can change it — update or set NEXT_DEV_ALLOWED_HOSTS).
   */
  allowedDevOrigins: [
    '192.168.3.138', // Wi-Fi (verified ipconfig on this machine)
    '192.168.1.250', // Ethernet
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
