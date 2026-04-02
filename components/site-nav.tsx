'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronDown, Shovel, Home, Shield, Wrench, Images, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'

// Simplified nav - grouped into 4 main items + dropdown
const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: null },
  { 
    label: 'Services', 
    icon: Wrench,
    dropdown: [
      { href: '/services', label: 'All Services', icon: Shovel },
      { href: '/storm-shelter', label: 'Storm Shelters', icon: Shield },
      { href: '/projects', label: 'Our Work', icon: Images },
    ]
  },
  { href: '/contact', label: 'Contact', icon: MessageSquare },
]

export function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [scrolledPastHeroThreshold, setScrolledPastHeroThreshold] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolledPastHeroThreshold(window.scrollY > 80)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isHome = pathname === '/'
  const showHeaderLogo = !isHome || scrolledPastHeroThreshold
  const useSolidHeader = !isHome || scrolledPastHeroThreshold

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,backdrop-filter,box-shadow,border-color] duration-500',
        useSolidHeader
          ? 'bg-soft-coal/96 backdrop-blur-sm shadow-lg shadow-black/30 border-b border-white/10'
          : 'bg-gradient-to-b from-matte-black/35 via-matte-black/15 to-transparent border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[5.75rem] items-center justify-between lg:h-[6.75rem]">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'flex min-w-0 items-center py-1 pr-4 transition-all duration-500 ease-out lg:pr-6',
              showHeaderLogo ? 'opacity-100 translate-y-0 scale-100' : 'pointer-events-none -translate-y-1 scale-95 opacity-0'
            )}
            aria-label="HJH Outdoor Operations - Home"
            aria-hidden={!showHeaderLogo}
            tabIndex={showHeaderLogo ? undefined : -1}
          >
            <Logo size="md" showText priority className="min-w-0" />
          </Link>

          {/* Desktop / tablet nav */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-2" aria-label="Main navigation">
            {navItems.map((item) => (
              'dropdown' in item ? (
                <div key={item.label} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold tracking-wide uppercase transition-all duration-200 rounded-sm lg:gap-2 lg:px-5 lg:py-3 lg:text-base',
                      dropdownOpen || pathname.startsWith('/services') || pathname.startsWith('/storm-shelter') || pathname.startsWith('/projects')
                        ? 'text-storm-blue bg-storm-blue/10'
                        : 'text-soft-khaki hover:text-bone-linen hover:bg-white/5'
                    )}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown 
                      size={18} 
                      className={cn('transition-transform duration-200', dropdownOpen && 'rotate-180')} 
                      aria-hidden="true" 
                    />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div
                    className={cn(
                      'absolute top-full left-0 mt-2 w-56 bg-gunmetal border border-white/10 rounded-sm shadow-xl shadow-black/40 overflow-hidden transition-all duration-200 origin-top',
                      dropdownOpen 
                        ? 'opacity-100 scale-100 translate-y-0' 
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                    )}
                  >
                    {item.dropdown.map((subItem) => {
                      const Icon = subItem.icon
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            'flex items-center gap-3 px-5 py-4 text-base font-medium transition-colors border-b border-white/5 last:border-0',
                            pathname === subItem.href
                              ? 'text-storm-blue bg-storm-blue/10'
                              : 'text-soft-khaki hover:text-bone-linen hover:bg-white/5'
                          )}
                        >
                          {Icon && <Icon size={20} className="text-equipment-gold" aria-hidden="true" />}
                          {subItem.label}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-2.5 text-sm font-semibold tracking-wide uppercase transition-colors duration-150 rounded-sm lg:px-5 lg:py-3 lg:text-base',
                    pathname === item.href
                      ? 'text-storm-blue bg-storm-blue/10'
                      : 'text-soft-khaki hover:text-bone-linen hover:bg-white/5'
                  )}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Desktop / tablet CTA */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <a
              href="tel:+14058675309"
              className="flex items-center gap-2 px-3 py-2.5 text-soft-khaki hover:text-bone-linen hover:bg-white/5 text-sm font-semibold tracking-wide transition-colors rounded-sm lg:px-4 lg:py-3 lg:text-base"
              aria-label="Call us at (405) 867-5309"
            >
              <Phone size={20} aria-hidden="true" />
              <span className="hidden lg:inline">(405) 867-5309</span>
            </a>
            <Link
              href="/contact"
              className="px-4 py-2.5 bg-storm-blue hover:bg-steel-blue text-bone-linen text-sm font-bold tracking-wide uppercase transition-colors duration-150 rounded-sm shadow-lg shadow-storm-blue/30 hover:shadow-storm-blue/50 lg:px-6 lg:py-3 lg:text-base"
            >
              Free Quote
            </Link>
          </div>

          {/* Mobile: phone + menu */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="tel:+14058675309"
              className="flex items-center justify-center w-12 h-12 text-soft-khaki hover:text-bone-linen hover:bg-white/10 transition-colors rounded-sm"
              aria-label="Call us at (405) 867-5309"
            >
              <Phone size={24} aria-hidden="true" />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex items-center justify-center w-12 h-12 text-soft-khaki hover:text-bone-linen hover:bg-white/10 transition-colors rounded-sm"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Simplified */}
      <div
        className={cn(
          'md:hidden bg-gunmetal border-t border-white/10 overflow-y-auto overscroll-contain transition-all duration-300',
          mobileOpen ? 'max-h-[min(80vh,100dvh-4rem)] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] flex flex-col gap-1" aria-label="Mobile navigation">
          {navItems.map((item) => (
            'dropdown' in item ? (
              <div key={item.label} className="flex flex-col">
                <div className="px-5 py-3 text-xs font-bold tracking-widest uppercase text-weathered-stone">
                  {item.label}
                </div>
                {item.dropdown.map((subItem) => {
                  const Icon = subItem.icon
                  return (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        'flex items-center gap-3 px-5 py-4 text-lg font-semibold rounded-sm transition-colors',
                        pathname === subItem.href
                          ? 'text-storm-blue bg-storm-blue/10'
                          : 'text-soft-khaki hover:text-bone-linen hover:bg-white/5'
                      )}
                    >
                      {Icon && <Icon size={22} className="text-equipment-gold" aria-hidden="true" />}
                      {subItem.label}
                    </Link>
                  )
                })}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-5 py-4 text-lg font-semibold rounded-sm transition-colors',
                  pathname === item.href
                    ? 'text-storm-blue bg-storm-blue/10'
                    : 'text-soft-khaki hover:text-bone-linen hover:bg-white/5'
                )}
              >
                {item.icon && <item.icon size={22} className="text-equipment-gold" aria-hidden="true" />}
                {item.label}
              </Link>
            )
          ))}
          
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href="tel:+14058675309"
              className="flex items-center justify-center gap-3 px-5 py-4 border-2 border-soft-khaki/40 text-soft-khaki text-lg font-bold tracking-wide uppercase rounded-sm hover:border-bone-linen hover:text-bone-linen transition-colors"
              aria-label="Call us at (405) 867-5309"
            >
              <Phone size={20} aria-hidden="true" />
              (405) 867-5309
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center px-5 py-4 bg-storm-blue text-bone-linen text-lg font-bold tracking-wide uppercase rounded-sm hover:bg-steel-blue transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
