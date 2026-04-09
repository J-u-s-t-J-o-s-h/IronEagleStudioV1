'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'
import { cn } from '@/lib/utils'

/** Vector lockup in `public/brand/` (always used when no raster path is configured). */
export const LOGO_SVG = '/brand/LogoV-B.svg'

/**
 * Default raster path — optimized WebP lockup in `public/brand/logo-transparent.webp`.
 * If the file is missing, the component falls back to `LogoV-B.svg` after one failed load.
 * Force SVG only (no PNG request): `NEXT_PUBLIC_LOGO_RASTER=svg` in `.env`.
 * Custom path: `NEXT_PUBLIC_LOGO_RASTER=/brand/other.webp` or `<Logo rasterSrc="..." />`.
 */
export const LOGO_RASTER_DEFAULT = '/brand/logo-transparent.webp'

/** @deprecated Use LOGO_RASTER_DEFAULT */
export const LOGO_PNG_TRANSPARENT = LOGO_RASTER_DEFAULT
/** @deprecated */
export const LOGO_PNG = LOGO_RASTER_DEFAULT

const NATURAL = { width: 2000, height: 2000 }

function resolveRasterSrc(prop?: string): string | undefined {
  const fromEnv =
    typeof process !== 'undefined' && process.env.NEXT_PUBLIC_LOGO_RASTER
      ? process.env.NEXT_PUBLIC_LOGO_RASTER.trim()
      : ''
  const envLower = fromEnv.toLowerCase()
  if (envLower === 'svg' || envLower === '0' || envLower === 'false') {
    return undefined
  }
  const base =
    prop !== undefined && prop !== ''
      ? prop
      : fromEnv !== ''
        ? fromEnv
        : LOGO_RASTER_DEFAULT
  const raw = base.trim()
  return raw || undefined
}

/** Home hero: bigger than header, smaller than old “billboard”; left-aligned with headline. */
const heroLogoImgClass =
  'object-left h-[clamp(4.5rem,12vw,6.25rem)] w-auto max-h-[6.75rem] max-w-[min(100%,16.5rem)] sm:h-[clamp(5rem,11vw,7.25rem)] sm:max-h-[7.5rem] sm:max-w-[18.5rem] md:h-[clamp(5.5rem,9vw,8.25rem)] md:max-h-[8.75rem] md:max-w-[21rem] lg:max-h-[9.25rem] lg:max-w-[23rem]'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  className?: string
  priority?: boolean
  /** Force SVG even when a raster path is configured. */
  useSvg?: boolean
  /** Public path under `/public` (e.g. `/brand/logo-transparent.webp`). */
  rasterSrc?: string
  /**
   * With a **raster** logo, `mix-blend-mode: screen` can soften a solid black plate on dark bars.
   * Ignored for SVG-only (blend would hide the mark on mobile).
   */
  blendDarkBackground?: boolean
  /** Slightly larger lockup for the home hero (same column as headline, no panel required). */
  variant?: 'default' | 'hero'
}

function logoImageClass(size: LogoProps['size'], showText: boolean): string {
  if (!showText) {
    switch (size) {
      case 'sm':
        return 'h-14 w-auto max-h-14 max-w-[140px] sm:max-w-[152px]'
      case 'md':
        return 'h-[3.75rem] w-auto max-h-[3.75rem] max-w-[160px]'
      case 'lg':
        return 'h-16 w-auto max-h-16 max-w-[188px]'
      case 'xl':
        return 'h-[4.5rem] w-auto max-h-[4.5rem] max-w-[220px]'
      default:
        return 'h-14 w-auto max-w-[140px]'
    }
  }
  switch (size) {
    case 'sm':
      return 'h-14 w-auto max-h-14 max-w-[200px] sm:h-16 sm:max-h-16 sm:max-w-[230px]'
    case 'md':
      return 'h-[4.5rem] w-auto max-h-[4.5rem] max-w-[min(272px,58vw)] sm:h-[5rem] sm:max-h-[5rem] sm:max-w-[305px] md:h-[5.5rem] md:max-h-[5.5rem] md:max-w-[355px] lg:h-[5.75rem] lg:max-h-[5.75rem] lg:max-w-[420px]'
    case 'lg':
      return 'h-20 w-auto max-h-20 max-w-[340px] sm:h-[5.5rem] sm:max-h-[5.5rem] sm:max-w-[400px] md:max-w-[440px]'
    case 'xl':
      return 'h-[12rem] w-auto max-h-[12rem] max-w-[min(100%,40rem)] sm:h-[14rem] sm:max-h-[14rem] sm:max-w-[min(100%,45rem)] md:h-[14.75rem] md:max-h-[14.75rem] md:max-w-[min(100%,48rem)] lg:h-[16.5rem] lg:max-h-[16.5rem] lg:max-w-[min(100%,53rem)]'
    default:
      return 'h-16 w-auto max-w-[240px]'
  }
}

export function Logo({
  size = 'md',
  showText = true,
  className = '',
  priority = false,
  useSvg = false,
  rasterSrc,
  blendDarkBackground = false,
  variant = 'default',
}: LogoProps) {
  const resolved = resolveRasterSrc(rasterSrc)
  const [rasterFailed, setRasterFailed] = useState(false)
  const showRaster = !useSvg && !!resolved && !rasterFailed
  const isHero = variant === 'hero'

  const imgClass = cn(
    'bg-transparent object-contain object-left',
    blendDarkBackground && showRaster && 'mix-blend-screen',
    isHero ? heroLogoImgClass : logoImageClass(size, showText)
  )

  const onRasterError = useCallback(() => {
    setRasterFailed(true)
  }, [])

  if (!showRaster) {
    return (
      <div className={cn('flex items-center', className)}>
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG master; large file; avoids 404 raster cycle */}
        <img
          src={LOGO_SVG}
          alt="HJH Outdoor Operations LLC — storm shelters, excavation, land clearing, Oklahoma"
          width={NATURAL.width}
          height={NATURAL.height}
          className={imgClass}
          decoding="async"
        />
      </div>
    )
  }

  return (
    <div className={cn('flex items-center', className)}>
      <Image
        src={resolved}
        alt="HJH Outdoor Operations LLC — storm shelter installation, dirt work, land clearing, Oklahoma"
        width={NATURAL.width}
        height={NATURAL.height}
        className={imgClass}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        sizes={
          isHero
            ? '(max-width: 640px) 300px, (max-width: 1024px) 360px, 400px'
            : '(max-width: 640px) 280px, (max-width: 1024px) 400px, 520px'
        }
        onError={onRasterError}
      />
    </div>
  )
}

export function LogoMark({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <img
      src={LOGO_SVG}
      alt=""
      width={NATURAL.width}
      height={NATURAL.height}
      className={cn('bg-transparent object-contain', className)}
      style={{ width: size, height: size }}
      aria-hidden={true}
    />
  )
}
