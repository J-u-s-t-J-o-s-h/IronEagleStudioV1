'use client'

import { Phone } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function StickyCallButton() {
  const pathname = usePathname()
  const hideOnHome = pathname === '/'

  if (hideOnHome) return null

  return (
    <a
      href="tel:+14058675309"
      className="lg:hidden fixed z-50 flex items-center justify-center gap-2 rounded-sm bg-storm-blue px-4 py-3.5 text-bone-linen shadow-xl transition-all duration-200 hover:bg-steel-blue hover:shadow-2xl sm:gap-3 sm:px-6 sm:py-4 max-sm:right-[max(0.75rem,env(safe-area-inset-right))] max-sm:bottom-[max(0.75rem,env(safe-area-inset-bottom))] sm:right-[max(1.5rem,env(safe-area-inset-right))] sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))]"
      aria-label="Call HJH Outdoor Operations at (405) 867-5309"
    >
      <Phone size={24} className="shrink-0" aria-hidden="true" />
      <span className="hidden font-bold text-lg tracking-wide sm:inline">Call Now</span>
      <span className="font-bold text-sm tracking-wide sm:hidden">Call</span>
    </a>
  )
}
