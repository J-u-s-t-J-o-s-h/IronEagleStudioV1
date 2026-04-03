import type { Metadata, Viewport } from 'next'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { StickyCallButton } from '@/components/sticky-call-button'
import { SkipLink } from '@/components/skip-link'
import './globals.css'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-barlow',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-barlow-condensed',
})

const defaultMetadataBase =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e7ddcf' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1c1e' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(defaultMetadataBase),
  title: 'HJH Outdoor Operations LLC | Storm Shelter Installation & Excavation | Oklahoma',
  description:
    'HJH Outdoor Operations LLC provides professional storm shelter installation, excavation, dirt work, land clearing, site grading, and septic system services across Oklahoma. Get a free quote today.',
  keywords: [
    'storm shelter installation Oklahoma',
    'excavation contractor Oklahoma',
    'dirt work Oklahoma',
    'land clearing Oklahoma',
    'site grading contractor',
    'septic system installation Oklahoma',
    'HJH Outdoor Operations',
  ],
  manifest: '/brand/site.webmanifest',
  appleWebApp: {
    title: 'HJH Outdoor',
  },
  icons: {
    icon: [
      { url: '/brand/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/brand/favicon.svg',
  },
  openGraph: {
    title: 'HJH Outdoor Operations LLC',
    description: 'Storm shelter installation, excavation, and outdoor site services in Oklahoma.',
    type: 'website',
    images: [
      {
        url: '/brand/LogoV-B.svg',
        width: 1200,
        height: 630,
        alt: 'HJH Outdoor Operations LLC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HJH Outdoor Operations LLC',
    description: 'Storm shelter installation, excavation, and outdoor site services in Oklahoma.',
    images: ['/brand/LogoV-B.svg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${barlow.variable} ${barlowCondensed.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased min-h-dvh overflow-x-clip pb-[env(safe-area-inset-bottom)]">
        <SkipLink />
        {children}
        <StickyCallButton />
        <Analytics />
      </body>
    </html>
  )
}
