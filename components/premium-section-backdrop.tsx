import { cn } from '@/lib/utils'

export type PremiumSectionTexture = 'linen' | 'concrete' | 'diagonal' | 'brand-1' | 'brand-2'

/**
 * Sits behind section content (z-0). Mask feathers only the top & bottom edges
 * so the fixed hero peeks through — middle band stays solid. Text/cards stay crisp.
 */
export function PremiumSectionBackdrop({
  fillClassName,
  texture,
  className,
}: {
  /** Tailwind bg token, e.g. `bg-gunmetal` */
  fillClassName: string
  texture?: PremiumSectionTexture | null
  className?: string
}) {
  return (
    <div className={cn('premium-section-backdrop', className)} aria-hidden>
      <div className={cn('premium-section-backdrop__fill', fillClassName)} />
      {texture ? (
        <div
          className={cn(
            'premium-section-backdrop__texture',
            texture === 'linen' && 'premium-section-backdrop__texture--linen',
            texture === 'concrete' && 'premium-section-backdrop__texture--concrete',
            texture === 'diagonal' && 'premium-section-backdrop__texture--diagonal',
            texture === 'brand-1' && 'premium-section-backdrop__texture--brand-1',
            texture === 'brand-2' && 'premium-section-backdrop__texture--brand-2'
          )}
        />
      ) : null}
    </div>
  )
}
